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
/**
 * * 组件前缀代词
 */
const componentPrefix = 'opal:item.';
/**
 * * 物品自定义组件列表
 */
const components = new Map<string, server.ItemCustomComponent>();
/*
 * 锚点虚印
 */
components.set(componentPrefix + 'dynamic_anchor_point',
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
			if (!opal.TriggerControl(item.typeId, player, 20)) return;
			/**
			 * * 标题
			 */
			const title: server.RawMessage = {
				text: "§r<§9§o§l 锚点虚印 §r>§9操作界面"
			};
			/**
			 * * 选项
			 */
			const option: server.RawMessage[] = [
				{ text: '<§5§o§l 锚点绑定 §r>' },
				{ text: '<§9§o§l 锚点召集 §r>' },
				{ text: '<§4§o§l 锚点移除 §r>' },
				{ text: '<§9§o§l 锚点传送 §r>' }
			];
			/**
			 * * 获取 窗口对象
			 */
			const display = new serverUI.ActionFormData()
				.title(title)
				.button(option[0], "textures/物品贴图/特殊道具/锚点虚印")
				.button(option[1], "textures/物品贴图/特殊道具/锚点虚印")
				.button(option[2], "textures/物品贴图/特殊道具/锚点虚印")
				.button(option[3], "textures/物品贴图/特殊道具/锚点虚印")
			// 显示 操作界面
			display.show(player).then(
				result => {
					if (result.canceled) return;
					// 根据 选项 进行 不同 处理
					switch (result.selection) {
						// 绑定模式
						case 0: bindingAnchor(player); break;
						// 召集模式
						case 1: musterAnchor(player); break;
						// 移除模式
						case 2: deleteAnchor(player); break;
						// 传送模式
						case 3: arrivalAnchor(player); break;
					};
					// 播放 音效
					player.playSound('random.levelup');
				}
			);
			// 播放 音效
			player.playSound('random.levelup');
			// 更新 物品冷却
			item.getComponent('minecraft:cooldown')?.startCooldown(player);
			// 更新 物品耐久
			opal.SetDurability(player, item, container, player.selectedSlotIndex, 1);
		}
	}
);
/**
 * * 锚点绑定
 */
function bindingAnchor(player: server.Player) {
	/**
	 * * 设定查询参数
	 */
	const options: server.EntityQueryOptions = {
		excludeTypes: ["minecraft:item", "minecraft:xp_orb"],
		excludeFamilies: ["monster", "player"]
	};
	/**
	 * * 获取 实体 的 距离信息
	 */
	const Distance = (entity: server.Entity) => Math.floor(opal.Vector.distance(player.location, entity.location));
	/**
	 * * 获取 实体数组
	 */
	const entitys = opal.EntitysSort(player.dimension, options, (a, b) => Distance(a) - Distance(b), entity => !entity.getDynamicProperty('entity:false_anchor_point') && entity.getComponent('minecraft:is_tamed'));
	/**
	 * * 定义了 窗口界面 的 标题
	 */
	const title: server.RawMessage = {
		text: "§9§l<§u 锚点绑定 §9>§r§3操作界面"
	};
	/**
	 * * 定义了 窗口界面 的 表单对象
	 */
	const display = new serverUI.ActionFormData().title(title);
	// 遍历 实体数组 并 加入 按钮
	entitys.forEach(entity => display.button(opal.DistanceAndName(entity, Distance(entity)), "textures/物品贴图/特殊道具/锚点虚印"));
	if (entitys.length < 1) display.button('§4§l周围不存在 §c<§9 可以§6<§u 锚点绑定 §6>§9的实体 §c>§r', "textures/物品贴图/特殊道具/锚点虚印");
	// 播放 音效
	player.playSound('item.book.page_turn');
	// 显示 窗口界面
	display.show(player).then(
		option => {
			if (option.selection == undefined || entitys.length === 0) return;
			/**
			 * * 获取 目标 实体
			 */
			const target = entitys[option.selection];
			// 播放 音效
			player.playSound('random.levelup');
			// 设定 锚点绑定
			target.setDynamicProperty('entity:false_anchor_point', player.id);
			player.sendMessage([{ text: '正在执行§9§l<§u 锚点绑定 §9>§r: ' }, opal.translate(target)]);
		}
	)
};
/**
 * * 锚点召集
 */
function musterAnchor(player: server.Player) {
	/**
	 * * 设定查询参数
	 */
	const options: server.EntityQueryOptions = {
		excludeTypes: ["minecraft:item", "minecraft:xp_orb"],
		excludeFamilies: ["monster", "player"]
	};
	/**
	 * * 获取 实体 的 距离信息
	 */
	const Distance = (entity: server.Entity) => Math.floor(opal.Vector.distance(player.location, entity.location));
	/**
	 * * 获取 实体数组
	 */
	const queue = opal.EntitysSort(player.dimension, options, (a, b) => Distance(a) - Distance(b), entity => entity.getDynamicProperty('entity:false_anchor_point') == player.id);
	/**
	 * * 定义了 窗口界面 的 标题
	 */
	const title: server.RawMessage = {
		text: "§9§l<§u 锚点召集 §9>§r§3操作界面"
	};
	/**
	 * * 定义了 窗口界面 的 表单对象
	 */
	const display = new serverUI.ActionFormData().title(title).button('§l< 召集全部 >', "textures/物品贴图/特殊道具/锚点虚印");
	// 遍历 实体数组 并 加入 按钮
	queue.forEach(entity => display.button(opal.DistanceAndName(entity, Distance(entity)), "textures/物品贴图/特殊道具/锚点虚印"));
	if (queue.length < 1) display.button('§4§l周围不存在 §c<§9 完成§6<§u 锚点召集 §6>§9的实体 §c>§r', "textures/物品贴图/特殊道具/锚点虚印");
	// 显示 窗口界面
	display.show(player).then(
		option => {
			// 检测 是否满足 运行条件
			if (option.selection == undefined || queue.length === 0) return;
			// 运行 锚点召集
			if (option.selection == 0) {
				// 将列表内的全部目标召集到玩家身边的随机位置
				queue.forEach(entity => entity.teleport(opal.Vector.randomTopmostBlock(player)));
				// 显示提示信息
				player.sendMessage({ text: '正在执行§9§l<§u 锚点召集 §9>§r' });
			}
			else {
				/**
				 * * 获取 目标 实体
				 */
				const target = queue[option.selection - 1];
				// 设定 锚点召集
				target.teleport(player.location);
				player.sendMessage([{ text: '正在执行§9§l<§u 锚点召集 §9>§r: ' }, opal.translate(target)]);
			};
			// 播放 音效
			player.playSound('random.levelup');
		}
	)
};
/**
 * * 锚点移除
 */
function deleteAnchor(player: server.Player) {
	/**
	 * * 设定查询参数
	 */
	const options: server.EntityQueryOptions = {
		excludeTypes: ["minecraft:item", "minecraft:xp_orb"],
		excludeFamilies: ["monster", "player"]
	};
	/**
	 * * 获取 实体 的 距离信息
	 */
	const Distance = (entity: server.Entity) => Math.floor(opal.Vector.distance(player.location, entity.location));
	/**
	 * * 获取 实体数组
	 */
	const queue = opal.EntitysSort(player.dimension, options, (a, b) => Distance(a) - Distance(b), entity => entity.getDynamicProperty('entity:false_anchor_point') == player.id);
	/**
	 * * 定义了 窗口界面 的 标题
	 */
	const title: server.RawMessage = {
		text: "§9§l<§u 锚点移除 §9>§r§3操作界面"
	};
	/**
	 * * 定义了 窗口界面 的 表单对象
	 */
	const display = new serverUI.ActionFormData().title(title);
	// 遍历 实体数组 并 加入 按钮
	queue.forEach(entity => display.button(opal.DistanceAndName(entity, Distance(entity)), "textures/物品贴图/特殊道具/锚点虚印"));
	if (queue.length < 1) display.button('§4§l周围不存在 §c<§9 可以§6<§u 锚点移除 §6>§9的实体 §c>§r', "textures/物品贴图/特殊道具/锚点虚印");
	// 显示 窗口界面
	display.show(player).then(
		option => {
			// 检测 是否满足 运行条件
			if (option.selection == undefined || queue.length === 0) return;
			/**
			 * * 获取 目标 实体
			 */
			const target = queue[option.selection];
			// 播放 音效
			player.playSound('random.levelup');
			// 设定 锚点移除
			target.setDynamicProperty('entity:false_anchor_point');
			player.sendMessage([{ text: '正在执行§9§l<§u 锚点移除 §9>§r: ' }, opal.translate(target)]);
		}
	)
};
/**
 * * 锚点传送
 */
function arrivalAnchor(player: server.Player) {
	/**
	 * * 设定查询参数
	 */
	const options: server.EntityQueryOptions = {
		excludeTypes: ["minecraft:item", "minecraft:xp_orb"],
		excludeFamilies: ["monster", "player"]
	};
	/**
	 * * 获取 实体 的 距离信息
	 */
	const Distance = (entity: server.Entity) => Math.floor(opal.Vector.distance(player.location, entity.location));
	/**
	 * * 获取 实体数组
	 */
	const queue = opal.EntitysSort(player.dimension, options, (a, b) => Distance(a) - Distance(b), entity => entity.getDynamicProperty('entity:false_anchor_point') == player.id);
	/**
	 * * 定义了 窗口界面 的 标题
	 */
	const title: server.RawMessage = {
		text: "§9§l<§u 锚点召集 §9>§r§3操作界面"
	};
	/**
	 * * 定义了 窗口界面 的 表单对象
	 */
	const display = new serverUI.ActionFormData().title(title).button('§l< 随机传送 >', "textures/物品贴图/特殊道具/锚点虚印");
	// 遍历 实体数组 并 加入 按钮
	queue.forEach(entity => display.button(opal.DistanceAndName(entity, Distance(entity)), "textures/物品贴图/特殊道具/锚点虚印"));
	if (queue.length < 1) display.button('§4§l周围不存在 §c<§9 完成§6<§u 锚点召集 §6>§9的实体 §c>§r', "textures/物品贴图/特殊道具/锚点虚印");
	// 显示 窗口界面
	display.show(player).then(
		option => {
			// 检测 是否满足 运行条件
			if (option.selection == undefined || queue.length === 0) return;
			// 运行 锚点召集
			if (option.selection == 0) {
				/**
				 * * 获取 目标 实体
				 */
				const target = queue[opal.Random({ min: 1, max: queue.length - 1 }, true)];
				// 设定 锚点传送
				player.teleport(target.location);
				player.sendMessage([{ text: '正在执行§9§l<§u 锚点传送 §9>§r: ' }, opal.translate(target)]);
			}
			else {
				/**
				 * * 获取 目标 实体
				 */
				const target = queue[option.selection - 1];
				// 设定 锚点传送
				player.teleport(target.location);
				player.sendMessage([{ text: '正在执行§9§l<§u 锚点传送 §9>§r: ' }, opal.translate(target)]);
			};
			// 播放 音效
			player.playSound('random.levelup');
		}
	)
};
/*
 * 神机操持
 */
components.set(componentPrefix + 'mechanized_operation',
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
			if (!opal.TriggerControl(item.typeId, player, 20)) return;
			/**
			 * * 过滤器参数
			 */
			const whaleOptions: server.EntityQueryOptions = {
				type: 'starry_map:abyss_whale.support',
				location: player.location,
				maxDistance: 5
			};
			/**
			 * * 获取 附近的 渊鲸
			 */
			const whale = player.dimension.getEntities(whaleOptions);
			/**
			 * * 界面标题
			 */
			const title: server.RawMessage = {
				text: "§r<§9§o§l 神机操持 §r>§9操作界面"
			};
			/**
			 * * 界面选项
			 */
			const option: server.RawMessage[] = [
				{ text: '<§5§o§l 上浮模式 §r>' },
				{ text: '<§5§o§l 下潜模式 §r>' },
				{ text: '<§9§o§l 列车行进 §r>' },
				{ text: '<§9§o§l 列车左旋 §r>' },
				{ text: '<§9§o§l 列车右旋 §r>' },
			];
			/**
			 * * 列车查询参数
			 */
			const trainOptions: server.EntityQueryOptions = {
				families: ['train'],
				maxDistance: 48,
				location: player.location
			};
			// 播放 音效
			player.playSound('respawn_anchor.charge');
			/**
			 * * 创建 界面
			 */
			const display = new serverUI
				.ActionFormData()
				.title(title)
				.button(option[0], "textures/项目图标/神机操持/上浮模式")
				.button(option[1], "textures/项目图标/神机操持/下潜模式")
				.button(option[2], "textures/项目图标/神机操持/载具行驶")
				.button(option[3], "textures/项目图标/神机操持/左舷回转")
				.button(option[4], "textures/项目图标/神机操持/右舷回转")
			// 显示界面
			display.show(player).then(
				select => {
					//对 用户选项 做出反应
					switch (select.selection) {
						//启动 上浮模式
						case 0:
							// 遍历 附近的 渊鲸
							opal.GetContractRoles(player, whaleOptions,
								entity => {
									/**
									 * * 获取 当前的方块
									 */
									const block = entity.dimension.getBlock(entity.location);
									// 如果处于流体中 就 解除渊鲸 的 航行限制
									if (block?.isLiquid) entity.triggerEvent('entity_event:secure_prohibit');
									// 执行上浮模式实体事件
									entity.triggerEvent('entity_event:immediately_float');
								}
							);
							break;

						//启动 下潜模式
						case 1:
							whale.forEach(info => info.triggerEvent('entity_event:immediately_dive'))
							break;

						// 启动 列车行进
						case 2:
							opal.GetContractRoles(player, trainOptions, (entity) => entity.triggerEvent('entity_event:switch'));
							player.playSound('tile.piston.out');
							break;

						// 启动 列车左旋
						case 3:
							opal.GetContractRoles(player, trainOptions, (entity) => entity.addTag('tunnel_train.Sinistral'));
							player.playSound('tile.piston.out');
							break;

						// 启动 列车右旋
						case 4:
							opal.GetContractRoles(player, trainOptions, (entity) => entity.addTag('tunnel_train.Dextral'));
							player.playSound('tile.piston.out');
							break;
					};
					// 播放 音效
					player.playSound('random.levelup');
				}
			);
			// 更新 物品冷却
			item.getComponent('minecraft:cooldown')?.startCooldown(player);
		}
	}
);
/*
 * 参悟之石
 */
components.set(componentPrefix + 'enlightenent',
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
			if (!opal.TriggerControl(item.typeId, player, 20)) return;
			/**
			 * * 设置 实体 的 查询条件
			 */
			const options: server.EntityQueryOptions = {
				excludeTypes: ["minecraft:item", "minecraft:xp_orb", player.typeId],
				excludeFamilies: ["monster"],
				location: player.location,
				maxDistance: 16
			};
			/**
			 * * 获取 实体 的 距离信息
			 */
			const entityDistance = (entity: server.Entity) => Math.floor(opal.Vector.distance(player.location, entity.location));
			/**
			 * * 实体过滤器
			 */
			const entityFilter = (entity: server.Entity) => entity.getComponent('minecraft:health') !== undefined;
			/**
			 * * 获取 实体组 并 过滤掉 无法驯服的实体
			 */
			const entityQueue = opal.EntitysSort(player.dimension, options, (a, b) => entityDistance(a) - entityDistance(b), entityFilter);
			/**
			 * * 定义了 窗口界面 的 标题
			 */
			const itemTitle: server.RawMessage = {
				text: "§9§l<§u 参悟之石 §9>§r§3操作界面"
			};
			/**
			 * * 定义了 窗口界面 的 表单对象
			 */
			const queueDisplay = new serverUI.ActionFormData().title(itemTitle);
			/**
			 * * 功能选择界面
			 *
			 * @param option - 选项
			 */
			const PropertySelection = (option: serverUI.ActionFormResponse) => {
				// 判断玩家是否 选择 退出
				if (option.selection == undefined || entityQueue.length == 0) return;
				/**
				 * * 获取 目标 实体
				 */
				const target = entityQueue[option.selection];
				/**
				 * * 实体属性
				 */
				const property = opal.GetProperty(target);
				/**
				 * * 实体血量
				 */
				const health = target.getComponent('health');
				/**
				 * * 能量返还
				 */
				const returnEnergy = target.getDynamicProperty('entity:return_energy') as number ?? 0;
				/**
				 * * 获取 战斗经验值
				 */
				const experience = target.getDynamicProperty('entity:experience') as number ?? 0;
				/**
				 * * 用户标识符
				 */
				const userId = target.getDynamicProperty('entity:contract_user') as string;
				/**
				 * * 用户名称
				 */
				const userName = userId ? server.world.getEntity(userId)?.nameTag : '未知';
				/**
				 * * 限制数值的范围
				 *
				 * @param {number} value - 数值
				 *
				 * @returns {number} 限定范围内的数值
				 */
				const levelClamp = (value: number): number => opal.Clamp({ max: table.max_experience, min: 0 }, Math.floor(value));
				/**
				 * * 界面标题
				 */
				const targetTitle: server.RawMessage = {
					rawtext: [
						{ text: '§u『§l ' }, opal.translate(target), { text: ' §u』' }
					]
				};
				/**
				 * * 界面内容
				 */
				const targetIntel: server.RawMessage = {
					rawtext: [
						{ text: `[§q§l 实体血量 §r] : §l§2${Math.floor((health?.currentValue ?? 0))}§r /§l§3 ${health?.defaultValue ?? 0}§r\n` },
						{ text: `[§p§l 实体归属 §r] : §l§6${userName}§r\n` },
						{ text: `[§1§l 战术等级 §r] : §l§9${levelClamp(experience / table.experience_improve)}§r\n` },
						{ text: `[§s§l 战斗经验 §r] : §l§b${experience}§r\n` },
					]
				};
				/**
				 * * 提高被选中的属性数据
				 *
				 * @param option - 选项对象
				 */
				const increaseProperty = (option: serverUI.ActionFormResponse, amount: number) => {
					// 判断玩家是否做出了选择
					if (option.selection == undefined) return;
					// 基于 玩家选择的选项 判断 什么属性的数值
					switch (option.selection) {
						//* 基础攻击
						case 0:
							// 判断 是否可以继续提升
							if (property.basic_attack > 95) return player.sendMessage(`§l§4<§c 基础攻击 §4>§r已到达上限, 无法继续提升`);
							// 提示 修改结果
							player.sendMessage(`§l§1<§9 基础攻击 §1>§t获得提升, 现在为§r: §l§u${property.basic_attack + (5 * amount)}`);
							// 更改 实体属性
							opal.AlterProperty(target, { basic_attack: (5 * amount) });
							break;
						//* 基础暴击
						case 1:
							// 判断 是否可以继续提升
							if (property.erupt_odds > 95) return player.sendMessage(`§l§4<§c 基础暴击 §4>§r已到达上限, 无法继续提升`);
							// 提示 修改结果
							player.sendMessage(`§l§1<§9 基础暴击 §1>§t获得提升, 现在为§r: §l§u${property.erupt_odds + (5 * amount)}%`);
							// 更改 实体属性
							opal.AlterProperty(target, { erupt_odds: (5 * amount) });
							break;
						//* 基础暴伤
						case 2:
							// 判断 是否可以继续提升
							if (property.erupt_hurt > 475) return player.sendMessage(`§l§4<§c 基础暴伤 §4>§r已到达上限, 无法继续提升`);
							// 提示 修改结果
							player.sendMessage(`§l§1<§9 基础暴伤 §1>§t获得提升, 现在为§r: §l§u${property.erupt_hurt + (25 * amount)}%`);
							// 更改 实体属性
							opal.AlterProperty(target, { erupt_hurt: (25 * amount) });
							break;
						//* 能量返还
						case 3:
							// 判断属性数值是否到达上限
							if (returnEnergy > 95) return player.sendMessage(`§l§4<§c 能量返还 §4>§r已到达上限, 无法继续提升`);
							// 显示 修改结果
							player.sendMessage(`§l§1<§9 能量返还 §1>§t获得提升, 现在为§r: §l§u${returnEnergy + (5 * amount)}`);
							// 修改属性值
							target.setDynamicProperty("entity:return_energy", returnEnergy + (5 * amount));
							break;
						//* 未知选项
						default: break;
					};
					// 消耗指定数量的物品
					opal.ConsumeItemStack(container, player.selectedSlotIndex, item, amount);
				};
				/**
				 * * 创建 选择 物品数量 的窗口
				 */
				const amountDisplay = new serverUI.ModalFormData()
					.title(targetTitle)
					.slider('消耗数量', 1, item.amount, { 'valueStep': 1, 'defaultValue': 1 })
				/**
				 * * 创建 选择 加成属性 的窗口
				 */
				const PropertyDisplay = new serverUI.ActionFormData()
					.title(targetTitle)
					.body(targetIntel)
					.button(`提升§l§1[§9 基础攻击 §1]§r : §l§2${property.basic_attack}§r /§l§3 100 §r<§u§l +5 §r>`, 'textures/项目图标/攻击')
					.button(`提升§l§1[§9 基础暴击 §1]§r : §l§2${property.erupt_odds}%% §r /§l§3 100%% §r<§u§l +5%% §r>`, 'textures/项目图标/命中')
					.button(`提升§l§1[§9 基础暴伤 §1]§r : §l§2${property.erupt_hurt}%% §r /§l§3 500%% §r<§u§l +25%% §r>`, 'textures/项目图标/提升')
					.button(`提升§l§1[§9 能量返还 §1]§r : §l§2${returnEnergy} §r /§l§3 100 §r<§u§l +5 §r>`, 'textures/项目图标/返回')
					.button(`§l§1[§9 技能模组 §1]§r`, 'textures/项目图标/查询')
				// 判断 目标实体 与 手持物品 是否存在
				if (!item || !target) return;
				// 显示 窗口界面
				PropertyDisplay.show(player).then(
					option => {
						// 验证表单关闭状态 或 窗口界面数据是否为空
						if (option.canceled || option.selection == undefined) return;
						// 基于 玩家选择的选项 判断 是否消耗指定数量的物品
						if (option.selection >= 4) {
							/**
							 * * 查询并创建当前实体的战斗技能的情报接口
							 */
							const intel = opal.lexiconInterface(player, target.typeId);
							// 打开情报窗口, 展示查询到的信息
							opal.windowedRetriever(player, intel);
						}
						// 创建 选择 物品数量 的窗口
						else amountDisplay.show(player).then(
							amount => {
								/**
								 * 获取 窗口界面 的数据
								 */
								const info = amount.formValues;
								// 验证表单关闭状态 或 窗口界面数据是否为空
								if (!amount.canceled && info !== undefined) increaseProperty(option, info[0] as number)
							}
						)
					}
				);
			};
			// 在实体队列中添加当前玩家
			entityQueue.unshift(player);
			// 遍历 实体数组 并 加入 按钮
			entityQueue.forEach(entity => queueDisplay.button(opal.DistanceAndName(entity, entityDistance(entity)), "textures/物品贴图/特殊道具/参悟之石"));
			// 播放 音效
			player.playSound('bucket.empty_lava');
			// 显示 窗口界面
			queueDisplay.show(player).then(option => PropertySelection(option));
			// 更新 物品冷却
			item.getComponent('minecraft:cooldown')?.startCooldown(player);
		}
	}
);
/*
 * 涤尽铅华
 */
components.set(componentPrefix + 'reduction_pureness',
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
			if (!opal.TriggerControl(item.typeId, player, 20)) return;
			/**
			 * * 设置 实体 的 查询条件
			 */
			const options: server.EntityQueryOptions = {
				excludeTypes: ["minecraft:item", "minecraft:xp_orb", player.typeId],
				excludeFamilies: ["monster"]
			};
			/**
			 * * 获取 实体 的 距离信息
			 */
			const Distance = (entity: server.Entity) => Math.floor(opal.Vector.distance(player.location, entity.location));
			/**
			 * * 实体过滤器
			 */
			const Filter = (entity: server.Entity) => {
				if (!entity.getComponent('minecraft:health')) return false;
				if (entity.getDynamicProperty('entity:contract_user') !== player.id) return false;
				return true;
			};
			/**
			 * * 获取 实体组 并 过滤掉并未签订契约的实体
			 */
			const queue = opal.EntitysSort(player.dimension, options, (a, b) => Distance(a) - Distance(b), entity => Filter(entity));
			/**
			 * * 定义了 窗口界面 的 标题
			 */
			const title: server.RawMessage = {
				text: "§9§l<§u 涤尽铅华 §9>§r§3操作界面"
			};
			/**
			 * * 定义了 窗口界面 的 表单对象
			 */
			const display = new serverUI.ActionFormData().title(title);
			// 遍历 实体数组 并 加入 按钮
			if (queue.length >= 1) queue.forEach(entity => display.button(opal.DistanceAndName(entity, Distance(entity)), "textures/物品贴图/召唤凭证/星月诗篇"));
			else display.button('§4§l周围不存在 §c<§9 可以§6<§2 纯净化 §6>§9的实体 §c>§r', "textures/物品贴图/召唤凭证/星月诗篇");
			// 播放 音效
			player.playSound('bucket.empty_lava');
			// 显示 窗口界面
			display.show(player).then(
				option => {
					if (option.selection == undefined || queue.length == 0) return;
					/**
					 * * 获取 目标 实体
					 */
					const target = queue[option.selection];
					/**
					 * * 定义 相机参数
					 */
					const camera = player.camera;
					/**
					 * * 粒子参数
					 */
					const molang = new server.MolangVariableMap();
					/**
					 * * 复制实体坐标
					 */
					const anchor_0 = opal.Vector.copy(target.location);
					/**
					 * * 复制实体坐标
					 */
					const anchor_1 = opal.Vector.add(anchor_0, { x: 0, y: 2, z: 0 });
					/**
					 * * 创建 百灵绘卷 物品对象
					 */
					const material = new server.ItemStack('starry_map:moon_and_stars');
					/**
					 * * 物品名称
					 */
					const name = '§b启航星语 - §s';
					/**
					 * * 物品词缀
					 */
					const lore = [
						`类型: ${target.typeId}`,
						`名称: ${target.nameTag}`,
						"§b___________________",
						"此乃[ 魔神 - 葬火 ]的恩惠",
						"在登临[ 最终档案馆 ]的王座时",
						"祂曾向众生立下许诺:",
						"    凡此领航之众, 皆为吾之同族",
						"    只要吾之火不曾熄灭, 纵使败者亦能重燃"
					];
					// 封印实体
					opal.UnloadInventoryAndPackage(target, player, material, name, lore);
					// 设置 粒子尺寸
					molang.setFloat('variable.size', 4);
					// 播放 蝴蝶特效
					molang.setFloat('variable.direction', 3);
					opal.TrySpawnParticle(player.dimension, 'scripts:path_butterfly', anchor_0, molang);
					// 播放 圆环特效
					molang.setFloat('variable.direction', 0);
					opal.TrySpawnParticle(player.dimension, 'scripts:path_round', anchor_1, molang);
					// 播放 四芒星特效
					opal.TrySpawnParticle(player.dimension, 'scripts:path_star4_small', anchor_1, molang);
					// 播放 封印动画
					camera.setCamera('minecraft:free', { location: opal.Vector.add(anchor_0, { x: 5, y: 5, z: 5 }), facingLocation: anchor_0, easeOptions: { easeTime: 2 } });
					server.system.runTimeout(() => camera.fade({ fadeColor: { red: 0, green: 0, blue: 0 }, fadeTime: { fadeInTime: 1, fadeOutTime: 0.5, holdTime: 0.5 } }), 30);
					server.system.runTimeout(() => player.playSound('mob.allay.idle'), 60);
					server.system.runTimeout(() => player.teleport(anchor_0), 60);
					server.system.runTimeout(() => camera.clear(), 60);
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
 * * 涵养灵露
 */
components.set(componentPrefix + 'moment_repair_dew',
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
			 * * 玩家背包容器
			 */
			const container = player.getComponent('inventory')?.container;
			/**
			 * * 玩家装备槽容器
			 */
			const equippable = player.getComponent('equippable');
			/**
			 * * 物品槽位
			 */
			const equippableSlot: server.EquipmentSlot[] = Object.values(server.EquipmentSlot);
			/**
			 * * 玩家装备槽物品
			 */
			const equippables = equippableSlot.map(slot => equippable?.getEquipment(slot));
			// 判断条件是否满足
			if (!container || !player || !item) return;
			// 判断是否冷却完成
			if (!opal.TriggerControl(item.typeId, player, 20)) return;
			// 播放 基础使用音效
			player.playSound('fire.ignite');
			// 遍历 玩家背包
			for (let index = 0; index < container.size; index++) {
				/**
				 * * 获取 背包中的物品对象
				 */
				const getItem = container.getItem(index);
				/**
				 * * 获取 物品耐久度
				 */
				const durability = getItem?.getComponent('durability');
				// 跳过 无效物品
				if (!getItem || !durability || durability.damage == 0) continue;
				// 显示 文本提示
				player.sendMessage([opal.translate(getItem), ' §a§l修复成功!']);
				// 恢复 物品耐久度
				durability.damage -= durability.damage;
				// 播放 恢复音效
				player.playSound('conduit.attack');
				// 置换 物品
				container.setItem(index, getItem);
				break
			};
			// 遍历玩家装备栏
			equippables.forEach(
				(item, index) => {
					/**
					 * * 获取 物品耐久度
					 */
					const durability = item?.getComponent('durability');
					// 跳过 无效物品
					if (!item || !durability || durability.damage == 0) return;
					// 显示 文本提示
					player.sendMessage([opal.translate(item), ' §a§l修复成功!']);
					// 恢复 物品耐久度
					durability.damage -= durability.damage;
					// 播放 恢复音效
					player.playSound('conduit.attack');
					// 置换 物品
					equippable?.setEquipment(equippableSlot[index], item);
				}
			);
			// 删除 物品
			opal.DeleteItemStack(container, new server.ItemStack(item.typeId));
			// 更新 物品冷却
			item.getComponent('minecraft:cooldown')?.startCooldown(player);
		}
	}
);
/*
 * 幻影驱散
 */
components.set(componentPrefix + 'phantom_dispel_dust',
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
			if (!opal.TriggerControl(item.typeId, player, 20)) return;
			// 播放 基础使用音效
			player.playSound('fire.ignite');
			/**
			 * * 获取 实体 的 距离信息
			 */
			const distance = (entity: server.Entity) => Math.floor(opal.Vector.distance(player.location, entity.location));
			/**
			 * * 实体过滤器
			 */
			const filter = (entity: server.Entity) => {
				// 筛除 无血量组件的实体
				if (!entity.getComponent('minecraft:health')) return false;
				// 筛除 已经被驯服的实体
				if (entity.getComponent('is_tamed')) return false;
				// 如果玩家为创造 则无视敌对实体的攻击目标
				if (opal.isPlayerAuthorized(player)) return true;
				// 筛除 攻击目标不是玩家的实体
				if (entity.target?.id !== player.id) return false;
				// 默认选中实体
				return true;
			};
			/**
			 * * 扫描敌对生物队列
			 */
			const entitys = opal.EntitysSort(player.dimension, { families: ['monster'] }, distance, filter);
			// 判断 是否扫描到敌对实体
			if (entitys.length < 1) return;
			// 遍历敌对生物队列
			entitys.forEach(
				entity => {
					// 播放 烟雾 粒子效果
					opal.TrySpawnParticle(entity.dimension, 'minecraft:knockback_roar_particle', entity.getHeadLocation());
					opal.TrySpawnParticle(entity.dimension, 'constant:impact_rune_white', entity.getHeadLocation());
					opal.TrySpawnParticle(entity.dimension, 'constant:excite_rune_white', entity.getHeadLocation());
					opal.TrySpawnParticle(entity.dimension, 'constant:pulse_rune_white', entity.getHeadLocation());
					// 播放 水花 粒子效果
					opal.SprayParticleTrigger(entity.dimension, entity.location);
					// 删除 实体
					entity.remove();
				}
			);
			// 删除 物品
			opal.DeleteItemStack(container, new server.ItemStack(item.typeId));
			// 更新 物品冷却
			item.getComponent('minecraft:cooldown')?.startCooldown(player);
			// 给与玩家 隐身效果
			player.addEffect('minecraft:invisibility', 60);
			// 播放 实体销毁时的音效
			player.playSound('cauldron.fillpotion');
		}
	}
);
/*
 * 换装礼盒
 */
components.set(componentPrefix + 'clothing_container',
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
			if (!opal.TriggerControl(item.typeId, player, 20)) return;
			/**
			 * * 获取 神恩领航者 - 琉璃
			 */
			const crystal = player.getEntitiesFromViewDirection().map(raycast => raycast.entity).filter(entity => entity.typeId == 'starry_map:guide.crystal')[0]
			/**
			 * * 定义了 窗口界面 的 标题
			 */
			const title: server.RawMessage = {
				text: "§9《§5 换装礼盒 §9》§r"
			};
			/**
			 * * 定义了 窗口界面 的 选项
			 */
			const option: server.RawMessage[] = [
				{ text: '<§q§o§l 自然 §r>' },
				{ text: '<§p§o§l 灿烂 §r>' },
				{ text: '<§d§o§l 樱华 §r>' },
				{ text: '<§u§o§l 梦幻 §r>' },
				{ text: '<§s§o§l 漫海 §r>' },
				{ text: '<§a§o§l 夏鸣 §r>' },
				{ text: '<§c§o§l 领航 §r>' }
			];
			/**
			 * * 定义了 窗口界面 的 表单对象
			 */
			const display = new serverUI.ActionFormData()
				.title(title)
				.button(option[0], "textures/项目图标/神恩使徒/界木")
				.button(option[1], "textures/项目图标/神恩使徒/归忆")
				.button(option[2], "textures/项目图标/神恩使徒/烛火")
				.button(option[3], "textures/项目图标/神恩使徒/极雷")
				.button(option[4], "textures/项目图标/神恩使徒/诸海")
				.button(option[5], "textures/项目图标/神恩使徒/界木")
				.button(option[6], "textures/项目图标/神恩使徒/启程")
			// 输出 表单对象
			if (crystal && crystal?.isValid) display.show(player).then(
				option => {
					if (option.canceled) return;
					// 设定琉璃的皮肤纹理
					crystal.setProperty('property:facade', Number(option.selection));
					// 播放音效
					player.playSound('beacon.power');
				}
			);
			// 播放 基础使用音效
			player.playSound('chime.amethyst_block');
			// 更新 物品冷却
			item.getComponent('minecraft:cooldown')?.startCooldown(player);
		}
	}
);
/*
 * 契约重撰
 */
components.set(componentPrefix + 'contract_rewriting',
	{
		async onHitEntity(source) {
			/**
			 * 玩家对象, 触发自定义组件的玩家
			 */
			const player = source.attackingEntity;
			/**
			 * 被攻击的实体对象, 即攻击命中的实体
			 */
			const entity = source.hitEntity;
			/**
			 * 物品对象, 触发自定义组件的物品
			 */
			const item = source.itemStack;
			/**
			 * 玩家的背包容器, 用于后续操作玩家背包中的物品
			 */
			const container = player?.getComponent('inventory')?.container;
			// 如果玩家不是Player实例、物品不存在或背包容器不存在, 则直接返回
			if (!(player instanceof server.Player) || !item || !container) return;
			// 检查物品是否冷却完毕, 如果没有冷却完毕则返回
			if (!opal.TriggerControl(item.typeId, player, 20)) return;
			// 在玩家所在维度播放粒子效果
			opal.TrySpawnParticle(player.dimension, 'constant:prompt_firefly', player.location);
			// 开始物品的冷却计时
			item.getComponent('minecraft:cooldown')?.startCooldown(player);
			// 尝试驯服被攻击的实体
			entity.getComponent('tameable')?.tame(player);
			// 播放使用音效给玩家
			player.playSound('chime.amethyst_block');
			// 设置玩家动作条的文本信息
			player.onScreenDisplay.setActionBar({ text: '§a§l契约重铸成功! 实体已修正从属关系!§r' });
			// 等待一个游戏刻（tick）的时间
			await server.system.waitTicks(1);
			// 设置实体的契约用户为当前玩家
			entity.setDynamicProperty('entity:contract_user', player.id);
			// 从玩家背包中删除该物品
			opal.DeleteItemStack(container, item);
		}
	}
);
/**
 * * 方块获取
 */
export function obtainBlock(player: server.Player, container: server.Container, block?: server.Block) {
	/**
	 * * 方块的物品对象
	 */
	const protoItem = block?.getItemStack(1, true);
	// 给与玩家对应 的 方块物品对象
	if (!block || !protoItem) return;
	/**
	 * * 方块的附加信息
	 */
	const message: server.RawMessage = { rawtext: [{ text: '获取到: ' }, opal.translate(block)] };
	// 在背包中添加方块物品
	container.addItem(protoItem);
	// 输出 消息
	player.sendMessage(message);
};
export default components;