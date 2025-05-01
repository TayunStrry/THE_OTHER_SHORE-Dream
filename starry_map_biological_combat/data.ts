
/**
 * 阵营实体招募信息
 */
type RECRUITMENT = {
    /**
     * 可招募实体的命名空间标识符
     */
    type: string,
    /**
     * 最大招募数量
     */
    maxAmount: number;
    /**
     * 在生成时添加状态效果
     */
    addEffect?: [string, number, number][];
};
export const redCampRecruitmentList = new Map<string, RECRUITMENT>()
    .set('蠹虫', { type: 'red_legion:silverfish', maxAmount: 10 })
    .set('蜜蜂', { type: 'red_legion:bee', maxAmount: 10 })
    .set('僵尸', { type: 'red_legion:zombie', maxAmount: 10 })
    .set('溺尸', { type: 'red_legion:drowned', maxAmount: 10 })
    .set('鸡', { type: 'red_legion:chicken', maxAmount: 10 })
    .set('末影人', { type: 'red_legion:enderman', maxAmount: 10 })
    .set('铁傀儡', { type: 'red_legion:iron_golem', maxAmount: 10 })
    .set('掠夺者', { type: 'red_legion:pillager', maxAmount: 10 })
    .set('烈焰人', { type: 'red_legion:blaze', maxAmount: 10 })
    .set('凋灵骷髅', { type: 'red_legion:wither_skeleton', maxAmount: 10 })

export const blueCampRecruitmentList = new Map<string, RECRUITMENT>()
    .set('烈焰人', { type: 'blue_legion:blaze', maxAmount: 10 })
    .set('流浪者', { type: 'blue_legion:stray', maxAmount: 10 })
    .set('铁傀儡', { type: 'blue_legion:iron_golem', maxAmount: 10 })
    .set('唤魔者', { type: 'blue_legion:evocation_illager', maxAmount: 10 })
    .set('幻翼', { type: 'blue_legion:phantom', maxAmount: 10 })
    .set('洞穴蜘蛛', { type: 'blue_legion:cave_spider', maxAmount: 10 })
    .set('猪灵蛮兵', { type: 'blue_legion:piglin_brute', maxAmount: 10 })
    .set('女巫', { type: 'blue_legion:witch', maxAmount: 10 })
    .set('蠧虫', { type: 'blue_legion:silverfish', maxAmount: 10 })
    .set('劫掠兽', { type: 'blue_legion:ravager', maxAmount: 10 })