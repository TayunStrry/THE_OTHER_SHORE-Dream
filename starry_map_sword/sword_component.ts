/*
 * 原版接口
 */
import * as server from "@minecraft/server";
/*
 * 数学拓展模块
 */
import { Vector } from '../system/maths';
/*
 * 物品处理模块
 */
import { SetDurability } from '../system/parse_item';
/*
 * 触发控制模块
 */
import { TriggerControl, ObtainWaitTime } from '../system/control';
/*
 * 实例创建模块
 */
import { TrySpawnParticle, TrySpawnEntity, TrySpawnItem } from '../system/create';
/*
 * 计划执行模块
 */
import { PathExecute } from '../system/plan';
/**
 * 组件前缀代词
 */
const componentPrefix = 'opal:item.';
/**
 * 物品自定义组件列表
 */
const components = new Map<string, server.ItemCustomComponent>();
/*
 * ［龙王］武士刀
 */
components.set(componentPrefix + 'dragonKingSamuraiSword',
	{
		onUse(source) {
			/**
			 * 触发自定义组件的玩家
			 */
			const player = source.source;
			/**
			 * 触发自定义组件的物品
			 */
			const item = source.itemStack;
			/**
			 * 玩家背包
			 */
			const container = player.getComponent('inventory')?.container;
			/**
			 * 获取当前选中物品的索引
			 */
			const slotIndex = player.selectedSlotIndex;
			// 判断条件是否满足
			if (!container || !player || !item) return player.onScreenDisplay.setActionBar('还未准备就绪!');
			/**
			 * 获取 向量
			 */
			const vector = player.getViewDirection();
			// 判断是否潜行
			if (player.isSneaking) return dragonKingSamuraiSwordUseSprint(player, item, container, slotIndex, vector);
			/**
			 * 获取冷却的剩余时间
			 */
			const time = ObtainWaitTime('［龙王］武士刀-闪避', player)
			// 判断是否冷却完成
			if (time !== 0) return player.onScreenDisplay.setActionBar('技能< 闪避 >正在冷却: ' + time / 20);
			// 设置动能
			player.applyKnockback(vector.x, vector.z, (Math.abs(vector.x) + Math.abs(vector.z)) * 2, vector.y * 0.5);
			// 附加状态效果
			player.addEffect('resistance', 10, { amplifier: 255, showParticles: false });
			// 更新 物品耐久
			SetDurability(player, item, container, slotIndex, 1);
			// 播放闪避音效
			player.playSound('item.trident.return');
			// 注册冷却事件
			TriggerControl('［龙王］武士刀-闪避', player, 20);
		},
		onHitEntity(source) {
			/**
			 * 触发自定义组件的玩家
			 */
			const player = source.attackingEntity;
			/**
			 * 玩家背包
			 */
			const container = player.getComponent('inventory')?.container;
			/**
			 * 触发自定义组件的物品
			 */
			const item = source.itemStack;
			/**
			 * 触发自定义组件的目标实体
			 */
			const target = source.hitEntity;
			// 判断条件是否满足
			if (!(player instanceof server.Player) || !item || !target || !container) return;
			// 判断是否冷却完成
			if (!TriggerControl('［龙王］武士刀-近战-范围伤害', player, 40)) return;
			/**
			 * 获取当前选中物品的索引
			 */
			const slotIndex = player.selectedSlotIndex;
			/**
			 * 设置 范围查询 的 过滤条条件
			 */
			const options: server.EntityQueryOptions = {
				excludeTypes: ["minecraft:item", "minecraft:xp_orb"],
				location: target?.location,
				maxDistance: 4,
				closest: 8
			};
			/**
			 * 获取 目标周围的实体
			 */
			const getQueue = player.dimension.getEntities(options).filter(entity => entity.id !== player.id);
			// 对选中的实体队列造成伤害
			getQueue.forEach(entity => entity.applyDamage(15, { damagingEntity: player, cause: server.EntityDamageCause.entityExplosion }));
			// 生成 粒子特效
			TrySpawnParticle(player.dimension, "minecraft:huge_explosion_emitter", target?.location ?? player.location);
			TrySpawnParticle(player.dimension, "constant:rainbow_hit", target?.location ?? player.location);
			// 更新 物品冷却
			item.getComponent('minecraft:cooldown')?.startCooldown(player);
			// 更新 物品耐久
			SetDurability(player, item, container, slotIndex, 1);
			// 播放命中音效
			player.playSound('item.trident.throw');
		}
	}
);
/*
 * 雷神之锤
 */
components.set(componentPrefix + 'lightningHammer',
	{
		onHitEntity(source) {
			/**
			 * 触发自定义组件的玩家
			 */
			const player = source.attackingEntity;
			/**
			 * 玩家背包
			 */
			const container = player.getComponent('inventory')?.container;
			/**
			 * 触发自定义组件的物品
			 */
			const item = source.itemStack;
			/**
			 * 触发自定义组件的目标实体
			 */
			const target = source.hitEntity;
			// 判断条件是否满足
			if (!(player instanceof server.Player) || !item || !target || !container) return;
			/**
			 * 获取当前选中物品的索引
			 */
			const slotIndex = player.selectedSlotIndex;
			// 判断是否为潜行状态
			if (player.isSneaking) lightningHammerHitEntityExplosion(player, target);
			// 否则执行雷鸣效果
			else lightningHammerHitEntityDefault(player, target);
			// 附加状态效果
			player.addEffect('fire_resistance', 60, { amplifier: 255, showParticles: false });
			// 更新 物品耐久
			SetDurability(player, item, container, slotIndex, 1);
		},
		onUse(source) {
			/**
			 * 触发自定义组件的玩家
			 */
			const player = source.source;
			/**
			 * 触发自定义组件的物品
			 */
			const item = source.itemStack;
			/**
			 * 玩家背包
			 */
			const container = player.getComponent('inventory')?.container;
			// 判断条件是否满足
			if (!container || !player || !item) return player.onScreenDisplay.setActionBar('还未准备就绪!');
			// 判断是否为潜行状态
			if (player.isSneaking) lightningHammerUseShoot(player, item, container);
			// 否则执行雷鸣效果
			else lightningHammerUseCollision(player, item, container);
			// 附加状态效果
			player.addEffect('fire_resistance', 60, { amplifier: 255, showParticles: false });
			// 播放闪避音效
			player.playSound('item.trident.return');
		}
	}
);
/*
 * 菜刀
 */
components.set(componentPrefix + 'kitchenKnife',
	{
		onUse(source) {
			/**
			 * 触发自定义组件的玩家
			 */
			const player = source.source;
			/**
			 * 触发自定义组件的物品
			 */
			const item = source.itemStack;
			/**
			 * 玩家背包
			 */
			const container = player.getComponent('inventory')?.container;
			// 判断条件是否满足
			if (!container || !player || !item) return player.onScreenDisplay.setActionBar('还未准备就绪!');
			/**
			 * 获取当前选中物品的索引
			 */
			const slotIndex = player.selectedSlotIndex;
			/**
			 * 获取 向量
			 */
			const viewDirection = player.getViewDirection();
			/**
			 * 获取 自我位置
			 */
			const selfLocation = Vector.copy(player.getHeadLocation());
			/**
			 * 判断是否命中目标
			 */
			let hitTarget = false;
			// 清除手持物品
			container.setItem(slotIndex);
			/**
			 * 生成物品展示实体
			 */
			const itemDisplay = TrySpawnEntity(player.dimension, 'starry_map:execute.item_display', selfLocation);
			// 判断是否生成成功
			if (itemDisplay instanceof Error) return;
			// 设置物品展示实体手持物品
			itemDisplay.runCommand('replaceitem entity @s slot.weapon.mainhand 0 ' + item.typeId);
			// 遍历路径位置
			PathExecute.Create('菜刀-投掷', 1,
				{
					'cooldown': 1,
					'dimension': player.dimension,
					'locations': [],
					'speed': 4,
					'on_move': (data) => {
						// 获取计划表当前指向的坐标
						const { location } = data;
						// 更新实体位置
						itemDisplay.teleport(location, { rotation: player.getRotation() });
						/**
						 * 设置 范围查询 的 过滤条条件
						 */
						const options: server.EntityQueryOptions = {
							excludeTypes: ["minecraft:item", "minecraft:xp_orb", "starry_map:execute.item_display"],
							location: location,
							maxDistance: 2,
							closest: 2
						};
						/**
						 * 获取击中的实体
						 */
						const hitEntity = player.dimension.getEntities(options).filter(entity => entity.id !== player.id);
						/**
						 * 获取击中的方块
						 */
						const hitBlock = player.dimension.getBlock(location);
						// 判断是否为空气或水
						if (!hitBlock?.isAir && !hitBlock?.isLiquid) return false;
						// 判断是否命中实体
						if (hitEntity.length == 0) return true;
						// 标记命中实体
						hitTarget = true;
						// 遍历击中的实体
						hitEntity.forEach(entity => entity.applyDamage(15, { damagingEntity: player, cause: server.EntityDamageCause.entityExplosion  }));
						// 表示循环继续执行
						return true;
					},
					'on_done': data => {
						if (!hitTarget) TrySpawnItem(player.dimension, item, data.location);
						itemDisplay.remove();
					},
					'shoot': {
						'max_distance': 32,
						'start_place': selfLocation,
						'toward': viewDirection
					}
				}
			);
			// 播放闪避音效
			player.playSound('item.trident.return');
		}
	}
)
export default components;
function dragonKingSamuraiSwordUseSprint(player: server.Player, item: server.ItemStack, container: server.Container, slotIndex: number, vector: server.Vector3, horizontalStrength: number = 16, verticalStrength: number = 2) {
	/**
	 * 获取冷却的剩余时间
	 */
	const time = ObtainWaitTime('［龙王］武士刀-龙闪', player)
	// 判断是否冷却完成
	if (time !== 0) return player.onScreenDisplay.setActionBar('技能< 龙闪 >正在冷却: ' + time / 20);
	/**
	 * 获取起始位置
	 */
	const startLocation = Vector.copy(player.location);
	// 设置动能
	player.applyKnockback(vector.x, vector.z, (Math.abs(vector.x) + Math.abs(vector.z)) * horizontalStrength, vector.y * verticalStrength);
	// 播放穿刺音效
	player.playSound('item.trident.riptide_3');
	// 等待 10 帧
	server.system.runTimeout(
		() => {
			/**
			 * 终点位置
			 */
			const endLocation = Vector.copy(player.location);
			/**
			 * 获取向量差
			 */
			const difference = Vector.difference(startLocation, endLocation);
			/**
			 * 获取向量长度
			 */
			const distance = Vector.distance(startLocation, endLocation);
			// 遍历路径位置
			for (let i = 0; i < distance; i++) {
				/**
				 * 获取路径点坐标
				 */
				const location = Vector.scale(difference, i).add(startLocation);
				/**
				 * 设置 范围查询 的 过滤条条件
				 */
				const options: server.EntityQueryOptions = {
					excludeTypes: ["minecraft:item", "minecraft:xp_orb"],
					location: location,
					maxDistance: 6,
					closest: 4
				};
				// 生成 粒子特效
				TrySpawnParticle(player.dimension, "constant:rainbow_phantom", location);
				/**
				 * 获取击中的实体
				 */
				const hitEntity = player.dimension.getEntities(options).filter(entity => entity.id !== player.id);
				// 判断是否命中实体
				if (hitEntity.length == 0) continue;
				// 遍历击中的实体
				hitEntity.forEach(entity => entity.applyDamage(15, { damagingEntity: player, cause: server.EntityDamageCause.entityExplosion  }));
			};
			// 更新 物品耐久
			SetDurability(player, item, container, slotIndex, 1);
		}, 10
	);
	// 注册冷却事件
	TriggerControl('［龙王］武士刀-龙闪', player, 100);
};
async function lightningHammerHitEntityExplosion(player: server.Player, target: server.Entity) {
	/**
	 * 获取 目标位置
	 */
	const targetLocation = Vector.copy(target?.location);
	/**
	 * 获取冷却的剩余时间
	 */
	const time = ObtainWaitTime('雷神之锤-冲击波', player);
	/**
	 * 获取 向量
	 */
	const vector = player.getViewDirection();
	// 判断是否冷却完成
	if (time !== 0) return player.onScreenDisplay.setActionBar('技能< 冲击波 >正在冷却: ' + time / 20);
	// 设置动能
	player.applyKnockback(-vector.x, -vector.z, (Math.abs(vector.x) + Math.abs(vector.z)) * 4, vector.y * 0.5);
	// 播放闪避音效
	player.playSound('item.trident.return');
	// 注册冷却事件
	TriggerControl('雷神之锤-冲击波', player, 280);
	// 等待 5 帧
	await server.system.waitTicks(5);
	/**
	 * 用于触发爆炸的末影水晶
	 */
	const crystal = TrySpawnEntity(player.dimension, 'starry_map:execute.item_display', targetLocation);
	// 生成 粒子特效
	TrySpawnParticle(player.dimension, 'constant:amber_explosion', targetLocation);
	TrySpawnParticle(player.dimension, 'constant:blue_explosion', targetLocation);
	// 如果 末影水晶成功生成 则 触发爆炸事件
	if (crystal instanceof server.Entity) crystal.triggerEvent('minecraft:crystal_explode');
};
async function lightningHammerHitEntityDefault(player: server.Player, target: server.Entity) {
	/**
	 * 获取 目标位置
	 */
	const targetLocation = Vector.copy(target?.location);
	/**
	 * 获取冷却的剩余时间
	 */
	const time = ObtainWaitTime('雷神之锤-普攻', player);
	/**
	 * 获取 向量
	 */
	const vector = player.getViewDirection();
	// 判断是否冷却完成
	if (time !== 0) return player.onScreenDisplay.setActionBar('技能< 普攻 >正在冷却: ' + time / 20);
	// 对选中的实体造成伤害
	target.applyDamage(9, { damagingEntity: player, cause: server.EntityDamageCause.entityExplosion  })
	// 设置动能
	player.applyKnockback(-vector.x, -vector.z, (Math.abs(vector.x) + Math.abs(vector.z)) * 3, vector.y * 0.5);
	// 播放闪避音效
	player.playSound('item.trident.return');
	// 注册冷却事件
	TriggerControl('雷神之锤-普攻', player, 60);
	// 等待 5 帧
	await server.system.waitTicks(5);
	// 生成雷电
	TrySpawnEntity(player.dimension, 'minecraft:lightning_bolt', targetLocation);
};
async function lightningHammerUseShoot(player: server.Player, item: server.ItemStack, container: server.Container) {
	/**
	 * 获取 自我位置
	 */
	const selfLocation = Vector.copy(player.getHeadLocation());
	/**
	 * 获取 向量
	 */
	const viewDirection = player.getViewDirection();
	/**
	 * 获取冷却的剩余时间
	 */
	const time = ObtainWaitTime('雷神之锤-雷电射线', player);
	/**
	 * * 定义 粒子参数
	 */
	const molang = new server.MolangVariableMap();
	/**
	 * 获取当前选中物品的索引
	 */
	const slotIndex = player.selectedSlotIndex;
	/**
	 * 雷电射击事件
	 */
	function event() {
		// 遍历路径位置
		for (let i = 0; i < 15; i++) {
			/**
			 * 获取路径点坐标
			 */
			const location = Vector.scale(viewDirection, i).add(selfLocation);
			/**
			 * 设置 范围查询 的 过滤条条件
			 */
			const options: server.EntityQueryOptions = {
				excludeTypes: ["minecraft:item", "minecraft:xp_orb"],
				location: location,
				maxDistance: 2,
				closest: 4
			};
			/**
			 * 获取击中的实体
			 */
			const hitEntity = player.dimension.getEntities(options).filter(entity => entity.id !== player.id);
			// 判断是否命中实体
			if (hitEntity.length == 0) continue;
			// 遍历击中的实体
			hitEntity.forEach(entity => entity.applyDamage(9, { damagingEntity: player, cause: server.EntityDamageCause.entityExplosion  }));
		};
		// 修正玩家位置
		player.teleport(Vector.add(selfLocation, Vector.CONSTANT_DOWN));
	}
	// 设置 粒子参数
	molang.setFloat('variable.type', 0);
	molang.setVector3('variable.direction', viewDirection);
	// 判断是否冷却完成
	if (time !== 0) return player.onScreenDisplay.setActionBar('技能< 雷电射线 >正在冷却: ' + time / 20);
	// 注册冷却事件
	TriggerControl('雷神之锤-雷电射线', player, 200);
	// 生成粒子特效
	TrySpawnParticle(player.dimension, 'scripts:lightning_ray', selfLocation, molang);
	// 执行 3 次雷击事件
	server.system.runTimeout(() => event(), 5);
	server.system.runTimeout(() => event(), 10);
	server.system.runTimeout(() => event(), 15);
	server.system.runTimeout(() => event(), 20);
	server.system.runTimeout(() => event(), 25);
	server.system.runTimeout(() => event(), 30);
	// 更新 物品耐久
	SetDurability(player, item, container, slotIndex, 1);
};
async function lightningHammerUseCollision(player: server.Player, item: server.ItemStack, container: server.Container) {
	/**
	 * 获取 自我位置
	 */
	const selfLocation = Vector.copy(player.getHeadLocation());
	/**
	 * 获取 向量
	 */
	const viewDirection = player.getViewDirection();
	/**
	 * 获取冷却的剩余时间
	 */
	const time = ObtainWaitTime('雷神之锤-投掷', player);
	/**
	 * 获取当前选中物品的索引
	 */
	const slotIndex = player.selectedSlotIndex;
	// 判断是否冷却完成
	if (time !== 0) return player.onScreenDisplay.setActionBar('技能< 投掷 >正在冷却: ' + time / 20);
	// 注册冷却事件
	TriggerControl('雷神之锤-投掷', player, 120);
	// 清除手持物品
	container.setItem(slotIndex);
	/**
	 * 生成物品展示实体
	 */
	const itemDisplay = TrySpawnEntity(player.dimension, 'starry_map:execute.item_display', selfLocation);
	// 判断是否生成成功
	if (itemDisplay instanceof Error) return;
	// 设置物品展示实体手持物品
	itemDisplay.runCommand('replaceitem entity @s slot.weapon.mainhand 0 ' + item.typeId)
	// 遍历路径位置
	PathExecute.Create('雷神之锤-投掷', 1,
		{
			'cooldown': 1,
			'dimension': player.dimension,
			'locations': [selfLocation, Vector.scale(viewDirection, 10).add(selfLocation), Vector.scale(viewDirection, -1).add(selfLocation)],
			'speed': 1,
			'on_move': (data) => {
				// 获取计划表当前指向的坐标
				const { location } = data;
				// 更新实体位置
				itemDisplay.teleport(location, { rotation: player.getRotation() });
				/**
				 * 设置 范围查询 的 过滤条条件
				 */
				const options: server.EntityQueryOptions = {
					excludeTypes: ["minecraft:item", "minecraft:xp_orb", "starry_map:execute.item_display"],
					location: location,
					maxDistance: 2,
					closest: 4
				};
				/**
				 * 获取击中的实体
				 */
				const hitEntity = player.dimension.getEntities(options).filter(entity => entity.id !== player.id);
				// 判断是否命中实体
				if (hitEntity.length == 0) return true;
				// 生成雷电
				TrySpawnEntity(player.dimension, 'minecraft:lightning_bolt', location);
				// 遍历击中的实体
				hitEntity.forEach(entity => entity.applyDamage(9, { damagingEntity: player, cause: server.EntityDamageCause.entityExplosion  }));
				// 表示循环继续执行
				return true;
			},
			'on_done': () => {
				SetDurability(player, item, container, slotIndex, 1);
				itemDisplay.remove();
			}
		}
	)
};
server.system.afterEvents.scriptEventReceive.subscribe(
	data => {
		/**
		 * 从传入的数据中解构出 sourceEntity, message 和 id
		 */
		const { sourceEntity, message, id } = data;
		// 判定发送者是否是一个 server.Player 实例
		if (!(sourceEntity instanceof server.Player)) return server.world.sendMessage('[ERROR] 玩家数据获取失败'); // 如果不是玩家则直接返回
		/**
		 * 将 sourceEntity 赋值给变量 player 以便于后续使用
		 * @type {server.Player}
		 */
		const player: server.Player = sourceEntity;
		/**
		 * 获取玩家当前选中的槽位索引
		 * @type {number}
		 */
		const slotIndex: number = player.selectedSlotIndex;
		/**
		 * 尝试获取玩家的物品容器组件, 如果没有则返回 undefined
		 * @type {server.Container | undefined}
		 */
		const container: server.Container | undefined = player.getComponent('minecraft:inventory')?.container;
		/**
		 * 从容器中获取指定槽位的物品, 如果槽位不存在或容器未定义则返回 undefined
		 * @type { server.ItemStack | undefined}
		 */
		const item: server.ItemStack | undefined = container?.getItem(slotIndex);
		/**
		 * 获取玩家当前朝向的向量
		 * @type {server.Vector3}
		 */
		const vector: server.Vector3 = player.getViewDirection();
		/**
		 * 从 message 中解析出水平与垂直方向的力度
		 * @type {number[]}
		 */
		const power: number[] = message.split(/\s+/).map(x => parseInt(x))
		// 判定物品和容器是否存在
		if (!item || !container) return server.world.sendMessage('[ERROR] 物品数据获取失败'); // 如果物品或容器不存在则直接返回
		// 根据指令的类型进行不同的处理
		switch (id.split(':')[1]) {
			case 'bn':
				/**
				 * 处理使用龙王武士剑的指令, 如果是指令 dragonKingSamuraiSword
				 *
				 * @param {server.Player} sourceEntity - 发送指令的玩家实体
				 *
				 * @param {minecraft ItemStack} item - 被使用的物品
				 *
				 * @param {minecraft:InventoryContainer} container - 包含物品的容器
				 *
				 * @param {number} slotIndex - 物品所在的槽位索引
				 *
				 * @param {Vector3} vector - 玩家的朝向向量
				 *
				 * @param {number} horizontalStrength - 水平方向的力量值
				 *
				 * @param {number} verticalStrength - 垂直方向的力量值
				 */
				dragonKingSamuraiSwordUseSprint(sourceEntity, item, container, slotIndex, vector, power[0], power[1])
				break;
			// 其他类型的指令不做处理
			default: break;
		}
	},
	{
		'namespaces': ['DK']
	}
);