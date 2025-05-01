/*
 * 原版接口
 */
import * as serverUI from "@minecraft/server-ui";
import * as server from "@minecraft/server";
/*
 * 系统数据
 */
import * as dataSpeak from "../data/speak";
/*
 * 系统组件
 */
import * as opal from "../system/opal";
import * as table from "../data/table";
import * as type from "../data/type";
/*
 * 物品组件
 */
import { magicCrystalShield, bowHitAfter } from "../item/tool_component";
/*
 * 实体组件
 */
import * as passive_component from "./passive_component";
/**
 * 显示实体生命值变动效果, 通过在实体上方显示粒子效果来表示生命值的增减
 *
 * @param {server.Entity} [entity] - 需要显示生命值变动的实体
 *
 * @param {number} [variation] - 生命值变动的数值, 正数表示生命值增加, 负数表示生命值减少
 */
export function HealthAlterDisplay(entity: server.Entity, variation: number) {
	// 检查实体是否有效, 如果实体为空或无效, 则不执行任何操作
	if (!entity || !entity.isValid || !opal.TriggerControl('生命值变动 -> ' + variation, entity)) return;
	/**
	 * 获取实体类型的基础显示偏移量, 用于确定粒子效果的显示位置
	 *
	 * 如果没有指定偏移量, 则使用默认值1.5
	 *
	 * @type {number}
	 */
	const baseOffset: number = table.offset_show.get(entity.typeId) ?? 1.5;
	/**
	 * 生成随机的显示位置偏移量, 用于在实体上方显示粒子效果时增加随机性
	 *
	 * @type {server.Vector3}
	 */
	const randomOffset: server.Vector3 = opal.Vector.random(opal.Vector.CONSTANT_ZERO, baseOffset, opal.Vector.CONSTANT_UP);
	// 如果生命值变动的数值大于99999, 则将数值设置为99999
	if (Math.abs(variation) >= 99999) variation = 99999;
	/**
	 * 确定生命值变动的方向, 0表示生命值增加, 1表示生命值减少
	 * @type {number}
	 */
	const direction: number = variation >= 0 ? 0 : 1;
	// 确保显示的数值为正数
	variation = Math.abs(variation);
	/**
	 * 获取实体的属性面板数据, 用于获取实体相关的属性信息
	 *
	 * @type {type.GET_PROPERTY_PANEL}
	 */
	const entityData: type.GET_PROPERTY_PANEL = opal.GetProperty(entity);
	/**
	 * 创建粒子参数映射, 用于设置粒子效果的参数
	 *
	 * @type {server.MolangVariableMap}
	 */
	const molang: server.MolangVariableMap = new server.MolangVariableMap();
	/**
	 * 将生命值变动数值拆分为单个数字数组, 并反转顺序, 以便从高位到低位显示
	 *
	 * @type {number[]}
	 */
	const digits: number[] = variation.toString().split('').reverse().map(Number);
	/**
	 * 获取实体属性面板中的符文颜色, 用于设置粒子效果的颜色
	 *
	 * @type {server.RGB}
	 */
	const color: server.RGB = table.getRuneColor(entityData.add_rune);
	/**
	 * 获取实体所在维度的对象, 用于在正确的维度中生成粒子效果
	 *
	 * @type {server.Dimension}
	 */
	const dimension: server.Dimension = server.world.getDimension(entity.dimension.id);
	// 设置粒子显示的偏移量
	molang.setVector3('variable.offset', randomOffset);
	// 设置粒子颜色
	molang.setColorRGB('variable.color', color);
	// 遍历数字数组, 显示每个数字的粒子效果
	digits.forEach(
		(digit, index) => {
			// 设置粒子显示的数字属性
			molang.setVector3('variable.property', { x: digit, y: index, z: digits.length });
			// 尝试在实体位置生成数字显示粒子
			opal.TrySpawnParticle(dimension, 'scripts:number_display', entity.location, molang);
		}
	);
	// 设置符号显示的粒子属性
	molang.setVector3('variable.property', { x: direction, y: digits.length - 1, z: digits.length });
	// 尝试在实体位置生成符号显示粒子
	opal.TrySpawnParticle(dimension, 'scripts:symbol_display', entity.location, molang);
};
/**
 * * 玩家进入 虚空野蜂塔
 *
 * @param {server.Player} player - 执行事件的玩家对象
 */
export function EnterVacantSpaceWaspTower(player: server.Player) {
	/**
	 * * 获取 游戏规则
	 */
	const rule = server.world.getDynamicProperty('game_rules:regenerate.vacant_space_wasp_tower') ?? true;
	/**
	 * * 坐标映射值
	 */
	const mapping = new opal.Vector(500, 150, 500);
	/**
	 * * 进行结构生成的维度
	 */
	const dimension = server.world.getDimension('minecraft:the_end');
	/**
	 * * 定义 坐标锚点
	 */
	const anchor = JSON.stringify({ location: mapping, dimension: dimension.id });
	/**
	 * * 定义 相机参数
	 */
	const camera = player.camera;
	/**
	 * * 定义 摄像机终点坐标
	 */
	const endPoint = mapping.add({ x: 48, y: 64, z: 48 });
	/**
	 * * 获取 玩家背包
	 */
	const container = player.getComponent('inventory')?.container;
	/**
	 * * 定义 粒子参数
	 */
	const molang = new server.MolangVariableMap();
	// 触发新手礼包
	if (container) DonationInitialGift(player, container);
	// 给与 玩家 新手保护
	player.addEffect("minecraft:invisibility", 1800, { amplifier: 1, showParticles: false });
	player.addEffect("minecraft:resistance", 1800, { amplifier: 4, showParticles: false });
	// 播放引导文本
	opal.PlayPrompt(player, "生成虚空野蜂塔");
	// 传送玩家到野蜂塔
	player.teleport(mapping, { dimension });
	// 清除 摄像机动画
	server.system.runTimeout(() => camera.clear(), 95);
	// 设置 摄像机位移
	server.system.runTimeout(() => camera.setCamera('minecraft:free', { location: endPoint, facingLocation: player.location, easeOptions: { easeTime: 3 } }), 20);
	// 设置 动态属性-野蜂塔坐标
	server.system.runTimeout(() => player.setDynamicProperty('road_sign:虚空野蜂塔', anchor), 20);
	// 播放剧情文本
	server.system.runTimeout(() => player.sendMessage({ translate: '音效.琉璃.蜂塔引导_0' }), 100);
	server.system.runTimeout(() => player.sendMessage({ translate: '音效.琉璃.蜂塔引导_1' }), 200);
	server.system.runTimeout(() => player.sendMessage({ translate: '音效.琉璃.蜂塔引导_2' }), 300);
	server.system.runTimeout(() => player.sendMessage({ translate: '音效.琉璃.蜂塔引导_3' }), 400);
	server.system.runTimeout(() => player.sendMessage({ translate: '音效.琉璃.蜂塔引导_4' }), 500);
	server.system.runTimeout(() => player.sendMessage({ translate: '音效.琉璃.蜂塔引导_5' }), 600);
	server.system.runTimeout(() => player.sendMessage({ translate: '音效.琉璃.蜂塔引导_6' }), 800);
	server.system.runTimeout(() => player.sendMessage({ translate: '音效.琉璃.蜂塔引导_7' }), 1000);
	server.system.runTimeout(() => player.sendMessage({ translate: '音效.琉璃.蜂塔引导_8' }), 1150);
	// 播放音效
	server.system.runTimeout(() => player.playSound('音效.琉璃.蜂塔引导_0'), 100);
	server.system.runTimeout(() => player.playSound('音效.琉璃.蜂塔引导_1'), 200);
	server.system.runTimeout(() => player.playSound('音效.琉璃.蜂塔引导_2'), 300);
	server.system.runTimeout(() => player.playSound('音效.琉璃.蜂塔引导_3'), 400);
	server.system.runTimeout(() => player.playSound('音效.琉璃.蜂塔引导_4'), 500);
	server.system.runTimeout(() => player.playSound('音效.琉璃.蜂塔引导_5'), 600);
	server.system.runTimeout(() => player.playSound('音效.琉璃.蜂塔引导_6'), 800);
	server.system.runTimeout(() => player.playSound('音效.琉璃.蜂塔引导_7'), 1000);
	server.system.runTimeout(() => player.playSound('音效.琉璃.蜂塔引导_8'), 1150);
	// 设定射线类型
	molang.setFloat('variable.type', 0);
	// 设定射线方向
	molang.setVector3('variable.direction', opal.Vector.CONSTANT_UP);
	// 播放粒子特效
	server.system.runTimeout(() => GuideLightBeam(player, molang), 200);
	server.system.runTimeout(() => GuideLightBeam(player, molang), 400);
	server.system.runTimeout(() => GuideLightBeam(player, molang), 600);
	server.system.runTimeout(() => GuideLightBeam(player, molang), 800);
	// 判断是否生成结构
	if (rule === false) return;
	/**
	 * * 获取 建筑结构
	 */
	const template = server.world.structureManager.get('mystructure:vacant_space_wasp_tower');
	/**
	 * * 定义 坐标基准点
	 */
	const reference = mapping.add({ x: -40, y: -9, z: -25 });
	// 检测 建筑结构
	if (!template) return player.sendMessage([opal.translate(player), { text: '-> 未能获取到<§l§9 末地蜂塔 §r>的结构数据文件' }]);
	// 放置 建筑结构
	server.world.structureManager.place(template, dimension, reference);
	// 设置 游戏规则
	if (rule == true) server.world.setDynamicProperty('game_rules:regenerate.vacant_space_wasp_tower', false);
};
/**
 * * 诸界道标 指引光束 粒子特效
 */
function GuideLightBeam(player: server.Player, molang: server.MolangVariableMap) {
	// 检测 玩家是否在末地
	if (player.dimension.id !== 'minecraft:the_end') return;
	// 构建 动画效果
	opal.TrySpawnParticle(player.dimension, 'scripts:path_ray', { x: 504.5, y: 7, z: 491.5 }, molang);
	opal.TrySpawnParticle(player.dimension, 'scripts:path_ray', { x: 504.5, y: 7, z: 508.5 }, molang);
};
/**
 * * 领取 新手礼包
 *
 * @param player - 领取新手礼包的玩家对象
 *
 * @param container - 玩家背包
 */
function DonationInitialGift(player: server.Player, container: server.Container) {
	/**
	 * * 涤尽铅华 物品对象
	 */
	const pureness = new server.ItemStack("starry_map:reduction_pureness");
	/**
	 * * 精灵结契 物品对象
	 */
	const contract = new server.ItemStack("starry_map:faerie_contract");
	/**
	 * * 源能秘典 物品对象
	 */
	const energy = new server.ItemStack("starry_map:source_energy");
	/**
	 * * 百灵绘卷 物品对象
	 */
	const paper = new server.ItemStack("starry_map:chorus_picture");
	/**
	 * * 获取 空闲格子数量
	 */
	const emptySlots = container?.emptySlotsCount ?? 0;
	/**
	 * * 坐标映射值
	 */
	const mapping: server.Vector3 = { x: 500, y: 16, z: 500 };
	// 设置 物品描述
	pureness.setLore(
		[
			"§u___________________",
			"跨维度旅行总是充满了各种难以预料的危险",
			"有的时候, 将风险交由一人承担",
			"并非推卸责任, 而是一种明智的选择 !"
		]
	);
	paper.setLore(
		[
			"§u___________________",
			"源自[ 最终档案 ]的未知之物",
			"似乎记载了< 重燃 >的法则与< 起航 >的秩序",
			"到< 主世界 >使用看看吧 ?"
		]
	);
	contract.setLore(
		[
			"§u___________________",
			"这是< 琉璃 >赠与你的礼物",
			"或许是希望你优先选择她 ?"
		]
	);
	energy.setLore(
		[
			"§u___________________",
			"初始的 指引 与 向导",
			"一本或许 有用 又或许 没用 的书籍",
			"除了最本质的资料外, 似乎又记载了一些别的信息?"
		]
	);
	// 判断玩家背包是否具有足够的空间
	if (emptySlots < 3) {
		server.system.runTimeout(() => opal.TrySpawnItem(player.dimension, paper, mapping), 50);
		server.system.runTimeout(() => opal.TrySpawnItem(player.dimension, energy, mapping), 70);
		server.system.runTimeout(() => opal.TrySpawnItem(player.dimension, contract, mapping), 90);
		server.system.runTimeout(() => opal.TrySpawnItem(player.dimension, pureness, mapping), 110);
	}
	else {
		server.system.runTimeout(() => container?.addItem(paper), 50);
		server.system.runTimeout(() => container?.addItem(energy), 70);
		server.system.runTimeout(() => container?.addItem(pureness), 90);
		server.system.runTimeout(() => container?.addItem(contract), 110);
	};
};
/**
 * * 实体生成日期表
 *
 * @param {string} type - 等待生成的实体类型
 *
 * @param {number} time - 生成间隔时间(游戏日)
 *
 * @param {server.RawMessage} title - 显示的标题
 *
 * @param {string} sound - 播放的音效
 */
export function GenerateOnSchedule(type: string, time: number, title: server.RawMessage, sound: string) {
	/**
	 * * 日历计时值
	 */
	const calendar = server.world.getDynamicProperty('generate_on_schedule:' + type) as number ?? 1;
	/**
	 * * 获取 实体刷新日历
	 */
	const convert = Math.floor(server.world.getDay() / time);
	// 检测是否满足刷新条件
	if (convert <= calendar) return;
	/**
	 * * 获取 全部玩家
	 */
	const players = server.world.getPlayers();
	/**
	 * * 获取 随机玩家
	 */
	const player = players[opal.RandomFloor(0, players.length - 1)];
	// 判断玩家是否存在
	if (player === undefined) return;
	/**
	 * * +-32 随机值
	 */
	const random = () => opal.Random({ max: 32, min: -32 });
	/**
	 * * 随机偏移坐标
	 */
	const offset = new opal.Vector(random(), 0, random()).add(player.location);
	/**
	 * * 获取 随机有效坐标
	 */
	const anchor = player.dimension.getTopmostBlock(offset)?.above(2) ?? player.location;
	/**
	 * * 获取 玩家头部坐标
	 */
	const location = player.getHeadLocation();
	/**
	 * * 获取 玩家所在维度
	 */
	const dimension = player.dimension;
	// 刷新实体生成日历
	server.world.setDynamicProperty('generate_on_schedule:' + type, convert + 1);
	// 播放音效
	server.system.runTimeout(() => player.playSound(sound), 20);
	// 显示标题
	server.system.runTimeout(() => player.onScreenDisplay.setTitle(title), 40);
	// 生成实体
	server.system.runTimeout(() => opal.TrySpawnEntity(player.dimension, type, anchor), 60);
	// 设置 自由指针
	opal.SetFreePointer({ location, dimension }, anchor, 10);
};
/**
 * * 区块连锁
 *
 * @param {server.PlayerBreakBlockAfterEvent} eventData 区块连锁 所需的 事件参数
 *
 * @param {string} type 区块连锁 类型
 */
export function BlockChainEvent(eventData: server.PlayerBreakBlockAfterEvent, type: string) {
	/**
	 * * 被挖掘的方块的标识符
	 */
	const blockID = eventData.brokenBlockPermutation.type.id;
	/**
	 * * 进行挖掘的位置
	 */
	const location = eventData.block.location;
	/**
	 * * 进行挖掘的维度
	 */
	const dimension = eventData.dimension;
	/**
	 * * 玩家对象
	 */
	const player = eventData.player;
	/**
	 * * 获取 玩家背包
	 */
	const container = player.getComponent('minecraft:inventory')?.container;
	/**
	 * * 进行挖掘的物品
	 */
	const item = eventData.itemStackAfterBreak;
	/**
	 * * 高度
	 */
	const height = player.getDynamicProperty('block_chain:height') as number;
	/**
	 * * 深度
	 */
	const depth = player.getDynamicProperty('block_chain:depth') as number;
	/**
	 * * 范围
	 */
	const range = player.getDynamicProperty('block_chain:range') as number;
	/**
	 ** 挖掘方块理应消耗的耐久度
	 */
	const waste = (Math.abs(depth) + height) * (range * 2);
	/**
	 * * 耐久度组件
	 */
	const durability = item?.getComponent('minecraft:durability'); if (!durability) return;
	/**
	 ** 耐久度剩余耐久度
	 */
	const surplus = durability.maxDurability - durability.damage;
	// 判断 是否满足条件
	if (!item || !item.hasTag('minecraft:digger')) return;
	// 判断 连锁触发条件
	switch (type) {
		case '潜行': if (!player.isSneaking) return; break;

		case '始终': break;

		default: return;
	};
	// 判断 耐久度是否足够
	if (waste >= surplus) return player.sendMessage([opal.translate(item), { text: ' -> 耐久度不足, 无法连锁' }]);
	// 为 玩家 添加状态效果
	player.addEffect('minecraft:mining_fatigue', 200, { amplifier: 29, showParticles: false });
	player.addEffect('minecraft:hunger', 200, { amplifier: 29, showParticles: false });
	/**
	 * * 定义 路径事件
	 */
	const moveEvent = (args: type.ROUTE_ANNEX_ARGS) => {
		/**
		 * * 获取 方块
		 */
		const getBlock = args.dimension.getBlock(args.location);
		//执行路径事件的功能
		if (getBlock?.typeId === blockID) {
			// 执行填充方块命令
			args.dimension.runCommand(`fill ${args.location.x} ${args.location.y} ${args.location.z} ${args.location.x} ${args.location.y} ${args.location.z} air [] destroy`)
			/**
			 * * 定义 掉落物 的 参数
			 */
			const itemOptions: server.EntityQueryOptions = {
				location: args.location,
				type: "minecraft:item",
				maxDistance: 4
			};
			/**
			 * * 定义 经验球 的 参数
			 */
			const expOptions: server.EntityQueryOptions = {
				location: args.location,
				type: "minecraft:xp_orb",
				maxDistance: 4
			};
			/**
			 * * 获取 掉落物 与 经验球 的 实体
			 */
			const select = [
				...args.dimension.getEntities(itemOptions),
				...args.dimension.getEntities(expOptions)
			];
			// 获取附近的掉落物
			select.forEach(entity => entity.teleport(player.getHeadLocation(), { dimension: player.dimension }));
		}
		// 继续循环
		return true
	};
	/**
	 * * 立方体绘制 的 起始顶点
	 */
	const start = opal.Vector.add(location, { x: range, y: depth, z: range });
	/**
	 * * 立方体绘制 的 结束顶点
	 */
	const done = opal.Vector.add(location, { x: -range, y: height, z: -range });
	// 创建 路径执行计划
	opal.PathExecute.CreateForCube(
		'区块连锁-路径执行',
		{
			particles: ['constant:track_color_yellow'],
			locations: [],
			dimension,
			cooldown: 1,
			speed: 1,
			offset: opal.Vector.CONSTANT_HALF,
			on_move: moveEvent,
		},
		start, done, 0.25
	);
	// 消耗耐久值
	durability.damage += waste;
	// 置换物品
	if (container) container.setItem(player.selectedSlotIndex, item);
};
/**
 * * 重新设置世界规则
 *
 * @param {server.Dimension} dimension - 维度对象
 */
export function ReviseWorldRules(dimension: server.Dimension) {
	// 禁止发送命令反馈
	dimension.runCommand('gamerule sendcommandfeedback false');
	// 关闭命令方块输出
	dimension.runCommand('gamerule commandblockoutput false');
	// 开启立即重生
	dimension.runCommand('gamerule doimmediaterespawn true');
	// 关闭边境效果显示
	dimension.runCommand('gamerule showBorderEffect false');
	// 开启坐标显示
	dimension.runCommand('gamerule showcoordinates true');
	// 开启游戏天数显示
	dimension.runCommand('gamerule showDaysPlayed true');
	// 开启死亡后保留物品栏
	dimension.runCommand('gamerule keepinventory true');
	// 开启生物破坏环境
	dimension.runCommand('gamerule mobgriefing true');
	// 设置游戏难度为困难
	dimension.runCommand('difficulty hard');
};
/**
 * * 实体遭受攻击后 事件
 *
 * @param {server.Entity} target - 被命中的实体
 *
 * @param {server.EntityDamageSource} source - 伤害来源
 *
 * @param {server.Entity} entity - 发起攻击的实体
 *
 * @param {number} damage - 伤害数值
 */
export function EntityUnderAttack(target: server.Entity, source: server.EntityDamageSource, entity: server.Entity, damage: number) {
	// 检测是否为 玩家类型
	if (target instanceof server.Player) return;
	// 基于实体类型进行分支
	switch (target.typeId) {
		case 'minecraft:ender_dragon': passive_component.EnhanceEnderDragon(target, entity, damage, source.cause); break;

		case 'starry_map:wild_bee.emperor': passive_component.WaspReinforce(target); break;

		case 'starry_map:guide.jasmine': passive_component.PrayerOfHundredFlowers(target); break;

		case 'starry_map:abyss_whale.emperor': passive_component.AbysssWhaleEmperorDamageCorrection(target, entity); break;

		case 'starry_map:abyss_whale.detection': passive_component.AbysssWhaleDetectionWasHit(entity); break;

		case 'starry_map:dragon.tyrannosaurus_rex': passive_component.tyrannosaurusRexAttack(target); break;

		default: break;
	}
}
/**
 * * 玩家遭受攻击后 事件
 *
 * @param {server.Entity} target - 被命中的实体
 *
 * @param {server.Entity} entity - 发起攻击的实体
 */
export function PlayersUnderAttack(target: server.Entity, entity: server.Entity) {
	// 检测是否为 玩家类型
	if (!(target instanceof server.Player)) return;
	/**
	 * * 装备容器
	 */
	const equippable = target.getComponent('minecraft:equippable');
	// 检测装备容器
	if (!equippable) return;
	/**
	 * * 物品槽位
	 */
	const equippableSlot: server.EquipmentSlot[] = Object.values(server.EquipmentSlot);
	/**
	 * * 物品数组
	 */
	const equippables = equippableSlot.map(slot => equippable.getEquipment(slot));
	// 玩家遭受攻击后 触发 实体被动事件
	passive_component.EntityHurtPlayerAfterOddsTrigger(target, entity, equippable, equippables, equippableSlot);
	// 玩家遭受攻击后 触发 物品被动事件
	equippables.forEach(
		(item, index) => {
			// 检测 是否存在 物品对象
			if (!item) return;
			// 检测 物品类型
			switch (item.typeId) {
				case 'starry_map:magic_crystal_shield':
					magicCrystalShield(target, item);
					equippable?.setEquipment(equippableSlot[index], opal.AlterDurability(item, 1));
					break;

				default: break;
			}
		}
	)
};
/**
 * * 玩家发动攻击后 事件
 *
 * @param {server.Entity} target - 被命中的实体
 *
 * @param {server.EntityDamageSource} source - 伤害来源
 *
 * @param {server.Entity} entity - 发起攻击的实体
 */
export function PlayersLaunchAttacks(target: server.Entity, source: server.EntityDamageSource, entity: server.Entity) {
	// 检测是否为 玩家类型
	if (!(entity instanceof server.Player)) return;
	/**
	 * * 装备容器
	 */
	const equippable = entity.getComponent('minecraft:equippable');
	/**
	 * * 物品槽位
	 */
	const itemSlot: server.EquipmentSlot[] = Object.values(server.EquipmentSlot);
	/**
	 * * 物品数组
	 */
	const itemSelect = itemSlot.map(slot => equippable?.getEquipment(slot));
	// 遍历 物品对象数组
	itemSelect.forEach(
		(item, index) => {
			// 检测 是否存在 物品对象
			if (!item) return;
			// 检测 物品类型
			if (source.cause == 'projectile') {
				switch (item.typeId) {
					case 'starry_map:magic_crystal_bow':
						bowHitAfter(entity, target);
						equippable?.setEquipment(itemSlot[index], opal.AlterDurability(item, 1));
						break;

					default: break;
				}
			}
		}
	)
};
/**
 * * 死亡后触发奖励
 *
 * @param {server.Entity} target - 被击杀的实体
 *
 * @param {server.Entity} self - 击杀者
 */
export function createRewardsAfterDeath(target: server.Entity, self: server.Entity) {
	/**
	 * * 死亡的实体是否为< 地方传奇 >
	 */
	const intel = table.area_legend.get(target.typeId);
	/**
	 * * 击杀者 的 战斗经验
	 */
	const experience = self.getDynamicProperty('entity:experience') as number ?? 0;
	/**
	 * * 元素黑名单
	 */
	const blacklist = new Set<type.RUNE_TYPE>(["rune_black", "rune_white", "rune_void"]);
	/**
	 * * 击杀者 的 维度
	 */
	const dimension = target.dimension;
	/**
	 * * 击杀者 的 属性面板
	 */
	const state = opal.GetProperty(self);
	/**
	 * * 验证 是否 满足 发放条件
	 */
	const enable = opal.IsEnable((experience / table.experience_improve) + 15);
	// 生成 对应的魔晶石
	if (enable && !blacklist.has(state.self_rune)) opal.TrySpawnItem(dimension, new server.ItemStack('starry_map:' + state.self_rune.split('_')[1] + '_energy'), target.location);
	// 给与击杀者经验
	if (experience <= table.max_experience * table.experience_improve) self.setDynamicProperty('entity:experience', experience + Math.floor((intel ?? 1) / 10) + 1);
	// 验证 是否满足发放条件
	if (!intel || !opal.IsEnable(intel)) return;
	opal.TrySpawnItem(dimension, new server.ItemStack('starry_map:chorus_picture'), target.location);
};
/**
 * * 死亡后执行的功能
 *
 * 根据不同实体类型, 在实体死亡后执行相应的被动组件功能
 *
 * @param {server.Entity} entity - 死亡的实体对象
 *
 * @param {server.Entity} source - 造成实体死亡的来源对象
 */
export async function FunctionsPerformedAfterDeath(entity: server.Entity, source: server.Entity) {
	// 根据实体类型进行判断并执行相应的函数
	switch (entity.typeId) {
		//* 渊鲸侦测者
		case 'starry_map:abyss_whale.detection': passive_component.AbyssWhaleDetectionDie(entity, source); break;
		//* 渊鲸执行者
		case 'starry_map:abyss_whale.execute': passive_component.AbyssWhaleExecuteDie(entity, source); break;
		//* 野蜂维系者
		case 'starry_map:wild_bee.support': passive_component.WaspClusterCrash(entity); break;
		//* 玩家
		case 'minecraft:player': passive_component.PlayerDie(entity as server.Player); break;
		//! 如果实体类型不匹配上述任何一种, 则不执行任何操作
		default: break;
	};
	// 如果实体类型为< 神恩领航者 >, 并且实体的< contract_user >属性为< undefined >, 则创建一个< 龙 >实体
	if (entity.typeId.split(':')[1].split('.')[0] == 'guide' && !entity.getDynamicProperty('entity:contract_user')) {
		// 验证 控制器冷却是否完成
		if (!opal.TriggerControl('君王暴龙-召唤限速', new opal.Vector(0, 0, 0), 200)) return;
		// 验证 实体类型
		if (entity.typeId == 'starry_map:guide.windnews') return;
		if (entity.typeId == 'starry_map:guide.jasmine') return;
		if (entity.typeId == 'starry_map:guide.amber') return;
		/**
		 * * 拷贝实体位置信息
		 */
		const copyLocation = opal.Vector.copy(entity.location);
		/**
		 * * 拷贝实体维度信息
		 */
		const copyDimension = server.world.getDimension(entity.dimension.id);
		/**
		 * * 查询范围
		 */
		const queryScope = 6;
		/**
		 * * 雷电数量计数
		 */
		let thunderIndex = 0;
		// 循环遍历查询范围
		for (let axleX = -queryScope; axleX <= queryScope; axleX += 2) for (let axleZ = -queryScope; axleZ <= queryScope; axleZ += 2) {
			/**
			 * * 计算闪电坐标
			 */
			const location = copyLocation.add({ x: axleX, y: 0, z: axleZ });
			// 尝试创建闪电实体
			server.system.runTimeout(() => opal.TrySpawnEntity(copyDimension, 'minecraft:lightning_bolt', location), thunderIndex * 5);
			// 记录已经生成的雷电数量
			thunderIndex += 1;
		};
		// 尝试获取玩家列表
		copyDimension.getPlayers({ location: copyLocation, maxDistance: 64 }).forEach(
			player => {
				// 显示标题和粒子效果
				player.onScreenDisplay.setTitle({ text: '§l§c君王震怒! §d君临者§c正在降临!' });
				// 给予玩家 失明效果
				player.addEffect('minecraft:blindness', 100, { showParticles: false });
				// 给予玩家 摄像头振动
				player.runCommand('camerashake add @s 0.5 10 positional');
			}
		);
		// 延迟 80 tick
		await server.system.waitTicks(80);
		// 创建龙实体
		opal.TrySpawnEntity(copyDimension, 'starry_map:dragon.tyrannosaurus_rex', copyLocation);
	};
};
/**
 * * 控制实体进行动力飞行
 *
 * * 此函数通过计算实体的视角方向和速度, 来模拟动力飞行的效果它首先尝试找到实体附近是否有玩家,
 *
 * * 如果有, 则根据实体的视角方向计算新的速度向量, 并根据玩家的俯仰角度决定是否向上飞行
 *
 * @param {server.Entity} [entity] 需要进行动力飞行的实体对象
 *
 * @param {number} [speed] 飞行的速度, 决定了实体飞行的快慢
 */
export function applyDynamicFlightToEntity(entity: server.Entity, speed: number) {
	/**
	 * 获取绑定的玩家 ID
	 *
	 * @type {boolean | number | string | server.Vector3 | undefined}
	 */
	const playerID: boolean | number | string | server.Vector3 | undefined = entity.getDynamicProperty('dynamic_flight_in_player');
	// 验证绑定的玩家 ID 是否为字符串类型
	if (typeof playerID !== 'string') return opal.ThrowErrorIfPermitted('动力飞行失败, 玩家不存在');
	/**
	 * 获取绑定的玩家对象
	 *
	 * @type {server.Player}
	 */
	const player: server.Player = server.world.getEntity(playerID) as server.Player;
	// 验证绑定的玩家对象是否存在
	if (!player) return opal.ThrowErrorIfPermitted('动力飞行失败, 玩家不存在');
	// 验证玩家是否正在跳跃, 如果是, 则清除实体的当前速度并返回
	if (player.isJumping) return entity.clearVelocity();
	/**
	 * 获取实体视角方向
	 *
	 * @type {server.Vector3}
	 */
	const direction: server.Vector3 = entity.getViewDirection();
	/**
	 * 根据实体视角方向和速度参数计算新的速度向量
	 *
	 * @type {server.Vector3}
	 */
	const newVelocity: server.Vector3 = opal.Vector.multiply(direction, speed);
	/**
	 * 在新的速度向量基础上增加一个向上的分量, 用于模拟实体在飞行时的爬升效果
	 *
	 * @type {server.Vector3}
	 */
	const climbVelocity: server.Vector3 = opal.Vector.add(newVelocity, opal.Vector.CONSTANT_UP);
	// 清除实体当前速度, 准备应用新速度
	entity.clearVelocity();
	// 根据玩家俯仰角度决定应用的速度向量
	entity.applyImpulse(player.getRotation().x >= -5 ? (player.getRotation().x > 55 ? direction : newVelocity) : climbVelocity);
};
/**
 * * 将实体与玩家绑定, 以便控制实体的动力飞行
 *
 * @param {server.Entity} [entity] 需要进行动力飞行的实体对象
 */
export function dynamicFlightToBinding(entity: server.Entity) {
	/**
	 * 获取玩家对象
	 */
	const player: server.Player = entity.dimension.getPlayers({ location: entity.location, maxDistance: 8, closest: 1 })[0];
	// 验证玩家对象是否存在
	if (!player) return opal.ThrowErrorIfPermitted(`绑定失败: 在实体周围 8 米范围内未找到任何玩家`);
	// 绑定玩家 ID
	entity.setDynamicProperty('dynamic_flight_in_player', player.id);
};
/**
 * * 解除实体与玩家的绑定, 停止控制实体的动力飞行
 *
 * @param {server.Entity} [entity] 需要停止动力飞行的实体对象
 */
export function dynamicFlightToSeparate(entity: server.Entity) {
	/**
	 * 获取绑定的玩家ID
	 *
	 * @type {boolean | number | string | server.Vector3 | undefined}
	 */
	const playerID: boolean | number | string | server.Vector3 | undefined = entity.getDynamicProperty('dynamic_flight_in_player');
	// 验证绑定的玩家ID是否为字符串类型
	if (typeof playerID !== 'string') return opal.ThrowErrorIfPermitted('解除动力飞行绑定失败: 实体未绑定到玩家');
	/**
	 * 获取绑定的玩家对象
	 *
	 * @type {server.Player}
	 */
	const player: server.Player = server.world.getEntity(playerID) as server.Player;
	// 验证绑定的玩家对象是否存在
	if (!player) return opal.ThrowErrorIfPermitted('解除动力飞行绑定失败: 绑定的玩家不存在');
	// 清除玩家的摄像机动画
	player.camera.clear();
	// 解除绑定
	entity.setDynamicProperty('dynamic_flight_in_player');
};