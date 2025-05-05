/*
 * 原版接口
 */
import * as server from "@minecraft/server";
/*
 * 工具
 */
import { Vector, TriggerControl } from './tool';

import * as redLegion from './red_legion';
import * as blueLegion from './blue_legion';
/**
 * 组件前缀代
 */
const componentPrefix = 'opal:';
/**
 * 方块自定义组件列表
 */
const blockComponents = new Map<string, server.BlockCustomComponent>();
/**
 * 物品自定义组件列表
 */
const itemComponents = new Map<string, server.ItemCustomComponent>();
/**
 * 运行状态标识符
 */
export let runtimeState = 1;
// 红色军团修改器
itemComponents.set(componentPrefix + 'red_legion_base_config',
	{
		'onUse'(arg0) { redLegion.revise(arg0) }
	}
);
// 蓝色军团修改器
itemComponents.set(componentPrefix + 'blue_legion_base_config',
	{
		'onUse'(arg0) { blueLegion.revise(arg0) }
	}
);
/*
 * < 世界 > 初始化前 事件
 */
server.world.beforeEvents.worldInitialize.subscribe(
	data => {
		/**
		 * 方块自定义组件实例数组
		 */
		const blockCustoms = [...blockComponents.values()];
		/**
		 * 方块自定义组件名称数组
		 */
		const blockNames = [...blockComponents.keys()];
		/**
		 * 物品自定义组件实例数组
		 */
		const itemCustoms = [...itemComponents.values()];
		/**
		 * 物品自定义组件名称数组
		 */
		const itemNames = [...itemComponents.keys()];
		// === 方块自定义组件注册 ===
		for (let blockIndex = 0; blockIndex < blockCustoms.length; blockIndex++)data.blockComponentRegistry.registerCustomComponent(blockNames[blockIndex], blockCustoms[blockIndex]);
		// === 物品自定义组件注册 ===
		for (let itemIndex = 0; itemIndex < itemCustoms.length; itemIndex++) data.itemComponentRegistry.registerCustomComponent(itemNames[itemIndex], itemCustoms[itemIndex]);
	}
);
server.world.afterEvents.entitySpawn.subscribe(
	data => {
		/**
		 * 获取诞生的实体
		 */
		const { entity } = data;
		/**
		 * 获取维度与坐标
		 */
		const { dimension, location } = entity;
		// 验证实体是否有效
		if (!entity || !entity.isValid()) return;
		// 销毁多余的军团基地
		switch (entity.typeId) {
			case 'red_legion:legion_base':
				dimension.getEntities({ families: ["redLegionBase"], location, minDistance: 1, maxDistance: 512 }).forEach(entity => entity.remove());
				break;

			case 'blue_legion:legion_base':
				dimension.getEntities({ families: ["blueLegionBase"], location, minDistance: 1, maxDistance: 512 }).forEach(entity => entity.remove());
				break;
		};
	}
)
server.world.afterEvents.dataDrivenEntityTrigger.subscribe(
	event => {
		const { entity, eventId } = event;
		switch (eventId) {
			case 'entity_event:red_legion_recruits_members': redLegion.execute(entity); break;

			case 'entity_event:blue_legion_recruits_members': blueLegion.execute(entity); break;

			case 'entity_event:legion_base_under_attack': legionBaseUnderAttack(entity); break;

			default: break;
		}
	}
);
function legionBaseUnderAttack(entity: server.Entity) {
	// 触发器控制
	if (!TriggerControl('军团基地被攻击', entity, 40)) return;
	/**
	 * 获取维度与坐标
	 */
	const { dimension, location } = entity;
	/**
	 * 获取上方位置
	 */
	const above = Vector.copy(location).above(1);
	// 清扫掉落物
	dimension.getEntities().filter(entity => entity.typeId == 'minecraft:item').forEach(entity => entity.remove());
	// 消耗现存的红色军团成员
	dimension.getEntities({ families: ['redCamp'], excludeFamilies: ["redLegionBase"] }).forEach(entity => entity.remove());
	// 消耗现存的蓝色军团成员
	dimension.getEntities({ families: ['blueCamp'], excludeFamilies: ["blueLegionBase"] }).forEach(entity => entity.remove());
	// 消耗现存的怪物
	dimension.getEntities({ families: ['monster'] }).forEach(entity => entity.remove());
	// 基于被摧毁的军团类型播放提示
	switch (entity.typeId) {
		case 'red_legion:legion_base':
			dimension.getPlayers().forEach(player => player.onScreenDisplay.setTitle('<§1§o§l 蓝方军团基地 §r> 获胜!!!'));
			break;

		case 'blue_legion:legion_base':
			dimension.getPlayers().forEach(player => player.onScreenDisplay.setTitle('<§4§o§l 红方军团基地 §r> 获胜!!!'));
			break;
	};
	// 重置军团基地血量
	dimension.getEntities({ excludeFamilies: ["blueLegionBase"] }).forEach(entity => entity.getComponent('minecraft:health')?.setCurrentValue(500));
	dimension.getEntities({ excludeFamilies: ["redLegionBase"] }).forEach(entity => entity.getComponent('minecraft:health')?.setCurrentValue(500));
	// 播放音效
	dimension.getPlayers().forEach(player => player.playSound('mob.zombie.woodbreak'));
	// 播放粒子
	dimension.spawnParticle('constant:fireworks_fireball_rune_blue', above);
	dimension.spawnParticle('constant:erupt_rune_blue', above);
	dimension.spawnParticle('constant:fireworks_fireball_rune_red', above);
	dimension.spawnParticle('constant:erupt_rune_red', above);
	// 清除剩余的军团成员
	redLegion.clearTheRemainingQuantity();
	blueLegion.clearTheRemainingQuantity();
	// 设置标识符为战斗终结
	runtimeState = 0;
};
export function forcefullyCuttingOffWar(value: number) {
	runtimeState = value;
};