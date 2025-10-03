import * as server from "@minecraft/server";
import { globalState, CombatAttribute } from "./state";
/**
 * 读取全局变量
 * @returns {boolean} 是否成功读取全局变量
 */
export function readGlobalVariables() {
    // 如果设定的阵营值是非法值, 则不加入计划表
    if (CombatAttribute.publicLegionIndexValue !== 1 && CombatAttribute.publicLegionIndexValue !== 2)
        return false;
    // 将全局变量加入计划表
    globalState.pendingPlanTable.push({
        entityAmountValue: Math.floor(Math.max(CombatAttribute.publicEntityAmountValue, 1)),
        entityIndexValue: Math.floor(CombatAttribute.publicEntityIndexValue),
        legionIndexValue: Math.floor(CombatAttribute.publicLegionIndexValue),
        entityNameValue: CombatAttribute.publicEntityNameValue
    });
    // 在读取结束后修改全局变量
    CombatAttribute.publicLegionIndexValue = -1;
    // 返回读取成功
    return true;
}
;
/**
 * 显示全局状态
 *
 * @param {boolean} allowDisplay - 是否允许显示
 */
export function parameterDisplay(allowDisplay) {
    // 如果常驻显示和允许显示都不为真，则不执行后续代码
    if (!CombatAttribute.continuousDisplay && !allowDisplay)
        return;
    // 遍历全体玩家并显示全局公开参数
    server.world.getAllPlayers().forEach(player => 
    // 在玩家快捷栏上方显示
    player.onScreenDisplay.setActionBar({
        rawtext: [
            { text: ' 生成数量: ' + CombatAttribute.publicEntityAmountValue },
            { text: ' 生成序列: ' + CombatAttribute.publicEntityIndexValue },
            { text: ' 阵营序列: ' + CombatAttribute.publicLegionIndexValue },
            { text: ' 生成名称: ' + CombatAttribute.publicEntityNameValue },
        ]
    }));
}
;
