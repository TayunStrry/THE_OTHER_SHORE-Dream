import * as server from "@minecraft/server";

/**
 * 实体生成计划表格式
 */
export interface memberPlanTable {
    /**
     *  实体生成数量
     */
    entityAmountValue: number,
    /**
     *  实体生成序列号
     */
    entityIndexValue: number,
    /**
     *  实体所属的阵营序列号
     */
    legionIndexValue: number,
    /**
     *  实体生成名称
     */
    entityNameValue: string
};

/**
 * 全局状态变量
 */
export interface GlobalState {
    planTable: memberPlanTable[];
    pendingPlanTable: memberPlanTable[];
    memberDirectory: string[];
    itemComponents: Map<string, server.ItemCustomComponent>;
    players: server.Player[];
};

/**
 * 阵营配置类型
 */
export interface LegionBaseConfig {
    [key: string]: string;
};