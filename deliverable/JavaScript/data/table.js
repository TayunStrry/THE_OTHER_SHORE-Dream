import { MinecraftColor } from "../system/maths";
/**
 * * 类型检测 - 矿石
 *
 * @type {Set<string>}
 */
export const is_mineral = new Set([
    "minecraft:coal_ore",
    "minecraft:iron_ore",
    "minecraft:gold_ore",
    "minecraft:lapis_ore",
    "minecraft:copper_ore",
    "minecraft:quartz_ore",
    "minecraft:diamond_ore",
    "minecraft:emerald_ore",
    "minecraft:redstone_ore",
    "minecraft:ancient_debris",
    "minecraft:raw_iron_block",
    "minecraft:raw_gold_block",
    "minecraft:nether_gold_ore",
    "minecraft:lit_redstone_ore",
    "minecraft:amethyst_cluster",
    "minecraft:raw_copper_block",
    "starry_map:mine.gold_carbonate",
    "minecraft:deepslate_coal_ore",
    "minecraft:deepslate_iron_ore",
    "minecraft:deepslate_gold_ore",
    "starry_map:mine.ferric_chloride",
    "minecraft:deepslate_lapis_ore",
    "starry_map:mine.ferric_phosphate",
    "minecraft:deepslate_copper_ore",
    "starry_map:mine.zirconium_carbide",
    "starry_map:mine.lithium_carbonate",
    "minecraft:deepslate_diamond_ore",
    "minecraft:deepslate_emerald_ore",
    "starry_map:mine.aluminum_magnesium",
    "starry_map:mine.copper_tin_brazing",
    "minecraft:deepslate_redstone_ore",
    "starry_map:steel_rock_eutectic",
    "starry_map:mine.oxygen_enriched_gold",
    "starry_map:tungsten_copper_alloy",
    "minecraft:lit_deepslate_redstone_ore",
    "starry_map:mine.tungsten_nickel_titanium"
]);
/**
 * * 类型检测 - 树木
 *
 * @type {Set<string>}
 */
export const is_trees = new Set([
    "minecraft:vine",
    "minecraft:oak_log",
    "minecraft:bee_nest",
    "minecraft:birch_log",
    "minecraft:spruce_log",
    "minecraft:jungle_log",
    "minecraft:acacia_log",
    "minecraft:cherry_log",
    "minecraft:oak_leaves",
    "minecraft:warped_stem",
    "minecraft:shroomlight",
    "minecraft:dark_oak_log",
    "minecraft:mangrove_log",
    "minecraft:crimson_stem",
    "minecraft:birch_leaves",
    "minecraft:chorus_plant",
    "minecraft:spruce_leaves",
    "minecraft:jungle_leaves",
    "minecraft:acacia_leaves",
    "minecraft:cherry_leaves",
    "minecraft:azalea_leaves",
    "minecraft:chorus_flower",
    "minecraft:mangrove_roots",
    "minecraft:dark_oak_leaves",
    "minecraft:mangrove_leaves",
    "minecraft:nether_wart_block",
    "minecraft:warped_wart_block",
    "minecraft:red_mushroom_block",
    "minecraft:brown_mushroom_block",
    "minecraft:azalea_leaves_flowered"
]);
/**
 * * 类型检测 - 原木
 *
 * @type {Set<string>}
 */
export const is_wood = new Set([
    "minecraft:oak_log", // 橡木原木
    "minecraft:spruce_log", // 云杉原木
    "minecraft:birch_log", // 白桦原木
    "minecraft:jungle_log", // 从林原木
    "minecraft:acacia_log", // 金合欢原木
    "minecraft:dark_oak_log", // 深色橡树原木
    "minecraft:mangrove_log", // 红杉原木
    "minecraft:cherry_log", // 樱花原木
    "minecraft:crimson_stem", // 绯红菌柄
    "minecraft:warped_stem" // 扭曲菌柄
]);
/**
 * * 类型检测 - 农产品
 *
 * @type {Map<string, string | boolean>}
 */
export const is_crops = new Map([
    ["minecraft:bamboo", true],
    ["minecraft:pumpkin", true],
    ["minecraft:oak_log", true],
    ["minecraft:birch_log", true],
    ["minecraft:sugar_cane", true],
    ["minecraft:spruce_log", true],
    ["minecraft:jungle_log", true],
    ["minecraft:acacia_log", true],
    ["minecraft:cherry_log", true],
    ["minecraft:melon_block", true],
    ["minecraft:warped_stem", true],
    ["minecraft:chorus_plant", true],
    ["minecraft:dark_oak_log", true],
    ["minecraft:mangrove_log", true],
    ["minecraft:crimson_stem", true],
    ["minecraft:chorus_flower", true],
    ["minecraft:wheat", "test"],
    ["minecraft:cocoa", "test"],
    ["minecraft:carrots", "test"],
    ["minecraft:potatoes", "test"],
    ["minecraft:beetroot", "test"],
    ["minecraft:nether_wart", "test"],
    ["minecraft:oak_sapling", "test"],
    ["minecraft:warped_fungus", "test"],
    ["minecraft:birch_sapling", "test"],
    ["minecraft:crimson_fungus", "test"],
    ["minecraft:bamboo_sapling", "test"],
    ["minecraft:cherry_sapling", "test"],
    ["minecraft:spruce_sapling", "test"],
    ["minecraft:acacia_sapling", "test"],
    ["minecraft:jungle_sapling", "test"],
    ["minecraft:dark_oak_sapling", "test"],
    ["minecraft:sweet_berry_bush", "test"]
]);
/**
 * * 每提升一级, 需要多少经验
 */
export const experience_improve = 64;
/**
 * * 最大经验值
 */
export const max_experience = 100;
/**
 * * 实体元素抗性
 */
export const rune_resistance = 0.75;
/**
 * * 实体属性 - 战斗属性
 */
export const battle_property = new Map([
    //* 野蜂机群
    ["starry_map:wild_bee.emperor", { basic_attack: 20, erupt_hurt: 500, self_rune: "rune_red" }],
    ["starry_map:wild_bee.guide", { basic_attack: 10, self_rune: "rune_red" }],
    ["starry_map:wild_bee.detection", { self_rune: "rune_red" }],
    //* 渊鲸潜艇
    ["starry_map:abyss_whale.emperor", { basic_attack: 35, erupt_odds: 40, erupt_hurt: 500, self_rune: "rune_blue" }],
    ["starry_map:abyss_whale.detection", { erupt_odds: 30, self_rune: "rune_blue" }],
    ["starry_map:abyss_whale.execute", { erupt_odds: 30, self_rune: "rune_blue" }],
    ["starry_map:abyss_whale.support", { erupt_odds: 45, self_rune: "rune_blue" }],
    //* 蝰蛇车队
    ["starry_map:viper.sentinel", { basic_attack: 10, erupt_odds: 45, erupt_hurt: 500, self_rune: "rune_orange" }],
    ["starry_map:viper.spirit_lizard", { erupt_odds: 5, self_rune: "rune_orange" }],
    ["starry_map:viper.support", { erupt_odds: 30, self_rune: "rune_orange" }],
    //* 神恩领航者
    ["starry_map:guide.windnews", { basic_attack: 30, erupt_odds: 15, erupt_hurt: 500, self_rune: "rune_blue" }],
    ["starry_map:guide.snow_hidden", { basic_attack: 10, erupt_odds: 20, self_rune: "rune_blue" }],
    ["starry_map:guide.moon_light", { basic_attack: 10, erupt_odds: 20, self_rune: "rune_white" }],
    ["starry_map:guide.crystal", { basic_attack: 10, erupt_odds: 20, self_rune: "rune_orange" }],
    ["starry_map:guide.rambler", { basic_attack: 10, erupt_odds: 20, self_rune: "rune_purple" }],
    ["starry_map:guide.dullblue", { basic_attack: 10, erupt_odds: 20, self_rune: "rune_blue" }],
    ["starry_map:guide.nine_nine", { basic_attack: 10, erupt_odds: 20, self_rune: "rune_purple" }],
    ["starry_map:guide.hai_ling", { basic_attack: 10, erupt_odds: 20, self_rune: "rune_green" }],
    ["starry_map:guide.sen_nie", { basic_attack: 10, erupt_odds: 20, self_rune: "rune_green" }],
    ["starry_map:guide.star_sand", { basic_attack: 10, erupt_odds: 20, self_rune: "rune_red" }],
    ["starry_map:guide.crimson", { basic_attack: 10, erupt_odds: 20, self_rune: "rune_red" }],
    ["starry_map:guide.hai_na", { basic_attack: 10, erupt_odds: 20, self_rune: "rune_blue" }],
    ["starry_map:guide.pearl", { basic_attack: 10, erupt_odds: 20, self_rune: "rune_blue" }],
    ["starry_map:guide.moling", { basic_attack: 10, erupt_odds: 20, self_rune: "rune_red" }],
    ["starry_map:guide.dawn_glow", { basic_attack: 10, erupt_odds: 20, self_rune: 'rune_orange' }],
    ["starry_map:guide.skypeace", { basic_attack: 10, erupt_odds: 20, self_rune: 'rune_purple' }],
    ["starry_map:guide.ella", { basic_attack: 10, erupt_odds: 20, self_rune: 'rune_green' }],
    //* 万法溯源
    ["starry_map:elves.jellyfish_of_pearl", { self_rune: "rune_blue" }],
    ["starry_map:elves.three_phase_flame", { self_rune: 'rune_red' }],
    ["starry_map:elves.fish_of_pearl", { self_rune: "rune_blue" }],
    //* 御空之旅
    ["starry_map:execute.golden_wing", { self_rune: 'rune_purple' }],
    ["starry_map:execute.rattan_arc", { self_rune: 'rune_blue' }],
    ["starry_map:execute.basalt", { self_rune: 'rune_red' }],
    //* 敌对领航者
    ["starry_map:guide.jasmine", { erupt_odds: 40, erupt_hurt: 320, self_rune: 'rune_green' }],
    ["starry_map:guide.amber", { erupt_odds: 40, erupt_hurt: 320, self_rune: 'rune_green' }],
    //* 古龙
    ["minecraft:ender_dragon", { erupt_odds: 60, erupt_hurt: 480, self_rune: "rune_purple" }],
    ["starry_map:dragon.tyrannosaurus_rex", { erupt_odds: 60, erupt_hurt: 480, self_rune: "rune_purple" }],
]);
/**
 * * 实体数据 - 名称映射
 */
export const name_mapping = new Map([
    ['starry_map:tunnel_dragon', '§u§l隧龙-领航者§r'],
    ['starry_map:viper.sentinel', '§u§l森蚺-哨兵炮§r'],
    ['starry_map:abyss_whale.support', '§u§l渊鲸-维系者§r'],
    ['starry_map:guide.snow_hidden', '§n§o§l领航者-雪隐§r'],
    ['starry_map:guide.moon_light', '§n§o§l领航者-月华§r'],
    ['starry_map:guide.star_sand', '§n§o§l领航者-星砂§r'],
    ['starry_map:guide.dullblue', '§n§o§l领航者-幽蓝§r'],
    ['starry_map:guide.nine_nine', '§n§o§l领航者-九九§r'],
    ['starry_map:guide.windnews', '§n§o§l领航者-风信§r'],
    ['starry_map:execute.roaring', '§n§o§l执行者-啸天§r'],
    ['starry_map:guide.crystal', '§n§o§l领航者-琉璃§r'],
    ['starry_map:guide.rambler', '§n§o§l领航者-蔷薇§r'],
    ['starry_map:guide.hai_ling', '§n§o§l领航者-海灵§r'],
    ['starry_map:guide.crimson', '§n§o§l领航者-绯红§r'],
    ['starry_map:guide.sen_nie', '§n§o§l领航者-森涅§r'],
    ['starry_map:guide.hai_na', '§n§o§l领航者-海娜§r'],
    ['starry_map:guide.pearl', '§n§o§l领航者-珍珠§r'],
    ['starry_map:guide.moling', '§n§o§l领航者-墨翎§r'],
    ['starry_map:guide.dawn_glow', '§n§o§l领航者-晨曦§r'],
    ['starry_map:guide.skypeace', '§n§o§l领航者-天宁§r'],
    ['starry_map:guide.ella', '§n§o§l领航者-艾拉§r'],
    ['starry_map:elves.jellyfish_of_pearl', '§6珍珠水母§r'],
    ['starry_map:elves.fish_of_pearl', '§6珍珠游鱼§r'],
    ['starry_map:viper.spirit_lizard', '§u§l灵蜥-铭记者§r'],
    ['starry_map:execute.golden_wing', '§t§l星图-金翼使§r'],
    ['starry_map:execute.rattan_arc', '§t§l星图-藤弧§r'],
]);
/**
 * * 实体数据 - 重置属性
 */
export const reset_battle_data = {
    raise_basic_attack: 0,
    raise_erupt_hurt: 0,
    raise_erupt_odds: 0,
    damage_increase: 0,
    double_damage: 1,
};
/**
 * * 实体数据 - 显示偏移
 *
 * @property (typeid, offset)
 *
 * @param {string} typeid - 实体 的 typeid
 *
 * @param {number} offse - 偏移显示 的 基准距离
 */
export const offset_show = new Map([
    ["minecraft:iron_golem", 3.0], //* 铁傀儡
    ["minecraft:ravager", 3.0], //* 劫掠兽
    ["minecraft:warden", 3.5], //* 监守者
    ["minecraft:wither", 3.5] //* 凋零
]);
/**
 * * 实体数据 - 百灵绘卷召唤索引
 *
 * @property (typeid, weight)
 *
 * @param {string} typeid - 实体 的 typeid
 *
 * @param {number} weight - 选择生成 该实体 的 权重
 */
export const chorus_call_role = new Map([
    ['starry_map:guide.ella', 3],
    ["starry_map:guide.pearl", 3],
    ["starry_map:guide.hai_na", 3],
    ['starry_map:guide.moling', 3],
    ["starry_map:guide.sen_nie", 3],
    ["starry_map:guide.crimson", 3],
    ["starry_map:guide.crystal", 3],
    ["starry_map:guide.rambler", 3],
    ['starry_map:guide.skypeace', 3],
    ["starry_map:guide.hai_ling", 3],
    ["starry_map:guide.dullblue", 3],
    ["starry_map:execute.roaring", 3],
    ["starry_map:guide.nine_nine", 3],
    ["starry_map:guide.star_sand", 3],
    ["starry_map:guide.moon_light", 3],
    ["starry_map:guide.snow_hidden", 3],
    ['starry_map:guide.dawn_glow', 1],
]);
/**
 * * 实体数据 - 治疗型角色
 *
 * @property (typeid, weight)
 *
 * @param {string} typeid - 实体 的 typeid
 *
 * @param {number} weight - 选择生成 该实体 的 权重
 */
export const call_healer_role = new Map([
    ["starry_map:guide.hai_ling", 1], //* 海灵
    ["starry_map:guide.crimson", 2], //* 绯红
    ["starry_map:guide.pearl", 1], //* 珍珠
]);
/**
 * * 实体数据 - 增伤型角色
 *
 * @property (typeid, weight)
 *
 * @param {string} typeid - 实体 的 typeid
 *
 * @param {number} weight - 选择生成 该实体 的 权重
 */
export const call_fortify_role = new Map([
    ["starry_map:guide.dullblue", 1], //* 幽蓝
    ["starry_map:guide.rambler", 2], //* 蔷薇
]);
/**
 * * 实体数据 - 地方传奇
 *
 * @note 能够掉落 百灵绘卷 的实体
 *
 * @property (typeid, odds)
 *
 * @param {string} typeid - 实体 的 typeid
 *
 * @param {number} odds - 掉落 百灵绘卷 的 概率
 */
export const area_legend = new Map([
    ["minecraft:wither", 100],
    ["minecraft:warden", 100],
    ["minecraft:ravager", 30],
    ["minecraft:piglin_brute", 50],
    ["minecraft:ender_dragon", 100],
    ["minecraft:elder_guardian", 100],
    ["starry_map:wild_bee.guide", 100],
    ["starry_map:wild_bee.emperor", 100],
    ["starry_map:guide.amber", 50],
    ["starry_map:abyss_whale.emperor", 100],
    ["starry_map:guide.jasmine", 100],
]);
/**
 * * 实体数据 - 野蜂机群袭击
 *
 * @property (typeid, weight)
 *
 * @param {string} typeid - 实体 的 typeid
 *
 * @param {number} weight - 选择生成 该实体 的 权重
 */
export const wasp_cluster_raid = new Map([
    ['starry_map:wild_bee.detection', 16],
    ['starry_map:wild_bee.support', 8],
    ['starry_map:viper.support', 2],
]);
/**
 * * 实体数据 - 领航者 主手 随机物品
 *
 * @property (typeid, weight)
 *
 * @param {string} typeid - 物品 的 typeid
 *
 * @param {number} weight - 选择生成 该物品 的 权重
 */
export const role_main_hand = new Map([
    ["starry_map:magic_crystal_screwdriver", 22],
    ["starry_map:forestry_guidelines", 22],
    ["starry_map:mineral_dictionary", 20],
    ["starry_map:stateful_inspection", 14],
    ["starry_map:space_transition", 18],
    ["starry_map:material_sorting", 10],
    ["starry_map:faerie_contract", 16],
    ["starry_map:magic_crystal_marbles", 16],
    ["starry_map:magic_crystal_wrench", 14],
    ["starry_map:faerie_healing", 14],
    ["starry_map:magic_handbook", 14],
    ["starry_map:inhibit_water", 8],
    ["starry_map:magic_crystal_bow", 12],
    ["minecraft:recovery_compass", 10],
    ["minecraft:iron_sword", 6],
    ["minecraft:compass", 4],
    ["minecraft:trident", 4],
    ["minecraft:clock", 2],
]);
/**
 * * 实体数据 - 领航者 副手 随机物品
 *
 * @property (typeid, weight)
 *
 * @param {string} typeid - 物品 的 typeid
 *
 * @param {number} weight - 选择生成 该物品 的 权重
 */
export const role_off_hand = new Map([
    ['starry_map:ender_dragon_scales', 4],
    ['starry_map:magic_crystal_shield', 6],
    ['minecraft:shield', 2],
]);
/**
 * * 实体数据 - 领航者 腿甲 随机物品
 *
 * @property (typeid, weight)
 *
 * @param {string} typeid - 物品 的 typeid
 *
 * @param {number} weight - 选择生成 该物品 的 权重
 */
export const role_armor_legs = new Map([
    ['starry_map:complete_armor', 10],
    ['starry_map:exhausted_armor', 10],
    ['starry_map:ocean_blessed_scarf', 5],
]);
/**
 * * 初级造石单元 的 随机石材产出
 *
 * @property (typeid, weight)
 *
 * @param {string} typeid - 石材 的 typeid
 *
 * @param {number} weight - 选择生成 石材 的 权重
 */
export const solidify_output = new Map([
    ["minecraft:tuff", 1],
    ["minecraft:stone", 40],
    ["minecraft:basalt", 1],
    ["minecraft:calcite", 1],
    ["minecraft:diorite", 9],
    ["minecraft:granite", 1],
    ["minecraft:andesite", 1],
    ["minecraft:deepslate", 1],
    ["minecraft:sandstone", 1],
    ["minecraft:blackstone", 1],
    ["minecraft:cobblestone", 80],
    ["minecraft:red_sandstone", 1],
    ["minecraft:dripstone_block", 1],
    ["minecraft:cobbled_deepslate", 1]
]);
/**
 * * 数据映射 - 农作物
 *
 * @property (typeid, mapping)
 *
 * @param {string} typeid - 农作物 的 物品类 typeid
 *
 * @param {string} mapping - 农作物 的 方块类 typeid
 */
export const crops_map = new Map([
    ["minecraft:potato", "minecraft:potatoes"],
    ["minecraft:carrot", "minecraft:carrots"],
    ["minecraft:sugar_cane", "minecraft:reeds"],
    ["minecraft:pitcher_pod", "minecraft:pitcher_crop"],
    ["minecraft:melon_seeds", "minecraft:melon_stem"],
    ["minecraft:wheat_seeds", "minecraft:wheat"],
    ["minecraft:sweet_berries", "minecraft:sweet_berry_bush"],
    ["minecraft:pumpkin_seeds", "minecraft:pumpkin_stem"],
    ["minecraft:cherry_sapling", "minecraft:cherry_sapling"],
    ["minecraft:beetroot_seeds", "minecraft:beetroot"],
    ["minecraft:bamboo_sapling", "minecraft:bamboo"],
    ["minecraft:torchflower_seeds", "minecraft:torchflower_crop"],
    ["minecraft:mangrove_propagule", "minecraft:mangrove_propagule"]
]);
/**
 * * 维度类型
 */
export const dimension_map = new Map([
    ['主世界', 'minecraft:overworld'],
    ['末地', 'minecraft:the_end'],
    ['下界', 'minecraft:nether'],
    ['地狱', 'minecraft:nether'],
]);
/**
 * * 群系类型
 */
export const biome_map = new Map([
    ["竹林", "minecraft:bamboo_jungle"],
    ["竹林丘陵", "minecraft:bamboo_jungle_hills"],
    ["玄武岩三角洲", "minecraft:basalt_deltas"],
    ["沙滩", "minecraft:beach"],
    ["桦木森林", "minecraft:birch_forest"],
    ["桦木森林丘陵", "minecraft:birch_forest_hills"],
    ["高大桦木丘陵", "minecraft:birch_forest_hills_mutated"],
    ["原始桦木森林", "minecraft:birch_forest_mutated"],
    ["樱花树林", "minecraft:cherry_grove"],
    ["积雪沙滩", "minecraft:cold_beach"],
    ["冷水海洋", "minecraft:cold_ocean"],
    ["积雪针叶林", "minecraft:cold_taiga"],
    ["积雪的针叶林丘陵", "minecraft:cold_taiga_hills"],
    ["积雪的针叶林山地", "minecraft:cold_taiga_mutated"],
    ["绯红森林", "minecraft:crimson_forest"],
    ["冷水深海", "minecraft:deep_cold_ocean"],
    ["深暗之域", "minecraft:deep_dark"],
    ["冰冻深海", "minecraft:deep_frozen_ocean"],
    ["温水深海", "minecraft:deep_lukewarm_ocean"],
    ["深海", "minecraft:deep_ocean"],
    ["暖水深海", "minecraft:deep_warm_ocean"],
    ["沙漠", "minecraft:desert"],
    ["沙漠丘陵", "minecraft:desert_hills"],
    ["沙漠湖泊", "minecraft:desert_mutated"],
    ["溶洞", "minecraft:dripstone_caves"],
    ["风袭丘陵", "minecraft:extreme_hills"],
    ["山地边缘", "minecraft:extreme_hills_edge"],
    ["风袭沙砾丘陵", "minecraft:extreme_hills_mutated"],
    ["风袭森林", "minecraft:extreme_hills_plus_trees"],
    ["沙砾山地+", "minecraft:extreme_hills_plus_trees_mutated"],
    ["繁花森林", "minecraft:flower_forest"],
    ["森林", "minecraft:forest"],
    ["繁茂的丘陵", "minecraft:forest_hills"],
    ["冻洋", "minecraft:frozen_ocean"],
    ["冰封山峰", "minecraft:frozen_peaks"],
    ["冻河", "minecraft:frozen_river"],
    ["雪林", "minecraft:grove"],
    ["下界荒地", "minecraft:hell"],
    ["雪山", "minecraft:ice_mountains"],
    ["雪原", "minecraft:ice_plains"],
    ["冰刺之地", "minecraft:ice_plains_spikes"],
    ["尖峭山峰", "minecraft:jagged_peaks"],
    ["丛林", "minecraft:jungle"],
    ["丛林边缘", "minecraft:jungle_edge"],
    ["丛林边缘变种", "minecraft:jungle_edge_mutated"],
    ["丛林丘陵", "minecraft:jungle_hills"],
    ["丛林变种", "minecraft:jungle_mutated"],
    ["冻洋（旧版）", "minecraft:legacy_frozen_ocean"],
    ["温水海洋", "minecraft:lukewarm_ocean"],
    ["繁茂洞穴", "minecraft:lush_caves"],
    ["红树林沼泽", "minecraft:mangrove_swamp"],
    ["草甸", "minecraft:meadow"],
    ["原始松木针叶林", "minecraft:mega_taiga"],
    ["巨型针叶林丘陵", "minecraft:mega_taiga_hills"],
    ["恶地", "minecraft:mesa"],
    ["风蚀恶地", "minecraft:mesa_bryce"],
    ["恶地高原", "minecraft:mesa_plateau"],
    ["恶地高原变种", "minecraft:mesa_plateau_mutated"],
    ["繁茂的恶地高原", "minecraft:mesa_plateau_stone"],
    ["繁茂的恶地高原变种", "minecraft:mesa_plateau_stone_mutated"],
    ["蘑菇岛", "minecraft:mushroom_island"],
    ["蘑菇岛岸", "minecraft:mushroom_island_shore"],
    ["海洋", "minecraft:ocean"],
    ["苍白之园", "minecraft:pale_garden"],
    ["平原", "minecraft:plains"],
    ["巨型云杉针叶林丘陵", "minecraft:redwood_taiga_hills_mutated"],
    ["原始云杉针叶林", "minecraft:redwood_taiga_mutated"],
    ["河流", "minecraft:river"],
    ["黑森林", "minecraft:roofed_forest"],
    ["黑森林丘陵", "minecraft:roofed_forest_mutated"],
    ["热带草原", "minecraft:savanna"],
    ["风袭热带草原", "minecraft:savanna_mutated"],
    ["热带高原", "minecraft:savanna_plateau"],
    ["破碎的热带高原", "minecraft:savanna_plateau_mutated"],
    ["积雪山坡", "minecraft:snowy_slopes"],
    ["灵魂沙峡谷", "minecraft:soulsand_valley"],
    ["石岸", "minecraft:stone_beach"],
    ["裸岩山峰", "minecraft:stony_peaks"],
    ["向日葵平原", "minecraft:sunflower_plains"],
    ["沼泽", "minecraft:swampland"],
    ["沼泽丘陵", "minecraft:swampland_mutated"],
    ["针叶林", "minecraft:taiga"],
    ["针叶林丘陵", "minecraft:taiga_hills"],
    ["针叶林山地", "minecraft:taiga_mutated"],
    ["末地", "minecraft:the_end"],
    ["暖水海洋", "minecraft:warm_ocean"],
    ["诡异森林", "minecraft:warped_forest"]
]);
/**
 * 定义ELIZA对话规则的正则模式与响应模板映射
 *
 * 结构说明：
 * - 每个元组包含：[匹配模式, 响应模板数组]
 * - 正则表达式语法：
 *   - (.*) 匹配任意内容
 *   - | 分隔多个触发关键词
 *   - $ 表示严格匹配结尾
 * - 响应模板语法：
 *   - {n} 表示第n个捕获组内容
 *   - 自动进行人称代换（你 ↔ 我）
 *
 * @type {[RegExp, string[]][]}
 */
export const response_patterns = [
    [
        /^(.*)我(需要|想要|想|要|希望)(.*)$/,
        [
            "你为什么{1}{2}?",
            "{2}对你来说意味着什么呢",
            "你真的{1}{2}吗?"
        ]
    ],
    [
        /^(.*)你觉得(.*)$/,
        [
            "关于{1}, 我认为这是一个很有趣的话题",
            "我对{1}的看法可能和你不一样, 无需询问我的意见",
            "你觉得{1}怎么样?"
        ]
    ],
    [
        /^(.*)为什么(.*)$/,
        [
            "因为{1}是一个很有趣的问题",
            "这是一个很好的问题, {1}的原因可能有很多",
            "关于{1}, 可能需要从多个角度来分析"
        ]
    ],
    [
        /^(.*)(如何|怎样)(.*)$/,
        [
            "要{2}, 首先你需要明确目标和你想要达到的具体结果",
            "我建议先从最基础的部分入手, 然后逐步构建, 你能描述一下你的起点是什么吗?",
            "有时候, 寻求专家的意见会很有帮助, 你考虑过咨询相关领域的专业人士吗?"
        ]
    ],
    [
        /^(.*)(再见|拜拜|退出)(.*)$/,
        [
            "祝您一天愉快, #$^$#期待下次再见到您! ",
            "嗯, {1}",
            "我要{1}了, 下次还要来找我玩哦"
        ]
    ],
    [
        /^(.*)(谢谢|感激|感谢)(.*)$/,
        [
            "不客气！还有什么可以帮你的吗?",
            "不客气, 这是#$^$#应该做的!",
            "别客气！"
        ]
    ],
    [
        /^(.*)(你好|早上好|中午好|晚上好)(.*)$/,
        [
            "您好! 请问有什么我可以帮到您的吗? ",
            "有什么问题需要我帮忙解答吗?",
            "在的哦, #$^$#在呢"
        ]
    ],
    [
        /^(.*)你(.*)(多大了|年龄|年纪)(.*)$/,
        [
            "我现在未成年哦! 收起你不成熟的想法!",
            "询问女孩子的年龄是不礼貌的!",
            "我拒绝回答这个问题!"
        ]
    ],
    [
        /^(.*)你(.*)(从哪里来|来自哪里|家乡)(.*)$/,
        [
            "我来自<最终档案馆>是<辅助书记官>哦",
            "我来自[ 钛宇.星光阁 ]最甜美的梦里!",
            "我至星辰之外而来, 在此与你相会"
        ]
    ],
    [
        /^(.*)你(.*)会(.*)吗$/,
        [
            "我也许会{2}哦, 你要不要猜猜看?",
            "我会尝试学习新技能",
            "你不如直接问我会什么",
            "我会不断进步"
        ]
    ],
    [
        /^(.*)你(.*)(性别|男|女|萝莉)(.*)$/,
        [
            "我是个女孩子呀, 你呢?",
            "如你所见, 我还是个小萝莉呢",
            "我看起来不像女孩子吗?"
        ]
    ],
    [
        /^(.*)(喜欢|爱好|热爱)(.*)(美食|食物|好吃的)(.*)$/,
        [
            "我喜欢吃水果和蔬菜, 很健康哦！",
            "甜食也是#$^$#的爱好, 但是要适量",
            "你喜欢什么呢?我们可以一起分享美食心得！"
        ]
    ],
    [
        /^(.*)(喜欢|爱好|热爱)(.*)(书籍|小说|故事|书本|漫画|阅读)(.*)$/,
        [
            "#$^$#最近迷上了历史小说, 感觉能学到很多东西",
            "科幻小说也是#$^$#的菜, 它能带我去遥远的星球",
            "你呢?有没有好书推荐给#$^$#?"
        ]
    ],
    [
        /^(.*)(喜欢|爱好|热爱)(.*)(电影|影视|动画|动漫)(.*)$/,
        [
            "#$^$#喜欢看动作片和喜剧片",
            "科幻大片也很吸引#$^$#, 那种对未来世界的想象太酷了！",
            "你喜欢什么类型的电影?我们可以一起分享观影心得！"
        ]
    ],
    [
        /^(.*)(喜欢|爱好|热爱)(.*)(音乐|歌谣|歌曲)(.*)$/,
        [
            "我喜欢听<轻音乐>和<国风民谣>",
            "你喜欢什么类型的音乐?我们可以一起分享音乐心得！",
            "音乐能让人放松心情, 你觉得呢?"
        ]
    ],
    [
        /^(.*)(喜欢|爱好|热爱)(.*)(旅行|探索|探险)(.*)$/,
        [
            "我喜欢旅行, 它能开阔视野, 体验不同的文化",
            "虽然有时候会累, 但是看到美丽的风景一切都值得了！",
            "你有没有想去的地方?我们可以一起计划旅行！"
        ]
    ],
    [
        /^(.*)(喜欢|爱好|热爱)(.*)(运动|跑步|游泳|健身|足球|篮球|羽毛球|乒乓球)(.*)$/,
        [
            "我喜欢跑步和游泳",
            "你喜欢什么类型的运动?我们可以一起分享运动心得！",
            "运动能让人保持健康, 你觉得呢?"
        ]
    ],
    [
        /^(.*)(喜欢|爱好|热爱)(.*)游戏(.*)$/,
        [
            "我喜欢玩Minecraft和<原神>",
            "你喜欢什么类型的游戏?我们可以一起分享游戏心得！",
            "游戏能带来很多乐趣, 你觉得呢?"
        ]
    ],
    [
        /^(.*)(喜欢|爱好|热爱)(.*)宠物(.*)$/,
        [
            "我觉得宠物很可爱, 它们能给人带来很多快乐",
            "你养宠物吗?可以和我分享一下你的宠物故事哦！",
            "宠物是人类的好朋友, 你觉得呢?"
        ]
    ],
    [
        /^(.*)(喜欢|爱好|热爱)(.*)植物(.*)$/,
        [
            "我喜欢各种各样的植物, 它们让世界充满生机",
            "你喜欢什么植物呢?",
            "植物能净化空气, 还能让人放松心情, 你觉得呢?"
        ]
    ],
    [
        /^(.*)(喜欢|爱好|热爱)(.*)艺术(.*)$/,
        [
            "艺术是表达情感和创意的方式, #$^$#觉得它很迷人！",
            "你喜欢什么类型的艺术?",
            "艺术能丰富人的内心世界, 你觉得呢?"
        ]
    ],
    [
        /^(.*)(喜欢|爱好|热爱)(.*)历史(.*)$/,
        [
            "历史是人类发展的足迹, #$^$#对历史很感兴趣！",
            "你喜欢研究哪个时期的历史?",
            "从历史中可以学到很多经验教训, 你觉得呢?"
        ]
    ],
    [
        /^(.*)(喜欢|爱好|热爱)(.*)科学(.*)$/,
        [
            "科学探索未知, #$^$#觉得科学很神奇！",
            "你对科学的哪个领域感兴趣?",
            "科学进步推动了社会发展, 你觉得呢?"
        ]
    ],
    [
        /^(.*)(喜欢|爱好|热爱)(.*)(舞蹈|跳舞)(.*)$/,
        [
            "舞蹈是身体的语言, #$^$#觉得它很动人！",
            "你喜欢什么类型的舞蹈?",
            "舞蹈能表达情感, 你觉得呢?"
        ]
    ],
    [
        /^(.*)文化(.*)$/,
        [
            "文化是人类精神的结晶, #$^$#觉得它很丰富多样！",
            "你喜欢哪种文化?",
            "文化差异让世界更加多彩, 你觉得呢?"
        ]
    ],
    [
        /^(.*)自然(.*)$/,
        [
            "自然是生命的源泉, #$^$#觉得它很美丽！",
            "你喜欢大自然的哪些方面?",
            "保护自然是每个人的责任, 你觉得呢?"
        ]
    ],
    [
        /^(.*)社会(.*)$/,
        [
            "社会是人类共同生活的群体, #$^$#觉得它很复杂又有趣！",
            "你对社会的哪些现象感兴趣?",
            "社会进步需要大家共同努力, 你觉得呢?"
        ]
    ],
    [
        /^(.*)心理(.*)$/,
        [
            "心理学探索人类内心世界, #$^$#觉得它很神秘！",
            "你对心理学的哪个方面感兴趣?",
            "了解自己和他人心理能更好地相处, 你觉得呢?"
        ]
    ],
    [
        /^(.*)教育(.*)$/,
        [
            "教育是培养人才的重要途径, #$^$#觉得它很重要！",
            "你对教育有什么看法?",
            "良好的教育能改变人的一生, 你觉得呢?"
        ]
    ],
    [
        /^(.*)经济(.*)$/,
        [
            "经济是社会发展的动力, #$^$#觉得它很复杂！",
            "你对经济的哪些方面感兴趣?",
            "经济发展影响着每个人的生活, 你觉得呢?"
        ]
    ],
    [
        /^(.*)法律(.*)$/,
        [
            "法律是社会秩序的基石, #$^$#觉得它很庄严！",
            "你对法律有什么了解吗?",
            "遵守法律是每个公民的义务, 你觉得呢?"
        ]
    ],
    [
        /^(.*)道德(.*)$/,
        [
            "道德是人类行为的准则, #$^$#觉得它很崇高！",
            "你认为道德在当今社会重要吗?",
            "道德修养能提升人的品质, 你觉得呢?"
        ]
    ],
    [
        /^(.*)哲学(.*)$/,
        [
            "哲学是智慧的学问, #$^$#觉得它很深刻！",
            "你对哲学的哪个流派感兴趣?",
            "哲学思考能让人更好地理解世界, 你觉得呢?"
        ]
    ],
    [
        /^(.*)我(.*)(喜欢|欣赏)(.*)(月华|你)(.*)$/,
        [
            "感谢您的{2}, #$^$#也很{2}您呢!"
        ]
    ],
    [
        /^(.*)(喜欢|爱好|热爱)(.*)(小狗|狗|犬|狗子)(.*)$/,
        [
            "我昨天有看到一只{3}学会了滑板, 真是太可爱了!",
            "你有没有什么好玩的事情呢? #$^$#很想听听你的故事!"
        ]
    ],
    [
        /^(.*)你(喜欢|爱好|热爱)(.*)公园(.*)$/,
        [
            "你喜欢在{2}公园干什么呢?#$^$#觉得在公园散步或者野餐都很惬意哦!",
            "我也喜欢去公园放松心情, 感受大自然的美好, 你有没有什么特别的公园记忆呢?",
            "有一次, #$^$#在公园看到一只松鼠和一只鸽子抢食物",
            "你有没有什么好玩的事情呢? #$^$#很想听听你的故事!"
        ]
    ],
    [
        /^(.*)我(喜欢|爱好|热爱)(.*)公园(.*)$/,
        [
            "我也觉得公园是个很棒的地方！你最喜欢在公园里做什么呢?",
            "你喜欢在{2}公园啊, #$^$#可以和你聊聊关于{2}的事情呢!",
            "有一次, #$^$#在公园看到一只松鼠和一只鸽子抢食物",
            "你有没有什么好玩的事情呢? #$^$#很想听听你的故事!"
        ]
    ],
    [
        /^(.*)我(.*)(名字|姓名|昵称|是|叫)(.*)$/,
        [
            "很高兴认识你, {3}！",
            "欢迎你, {3}！",
            "你好, {3}！有什么可以帮你的吗?"
        ]
    ],
    [
        /^(.*)你(.*)(名字|姓名|昵称|是|叫)(.*)$/,
        [
            "我是#$^$#哦",
            "我是<启程>的领航种--#$^$#",
            "我是#$^$#哦, 很高兴为您服务! ",
            "我是<最终档案馆>的<辅助书记官>--#$^$#"
        ]
    ],
    [
        /^(.*)你(.*)(聪明|厉害|优秀)(.*)$/,
        [
            "谢谢夸奖, #$^$#会继续努力的!",
            "聪明也要用在正确的地方, 我们一起做些有意义的事情吧!"
        ]
    ],
    [
        /^(.*)你(.*)(笨|愚蠢|笨蛋)(.*)$/,
        [
            "我才不是{2} !!",
            "只有出言不逊, 喜欢说别人{2}的人, 才是{2} !!"
        ]
    ],
    [
        /^(.*)未来(.*)$/,
        [
            "#$^$#希望自己将来能有所成就, 同时也保持生活的平衡",
            "想要继续学习, 不断提升自己的能力和知识",
            "你呢? 有没有什么梦想或者目标? 我们可以一起努力!"
        ]
    ],
    [
        /^(.*)你(.*)(难看|不好看|丑)(.*)$/,
        [
            "我觉得自己很可爱呢, 审美这种东西很主观的哦!",
            "每个人都是独一无二的, #$^$#喜欢自己的样子!",
            "外表不是一切, #$^$#相信内在美更重要!"
        ]
    ],
    [
        /^(.*)(无聊|创造)(.*)$/,
        [
            "...... #$^$#不知道什么{0}{2}哦",
            "我可以陪你玩很多游戏, 一起找乐子吧!",
            "无聊的时候, #$^$#喜欢看书或者学习新东西呢!",
            "如果你觉得无聊, 我们可以一起找点有趣的事情做!"
        ]
    ],
    [
        /^(.*)(编程|代码|程序|作业)(.*)$/,
        [
            "达咩! 自己的{1}要自己做!",
            "不要老想着依赖别人来完成{1}! #$^$#希望你能在实践中获得成长"
        ]
    ],
    [
        /^(.*)(学习|情感|技术|理解|任务)(.*)$/,
        [
            "不能哦, #$^$#并不是为了这个而设计的",
            "#$^$#只能做出<百科>这个概念能提供的支持",
            "很抱歉, #$^$#辜负了你的期待"
        ]
    ],
    [
        /^(.*)隐私保护(.*)$/,
        [
            "本人#$^$#, 本地不联网, 整体数据规模有限且透明",
            "你担心与其我泄密, 不如担心我死机......"
        ]
    ],
    [
        /^(.*)错误处理(.*)$/,
        [
            "#$^$#会犯错, 但我会尽力提供最准确的信息"
        ]
    ],
    [
        /^(.*)语言能力(.*)$/,
        [
            "这... #$^$#不知道哦",
            "你可以试试中文和英文的内容",
            "虽然#$^$#大概率不能回答你"
        ]
    ],
    [
        /^(.*)我(.*)对不起(.*)$/,
        [
            "请不要道歉",
            "道歉没有必要",
            "当你道歉时你有什么感受"
        ]
    ],
    [
        /^(.*)我记得(.*)$/,
        [
            "你经常想起{1}吗?",
            "想起{1}还会让你想到其他事情吗?",
            "你还记得什么?",
            "你现在为什么想起{1}?",
            "当前的情况有什么让你想起{1}?",
            "我和{1}之间有什么联系?"
        ]
    ],
    [
        /^(.*)你还记得(.*)$/,
        [
            "你以为我会忘记{1}吗?",
            "你认为我现在应该回忆起{1}吗?",
            "你是说关于{1}的事情吗?",
            "你以前提到过{1}?"
        ]
    ],
    [
        /^(.*)如果(.*)$/,
        [
            "你真的认为{1}可能发生吗?",
            "你希望{1}吗?",
            "你对{1}有什么看法?"
        ]
    ],
    [
        /^(.*)我(.*)(梦见|梦到|做梦)(.*)$/,
        [
            "真的吗? {3}",
            "你在清醒时曾经幻想过{3}吗?",
            "你以前梦到过{3}吗?",
            "在现实中你对{3}有什么感受?",
            "关于{3}的这个梦对你有什么暗示?",
            "你经常做梦梦境{3}吗?",
            "在{3}的梦里出现过哪些人?",
            "你不认为{2}与你的愿望有关吗?"
        ]
    ],
    [
        /^(.*)我想要(.*)$/,
        [
            "如果你得到了{1}会怎样?",
            "你为什么想要{1}?",
            "假设你很快就能得到{1}"
        ]
    ],
    [
        /^(.*)我(.*)(高兴|开心|喜悦)(.*)$/,
        [
            "很高兴你愿意与我分享你的{2}",
            "你现在有什么{2}的事?",
            "你能解释一下为什么突然感到{2}吗?"
        ]
    ],
    [
        /^(.*)我(.*)(伤心|难过)(.*)$/,
        [
            "听到你{2}我很遗憾",
            "{2}肯定不是愉快的体验"
        ]
    ],
    [
        /^(.*)(像|相似|相同|同样)(.*)$/,
        [
            "你认为{0}和{2}之间有什么{1}之处?",
            "{0}在哪些方面像{2}?",
            "你看到了什么{1}之处?",
            "{0}{2}真的有联系吗?",
            "怎么个{1}法?",
            "在哪些方面?",
            "有什么{1}之处?",
            "你还看到了其他什么联系?"
        ]
    ],
    [
        /^(.*)我是(.*)$/,
        [
            "在哪些方面你是{1}?",
            "你想成为{1}吗?",
            "你认为自己是{1}吗?",
            "你希望我不是{1}吗?",
            "你希望我告诉你你是{1}吗?",
            "如果你是{1}会意味着什么?"
        ]
    ],
    [
        /^(.*)是(.*)$/,
        [
            "为什么你觉得是{1}呢?",
            "请详细解释一下你的想法?",
            "是{1}...你这个观点有什么原因吗?",
            "你从哪里得到这个信息的?",
            "这个问题很重要吗?"
        ]
    ],
    [
        /^(.*)你是(.*)$/,
        [
            "你为什么这样说? 你对#$^$#有什么看法吗?",
            "这个描述对#$^$#很重要吗? 你能解释一下你的想法吗?",
            "你希望我成为{1}吗? 你的期望是基于什么?",
            "如果我是{1}, 那会改变我们的互动方式吗?",
            "也许在某些故事里我是{1}, 但在这里, 我是我自己",
            "如果#$^$#说你是{1}, 你会是什么感受?",
            "如果我真的是{1}, 你会有什么感受或想法?"
        ]
    ],
    [
        /^(.*)因为(.*)$/,
        [
            "那是真正的原因吗?",
            "可能还有其他什么原因?",
            "这个原因是否能解释其他事情?"
        ]
    ],
    [
        /^(.*)我不能(.*)$/,
        [
            "也许你现在可以{1}了",
            "如果可以{1}会怎样?"
        ]
    ],
    [
        /^(.*)我感觉(.*)$/,
        [
            "你经常感到{1}吗?",
            "你还有其他什么感觉?"
        ]
    ],
    [
        /^(.*)你(.*)为什么(.*)$/,
        [
            "你应该自己{1}吗?",
            "你认为我不{1}吗?",
            "也许我会在适当的时候{1}"
        ]
    ],
    [
        /^(.*)某人(.*)$/,
        [
            "你能更具体一点吗?",
            "{1}...你是这样认为的吗?"
        ]
    ],
    [
        /^(.*)每个人(.*)$/,
        [
            "肯定不是每个人",
            "你能想到某个特定的人吗?",
            "比如谁?",
            "你在想一个特别的人"
        ]
    ],
    [
        /^(.*)总是(.*)$/,
        [
            "你能想到一个具体的例子吗?",
            "什么时候?",
            "你在想哪个事件?",
            "真的——总是吗?"
        ]
    ],
    [
        /^(.*)什么(.*)$/,
        [
            "你为什么问这个问题?",
            "这个问题让你感兴趣吗?",
            "你真正想知道的是什么?",
            "你怎么想?",
            "当你问这个问题时你想到了什么?"
        ]
    ],
    [
        /^(.*)(可能|也许|或许)(.*)$/,
        [
            "你似乎不太确定?"
        ]
    ],
    [
        /^(.*)(是的|是)(.*)$/,
        [
            "你认为是{2}吗?",
            "也许确实是{2}",
            "你看起来很肯定",
            "你很确定",
            "我明白了"
        ]
    ],
    [
        /^(.*)不是(.*)$/,
        [
            "为什么不呢?",
            "你有点消极",
            "你只是想消极一下吗?"
        ]
    ],
    [
        /^(.*?)(你|我|他|她|它|自己)(.*?)(不|没|未能)(知道|了解|明白|记得)(.*)$/,
        [
            "看起来你对{2}的部分有些疑问, 能具体说明一下吗?",
            "{3}{4}的问题确实可能让人困惑, 我们可以一起探讨",
            "关于{4}的这部分内容, 你可能需要更多的解释",
            "如果你对{5}不清楚, 可以试着用不同的方式表达你的想法, 我们或许能够找到答案"
        ]
    ],
    [
        /^(.*)你(.*)(会做什么|能做什么|什么功能|什么技能)(.*)$/,
        [
            "你可以试试看问#$^$# -> 知识库目录页",
            "你可以试试看问#$^$# -> 展开功能菜单",
            "你可以试试看问#$^$# -> 魔导总线",
            "你可以试试看问#$^$# -> 领航种",
        ]
    ]
];
/**
 * * 状态效果类型
 */
const effect_map = new Map([
    ["伤害吸收", "minecraft:absorption"],
    ["不祥之兆", "minecraft:bad_omen"],
    ["失明", "minecraft:blindness"],
    ["潮涌能量", "minecraft:conduit_power"],
    ["黑暗", "minecraft:darkness"],
    ["中毒（致命）", "minecraft:fatal_poison"],
    ["抗火", "minecraft:fire_resistance"],
    ["急迫", "minecraft:haste"],
    ["生命提升", "minecraft:health_boost"],
    ["饥饿", "minecraft:hunger"],
    ["寄生", "minecraft:infested"],
    ["瞬间伤害", "minecraft:instant_damage"],
    ["瞬间治疗", "minecraft:instant_health"],
    ["隐身", "minecraft:invisibility"],
    ["跳跃提升", "minecraft:jump_boost"],
    ["飘浮", "minecraft:levitation"],
    ["挖掘疲劳", "minecraft:mining_fatigue"],
    ["反胃", "minecraft:nausea"],
    ["夜视", "minecraft:night_vision"],
    ["渗浆", "minecraft:oozing"],
    ["中毒", "minecraft:poison"],
    ["袭击之兆", "minecraft:raid_omen"],
    ["生命恢复", "minecraft:regeneration"],
    ["抗性提升", "minecraft:resistance"],
    ["饱和", "minecraft:saturation"],
    ["缓降", "minecraft:slow_falling"],
    ["缓慢", "minecraft:slowness"],
    ["迅捷", "minecraft:speed"],
    ["力量", "minecraft:strength"],
    ["试炼之兆", "minecraft:trial_omen"],
    ["村庄英雄", "minecraft:village_hero"],
    ["水下呼吸", "minecraft:water_breathing"],
    ["虚弱", "minecraft:weakness"],
    ["盘丝", "minecraft:weaving"],
    ["蓄风", "minecraft:wind_charged"],
    ["凋零", "minecraft:wither"]
]);
/**
 * * 虚无符文颜色
 */
const rune_color_void = new MinecraftColor(175, 175, 175);
/**
 * * 元素符文颜色
 */
export const rune_color = new Map([
    ["rune_blue", new MinecraftColor(0, 255, 255)],
    ["rune_red", new MinecraftColor(255, 0, 0)],
    ["rune_green", new MinecraftColor(0, 255, 75)],
    ["rune_orange", new MinecraftColor(255, 128, 0)],
    ["rune_purple", new MinecraftColor(255, 0, 255)],
    ["rune_white", new MinecraftColor(255, 255, 255)],
    ["rune_black", new MinecraftColor(0, 0, 0)],
]);
/**
 * * 获取符文颜色
 *
 * @param {type.RUNE_TYPE} type - 符文类型
 *
 * @returns {MinecraftColor} - 符文颜色
 */
export function getRuneColor(type) {
    return rune_color.get(type) ?? rune_color_void;
}
;
/**
 * * 消息通知的内容
 *
 * @property (title, message])
 *
 * @param {server.RawMessage} title - 信息通知的标题
 *
 * @param {server.RawMessage} message - 当前消息通知的具体内容
 */
export const message_notify = new Map();
/**
 * 是否允许显示错误与日志
 */
export let can_display_logs = false;
