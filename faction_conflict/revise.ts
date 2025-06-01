// Import required modules
import * as mojang from "mojang-minecraft";
// 监听世界初始化事件，绑定aggro目标刷新函数
mojang.world.events.worldInitialize.subscribe(() => rebindAggroTarget());
/**
 * 重新绑定敌对军团目标的主函数
 */
function rebindAggroTarget(): void {
    /**
     * 时间价格，用于控制核心逻辑的执行频率
     */
    let timePrice = 0;
    // 监听游戏tick事件（每游戏刻执行一次）
    mojang.world.events.tick.subscribe(
        () => {
            // 每20个游戏刻(1秒)执行一次核心逻辑
            if (++timePrice % 20 !== 0) return;
            /**
             * 获取当前世界中的第一个玩家
             */
            const targetPlayer = getFirstPlayer();
            // 如果未找到玩家，则退出函数
            if (!targetPlayer) return console.error("未找到玩家");
            /**
             * 获取玩家所在维度
             */
            const dimension = targetPlayer.dimension;
            /**
             * 获取维度内所有实体
             */
            const entities = [...dimension.getEntities()];
            /**
             * 获取红色军团的基地
             */
            const redBase = getLegionBase(entities, "red_legion");
            /**
             * 获取蓝色军团的基地
             */
            const blueBase = getLegionBase(entities, "blue_legion");
            // 检测军团的基地是否全部存在
            if (!redBase || !blueBase) return console.error("未找到完整的军团基地");
            // 为红方军团设置蓝方基地为目标
            setAggroTarget(entities, redBase, blueBase);
            // 为蓝方军团设置红方基地为目标
            setAggroTarget(entities, blueBase, redBase);
        }
    );
}
/**
 * 获取世界中第一个玩家
 * @returns 玩家实体或undefined
 */
function getFirstPlayer(): mojang.Player | undefined {
    return [...mojang.world.getPlayers()][0];
}
/**
 * 根据阵营ID查找对应的基地实体
 * @param entities 所有实体列表
 * @param legionType 阵营类型（red_legion/blue_legion）
 * @returns 基地实体或undefined
 */
function getLegionBase(entities: mojang.Entity[], legionType: string): mojang.Entity | undefined {
    return entities.find(entity => entity.id.startsWith(`${legionType}:`) && entity.id === `${legionType}:legion_base`);
}
/**
 * 为指定阵营的军团设置目标基地
 * @param entities 所有实体列表
 * @param targetBase 目标基地
 * @param enemyBase 敌方基地
 */
function setAggroTarget(entities: mojang.Entity[], targetBase: mojang.Entity, enemyBase: mojang.Entity): void {
    // 过滤指定阵营的非基地实体且未设置目标的实体
    const targets = entities.filter(entity =>
        entity.id.startsWith(targetBase.id.split(':')[0]) &&
        entity.id !== `${targetBase.id.split(':')[0]}:legion_base` &&
        !entity.target
    );
    // 为每个符合条件的实体设置目标
    targets.forEach(
        entity => {
            entity.target = enemyBase;
            console.log(`强制设定了${entity.id}的锁定目标为${enemyBase.id}`);
        }
    );
}
