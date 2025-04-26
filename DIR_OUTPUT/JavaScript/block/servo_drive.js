/*
 * 系统组件
 */
import * as opal from "../system/opal";
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
