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
 * * 组件前缀代词
 */
const componentPrefix = 'opal:item.';
/**
 * * 物品自定义组件列表
 */
const components = new Map<string, server.ItemCustomComponent>();
/*
 * 召唤 渊鲸 - 维系者
 */
components.set(componentPrefix + 'call_whale_support',
	{
		onUse(source) {
			/**
			 * * 触发自定义组件的玩家
			 */
			const player = source.source;
			/**
			 * * 触发自定义组件的物品
			 */
			const item = source.itemStack;
			/**
			 * * 玩家背包
			 */
			const container = player.getComponent('inventory')?.container;
			// 判断条件是否满足
			if (!container || !player || !item) return;
			// 判断是否冷却完成
			if (!opal.TriggerControl(item.typeId, player, 20)) return;
			// 检测是否在 水下
			if (!player.dimension.getBlock(player.location)?.isLiquid) {
				player.sendMessage([opal.translate(player), { text: ' -> 请在水下使用, 无法在空气中召唤<§l§9 渊鲸-维系者 §r>' }]);
				return;
			};
			// 执行召唤流程
			opal.SummonEntityWithData(player, container, 'starry_map:abyss_whale.support');
		}
	}
);
/*
 * 召唤 森蚺 - 哨兵炮
 */
components.set(componentPrefix + 'call_python_sentinel',
	{
		onUse(source) {
			/**
			 * * 触发自定义组件的玩家
			 */
			const player = source.source;
			/**
			 * * 触发自定义组件的物品
			 */
			const item = source.itemStack;
			/**
			 * * 玩家背包
			 */
			const container = player.getComponent('inventory')?.container;
			// 判断条件是否满足
			if (!container || !player || !item) return;
			// 判断是否冷却完成
			if (!opal.TriggerControl(item.typeId, player, 20)) return;
			// 执行召唤流程
			opal.SummonEntityWithData(player, container, 'starry_map:viper.sentinel');
		}
	}
);
/*
 * 召唤 隧龙 - 领航者
 */
components.set(componentPrefix + 'call_tunnel_dragon_guide',
	{
		onUse(source) {
			/**
			 * * 触发自定义组件的玩家
			 */
			const player = source.source;
			/**
			 * * 触发自定义组件的物品
			 */
			const item = source.itemStack;
			/**
			 * * 玩家背包
			 */
			const container = player.getComponent('inventory')?.container;
			// 判断条件是否满足
			if (!container || !player || !item) return;
			// 判断是否冷却完成
			if (!opal.TriggerControl(item.typeId, player, 20)) return;
			// 执行召唤流程
			opal.SummonEntityWithData(player, container, 'starry_map:tunnel_dragon');
		}
	}
);
/*
 * 召唤 虚物靶标
 */
components.set(componentPrefix + 'call_virtual_target',
	{
		onUse(source) {
			/**
			 * * 触发自定义组件的玩家
			 */
			const player = source.source;
			/**
			 * * 触发自定义组件的物品
			 */
			const item = source.itemStack;
			/**
			 * * 玩家背包
			 */
			const container = player.getComponent('inventory')?.container;
			// 判断条件是否满足
			if (!container || !player || !item) return;
			// 判断是否冷却完成
			if (!opal.TriggerControl(item.typeId, player, 20)) return;
			// 执行召唤流程
			opal.SummonEntityWithData(player, container, 'starry_map:execute.virtual_target');
		}
	}
);
/**
 * * 森蚺 - 先锋炮
 */
components.set(componentPrefix + 'call_python_pioneer',
	{
		onUse(source) {
			/**
			 * * 触发自定义组件的玩家
			 */
			const player = source.source;
			/**
			 * * 触发自定义组件的物品
			 */
			const item = source.itemStack;
			/**
			 * * 玩家背包
			 */
			const container = player.getComponent('inventory')?.container;
			// 判断条件是否满足
			if (!container || !player || !item) return;
			// 判断是否冷却完成
			if (!opal.TriggerControl(item.typeId, player, 4)) return;
			/**
			 * * 实体射线选中数组
			 */
			const getEntities = player.getEntitiesFromViewDirection({ maxDistance: 64 })[0];
			/**
			 * * 方块射线选中
			 */
			const getBlock = player.getBlockFromViewDirection({ maxDistance: 64 });
			/**
			 * * 方块距离
			 */
			const blockDistance = getBlock?.block ? opal.Vector.distance(player.location, getBlock?.block) : 48;
			/**
			 * * 射击距离
			 */
			const distance = getEntities?.distance ?? blockDistance;
			/**
			 * * 爆炸事件
			 *
			 * @param args - 附加参数
			 */
			const powerExplode = (args: type.ROUTE_ANNEX_ARGS) => {
				/**
				 * * 过滤器参数
				 */
				const options: server.EntityQueryOptions = {
					excludeTypes: ["minecraft:item", "minecraft:xp_orb"],
					location: args.location,
					maxDistance: 8,
					closest: 8
				};
				/**
				 * * 获取实体列表
				 */
				const entitys = args.dimension.getEntities(options).filter(entity => entity.id !== player.id);
				// 创建 元素伤害
				entitys.forEach(
					entity => {
						/**
						 * * 是否暴击
						 */
						const erupt = opal.IsErupt(player);
						// 对目标施加一次击退
						opal.BackoffByDistance(player, entity);
						// 获得属性加成
						opal.AlterProperty(player, { raise_basic_attack: distance });
						// 结算法术伤害
						opal.ElementalAttack(player, entity, erupt);
					}
				);
				// 播放 爆炸音效
				args.dimension.playSound('random.explode', args.location);
				// 创建粒子效果
				opal.TrySpawnParticle(player.dimension, 'constant:impact_rune_white', args.location);
			};
			// 创建 路径规划
			opal.PathExecute.Create('森蚺先锋炮-炮击轨迹', 1,
				{
					particles: ['constant:smoke_rune_white'],
					dimension: player.dimension,
					on_done: powerExplode,
					locations: [],
					cooldown: 1,
					speed: 1,
					shoot: {
						start_place: player.getHeadLocation(),
						toward: player.getViewDirection(),
						max_distance: distance,
					}
				}
			)
			// 播放 开火音效
			player.playSound('mob.irongolem.repair');
			// 更新 物品冷却
			item.getComponent('minecraft:cooldown')?.startCooldown(player);
			// 更新 物品耐久
			opal.SetDurability(player, item, container, player.selectedSlotIndex, 1);
		}
	}
);
export default components;