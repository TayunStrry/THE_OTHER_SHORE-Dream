/*
 * 原版接口
 */
import * as server from "@minecraft/server";
/*
 * 系统组件
 */
import * as opal from "../system/opal";
import * as type from "../data/type";

/**
 * * 蝰蛇 - 维系者
 *
 * @param {server.Entity} self - 自身
 *
 * @param {server.Entity} target - 目标
 */
export function Support(self: server.Entity, target: server.Entity) {
	/**
	 * * 爆炸事件
	 *
	 * @param args - 附加参数
	 */
	const powerExplode = (args: type.ROUTE_ANNEX_ARGS) => {
		// 验证 实体状态 是否正确
		if (!self || !target || !self.isValid || !target.isValid) return;
		/**
		 * * 过滤器参数
		 */
		const options: server.EntityQueryOptions = {
			excludeTypes: ["minecraft:item", "minecraft:xp_orb", self.typeId],
			excludeFamilies: ['abyss'],
			location: args.location,
			maxDistance: 3,
			closest: 4
		};
		/**
		 * * 获取实体列表
		 */
		const entitys = args.dimension.getEntities(options);
		// 创建 元素伤害
		entitys.forEach(
			entity => {
				/**
				 * * 是否暴击
				 */
				const erupt = opal.IsErupt(self);
				// 对目标施加一次击退
				opal.BackoffByDistance(self, entity);
				// 创建 元素攻击
				opal.ElementalAttack(self, entity, erupt);
			}
		);
		opal.TrySpawnParticle(args.dimension, 'constant:excite_rune_orange', args.location);
	};
	/**
	 * * 计算目标位置
	 */
	const targetLocation = opal.Vector.add(target.location, opal.Vector.CONSTANT_UP);
	// 创建 路径
	opal.PathExecute.Create('蝰蛇维系者-炮击轨迹', 1,
		{
			locations: [self.getHeadLocation(), targetLocation],
			particles: ['constant:track_rune_orange'],
			dimension: self.dimension,
			on_done: powerExplode,
			cooldown: 1,
			speed: 1
		}
	);
};
/**
 * * 星图阵营 蝰蛇族 技能处理
 *
 * 对指定目标进行攻击, 并在爆炸事件中对周围怪物造成伤害
 *
 * @param {server.Entity} self - 施放技能的实体
 * @param {server.Entity} target - 攻击目标实体
 */
export function StarryFamily(self: server.Entity, target: server.Entity) {
	/**
	 * 处理爆炸事件
	 *
	 * 对周围怪物造成伤害, 并创建粒子效果
	 *
	 * @param {type.ROUTE_ANNEX_ARGS} args - 附加参数
	 */
	const powerExplode = (args: type.ROUTE_ANNEX_ARGS) => {
		/**
		 * 定义查询过滤器参数
		 */
		const options: server.EntityQueryOptions = {
			families: ['monster'],
			location: args.location,
			maxDistance: 4,
			closest: 4
		};
		/**
		 * 获取契约者标识符
		 */
		const contract = self.getDynamicProperty('entity:contract_user') as string;
		/**
		 * 获取实体列表
		 */
		const entitys = args.dimension.getEntities(options);
		/**
		 * 判断是否发生暴击
		 */
		const erupt = opal.IsErupt(self);
		// 过滤 契约者 与 锁定的目标 并 结算范围伤害
		entitys
			.filter(point => point.id !== contract)
			.filter(point => point.id !== target.id)
			.forEach(
				entity => {
					// 对目标实体施加击退效果
					opal.BackoffByDistance(self, entity);
					// 创建元素伤害
					opal.ElementalAttack(self, entity, erupt);
				}
			);
		// 对主要目标单独结算一次伤害
		opal.ElementalAttack(self, target, erupt);
		// 创建粒子效果
		opal.TrySpawnParticle(args.dimension, 'constant:excite_rune_orange', args.location);
	};
	/**
	 * 配置速度
	 *
	 * 根据不同的实体类型返回不同的速度值
	 *
	 * @param {server.Entity} self - 实体
	 *
	 * @returns {number} 速度值
	 */
	const SpeedConfigure = (self: server.Entity): number => {
		switch (self.typeId) {
			case 'starry_map:viper.spirit_lizard': return 3;
			default: return 1;
		}
	};
	/**
	 * * 计算目标位置
	 */
	const targetLocation = opal.Vector.add(target.location, opal.Vector.CONSTANT_UP);
	// 创建路径并执行
	opal.PathExecute.Create(self.typeId + '-炮击轨迹', 1,
		{
			locations: [self.getHeadLocation(), targetLocation],
			particles: ['constant:track_rune_orange'],
			dimension: self.dimension,
			on_done: powerExplode,
			cooldown: 1,
			speed: SpeedConfigure(self)
		}
	);
};