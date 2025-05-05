/*
 * 原版接口
 */
import * as server from "@minecraft/server";
/*
 * 系统组件
 */
import * as opal from "../system/opal";
import * as table from "../data/table";
import * as type from "../data/type";
/**
 * * 玩家死亡后, 记录玩家死亡位置
 *
 * @param {server.Player} player - 触发死亡事件的玩家对象
 */
export function PlayerDie(player: server.Player) {
	/**
	 * * 坐标锚点
	 */
	const anchor = {
		location: opal.Vector.floor(player.location),
		dimension: player.dimension.id
	};
	/**
	 * * 玩家死亡点
	 */
	const dieSpot = JSON.stringify(anchor);
	// 保存 死亡点
	player.setDynamicProperty('road_sign:死亡点', dieSpot);
};
/**
 * * 末影龙属性强化
 *
 * @param {server.Entity} dragon - 末影龙
 *
 * @param {server.Player} player - 玩家对象
 *
 * @param {string} damage - 伤害值
 *
 * @param {string} type - 伤害类型
 */
export function EnhanceEnderDragon(dragon: server.Entity, player: server.Entity, damage: number, type: server.EntityDamageCause) {
	/**
	 * * 末影龙鳞剩余数量
	 */
	const scalelike = dragon.getDynamicProperty('entity:ender_dragon_scales') as number ?? 15;
	// 检测 龙鳞数量
	if (scalelike < 1) return;
	// 为玩家显示一次攻略提示
	if (scalelike == 15 && player instanceof server.Player) opal.PlayPrompt(player, '末影龙强化');
	// 检测 伤害类型
	switch (type) {
		//* 爆炸伤害 剥落龙鳞
		case 'entityExplosion':
		case 'blockExplosion':
			EliminateEnderDragonScales(dragon, scalelike);
			break;
		//* 其余伤害 触发反击
		default:
			EnderDragonRetaliate(dragon, player, damage);
			break;
	}
};
/**
 * * 剥离 末影龙鳞
 *
 * @param {server.Entity} dragon - 末影龙
 *
 * @param {number} scalelike - 末影龙剩余的龙鳞数量
 */
function EliminateEnderDragonScales(dragon: server.Entity, scalelike: number) {
	//* 检测 龙鳞剥落冷却
	if (!opal.TriggerControl('龙鳞剥落冷却', dragon, 40)) return;
	/**
	 * * 玩家查询选项
	 */
	const playerOptions: server.EntityQueryOptions = {
		location: dragon.location,
		maxDistance: 64,
		closest: 5
	};
	/**
	 * * 实体效果选项
	 */
	const effectOptions: server.EntityEffectOptions = {
		amplifier: 3,
		showParticles: true
	};
	/**
	 * * 末影龙鳞 物品对象
	 */
	const item = new server.ItemStack("starry_map:ender_dragon_scales");
	/**
	 * * 获取 玩家队列
	 */
	const players = dragon.dimension.getPlayers(playerOptions);
	/**
	 * * 持续时间
	 */
	const duration = scalelike * players.length * 20;
	/**
	 * * 损耗 末影龙鳞
	 */
	const consume = Math.floor(scalelike - players.length);
	// 遍历 玩家队列
	players.forEach(
		player => {
			switch (opal.RandomFloor(0, 2)) {
				case 0: player.addEffect('minecraft:absorption', duration, effectOptions); break;

				case 1: player.addEffect('minecraft:resistance', duration, effectOptions); break;

				case 2: player.addEffect('minecraft:strength', duration, effectOptions); break;
			};
			// 生成 物品对象
			opal.TrySpawnItem(dragon.dimension, item, player.location);
			// 发送 玩家消息
			player.onScreenDisplay.setTitle(`§l§e< 龙鳞剥离 >§r\n§7剩余龙鳞: ${consume}`);
		}
	);
	console.error(scalelike, players.length);
	// 更新 动态属性
	dragon.setDynamicProperty('entity:ender_dragon_scales', consume);
};
/**
 * * 末影龙反击
 *
 * @param {server.Entity}  dragon - 末影龙
 *
 * @param {server.Entity} player - 发动攻击的玩家
 *
 * @param {number} damage - 玩家造成的伤害值
 */
function EnderDragonRetaliate(dragon: server.Entity, player: server.Entity, damage: number) {
	/**
	 * * 实体效果选项
	 */
	const effectOptions_0: server.EntityEffectOptions = {
		amplifier: 0,
		showParticles: true
	};
	/**
	 * * 实体效果选项
	 */
	const effectOptions_30: server.EntityEffectOptions = {
		amplifier: 30,
		showParticles: true
	};
	/**
	 * * 实体查询选项
	 */
	const entityQueryOption: server.EntityQueryOptions = {
		excludeTypes: ["minecraft:item", "minecraft:xp_orb", "minecraft:ender_dragon", "minecraft:ender_crystal"],
		location: dragon.location,
		maxDistance: 64
	};
	/**
	 * * 附近的所有实体
	 */
	const nearby = dragon.dimension.getEntities(entityQueryOption);
	/**
	 * * 定义 坐标基准点
	 */
	const vertex0 = opal.Vector.add(dragon.location, { x: 32, y: 5, z: 32 });
	/**
	 * * 定义 坐标基准点
	 */
	const vertex1 = opal.Vector.add(dragon.location, { x: -32, y: 32, z: -32 });
	// 触发随机效果
	switch (opal.RandomFloor(0, 23)) {
		case 1:
			// 向量弹射
			player.applyKnockback(new opal.Vector(0, 0, 0).random(16), opal.RandomFloat(4, 16));
			opal.IntelMessage(dragon, 128, '< 龙鳞加护 : 龙之弹射 >');
			player?.addEffect('minecraft:blindness', 40, effectOptions_0);
			break;

		case 3:
			nearby.forEach(entity => opal.ElementalAttack(dragon, entity, opal.IsErupt(dragon)));
			opal.IntelMessage(dragon, 128, '< 龙鳞加护 : 龙之威压 >');
			break;

		case 5:
			opal.ElementalAttack(dragon, player, opal.IsErupt(dragon));
			opal.IntelMessage(dragon, 128, '< 龙鳞加护 : 龙之反伤 >');
			break;

		case 7:
			player?.addEffect('minecraft:weakness', 300, effectOptions_30);
			player?.addEffect('minecraft:slow_falling', 300, effectOptions_30);
			player?.addEffect('minecraft:mining_fatigue', 300, effectOptions_30);
			opal.IntelMessage(dragon, 128, '< 龙鳞加护 : 眠龙之咒 >');
			break;

		case 9:
			player?.addEffect('minecraft:blindness', 300, effectOptions_0);
			player?.addEffect('minecraft:mining_fatigue', 300, effectOptions_30);
			player?.setOnFire(player.nameTag.length * damage, true);
			opal.IntelMessage(dragon, 128, '< 龙鳞加护 : 禁忌之地 >');
			break;

		case 12:
			player?.addEffect('minecraft:fatal_poison', 300, effectOptions_30);
			opal.IntelMessage(dragon, 128, '< 龙鳞加护 : 龙牙之毒 >');
			break;

		default:
			opal.TrySpawnEntity(dragon.dimension, "minecraft:ender_crystal", opal.Vector.rangeRandom(vertex0, vertex1));
			opal.TrySpawnEntity(dragon.dimension, "minecraft:ender_crystal", opal.Vector.rangeRandom(vertex0, vertex1));
			opal.TrySpawnEntity(dragon.dimension, "minecraft:ender_crystal", opal.Vector.rangeRandom(vertex0, vertex1));
			opal.TrySpawnEntity(dragon.dimension, "minecraft:ender_crystal", opal.Vector.rangeRandom(vertex0, vertex1));
			opal.IntelMessage(dragon, 128, '< 龙鳞加护 : 群星璀璨 >');
			break;
	}
};
/**
 * * 实体攻击玩家后概率触发的效果
 *
 * @param {server.Player} player - 触发实体损伤事件的玩家对象
 *
 * @param { server.Entity} entity - 发动实体损伤事件的实体对象
 *
 * @param {server.EntityEquippableComponent} equipment - 玩家对象的装备栏组件
 *
 * @param {(server.ItemStack | undefined)[]} items - 玩家装备栏物品
 *
 * @param {server.EquipmentSlot[]} slots - 玩家装备栏槽位
 */
export function EntityHurtPlayerAfterOddsTrigger(player: server.Player, entity: server.Entity, equipment: server.EntityEquippableComponent, items: (server.ItemStack | undefined)[], slots: server.EquipmentSlot[]) {
	/**
	 * * 玩家背包容器
	 */
	const container = player.getComponent('inventory')?.container;
	/**
	 * * 背包随机索引
	 */
	const containerRandom = opal.RandomFloor(0, container?.size ?? 27);
	/**
	 * * 玩家主手选中的装备
	 */
	const selectEquipment = container?.getItem(player.selectedSlotIndex);
	/**
	 * * 装备随机索引
	 */
	const equipmentRandom = opal.RandomFloor(0, items.length - 1);
	/**
	 * * 随机装备
	 */
	const randomEquipment = items[equipmentRandom];
	/**
	 * * 随机装备的耐久
	 */
	const randomEquipmentDurability = randomEquipment?.getComponent('durability');
	// 检测是否满足条件
	if (items.length >= 1) switch (entity.typeId) {
		// 原版-僵尸 特殊技能
		case 'minecraft:zombie':
			// 检测是否为精英怪物
			if (!GetEliteEnemy(entity)) break;
			// 检测是否满足其他条件
			if (!randomEquipment || !randomEquipmentDurability) break;
			// 使 被选中 的 装备 耐久-10
			randomEquipmentDurability.damage += 10;
			// 替换被选中的装备
			equipment?.setEquipment(slots[equipmentRandom], randomEquipment);
			// 显示提示文本
			player.sendMessage(
				[
					opal.translate(entity),
					{ text: '发动了< 赐福 - 腐化 > : <' },
					opal.translate(randomEquipment), { text: `>§4§l耐久下降` }
				]
			);
			break;

		// 原版-掠夺者 特殊技能
		case 'minecraft:pillager':
			// 检测是否为精英怪物
			if (!GetEliteEnemy(entity)) break;
			// 检测是否满足其他条件
			if (container) {
				/**
				 * * 背包随机物品
				 */
				const item = container.getItem(containerRandom);
				// 检测物品是否存在
				if (!item) break;
				// 移除背包中的物品
				container.setItem(containerRandom);
				// 在袭击者的位置上掉落物品
				opal.TrySpawnItem(entity.dimension, item, entity.location);
				// 显示提示文本
				player.sendMessage(
					[
						opal.translate(entity),
						{ text: '发动了< 赐福 - 掠夺 > : <' },
						opal.translate(item),
						{ text: `>已被夺走 !!` }
					]
				)
			};
			break;

		// 原版-骷髅 特殊技能
		case 'minecraft:skeleton':
			// 检测是否为精英怪物
			if (!GetEliteEnemy(entity)) break;
			// 检测是否满足其他条件
			if (selectEquipment) {
				// 对目标施加一次击退
				opal.BackoffByDistance(entity, player);
				// 显示提示文本
				player.sendMessage(
					[
						opal.translate(entity),
						{ text: '发动了< 赐福 - 强弓 >' }
					]
				)
			};
			break;

		// 原版-幻翼 特殊技能
		case 'minecraft:phantom':
			// 检测是否为精英怪物
			if (!GetEliteEnemy(entity)) break;
			// 检测是否满足其他条件
			if (selectEquipment) {
				// 添加负面效果
				player.addEffect('minecraft:levitation', 200, { amplifier: 1, showParticles: false });
				player.addEffect('minecraft:blindness', 300, { amplifier: 1, showParticles: false });
				player.addEffect('minecraft:darkness', 300, { amplifier: 1, showParticles: false });
				// 显示提示文本
				player.sendMessage(
					[
						opal.translate(entity),
						{ text: '发动了< 赐福 - 夜袭 >' }
					]
				)
			};
			break;

		// 原版-猪灵 特殊技能
		case 'minecraft:piglin':
			// 检测是否为精英怪物
			if (!GetEliteEnemy(entity)) break;
			// 检测是否满足其他条件
			if (entity.getEffect('minecraft:resistance')?.amplifier) {
				/**
				 * * 实体过滤选项
				 */
				const options: server.EntityQueryOptions = {
					type: 'minecraft:piglin',
					closest: 4
				};
				/**
				 * * 实体排序
				 */
				const onSort = (entity0: server.Entity, entity1: server.Entity) => {
					const distance0 = opal.Vector.distance(player.location, entity0.location);
					const distance1 = opal.Vector.distance(player.location, entity1.location);
					return distance0 - distance1;
				};
				/**
				 * * 实体筛选
				 */
				const onFilter = (target: server.Entity) => {
					return target.getEffect('minecraft:resistance')?.amplifier ?? 0 <= 2;
				};
				/**
				 * * 实体队列
				 */
				const entitys = opal.EntitysSort(player.dimension, options, onSort, onFilter);
				/**
				 * * 遍历 实体队列
				 */
				entitys.forEach(
					target => {
						const effect = target.getEffect('minecraft:resistance')?.amplifier ?? -1;
						target.addEffect('minecraft:resistance', 300, { amplifier: effect + 1, showParticles: true });
					}
				);
				// 显示提示文本
				player.sendMessage(
					[
						opal.translate(entity),
						{ text: ' 发动了< 赐福 - 团结 > ' },
					]
				);
			}
			break;

		default: break;
	}
};
/**
 * * 判断实体是否为精英怪
 *
 * @param {server.Entity} entity - 进行检测的实体对象
 *
 * @returns {boolean} - 是否为精英怪
 */
function GetEliteEnemy(entity: server.Entity): boolean {
	/**
	 * * 获取 实体 是否为 精英怪
	 */
	const state = entity.getDynamicProperty('entity:elite_enemy_of_the_family');
	// 判断 状态 是否被创建
	if (state == undefined) {
		if (opal.IsEnable(10)) {
			// 给与装备
			entity.runCommand('replaceitem entity @s slot.armor.head 0 turtle_helmet');
			entity.runCommand('replaceitem entity @s slot.weapon.offhand 0 shield');
			// 设置动态属性
			entity.setDynamicProperty('entity:elite_enemy_of_the_family', true);
			// 添加 状态效果
			entity.addEffect('minecraft:fire_resistance', 20000000);
			return true;
		}
		else {
			// 设置动态属性
			entity.setDynamicProperty('entity:elite_enemy_of_the_family', false);
			return false;
		}
	}
	return state as boolean;
};
/**
 * * 茉莉 - 百花之祈
 *
 * @param {server.Entity} entity - 执行事件的实体对象
 */
export function PrayerOfHundredFlowers(entity: server.Entity) {
	/**
	 * * 实体查询选项
	 */
	const options_amulet: server.EntityQueryOptions = {
		location: entity.location,
		families: ['amulet'],
		maxDistance: 4
	};
	/**
	 * * 获取 强化法阵
	 */
	const strengthen = entity.dimension.getEntities(options_amulet);
	// 判断 控制触发器
	if (!opal.TriggerControl('茉莉:百花之祈', entity, 40)) return;
	if (strengthen.length == 0) return;
	/**
	 * * 实体查询选项
	 */
	const options_abyss: server.EntityQueryOptions = {
		location: entity.location,
		excludeFamilies: ['spirit'],
		families: ['abyss'],
		maxDistance: 32
	};
	/**
	 * * 获取 相同阵营 的 实体
	 */
	const entitys = entity.dimension.getEntities(options_abyss);
	// 遍历队友列表
	entitys.forEach(
		entity => {
			/**
			 * * 获取 实体生命值组件
			 */
			const health = entity.getComponent('minecraft:health');
			health?.setCurrentValue(health.currentValue + 50);
			opal.TrySpawnParticle(entity.dimension, 'constant:pulse_rune_green', entity.location);
		}
	)
};
/**
 * * 野蜂机群 强制落地
 *
 * @param {server.Entity} entity - 实体 野蜂维系者
 */
export function WaspClusterCrash(entity: server.Entity) {
	/**
	 * * 实体查询选项
	 */
	const options: server.EntityQueryOptions = {
		excludeTags: ['crash_after'],
		location: entity.location,
		families: ['wasp'],
		maxDistance: 24
	};
	/**
	 * * 获取实体列表
	 */
	const entitys = entity.dimension.getEntities(options);
	// 判断实体是否存在
	if (entitys.length == 0) return;
	// 遍历机群实体
	entitys.forEach(
		entity => {
			/**
			 * * 事件 - 野蜂坠落
			 */
			const event = () => {
				if (entity && entity.isValid) entity.applyKnockback({ x: 0, z: 0 }, -1);
			};
			/**
			 * * 计时器标识
			 */
			const id = server.system.runInterval(() => event(), 1);
			// 添加标记 并播放 粒子效果
			entity.addTag('crash_after');
			server.system.runTimeout(() => server.system.clearRun(id), 200);
			opal.TrySpawnParticle(entity.dimension, 'constant:excite_rune_red', entity.location);
		}
	);
	// 播放 音效
	entity.dimension.playSound('random.anvil_break', entity.location, { pitch: 1, volume: 0.5 });
};
/**
 * * 野蜂之王 呼叫增援
 *
 * @param {server.Entity} entity - 实体 野蜂君临者
 */
export function WaspReinforce(entity: server.Entity) {
	/**
	 * * * 获取 实体生命值组件
	 */
	const health = entity.getComponent('health');
	// 当生命值低于 75% 时
	if (health && opal.HealthBelow(health, 0.75) && !entity.getDynamicProperty('wasp_emperor:health_75%')) {
		const energy = entity.getDynamicProperty('wasp_emperor:energy') as number ?? 0;
		entity.setDynamicProperty('wasp_emperor:energy', energy + 15);
		entity.setDynamicProperty('wasp_emperor:health_75%', true);
		entity.target?.addEffect('minecraft:darkness', 40);
	};
	// 当生命值低于 50% 时
	if (health && opal.HealthBelow(health, 0.5) && !entity.getDynamicProperty('wasp_emperor:health_50%')) {
		const energy = entity.getDynamicProperty('wasp_emperor:energy') as number ?? 0;
		entity.setDynamicProperty('wasp_emperor:energy', energy + 15);
		entity.setDynamicProperty('wasp_emperor:health_50%', true);
		entity.target?.addEffect('minecraft:darkness', 80);
	};
	// 当生命值低于 25% 时
	if (health && opal.HealthBelow(health, 0.25) && !entity.getDynamicProperty('wasp_emperor:health_25%')) {
		const energy = entity.getDynamicProperty('wasp_emperor:energy') as number ?? 0;
		entity.setDynamicProperty('wasp_emperor:energy', energy + 15);
		entity.setDynamicProperty('wasp_emperor:health_25%', true);
		entity.target?.addEffect('minecraft:darkness', 160);
	};
	/**
	 * * 实体能量值 - 生成前检测
	 */
	const energy = entity.getDynamicProperty('wasp_emperor:energy') as number ?? 0;
	/**
	 * * 随机移动 范围
	 */
	const range = Math.random() * 4;
	// 判断是否满足条件
	if (energy < 15 || !entity.dimension.getBlock(entity.location)) return;
	// 随机移动
	server.system.runTimeout(() => entity.applyKnockback({ x: Math.random() * range - 2, z: Math.random() * range - 2 }, range * 2), 5);
	// 生成随机实体
	for (let index = 0; index < energy / 5; index++) {
		/**
		 * * 解析 权重信息
		 */
		const analysis = opal.AnalysisWeight(table.wasp_cluster_raid);
		// 生成 野蜂实体
		opal.TrySpawnEntity(entity.dimension, analysis.output, entity.location);
		/**
		 * * 当前能量值 - 生成时检测
		 */
		const value = entity.getDynamicProperty('wasp_emperor:energy') as number ?? 0;
		entity.setDynamicProperty('wasp_emperor:energy', value - 5);
	}
};
/**
 * * 渊鲸君临者伤害修正
 *
 * 当玩家对渊鲸君临者造成伤害时, 根据实体是否隐身修正伤害值, 并执行相应的效果
 *
 * @param {server.Entity} entity - 被攻击的渊鲸君临者实体
 *
 * @param {server.Player | server.Entity} player - 造成伤害的玩家或实体
 */
export function AbysssWhaleEmperorDamageCorrection(entity: server.Entity, player: server.Player | server.Entity) {
	/**
	 * * 获取 实体生命值组件
	 */
	const health = entity.getComponent('minecraft:health');
	/**
	 * * 判断实体是否隐身
	 */
	const isNotInvisible = entity.getEffects().every(effect => effect.typeId !== '隐身');
	/**
	 * * 损伤定义的损耗值, 根据是否隐身有不同的数值
	 */
	const attrition = isNotInvisible ? 2000 : 20000;
	// 判断 是否满足 损伤定义 的 触发条件
	if (!opal.TriggerControl('渊鲸君临者-损伤定义', entity, 20) || !health) return;
	// 如果攻击者是玩家, 则播放损伤定义音效并显示伤害值
	if (player instanceof server.Player) WhaleDamageSoundEffect(entity, player, attrition);
	// 修正实体的生命值
	health.setCurrentValue(health.currentValue - attrition);
};
/**
 * * 渊鲸君临者 损伤定义 音效
 *
 * @param {server.Entity} entity - 实体 渊鲸君临者
 *
 * @param {server.Player | server.Entity} player - 造成攻击的玩家
 *
 * @param {number} attrition - 损伤定义的损耗值
 */
function WhaleDamageSoundEffect(entity: server.Entity, player: server.Player, attrition: number) {
	// 判断 伤害数值 是否是 特攻伤害
	switch (attrition) {
		case 20000:
			// 概率性 清除 隐身效果
			if (opal.IsEnable(50)) entity.addEffect('minecraft:invisibility', 1, { amplifier: 9, showParticles: true });
			// 生成 粒子效果
			opal.TrySpawnParticle(entity.dimension, 'constant:disperse_rune_blue', entity.getHeadLocation());
			opal.TrySpawnParticle(entity.dimension, 'constant:impact_rune_blue', entity.getHeadLocation());
			opal.TrySpawnParticle(entity.dimension, 'constant:excite_rune_blue', entity.getHeadLocation());
			// 播放 特攻音效
			player.playSound('item.trident.thunder');
			break;

		default:
			// 播放命中音效
			server.system.run(() => player.playSound('random.anvil_land'));
			player.playSound('ambient.weather.lightning.impact');
			// 君临者 随机隐身
			WhaleRandomStealth(entity, player);
			break;
	};
	// 生成粒子效果
	opal.TrySpawnParticle(entity.dimension, 'constant:erupt_rune_blue', entity.getHeadLocation());
};
/**
 * * 渊鲸君临者 随机隐身
 *
 * @param {server.Entity} entity - 实体 渊鲸君临者
 *
 * @param {server.Player | server.Entity} player - 造成攻击的玩家
 */
function WhaleRandomStealth(entity: server.Entity, player: server.Player) {
	// 判断 是否满足 隐身 的 触发条件
	if (!opal.IsEnable(10)) return;
	/**
	 * * 获取 实体位置
	 */
	const copyEntityLocation = opal.Vector.copy(entity.getHeadLocation());
	/**
	 * * 获取 玩家位置
	 */
	const copyPlayerLocation = opal.Vector.copy(player.getHeadLocation());
	/**
	 ** 粒子射流方向
	 */
	const direction = opal.Vector.difference(copyEntityLocation, copyPlayerLocation);
	/**
	 * * 定义 粒子参数
	 */
	const molang = new server.MolangVariableMap();
	// 设置 粒子参数
	molang.setVector3('variable.direction', direction);
	molang.setFloat('variable.type', 0);
	// 移动实体
	entity.teleport(copyPlayerLocation);
	player.teleport(copyEntityLocation);
	// 生成粒子效果
	opal.TrySpawnParticle(entity.dimension, 'constant:disperse_rune_blue', copyPlayerLocation);
	opal.TrySpawnParticle(entity.dimension, 'constant:pulse_rune_blue', copyPlayerLocation);
	opal.TrySpawnParticle(entity.dimension, 'scripts:path_ray', copyEntityLocation, molang);
	// 附加状态效果
	entity.addEffect('minecraft:invisibility', 300, { amplifier: 0, showParticles: true });
	// 播放 隐身音效
	server.system.run(() => player.playSound('item.trident.thunder'));
	// 生成 渊鲸实体
	opal.TrySpawnEntity(entity.dimension, "starry_map:abyss_whale.detection", opal.Vector.rangeRandom(entity.location, player.location));
	opal.TrySpawnEntity(entity.dimension, "starry_map:abyss_whale.detection", opal.Vector.rangeRandom(entity.location, player.location));
};
/**
 * * 检测渊鲸侦查者是否受到伤害
 *
 * 当玩家（或其他实体）对渊鲸造成伤害时, 检查是否满足特定条件, 并给予玩家相应的效果
 *
 * @param {server.Player | server.Entity} player - 造成伤害的实体, 应为玩家
 */
export function AbysssWhaleDetectionWasHit(player: server.Player | server.Entity) {
	// 判断是否满足损伤定义的触发条件
	if (!opal.IsEnable(15) || !(player instanceof server.Player)) return;
	// 为玩家设定失明效果
	player.addEffect('minecraft:blindness', opal.RandomFloor(100, 200), { showParticles: false });
	// 为玩家设定黑暗效果
	player.addEffect('minecraft:darkness', opal.RandomFloor(100, 200), { showParticles: false });
	// 为玩家设定君王圣裁标记
	player.setDynamicProperty('whale_adjudication', true);
	// 播放损伤定义音效
	player.playSound('mob.elderguardian.curse');
	// 为玩家显示技能命中的提示标题
	player.onScreenDisplay.setTitle({ text: '§l§c你被施加了< 君王圣裁 >' });
};
/**
 * * 渊鲸侦查者死亡事件
 *
 * 当玩家击杀渊鲸侦查者时, 检查并处理相关逻辑
 *
 * @param {server.Entity} entity - 被击杀的渊鲸实体
 *
 * @param {server.Player | server.Entity | undefined} player - 击杀者, 应为玩家
 */
export function AbyssWhaleDetectionDie(entity: server.Entity, player: server.Player | server.Entity | undefined) {
	// 确保击杀者是玩家
	if (!(player instanceof server.Player)) return;
	/**
	 * * 获取当前世界中的所有渊鲸君临者实体
	 */
	const abysss_whale_emperor = entity.dimension.getEntities({ type: 'starry_map:abyss_whale.emperor' });
	/**
	 * * 获取渊鲸君临者的本地化名称
	 */
	const nameTag = opal.translate('starry_map:abyss_whale.emperor', 'entity');
	// 如果没有渊鲸君临者实体, 播放死亡音效
	if (abysss_whale_emperor.length == 0) return player.playSound('mob.warden.death');
	// 遍历所有渊鲸君临者实体
	abysss_whale_emperor.forEach(
		whale => {
			/**
			 * * 获取 实体生命值组件
			 */
			const health = whale.getComponent('minecraft:health');
			// 扣除 渊鲸君临者 生命值
			server.system.runTimeout(() => { if (whale && whale.isValid) health?.setCurrentValue(health?.currentValue - 20000) }, 20);
			server.system.runTimeout(() => { if (whale && whale.isValid) health?.setCurrentValue(health?.currentValue - 20000) }, 40);
		}
	);
	// 播放 渊鲸君临者 重创音效
	player.playSound('random.totem');
	// 更新玩家屏幕上的标题, 显示渊鲸君临者遭受重创的信息
	player.onScreenDisplay.setTitle([nameTag, { text: '§l§c遭受重创!!' }]);
};
/**
 * * 渊鲸执行者死亡事件
 *
 * 当玩家击杀渊鲸时, 增加计数并判断是否满足生成渊鲸君临者的条件
 *
 * @param {server.Entity} entity - 被击杀的实体
 *
 * @param {server.Player | server.Entity | undefined} player - 击杀者, 可能是玩家或其他实体
 */
export function AbyssWhaleExecuteDie(entity: server.Entity, player: server.Player | server.Entity | undefined) {
	// 确保击杀者是玩家
	if (!(player instanceof server.Player)) return;
	/**
	 * * 获取玩家的击杀数量
	 */
	const count = player.getDynamicProperty('abysss_whale_emperor_generate_count') as number ?? 0;
	/**
	 * * 获取实体的位置
	 */
	const copyLocation = opal.Vector.copy(entity.location);
	// 播放击杀音效
	player.playSound('mob.warden.sonic_charge');
	// 判断 玩家的击杀数量
	if (count >= 20) {
		// 重置 玩家的击杀数量
		player.setDynamicProperty('abysss_whale_emperor_generate_count', 0);
		// 给予 玩家 负面 状态效果
		player.addEffect('minecraft:blindness', 100, { showParticles: false });
		player.addEffect('minecraft:darkness', 100, { showParticles: false });
		player.addEffect('minecraft:nausea', 100, { showParticles: false });
		// 生成 渊鲸君临者 并 给与 潮涌能量
		server.system.runTimeout(() => CreateAbysssWhaleEmperor(copyLocation, player), 95);
		// 更新玩家屏幕上的标题, 显示渊鲸君临者即将到来
		player.onScreenDisplay.setTitle({ text: '§l§c君王震怒! §d君临者§c正在降临!' });
		// 传送玩家到指定位置
		player.teleport(copyLocation);
		return;
	};
	// 增加玩家的击杀数量
	player.setDynamicProperty('abysss_whale_emperor_generate_count', count + 1);
};
/**
 * * 创建渊鲸君临者
 *
 * 在指定位置生成渊鲸君临者, 并给予玩家特殊效果
 *
 * @param {server.Vector3} location - 生成位置
 *
 * @param {server.Player} player - 玩家对象
 */
function CreateAbysssWhaleEmperor(location: server.Vector3, player: server.Player) {
	// 给予 玩家 正面 状态效果
	player.addEffect('minecraft:conduit_power', 6000, { showParticles: false });
	// 播放 君临者刷新 音效
	player.playSound('mob.warden.roar');
	// 刷新 渊鲸君临者
	opal.TrySpawnEntity(player.dimension, 'starry_map:abyss_whale.emperor', location);
};

// todo 君王暴龙 ( 古龙-君临者 )
// 定义需要排除的实体类型列表
const COMMON_EXCLUDE_TYPES = ["minecraft:item", "minecraft:xp_orb"];
// 定义需要排除的实体家族列表
const COMMON_EXCLUDE_FAMILIES = ['divine_favor_guide', 'tyrannosaurus_rex'];
/**
 * 获取实体查询选项
 *
 * @param self 源实体用于排除自身类型
 */
function getQueryOptions(self: server.Entity, maxDistance: number, closest: number): server.EntityQueryOptions {
	// 返回实体查询配置对象, 包含以下属性：
	return {
		// 需要排除的实体类型列表, 结合公共排除类型和当前实体类型
		excludeTypes: [...COMMON_EXCLUDE_TYPES, self.typeId],
		// 需要排除的实体家族列表
		excludeFamilies: COMMON_EXCLUDE_FAMILIES,
		// 最大查询距离
		maxDistance,
		// 是否返回最近的实体
		closest
	};
};
/**
 * 被动技能 - 战场清扫（优化版）
 */
export async function tyrannosaurusRexAttack(self: server.Entity) {
	// 检查当前实体是否有效、是否已初始化以及冷却控制是否通过
	if (!self || !self?.isValid || !self.getDynamicProperty('entity:is_initial') || !opal.TriggerControl("君王暴龙-被动技能-冷却", self, opal.RandomFloor(60, 200))) return;
	// 获取当前实体所在的维度（即所在世界）
	const dimension = self.dimension;
	// 查询周围符合条件的实体列表, 使用自定义查询选项
	const entities = dimension.getEntities({ ...getQueryOptions(self, 32, 8), location: self.location });
	// 获取当前实体的出生点位置属性
	const createPlace = self.getDynamicProperty('entity:create_place') as server.Vector3;
	// 获取当前实体的属性面板
	const property = opal.GetProperty(self);
	// 如果没有找到目标实体则直接返回
	if (entities.length === 0) return;
	// 定义创建攻击轨迹的函数
	const createAttackPath = (entity: server.Entity, index: number) => {
		// 计算目标位置（当前实体头部到目标头顶中间位置）
		const targetPos = opal.Vector.add(entity.location, { x: 0.5, y: 1.5, z: 0.5 });
		// 随机选择一个符文类型
		const runeType = Object.values(type.RUNE_ENUM)[opal.RandomFloor(0, 7)];
		// 创建Molang变量映射对象
		const molang = new server.MolangVariableMap();
		// 设置当前使用的符文类型
		property.self_rune = runeType;
		// 根据符文类型设置粒子颜色
		molang.setColorRGB('variable.color', table.getRuneColor(runeType));
		// 定义轨迹执行参数
		const parameter: type.ROUTE_ARGS = {
			locations: [self.getHeadLocation(), targetPos],  // 轨迹起点和终点
			particleMolang: ['scripts:color_smoke', molang],  // 粒子效果配置
			on_done: createExplosionEffect(self, entity, { ...property }),  // 结束时执行的爆炸效果
			dimension,  // 当前维度
			cooldown: 1,  // 冷却时间
			speed: 1  // 运动速度
		};
		// 延迟执行轨迹创建逻辑, 确保顺序执行
		server.system.runTimeout(() => opal.PathExecute.Create('君王暴龙-炮击轨迹', 1, parameter), (index + 1) * 10);
	};
	// 获得近战伤害提升
	self.addEffect('strength', 100, { showParticles: false, amplifier: 4 })
	// 对所有目标实体应用攻击路径逻辑
	entities.forEach(createAttackPath);
	// 等待 20 个游戏刻
	await server.system.waitTicks(20);
	// 执行位置校验和传送逻辑
	handlePositionCheck(self, createPlace, entities);
};
/**
 * 处理位置校验和传送逻辑
 */
function handlePositionCheck(self: server.Entity, createPlace: server.Vector3, targets: server.Entity[]) {
	// 如果没有创建位置或者当前位置与目标位置距离小于等于48则直接返回
	if (!createPlace || opal.Vector.distance(self.location, createPlace) <= 48) return;
	// 创建需要传送的实体列表（包含自身和所有目标）
	const teleportEntities = [...targets, self].filter(entity => entity && entity?.isValid);
	// 对所有有效实体执行传送操作
	teleportEntities.forEach(entity => entity.tryTeleport(createPlace));
	// 在原地显示距离数值粒子效果
	opal.NumberParticleDisplay(self, opal.Vector.distance(self.location, createPlace), { x: 0, y: 4, z: 0 });
};
/**
 * 创建爆炸效果处理器（优化版）
 */
function createExplosionEffect(self: server.Entity, target: server.Entity, property: type.GET_PROPERTY_PANEL) {
	// 返回一个轨迹完成时的处理函数
	return (args: type.ROUTE_ANNEX_ARGS) => {
		// 检查当前实体和目标实体是否有效
		if (!self || !self?.isValid || !target || !target?.isValid) return;
		// 获取爆炸影响范围内的所有实体
		const victims = args.dimension.getEntities({ ...getQueryOptions(self, 4, 4), location: args.location });
		// 对所有受影响的实体应用元素伤害逻辑
		victims.forEach(entity => applyElementalDamage(self, entity, property));
	};
};
/**
 * 应用元素伤害和击退效果
 */
function applyElementalDamage(attacker: server.Entity, target: server.Entity, property: type.GET_PROPERTY_PANEL) {
	// 检查目标实体有效性
	if (!target || !target?.isValid) return;
	// 判断是否触发暴击
	const isCritical = opal.IsErupt(attacker);
	// 执行元素攻击逻辑并显示效果
	opal.ElementalAttack(attacker, target, isCritical, property);
	// 计算随机的击退方向和强度
	const [kbX, kbZ] = [opal.RandomFloat(-1, 1), opal.RandomFloat(-1, 1)];
	const [strengthH, strengthV] = [opal.RandomFloat(1, 4), opal.RandomFloat(1, 4)];
	// 应用击退效果
	target.applyKnockback({ x: kbX * strengthH, z: kbZ * strengthH }, strengthV);
};