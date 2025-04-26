/**
 * * 星之引导的文案库
 *
 * * 存储 PROMPT_NOTE 类型的帮助信息
 */
const help = new Map();
// 在初次进入<虚空野蜂塔>时触发
help.set('生成虚空野蜂塔', [
    {
        refer: { text: '请使用<§l§9 诸界道标 §r>离开<§l§u 虚空野蜂塔 §r>\n\n' },
        delay: 1160
    },
    {
        refer: { text: '当您回到<§l§s 主世界 §r>后, 可以寻找一处风景优美的宜居地点\n\n' },
        delay: 1220
    },
    {
        refer: { text: '使用<§l§b 百灵绘卷 §r>, 召唤属于您的<§l§6 星辉雅居 §r>\n\n' },
        delay: 1280
    },
    {
        refer: { text: '在决定安家地点时, 请谨慎选择, 以免未来后悔 !!!\n\n' },
        delay: 1340
    }
]);
// 在初次生成<星辉雅居>时触发
help.set('召唤星辉雅居', [
    {
        refer: { text: '<§l§9 领航者-琉璃 §r>正等待你的契约\n\n' },
        delay: 160
    },
    {
        refer: { text: '使用<§l§u 精灵结契 §r>, 签订专属契约, 开启这个世界的新篇章\n\n' },
        delay: 220
    },
    {
        refer: { text: '签订契约后, 攻击<§l§9 琉璃 §r>与<§l§6 月华 §r>可查看任务与说明\n\n' },
        delay: 280
    },
    {
        refer: { text: '§l§c警告§r: 携带<§l§d 神恩领航者 §r>进行<§l§c 跨纬度传送 §r>存在重大风险 ! \n\n' },
        delay: 340
    },
    {
        refer: { text: '请避免让<§l§d 神恩领航者 §r>直接前往其他维度 ! \n\n' },
        delay: 380
    },
    {
        refer: { text: '如需前往其他维度进行作业\n\n' },
        delay: 420
    },
    {
        refer: { text: '请尽量远离<§l§d 神恩领航者 §r>或选择让她们坐下\n\n' },
        delay: 460
    },
    {
        refer: { text: '想要招募更多的<§l§d 神恩领航者 §r>需获得<§l§b 百灵绘卷 §r>\n\n' },
        delay: 520
    },
    {
        refer: { text: '通过击杀以下<§l§m 地方传奇 §r>将有概率获得:\n\n' },
        delay: 580
    },
    {
        refer: { text: '<§l§c 掠夺兽 §r>\n\n' },
        delay: 600
    },
    {
        refer: { text: '<§l§c 猪灵蛮兵 §r>\n\n' },
        delay: 620
    },
    {
        refer: { text: '<§l§c 远古守卫者 §r>\n\n' },
        delay: 640
    },
    {
        refer: { text: '<§l§c 监守者 §r>\n\n' },
        delay: 660
    },
    {
        refer: { text: '<§l§c 野蜂君临者 §r>\n\n' },
        delay: 680
    },
    {
        refer: { text: '<§l§c 野蜂领航者 §r>\n\n' },
        delay: 700
    },
    {
        refer: { text: '<§l§c 琥珀与茉莉 §r>\n\n' },
        delay: 720
    },
    {
        refer: { text: '更多有概率掉落<§l§b 百灵绘卷 §r>的强大生物敬请探索\n\n' },
        delay: 800
    },
    {
        refer: { text: '<§l§c 野蜂君临者 §r>和<§l§c 琥珀与茉莉 §r>有概率在野外自然生成\n\n' },
        delay: 860
    },
    {
        refer: { text: '<§l§c 野蜂领航者 §r>每<§2 30 §r>个游戏日生成一次\n\n' },
        delay: 920
    },
    {
        refer: { text: '将在主世界天气发生变化时触发<§l§c 野蜂领航者 §r>的刷新\n\n' },
        delay: 980
    },
    {
        refer: { text: '参与<§l§c 野蜂袭击事件 §r>将额外掉落<§l§e 永恒魔晶石 §r>\n\n' },
        delay: 1040
    },
    {
        refer: { text: '点击§s卧室楼梯§r下的<§l§q 闪长岩桌 §r>, 可以查看到<§l§6 全部合成配方 §r>\n\n' },
        delay: 1100
    },
    {
        refer: { text: '而在§s餐厅的房顶§r, §s闪长岩桌的附近§r, §s农场的入口§r处似乎收藏了些什么\n\n' },
        delay: 1160
    },
    {
        refer: { text: '§l§c切记§r: 有些宝箱如果你不先打开看看, 也许就会错过一切...\n\n' },
        delay: 1220
    }
]);
// 在领取<野蜂塔返航>任务奖励时触发
help.set('获取魔晶石', [
    {
        refer: { text: '请寻找一个合适的时间段, 使用<§l§9 诸界道标 §r>前往<§l§u 虚空野蜂塔 §r>\n\n' },
        delay: 120
    },
    {
        refer: { text: '击杀<§l§u 野蜂 §r>将获取<§l§5 魔晶石 §r>和<§l§5 空灵单元 §r>等资源\n\n' },
        delay: 180
    },
    {
        refer: { text: '当您持有<§l§9 魔晶钥匙 §r>时, 可以尝试挖掘部分<§l§6 容器方块 §r>\n\n' },
        delay: 240
    },
    {
        refer: { text: '支持的方块包括<§l§9 刷怪笼 §r>或<§l§9 箱子 §r>等方块\n\n' },
        delay: 300
    },
    {
        refer: { text: '挖掘方块后, 该方块转化为类似<§l§9 潜影盒 §r>的机制\n\n' },
        delay: 360
    },
    {
        refer: { text: '在与<§l§u 野蜂 §r>作战时请记住: 对于很多机械生命体来说, 大量出现的水是有剧毒的\n\n' },
        delay: 420
    },
    {
        refer: { text: '如果战斗遭遇困难, 请前往<§l§6 星辉雅居 §r>, 房子中收藏着一套<§l§t 魔晶工具 §r>\n\n' },
        delay: 480
    },
    {
        refer: { text: '这些<§l§t 魔晶工具 §r>将为您的冒险之旅增添强大助力§r\n\n' },
        delay: 540
    }
]);
// 在末影龙被攻击时触发
help.set('末影龙强化', [
    {
        refer: { text: '当使用<§l§c 爆炸伤害 §r>对<§l§9 末影龙 §r>造成损伤时\n\n' },
        delay: 10
    },
    {
        refer: { text: '会使得<§l§9 末影龙 §r>身上的<§l§u 末影龙鳞 §r>被强制剥落\n\n' },
        delay: 70
    },
    {
        refer: { text: '当<§l§9 末影龙 §r>身上的<§l§u 末影龙鳞 §r>被耗尽时\n\n' },
        delay: 130
    },
    {
        refer: { text: '这只<§l§9 末影龙 §r>将失去<§l§5 龙鳞加护 §r>\n\n' },
        delay: 190
    },
    {
        refer: { text: '每只<§l§9 末影龙 §r>最多可以剥落§2 15 §r枚<§l§u 末影龙鳞 §r>\n\n' },
        delay: 250
    }
]);
// 在完成 魔导手册 的合成任务后触发
help.set('魔导工业的启动基础', [
    {
        refer: { text: '本模组的<§l§9 魔导工业 §r>是一种依赖<§l§d 星尘力 §r>的魔幻工业体系\n\n' },
        delay: 10
    },
    {
        refer: { text: '本模组的<§l§d 星尘力 §r>是区块特有的<§l§u 能量体系 §r>\n\n' },
        delay: 70
    },
    {
        refer: { text: '对运行<§l§9 魔导工业 §r>而言是至关重要的\n\n' },
        delay: 130
    },
    {
        refer: { text: '在<§l§d 星尘力 §r>耗尽前, 即便<§l§u 能源模块 §r>被破坏\n\n' },
        delay: 190
    },
    {
        refer: { text: '已经存在的<§l§d 星尘力 §r>也不会消失\n\n' },
        delay: 250
    },
    {
        refer: { text: '而<§l§d 星尘力 §r>在功能上类似于自然界中的<§l§b 天地灵气 §r>\n\n' },
        delay: 310
    },
    {
        refer: { text: '在<§l§p 产能端 §r>与<§l§q 耗能端 §r>之间不需要直接<§l§b 物理接触 §r>\n\n' },
        delay: 370
    },
    {
        refer: { text: '只要在同一个维度的半径§2 256 §r个区块的范围内\n\n' },
        delay: 430
    },
    {
        refer: { text: '即可进行<§l§d 星尘力 §r>的<§l§u 无线传递 §r>\n\n' },
        delay: 490
    },
    {
        refer: { text: '而最基础的<§l§u 能源系统 §r>仅需要在<§l§u 魔晶储罐 §r>上放置<§l§u 能源节点 §r>\n\n' },
        delay: 550
    },
    {
        refer: { text: '随后手持§2 8 §r枚<§l§5 魔晶石 §r>填充进<§l§u 魔晶储罐 §r>\n\n' },
        delay: 610
    },
    {
        refer: { text: '即可完成最简易的<§l§d 魔晶体系 §r>的搭建\n\n' },
        delay: 670
    },
    {
        refer: { text: '更多信息请可以查询<§l§6 月华百科 §r>\n\n' },
        delay: 730
    },
    {
        refer: { text: '当您命中<§l§9 签订契约 §r>后的<§l§6 月华 §r>即可展开该界面\n\n' },
        delay: 790
    },
    {
        refer: { text: '使用<§l§3 魔导手册 §r>去挖掘<§l§9 魔导工业 §r>的方块\n\n' },
        delay: 850
    },
    {
        refer: { text: '可以自动调用<§l§6 月华百科 §r>来获取使用说明\n\n' },
        delay: 910
    },
    {
        refer: { text: '而<§l§9 魔导工业 §r>的方块在运行时, 可能发出通知与报错\n\n' },
        delay: 970
    },
    {
        refer: { text: '您在机器附近使用<§l§3 魔导绪论 §r>即可查看这些信息\n\n' },
        delay: 1030
    },
    {
        refer: { text: '部分<§l§9 魔导工业 §r>的方块需要设定参数\n\n' },
        delay: 1090
    },
    {
        refer: { text: '可以使用<§l§3 魔晶工具 §r>对方块参数进行调试\n\n' },
        delay: 1152
    }
]);
// 在契约月华后触发触发
help.set('魔晶工具与防具', [
    {
        refer: { text: '装备<§l§u 魔晶铠甲 §r>时受到攻击, 会优先消耗<§9 耐久值 §r>来抵消伤害\n\n' },
        delay: 160
    },
    {
        refer: { text: '装备<§l§u 魔晶盾牌 §r>后, 每§a 5 §r秒获得持续§a 15 §r秒的增益效果, 增强生存能力\n\n' },
        delay: 220
    },
    {
        refer: { text: '使用<§l§u 魔晶弹弓 §r>射击时, 若处于潜行状态, 可以在瞄准的目标附近放置火把\n\n' },
        delay: 280
    },
    {
        refer: { text: '使用<§l§u 魔晶弹珠 §r>射击时, 可以选择消耗§a 1 §r至§a 64 §r枚魔晶石来增加元素攻击的伤害\n\n' },
        delay: 340
    },
    {
        refer: { text: '使用<§l§u 魔晶扳手 §r>攻击时, 除了对目标造成伤害外, 还能对其周围的敌人造成元素追击伤害\n\n' },
        delay: 400
    },
    {
        refer: { text: '使用<§l§u 魔晶锤子 §r>攻击地面上的金属材料时, 可以将§2 4 §r个金属材料转化为§2 1 §r个高级材料\n\n' },
        delay: 460
    },
    {
        refer: { text: '使用<§l§u 魔晶钥匙 §r>攻击方块容器, 如箱子或刷怪笼, 可以对其进行搬运与收纳\n\n' },
        delay: 520
    },
    {
        refer: { text: '使用<§l§u 魔晶钩爪 §r>时, 玩家可以享受到快速位移的效果, 提高探索效率\n\n' },
        delay: 580
    },
    {
        refer: { text: '使用<§l§u 魔晶起子 §r>后, 允许玩家对<§l§u 区块连锁 §r>进行微调, 以适应不同的使用场景\n\n' },
        delay: 640
    },
]);
// 在契约琉璃后触发触发
help.set('物品修复与充能', [
    {
        refer: { text: "玩家可以通过与<§l§d 魔晶充能 §r>互动, 使特定的< 特殊物品 >获得充能\n\n" },
        delay: 160
    },
    {
        refer: { text: "在互动过程中, <§l§d 魔晶充能 §r>会吸收周围的<§l§d 星尘力 §r>, 为<§5 触发交互的物品 §r>提供能量\n\n" },
        delay: 220
    },
    {
        refer: { text: "大多数道具在充能时, 会将获得的能量转化为修复其耐久度损失\n\n" },
        delay: 280
    },
    {
        refer: { text: "包括<§5 魔晶工具 §r><§5 魔晶铠甲 §r><§5 魔导书籍 §r>和<§5 注魔宝珠 §r>在内, 都能通过这种方式恢复耐久\n\n" },
        delay: 340
    },
    {
        refer: { text: "而<§5 隧龙掘进 §r>在充能时将获得§a 10000 §r单位的能量, 这些能量将用于支持列车的持续运行\n\n" },
        delay: 400
    },
]);
// 完成收集永恒魔晶石任务触发
help.set('生成魔法工业展馆', [
    {
        refer: { text: "您当前所处的区域为<§v§l 方块放置 §r>\n\n" },
        delay: 100
    },
    {
        refer: { text: "该区域展示了<§5 魔导工业设备 §r>的搭建与使用方法\n\n" },
        delay: 140
    },
    {
        refer: { text: "其中第一层为<§5 能源模块 §r>展示区, 展示了各种能源模块的使用方式\n\n" },
        delay: 180
    },
    {
        refer: { text: "第二层为<§5 魔导总线 §r>展示区, 展示了各种逻辑门的搭建与使用方法\n\n" },
        delay: 220
    },
    {
        refer: { text: "在完全启动第一层的设备后, 该区域将完全激活\n\n" },
        delay: 260
    },
    {
        refer: { text: "您可以前往第二层, 并将该区域作为你的工业基地\n\n" },
        delay: 300
    },
]);
export default help;
