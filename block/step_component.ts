/*
 * 原版接口
 */
import * as server from "@minecraft/server";
/*
 * 系统组件
 */
import * as opal from "../system/opal";
/**
 * * 组件前缀代词
 */
const componentPrefix = 'opal:step.';
/**
 * * 方块自定义组件列表
 */
const components = new Map<string, server.BlockCustomComponent>();
/**
 * * 定义实体踩踏方块组件的参数接口
 */
interface STEP_COMPONENT {
	/**
	 * * 方块对象
	 */
	block: server.Block;
	/**
	 * * 方块状态
	 */
	state: server.BlockPermutation;
	/**
	 * * 方块维度
	 */
	dimension: server.Dimension;
	/**
	 * * 实体对象
	 */
	entity: server.Entity | undefined;
};
/**
 * * 实体踩踏方块组件
 *
 * @param source - 方块组件参数
 */
function StepComponentTrigger(source: server.BlockComponentStepOnEvent): STEP_COMPONENT {
	/**
	 * * 方块对象
	 */
	const block = source.block;
	/**
	 * * 方块状态
	 */
	const state = source.block.permutation;
	/**
	 * * 方块维度
	 */
	const dimension = source.dimension;
	/**
	 * * 实体对象
	 */
	const entity = source.entity;
	// 返回 实体踩踏方块 的 组件参数 的 解构
	return { block, state, dimension, entity };
};
/*
 * 区块显示 - 实体踩踏
 */
components.set(componentPrefix + 'region_display',
	{
		onStepOn(source: server.BlockComponentStepOnEvent) {
			/**
			 * * 方块破坏组件参数解构
			 */
			const { block } = StepComponentTrigger(source);
			// 执行 组件功能
			/**
			 * * 获取 方块 周围 实体
			 */
			const getEntities = block.dimension.getEntitiesAtBlockLocation(opal.Vector.add(block, opal.Vector.CONSTANT_UP));
			// 点燃 被选中的实体
			getEntities.forEach(entity => entity.setOnFire(20, true));
		}
	}
);
/*
 * 向量弹射 - 实体踩踏
 */
components.set(componentPrefix + 'vector_ejection',
	{
		onStepOn(source: server.BlockComponentStepOnEvent) {
			/**
			 * * 方块破坏组件参数解构
			 */
			const { block } = StepComponentTrigger(source);
			/**
			 * * 实体查询选项
			 */
			const setOptions: server.EntityQueryOptions = {
				location: block.center(),
				maxDistance: 1.5,
			};
			/**
			 * * 获取实体队列
			 */
			const entitys = block.dimension.getEntities(setOptions);
			// 对选中的实体进行向量弹射
			entitys.forEach(
				entity => {
					try {
						/**
						 * * 获取 向量
						 */
						const Vector = entity.getViewDirection();
						/**
						 * * 计算 水平 弹射 速度
						 */
						const horizontalPower = (Math.abs(Vector.x) + Math.abs(Vector.z)) * 16;
						// 向量弹射
						entity.applyKnockback({ x: Vector.x * horizontalPower, z: Vector.z * horizontalPower }, Math.abs(Vector.y) * 8);
						entity.addEffect('minecraft:slow_falling', 60, { amplifier: 1, showParticles: false });
						entity.addEffect('minecraft:resistance', 200, { amplifier: 31, showParticles: false });
						entity.addEffect('minecraft:hunger', 200, { amplifier: 4, showParticles: false });
					}
					catch {
						// 向量弹射
						entity.applyImpulse({ x: 0, y: Math.random() + 0.1, z: 0 });
					}
				}
			)
		}
	}
);
export default components;