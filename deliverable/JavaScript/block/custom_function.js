/*
 * 原版接口
 */
import * as server from "@minecraft/server";
/*
 * 系统组件
 */
import * as opal from "../system/opal";
import { crops_map, solidify_output } from "../data/table";
/**
 * * 机关之门 的 关闭事件标识符
 */
const tickId = new Map();
/**
 ** 时间积分
 */
const tickScore = new Map();
/**
 * * 进行检测的默认状态
 */
const defaultState = 'STATE:rune_type';
/**
 * * 方块交互组件触发器
 *
 * @param source - 方块组件参数
 */
export function InteractComponentTrigger(source) {
    /**
     * * 方块对象
     */
    const block = source.block;
    /**
     * * 方块状态
     */
    const state = source.block.permutation;
    /**
     * * 方块维度
     */
    const dimension = source.dimension;
    /**
     * * 玩家对象
     */
    const player = source.player;
    /**
     * * 玩家背包
     */
    const container = player?.getComponent('minecraft:inventory')?.container;
    /**
     * * 物品对象
     */
    const item = container?.getItem(player?.selectedSlotIndex ?? 0);
    // 返回 方块交互组件 的 解构
    return { block, state, dimension, player, container, item };
}
;
/**
 ** 方块计时器
 *
 * 此方法为方块对象设置一个单调递增的计时器,
 * 当计时器的值达到或超过指定的时间节点时,
 * 执行一个回调函数,
 * 计时器用于跟踪每个方块的位置和积分,
 * 以便在特定条件下触发事件
 *
 * @param {server.Block} block - 预约时钟事件的方块对象
 *
 * @param {number} bounds - 触发事件的时间节点
 *
 * @param {(block: server.Block) => void} after - 当计时器的值达到或超过界限时执行的事件回调函数
 *
 * @returns {Error | void} - 错误对象或空值
 */
export function blockTimer(block, bounds, after) {
    /**
     ** 方块位置
     */
    const position = opal.Vector.toString(block.location);
    /**
     ** 时间积分
     */
    const onTick = tickScore.get(position);
    // 创建时间积分
    if (!onTick || onTick[0] != block.typeId)
        tickScore.set(position, [block.typeId, 1]);
    // 判断与赋值事件积分
    else if (onTick && onTick[1] <= bounds)
        tickScore.set(position, [block.typeId, onTick[1] + 1]);
    // 执行事件
    else {
        // 移除当前方块位置的时间积分
        tickScore.delete(opal.Vector.toString(block.location));
        // 尝试执行回调函数
        try {
            return after(block);
        }
        catch (error) {
            return error;
        }
    }
}
;
/**
 * * 方块时钟组件触发器
 *
 * @param source - 方块组件参数
 */
export function TickComponentTrigger(source) {
    /**
     * * 方块对象
     */
    const block = source.block;
    /**
     * * 方块状态
     */
    const state = source.block.permutation;
    /**
     * * 方块维度
     */
    const dimension = source.dimension;
    /**
     * * 默认的方块状态的值
     */
    const condition = state.getState(defaultState) ?? 0;
    // 返回 方块组件 的 解构
    return { block, state, condition, dimension };
}
;
/**
 * * 魔晶传送 - 向上传送 < 30 能量消耗 >
 */
export function AboveTeleport(block) {
    /**
     * * 获取实体队列
     */
    const entitys = block.dimension.getEntitiesAtBlockLocation(block);
    // 执行事件机制
    if (!opal.ExpendEnergy(block, -30))
        return;
    // 遍历 射线方向 的 128个 方块
    for (let index = 1; index < 128; index++) {
        try {
            /**
             * * 获取方块对象
             */
            const target = block.offset({ x: 0, y: index, z: 0 });
            // 判断方块是否为 魔晶上传 或 魔晶下传
            if (target?.typeId !== 'starry_map:magic_portal_above' && target?.typeId !== 'starry_map:magic_portal_below')
                continue;
            // 传送实体
            entitys.forEach(info => info.teleport(target.center()));
            // 创建路径规划
            opal.PathExecute.Create('魔晶上传-路径显示', 1, {
                locations: [block.location, target.location],
                particles: ['constant:smoke_rune_purple'],
                offset: opal.Vector.CONSTANT_HALF,
                dimension: block.dimension,
                cooldown: 1,
                speed: opal.Vector.distance(block, target),
            });
            break;
        }
        catch {
            opal.ErrorMessage('<§l§b 魔晶上传 §r>§4 发生错误§r', block, { text: '实体传送失败, 请勿在<§l§m 世界边界 §r>或<§l§n 世界之外 §r>使用!!' });
            break;
        }
    }
}
;
/**
 * * 魔晶传送 - 向下传送 < 30 能量消耗 >
 */
export function BelowTeleport(block) {
    /**
     * * 获取实体队列
     */
    const getEntityGroup = block.dimension.getEntitiesAtBlockLocation(block);
    // 执行事件机制
    if (!opal.ExpendEnergy(block, -30))
        return;
    // 遍历 射线方向 的 128个 方块
    for (let index = 1; index < 128; index++) {
        try {
            /**
             * * 获取方块对象
             */
            const target = block.offset({ x: 0, y: -index, z: 0 });
            // 判断方块是否为 魔晶上传 或 魔晶下传
            if (target?.typeId !== 'starry_map:magic_portal_above' && target?.typeId !== 'starry_map:magic_portal_below')
                continue;
            // 传送实体
            getEntityGroup.forEach(info => info.teleport(target.center()));
            // 创建路径规划
            opal.PathExecute.Create('魔晶下传-路径显示', 1, {
                locations: [block.location, target.location],
                particles: ['constant:smoke_rune_purple'],
                offset: opal.Vector.CONSTANT_HALF,
                dimension: block.dimension,
                cooldown: 1,
                speed: opal.Vector.distance(block, target),
            });
            break;
        }
        catch {
            opal.ErrorMessage('<§l§b 魔晶下传 §r>§4 发生错误§r', block, { text: '实体传送失败, 请勿在<§l§m 世界边界 §r>或<§l§n 世界之外 §r>使用!!' });
            break;
        }
    }
}
;
/**
 * * 开启 垂直放置 的 机关之门
 *
 * @param {server.Block} block - 机关门对象
 */
export function verticalGate(block) {
    /**
     * * 获取 机关门方向
     */
    const about = block.permutation.getState('STATE:about');
    // 判断 门方向
    if (about == 1 || about == 3) {
        const east = block.east();
        const west = block.west();
        // 激活 东门
        if (east?.typeId == block.typeId && east?.permutation.getState('STATE:rune_type') == 0)
            opal.TrySetPermutation(east, 'STATE:rune_type', 1);
        // 激活 西门
        if (west?.typeId == block.typeId && west?.permutation.getState('STATE:rune_type') == 0)
            opal.TrySetPermutation(west, 'STATE:rune_type', 3);
    }
    else if (about == 2 || about == 4) {
        const north = block.north();
        const south = block.south();
        // 激活 北门
        if (north?.typeId == block.typeId && north?.permutation.getState('STATE:rune_type') == 0)
            opal.TrySetPermutation(north, 'STATE:rune_type', 2);
        // 激活 南门
        if (south?.typeId == block.typeId && south?.permutation.getState('STATE:rune_type') == 0)
            opal.TrySetPermutation(south, 'STATE:rune_type', 4);
    }
    ;
    const above = block.above();
    const below = block.below();
    // 激活 上方机关门
    if (above?.typeId == block.typeId && above?.permutation.getState('STATE:rune_type') == 0)
        opal.TrySetPermutation(above, 'STATE:rune_type', 5);
    // 激活 下方机关门
    if (below?.typeId == block.typeId && below?.permutation.getState('STATE:rune_type') == 0)
        opal.TrySetPermutation(below, 'STATE:rune_type', 6);
    // 获取 时钟标识符
    const toString = opal.Vector.toString(block.location);
    // 复位机关门
    const tick = server.system.runTimeout(() => {
        // 播放 关门音效
        block.dimension.playSound('close.iron_door', block.location);
        // 复位机关门
        opal.TrySetPermutation(block, 'STATE:rune_type', 0);
    }, 100);
    // 设置定时器
    tickId.set(toString, tick);
}
;
/**
 * * 开启 水平放置 的 机关之门
 *
 * @param {server.Block}  block - 机关门对象
 */
export function horizontalGate(block) {
    // 获取周围的方块
    const north = block.north();
    const south = block.south();
    const east = block.east();
    const west = block.west();
    // 激活 东门
    if (east?.typeId == block.typeId && east?.permutation.getState('STATE:rune_type') == 0)
        opal.TrySetPermutation(east, 'STATE:rune_type', 1);
    // 激活 西门
    if (west?.typeId == block.typeId && west?.permutation.getState('STATE:rune_type') == 0)
        opal.TrySetPermutation(west, 'STATE:rune_type', 3);
    // 激活 北门
    if (north?.typeId == block.typeId && north?.permutation.getState('STATE:rune_type') == 0)
        opal.TrySetPermutation(north, 'STATE:rune_type', 2);
    // 激活 南门
    if (south?.typeId == block.typeId && south?.permutation.getState('STATE:rune_type') == 0)
        opal.TrySetPermutation(south, 'STATE:rune_type', 4);
    // 获取 时钟标识符
    const toString = opal.Vector.toString(block.location);
    // 复位机关门
    const tick = server.system.runTimeout(() => {
        // 播放 关门音效
        block.dimension.playSound('close.iron_door', block.location);
        // 复位机关门
        opal.TrySetPermutation(block, 'STATE:rune_type', 0);
    }, 100);
    // 设置定时器
    tickId.set(toString, tick);
}
;
/**
 * * 紧急关闭机关门
 *
 * @param {server.Block} object - 机关门对象
 */
export function emergencyCloseMechanismDoor(object) {
    for (let x = -4; x < 4; x++)
        for (let y = -4; y < 4; y++)
            for (let z = -4; z < 4; z++) {
                /**
                 * * 获取方块对象
                 */
                const target = object.offset({ x, y, z });
                if (target?.typeId != object.typeId)
                    continue;
                // 获取 时钟标识符
                const toString = opal.Vector.toString(target?.location);
                // 复位机关门
                opal.TrySetPermutation(target, 'STATE:rune_type', 0);
                /**
                 * * 获取 时钟标识符
                 */
                const tick = tickId.get(toString);
                if (!tick)
                    continue;
                // 移除定时器
                server.system.clearRun(tick);
                tickId.delete(toString);
            }
}
;
/**
 ** 获取周围 魔导总线方块 的 有效数组
 *
 * @param block - 发起事件 的 方块对象
 *
 * @param type - 方块队列的 3轴识别特征
 *
 * @returns {server.Block[]} 被选中的总线方块队列
 */
function resolveMagicCableNeighborsByType(block, type) {
    /**
     ** 设定方块的原始数组
     */
    const getProtoArray = [];
    // 获取 方块的 周围方块
    try {
        // 获取可能进行交互的方块
        const portPositive_X = block.east();
        const portNegative_X = block.west();
        const portPositive_Y = block.above();
        const portNegative_Y = block.below();
        const portPositive_Z = block.south();
        const portNegative_Z = block.north();
        /**
         ** 获取 方块的 3轴识别特征
         */
        const getPoint = type.split(/\s+/)[0].split(/-/);
        //根据 3轴特征 注入数组
        switch (getPoint[0]) {
            case 'Xx':
                if (portPositive_X?.hasTag("tags:magic_cable.port_negative.X"))
                    getProtoArray.push(portPositive_X);
                if (portNegative_X?.hasTag("tags:magic_cable.port_positive.X"))
                    getProtoArray.push(portNegative_X);
                break;
            case 'X':
                if (portPositive_X?.hasTag("tags:magic_cable.port_negative.X"))
                    getProtoArray.push(portPositive_X);
                break;
            case 'x':
                if (portNegative_X?.hasTag("tags:magic_cable.port_positive.X"))
                    getProtoArray.push(portNegative_X);
                break;
            default: break;
        }
        ;
        switch (getPoint[1]) {
            case 'Yy':
                if (portPositive_Y?.hasTag("tags:magic_cable.port_negative.Y"))
                    getProtoArray.push(portPositive_Y);
                if (portNegative_Y?.hasTag("tags:magic_cable.port_positive.Y"))
                    getProtoArray.push(portNegative_Y);
                break;
            case 'Y':
                if (portPositive_Y?.hasTag("tags:magic_cable.port_negative.Y"))
                    getProtoArray.push(portPositive_Y);
                break;
            case 'y':
                if (portNegative_Y?.hasTag("tags:magic_cable.port_positive.Y"))
                    getProtoArray.push(portNegative_Y);
                break;
            default: break;
        }
        ;
        switch (getPoint[2]) {
            case 'Zz':
                if (portPositive_Z?.hasTag("tags:magic_cable.port_negative.Z"))
                    getProtoArray.push(portPositive_Z);
                if (portNegative_Z?.hasTag("tags:magic_cable.port_positive.Z"))
                    getProtoArray.push(portNegative_Z);
                break;
            case 'Z':
                if (portPositive_Z?.hasTag("tags:magic_cable.port_negative.Z"))
                    getProtoArray.push(portPositive_Z);
                break;
            case 'z':
                if (portNegative_Z?.hasTag("tags:magic_cable.port_positive.Z"))
                    getProtoArray.push(portNegative_Z);
                break;
            default: break;
        }
        ;
    }
    catch (error) {
        /**
         * 获取 错误信息
         */
        const info = error instanceof Error ? error : new Error(String(error));
        opal.ErrorMessage('<§l§b 魔导总线 §r>§4 发生错误§r', block, { text: info.message + '.|.' + info.name });
    }
    ;
    //返回经过最终过滤的方块数组
    return getProtoArray.filter(info => {
        /**
         ** 获取方块的魔力类型
         */
        const state = info.permutation.getState('STATE:rune_type');
        return state === 0;
    });
}
;
/**
 * * 红石侦测
 * 检测红石信号变化并触发魔导总线方块更新
 *
 * @param {server.Block} block - 当前方块对象
 *
 * @param {string} type - 魔导总线方向配置字符串
 *
 * @param {server.BlockPermutation} currentPermutation - 方块当前的排列状态
 *
 * @returns {Error | void} 如果设置失败返回错误信息，成功则返回 undefined
 */
export function redstoneDetection(block, type, currentPermutation) {
    try {
        /**
         * 获取上方红石信号强度
         */
        const redstonePower = block.above()?.getRedstonePower();
        /**
         * 获取当前保存的红石值
         */
        const storedPower = currentPermutation.getState('STATE:redstone');
        // 如果无红石信号则重置状态并返回
        if (redstonePower == undefined)
            return opal.TrySetPermutation(block, 'STATE:redstone', 0);
        // 如果红石能量值发生变化，则更新方块状态
        if (redstonePower !== storedPower) {
            // 更新方块的红石状态
            opal.TrySetPermutation(block, 'STATE:redstone', redstonePower);
            /**
             * 获取符合条件的魔导总线方块并更新其 rune_type
             */
            const targets = resolveMagicCableNeighborsByType(block, type);
            // 循环更新魔导总线方块
            opal.TrySetPermutation(targets, 'STATE:rune_type', opal.RandomFloor(1, 7));
        }
    }
    catch (error) {
        /**
         * 格式化错误信息
         */
        const message = { text: (error instanceof Error ? error : new Error(String(error))).message };
        // 显示错误信息
        opal.ErrorMessage('<§l§b 超导髓鞘 §r>§4 发生错误§r', block, message);
    }
}
;
/**
 * 超导脉冲：设置方块状态并沿指定方向激活魔导总线
 *
 * @param {server.Block} self - 当前方块对象
 *
 * @param {string} type - 方块朝向字符串，如 "up", "east"
 *
 * @returns {server.Block | undefined} 找到并激活的魔导总线方块 或 undefined
 */
export function superPulse(self, type) {
    try {
        // 设置自身 rune_type 为 9（表示正在发送信号）
        server.system.run(() => opal.TrySetPermutation(self, 'STATE:rune_type', 9));
        /**
         * 定义朝向映射
         */
        const directionMap = {
            up: opal.Vector.CONSTANT_UP,
            down: opal.Vector.CONSTANT_DOWN,
            east: opal.Vector.CONSTANT_EAST,
            west: opal.Vector.CONSTANT_WEST,
            north: opal.Vector.CONSTANT_NORTH,
            south: opal.Vector.CONSTANT_SOUTH
        };
        /**
         * 获取对应方向
         */
        const source = directionMap[type];
        // 如果方向不存在则立刻返回
        if (!source)
            return undefined;
        // 沿该方向查找并激活魔导总线
        for (let index = 1; index < 32; index++) {
            /**
             * 获取目标方块
             */
            const target = self.offset(opal.Vector.multiply(source, index));
            /**
             * 获取目标方块的状态值
             */
            const state = target?.permutation.getState('STATE:rune_type') ?? 9;
            // 检查是否为目标魔导总线方块
            if (!target?.hasTag('tags:magic_cable.series') || state !== 0 || target.typeId === self.typeId)
                continue;
            // 激活目标方块
            opal.TrySetPermutation(target, 'STATE:rune_type', self.permutation.getState('STATE:rune_type'));
            // 返回被选中的方块
            return target;
        }
        // 若未找到有效方块，返回 undefined
        return undefined;
    }
    catch (error) {
        /**
         * 格式化错误信息
         */
        const message = { text: (error instanceof Error ? error : new Error(String(error))).message };
        // 显示错误信息
        opal.ErrorMessage('<§l§b 超导髓鞘 §r>§4 发生错误§r', self, message);
        // 返回自身
        return self;
    }
}
;
/**
 ** 超导枢纽
 */
export function superOmphalos(object, states) {
    // 遍历 6 个方向 的 方块
    try {
        ['up', 'down', 'north', 'south', 'west', 'east'].forEach(
        // 替换指定方向的方块
        info => opal.TryFillBlocks(object.dimension, opal.Vector.add(object, { x: 11, y: 11, z: 11 }), opal.Vector.add(object, { x: -11, y: -11, z: -11 }), server.BlockPermutation.resolve('starry_map:super_pulse', {
            "STATE:rune_type": states.getState('STATE:rune_type'),
            "minecraft:block_face": info
        }), {
            blockFilter: {
                includePermutations: [
                    server.BlockPermutation.resolve('starry_map:super_pulse', {
                        "STATE:rune_type": 0,
                        "minecraft:block_face": info
                    })
                ]
            }
        }));
    }
    // 异常处理, 显示错误信息
    catch {
        opal.ErrorMessage('<§l§b 超导枢纽 §r>§4 发生错误§r', object, { text: '无法发送<§l§c 总线信号 §r>, 请勿在<§l§m 世界边界 §r>或<§l§n 世界之外 §r>使用!!' });
    }
    ;
    //复位自身状态
    opal.TrySetPermutation(object, 'STATE:rune_type', 9);
}
;
/**
 ** 信号编译
 */
export function signalCompilation(object, type, states) {
    /**
     ** 异常处理
     */
    const onError = () => {
        object.setPermutation(object.permutation.withState('STATE:stage', 2));
        object.setPermutation(object.permutation.withState('STATE:index', 0));
        opal.ErrorMessage('<§l§b 信号编译 §r>§4 发生错误§r', object, { text: '未能在设备上方找到合适的<§l§3 方块容器 §r>' });
    };
    /**
     ** 获取上方方块对象
     */
    const aboveBlock = object.above();
    /**
     ** 获取 物品容器
     */
    const getContainer = aboveBlock?.getComponent('minecraft:inventory')?.container;
    /**
     ** 获取 物品容器 索引
     */
    const getSlot = states.getState('STATE:index');
    //确认 容器 真实存在
    if (!getContainer)
        return onError();
    // 检查 物品容器 索引 是否超出范围 或  索引 是否为 15
    if (getSlot >= getContainer.size || getSlot == 15) {
        opal.TrySetPermutation(object, 'STATE:stage', 2);
        opal.TrySetPermutation(object, 'STATE:index', 0);
        return;
    }
    ;
    const blocks = resolveMagicCableNeighborsByType(object, type);
    //根据获得参数 进行 方块属性 设置
    switch (getContainer.getItem(getSlot)?.typeId) {
        case 'starry_map:blue_energy':
            opal.TrySetPermutation(blocks, 'STATE:rune_type', 1);
            break;
        case 'starry_map:red_energy':
            opal.TrySetPermutation(blocks, 'STATE:rune_type', 2);
            break;
        case 'starry_map:green_energy':
            opal.TrySetPermutation(blocks, 'STATE:rune_type', 3);
            break;
        case 'starry_map:orange_energy':
            opal.TrySetPermutation(blocks, 'STATE:rune_type', 4);
            break;
        case 'starry_map:purple_energy':
            opal.TrySetPermutation(blocks, 'STATE:rune_type', 5);
            break;
        case '能量水晶:启程_魔晶石':
            opal.TrySetPermutation(blocks, 'STATE:rune_type', 6);
            break;
        case '能量水晶:焚绝_魔晶石':
            opal.TrySetPermutation(blocks, 'STATE:rune_type', 7);
            break;
        default:
            opal.TrySetPermutation(blocks, 'STATE:rune_type', 0);
            break;
    }
    ;
    // 修改 物品容器 索引
    opal.TrySetPermutation(object, 'STATE:index', getSlot + 1);
}
;
/**
 ** 交互终端
 *
 * @param object - 发起事件的方块对象
 *
 * @param type - 方块队列的 3轴识别特征
 *
 * @param states - 方块 的 状态属性
 */
export function interactiveTerminal(object, type, states) {
    const blocks = resolveMagicCableNeighborsByType(object, type);
    opal.TrySetPermutation(blocks, 'STATE:rune_type', states.getState('STATE:rune_note'));
}
;
/**
 ** 逻辑元件
 *
 * @param object - 发起事件的方块对象
 *
 * @param type - 方块队列的 3轴识别特征
 */
export function logicComponents(object, type) {
    /**
     ** 获取 魔导总线队列
     */
    const blocks = resolveMagicCableNeighborsByType(object, type);
    opal.TrySetPermutation(blocks, 'STATE:rune_type', opal.RandomFloor(1, 7));
    if (object.typeId == 'starry_map:logic_inverter')
        return;
    // 重置逻辑锁存器
    for (let axleX = -1; axleX <= 1; axleX++)
        for (let axleY = -1; axleY <= 1; axleY++)
            for (let axleZ = -1; axleZ <= 1; axleZ++) {
                /**
                 ** 获取方块对象
                 */
                const block = object.offset({ x: axleX, y: axleY, z: axleZ });
                if (block?.typeId == 'starry_map:pulse_latch')
                    opal.TrySetPermutation(block, 'STATE:rune_note', 0);
            }
    ;
}
;
/**
 ** 信号处理
 *
 * @param object - 发起事件的方块对象
 *
 * @param type - 方块队列的 3轴识别特征
 *
 * @param states - 方块 的 状态属性
 */
export function signalProcessing(object, type, states) {
    /**
     ** 获取 魔导总线队列
     */
    const blocks = resolveMagicCableNeighborsByType(object, type);
    opal.TrySetPermutation(blocks, 'STATE:rune_type', states.getState('STATE:rune_note'));
    opal.TrySetPermutation(object, 'STATE:rune_type', 9);
}
;
/**
 ** 逻辑单通
 *
 * @param {server.Block} object - 发起事件的方块对象
 */
function logicSingle(object) {
    const direction = object.permutation.getState('minecraft:block_face');
    function detection_up() {
        /**
         ** 属性输入
         */
        const input = object.offset(opal.Vector.CONSTANT_UP);
        /**
         ** 属性输出
         */
        const output = object.offset(opal.Vector.CONSTANT_DOWN);
        if (!input || !input?.hasTag('tags:magic_cable.open'))
            return;
        if (!output || !output?.hasTag('tags:magic_cable.series'))
            return;
        /**
         ** 方块属性
         */
        const states = input.permutation;
        opal.TrySetPermutation(output, 'STATE:rune_type', states.getState('STATE:rune_note'));
        server.system.runTimeout(() => opal.TrySetPermutation(input, 'STATE:rune_note', 0), 5);
    }
    ;
    function detection_down() {
        /**
         ** 属性输入
         */
        const input = object.offset(opal.Vector.CONSTANT_DOWN);
        /**
         ** 属性输出
         */
        const output = object.offset(opal.Vector.CONSTANT_UP);
        if (!input || !input?.hasTag('tags:magic_cable.open'))
            return;
        if (!output || !output?.hasTag('tags:magic_cable.series'))
            return;
        /**
         ** 方块属性
         */
        const states = input.permutation;
        opal.TrySetPermutation(output, 'STATE:rune_type', states.getState('STATE:rune_note'));
        server.system.runTimeout(() => opal.TrySetPermutation(input, 'STATE:rune_note', 0), 5);
    }
    ;
    function detection_north() {
        /**
         ** 属性输入
         */
        const input = object.offset(opal.Vector.CONSTANT_NORTH);
        /**
         ** 属性输出
         */
        const output = object.offset(opal.Vector.CONSTANT_SOUTH);
        if (!input || !input?.hasTag('tags:magic_cable.open'))
            return;
        if (!output || !output?.hasTag('tags:magic_cable.series'))
            return;
        /**
         ** 方块属性
         */
        const states = input.permutation;
        opal.TrySetPermutation(output, 'STATE:rune_type', states.getState('STATE:rune_note'));
        server.system.runTimeout(() => opal.TrySetPermutation(input, 'STATE:rune_note', 0), 5);
    }
    ;
    function detection_south() {
        /**
         ** 属性输入
         */
        const input = object.offset(opal.Vector.CONSTANT_SOUTH);
        /**
         ** 属性输出
         */
        const output = object.offset(opal.Vector.CONSTANT_NORTH);
        if (!input || !input?.hasTag('tags:magic_cable.open'))
            return;
        if (!output || !output?.hasTag('tags:magic_cable.series'))
            return;
        /**
         ** 方块属性
         */
        const states = input.permutation;
        opal.TrySetPermutation(output, 'STATE:rune_type', states.getState('STATE:rune_note'));
        server.system.runTimeout(() => opal.TrySetPermutation(input, 'STATE:rune_note', 0), 5);
    }
    ;
    function detection_west() {
        /**
         ** 属性输入
         */
        const input = object.offset(opal.Vector.CONSTANT_WEST);
        /**
         ** 属性输出
         */
        const output = object.offset(opal.Vector.CONSTANT_EAST);
        if (!input || !input?.hasTag('tags:magic_cable.open'))
            return;
        if (!output || !output?.hasTag('tags:magic_cable.series'))
            return;
        /**
         ** 方块属性
         */
        const states = input.permutation;
        opal.TrySetPermutation(output, 'STATE:rune_type', states.getState('STATE:rune_note'));
        server.system.runTimeout(() => opal.TrySetPermutation(input, 'STATE:rune_note', 0), 5);
    }
    ;
    function detection_east() {
        /**
         ** 属性输入
         */
        const input = object.offset(opal.Vector.CONSTANT_EAST);
        /**
         ** 属性输出
         */
        const output = object.offset(opal.Vector.CONSTANT_WEST);
        if (!input || !input?.hasTag('tags:magic_cable.open'))
            return;
        if (!output || !output?.hasTag('tags:magic_cable.series'))
            return;
        /**
         ** 方块属性
         */
        const states = input.permutation;
        opal.TrySetPermutation(output, 'STATE:rune_type', states.getState('STATE:rune_note'));
        server.system.runTimeout(() => opal.TrySetPermutation(input, 'STATE:rune_note', 0), 5);
    }
    ;
    switch (direction) {
        case 'up':
            detection_up();
            break;
        case 'down':
            detection_down();
            break;
        case 'north':
            detection_north();
            break;
        case 'south':
            detection_south();
            break;
        case 'west':
            detection_west();
            break;
        case 'east':
            detection_east();
            break;
        default: break;
    }
}
;
/**
 ** 逻辑锁存器更新事件
 *
 * @param block - 发起事件的方块对象
 */
export function LatchUpdateEvent(block) {
    /**
     ** 执行 方块更新事件 的 方块列表
     */
    const blocks = [];
    // 获取 进行更新的方块
    for (let axleX = -1; axleX <= 1; axleX++)
        for (let axleY = -1; axleY <= 1; axleY++)
            for (let axleZ = -1; axleZ <= 1; axleZ++) {
                const Pointer = block.offset({ x: axleX, y: axleY, z: axleZ });
                if (Pointer)
                    blocks.push(Pointer);
            }
    ;
    // 遍历 方块列表
    blocks.forEach(block => {
        switch (block.typeId) {
            case 'starry_map:logic_single':
                logicSingle(block);
                break;
            case 'starry_map:logical_and':
                opal.TrySetPermutation(block, 'STATE:stage', 1);
                break;
            case 'starry_map:exclusive_or':
                opal.TrySetPermutation(block, 'STATE:stage', 1);
                break;
            default: break;
        }
    });
}
;
/**
 ** 魔导总线默认激活事件
 *
 * @param object - 发起事件的方块对象
 *
 * @param type - 方块队列的 3轴识别特征
 *
 * @param state - 方块 的 状态属性
 */
export function activateConnectedMagicCables(object, type, state) {
    /**
     ** 获取 方块队列
     */
    const blocks = resolveMagicCableNeighborsByType(object, type);
    // 遍历设置与之连接的方块状态
    opal.TrySetPermutation(blocks, 'STATE:rune_type', state.getState('STATE:rune_type'));
    // 设置自身的方块状态
    opal.TrySetPermutation(object, 'STATE:rune_type', 9);
}
;
/**
 * * 物资收集 < 30 能量消耗 >
 */
export function materialCollection(block, permutation) {
    // 判断能量值 是否足够
    if (!opal.ExpendEnergy(block, -30))
        return;
    /**
     * * 实体查询选项
     */
    const setOptions = {
        maxDistance: (permutation.getState('STATE:value') + 1) * 8,
        type: "minecraft:item",
        location: block
    };
    /**
     * * 获取实体队列
     */
    const items = block.dimension.getEntities(setOptions);
    /**
     * * 获取方块容器
     */
    const container = block.below()?.getComponent('inventory')?.container;
    //尝试播放粒子效果
    items.forEach(info => opal.TrySpawnParticle(info.dimension, 'constant:smoke_rune_purple', info.location));
    //尝试进行 物资收集
    if (container && container.emptySlotsCount >= items.length)
        items.forEach(info => {
            /**
             * * 获取 物资对象
             */
            const item = info.getComponent('item')?.itemStack;
            container.addItem(item);
            info.remove();
        });
    else
        items.forEach(info => info.teleport(block.center()));
}
;
/**
 * * 获取 目标方块
 *
 * @returns {server.Block} 目标方块块
 */
function getTargetBlock(block) {
    /**
     * * 储存 目标方块队列
     */
    const setBlcokGroup = [];
    //获取 方块队列
    for (let index = 2; index < 64; index++) {
        /**
         * * 获取 方块对象
         */
        const getBlock = block.offset({ x: 0, y: -index, z: 0 });
        //判断 方块是否存在
        if (getBlock)
            setBlcokGroup.push(getBlock);
    }
    ;
    //过滤 方块队列
    return setBlcokGroup.filter(block => !block.isAir)[0];
}
;
/**
 * * 尝试填充方块

 * @param {server.Container} container 可用物品容器

 * @param {server.Vector3} location 方块填充位置
 */
function FillingTest(block, container, location) {
    //遍历 物品容器中的物品
    for (let index = 0; index < container.size; index++) {
        /**
         * * 获取容器中的物品
         */
        const getItem = container.getItem(index);
        //判断 物品是否存在
        if (!getItem)
            continue;
        try {
            /**
             * * 获取方块标识符
             */
            const blockID = crops_map.get(getItem.typeId) ?? getItem.typeId;
            // 尝试填充方块
            opal.TryFillBlocks(block.dimension, location, location, server.BlockPermutation.resolve(blockID));
            // 减少 物品堆栈
            opal.ConsumeItemStack(container, index, getItem);
            break;
        }
        catch {
            continue;
        }
    }
}
;
/**
 * * 方块放置 < 60 能量消耗 >
 */
export function blockPlacement(block) {
    // 判断能量值 是否足够
    if (!opal.ExpendEnergy(block, -60))
        return;
    /**
     * * 获取上方的方块对象
     */
    const aboveBlock = block.above();
    /**
     * * 获取物品容器
     */
    const getContainer = aboveBlock?.getComponent('minecraft:inventory')?.container;
    // 判断 物品容器是否存在
    if (!getContainer)
        return opal.ErrorMessage('<§l§b 方块放置 §r>§4 发生错误§r', block, { text: '未能在设备上方找到合适的<§l§3 方块容器 §r>' });
    // 遍历 物品容器中的物品
    if (getContainer.size > 1) {
        /**
         * * 获取 目标方块
         */
        const getTarget = getTargetBlock(block) ?? block;
        /**
         * * 设定进行填充测试的位置
         */
        const getPlace = opal.Vector.add(getTarget, opal.Vector.CONSTANT_UP);
        //清除无效的方块
        block.dimension.runCommand(`fill ${getPlace.x} ${getPlace.y} ${getPlace.z} ${getPlace.x} ${getPlace.y} ${getPlace.z} air [] destroy`);
        //尝试进行填充测试
        server.system.runTimeout(() => FillingTest(block, getContainer, getPlace), 5);
        // 创建自由指针
        opal.SetFreePointer({ location: block.bottomCenter(), dimension: block.dimension }, getTarget.center(), 1);
    }
}
;
/**
 * * 打包投送 < 60 能量消耗 >
 */
export function packageDelivery(block, type) {
    // 判断能量值 是否足够
    if (!opal.ExpendEnergy(block, -60))
        return;
    /**
     * * 定义 物品信息 的 缓存数组
     */
    const setItemGroup = [];
    /**
     * * 查询 输入端 与 输出端 容器 并 传输容器物品

     * @param {server.Vector3} source 输入端 容器位置
     */
    function QueryContainer(source) {
        try {
            /**
             * * 获取 输入端 容器方块
             */
            const getBlockOpen = block.offset(source);
            /**
             * * 获取 输入端 容器信息
             */
            const getContainerOpen = getBlockOpen?.getComponent('minecraft:inventory')?.container;
            //寻找 输出端 容器
            for (let index = 1; index < 64; index++) {
                try {
                    /**
                     * * 获取 输出端 容器方块 相对 输入端 容器方块 的 偏移量
                     */
                    const pointer = opal.Vector.multiply(source, -index);
                    /**
                     * * 获取 输出端 容器方块
                     */
                    const getBlockDone = block.offset(pointer);
                    //检测 顶点容器 是否存在
                    if (!getBlockDone)
                        continue;
                    /**
                     * * 获取 输出端 容器信息
                     */
                    const getContainerDone = getBlockDone.getComponent('minecraft:inventory')?.container;
                    //检测 顶点容器 是否存在
                    if (!getContainerOpen || !getContainerDone)
                        continue;
                    /**
                     * * 获取 目标容器 的 可用空间
                     */
                    let getEmptyCount = getContainerDone.emptySlotsCount;
                    //基于 可用空间 遍历 输入端 容器
                    for (let index = 0; index < getContainerOpen.size; index++) {
                        /**
                         * * 获取物品信息
                         */
                        const getItem = getContainerOpen.getItem(index);
                        //检测 物品是否存在
                        if (getItem && getEmptyCount != 0) {
                            getContainerOpen.setItem(index);
                            setItemGroup.push(getItem);
                            getEmptyCount--;
                        }
                    }
                    ;
                    //向 目标容器 填充物品
                    for (let item of setItemGroup)
                        getContainerDone.addItem(item);
                    // 创建自由指针
                    opal.SetFreePointer({ location: block.bottomCenter(), dimension: block.dimension }, getBlockDone.bottomCenter(), 1);
                    break;
                }
                catch {
                    continue;
                }
            }
        }
        catch {
            opal.ErrorMessage('<§l§b 打包投送 §r>§4 发生错误§r', block, { text: '未能在设备后方找到合适的<§l§3 方块容器 §r>' });
        }
    }
    ;
    //根据需求选择功能
    switch (type) {
        case 'east':
            QueryContainer(opal.Vector.CONSTANT_WEST);
            break;
        case 'west':
            QueryContainer(opal.Vector.CONSTANT_EAST);
            break;
        case 'south':
            QueryContainer(opal.Vector.CONSTANT_NORTH);
            break;
        case 'north':
            QueryContainer(opal.Vector.CONSTANT_SOUTH);
            break;
        case 'up':
            QueryContainer(opal.Vector.CONSTANT_DOWN);
            break;
        case 'down':
            QueryContainer(opal.Vector.CONSTANT_UP);
            break;
    }
    ;
}
;
/**
 * * 驱动核心 < 120 能量消耗 >
 */
export function servoOmphalos(object, type) {
    // 判断能量值 是否足够
    if (!opal.ExpendEnergy(object, -120, true))
        return;
    /**
     * * 结构范围 上极限 坐标
     */
    const rangeMax = opal.Vector.add(object, { x: 10, y: 10, z: 10 });
    /**
     * * 结构范围 下极限 坐标
     */
    const rangeMin = opal.Vector.add(object, { x: -10, y: -10, z: -10 });
    /**
     * * 设置 方块执行 的 指令
     */
    const RunCode = (info) => object.dimension.runCommand(info);
    /**
     * * 移动 范围内 的 全部实体
     *
     * @param {server.Vector3} args 移动 方向
     */
    function MoveEntity(args) {
        try {
            /**
             * * 设置 实体查询选项
             */
            const setOptions = {
                location: object.location,
                maxDistance: 16
            };
            /**
             * * 获取实体队列
             */
            const getEntityGroup = object.dimension.getEntities(setOptions);
            //遍历实体数组
            getEntityGroup.forEach(info => {
                /**
                 * * 设定 范围 坐标 X
                 */
                const setRangeX = Math.max(rangeMin.x - 1, Math.min(info.location.x, rangeMax.x + 1)) === info.location.x ? 1 : 0;
                /**
                 * * 设定 范围 坐标 Y
                 */
                const setRangeY = Math.max(rangeMin.y - 1, Math.min(info.location.y, rangeMax.y + 1)) === info.location.y ? 1 : 0;
                /**
                 * * 设定 范围 坐标 Z
                 */
                const setRangeZ = Math.max(rangeMin.z - 1, Math.min(info.location.z, rangeMax.z + 1)) === info.location.z ? 1 : 0;
                //移动 符合要求 的 实体
                if (setRangeX + setRangeY + setRangeZ == 3) {
                    /**
                     * * 计算 水平 弹射 速度
                     */
                    const horizontalPower = (Math.abs(args.x) + Math.abs(args.z)) * 1.125;
                    // 向量弹射
                    info.applyKnockback({ x: args.x * horizontalPower, z: args.z * horizontalPower }, Math.abs(args.y) * 0.5);
                }
            });
        }
        catch { }
    }
    ;
    // 获取 结构 的 尺寸信息
    for (let index = 0; index <= 10; index++) {
        if (rangeMax.x == object.x + 10) {
            /**
             * * 获取 指定位置 的 方块
             */
            const getBlock = object.offset({ x: index, y: 0, z: 0 });
            // 判断 方块 是否 符合要求
            if (getBlock && getBlock.isAir)
                rangeMax.x = object.x + index;
        }
        if (rangeMin.x == object.x - 10) {
            /**
             * * 获取 指定位置 的 方块
             */
            const getBlock = object.offset({ x: -index, y: 0, z: 0 });
            // 判断 方块 是否 符合要求
            if (getBlock && getBlock.isAir)
                rangeMin.x = object.x - index;
        }
        if (rangeMax.y == object.y + 10) {
            /**
             * * 获取 指定位置 的 方块
             */
            const getBlock = object.offset({ x: 0, y: index, z: 0 });
            // 判断 方块 是否 符合要求
            if (getBlock && getBlock.isAir)
                rangeMax.y = object.y + index;
        }
        if (rangeMin.y == object.y - 10) {
            /**
             * * 获取 指定位置 的 方块
             */
            const getBlock = object.offset({ x: 0, y: -index, z: 0 });
            // 判断 方块 是否 符合要求
            if (getBlock && getBlock.isAir)
                rangeMin.y = object.y - index;
        }
        if (rangeMax.z == object.z + 10) {
            /**
             * * 获取 指定位置 的 方块
             */
            const getBlock = object.offset({ x: 0, y: 0, z: index });
            // 判断 方块 是否 符合要求
            if (getBlock && getBlock.isAir)
                rangeMax.z = object.z + index;
        }
        if (rangeMin.z == object.z - 10) {
            /**
             * * 获取 指定位置 的 方块
             */
            const getBlock = object.offset({ x: 0, y: 0, z: -index });
            // 判断 方块 是否 符合要求
            if (getBlock && getBlock.isAir)
                rangeMin.z = object.z - index;
        }
    }
    ;
    //将区块内的方块移动到指定位置
    switch (type) {
        case 'X+':
            RunCode(`fill ${rangeMax.x + 1} ${rangeMax.y} ${rangeMax.z}  ${rangeMax.x + 1} ${rangeMin.y} ${rangeMin.z} air [] destroy`);
            RunCode(`clone ${rangeMax.x} ${rangeMax.y} ${rangeMax.z}  ${rangeMin.x} ${rangeMin.y} ${rangeMin.z}  ${rangeMin.x + 1} ${rangeMin.y} ${rangeMin.z} replace force`);
            RunCode(`fill ${rangeMin.x} ${rangeMax.y} ${rangeMax.z}  ${rangeMin.x} ${rangeMin.y} ${rangeMin.z} air [] replace`);
            MoveEntity(opal.Vector.CONSTANT_EAST);
            break;
        case 'X-':
            RunCode(`fill ${rangeMin.x - 1} ${rangeMax.y} ${rangeMax.z}  ${rangeMin.x - 1} ${rangeMin.y} ${rangeMin.z} air [] destroy`);
            RunCode(`clone ${rangeMax.x} ${rangeMax.y} ${rangeMax.z}  ${rangeMin.x} ${rangeMin.y} ${rangeMin.z}  ${rangeMin.x - 1} ${rangeMin.y} ${rangeMin.z} replace force`);
            RunCode(`fill ${rangeMax.x} ${rangeMax.y} ${rangeMax.z}  ${rangeMax.x} ${rangeMin.y} ${rangeMin.z} air [] replace`);
            MoveEntity(opal.Vector.CONSTANT_WEST);
            break;
        case 'Z+':
            RunCode(`fill ${rangeMax.x} ${rangeMax.y} ${rangeMax.z + 1}  ${rangeMin.x} ${rangeMin.y} ${rangeMax.z + 1} air [] destroy`);
            RunCode(`clone ${rangeMax.x} ${rangeMax.y} ${rangeMax.z}  ${rangeMin.x} ${rangeMin.y} ${rangeMin.z}  ${rangeMin.x} ${rangeMin.y} ${rangeMin.z + 1} replace force`);
            RunCode(`fill ${rangeMax.x} ${rangeMax.y} ${rangeMin.z}  ${rangeMin.x} ${rangeMin.y} ${rangeMin.z} air [] replace`);
            MoveEntity(opal.Vector.CONSTANT_SOUTH);
            break;
        case 'Z-':
            RunCode(`fill ${rangeMax.x} ${rangeMax.y} ${rangeMin.z - 1}  ${rangeMin.x} ${rangeMin.y} ${rangeMin.z - 1} air [] destroy`);
            RunCode(`clone ${rangeMax.x} ${rangeMax.y} ${rangeMax.z}  ${rangeMin.x} ${rangeMin.y} ${rangeMin.z}  ${rangeMin.x} ${rangeMin.y} ${rangeMin.z - 1} replace force`);
            RunCode(`fill ${rangeMax.x} ${rangeMax.y} ${rangeMax.z}  ${rangeMin.x} ${rangeMin.y} ${rangeMax.z} air [] replace`);
            MoveEntity(opal.Vector.CONSTANT_NORTH);
            break;
        case 'Y+':
            RunCode(`fill ${rangeMax.x} ${rangeMax.y + 1} ${rangeMax.z}  ${rangeMin.x} ${rangeMax.y + 1} ${rangeMin.z} air [] destroy`);
            RunCode(`clone ${rangeMax.x} ${rangeMax.y} ${rangeMax.z}  ${rangeMin.x} ${rangeMin.y} ${rangeMin.z}  ${rangeMin.x} ${rangeMin.y + 1} ${rangeMin.z} replace force`);
            RunCode(`fill ${rangeMax.x} ${rangeMin.y} ${rangeMax.z}  ${rangeMin.x} ${rangeMin.y} ${rangeMin.z} air [] replace`);
            MoveEntity(opal.Vector.CONSTANT_UP);
            break;
        case 'Y-':
            RunCode(`fill ${rangeMax.x} ${rangeMin.y - 1} ${rangeMax.z}  ${rangeMin.x} ${rangeMin.y - 1} ${rangeMin.z} air [] destroy`);
            RunCode(`clone ${rangeMax.x} ${rangeMax.y} ${rangeMax.z}  ${rangeMin.x} ${rangeMin.y} ${rangeMin.z}  ${rangeMin.x} ${rangeMin.y - 1} ${rangeMin.z} replace force`);
            RunCode(`fill ${rangeMax.x} ${rangeMax.y} ${rangeMax.z}  ${rangeMin.x} ${rangeMax.y} ${rangeMin.z} air [] replace`);
            MoveEntity(opal.Vector.CONSTANT_DOWN);
            break;
    }
    ;
}
;
/**
 * * 伺服基座 < 30 能量消耗 >
 */
export function Susceptor(object, type) {
    // 判断能量值 是否足够
    if (!opal.ExpendEnergy(object, -30, true))
        return;
    /**
     * * 获取 自身 的 方块属性
     */
    const getPermutation = object.permutation;
    // 执行 伺服基座 移动许可
    switch (type) {
        case 'X+':
            object.setPermutation(getPermutation.withState('STATE:direction', 1));
            break;
        case 'X-':
            object.setPermutation(getPermutation.withState('STATE:direction', 2));
            break;
        case 'Z+':
            object.setPermutation(getPermutation.withState('STATE:direction', 3));
            break;
        case 'Z-':
            object.setPermutation(getPermutation.withState('STATE:direction', 4));
            break;
    }
}
;
/**
 ** 初级造石单元 < 35 能量消耗 >
 */
export function Solidify(object) {
    // 判断能量值 是否足够
    if (!opal.ExpendEnergy(object, -35))
        return;
    /**
     ** 石材类型
     */
    const type = opal.AnalysisWeight(solidify_output).output;
    /**
     ** 石材物品
     */
    const item = new server.ItemStack(type, 1);
    /**
     ** 获取 方块容器
     */
    const container = object.below()?.getComponent('minecraft:inventory')?.container;
    // 判断 物品容器 是否存在
    if (!container || container.emptySlotsCount == 0)
        opal.TrySpawnItem(object.dimension, item, opal.Vector.add(object, { x: 0.5, y: 1, z: 0.5 }));
    else
        container.addItem(item);
}
;
/**
 ** 破坏核心 < 15 能量消耗 >
 */
export function Destroy(object, type) {
    // 判断能量值 是否足够
    if (!opal.ExpendEnergy(object, -15))
        return;
    /**
     ** 坐标组
     */
    const locationGroup = [];
    // 获取 方块的 坐标
    switch (type) {
        case 'east':
            locationGroup.push(opal.Vector.add(object, opal.Vector.CONSTANT_EAST), opal.Vector.add(object, { x: 6, y: 0, z: 0 }));
            break;
        case 'west':
            locationGroup.push(opal.Vector.add(object, opal.Vector.CONSTANT_WEST), opal.Vector.add(object, { x: -6, y: 0, z: 0 }));
            break;
        case 'up':
            locationGroup.push(opal.Vector.add(object, opal.Vector.CONSTANT_UP), opal.Vector.add(object, { x: 0, y: 6, z: 0 }));
            break;
        case 'down':
            locationGroup.push(opal.Vector.add(object, opal.Vector.CONSTANT_DOWN), opal.Vector.add(object, { x: 0, y: -6, z: 0 }));
            break;
        case 'south':
            locationGroup.push(opal.Vector.add(object, opal.Vector.CONSTANT_SOUTH), opal.Vector.add(object, { x: 0, y: 0, z: 6 }));
            break;
        case 'north':
            locationGroup.push(opal.Vector.add(object, opal.Vector.CONSTANT_NORTH), opal.Vector.add(object, { x: 0, y: 0, z: -6 }));
            break;
    }
    ;
    /**
     ** 在路径上挖掘
     */
    const TickEvent = (args) => {
        args.dimension.runCommand(`fill ${args.location.x} ${args.location.y} ${args.location.z} ${args.location.x} ${args.location.y} ${args.location.z} air [] destroy`);
        return true;
    };
    // 创建 破坏核心 路径显示包
    opal.PathExecute.Create('破坏核心-射线动画', 1, {
        particles: ['constant:track_rune_red'],
        offset: { x: 0.5, y: 0.5, z: 0.5 },
        locations: locationGroup,
        dimension: object.dimension,
        on_move: TickEvent,
        cooldown: 1,
        speed: 1
    });
}
;
/**
 ** 金属锻压 < 15 能量消耗 >
 */
export function Forming(object) {
    // 判断能量值 是否足够
    if (!opal.ExpendEnergy(object, -15))
        return;
    /**
     ** 获取 方块容器
     */
    const container = object.above()?.getComponent('minecraft:inventory')?.container;
    // 判断 物品容器 是否存在
    if (!container || container.emptySlotsCount == 0)
        return opal.ErrorMessage('<§l§b 金属锻压 §r>§4 发生错误§r', object, { text: '未能在设备上方找到合适的<§l§3 方块容器 §r>' });
    // 遍历物品容器
    for (let index = 0; index < container.size; index++) {
        /**
         ** 获取 物品对象
         */
        const item = container.getItem(index);
        // 如果物品不存在 或 数量不足
        if (!item || item?.amount < 2)
            continue;
        /**
         ** 获取 锻压类型 标签
         */
        const tags = item?.getTags().filter(tag => tag.startsWith('tags:mineral_resources.make'));
        // 如果 锻压类型 标签不存在
        if (tags.length == 0)
            continue;
        /**
         ** 获取 锻压类型
         */
        const type = tags[0].split('.')[2];
        /**
         ** 获取 物品锻压阶段
         */
        const stage = item.typeId.split(':')[1].split('.').length;
        /**
         ** 获取 物品名称
         */
        const name = stage == 1 ? item.typeId.split(':')[1] : item.typeId.split(':')[1].split('.')[1];
        // 减少 物品堆栈
        opal.ConsumeItemStack(container, index, item, 2);
        // 添加 金属板 物品对象
        container.addItem(new server.ItemStack('starry_map:' + type + '.' + name));
        // 播放锻打音效
        object.dimension.playSound('random.anvil_use', object.location, { volume: 1, pitch: 1 });
        break;
    }
}
;
/**
 * * 查询与激活 动能分配
 *
 * @param {server.Block} block - 发出侦测的能量源方块
 *
 * @param {server.Vector3} offset - 方向向量
 */
export function AllocationPowerInDirection(block, offset) {
    // 遍历 动能分配模块
    for (let index = 1; index < 6; index++) {
        /**
         * * 获取 目标方块
         */
        const target = block.offset(opal.Vector.multiply(offset, index));
        // 判断 方块 是否 是 动能分配模块
        if (!target || !target.hasTag('tags:energy_module.allocation'))
            continue;
        /**
         * * 获取 方块状态
         */
        const states = target.permutation;
        // 如果该方块已经被充能就跳过该方块
        if (states.getState('STATE:output') == 1)
            continue;
        // 改变方块状态
        target.setPermutation(states.withState('STATE:output', 1));
    }
}
;
/**
 * * 检测周围是否有能量分配
 *
 * @param {server.Block} block - 发出侦测的能量源方块
 *
 * @returns {boolean} - 是否有 动能分配模块
 */
export function hasAdjacentAllocationPower(block) {
    /**
     * * 获取 附近的方块
     */
    const entry = [block.east(), block.west(), block.north(), block.south()];
    // 遍历 方块 并测试 方块是否是动能分配模块
    for (let index = 0; index < entry.length; index++) {
        if (entry[index]?.hasTag('tags:energy_module.allocation'))
            return true;
    }
    ;
    // 返回结果
    return false;
}
;
/**
 * * 传输岩浆
 *
 * @param {server.Block} object - 执行事件的方块
 */
export function distributeLavaToStorageTanks(object) {
    try {
        /**
         * * 获取 自身 的 方块状态
         */
        const getPermutation = object.permutation;
        /**
         * * 获取 熔岩储备
         */
        const getCacheValue = getPermutation.getState('STATE:magma');
        /**
         * * 获取 石材储备
         */
        const getStoneValue = getPermutation.getState('STATE:material');
        /**
         * * 获取 方块 的 原始数组
         */
        const getProtoArray = [];
        // 获取可能进行交互的方块
        const portPositive_X = object.offset({ x: 1, y: -1, z: 0 });
        const portNegative_X = object.offset({ x: -1, y: -1, z: 0 });
        const portNegative_Y = object.offset(opal.Vector.CONSTANT_DOWN);
        const portPositive_Z = object.offset({ x: 0, y: -1, z: 1 });
        const portNegative_Z = object.offset({ x: 0, y: -1, z: -1 });
        // 确认方块是否存在
        if (portPositive_X)
            getProtoArray.push(portPositive_X);
        if (portNegative_X)
            getProtoArray.push(portNegative_X);
        if (portPositive_Z)
            getProtoArray.push(portPositive_Z);
        if (portNegative_Z)
            getProtoArray.push(portNegative_Z);
        /**
         * * 获取 过滤后 的 方块 的 数组
         */
        const getBlockArray = getProtoArray.filter(info => info.hasTag('tags:obsidian_smelting.storage_tank'));
        /**
         * * 填充后 消耗掉 的 属性值
         */
        let lavaValue = 0;
        // 修改 周围储罐 的 属性
        getBlockArray.forEach(info => {
            /**
             * * 获取 储罐 的 方块状态
             */
            const getInfoStates = info.permutation;
            /**
             * * 获取 储罐 的 属性值
             */
            const getInfoValue = getInfoStates.getState('STATE:magma');
            // 储罐 未满时 进行 补充
            if (getInfoValue > 13)
                return;
            info.setPermutation(getInfoStates.withState('STATE:magma', getInfoValue + 2));
            lavaValue += 2;
        });
        // 消耗 熔岩储备
        object.setPermutation(getPermutation.withState('STATE:magma', getCacheValue - lavaValue));
        /**
         * * 获取 下方 的 物品容器
         */
        const container = portNegative_Y?.getComponent('minecraft:inventory')?.container;
        /**
         * * 需要填充 的 石材数量
         */
        const consume = 8 - getStoneValue;
        // 遍历 物品容器
        if (!container)
            return;
        // 遍历 物品容器
        for (let index = 0; index < container.size; index++) {
            /**
             * * 获取容器中的物品
             */
            const item = container.getItem(index);
            // 判断 物品 是否符合要求
            if (!item || item.amount < consume || item.typeId != 'starry_map:compressed_stone')
                continue;
            // 减少 物品堆栈
            opal.ConsumeItemStack(container, index, item, consume);
            // 更改 储罐 属性
            object.setPermutation(object.permutation.withState('STATE:material', 8));
            break;
        }
    }
    catch (error) {
        /**
         * 获取 错误信息
         */
        const info = error instanceof Error ? error : new Error(String(error));
        opal.ErrorMessage('<§l§b 曜石熔炼 §r>§4 发生错误§r', object, { text: info.message });
    }
    ;
}
;
/**
 * * 能量消耗
 *
 * @param {server.Block} object - 执行事件的方块
 */
export function consumeEnergyAndAdvanceStage(object) {
    // 判断能量值 是否足够
    if (!opal.ExpendEnergy(object, -45))
        return;
    /**
     * * 获取 自身 的 方块状态
     */
    const getPermutation = object.permutation;
    // 设定自身的状态为 1
    object.setPermutation(getPermutation.withState('STATE:stage', 1));
}
;
/**
 * 从容器中提取符合要求的怪物掉落物
 *
 * @param {server.Container} container - 要处理的容器对象
 *
 * @param {string[]} expense - 预定义的怪物掉落物类型集合
 *
 * @returns {boolean} 是否成功提取了有效怪物掉落物
 *
 * @description 遍历容器物品, 当找到预定义的怪物掉落物时消耗 1 个并返回true
 */
export function extractResidues(container, expense) {
    /**
     * 有效的怪物掉落物类型集合
     */
    const itemTable = new Set(expense);
    // 遍历容器所有槽位
    for (let index = 0; index < container.size; index++) {
        /**
         * 当前槽位的物品对象
         *
         * @type {server.ItemStack | undefined}
         */
        const item = container.getItem(index);
        // 跳过空槽位和非目标物品
        if (!item || !itemTable.has(item.typeId))
            continue;
        // 消耗1个目标物品
        opal.ConsumeItemStack(container, index, item, 1);
        return true;
    }
    return false;
}
;
