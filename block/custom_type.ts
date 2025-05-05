/*
 * 原版接口
 */
import * as server from "@minecraft/server";
/**
 * * 玩家交互组件参数接口
 */
export type INTERACT_COMPONENT = {
    /**
     * 方块对象
     */
    block: server.Block;
    /**
     * 方块状态
     */
    state: server.BlockPermutation;
    /**
     * 方块维度
     */
    dimension: server.Dimension;
    /**
     * 玩家对象
     */
    player: server.Player | undefined;
    /**
     * 玩家背包
     */
    container: server.Container | undefined;
    /**
     * 物品对象
     */
    item: server.ItemStack | undefined;
};
/**
 * * 方块时刻组件参数接口
 */
export type TICK_COMPONENT = {
    /**
     ** 默认的方块状态的值
     */
    condition: string | number | boolean;
    /**
     ** 方块状态
     */
    state: server.BlockPermutation;
    /**
     ** 方块对象
     */
    block: server.Block;
    /**
     * * 方块维度
     */
    dimension: server.Dimension;
};
/**
 * TODO: 玩家交互组件:参数 => 档案显示
 */
export type DOCUMENT_DISPLAY = {
    /**
     * 档案标题的字符串
     */
    archives?: string;
};
/**
 * TODO: 玩家交互组件:参数 => 扩散填充
 */
export type DIFFUSION_FILLING = {
    /**
     * 扩散填充的最大方块填充数量
     */
    max_number?: number;
    /**
     * 类型: 'all' 表示扩散到所有 6 个方向
     *
     * 类型: 'horizontal', 表示扩散到水平 4 个方向。
     *
     * 类型: 'vertical', 表示扩散到垂直 2 个方向。
     *
     * 其他参数 表示扩散到下方和水平 4 个方向（向下传播模式）。
     */
    directions?: string;
    /**
     * 用于表示匹配这几种方块
     *
     * 类型: '*abc'表示启用正则表达式 匹配带有 * 后面内容的方块
     *
     * 类型: 'abc*'表示启用正则表达式 匹配带有 * 前面内容的方块
     */
    proto_blocks?: string[];
    /**
     * 表示填充为 指定id 的方块
     *
     * 类型 "items_in_hand" 表示填充为 手持物品
     */
    target_block?: string;
    /**
     * 表示填充时消耗的能量
     *
     * 类型 "create" 表示不消耗能量
     */
    expense?: number | string;
};
/**
 * TODO: 玩家交互组件:参数 => 状态值增加
 */
export type STATE_VALUE_INCREASE = {
    /**
     * 需要修改的方块状态
     */
    revise?: string;
    /**
     * 在修改时显示的提示信息
     */
    message?: string[];
};
/**
 * TODO: 方块时刻组件:参数 => 矿脉参数
 */
type BASE_MINERAL_MACHINE = {
    /**
     * 需要修改的方块状态
     */
    revise?: string;
    /**
     * 每次执行时的能耗
     */
    consumption?: number;
    /**
     * 产出矿石的概率(0%-100%)
     */
    probability?: number;
    /**
     * 加倍产出矿石的概率(0%-100%)
     */
    doubling_probability?: number;
    /**
     * 矿脉区块产出矿石的最大数量
     */
    limit?: number;
    /**
     * 矿脉区块大小
     */
    chunk_size?: number;
};
/**
 * TODO: 方块时刻组件:参数 => 包含维度数据的矿脉参数
 */
export type MINERAL_MACHINE = BASE_MINERAL_MACHINE & {
    [dimension: string]: { [mineral: string]: number | undefined; } | undefined;
};
/**
 * TODO: 方块时刻组件:参数 => 能量损耗
 */
export type ENERGY_EXPEND = {
    /**
     * 星尘力的变动值
     */
    modify?: number;
    /**
     * 需要修改的方块状态
     */
    revise?: string;
};
/**
 * TODO: 方块时刻组件:参数 => 虚拟天气
 */
export type VIRTUAL_WEATHER = {
    /**
     * TODO: 要播放的粒子效果
     */
    particle: string;
};
/**
 * TODO: 方块时刻组件:参数 => 遗物萃取
 */
export type RESIDUAL_EXTRACTION = {
    /**
     * 被消耗的物品
     */
    expense?: string[];
    /**
     * 容器位置
     */
    container?: server.Vector3;
    /**
     * 开始执行时消耗的能量
     */
    consumption?: number;
    /**
     * 执行成功后修改的属性
     */
    revise?: string;
};