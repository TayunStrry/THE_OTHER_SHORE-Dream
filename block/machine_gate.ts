/*
 * 原版接口
 */
import * as server from "@minecraft/server";
/*
 * 系统组件
 */
import * as opal from "../system/opal";

/**
 * * 机关之门 的 关闭事件标识符
 */
const tickId = new Map<string, number>();

/**
 * * 魔晶传送 - 向上传送 < 30 能量消耗 >
 */
export function AboveTeleport(block: server.Block) {
	/**
	 * * 获取实体队列
	 */
	const entitys = block.dimension.getEntitiesAtBlockLocation(block);
	// 执行事件机制
	if (!opal.ExpendEnergy(block, -30)) return;
	// 遍历 射线方向 的 128个 方块
	for (let index = 1; index < 128; index++) {
		try {
			/**
			 * * 获取方块对象
			 */
			const target = block.offset({ x: 0, y: index, z: 0 });
			// 判断方块是否为 魔晶上传 或 魔晶下传
			if (target?.typeId !== 'starry_map:magic_portal_above' && target?.typeId !== 'starry_map:magic_portal_below') continue;
			// 传送实体
			entitys.forEach(info => info.teleport(target.center()));
			// 创建路径规划
			opal.PathExecute.Create('魔晶上传-路径显示', 1,
				{
					locations: [block.location, target.location],
					particles: ['constant:smoke_rune_purple'],
					offset: opal.Vector.CONSTANT_HALF,
					dimension: block.dimension,
					cooldown: 1,
					speed: opal.Vector.distance(block, target),
				}
			);
			break;
		}
		catch {
			opal.ErrorMessage('<§l§b 魔晶上传 §r>§4 发生错误§r', block, { text: '实体传送失败, 请勿在<§l§m 世界边界 §r>或<§l§n 世界之外 §r>使用!!' });
			break;
		}
	}
};

/**
 * * 魔晶传送 - 向下传送 < 30 能量消耗 >
 */
export function BelowTeleport(block: server.Block) {
	/**
	 * * 获取实体队列
	 */
	const getEntityGroup = block.dimension.getEntitiesAtBlockLocation(block);
	// 执行事件机制
	if (!opal.ExpendEnergy(block, -30)) return;
	// 遍历 射线方向 的 128个 方块
	for (let index = 1; index < 128; index++) {
		try {
			/**
			 * * 获取方块对象
			 */
			const target = block.offset({ x: 0, y: -index, z: 0 });
			// 判断方块是否为 魔晶上传 或 魔晶下传
			if (target?.typeId !== 'starry_map:magic_portal_above' && target?.typeId !== 'starry_map:magic_portal_below') continue;
			// 传送实体
			getEntityGroup.forEach(info => info.teleport(target.center()))
			// 创建路径规划
			opal.PathExecute.Create('魔晶下传-路径显示', 1,
				{
					locations: [block.location, target.location],
					particles: ['constant:smoke_rune_purple'],
					offset: opal.Vector.CONSTANT_HALF,
					dimension: block.dimension,
					cooldown: 1,
					speed: opal.Vector.distance(block, target),
				}
			);
			break;
		}
		catch {
			opal.ErrorMessage('<§l§b 魔晶下传 §r>§4 发生错误§r', block, { text: '实体传送失败, 请勿在<§l§m 世界边界 §r>或<§l§n 世界之外 §r>使用!!' });
			break;
		}
	}
};

/**
 * * 开启 垂直放置 的 机关之门
 *
 * @param {server.Block} block - 机关门对象
 */
export function verticalGate(block: server.Block) {
	/**
	 * * 获取 机关门方向
	 */
	const about = block.permutation.getState('STATE:about');
	// 判断 门方向
	if (about == 1 || about == 3) {
		const east = block.east();
		const west = block.west();
		// 激活 东门
		if (east?.typeId == block.typeId && east?.permutation.getState('STATE:rune_type') == 0)
			opal.TrySetPermutation(east, 'STATE:rune_type', 1);
		// 激活 西门
		if (west?.typeId == block.typeId && west?.permutation.getState('STATE:rune_type') == 0)
			opal.TrySetPermutation(west, 'STATE:rune_type', 3);
	}
	else if (about == 2 || about == 4) {
		const north = block.north();
		const south = block.south();
		// 激活 北门
		if (north?.typeId == block.typeId && north?.permutation.getState('STATE:rune_type') == 0)
			opal.TrySetPermutation(north, 'STATE:rune_type', 2);
		// 激活 南门
		if (south?.typeId == block.typeId && south?.permutation.getState('STATE:rune_type') == 0)
			opal.TrySetPermutation(south, 'STATE:rune_type', 4);
	};
	const above = block.above();
	const below = block.below();
	// 激活 上方机关门
	if (above?.typeId == block.typeId && above?.permutation.getState('STATE:rune_type') == 0)
		opal.TrySetPermutation(above, 'STATE:rune_type', 5);
	// 激活 下方机关门
	if (below?.typeId == block.typeId && below?.permutation.getState('STATE:rune_type') == 0)
		opal.TrySetPermutation(below, 'STATE:rune_type', 6);
	// 获取 时钟标识符
	const toString = opal.Vector.toString(block.location);
	// 复位机关门
	const tick = server.system.runTimeout(
		() => {
			// 播放 关门音效
			block.dimension.playSound('close.iron_door', block.location);
			// 复位机关门
			opal.TrySetPermutation(block, 'STATE:rune_type', 0);
		}, 100);
	// 设置定时器
	tickId.set(toString, tick);
};

/**
 * * 开启 水平放置 的 机关之门
 *
 * @param {server.Block}  block - 机关门对象
 */
export function horizontalGate(block: server.Block) {
	// 获取周围的方块
	const north = block.north();
	const south = block.south();
	const east = block.east();
	const west = block.west();
	// 激活 东门
	if (east?.typeId == block.typeId && east?.permutation.getState('STATE:rune_type') == 0)
		opal.TrySetPermutation(east, 'STATE:rune_type', 1);
	// 激活 西门
	if (west?.typeId == block.typeId && west?.permutation.getState('STATE:rune_type') == 0)
		opal.TrySetPermutation(west, 'STATE:rune_type', 3);
	// 激活 北门
	if (north?.typeId == block.typeId && north?.permutation.getState('STATE:rune_type') == 0)
		opal.TrySetPermutation(north, 'STATE:rune_type', 2);
	// 激活 南门
	if (south?.typeId == block.typeId && south?.permutation.getState('STATE:rune_type') == 0)
		opal.TrySetPermutation(south, 'STATE:rune_type', 4);
	// 获取 时钟标识符
	const toString = opal.Vector.toString(block.location);
	// 复位机关门
	const tick = server.system.runTimeout(
		() => {
			// 播放 关门音效
			block.dimension.playSound('close.iron_door', block.location);
			// 复位机关门
			opal.TrySetPermutation(block, 'STATE:rune_type', 0);
		}, 100);
	// 设置定时器
	tickId.set(toString, tick);
};

/**
 * * 紧急关闭机关门
 *
 * @param {server.Block} object - 机关门对象
 */
export function Urgent(object: server.Block) {
	for (let x = -4; x < 4; x++) for (let y = -4; y < 4; y++) for (let z = -4; z < 4; z++) {
		/**
		 * * 获取方块对象
		 */
		const target = object.offset({ x, y, z });
		if (target?.typeId != object.typeId) continue;
		// 获取 时钟标识符
		const toString = opal.Vector.toString(target?.location);
		// 复位机关门
		opal.TrySetPermutation(target, 'STATE:rune_type', 0);
		/**
		 * * 获取 时钟标识符
		 */
		const tick = tickId.get(toString);
		if (!tick) continue;
		// 移除定时器
		server.system.clearRun(tick);
		tickId.delete(toString);
	}
};