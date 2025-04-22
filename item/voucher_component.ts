/*
 * 原版接口
 */
import * as serverUI from "@minecraft/server-ui";
import * as server from "@minecraft/server";
/*
 * 系统组件
 */
import * as opal from "../system/opal";
import * as table from "../data/table";
import * as type from "../data/type";
/**
 * * 组件前缀代词
 */
const componentPrefix = 'opal:item.';
/**
 * * 物品自定义组件列表
 */
const components = new Map<string, server.ItemCustomComponent>();
/*
 * 百灵绘卷
 */
components.set(componentPrefix + 'chorus_picture',
	{
		onUse(source) {
			/**
			 * * 触发自定义组件的玩家
			 */
			const player = source.source;
			/**
			 * * 触发自定义组件的物品
			 */
			const item = source.itemStack;
			/**
			 * * 玩家背包
			 */
			const container = player.getComponent('inventory')?.container;
			// 判断条件是否满足
			if (!container || !player || !item) return;
			// 判断是否冷却完成
			if (!opal.TriggerControl(item.typeId, player, 140)) return;
			/**
			 * * 检测 当前高度
			 */
			const testHeight = player.location.y < player.dimension.heightRange.min + 32;
			/**
			 * * 判断 是否执行过 初始召唤
			 */
			const rule = player.getDynamicProperty('entity:house_create_after') ?? false;
			/**
			 * * 解析 权重信息
			 */
			const analysis = opal.AnalysisWeight(table.chorus_call_role).output;
			// 检测当前高度是否可用
			if (testHeight) return player.sendMessage([opal.translate(player), { text: ' -> 当前高度不足, 无法使用<§l§9 百灵绘卷 §r>' }]);
			// 播放 召唤动画
			opal.CompleteSummonAnimation(player, player.getHeadLocation());
			// 清除 物品
			container?.setItem(player.selectedSlotIndex);
			// 执行初始化生成
			if (!rule) return initialSummoning(player);
			// 召唤 随机角色
			server.system.runTimeout(() => randomCallRole(player, analysis), 40);
			// 发送 信息
			opal.IntelMessage(player, 5, '新的伙伴已经出现, 快使用§9[§n§l 精灵结契 §r§9]§r与§9[§6 领航者 §9]§r缔结属于你们的§9[§u 契约 §9]§r吧!!');
		}
	}
);
/**
 * * 生成 初始角色
 */
function initialSummoning(player: server.Player) {
	/**
	 * * 定义 队列信息
	 */
	const queue = ['starry_map:guide.crystal', 'starry_map:guide.moon_light', 'starry_map:execute.roaring'];
	// 召唤 琉璃 月华 啸天
	server.system.runTimeout(() => appointCallRole(player, queue), 8);
	// 设置 已经 完成初始化生成
	player.setDynamicProperty('entity:house_create_after', true);
	// 显示 引导提示
	opal.PlayPrompt(player, "召唤星辉雅居");
	// 召唤 星辉雅居
	starlightHouse(player);
};
/**
 * * 创建 星辉雅居
 *
 * @param {server.Player} player - 触发事件的玩家
 */
function starlightHouse(player: server.Player) {
	/**
	 * * 获取 游戏规则
	 */
	const rule = server.world.getDynamicProperty('game_rules:regenerate.starlight_house') ?? true;
	/**
	 * * 定义 坐标基准点
	 */
	const reference = opal.Vector.add(player.location, { x: -13, y: -15, z: -13 });
	/**
	 * * 读取 建筑结构
	 */
	const template = server.world.structureManager.get('mystructure:starlight_house');
	// 判断是否生成结构
	if (rule === false) return emergencyPlan(player);
	// 检测 建筑结构
	if (!template) return player.sendMessage([opal.translate(player), { text: ' -> 未能获取到<§l§9 星辉雅居 §r>的结构数据文件' }]);
	// 预填充空间
	opal.TryFillBlocks(player.dimension, reference, opal.Vector.add(reference, { x: 24, y: 24, z: 24 }), 'minecraft:white_stained_glass');
	// 加载 建筑结构
	server.system.runTimeout(() => server.world.structureManager.place(template, player.dimension, reference), 2);
	// 移动 玩家位置
	server.system.runTimeout(() => player.applyKnockback({ x: (Math.random() * 2) - 1, z: (Math.random() * 2) }, -1), 4);
	// 设置 游戏规则
	if (rule == true) server.world.setDynamicProperty('game_rules:regenerate.starlight_house', false);
};
/**
 * * 紧急物资补偿计划
 *
 * @param {server.Player} player - 接收补偿物资的玩家对象
 */
function emergencyPlan(player: server.Player) {
	/**
	 * * 补偿物资列表
	 */
	const subsidy: server.ItemStack[] = [
		new server.ItemStack('starry_map:magic_crystal_pickaxe'),
		new server.ItemStack('starry_map:magic_crystal_screwdriver'),
		new server.ItemStack('starry_map:magic_crystal_shield'),
		new server.ItemStack('starry_map:magic_crystal_hammer'),
		new server.ItemStack('starry_map:magic_crystal_wrench'),
		new server.ItemStack('starry_map:magic_crystal_key'),
		new server.ItemStack('starry_map:magic_crystal_bow'),
		new server.ItemStack('starry_map:magic_crystal_claw'),
		new server.ItemStack('starry_map:magic_handbook'),
		new server.ItemStack('starry_map:faerie_healing'),
		new server.ItemStack('starry_map:exhausted_armor'),
		new server.ItemStack('minecraft:barrel')
	];
	// 生成 补偿物资
	subsidy.forEach(item => opal.TrySpawnItem(player.dimension, item, player.location));
};
/**
 * * 随机角色召唤事件
 *
 * @param {server.Player} player - 玩家对象
 *
 * @param {string[]} type - 角色类型
 */
function randomCallRole(player: server.Player, type: string) {
	/**
	 * * 定义 坐标基准点
	 */
	const vertex0 = opal.Vector.add(player.location, { x: 3, y: 5, z: 3 });
	/**
	 * * 定义 坐标基准点
	 */
	const vertex1 = opal.Vector.add(player.location, { x: -3, y: 0, z: -3 });
	/**
	 * * 定义 角色召唤锚点
	 */
	const anchor = opal.Vector.rangeRandom(vertex0, vertex1);
	// 播放 粒子效果
	opal.TrySpawnParticle(player.dimension, 'constant:the_cracks_of_the_misty_sea', anchor);
	// 判断 是否已经召唤过 治疗类角色
	if (!player.getDynamicProperty('entity:healer_role_up')) {
		/**
		 * * 治疗型 角色队列
		 */
		const choice = opal.AnalysisWeight(table.call_healer_role).output;
		player.setDynamicProperty('entity:healer_role_up', true);
		opal.TrySpawnEntity(player.dimension, choice, anchor);
		return;
	};
	// 判断 是否已经召唤过 增伤类角色
	if (!player.getDynamicProperty('entity:fortify_role_up')) {
		/**
		 * * 增伤型 角色队列
		 */
		const choice = opal.AnalysisWeight(table.call_fortify_role).output;
		player.setDynamicProperty('entity:fortify_role_up', true);
		opal.TrySpawnEntity(player.dimension, choice, anchor);
		return;
	};
	// 执行 角色召唤
	switch (opal.Random({ min: 1, max: 32 }, true)) {
		case 16:
			WaspClusterRaidTrigger.Create(player.id, 20, { locations: [player.getHeadLocation()], dimensions: [player.dimension] });
			player.onScreenDisplay.setTitle('§c§l< 野蜂 袭击 > !!!§r');
			opal.TrySpawnEntity(player.dimension, type, anchor);
			break;

		default: opal.TrySpawnEntity(player.dimension, type, anchor); break;
	}
};
/**
 * * 指定角色召唤事件
 *
 * @param {server.Player} player - 玩家对象
 *
 * @param {string[]} queue - 角色队列
 */
function appointCallRole(player: server.Player, queue: string[]) {
	/**
	 * * 定义 坐标基准点
	 */
	const vertex0 = opal.Vector.add(player.location, { x: 2, y: 2, z: 2 });
	/**
	 * * 定义 坐标基准点
	 */
	const vertex1 = opal.Vector.add(player.location, { x: -2, y: 0, z: -2 });
	// 播放 粒子效果
	opal.TrySpawnParticle(player.dimension, 'constant:the_cracks_of_the_misty_sea', opal.Vector.rangeRandom(vertex0, vertex1));
	// 执行 角色召唤
	queue.forEach(entity => opal.TrySpawnEntity(player.dimension, entity, opal.Vector.rangeRandom(vertex0, vertex1)));
};
/**
 * * 野蜂机群袭击触发器
 *
 * @param {number} cooldown tick间隔时间, 建议值为: 20
 */
class WaspClusterRaidTrigger extends opal.Template {
	/**
	 * * 定义 事件计时器
	 */
	protected eventTimer = 0;
	public afterPlanEvent(data: type.AFTER_PLAN_DATA) {
		// 检测 条件是否齐全
		if (!this.annex.dimensions) return data.remove();
		if (!this.annex.locations) return data.remove();
		/**
		 * * 获取 事件维度
		 */
		const dimension = this.annex.dimensions[0];
		/**
		 * * 获取 原始坐标
		 */
		const proto = this.annex.locations[0];
		/**
		 * * 获取 随机坐标
		 */
		const current = opal.Vector.add(proto, { x: Math.random() * 16 - 8, y: Math.random() * 16, z: Math.random() * 16 - 8 });
		// 显示 粒子效果
		opal.TrySpawnParticle(dimension, 'constant:the_cracks_of_the_misty_sea', current);
		/**
		 * * 解析 权重信息
		 */
		const analysis = opal.AnalysisWeight(table.wasp_cluster_raid).output;
		// 生成 野蜂实体
		const wasp = opal.TrySpawnEntity(dimension, analysis, current);
		if (wasp instanceof server.Entity) wasp.nameTag = '§u野蜂 袭击§r';
		// 当事件结束时 生成战利品
		if (this.eventTimer >= 15) {
			opal.TrySpawnItem(dimension, new server.ItemStack('starry_map:eternal_energy'), current);
			opal.TrySpawnParticle(dimension, 'constant:fireworks_salvo_rune_red', current);
			opal.TrySpawnParticle(dimension, 'constant:disperse_rune_red', current);
			opal.TrySpawnParticle(dimension, 'constant:erupt_rune_red', current);
			return data.remove();
		};
		this.eventTimer += 1;
	};
};
/*
 * 流光之星
 */
components.set(componentPrefix + 'flowing_star',
	{
		onUse(source) {
			/**
			 * * 触发自定义组件的玩家
			 */
			const player = source.source;
			/**
			 * * 触发自定义组件的物品
			 */
			const item = source.itemStack;
			/**
			 * * 玩家背包
			 */
			const container = player.getComponent('inventory')?.container;
			// 判断条件是否满足
			if (!container || !player || !item) return;
			// 判断是否冷却完成
			if (!opal.TriggerControl(item.typeId, player, 140)) return;
			/**
			 * * 检测 当前高度
			 */
			const testHeight = player.location.y < player.dimension.heightRange.min + 32;
			// 检测当前高度是否可用
			if (testHeight) return player.sendMessage([opal.translate(player), { text: ' -> 当前高度不足, 无法使用<§l§9 流光之星 §r>' }]);
			// 清除 物品
			container?.setItem(player.selectedSlotIndex);
			/**
			 * * 定义 坐标基准点
			 */
			const reference = opal.Vector.add(player.location, { x: -13, y: -15, z: -13 });
			/**
			 * * 读取 建筑结构
			 */
			const template = server.world.structureManager.get('mystructure:starlight_house');
			// 预先填充空间
			opal.TryFillBlocks(player.dimension, reference, opal.Vector.add(reference, { x: 24, y: 24, z: 24 }), 'minecraft:white_stained_glass');
			// 检测 建筑结构
			if (!template) return player.sendMessage([opal.translate(player), { text: ' -> 未能获取到<§l§9 星辉雅居 §r>的结构数据文件' }]);
			// 加载 建筑结构
			server.system.runTimeout(() => server.world.structureManager.place(template, player.dimension, reference), 2);
			// 移动 玩家位置
			server.system.runTimeout(() => player.applyKnockback({ x: (Math.random() * 2) - 1, z: (Math.random() * 2) }, -1), 4);
			// 发送 信息
			opal.IntelMessage(player, 5, '『 星辉雅居 』');
			// 播放 召唤动画
			opal.CompleteSummonAnimation(player, player.getHeadLocation());
		}
	}
);
/*
 * 星月诗篇
 */
components.set(componentPrefix + 'moon_and_stars',
	{
		onUse(source) {
			/**
			 * * 触发自定义组件的玩家
			 */
			const player = source.source;
			/**
			 * * 触发自定义组件的物品
			 */
			const item = source.itemStack;
			/**
			 * * 玩家背包
			 */
			const container = player.getComponent('inventory')?.container;
			// 判断条件是否满足
			if (!container || !player || !item) return;
			// 判断是否冷却完成
			if (!opal.TriggerControl('使用-星月诗篇-召唤-被收纳-的实体', player, 80)) return;
			/**
			 * * 获取 实体类型
			 */
			const typeId = item.getDynamicProperty('reduction_pureness:type') as string;
			// 检测 物品数据类型是否完整且正确
			if (!typeId) return player.sendMessage(`§l§4<§c 星月诗篇 §4>§r数据丢失, 无法继续使用`);
			// 更新 物品冷却
			item.getComponent('minecraft:cooldown')?.startCooldown(player);
			// 执行召唤流程
			opal.SummonEntityWithData(player, container, typeId);
			// 播放 召唤动画
			opal.ParticleSummonAnimation(player, player.location);
		},
		/**
		 * 处理实体被击中的事件
		 *
		 * @param {server.ItemComponentHitEntityEvent} source - 被击中实体的事件源
		 */
		onHitEntity(source: server.ItemComponentHitEntityEvent) {
			/**
			 * 攻击者（玩家）
			 *
			 * @type {server.Entity}
			 */
			const player: server.Entity = source.attackingEntity;
			/**
			 * 被击中的实体
			 *
			 * @type {server.Entity}
			 */
			const entity: server.Entity = source.hitEntity;
			/**
			 * 玩家使用的物品
			 *
			 * @type {server.ItemStack | undefined}
			 */
			const item: server.ItemStack | undefined = source.itemStack;
			/**
			 * 玩家背包
			 *
			 * @type {server.Container | undefined}
			 */
			const container: server.Container | undefined = player.getComponent('inventory')?.container;
			// 如果没有实体, 物品, 或者实体无效, 或者攻击者不是玩家, 则直接返回
			if (!entity || !item || !entity.isValid || !(player instanceof server.Player)) return;
			// 检查冷却时间是否完成
			if (!opal.TriggerControl('实体尝试合并星月诗篇的数据', entity, 20)) return;
			/**
			 * 物品的实体类型属性
			 *
			 * @type {string}
			 */
			const typeId: string = item.getDynamicProperty('reduction_pureness:type') as string;
			/**
			 * 获取实体的捕获未来属性
			 */
			const captureTheFuture = entity.getDynamicProperty('entity:capture_the_future') as number ?? 1;
			// 如果物品类型与实体类型不匹配, 显示错误消息并播放声音
			if (typeId !== entity.typeId) {
				/**
				 * 错误消息
				 *
				 * @type {server.RawMessage[]}
				 */
				const errorMessage: server.RawMessage[] = [
					{ text: '§l§4[ 神明 - 归忆 ]并未降下注视§r ' },
					opal.translate(entity),
					{ text: ' §l§4似乎未能汲取到任何力量§r' },
				];
				player.onScreenDisplay.setActionBar(errorMessage);
				player.playSound('conduit.deactivate');
			}
			else if (captureTheFuture <= 3) {
				/**
				 * 实体的动态属性ID列表
				 *
				 * @type {string[]}
				 */
				const propertyID: string[] = item.getDynamicPropertyIds().filter(id => !id.startsWith('reduction_pureness:'));
				/**
				 * 实体的战斗经验值
				 *
				 * @type {number}
				 */
				const experience: number = entity.getDynamicProperty('entity:experience') as number ?? 0;
				/**
				 * 成功消息
				 *
				 * @type {server.RawMessage[]}
				 */
				const successMessage: server.RawMessage[] = [
					{ text: '§l§2源自[ 神明 - 归忆 ]的加护§r ' },
					opal.translate(entity),
					{ text: ' §l§2从< 尚未焚尽 >的未来中汲取了力量, 战术等级提升了§9 5 §2级! §r' },
				];
				// 遍历实体的动态属性ID列表, 将物品的动态属性复制到实体
				propertyID.forEach(
					id => {
						/**
						 * 当前物品的动态属性值
						 *
						 * @type {string | number | boolean | server.Vector3 | undefined}
						 */
						const itemProperty: string | number | boolean | server.Vector3 | undefined = item.getDynamicProperty(id);
						/**
						 * 当前实体的动态属性值
						 *
						 * @type {string | number | boolean | server.Vector3 | undefined}
						 */
						const entityProperty: string | number | boolean | server.Vector3 | undefined = entity.getDynamicProperty(id);
						// 如果两个属性都是数字类型, 则将它们相加并设置到实体上
						if (typeof itemProperty == 'number' && typeof entityProperty == 'number') entity.setDynamicProperty(id, itemProperty + entityProperty);
					}
				);
				// 记录截获未来的次数
				entity.setDynamicProperty('entity:capture_the_future', captureTheFuture + 1);
				// 增加实体的战斗经验值
				entity.setDynamicProperty('entity:experience', experience + 360);
				// 清除玩家手中的物品
				container?.setItem(player.selectedSlotIndex);
				// 显示成功消息并播放声音
				player.onScreenDisplay.setActionBar(successMessage);
				// 播放声音
				player.playSound('conduit.activate');
			}
			else {
				/**
				 * 错误消息
				 *
				 * @type {server.RawMessage[]}
				 */
				const errorMessage: server.RawMessage[] = [
					{ text: '§l§4[ 神明 - 归忆 ]拒绝赐福§r ' },
					opal.translate(entity),
					{ text: ' §l§4无法燃烧自己的未来§r' },
				];
				// 显示失败消息
				player.onScreenDisplay.setActionBar(errorMessage);
			}
		}
	}
);
/*
 * 空白蓝图
 */
components.set(componentPrefix + 'blank_industrial_blueprint',
	{
		onUseOn(source) {
			/**
			 * * 触发自定义组件的玩家
			 */
			const player = source.source;
			/**
			 * * 触发自定义组件的物品
			 */
			const item = source.itemStack;
			/**
			 * * 触发自定义组件的方块
			 */
			const block = source.block;
			/**
			 * * 玩家背包
			 */
			const container = player.getComponent('inventory')?.container;
			// 判断条件是否满足
			if (!block || !container || !(player instanceof server.Player) || !item) return;
			// 判断是否冷却完成
			if (!opal.TriggerControl(item.typeId, player, 20)) return;
			// 检测 玩家是否正在潜行
			if (player.isSneaking) {
				// 保存坐标信息
				item.setDynamicProperty('industrial_blueprint:location_1', source.block.center());
				player.sendMessage(
					[
						opal.translate(player),
						{ text: ' -> 已记录位置: ' + opal.Vector.toString(source.block.location) }
					]
				);
			}
			else {
				// 保存坐标信息
				item.setDynamicProperty('industrial_blueprint:location_2', source.block.center());
				player.sendMessage(
					[
						opal.translate(player),
						{ text: ' => 已记录位置: ' + opal.Vector.toString(source.block.location) }
					]
				);
			};
			// 更新 物品冷却
			item.getComponent('minecraft:cooldown')?.startCooldown(player);
			// 刷新手持物品
			container.setItem(player.selectedSlotIndex, item);
			// 播放 音效
			player.playSound('resonate.amethyst_block');
			/**
			 * * 读取 坐标信息
			 */
			const location_1 = item.getDynamicProperty('industrial_blueprint:location_1') as server.Vector3;
			/**
			 * * 读取 坐标信息
			 */
			const location_2 = item.getDynamicProperty('industrial_blueprint:location_2') as server.Vector3;
			// 检测 坐标信息
			if (!location_1 || !location_2 || opal.Vector.equals(location_1, location_2)) return;
			// 创建 路径显示
			opal.PathExecute.CreateForFrame(
				'空白蓝图范围显示',
				{
					particles: ['constant:track_color_rainbow'],
					locations: [],
					dimension: player.dimension,
					cooldown: 1,
					speed: 1
				},
				location_1, location_2
			);
		},
		onMineBlock(source) {
			/**
			 * * 触发自定义组件的玩家
			 */
			const player = source.source;
			/**
			 * * 触发自定义组件的物品
			 */
			const item = source.itemStack;
			/**
			 * * 玩家背包
			 */
			const container = player.getComponent('inventory')?.container;
			/**
			 * * 读取 坐标信息
			 */
			const location_1 = item?.getDynamicProperty('industrial_blueprint:location_1') as server.Vector3;
			/**
			 * * 读取 坐标信息
			 */
			const location_2 = item?.getDynamicProperty('industrial_blueprint:location_2') as server.Vector3;
			// 判断条件是否满足
			if (!container || !(player instanceof server.Player) || !location_1 || !location_2 || opal.Vector.equals(location_1, location_2)) return;
			/**
			 * * 处理工业蓝图的转换
			 *
			 * @param {serverUI.ModalFormResponse} option -玩家输入
			 */
			const transformation = (option: serverUI.ModalFormResponse) => {
				// 判断 玩家输入
				if (option.canceled || !option.formValues) return;
				/**
				 * * 创建 新的物品
				 */
				const newItem = new server.ItemStack('starry_map:complete_blueprint');
				/**
				 * * 获取 区域体积
				 */
				const volume = new server.BlockVolume(location_1, location_2);
				/**
				 * * 获取 区域体积向量
				 */
				const vector = opal.Vector.subtract(volume.getMax(), volume.getMin());
				// 创建 结构
				server.world.structureManager.createFromWorld(
					'mystructure:' + option.formValues[0]?.toString(),
					player.dimension,
					location_1, location_2,
					{
						saveMode: server.StructureSaveMode.World,
						includeEntities: false,
						includeBlocks: true
					}
				);
				// 修改 物品名称
				newItem.nameTag = option.formValues[0] as string;
				// 修改 物品数据
				newItem.setDynamicProperty('industrial_blueprint:vector', vector);
				newItem.setDynamicProperty('industrial_blueprint:volume', volume.getCapacity());
				newItem.setDynamicProperty('industrial_blueprint:structure', option.formValues[0]?.toString());
				// 延迟 5 tick后, 生成新物品
				server.system.runTimeout(() => opal.TrySpawnItem(player.dimension, newItem, player.location), 5);
				// 清除手持物品
				container.setItem(player.selectedSlotIndex);
			};
			// 显示 界面
			new serverUI.ModalFormData()
				.title("§l§9 保存结构 §r")
				.textField("§l§t 结构名称 §r", "§l§m 结构名称 §r", { 'defaultValue': opal.BriefID() })
				.show(player).then(option => transformation(option));
			// 播放 音效
			player.playSound('block.stonecutter.use');
		}
	}
);
/*
 * 成品蓝图
 */
components.set(componentPrefix + 'industrial_blueprint',
	{
		onUseOn(source) {
			/**
			 * * 触发自定义组件的玩家
			 */
			const player = source.source;
			/**
			 * * 触发自定义组件的物品
			 */
			const item = source.itemStack;
			/**
			 * * 触发自定义组件的方块
			 */
			const block = source.block;
			/**
			 * * 玩家背包
			 */
			const container = player.getComponent('inventory')?.container;
			// 判断条件是否满足
			if (!block || !container || !(player instanceof server.Player) || !item) return;
			// 判断是否冷却完成
			if (!opal.TriggerControl(item.typeId, player, 80)) return;
			/**
			 * * 读取 蓝图名称
			 */
			const structureName = item.getDynamicProperty('industrial_blueprint:structure') as string;
			/**
			 * * 读取 区域体积
			 */
			const volume = item.getDynamicProperty('industrial_blueprint:volume') as number;
			/**
			 * * 边框向量
			 */
			const vector = item.getDynamicProperty('industrial_blueprint:vector') as server.Vector3;
			/**
			 * * 配置 结构放置参数
			 */
			const options: server.StructurePlaceOptions = {
				animationMode: server.StructureAnimationMode.Blocks,
				animationSeconds: 10
			};
			// 播放 音效
			player.playSound('respawn_anchor.set_spawn');
			// 更新 物品冷却
			item.getComponent('minecraft:cooldown')?.startCooldown(player);
			// 判断条件是否满足
			if (!vector || !volume || !structureName) return player.sendMessage('§c§l当前<§l§u 机械蓝图 §r>§c§l数据缺失, 无法使用 !');
			/**
			 * * 读取 建筑结构
			 */
			const structure = server.world.structureManager.get(structureName);
			// 判断结构是否存在
			if (!structure) return player.sendMessage([opal.translate(player), { text: ' -> 未能获取到<§l§u 机械蓝图 §r>的结构数据文件' }]);
			/**
			 * * 起始坐标
			 */
			const startPlace = block.center();
			/**
			 * * 结束坐标
			 */
			const donePlace = opal.Vector.add(startPlace, vector);
			// 创建 路径显示
			opal.PathExecute.CreateForFrame(
				'成品蓝图范围显示',
				{
					particles: ['constant:track_color_rainbow'],
					locations: [],
					dimension: player.dimension,
					cooldown: 1,
					speed: 1
				},
				startPlace, donePlace
			);
			// 判断玩家是否潜行
			if (!player.isSneaking) return;
			// 消耗 能量 并确认 能量 是否充足
			if (opal.QueryEnergy(block) <= volume * 1000) return player.sendMessage('<§l§u 星尘力 §r>§c§l不足, 无法加载<§l§u 机械蓝图 §r>§c§l !');
			// 消耗 星尘能量
			opal.ExpendEnergy(block, -volume * 1000);
			// 创建 蓝图中保存的结构
			server.world.structureManager.place(structure, player.dimension, block.location, options);
		}
	}
);
export default components;