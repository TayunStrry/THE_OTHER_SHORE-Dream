/*
 * 原版接口
 */
import * as server from "@minecraft/server";
/*
 * 方块组件
 */
import blockComponents from "./block/custom_component";
import updateComponent from "./block/update_component";
/*
 * < 世界 > 初始化前 事件
 */
server.system.beforeEvents.startup.subscribe(data => {
    /**
     * 方块自定义组件实例数组
     */
    const blockCustoms = [...blockComponents.values()];
    /**
     * 方块自定义组件名称数组
     */
    const blockNames = [...blockComponents.keys()];
    // === 方块自定义组件注册 ===
    for (let blockIndex = 0; blockIndex < blockCustoms.length; blockIndex++)
        data.blockComponentRegistry.registerCustomComponent(blockNames[blockIndex], blockCustoms[blockIndex]);
});
/*
 * < 方块 > 更新后 事件
 */
server.world.afterEvents.playerBreakBlock.subscribe(data => updateComponent(data.block));
server.world.afterEvents.playerPlaceBlock.subscribe(data => updateComponent(data.block));
