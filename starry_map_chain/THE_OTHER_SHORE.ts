/*
 * 原版接口
 */
import * as serverUI from "@minecraft/server-ui";
import * as server from "@minecraft/server";
/*
 * 系统组件
 */
import { Vector, RandomFloor, Clamp } from "../system/maths";
/*
 * 控制模块
 */
import { TriggerControl } from '../system/control';
/*
 * 实例创建模块
 */
import { TrySetPermutation, TrySpawnParticle, TrySpawnItem, TryFillBlocks, TrySpawnEntity, SetFreePointer, TryProcessBlocksInVolume } from '../system/create'
// 玩家加入服务器时发送提示信息
server.world.afterEvents.playerJoin.subscribe(
	async event => {
		await server.system.waitTicks(RandomFloor(200, 400));
		(server.world.getEntity(event.playerId) as server.Player).sendMessage('[§v 琉璃 §r]: 拿着<§a 挖掘工具 §r>点击<§v 任意按钮 §r>后, 即可开启<§9 轻量连锁 §r>的控制界面哦～');
	}
);
// 玩家破坏方块后触发主进程
server.world.afterEvents.playerBreakBlock.subscribe(event => lightweightChainMining(event.player, event.block, event.brokenBlockPermutation, event.itemStackBeforeBreak));
// 玩家点击按钮后触发控制界面
server.world.afterEvents.buttonPush.subscribe(
	event => {
		/**
		 * 获取触发事件的实体
		 */
		const source = event.source;
		// 判断点击按钮的是否是玩家
		if (source instanceof server.Player) CreateControlInterface(source);
	}
);
/**
 * 轻量级连锁挖掘函数, 用于从起始方块开始挖掘与其类型相同的相邻方块
 *
 * 挖掘操作会持续进行, 直到达到指定的最大挖掘数量或工具耐久耗尽
 *
 * @param {server.Player} player - 执行挖掘操作的玩家对象
 *
 * @param {server.Block} startBlock - 开始挖掘的起始方块
 *
 * @param {server.BlockPermutation} blockPermutation - 方块的排列组合信息, 用于比较方块类型
 *
 * @param {server.ItemStack} [tool] - 用于挖掘的工具, 必须有 'minecraft:digger' 标签
 */
async function lightweightChainMining(player: server.Player, startBlock: server.Block, blockPermutation: server.BlockPermutation, tool?: server.ItemStack) {
	// 校验工具和玩家状态
	if (!tool || (!tool.hasTag('minecraft:digger') && !tool.hasTag('minecraft:is_shears'))) return;
	// 检查玩家是否拥有'lightweight_chain_mining'属性
	if (!player.getDynamicProperty('lightweight_chain_mining')) return;
	// 检查玩家是否处于潜行状态
	if (!player.isSneaking) return;
	// 触发挖掘判定, 由外部定义的控制函数决定是否允许挖掘
	if (!TriggerControl('轻量连锁_挖掘判定', player)) return;
	/**
	 * 获取工具的耐久度组件
	 */
	const durabilityComponent = tool.getComponent('minecraft:durability');
	if (!durabilityComponent) return;
	/**
	 * 获取玩家背包容器
	 */
	const playerContainer = player.getComponent('minecraft:inventory')?.container;
	if (!playerContainer) return;
	/**
	 * 获取工具的附魔信息
	 */
	const enchantments = tool.getComponent('minecraft:enchantable')?.getEnchantments().map(e => e.type.id);
	if (!enchantments) return;
	/**
	 * 最大连锁数量
	 */
	const maxNumber = player.getDynamicProperty('max_chain_mining') as number;
	/**
	 * 是否启用 木桶缓存机制
	 */
	const bucketCache = player.getDynamicProperty('bucket_cache') as boolean;
	/**
	 * 附加功能
	 */
	const additionalFeatures = tool.hasTag('minecraft:is_shears') || enchantments.includes('silk_touch') ? 1 : enchantments.includes('fortune') ? 2 : 0;
	/**
	 * 定义一个函数, 根据方块类型返回可挖掘的相邻方向
	 *
	 * @param permutation - 方块排列组合信息
	 *
	 * @returns - 可挖掘的相邻方向向量数组
	 */
	function getMovableDirections(permutation: server.BlockPermutation): Vector[] {
		switch (permutation.type.id) {
			case 'minecraft:grass_block':
			case 'minecraft:coarse_dirt':
			case 'minecraft:mycelium':
			case 'minecraft:podzol':
			case 'minecraft:stone':
			case 'minecraft:dirt':
				return Vector.CONSTANT_HORIZONTAL; // 水平方向

			default:
				return Vector.CONSTANT_ALL; // 六个方向
		}
	};
	/**
	 * 获取初始块的可挖掘方向
	 */
	const directions = getMovableDirections(blockPermutation);
	/**
	 * 初始化队列, 用于管理待处理方块, 采用数组实现队列结构
	 */
	const blocksToMine: server.Block[] = [startBlock];
	/**
	 * 记录已挖掘方块的数量, 默认为 0 开始
	 */
	let minedCount = 0;
	/**
	 * 获取当前操作的维度
	 */
	const blockDimension = startBlock.dimension;
	/**
	 * 创建一个映射表, 用于将特定方块类型映射为对应的方块类型
	 */
	const blcokMapping = new Map<string, string>(
		[
			['minecraft:lit_deepslate_redstone_ore', 'redstone_ore'],
			['minecraft:deepslate_redstone_ore', 'redstone_ore'],
			['minecraft:lit_redstone_ore', 'redstone_ore'],
			['minecraft:redstone_ore', 'redstone_ore'],
		]
	);
	// 开始循环处理, 直到队列为空或达到最大数量或工具损坏
	while (blocksToMine.length > 0 && minedCount < maxNumber) {
		// 如果达到了最大挖掘数量或工具损坏, 则跳出循环停止挖掘
		if (minedCount >= maxNumber || durabilityComponent.damage >= durabilityComponent.maxDurability - 6) break;
		/**
		 * 从队列 'blocksToMine' 中移除第一个方块, 并将其赋值给变量 'currentBlock'
		 *
		 * 使用 shift() 方法实现先进先出（FIFO）的行为, 确保按顺序处理相邻方块
		 */
		const currentBlock = blocksToMine.shift();
		// 如果当前方块不存在, 则跳出循环
		if (!currentBlock) break;
		// 处理当前方块周围的相邻方块, 根据可挖掘方向数组进行检查
		for (const direction of directions) {
			/**
			 *  检查相邻块是否存在, 并且类型是否与目标类型相同
			 */
			const adjacentBlock = currentBlock.offset(direction);
			// 如果相邻块不存在
			if (!adjacentBlock || !adjacentBlock.isValid) continue;
			/**
			 * 目标方块的识别类型标签映射
			 */
			const targetID = blcokMapping.get(adjacentBlock.typeId) || adjacentBlock.typeId;
			/**
			 * 原始方块的识别类型标签映射
			 */
			const protoID = blcokMapping.get(blockPermutation.type.id) || blockPermutation.type.id;
			// 如果相邻块的类型与目标类型不同, 则跳过该相邻块
			if (targetID !== protoID) continue;
			// 填充命令, 将相邻方块替换为空气, 达到挖掘效果
			if (additionalFeatures !== 1) blockDimension.runCommand(`fill ${adjacentBlock.x} ${adjacentBlock.y} ${adjacentBlock.z} ${adjacentBlock.x} ${adjacentBlock.y} ${adjacentBlock.z} air destroy`);
			// 精准采集效果
			else if (additionalFeatures == 1) {
				// 尝试将方块作为掉落物进行掉落
				TrySpawnItem(blockDimension, new server.ItemStack(adjacentBlock.typeId), adjacentBlock.bottomCenter());
				// 拆除被选中的方块
				adjacentBlock.setType('minecraft:air');
			}
			// 时运效果(暂时禁用)
			else if (additionalFeatures == 2) {
				/**
				 * 获取相邻方块上方的实体, 并尝试将其作为掉落物进行掉落
				 */
				const options: server.EntityQueryOptions = {
					location: adjacentBlock.bottomCenter(),
					maxDistance: 2,
					closest: 1,
					type: 'minecraft:item'
				};
				// 拆除被选中的方块
				blockDimension.runCommand(`fill ${adjacentBlock.x} ${adjacentBlock.y} ${adjacentBlock.z} ${adjacentBlock.x} ${adjacentBlock.y} ${adjacentBlock.z} air destroy`);
				// 等待 1 tick
				await server.system.waitTicks(1);
				// 生成额外的掉落物
				if (Math.random() >= 0.75)
					blockDimension
						.getEntities(options)
						.map(item => item.getComponent('minecraft:item')?.itemStack)
						.forEach(item => item ? TrySpawnItem(blockDimension, new server.ItemStack(item.typeId), adjacentBlock.bottomCenter()) : void 0);
			}
			// 将该被挖掘的方块加入队列, 以便继续处理其周围的相邻方块
			blocksToMine.push(adjacentBlock);
			// 损耗工具耐久度
			durabilityComponent.damage += 1;
			// 更新背包中的工具状态
			playerContainer.setItem(player.selectedSlotIndex, tool);
			// 累计已挖掘的方块数量
			minedCount++;
		};
	};
	/**
	 * 掉落物实体的查询条件
	 */
	const itemOptions: server.EntityQueryOptions = {
		location: startBlock.location,
		type: "minecraft:item",
		maxDistance: Clamp({ max: 256, min: 2 }, minedCount * 2)
	};
	/**
	 * 经验球实体的查询条件
	 */
	const expOptions: server.EntityQueryOptions = {
		location: startBlock.location,
		type: "minecraft:xp_orb",
		maxDistance: Clamp({ max: 256, min: 2 }, minedCount * 2)
	};
	/**
	 * 获取范围内掉 落物实体 与 经验球实体
	 */
	const entities = [...blockDimension.getEntities(itemOptions), ...blockDimension.getEntities(expOptions)];
	// 遍历掉落物和经验球, 根据 bucketCache 的值进行处理
	entities.forEach(
		entity => {
			// 判断是否开启桶缓存
			if (!bucketCache) return entity.teleport(player.getHeadLocation(), { dimension: player.dimension });
			/**
			 * 获取掉落物 的 物品组件
			 */
			const item = entity.getComponent('minecraft:item')?.itemStack;
			// 判断是否存在物品对象
			if (!item) return;
			// 判断玩家背包是否有空间
			if (playerContainer.emptySlotsCount > 1) playerContainer.addItem(item);
			// 如果玩家背包已满, 生成一个木桶来放置掉落物
			else if (playerContainer.emptySlotsCount <= 1 && !startBlock?.getComponent('minecraft:inventory')) {
				startBlock?.setPermutation(server.BlockPermutation.resolve('minecraft:barrel'));
				startBlock?.getComponent('minecraft:inventory')?.container?.addItem(item);
			}
			// 如果玩家背包已满且存在一个木桶, 则将掉落物放入木桶中
			else startBlock?.getComponent('minecraft:inventory')?.container?.addItem(item);
			// 删除掉落物
			entity.remove();
		}
	);
	// 循环结束后, 将剩余的耐久度更新, 并将工具放回背包
	playerContainer.setItem(player.selectedSlotIndex, tool);
};
/**
 * * 创建 轻量连锁 控制界面
 *
 * @param {server.Player} player - 触发控制界面的玩家
 */
function CreateControlInterface(player: server.Player) {
	/**
	 * 获取玩家选中的道具
	 */
	const item = player.getComponent('minecraft:inventory')?.container?.getItem(player.selectedSlotIndex);
	/**
	 * 获取玩家选中的道具的文本
	 */
	const texts: server.RawMessage[] = [
		{ text: '是否开启: 潜行时触发< 轻量连锁 >机制' },
		{
			rawtext: [
				{ text: '启用< 木桶缓冲 >机制\n' },
				{ text: '如果背包空间不足\n' },
				{ text: '将生成一个木桶\n' },
				{ text: '存储多余的物品\n' },
				{ text: '超出木桶容积的部分, 将直接消失\n' },
				{ text: '++++++++++++++++++++' },
			]
		},
		{
			text: '§v最大连锁数量§r'
		}
	]
	// 检查工具是否有效且具有 'digger' 标签
	if (!item || !item.hasTag('minecraft:digger')) return;
	/**
	 * 创建一个模态窗口, 用于获取玩家输入
	 */
	const display = new serverUI.ModalFormData().title(player.nameTag).toggle(texts[0], { 'defaultValue': false }).toggle(texts[1], { 'defaultValue': true }).slider(texts[2], 10, 1000, { 'valueStep': 10, 'defaultValue': 500 });
	// 显示窗口并等待玩家输入
	display.show(player).then(
		result => {
			if (result.canceled || !result.formValues) return;
			player.setDynamicProperty('lightweight_chain_mining', result.formValues[0])
			player.setDynamicProperty('bucket_cache', result.formValues[1])
			player.setDynamicProperty('max_chain_mining', result.formValues[2])
		}
	);
};