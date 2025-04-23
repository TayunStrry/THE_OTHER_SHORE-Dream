/*
 * 原版接口
 */
import * as server from "@minecraft/server";
/*
 * 系统组件
 */
import * as opal from "../system/opal";
/**
 * * 进行检测的默认标签
 */
const defaultTag = 'tags:magic_tool.series';
/**
 * * 组件前缀代词
 */
const componentPrefix = 'opal:destroy.';
/**
 * * 方块自定义组件列表
 */
const components = new Map<string, server.BlockCustomComponent>();
/**
 * * 方块破坏组件参数解构
 */
interface DESTROY_COMPONENT {
	/**
	 ** 方块状态
	 */
	state: server.BlockPermutation,
	/**
	 ** 方块维度
	 */
	dimension: server.Dimension,
	/**
	 ** 玩家对象
	 */
	player: server.Player | undefined,
	/**
	 ** 方块对象
	 */
	block: server.Block,
	/**
	 ** 物品对象
	 */
	item: server.ItemStack | undefined;
};
/**
 * * 方块破坏组件触发器
 *
 * @param source - 方块组件参数
 */
function DestroyComponentTrigger(source: server.BlockComponentPlayerBreakEvent): DESTROY_COMPONENT {
	/**
	 ** 方块状态
	 */
	const state = source.brokenBlockPermutation;
	/**
	 ** 方块维度
	 */
	const dimension = source.dimension;
	/**
	 ** 玩家对象
	 */
	const player = source.player;
	/**
	 ** 方块对象
	 */
	const block = source.block;
	/**
	 ** 物品对象
	 */
	const item = player?.getComponent('minecraft:inventory')?.container?.getItem(player.selectedSlotIndex);
	// 返回 方块破坏组件 的 参数解构
	return { state, dimension, player, block, item };
};
/*
 * 魔晶储罐 - 方块破坏
 */
components.set(componentPrefix + 'crystal_tank',
	{
		onPlayerBreak(source: server.BlockComponentPlayerBreakEvent) {
			/**
			 * * 方块破坏组件参数解构
			 */
			const analysis = DestroyComponentTrigger(source);
			// 检测是否使用了正确道具
			if (!analysis.item?.hasTag(defaultTag)) return;
			/**
			 ** 物品生成锚点
			 */
			const anchor = opal.Vector.toString(analysis.block.above()?.bottomCenter() as server.Vector3, { delimiter: ' ' });
			// 随机生成魔晶石
			analysis.dimension.runCommand(`loot spawn ${anchor} loot "energy_crystal/random"`);
			// 播放音效 与 粒子效果
			analysis.player?.playSound('cauldron.explode');
			// 魔晶储罐被破坏时的粒子效果
			switch (opal.RandomFloor(0, 4)) {
				case 0:
					opal.TrySpawnParticle(analysis.dimension, 'constant:fireworks_fireball_rune_red', analysis.block.above()?.bottomCenter() as server.Vector3);
					opal.TrySpawnParticle(analysis.dimension, 'constant:fireworks_paper_rune_red', analysis.block.above()?.bottomCenter() as server.Vector3);
					break;

				case 1:
					opal.TrySpawnParticle(analysis.dimension, 'constant:fireworks_fireball_rune_blue', analysis.block.above()?.bottomCenter() as server.Vector3);
					opal.TrySpawnParticle(analysis.dimension, 'constant:fireworks_paper_rune_blue', analysis.block.above()?.bottomCenter() as server.Vector3);
					break;

				case 2:
					opal.TrySpawnParticle(analysis.dimension, 'constant:fireworks_fireball_rune_green', analysis.block.above()?.bottomCenter() as server.Vector3);
					opal.TrySpawnParticle(analysis.dimension, 'constant:fireworks_paper_rune_green', analysis.block.above()?.bottomCenter() as server.Vector3);
					break;

				case 3:
					opal.TrySpawnParticle(analysis.dimension, 'constant:fireworks_fireball_rune_orange', analysis.block.above()?.bottomCenter() as server.Vector3);
					opal.TrySpawnParticle(analysis.dimension, 'constant:fireworks_paper_rune_orange', analysis.block.above()?.bottomCenter() as server.Vector3);
					break;

				case 4:
					opal.TrySpawnParticle(analysis.dimension, 'constant:fireworks_fireball_rune_purple', analysis.block.above()?.bottomCenter() as server.Vector3);
					opal.TrySpawnParticle(analysis.dimension, 'constant:fireworks_paper_rune_purple', analysis.block.above()?.bottomCenter() as server.Vector3);
					break;

				default: break;
			}
		}
	}
);
export default components;