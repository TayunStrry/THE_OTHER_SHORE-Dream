/*
 * 系统组件
 */
import * as opal from "../system/opal";
/**
 * * 传输岩浆
 *
 * @param {server.Block} object - 执行事件的方块
 */
export function Pouring(object) {
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
export function Attrition(object) {
    // 判断能量值 是否足够
    if (!opal.ExpendEnergy(object, -45))
        return;
    /**
     * * 获取 自身 的 方块状态
     */
    const getPermutation = object.permutation;
    object.setPermutation(getPermutation.withState('STATE:stage', 1));
}
