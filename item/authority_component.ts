/*
 * 原版接口
 */
import * as serverUI from "@minecraft/server-ui";
import * as server from "@minecraft/server";
/*
 * 系统组件
 */
import * as opal from "../system/opal";
/**
 * * 组件前缀代词
 */
const componentPrefix = 'opal:item.';
/**
 * * 物品自定义组件列表
 */
const components = new Map<string, server.ItemCustomComponent>();
/*
 * 状态侦测
 */
components.set(componentPrefix + 'stateful_inspection',
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
			 * * 获取玩家的背包容器
			 */
			const container = player.getComponent('inventory')?.container;
			// 如果玩家、背包或物品不存在, 则不执行后续操作
			if (!container || !player || !item) return;
			// 检查物品是否冷却完毕, 如果没有冷却完毕则不执行后续操作
			if (!opal.TriggerControl(item.typeId, player, 20)) return;
			/**
			 * * 获取 状态信息
			 */
			const message = opal.GetTargetIntel(player);
			// 如果没有获取到状态信息, 则向玩家发送错误消息并返回
			if (message.length === 0) {
				player.sendMessage([opal.translate(player), { text: '-> <§l§9 状态侦测 §r>未能找到你所指向的目标' }]);
				return;
			};
			// 根据玩家是否潜行, 决定如何显示状态信息
			if (player instanceof server.Player && player.isSneaking) player.sendMessage([...message, '\n']);
			// 玩家未潜行时, 显示状态信息界面
			else if (player instanceof server.Player && !player.isSneaking)
				new serverUI
					.ActionFormData()
					.title('§9<§l 状态信息 §r§9>')
					.body({ rawtext: message })
					.button('§4§l关闭§r')
					.button('§9§l导出§r')
					.show(player)
					// 如果玩家选择了导出按钮, 则清理并打印状态信息
					.then(result => { if (!result.canceled && result.selection == 1) console.warn(JSON.stringify(opal.CleanMessageArray(message))) });
			// 如果不是玩家触发, 则将状态信息发送到世界聊天
			else server.world.sendMessage([...message, '\n']);
			// 播放使用物品时的音效
			player.playSound('conduit.activate');
			// 在玩家位置播放粒子效果
			opal.TrySpawnParticle(player.dimension, 'constant:prompt_firefly', player.location);
			// 开始物品的冷却时间
			item.getComponent('minecraft:cooldown')?.startCooldown(player);
			// 减少物品的耐久度
			opal.SetDurability(player, item, container, player.selectedSlotIndex, 1);
		}
	}
);
/**
 * * 创造工具
 */
components.set(componentPrefix + 'creative_tools',
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
			// 如果玩家没有权限使用此物品, 则返回
			if (!opal.isPlayerAuthorized(player)) return player.sendMessage('§c§l您没有权限使用此物品!§r');
			// 生成 创造模式 辅助道具
			opal.TrySpawnParticle(player.dimension, 'constant:fireworks_fireball_amber_color', opal.Vector.add(player.location, { x: 0, y: 3, z: 0 }));
			server.system.run(() => container.setItem(player.selectedSlotIndex));
			player.runCommand('loot spawn ~ ~3 ~ loot create_mode_toolkit');
			player.playSound("conduit.attack");
			// 播放 粒子效果
			opal.TrySpawnParticle(player.dimension, 'constant:prompt_firefly', player.location);
			// 更新 物品冷却
			item.getComponent('minecraft:cooldown')?.startCooldown(player);
		}
	}
);
/*
 * 匣里乾坤
 */
components.set(componentPrefix + 'world_of_box',
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
			// 如果玩家没有权限使用此物品, 则返回
			if (!opal.isPlayerAuthorized(player)) return player.sendMessage('§c§l您没有权限使用此物品!§r');
			/**
			 * * 实体查询选项
			 */
			const options: server.EntityQueryOptions = {
				excludeTypes: ["minecraft:xp_orb"],
				excludeFamilies: ['player'],
				location: player.location,
				maxDistance: 8
			};
			/**
			 * * 获取 实体队列
			 */
			const entitys = player.dimension.getEntities(options);
			/**
			 * * 获取 状态信息
			 */
			const status = player.getDynamicProperty('qiankun_in_the_box:status');
			// 判断 状态信息
			if (status == undefined) {
				// 输出 状态信息
				opal.TrySpawnParticle(player.dimension, 'constant:smoke_rune_purple', player.location);
				player.sendMessage(`§6|§r 正在<§a 收纳 §r>周围的实体 §6|§r`);
				player.playAnimation("animation.item.common.resist");
				player.playSound("conduit.activate");
				// 收集周围的实体
				entitys.forEach(entity => entity.tryTeleport(player.getHeadLocation()));
				// 更新 状态信息
				player.setDynamicProperty('qiankun_in_the_box:status', true);
				// 执行 实体收容 流程
				server.system.runTimeout(() => player.runCommand(`structure save "${player.id}" ~2~2~2 ~-2~-2~-2 true disk true`), 4);
				server.system.runTimeout(() => entitys.forEach(entity => { if (entity && entity.isValid) entity?.remove() }), 6);
			}
			else {
				// 释放 被收容的 实体
				player.runCommand(`structure load "${player.id}" ~-2~-2~-2 0_degrees none true false`);
				// 输出 状态信息
				opal.TrySpawnParticle(player.dimension, 'constant:smoke_rune_purple', player.location);
				player.sendMessage(`§6|§r 正在<§d 释放 §r>储存的实体 §6|§r`);
				player.playAnimation("animation.item.common.resist");
				player.playSound("conduit.activate");
				// 更新 状态信息
				player.setDynamicProperty('qiankun_in_the_box:status', undefined);
			};
			// 播放 粒子效果
			opal.TrySpawnParticle(player.dimension, 'constant:prompt_firefly', player.location);
			// 更新 物品冷却
			item.getComponent('minecraft:cooldown')?.startCooldown(player);
			// 更新 物品耐久
			opal.SetDurability(player, item, container, player.selectedSlotIndex, 1);
		}
	}
);
/*
 * 调试权杖
 */
components.set(componentPrefix + 'debugging_stick',
	{
		'onUseOn'(data: server.ItemComponentUseOnEvent) {
			// 解构 使用者 与 被使用到的方块状态
			const { source: player, usedOnBlockPermutation, block, itemStack } = data;
			// 如果玩家不是 Player实例 或 方块状态不存在, 则直接返回
			if (!(player instanceof server.Player) || !usedOnBlockPermutation || !block || !itemStack) return;
			// 如果玩家没有权限使用此物品, 则返回
			if (!opal.isPlayerAuthorized(player)) return player.sendMessage('§c§l您没有权限使用此物品!§r');
			/**
			 * * 获取全部的方块状态
			 */
			const states = usedOnBlockPermutation.getAllStates();
			/**
			 * * 方块状态键值对映射表
			 */
			const stateMap = new Map(Object.keys(states).map(key => [key, states[key]]));
			/**
			 * * 定义了 窗口界面 的 表单对象
			 */
			const display = new serverUI.ActionFormData().title(opal.translate(block)).body('请选择您想要调试的属性');
			// 如果 方块状态映射表 大于等于 1, 则加入按钮
			if (stateMap.size >= 1) {
				// 遍历 方块状态键, 并加入按钮
				[...stateMap.keys()].forEach(key => display.button(key));
				// 显示 窗口界面
				display.show(player).then(
					option => {
						// 如果玩家取消了表单, 则不进行操作
						if (option.canceled || option.selection == undefined) return;
						/**
						 * * 被选中的 方块状态键
						 */
						const key = [...stateMap.keys()][option.selection];
						/**
						 * * 被选中的 方块状态值
						 */
						const value = stateMap.get(key);
						/**
						 * * 可选的 方块状态值
						 */
						const validValues = server.BlockStates.get(key)?.validValues
						/**
						 * * 定义了 窗口界面 的 表单对象
						 */
						const display = new serverUI.ActionFormData().title(key + ' : ' + value).body('请选择当前方块状态的< 期望值 >');
						// 如果 方块状态值 有效值 大于等于 1, 则加入按钮
						if (validValues && validValues.length >= 1) {
							// 遍历 方块状态值, 并加入按钮
							validValues.forEach(value => display.button(JSON.stringify(value)));
							// 显示 窗口界面
							display.show(player).then(
								option => {
									// 如果玩家取消了表单, 则不进行操作
									if (option.canceled || option.selection == undefined) return;
									// 设置方块的属性
									opal.TrySetPermutation(block, key, validValues[option.selection])
								}
							)
						}
						else player.sendMessage('§c§l该方块没有方块状态!');
					}
				)
			}
			else player.sendMessage('§c§l该方块没有方块状态!');
		}
	}
);
/**
 * * 物资整理
 */
components.set(componentPrefix + 'material_sorting',
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
			 * * 获取 实体
			 */
			const getEntity = player.getEntitiesFromViewDirection({ maxDistance: 64 })[0]?.entity;
			/**
			 * * 获取 方块
			 */
			const getBlock = player.getBlockFromViewDirection({ maxDistance: 64 })?.block;
			// 执行 向 玩家背包中 抽取 或 注入物品 的流程
			player.isSneaking
				? extractEvent(player, getEntity, getBlock, container)
				: injectEvent(player, getEntity, getBlock, container);
			// 播放音效
			player.playSound("armor.equip_diamond");
			// 更新 物品冷却
			item.getComponent('minecraft:cooldown')?.startCooldown(player);
			// 播放 粒子效果
			opal.TrySpawnParticle(player.dimension, 'constant:prompt_firefly', player.location);
			// 更新 物品耐久
			opal.SetDurability(player, item, container, player.selectedSlotIndex, 1);
		}
	}
);
/**
 * * 物品抽取事件
 */
function extractEvent(player: server.Player, entity?: server.Entity, block?: server.Block, container?: server.Container) {
	/**
	 * * 事件
	 *
	 * @param {server.Container} input 容器
	 */
	const Event = (input: server.Container) => {
		/**
		 * * 物品组
		 */
		const StackGroup: server.ItemStack[] = [];
		//执行 抽取 容器内容 的流程
		if (input && container) {
			/**
			 * * 空格数量
			 */
			let emptySlots = container.emptySlotsCount - 1;
			//抽取 目标容器内 指定数量 的物品
			for (let α = 0; α < input.size; α++) {
				/**
				 * * 获取 物品
				 */
				const getItem = input.getItem(α);
				// 判断 物品是否存在
				if (emptySlots == 0) continue;
				if (!getItem) continue;
				// 将 物品 加入 物品组
				StackGroup.push(getItem);
				input.setItem(α);
				emptySlots -= 1;
			};
			//向 玩家背包中 填充物品
			for (let α of StackGroup) container.addItem(α);
			//显示 玩家背包 的剩余储存空间
			player.sendMessage(`§7正在远程抽取物品, < 您的背包 >的剩余空间为§r:§2 ${emptySlots}`);
		}
	};
	if (entity) {
		/**
		 * * 获取 实体容器
		 */
		const getContainer = entity.getComponent('minecraft:inventory')?.container;
		if (getContainer) Event(getContainer);
		else player.sendMessage(`§7无法获取实体:§6<§c ${entity.typeId} §6>§7的容器信息`);
	}
	else if (block) {
		/**
		 * * 获取 方块容器
		 */
		const getContainer = block.getComponent('minecraft:inventory')?.container;
		if (getContainer) Event(getContainer);
		else {
			/**
			 * * 标题
			 */
			const title: server.RawMessage = {
				text: "<§8§o§l 物资清除 §r>§9操作界面"
			};
			/**
			 * * 选项
			 */
			const option: server.RawMessage[] = [
				{ text: '§c§l掉落物清理§r' }
			];
			/**
			 * * 用法
			 */
			const labelα: server.RawMessage = { text: '物资整理 -> 删除' };
			/**
			 * * 选项
			 */
			const labelβ: server.RawMessage = {
				text: "§6设置§r<§a 清理范围 §r>"
			};
			new serverUI.ModalFormData()
				.title(title)
				.dropdown(labelα, option, { 'defaultValueIndex': 0 })
				.slider(labelβ, 8, 255, { 'valueStep': 1, 'defaultValue': 64 })
				.show(player).then(
					option => {
						if (option.canceled) return;
						opal.TrySpawnParticle(player.dimension, 'constant:general_tips', opal.Vector.add(player.getHeadLocation(), { x: 0, y: 1.5, z: 0 }));
						player.runCommand(`kill @e[type=item,r=${(option.formValues as any[])[1]}]`);
						player.sendMessage("§4掉落物已销毁, 该操作不可撤销!");
					}
				)
		}
	}
};
/**
 * * 物品注入事件
 */
function injectEvent(player: server.Player, entity?: server.Entity, block?: server.Block, container?: server.Container) {
	/**
	 * * 事件
	 *
	 * @param {server.Container} input 容器
	 */
	const Event = (input: server.Container) => {
		if (!container) return;
		// 移除 当前道具
		container.setItem(player.selectedSlotIndex);
		/**
		 * * 物品组
		 */
		const StackGroup: server.ItemStack[] = [];
		//执行 向 容器内 注入物品 的流程
		if (!input) return;
		//获取 目标容器 剩余存储空间
		let emptySlots = input.emptySlotsCount;
		//抽取 玩家背包内 指定数量 的物品
		for (let α = 0; α < container.size; α++) {
			/**
			 * * 获取 物品
			 */
			const getItem = container.getItem(α);
			// 判断 物品是否存在
			if (emptySlots == 0) break;
			if (!getItem) continue;
			// 将 物品 加入 物品组
			StackGroup.push(getItem);
			container.setItem(α);
			emptySlots -= 1;
		}
		//向 容器内 填充物品
		for (let α of StackGroup) input.addItem(α);
		//显示 目标容器 的剩余储存空间
		player.sendMessage(`§7正在远程注入物品, < 目标容器 >的剩余空间为§r:§2 ${emptySlots}`);
	};
	if (entity) {
		/**
		 * * 获取 实体容器
		 */
		const getContainer = entity.getComponent('minecraft:inventory')?.container;
		if (getContainer) Event(getContainer);
		else player.sendMessage(`§7无法获取实体:§6<§c ${entity.typeId} §6>§7的容器信息`);
	}
	else if (block) {
		/**
		 * * 获取 方块容器
		 */
		const getContainer = block.getComponent('minecraft:inventory')?.container;
		if (getContainer) Event(getContainer);
		else player.sendMessage(`§7无法获取方块:§6<§c ${block.typeId} §6>§7的容器信息`);
	}
};
/**
 * * 容器整理
 */
export function containerSorting(player: server.Player, block?: server.Block) {
	/**
	 * * 获取 方块容器
	 */
	const container = block?.getComponent('minecraft:inventory')?.container;
	/**
	 * * 物品组
	 */
	const items: server.ItemStack[] = [];
	// 遍历 方块容器
	if (!container) return;
	// 遍历 方块容器
	for (let index = 0; index < container.size; index++) {
		/**
		 * * 获取 物品
		 */
		const item = container.getItem(index);
		if (!item) continue;
		container.setItem(index);
		items.push(item);
	};
	// 重新 放入 方块容器
	for (let item of opal.OrganizeItemStacks(items)) container.addItem(item);
	// 播放音效
	player.playSound("armor.equip_diamond");
};
/*
 * 抑水之环
 */
components.set(componentPrefix + 'inhibit_water',
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
			 * * 获取 方块对象
			 */
			const block = player.getBlockFromViewDirection({ includeLiquidBlocks: true, maxDistance: 128 })?.block;
			// 判断 方块对象是否存在
			if (!block || block.typeId !== 'minecraft:water') return;
			// 判断 玩家是否潜行
			if (!player.isSneaking) {
				opal.TryFillBlocks(
					block.dimension,
					opal.Vector.add(block.location, { x: 5, y: 5, z: 5 }),
					opal.Vector.add(block.location, { x: -5, y: -5, z: -5 }),
					'starry_map:unreal_space',
					{
						blockFilter: { includePermutations: [server.BlockPermutation.resolve('minecraft:water')] }
					}
				);
				opal.TryFillBlocks(
					block.dimension,
					opal.Vector.add(block.location, { x: 4, y: 4, z: 4 }),
					opal.Vector.add(block.location, { x: -4, y: -4, z: -4 }),
					'minecraft:air',
					{
						blockFilter: { includePermutations: [server.BlockPermutation.resolve('starry_map:unreal_space')] }
					}
				)
			}
			else opal.TryFillBlocks(
				block.dimension,
				opal.Vector.add(block.location, { x: 5, y: 5, z: 5 }),
				opal.Vector.add(block.location, { x: -5, y: -5, z: -5 }),
				'minecraft:air',
				{ blockFilter: { includePermutations: [server.BlockPermutation.resolve('minecraft:water')] } }
			);
			// 播放音效
			player.playSound("bucket.empty_lava");
			// 播放 粒子效果
			opal.TrySpawnParticle(player.dimension, 'constant:prompt_firefly', player.location);
			// 更新 物品冷却
			item.getComponent('minecraft:cooldown')?.startCooldown(player);
			// 更新 物品耐久
			opal.SetDurability(player, item, container, player.selectedSlotIndex, 1);
		}
	}
);
/*
 * 虚空方块
 */
components.set(componentPrefix + 'nihility_space_block',
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
			if (!opal.TriggerControl(item.typeId, player, 2)) return;
			/**
			 * * 获取 下方的 方块
			 */
			const target = player.dimension.getBlock(opal.Vector.add(player.location, opal.Vector.CONSTANT_DOWN));
			// 判断 方块是否存在 是否是空气
			if (target && target.isAir) target.setPermutation(server.BlockPermutation.resolve('starry_map:nihility_space'));
			// 更新 物品冷却
			item.getComponent('minecraft:cooldown')?.startCooldown(player);
			// 播放 粒子效果
			opal.TrySpawnParticle(player.dimension, 'constant:prompt_firefly', player.location);
			// 更新 物品耐久
			opal.SetDurability(player, item, container, player.selectedSlotIndex, 1);
		}
	}
);
/*
 * 紫金葫芦
 */
components.set(componentPrefix + 'purple_gold_gourd',
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
			if (!container || !player || !item || !opal.TriggerControl(item.typeId, player, 80)) return;
			/**
			 * * 动态属性 - 物品阶段
			 */
			const state = item.getDynamicProperty('item:stage.purple_gold_gourd') as number ?? 0;
			/**
			 * * 获取 动态属性 - 捕获时间点
			 */
			const time = item.getDynamicProperty('item:time.purple_gold_gourd') as number ?? 0;
			/**
			 * * 获取 动态属性 - 捕获实体
			 */
			const save = item.getDynamicProperty('item:save.purple_gold_gourd') as string ?? 'minecraft:tnt';
			/**
			 * * 获取 玩家 视线方向的 实体
			 */
			const entity = player.getEntitiesFromViewDirection({ maxDistance: 64 })[0]?.entity;
			// 阶段判断
			switch (state) {
				case 0:
					// 播放 启动 音效
					player.playSound('音效.琉璃.紫金葫芦_蓄力使用');
					// 切换至下一阶段
					item.setDynamicProperty('item:stage.purple_gold_gourd', 1);
					break;

				case 1:
					// 验证实体是否存在且可用
					if (!entity || !entity.isValid || entity instanceof server.Player) return player.playSound('音效.琉璃.紫金葫芦_捕获失败');
					/**
					 * * 获取 实体最大血量
					 */
					const health = entity.getComponent('minecraft:health')?.defaultValue || 10;
					// 判断实体血量是否超过上限
					if (health >= 200) return player.playSound('音效.琉璃.紫金葫芦_捕获失败');
					// 播放 捕获 音效
					player.playSound('音效.琉璃.紫金葫芦_捕捉成功');
					// 切换至下一阶段
					item.setDynamicProperty('item:stage.purple_gold_gourd', 2);
					// 记录发动捕获的时间点
					item.setDynamicProperty('item:time.purple_gold_gourd', server.system.currentTick);
					// 记录实体类型
					item.setDynamicProperty('item:save.purple_gold_gourd', entity.typeId);
					// 播放 释放特效
					opal.TrySpawnParticle(player.dimension, 'constant:excite_rune_purple', entity.location);
					opal.TrySpawnParticle(player.dimension, 'constant:smoke_rune_purple', entity.location);
					opal.TrySpawnParticle(player.dimension, 'constant:erupt_rune_purple', entity.location);
					// 移除实体
					opal.UnloadInventoryAndDestroy(entity);
					break;

				case 2:
					// 验证炼化时间是否结束
					if (server.system.currentTick - time <= 1200) return player.playSound('音效.琉璃.紫金葫芦_继续等待');
					/**
					 * * 创建 实体对象
					 */
					const target = opal.TrySpawnEntity(player.dimension, save, player.location);
					// 回到初始状态
					item.setDynamicProperty('item:stage.purple_gold_gourd', 0);
					// 播放 结束 音效
					player.playSound('音效.琉璃.紫金葫芦_炼化结束');
					// 击杀实体
					if (target instanceof server.Entity) target.kill();
					break;
			};
			// 更新 物品冷却
			item.getComponent('minecraft:cooldown')?.startCooldown(player);
			// 播放 粒子效果
			opal.TrySpawnParticle(player.dimension, 'constant:prompt_firefly', player.location);
			// 更新 物品耐久
			opal.SetDurability(player, item, container, player.selectedSlotIndex, 1);
		}
	}
);
export default components;