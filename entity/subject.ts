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
/*
 * 物品组件
 */
import { useMagicCrystalShield, bowHitAfter } from "../item/custom_function";
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
export function oldEnterVacantSpaceWaspTower(player: server.Player) {
	/**
	 * * 获取 游戏规则
	 */
	const rule = server.world.getDynamicProperty('game_rules:regenerate.vacant_space_wasp_tower') ?? true;
	/**
	 * * 坐标映射值
	 */
	const mapping = new opal.Vector(500, 155, 500);
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
export function EnterVacantSpaceWaspTower(player: server.Player) {
	/**
	 * * 获取 游戏规则
	 */
	const rule = server.world.getDynamicProperty('game_rules:regenerate.vacant_space_wasp_tower') ?? true;
	/**
	 * * 进行结构生成的维度
	 */
	const dimension = player.dimension;
	/**
	 * * 坐标映射值
	 */
	const mapping = new opal.Vector(player.location.x, 255, player.location.z);
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
	// 设置 动态属性-野蜂塔坐标
	server.system.runTimeout(() => player.setDynamicProperty('road_sign:虚空野蜂塔', anchor), 20);
	// 播放引导文本
	opal.PlayPrompt(player, "生成虚空野蜂塔");
	// 传送玩家到野蜂塔
	player.teleport(mapping, { dimension });
	// 清除 摄像机动画
	server.system.runTimeout(() => camera.clear(), 95);
	// 设置 摄像机位移
	server.system.runTimeout(() => camera.setCamera('minecraft:free', { location: endPoint, facingLocation: player.location, easeOptions: { easeTime: 3 } }), 20);
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
		server.system.runTimeout(() => opal.TrySpawnItem(player.dimension, paper, player.location), 50);
		server.system.runTimeout(() => opal.TrySpawnItem(player.dimension, energy, player.location), 70);
		server.system.runTimeout(() => opal.TrySpawnItem(player.dimension, contract, player.location), 90);
		server.system.runTimeout(() => opal.TrySpawnItem(player.dimension, pureness, player.location), 110);
	}
	else {
		server.system.runTimeout(() => container?.addItem(paper), 50);
		server.system.runTimeout(() => container?.addItem(energy), 70);
		server.system.runTimeout(() => container?.addItem(pureness), 90);
		server.system.runTimeout(() => container?.addItem(contract), 110);
	};
	// 给与 玩家 新手保护
	player.addEffect("minecraft:invisibility", 1800, { amplifier: 1, showParticles: false });
	player.addEffect("minecraft:resistance", 1800, { amplifier: 4, showParticles: false });
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
					useMagicCrystalShield(target, item);
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