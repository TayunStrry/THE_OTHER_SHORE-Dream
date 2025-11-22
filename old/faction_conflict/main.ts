import { registerAllEventHandlers } from "./events";
import { tickEvent, updateSoldiersBehavior } from "./legion";
import * as server from "@minecraft/server";

/**
 * 主入口函数 - 初始化所有功能
 */
function initializeFactionConflict(): void {
    // 注册所有事件处理器
    registerAllEventHandlers();
    // 注册周期性任务 - 每刻执行的核心游戏逻辑
    server.system.runInterval(updateSoldiersBehavior, 2);
    // 注册周期性任务 - 每刻执行的核心游戏逻辑
    server.system.runInterval(tickEvent, 5);
}

// 执行初始化
initializeFactionConflict();

/**
 * 模块导出
 * 提供全局访问点，允许其他脚本调用核心功能
 */
export * from "./types";
export * from "./state";
export * from "./events";
export * from "./legion";
export * from "./util";
export * from "./ui";