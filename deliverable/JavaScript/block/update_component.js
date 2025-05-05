/*
 * 原版接口
 */
import * as server from "@minecraft/server";
/*
 * 系统组件
 */
import * as opal from "../system/opal";
/**
 * * < 方块 > 更新后 事件
 */
export default function BlockUpdateAfterEvent(block) {
    /**
     * * 执行 方块更新事件 的 方块列表
     */
    const blocks = [];
    // 获取 进行更新的方块
    opal.Vector.createCubeLattice(1).forEach(vector => {
        try {
            /**
             * * 目标方块
             */
            const target = block.offset(vector);
            // 获取进行更新的方块
            if (target)
                blocks.push(target);
        }
        catch (error) {
            if (opal.TriggerControl('超出世界边界', block, 80))
                server.world.sendMessage({ text: "您即将超出世界加载范围, 无法更新方块！" });
        }
    });
    // 遍历 方块列表
    blocks.forEach(block => {
        switch (block.typeId) {
            case 'starry_map:enable_control':
                enableControl(block);
                break;
            case 'starry_map:basic_pipeline':
                basicPipeline(block);
                break;
            case 'starry_map:pulse_latch':
                pulseLatch(block);
                break;
            case 'starry_map:magic_portal_above':
                portalGate(block);
                break;
            case 'starry_map:magic_portal_below':
                portalGate(block);
                break;
            case 'starry_map:jungle_wood_chair':
                jungleWoodChair(block);
                break;
            case 'starry_map:diorite_table':
                dioriteTable(block);
                break;
            default: break;
        }
        if (block.hasTag('tags:machine_gate.horizontal_gate'))
            horizontalGate(block);
        if (block.hasTag('tags:machine_gate.vertical_gate'))
            verticalGate(block);
    });
}
;
/**
 * * 魔导总线 - 基础总线
 */
function basicPipeline(object) {
    // 检测 方向x
    const direction_positive_x = object.east()?.hasTag('tags:magic_cable.port_negative.X') ?? false;
    const direction_negative_x = object.west()?.hasTag('tags:magic_cable.port_positive.X') ?? false;
    // 检测 方向y
    const direction_positive_y = object.above()?.hasTag('tags:magic_cable.port_negative.Y') ?? false;
    const direction_negative_y = object.below()?.hasTag('tags:magic_cable.port_positive.Y') ?? false;
    // 检测 方向z
    const direction_positive_z = object.south()?.hasTag('tags:magic_cable.port_negative.Z') ?? false;
    const direction_negative_z = object.north()?.hasTag('tags:magic_cable.port_positive.Z') ?? false;
    // 赋值 方向X
    opal.TrySetPermutation(object, 'STATE:direction_positive.X', direction_positive_x);
    opal.TrySetPermutation(object, 'STATE:direction_negative.X', direction_negative_x);
    // 赋值 方向Y
    opal.TrySetPermutation(object, 'STATE:direction_positive.Y', direction_positive_y);
    opal.TrySetPermutation(object, 'STATE:direction_negative.Y', direction_negative_y);
    // 赋值 方向Z
    opal.TrySetPermutation(object, 'STATE:direction_positive.Z', direction_positive_z);
    opal.TrySetPermutation(object, 'STATE:direction_negative.Z', direction_negative_z);
}
;
/**
 * * 魔导总线 - 脉冲锁存
 */
function pulseLatch(object) {
    // 检测 方向x
    const direction_positive_x = object.east()?.hasTag('tags:magic_cable.logic_negative.X') ? true : object.east()?.hasTag('tags:magic_cable.port_negative.X');
    const direction_negative_x = object.west()?.hasTag('tags:magic_cable.logic_positive.X') ? true : object.west()?.hasTag('tags:magic_cable.port_positive.X');
    // 检测 方向y
    const direction_positive_y = object.above()?.hasTag('tags:magic_cable.logic_negative.Y') ? true : object.above()?.hasTag('tags:magic_cable.port_negative.Y');
    const direction_negative_y = object.below()?.hasTag('tags:magic_cable.logic_positive.Y') ? true : object.below()?.hasTag('tags:magic_cable.port_positive.Y');
    // 检测 方向z
    const direction_positive_z = object.south()?.hasTag('tags:magic_cable.logic_negative.Z') ? true : object.south()?.hasTag('tags:magic_cable.port_negative.Z');
    const direction_negative_z = object.north()?.hasTag('tags:magic_cable.logic_positive.Z') ? true : object.north()?.hasTag('tags:magic_cable.port_positive.Z');
    // 赋值 方向X
    opal.TrySetPermutation(object, 'STATE:direction_positive.X', direction_positive_x ?? false);
    opal.TrySetPermutation(object, 'STATE:direction_negative.X', direction_negative_x ?? false);
    // 赋值 方向Y
    opal.TrySetPermutation(object, 'STATE:direction_positive.Y', direction_positive_y ?? false);
    opal.TrySetPermutation(object, 'STATE:direction_negative.Y', direction_negative_y ?? false);
    // 赋值 方向Z
    opal.TrySetPermutation(object, 'STATE:direction_positive.Z', direction_positive_z ?? false);
    opal.TrySetPermutation(object, 'STATE:direction_negative.Z', direction_negative_z ?? false);
}
;
/**
 * * 魔导总线 - 传播许可
 */
function enableControl(object) {
    /**
     * * 判断输出
     */
    const output = [object.east(), object.west(), object.south(), object.north()].filter(block => block?.hasTag('tags:magic_cable.series')).length;
    /**
     * * 判断控制
     */
    const control = [object.above(), object.below()].filter(block => block?.hasTag('tags:magic_cable.latch')).length;
    // 赋值 方块状态
    server.system.runTimeout(() => opal.TrySetPermutation(object, 'STATE:output', output != 0 ? 1 : 0), 1);
    server.system.runTimeout(() => opal.TrySetPermutation(object, 'STATE:control', control != 0 ? 1 : 0), 2);
}
;
/**
 * * 机关之门 - 魔晶传送
 */
function portalGate(object) {
    // 查询方块标签
    const direction_0 = object.west()?.hasTag('tags:magic_portal.series') ?? false;
    const direction_1 = object.south()?.hasTag('tags:magic_portal.series') ?? false;
    const direction_2 = object.east()?.hasTag('tags:magic_portal.series') ?? false;
    const direction_3 = object.north()?.hasTag('tags:magic_portal.series') ?? false;
    // 赋值 方块状态
    server.system.runTimeout(() => opal.TrySetPermutation(object, 'STATE:direction_0', direction_0 ? 1 : 0), 1);
    server.system.runTimeout(() => opal.TrySetPermutation(object, 'STATE:direction_1', direction_1 ? 1 : 0), 2);
    server.system.runTimeout(() => opal.TrySetPermutation(object, 'STATE:direction_2', direction_2 ? 1 : 0), 3);
    server.system.runTimeout(() => opal.TrySetPermutation(object, 'STATE:direction_3', direction_3 ? 1 : 0), 4);
}
;
/**
 * * 水平放置 的 机关之门
 *
 * @param {server.Block} object - 机关门对象
 */
function horizontalGate(object) {
    /**
     * * 比较方块对象
     *
     * @param target - 需要比较的方块对象
     *
     * @returns - 是否为同一种方块
     */
    function compareBlocks(target) {
        return target?.typeId == object.typeId && target?.permutation.getState('minecraft:vertical_half') == object.permutation.getState('minecraft:vertical_half');
    }
    ;
    // 查询方块标签
    const [direction_0, direction_1, direction_2, direction_3] = [
        compareBlocks(object.east()),
        compareBlocks(object.west()),
        compareBlocks(object.south()),
        compareBlocks(object.north())
    ];
    // 赋值 方块状态
    server.system.runTimeout(() => opal.TrySetPermutation(object, 'STATE:direction_0', direction_0 ? 1 : 0), 1);
    server.system.runTimeout(() => opal.TrySetPermutation(object, 'STATE:direction_1', direction_1 ? 1 : 0), 2);
    server.system.runTimeout(() => opal.TrySetPermutation(object, 'STATE:direction_2', direction_2 ? 1 : 0), 3);
    server.system.runTimeout(() => opal.TrySetPermutation(object, 'STATE:direction_3', direction_3 ? 1 : 0), 4);
}
;
/**
 * * 垂直放置 的 机关之门
 *
 * @param {server.Block} object - 机关门对象
 */
function verticalGate(object) {
    // 方块状态默认值
    let about = 0, center = 0;
    // 修饰 机关门 朝向
    if (object.west()?.typeId == object.typeId)
        about = 1;
    else if (object.south()?.typeId == object.typeId)
        about = 2;
    else if (object.east()?.typeId == object.typeId)
        about = 3;
    else if (object.north()?.typeId == object.typeId)
        about = 4;
    // 修饰 机关门 边框
    if (object.east()?.typeId == object.typeId && object.west()?.typeId == object.typeId)
        center = 1;
    else if (object.south()?.typeId == object.typeId && object.north()?.typeId == object.typeId)
        center = 1;
    // 校验 机关门朝向
    if (about == 0)
        return;
    server.system.runTimeout(() => opal.TrySetPermutation(object, 'STATE:about', about), 1);
    server.system.runTimeout(() => opal.TrySetPermutation(object, 'STATE:center', center), 2);
}
;
/**
 * * 丛林木椅
 *
 * @param {server.Block} object - 机关门对象
 */
function jungleWoodChair(object) {
    if (object.permutation.getState('STATE:stage') != 0) {
        switch (object.permutation.getState('minecraft:cardinal_direction')) {
            case 'south':
                if (object.east()?.typeId != object.typeId && object.west()?.typeId != object.typeId)
                    opal.TrySetPermutation(object, 'STATE:stage', 0);
                break;
            case 'north':
                if (object.east()?.typeId != object.typeId && object.west()?.typeId != object.typeId)
                    opal.TrySetPermutation(object, 'STATE:stage', 0);
                break;
            case 'east':
                if (object.south()?.typeId != object.typeId && object.north()?.typeId != object.typeId)
                    opal.TrySetPermutation(object, 'STATE:stage', 0);
                break;
            case 'west':
                if (object.south()?.typeId != object.typeId && object.north()?.typeId != object.typeId)
                    opal.TrySetPermutation(object, 'STATE:stage', 0);
                break;
            default: break;
        }
    }
    else if (object.permutation.getState('STATE:stage') == 0 && object.permutation.getState('STATE:type') == 0) {
        switch (object.permutation.getState('minecraft:cardinal_direction')) {
            case 'south':
                if (object.east()?.hasTag('tags:home_decorating.chair.south'))
                    opal.TrySetPermutation(object, 'STATE:stage', 1);
                else if (object.west()?.hasTag('tags:home_decorating.chair.south'))
                    opal.TrySetPermutation(object, 'STATE:stage', 2);
                break;
            case 'north':
                if (object.east()?.hasTag('tags:home_decorating.chair.north'))
                    opal.TrySetPermutation(object, 'STATE:stage', 2);
                else if (object.west()?.hasTag('tags:home_decorating.chair.north'))
                    opal.TrySetPermutation(object, 'STATE:stage', 1);
                break;
            case 'east':
                if (object.south()?.hasTag('tags:home_decorating.chair.east'))
                    opal.TrySetPermutation(object, 'STATE:stage', 2);
                else if (object.north()?.hasTag('tags:home_decorating.chair.east'))
                    opal.TrySetPermutation(object, 'STATE:stage', 1);
                break;
            case 'west':
                if (object.south()?.hasTag('tags:home_decorating.chair.west'))
                    opal.TrySetPermutation(object, 'STATE:stage', 1);
                else if (object.north()?.hasTag('tags:home_decorating.chair.west'))
                    opal.TrySetPermutation(object, 'STATE:stage', 2);
                break;
            default: break;
        }
    }
}
;
/**
 * * 闪长岩桌
 *
 * @param {server.Block} object - 机关门对象
 */
function dioriteTable(object) {
    if (object.permutation.getState('STATE:stage') != 0) {
        switch (object.permutation.getState('minecraft:cardinal_direction')) {
            case 'south':
                if (object.east()?.hasTag('tags:home_decorating.table.south')) {
                    if (object.west()?.hasTag('tags:home_decorating.table.south'))
                        opal.TrySetPermutation(object, 'STATE:stage', 3);
                }
                else if (!object.east()?.hasTag('tags:home_decorating.table.south')) {
                    if (!object.west()?.hasTag('tags:home_decorating.table.south'))
                        opal.TrySetPermutation(object, 'STATE:stage', 0);
                }
                ;
                break;
            case 'north':
                if (object.east()?.hasTag('tags:home_decorating.table.north')) {
                    if (object.west()?.hasTag('tags:home_decorating.table.north'))
                        opal.TrySetPermutation(object, 'STATE:stage', 3);
                }
                else if (!object.east()?.hasTag('tags:home_decorating.table.north')) {
                    if (!object.west()?.hasTag('tags:home_decorating.table.north'))
                        opal.TrySetPermutation(object, 'STATE:stage', 0);
                }
                ;
                break;
            case 'east':
                if (object.south()?.hasTag('tags:home_decorating.table.east')) {
                    if (object.north()?.hasTag('tags:home_decorating.table.east'))
                        opal.TrySetPermutation(object, 'STATE:stage', 3);
                }
                else if (!object.south()?.hasTag('tags:home_decorating.table.east')) {
                    if (!object.north()?.hasTag('tags:home_decorating.table.east'))
                        opal.TrySetPermutation(object, 'STATE:stage', 0);
                }
                ;
                break;
            case 'west':
                if (object.south()?.hasTag('tags:home_decorating.table.west')) {
                    if (object.north()?.hasTag('tags:home_decorating.table.west'))
                        opal.TrySetPermutation(object, 'STATE:stage', 3);
                }
                else if (!object.south()?.hasTag('tags:home_decorating.table.west')) {
                    if (!object.north()?.hasTag('tags:home_decorating.table.west'))
                        opal.TrySetPermutation(object, 'STATE:stage', 0);
                }
                ;
                break;
            default: break;
        }
    }
    else if (object.permutation.getState('STATE:stage') == 0) {
        switch (object.permutation.getState('minecraft:cardinal_direction')) {
            case 'south':
                if (object.east()?.hasTag('tags:home_decorating.table.south') && object.west()?.hasTag('tags:home_decorating.table.south'))
                    opal.TrySetPermutation(object, 'STATE:stage', 3);
                else if (object.east()?.hasTag('tags:home_decorating.table.south'))
                    opal.TrySetPermutation(object, 'STATE:stage', 2);
                else if (object.west()?.hasTag('tags:home_decorating.table.south'))
                    opal.TrySetPermutation(object, 'STATE:stage', 1);
                break;
            case 'north':
                if (object.east()?.hasTag('tags:home_decorating.table.north') && object.west()?.hasTag('tags:home_decorating.table.north'))
                    opal.TrySetPermutation(object, 'STATE:stage', 3);
                else if (object.east()?.hasTag('tags:home_decorating.table.north'))
                    opal.TrySetPermutation(object, 'STATE:stage', 1);
                else if (object.west()?.hasTag('tags:home_decorating.table.north'))
                    opal.TrySetPermutation(object, 'STATE:stage', 2);
                break;
            case 'east':
                if (object.south()?.hasTag('tags:home_decorating.table.east') && object.north()?.hasTag('tags:home_decorating.table.east'))
                    opal.TrySetPermutation(object, 'STATE:stage', 3);
                else if (object.south()?.hasTag('tags:home_decorating.table.east'))
                    opal.TrySetPermutation(object, 'STATE:stage', 1);
                else if (object.north()?.hasTag('tags:home_decorating.table.east'))
                    opal.TrySetPermutation(object, 'STATE:stage', 2);
                break;
            case 'west':
                if (object.south()?.hasTag('tags:home_decorating.table.west') && object.north()?.hasTag('tags:home_decorating.table.west'))
                    opal.TrySetPermutation(object, 'STATE:stage', 3);
                else if (object.south()?.hasTag('tags:home_decorating.table.west'))
                    opal.TrySetPermutation(object, 'STATE:stage', 2);
                else if (object.north()?.hasTag('tags:home_decorating.table.west'))
                    opal.TrySetPermutation(object, 'STATE:stage', 1);
                break;
            default: break;
        }
        ;
    }
}
;
