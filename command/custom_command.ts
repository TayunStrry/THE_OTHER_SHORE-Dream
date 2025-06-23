/*
 * 原版接口
 */
import * as serverUI from "@minecraft/server-ui";
import * as server from "@minecraft/server";
/*
 * 系统数据
 */
import trading from "../data/trading";
import trophy from "../data/trophy";
/*
 * 系统组件
 */
import * as opal from "../system/opal";
import * as type from "../data/type";
/*
 * 自定义组件
 */
import * as customFunction from "./custom_function";
/**
 * 自定义命令回调函数格式
 */
type CUSTOM_COMMAND_CALLBACK = (origin: server.CustomCommandOrigin, ...args: any[]) => server.CustomCommandResult | undefined
/**
 * 自定义指令实现列表
 */
const components = new Map<server.CustomCommand, CUSTOM_COMMAND_CALLBACK>();
// TODO 添加自定义指令
components.set(
	{
		description: '针对已经进行过( 契约 | 驯服 )的实体, 追加契约绑定仪式',
		name: 'opal:entity_contract_rite',
		permissionLevel: server.CommandPermissionLevel.Any,
		optionalParameters: [
			{
				name: '<§5§l 单目标生效 §r> 进行< 契约绑定 >的实体',
				type: server.CustomCommandParamType.EntitySelector
			}
		]
	},
	(source: server.CustomCommandOrigin, targets: server.Entity[] | undefined): server.CustomCommandResult => {
		/**
		 * 进行操作的实体
		 */
		const entity = targets && targets.length !== 0 ? targets[0] : source.sourceEntity;
		// 实体不存在则提前返回
		if (!entity || !entity.isValid) return { message: '错误: 未找到有效的契约绑定目标实体', status: server.CustomCommandStatus.Failure };
		/**
		 * 进行操作的玩家
		 */
		const player = entity?.getComponent('minecraft:tameable')?.tamedToPlayer;
		// 玩家不存在则提前返回
		if (!player || !player.isValid) return { message: '错误: 当前实体未与玩家建立契约关系', status: server.CustomCommandStatus.Failure };
		// 运行功能代码
		server.system.run(
			() => {
				/**
				 * 玩家名称标签
				 */
				const userName = opal.translate(player);
				/**
				 * 角色名称
				 */
				const roleName = opal.translate(entity);
				// 显示消息
				player.sendMessage([{ text: '< ' }, userName, { text: ' >与< ' }, roleName, { text: ' >已签订契约' }]);
				// 设置属性
				entity.setDynamicProperty('entity:false_anchor_point', player.id);
				entity.setDynamicProperty('entity:contract_user', player.id);
				// 设置标签
				entity.addTag("is_Contract");
				/**
				 * 定义 粒子参数
				 */
				const molang = new server.MolangVariableMap();
				// 设置粒子参数
				molang.setFloat('variable.direction', 0);
				molang.setFloat('variable.size', 2);
				// 播放 粒子效果
				opal.TrySpawnParticle(entity.dimension, 'scripts:path_heart', opal.Vector.CONSTANT_UP.add(entity.location), molang);
				opal.TrySpawnParticle(entity.dimension, 'minecraft:knockback_roar_particle', entity.location);
				opal.TrySpawnParticle(entity.dimension, 'minecraft:totem_particle', entity.location);
			}
		)
		// 显示运行成功的消息
		return { message: '契约绑定已完成', status: server.CustomCommandStatus.Success };
	}
);
components.set(
	{
		description: '针对被选中的目标, 牵引实体靠近指令源的出生点, 每 100 tick 仅可执行一次',
		name: 'opal:apply_traction_to_target',
		permissionLevel: server.CommandPermissionLevel.Any,
		optionalParameters: [
			{
				name: '作为< 牵引目标 >的实体',
				type: server.CustomCommandParamType.EntitySelector
			}
		]
	},
	(source: server.CustomCommandOrigin, targets: server.Entity[] | undefined): server.CustomCommandResult => {
		/**
		 * 获取 作为牵引源的游戏对象
		 */
		const self = source.sourceEntity;
		// 判断指令执行源对象是否真实可用
		if (!self || !self.isValid) return { message: '未能找到: 作为< 牵引源 >的游戏对象', status: server.CustomCommandStatus.Failure };
		// 判断< 牵引目标 >数组是否真实可用
		if (!targets || targets.length == 0) return { message: '未能找到: 作为< 牵引目标 >的实体目标', status: server.CustomCommandStatus.Failure };
		// 判断触发器是否已禁用
		if (!opal.TriggerControl('使用自定义指令添加牵引力', self, 100)) return { message: '触发控制器已禁用本次指令执行', status: server.CustomCommandStatus.Failure };
		// 运行功能代码
		server.system.run(
			() => {
				/**
				 * 获取当前实体的出生点位置属性
				 */
				const createPlace = self.getDynamicProperty('entity:create_place') as server.Vector3;
				// 强制自我回到出生点上方
				self.teleport(createPlace)
				// 对目标实体施加牵引力
				targets.forEach(
					async entity => {
						// 判断< 牵引目标 >游戏对象是否真实可用
						if (!entity || !entity.isValid) return;
						/**
						 * 获取 牵引向量
						 */
						const vector = opal.Vector.copy(createPlace).subtract(entity.location).normalize.multiply(16);
						// 判断作为< 牵引目标 >的游戏对象是否是玩家
						if (entity instanceof server.Player) entity.onScreenDisplay.setActionBar([opal.translate(self), ' <- 正在牵引 -> ', opal.translate(entity)]);
						// 等待 20 帧
						await server.system.waitTicks(20);
						/**
						 * 获取当前实体的出生点上方位置属性
						 */
						const topmost = self.dimension.getTopmostBlock(vector.add(createPlace))?.above()?.location;
						// 判断当前实体的出生点上方是否存在方块
						if (topmost && entity && entity.isValid) entity.teleport(topmost, { dimension: self.dimension });
						// 播放音效
						entity.dimension.playSound('portal.trigger', entity.location);
					}
				)
			}
		);
		// 显示运行成功的消息
		return { message: '进行< 牵引 >的流程已完毕', status: server.CustomCommandStatus.Success };
	}
);
components.set(
	{
		description: '将实体送到与之签订契约的玩家附近',
		name: 'opal:apply_traction_to_player',
		permissionLevel: server.CommandPermissionLevel.Any,
		optionalParameters: [
			{
				name: '作为< 牵引目标 >的实体',
				type: server.CustomCommandParamType.EntitySelector
			}
		]
	},
	(source: server.CustomCommandOrigin, targets: server.Entity[] | undefined): server.CustomCommandResult => {
		/**
		 * 进行操作的实体
		 */
		const entity = targets && targets.length !== 0 ? targets[0] : source.sourceEntity;
		// 判断< 牵引目标 >数组是否真实可用
		if (!entity) return { message: '未能找到: 作为< 牵引目标 >的实体目标', status: server.CustomCommandStatus.Failure };
		// 判断触发器是否已禁用
		if (!opal.TriggerControl('将实体送到与之签订契约的玩家附近', entity, 100)) return { message: '触发控制器已禁用本次指令执行', status: server.CustomCommandStatus.Failure };
		// 运行功能代码
		customFunction.applyTractionToPlayer(entity);
		// 显示运行成功的消息
		return { message: '进行< 牵引 >的流程已完毕', status: server.CustomCommandStatus.Success };
	}
);
components.set(
	{
		description: '根据< 待机动画类型 >的不同, 执行播放语音, 寻找并食用蛋糕等行为',
		name: 'opal:execute_idle_action',
		permissionLevel: server.CommandPermissionLevel.Any,
		optionalParameters: [
			{
				name: '<§5§l 单目标生效 §r> 执行< 待机动作 >的实体 <§v§l 默认执行者自身 §r>',
				type: server.CustomCommandParamType.EntitySelector
			},
			{
				name: 'opal:实体待机动画类型',
				type: server.CustomCommandParamType.Enum
			}
		]
	},
	(source: server.CustomCommandOrigin, targets: server.Entity[] | undefined, type?: string): server.CustomCommandResult => {
		/**
		 * 进行操作的实体
		 */
		const entity = targets && targets.length !== 0 ? targets[0] : source.sourceEntity;
		// 玩家不存在则提前返回
		if (!entity || !entity.isValid) return { message: '未能找到: 执行动作的< 实体对象 >或<§u 玩家对象 §r>', status: server.CustomCommandStatus.Failure };
		// 运行功能代码
		customFunction.performActionInIdleState(entity, type || 'is_sitting');
		// 显示运行成功的消息
		return { message: '< 实体待机动作 >执行已完毕', status: server.CustomCommandStatus.Success }
	}
);
components.set(
	{
		description: '在实体阵亡时, 将其数据紧急保存并生成封印物品, 以便后续恢复或存档',
		name: 'opal:entity_death_preservation',
		permissionLevel: server.CommandPermissionLevel.Any,
		optionalParameters: [
			{
				name: '<§5§l 单目标生效 §r> 需要< 保存数据 >的实体 <§v§l 默认执行者自身 §r>',
				type: server.CustomCommandParamType.EntitySelector
			}
		]
	},
	(source: server.CustomCommandOrigin, targets: server.Entity[] | undefined): server.CustomCommandResult => {
		/**
		 * 进行操作的实体
		 */
		const entity = targets && targets.length !== 0 ? targets[0] : source.sourceEntity;
		// 实体不存在则提前返回
		if (!entity || !entity.isValid) return { message: '错误: 未找到需要保存数据的实体对象', status: server.CustomCommandStatus.Failure };
		// 运行功能代码
		customFunction.entityDeathPreservation(entity);
		// 显示运行成功的消息
		return { message: '实体数据已成功保存并生成封印物品', status: server.CustomCommandStatus.Success }
	}
);
components.set(
	{
		description: '卸载实体背包库存后, 销毁< 实体对象 >',
		name: 'opal:unload_inventory_destroy',
		permissionLevel: server.CommandPermissionLevel.Any,
		optionalParameters: [
			{
				name: '<§5§l 单目标生效 §r> 被< 卸载销毁 >的实体 <§v§l 默认执行者自身 §r>',
				type: server.CustomCommandParamType.EntitySelector
			}
		]
	},
	(source: server.CustomCommandOrigin, targets: server.Entity[] | undefined): server.CustomCommandResult => {
		/**
		 * 进行操作的实体
		 */
		const entity = targets && targets.length !== 0 ? targets[0] : source.sourceEntity;
		// 玩家不存在则提前返回
		if (!entity || !entity.isValid) return { message: '未能找到: 应当被销毁的< 实体对象 >', status: server.CustomCommandStatus.Failure };
		// 运行功能代码
		opal.UnloadInventoryAndDestroy(entity);
		// 显示运行成功的消息
		return { message: '< 卸载实体背包库存后销毁实体 >执行已完毕', status: server.CustomCommandStatus.Success }
	}
);
components.set(
	{
		description: '触发< 神恩领航者 >的台词播放管理系统',
		name: 'opal:voice_management_system',
		permissionLevel: server.CommandPermissionLevel.Any,
		optionalParameters: [
			{
				name: '<§5§l 单目标生效 §r> 继续< 台词播放 >的实体 <§v§l 默认执行者自身 §r>',
				type: server.CustomCommandParamType.EntitySelector
			},
			{
				name: '本次< 台词播放 >的< 分支类型 >',
				type: server.CustomCommandParamType.String
			},
		]
	},
	(source: server.CustomCommandOrigin, targets: server.Entity[] | undefined, type?: string): server.CustomCommandResult => {
		/**
		 * 进行操作的实体
		 */
		const entity = targets && targets.length !== 0 ? targets[0] : source.sourceEntity;
		// 玩家不存在则提前返回
		if (!entity || !entity.isValid) return { message: '未能找到: 发动本次< 台词播放 >的< 实体对象 >', status: server.CustomCommandStatus.Failure };
		// 运行功能代码
		customFunction.speechAndVoiceManager(entity, type || 'default');
		// 显示运行成功的消息
		return { message: '< 神恩领航者-台词播放 >执行已完毕', status: server.CustomCommandStatus.Success }
	}
);
components.set(
	{
		description: '触发< 隧龙掘进列车 >的< 列车行进事件 >',
		name: 'opal:tunnel_dragon_travel',
		permissionLevel: server.CommandPermissionLevel.Any,
		optionalParameters: [
			{
				name: '<§5§l 单目标生效 §r> 进行< 列车行进 >的实体 <§v§l 默认执行者自身 §r>',
				type: server.CustomCommandParamType.EntitySelector
			},
			{
				name: '本次< 列车行进 >的< 分支类型 >',
				type: server.CustomCommandParamType.String
			},
		]
	},
	(source: server.CustomCommandOrigin, targets: server.Entity[] | undefined, type?: string): server.CustomCommandResult => {
		/**
		 * 进行操作的实体
		 */
		const entity = targets && targets.length !== 0 ? targets[0] : source.sourceEntity;
		// 玩家不存在则提前返回
		if (!entity || !entity.isValid) return { message: '未能找到: 发动本次< 列车行进 >的< 实体对象 >', status: server.CustomCommandStatus.Failure };
		// 运行功能代码
		customFunction.tunnelDragonTravel(entity, type || 'default');
		// 显示运行成功的消息
		return { message: '< 隧龙掘进列车-列车行进 >执行已完毕', status: server.CustomCommandStatus.Success }
	}
);
components.set(
	{
		description: '触发< 神恩领航者 >的< 元素攻击事件 >',
		name: 'opal:divine_favor_attack',
		permissionLevel: server.CommandPermissionLevel.Any,
		optionalParameters: [
			{
				name: '<§5§l 单目标生效 §r> 发动< 元素攻击 >的实体 <§v§l 默认执行者自身 §r>',
				type: server.CustomCommandParamType.EntitySelector
			},
			{
				name: '本次< 元素攻击 >的< 分支类型 >',
				type: server.CustomCommandParamType.String
			},
		]
	},
	(source: server.CustomCommandOrigin, targets: server.Entity[] | undefined, type?: string): server.CustomCommandResult => {
		/**
		 * 进行操作的实体
		 */
		const entity = targets && targets.length !== 0 ? targets[0] : source.sourceEntity;
		// 玩家不存在则提前返回
		if (!entity || !entity.isValid) return { message: '未能找到: 发动本次< 元素攻击事件 >的< 实体对象 >', status: server.CustomCommandStatus.Failure };
		// 运行功能代码
		customFunction.divineFavorGirlAttack(entity, type || 'default');
		// 显示运行成功的消息
		return { message: '< 神恩领航者-元素攻击 >执行已完毕', status: server.CustomCommandStatus.Success }
	}
);
components.set(
	{
		description: '触发< 诸海渊鲸艇 >的< 元素攻击事件 >',
		name: 'opal:abyss_whale_attack',
		permissionLevel: server.CommandPermissionLevel.Any,
		optionalParameters: [
			{
				name: '<§5§l 单目标生效 §r> 发动< 元素攻击 >的实体 <§v§l 默认执行者自身 §r>',
				type: server.CustomCommandParamType.EntitySelector
			},
			{
				name: '本次< 元素攻击 >的< 分支类型 >',
				type: server.CustomCommandParamType.String
			},
		]
	},
	(source: server.CustomCommandOrigin, targets: server.Entity[] | undefined, type?: string): server.CustomCommandResult => {
		/**
		 * 进行操作的实体
		 */
		const entity = targets && targets.length !== 0 ? targets[0] : source.sourceEntity;
		// 玩家不存在则提前返回
		if (!entity || !entity.isValid) return { message: '未能找到: 发动本次< 元素攻击事件 >的< 实体对象 >', status: server.CustomCommandStatus.Failure };
		// 运行功能代码
		customFunction.machineWhaleAttack(entity, type || 'default');
		// 显示运行成功的消息
		return { message: '< 诸海渊鲸艇-元素攻击 >执行已完毕', status: server.CustomCommandStatus.Success }
	}
);
components.set(
	{
		description: '触发< 归忆蝰蛇炮 >的< 元素攻击事件 >',
		name: 'opal:viper_attack',
		permissionLevel: server.CommandPermissionLevel.Any,
		optionalParameters: [
			{
				name: '<§5§l 单目标生效 §r> 发动< 元素攻击 >的实体 <§v§l 默认执行者自身 §r>',
				type: server.CustomCommandParamType.EntitySelector
			},
			{
				name: '本次< 元素攻击 >的< 分支类型 >',
				type: server.CustomCommandParamType.String
			},
		]
	},
	(source: server.CustomCommandOrigin, targets: server.Entity[] | undefined, type?: string): server.CustomCommandResult => {
		/**
		 * 进行操作的实体
		 */
		const entity = targets && targets.length !== 0 ? targets[0] : source.sourceEntity;
		// 玩家不存在则提前返回
		if (!entity || !entity.isValid) return { message: '未能找到: 发动本次< 元素攻击事件 >的< 实体对象 >', status: server.CustomCommandStatus.Failure };
		// 运行功能代码
		customFunction.machineViperAttack(entity, type || 'default');
		// 显示运行成功的消息
		return { message: '< 归忆蝰蛇炮-元素攻击 >执行已完毕', status: server.CustomCommandStatus.Success }
	}
);
components.set(
	{
		description: '触发< 烛火野蜂群 >的< 元素攻击事件 >',
		name: 'opal:wild_bee_attack',
		permissionLevel: server.CommandPermissionLevel.Any,
		optionalParameters: [
			{
				name: '<§5§l 单目标生效 §r> 发动< 元素攻击 >的实体 <§v§l 默认执行者自身 §r>',
				type: server.CustomCommandParamType.EntitySelector
			},
			{
				name: '本次< 元素攻击 >的< 分支类型 >',
				type: server.CustomCommandParamType.String
			},
		]
	},
	(source: server.CustomCommandOrigin, targets: server.Entity[] | undefined, type?: string): server.CustomCommandResult => {
		/**
		 * 进行操作的实体
		 */
		const entity = targets && targets.length !== 0 ? targets[0] : source.sourceEntity;
		// 玩家不存在则提前返回
		if (!entity || !entity.isValid) return { message: '未能找到: 发动本次< 元素攻击事件 >的< 实体对象 >', status: server.CustomCommandStatus.Failure };
		// 运行功能代码
		customFunction.machineWaspAttack(entity, type || 'default');
		// 显示运行成功的消息
		return { message: '< 烛火野蜂群-元素攻击 >执行已完毕', status: server.CustomCommandStatus.Success }
	}
);
components.set(
	{
		description: '卸载实体背包库存, 并将其封装为特定物品, 用于存储实体数据, 支持自定义封装格式',
		name: 'opal:unload_package_inventory',
		permissionLevel: server.CommandPermissionLevel.Any,
		optionalParameters: [
			{
				name: '<§5§l 单目标生效 §r> 需要< 卸载库存 >的实体 <§v§l 默认执行者自身 §r>',
				type: server.CustomCommandParamType.EntitySelector
			},
			{
				name: '用于封装数据的<物品标识符>',
				type: server.CustomCommandParamType.String
			},
			{
				name: '自定义封装名称（可选）',
				type: server.CustomCommandParamType.String
			},
			{
				name: '自定义封装描述（可选）',
				type: server.CustomCommandParamType.String
			}
		]
	},
	(source: server.CustomCommandOrigin, targets: server.Entity[] | undefined, type?: string, customName?: string, customLore?: string): server.CustomCommandResult => {
		/**
		 * 进行操作的实体
		 */
		const entity = targets && targets.length !== 0 ? targets[0] : source.sourceEntity;
		// 实体不存在则提前返回
		if (!entity || !entity.isValid) return { message: '错误: 未找到需要卸载库存的实体对象', status: server.CustomCommandStatus.Failure };
		// 运行功能代码
		server.system.run(
			() => {
				const item = new server.ItemStack(type || 'minecraft:stone');
				/**
				 * 获取 玩家
				 */
				const player = server.world.getEntity(entity.getDynamicProperty('entity:contract_user') as string);
				/**
				 * 获取 玩家背包
				 */
				const container = player?.getComponent('inventory')?.container;
				// 卸载被选中的实体
				if (player) opal.UnloadInventoryAndPackage(entity, player as server.Player, item, customName || '§l§q概念封装§r - ', customLore ? [customLore] : []);
				// 删除 控制器物品
				if (container) opal.DeleteItemStack(container, new server.ItemStack('starry_map:mechanized_operation'));
			}
		);
		// 显示运行成功的消息
		return { message: '实体库存已成功卸载并封装为特定物品', status: server.CustomCommandStatus.Success };
	}
);
components.set(
	{
		description: '为实体随机装备武器、护腿和副手物品, 或清空其装备',
		name: 'opal:random_equip_or_clear',
		permissionLevel: server.CommandPermissionLevel.Any,
		optionalParameters: [
			{
				name: '<§5§l 单目标生效 §r> 执行< 装备变更 >的实体 <§v§l 默认执行者自身 §r>',
				type: server.CustomCommandParamType.EntitySelector
			}
		]
	},
	(source: server.CustomCommandOrigin, targets: server.Entity[] | undefined): server.CustomCommandResult => {
		/**
		 * 进行操作的实体
		 */
		const entity = targets && targets.length !== 0 ? targets[0] : source.sourceEntity;
		// 实体不存在则提前返回
		if (!entity || !entity.isValid) return { message: '错误: 未找到需要装备或清空装备的实体对象', status: server.CustomCommandStatus.Failure };
		// 运行功能代码
		customFunction.randomlyEquipOrClear(entity);
		// 显示运行成功的消息
		return { message: '实体装备已成功随机更新或清空', status: server.CustomCommandStatus.Success }
	}
);
components.set(
	{
		description: '为实体应用动力飞行, 使其能够根据玩家的视角方向和速度进行飞行',
		name: 'opal:apply_dynamic_flight',
		permissionLevel: server.CommandPermissionLevel.Any,
		optionalParameters: [
			{
				name: '<§5§l 单目标生效 §r> 应用< 动力飞行 >的实体 <§v§l 默认执行者自身 §r>',
				type: server.CustomCommandParamType.EntitySelector
			},
			{
				name: '飞行的<速度>（默认为2）',
				type: server.CustomCommandParamType.Float
			}
		]
	},
	(source: server.CustomCommandOrigin, targets: server.Entity[] | undefined, speed?: number): server.CustomCommandResult => {
		/**
		 * 进行操作的实体
		 */
		const entity = targets && targets.length !== 0 ? targets[0] : source.sourceEntity;
		// 实体不存在则提前返回
		if (!entity || !entity.isValid) return { message: '错误: 未找到需要应用动力飞行的实体对象', status: server.CustomCommandStatus.Failure };
		// 运行功能代码
		customFunction.applyDynamicFlightToEntity(entity, speed || 2);
		// 显示运行成功的消息
		return { message: '动力飞行已成功应用于实体', status: server.CustomCommandStatus.Success };
	}
);
components.set(
	{
		description: '将实体与玩家绑定, 以便玩家可以控制实体的动力飞行',
		name: 'opal:binding_dynamic_flight',
		permissionLevel: server.CommandPermissionLevel.Any,
		optionalParameters: [
			{
				name: '<§5§l 单目标生效 §r> 绑定< 动力飞行 >的实体 <§v§l 默认执行者自身 §r>',
				type: server.CustomCommandParamType.EntitySelector
			}
		]
	},
	(source: server.CustomCommandOrigin, targets: server.Entity[] | undefined): server.CustomCommandResult => {
		/**
		 * 进行操作的实体
		 */
		const entity = targets && targets.length !== 0 ? targets[0] : source.sourceEntity;
		// 实体不存在则提前返回
		if (!entity || !entity.isValid) return { message: '错误: 未找到需要绑定动力飞行的实体对象', status: server.CustomCommandStatus.Failure };
		// 运行功能代码
		customFunction.dynamicFlightToBinding(entity);
		// 显示运行成功的消息
		return { message: '动力飞行绑定已成功应用于实体', status: server.CustomCommandStatus.Success };
	}
);
components.set(
	{
		description: '解除实体与玩家的动力飞行绑定, 停止控制实体的飞行',
		name: 'opal:separate_dynamic_flight',
		permissionLevel: server.CommandPermissionLevel.Any,
		optionalParameters: [
			{
				name: '<§5§l 单目标生效 §r> 解除< 飞行绑定 >的实体 <§v§l 默认执行者自身 §r>',
				type: server.CustomCommandParamType.EntitySelector
			}
		]
	},
	(source: server.CustomCommandOrigin, targets: server.Entity[] | undefined): server.CustomCommandResult => {
		/**
		 * 进行操作的实体
		 */
		const entity = targets && targets.length !== 0 ? targets[0] : source.sourceEntity;
		// 实体不存在则提前返回
		if (!entity || !entity.isValid) return { message: '错误: 未找到需要解除动力飞行绑定的实体对象', status: server.CustomCommandStatus.Failure };
		// 运行功能代码
		customFunction.dynamicFlightToSeparate(entity);
		// 显示运行成功的消息
		return { message: '动力飞行绑定已成功解除', status: server.CustomCommandStatus.Success };
	}
);
components.set(
	{
		description: '展示月华百科交互窗口, 允许玩家选择百科查询、知识库目录和技能库目录功能',
		name: 'opal:lexicon_windowed_interface',
		permissionLevel: server.CommandPermissionLevel.Any,
		optionalParameters: [
			{
				name: '<§5§l 单目标生效 §r> 执行< 显示界面 >的玩家 <§v§l 默认执行者自身 §r>',
				type: server.CustomCommandParamType.PlayerSelector
			}
		]
	},
	(source: server.CustomCommandOrigin, targets: server.Entity[] | undefined): server.CustomCommandResult => {
		/**
		 * 进行操作的实体
		 */
		const player = targets && targets.length !== 0 ? targets[0] : source.sourceEntity;
		// 玩家不存在则提前返回
		if (!player || !player.isValid || !(player instanceof server.Player)) return { message: '错误: 未找到有效目标玩家', status: server.CustomCommandStatus.Failure };
		// 运行功能代码
		opal.lexiconWindowedInterface(player);
		// 显示运行成功的消息
		return { message: '已打开月华百科交互窗口', status: server.CustomCommandStatus.Success }
	}
);
components.set(
	{
		description: '展示琉璃计划任务界面, 允许玩家查看并完成限定任务获取奖励',
		name: 'opal:crystal_mission_book',
		permissionLevel: server.CommandPermissionLevel.Any,
		optionalParameters: [
			{
				name: '<§5§l 单目标生效 §r> 执行< 显示界面 >的玩家 <§v§l 默认执行者自身 §r>',
				type: server.CustomCommandParamType.PlayerSelector
			}
		]
	},
	(source: server.CustomCommandOrigin, targets: server.Entity[] | undefined): server.CustomCommandResult => {
		/**
		 * 进行操作的实体
		 */
		const player = targets && targets.length !== 0 ? targets[0] : source.sourceEntity;
		// 玩家不存在则提前返回
		if (!player || !player.isValid || !(player instanceof server.Player)) return { message: '错误: 未找到有效目标玩家', status: server.CustomCommandStatus.Failure };
		// 运行功能代码
		customFunction.exchangeForm(player, { text: "§9《§u§l 琉璃计划 §9》§r" }, trophy);
		// 显示运行成功的消息
		return { message: '已打开琉璃计划任务界面', status: server.CustomCommandStatus.Success }
	}
);
components.set(
	{
		description: '打开源海百货交易界面, 允许玩家使用物品兑换稀有商品',
		name: 'opal:ocean_department_store',
		permissionLevel: server.CommandPermissionLevel.Any,
		optionalParameters: [
			{
				name: '<§5§l 单目标生效 §r> 执行< 显示界面 >的玩家 <§v§l 默认执行者自身 §r>',
				type: server.CustomCommandParamType.PlayerSelector
			}
		]
	},
	(source: server.CustomCommandOrigin, targets: server.Entity[] | undefined): server.CustomCommandResult => {
		/**
		 * 进行操作的实体
		 */
		const player = targets && targets.length !== 0 ? targets[0] : source.sourceEntity;
		// 玩家不存在则提前返回
		if (!player || !player.isValid || !(player instanceof server.Player)) return { message: '错误: 未找到有效目标玩家', status: server.CustomCommandStatus.Failure };
		// 运行功能代码
		customFunction.exchangeForm(player, { text: "§9《§u§l 源海百货 §9》§r" }, trading);
		// 显示运行成功的消息
		return { message: '已打开源海百货交易界面', status: server.CustomCommandStatus.Success }
	}
);
components.set(
	{
		description: '设定元素伤害的最大值与最小值',
		name: 'opal:set_elemental_damage_bounds',
		permissionLevel: server.CommandPermissionLevel.Any,
		mandatoryParameters: [
			{
				name: '<§5§l 单目标生效 §r> 执行< 数值限定 >的玩家 <§v§l 默认执行者自身 §r>',
				type: server.CustomCommandParamType.PlayerSelector
			},
			{
				name: '元素伤害的最大值',
				type: server.CustomCommandParamType.Float
			},
			{
				name: '元素伤害的最小值',
				type: server.CustomCommandParamType.Float
			}
		]
	},
	(source: server.CustomCommandOrigin, targets: server.Entity[], max: number, min: number): server.CustomCommandResult => {
		/**
		 * 进行操作的实体
		 */
		const player = targets.length !== 0 ? targets[0] : source.sourceEntity;
		// 玩家不存在则提前返回
		if (!player || !player.isValid || !(player instanceof server.Player)) return { message: '错误: 未找到有效目标玩家', status: server.CustomCommandStatus.Failure };
		// 判断数值设定
		if (min >= max) return { message: '错误: 最大值必须大于最小值', status: server.CustomCommandStatus.Failure };
		// 判断玩家权限
		if (!opal.isPlayerAuthorized(player)) return { message: '错误: 玩家没有权限执行此指令', status: server.CustomCommandStatus.Failure };
		// 运行功能代码
		server.system.run(
			() => {
				server.world.setDynamicProperty('rune_hurt:max_damage', max);
				server.world.setDynamicProperty('rune_hurt:min_damage', min);
			}
		)
		// 显示运行成功的消息
		return { message: '元素伤害有效值限制已重置', status: server.CustomCommandStatus.Success }
	}
);
components.set(
	{
		description: '使用界面查询目标并施加元素伤害',
		name: 'opal:apply_elemental_damage',
		permissionLevel: server.CommandPermissionLevel.Any,
		mandatoryParameters: [
			{
				name: '<§5§l 单目标生效 §r> 执行< 元素伤害 >的玩家 <§v§l 默认执行者自身 §r>',
				type: server.CustomCommandParamType.PlayerSelector
			},
			{
				name: 'opal:元素属性类型',
				type: server.CustomCommandParamType.Enum
			},
			{
				name: '元素伤害的追加值',
				type: server.CustomCommandParamType.Float
			}
		]
	},
	(source: server.CustomCommandOrigin, targets: server.Entity[], type: string, damage: number): server.CustomCommandResult => {
		/**
		 * 进行操作的实体
		 */
		const player = targets.length !== 0 ? targets[0] : source.sourceEntity;
		// 玩家不存在则提前返回
		if (!player || !player.isValid || !(player instanceof server.Player)) return { message: '错误: 未找到有效目标玩家', status: server.CustomCommandStatus.Failure };
		// 判断数值设定
		if (damage <= 0) return { message: '错误: 数据值定义不符合预期', status: server.CustomCommandStatus.Failure };
		// 判断玩家权限
		if (!opal.isPlayerAuthorized(player)) return { message: '错误: 玩家没有权限执行此指令', status: server.CustomCommandStatus.Failure };
		// 运行功能代码
		server.system.run(
			() => {
				/**
				 * 合并玩家当前属性与新增伤害值
				 */
				const property = opal.MergeProperty(opal.GetProperty(player), { raise_basic_attack: damage, 'self_rune': type as type.RUNE_TYPE });
				/**
				 * 判断是否触发暴击
				 */
				const erupt = opal.IsErupt(player);
				/**
				 * 设置查询参数, 排除特定类型和家族的实体
				 */
				const options: server.EntityQueryOptions = {
					excludeTypes: ["minecraft:item", "minecraft:xp_orb", player.typeId],
					excludeFamilies: ['starry']
				};
				/**
				 * 计算玩家与实体的距离
				 */
				const Distance = (entity: server.Entity) => Math.floor(opal.Vector.distance(player.location, entity.location));
				/**
				 * 获取排序后的实体队列
				 */
				const queue = opal.EntitysSort(player.dimension, options, (a, b) => Distance(a) - Distance(b), entity => !entity.getComponent('minecraft:is_tamed'));
				/**
				 * 定义窗口界面标题
				 */
				const title: server.RawMessage = {
					text: "§9<§u§l 元素攻击 §9>§r§9操作界面"
				};
				/**
				 * 定义窗口界面表单对象
				 */
				const display = new serverUI.ActionFormData().title(title);
				// 遍历实体队列并加入按钮
				if (queue.length >= 1) queue.forEach(entity => display.button(opal.DistanceAndName(entity, Distance(entity))));
				else display.button('§4§l不存在 §c<§9 可以§6<§u 选中 §6>§9的实体 §c>§r');
				// 显示窗口界面
				display.show(player).then(
					option => {
						// 检测玩家是否选择了实体
						if (option.selection == undefined || queue.length == 0) return;
						/**
						 * 获取目标对象
						 */
						const target = queue[option.selection];
						/**
						 * 应用元素攻击
						 */
						opal.ElementalAttack(player, target, erupt, property);
					}
				);
			}
		)
		// 显示运行成功的消息
		return { message: '元素伤害已施加', status: server.CustomCommandStatus.Success }
	}
);
components.set(
	{
		description: '修改游戏内部分结构的生成限制',
		name: 'opal:modify_structural_restrictions',
		permissionLevel: server.CommandPermissionLevel.Any,
		mandatoryParameters: [
			{
				name: '<§5§l 单目标生效 §r> 执行< 显示界面 >的玩家 <§v§l 默认执行者自身 §r>',
				type: server.CustomCommandParamType.PlayerSelector
			},
			{
				name: 'opal:模组扩展结构',
				type: server.CustomCommandParamType.Enum
			},
			{
				name: '是否运行结构再次生成',
				type: server.CustomCommandParamType.Boolean
			},
		]
	},
	(source: server.CustomCommandOrigin, targets: server.Entity[], type: string, value: boolean): server.CustomCommandResult => {
		/**
		 * 进行操作的实体
		 */
		const player = targets.length !== 0 ? targets[0] : source.sourceEntity;
		// 玩家不存在则提前返回
		if (!player || !player.isValid || !(player instanceof server.Player)) return { message: '错误: 未找到有效目标玩家', status: server.CustomCommandStatus.Failure };
		// 判断玩家权限
		if (!opal.isPlayerAuthorized(player)) return { message: '错误: 玩家没有权限执行此指令', status: server.CustomCommandStatus.Failure };
		// 运行功能代码
		server.world.setDynamicProperty('game_rules:regenerate.' + type, value);
		// 显示运行成功的消息
		return { message: '结构生成限制已修改', status: server.CustomCommandStatus.Success }
	}
);
components.set(
	{
		description: '查询并记录原版生物群系的坐标',
		name: 'opal:record_biome_location',
		permissionLevel: server.CommandPermissionLevel.Any,
		mandatoryParameters: [
			{
				name: '<§5§l 单目标生效 §r> 查询群系的玩家 <§v§l 默认执行者自身 §r>',
				type: server.CustomCommandParamType.PlayerSelector
			},
			{
				name: 'opal:原版生物群系',
				type: server.CustomCommandParamType.Enum
			}
		]
	},
	(source: server.CustomCommandOrigin, targets: server.Entity[], type: string): server.CustomCommandResult | undefined => {
		/**
		 * 进行操作的实体
		 */
		const player = targets && targets.length !== 0 ? targets[0] : source.sourceEntity;
		// 玩家不存在则提前返回
		if (!player || !player.isValid || !(player instanceof server.Player)) return { message: '错误: 未找到有效目标玩家', status: server.CustomCommandStatus.Failure };
		/**
		 * 获取玩家当前维度
		 */
		const dimension = player.dimension;
		// 运行功能代码
		server.system.run(
			() => {
				/**
				 * 查找生态群系坐标
				 */
				const biomeLocation = dimension.findClosestBiome(player.location, type);
				// 如果找到生态群系, 生成反馈消息并添加传送锚点
				if (biomeLocation) {
					/**
					 * 反馈消息
					 */
					const feedback: server.RawMessage[] = [
						{ text: '-=-=-=-=-=-=-=-=-=-=-=-=-=-=\n' },
						{ text: `§n生态群系§r :§u§l ${type}§r\n\n` },
						{ text: `§q群系坐标§r :§s§l ${opal.Vector.toString(biomeLocation)}§r\n\n` },
						{ text: '已为你添加传送锚点! \n' },
						{ text: '-=-=-=-=-=-=-=-=-=-=-=-=-=-=\n\n' },
					];
					/**
					 * 保存锚点信息
					 */
					const anchor = JSON.stringify({ location: opal.Vector.floor(biomeLocation), dimension: dimension.id });
					// 添加锚点信息
					player.setDynamicProperty('road_sign:' + type, anchor);
					// 显示反馈消息
					player.sendMessage(feedback);
				}
				else player.sendMessage("未找到指定生物群系");
			}
		)
	}
);
components.set(
	{
		description: '创建一个指向特定维度与坐标的雾海裂隙',
		name: 'opal:create_misty_sea_fissure',
		permissionLevel: server.CommandPermissionLevel.Any,
		mandatoryParameters: [
			{
				name: '<§5§l 单目标生效 §r> 查询群系的玩家 <§v§l 默认执行者自身 §r>',
				type: server.CustomCommandParamType.PlayerSelector
			},
			{
				name: '雾海裂隙所指向的坐标',
				type: server.CustomCommandParamType.Location
			},
			{
				name: 'opal:原版世界维度',
				type: server.CustomCommandParamType.Enum
			}
		]
	},
	(source: server.CustomCommandOrigin, targets: server.Entity[], location: server.Vector3, dimension: string): server.CustomCommandResult | undefined => {
		/**
		 * 进行操作的实体
		 */
		const player = targets.length !== 0 ? targets[0] : source.sourceEntity;
		// 玩家不存在则提前返回
		if (!player || !player.isValid || !(player instanceof server.Player)) return { message: '错误: 未找到有效目标玩家', status: server.CustomCommandStatus.Failure };
		// 判断玩家权限
		if (!opal.isPlayerAuthorized(player)) return { message: '错误: 玩家没有权限执行此指令', status: server.CustomCommandStatus.Failure };
		/**
		 * 坐标组
		 */
		const location_group = [player.getHeadLocation(), location];
		/**
		 * 维度组
		 */
		const dimension_group = [player.dimension, server.world.getDimension(dimension) || player.dimension];
		/**
		 * 源坐标
		 */
		const intel = { location: player.getHeadLocation(), dimension: player.dimension };
		// 播放声音效果
		server.system.runTimeout(() => player.playSound("ambient.weather.thunder"), 100);
		server.system.runTimeout(() => player.playSound("ambient.weather.thunder"), 10);
		// 显示数字粒子效果
		server.system.runTimeout(() => opal.NumberParticleDisplay(intel, 4, opal.Vector.CONSTANT_ZERO), 15);
		server.system.runTimeout(() => opal.NumberParticleDisplay(intel, 3, opal.Vector.CONSTANT_ZERO), 35);
		server.system.runTimeout(() => opal.NumberParticleDisplay(intel, 2, opal.Vector.CONSTANT_ZERO), 55);
		server.system.runTimeout(() => opal.NumberParticleDisplay(intel, 1, opal.Vector.CONSTANT_ZERO), 75);
		server.system.runTimeout(() => opal.NumberParticleDisplay(intel, 0, opal.Vector.CONSTANT_ZERO), 95);
		// 创建 雾海裂隙
		server.system.runTimeout(() => opal.MistySeaFissure.BriefCreate(player.id, { locations: location_group, dimensions: dimension_group }), 80);
		// 显示运行成功的消息
		return { message: '雾海裂隙已创建', status: server.CustomCommandStatus.Success }
	}
);
// TODO 导出自定义指令
export default components;
// TODO 实现自定义指令