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
 * * 渊鲸 - 执行者
 *
 * @param {server.Entity} self - 自身
 *
 * @param {server.Entity} target - 目标
 *
 * @param {boolean} erupt - 是否暴击
 */
export function Execute(self: server.Entity, target: server.Entity, erupt: boolean) {
	/**
	 * * 鱼雷爆炸事件
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
			location: args.location,
			maxDistance: 6,
			closest: 8
		};
		/**
		 * * 契约者标识符
		 */
		const contract = self?.getDynamicProperty('entity:contract_user') as string | undefined;
		/**
		 * * 获取实体列表
		 */
		const entitys = args.dimension.getEntities(options);
		// 过滤 契约者 与 锁定的目标
		entitys.filter(current => current.id !== contract && current.id !== self.id);
		// 创建 元素伤害
		entitys.forEach(current => opal.ElementalAttack(self, current, erupt));
		// 创建 粒子效果
		opal.TrySpawnParticle(args.dimension, 'constant:fireworks_fireball_rune_blue', args.location);
	};
	/**
	 * * 计算目标位置
	 */
	const targetLocation = opal.Vector.add(target.location, opal.Vector.CONSTANT_UP);
	/**
	 * * 设定路径点列表
	 */
	const locationGroup = [
		self.location,
		opal.Vector.add(self.location, { x: 0, y: 5, z: 0 }),
		targetLocation
	];
	// 创建 路径执行器
	opal.PathExecute.Create('渊鲸潜艇-炮击射线', 1,
		{
			particles: ['constant:track_rune_blue'],
			locations: locationGroup,
			dimension: self.dimension,
			on_done: powerExplode,
			cooldown: 2,
			speed: 1
		}
	)
};
/**
 * * 渊鲸 - 君临者
 *
 * @param {server.Entity} self - 自身
 *
 * @param {server.Entity} target - 目标
 *
 * @param {boolean} erupt - 是否暴击
 */
export function Emperor(self: server.Entity, target: server.Entity, erupt: boolean) {
	/**
	 * * 鱼雷爆炸事件
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
			location: args.location,
			maxDistance: 6,
			closest: 8
		};
		/**
		 * * 获取实体列表
		 */
		const entitys = args.dimension.getEntities(options).filter(current => current.id !== self.id);
		// 遍历实体队列
		entitys.forEach(
			current => {
				// 50% 概率触发 潮涌能量 效果
				if (opal.IsEnable(50)) current.addEffect('minecraft:conduit_power', 600, { showParticles: false });
				// 创建 元素伤害
				opal.ElementalAttack(self, current, erupt);
				// 判断 是否存在 [ 君王圣裁 ]标记
				if (!current.getDynamicProperty('whale_adjudication') || !(current instanceof server.Player)) return;
				// 为被命中的玩家附加 负面效果
				current.addEffect('minecraft:slowness', 150, { showParticles: false });
				current.addEffect('minecraft:weakness', 150, { showParticles: false });
				current.addEffect('minecraft:nausea', 150, { showParticles: false });
				current.addEffect('minecraft:wither', 150, { showParticles: false });
				current.addEffect('minecraft:hunger', 150, { showParticles: false });
				// 播放 音效
				current.playSound('mob.guardian.attack_loop');
				current.playSound('mob.elderguardian.curse');
				// 清除 [ 君王圣裁 ] 标记
				current.setDynamicProperty('whale_adjudication');
			}
		);
		// 创建 粒子效果
		opal.TrySpawnParticle(args.dimension, 'constant:fireworks_fireball_rune_blue', args.location);
	};
	// 创建 路径执行器
	opal.PathExecute.Create('渊鲸潜艇-炮击射线', 1,
		{
			particles: ['constant:track_rune_blue'],
			locations: [],
			dimension: self.dimension,
			on_done: powerExplode,
			cooldown: 1,
			speed: 4,
			shoot: {
				start_place: self.getHeadLocation(),
				toward: opal.Vector.difference(self.location, target.location),
				max_distance: opal.Vector.distance(self.location, target.location)
			}
		}
	)
};