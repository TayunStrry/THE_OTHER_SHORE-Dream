/*
 * 原版接口
 */
import * as server from "@minecraft/server";
/**
 * 计算玩家精确的旋转角度值。
 * 将玩家的旋转角度转换为以 22.5 度为一个单位的整数值，范围在 0 到 15 之间。
 *
 * @param {number} playerYRotation - 玩家的 Y 轴旋转角度，可能为负数。
 *
 * @returns {number} 转换后的旋转角度值，范围在 0 到 15 之间。
 */
export function getPreciseRotation(playerYRotation: number): number {
    // 如果玩家的旋转角度为负数，将其转换为 0 到 360 度之间的值
    if (playerYRotation < 0) playerYRotation += 360;
    /**
     * 将旋转角度除以 22.5 并四舍五入，得到以 22.5 度为单位的整数值
     */
    const rotation = Math.round(playerYRotation / 22.5);
    // 如果结果为 16，则将其转换为 0，确保返回值范围在 0 到 15 之间
    return rotation !== 16 ? rotation : 0;
};
/**
 * 获取方块的最大状态数。
 * 根据方块所包含的标签来确定其最大状态数，若未找到特定标签，则默认返回 2。
 *
 * @param {server.Block} block - 要检查的方块对象。
 *
 * @returns {number} 方块的最大状态数，可能为 2、3、4、5 或 6。
 */
export function getMaxStates(block: server.Block): number {
    // 检查方块是否包含 "cit:six_states" 标签，若包含则返回最大状态数为 6
    if (block.hasTag("cit:six_states")) return 6;
    // 检查方块是否包含 "cit:five_states" 标签，若包含则返回最大状态数为 5
    if (block.hasTag("cit:five_states")) return 5;
    // 检查方块是否包含 "cit:four_states" 标签，若包含则返回最大状态数为 4
    if (block.hasTag("cit:four_states")) return 4;
    // 检查方块是否包含 "cit:three_states" 标签，若包含则返回最大状态数为 3
    if (block.hasTag("cit:three_states")) return 3;
    // 检查方块是否包含 "cit:two_states" 标签，若包含则返回最大状态数为 2
    if (block.hasTag("cit:two_states")) return 2;
    // 若方块不包含上述任何标签，默认返回最大状态数为 2
    return 2;
};
/**
 * 获取当前状态的下一个状态。
 *
 * 通过对当前状态加 1 并取模最大状态数，确保返回的状态值在有效范围内。
 *
 * @param {number} currentState - 当前的状态值。
 *
 * @param {number} maxStates - 最大状态数。
 *
 * @returns {number} 当前状态的下一个状态值，范围在 0 到 maxStates - 1 之间。
 */
export function getNextState(currentState: number, maxStates: number): number {
	return (currentState + 1) % maxStates;
}