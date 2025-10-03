import * as server from "@minecraft/server";
/**
 * 组件前缀代
 */
export const componentPrefix = 'opal:';
export class CombatAttribute {
    static get shouldTheWarBeTerminated() {
        return (server.world.getDynamicProperty('shouldTheWarBeTerminated') || 0);
    }
    static set shouldTheWarBeTerminated(value) {
        server.world.setDynamicProperty('shouldTheWarBeTerminated', value);
    }
    static get publicEntityAmountValue() {
        return (server.world.getDynamicProperty('publicEntityAmountValue') || 0);
    }
    static set publicEntityAmountValue(value) {
        server.world.setDynamicProperty('publicEntityAmountValue', value);
    }
    static get publicEntityIndexValue() {
        return (server.world.getDynamicProperty('publicEntityIndexValue') || 0);
    }
    static set publicEntityIndexValue(value) {
        server.world.setDynamicProperty('publicEntityIndexValue', value);
    }
    static get publicLegionIndexValue() {
        return (server.world.getDynamicProperty('publicLegionIndexValue') || 0);
    }
    static set publicLegionIndexValue(value) {
        server.world.setDynamicProperty('publicLegionIndexValue', value);
    }
    static get publicEntityNameValue() {
        return (server.world.getDynamicProperty('publicEntityNameValue') || '士兵');
    }
    static set publicEntityNameValue(value) {
        server.world.setDynamicProperty('publicEntityNameValue', value);
    }
    static get continuousDisplay() {
        return (server.world.getDynamicProperty('continuousDisplay') || false);
    }
    static set continuousDisplay(value) {
        server.world.setDynamicProperty('continuousDisplay', value);
    }
}
/**
 * 全局状态对象
 */
export const globalState = {
    /**
     *  实体生成计划表
     */
    planTable: [],
    /**
     * 等待在下一周期中新增的计划表
     */
    pendingPlanTable: [],
    /**
     *  团成员目录
     */
    memberDirectory: [
        // 敌对生物（按强度从高到低）
        "minecraft:warden", // 循声守卫 - 最强大的敌对生物
        "minecraft:wither_skeleton", // 凋灵骷髅
        "minecraft:vindicator", // 卫道士
        "minecraft:pillager", // 掠夺者
        "minecraft:ravager", // 劫掠兽
        "minecraft:enderman", // 末影人
        "minecraft:zoglin", // 僵尸疣猪兽
        "minecraft:husk", // 尸壳
        "minecraft:drowned", // 溺尸
        "minecraft:zombie", // 僵尸
        "minecraft:skeleton", // 骷髅
        "minecraft:stray", // 流浪者
        "minecraft:cave_spider", // 洞穴蜘蛛
        "minecraft:spider", // 蜘蛛
        "minecraft:magma_cube", // 岩浆怪
        "minecraft:silverfish", // 蠹虫
        "minecraft:endermite", // 末影螨
        "minecraft:slime", // 史莱姆
        // 中立生物（按强度从高到低）
        "minecraft:iron_golem", // 铁傀儡 - 最强大的中立生物
        "minecraft:piglin_brute", // 猪灵蛮兵
        "minecraft:piglin", // 猪灵
        "minecraft:hoglin", // 疣猪兽
        "minecraft:polar_bear", // 北极熊
        "minecraft:snow_golem", // 雪傀儡
        "minecraft:llama", // 羊驼
        "minecraft:wolf", // 狼
        "minecraft:goat", // 山羊
        "minecraft:fox", // 狐狸
        // 被动生物（按实用性和常见度）
        "minecraft:villager_v2", // 村民
        "minecraft:cow", // 牛
        "minecraft:mooshroom", // 哞菇
        "minecraft:pig", // 猪
        "minecraft:sheep", // 羊
        "minecraft:horse", // 马
        "minecraft:donkey", // 驴
        "minecraft:mule", // 骡
        "minecraft:camel", // 骆驼
        "minecraft:rabbit", // 兔子
        "minecraft:cat", // 猫
        "minecraft:turtle", // 海龟
        "minecraft:panda", // 熊猫
        "minecraft:frog", // 青蛙
        "minecraft:axolotl", // 美西螈
        "minecraft:strider", // 炽足兽
        "minecraft:sniffer", // 嗅探兽
        "minecraft:armadillo", // 犰狳
        // 特殊生物
        "minecraft:breeze", // 风袭者
        "minecraft:creaking", // 未知生物类型
    ],
    /**
     * 物品自定义组件列表
     */
    itemComponents: new Map(),
    /**
     * 玩家列表
     */
    players: []
};
/**
 * 重置全局状态
 */
export function resetGlobalState() {
    CombatAttribute.shouldTheWarBeTerminated = 0;
    CombatAttribute.publicEntityAmountValue = 0;
    CombatAttribute.publicEntityIndexValue = 0;
    CombatAttribute.publicLegionIndexValue = 0;
    CombatAttribute.publicEntityNameValue = "士兵";
    globalState.planTable = [];
    globalState.pendingPlanTable = [];
    CombatAttribute.continuousDisplay = false;
}
