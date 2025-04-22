/*
 * 原版接口
 */
import * as server from "@minecraft/server";
/*
 * < 玩家 > 破坏方块前 事件
 */
server.world.beforeEvents.playerBreakBlock.subscribe(
	data => {
		/**
		 * * 被破坏的方块
		 */
		const block = data.block;
		/**
		 * * 破坏方块时, 手持的物品
		 */
		const item = data.itemStack;
		// 检测是否使用了结构空位
		if (item?.typeId == 'minecraft:structure_void' && item.typeId !== block.typeId) data.cancel = true;
	}
);
/*
 * < 世界 > 爆炸前 事件
 */
server.world.beforeEvents.explosion.subscribe(
	data => {
		if (data.dimension.id === 'minecraft:overworld') data.cancel = true;
	}
);