/*
 * 原版接口
 */
import * as server from "@minecraft/server";
/*
 * 导出模块
 */
export { GetContractRoles, EntitysSort, GetPartner };
/**
 * * 获取 签订契约的角色 并 执行事件
 *
 * @param {server.Player} player - 作为主人的玩家
 *
 * @param {server.EntityQueryOptions} options - 查询选项
 *
 * @param {(entity: server.Entity) => void} after - 回调函数
 */
function GetContractRoles(player: server.Player, options: server.EntityQueryOptions, after: (entity: server.Entity) => void) {
	/**
	 * * 角色查询选项
	 */
	const merge: server.EntityQueryOptions = {
		excludeTypes: ["minecraft:item", "minecraft:xp_orb", player.typeId],
		families: ['starry'],
		...options
	};
	/**
	 * * 附近角色 的 列表
	 */
	const roles = player.dimension.getEntities(merge).filter(role => role.getComponent('is_tamed'));
	// 筛选 与玩家 的 契约绑定 的 角色
	roles.filter(role => role.getDynamicProperty('entity:contract_user') == player.id);
	// 遍历 角色队列
	roles.forEach(role => after(role));
};
/**
 * * 获取 实体列表
 *
 * @param {server.Dimension} dimension - 执行程序的维度
 *
 * @param {server.EntityQueryOptions} options - 查询实体的选项
 *
 * @param {(entity0: server.Entity, entity1: server.Entity) => number} onSort - 排序函数
 *
 * @param {(entity: server.Entity) => boolean} onFilter - 过滤函数
 *
 * @returns {server.Entity[]} - 实体列表
 */
function EntitysSort(dimension: server.Dimension, options?: server.EntityQueryOptions, onSort?: (entity0: server.Entity, entity1: server.Entity) => number, onFilter?: (entity: server.Entity) => void): server.Entity[] {
	/**
	 * * 获取 实体列表
	 */
	const entitys = onSort ? dimension.getEntities(options).sort(onSort) : dimension.getEntities(options);
	return onFilter ? entitys.filter(onFilter) : entitys;
};
/**
 * * 获取 队友 并 执行事件
 *
 * @param entity - 实体对象
 *
 * @param after - 回调函数
 */
function GetPartner(entity: server.Entity, after: (entity: server.Entity, index: number) => void) {
	/**
	 * * 角色查询选项
	 */
	const roleOptions: server.EntityQueryOptions = {
		location: entity.location,
		families: ['starry'],
		maxDistance: 32
	};
	/**
	 * * 玩家查询选项
	 */
	const playerOptions: server.EntityQueryOptions = {
		location: entity.location,
		maxDistance: 32
	};
	/**
	 * * 获取实体列表
	 */
	const partner = [
		...entity.dimension.getEntities(roleOptions),
		...entity.dimension.getPlayers(playerOptions)
	];
	/**
	 * * 契约者标识符
	 */
	const contract = entity.getDynamicProperty('entity:contract_user') as string;
	// 如果 实体 是这段 契约关系 中的 玩家 或者 实体 就执行 后处理
	partner.forEach(
		(entity, index) => {
			// 如果实体不是这段契约关系中的实体, 则返回
			if (entity.id != contract && entity.getDynamicProperty('entity:contract_user') != contract) return;
			// 执行 回调函数
			after(entity, index);
		}
	)
};