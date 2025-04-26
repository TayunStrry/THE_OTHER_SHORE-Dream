/*
 * 原版接口
 */
import * as server from "@minecraft/server";
/*
 * 系统组件
 */
import * as opal from "../system/opal";
/**
 ** 获取周围 总线方块 的 有效数组
 *
 * @param block - 发起事件 的 方块对象
 *
 * @param type - 方块队列的 3轴识别特征
 *
 * @returns {server.Block[]} 被选中的总线方块队列
 */
function cableQueue(block, type) {
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
 ** 赋值 队列 方块属性
 *
 * @param queue - 执行 赋值 的 方块数组
 *
 * @param type - 进行 赋值 的 方块属性
 *
 * @param value - 方块属性值
 *
 * @returns {Error | void} - 赋值失败 返回 错误信息
 */
function tryBatchState(queue, type, value) {
    try {
        queue.forEach(block => {
            /**
             ** 赋值 方块属性
             */
            const state = block.permutation.withState(type, value);
            block.setPermutation(state);
        });
    }
    catch (error) {
        return error;
    }
}
;
/**
 ** 获取红石信号是否变动
 *
 * @param object - 执行 赋值 的 方块对象
 *
 * @param states - 方块的 默认属性
 *
 * @returns {boolean} 方块的红石信号是否变动
 */
function redstoneChange(object, states) {
    try {
        /**
         ** 获取方块的红石能量
         */
        const getRedstoneBlock = object.above()?.getRedstonePower();
        /**
         ** 获取自身保存的对比值
         */
        const getRedstoneSelf = states.getState('STATE:redstone');
        //监测数值是否相等
        if (getRedstoneBlock != undefined) {
            if (getRedstoneBlock === getRedstoneSelf) {
                return true;
            }
            else {
                opal.TrySetPermutation(object, 'STATE:redstone', getRedstoneBlock);
                return false;
            }
        }
        else {
            opal.TrySetPermutation(object, 'STATE:redstone', 0);
            return true;
        }
    }
    catch {
        return false;
    }
}
;
/**
 ** 红石侦测
 *
 * @param object - 执行 赋值 的 方块对象
 *
 * @param type - 方块队列的 3轴识别特征
 */
export function redstoneDetection(object, type) {
    if (!redstoneChange(object, object.permutation))
        tryBatchState(cableQueue(object, type), 'STATE:rune_type', opal.Random({ max: 7, min: 1 }, true));
}
;
/**
 ** 基于方块朝向 设置魔导总线
 *
 * @param {server.Vector3} source 需要检测的方块朝向
 */
function runDetection(self, source) {
    // 遍历 32 个方块
    for (let index = 1; index < 32; index++) {
        /**
         ** 获取方块对象
         */
        const target = self.offset(opal.Vector.multiply(source, index));
        /**
         ** 获取方块 的 魔力类型
         */
        const state = target?.permutation.getState('STATE:rune_type') ?? 9;
        // 检查方块是否符合要求
        if (!target?.hasTag('tags:magic_cable.series') || state != 0 || target.typeId == self.typeId)
            continue;
        // 设置方块属性
        opal.TrySetPermutation(target, 'STATE:rune_type', self.permutation.getState('STATE:rune_type'));
        //保存方块对象
        return target;
    }
    ;
    // 返回未定义
    return undefined;
}
;
/**
 ** 超导髓鞘
 *
 * @returns {server.Block} 方块对象
 */
export function superPulse(self, type) {
    //执行模块功能
    try {
        // 设置方块属性
        server.system.run(() => opal.TrySetPermutation(self, 'STATE:rune_type', 9));
        // 获取方块朝向
        switch (type) {
            case 'up': return runDetection(self, opal.Vector.CONSTANT_UP);
            case 'down': return runDetection(self, opal.Vector.CONSTANT_DOWN);
            case 'east': return runDetection(self, opal.Vector.CONSTANT_EAST);
            case 'west': return runDetection(self, opal.Vector.CONSTANT_WEST);
            case 'north': return runDetection(self, opal.Vector.CONSTANT_NORTH);
            case 'south': return runDetection(self, opal.Vector.CONSTANT_SOUTH);
            default: return undefined;
        }
        ;
    }
    // 异常处理, 显示错误信息
    catch {
        opal.ErrorMessage('<§l§b 超导髓鞘 §r>§4 发生错误§r', self, { text: '无法发送<§l§c 总线信号 §r>, 请勿在<§l§m 世界边界 §r>或<§l§n 世界之外 §r>使用!!' });
        //返回方块对象
        return self;
    }
    ;
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
    const blocks = cableQueue(object, type);
    //根据获得参数 进行 方块属性 设置
    switch (getContainer.getItem(getSlot)?.typeId) {
        case 'starry_map:blue_energy':
            tryBatchState(blocks, 'STATE:rune_type', 1);
            break;
        case 'starry_map:red_energy':
            tryBatchState(blocks, 'STATE:rune_type', 2);
            break;
        case 'starry_map:green_energy':
            tryBatchState(blocks, 'STATE:rune_type', 3);
            break;
        case 'starry_map:orange_energy':
            tryBatchState(blocks, 'STATE:rune_type', 4);
            break;
        case 'starry_map:purple_energy':
            tryBatchState(blocks, 'STATE:rune_type', 5);
            break;
        case '能量水晶:启程_魔晶石':
            tryBatchState(blocks, 'STATE:rune_type', 6);
            break;
        case '能量水晶:焚绝_魔晶石':
            tryBatchState(blocks, 'STATE:rune_type', 7);
            break;
        default:
            tryBatchState(blocks, 'STATE:rune_type', 0);
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
    const blocks = cableQueue(object, type);
    tryBatchState(blocks, 'STATE:rune_type', states.getState('STATE:rune_note'));
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
    const blocks = cableQueue(object, type);
    tryBatchState(blocks, 'STATE:rune_type', opal.Random({ max: 7, min: 1 }, true));
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
    const blocks = cableQueue(object, type);
    tryBatchState(blocks, 'STATE:rune_type', states.getState('STATE:rune_note'));
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
 ** 默认事件
 *
 * @param object - 发起事件的方块对象
 *
 * @param type - 方块队列的 3轴识别特征
 *
 * @param state - 方块 的 状态属性
 */
export function defaultEvent(object, type, state) {
    /**
     ** 获取 方块队列
     */
    const blocks = cableQueue(object, type);
    // 遍历 方块队列
    tryBatchState(blocks, 'STATE:rune_type', state.getState('STATE:rune_type'));
    opal.TrySetPermutation(object, 'STATE:rune_type', 9);
}
;
