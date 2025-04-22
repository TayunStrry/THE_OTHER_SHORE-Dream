/*
 * 原版接口
 */
import * as serverUI from "@minecraft/server-ui";
import * as server from "@minecraft/server";
/*
 * 系统组件
 */
import * as opal from "../system/opal";
import * as table from "../data/table";
import * as type from "../data/type";
/**
 * * 组件前缀代词
 */
const componentPrefix = 'opal:item.';
/**
 * * 物品自定义组件列表
 */
const components = new Map<string, server.ItemCustomComponent>();
/**
 * * 获取 伤害提升
 */
function increaseDamage(player: server.Player, container: server.Container, single: boolean = true) {
	// 遍历 背包容器
	for (let index = 0; index < container.size; index++) {
		/**
		 * * 获取 物品对象
		 */
		const item = container.getItem(index);
		// 排除无效的物品对象
		if (!item || !item.hasTag('tags:energy_crystal.series')) continue;
		/**
		 * * 获取 物品对象标识
		 */
		const typeID = item.typeId.split(/:/)[1];
		// 排除 无法进行强化的 魔晶石
		if (typeID == 'eternal_energy') continue;
		if (single) only(item)
		else all(item);
		break;
	};
	function only(item: server.ItemStack) {
		/**
		 * * 进行消耗的样本物品
		 */
		const sample = new server.ItemStack(item.typeId);
		/**
		 * * 获取 玩家属性面板
		 */
		const stages = opal.GetProperty(player);
		/**
		 * * 计算 魔晶武器 攻击提升
		 */
		const raise_basic_attack = stages.raise_basic_attack + (stages.basic_attack) * 2;
		// 设置 玩家属性面板
		opal.AlterProperty(player, { raise_basic_attack });
		// 消耗 物品对象
		opal.DeleteItemStack(container, sample);
	};
	function all(item: server.ItemStack) {
		/**
		 * * 进行消耗的样本物品
		 */
		const sample = new server.ItemStack(item.typeId, item.amount);
		/**
		 * * 获取 玩家属性面板
		 */
		const stages = opal.GetProperty(player);
		/**
		 * * 计算 魔晶武器 攻击提升
		 */
		const raise_basic_attack = ((stages.raise_basic_attack + (stages.basic_attack) * 2) * item.amount) + 3;
		// 设置 玩家属性面板
		opal.AlterProperty(player, { raise_basic_attack });
		// 消耗 物品对象
		opal.DeleteItemStack(container, sample);
	}
};
/*
 * 魔晶扳手
 */
components.set(componentPrefix + 'magic_crystal_wrench',
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
			/**
			 * * 定义了 窗口界面 的 标题
			 */
			const title: server.RawMessage = {
				rawtext: [
					{
						text: "<§9§o§l "
					},
					opal.translate(item),
					{
						text: " §r>§2操作界面"
					}
				]
			};
			/**
			 * * 定义了 窗口界面 的 选项
			 */
			const option: server.RawMessage[] = [
				{ text: '§l<§n§o 元素附魔 §u-§c 烛火 §5>§r' },
				{ text: '§l<§n§o 元素附魔 §u-§b 诸海 §5>§r' },
				{ text: '§l<§n§o 元素附魔 §u-§a 界木 §5>§r' },
				{ text: '§l<§n§o 元素附魔 §u-§d 极雷 §5>§r' },
				{ text: '§l<§n§o 元素附魔 §u-§p 归忆 §5>§r' },
				{ text: '§l<§n§o 元素附魔 §u-§i 启程 §5>§r' },
				{ text: '§l<§n§o 元素附魔 §u-§j 焚绝 §5>§r' }
			];
			/**
			 * * 定义了 窗口界面 的 表单对象
			 */
			const display = new serverUI.ActionFormData()
				.title(title)
				.button(option[0], "textures/物品贴图/能量水晶/烛火_魔晶石")
				.button(option[1], "textures/物品贴图/能量水晶/诸海_魔晶石")
				.button(option[2], "textures/物品贴图/能量水晶/界木_魔晶石")
				.button(option[3], "textures/物品贴图/能量水晶/极雷_魔晶石")
				.button(option[4], "textures/物品贴图/能量水晶/归忆_魔晶石")
				.button(option[5], "textures/物品贴图/能量水晶/启程_魔晶石")
				.button(option[6], "textures/物品贴图/能量水晶/焚绝_魔晶石")
				;
			/**
			 * * 设置元素附魔
			 *
			 * @param nameTag - 名称标签
			 * @param selfRune - 自身的附魔类型
			 */
			const enchanting = (nameTag: string, selfRune: string) => {
				// 为物品添加动态属性
				item.setDynamicProperty('rune_hurt:self_rune', selfRune);
				// 设置物品名称
				item.nameTag = nameTag;
				// 为物品添加词缀
				item.setLore(['攻击命中后, 将获得' + nameTag]);
				// 设置 物品对象
				container.setItem(player.selectedSlotIndex, item);
				// 播放 音效
				player.playSound('block.enchanting_table.use');
			};
			// 播放 音效
			player.playSound('tile.piston.out');
			// 显示窗口界面
			display.show(player).then(
				option => {
					if (option.canceled) return;
					switch (option.selection) {
						//元素附魔 - 烛火
						case 0: enchanting('§l<§n§o 元素附魔 §u-§c 烛火 §5>§r', type.RUNE_ENUM.red); break;
						//元素附魔 - 诸海
						case 1: enchanting('§l<§n§o 元素附魔 §u-§b 诸海 §5>§r', type.RUNE_ENUM.blue); break;
						//元素附魔 - 界木
						case 2: enchanting('§l<§n§o 元素附魔 §u-§a 界木 §5>§r', type.RUNE_ENUM.green); break;
						//元素附魔 - 极雷
						case 3: enchanting('§l<§n§o 元素附魔 §u-§d 极雷 §5>§r', type.RUNE_ENUM.purple); break;
						//元素附魔 - 归忆
						case 4: enchanting('§l<§n§o 元素附魔 §u-§p 归忆 §5>§r', type.RUNE_ENUM.orange); break;
						//元素附魔 - 启程
						case 5: enchanting('§l<§n§o 元素附魔 §u-§i 启程 §5>§r', type.RUNE_ENUM.white); break;
						//元素附魔 - 焚绝
						case 6: enchanting('§l<§n§o 元素附魔 §u-§j 焚绝 §5>§r', type.RUNE_ENUM.black); break;
					}
				}
			);
			// 更新 物品冷却
			item.getComponent('minecraft:cooldown')?.startCooldown(player);
		},
		onHitEntity(source) {
			/**
			 * * 触发自定义组件的玩家
			 */
			const player = source.attackingEntity;
			/**
			 * * 玩家背包
			 */
			const container = player.getComponent('inventory')?.container;
			/**
			 * * 触发自定义组件的物品
			 */
			const item = source.itemStack;
			/**
			 * * 触发自定义组件的目标实体
			 */
			const target = source.hitEntity;
			// 判断条件是否满足
			if (!(player instanceof server.Player) || !item || !target || !container) return;
			// 判断是否冷却完成
			if (!opal.TriggerControl(item.typeId, player, 10)) return;
			/**
			 * * 获取 玩家属性面板
			 */
			const stages = opal.GetProperty(player);
			/**
			 * * 粒子名称
			 */
			const particle = stages.self_rune != 'rune_void' ? 'constant:impact_' + stages.self_rune : 'minecraft:sonic_explosion';
			/**
			 * * 设置 范围查询 的 过滤条条件
			 */
			const options: server.EntityQueryOptions = {
				excludeTypes: ["minecraft:item", "minecraft:xp_orb"],
				location: target?.location,
				maxDistance: 4,
				closest: 8
			};
			/**
			 * * 获取 目标周围的实体
			 */
			const getQueue = player.dimension.getEntities(options).filter(entity => entity.id !== player.id);
			/**
			 * * 是否暴击
			 */
			const erupt = opal.IsErupt(player);
			/**
			 * * 获取 元素附魔类型
			 */
			const self_rune = item.getDynamicProperty('rune_hurt:self_rune') as string ?? 'rune_purple';
			// 对 玩家属性 进行 修改
			opal.SetProperty(player, { self_rune: self_rune as type.RUNE_TYPE });
			// 获取属性提升值
			//IncreaseDamage(player, container);
			// 对选中的实体队列造成伤害
			getQueue.forEach(entity => opal.ElementalAttack(player, entity, erupt));
			// 生成 粒子特效
			opal.TrySpawnParticle(player.dimension, "minecraft:huge_explosion_emitter", target?.location ?? player.location);
			opal.TrySpawnParticle(player.dimension, particle, target?.location ?? player.location);
			// 更新 物品冷却
			item.getComponent('minecraft:cooldown')?.startCooldown(player);
			// 更新 物品耐久
			opal.SetDurability(player, item, container, player.selectedSlotIndex, 1);
		}
	}
);
/*
 * 魔晶弹珠
 */
components.set(componentPrefix + 'magic_crystal_marbles',
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
			// 播放 动画
			player.playAnimation('animation.item.common.resist', { blendOutTime: 0.5 });
			// 播放 音效
			player.playSound('item.trident.riptide_1');
			/**
			 * * 获取 玩家指向的实体
			 */
			const target = player.getEntitiesFromViewDirection({ maxDistance: 48 })[0]?.entity;
			// 确认 目标实体是否存在
			if (!target || !target.isValid) return;
			/**
			 * * 设置 范围查询 的 过滤条条件
			 */
			const options: server.EntityQueryOptions = {
				excludeTypes: ["minecraft:item", "minecraft:xp_orb"],
				location: target.location,
				maxDistance: 8,
				closest: 8
			};
			/**
			 * * 获取 目标周围的实体
			 */
			const queue = player.dimension.getEntities(options).filter(entity => entity.id !== player.id);
			// 确认 目标实体是否存在
			if (queue.length == 0 || !target) return;
			// 获取属性提升值
			increaseDamage(player, container, false);
			/**
			 * * 获取 玩家属性面板
			 */
			const data = opal.GetProperty(player);
			/**
			 * * 爆炸效果 粒子名称
			 */
			const blastParticle = 'constant:fireworks_fireball_' + data.self_rune;
			/**
			 * * 是否暴击
			 */
			const erupt = opal.IsErupt(player);
			/**
			 * * 定义 粒子参数
			 */
			const molang = new server.MolangVariableMap();
			/**
			 * * 玩家 与 目标 之间的距离
			 */
			const distance = opal.Vector.distance(player.location, target.location);
			/**
			 * * 进行消耗的样本物品
			 */
			const sample = new server.ItemStack(item.typeId);
			// 消耗 物品对象
			opal.DeleteItemStack(container, sample);
			// 设置 粒子参数
			molang.setColorRGB('variable.color', table.getRuneColor(data.self_rune));
			molang.setVector3('variable.direction', player.getViewDirection());
			molang.setFloat('variable.range', distance);
			molang.setFloat('variable.type', 0);
			// 播放 粒子效果
			opal.TrySpawnParticle(player.dimension, 'scripts:path_spurt', player.getHeadLocation(), molang);
			// 延迟 触发 元素伤害
			server.system.runTimeout(
				() => {
					if (!target || !target.isValid) return;
					// 对选中的实体队列造成伤害
					queue.forEach(entity => opal.ElementalAttack(player, entity, erupt, data));
					// 创建 爆炸粒子
					if (queue.length > 1) opal.TrySpawnParticle(player.dimension, blastParticle, target.location);
				},
				distance
			);
		}
	}
);
/*
 * 魔晶弹弓
 */
components.set(componentPrefix + 'magic_crystal_bow',
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
			if (!opal.TriggerControl(item.typeId, player, 10)) return;
			// 执行 弹弓照明 机制
			if (player.isSneaking) bowSneaking(player)
			// 如果 玩家 不在潜行模式
			else {
				/**
				 * * 获取 玩家属性面板
				 */
				const data = opal.GetProperty(player);
				// 对 属性 进行 初始化
				opal.SetProperty(player, { raise_basic_attack: 0 });
				// 获取属性提升值
				increaseDamage(player, container);
				// 生成 粒子特效
				opal.TrySpawnParticle(player.dimension, 'constant:excite_' + data.self_rune, player.getHeadLocation());
			}
			// 更新 物品冷却
			item.getComponent('minecraft:cooldown')?.startCooldown(player);
			// 更新 物品耐久
		}
	}
);
/**
 * * 魔晶弹弓 - 弹道运行
 */
function bowTick(args: type.ROUTE_ANNEX_ARGS): boolean {
	/**
	 * * 获取 方块对象
	 */
	const block = args.dimension.getBlock(args.location);
	if (!block || !block.isValid) return false;
	if (block && block.isAir) return true;
	return false;
};
/**
 * * 魔晶弹弓 - 弹道终止
 */
function bowStop(args: type.ROUTE_ANNEX_ARGS) {
	/**
	 * * 获取 方块对象
	 */
	const block = args.dimension.getBlock(args.location);
	// 确认 目标方块是否存在
	if (!block || !block.isValid) return;
	/**
	 * * 目标方块周围的方块队列
	 */
	const blocks: server.Block[] = [];
	//获取 目标附近 的 全部方块
	for (let axleX = -1; axleX < 2; axleX++) for (let axleY = -1; axleY < 2; axleY++) for (let axleZ = -1; axleZ < 2; axleZ++) {
		/**
		 * * 获取 方块对象
		 */
		const sample = block.offset({ x: axleX, y: axleY, z: axleZ });
		//写入方块信息
		if (sample) blocks.push(sample);
	};
	//遍历方块队列 并点亮方块
	for (let index = 0; index < blocks.length; index++) {
		if (!blocks[index].isAir || blocks[index].below()?.isAir || blocks[index].below()?.isLiquid) continue;
		blocks[index].setPermutation(server.BlockPermutation.resolve('minecraft:soul_torch'));
		break;
	};
};
/**
 * * 魔晶弹弓 - 潜行时
 */
function bowSneaking(object: server.Player) {
	// 创建 路径包
	opal.PathExecute.Create('魔晶弹弓-照明射线', 1,
		{
			particles: ['constant:track_color_yellow'],
			dimension: object.dimension,
			locations: [],
			on_move: bowTick,
			on_done: bowStop,
			cooldown: 1,
			speed: 1,
			shoot: {
				start_place: object.getHeadLocation(),
				toward: object.getViewDirection(),
				max_distance: 128
			}
		}
	)
};
/**
 * * 魔晶弹弓 - 命中后
 */
export function bowHitAfter(object: server.Player, target?: server.Entity) {
	/**
	 * * 获取 玩家的 状态属性
	 */
	const data = opal.GetProperty(object);
	/**
	 * * 定义 粒子参数
	 */
	const molang = new server.MolangVariableMap();
	if (!target) return;
	// 设置 粒子参数
	molang.setColorRGB('variable.color', table.getRuneColor(data.self_rune));
	molang.setVector3('variable.direction', opal.Vector.CONSTANT_DOWN);
	molang.setFloat('variable.range', 5);
	molang.setFloat('variable.type', 0);
	// 播放 粒子效果
	object.spawnParticle('scripts:path_spurt', opal.Vector.add(target.location, { x: 0, y: 5, z: 0 }), molang);
	/**
	 * * 是否暴击
	 */
	const erupt = opal.IsErupt(object);
	// 触发 魔晶弹弓 追击伤害
	opal.ElementalAttack(object, target, erupt);
};
/*
 * 魔晶起子
 */
components.set(componentPrefix + 'magic_crystal_screwdriver',
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
			/**
			 * * 设置界面标题
			 */
			const title: server.RawMessage = {
				text: "<§9§o§l 区块连锁 §r>§2操作界面"
			};
			/**
			 * * 设置界面内容
			 */
			const label: server.RawMessage = { text: '区块连锁 -> 用法' };
			/**
			 * * 设置界面滑动条
			 */
			const slider: server.RawMessage[] = [
				{ text: '<§9§o§l 区块连锁 §r>极限深度§r' },
				{ text: '<§9§o§l 区块连锁 §r>极限高度§r' },
				{ text: '<§9§o§l 区块连锁 §r>极限范围§r' }
			];
			/**
			 * * 设置界面下拉框
			 */
			const option: server.RawMessage[] = [
				{ text: '§l§1[§9 潜行触发 §1]§r' },
				{ text: '§l§c[§c 关闭功能 §c]§r' },
				{ text: '§l§1[§4 始终触发 §1]§r' }
			];
			// 设置界面
			new serverUI.ModalFormData()
				.title(title)
				.slider(slider[0], -16, -1, { 'valueStep': 1, 'defaultValue': -5 })
				.slider(slider[1], 1, 16, { 'valueStep': 1, 'defaultValue': 5 })
				.slider(slider[2], 4, 16, { 'valueStep': 1, 'defaultValue': 5 })
				.dropdown(label, option, { 'defaultValueIndex': 1 })
				.show(player).then(
					popup => {
						if (popup.canceled) return;
						/**
						 * * 功能类型
						 */
						const mode = ['潜行', undefined, '始终'];
						// 获取 窗口值
						const formValues: number[] = popup.formValues as number[];
						// 显示 功能类型
						player.sendMessage(option[formValues[3]]);
						// 设置 区块连锁 类型
						player.setDynamicProperty('block_chain:type', mode[formValues[3]]);
						// 设置 区块连锁 深度
						player.setDynamicProperty('block_chain:depth', formValues[0]);
						// 设置 区块连锁 高度
						player.setDynamicProperty('block_chain:height', formValues[1]);
						// 设置 区块连锁 范围
						player.setDynamicProperty('block_chain:range', formValues[2]);
					}
				);
			//播放音效
			player.playSound("break.amethyst_block");
			// 更新 物品冷却
			item.getComponent('minecraft:cooldown')?.startCooldown(player);
			// 更新 物品耐久
			opal.SetDurability(player, item, container, player.selectedSlotIndex, 1);
		}
	}
);
/*
 * 魔晶钩爪
 */
components.set(componentPrefix + 'magic_crystal_claw',
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
			/**
			 * * 获取 向量
			 */
			const Vector = player.getViewDirection();
			/**
			 * * 状态效果 参数
			 */
			const [options_0, options_1]: server.EntityEffectOptions[] = [
				{
					amplifier: 0,
					showParticles: false
				},
				{
					amplifier: 4,
					showParticles: false
				}
			];
			/**
			 * * 计算 水平 弹射 速度
			 */
			const horizontalPower = (Math.abs(Vector.x) + Math.abs(Vector.z)) * 8;
			// 判断条件是否满足
			if (!container || !player || !item) return;
			// 判断是否冷却完成
			if (!opal.TriggerControl(item.typeId, player, 20)) return;
			// 更新 物品冷却
			item.getComponent('minecraft:cooldown')?.startCooldown(player);
			//播放音效
			player.playSound("random.bow");
			// 向量弹射
			player.applyKnockback({ x: Vector.x * horizontalPower, z: Vector.z * horizontalPower }, Vector.y * 4);
			// 生成 粒子特效
			opal.TrySpawnParticle(player.dimension, 'constant:magic_crystal_claw.icon', player.location);
			// 添加 状态效果
			player.addEffect("minecraft:slow_falling", 40, options_0);
			player.addEffect("minecraft:resistance", 40, options_1);
			// 更新 物品耐久
			opal.SetDurability(player, item, container, player.selectedSlotIndex, 1);
		}
	}
);
/**
 * * 魔晶盾牌
 */
export function magicCrystalShield(player: server.Player, item: server.ItemStack) {
	// 播放 动画
	player.playAnimation('animation.item.shield.resist', { blendOutTime: 0.5 });
	// 播放 声音
	player.playSound('item.shield.block');
	// 检测 是否完成冷却
	if (!opal.TriggerControl('魔晶盾牌:伤害反射', player, 60)) return;
	if (!player.isSneaking) return;
	// 更新 物品冷却
	item.getComponent('minecraft:cooldown')?.startCooldown(player);
	// 弹反伤害
	shieldReflexDamage(player, item);
};
/**
 * * 魔晶盾牌 - 伤害弹反
 */
function shieldReflexDamage(player: server.Player, item: server.ItemStack) {
	/**
	 * * 过滤条条件
	 */
	const options: server.EntityQueryOptions = {
		excludeTypes: ["minecraft:item", "minecraft:xp_orb"],
		location: player.location,
		maxDistance: 4
	};
	/**
	 * * 获取 玩家的属性面板
	 */
	const getData = opal.GetProperty(player);
	// 造成 弹反伤害
	player.dimension.getEntities(options).filter(entity => entity.id !== player.id).forEach(entity => opal.ElementalAttack(player, entity, true, getData));
	// 生成 粒子效果
	if (getData.self_rune !== type.RUNE_ENUM.void) opal.TrySpawnParticle(player.dimension, `constant:impact_${getData.self_rune}`, player.location);
	if (getData.self_rune === type.RUNE_ENUM.void) opal.TrySpawnParticle(player.dimension, 'minecraft:sonic_explosion', player.location);
	// 更新 物品冷却
	item.getComponent('minecraft:cooldown')?.startCooldown(player);
};
/**
 * * 魔晶锤子
 */
export function magicCrystalHammer(player: server.Player, item: server.ItemStack, container: server.Container, block?: server.Block) {
	/**
	 * * 获取 金属锭 所处的 方块对象
	 */
	const pointer = block?.above();
	// 确认 目标方块是否存在
	if (!pointer) return;
	/**
	 * * 获取 金属锭 物品对象
	 */
	const material = pointer.dimension.getEntitiesAtBlockLocation(pointer.location);
	// 遍历 金属锭 物品对象
	for (let index = 0; index < material.length; index++) {
		/**
		 * * 获取 金属锭 物品对象
		 */
		const item = material[index].getComponent('item')?.itemStack;
		// 如果物品不存在 或 数量不足
		if (!item || item?.amount < 2) continue;
		/**
		 * * 获取 锻压类型 标签
		 */
		const tags = item?.getTags().filter(tag => tag.startsWith('tags:mineral_resources.make'));
		// 如果 锻压类型 标签不存在
		if (tags.length == 0) continue;
		/**
		 * * 获取 锻压类型
		 */
		const type = tags[0].split('.')[2];
		/**
		 * * 获取 物品锻压阶段
		 */
		const stage = item.typeId.split(':')[1].split('.').length;
		/**
		 * * 获取 物品名称
		 */
		const name = stage == 1 ? item.typeId.split(':')[1] : item.typeId.split(':')[1].split('.')[1];
		// 删除 金属锭 物品对象
		material[index].remove();
		// 消耗 物品数量
		if (item.amount > 2) {
			item.amount -= 2;
			const newMaterial = opal.TrySpawnItem(pointer.dimension, item, pointer.center());
			if (newMaterial instanceof server.Entity) server.system.run(() => newMaterial.teleport(pointer.center()));
		};
		// 生成 金属板 物品对象
		const mineral = opal.TrySpawnItem(pointer.dimension, new server.ItemStack('starry_map:' + type + '.' + name), pointer.center());
		// 移动 金属板 物品对象
		if (mineral instanceof server.Entity) server.system.run(() => mineral.teleport(pointer.center()));
		// 播放 声音
		player.playSound('random.anvil_use');
		// 结束循环
		break;
	};
	// 更新 物品冷却
	item.getComponent('minecraft:cooldown')?.startCooldown(player);
	// 更新 物品耐久
	opal.SetDurability(player, item, container, player.selectedSlotIndex, 1);
};
/**
 * * 魔晶钥匙
 */
export async function magicCrystalKey(player: server.Player, item: server.ItemStack, container: server.Container, block?: server.Block) {
	/**
	 * * 方块白名单
	 */
	const whiteList = new Set<string>(['minecraft:trial_spawner', 'minecraft:mob_spawner', 'minecraft:vault']);
	/**
	 * * 获取 容器对象
	 */
	const inventory = block?.getComponent('inventory')?.container;
	/**
	 * 容器中的物品名称
	 */
	const itemName: string[] = [];
	// 确认 目标方块是否存在 且 是否为容器或白名单
	if (!block || !inventory && !whiteList.has(block?.typeId)) return;
	/**
	 * * 获取 容器的物品对象
	 */
	const chest = block.getItemStack(1, true);
	/**
	 * * 拷贝方块中心坐标
	 */
	const blockLocation = opal.Vector.copy(block.center());
	// 清空容器内容
	if (inventory) for (let index = 0; index < inventory.size; index++) {
		/**
		 * * 获取 容器物品对象
		 */
		const item = inventory.getItem(index);
		// 添加 物品名称
		if (itemName.length <= 10 && item) itemName.push(`${item.typeId} -> ${item.amount}`);
		// 清空容器物品对象
		inventory.setItem(index)
	};
	// 移除容器方块
	block.setPermutation(server.BlockPermutation.resolve('minecraft:air'));
	// 等待 1 tick
	await server.system.waitTicks(1);
	// 移除方块销毁后散落的物品掉落物实体
	block.dimension.getEntities({ location: blockLocation, maxDistance: 1, type: 'minecraft:item' }).forEach(entity => entity.remove());
	// 等待 1 tick
	await server.system.waitTicks(1);
	// 生成 容器的物品对象
	if (chest) {
		// 为 容器的物品对象 附加词缀
		chest.setLore([`搬运者: ${player.nameTag}`, ...itemName]);
		// 生成 容器的物品对象
		opal.TrySpawnItem(block.dimension, chest, block.center())
	};
	// 播放音效
	player.playSound('block.barrel.open');
	// 更新 物品冷却
	item.getComponent('minecraft:cooldown')?.startCooldown(player);
	// 更新 物品耐久
	opal.SetDurability(player, item, container, player.selectedSlotIndex, 1);
};
export default components;