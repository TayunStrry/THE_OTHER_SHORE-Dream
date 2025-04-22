/*
 * 原版接口
 */
import * as server from "@minecraft/server";
/*
 * 系统组件
 */
import * as opal from "../system/opal";
import * as table from "../data/table";

/**
 * * 物资收集 < 30 能量消耗 >
 */
export function Collection(block: server.Block, permutation: server.BlockPermutation) {
	// 判断能量值 是否足够
	if (!opal.ExpendEnergy(block, -30)) return;
	/**
	 * * 实体查询选项
	 */
	const setOptions: server.EntityQueryOptions = {
		maxDistance: ((permutation.getState('STATE:value') as number) + 1) * 8,
		type: "minecraft:item",
		location: block
	};
	/**
	 * * 获取实体队列
	 */
	const items = block.dimension.getEntities(setOptions);
	/**
	 * * 获取方块容器
	 */
	const container = block.below()?.getComponent('inventory')?.container;
	//尝试播放粒子效果
	items.forEach(info => opal.TrySpawnParticle(info.dimension, 'constant:smoke_rune_purple', info.location));
	//尝试进行 物资收集
	if (container && container.emptySlotsCount >= items.length) items.forEach(
		info => {
			/**
			 * * 获取 物资对象
			 */
			const item = info.getComponent('item')?.itemStack as server.ItemStack;
			container.addItem(item);
			info.remove();
		}
	)
	else items.forEach(info => info.teleport(block.center()));
};

/**
 * * 获取 目标方块
 *
 * @returns {server.Block} 目标方块块
 */
function getTargetBlock(block: server.Block): server.Block | undefined {
	/**
	 * * 储存 目标方块队列
	 */
	const setBlcokGroup: server.Block[] = [];
	//获取 方块队列
	for (let index = 2; index < 64; index++) {
		/**
		 * * 获取 方块对象
		 */
		const getBlock = block.offset({ x: 0, y: -index, z: 0 });
		//判断 方块是否存在
		if (getBlock) setBlcokGroup.push(getBlock);
	};
	//过滤 方块队列
	return setBlcokGroup.filter(block => !block.isAir)[0];
};
/**
 * * 尝试填充方块

 * @param {server.Container} container 可用物品容器

 * @param {server.Vector3} location 方块填充位置
 */
function FillingTest(block: server.Block, container: server.Container, location: server.Vector3) {
	//遍历 物品容器中的物品
	for (let index = 0; index < container.size; index++) {
		/**
		 * * 获取容器中的物品
		 */
		const getItem = container.getItem(index);
		//判断 物品是否存在
		if (!getItem) continue
		try {
			/**
			 * * 获取方块标识符
			 */
			const blockID = table.crops_map.get(getItem.typeId) ?? getItem.typeId;
			// 尝试填充方块
			opal.TryFillBlocks(block.dimension, location, location, server.BlockPermutation.resolve(blockID));
			// 减少 物品堆栈
			opal.ConsumeItemStack(container, index, getItem);
			break;
		}
		catch { continue }
	}
};
/**
 * * 方块放置 < 60 能量消耗 >
 */
export function Placement(block: server.Block) {
	// 判断能量值 是否足够
	if (!opal.ExpendEnergy(block, -60)) return;
	/**
	 * * 获取上方的方块对象
	 */
	const aboveBlock = block.above();
	/**
	 * * 获取物品容器
	 */
	const getContainer = aboveBlock?.getComponent('minecraft:inventory')?.container;
	// 判断 物品容器是否存在
	if (!getContainer) return opal.ErrorMessage('<§l§b 方块放置 §r>§4 发生错误§r', block, { text: '未能在设备上方找到合适的<§l§3 方块容器 §r>' });
	// 遍历 物品容器中的物品
	if (getContainer.size > 1) {
		/**
		 * * 获取 目标方块
		 */
		const getTarget = getTargetBlock(block) ?? block;
		/**
		 * * 设定进行填充测试的位置
		 */
		const getPlace = opal.Vector.add(getTarget, opal.Vector.CONSTANT_UP)
		//清除无效的方块
		block.dimension.runCommand(`fill ${getPlace.x} ${getPlace.y} ${getPlace.z} ${getPlace.x} ${getPlace.y} ${getPlace.z} air [] destroy`)
		//尝试进行填充测试
		server.system.runTimeout(() => FillingTest(block, getContainer, getPlace), 5);
		// 创建自由指针
		opal.SetFreePointer({ location: block.bottomCenter(), dimension: block.dimension }, getTarget.center(), 1);
	}
};

/**
 * * 打包投送 < 60 能量消耗 >
 */
export function Transmission(block: server.Block, type: string) {
	// 判断能量值 是否足够
	if (!opal.ExpendEnergy(block, -60)) return;
	/**
	 * * 定义 物品信息 的 缓存数组
	 */
	const setItemGroup: server.ItemStack[] = [];
	/**
	 * * 查询 输入端 与 输出端 容器 并 传输容器物品

	 * @param {server.Vector3} source 输入端 容器位置
	 */
	function QueryContainer(source: server.Vector3) {
		try {
			/**
			 * * 获取 输入端 容器方块
			 */
			const getBlockOpen = block.offset(source);
			/**
			 * * 获取 输入端 容器信息
			 */
			const getContainerOpen = getBlockOpen?.getComponent('minecraft:inventory')?.container;
			//寻找 输出端 容器
			for (let index = 1; index < 64; index++) {
				try {
					/**
					 * * 获取 输出端 容器方块 相对 输入端 容器方块 的 偏移量
					 */
					const pointer = opal.Vector.multiply(source, -index)
					/**
					 * * 获取 输出端 容器方块
					 */
					const getBlockDone = block.offset(pointer);
					//检测 顶点容器 是否存在
					if (!getBlockDone) continue
					/**
					 * * 获取 输出端 容器信息
					 */
					const getContainerDone = getBlockDone.getComponent('minecraft:inventory')?.container;
					//检测 顶点容器 是否存在
					if (!getContainerOpen || !getContainerDone) continue;
					/**
					 * * 获取 目标容器 的 可用空间
					 */
					let getEmptyCount = getContainerDone.emptySlotsCount;
					//基于 可用空间 遍历 输入端 容器
					for (let index = 0; index < getContainerOpen.size; index++) {
						/**
						 * * 获取物品信息
						 */
						const getItem = getContainerOpen.getItem(index);
						//检测 物品是否存在
						if (getItem && getEmptyCount != 0) {
							getContainerOpen.setItem(index);
							setItemGroup.push(getItem);
							getEmptyCount--
						}
					};
					//向 目标容器 填充物品
					for (let item of setItemGroup) getContainerDone.addItem(item);
					// 创建自由指针
					opal.SetFreePointer({ location: block.bottomCenter(), dimension: block.dimension }, getBlockDone.bottomCenter(), 1);
					break;

				}
				catch { continue }
			}
		}
		catch {
			opal.ErrorMessage('<§l§b 打包投送 §r>§4 发生错误§r', block, { text: '未能在设备后方找到合适的<§l§3 方块容器 §r>' });
		}
	};
	//根据需求选择功能
	switch (type) {
		case 'east': QueryContainer(opal.Vector.CONSTANT_WEST); break;

		case 'west': QueryContainer(opal.Vector.CONSTANT_EAST); break;

		case 'south': QueryContainer(opal.Vector.CONSTANT_NORTH); break;

		case 'north': QueryContainer(opal.Vector.CONSTANT_SOUTH); break;

		case 'up': QueryContainer(opal.Vector.CONSTANT_DOWN); break;

		case 'down': QueryContainer(opal.Vector.CONSTANT_UP); break;
	};
};