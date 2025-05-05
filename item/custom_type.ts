export interface USE_EFFECT {
    /**
     * 要施加的状态效果
     */
    effects?: string[];
    /**
     * 最小持续时间
     */
    min_duration?: number;
    /**
     * 最大持续时间
     */
    max_duration?: number;
    /**
     * 状态效果放大器
     */
    amplifier?: number;
    /**
     * 生命值修改
     */
    health_changes?: number;
};
export interface IRIDESCENT_PRISM {
    /**
     * 对目标施加的效果
     */
    to_target?: {
        /**
         * 要施加的状态效果
         */
        effects?: string[];
        /**
         * 状态效果放大器
         */
        amplifier?: number;
        /**
         * 实体点燃时长
         */
        ignite_time?: number;
        /**
         * 实体击退等级
         */
        knockback_level?: number;
        /**
         * 要在目标上执行的命令
         */
        commands?: string[];
    };
    /**
     * 对自身施加的效果
     */
    to_self?: {
        /**
         * 要施加的状态效果
         */
        effects?: string[];
        /**
         * 状态效果放大器
         */
        amplifier?: number;
        /**
         * 要在目标上执行的命令
         */
        commands?: string[];
    }
}