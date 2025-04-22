/*
 * 原版接口
 */
import * as server from "@minecraft/server";
/*
 * 系统组件
 */
import * as opal from "../system/opal";
/*
 * 系统数据
 */
import * as table from "./table";
import * as type from "./type";
/**
 * * 琉璃计划
 */
const entry = new Map<string, type.SCHEDULE_NOTE>();
/*
 * 初始任务
 */
entry.set('离开 虚空蜂塔',
	{
		texture: 'textures/项目图标/传送',
		refer: [
			{ text: "『§l§m 任务 §r』§l:\n" },
			{ text: "从<§l§u 虚空野蜂塔 §r§l>出发, 成功返航<§l§u 主世界 §r§l>§r\n\n" },
			{ text: "『§l§s 奖励 §r』§l:\n" },
			{ text: "<§l§2 2 §9x§u 诸界道标 §r§l><§l§u 魔晶充能 §r§l>§r" }
		],
		reward: [
			{ type: "starry_map:road_sign_presets", amount: 2 },
			{ type: "starry_map:star_energy_infusion", amount: 1 }
		],
		onDone: [
			'trophy:stage_0',
			'trophy:stage_0.enter_vacant_space_wasp_tower',
		],
		prompt: '获取魔晶石'
	}
);
entry.set('召唤 星辉雅居',
	{
		texture: 'textures/物品贴图/召唤凭证/百灵绘卷',
		refer: [
			{ text: "『§l§m 任务 §r』§l:\n" },
			{ text: "选中合适的地点, 尝试召唤<§l§u 星辉雅居 §r§l>或<§l§u 初始物资 §r§l>§r\n\n" },
			{ text: "『§l§s 奖励 §r』§l:\n" },
			{ text: "<§l§u 交互终端 §r§l><§l§u 魔导合成 §r§l><§l§2 5 §9x§u 基础线缆 §r§l>§r" }
		],
		reward: [
			{ type: "starry_map:container_hub", amount: 1 },
			{ type: "starry_map:interactive_terminal", amount: 1 },
			{ type: "starry_map:basic_pipeline", amount: 5 },
		],
		onDone: [
			'trophy:stage_0',
			'trophy:stage_0.enter_starlight_house',
		]
	}
);
entry.set('遭遇 野蜂领航',
	{
		texture: 'textures/项目图标/智械革命/野蜂_领航者',
		refer: [
			{ text: "『§l§m 任务 §r』§l:\n" },
			{ text: '在存档内游玩§2 30 §r天, 或遭遇一次<§u 野蜂领航者 §r>§r\n\n' },
			{ text: "『§l§s 奖励 §r』§l:\n" },
			{ text: "<§l§2 4 §9x§u 武装碎片 §r§l>§r" },
			{ text: "<§l§u 渊鲸符文 §r§l><§l§u 蝰蛇符文 §r§l>§r" }
		],
		reward: [
			{ type: "starry_map:weapon_debris", amount: 4 },
			{ type: "starry_map:viper_rune", amount: 1 },
			{ type: "starry_map:whale_rune", amount: 1 },
		],
		before() {
			return server.world.getDay() / 30 >= 1;
		},
		onDone: [
			'trophy:stage_0',
			'trophy:stage_0.super_wasp_cluster_raid'
		]
	}
);
entry.set('斩获 末影龙鳞',
	{
		texture: 'textures/物品贴图/模板单元/末影龙鳞',
		refer: [
			{ text: "『§l§m 任务 §r』§l:\n" },
			{ text: "通过炸伤<§u 末影龙 §r>获得<§l§2 15 §9x§u 末影龙鳞 §r§l>§r\n\n" },
			{ text: "『§l§s 奖励 §r』§l:\n" },
			{ text: "<§l§u 永恒魔晶石 §r§l><§l§u 百灵绘卷 §r§l>§r" }
		],
		reward: [
			{ type: "starry_map:eternal_energy", amount: 1 },
			{ type: "starry_map:chorus_picture", amount: 1 },
		],
		attrition: [
			{ type: "starry_map:ender_dragon_scales", amount: 4 }
		],
		onDone: [
			'trophy:stage_0',
			'trophy:stage_0.ender_dragon_scales'
		]
	}
);
/*
 * 契约 初始萝莉
 */
entry.set('契约 琉璃',
	{
		texture: 'textures/项目图标/神恩使徒/归忆',
		refer: [
			{ text: "『§l§m 任务 §r』§l:\n" },
			{ text: '使用<§t 精灵结契 §r>与<§9 琉璃 §r>签订"§s 牢不可破 §r"的契约§r\n\n' },
			{ text: "『§l§s 奖励 §r』§l:\n" },
			{ text: "<§l§u 精灵结契 §r§l><§l§u 初级-金属锻压 §r§l>§r" }
		],
		reward: [
			{ type: "starry_map:metal_forming_press", amount: 1 },
			{ type: "starry_map:faerie_contract", amount: 1 }
		],
		before(player) {
			/**
			 * * 设定 角色类型
			 */
			const options: server.EntityQueryOptions = { type: 'starry_map:guide.crystal' };
			/**
			 * * 获取 角色列表
			 */
			const target = opal.EntitysSort(player.dimension, options, undefined, e => e.getDynamicProperty('entity:contract_user') == player.id);
			return target.length != 0;
		},
		rely: [
			'trophy:stage_0',
			'trophy:stage_0.enter_starlight_house'
		],
		onDone: [
			'trophy:stage_1',
			'trophy:stage_1.contract.crystal'
		],
		prompt: '物品修复与充能'
	}
);
entry.set('契约 月华',
	{
		texture: 'textures/项目图标/神恩使徒/启程',
		refer: [
			{ text: "『§l§m 任务 §r』§l:\n" },
			{ text: '使用<§t 精灵结契 §r>与<§9 月华 §r>签订"§s 牢不可破 §r"的契约§r\n\n' },
			{ text: "『§l§s 奖励 §r』§l:\n" },
			{ text: "<§l§u 森蚺哨兵炮 §r§l><§l§u 魔导手册 §r§l>§r" }
		],
		reward: [
			{ type: "starry_map:call_python_sentinel", amount: 1 },
			{ type: "starry_map:magic_handbook", amount: 1 }
		],
		before(player) {
			/**
			 * * 设定 角色类型
			 */
			const options: server.EntityQueryOptions = { type: 'starry_map:guide.moon_light' };
			/**
			 * * 获取 角色列表
			 */
			const target = opal.EntitysSort(player.dimension, options, undefined, e => e.getDynamicProperty('entity:contract_user') == player.id);
			return target.length != 0;
		},
		rely: [
			'trophy:stage_0',
			'trophy:stage_0.enter_starlight_house'
		],
		onDone: [
			'trophy:stage_1',
			'trophy:stage_1.contract.moonlight'
		],
		prompt: '魔晶工具与防具'
	}
);
/*
 * 契约 其他角色
 */
entry.set('契约 啸天',
	{
		texture: 'textures/项目图标/神恩使徒/啸天',
		refer: [
			{ text: "『§l§m 任务 §r』§l:\n" },
			{ text: '使用<§t 精灵结契 §r>与<§9 啸天 §r>签订"§s 牢不可破 §r"的契约§r\n\n' },
			{ text: "『§l§s 奖励 §r』§l:\n" },
			{ text: "<§l§u 鞍座 §r§l>§r" }
		],
		reward: [
			{ type: "minecraft:saddle", amount: 1 },
		],
		before(player) {
			/**
			 * * 设定 角色类型
			 */
			const options: server.EntityQueryOptions = { type: 'starry_map:execute.roaring' };
			/**
			 * * 获取 角色列表
			 */
			const target = opal.EntitysSort(player.dimension, options, undefined, e => e.getDynamicProperty('entity:contract_user') == player.id);
			return target.length != 0;
		},
		rely: [
			'trophy:stage_0.enter_vacant_space_wasp_tower',
			'trophy:stage_1'
		],
		onDone: [
			'trophy:stage_2',
			'trophy:stage_2.contract.roaring'
		]
	}
);
entry.set('契约 珍珠',
	{
		texture: 'textures/项目图标/神恩使徒/诸海',
		refer: [
			{ text: "『§l§m 任务 §r』§l:\n" },
			{ text: '使用<§t 精灵结契 §r>与<§9 珍珠 §r>签订"§s 牢不可破 §r"的契约§r\n\n' },
			{ text: "『§l§s 奖励 §r』§l:\n" },
			{ text: "<§l§u 参悟之石 §r§l>§r" }
		],
		reward: [
			{ type: "starry_map:enlightenment", amount: 1 },
		],
		before(player) {
			/**
			 * * 设定 角色类型
			 */
			const options: server.EntityQueryOptions = { type: 'starry_map:guide.pearl' };
			/**
			 * * 获取 角色列表
			 */
			const target = opal.EntitysSort(player.dimension, options, undefined, e => e.getDynamicProperty('entity:contract_user') == player.id);
			return target.length != 0;
		},
		rely: [
			'trophy:stage_0.enter_vacant_space_wasp_tower',
			'trophy:stage_1'
		],
		onDone: [
			'trophy:stage_2',
			'trophy:stage_2.contract.pearl'
		]
	}
);
entry.set('契约 绯红',
	{
		texture: 'textures/项目图标/神恩使徒/烛火',
		refer: [
			{ text: "『§l§m 任务 §r』§l:\n" },
			{ text: '使用<§t 精灵结契 §r>与<§9 绯红 §r>签订"§s 牢不可破 §r"的契约§r\n\n' },
			{ text: "『§l§s 奖励 §r』§l:\n" },
			{ text: "<§l§u 参悟之石 §r§l>§r" }
		],
		reward: [
			{ type: "starry_map:enlightenment", amount: 1 },
		],
		before(player) {
			/**
			 * * 设定 角色类型
			 */
			const options: server.EntityQueryOptions = { type: 'starry_map:guide.crimson' };
			/**
			 * * 获取 角色列表
			 */
			const target = opal.EntitysSort(player.dimension, options, undefined, e => e.getDynamicProperty('entity:contract_user') == player.id);
			return target.length != 0;
		},
		rely: [
			'trophy:stage_0.enter_vacant_space_wasp_tower',
			'trophy:stage_1'
		],
		onDone: [
			'trophy:stage_2',
			'trophy:stage_2.contract.crimson'
		]
	}
);
entry.set('契约 蔷薇',
	{
		texture: 'textures/项目图标/神恩使徒/极雷',
		refer: [
			{ text: "『§l§m 任务 §r』§l:\n" },
			{ text: '使用<§t 精灵结契 §r>与<§9 蔷薇 §r>签订"§s 牢不可破 §r"的契约§r\n\n' },
			{ text: "『§l§s 奖励 §r』§l:\n" },
			{ text: "<§l§u 参悟之石 §r§l>§r" }
		],
		reward: [
			{ type: "starry_map:enlightenment", amount: 1 },
		],
		before(player) {
			/**
			 * * 设定 角色类型
			 */
			const options: server.EntityQueryOptions = { type: 'starry_map:guide.rambler' };
			/**
			 * * 获取 角色列表
			 */
			const target = opal.EntitysSort(player.dimension, options, undefined, e => e.getDynamicProperty('entity:contract_user') == player.id);
			return target.length != 0;
		},
		rely: [
			'trophy:stage_0.enter_vacant_space_wasp_tower',
			'trophy:stage_1'
		],
		onDone: [
			'trophy:stage_2',
			'trophy:stage_2.contract.rambler'
		]
	}
);
entry.set('契约 海灵',
	{
		texture: 'textures/项目图标/神恩使徒/界木',
		refer: [
			{ text: "『§l§m 任务 §r』§l:\n" },
			{ text: '使用<§t 精灵结契 §r>与<§9 海灵 §r>签订"§s 牢不可破 §r"的契约§r\n\n' },
			{ text: "『§l§s 奖励 §r』§l:\n" },
			{ text: "<§l§u 参悟之石 §r§l>§r" }
		],
		reward: [
			{ type: "starry_map:enlightenment", amount: 1 },
		],
		before(player) {
			/**
			 * * 设定 角色类型
			 */
			const options: server.EntityQueryOptions = { type: 'starry_map:guide.hai_ling' };
			/**
			 * * 获取 角色列表
			 */
			const target = opal.EntitysSort(player.dimension, options, undefined, e => e.getDynamicProperty('entity:contract_user') == player.id);
			return target.length != 0;
		},
		rely: [
			'trophy:stage_0.enter_vacant_space_wasp_tower',
			'trophy:stage_1'
		],
		onDone: [
			'trophy:stage_2',
			'trophy:stage_2.contract.hailing'
		]
	}
);
entry.set('契约 海娜',
	{
		texture: 'textures/项目图标/神恩使徒/诸海',
		refer: [
			{ text: "『§l§m 任务 §r』§l:\n" },
			{ text: '使用<§t 精灵结契 §r>与<§9 海娜 §r>签订"§s 牢不可破 §r"的契约§r\n\n' },
			{ text: "『§l§s 奖励 §r』§l:\n" },
			{ text: "<§l§u 参悟之石 §r§l>§r" }
		],
		reward: [
			{ type: "starry_map:enlightenment", amount: 1 },
		],
		before(player) {
			/**
			 * * 设定 角色类型
			 */
			const options: server.EntityQueryOptions = { type: 'starry_map:guide.hai_na' };
			/**
			 * * 获取 角色列表
			 */
			const target = opal.EntitysSort(player.dimension, options, undefined, e => e.getDynamicProperty('entity:contract_user') == player.id);
			return target.length != 0;
		},
		rely: [
			'trophy:stage_0.enter_vacant_space_wasp_tower',
			'trophy:stage_1'
		],
		onDone: [
			'trophy:stage_2',
			'trophy:stage_2.contract.haina'
		]
	}
);
entry.set('契约 九九',
	{
		texture: 'textures/项目图标/神恩使徒/极雷',
		refer: [
			{ text: "『§l§m 任务 §r』§l:\n" },
			{ text: '使用<§t 精灵结契 §r>与<§9 九九 §r>签订"§s 牢不可破 §r"的契约§r\n\n' },
			{ text: "『§l§s 奖励 §r』§l:\n" },
			{ text: "<§l§u 参悟之石 §r§l>§r" }
		],
		reward: [
			{ type: "starry_map:enlightenment", amount: 1 },
		],
		before(player) {
			/**
			 * * 设定 角色类型
			 */
			const options: server.EntityQueryOptions = { type: 'starry_map:guide.nine_nine' };
			/**
			 * * 获取 角色列表
			 */
			const target = opal.EntitysSort(player.dimension, options, undefined, e => e.getDynamicProperty('entity:contract_user') == player.id);
			return target.length != 0;
		},
		rely: [
			'trophy:stage_0.enter_vacant_space_wasp_tower',
			'trophy:stage_1'
		],
		onDone: [
			'trophy:stage_2',
			'trophy:stage_2.contract.ninenine'
		]
	}
);
entry.set('契约 森涅',
	{
		texture: 'textures/项目图标/神恩使徒/界木',
		refer: [
			{ text: "『§l§m 任务 §r』§l:\n" },
			{ text: '使用<§t 精灵结契 §r>与<§9 森涅 §r>签订"§s 牢不可破 §r"的契约§r\n\n' },
			{ text: "『§l§s 奖励 §r』§l:\n" },
			{ text: "<§l§u 参悟之石 §r§l>§r" }
		],
		reward: [
			{ type: "starry_map:enlightenment", amount: 1 },
		],
		before(player) {
			/**
			 * * 设定 角色类型
			 */
			const options: server.EntityQueryOptions = { type: 'starry_map:guide.sen_nie' };
			/**
			 * * 获取 角色列表
			 */
			const target = opal.EntitysSort(player.dimension, options, undefined, e => e.getDynamicProperty('entity:contract_user') == player.id);
			return target.length != 0;
		},
		rely: [
			'trophy:stage_0.enter_vacant_space_wasp_tower',
			'trophy:stage_1'
		],
		onDone: [
			'trophy:stage_2',
			'trophy:stage_2.contract.sennie'
		]
	}
);
entry.set('契约 星砂',
	{
		texture: 'textures/项目图标/神恩使徒/烛火',
		refer: [
			{ text: "『§l§m 任务 §r』§l:\n" },
			{ text: '使用<§t 精灵结契 §r>与<§9 星砂 §r>签订"§s 牢不可破 §r"的契约§r\n\n' },
			{ text: "『§l§s 奖励 §r』§l:\n" },
			{ text: "<§l§u 参悟之石 §r§l>§r" }
		],
		reward: [
			{ type: "starry_map:enlightenment", amount: 1 },
		],
		before(player) {
			/**
			 * * 设定 角色类型
			 */
			const options: server.EntityQueryOptions = { type: 'starry_map:guide.star_sand' };
			/**
			 * * 获取 角色列表
			 */
			const target = opal.EntitysSort(player.dimension, options, undefined, e => e.getDynamicProperty('entity:contract_user') == player.id);
			return target.length != 0;
		},
		rely: [
			'trophy:stage_0.enter_vacant_space_wasp_tower',
			'trophy:stage_1'
		],
		onDone: [
			'trophy:stage_2',
			'trophy:stage_2.contract.starsand'
		]
	}
);
entry.set('契约 雪隐',
	{
		texture: 'textures/项目图标/神恩使徒/诸海',
		refer: [
			{ text: "『§l§m 任务 §r』§l:\n" },
			{ text: '使用<§t 精灵结契 §r>与<§9 雪隐 §r>签订"§s 牢不可破 §r"的契约§r\n\n' },
			{ text: "『§l§s 奖励 §r』§l:\n" },
			{ text: "<§l§u 参悟之石 §r§l>§r" }
		],
		reward: [
			{ type: "starry_map:enlightenment", amount: 1 },
		],
		before(player) {
			/**
			 * * 设定 角色类型
			 */
			const options: server.EntityQueryOptions = { type: 'starry_map:guide.snow_hidden' };
			/**
			 * * 获取 角色列表
			 */
			const target = opal.EntitysSort(player.dimension, options, undefined, e => e.getDynamicProperty('entity:contract_user') == player.id);
			return target.length != 0;
		},
		rely: [
			'trophy:stage_0.enter_vacant_space_wasp_tower',
			'trophy:stage_1'
		],
		onDone: [
			'trophy:stage_2',
			'trophy:stage_2.contract.snowhidden'
		]
	}
);
entry.set('契约 幽蓝',
	{
		texture: 'textures/项目图标/神恩使徒/诸海',
		refer: [
			{ text: "『§l§m 任务 §r』§l:\n" },
			{ text: '使用<§t 精灵结契 §r>与<§9 幽蓝 §r>签订"§s 牢不可破 §r"的契约§r\n\n' },
			{ text: "『§l§s 奖励 §r』§l:\n" },
			{ text: "<§l§u 参悟之石 §r§l>§r" }
		],
		reward: [
			{ type: "starry_map:enlightenment", amount: 1 },
		],
		before(player) {
			/**
			 * * 设定 角色类型
			 */
			const options: server.EntityQueryOptions = { type: 'starry_map:guide.dullblue' };
			/**
			 * * 获取 角色列表
			 */
			const target = opal.EntitysSort(player.dimension, options, undefined, e => e.getDynamicProperty('entity:contract_user') == player.id);
			return target.length != 0;
		},
		rely: [
			'trophy:stage_0.enter_vacant_space_wasp_tower',
			'trophy:stage_1'
		],
		onDone: [
			'trophy:stage_2',
			'trophy:stage_2.contract.dullblue'
		]
	}
);
/*
 * 魔晶石系列
 */
entry.set('收集 归忆_魔晶石',
	{
		texture: 'textures/物品贴图/能量水晶/归忆_魔晶石',
		refer: [
			{ text: "『§l§m 任务 §r』§l:\n" },
			{ text: "制作或获得<§l§u 归忆_魔晶石 §r§l>§r\n\n" },
			{ text: "『§l§s 奖励 §r』§l:\n" },
			{ text: "<§l§u 幻影驱散 §r§l><§l§2 2 §9x§u 涵养灵露 §r§l>§r" }
		],
		reward: [
			{ type: "starry_map:phantom_dispel_dust", amount: 1 },
			{ type: "starry_map:moment_repair_dew", amount: 2 }
		],
		attrition: [
			{ type: "starry_map:orange_energy", amount: 1 },
		],
		rely: [
			'trophy:stage_2'
		],
		onDone: [
			'trophy:stage_3',
			'trophy:stage_3.item.energy_crystal.orange_energy'
		]
	}
);
entry.set('收集 极雷_魔晶石',
	{
		texture: 'textures/物品贴图/能量水晶/极雷_魔晶石',
		refer: [
			{ text: "『§l§m 任务 §r』§l:\n" },
			{ text: "制作或获得<§l§u 极雷_魔晶石 §r§l>§r\n\n" },
			{ text: "『§l§s 奖励 §r』§l:\n" },
			{ text: "<§l§u 幻影驱散 §r§l><§l§2 2 §9x§u 涵养灵露 §r§l>§r" }
		],
		reward: [
			{ type: "starry_map:phantom_dispel_dust", amount: 1 },
			{ type: "starry_map:moment_repair_dew", amount: 2 }
		],
		attrition: [
			{ type: "starry_map:purple_energy", amount: 1 },
		],
		rely: [
			'trophy:stage_2'
		],
		onDone: [
			'trophy:stage_3',
			'trophy:stage_3.item.energy_crystal.purple_energy'
		]
	}
);
entry.set('收集 界木_魔晶石',
	{
		texture: 'textures/物品贴图/能量水晶/界木_魔晶石',
		refer: [
			{ text: "『§l§m 任务 §r』§l:\n" },
			{ text: "制作或获得<§l§u 界木_魔晶石 §r§l>§r\n\n" },
			{ text: "『§l§s 奖励 §r』§l:\n" },
			{ text: "<§l§u 幻影驱散 §r§l><§l§2 2 §9x§u 涵养灵露 §r§l>§r" }
		],
		reward: [
			{ type: "starry_map:phantom_dispel_dust", amount: 1 },
			{ type: "starry_map:moment_repair_dew", amount: 2 }
		],
		attrition: [
			{ type: "starry_map:green_energy", amount: 1 },
		],
		rely: [
			'trophy:stage_2'
		],
		onDone: [
			'trophy:stage_3',
			'trophy:stage_3.item.energy_crystal.green_energy'
		]
	}
);
entry.set('收集 诸海_魔晶石',
	{
		texture: 'textures/物品贴图/能量水晶/诸海_魔晶石',
		refer: [
			{ text: "『§l§m 任务 §r』§l:\n" },
			{ text: "制作或获得<§l§u 诸海_魔晶石 §r§l>§r\n\n" },
			{ text: "『§l§s 奖励 §r』§l:\n" },
			{ text: "<§l§u 幻影驱散 §r§l><§l§2 2 §9x§u 涵养灵露 §r§l>§r" }
		],
		reward: [
			{ type: "starry_map:phantom_dispel_dust", amount: 1 },
			{ type: "starry_map:moment_repair_dew", amount: 2 }
		],
		attrition: [
			{ type: "starry_map:blue_energy", amount: 1 },
		],
		rely: [
			'trophy:stage_2'
		],
		onDone: [
			'trophy:stage_3',
			'trophy:stage_3.item.energy_crystal.blue_energy'
		]
	}
);
entry.set('收集 烛火_魔晶石',
	{
		texture: 'textures/物品贴图/能量水晶/烛火_魔晶石',
		refer: [
			{ text: "『§l§m 任务 §r』§l:\n" },
			{ text: "制作或获得<§l§u 烛火_魔晶石 §r§l>§r\n\n" },
			{ text: "『§l§s 奖励 §r』§l:\n" },
			{ text: "<§l§u 幻影驱散 §r§l><§l§2 2 §9x§u 涵养灵露 §r§l>§r" }
		],
		reward: [
			{ type: "starry_map:phantom_dispel_dust", amount: 1 },
			{ type: "starry_map:moment_repair_dew", amount: 2 }
		],
		attrition: [
			{ type: "starry_map:red_energy", amount: 1 },
		],
		rely: [
			'trophy:stage_2'
		],
		onDone: [
			'trophy:stage_3',
			'trophy:stage_3.item.energy_crystal.red_energy'
		]
	}
);
entry.set('收集 永恒_魔晶石',
	{
		texture: 'textures/物品贴图/能量水晶/永恒_魔晶石',
		refer: [
			{ text: "『§l§m 任务 §r』§l:\n" },
			{ text: "获得 1 枚<§l§u 永恒_魔晶石 §r§l>§r\n\n" },
			{ text: "『§l§s 奖励 §r』§l:\n" },
			{ text: "<§l§c 魔法工业展馆 §r§l>§r" }
		],
		attrition: [
			{ type: "starry_map:eternal_energy", amount: 1 },
		],
		after(player) {
			/**
			 * * 获取 游戏规则
			 */
			const rule = server.world.getDynamicProperty('game_rules:regenerate.magic_industry_exhibition_hall') ?? true;
			/**
			 * * 坐标映射值
			 */
			const mapping = new opal.Vector(-500, 66, -500);
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
			const endPoint = mapping.add({ x: 64, y: 32, z: 64 });
			// 播放引导文本
			opal.PlayPrompt(player, "生成魔法工业展馆");
			// 传送玩家到魔法工业展馆
			player.teleport(mapping, { dimension });
			// 清除 摄像机动画
			server.system.runTimeout(() => camera.clear(), 95);
			// 设置 摄像机位移
			server.system.runTimeout(() => camera.setCamera('minecraft:free', { location: endPoint, facingLocation: player.location, easeOptions: { easeTime: 3 } }), 20);
			// 设置 动态属性-魔法工业展馆坐标
			server.system.runTimeout(() => player.setDynamicProperty('road_sign:魔法工业展馆', anchor), 20);
			// 判断是否生成结构
			if (rule === false) return;
			/**
			 * * 获取 建筑结构
			 */
			const template = server.world.structureManager.get('mystructure:magic_industry_exhibition_hall');
			/**
			 * * 定义 坐标基准点
			 */
			const reference = mapping.add({ x: -32, y: -2, z: -32 });
			// 检测 建筑结构
			if (!template) return player.sendMessage([opal.translate(player), { text: '-> 未能获取到<§l§9 魔法工业展馆 §r>的结构数据文件' }]);
			// 放置 建筑结构
			server.world.structureManager.place(template, dimension, reference);
			// 赠送 星尘能量
			server.world.setDynamicProperty("stardust_energy_cache:" + opal.RandomFloor(10000, 99999), 100000);
			// 设置 游戏规则
			if (rule == true) server.world.setDynamicProperty('game_rules:regenerate.magic_industry_exhibition_hall', false);
		},
		rely: [
			'trophy:stage_0',
			'trophy:stage_0.enter_starlight_house'
		],
		onDone: [
			'trophy:stage_3',
			'trophy:stage_3.item.energy_crystal.eternal_energy'
		]
	}
);
entry.set('收集 归忆_魔晶块',
	{
		texture: 'textures/方块贴图/能量晶块/归忆',
		refer: [
			{ text: "『§l§m 任务 §r』§l:\n" },
			{ text: "制作或获得<§l§u 归忆_魔晶块 §r§l>§r\n\n" },
			{ text: "『§l§s 奖励 §r』§l:\n" },
			{ text: "<§l§u 参悟之石 §r§l><§l§u 百灵绘卷 §r§l>§r" }
		],
		reward: [
			{ type: "starry_map:enlightenment", amount: 1 },
			{ type: "starry_map:chorus_picture", amount: 1 },
		],
		attrition: [
			{ type: "starry_map:block.orange_energy", amount: 1 },
		],
		rely: [
			'trophy:stage_2'
		],
		onDone: [
			'trophy:stage_3',
			'trophy:stage_3.block.energy_crystal.orange_energy'
		]
	}
);
entry.set('收集 烛火_魔晶块',
	{
		texture: 'textures/方块贴图/能量晶块/烛火',
		refer: [
			{ text: "『§l§m 任务 §r』§l:\n" },
			{ text: "制作或获得<§l§u 烛火_魔晶块 §r§l>§r\n\n" },
			{ text: "『§l§s 奖励 §r』§l:\n" },
			{ text: "<§l§u 参悟之石 §r§l><§l§u 百灵绘卷 §r§l>§r" }
		],
		reward: [
			{ type: "starry_map:enlightenment", amount: 1 },
			{ type: "starry_map:chorus_picture", amount: 1 },
		],
		attrition: [
			{ type: "starry_map:block.red_energy", amount: 1 },
		],
		rely: [
			'trophy:stage_2'
		],
		onDone: [
			'trophy:stage_3',
			'trophy:stage_3.block.energy_crystal.red_energy'
		]
	}
);
entry.set('收集 诸海_魔晶块',
	{
		texture: 'textures/方块贴图/能量晶块/诸海',
		refer: [
			{ text: "『§l§m 任务 §r』§l:\n" },
			{ text: "制作或获得<§l§u 诸海_魔晶块 §r§l>§r\n\n" },
			{ text: "『§l§s 奖励 §r』§l:\n" },
			{ text: "<§l§u 参悟之石 §r§l><§l§u 百灵绘卷 §r§l>§r" }
		],
		reward: [
			{ type: "starry_map:enlightenment", amount: 1 },
			{ type: "starry_map:chorus_picture", amount: 1 },
		],
		attrition: [
			{ type: "starry_map:block.blue_energy", amount: 1 },
		],
		rely: [
			'trophy:stage_2'
		],
		onDone: [
			'trophy:stage_3',
			'trophy:stage_3.block.energy_crystal.blue_energy'
		]
	}
);
entry.set('收集 界木_魔晶块',
	{
		texture: 'textures/方块贴图/能量晶块/界木',
		refer: [
			{ text: "『§l§m 任务 §r』§l:\n" },
			{ text: "制作或获得<§l§u 界木_魔晶块 §r§l>§r\n\n" },
			{ text: "『§l§s 奖励 §r』§l:\n" },
			{ text: "<§l§u 参悟之石 §r§l><§l§u 百灵绘卷 §r§l>§r" }
		],
		reward: [
			{ type: "starry_map:enlightenment", amount: 1 },
			{ type: "starry_map:chorus_picture", amount: 1 },
		],
		attrition: [
			{ type: "starry_map:block.green_energy", amount: 1 },
		],
		rely: [
			'trophy:stage_2'
		],
		onDone: [
			'trophy:stage_3',
			'trophy:stage_3.block.energy_crystal.green_energy'
		]
	}
);
entry.set('收集 极雷_魔晶块',
	{
		texture: 'textures/方块贴图/能量晶块/极雷',
		refer: [
			{ text: "『§l§m 任务 §r』§l:\n" },
			{ text: "制作或获得<§l§u 极雷_魔晶块 §r§l>§r\n\n" },
			{ text: "『§l§s 奖励 §r』§l:\n" },
			{ text: "<§l§u 参悟之石 §r§l><§l§u 百灵绘卷 §r§l>§r" }
		],
		reward: [
			{ type: "starry_map:enlightenment", amount: 1 },
			{ type: "starry_map:chorus_picture", amount: 1 },
		],
		attrition: [
			{ type: "starry_map:block.purple_energy", amount: 1 },
		],
		rely: [
			'trophy:stage_2'
		],
		onDone: [
			'trophy:stage_3',
			'trophy:stage_3.block.energy_crystal.purple_energy'
		]
	}
);
entry.set('收集 永恒_魔晶块',
	{
		texture: 'textures/方块贴图/能量晶块/永恒',
		refer: [
			{ text: "『§l§m 任务 §r』§l:\n" },
			{ text: '制作或获得<§l§u 永恒_魔晶块 §r§l>§r\n\n' },
			{ text: "『§l§s 奖励 §r』§l:\n" },
			{ text: "<§l§u 永恒魔晶块 §r§l><§l§u 恒常储罐 §r§l>§r" }
		],
		reward: [
			{ type: "starry_map:constant_tank", amount: 1 },
			{ type: "starry_map:block.eternal_energy", amount: 1 }
		],
		attrition: [
			{ type: "starry_map:block.eternal_energy", amount: 1 }
		],
		rely: [
			'trophy:stage_2'
		],
		onDone: [
			'trophy:stage_3',
			'trophy:stage_3.block.energy_crystal.eternal_energy'
		]
	}
);
/*
 * 收集物品
 */
entry.set('制作 基础总线',
	{
		texture: 'textures/方块贴图/模块化/平面_2/色彩',
		refer: [
			{ text: "『§l§m 任务 §r』§l:\n" },
			{ text: "制作或获得<§l§2 32 §9x§u 基础总线 §r§l>§r\n\n" },
			{ text: "『§l§s 奖励 §r』§l:\n" },
			{ text: "<§l§2 24 §9x§u 基础总线 §r§l><§l§2 2 §9x§u 逻辑单通 §r§l>§r\n" },
			{ text: "<§l§2 2 §9x§u 逻辑异或 §r§l><§l§2 2 §9x§u 逻辑非门 §r§l><§l§2 2 §9x§u 逻辑与门 §r§l>§r" }
		],
		reward: [
			{ type: "starry_map:basic_pipeline", amount: 24 },
			{ type: "starry_map:logic_inverter", amount: 2 },
			{ type: "starry_map:exclusive_or", amount: 2 },
			{ type: "starry_map:logic_single", amount: 2 },
			{ type: "starry_map:logical_and", amount: 2 },
		],
		attrition: [
			{ type: "starry_map:basic_pipeline", amount: 32 }
		],
		rely: [
			'trophy:stage_4.universal_integrated_circuit'
		],
		onDone: [
			'trophy:stage_4',
			'trophy:stage_4.basic_pipeline'
		]
	}
);
entry.set('制作 驱动核心',
	{
		texture: 'textures/方块贴图/模块化/平面_0/色彩',
		refer: [
			{ text: "『§l§m 任务 §r』§l:\n" },
			{ text: '制作或获得<§l§2 4 §9x§u 驱动核心 §r§l>§r\n\n' },
			{ text: "『§l§s 奖励 §r』§l:\n" },
			{ text: "<§l§2 4 §9x§u 驱动核心 §r§l><§l§2 16 §9x§u 虚空方块 §r§l>§r" }
		],
		reward: [
			{ type: "starry_map:nihility_space_block", amount: 16 },
			{ type: "starry_map:servo_omphalos", amount: 4 },
		],
		attrition: [
			{ type: "starry_map:servo_omphalos", amount: 4 }
		],
		rely: [
			'trophy:stage_4.universal_integrated_circuit'
		],
		onDone: [
			'trophy:stage_4',
			'trophy:stage_4.omphalos'
		]
	}
);
entry.set('收集 魔晶盾牌',
	{
		texture: 'textures/物品贴图/魔法工具/魔晶盾牌',
		refer: [
			{ text: "『§l§m 任务 §r』§l:\n" },
			{ text: "制作或获得<§l§u 魔晶盾牌 §r§l>§r\n\n" },
			{ text: "『§l§s 奖励 §r』§l:\n" },
			{ text: "<§l§u 魔晶盾牌 §r§l><§l§u 参悟之石 §r§l>§r" }
		],
		reward: [
			{ type: "starry_map:enlightenment", amount: 1 },
			{ type: "starry_map:magic_crystal_shield", amount: 1 },
		],
		attrition: [
			{ type: "starry_map:magic_crystal_shield", amount: 1 },
		],
		rely: [
			'trophy:stage_1.contract.moonlight',
			'trophy:stage_3',
		],
		onDone: [
			'trophy:stage_4',
			'trophy:stage_4.magic_crystal_integration.magic_crystal_shield'
		]
	}
);
entry.set('收集 魔晶扳手',
	{
		texture: 'textures/物品贴图/魔法工具/魔晶扳手',
		refer: [
			{ text: "『§l§m 任务 §r』§l:\n" },
			{ text: "制作或获得<§l§u 魔晶扳手 §r§l>§r\n\n" },
			{ text: "『§l§s 奖励 §r』§l:\n" },
			{ text: "<§l§u 魔晶扳手 §r§l><§l§u 参悟之石 §r§l>§r" }
		],
		reward: [
			{ type: "starry_map:enlightenment", amount: 1 },
			{ type: "starry_map:magic_crystal_wrench", amount: 1 },
		],
		attrition: [
			{ type: "starry_map:magic_crystal_wrench", amount: 1 },
		],
		rely: [
			'trophy:stage_1.contract.moonlight',
			'trophy:stage_3',
		],
		onDone: [
			'trophy:stage_4',
			'trophy:stage_4.magic_crystal_integration.magic_crystal_wrench'
		]
	}
);
entry.set('收集 魔晶弹珠',
	{
		texture: 'textures/物品贴图/魔法工具/魔晶弹珠',
		refer: [
			{ text: "『§l§m 任务 §r』§l:\n" },
			{ text: "制作或获得<§l§u 魔晶弹珠 §r§l>§r\n\n" },
			{ text: "『§l§s 奖励 §r』§l:\n" },
			{ text: "<§l§u 魔晶弹珠 §r§l><§l§u 参悟之石 §r§l>§r" }
		],
		reward: [
			{ type: "starry_map:enlightenment", amount: 1 },
			{ type: "starry_map:magic_crystal_marbles", amount: 1 },
		],
		attrition: [
			{ type: "starry_map:magic_crystal_marbles", amount: 1 },
		],
		rely: [
			'trophy:stage_1.contract.moonlight',
			'trophy:stage_3',
		],
		onDone: [
			'trophy:stage_4',
			'trophy:stage_4.magic_crystal_integration.magic_crystal_marbles'
		]
	}
);
entry.set('收集 魔晶弹弓',
	{
		texture: 'textures/物品贴图/魔法工具/魔晶弹弓',
		refer: [
			{ text: "『§l§m 任务 §r』§l:\n" },
			{ text: "制作或获得<§l§u 魔晶弹弓 §r§l>§r\n\n" },
			{ text: "『§l§s 奖励 §r』§l:\n" },
			{ text: "<§l§u 魔晶弹弓 §r§l><§l§u 参悟之石 §r§l>§r" }
		],
		reward: [
			{ type: "starry_map:enlightenment", amount: 1 },
			{ type: "starry_map:magic_crystal_bow", amount: 1 },
		],
		attrition: [
			{ type: "starry_map:magic_crystal_bow", amount: 1 },
		],
		rely: [
			'trophy:stage_1.contract.moonlight',
			'trophy:stage_3',
		],
		onDone: [
			'trophy:stage_4',
			'trophy:stage_4.magic_crystal_integration.magic_crystal_bow'
		]
	}
);
entry.set('收集 魔晶锤子',
	{
		texture: 'textures/物品贴图/魔法工具/魔晶锤子',
		refer: [
			{ text: "『§l§m 任务 §r』§l:\n" },
			{ text: "制作或获得<§l§u 魔晶锤子 §r§l>§r\n\n" },
			{ text: "『§l§s 奖励 §r』§l:\n" },
			{ text: "<§l§u 魔晶锤子 §r§l><§l§u 参悟之石 §r§l>§r" }
		],
		reward: [
			{ type: "starry_map:enlightenment", amount: 1 },
			{ type: "starry_map:magic_crystal_hammer", amount: 1 },
		],
		attrition: [
			{ type: "starry_map:magic_crystal_hammer", amount: 1 },
		],
		rely: [
			'trophy:stage_1.contract.moonlight',
			'trophy:stage_3',
		],
		onDone: [
			'trophy:stage_4',
			'trophy:stage_4.magic_crystal_integration.magic_crystal_hammer'
		]
	}
);
entry.set('收集 魔晶钩爪',
	{
		texture: 'textures/物品贴图/魔法工具/魔晶钩爪',
		refer: [
			{ text: "『§l§m 任务 §r』§l:\n" },
			{ text: "制作或获得<§l§u 魔晶钩爪 §r§l>§r\n\n" },
			{ text: "『§l§s 奖励 §r』§l:\n" },
			{ text: "<§l§u 魔晶钩爪 §r§l><§l§u 参悟之石 §r§l>§r" }
		],
		reward: [
			{ type: "starry_map:enlightenment", amount: 1 },
			{ type: "starry_map:magic_crystal_claw", amount: 1 },
		],
		attrition: [
			{ type: "starry_map:magic_crystal_claw", amount: 1 },
		],
		rely: [
			'trophy:stage_1.contract.moonlight',
			'trophy:stage_3',
		],
		onDone: [
			'trophy:stage_4',
			'trophy:stage_4.magic_crystal_integration.magic_crystal_claw'
		]
	}
);
entry.set('收集 魔晶起子',
	{
		texture: 'textures/物品贴图/魔法工具/魔晶起子',
		refer: [
			{ text: "『§l§m 任务 §r』§l:\n" },
			{ text: "制作或获得<§l§u 魔晶起子 §r§l>§r\n\n" },
			{ text: "『§l§s 奖励 §r』§l:\n" },
			{ text: "<§l§u 魔晶起子 §r§l><§l§u 参悟之石 §r§l>§r" }
		],
		reward: [
			{ type: "starry_map:enlightenment", amount: 1 },
			{ type: "starry_map:magic_crystal_screwdriver", amount: 1 },
		],
		attrition: [
			{ type: "starry_map:magic_crystal_screwdriver", amount: 1 },
		],
		rely: [
			'trophy:stage_1.contract.moonlight',
			'trophy:stage_3',
		],
		onDone: [
			'trophy:stage_4',
			'trophy:stage_4.magic_crystal_integration.magic_crystal_screwdriver'
		]
	}
);
entry.set('收集 魔晶钥匙',
	{
		texture: 'textures/物品贴图/魔法工具/魔晶钥匙',
		refer: [
			{ text: "『§l§m 任务 §r』§l:\n" },
			{ text: "制作或获得<§l§u 魔晶钥匙 §r§l>§r\n\n" },
			{ text: "『§l§s 奖励 §r』§l:\n" },
			{ text: "<§l§u 魔晶钥匙 §r§l><§l§u 参悟之石 §r§l>§r" }
		],
		reward: [
			{ type: "starry_map:enlightenment", amount: 1 },
			{ type: "starry_map:magic_crystal_key", amount: 1 },
		],
		attrition: [
			{ type: "starry_map:magic_crystal_key", amount: 1 },
		],
		rely: [
			'trophy:stage_1.contract.moonlight',
			'trophy:stage_3',
		],
		onDone: [
			'trophy:stage_4',
			'trophy:stage_4.magic_crystal_integration.magic_crystal_key'
		]
	}
);
entry.set('收集 通用集成',
	{
		texture: 'textures/物品贴图/模板单元/通用集成回路',
		refer: [
			{ text: "『§l§m 任务 §r』§l:\n" },
			{ text: "制作或获得<§l§u 通用集成回路 §r§l>§r\n\n" },
			{ text: "『§l§s 奖励 §r』§l:\n" },
			{ text: "<§l§2 2 §9x§u 通用集成回路 §r§l><§l§2 8 §9x§u 钢岩合金-套装 §r§l>§r\n" },
			{ text: "<§l§2 2 §9x§u 渊鲸符文 §r§l><§l§2 2 §9x§u 蝰蛇符文 §r§l>§r" }
		],
		reward: [
			{ type: "starry_map:universal_integrated_circuit", amount: 2 },
			{ type: "starry_map:wafer.steel_rock_eutectic", amount: 8 },
			{ type: "starry_map:coil.steel_rock_eutectic", amount: 8 },
			{ type: "starry_map:steel_rock_eutectic", amount: 8 },
			{ type: "starry_map:viper_rune", amount: 2 },
			{ type: "starry_map:whale_rune", amount: 2 },
		],
		attrition: [
			{ type: "starry_map:universal_integrated_circuit", amount: 1 }
		],
		rely: [
			'trophy:stage_1.contract.moonlight',
			'trophy:stage_3',
		],
		onDone: [
			'trophy:stage_4',
			'trophy:stage_4.universal_integrated_circuit'
		],
		prompt: '魔导工业的启动基础'
	}
);
entry.set('收集 畜牧典范',
	{
		texture: 'textures/物品贴图/魔法书籍/畜牧典范',
		refer: [
			{ text: "『§l§m 任务 §r』§l:\n" },
			{ text: "制作或获得<§l§u 畜牧典范 §r§l>§r\n\n" },
			{ text: "『§l§s 奖励 §r』§l:\n" },
			{ text: "<§l§u 百灵绘卷 §r§l><§l§2 8 §9x§u 钢岩合金-套装 §r§l>§r" }
		],
		reward: [
			{ type: "starry_map:wafer.steel_rock_eutectic", amount: 8 },
			{ type: "starry_map:coil.steel_rock_eutectic", amount: 8 },
			{ type: "starry_map:steel_rock_eutectic", amount: 8 },
			{ type: "starry_map:chorus_picture", amount: 1 },
		],
		attrition: [
			{ type: "starry_map:animal_husbandry", amount: 1 },
		],
		rely: [
			'trophy:stage_1.contract.crystal',
			'trophy:stage_3',
		],
		onDone: [
			'trophy:stage_4',
			'trophy:stage_4.magic_crystal_books.animal_husbandry'
		]
	}
);
entry.set('收集 精灵结契',
	{
		texture: 'textures/物品贴图/魔法书籍/精灵结契',
		refer: [
			{ text: "『§l§m 任务 §r』§l:\n" },
			{ text: "制作或获得<§l§u 精灵结契 §r§l>§r\n\n" },
			{ text: "『§l§s 奖励 §r』§l:\n" },
			{ text: "<§l§u 百灵绘卷 §r§l><§l§2 8 §9x§u 钢岩合金-套装 §r§l>§r" }
		],
		reward: [
			{ type: "starry_map:wafer.steel_rock_eutectic", amount: 8 },
			{ type: "starry_map:coil.steel_rock_eutectic", amount: 8 },
			{ type: "starry_map:steel_rock_eutectic", amount: 8 },
			{ type: "starry_map:chorus_picture", amount: 1 },
		],
		attrition: [
			{ type: "starry_map:faerie_contract", amount: 1 },
		],
		rely: [
			'trophy:stage_1.contract.crystal',
			'trophy:stage_3',
		],
		onDone: [
			'trophy:stage_4',
			'trophy:stage_4.magic_crystal_books.faerie_contract'
		]
	}
);
entry.set('收集 精灵治愈',
	{
		texture: 'textures/物品贴图/魔法书籍/精灵治愈',
		refer: [
			{ text: "『§l§m 任务 §r』§l:\n" },
			{ text: "制作或获得<§l§u 精灵治愈 §r§l>§r\n\n" },
			{ text: "『§l§s 奖励 §r』§l:\n" },
			{ text: "<§l§u 百灵绘卷 §r§l><§l§2 8 §9x§u 钢岩合金-套装 §r§l>§r" }
		],
		reward: [
			{ type: "starry_map:wafer.steel_rock_eutectic", amount: 8 },
			{ type: "starry_map:coil.steel_rock_eutectic", amount: 8 },
			{ type: "starry_map:steel_rock_eutectic", amount: 8 },
			{ type: "starry_map:chorus_picture", amount: 1 },
		],
		attrition: [
			{ type: "starry_map:faerie_healing", amount: 1 },
		],
		rely: [
			'trophy:stage_1.contract.crystal',
			'trophy:stage_3',
		],
		onDone: [
			'trophy:stage_4',
			'trophy:stage_4.magic_crystal_books.faerie_healing'
		]
	}
);
entry.set('收集 空间宝典',
	{
		texture: 'textures/物品贴图/魔法书籍/空间宝典',
		refer: [
			{ text: "『§l§m 任务 §r』§l:\n" },
			{ text: "制作或获得<§l§u 空间宝典 §r§l>§r\n\n" },
			{ text: "『§l§s 奖励 §r』§l:\n" },
			{ text: "<§l§u 百灵绘卷 §r§l><§l§2 8 §9x§u 钢岩合金-套装 §r§l>§r" }
		],
		reward: [
			{ type: "starry_map:wafer.steel_rock_eutectic", amount: 8 },
			{ type: "starry_map:coil.steel_rock_eutectic", amount: 8 },
			{ type: "starry_map:steel_rock_eutectic", amount: 8 },
			{ type: "starry_map:chorus_picture", amount: 1 },
		],
		attrition: [
			{ type: "starry_map:space_transition", amount: 1 },
		],
		rely: [
			'trophy:stage_1.contract.crystal',
			'trophy:stage_3',
		],
		onDone: [
			'trophy:stage_4',
			'trophy:stage_4.magic_crystal_books.space_transition'
		]
	}
);
entry.set('收集 矿物辞典',
	{
		texture: 'textures/物品贴图/魔法书籍/矿物辞典',
		refer: [
			{ text: "『§l§m 任务 §r』§l:\n" },
			{ text: "制作或获得<§l§u 矿物辞典 §r§l>§r\n\n" },
			{ text: "『§l§s 奖励 §r』§l:\n" },
			{ text: "<§l§u 百灵绘卷 §r§l><§l§2 8 §9x§u 钢岩合金-套装 §r§l>§r" }
		],
		reward: [
			{ type: "starry_map:wafer.steel_rock_eutectic", amount: 8 },
			{ type: "starry_map:coil.steel_rock_eutectic", amount: 8 },
			{ type: "starry_map:steel_rock_eutectic", amount: 8 },
			{ type: "starry_map:chorus_picture", amount: 1 },
		],
		attrition: [
			{ type: "starry_map:mineral_dictionary", amount: 1 },
		],
		rely: [
			'trophy:stage_1.contract.crystal',
			'trophy:stage_3',
		],
		onDone: [
			'trophy:stage_4',
			'trophy:stage_4.magic_crystal_books.mineral_dictionary'
		]
	}
);
entry.set('收集 林业指南',
	{
		texture: 'textures/物品贴图/魔法书籍/林业指南',
		refer: [
			{ text: "『§l§m 任务 §r』§l:\n" },
			{ text: "制作或获得<§l§u 林业指南 §r§l>§r\n\n" },
			{ text: "『§l§s 奖励 §r』§l:\n" },
			{ text: "<§l§u 百灵绘卷 §r§l><§l§2 8 §9x§u 钢岩合金-套装 §r§l>§r" }
		],
		reward: [
			{ type: "starry_map:wafer.steel_rock_eutectic", amount: 8 },
			{ type: "starry_map:coil.steel_rock_eutectic", amount: 8 },
			{ type: "starry_map:steel_rock_eutectic", amount: 8 },
			{ type: "starry_map:chorus_picture", amount: 1 },
		],
		attrition: [
			{ type: "starry_map:forestry_guidelines", amount: 1 },
		],
		rely: [
			'trophy:stage_1.contract.crystal',
			'trophy:stage_3',
		],
		onDone: [
			'trophy:stage_4',
			'trophy:stage_4.magic_crystal_books.forestry_guidelines'
		]
	}
);
entry.set('收集 魔导手册',
	{
		texture: 'textures/物品贴图/魔法书籍/魔导手册',
		refer: [
			{ text: "『§l§m 任务 §r』§l:\n" },
			{ text: "制作或获得<§l§u 魔导手册 §r§l>§r\n\n" },
			{ text: "『§l§s 奖励 §r』§l:\n" },
			{ text: "<§l§u 百灵绘卷 §r§l><§l§2 8 §9x§u 钢岩合金-套装 §r§l>§r" }
		],
		reward: [
			{ type: "starry_map:wafer.steel_rock_eutectic", amount: 8 },
			{ type: "starry_map:coil.steel_rock_eutectic", amount: 8 },
			{ type: "starry_map:steel_rock_eutectic", amount: 8 },
			{ type: "starry_map:chorus_picture", amount: 1 },
		],
		attrition: [
			{ type: "starry_map:magic_handbook", amount: 1 },
		],
		rely: [
			'trophy:stage_1.contract.crystal',
			'trophy:stage_3',
		],
		onDone: [
			'trophy:stage_4',
			'trophy:stage_4.magic_crystal_books.magic_handbook'
		],
		prompt: '魔导工业的启动基础'
	}
);
entry.set('收集 魔导绪论',
	{
		texture: 'textures/物品贴图/魔法书籍/魔导绪论',
		refer: [
			{ text: "『§l§m 任务 §r』§l:\n" },
			{ text: "制作或获得<§l§u 魔导绪论 §r§l>§r\n\n" },
			{ text: "『§l§s 奖励 §r』§l:\n" },
			{ text: "<§l§u 百灵绘卷 §r§l><§l§2 8 §9x§u 钢岩合金-套装 §r§l>§r" }
		],
		reward: [
			{ type: "starry_map:wafer.steel_rock_eutectic", amount: 8 },
			{ type: "starry_map:coil.steel_rock_eutectic", amount: 8 },
			{ type: "starry_map:steel_rock_eutectic", amount: 8 },
			{ type: "starry_map:chorus_picture", amount: 1 },
		],
		attrition: [
			{ type: "starry_map:introduction_magic", amount: 1 },
		],
		rely: [
			'trophy:stage_1.contract.crystal',
			'trophy:stage_3',
		],
		onDone: [
			'trophy:stage_4',
			'trophy:stage_4.magic_crystal_books.introduction_magic'
		],
		prompt: '魔导工业的启动基础'
	}
);
entry.set('收集 农业纲目',
	{
		texture: 'textures/物品贴图/魔法书籍/农业纲目',
		refer: [
			{ text: "『§l§m 任务 §r』§l:\n" },
			{ text: "制作或获得<§l§u 农业纲目 §r§l>§r\n\n" },
			{ text: "『§l§s 奖励 §r』§l:\n" },
			{ text: "<§l§u 百灵绘卷 §r§l><§l§2 8 §9x§u 钢岩合金-套装 §r§l>§r" }
		],
		reward: [
			{ type: "starry_map:wafer.steel_rock_eutectic", amount: 8 },
			{ type: "starry_map:coil.steel_rock_eutectic", amount: 8 },
			{ type: "starry_map:steel_rock_eutectic", amount: 8 },
			{ type: "starry_map:chorus_picture", amount: 1 },
		],
		attrition: [
			{ type: "starry_map:agriculture_handle", amount: 1 },
		],
		rely: [
			'trophy:stage_1.contract.crystal',
			'trophy:stage_3',
		],
		onDone: [
			'trophy:stage_4',
			'trophy:stage_4.magic_crystal_books.agriculture_handle'
		]
	}
);
entry.set('收集 源能秘典',
	{
		texture: 'textures/物品贴图/魔法书籍/源能秘典',
		refer: [
			{ text: "『§l§m 任务 §r』§l:\n" },
			{ text: "制作或获得<§l§u 源能秘典 §r§l>§r\n\n" },
			{ text: "『§l§s 奖励 §r』§l:\n" },
			{ text: "<§l§u 百灵绘卷 §r§l><§l§2 8 §9x§u 钢岩合金-套装 §r§l>§r" }
		],
		reward: [
			{ type: "starry_map:wafer.steel_rock_eutectic", amount: 8 },
			{ type: "starry_map:coil.steel_rock_eutectic", amount: 8 },
			{ type: "starry_map:steel_rock_eutectic", amount: 8 },
			{ type: "starry_map:chorus_picture", amount: 1 },
		],
		attrition: [
			{ type: "starry_map:source_energy", amount: 1 },
		],
		rely: [
			'trophy:stage_1.contract.crystal',
			'trophy:stage_3',
		],
		onDone: [
			'trophy:stage_4',
			'trophy:stage_4.magic_crystal_books.source_energy'
		],
		prompt: '魔导工业的启动基础'
	}
);
entry.set('收集 战术规划',
	{
		texture: 'textures/物品贴图/魔法书籍/战术规划',
		refer: [
			{ text: "『§l§m 任务 §r』§l:\n" },
			{ text: "制作或获得<§l§u 战术规划 §r§l>§r\n\n" },
			{ text: "『§l§s 奖励 §r』§l:\n" },
			{ text: "<§l§u 百灵绘卷 §r§l><§l§2 8 §9x§u 钢岩合金-套装 §r§l>§r" }
		],
		reward: [
			{ type: "starry_map:wafer.steel_rock_eutectic", amount: 8 },
			{ type: "starry_map:coil.steel_rock_eutectic", amount: 8 },
			{ type: "starry_map:steel_rock_eutectic", amount: 8 },
			{ type: "starry_map:chorus_picture", amount: 1 },
		],
		attrition: [
			{ type: "starry_map:tactical_planning", amount: 1 },
		],
		rely: [
			'trophy:stage_1.contract.crystal',
			'trophy:stage_3',
		],
		onDone: [
			'trophy:stage_4',
			'trophy:stage_4.magic_crystal_books.tactical_planning'
		]
	}
);
entry.set('至纯 魔晶铠甲',
	{
		texture: 'textures/物品贴图/魔晶铠甲/至纯',
		refer: [
			{ text: "『§l§m 任务 §r』§l:\n" },
			{ text: "制作或获得<§l§u 至纯魔晶铠甲 §r§l>§r\n\n" },
			{ text: "『§l§s 奖励 §r』§l:\n" },
			{ text: "<§l§u 至纯魔晶铠甲 §r§l><§l§u 百灵绘卷 §r§l><§l§2 3 §9x§u 参悟之石 §r§l>§r" }
		],
		reward: [
			{ type: "starry_map:enlightenment", amount: 3 },
			{ type: "starry_map:chorus_picture", amount: 1 },
			{ type: "starry_map:complete_armor", amount: 1 }
		],
		attrition: [
			{ type: "starry_map:complete_armor", amount: 1 }
		],
		rely: [
			'trophy:stage_0.super_wasp_cluster_raid',
			'trophy:stage_1.contract.moonlight',
			'trophy:stage_1.contract.crystal',
			'trophy:stage_3',
		],
		onDone: [
			'trophy:stage_4',
			'trophy:stage_4.magic_crystal_armor_lv5'
		]
	}
);
/*
 * 探索环境
 */
entry.set('抵达 终末之地',
	{
		texture: 'textures/blocks/end_stone',
		refer: [
			{ text: "『§l§m 任务 §r』§l:\n" },
			{ text: '获得§2 32 §r个<§t 末地石 §r>证明曾抵达<§t 末地 §r>\n\n' },
			{ text: "『§l§s 奖励 §r』§l:\n" },
			{ text: "<§l§2 2 §9x§u 诸界道标 §r§l><§l§u 百灵绘卷 §r§l>§r" }
		],
		reward: [
			{ type: "starry_map:chorus_picture", amount: 1 },
			{ type: "starry_map:road_sign_presets", amount: 2 }
		],
		attrition: [
			{ type: "minecraft:end_stone", amount: 32 },
		],
		rely: [
			'trophy:stage_0.ender_dragon_scales',
			'trophy:stage_4'
		],
		onDone: [
			'trophy:stage_5',
			'trophy:stage_5.arrival.the_end'
		]
	}
);
entry.set('抵达 猩红深界',
	{
		texture: 'textures/blocks/netherrack',
		refer: [
			{ text: "『§l§m 任务 §r』§l:\n" },
			{ text: '获得§2 32 §r个<§t 下界岩 §r>证明曾抵达<§t 下界 §r>\n\n' },
			{ text: "『§l§s 奖励 §r』§l:\n" },
			{ text: "<§l§2 2 §9x§u 诸界道标 §r§l><§l§u 百灵绘卷 §r§l>§r" }
		],
		reward: [
			{ type: "starry_map:chorus_picture", amount: 1 },
			{ type: "starry_map:road_sign_presets", amount: 2 }
		],
		attrition: [
			{ type: "minecraft:netherrack", amount: 32 }
		],
		rely: [
			'trophy:stage_0.ender_dragon_scales',
			'trophy:stage_4'
		],
		onDone: [
			'trophy:stage_5',
			'trophy:stage_5.arrival.nether'
		]
	}
);
entry.set('抵达 海洋神殿',
	{
		texture: 'textures/blocks/prismarine_bricks',
		refer: [
			{ text: "『§l§m 任务 §r』§l:\n" },
			{ text: '获得§2 32 §r个<§t 海晶石 §r>证明曾抵达<§t 海洋神殿 §r>\n\n' },
			{ text: "『§l§s 奖励 §r』§l:\n" },
			{ text: "<§l§2 2 §9x§u 诸界道标 §r§l><§l§u 百灵绘卷 §r§l>§r" }
		],
		reward: [
			{ type: "starry_map:chorus_picture", amount: 1 },
			{ type: "starry_map:road_sign_presets", amount: 2 }
		],
		attrition: [
			{ type: "minecraft:prismarine", amount: 32 }
		],
		rely: [
			'trophy:stage_0.ender_dragon_scales',
			'trophy:stage_4'
		],
		onDone: [
			'trophy:stage_5',
			'trophy:stage_5.arrival.ocean'
		]
	}
);
entry.set('抵达 深暗之地',
	{
		texture: 'textures/blocks/sculk_catalyst_side',
		refer: [
			{ text: "『§l§m 任务 §r』§l:\n" },
			{ text: '获得§2 32 §r个<§t 幽匿块 §r>证明曾抵达<§t 深谙之地 §r>\n\n' },
			{ text: "『§l§s 奖励 §r』§l:\n" },
			{ text: "<§l§2 2 §9x§u 诸界道标 §r§l><§l§u 百灵绘卷 §r§l>§r" }
		],
		reward: [
			{ type: "starry_map:chorus_picture", amount: 1 },
			{ type: "starry_map:road_sign_presets", amount: 2 }
		],
		attrition: [
			{ type: "minecraft:sculk", amount: 32 },
		],
		rely: [
			'trophy:stage_0.ender_dragon_scales',
			'trophy:stage_4'
		],
		onDone: [
			'trophy:stage_5',
			'trophy:stage_5.arrival.sculk'
		]
	}
);
entry.set('收集 富氧金矿',
	{
		texture: 'textures/方块贴图/富氧金矿',
		refer: [
			{ text: "『§l§m 任务 §r』§l:\n" },
			{ text: "制作或获得<§l§u 富氧金矿 §r§l>§r\n\n" },
			{ text: "『§l§s 奖励 §r』§l:\n" },
			{ text: "<§l§u 机械框架 §r§l>§r" }
		],
		reward: [
			{ type: "starry_map:universal_mechanical_framework", amount: 1 },
		],
		attrition: [
			{ type: "starry_map:mine.oxygen_enriched_gold", amount: 1 },
		],
		rely: [
			'trophy:stage_4'
		],
		onDone: [
			'trophy:stage_5.mineral_blocks.oxygen_enriched_gold'
		]
	}
);
entry.set('收集 磷酸铁矿',
	{
		texture: 'textures/方块贴图/磷酸铁矿',
		refer: [
			{ text: "『§l§m 任务 §r』§l:\n" },
			{ text: "制作或获得<§l§u 磷酸铁矿 §r§l>§r\n\n" },
			{ text: "『§l§s 奖励 §r』§l:\n" },
			{ text: "<§l§u 机械框架 §r§l>§r" }
		],
		reward: [
			{ type: "starry_map:universal_mechanical_framework", amount: 1 },
		],
		attrition: [
			{ type: "starry_map:mine.ferric_phosphate", amount: 1 },
		],
		rely: [
			'trophy:stage_4'
		],
		onDone: [
			'trophy:stage_5.mineral_blocks.ferric_phosphate'
		]
	}
);
entry.set('收集 铝镁金矿',
	{
		texture: 'textures/方块贴图/铝镁金矿',
		refer: [
			{ text: "『§l§m 任务 §r』§l:\n" },
			{ text: "制作或获得<§l§u 铝镁金矿 §r§l>§r\n\n" },
			{ text: "『§l§s 奖励 §r』§l:\n" },
			{ text: "<§l§u 机械框架 §r§l>§r" }
		],
		reward: [
			{ type: "starry_map:universal_mechanical_framework", amount: 1 },
		],
		attrition: [
			{ type: "starry_map:mine.aluminum_magnesium", amount: 1 },
		],
		rely: [
			'trophy:stage_4'
		],
		onDone: [
			'trophy:stage_5.mineral_blocks.aluminum_magnesium'
		]
	}
);
entry.set('收集 氯化铁矿',
	{
		texture: 'textures/方块贴图/氯化铁矿',
		refer: [
			{ text: "『§l§m 任务 §r』§l:\n" },
			{ text: "制作或获得<§l§u 氯化铁矿 §r§l>§r\n\n" },
			{ text: "『§l§s 奖励 §r』§l:\n" },
			{ text: "<§l§u 机械框架 §r§l>§r" }
		],
		reward: [
			{ type: "starry_map:universal_mechanical_framework", amount: 1 },
		],
		attrition: [
			{ type: "starry_map:mine.ferric_chloride", amount: 1 },
		],
		rely: [
			'trophy:stage_4'
		],
		onDone: [
			'trophy:stage_5.mineral_blocks.ferric_chloride'
		]
	}
);
entry.set('收集 碳化锆矿',
	{
		texture: 'textures/方块贴图/碳化锆矿',
		refer: [
			{ text: "『§l§m 任务 §r』§l:\n" },
			{ text: "制作或获得<§l§u 碳化锆矿 §r§l>§r\n\n" },
			{ text: "『§l§s 奖励 §r』§l:\n" },
			{ text: "<§l§u 机械框架 §r§l>§r" }
		],
		reward: [
			{ type: "starry_map:universal_mechanical_framework", amount: 1 },
		],
		attrition: [
			{ type: "starry_map:mine.zirconium_carbide", amount: 1 },
		],
		rely: [
			'trophy:stage_4'
		],
		onDone: [
			'trophy:stage_5.mineral_blocks.zirconium_carbide'
		]
	}
);
entry.set('收集 碳酸金矿',
	{
		texture: 'textures/方块贴图/碳酸金矿',
		refer: [
			{ text: "『§l§m 任务 §r』§l:\n" },
			{ text: "制作或获得<§l§u 碳酸金矿 §r§l>§r\n\n" },
			{ text: "『§l§s 奖励 §r』§l:\n" },
			{ text: "<§l§u 机械框架 §r§l>§r" }
		],
		reward: [
			{ type: "starry_map:universal_mechanical_framework", amount: 1 },
		],
		attrition: [
			{ type: "starry_map:mine.gold_carbonate", amount: 1 },
		],
		rely: [
			'trophy:stage_4'
		],
		onDone: [
			'trophy:stage_5.mineral_blocks.gold_carbonate'
		]
	}
);
entry.set('收集 碳酸锂矿',
	{
		texture: 'textures/方块贴图/碳酸锂矿',
		refer: [
			{ text: "『§l§m 任务 §r』§l:\n" },
			{ text: "制作或获得<§l§u 碳酸锂矿 §r§l>§r\n\n" },
			{ text: "『§l§s 奖励 §r』§l:\n" },
			{ text: "<§l§u 机械框架 §r§l>§r" }
		],
		reward: [
			{ type: "starry_map:universal_mechanical_framework", amount: 1 },
		],
		attrition: [
			{ type: "starry_map:mine.lithium_carbonate", amount: 1 },
		],
		rely: [
			'trophy:stage_4'
		],
		onDone: [
			'trophy:stage_5.mineral_blocks.lithium_carbonate'
		]
	}
);
entry.set('收集 钨镍钛矿',
	{
		texture: 'textures/方块贴图/钨镍钛矿',
		refer: [
			{ text: "『§l§m 任务 §r』§l:\n" },
			{ text: "制作或获得<§l§u 钨镍钛矿 §r§l>§r\n\n" },
			{ text: "『§l§s 奖励 §r』§l:\n" },
			{ text: "<§l§u 机械框架 §r§l>§r" }
		],
		reward: [
			{ type: "starry_map:universal_mechanical_framework", amount: 1 },
		],
		attrition: [
			{ type: "starry_map:mine.tungsten_nickel_titanium", amount: 1 },
		],
		rely: [
			'trophy:stage_4'
		],
		onDone: [
			'trophy:stage_5.mineral_blocks.tungsten_nickel_titanium'
		]
	}
);
entry.set('收集 锡钎铜矿',
	{
		texture: 'textures/方块贴图/锡钎铜矿',
		refer: [
			{ text: "『§l§m 任务 §r』§l:\n" },
			{ text: "制作或获得<§l§u 锡钎铜矿 §r§l>§r\n\n" },
			{ text: "『§l§s 奖励 §r』§l:\n" },
			{ text: "<§l§u 机械框架 §r§l>§r" }
		],
		reward: [
			{ type: "starry_map:universal_mechanical_framework", amount: 1 },
		],
		attrition: [
			{ type: "starry_map:mine.copper_tin_brazing", amount: 1 },
		],
		rely: [
			'trophy:stage_4'
		],
		onDone: [
			'trophy:stage_5.mineral_blocks.copper_tin_brazing'
		]
	}
);
/*
entry.set('收集 魔导总线',
	{
		texture: 'textures/项目图标/合成',
		refer: [
			{ text: "『§l§m 任务 §r』§l:\n" },
			{ text: "制作或获得<§l§2 16 §9x§u 魔导总线系列 §r§l>§r\n\n" },
			{ text: "『§l§s 奖励 §r』§l:\n" },
			{ text: "<§l§2 16 §9x§u 魔导总线系列 §r§l>§r\n" },
			{ text: "<§l§2 3 §9x§u 参悟之石 §r§l><§l§u 百灵绘卷 §r§l>§r" }
		],
		reward: [
			{type:"starry_map:servo_omphalos",amount: 3},
			{type:"starry_map:chorus_picture",amount: 1},
			{type:"starry_map:super_omphalos", amount: 16},
			{type:"starry_map:super_pulse", amount: 16},
			{type:"starry_map:enable_control", amount: 16},
			{type:"starry_map:redstone_detection", amount: 16},
			{type:"starry_map:basic_pipeline", amount: 16},
			{type:"starry_map:counting_module", amount: 16},
			{type:"starry_map:interactive_terminal", amount: 16},
			{type:"starry_map:logic_single", amount: 16},
			{type:"starry_map:logic_inverter", amount: 16},
			{type:"starry_map:exclusive_or", amount: 16},
			{type:"starry_map:logical_and", amount: 16},
			{type:"starry_map:pulse_latch", amount: 16},
			{type:"starry_map:signal_compilation", amount: 16},
			{type:"starry_map:signal_filtering", amount: 16},
			{type:"starry_map:signal_conversion", amount: 16},
			{type:"starry_map:cable_port", amount: 16},
		],
		attrition: [
			{type:"starry_map:super_omphalos", amount: 16},
			{type:"starry_map:super_pulse", amount: 16},
			{type:"starry_map:enable_control", amount: 16},
			{type:"starry_map:redstone_detection", amount: 16},
			{type:"starry_map:basic_pipeline", amount: 16},
			{type:"starry_map:counting_module", amount: 16},
			{type:"starry_map:interactive_terminal", amount: 16},
			{type:"starry_map:logic_single", amount: 16},
			{type:"starry_map:logic_inverter", amount: 16},
			{type:"starry_map:exclusive_or", amount: 16},
			{type:"starry_map:logical_and", amount: 16},
			{type:"starry_map:pulse_latch", amount: 16},
			{type:"starry_map:signal_compilation", amount: 16},
			{type:"starry_map:signal_filtering", amount: 16},
			{type:"starry_map:signal_conversion", amount: 16},
			{type:"starry_map:cable_port", amount: 16},
		],
		rely: [
			'trophy:flee.wasp_tower',
			'trophy:call.house'
		],
		onDone: [
			'trophy:make.block_cable'
		]
	}
);
entry.set('布局 宏伟大业',
	{
		texture: 'textures/项目图标/合成书',
		refer: [
			{ text: "『§l§m 任务 §r』§l:\n" },
			{ text: '制作或获得<§l§2 4 §9x§u 驱动核心 §r§l>§r\n\n' },
			{ text: "『§l§s 奖励 §r』§l:\n" },
			{ text: "<§l§2 4 §9x§u 驱动核心 §r§l><§l§2 16 §9x§u 虚空方块 §r§l>§r" }
		],
		reward: [
			{type:"starry_map:servo_omphalos",amount: 4},
			{type:"starry_map:nihility_space_block", amount: 16},
		],
		attrition: [
			{type:"starry_map:servo_omphalos",amount: 4}
		],
		rely: [
			'trophy:flee.wasp_tower',
			'trophy:call.house'
		],
		onDone: [
			'trophy:make.omphalos_4'
		]
	}
);
entry.set('共筑 山海挪移',
	{
		texture: 'textures/项目图标/合成书',
		refer: [
			{ text: "『§l§m 任务 §r』§l:\n" },
			{ text: '制作或获得<§l§2 16 §9x§u 驱动核心 §r§l>§r\n\n' },
			{ text: "『§l§s 奖励 §r』§l:\n" },
			{ text: "<§l§2 16 §9x§u 驱动核心 §r§l><§l§2 8 §9x§u 恒常储罐 §r§l><§l§u 百灵绘卷 §r§l>§r" }
		],
		reward: [
			{type:"starry_map:servo_omphalos", amount: 16},
			{type:"starry_map:chorus_picture",amount: 1},
			{type:"starry_map:constant_tank",amount: 8},
		],
		attrition: [
			{type:"starry_map:servo_omphalos", amount: 16}
		],
		rely: [
			'trophy:flee.wasp_tower',
			'trophy:call.house'
		],
		onDone: [
			'trophy:make.omphalos_16'
		]
	}
);
entry.set('初试 物流规划',
	{
		texture: 'textures/项目图标/合成书',
		refer: [
			{ text: "『§l§m 任务 §r』§l:\n" },
			{ text: '制作或获得<§l§2 4 §9x§u 伺服基座 §r§l><§l§2 4 §9x§u 伺服牵引 §r§l>§r\n\n' },
			{ text: "『§l§s 奖励 §r』§l:\n" },
			{ text: "<§l§2 4 §9x§u 伺服基座 §r§l><§l§2 4 §9x§u 伺服牵引 §r§l><§l§2 4 §9x§u 参数设置 §r§l>§r" }
		],
		reward: [
			{type:"starry_map:servo_susceptor",amount: 4},
			{type:"starry_map:servo_parameter",amount: 4},
			{type:"starry_map:servo_traction",amount: 4},
		],
		attrition: [
			{type:"starry_map:servo_susceptor",amount: 4},
			{type:"starry_map:servo_traction",amount: 4},
		],
		rely: [
			'trophy:flee.wasp_tower',
			'trophy:call.house'
		],
		onDone: [
			'trophy:make.drive_4'
		]
	}
);
entry.set('缔造 物流大亨',
	{
		texture: 'textures/项目图标/合成书',
		refer: [
			{ text: "『§l§m 任务 §r』§l:\n" },
			{ text: '制作或获得<§l§2 24 §9x§u 伺服基座 §r§l><§l§2 24 §9x§u 伺服牵引 §r§l>§r\n\n' },
			{ text: "『§l§s 奖励 §r』§l:\n" },
			{ text: "<§l§2 24 §9x§u 伺服基座 §r§l><§l§2 24 §9x§u 伺服牵引 §r§l><§l§2 2 §9x§u 恒常储罐 §r§l>§r" }
		],
		reward: [
			{type:"starry_map:constant_tank", amount: 2},
			{type:"starry_map:servo_susceptor", amount: 24},
			{type:"starry_map:servo_traction", amount: 24},
		],
		attrition: [
			{type:"starry_map:servo_susceptor", amount: 24},
			{type:"starry_map:servo_traction", amount: 24},
		],
		rely: [
			'trophy:flee.wasp_tower',
			'trophy:call.house'
		],
		onDone: [
			'trophy:make.drive_16'
		]
	}
);
*/
export default entry;