/*
 * 原版接口
 */
import * as server from "@minecraft/server";
/*
 * 数学模块
 */
import { Vector } from './maths';
/*
 * 计划模块
 */
import { PathExecute } from './plan';
/*
 * 导出模块
 */
export { DisplayChunkBoundary, RealmPropertyName, ControlStardustEnergy };
/**
 * * 显示 区块边界
 *
 * @param {type.LOCATION_AND_DIMENSION} source - 用于显示区块边界的 坐标信息与维度信息
 */
function DisplayChunkBoundary(source) {
    /**
     * * 校准 锚点信息
     */
    const anchor = Vector.add(source.location, { x: 0, y: -16, z: 0 });
    /**
     * * 设定 区块显示 起点坐标
     */
    const startPlace = Vector.chunkLocation(anchor, false);
    /**
     * * 设定 区块显示 终点坐标
     */
    const donePlace = Vector.add(startPlace, { x: 16, y: 32, z: 16 });
    // 创建 路径执行计划
    PathExecute.CreateForFrame('显示区块边界', {
        particles: ['constant:prompt_route'],
        locations: [],
        dimension: source.dimension,
        cooldown: 1,
        speed: 1
    }, startPlace, donePlace);
}
;
/**
 * * 获取 区域属性名称
 *
 * @param {type.LOCATION_AND_DIMENSION} source - 用于查询区域属性名称的 坐标信息与维度信息
 *
 * @param {string} type - 区域属性类型
 *
 * @param {number} range - 检索范围
 *
 * @returns {string|undefined} - 属性名称
 */
function RealmPropertyName(source, type, range) {
    /**
     * * 节点队列
     */
    const nodeQueue = [];
    // 获取 节点队列
    server.world.getDynamicPropertyIds()
        .filter(node => node.startsWith(`${type}•`))
        .forEach(node => node.split(/•/)[1] == source.dimension.id
        ? nodeQueue.push({ x: JSON.parse(node.split(/•/)[2]), y: 0, z: JSON.parse(node.split(/•/)[4]) })
        : void 0);
    // 如果 节点队列 为空
    if (nodeQueue.length == 0)
        return;
    /**
     * * 节点距离
     */
    const distance = nodeQueue.map(node => Vector.distance(node, { x: Math.floor(source.location.x / 16), y: 0, z: Math.floor(source.location.z / 16) }));
    /**
     * * 最小节点距离
     */
    const minDistance = Math.min(...distance);
    // 如果 范围内 有节点
    if (minDistance <= range) {
        /**
         * * 获取 节点索引
         */
        const index = distance.indexOf(minDistance);
        // 返回 节点属性名称
        return `${type}•${source.dimension.id}•${nodeQueue[index].x}•0•${nodeQueue[index].z}`;
    }
    // 如果 范围内 无节点
    else
        return;
}
;
/**
 * 管理指定区域的星尘力能量值
 *
 * @param source - 位置和维度信息
 *
 * @param expend - 能量变化量（正数为增加，负数为消耗）
 *
 * @returns [当前能量值, 操作是否成功]
 *
 * @example
 * // 查询当前能量
 * const [energy, success] = controlStardustEnergy(location);
 *
 * // 消耗1000能量
 * const [newEnergy, success] = controlStardustEnergy(location, -1000);
 *
 * // 增加500能量
 * const [newEnergy, success] = controlStardustEnergy(location, 500);
 */
function ControlStardustEnergy(source, expend = 0) {
    /** 区域最大能量容量 */
    const MAX_ENERGY = 10_000_000;
    /** 区域初始能量值 */
    const DEFAULT_ENERGY = 10_000;
    /** 构建 区域能量属性 的 标识符 */
    const current = `stardust_energy•${source.dimension.id}•${Math.floor(source.location.x / 16)}•0•${Math.floor(source.location.z / 16)}`;
    /** 提取 区域能量属性 的 类型前缀 */
    const typePrefix = current.split(/•/)[0];
    /** 获取可用的 区域能量属性 标识符 */
    const realmName = RealmPropertyName(source, typePrefix, 16);
    /** 区域当前能量值 */
    let currentEnergy;
    // 检查范围内是否有 区域能量属性
    if (!realmName) {
        // 如果范围内无 区域能量属性，则创建默认能量值
        server.world.setDynamicProperty(current, DEFAULT_ENERGY);
        // 初始化当前能量为默认值
        currentEnergy = DEFAULT_ENERGY;
    }
    else {
        /** 区域当前能量值 */
        const existingEnergy = server.world.getDynamicProperty(realmName);
        // 验证能量值类型，类型错误时重置为默认值
        if (typeof existingEnergy !== 'number') {
            // 如果范围内有 区域能量属性，但类型错误，则重置为默认值
            server.world.setDynamicProperty(current, DEFAULT_ENERGY);
            // 初始化当前能量为默认值
            currentEnergy = DEFAULT_ENERGY;
        }
        // 如果范围内有 区域能量属性，且类型正确，则直接赋值
        else
            currentEnergy = existingEnergy;
    }
    /** 计算调整后的能量值 */
    const newAmount = currentEnergy + expend;
    // 能量值边界检查和处理
    if (newAmount <= 0) {
        // 能量耗尽情况
        if (newAmount === 0) {
            // 恰好耗尽，更新存储值
            server.world.setDynamicProperty(realmName || current, 0);
            // 恰好耗尽，返回0
            return [0, true];
        }
        // 能量不足，操作失败
        else
            return [0, false];
    }
    // 检查能量是否超出最大容量
    if (newAmount >= MAX_ENERGY) {
        // 超出上限，保持原值不变
        return [currentEnergy, true];
    }
    // 更新区域能量值
    server.world.setDynamicProperty(realmName || current, newAmount);
    // 返回更新后的能量值和成功状态
    return [newAmount, true];
}
