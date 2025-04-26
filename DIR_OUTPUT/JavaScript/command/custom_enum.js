import { biome_map, dimension_map } from "../data/table";
/**
 * * 自定义指令枚举列表
 */
const components = new Map();
components.set('opal:实体待机动画类型', [
    'no_sitting',
    'is_sitting'
]);
components.set('opal:元素属性类型', [
    "rune_orange",
    "rune_purple",
    "rune_green",
    "rune_white",
    "rune_black",
    "rune_void",
    "rune_blue",
    "rune_red"
]);
components.set('opal:模组扩展结构', [
    "magic_industry_exhibition_hall",
    "vacant_space_wasp_tower",
    "starlight_house",
]);
components.set('opal:原版生物群系', [...biome_map.values()]);
components.set('opal:原版世界维度', [...new Set(...dimension_map.values())]);
export default components;
