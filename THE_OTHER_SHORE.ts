/*
 * 原版接口
 */
import * as server from "@minecraft/server";
/*
 * 系统数据
 */
import help from "./data/help";
/*
 * 系统组件
 */
import * as opal from "./system/opal";
import * as table from "./data/table";
/*
 * 方块组件
 */
import interact_component from "./block/interact_component";
import destroy_component from "./block/destroy_component";
import update_component from "./block/update_component";
import place_component from "./block/place_component";
import tick_component from "./block/tick_component";
import step_component from "./block/step_component";
/*
 * 物品组件
 */
import literature_component from "./item/literature_component";
import delicacies_component from "./item/delicacies_component";
import equipment_component from "./item/equipment_component";
import authority_component from "./item/authority_component";
import armament_component from "./item/armament_component";
import voucher_component from "./item/voucher_component";
import tool_component from "./item/tool_component";
import prop_component from "./item/prop_component";
/*
 * 物品特例组件
 */
import { magicCrystalHammer, magicCrystalKey } from "./item/tool_component";
import { containerSorting } from "./item/authority_component";
import { magicHandbook } from "./item/literature_component";
import { obtainBlock } from "./item/prop_component";
/*
 * 实体组件
 */
import * as entity_subject from "./entity/subject";
import custom_command from "./command/custom_command";
import custom_enum from "./command/custom_enum";
/*
 * < 世界 > 初始化前 事件
 */
server.system.beforeEvents.startup.subscribe(
	data => {
		/**
		 * 方块自定义组件的映射集合
		 */
		const blockComponents = new Map<string, server.BlockCustomComponent>(
			[
				...place_component,
				...destroy_component,
				...step_component,
				...tick_component,
				...interact_component,
			]
		);
		/**
		 * 物品自定义组件的映射集合
		 */
		const itemComponents = new Map<string, server.ItemCustomComponent>(
			[
				...tool_component,
				...literature_component,
				...authority_component,
				...prop_component,
				...armament_component,
				...voucher_component,
				...delicacies_component,
			]
		);
		/**
		 * 方块自定义组件实例数组
		 */
		const blockCustoms = [...blockComponents.values()];
		/**
		 * 方块自定义组件名称数组
		 */
		const blockNames = [...blockComponents.keys()];
		/**
		 * 物品自定义组件实例数组
		 */
		const itemCustoms = [...itemComponents.values()];
		/**
		 * 物品自定义组件名称数组
		 */
		const itemNames = [...itemComponents.keys()];
		/**
		 * 自定义指令的映射集合
		 */
		const customCommands = [...custom_command.keys()];
		/**
		 * 自定义指令回调函数数组
		 */
		const commandCallbacks = [...custom_command.values()];
		/**
		 * 自定义指令的枚举映射集合
		 */
		const enumName = [...custom_enum.keys()];
		/**
		 * 自定义指令枚举值数组
		 */
		const enumValues = [...custom_enum.values()];
		// === 方块自定义组件注册 ===
		for (let blockIndex = 0; blockIndex < blockCustoms.length; blockIndex++)data.blockComponentRegistry.registerCustomComponent(blockNames[blockIndex], blockCustoms[blockIndex]);
		// === 物品自定义组件注册 ===
		for (let itemIndex = 0; itemIndex < itemCustoms.length; itemIndex++) data.itemComponentRegistry.registerCustomComponent(itemNames[itemIndex], itemCustoms[itemIndex]);
		// === 自定义指令枚举值注册 ===
		for (let enumIndex = 0; enumIndex < enumName.length; enumIndex++) data.customCommandRegistry.registerEnum(enumName[enumIndex], enumValues[enumIndex]);
		// === 自定义指令注册 ===
		for (let cmdIndex = 0; cmdIndex < commandCallbacks.length; cmdIndex++) data.customCommandRegistry.registerCommand(customCommands[cmdIndex], commandCallbacks[cmdIndex]);
	}
);
/*
 * < 世界 > 初始化后 事件
 */
server.world.afterEvents.worldLoad.subscribe(
	async () => {
		/*
		 * 注册 基础程序容器
		 */
		equipment_component.BriefCreate('世界初始化容器');
		// 在月华百科中导入知识库
		opal.material.push(...help);
	}
);
/*
 * < 世界 > 聊天发送后 事件
 */
server.world.afterEvents.chatSend.subscribe(data => opal.manageChatResponses(data.sender, data.message));
/*
 * < 实体 > 生成后 事件
 */
server.world.afterEvents.entitySpawn.subscribe(
	data => {
		/**
		 * * 获取 发起事件 的 实体
		 */
		const entity = data.entity;
		// 验证实体是否有效
		if (entity && !entity.isValid) return;
		/**
		 * * 生命值组件
		 */
		const health = entity.getComponent('health');
		// 验证实体血量是否达标
		if (!health || health.currentValue <= 5) return;
		// 验证实体是否已经初始化
		if (entity.getDynamicProperty('entity:is_initial')) return;
		// 添加数据
		opal.CreateProperty(entity, table.battle_property.get(entity.typeId));
		// 记录实体生成位置
		entity.setDynamicProperty('entity:create_place', entity.location);
		// 标记实体已初始化
		entity.setDynamicProperty('entity:is_initial', true);
	}
);
/*
 * < 玩家 > 生成后 事件
 */
server.world.afterEvents.playerSpawn.subscribe(
	data => {
		/**
		 * * 获取 当前玩家 是否 初次生成
		 */
		const initial = data.initialSpawn;
		/**
		 * * 获取 玩家对象
		 */
		const player = data.player;
		// 验证玩家是否有初始化 并 尝试刷新 超级野蜂袭击
		if (!initial || player.getDynamicProperty('entity:is_initial')) return;
		/**
		 * * 玩家出生点
		 */
		const anchor = {
			location: opal.Vector.floor(player.location),
			dimension: player.dimension.id
		};
		/**
		 * * 获取主世界维度
		 */
		const overworldDimension = server.world.getDimension('minecraft:overworld');
		// 记录 出生点 并 赋予属性
		player.setDynamicProperty('road_sign:出生点', JSON.stringify(anchor));
		opal.CreateProperty(player, { self_rune: 'rune_void' });
		player.setDynamicProperty('entity:is_initial', true);
		// 尝试创建附加结构
		server.system.runTimeout(() => player.addEffect('minecraft:darkness', 120, { amplifier: 0, showParticles: false }), 240);
		server.system.runTimeout(() => player.onScreenDisplay.setTitle('§4警告! 空间乱流! 警惕<野蜂>!'), 320);
		server.system.runTimeout(() => entity_subject.EnterVacantSpaceWaspTower(player), 360);
		// 播放音效
		server.system.runTimeout(() => player.playSound('ambient.weather.thunder'), 340);
		server.system.runTimeout(() => player.playSound('ambient.weather.thunder'), 240);
		// 重新设置世界规则
		entity_subject.ReviseWorldRules(overworldDimension);
	}
);
/*
 * < 实体 > 生命值变化后 事件
 */
server.world.afterEvents.entityHealthChanged.subscribe(
	data => {
		/**
		 * * 获取 实体
		 */
		const entity = data.entity;
		/**
		 * * 伤害 的 数值
		 */
		const value = data.oldValue - data.newValue;
		// 显示生命值变化
		entity_subject.HealthAlterDisplay(entity, Math.ceil(value));
	}
);
/*
 * < 实体 > 遭遇攻击后 事件
 */
server.world.afterEvents.entityHurt.subscribe(
	data => {
		/**
		 * * 被攻击 的 实体
		 */
		const target = data.hurtEntity;
		/**
		 * * 伤害 的 来源
		 */
		const source = data.damageSource;
		/**
		 * * 获取 袭击者
		 */
		const entity = source.damagingEntity;
		// 验证实体是否有效
		if (!entity || !target || !entity.isValid || !target.isValid) return;
		// 执行 玩家发动攻击后 事件
		entity_subject.PlayersLaunchAttacks(target, source, entity);
		// 执行 实体遭受攻击后 事件
		entity_subject.EntityUnderAttack(target, source, entity, data.damage);
		// 执行 玩家遭受攻击后 事件
		entity_subject.PlayersUnderAttack(target, entity);
	}
);
/*
 * < 实体 > 死亡后 事件
 */
server.world.afterEvents.entityDie.subscribe(
	data => {
		/**
		 * * 获取 死亡的 实体
		 */
		const self = data.deadEntity;
		/**
		 * * 获取 伤害 的 来源
		 */
		const source = data.damageSource;
		/**
		 * * 获取 击杀者
		 */
		const target = source.damagingEntity;
		// 验证实体是否有效
		if (!target || !target.isValid || !self || !self.isValid || !self.hasComponent('minecraft:health')) return;
		// 死亡后发放奖励
		entity_subject.createRewardsAfterDeath(self, target);
		// 执行 死亡机制
		entity_subject.FunctionsPerformedAfterDeath(self, target);
	}
);
/*
 * < 玩家 > 攻击方块后 事件
 */
server.world.afterEvents.entityHitBlock.subscribe(
	data => {
		/**
		 * * 获取 玩家对象
		 */
		const player = data.damagingEntity;
		if (!(player instanceof server.Player)) return;
		/**
		 * * 获取 物品对象
		 */
		const item = player.getComponent('inventory')?.container?.getItem(player.selectedSlotIndex);
		/**
		 * * 获取 方块对象
		 */
		const block = data.hitBlock;
		/**
		 * * 获取 玩家 的 背包
		 */
		const container = player.getComponent('minecraft:inventory')?.container;
		/**
		 * * 获取 控制事件触发器
		 */
		const token = opal.TriggerControl;
		// 物品类型
		if (container) switch (item?.typeId) {
			case 'starry_map:material_sorting':
				if (token('物资整理', player, 20)) containerSorting(player, block);
				break;
			case 'starry_map:obtain_block':
				if (token('获取方块', player, 5)) obtainBlock(player, container, block);
				break
			case 'starry_map:magic_crystal_hammer':
				if (token('魔晶锤子', player, 20)) magicCrystalHammer(player, item, container, block);
				break;
			case 'starry_map:magic_crystal_key':
				if (token('魔晶钥匙', player, 20)) magicCrystalKey(player, item, container, block);
				break;
			case 'starry_map:magic_handbook':
				if (token('魔导手册', player, 20)) magicHandbook(player, item, block);
				break;

			default: break;
		};
	}
);
/*
 * < 世界 > 天气变化后 事件
 */
server.world.afterEvents.weatherChange.subscribe(
	() => {
		// 尝试 按计划生成 实体
		entity_subject.GenerateOnSchedule('starry_map:guide.jasmine', 23, { text: '§c§l< 警惕 琥珀与茉莉 靠近 > !!!§r' }, 'portal.trigger');
		entity_subject.GenerateOnSchedule('starry_map:wild_bee.guide', 30, { text: '§c§l< 遭遇成建制的 野蜂机群 袭击 > !!!§r' }, 'portal.trigger');
		entity_subject.GenerateOnSchedule('starry_map:guide.windnews', 40, { text: '矿石商人-风信 出现了' }, 'portal.trigger');
	}
);
/*
 * < 方块 > 更新后 事件
 */
server.world.afterEvents.playerBreakBlock.subscribe(data => update_component(data.block));
server.world.afterEvents.playerPlaceBlock.subscribe(data => update_component(data.block));
/*
 * < 玩家 > 破坏方块后 事件
 */
server.world.afterEvents.playerBreakBlock.subscribe(
	data => {
		/**
		 * * 挖掘方块 的 玩家
		 */
		const player = data.player;
		/**
		 * * 区块连锁 状态
		 */
		const type = player.getDynamicProperty('block_chain:type') as string | undefined;
		// 当玩家破坏方块时 触发 区块连锁 事件
		if (type && opal.TriggerControl('区块连锁', player, 20)) entity_subject.BlockChainEvent(data, type);
	}
);