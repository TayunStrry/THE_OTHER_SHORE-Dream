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
import prompt from "../data/prompt";
/**
 * * 组件前缀代词
 */
const componentPrefix = 'opal:item.';
/**
 * * 物品自定义组件列表
 */
const components = new Map<string, server.ItemCustomComponent>();
/*
 * 精灵治愈
 */
components.set(componentPrefix + 'faerie_healing',
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
			if (!opal.TriggerControl(item.typeId, player, 100)) return;
			/**
			 * * 定义 查询实体 的 参数
			 */
			const options: server.EntityQueryOptions = {
				excludeTypes: ["minecraft:item", "minecraft:xp_orb"],
				excludeFamilies: ["monster"],
				location: player.location,
				maxDistance: 8
			};
			// 获取 附近的实体 并 赋予 生命恢复效果
			player.dimension.getEntities(options).forEach(entity => entity.addEffect("minecraft:regeneration", 300, { amplifier: 4, showParticles: false }));
			/**
			 * * 定义 粒子参数
			 */
			const molang = new server.MolangVariableMap(); molang.setFloat('variable.size', 8); molang.setFloat('variable.direction', 3);
			// 播放 音效
			player.playSound('item.book.page_turn');
			// 播放 粒子效果
			opal.TrySpawnParticle(player.dimension, 'scripts:path_spiral', player.location, molang);
			// 更新 物品冷却
			item.getComponent('minecraft:cooldown')?.startCooldown(player);
			// 更新 物品耐久
			opal.SetDurability(player, item, container, player.selectedSlotIndex, 1);
		}
	}
);
/*
 * 林业指南
 */
components.set(componentPrefix + 'forestry_guidelines',
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
			if (!opal.TriggerControl(item.typeId, player, 100)) return;
			/**
			 * * 定义 起始点
			 */
			const start = opal.Vector.add(player.location, { x: -5, y: -1, z: -5 });
			/**
			 * * 定义 结束点
			 */
			const done = opal.Vector.add(player.location, { x: 5, y: 15, z: 5 });
			/**
			 * * 在 绘制路径 时 执行 的 程序
			 */
			const moveEvent = (args: type.ROUTE_ANNEX_ARGS) => {
				/**
				 * * 检测方块是否需要被挖掘
				 */
				const TestSort = () => {
					/**
					 * * 获取 方块对象
					 */
					const getBlock = args.dimension.getBlock(args.location);
					// 检测 方块类型
					if (getBlock) return table.is_trees.has(getBlock.typeId);
					else return false
				}
				//执行路径事件的功能
				if (TestSort()) args.dimension.runCommand(`fill ${args.location.x} ${args.location.y} ${args.location.z} ${args.location.x} ${args.location.y} ${args.location.z} air [] destroy`)
				// 继续循环
				return true
			};
			// 播放 音效
			player.playSound('item.book.page_turn');
			// 创建 路径执行计划
			opal.PathExecute.CreateForCube(
				'林业指南-范围扫描',
				{
					particles: ['constant:track_rune_green'],
					locations: [],
					dimension: player.dimension,
					cooldown: 1,
					speed: 1,
					on_move: moveEvent
				},
				start, done, 0.25
			);
			// 更新 物品冷却
			item.getComponent('minecraft:cooldown')?.startCooldown(player);
			// 更新 物品耐久
			opal.SetDurability(player, item, container, player.selectedSlotIndex, 1);
		}
	}
);
/*
 * 矿物辞典
 */
components.set(componentPrefix + 'mineral_dictionary',
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
			if (!opal.TriggerControl(item.typeId, player, 100)) return;
			/**
			 * * 定义 起始点
			 */
			const start = opal.Vector.add(player.location, { x: -5, y: -9, z: -5 });
			/**
			 * * 定义 结束点
			 */
			const done = opal.Vector.add(player.location, { x: 5, y: 9, z: 5 });
			/**
			 * * 在 绘制路径 时 执行 的 程序
			 */
			const moveEvent = (args: type.ROUTE_ANNEX_ARGS) => {
				/**
				 * * 检测方块是否需要被挖掘
				 */
				const TestSort = () => {
					/**
					 * * 获取 方块对象
					 */
					const getBlock = args.dimension.getBlock(args.location);
					// 检测 方块类型
					if (getBlock) return table.is_mineral.has(getBlock.typeId);
					else return false
				}
				//执行路径事件的功能
				if (TestSort()) {
					// 执行填充方块命令
					args.dimension.runCommand(`fill ${args.location.x} ${args.location.y} ${args.location.z} ${args.location.x} ${args.location.y} ${args.location.z} air [] destroy`)
					/**
					 * * 定义 掉落物 的 参数
					 */
					const options: server.EntityQueryOptions = {
						location: args.location,
						type: "minecraft:item",
						maxDistance: 4
					};
					// 获取附近的掉落物
					args.dimension.getEntities(options).forEach(entity => entity.teleport(player.getHeadLocation(), { dimension: player.dimension }));
				}
				// 继续循环
				return true
			};
			// 播放 音效
			player.playSound('item.book.page_turn');
			// 创建 路径执行计划
			opal.PathExecute.CreateForCube(
				'矿物辞典-范围扫描',
				{
					particles: ['constant:track_color_rainbow'],
					locations: [],
					dimension: player.dimension,
					cooldown: 1,
					speed: 1,
					on_move: moveEvent
				},
				start, done, 0.25
			);
			// 更新 物品冷却
			item.getComponent('minecraft:cooldown')?.startCooldown(player);
			// 更新 物品耐久
			opal.SetDurability(player, item, container, player.selectedSlotIndex, 1);
		}
	}
);
/*
 * 空间宝典
 */
components.set(componentPrefix + 'space_transition',
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
			if (!opal.TriggerControl(item.typeId, player, 100)) return;
			/**
			 * * 诸界道标 数据信息
			 */
			const RoadSign = new Map<string, type.LOCATION_AND_DIMENSION>()
			// 获取 所有 道标
			player.getDynamicPropertyIds().filter(id => id.startsWith('road_sign:')).forEach(id => opal.CompileSign(player, id, RoadSign));
			// 播放 音效
			player.playSound('item.book.page_turn');
			//当玩家处于潜行时 触发的随机传送机制
			if (player.isSneaking) {
				/**
				 * * 获取 可用 的 着陆点
				 */
				const anchor = opal.QueryEntityFoothold(player, [...table.area_legend.keys()], 10, 512);
				//执行传送流程 并 播放音效
				if (opal.Vector.distance(anchor, player.location) > 3) player.teleport(anchor);
				// 播放音效
				server.system.runTimeout(() => player.playSound("conduit.attack"), 5);
			}
			else basePresets().show(player).then(
				option => {
					if (option.canceled) return;
					switch (option.selection) {
						//相对传送
						case 0: relativePresets().show(player).then(option => renRelative(player, option)); break;

						//随机传送
						case 1: randomPresets().show(player).then(option => renRandom(player, option)); break;

						//诸界道标
						case 2: signPresets(RoadSign).show(player).then(option => renRoadSign(player, option, RoadSign)); break;
					}
				}
			);
			// 更新 物品冷却
			item.getComponent('minecraft:cooldown')?.startCooldown(player);
			// 更新 物品耐久
			opal.SetDurability(player, item, container, player.selectedSlotIndex, 1);
		}
	}
);
/**
 * * 用于显示各种传送模式的基础窗口
 */
function basePresets() {
	/**
	 * * 定义了 窗口界面 的 标题
	 */
	const title: server.RawMessage = {
		text: "§9《§5 空间宝典 §9》§r"
	};
	/**
	 * * 定义了 窗口界面 的 选项
	 */
	const option: server.RawMessage[] = [
		{ text: '<§4§o§l 相对传送 §r>' },
		{ text: '<§5§o§l 随机传送 §r>' },
		{ text: '<§9§o§l 诸界道标 §r>' }
	];
	/**
	 * * 定义了 窗口界面 的 表单对象
	 */
	const display = new serverUI.ActionFormData()
		.title(title)
		.button(option[0], "textures/物品贴图/魔法书籍/空间宝典")
		.button(option[1], "textures/物品贴图/魔法书籍/魔导手册")
		.button(option[2], "textures/物品贴图/魔法书籍/空间宝典")
	//输出 表单对象
	return display
};
/**
 * * 用于显示[ 相对坐标 ]< 传送机制 >的设置窗口
 */
function relativePresets() {
	/**
	 * * 定义了 窗口界面 的 标题
	 */
	const title: server.RawMessage = {
		text: "§9《§5 空间宝典 §9》§r"
	};
	/**
	 * * 定义了 窗口界面 的 滑动条标题
	 */
	const option: server.RawMessage[] = [
		{ text: '§3相对§a X轴坐标§r' },
		{ text: '§3相对§a Y轴坐标§r' },
		{ text: '§3相对§a Z轴坐标§r' }
	];
	/**
	 * * 定义了 窗口界面 的 表单对象
	 */
	const display = new serverUI.ModalFormData()
		.title(title)
		.slider(option[0], -64, 64, { 'valueStep': 1, 'defaultValue': 0 })
		.slider(option[1], -64, 64, { 'valueStep': 1, 'defaultValue': 0 })
		.slider(option[2], -64, 64, { 'valueStep': 1, 'defaultValue': 0 })
	//输出 表单对象
	return display
};
/**
 * * 用于显示[ 随机坐标 ]< 传送机制 >的设置窗口
 */
function randomPresets() {
	/** 定义了 窗口界面 的 标题 */
	const title: server.RawMessage = {
		text: "§9《§5 空间宝典 §9》§r"
	};
	/** 定义了 窗口界面 的 滑动条标题 */
	const option: server.RawMessage[] = [
		{ text: '§3偏移§a X轴基准§r' },
		{ text: '§3偏移§a Y轴基准§r' },
		{ text: '§3偏移§a Z轴基准§r' },
		{ text: '§3设置§a 极限范围§r' }
	];
	/** 定义了 窗口界面 的 表单对象 */
	const display = new serverUI.ModalFormData()
		.title(title)
		.slider(option[0], -16, 16, { 'valueStep': 1, 'defaultValue': 0 })
		.slider(option[1], -16, 16, { 'valueStep': 1, 'defaultValue': 0 })
		.slider(option[2], -16, 16, { 'valueStep': 1, 'defaultValue': 0 })
		.slider(option[3], 16, 255, { 'valueStep': 1, 'defaultValue': 16 })
	//输出 表单对象
	return display
};
/**
 * * 用于显示[ 诸界道标 ]< 传送机制 >的设置窗口
 */
function signPresets(input: Map<string, type.LOCATION_AND_DIMENSION>) {
	/**
	 * * 获取 道标名称
	 */
	const name = Array.from(input.keys()).map(id => `§n§o§l§${Math.floor(Math.random() * 6)}` + id.split(':')[1]);
	/** 定义了 窗口界面 的 标题 */
	const title: server.RawMessage = {
		text: "§9《§5 空间宝典 §9》§r"
	};
	/** 定义了 窗口界面 的 选项 */
	const option: server.RawMessage[] = [
		{ text: '<§2§o§l 创建道标 §r>' },
		{ text: '<§5§o§l 道标传送 §r>' },
		{ text: '<§4§o§l 移除道标 §r>' }
	];
	/** 定义了 窗口界面 的 输入栏提示 */
	const text: server.RawMessage[] = [
		{ text: '<§2§o§l 识别标签 §r> -> §9重命名' },
		{ text: '§c请输入 诸界道标 识别标签§r' },
		{ text: '§c是否启用<§2§o§l 雾海裂隙 §r>§r' }
	];
	/** 定义了 窗口界面 的 表单对象 */
	const display = new serverUI.ModalFormData()
		.title(title)
		.dropdown('', name.length !== 0 ? name : ["§4暂无 §9道标信息§r"], { 'defaultValueIndex': (name.length > 1 ? name.length - 1 : 0) })
		.dropdown('', option, { 'defaultValueIndex': (name.length !== 0 ? 1 : 0) })
		.textField(text[0], text[1], { 'defaultValue': opal.BriefID() })
		.toggle(text[2], { 'defaultValue': false })
	//输出 表单对象
	return display
};
/**
 * * 执行 相对传送
 */
function renRelative(player: server.Player, option: serverUI.ModalFormResponse) {
	//检测玩家是否退出窗口
	if (option.canceled) return;
	/**
	 * * 获取 目标位置
	 */
	const location = opal.Vector.add(player.location,
		{
			x: parseInt((option.formValues as any[])[0]),
			y: parseInt((option.formValues as any[])[1]),
			z: parseInt((option.formValues as any[])[2]),
		}
	);
	// 传送玩家
	player.teleport(location);
	// 播放音效
	server.system.runTimeout(() => player.playSound("mob.endermen.portal"), 2);
};
/**
 * * 执行 随机传送
 */
function renRandom(player: server.Player, option: serverUI.ModalFormResponse) {
	//检测玩家是否退出窗口
	if (option.canceled) return
	/**
	 * * 获取 目标位置
	 */
	const location = opal.Vector.add(player.location,
		{
			x: parseInt((option.formValues as any[])[0]),
			y: parseInt((option.formValues as any[])[1]),
			z: parseInt((option.formValues as any[])[2]),
		}
	);
	/**
	 * * 获取锚点位置
	 */
	const anchor = opal.QueryFoothold({ location: location, dimension: player.dimension }, parseInt((option.formValues as any[])[3]), -60, 300);
	// 传送玩家
	player.teleport(anchor);
	// 播放音效
	server.system.runTimeout(() => player.playSound("mob.endermen.portal"), 5);
};
/**
 * * 执行 道标传送
 */
function renRoadSign(player: server.Player, option: serverUI.ModalFormResponse, input: Map<string, type.LOCATION_AND_DIMENSION>) {
	//检测玩家是否退出窗口
	if (!option.formValues) return
	/**
	 * * 获取 道标参数
	 */
	const value = Array.from(input.values());
	/**
	 * * 获取 道标名称
	 */
	const name = Array.from(input.keys());
	/**
	 * * 指向 玩家 开始传送的 位置
	 */
	const pointLocation = player.location;
	/**
	 * * 指向 玩家 开始传送的 维度
	 */
	const pointDimension = player.dimension;
	/**
	 * * 获取 玩家的 输入信息
	 */
	const forms: any[] = option.formValues;
	/**
	 * * 获取 玩家自身 的 锚点信息
	 */
	const selfAnchor = JSON.stringify({ location: player.location, dimension: player.dimension.id });
	// 根据 选项 进行 不同 处理
	switch (forms[1]) {
		//新增 道标信息
		case 0: player.setDynamicProperty('road_sign:' + forms[2], selfAnchor); break;

		//使用 道标信息
		case 1:
			// 判断是否开启 雾海裂隙
			if (forms[3]) server.system.runTimeout(() => mistySeaFissure(player, pointLocation, pointDimension), 5)
			// 传送玩家
			player.teleport(value[forms[0]].location, { dimension: value[forms[0]].dimension });
			// 播放音效
			server.system.runTimeout(() => player.playSound("mob.endermen.portal"), 5);
			break;

		//移除 道标信息
		case 2: player.setDynamicProperty(name[forms[0]]); break;
	};
};
/**
 * * 执行 雾海裂隙
 */
function mistySeaFissure(player: server.Player, location: server.Vector3, dimension: server.Dimension) {
	/**
	 * * 获取 玩家自身 的 锚点信息
	 */
	const origin = opal.Vector.add(player.location, opal.Vector.CONSTANT_UP);
	// 创建 雾海裂隙
	server.system.runTimeout(
		() => {
			opal.MistySeaFissure.BriefCreate('诸界道标所创建的一次性雾海裂隙效果',
				{
					locations: [
						origin,
						location
					],
					dimensions: [
						player.dimension,
						dimension
					]
				}
			);
			player.playSound("ambient.weather.thunder", { location: player.location, volume: 10 });
			opal.TrySpawnParticle(player.dimension, 'constant:fireworks_fireball_amber_color', origin);
			opal.TrySpawnParticle(player.dimension, 'constant:smoke_rune_white', origin);
		},
		100
	)
};
/*
 * 精灵结契
 */
components.set(componentPrefix + 'faerie_contract',
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
			if (!opal.TriggerControl(item.typeId, player, 100)) return;
			/**
			 * * 设定查询参数
			 */
			const options: server.EntityQueryOptions = {
				excludeTypes: ["minecraft:item", "minecraft:xp_orb", "minecraft:player"]
			};
			/**
			 * * 获取 实体 的 距离信息
			 */
			const Distance = (entity: server.Entity) => Math.floor(opal.Vector.distance(player.location, entity.location));
			/**
			 * * 获取 实体组 并 过滤掉 无法驯服的实体
			 */
			const queue = opal.EntitysSort(player.dimension, options, (a, b) => Distance(a) - Distance(b), entity => entity.getComponent('minecraft:tameable') && !entity.getComponent('minecraft:tameable')?.isTamed);
			/**
			 * * 定义了 窗口界面 的 标题
			 */
			const title: server.RawMessage = {
				text: "§9《§5 精灵结契 §9》§r"
			};
			/**
			 * * 定义了 窗口界面 的 表单对象
			 */
			const display = new serverUI.ActionFormData().title(title);
			/**
			 * * 获取 实体 的 名称信息
			 */
			const Intel = (entity: server.Entity): server.RawMessage => {
				return {
					rawtext: [
						{ text: '§l' },
						opal.translate(entity),
						{ text: `\n§9距离: §5${Distance(entity)}` }
					]
				}
			};
			/**
			 * 获取玩家选择的槽位
			 */
			const slotIndex = player.selectedSlotIndex;
			// 遍历 实体数组 并 加入 按钮
			if (queue.length >= 1) queue.forEach(entity => display.button(Intel(entity), "textures/物品贴图/魔法书籍/精灵结契"));
			else display.button('§4§l周围不存在 §c<§9 可以§6<§u 契约 §6>§9的实体 §c>§r', "textures/物品贴图/魔法书籍/战术规划");
			// 播放 音效
			player.playSound('item.book.page_turn');
			// 显示 窗口界面
			display.show(player).then(
				option => {
					if (option.selection == undefined || queue.length == 0) return;
					// 契约 实体
					queue[option.selection].getComponent('minecraft:tameable')?.tame(player);
					// 移除 物品
					server.system.runTimeout(() => container?.setItem(slotIndex), 5);
					// 播放 音效
					server.system.runTimeout(() => player.playSound('conduit.deactivate'), 1);
				}
			);
			// 更新 物品冷却
			item.getComponent('minecraft:cooldown')?.startCooldown(player);
		}
	}
);
/*
 * 魔法绪论
 */
components.set(componentPrefix + 'introduction_magic',
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
			// 判断条件是否满足
			if (!player || !item) return;
			// 判断是否冷却完成
			if (!opal.TriggerControl(item.typeId, player, 20)) return;
			// 显示 区块边界
			opal.DisplayChunkBoundary(player);
			/**
			 * * 获取 当前区块的消息通知
			 */
			const notify = table.message_notify
			// 判断当前区块是否具有消息通知
			if (!notify || notify.size < 1) return player.playSound('respawn_anchor.deplete');
			/**
			 * * 消息通知 的 类型
			 */
			const keys = Array.from(notify.keys());
			/**
			 * * 获取 消息通知 的 内容信息
			 */
			const value = Array.from(notify.values());
			/**
			 * * 定义了 窗口界面 的 标题
			 */
			const title: server.RawMessage = { text: "§9《§5 魔导绪论 §9》§r" };
			/**
			 * * 当前区块内 消息通知 的 全部内容
			 */
			const rawMessage: server.RawMessage = { rawtext: [] };
			/**
			 * * 定义了 窗口界面 的 表单对象
			 */
			const display = new serverUI.ActionFormData().title(title).button('§u§l关闭§r').button('§4§l清除§r');
			// 编写 消息通知 的 内容信息
			keys.forEach(
				(key, index) => {
					rawMessage.rawtext?.push({ text: `『 ${key} 』\n` }, value[index], { text: '\n\n=====================\n' });
				}
			);
			// 将 消息通知 的 内容信息 写入 窗口界面
			display.body(rawMessage);
			// 显示 窗口界面
			display.show(player).then(
				option => {
					if (option.canceled || option.selection == undefined) return;
					if (option.selection == 1) notify.clear();
				}
			);
			// 播放 使用音效
			player.playSound('beacon.activate');
			// 更新 物品冷却
			item.getComponent('minecraft:cooldown')?.startCooldown(player);
		}
	}
);
/*
 * 源能秘典
 */
components.set(componentPrefix + 'source_energy',
	{
		onUse(source) {
			/**
			 * 触发自定义组件的玩家
			 *
			 * @type {server.Player}
			 */
			const player: server.Player = source.source;
			/**
			 * 触发自定义组件的物品
			 *
			 * @type {server.ItemStack | undefined}
			 */
			const item: server.ItemStack | undefined = source.itemStack;
			/**
			 * 判断条件是否满足 如果玩家或物品为空, 则直接返回
			 */
			if (!player || !item) return;
			/**
			 * 判断是否冷却完成 如果冷却未完成, 则直接返回
			 */
			if (!opal.TriggerControl(item.typeId, player, 20)) return;
			/**
			 * 创建表单内容
			 */
			sourceEnergy(player);
			/**
			 * 播放翻书音效, 提示玩家操作成功
			 */
			player.playSound('item.book.page_turn');
			/**
			 * 为物品设置冷却时间
			 */
			item.getComponent('minecraft:cooldown')?.startCooldown(player);
		}
	}
);
/**
 * 源能秘典的表单逻辑
 *
 * 展示源能秘典的目录页和详情页
 *
 * @param {server.Player} player - 玩家对象
 */
function sourceEnergy(player: server.Player) {
	/**
	 * 获取所有引导文本的标题
	 *
	 * @type {string[]}
	 */
	const keys: string[] = Array.from(prompt.keys());
	/**
	 * 获取所有引导文本的内容
	 *
	 * @type {server.RawMessage[][]}
	 */
	const value: server.RawMessage[][] = Array.from(prompt.values()).map(item => item.map(info => info.refer));
	/**
	 * 定义了 窗口界面 的 标题
	 *
	 * @type {server.RawMessage}
	 */
	const title: server.RawMessage = {
		text: "§9《§5 源能秘典 §9》§r"
	};
	/**
	 * 创建源能秘典的目录页表单
	 *
	 * @type {serverUI.ActionFormData}
	 */
	const display: serverUI.ActionFormData = new serverUI.ActionFormData().title(title);
	/**
	 * 遍历 引导文本 并 加入 按钮
	 *
	 * 为目录页表单添加按钮, 每个按钮对应一个引导文本的标题
	 */
	keys.forEach(key => display.button('§l§u' + key, "textures/物品贴图/魔法书籍/源能秘典"));
	/**
	 * 展示源能秘典的目录页表单
	 *
	 * @param {server.Player} player - 玩家对象
	 */
	display.show(player).then(
		option => {
			/**
			 * 判断玩家是否取消操作或选择无效
			 *
			 * 如果玩家取消操作或选择无效, 则直接返回
			 */
			if (option.canceled || option.selection == undefined) return;
			/**
			 * 创建源能秘典的详情页表单
			 *
			 * @type {serverUI.ActionFormData}
			 */
			const action: serverUI.ActionFormData = new serverUI.ActionFormData().title('§l§u§o' + keys[option.selection]).body({ rawtext: value[option.selection] });
			/**
			 * 为详情页表单添加关闭和返回按钮
			 */
			action.button('§4§l关闭§r').button('§u§l返回§r');
			/**
			 * 展示源能秘典的详情页表单, 并处理玩家的按钮选择
			 */
			action.show(player).then(
				option => {
					/**
					 * 如果玩家取消操作或选择无效, 则直接返回
					 */
					if (option.canceled || option.selection == undefined) return;
					/**
					 * 如果玩家点击返回按钮, 则重新展示目录页表单
					 */
					option.selection == 1 ? sourceEnergy(player) : void 0;
					/**
					 * 播放翻书音效, 提示玩家操作成功
					 */
					player.playSound('item.book.page_turn');
				}
			);
		}
	);
};
/**
 * * 定义 魔导手册 功能
 */
export function magicHandbook(player: server.Player, item: server.ItemStack, block?: server.Block) {
	/**
	 * * 根据玩家所持物品或目标方块的类型, 查询并创建情报接口
	 */
	const intel = opal.lexiconInterface(player, block?.typeId ?? item.typeId);
	// 使用后, 物品进入冷却状态, 模拟翻书页的音效
	item.getComponent('minecraft:cooldown')?.startCooldown(player);
	player.playSound('item.book.page_turn');
	// 打开情报窗口, 展示查询到的信息
	opal.windowedRetriever(player, intel);
};
/*
 * 幻海集纳
 */
components.set(componentPrefix + 'fantasy_sea_collection',
	{
		onHitEntity(source) {
			/**
			 * 被击中的实体
			 */
			const entity = source.hitEntity;
			/**
			 * 触发自定义组件的物品
			 */
			const item = source.itemStack;
			/**
			 * 触发自定义组件的玩家
			 */
			const player = source.attackingEntity;
			/**
			 * 指向方块容器的坐标信息
			 */
			const pointer = item?.getDynamicProperty('entity:unload_backpack_to_container') as server.Vector3 | undefined;
			// 判断玩家对象是否正确
			if (!(player instanceof server.Player)) return;
			// 判断是否错误试图修改其他玩家的背包容器
			if (entity instanceof server.Player) return player.onScreenDisplay.setActionBar({ text: '§c§l该道具不可对玩家使用!!' });
			// 判断是否记录了坐标
			if (!pointer) return player.onScreenDisplay.setActionBar({ text: '§c§l请先设置目标< 方块容器 >坐标' });
			/**
			 * 获取 被击中的实体的背包容器
			 */
			const container = entity.getComponent('minecraft:inventory')?.container;
			/**
			 * 获取 目标容器的 容器对象
			 */
			const blockContainer = entity.dimension.getBlock(pointer)?.getComponent('minecraft:inventory')?.container;
			// 判断 容器对象是否存在
			if (!container || !blockContainer) return player.onScreenDisplay.setActionBar({ text: '§c§l请确认< 方块容器 >是否 已加载 或 存在 !!' });
			/**
			 * 获取 目标容器 剩余存储空间
			 */
			let emptySlots = blockContainer.emptySlotsCount;
			/**
			 * * 物品组
			 */
			const items: server.ItemStack[] = [];
			//抽取 实体背包内 指定数量 的物品
			for (let index = 0; index < container.size; index++) {
				/**
				 * * 获取 物品
				 */
				const getItem = container.getItem(index);
				// 判断 物品是否存在
				if (emptySlots == 0) break;
				if (!getItem) continue;
				// 将 物品 加入 物品组
				items.push(getItem);
				container.setItem(index);
				emptySlots -= 1;
			};
			//向 容器内 填充物品
			for (let index of items) blockContainer.addItem(index);
			// 输出 提示消息
			player.onScreenDisplay.setActionBar(`§7正在远程转移物品, < 方块容器 >的剩余空间为§r:§2 ${emptySlots}`);
		},
		onUseOn(source) {
			/**
			 * 玩家点击的方块
			 */
			const block = source.block.above() ?? source.block;
			/**
			 * 触发自定义组件的物品
			 */
			const item = source.itemStack;
			/**
			 * 触发自定义组件的玩家
			 */
			const player = source.source;
			/**
			 * 玩家的背包容器
			 */
			const container = player.getComponent('inventory')?.container;
			// 判断玩家对象是否正确
			if (!(player instanceof server.Player)) return;
			// 判断被选中的方块是否为容器
			if (block?.getComponent('minecraft:inventory')?.container) {
				// 播放粒子效果
				opal.TrySpawnParticle(player.dimension, 'constant:prompt_firefly', player.location);
				// 修正物品数据, 记录方块容器的位置
				item.setDynamicProperty('entity:unload_backpack_to_container', block.location);
				// 更新玩家操作栏提示
				player.onScreenDisplay.setActionBar('§9§l< 方块容器 >位置已更新');
				// 更新玩家背包中的物品
				container?.setItem(player.selectedSlotIndex, item);
				// 播放声音效果
				player.playSound('conduit.attack');
			}
			// 如果不是容器 则进行提示
			else {
				// 如果不是容器, 播放声音并提示玩家
				player.playSound('conduit.deactivate');
				// 在方块中心生成物品
				opal.TrySpawnItem(player.dimension, item, block.center());
				// 更新玩家操作栏提示
				player.onScreenDisplay.setActionBar('§c§l请点击< 方块容器 >下方的方块!');
				// 清空玩家选中的物品
				player.getComponent('minecraft:inventory')?.container?.setItem(player.selectedSlotIndex);
			}
		}
	}
);
export default components;