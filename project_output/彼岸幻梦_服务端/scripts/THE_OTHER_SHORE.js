import * as server from '@minecraft/server';
import * as debug from '@minecraft/debug-utilities';
import * as serverUI from '@minecraft/server-ui';

/**
 * * 月华百科的知识库
 *
 * * 存储 INTENTION_NOTE 类型的帮助信息
 */
const help$1 = new Map();
help$1.set('开发者名单', {
    root: ['开发者', '花名册'],
    intel: [
        { text: '[§v§l 开发 | 优化 | 运营 | 移植 §r]:\n' },
        { text: '§9§l Tayun_Starry §r<§6 gitee §r>\n\n' },
        { text: '§9§l 钛宇·星光阁 §r<§6 B站 | QQ§r>\n\n' },
        { text: '§9§l 游京秋惜༈༊ §r<§6 QQ §r>\n\n' },
        { text: '§9§l 月白清风 §r<§6 QQ §r>\n\n' },
        { text: '[§v§l 人工智能 §r]:\n' },
        { text: '§9§l DeepSeek R1 §r<§s LLM §r>\n\n' },
        { text: '§9§l ChatGLM 4 §r<§s LLM §r>\n\n' },
        { text: '§9§l Qwen 2.5 §r<§s LLM §r>\n\n' },
        { text: '§9§l Kimi §r<§s LLM §r>\n\n' },
        { text: '[§v§l 模型 | 纹理 | 建筑 §r]:\n' },
        { text: '§9§l 野生的麻薯 §r<§6 QQ §r>\n\n' },
        { text: '§9§l 苏海伦 §r<§6 QQ §r>\n\n' },
        { text: '§9§l 夜莺 §r<§6 QQ §r>\n\n' },
        { text: '§9§l Ao §r<§6 QQ §r>\n\n' },
        { text: '[§v§l 测试 | 改进 §r]:\n' },
        { text: '§9§l 大尺寸欧芹 §r<§6 QQ §r>\n\n' },
        { text: '§9§l 隐墨·星尘 §r<§6 QQ §r>\n\n' },
        { text: '§9§l 万里长风 §r<§6 QQ §r>\n\n' },
        { text: '§9§l 心狐紫焰 §r<§6 QQ §r>\n\n' },
        { text: '§9§l 黔中极客 §r<§6 QQ §r>\n\n' },
        { text: '§9§l 昵称是蛤 §r<§6 QQ §r>\n\n' },
        { text: '§9§l Sakura §r<§6 QQ §r>\n\n' },
        { text: '§9§l 兵解掀 §r<§6 QQ §r>\n\n' },
        { text: '§9§l 但均享 §r<§6 QQ §r>\n\n' },
        { text: '§9§l 四夕 §r<§6 QQ §r>\n\n' },
        { text: '§9§l 稽 §r<§6 QQ §r>\n\n' },
    ]
});
const crystal$1 = [
    { text: "当< 机械生命体 >损毁或< 持有元素力 >的生命击杀目标时, 有概率掉落\n\n" },
    { text: "<§l§u 魔晶石 §r>是一种暂稳态的<§l§d 能量形式 §r>\n\n" },
    { text: "<§l§9 魔导机械 §r>能够将<§l§u 魔晶石 §r>转化为<§l§5 魔晶星尘 §r>\n\n" },
    { text: "产生的<§l§5 魔晶星尘 §r>可用作<§l§9 魔导机械 §r>的能源\n\n" },
    { text: "但转化过程是单向且不可逆的\n\n" },
    { text: "<§l§5 魔晶星尘 §r>无法再变回<§l§u 魔晶石 §r>\n\n" },
    { text: "其中<§l§6 永恒魔晶石 §r>为战胜< 君临者 >的战利品\n\n" },
    { text: "带有神明的恩惠, 可以从周围环境中远远不断的汲取元素力\n\n" },
];
[
    "starry_map:orange_energy",
    "starry_map:purple_energy",
    "starry_map:green_energy",
    "starry_map:eternal_energy",
    "starry_map:blue_energy",
    "starry_map:red_energy",
    "starry_map:block.orange_energy",
    "starry_map:block.purple_energy",
    "starry_map:block.green_energy",
    "starry_map:block.eternal_energy",
    "starry_map:block.blue_energy",
    "starry_map:block.red_energy"
].forEach(item => help$1.set(item, { root: ['魔晶石', '能量水晶', '魔晶星尘'], intel: [...crystal$1], only: true }));
help$1.set('星尘力概述', {
    root: ['星尘力', '产出', '传输'],
    intel: [
        { text: "<§l§d 星尘力 §r>是一种作用于区块的<§l§u 能量体系 §r>\n\n" },
        { text: "它具有<§l§s 持久性 §r>和<§l§u 无线传递 §r>能力, 无需<§l§b 物理接触 §r>\n\n" },
        { text: "<§l§d 星尘力 §r>相当于自然界的<§l§b 天地灵气 §r>\n\n" },
        { text: "是<§l§9 魔幻工业 §r>至关重要的核心\n\n" },
        { text: "即使<§l§u 能源模块 §r>损坏, <§l§d 星尘力 §r>依旧存在, 不会消失\n\n" },
        { text: "在同一维度内, <§l§d 星尘力 §r>可高效传输, 覆盖半径高达<§2 48 §r>个区块\n\n" },
        { text: "构建基础<§l§u 魔晶体系 §r>, 只需在<§l§u 魔晶储罐 §r>上放置<§l§u 能源节点 §r>\n\n" },
        { text: "填充<§l§5 魔晶石 §r>后, <§l§d 星尘力 §r>的能量循环即可启动\n\n" },
        { text: "<§l§d 星尘力 §r>模块设计, 深入理解玩家操作需求, 提供便捷体验\n\n" },
        { text: "旨在高效适配, 满足<§l§9 魔导工业 §r>的多样化应用需求\n\n" }
    ]
});
help$1.set('元素攻击计算公式', {
    root: ['元素攻击', '计算公式'],
    intel: [
        { text: "((攻击乘区 × 暴击乘区 × 伤害倍率) + 伤害提升) × (1 - 元素抗性)\n\n" },
        { text: "攻击乘区: (基础伤害 + 攻击提升)\n\n" },
        { text: "暴击乘区: (暴击伤害 + 暴伤提升) ÷ 100)\n\n" },
        { text: "**提升: 将在发动攻击后归§2 0 §r, 该类效果可以叠加\n\n" },
        { text: "**倍率: 将在发动攻击后归§2 1 §r, 该类效果可以叠加\n\n" },
    ]
});
help$1.set('背景设定', {
    root: ['背景', '设定', '摘要', '起源', '雾海'],
    intel: [
        { text: "源初雾海吞噬了整个世界, 人类面临前所未有的挑战, 抵抗显得徒劳\n\n" },
        { text: "在绝望之际, 人们在雾海深处发现了一颗不寻常的光球\n\n" },
        { text: "这颗光球屹立不倒, 能够恢复被侵蚀的物质\n\n" },
        { text: "当雾海的侵蚀力量达到临界点, 人类被迫离开家园, 寻找新的生机\n\n" },
        { text: "与光球达成了一项神秘的协议, 光球引导雾海吞没旧世界, 自身蜕变为神明\n\n" },
        { text: "神明赋予了人类在宇宙中航行的能力, 并保护他们免受跨世界信息的侵扰\n\n" },
        { text: "尽管神明的意识被雾海禁锢, 人类通过解读技术创造了领航者\n\n" },
        { text: "领航者执行着寻找并保护神明灵魂的使命, 他们的计划成功了, 神明得以复苏\n\n" },
        { text: "神明被铸造成神性半身, 继续陪伴着人类, 百年后他离去, 灵魂重新归于雾海\n\n" }
    ]
});
help$1.set('神明的起源', {
    root: ['神明', '启程', '起源', '雾海'],
    intel: [
        { text: "在源初的雾海中, 无数世界经历了创生, 繁荣与消亡的轮回\n\n" },
        { text: "启程之神, 源自一个未能完全诞生的世界的残留\n\n" },
        { text: "这个残留的世界在宇宙法则的碰撞中几乎走向了消亡\n\n" },
        { text: "然而, 其内部的生命意志和对世界的悲鸣, 激活了它的神之心\n\n" },
        { text: "光团在旧世界的残骸边缘徘徊, 观察着, 描绘着未来\n\n" },
        { text: "由于未能成为一个完整的世界, 启程之神对人类充满了怜悯和保护之情\n\n" },
        { text: "它愿意帮助人类在废墟之上重建一个新的世界\n\n" },
        { text: "启程之神的故事, 既是对未能成功诞生的世界的悼词, " },
        { text: "也是对未竟梦想的执着延续\n\n" },
        { text: "它书写着关于希望, 牺牲与重生的传奇\n\n" }
    ]
});
help$1.set('雾海的概念与世界的轮回', {
    root: ['雾海', '概念', '世界之心', '轮回', '本源'],
    intel: [
        { text: "在无垠的虚空中, 存在一个超越时间的领域\n\n" },
        { text: "这里是万物的起点, 也是它们的归宿\n\n" },
        { text: "这片领域被雾海覆盖, 其中包含了世间所有的原子\n\n" },
        { text: "这些迷雾并非普通的水雾或尘埃\n\n" },
        { text: "雾海由法则层面的概念粒子构成, 能够阻止原子键合, 形成复杂结构\n\n" },
        { text: "当世界在雾海中溶解后\n\n " },
        { text: "「世界之心」一个映射世间万物概念的资讯构造体, 会残留下来\n\n" },
        { text: "经过漫长岁月, 「世界之心」将触发新的胎动\n\n" },
        { text: "预示着新世界的诞生\n\n" },
        { text: "新世界在雾海中迅速形成, 分化出一切事物\n\n" },
        { text: "这个世界对人类而言, 会稳定存在一段相对漫长的时间\n\n" },
        { text: "然而, 一个未知的机制最终会启动, 引导世界走向凋亡\n\n" },
        { text: "随着时间流逝, 世界将溶解于源初的雾海, 为重生做准备\n\n" },
        { text: "雾海中的原子不断重组, 准备迎接新世界的到来\n\n" },
        { text: "这个过程循环往复, 世界在雾海中重生与消逝, 永恒不息\n\n" }
    ]
});
help$1.set('人造之神的起源', {
    root: ['神明', '惑星', '人造之神', '群峦王座'],
    intel: [
        { text: "在无尽的虚空中, 流传着「群峦王座」的传说\n\n" },
        { text: "这是一座巨型人造浮空岛, 其核心「深邃之天」提供能量\n\n" },
        { text: "创造出一片片绿洲\n\n" },
        { text: "为了躲避纷争, 「群峦王座」在虚空中游弋, 隐藏行踪\n\n" },
        { text: "「伏渊阵营」与其他势力联合, 创造了一个名为「惑星」的存在\n\n" },
        { text: "这位人造之神, 以「永恒之心」和「统合意志」为力量基石\n\n" },
        { text: "其力量源自万物, 但并不完全受人类控制\n\n" },
        { text: "计划失败时, 神明的愤怒爆发, 摧毁了「群峦王座」的主脑和控制枢纽\n\n" },
        { text: "王座沉没, 神明失控, 人们选择引爆「深邃之天」\n\n" },
        { text: "爆炸几乎摧毁了神明的意念, 但阵营间的矛盾并未消除\n\n" },
        { text: "人们相信, 失控的神明终将复苏, 重新降临\n\n" },
        { text: "以完成其统御世界的大业\n\n" }
    ]
});
help$1.set('神之葬礼', {
    root: ['神葬', '终焉', '神灵'],
    intel: [
        { text: '想象一下, 在无垠的雾海中, 无数世界诞生又消逝\n\n' },
        { text: '尘世的权力, 如同无根的浮萍, 在天空中飘摇不定\n\n' },
        { text: '直到一股灵性力量崛起, 成熟到足以掌控一片天地\n\n' },
        { text: '它迈出了关键的一步, 化身为“神灵”\n\n' },
        { text: '神灵, 众生意愿的集合体, 肩负引领命运, 指导发展\n\n' },
        { text: '规划世界的重任, 承载着天地的意志\n\n' },
        { text: '他们执掌宇宙法则, 实现众生愿望, 是尘世众生的共和体\n\n' },
        { text: '神灵掌管万物命运, 指引众生前行, 绘制世界蓝图\n\n' },
        { text: '然而, 神明的存在也预示了万物的终结, 神明并非永恒不朽\n\n' },
        { text: '在行星尺度上, 消灭神明的尝试往往徒劳无果, 即使偶获胜利\n\n' },
        { text: '神明既是尘世的创造者和守护者, 也是山川, 河流, 花鸟鱼虫的化身\n\n' },
        { text: '他们凝聚众生意愿, 不是超然于众生的生命, 也非宇宙法则的独裁者\n\n' },
        { text: '当神明消逝, 行星将被内部混乱能量风暴和复杂熔岩脉络吞噬, 生机断绝\n\n' },
        { text: '最终, 行星将被雾海吞没, 此为“神葬”, 是神明的葬礼\n\n' },
        { text: '所有与神明有关的事物, 都将随神明一同消亡不论是否受过神恩\n\n' },
        { text: '是否曾被神明注视, 都难逃“神葬”的宿命\n\n' },
        { text: '因为弑神的过往已定, 神葬的终结是万物永恒的归宿\n\n' },
    ]
});
help$1.set("starry_map:jungle_wood_chair", {
    root: ['家居装饰', '从林木椅'],
    intel: [
        { text: "<§6 放置 §r>[§5 从林木椅 §r]时, 将进行<§n 外观衔接 §r>\n\n" },
        { text: "如果<§6 放置 §r>时正在潜行, 则不会执行<§n 外观衔接 §r>\n\n" },
        { text: "如果[§5 玩家 §r]<§6 站立 §r>在[§5 从林木椅 §r]上时, [§5 玩家 §r]将坐在椅子上\n\n" }
    ]
});
help$1.set("starry_map:special_alloy_pot", {
    root: ['家居装饰', '合金钢锅', '机械烹饪'],
    intel: [
        { text: "当<§6 使用 §r>[§2 食材 §r]<§6 点击 §r>时, [§5 合金钢锅 §r]将会<§u 注水 §r>\n\n" },
        { text: "当<§6 使用 §r>[§4 火石 §r]<§6 点击 §r>时, [§5 合金钢锅 §r]将会<§u 点火 §r>\n\n" },
        { text: "可用的[§2 食材 §r]包括<§m 熟肉 §r>与<§v 机械生物残骸 §r>\n\n" },
        { text: "当<§u 点火 §r>与<§u 注水 §r>完成后\n\n" },
        { text: "持续<§6 点击 §r>可进行<§u 熬制 §r>\n\n" },
        { text: "等待流程完成后, 将生成一个[§2 随机汤品 §r]\n\n" }
    ]
});
help$1.set("starry_map:diorite_table", {
    root: ['家居装饰', '闪长岩桌'],
    intel: [
        { text: "<§6 放置 §r>[§5 闪长岩桌 §r]时, 将进行<§n 外观衔接 §r>\n\n" },
        { text: "如果<§n 衔接 §r>的长度达到 3 个时\n\n" },
        { text: "中间的[§5 闪长岩桌 §r]将会启用<§n 合成功能 §r>\n\n" }
    ]
});
const decorating = [
    { text: "使用[§3 对应方块 §r]<§6 点击 §r>时, 将改变<§n 外观纹理 §r>\n\n" },
    { text: "[§u 木质伪装 §r]支持: §5任意§u木板§r\n\n" },
    { text: "[§u 石质伪装 §r]支持: §5任意§u原版磨制石§r\n\n" },
    { text: "[§u 金属伪装 §r]支持: §5任意§u原版矿物块§r\n\n" }
];
help$1.set("starry_map:metal_camouflage", {
    root: ['家居装饰', '金属伪装'],
    intel: [
        ...decorating
    ]
});
help$1.set("starry_map:stone_camouflage", {
    root: ['家居装饰', '石质伪装'],
    intel: [
        ...decorating
    ]
});
help$1.set("starry_map:wood_camouflage", {
    root: ['家居装饰', '木质伪装'],
    intel: [
        ...decorating
    ]
});
help$1.set("starry_map:package_delivery", {
    root: ['仓储管理', '打包投送', '物流'],
    intel: [
        { text: "运行时消耗<§p星尘力§r>:§2 60§r\n\n" },
        { text: "外观呈现桶型, 桶身开口为<§n 发射端 §r>, 另一面则为<§p 输入端 §r\n\n" },
        { text: "桶身侧面为<§u 虹彩端口 §r>可与[§3 魔导总线 §r]进行连接\n\n" },
        { text: "当[§3 魔导总线 §r]输入<§9 信号 §r>时, 将发射<§5 侦测射线 §r>\n\n" },
        { text: "如果<§5 侦测射线 §r>击中[§3 方块容器 §r]\n\n" },
        { text: "且<§p 输入端 §r>[§3 方块容器 §r]中存在[§2 物品 §r]时\n\n" },
        { text: "将<§p 输入端 §r>[§3 方块容器 §r]中的[§2 物品 §r]转移到其中\n\n" },
        { text: "使用[§3 魔晶工具 §r]点击, 可切换<§3 方块朝向 §r>\n\n" }
    ]
});
help$1.set("starry_map:block_placement", {
    root: ['仓储管理', '方块放置', '物流'],
    intel: [
        { text: "运行时消耗<§p星尘力§r>:§2 60§r\n\n" },
        { text: "上方端面为<§p 输入端 §r>, 下方为<§n 发射端 §r>\n\n" },
        { text: "侧面为<§u 虹彩端口 §r>可与[§3 魔导总线 §r]进行连接\n\n" },
        { text: "当[§3 魔导总线 §r]输入<§9 信号 §r>时, 将发射<§5 侦测射线 §r>\n\n" },
        { text: "如果<§5 侦测射线 §r>击中[§3 固态方块 §r]\n\n" },
        { text: "且<§p 输入端 §r>[§3 方块容器 §r]中存在<§a§l 可放置 §r>[§2 物品 §r]\n\n" },
        { text: "则将<§p 输入端 §r>[§3 方块容器 §r]中的[§2 物品 §r]进行<§6 放置 §r>\n\n" }
    ]
});
help$1.set("starry_map:material_collection", {
    root: ['仓储管理', '物资收集', '物流'],
    intel: [
        { text: "运行时消耗<§p星尘力§r>:§2 30§r\n\n" },
        { text: "上下方为<§u 虹彩端口 §r>可与[§3 魔导总线 §r]进行连接\n\n" },
        { text: "当[§3 魔导总线 §r]输入<§9 信号 §r>时, 将收集附近的[§2 物品 §r]\n\n" },
        { text: "使用[§2 魔晶工具 §r]点击, 可以调整<§n 收集范围 §r>\n\n" },
        { text: "如果下方存在[§3 方块容器 §r]时\n\n" },
        { text: "收集的[§2 物品 §r]将直接放入[§3 方块容器 §r]\n\n" },
    ]
});
help$1.set("starry_map:container_arrange", {
    root: ['仓储管理', '物资整理', '管理'],
    intel: [
        { text: "将每隔 5 秒钟消耗<§p星尘力§r>:§2 20§r\n\n" },
        { text: "运行时消耗<§p星尘力§r>:§2 5 ~ 10§r\n\n" },
        { text: "上下方为<§u 容器端口 §r>可与[§3 方块容器 §r]进行连接\n\n" },
        { text: "每隔§2 5 §r秒, 设备将自动整理被选中的[§3 方块容器 §r]\n\n" }
    ]
});
help$1.set("starry_map:enchantment_dissociation", {
    root: ['附魔分离', '附魔剥夺', '附魔提取'],
    intel: [
        { text: "若下方存在 [§3 方块容器 §r]\n\n" },
        { text: "且容器内有足够数量的 [书本]\n\n" },
        { text: "玩家手持 [附魔] 物品点击方块时\n\n" },
        { text: "将根据 [附魔] 条目数量进行操作\n\n" },
        { text: "每条 [附魔] 将消耗 <§p星尘力§r>: §2 1000§r\n\n" },
        { text: "随后, [附魔] 效果将从物品上被剥夺\n\n" },
        { text: "并逐条转写入 [附魔书] 中\n\n" },
        { text: "此过程便于管理和存储附魔属性\n\n" },
        { text: "提高您的物资收集和物流效率\n\n" }
    ]
});
help$1.set("starry_map:routine_logistics_receiver", {
    root: ['仓储管理', '接收端', '常规', '物流'],
    intel: [
        { text: "该类型的[§3接收端§r]和[§3发送端§r]无法跨纬度链接\n\n" },
        { text: "<§a控制端口§r>位于上方, 连接[§3方块§r]或[§3物品展示框§r]\n\n" },
        { text: "<§a控制端口§r>的[§v方块/物品§r]被识别为[§c通道物品§r]\n\n" },
        { text: "该设备的<§u 容器端口 §r>在后方, 连接[§3 方块容器 §r]\n\n" },
        { text: "容器首格的[§6物品§r]是[§3接收端§r]接收的[§u目标物品§r]\n\n" },
        { text: "未指定[§u目标物品§r]时, [§c通道物品§r]将作为[§u目标物品§r]\n\n" }
    ]
});
help$1.set("starry_map:routine_logistics_sender", {
    root: ['仓储管理', '发送端', '常规', '物流'],
    intel: [
        { text: "将每隔 2 秒钟消耗<§p星尘力§r>:§2 20§r\n\n" },
        { text: "该类型的[§3发送端§r]不能与[§3接收端§r]跨纬度链接\n\n" },
        { text: "该设备的<§a控制端口§r>位于上方, 与[§3方块§r]或[§3物品展示框§r]连接\n\n" },
        { text: "该设备的<§u 容器端口 §r>位于四周, 可以自动获取其中的[§6 容器物品 §r]\n\n" },
        { text: "当<§a控制端口§r>有[§v方块/物品§r]时, 会视其为[§c通道物品§r]\n\n" },
        { text: "当[§3接收端§r]与[§3发送端§r]的[§c通道物品§r]相同时, 将会建立链接\n\n" },
        { text: "基于[§3接收端§r]的[§c通道物品§r]与[§u目标物品§r]\n\n" },
        { text: "运输对应的[§6 容器物品 §r]\n\n" }
    ]
});
help$1.set("starry_map:surpass_logistics_receiver", {
    root: ['仓储管理', '接收端', '跨界', '物流'],
    intel: [
        { text: "该类型的[§3接收端§r]和[§3发送端§r]可以跨纬度链接\n\n" },
        { text: "<§a控制端口§r>位于上方, 连接[§3方块§r]或[§3物品展示框§r]\n\n" },
        { text: "<§a控制端口§r>的[§v方块/物品§r]被识别为[§c通道物品§r]\n\n" },
        { text: "该设备的<§u 容器端口 §r>在后方, 连接[§3 方块容器 §r]\n\n" },
        { text: "容器首格的[§6物品§r]是[§3接收端§r]接收的[§u目标物品§r]\n\n" },
        { text: "未指定[§u目标物品§r]时, [§c通道物品§r]将作为[§u目标物品§r]\n\n" }
    ]
});
help$1.set("starry_map:surpass_logistics_sender", {
    root: ['仓储管理', '发送端', '跨界', '物流'],
    intel: [
        { text: "将每隔 2 秒钟消耗<§p星尘力§r>:§2 30§r\n\n" },
        { text: "该类型的[§3发送端§r]可以与[§3接收端§r]跨纬度链接\n\n" },
        { text: "该设备的<§a控制端口§r>位于上方, 与[§3方块§r]或[§3物品展示框§r]连接\n\n" },
        { text: "该设备的<§u 容器端口 §r>位于四周, 可以自动获取其中的[§6物品§r]\n\n" },
        { text: "当<§a控制端口§r>有[§v方块/物品§r]时, 会视其为[§c通道物品§r]\n\n" },
        { text: "当[§3接收端§r]与[§3发送端§r]的[§c通道物品§r]相同时, 将会建立链接\n\n" },
        { text: "基于[§3接收端§r]的[§c通道物品§r]与[§u目标物品§r]\n\n" },
        { text: "运输对应的[§6 容器物品 §r]\n\n" }
    ]
});
help$1.set('starry_map:container_hub', {
    root: ['仓储管理', '容器枢纽', '容器整理'],
    intel: [
        { text: "将每隔 5 秒钟消耗<§p星尘力§r>:§2 50§r\n\n" },
        { text: '该设备会查询附近一定范围内的<§n方块容器§r>\n\n' },
        { text: '并提取上方<§n方块容器§r>的全部<§a物品§r>\n\n' },
        { text: '将<§a物品§r>放置在已经存放了该物品的<§n方块容器§r>内\n\n' },
        { text: '如果未找到合适的<§n方块容器§r>, 则随机挑选一个<§n方块容器§r>放置\n\n' },
    ]
});
help$1.set('starry_map:residual_extraction', {
    root: ['仓储管理', '遗物萃取', '获取魔力'],
    intel: [
        { text: "将每隔 2 秒钟消耗<§p星尘力§r>:§2 10§r\n\n" },
        { text: '该设备用于整理与读取附近一定范围内的<§n方块容器§r>\n\n' },
        { text: '并提取<§n方块容器§r>的特定<§a物品§r>\n\n' },
        { text: '每消耗一个<§u 怪物掉落物 §r>就会获得一点<§9 充能 §r>\n\n' },
        { text: '当集齐§a 12 §r点充能的时候, 就会生成一个<§v 附魔之瓶 §r>\n\n' },
        { text: '可以通过放置更多的<§n方块容器§r>\n\n' },
        { text: '分散放置<§u 怪物掉落物 §r>, 提高机器的充能速度\n\n' },
    ]
});
help$1.set("starry_map:stone_machine", {
    root: ['矿产勘探', '初级', '造石单元'],
    intel: [
        { text: "设备<§u 运行频率 §r>:§2 10§r tick\n\n" },
        { text: "运行时消耗<§p星尘力§r>:§2 35§r\n\n" },
        { text: "北面为<§u 虹彩端口 §r>可与[§3 魔导总线 §r]进行连接\n\n" },
        { text: "当[§3 魔导总线 §r]输入<§9 信号 §r>时, 将在一段时间后产出[§3 石头 §r]\n\n" },
        { text: "如果下方存在[§3 方块容器 §r], 则[§3 石头 §r]将直接存入其中\n\n" },
    ]
});
help$1.set("starry_map:copper.stone_machine", {
    root: ['矿产勘探', '铜制强化', '造石单元'],
    intel: [
        { text: "设备<§u 运行频率 §r>:§2 6§r tick\n\n" },
        { text: "运行时消耗<§p星尘力§r>:§2 35§r\n\n" },
        { text: "北面为<§u 虹彩端口 §r>可与[§3 魔导总线 §r]进行连接\n\n" },
        { text: "当[§3 魔导总线 §r]输入<§9 信号 §r>时, 将在一段时间后产出[§3 石头 §r]\n\n" },
        { text: "如果下方存在[§3 方块容器 §r], 则[§3 石头 §r]将直接存入其中\n\n" },
    ]
});
help$1.set("starry_map:iron.stone_machine", {
    root: ['矿产勘探', '铁制强化', '造石单元'],
    intel: [
        { text: "设备<§u 运行频率 §r>:§2 4§r tick\n\n" },
        { text: "运行时消耗<§p星尘力§r>:§2 35§r\n\n" },
        { text: "北面为<§u 虹彩端口 §r>可与[§3 魔导总线 §r]进行连接\n\n" },
        { text: "当[§3 魔导总线 §r]输入<§9 信号 §r>时, 将在一段时间后产出[§3 石头 §r]\n\n" },
        { text: "如果下方存在[§3 方块容器 §r], 则[§3 石头 §r]将直接存入其中\n\n" },
    ]
});
help$1.set("starry_map:gold.stone_machine", {
    root: ['矿产勘探', '金制强化', '造石单元'],
    intel: [
        { text: "设备<§u 运行频率 §r>:§2 2§r tick\n\n" },
        { text: "运行时消耗<§p星尘力§r>:§2 35§r\n\n" },
        { text: "北面为<§u 虹彩端口 §r>可与[§3 魔导总线 §r]进行连接\n\n" },
        { text: "当[§3 魔导总线 §r]输入<§9 信号 §r>时, 将在一段时间后产出[§3 石头 §r]\n\n" },
        { text: "如果下方存在[§3 方块容器 §r], 则[§3 石头 §r]将直接存入其中\n\n" },
    ]
});
help$1.set("starry_map:netherite.stone_machine", {
    root: ['矿产勘探', '合金强化', '造石单元'],
    intel: [
        { text: "设备<§u 运行频率 §r>:§2 1§r tick\n\n" },
        { text: "运行时消耗<§p星尘力§r>:§2 35§r\n\n" },
        { text: "北面为<§u 虹彩端口 §r>可与[§3 魔导总线 §r]进行连接\n\n" },
        { text: "当[§3 魔导总线 §r]输入<§9 信号 §r>时, 将在一段时间后产出[§3 石头 §r]\n\n" },
        { text: "如果下方存在[§3 方块容器 §r], 则[§3 石头 §r]将直接存入其中\n\n" },
    ]
});
const metal_forming = [
    { text: "四周为<§u 虹彩端口 §r>可与[§3 魔导总线 §r]进行连接\n\n" },
    { text: "当[§3 魔导总线 §r]输入<§9 信号 §r>时, 如果上方存在[§3 方块容器 §r]\n\n" },
    { text: "将对[§3 方块容器 §r]的金属进行<§9 锻压 §r>\n\n" },
    { text: "需要[§3 矿物锭 §r]的数量至少为:§2 4§r 才可以进行<§9 锻压 §r>\n\n" },
];
help$1.set("starry_map:metal_forming_press", {
    root: ['矿产勘探', '初级', '金属锻压'],
    intel: [
        { text: "设备<§u 运行频率 §r>:§2 10§r tick\n\n" },
        { text: "运行时消耗<§p星尘力§r>:§2 15§r\n\n" },
        ...metal_forming,
    ]
});
help$1.set("starry_map:copper.metal_forming_press", {
    root: ['矿产勘探', '铜制强化', '金属锻压'],
    intel: [
        { text: "设备<§u 运行频率 §r>:§2 6§r tick\n\n" },
        { text: "运行时消耗<§p星尘力§r>:§2 15§r\n\n" },
        ...metal_forming,
    ]
});
help$1.set("starry_map:iron.metal_forming_press", {
    root: ['矿产勘探', '铁制强化', '金属锻压'],
    intel: [
        { text: "设备<§u 运行频率 §r>:§2 4§r tick\n\n" },
        { text: "运行时消耗<§p星尘力§r>:§2 15§r\n\n" },
        ...metal_forming,
    ]
});
help$1.set("starry_map:gold.metal_forming_press", {
    root: ['矿产勘探', '金制强化', '金属锻压'],
    intel: [
        { text: "设备<§u 运行频率 §r>:§2 2§r tick\n\n" },
        { text: "运行时消耗<§p星尘力§r>:§2 15§r\n\n" },
        ...metal_forming,
    ]
});
help$1.set("starry_map:netherite.metal_forming_press", {
    root: ['矿产勘探', '合金强化', '金属锻压'],
    intel: [
        { text: "设备<§u 运行频率 §r>:§2 1§r tick\n\n" },
        { text: "运行时消耗<§p星尘力§r>:§2 15§r\n\n" },
        ...metal_forming,
    ]
});
help$1.set("starry_map:destroy_the_core", {
    root: ['矿产勘探', '初级', '破坏核心'],
    intel: [
        { text: "运行时消耗<§p星尘力§r>:§2 15§r\n\n" },
        { text: "一端为<§u 虹彩端口 §r>可与[§3 魔导总线 §r]进行连接\n\n" },
        { text: "当[§3 魔导总线 §r]输入<§9 信号 §r>时, 将<§6 破坏 §r>指向的 6 个[§3方块§r]\n\n" }
    ]
});
help$1.set("starry_map:mineral_machine", {
    root: ['矿产勘探', '初级', '矿井单元'],
    intel: [
        { text: "设备<§u 运行频率 §r>:§2 60§r tick\n\n" },
        { text: "运行时消耗<§p星尘力§r>:§2 150§r\n\n" },
        { text: "北面为<§u 虹彩端口 §r>可与[§3 魔导总线 §r]进行连接\n\n" },
        { text: "当[§3 魔导总线 §r]输入<§9 信号 §r>时, 将在一段时间后产出[§3 矿物 §r]\n\n" },
        { text: "每个<§9 虚岩矿脉 §r>的储量有限, 挖掘耗尽后将无法再挖矿\n\n" },
        { text: "请在一定距离外, 重新寻找新的<§9 虚岩矿脉 §r>\n\n" },
        { text: "当加装[§3 升级模块 §r]时, 可以大幅提高运行效率\n\n" },
    ]
});
help$1.set("starry_map:copper.mineral_machine", {
    root: ['矿产勘探', '铜制强化', '矿井单元'],
    intel: [
        { text: "设备<§u 运行频率 §r>:§2 30§r tick\n\n" },
        { text: "运行时消耗<§p星尘力§r>:§2 150§r\n\n" },
        { text: "北面为<§u 虹彩端口 §r>可与[§3 魔导总线 §r]进行连接\n\n" },
        { text: "当[§3 魔导总线 §r]输入<§9 信号 §r>时, 将在一段时间后产出[§3 矿物 §r]\n\n" },
        { text: "每个<§9 虚岩矿脉 §r>的储量有限, 挖掘耗尽后将无法再挖矿\n\n" },
        { text: "请在一定距离外, 重新寻找新的<§9 虚岩矿脉 §r>\n\n" },
        { text: "当加装[§3 升级模块 §r]时, 可以大幅提高运行效率\n\n" },
    ]
});
help$1.set("starry_map:iron.mineral_machine", {
    root: ['矿产勘探', '铁制强化', '矿井单元'],
    intel: [
        { text: "设备<§u 运行频率 §r>:§2 15§r tick\n\n" },
        { text: "运行时消耗<§p星尘力§r>:§2 150§r\n\n" },
        { text: "北面为<§u 虹彩端口 §r>可与[§3 魔导总线 §r]进行连接\n\n" },
        { text: "当[§3 魔导总线 §r]输入<§9 信号 §r>时, 将在一段时间后产出[§3 矿物 §r]\n\n" },
        { text: "每个<§9 虚岩矿脉 §r>的储量有限, 挖掘耗尽后将无法再挖矿\n\n" },
        { text: "请在一定距离外, 重新寻找新的<§9 虚岩矿脉 §r>\n\n" },
        { text: "当加装[§3 升级模块 §r]时, 可以大幅提高运行效率\n\n" },
    ]
});
help$1.set("starry_map:gold.mineral_machine", {
    root: ['矿产勘探', '金质强化', '矿井单元'],
    intel: [
        { text: "设备<§u 运行频率 §r>:§2 5§r tick\n\n" },
        { text: "运行时消耗<§p星尘力§r>:§2 150§r\n\n" },
        { text: "北面为<§u 虹彩端口 §r>可与[§3 魔导总线 §r]进行连接\n\n" },
        { text: "当[§3 魔导总线 §r]输入<§9 信号 §r>时, 将在一段时间后产出[§3 矿物 §r]\n\n" },
        { text: "每个<§9 虚岩矿脉 §r>的储量有限, 挖掘耗尽后将无法再挖矿\n\n" },
        { text: "请在一定距离外, 重新寻找新的<§9 虚岩矿脉 §r>\n\n" },
        { text: "当加装[§3 升级模块 §r]时, 可以大幅提高运行效率\n\n" },
    ]
});
help$1.set("starry_map:netherite.mineral_machine", {
    root: ['矿产勘探', '合金强化', '矿井单元'],
    intel: [
        { text: "设备<§u 运行频率 §r>:§2 2§r tick\n\n" },
        { text: "运行时消耗<§p星尘力§r>:§2 150§r\n\n" },
        { text: "北面为<§u 虹彩端口 §r>可与[§3 魔导总线 §r]进行连接\n\n" },
        { text: "当[§3 魔导总线 §r]输入<§9 信号 §r>时, 将在一段时间后产出[§3 矿物 §r]\n\n" },
        { text: "每个<§9 虚岩矿脉 §r>的储量有限, 挖掘耗尽后将无法再挖矿\n\n" },
        { text: "请在一定距离外, 重新寻找新的<§9 虚岩矿脉 §r>\n\n" },
    ]
});
const mineral = [
    { text: '此类矿物将作为复合矿物团的组成部分在[ 主世界 ]中自然生成\n\n' },
    { text: '该材料会在[ 主世界 ]的高度[ -60 ~ 120 ]处生成\n\n' },
    { text: '每个区块最多生成 6 个矿物团\n\n' },
    { text: '每个矿物团中至多生成 16 块相同类型的矿物\n\n' },
];
help$1.set('starry_map:mine.oxygen_enriched_gold', {
    root: ['富氧金', '自然生成', '原矿方块'],
    intel: [
        ...mineral
    ]
});
help$1.set('starry_map:mine.ferric_phosphate', {
    root: ['磷酸铁', '自然生成', '原矿方块'],
    intel: [
        ...mineral
    ]
});
help$1.set('starry_map:mine.aluminum_magnesium', {
    root: ['铝镁金', '自然生成', '原矿方块'],
    intel: [
        ...mineral
    ]
});
help$1.set('starry_map:mine.ferric_chloride', {
    root: ['氯化铁', '自然生成', '原矿方块'],
    intel: [
        ...mineral
    ]
});
help$1.set('starry_map:mine.zirconium_carbide', {
    root: ['碳化锆', '自然生成', '原矿方块'],
    intel: [
        ...mineral
    ]
});
help$1.set('starry_map:mine.gold_carbonate', {
    root: ['碳酸金', '自然生成', '原矿方块'],
    intel: [
        ...mineral
    ]
});
help$1.set('starry_map:mine.lithium_carbonate', {
    root: ['碳酸锂', '自然生成', '原矿方块'],
    intel: [
        ...mineral
    ]
});
help$1.set('starry_map:mine.tungsten_nickel_titanium', {
    root: ['钨镍钛', '自然生成', '原矿方块'],
    intel: [
        ...mineral
    ]
});
help$1.set('starry_map:mine.copper_tin_brazing', {
    root: ['锡钎铜', '自然生成', '原矿方块'],
    intel: [
        ...mineral
    ]
});
help$1.set("starry_map:copper.intensify_node", {
    root: ['能源模块', '源能枢纽', '能量存储'],
    intel: [
        { text: "<§v创建§r>或<§m提取§r><§p星尘力缓存§r>:§2 100000点§r\n\n" },
        { text: "交互时将显示界面, 可选择<§v创建§r>或<§m提取§r><§p星尘力缓存§r>\n\n" },
        { text: "创建缓存时, 将从区块中消耗能量并存储到<§p星尘力缓存§r>中\n\n" },
        { text: "提取缓存时, 将从<§p星尘力缓存§r>中清除并补充区块能量\n\n" },
        { text: "防止快速点击, 3 秒内无法重复触发\n\n" },
        { text: "当区块能量不足时, 将提示<§p能量不足§r>并禁止操作" }
    ]
});
help$1.set("starry_map:copper.intensify_node", {
    root: ['能源模块', '能量节点', '强化', '铜制'],
    intel: [
        { text: "运行时补充<§p星尘力§r>:§2 30§r\n\n" },
        { text: "当获得<§u 充能 §r>时, 将为一定范围内的<§9 区块 §r>补充<§p星尘力§r>\n\n" },
        { text: "<§p星尘力§r>仅在一定范围内有效, 超出范围将无法获取<§p星尘力§r>\n\n" },
        { text: "当<§p星尘力§r>耗尽时, 需放置[§3 能量节点 §r]重新补充<§p星尘力§r>\n\n" }
    ]
});
help$1.set("starry_map:iron.intensify_node", {
    root: ['能源模块', '能量节点', '强化', '铁制'],
    intel: [
        { text: "运行时补充<§p星尘力§r>:§2 60§r\n\n" },
        { text: "当获得<§u 充能 §r>时, 将为一定范围内的<§9 区块 §r>补充<§p星尘力§r>\n\n" },
        { text: "<§p星尘力§r>仅在一定范围内有效, 超出范围将无法获取<§p星尘力§r>\n\n" },
        { text: "当<§p星尘力§r>耗尽时, 需放置[§3 能量节点 §r]重新补充<§p星尘力§r>\n\n" }
    ]
});
help$1.set("starry_map:gold.intensify_node", {
    root: ['能源模块', '能量节点', '强化', '金制'],
    intel: [
        { text: "运行时补充<§p星尘力§r>:§2 120§r\n\n" },
        { text: "当获得<§u 充能 §r>时, 将为一定范围内的<§9 区块 §r>补充<§p星尘力§r>\n\n" },
        { text: "<§p星尘力§r>仅在一定范围内有效, 超出范围将无法获取<§p星尘力§r>\n\n" },
        { text: "当<§p星尘力§r>耗尽时, 需放置[§3 能量节点 §r]重新补充<§p星尘力§r>\n\n" }
    ]
});
help$1.set("starry_map:netherite.intensify_node", {
    root: ['能源模块', '能量节点', '强化', '合金'],
    intel: [
        { text: "运行时补充<§p星尘力§r>:§2 240§r\n\n" },
        { text: "当获得<§u 充能 §r>时, 将为一定范围内的<§9 区块 §r>补充<§p星尘力§r>\n\n" },
        { text: "<§p星尘力§r>仅在一定范围内有效, 超出范围将无法获取<§p星尘力§r>\n\n" },
        { text: "当<§p星尘力§r>耗尽时, 需放置[§3 能量节点 §r]重新补充<§p星尘力§r>\n\n" }
    ]
});
help$1.set("starry_map:initial_node", {
    root: ['能源模块', '能量节点', '初级'],
    intel: [
        { text: "运行时补充<§p星尘力§r>:§2 15§r\n\n" },
        { text: "当获得<§u 充能 §r>时, 将为一定范围内的<§9 区块 §r>补充<§p星尘力§r>\n\n" },
        { text: "<§p星尘力§r>仅在一定范围内有效, 超出范围将无法获取<§p星尘力§r>\n\n" },
        { text: "当<§p星尘力§r>耗尽时, 需放置[§3 能量节点 §r]重新补充<§p星尘力§r>\n\n" }
    ]
});
help$1.set("starry_map:wind_power", {
    root: ['能源模块', '风力动能'],
    intel: [
        { text: "当<§3 方块高度 §r>高于 64 且 低于 200\n\n" },
        { text: "将周期性的为后方的 5 个[§3 基础-动能分配 §r]提供<§u 动能 §r>\n\n" },
        { text: "<§3 方块高度 §r>越高, 提供<§u 动能 §r>的效率就越高\n\n" }
    ]
});
help$1.set("starry_map:allocation_power", {
    root: ['能源模块', '动能分配'],
    intel: [
        { text: "当获得<§u 动能 §r>时, 将对上方的[§3 能量节点 §r]进行<§p 充能 §r>\n\n" }
    ]
});
help$1.set("starry_map:magma_power", {
    root: ['能源模块', '熔岩质能'],
    intel: [
        { text: "可以与[§3 黑曜石熔炉 §r]进行<§p 联动 §r>\n\n" },
        { text: "当自身存储有[§3 熔岩 §r]时\n\n" },
        { text: "将周期性的为 4 个轴线上的的 5 个[§3 基础-动能分配 §r]提供<§u 动能 §r>\n\n" },
        { text: "并在输出一段时间后, 消耗自身的[§3 熔岩 §r]储备\n\n" },
    ]
});
help$1.set("starry_map:water_power", {
    root: ['能源模块', '水素质能'],
    intel: [
        { text: "当下方存在[§3 水源 §r]时\n\n" },
        { text: "将周期性的为后方的 5 个[§3 基础-动能分配 §r]提供<§u 动能 §r>\n\n" },
        { text: "并消耗下方 5 x 5 的[§3 水源 §r]\n\n" },
    ]
});
help$1.set("starry_map:constant_tank", {
    root: ['能源模块', '魔晶储罐', '恒常'],
    intel: [
        { text: "[§5 恒常单元 §r]将周期性的为上方的[§3 能量节点 §r]提供<§u 充能 §r>\n\n" },
        { text: "当[§5 恒常单元 §r]被破坏时, 将掉落为[§5 虚无单元 §r]\n\n" },
        { text: "如果破坏时, 手持[§5 魔晶工具 §r], 将掉落随机[§5 魔晶石 §r]\n\n" },
    ]
});
help$1.set("starry_map:release_tank", {
    root: ['能源模块', '魔晶储罐', '辉光'],
    intel: [
        { text: "[§5 辉光单元 §r]将周期性的为上方的[§3 能量节点 §r]提供<§u 充能 §r>\n\n" },
        { text: "并在提供一定<§u 充能 §r>次数后, 消耗自身<§u 能量储备 §r>\n\n" },
        { text: "当<§u 能量储备 §r>耗尽时, 将转化为[§5 虚无单元 §r]\n\n" },
        { text: "当[§5 辉光单元 §r]被破坏时, 将掉落为[§5 虚无单元 §r]\n\n" },
        { text: "如果破坏时, 手持[§5 魔晶工具 §r], 将掉落随机[§5 魔晶石 §r]\n\n" },
    ]
});
help$1.set("starry_map:empty_tank", {
    root: ['能源模块', '魔晶储罐', '虚无'],
    intel: [
        { text: "使用[§5 任意§u魔晶石 §r]<§6 点击 §r>, 将逐步填充<§5 魔晶储量 §r>\n\n" },
        { text: "当<§5 魔晶储量 §r>充满时, 将转化为[§5 辉光单元 §r]\n\n" },
        { text: "如果使用[§6 永恒魔晶石 §r]进行填充, 将转化为[§5 恒常单元 §r]\n\n" },
    ]
});
help$1.set("starry_map:star_energy_infusion", {
    root: ['能源模块', '魔晶充能', '超级快充'],
    intel: [
        { text: "当玩家手持[§5 特殊道具 §r]<§6 点击 §r>该方块时\n\n" },
        { text: "将会汲取周围的<§l§d 星尘力 §r>为玩家的[§5 手持物品 §r]进行充能\n\n" },
        { text: "部分道具将直接恢复损失的耐久\n\n" },
        { text: "该设备目前支持: [§5 魔晶工具 §r][§5 魔晶铠甲 §r][§5 注魔宝珠 §r][§5 隧龙掘进 §r][§5 神恩权柄 §r]\n\n" },
    ]
});
help$1.set("starry_map:super_star_energy_infusion", {
    root: ['能源模块', '强化-魔晶充能', '超级快充'],
    intel: [
        { text: "当玩家手持[§5 特殊道具 §r]<§6 点击 §r>该方块时\n\n" },
        { text: "将会汲取周围的<§l§d 星尘力 §r>为玩家的[§5 手持物品 §r]进行充能\n\n" },
        { text: "部分道具将直接恢复损失的耐久\n\n" },
        { text: "该设备目前支持: [§5 任意具有耐久值的物品 §r]\n\n" },
    ]
});
help$1.set("starry_map:magic_crystal_lamp", {
    root: ['效应机关', '魔晶明灯'],
    intel: [
        { text: "6个面为<§u 虹彩端口 §r>可与[§3 魔导总线 §r]进行连接\n\n" },
        { text: "当输入<§9 信号 §r>时, 可改变<§9 方块亮度 §r>\n\n" },
        { text: "[§3 交互终端 §r]的前三类<§9 信号 §r>可逐渐提高<§9 方块亮度 §r>\n\n" },
        { text: "[§3 交互终端 §r]的后三类<§9 信号 §r>可逐渐降低<§9 方块亮度 §r>\n\n" },
        { text: "<§9 启程信号 §r>将完全点亮<§9 方块亮度 §r>\n\n" },
        { text: "<§9 焚绝信号 §r>将完全熄灭<§9 方块亮度 §r>\n\n" },
    ]
});
help$1.set("starry_map:region_display", {
    root: ['效应机关', '区块显示'],
    intel: [
        { text: "如果[§9 实体 §r]踩踏[§3方块§r]时, 将被短暂<§4 点燃 §r>\n\n" },
        { text: "如果[§9 玩家 §r]点击方块, 将显示<§9 区块范围 §r>\n\n" },
        { text: "当<§9 区块范围 §r>内存在<§p星尘力§r>, 将喷射绿色粒子射流\n\n" },
        { text: "当<§9 区块范围 §r>内不存在<§p星尘力§r>, 将喷射红色粒子射流\n\n" },
    ]
});
help$1.set("starry_map:vector_ejection", {
    root: ['效应机关', '向量弹射'],
    intel: [
        { text: "如果[§9 实体 §r]踩踏[§3方块§r]时, 将被<§u 弹射 §r>\n\n" },
        { text: "<§4 弹射 §r>的<§6 方向 | 速度 | 力度 §r>取决于[§9 实体 §r]的姿态\n\n" }
    ]
});
help$1.set("starry_map:road_sign_presets", {
    root: ['效应机关', '诸界道标'],
    intel: [
        { text: "与[§3 空间宝典 §r]共享<§9 传送锚点 §r>的设备\n\n" },
        { text: "点击后, 可选择<§9 传送锚点 §r>进行<§9 传送 §r>\n\n" },
        { text: "无法通过该设备<§6 删除 | 创建 §r><§9 传送锚点 §r>\n\n" }
    ]
});
help$1.set("starry_map:universal_mechanical_framework", {
    root: ['基础方块', '通用机械框架'],
    intel: [
        { text: "放置时, 消耗周围§2 1 §r点<§6 星尘力 §r>的设备\n\n" },
        { text: "如果周围存在<§6 星尘力 §r>方块将变为§9 蓝色§r\n\n" },
        { text: "如果周围不存在<§6 星尘力 §r>方块将变为§c 红色§r\n\n" }
    ]
});
help$1.set("starry_map:nihility_space", {
    root: ['基础方块', '虚空方块'],
    intel: [
        { text: "等待§2 10 §r后, 该方块将会自动消失\n\n" }
    ]
});
help$1.set("starry_map:unreal_space", {
    root: ['基础方块', '虚无方块'],
    intel: [
        { text: "等待§2 10 §r后, 该方块将会自动消失\n\n" }
    ]
});
help$1.set("starry_map:unreal_space", {
    root: ['基础方块', '压缩圆石'],
    intel: [
        { text: "用于配套<§9 黑曜石熔炉 §r>使用的方块\n\n" },
        { text: "可以煅烧为<§4 熔岩 §r>\n\n" },
    ]
});
help$1.set("starry_map:wind_and_rain", {
    root: ['效应机关', '水域天降'],
    intel: [
        { text: "下方<§u 控制端口 §r>可与[§3 脉冲锁存 §r]进行连接\n\n" },
        { text: "当[§3 脉冲锁存 §r]为<§d 激活状态 §r>时\n\n" },
        { text: "将会降下装饰性的<§9 雨水 或 雪花 §r>特效\n\n" }
    ]
});
help$1.set("starry_map:wind_and_snow", {
    root: ['效应机关', '雪域霜华'],
    intel: [
        { text: "下方<§u 控制端口 §r>可与[§3 脉冲锁存 §r]进行连接\n\n" },
        { text: "当[§3 脉冲锁存 §r]为<§d 激活状态 §r>时\n\n" },
        { text: "将会降下装饰性的<§9 雨水 或 雪花 §r>特效\n\n" }
    ]
});
help$1.set("starry_map:super_omphalos", {
    root: ['魔导总线', '超导枢纽'],
    intel: [
        { text: "这个模块的所有面都是 <§u 虹彩端口 §r>\n\n" },
        { text: "可以与 [§3 魔导总线 §r] 进行连接\n\n" },
        { text: "当 [§3 魔导总线 §r] 输入 <§9 信号 §r> 时\n\n" },
        { text: "它将 <§6 广播 §r> 接收到的 <§9 信号 §r>\n\n" },
        { text: "在范围内的 [§3 超导髓鞘 §r] 将会 <§u 激活 §r>\n\n" },
        { text: "并输出 <§9 信号 §r>, 实现信号的无线传播\n\n" },
        { text: "这个模块的主要作用是信号无线广播\n\n" },
        { text: "为魔导网络提供高效的信号传输\n\n" },
        { text: "确保所有连接正确, 以发挥其最大效能\n\n" }
    ]
});
help$1.set("starry_map:super_pulse", {
    root: ['魔导总线', '超导髓鞘'],
    intel: [
        { text: "末端的 <§u 虹彩端口 §r> 可以与 [§3 魔导总线 §r] 连接\n\n" },
        { text: "当 [§3 魔导总线 §r] 输入 <§9 信号 §r> 时\n\n" },
        { text: "将发射 <§9 信号射线 §r>, 进行信息传递\n\n" },
        { text: "如果 <§9 信号射线 §r> 命中 [§3 魔导总线 §r]\n\n" },
        { text: "那么 [§3 魔导总线 §r] 将会被激活\n\n" },
        { text: "这种设计使得信息传输更为高速\n\n" },
        { text: "同时显著减少了传输过程中的延迟\n\n" },
        { text: "确保所有连接正确, 以实现最优的传输效率\n\n" }
    ]
});
help$1.set("starry_map:enable_control", {
    root: ['魔导总线', '传播许可'],
    intel: [
        { text: "四周的端口为 <§u 虹彩端口 §r>\n\n" },
        { text: "它们可以与 [§3 魔导总线 §r] 进行连接\n\n" },
        { text: "上下端口为 <§u 控制端口 §r>\n\n" },
        { text: "这些端口可以与 [§3 脉冲锁存 §r] 连接\n\n" },
        { text: "当 [§3 魔导总线 §r] 输入 <§9 信号 §r>\n\n" },
        { text: "并且 [§3 脉冲锁存 §r] 处于 <§d 激活状态 §r> 时\n\n" },
        { text: "[§u 传播许可 §r] 将进入 <§6 导通状态 §r>\n\n" },
        { text: "这将允许 <§9 信号 §r> 被输出\n\n" },
        { text: "如果不满足上述条件\n\n" },
        { text: "[§u 传播许可 §r] 将阻断 <§9 信号 §r> 输出\n\n" },
        { text: "该模块的作用类似于开关三极管\n\n" },
        { text: "但不提供信号放大效果\n\n" }
    ]
});
help$1.set("starry_map:redstone_detection", {
    root: ['魔导总线', '红石侦测'],
    intel: [
        { text: "该模块四周为 <§u 虹彩端口 §r>\n\n" },
        { text: "这些端口可以与 [§3 魔导总线 §r] 进行连接\n\n" },
        { text: "模块的上方可以与 <§4 红石导体 §r> 进行连接\n\n" },
        { text: "当 <§4 红石导体 §r> 的 <§c 红石等级 §r> 发生变化时\n\n" },
        { text: "模块将输出相应的 <§9 信号 §r>\n\n" },
        { text: "这种设计使得红石信号能够被检测并转换\n\n" },
        { text: "为自动化系统提供控制信号\n\n" },
        { text: "确保连接正确, 以实现信号的准确传递\n\n" }
    ]
});
help$1.set("starry_map:basic_pipeline", {
    root: ['魔导总线', '基础总线'],
    intel: [
        { text: "当您 <§6 放置 §r> [§5 基础总线 §r] 时\n\n" },
        { text: "会自动进行 <§n 外观衔接 §r>, 确保美观\n\n" },
        { text: "所有侧面都设计为 <§u 虹彩端口 §r>\n\n" },
        { text: "这些端口可以与 [§3 魔导总线 §r] 进行连接\n\n" },
        { text: "这样的设计使得基础总线能够无缝融入魔导网络\n\n" },
        { text: "[§3 魔导总线 §r] 每 0.5 秒\n\n" },
        { text: "最多响应一次 <§9 信号 §r>, 保证信号的稳定传输\n\n" },
        { text: "这种响应机制有助于避免信号过载\n\n" },
        { text: "确保系统的平稳运行\n\n" }
    ]
});
help$1.set("starry_map:counting_module", {
    root: ['魔导总线', '计数模块'],
    intel: [
        { text: "该模块的所有面都是 <§u 虹彩端口 §r>\n\n" },
        { text: "可以与 [§3 魔导总线 §r] 进行连接\n\n" },
        { text: "使用 [§2 魔晶工具 §r] <§6 点击 §r> 模块\n\n" },
        { text: "可以调整 <§n 计数阈值 §r>\n\n" },
        { text: "当 <§9 信号 §r> 输入次数达到设定的 <§n 计数阈值 §r>\n\n" },
        { text: "模块将输出一个 <§9 信号 §r>\n\n" },
        { text: "输出信号后, 模块会自动复位自身状态\n\n" },
        { text: "这种机制使得计数模块可以作为脉冲信号计数器使用\n\n" },
        { text: "它在自动化系统中非常有用\n\n" },
        { text: "可以触发基于特定信号次数的事件\n\n" }
    ]
});
help$1.set("starry_map:interactive_terminal", {
    root: ['魔导总线', '交互终端'],
    intel: [
        { text: "该模块的除正面外的所有面都是 <§u 虹彩端口 §r>\n\n" },
        { text: "这些端口可以与 [§3 魔导总线 §r] 进行连接\n\n" },
        { text: "使用 [§2 魔晶工具 §r] <§6 点击 §r> 交互终端\n\n" },
        { text: "可以调整输出的 <§9 信号类型 §r>\n\n" },
        { text: "当 [§5 玩家 §r] <§6 点击 §r> 该终端时\n\n" },
        { text: "它将输出预设的 <§9 信号 §r>\n\n" },
        { text: "该模块的功能类似于一个按钮面板\n\n" },
        { text: "但可以指定输出特定的信号类型\n\n" },
        { text: "这为自动化控制提供了更多灵活性\n\n" }
    ]
});
help$1.set("starry_map:logic_single", {
    root: ['魔导总线', '逻辑单通'],
    intel: [
        { text: "该模块一端为 <§u 虹彩端口 §r>\n\n" },
        { text: "可以与 [§3 魔导总线 §r] 进行连接\n\n" },
        { text: "另一端为 <§u 控制端口 §r>\n\n" },
        { text: "可以与 [§3 脉冲锁存 §r] 进行连接\n\n" },
        { text: "如果 [§3 脉冲锁存 §r] 处于 <§d 激活状态 §r>\n\n" },
        { text: "模块将输出 <§9 对应信号 §r>\n\n" },
        { text: "输出信号后\n\n" },
        { text: "将复位附近 [§3 脉冲锁存 §r] 的 <§d 激活状态 §r>\n\n" },
        { text: "该模块的主要作用是实现信号的单向传播\n\n" },
        { text: "确保信号在网络中按预定路径传递\n\n" }
    ]
});
help$1.set("starry_map:logic_inverter", {
    root: ['魔导总线', '逻辑非门'],
    intel: [
        { text: "该模块一端为 <§u 虹彩端口 §r>\n\n" },
        { text: "用于与 [§3 魔导总线 §r] 连接\n\n" },
        { text: "另一端为 <§u 控制端口 §r>\n\n" },
        { text: "可以与 [§3 脉冲锁存 §r] 连接\n\n" },
        { text: "使用 [§2 魔晶工具 §r] <§6 点击 §r>\n\n" },
        { text: "可以调整模块的 <§9 冷却时间 §r>\n\n" },
        { text: "如果 [§3 脉冲锁存 §r] 处于 <§d 激活状态 §r>\n\n" },
        { text: "模块将停止输出 <§9 信号 §r>\n\n" },
        { text: "否则, 将根据 <§9 冷却时间 §r>\n\n" },
        { text: "间歇性地输出 <§9 随机信号 §r>\n\n" },
        { text: "该模块的核心作用是实现逻辑状态反转\n\n" },
        { text: "以及提供时钟频率的信号输出\n\n" }
    ]
});
help$1.set("starry_map:exclusive_or", {
    root: ['魔导总线', '逻辑异或'],
    intel: [
        { text: "该模块一端为 <§u 虹彩端口 §r>\n\n" },
        { text: "可以与 [§3 魔导总线 §r] 连接\n\n" },
        { text: "两侧为 <§u 控制端口 §r>\n\n" },
        { text: "用于与 [§3 脉冲锁存 §r] 连接\n\n" },
        { text: "当两侧 [§3 脉冲锁存 §r] 的 <§d 激活状态 §r> 不同时\n\n" },
        { text: "模块将输出一个 <§9 信号 §r>\n\n" },
        { text: "输出后, 会复位附近 [§3 脉冲锁存 §r] 的状态\n\n" },
        { text: "这一特性使得模块在逻辑运算中\n\n" },
        { text: "模块的核心功能是实现逻辑异或运算\n\n" },
        { text: "在自动化控制系统中发挥关键作用\n\n" }
    ]
});
help$1.set("starry_map:logical_and", {
    root: ['魔导总线', '逻辑与门'],
    intel: [
        { text: "本模块一端为 <§u 虹彩端口 §r>\n\n" },
        { text: "用于与 [§3 魔导总线 §r] 连接\n\n" },
        { text: "两侧端为 <§u 控制端口 §r>\n\n" },
        { text: "可以连接至 [§3 脉冲锁存 §r]\n\n" },
        { text: "当两侧 [§3 脉冲锁存 §r] 的 <§d 激活状态 §r> 相同时\n\n" },
        { text: "模块将输出一个 <§9 信号 §r>\n\n" },
        { text: "输出后, 会复位附近 [§3 脉冲锁存 §r] 的状态\n\n" },
        { text: "这一机制确保了信号的同步和一致性\n\n" },
        { text: "模块的核心功能是实现逻辑与门运算\n\n" },
        { text: "在自动化控制系统中发挥关键作用\n\n" }
    ]
});
help$1.set("starry_map:pulse_latch", {
    root: ['魔导总线', '脉冲锁存'],
    intel: [
        { text: "当您 <§6 放置 §r> [§5 脉冲锁存 §r] 时\n\n" },
        { text: "它会自动进行 <§n 外观衔接 §r>\n\n" },
        { text: "所有面都为 <§u 虹彩端口 §r>\n\n" },
        { text: "允许与 [§3 魔导总线 §r] 连接\n\n" },
        { text: "当 [§3 魔导总线 §r] 输入 <§9 信号 §r>\n\n" },
        { text: "脉冲锁存的 <§d 激活状态 §r> 将改变\n\n" },
        { text: "状态改变后, 将保持该状态\n\n" },
        { text: "直到再次接收到信号\n\n" },
        { text: "该模块是信号锁存的关键单元\n\n" },
        { text: "用于确保信号状态的稳定存储\n\n" }
    ]
});
help$1.set("starry_map:signal_compilation", {
    root: ['魔导总线', '信号编译'],
    intel: [
        { text: "该模块所有面为 <§u 虹彩端口 §r>\n\n" },
        { text: "允许与 [§3 魔导总线 §r] 连接\n\n" },
        { text: "当 [§3 魔导总线 §r] 输入 <§9 信号 §r> 时\n\n" },
        { text: "若 <§p 输入端 §r> [§3 方块容器 §r] 中有 [§5 魔晶石 §r]\n\n" },
        { text: "将根据放置顺序, 逐个输出 <§9 信号 §r>\n\n" },
        { text: "一次最多可输出 16 个独立的 <§9 信号 §r>\n\n" },
        { text: "该模块充当简易可调的信号发生器\n\n" },
        { text: "为自动化系统提供灵活的信号控制\n\n" }
    ]
});
help$1.set("starry_map:signal_filtering", {
    root: ['魔导总线', '信号过滤'],
    intel: [
        { text: "该模块的所有面为 <§u 虹彩端口 §r>\n\n" },
        { text: "可与 [§3 魔导总线 §r] 进行连接\n\n" },
        { text: "使用 [§2 魔晶工具 §r] <§6 点击 §r> 模块\n\n" },
        { text: "可以调整允许通过的 <§9 信号类型 §r>\n\n" },
        { text: "当 [§3 魔导总线 §r] 输入 <§9 信号 §r> 时\n\n" },
        { text: "仅 <§9 信号类型 §r> 匹配的 <§9 信号 §r> 会被输出\n\n" },
        { text: "不匹配的信号将被过滤, 不会输出\n\n" },
        { text: "该模块充当可调信号过滤器\n\n" },
        { text: "在自动化系统中确保信号的准确性\n\n" }
    ]
});
help$1.set("starry_map:signal_conversion", {
    root: ['魔导总线', '信号转化'],
    intel: [
        { text: "此模块所有面为 <§u 虹彩端口 §r>\n\n" },
        { text: "与 [§3 魔导总线 §r] 连接\n\n" },
        { text: "使用 [§2 魔晶工具 §r] <§6 点击 §r> 模块\n\n" },
        { text: "可调整输出的 <§9 信号类型 §r>\n\n" },
        { text: "当 [§3 魔导总线 §r] 输入 <§9 信号 §r> 时\n\n" },
        { text: "模块会强制修改 <§9 信号类型 §r>\n\n" },
        { text: "然后, 将变更后的 <§9 信号 §r> 输出\n\n" },
        { text: "该模块是可调信号变更器\n\n" },
        { text: "在自动化系统中转换信号类型\n\n" }
    ]
});
help$1.set("starry_map:cable_port", {
    root: ['魔导总线', '总线端口'],
    intel: [
        { text: "此模块前后两个面为 <§u 虹彩端口 §r>\n\n" },
        { text: "允许与 [§3 魔导总线 §r] 进行连接\n\n" },
        { text: "[§3 魔导总线 §r] 每 0.5 秒\n\n" },
        { text: "最多响应一次 <§9 信号 §r>\n\n" },
        { text: "这有助于确保信号传输的稳定性\n\n" },
        { text: "减少信号干扰和延迟\n\n" },
        { text: "该模块设计为抗干扰的双通信号线\n\n" },
        { text: "在复杂网络中提供可靠的连接\n\n" }
    ]
});
const cable = [
    { text: '当前<§e 校准元件 §r>的时钟频率为§a 5 §rHZ\n\n' },
    { text: '当使用<§5 魔晶工具 §r>系列物品点击时: 可调整模块的指向方向\n\n' },
    { text: '当使用<§9 魔导书籍 §r>系列物品点击时: 可调整模块的信号类型\n\n' },
    { text: '当前模块的功能包括:\n\n' },
];
help$1.set("starry_map:spectral_prism", {
    root: ['魔导总线', '校准元件', '分光棱镜'],
    intel: [
        { text: '此模块可等效为<§3 脉冲锁存 §r>进行使用\n\n' },
        ...cable,
        { text: '   将输入的逻辑射线转发为§a 2 §r道\n\n' },
        { text: '   类型相同, 方向相反的逻辑射线\n\n' }
    ]
});
help$1.set("starry_map:logic_not", {
    root: ['魔导总线', '校准元件', '逻辑非门'],
    intel: [
        ...cable,
        { text: '   对输入信号进行取反, 如果输入为高电平, 输出为低电平\n\n' },
        { text: '   如果输入为低电平, 输出为高电平\n\n' }
    ]
});
help$1.set("starry_map:logic_nor", {
    root: ['魔导总线', '校准元件', '逻辑或非'],
    intel: [
        ...cable,
        { text: '   与<§2 逻辑或门 §r>相反\n\n' },
        { text: '   只有当所有输入都为低电平时, 输出才为高电平\n\n' },
        { text: '   如果任一输入为高电平, 输出为低电平\n\n' }
    ]
});
help$1.set("starry_map:logic_xor", {
    root: ['魔导总线', '校准元件', '逻辑异或'],
    intel: [
        ...cable,
        { text: '   当输入信号的电平不同时, 输出为高电平\n\n' },
        { text: '   如果输入信号的电平相同, 输出为低电平\n\n' }
    ]
});
help$1.set('starry_map:logic_and', {
    root: ['魔导总线', '校准元件', '逻辑与门'],
    intel: [
        ...cable,
        { text: '   只有当所有输入都为高电平时, 输出才为高电平\n\n' },
        { text: '   如果任一输入为低电平, 输出为低电平\n\n' }
    ]
});
help$1.set('starry_map:logic_or', {
    root: ['魔导总线', '校准元件', '逻辑或门'],
    intel: [
        ...cable,
        { text: '   只要任一输入为高电平, 输出即为高电平\n\n' },
        { text: '   只有当所有输入都为低电平时, 输出才为低电平\n\n' }
    ]
});
help$1.set('starry_map:logic_xnor', {
    root: ['魔导总线', '校准元件', '逻辑同或'],
    intel: [
        ...cable,
        { text: '   当输入信号的电平相同时, 输出为高电平\n\n' },
        { text: '   如果输入信号的电平不同, 输出为低电平\n\n' }
    ]
});
help$1.set('starry_map:deflection_prism', {
    root: ['魔导总线', '校准元件', '偏光棱镜'],
    intel: [
        { text: '此模块可等效为<§3 脉冲锁存 §r>进行使用\n\n' },
        ...cable,
        { text: '   直接传递输入信号, 不进行任何逻辑操作\n\n' },
        { text: '   输出信号与输入信号电平相同\n\n' }
    ]
});
help$1.set("starry_map:logic_nand", {
    root: ['魔导总线', '校准元件', '逻辑与非'],
    intel: [
        ...cable,
        { text: '   只有当所有输入都为高电平时, 输出才为低电平\n\n' },
        { text: '   如果任一输入为低电平, 输出为高电平\n\n' }
    ]
});
help$1.set("starry_map:logic_nor", {
    root: ['魔导总线', '校准元件', '逻辑或非'],
    intel: [
        ...cable,
        { text: '   只有当所有输入都为低电平时, 输出才为高电平\n\n' },
        { text: '   如果任一输入为高电平, 输出为低电平\n\n' }
    ]
});
help$1.set("starry_map:magic_portal_above", {
    root: ['机关之门', '魔晶上传', '门户'],
    intel: [
        { text: "运行时消耗<§p星尘力§r>:§2 30§r\n\n" },
        { text: "<§6 放置 §r>[§5 机关之门 §r]时, 将进行<§n 外观衔接 §r>\n\n" },
        { text: "当[§5 玩家 §r]<§6 点击 §r>[§5 魔晶传送门 §r]时\n\n" },
        { text: "[§5 魔晶传送门 §r]将消耗<§p星尘力§r>移动附近的[§5 实体 §r]\n\n" },
        { text: "使[§5 实体 §r]移动到上方或下方的另一个[§5 魔晶传送门 §r]处\n\n" },
        { text: "接收到<§9 信号 §r>时, 将执行<§6 点击 §r>的操作\n\n" }
    ]
});
help$1.set("starry_map:magic_portal_below", {
    root: ['机关之门', '魔晶下传', '门户'],
    intel: [
        { text: "运行时消耗<§p星尘力§r>:§2 30§r\n\n" },
        { text: "<§6 放置 §r>[§5 机关之门 §r]时, 将进行<§n 外观衔接 §r>\n\n" },
        { text: "当[§5 玩家 §r]<§6 点击 §r>[§5 魔晶传送门 §r]时\n\n" },
        { text: "[§5 魔晶传送门 §r]将消耗<§p星尘力§r>移动附近的[§5 实体 §r]\n\n" },
        { text: "使[§5 实体 §r]移动到上方或下方的另一个[§5 魔晶传送门 §r]处\n\n" },
        { text: "接收到<§9 信号 §r>时, 将执行<§6 点击 §r>的操作\n\n" }
    ]
});
const block_gate = [
    { text: "<§6 放置 §r>时, 将进行<§n 外观衔接 §r>\n\n" },
    { text: "当[§5 玩家 §r]<§6 点击 §r>时\n\n" },
    { text: "将进入<§n 开启 §r>状态, 并保持一段时间\n\n" },
    { text: "当[§5 玩家 §r]<§6 再次点击 §r>时\n\n" },
    { text: "将进入<§n 关闭 §r>状态\n\n" },
    { text: "接收到<§9 信号 §r>时, 将改变当前状态\n\n" }
];
[
    "starry_map:vertical_gate.spruce",
    "starry_map:vertical_gate.diorite",
    "starry_map:vertical_gate.deepslate",
    "starry_map:vertical_gate.light_gray_stained_glass",
    "starry_map:vertical_gate.light_blue_stained_glass",
    "starry_map:vertical_gate.chiseled_resin_bricks",
    "starry_map:vertical_gate.magenta_stained_glass",
    "starry_map:vertical_gate.orange_stained_glass",
    "starry_map:vertical_gate.yellow_stained_glass",
    "starry_map:vertical_gate.purple_stained_glass",
    "starry_map:vertical_gate.brown_stained_glass",
    "starry_map:vertical_gate.white_stained_glass",
    "starry_map:vertical_gate.black_stained_glass",
    "starry_map:vertical_gate.green_stained_glass",
    "starry_map:vertical_gate.cyan_stained_glass",
    "starry_map:vertical_gate.lime_stained_glass",
    "starry_map:vertical_gate.pink_stained_glass",
    "starry_map:vertical_gate.gray_stained_glass",
    "starry_map:vertical_gate.blue_stained_glass",
    "starry_map:vertical_gate.red_stained_glass",
    "starry_map:vertical_gate.crying_obsidian",
    "starry_map:vertical_gate.amethyst_block",
    "starry_map:vertical_gate.cherry_planks",
    "starry_map:vertical_gate.resin_bricks",
    "starry_map:vertical_gate.glass",
    "starry_map:vertical_gate.spruce_trapdoor",
    "starry_map:vertical_gate.cherry_trapdoor",
    "starry_map:horizontal_gate.oak",
    "starry_map:horizontal_gate.birch",
    "starry_map:horizontal_gate.basalt",
    "starry_map:horizontal_gate.andesite",
    "starry_map:horizontal_gate.light_blue_stained_glass",
    "starry_map:horizontal_gate.light_gray_stained_glass",
    "starry_map:horizontal_gate.chiseled_resin_bricks",
    "starry_map:horizontal_gate.magenta_stained_glass",
    "starry_map:horizontal_gate.orange_stained_glass",
    "starry_map:horizontal_gate.yellow_stained_glass",
    "starry_map:horizontal_gate.purple_stained_glass",
    "starry_map:horizontal_gate.brown_stained_glass",
    "starry_map:horizontal_gate.white_stained_glass",
    "starry_map:horizontal_gate.black_stained_glass",
    "starry_map:horizontal_gate.green_stained_glass",
    "starry_map:horizontal_gate.blue_stained_glass",
    "starry_map:horizontal_gate.gray_stained_glass",
    "starry_map:horizontal_gate.pink_stained_glass",
    "starry_map:horizontal_gate.lime_stained_glass",
    "starry_map:horizontal_gate.cyan_stained_glass",
    "starry_map:horizontal_gate.red_stained_glass",
    "starry_map:horizontal_gate.crying_obsidian",
    "starry_map:horizontal_gate.amethyst_block",
    "starry_map:horizontal_gate.cherry_planks",
    "starry_map:horizontal_gate.resin_bricks",
    "starry_map:horizontal_gate.glass",
    "starry_map:horizontal_gate.spruce_trapdoor",
    "starry_map:horizontal_gate.cherry_trapdoor"
].forEach(item => help$1.set(item, { root: ["机关之门", "石门", "木门", "玻璃门", "岩门"], intel: [...block_gate], only: true }));
help$1.set("starry_map:servo_parameter", {
    root: ['伺服驱动', '参数设置', '控制'],
    intel: [
        { text: "使用[§2 魔晶工具 §r]点击, 可以调整<§n 设置参数 §r>\n\n" },
        { text: "在[§5 伺服基座 §r]或[§5 伺服牵引 §r]与之接触时, 同步<§n 设置参数 §r>\n\n" },
        { text: "可作为<§9 限位器 §r>阻止[§5 伺服基座 §r]或[§5 伺服牵引 §r]继续移动\n\n" }
    ]
});
help$1.set("starry_map:servo_susceptor", {
    root: ['伺服驱动', '伺服基座', '驱动'],
    intel: [
        { text: "运行时消耗<§p星尘力§r>:§2 30§r\n\n" },
        { text: "使用[§2 魔晶工具 §r]点击, 可以调整<§n 设置参数 §r>\n\n" },
        { text: "下方为<§u 虹彩端口 §r>可与[§3 魔导总线 §r]进行连接\n\n" },
        { text: "当[§3 魔导总线 §r]输入<§9 信号 §r>时, 将携带上方[§d 方块 §r]进行移动\n\n" }
    ]
});
help$1.set("starry_map:servo_traction", {
    root: ['伺服驱动', '伺服牵引', '驱动'],
    intel: [
        { text: "运行时消耗<§p星尘力§r>:§2 30§r\n\n" },
        { text: "使用[§2 魔晶工具 §r]点击, 可以调整<§n 设置参数 §r>\n\n" },
        { text: "上方为<§u 虹彩端口 §r>可与[§3 魔导总线 §r]进行连接\n\n" },
        { text: "当[§3 魔导总线 §r]输入<§9 信号 §r>时, 将携带下方[§d 方块 §r]进行移动\n\n" }
    ]
});
help$1.set("starry_map:servo_omphalos", {
    root: ['伺服驱动', '驱动核心', '驱动'],
    intel: [
        { text: "运行时消耗<§p星尘力§r>:§2 120§r\n\n" },
        { text: "所有面均为<§u 虹彩端口 §r>可与[§3 魔导总线 §r]进行连接\n\n" },
        { text: "当[§3 魔导总线 §r]输入<§9 信号 §r>时, 将携带周围[§d 结构 §r]进行移动\n\n" },
        { text: "移动时, 将自动检测周围[§d 方块/实体 §r]的<§n 结构尺寸 §r>\n\n" },
        { text: "识别方式为: 检测<§n 射线方向 §r>上最近的[§d 空气 §r]\n\n" },
        { text: "最大结构尺寸为:§2 21 x 21 x 21 §r\n\n" }
    ]
});
help$1.set("starry_map:pulse_peak_cannon", {
    root: ['魔导武器', '脉冲尖峰'],
    intel: [
        { text: "下方<§u 控制端口 §r>可与[§3 脉冲锁存 §r]进行连接\n\n" },
        { text: "当[§3 脉冲锁存 §r]为<§d 激活状态 §r>时\n\n" },
        { text: "将每秒钟消耗<§p星尘力§r>:§2 1§r\n\n" },
        { text: "并在查询到<§c 目标 §r>时, 消耗<§p星尘力§r>:§2 150§r\n\n" },
        { text: "对<§c 目标 §r>造成单体<§u 极雷 §r>伤害\n\n" }
    ]
});
help$1.set("starry_map:planting_and_logging", {
    root: ['农林工程', '植树造木'],
    intel: [
        { text: "运行时消耗<§p星尘力§r>:§2 50§r\n\n" },
        { text: "北面为<§u 虹彩端口 §r>可与[§3 魔导总线 §r]进行连接\n\n" },
        { text: "南面为<§6 工程端口 §r>负责<§9 伐木 §r>与<§9 植树 §r>\n\n" },
        { text: "当[§3 魔导总线 §r]输入<§9 信号 §r>时, 且[§2 树苗 §r]生长为<§2 树 §r>\n\n" },
        { text: "将种下对应[§2 树苗 §r], 并砍伐树木\n\n" }
    ]
});
help$1.set("starry_map:crop_detection", {
    root: ['农林工程', '作物侦测'],
    intel: [
        { text: "运行时消耗<§p星尘力§r>:§2 5§r\n\n" },
        { text: "北面为<§u 虹彩端口 §r>可与[§3 魔导总线 §r]进行连接\n\n" },
        { text: "上方<§u 控制端口 §r>可与[§3 脉冲锁存 §r]进行连接\n\n" },
        { text: "当[§3 脉冲锁存 §r]为<§d 激活状态 §r>时, 南面的<§n 发射端 §r>将周期性的发射<§5 侦测射线 §r>\n\n" },
        { text: "如果<§5 侦测射线 §r>击中<§9 成熟 §r>[§3 作物 §r], 将输出<§9 信号 §r>\n\n" }
    ]
});
help$1.set("starry_map:obsidian_furnace", {
    root: ['曜石熔炼', '熔岩', '熔炉'],
    intel: [
        { text: "运行时消耗<§p星尘力§r>:§2 45§r\n\n" },
        { text: "当<§6 使用 §r>[§2 压缩圆石 §r]<§6 点击 §r>时, 将填充<§u 待熔炼素材 §r>\n\n" },
        { text: "将在一段时间后将<§u 待熔炼素材 §r>转化为[§c 岩浆 §r]\n\n" },
        { text: "至多存储 8 桶[§c 岩浆 §r]\n\n" },
        { text: "当<§6 使用 §r>[§2 空桶 §r]<§6 点击 §r>时, 将提取[c 岩浆 §r]\n\n" },
        { text: "如果[§c 岩浆 §r]存满, 且附近存在[§3 曜石储罐 §r]\n\n" },
        { text: "将消耗自身[§c 岩浆 §r]储备, 填充附近的[§3 曜石储罐 §r]\n\n" },
        { text: "如果此时下方存在[§3 方块容器 §r], 则会尝试自动拉取[§2 压缩圆石 §r]\n\n" }
    ]
});
help$1.set("starry_map:obsidian_storage_tank", {
    root: ['曜石熔炼', '熔岩', '储罐'],
    intel: [
        { text: "至多存储 16 桶[§2 岩浆 §r]\n\n" },
        { text: "当<§6 使用 §r>[§2 空桶 §r]<§6 点击 §r>时, 将提取[§c 岩浆 §r]\n\n" }
    ]
});
const adrift_default_attack = {
    rawtext: [
        { text: '< 普通攻击 >:\n' },
        { text: '      • 发射元素射线, 对[§c 目标 §r]造成范围性[§u 元素伤害 §r]\n' },
        { text: '      • 当[§q 当前血量 §r]低于 50%% 时\n' },
        { text: '      • 提升 50%% [§9 基础伤害 §r]\n\n' },
    ]
};
const wasp_default_attack = {
    rawtext: [
        { text: '< 基础属性 >:\n' },
        { text: '      • [§9 基础血量 §r]: 20\n' },
        { text: '      • [§9 基础攻击 §r]: 5\n' },
        { text: '      • [§9 基础暴击 §r]: 10%% \n' },
        { text: '      • [§9 基础暴伤 §r]: 150%% \n' },
        { text: '      • [§u 续航时间 §r]: 30秒\n\n' },
    ]
};
help$1.set('starry_map:guide.crimson', {
    root: ['领航种', '绯红_技能模组', '生存职业'],
    intel: [
        adrift_default_attack,
        { text: '< 雾海巡游 >:\n' },
        { text: '      • 当<§u 战术等级 §r>至少为 5 级时生效\n' },
        { text: '      • 替换< 普通攻击 >\n' },
        { text: '      • 发动攻击时, 获得 20%% [§9 暴击提升 §r]\n' },
        { text: '      • 攻击命中时, [§9 基础伤害 §r]减少 50%% \n\n' },
        { text: '< 烛火 >:\n' },
        { text: '      • 为附近的[§u 同伴 §r]提供[§2 增益效果 §r]\n' },
        { text: '      • 基于 50%% [§9 基础暴击 §r]回复[§a 生命值 §r]\n' },
        { text: '      • 如果[§a 当前血量 §r]低于 32%% \n' },
        { text: '            为[§u 同伴 §r]提供 32 秒<伤害吸收>\n\n' },
    ]
});
help$1.set('starry_map:guide.sen_nie', {
    root: ['领航种', '森涅_技能模组', '输出职业'],
    intel: [
        adrift_default_attack,
        { text: '< 雾海巡游 >:\n' },
        { text: '      • 当<§u 战术等级 §r>至少为 5 级时生效\n' },
        { text: '      • 替换< 普通攻击 >\n' },
        { text: '      • 基于 20%% < 裁叶 >伤害 获得[§9 伤害提升 §r]\n' },
        { text: '      • < 裁叶 >增加 1 ~ 5 点充能\n' },
        { text: '< 规避 >:\n' },
        { text: '      • 如果[§a 当前血量 §r]低于 35%% \n' },
        { text: '      • 将缩小自身并坐到附近的<玩家>肩膀上\n' },
        { text: '      • 构建<虚空方块>保护自身\n' },
        { text: '      • 为自身附加<生命恢复>效果\n\n' },
        { text: '< 裁叶 >:\n' },
        { text: '      • 当< 裁叶 >充能至少为 15 时\n' },
        { text: '      • 替换< 雾海巡游 >\n' },
        { text: '      • 将[§9 基础伤害 §r]转换为 35%% [§9 基础暴伤 §r]\n' },
        { text: '      • 基于 10%% [§9 基础暴击 §r]获得[§9 伤害倍率 §r]\n' },
        { text: '      • 消耗< 裁叶 >全部充能\n\n' },
    ]
});
help$1.set('starry_map:guide.star_sand', {
    root: ['领航种', '星砂_技能模组', '输出职业'],
    intel: [
        adrift_default_attack,
        { text: '< 暴击伤害 >:\n' },
        { text: '      • 当<§u 战术等级 §r>至少为 5 级时生效\n' },
        { text: '      • 替换< 普通攻击 >\n' },
        { text: '      • 基于 50%% [§9 基础暴伤 §r]获得[§9 攻击提升 §r]\n' },
        { text: '      • 攻击后清除< 妙算无遗 >效果\n' },
        { text: '      • 使[§9 基础伤害 §r]降低 50%% \n\n' },
        { text: '< 蓄力伤害 >:\n' },
        { text: '      • 当<§u 战术等级 §r>至少为 5 级时生效\n' },
        { text: '      • 替换< 普通攻击 >\n' },
        { text: '      • 使[§c 目标 §r]附着 4 秒<迟缓>\n' },
        { text: '      • < 妙算无遗 >获得 1点充能\n' },
        { text: '      • [§9 基础伤害 §r]降低 50%% \n\n' },
        { text: '< 妙算无遗 >:\n' },
        { text: '      • 至多叠加 5 层效果\n' },
        { text: '      • 每层转换为 200%% [§9 暴伤提升 §r]\n\n' },
    ]
});
help$1.set('starry_map:guide.moon_light', {
    root: ['领航种', '月华_技能模组', '输出职业'],
    intel: [
        adrift_default_attack,
        { text: '< 雾海巡游 >:\n' },
        { text: '      • 当<§u 战术等级 §r>至少为 5 级时生效\n' },
        { text: '      • 替换< 普通攻击 >\n' },
        { text: '      • 使得[§9 基础伤害 §r]降低 50%% \n' },
        { text: '      • 扣除自身 15%% [§a 当前血量 §r]\n' },
        { text: '      • 基于 200%% [§9 基础暴击 §r]获得[§9 攻击提升 §r]\n' },
        { text: '      • 对[§c 目标 §r]造成必定命中的单体<§d 元素洪流 §r>伤害\n\n' },
        { text: '< 追忆 >:\n' },
        { text: '      • 如果[§a 当前血量 §r]低于 10%% \n' },
        { text: '            基于 50%% [§9 基础爆伤 §r]获得[§9 攻击提升 §r]\n' },
        { text: '            回复 50点[§a 当前血量 §r]\n' },
        { text: '      • 基于 10%% 固定概率为[§u 同伴 §r]提供治疗\n' },
        { text: '            数值基于 50%% [§9 基础攻击 §r]结算\n' },
        { text: '            额外附加 16 秒<生命提升>\n\n' },
    ]
});
help$1.set('starry_map:guide.pearl', {
    root: ['领航种', '珍珠_技能模组', '生存职业'],
    intel: [
        adrift_default_attack,
        { text: '< 雾海巡游 >:\n' },
        { text: '      • 当<§u 战术等级 §r>至少为 5 级时生效\n' },
        { text: '      • 替换< 普通攻击 >\n' },
        { text: '      • 召唤<珍珠游鱼>进行单体攻击\n' },
        { text: '      • 该<召唤物>将继承自身全部属性\n\n' },
        { text: '< 水月 >:\n' },
        { text: '      • 召唤<珍珠水母>进行增益\n' },
        { text: '      • 该<召唤物>将继承自身全部属性\n' },
        { text: '      • 增益效果仅对[§u 同伴 §r]生效\n' },
        { text: '      • 每 30秒 仅可召唤一次\n' },
        { text: '      • 「生命恢复」\n' },
        { text: '            基于 50%% [§9 基础攻击 §r]结算治疗量\n' },
        { text: '      • 「生命提升」\n' },
        { text: '            给予 16秒 状态效果\n\n' },
    ]
});
help$1.set('starry_map:guide.crystal', {
    root: ['领航种', '琉璃_技能模组', '输出职业'],
    intel: [
        adrift_default_attack,
        { text: '< 雾海巡游 >:\n' },
        { text: '      • 当<§u 战术等级 §r>至少为 5 级时生效\n' },
        { text: '      • 替换< 普通攻击 >\n' },
        { text: '      • 暴击后, <碎星>获得 1 ~ 8 点充能\n' },
        { text: '      • 未暴击, <碎星>获得 1 点充能\n\n' },
        { text: '< 碎星 >:\n' },
        { text: '      • 当<碎星>充能至少为 8 时\n' },
        { text: '      • 替换< 雾海巡游 >进行攻击\n' },
        { text: '      • 使[§9 基础伤害 §r]转换为 50%% [§9 基础暴击 §r]结算\n' },
        { text: '      • 基于 10%% [§9 当前血量 §r]结算[§9 攻击段数 §r]\n' },
        { text: '      • 对最多 8 个敌人造成范围伤害\n\n' },
    ]
});
help$1.set('starry_map:guide.rambler', {
    root: ['领航种', '蔷薇_技能模组', '增伤职业'],
    intel: [
        adrift_default_attack,
        { text: '< 共律 >:\n' },
        { text: '      • 当<§u 战术等级 §r>至少为 5 级时生效\n' },
        { text: '      • 禁用< 普通攻击 >\n' },
        { text: '      • 为附近的[§u 同伴 §r]提供增益\n' },
        { text: '      • 扣除自身 50%% [§a 当前血量 §r]\n' },
        { text: '      • 基于自身 1.5%% [§9 基础暴伤 §r]\n' },
        { text: '            提高[§u 同伴 §r][§9 伤害倍率 §r]\n' },
        { text: '      • 基于自身[§9 基础攻击 §r]\n' },
        { text: '            提高[§u 同伴 §r][§9 伤害提升 §r]\n' },
        { text: '      • 以上效果最多可提供 750%% [§9 伤害倍率 §r]\n' }
    ]
});
help$1.set('starry_map:guide.hai_ling', {
    root: ['领航种', '海灵_技能模组', '生存职业'],
    intel: [
        adrift_default_attack,
        { text: '< 雾海巡游 >:\n' },
        { text: '      • 当<§u 战术等级 §r>至少为 5 级时生效\n' },
        { text: '      • 替换< 普通攻击 >\n' },
        { text: '      • 为[§c 目标 §r]附着 1 层<远海加护>印记\n' },
        { text: '      • 印记最多可叠加至 5 层\n\n' },
        { text: '< 加护 >:\n' },
        { text: '      • 为附近的[§u 同伴 §r]提供治疗效果\n' },
        { text: '      • 数值基于 50%% [§9 基础暴击 §r]结算\n' },
        { text: '      • 为附近的[§u 同伴 §r]提供<伤害吸收>\n' },
        { text: '      • 吸收等级基于<印记>层数结算\n\n' },
    ]
});
help$1.set('starry_map:guide.hai_na', {
    root: ['领航种', '海娜_技能模组', '输出职业'],
    intel: [
        adrift_default_attack,
        { text: '< 雾海巡游 >:\n' },
        { text: '      • 当<§u 战术等级 §r>至少为 5 级时生效\n' },
        { text: '      • 替换< 普通攻击 >\n' },
        { text: '      • 为[§c 目标 §r]附着 1 层<远海加护>印记\n' },
        { text: '      • 印记最多可叠加至 15 层\n\n' },
        { text: '< 加护 >:\n' },
        { text: '      • 基于<远海加护>的印记层数的前 9 层\n' },
        { text: '      • 每层增加 75%% [§9 暴伤提升 §r]\n' },
        { text: '      • 每层扣除 10%% [§9 当前血量 §r]\n' },
        { text: '      • 基于[§9 扣除血量 §r]获得[§9 攻击提升 §r]\n\n' }
    ]
});
help$1.set('starry_map:guide.nine_nine', {
    root: ['领航种', '九九_技能模组', '输出职业'],
    intel: [
        adrift_default_attack,
        { text: '< 雾海巡游 >:\n' },
        { text: '      • 当<§u 战术等级 §r>至少为 5 级时生效\n' },
        { text: '      • 替换< 普通攻击 >\n' },
        { text: '      • 发动攻击时, 随机改变自身[§u 元素类型 §r]\n' },
        { text: '      • 使得自身属性在[ 烛火 | 诸海 | 界木 ]之间轮换\n\n' },
        { text: '< 爆发攻击 >:\n' },
        { text: '      • 替换< 普通攻击 >\n' },
        { text: '      • 如果本次攻击暴击\n' },
        { text: '      • 将触发一次三炮齐射\n' },
    ]
});
help$1.set('starry_map:guide.snow_hidden', {
    root: ['领航种', '雪隐_技能模组', '生存职业'],
    intel: [
        adrift_default_attack,
        { text: '< 雾海巡游 >:\n' },
        { text: '      • 当<§u 战术等级 §r>至少为 5 级时生效\n' },
        { text: '      • 基于[§c 目标 §r][§9 当前血量 §r]低于[§9 基础暴伤 §r]的部分\n' },
        { text: '      • 转换为< 初雪 >的充能\n' },
        { text: '      • 通过此方法获得的< 初雪 >充能\n' },
        { text: '      • 最高不能大于 200%% [§9 基础暴伤 §r]\n\n' },
        { text: '< 初雪 >:\n' },
        { text: '      • 低于[§9 当前血量 §r]的部分转换为 生命提升 的时长\n' },
        { text: '      • 高于[§9 当前血量 §r]的部分转化 伤害吸收 时长\n' },
        { text: '      • 以上效果等级基于 50%% [§9 基础伤害 §r]结算\n\n' },
    ]
});
help$1.set('starry_map:guide.dullblue', {
    root: ['领航种', '幽蓝_技能模组', '增伤职业'],
    intel: [
        adrift_default_attack,
        { text: '< 雾海巡游 >:\n' },
        { text: '      • 当<§u 战术等级 §r>至少为 5 级时生效\n' },
        { text: '      • 替换< 普通攻击 >\n' },
        { text: '      • 使[§9 伤害倍率 §r] 降低50%% \n' },
        { text: '      • 造成范围内的[§c 目标 §r]造成击飞效果\n' },
        { text: '      • 并基于击飞的[§c 目标 §r]数量\n' },
        { text: '            赋予[§u 同伴 §r] 15%% [§9 暴击提升 §r]\n\n' }
    ]
});
help$1.set('starry_map:guide.windnews', {
    root: ['领航种', '风信_技能模组', '战斗职业'],
    intel: [
        { text: '< 基础属性 >:\n' },
        { text: '      • [§9 基础血量 §r]: 500\n' },
        { text: '      • [§9 基础攻击 §r]: 40\n' },
        { text: '      • [§9 基础暴击 §r]: 15%% \n' },
        { text: '      • [§9 基础暴伤 §r]: 500%% \n\n' },
        { text: '< 雾海巡游 >:\n' },
        { text: '      • 使得[§9 基础伤害 §r]降低 50%% \n' },
        { text: '      • 扣除自身 15%% [§a 当前血量 §r]\n' },
        { text: '      • 基于 200%% [§9 基础暴击 §r]获得[§9 攻击提升 §r]\n' },
        { text: '      • 对[§c 目标 §r]造成必定命中的单体<§d 元素洪流 §r>伤害\n\n' }
    ]
});
help$1.set('starry_map:amber_jasmine', {
    root: [],
    intel: [
        adrift_default_attack,
        { text: '\n『 茉莉 』\n' },
        { text: '< 基础属性 >:\n' },
        { text: '      • [§9 基础血量 §r]: 200\n' },
        { text: '      • [§9 基础攻击 §r]: 5\n' },
        { text: '      • [§9 元素类型 §r]: 界木\n' },
        { text: '< 普通攻击 >:\n' },
        { text: '      • 登场时, 陆续生成 3 枚< 三相之炎 >进行助战\n' },
        { text: '      • 如果< 三相之炎 >存在, 且自身遭受攻击时\n' },
        { text: '            赋予[§c 逐渊阵营 §r]恢复 50 点[§9 当前血量 §r]\n' },
        { text: '      • 本体与< 三相之炎 >均享有独立的攻击计数器, 拥有互不干扰的攻击节奏\n' },
        { text: '      • 由玩家发起的< 弹射物伤害 >将对< 三相之炎 >造成 100 倍暴击\n' },
        { text: '\n『 琥珀 』\n' },
        { text: '< 基础属性 >:\n' },
        { text: '      • [§9 基础血量 §r]: 200\n' },
        { text: '      • [§9 基础攻击 §r]: 5\n' },
        { text: '< 普通攻击 >:\n' },
        { text: '      • 使得[§9 基础伤害 §r]降低 50%% \n' },
        { text: '      • 扣除自身 15%% [§a 当前血量 §r]\n' },
        { text: '      • 基于 200%% [§9 基础暴击 §r]获得[§9 攻击提升 §r]\n' },
        { text: '      • 对[§c 目标 §r]造成必定命中的单体<§d 元素洪流 §r>伤害\n\n' }
    ]
});
help$1.set('starry_map:wild_bee.detection', {
    root: ['侦查者', '野蜂_技能模组', '机群', '暴击增益'],
    intel: [
        wasp_default_attack,
        { text: '< 普通攻击 >:\n' },
        { text: '      • 对[§c 目标 §r]造成< 烛火 >属性单体伤害\n\n' },
        { text: '< 集群锁定 >:\n' },
        { text: '  1. 发动攻击时\n' },
        { text: '      • 『野蜂机群』获得 10%% [§u 暴击提升 §r]\n\n' },
    ]
});
help$1.set('entity_machine:wasp_chaser', {
    root: ['歼灭者', '野蜂_技能模组', '机群', '炮击伤害'],
    intel: [
        wasp_default_attack,
        { text: '< 诸元装订 >:\n' },
        { text: '  1. 发动攻击时\n' },
        { text: '      • 【炮击诸元装订】充能 1点\n' },
        { text: '      • 该效果最多生效 15 次\n\n' },
        { text: '  2. 当【炮击诸元装订】至少为 5 时\n' },
        { text: '      • 减少 20%% [§u 当前血量 §r]\n' },
        { text: '      • 基于 300%% [§9 基础伤害 §r] 获得 [§9 伤害提升 §r]\n' },
        { text: '      • 【炮击诸元装订】转换为 攻击提升\n\n' },
    ]
});
help$1.set('starry_map:wild_bee.support', {
    root: ['维系者', '野蜂_技能模组', '机群', '生存职业'],
    intel: [
        wasp_default_attack,
        { text: '< 蜂群损管 >:\n' },
        { text: '  1. 禁用<普通攻击>\n' },
        { text: '  2. 持续性为『野蜂机群』提供增益\n' },
        { text: '      • 回复 5点[§u 当前血量 §r]\n' },
        { text: '      • 该效果每 2秒 仅可触发一次\n\n' },
        { text: '  3. 当自身损毁时\n' },
        { text: '      • 『野蜂机群』强制坠地 10s\n' },
        { text: '      • 该效果仅可触发一次\n\n' },
        { text: '  4. [§9 基础血量 §r]更改为 10\n\n' },
    ]
});
help$1.set('entity_machine:wasp_annihilator', {
    root: ['湮灭者', '野蜂_技能模组', '机群', '自爆伤害'],
    intel: [
        wasp_default_attack,
        { text: '< 璀璨荣光 >:\n' },
        { text: '  1. 禁用<普通攻击>\n\n' },
        { text: '  2. 当『野蜂机群』出现战损时\n' },
        { text: '      • 移动至「击杀者」位置\n' },
        { text: '      • 启动自爆, 造成< 烛火 >范围伤害\n' },
        { text: '      • 伤害基于 500%% [§u 当前血量 §r]进行结算\n\n' },
    ]
});
help$1.set('starry_map:wild_bee.emperor', {
    root: [],
    intel: [
        wasp_default_attack,
        { text: ' • 基本信息\n' },
        { text: '   1. 名称: 野蜂 - 君临者\n' },
        { text: '   2. 称号: 机械诸蜂的先锋将军\n\n' },
        { text: ' • 基础属性\n' },
        { text: '   1. [§9 基础血量 §r]: 1000\n' },
        { text: '   2. [§9 暴击提升 §r]: 50%%\n' },
        { text: '   3. [§9 暴伤提升 §r]: 150%%\n' },
        { text: '   4. 【加工进度】: 充能 3 点\n\n' },
        { text: ' • 技能概览\n' },
        { text: '   1. 加工进度触发:\n' },
        { text: '      当【加工进度】至少为 15 时,\n' },
        { text: '      如果遭到攻击,\n' },
        { text: '      生产任意『野蜂机群』,\n' },
        { text: '      【加工进度】扣除 5 点\n' },
        { text: '   2. 血量变化触发:\n' },
        { text: '      当[§u 当前血量 §r]变动时,\n' },
        { text: '      首次低于 75%% 时, 【加工进度】充能 15 点\n' },
        { text: '      首次低于 50%% 时, 【加工进度】充能 15 点\n' },
        { text: '      首次低于 25%% 时, 【加工进度】充能 15 点\n' }
    ]
});
help$1.set('starry_map:wild_bee.guide', {
    root: [],
    intel: [
        wasp_default_attack,
        { text: ' • 基本信息\n' },
        { text: '   1. 名称: 野蜂 - 领航者\n' },
        { text: '   2. 称号: 机械诸蜂的先锋道标\n\n' },
        { text: ' • 基础属性\n' },
        { text: '   1. [§9 基础血量 §r]: 100\n' },
        { text: '   2. [§9 暴击提升 §r]: 10%%\n' },
        { text: '   3. [§9 基础移速 §r]: 0\n\n' },
        { text: ' • 技能概览\n' },
        { text: '   1. < 诸蜂道标 >:\n' },
        { text: '      登场后 5 秒进入「道标」状态\n' },
        { text: '      处于该状态下将至多召唤:\n' },
        { text: '      - 单体 boss: 野蜂-君临者 x1\n' },
        { text: '      - 野蜂-侦查者 x6\n' },
        { text: '      - 野蜂-维系者 x3\n' },
        { text: '      - 蝰蛇-维系者 x3\n' },
        { text: '   2. < 道标湮灭 >:\n' },
        { text: '      30 秒后解除「道标」状态\n' },
        { text: '      如果附近存在[§c 目标 §r],\n' },
        { text: '      - 触发「自爆」造成范围 16 的< 烛火 >伤害\n' },
        { text: '      - 基于[§9 当前血量 §r]获得[§9 攻击提升 §r]\n' },
        { text: '      - 『伏渊阵营』免疫该效果\n\n' }
    ]
});
help$1.set('starry_map:dragon.tyrannosaurus_rex', {
    root: [],
    intel: [
        { text: ' • 基本信息\n' },
        { text: '   1. 名称: 古龙 - 君临者\n' },
        { text: '   2. 称号: 清扫威胁的古龙之王\n\n' },
        { text: ' • 基础属性\n' },
        { text: '   1. [§9 基础血量 §r]: 3500\n' },
        { text: '   2. [§9 近战伤害 §r]: 32\n' },
        { text: '   3. [§9 元素伤害 §r]: 5\n' },
        { text: '   4. [§9 元素暴击 §r]: 40%%\n' },
        { text: '   5. [§9 元素暴伤 §r]: 480%%\n\n' },
        { text: ' • 技能概览\n' },
        { text: '   1. < 威胁清扫 >:\n' },
        { text: '      当神恩领航者登场且未签订契约时,\n' },
        { text: '      如果领航者意外死亡, 古龙将登场清理危险\n\n' },
        { text: '   2. < 嗜血撕咬 >:\n' },
        { text: '      古龙发动近战攻击后,\n' },
        { text: '      有一定概率恢复 128 点生命值\n\n' },
        { text: '   3. < 战场清扫 >:\n' },
        { text: '      该效果每 10 秒仅可触发一次\n' },
        { text: '      当古龙遭受攻击时触发,\n' },
        { text: '      锁定周围至多 8 个目标,\n' },
        { text: '      发射至多 8 发随机元素的炮击\n' },
        { text: '      每发炮击将在命中时\n' },
        { text: '      对至多 8 个目标造成元素伤害\n' },
        { text: '      触发该效果时,\n' },
        { text: '      如果距离登场地点有一定的距离,\n' },
        { text: '      将携带至多 8 个目标回到登场位置\n\n' },
        { text: '   4. < 龙行大地 >:\n' },
        { text: '      君临者在移动时将造成强烈的震动,\n' },
        { text: '      使周围的玩家处于迟缓和缓降状态\n\n' },
        { text: '   5. < 损伤管制 >:\n' },
        { text: '      君临者初始状态下持有 99.99%% 伤害减免\n' },
        { text: '      当处于白天时,\n' },
        { text: '      弹射物抗性更改为 -150%%\n' },
        { text: '      爆炸物抗性更改为 -150%%\n' },
        { text: '      当处于黑夜时,\n' },
        { text: '      弹射物抗性更改为 -300%%\n' },
        { text: '      爆炸物抗性更改为 -300%%\n\n' },
        { text: ' • 战斗提示\n' },
        { text: '   1. 注意君临者的技能触发条件, 合理规避风险\n' },
        { text: '   2. 利用环境和时间优势, 调整战斗策略以取得胜利\n' }
    ],
});
help$1.set('starry_map:abyss_whale.emperor', {
    root: [],
    intel: [
        { text: ' • 头衔称号\n' },
        { text: '   1. 名称: 渊鲸 - 君临者\n' },
        { text: '   2. 称号: 清扫海渊的古鲸之王\n\n' },
        { text: ' • 基础属性\n' },
        { text: '   1. [§9 基础血量 §r]: §2 1000000 §r\n' },
        { text: '   2. [§9 基础攻击 §r]: §2 35 §r\n' },
        { text: '   3. [§9 基础暴击 §r]: §2 40%% §r\n' },
        { text: '   4. [§9 基础暴伤 §r]: §2 500%% §r\n' },
        { text: '   5. [§u 伤害抗性 §r]: §2 99.9%% §r\n\n' },
        { text: ' • 技能概览\n' },
        { text: '   1. < 君王震怒 >:\n' },
        { text: '      当玩家击杀 §2 20 §r 艘 [§u 渊鲸-侦查者 §r] 时触发\n' },
        { text: '      触发时, 实体 [§u 渊鲸-君临者 §r] 将强制入场\n\n' },
        { text: '   2. < 损伤定义 >:\n' },
        { text: '      当遭受攻击时触发该效果\n' },
        { text: '      且每秒只能触发一次\n' },
        { text: '      - 若处于 [§c 隐身状态 §r]\n' },
        { text: '      - 扣除自身 §2 20000 §r 生命值\n' },
        { text: '      - 否则扣除自身 §2 2000 §r 生命值\n' },
        { text: '      - 触发时有概率解除隐身状态\n\n' },
        { text: '   3. < 渊海君主 >:\n' },
        { text: '      当 君临者 发动近战攻击后\n' },
        { text: '      有一定概率赋予目标负面状态\n' },
        { text: '      若目标处于特定条件, 将额外触发高额伤害\n\n' },
        { text: '   4. < 君王号令 >:\n' },
        { text: '      当遭受玩家攻击时有15%的概率触发\n' },
        { text: '      - 君临者获得15秒隐身效果\n' },
        { text: '      - 并与玩家快速交换位置\n' },
        { text: '      - 召唤2艘[渊鲸-侦查者]协助作战\n' },
        { text: '      - 在遭到攻击时\n\n' },
        { text: '      - 有15%的概率为玩家附加负面效果\n\n' },
        { text: '   5. < 鲸王重创 >:\n' },
        { text: '      当 [§u 渊鲸-侦查者 §r] 被摧毁时\n' },
        { text: '      [§u 渊鲸-君临者 §r] 将承受 §2 40000 §r 伤害\n\n' }
    ]
});
help$1.set('starry_map:abyss_whale.detection', {
    root: ['侦查者', '渊鲸_技能模组', '潜艇', '炮击伤害'],
    intel: [
        { text: '< 基础属性 >:\n' },
        { text: '  • [§9 基础血量 §r]:§2 1000§r\n' },
        { text: '  • [§9 基础攻击 §r]:§2 5§r\n' },
        { text: '  • [§9 基础暴击 §r]:§2 30%%§r\n' },
        { text: '  • [§9 基础暴伤 §r]:§2 150%%§r\n' },
        { text: '  • [§u 伤害抗性 §r]:§2 -333%%§r\n' },
        { text: '\n< 鲸怒传递 >:\n' },
        { text: '  1. 该单位将在遭到攻击时\n' },
        { text: '  2. 有§2 15%% §r的概率为玩家附加[§c 君王圣裁 §r]效果\n' },
        { text: '\n< 鲸王重创 >:\n' },
        { text: '  1. 如果[§u 渊鲸-侦查者 §r]被摧毁\n' },
        { text: '  2. 那么[§u 渊鲸-君临者 §r]将承受§2 200000 §r伤害\n' },
    ]
});
help$1.set('starry_map:abyss_whale.execute', {
    root: ['执行者', '渊鲸_技能模组', '潜艇', '炮击伤害'],
    intel: [
        { text: '< 基础属性 >:\n' },
        { text: '  • [§9 基础血量 §r]:§2 100§r\n' },
        { text: '  • [§9 基础攻击 §r]:§2 5§r\n' },
        { text: '  • [§9 基础暴击 §r]:§2 30%%§r\n' },
        { text: '  • [§9 基础暴伤 §r]:§2 150%%§r\n' },
        { text: '< 普通攻击 >:\n' },
        { text: '      • 对[§c 目标 §r]造成< 诸海 >属性范围伤害\n\n' },
    ]
});
help$1.set('starry_map:magic_crystal_pickaxe', {
    root: ['魔晶工具', '魔晶镐子', '快速挖掘'],
    intel: [
        { text: '<§l§u 魔晶镐子 §r>可用于挖掘矿物和机械方块, 提升速度\n\n' },
        { text: '可用于加速挖掘< 模组方块 >与< 部分原版方块 >\n\n' }
    ]
});
help$1.set('starry_map:magic_crystal_wrench', {
    root: ['魔晶工具', '魔晶扳手', '近战附魔'],
    intel: [
        { text: '使用<§l§u 魔晶扳手 §r>攻击时, 可对目标造成范围<§l§5 追击伤害 §r>\n\n' },
        { text: '这种攻击能同时影响最多§2 5 §r个目标\n\n' },
        { text: '--------------------------------\n\n' },
        { text: '长按<§l§u 魔晶扳手 §r>可以为玩家施加<§l§5 元素附魔 §r>\n\n' },
        { text: '选择适合的附魔以适应不同的战斗场景, 提升战斗效率\n\n' },
    ]
});
const sword = [
    { text: '在近战攻击时, 可对目标造成范围<§l§5 追击伤害 §r>\n\n' },
    { text: '这种攻击能同时影响最多§2 5 §r个目标\n\n' },
    { text: '--------------------------------\n\n' },
    { text: '长按道具可以为玩家施加<§l§5 元素附魔 §r>\n\n' },
    { text: '选择适合的附魔以适应不同的战斗场景, 提升战斗效率\n\n' },
];
[
    "starry_map:wood_sword",
    "starry_map:stone_sword",
    "starry_map:iron_sword",
    "starry_map:diamond_sword",
    "starry_map:netherite_sword",
    "starry_map:gold_sword"
].forEach(item => help$1.set(item, { root: ['魔晶工具', '魔晶剑', '近战武器'], intel: [...sword], only: true }));
help$1.set('starry_map:magic_crystal_claw', {
    root: ['魔晶工具', '魔晶钩爪', '快速位移'],
    intel: [
        { text: '当对着一定距离内的方块使用<§l§u 魔晶钩爪 §r>时\n' },
        { text: '玩家将获得<§l§b 漂浮 §r>效果, 并移动到目标位置附近\n\n' }
    ]
});
help$1.set('starry_map:magic_crystal_hammer', {
    root: ['魔晶工具', '魔晶锤子', '金属锻造'],
    intel: [
        { text: '首先, 将若干<§l§u 金属材料 §r>投掷于地面上\n\n' },
        { text: '然后, 对准材料进行攻击, 触发锻打过程\n\n' },
        { text: '锻打过程将<§l§u 金属材料 §r>转化为高级材料\n\n' },
        { text: '高级<§l§u 金属材料 §r>适用于复杂需求和工艺\n\n' },
        { text: '--------------------------------\n\n' },
        { text: '至少需要§2 2 §r个相同的<§l§u 金属材料 §r>才能开始锻打\n\n' },
        { text: '锻打时请确保材料充足, 避免锻打失败\n\n' },
        { text: '选择§2 2 §r格深凹坑进行锻打, 可以显著提高成功率\n\n' },
        { text: '--------------------------------\n\n' },
        { text: '<§l§u 魔晶锤子 §r>也适用于挖掘矿物和机械方块, 提升速度\n\n' }
    ]
});
help$1.set('starry_map:magic_crystal_bow', {
    root: ['魔晶工具', '魔晶弹弓', '远程照明'],
    intel: [
        { text: '使用<§l§u 魔晶弹弓 §r>可以进行远程攻击\n\n' },
        { text: '命中目标时, 额外造成<§l§5 追击伤害 §r>\n\n' },
        { text: '--------------------------------\n\n' },
        { text: '当背包中携带<§l§5 魔晶石 §r>时, 将会会消耗§2 1 §r枚<§l§5 魔晶石 §r>\n\n' },
        { text: '基于§2 2 §r倍<§l§5 基础伤害 §r>获得<§l§5 攻击提升 §r>\n\n' },
        { text: '--------------------------------\n\n' },
        { text: '当玩家潜行状态下, 将发射<§l§e 照明射线 §r>\n\n' },
        { text: '<§l§e 照明射线 §r>将点亮周围环境, 提供视野\n\n' },
        { text: '此功能在黑暗区域探索时极为有用\n\n' }
    ]
});
help$1.set('starry_map:magic_crystal_marbles', {
    root: ['魔晶工具', '魔晶弹珠', '氪金一击'],
    intel: [
        { text: '使用<§l§u 魔晶弹珠 §r>进行远程攻击\n\n' },
        { text: '若背包携带<§l§5 魔晶石 §r>, 可在攻击时消耗最多§2 64 §r枚\n\n' },
        { text: '每消耗§2 1 §r枚<§l§5 魔晶石 §r>\n\n' },
        { text: '都将基于§2 2 §r倍<§l§5 基础伤害 §r>获得<§l§5 攻击提升 §r>\n\n' },
        { text: '使<§l§u 魔晶弹珠 §r>成为提升远程伤害的利器\n\n' },
        { text: '战斗中合理使用, 可显著提升战斗效率\n\n' }
    ]
});
help$1.set('starry_map:magic_crystal_screwdriver', {
    root: ['魔晶工具', '魔晶起子', '区块连锁'],
    intel: [
        { text: '使用<§l§u 魔晶起子 §r>后, 将出现<§l§s 设置界面 §r>\n\n' },
        { text: '在此界面, 您可以根据需求调整参数\n\n' },
        { text: '设定完成后, 使用斧子, 镐子或<§l§u 魔晶起子 §r>挖掘\n\n' },
        { text: '启动连锁挖掘功能, 提升挖掘效率\n\n' },
        { text: '--------------------------------\n\n' },
        { text: '在挖掘黑曜石时, <§l§u 魔晶起子 §r>将显著加速\n\n' },
        { text: '这使挖掘黑曜石变得轻松快捷\n\n' },
        { text: '--------------------------------\n\n' },
        { text: '<§l§u 魔晶起子 §r>也适用于挖掘矿物和机械方块, 提升速度\n\n' }
    ]
});
help$1.set('starry_map:magic_crystal_key', {
    root: ['魔晶工具', '魔晶钥匙', '容器搬运'],
    intel: [
        { text: '使用<§l§u 魔晶钥匙 §r>攻击<§l§s 方块容器 §r>, 将自动封存其内容\n\n' },
        { text: '效果等同于将容器转化为潜影盒, 便于存储\n\n' },
        { text: '特别提示: 原版游戏中的<§l§1 刷怪笼 §r>等方块也可用此法\n\n' },
        { text: '这为搬运和存储方块提供了极大便利\n\n' },
        { text: '--------------------------------\n\n' },
        { text: '<§l§u 魔晶钥匙 §r>也适用于挖掘矿物和机械方块, 提升挖掘速度\n\n' }
    ]
});
help$1.set('starry_map:magic_crystal_shield', {
    root: ['魔晶工具', '魔晶盾牌', '伤害弹反'],
    intel: [
        { text: '当玩家装备<§l§u 魔晶盾牌 §r>时\n\n' },
        { text: '每隔§2 5 §r秒将获得§2 15 §r秒增益效果\n\n' },
        { text: '该道具的增益效果为<§l§b 伤害吸收 §r>与<§l§b 抗性提升 §r>\n\n' },
        { text: '--------------------------------\n\n' },
        { text: '当遭到攻击时, 玩家处于潜行状态\n\n' },
        { text: '将造成§2 1 §r次范围<§l§5 追击伤害 §r>, 该效果每§2 2 §r秒仅可触发一次\n\n' },
    ]
});
const item_mineral = [
    { text: '--------------------------------\n\n' },
    { text: '挖掘 [§9 金属原矿 §r] 后, 可用熔炉, 高炉或 [§9 闪长岩桌 §r] 进行加工\n\n' },
    { text: '将加工后的 [§9 金属材料 §r] 投掷于地面\n\n' },
    { text: '使用 [§5 魔晶锤子 §r] 敲击材料所在方块\n\n' },
    { text: '此法可将 [§9 金属材料 §r] 锻造成更高级的形态\n\n' },
    { text: '每次锻造至少需 2 个相同的 [§9 金属材料 §r]\n\n' },
    { text: '自动化锻造可利用 [§9 金属锻压设备 §r]\n\n' },
    { text: '这些设备加工 [§9 金属材料 §r] 高效且便捷\n\n' },
    { text: '--------------------------------\n\n' },
];
const ore_generate = { text: '该材料会在[ 主世界 ]以[ 矿物团簇 ]的形式生成\n\n' };
const ore_make = { text: '该材料需要在< 闪长岩桌 >中合成获得\n\n' };
[
    "starry_map:mine.oxygen_enriched_gold",
    "starry_map:oxygen_enriched_gold",
    "starry_map:plate.oxygen_enriched_gold",
    "starry_map:hinge.oxygen_enriched_gold",
].forEach(item => help$1.set(item, { root: ['富氧金', '合页', '板材'], intel: [ore_generate, ore_make, ...item_mineral], only: true }));
[
    "starry_map:mine.ferric_phosphate",
    "starry_map:ferric_phosphate",
    "starry_map:gear.ferric_phosphate",
    "starry_map:hinge.ferric_phosphate",
].forEach(item => help$1.set(item, { root: ['磷酸铁', '合页', '齿轮'], intel: [ore_generate, ore_make, ...item_mineral], only: true }));
[
    "starry_map:mine.aluminum_magnesium",
    "starry_map:aluminum_magnesium",
    "starry_map:plate.aluminum_magnesium",
    "starry_map:hinge.aluminum_magnesium",
].forEach(item => help$1.set(item, { root: ['铝镁金', '合页', '板材'], intel: [ore_generate, ore_make, ...item_mineral], only: true }));
[
    "starry_map:mine.ferric_chloride",
    "starry_map:ferric_chloride",
    "starry_map:plate.ferric_chloride",
    "starry_map:hinge.ferric_chloride",
].forEach(item => help$1.set(item, { root: ['氯化铁', '合页', '板材'], intel: [ore_generate, ore_make, ...item_mineral], only: true }));
[
    "starry_map:mine.zirconium_carbide",
    "starry_map:zirconium_carbide",
    "starry_map:gear.zirconium_carbide",
    "starry_map:hinge.zirconium_carbide",
].forEach(item => help$1.set(item, { root: ['碳化锆', '合页', '齿轮'], intel: [ore_generate, ore_make, ...item_mineral], only: true }));
[
    "starry_map:mine.gold_carbonate",
    "starry_map:gold_carbonate",
    "starry_map:gear.gold_carbonate",
    "starry_map:hinge.gold_carbonate",
].forEach(item => help$1.set(item, { root: ['碳酸金', '合页', '齿轮'], intel: [ore_generate, ore_make, ...item_mineral], only: true }));
[
    "starry_map:mine.lithium_carbonate",
    "starry_map:lithium_carbonate",
    "starry_map:gear.lithium_carbonate",
    "starry_map:hinge.lithium_carbonate",
].forEach(item => help$1.set(item, { root: ['碳酸锂', '合页', '齿轮'], intel: [ore_generate, ore_make, ...item_mineral], only: true }));
[
    "starry_map:mine.tungsten_nickel_titanium",
    "starry_map:tungsten_nickel_titanium",
    "starry_map:plate.tungsten_nickel_titanium",
    "starry_map:hinge.tungsten_nickel_titanium",
].forEach(item => help$1.set(item, { root: ['钨镍钛', '合页', '板材'], intel: [ore_generate, ore_make, ...item_mineral], only: true }));
[
    "starry_map:mine.copper_tin_brazing",
    "starry_map:copper_tin_brazing",
    "starry_map:plate.copper_tin_brazing",
    "starry_map:hinge.copper_tin_brazing",
].forEach(item => help$1.set(item, { root: ['锡钎铜', '合页', '板材'], intel: [ore_generate, ore_make, ...item_mineral], only: true }));
[
    "starry_map:steel_rock_eutectic",
    "starry_map:coil.steel_rock_eutectic",
    "starry_map:wafer.steel_rock_eutectic",
].forEach(item => help$1.set(item, { root: ['钢岩合金', '晶圆', '线圈'], intel: [ore_make, ...item_mineral], only: true }));
[
    "starry_map:tungsten_copper_alloy",
    "starry_map:plate.tungsten_copper_alloy",
    "starry_map:hinge.tungsten_copper_alloy",
].forEach(item => help$1.set(item, { root: ['钨铜合金', '合页', '板材'], intel: [ore_make, ...item_mineral], only: true }));
help$1.set('starry_map:call_python_sentinel', {
    root: ['武装召集', '森蚺哨兵', '火炮放置'],
    intel: [
        { text: '使用<§l§u 哨兵模块 §r>道具后, 将生成一座名为<§l§9 森蚺哨兵炮 §r>的防御设施\n\n' },
        { text: '玩家将默认与这座<§l§9 森蚺哨兵炮 §r>缔结契约, 获得控制权\n\n' },
        { text: '--------------------------------\n\n' },
        { text: '<§l§9 森蚺哨兵炮 §r>能发动§2 64 §r次攻击, 炮击将造成< 归忆 >范围伤害\n\n' },
        { text: '炮击还附带击退效果, 有效驱散接近的敌人\n\n' },
        { text: '当炮击次数耗尽时, <§l§u 森蚺哨兵炮 §r>将自动变为可拾取的掉落物\n\n' },
        { text: '--------------------------------\n\n' },
        { text: '您可以使用<§l§u 参悟之石 §r>进行属性升级, 提升其战斗效能\n\n' },
        { text: '升级后的火炮将拥有更强的攻击力\n\n' },
        { text: '--------------------------------\n\n' },
        { text: '在战略要地放置<§l§9 森蚺哨兵炮 §r>, 为您的防御体系提供有力支持\n\n' },
        { text: '合理规划火炮的使用和升级, 将极大增强您的防御策略\n\n' }
    ]
});
help$1.set('starry_map:call_whale_support', {
    root: ['武装召集', '渊鲸深潜', '潜艇部署'],
    intel: [
        { text: '使用<§l§u 深潜模块 §r>道具后, 将生成一艘<§l§9 渊鲸-维系级-深潜船 §r>\n\n' },
        { text: '玩家将默认与这艘潜艇缔结契约, 并获得控制权\n\n' },
        { text: '--------------------------------\n\n' },
        { text: '您可以通过<§l§u 神机操持 §r>控制潜艇的上浮和下潜\n\n' },
        { text: '利用方向键, 您可以灵活控制潜艇的移动方向\n\n' },
        { text: '--------------------------------\n\n' },
        { text: '潜艇具备自动锁定敌对生物的能力, 提高战斗效率\n\n' },
        { text: '它还能协同发动攻击, 提供对岸火力支援\n\n' },
        { text: '为了提升潜艇的战斗效能, 您可以使用<§l§u 参悟之石 §r>进行属性升级\n\n' },
        { text: '升级后的潜艇将拥有更强的攻击力和更灵活的机动性\n\n' },
        { text: '--------------------------------\n\n' },
        { text: '在战略部署时, 潜艇可以成为您的重要支援力量\n\n' },
        { text: '合理利用潜艇的控制和升级, 将极大增强您的战术灵活性\n\n' }
    ]
});
help$1.set('starry_map:call_tunnel_dragon_guide', {
    root: ['武装召集', '隧道掘进', '隧龙领航', '矿车部署'],
    intel: [
        { text: '使用<§l§u 隧道掘进 §r>道具后, 将生成一辆<§l§9 隧龙-领航级-掘进车 §r>\n\n' },
        { text: '玩家将默认与这艘潜艇缔结契约, 并获得控制权\n\n' },
        { text: '--------------------------------\n\n' },
        { text: '您可以通过<§l§u 神机操持 §r>控制列车的运行和转向\n\n' },
        { text: '但<§l§u 隧道掘进 §r>在运行时, 需要消耗自身能源储备\n\n' },
        { text: '在<§l§u 隧道掘进 §r>生成时, 将默认自带一定的充能\n\n' },
        { text: '当能量耗尽后, 请使用[§5 魔晶充能 §r]进行补充\n\n' },
        { text: '--------------------------------\n\n' },
        { text: '当玩家命中列车时, 将会展开控制界面\n\n' },
        { text: '玩家可以在其中选择自己喜欢的列车插件\n\n' },
        { text: '列车插件可以自由选配, 但最多仅可存在 4 个\n\n' }
    ]
});
help$1.set('starry_map:world_of_box', {
    root: ['特殊道具', '匣里乾坤', '生物收容'],
    intel: [
        { text: '当您使用<§l§u 匣里乾坤 §r>道具时\n\n' },
        { text: '它能够收容一定范围内的所有实体\n\n' },
        { text: '这个功能对于管理生物或物品非常有用\n\n' },
        { text: '--------------------------------\n\n' },
        { text: '再次使用该道具\n\n' },
        { text: '您将释放之前保存的所有实体\n\n' },
        { text: '这使得您可以轻松控制特定区域的生物\n\n' },
        { text: '--------------------------------\n\n' },
        { text: '使用时, 请确保您了解收容和释放的机制\n\n' },
        { text: '这将帮助您更有效地利用这个道具\n\n' },
        { text: '--------------------------------\n\n' },
        { text: '例如, 在需要暂时移除某个区域的生物时\n\n' },
        { text: '或者在需要将特定生物移动到另一个地方时\n\n' },
        { text: '--------------------------------\n\n' },
        { text: '请在安全和控制的环境中使用此道具\n\n' },
        { text: '以避免意外释放可能造成混乱的生物\n\n' }
    ]
});
help$1.set('starry_map:nihility_space_block', {
    root: ['特殊道具', '虚空方块', '垫脚方块'],
    intel: [
        { text: '当您使用<§l§u 虚空方块 §r>道具时\n\n' },
        { text: '如果玩家脚下是空气\n\n' },
        { text: '将自动创建一个<§l§u 虚空方块 §r>用于垫脚\n\n' },
        { text: '这个方块可以在空中为您提供支撑\n\n' },
        { text: '--------------------------------\n\n' },
        { text: '<§l§9 虚空方块 §r>可以存在§2 10 §r秒\n\n' },
        { text: '之后它将自动消失\n\n' },
        { text: '这为您提供了短暂的空中立足点\n\n' },
        { text: '--------------------------------\n\n' },
        { text: '该道具非常适合在探险时使用\n\n' },
        { text: '或者在建造复杂结构时作为临时支撑\n\n' },
        { text: '请合理规划使用时机\n\n' },
        { text: '以确保在<§l§u 虚空方块 §r>消失前完成您的动作\n\n' }
    ]
});
help$1.set('starry_map:inhibit_water', {
    root: ['特殊道具', '抑水之环', '快速排水'],
    intel: [
        { text: '使用<§l§u 抑水之环 §r>道具时\n\n' },
        { text: '您可以清空选定区域内的水源\n\n' },
        { text: '这个效果会影响一定范围, 并持续一段时间\n\n' },
        { text: '效果结束后, 水源将自然恢复\n\n' },
        { text: '--------------------------------\n\n' },
        { text: '如果您在使用道具时处于潜行状态\n\n' },
        { text: '效果将在生效后立即消失\n\n' },
        { text: '这为需要快速排水的场合提供了便利\n\n' },
        { text: '--------------------------------\n\n' },
        { text: '例如, 在建筑施工或农田管理中\n\n' },
        { text: '请根据您的需求, 合理选择使用时机\n\n' },
        { text: '以确保抑水效果符合您的预期\n\n' }
    ]
});
help$1.set('starry_map:stateful_inspection', {
    root: ['特殊道具', '状态侦测', '信息显示'],
    intel: [
        { text: '使用<§l§u 状态侦测器 §r>道具时\n\n' },
        { text: '可以显示被选中目标的详细信息\n\n' },
        { text: '该道具适用于查看实体, 方块, 物品的状态\n\n' },
        { text: '详细信息包括位置, 血量, 属性等\n\n' },
        { text: '还包括标签, 容器内容和红石能量状态\n\n' },
        { text: '--------------------------------\n\n' },
        { text: '使用时, 如果玩家处于潜行状态\n\n' },
        { text: '详细信息将直接显示在聊天栏中\n\n' },
        { text: '这为快速获取目标状态提供了便利\n\n' },
        { text: '适用于探险, 建筑或调试等多种场景\n\n' },
        { text: '--------------------------------\n\n' },
        { text: '请根据您的需求, 合理使用<§l§u 状态侦测 §r>n\n' },
        { text: '以获取最准确和有用的信息\n\n' }
    ]
});
help$1.set('starry_map:purple_gold_gourd', {
    root: ['特殊道具', '紫金葫芦', '实体炼化'],
    intel: [
        { text: '使用<§l§u 紫金葫芦 §r>道具时\n\n' },
        { text: '会播放特定的语音提示\n\n' },
        { text: '--------------------------------\n\n' },
        { text: '第§2 2 §r次使用该道具时\n\n' },
        { text: '将封印您选中的生物\n\n' },
        { text: '经过一段时间的等待\n\n' },
        { text: '--------------------------------\n\n' },
        { text: '再次使用<§l§u 紫金葫芦 §r>\n\n' },
        { text: '您将获得该实体阵亡的掉落物\n\n' },
        { text: '此时, 道具也会恢复到初始状态\n\n' },
        { text: '--------------------------------\n\n' },
        { text: '但请注意\n\n' },
        { text: '这个过程可能会清除生物的部分天赋和属性\n\n' },
        { text: '因此, 使用前请仔细考虑\n\n' },
        { text: '该道具的配方为隐藏配方, 仅在合成台刷新时有§2 15% §r的概率出现\n\n' }
    ]
});
help$1.set('starry_map:material_sorting', {
    root: ['特殊道具', '物资整理', '垃圾清除'],
    intel: [
        { text: '使用<§l§u 物资整理 §r>道具时\n\n' },
        { text: '您可以远程将背包中的物品投送至目标容器或背包\n\n' },
        { text: '此功能允许您在一定距离外运送物品, 方便快捷\n\n' },
        { text: '--------------------------------\n\n' },
        { text: '若玩家处于潜行状态, 效果将反转, 物品将从容器投送回玩家背包\n\n' },
        { text: '这为临时存储或回收物品提供了便利\n\n' },
        { text: '--------------------------------\n\n' },
        { text: '此外, 如果使用该道具拍打目标方块容器\n\n' },
        { text: '容器内的物品将被自动排序和整理\n\n' },
        { text: '这有助于保持容器内物品的有序, 便于查找和管理\n\n' },
        { text: '--------------------------------\n\n' },
        { text: '当玩家潜行且未瞄准任何目标容器或背包时, 将打开控制界面\n\n' },
        { text: '通过控制界面, 您可以删除附近的掉落物, 清理周围环境\n\n' },
        { text: '此功能特别适用于快速清理战斗后的战场或整理杂乱的掉落物\n\n' },
        { text: '请根据实际需要, 合理使用<§l§u 物资整理 §r>道具, 以提高物资管理的效率\n\n' }
    ]
});
const magic_crystal_armor = [
    { text: '当玩家穿着该装备时, 如果遭受攻击或损伤\n\n' },
    { text: '将消耗<§l§s 物品耐久 §r>抵抗收到的伤害\n\n' },
    { text: '直至<§l§s 物品耐久 §r>被清空\n\n' },
    { text: '该机制无法抵抗<§l§6 法则伤害 §r>\n\n' },
    { text: '可使用<§l§u 魔晶充能 §r>消耗<§l§5 星尘力 §r>来恢复耐久\n\n' },
];
const magic_orbs = [
    { text: '当玩家装备该物品时\n\n' },
    { text: '每隔§2 5 §r秒将获得§2 15 §r秒增益效果\n\n' },
    { text: '并扣除§2 1 §r点<§u 耐久值 §r>\n\n' },
    { text: '该装备初始<§u 耐久值 §r>为:§2 1000 §r\n\n' },
    { text: '可使用<§l§u 魔晶充能 §r>消耗一定的<§l§5 星尘力 §r>来恢复耐久\n\n' },
];
help$1.set('starry_map:ocean_blessed_scarf', {
    root: ['魔晶铠甲', '伤害吸收', '诸海之环', '海之眷顾'],
    intel: [
        ...magic_crystal_armor,
        { text: '在< 锻造台 >中使用< 下界合金锭 >< 装备升级 >< 至纯魔晶铠甲 >进行合成\n\n' },
        { text: '该装备<§u 耐久值 §r>:§2 3500 §r\n\n' },
        { text: '该装备<§u 盔甲值 §r>:§2 30 §r\n\n' },
        { text: '--------------------------------\n\n' },
        { text: '当玩家装备该物品时\n\n' },
        { text: '每隔§2 5 §r秒, 将释放范围性的<§l§d 瞬间治疗 §r>效果\n\n' },
        { text: '--------------------------------\n\n' },
        { text: '如果触发被动效果时身处水中\n\n' },
        { text: '将额外获得<§l§s 潮涌能量 §r>\n\n' },
        { text: '并创建继承玩家的面板数值的<§l§9 珍珠游鱼 §r>\n\n' }
    ]
});
help$1.set('starry_map:exhausted_armor', {
    root: ['魔晶铠甲', '伤害吸收', '枯竭'],
    intel: [
        ...magic_crystal_armor,
        { text: '该装备<§u 耐久值 §r>:§2 500 §r\n\n' },
        { text: '该装备<§u 盔甲值 §r>:§2 5 §r\n\n' },
    ]
});
help$1.set('starry_map:complete_armor', {
    root: ['魔晶铠甲', '伤害吸收', '至纯'],
    intel: [
        ...magic_crystal_armor,
        { text: '该装备<§u 耐久值 §r>:§2 2500 §r\n\n' },
        { text: '该装备<§u 盔甲值 §r>:§2 25 §r\n\n' },
    ]
});
const shelter = [
    { text: '该装备<§u 耐久值 §r>:§2 1000 §r\n\n' },
    { text: '该装备<§u 盔甲值 §r>:§2 2 §r\n\n' },
];
[
    "starry_map:enable_shelter.orange",
    "starry_map:enable_shelter.purple",
    "starry_map:enable_shelter.green",
    "starry_map:enable_shelter.blue",
    "starry_map:enable_shelter.red"
].forEach(item => help$1.set(item, { root: ['元素守护', '伤害吸收', '特种护甲'], intel: [...magic_crystal_armor, ...shelter], only: true }));
help$1.set('starry_map:starry_night_bead', {
    root: ['注魔宝珠', '星夜凝华', '增益道具'],
    intel: [
        ...magic_orbs,
        { text: '该道具的增益效果为<§l§b 夜视 §r>与<§l§b 急迫 §r>\n\n' },
    ]
});
help$1.set('starry_map:purple_gold_soul_jade', {
    root: ['注魔宝珠', '紫晶魂玉', '增益道具'],
    intel: [
        ...magic_orbs,
        { text: '该道具的增益效果为<§l§b 村庄英雄 §r>与<§l§b 试炼征兆 §r>\n\n' },
    ]
});
help$1.set('starry_map:ice_essence_gem', {
    root: ['注魔宝珠', '寒冰灵韵', '增益道具'],
    intel: [
        ...magic_orbs,
        { text: '该道具的增益效果为<§l§b 速度 §r>与<§l§b 怪物减速 §r>\n\n' },
    ]
});
help$1.set('starry_map:azure_sea_tide', {
    root: ['注魔宝珠', '碧海潮生', '增益道具'],
    intel: [
        ...magic_orbs,
        { text: '该道具的增益效果为<§l§b 潮涌能量 §r>与<§l§b 盘丝 §r>\n\n' },
    ]
});
help$1.set('starry_map:scarlet_flame_heart', {
    root: ['注魔宝珠', '赤焰灵心', '增益道具'],
    intel: [
        ...magic_orbs,
        { text: '该道具的增益效果为<§l§b 力量 §r>与<§l§b 防火 §r>\n\n' },
    ]
});
help$1.set('starry_map:chorus_picture', {
    root: ['特殊道具', '百灵绘卷', '抽奖券'],
    intel: [
        { text: '首次使用<§l§u 百灵绘卷 §r>, 您将获得新手补助\n\n' },
        { text: '可能包括: 新手房屋(唯一性), 魔晶工具套装, 神恩权柄套装\n\n' },
        { text: '新手房屋提供安全起点, 工具和套装助您冒险\n\n' },
        { text: '第§2 2 §r次使用时, 将招募<§l§d 治疗专长 §r>的<§l§u 神恩领航者 §r>\n\n' },
        { text: '这为队伍带来治疗和支援, 增强恢复力\n\n' },
        { text: '第§2 3 §r次使用时, 将招募<§l§c 增伤专长 §r>的<<§l§u 神恩领航者 §r>\n\n' },
        { text: '这增强队伍攻击力, 以应对更艰巨挑战\n\n' },
        { text: '第§2 4 §r次起, 您将在完全随机卡池中招募\n\n' },
        { text: '每次招募都是机遇, 可能遇见独特技能者\n\n' },
        { text: '根据队伍需求和战术风格, 选择适合的<§l§u 神恩领航者 §r>\n\n' },
        { text: '每个<§l§u 神恩领航者 §r>都有独特价值, 合理搭配提升效能\n\n' },
        { text: '使用<§l§u 百灵绘卷 §r>是战略性决策, 需深思熟虑\n\n' }
    ]
});
help$1.set('starry_map:contract_rewriting', {
    root: ['特殊道具', '契约重撰', '万能契约'],
    intel: [
        { text: '当使用该道具命中目标时, 将消耗该道具\n\n' },
        { text: '如果命中的目标可被驯服, 那么将强制再次驯服\n\n' },
        { text: '在这个过程中将强制修正从属关系\n\n' },
    ]
});
help$1.set('starry_map:enlightenment', {
    root: ['特殊道具', '参悟之石', '技能点', '升级石'],
    intel: [
        { text: '当<§l§9 神恩领航者 §r>获得足够的战斗经验后\n\n' },
        { text: '击败敌人将有机会掉落<§l§u 参悟之石 §r>\n\n' },
        { text: '使用<§l§u 参悟之石 §r>, 您可以访问与修改角色的战斗属性面板\n\n' },
        { text: '在这个界面中, 您可以利用<§l§u 参悟之石 §r>来增强实体的元素战斗属性\n\n' },
        { text: '选择您想要提升的属性, 并使用道具来增加其数值\n\n' },
        { text: '界面还会展示一些被记录的实体的战斗技能信息\n\n' },
        { text: '这可以帮助您了解每个实体的潜在能力和技能\n\n' },
        { text: '通过分析这些信息, 您可以更好地制定战斗策略\n\n' },
        { text: '选择合适的实体进行属性提升, 以匹配您的战斗风格\n\n' },
        { text: '记住, 每个实体的属性提升都应与您的整体战术相协调\n\n' },
        { text: '使用<§l§u 参悟之石 §r>是一个战略性的决策, 需要谨慎考虑\n\n' },
        { text: '确保您在正确的时机使用它, 以最大化其效益\n\n' }
    ]
});
help$1.set('starry_map:reduction_pureness', {
    root: ['特殊道具', '涤尽铅华', '玉净瓶', '小蓝瓶'],
    intel: [
        { text: '使用<§l§u 涤尽铅华 §r>道具后, 您可以打开一个特殊的选择界面\n\n' },
        { text: '在界面中, 与您签订契约的生物将被展示出来\n\n' },
        { text: '这些生物是您在冒险中结识的伙伴\n\n' },
        { text: '选择您想要收纳的生物, 并点击她的名称\n\n' },
        { text: '这样, 生物就会被转化为记录在<§l§9 星月诗篇 §r>上的概念构造体\n\n' },
        { text: '这个过程, 正如<§l§u 涤尽铅华 §r>之名, 将生物还原为最纯净的状态\n\n' },
        { text: '通过这种方式, 您可以安全地携带大量生物\n\n' },
        { text: '无论是快速迁徙还是进行跨纬度的跃迁, 都将变得更加容易\n\n' },
        { text: '在进行生物收纳之前, 请确保您了解每个生物的特性\n\n' },
        { text: '选择与您战略相匹配的生物, 以优化您的队伍配置\n\n' },
        { text: '这将帮助您在需要时更有效地与她们同行\n\n' },
        { text: '合理利用这一功能, 可以为您的冒险带来极大的便利\n\n' }
    ]
});
help$1.set('starry_map:moment_repair_dew', {
    root: ['特殊道具', '涵养灵露', '耐久修复'],
    intel: [
        { text: '使用<§l§9 涵养灵露 §r>这个特殊道具后, 它将消耗自身数量\n\n' },
        { text: '该道具能够修复玩家背包中的一个物品, 恢复其全部耐久度\n\n' },
        { text: '选择您想要修复的物品, 确保它具有可修复的耐久度属性\n\n' },
        { text: '对于经常使用或在战斗中损坏的装备来说, 这非常有用\n\n' },
        { text: '使用<§l§9 涵养灵露 §r>可以节省您寻找修理服务或使用其他修理手段的时间\n\n' },
        { text: '它特别适用于那些难以替换或具有特殊属性的物品\n\n' },
        { text: '在进行修复之前, 请确认您的背包中有<§l§9 涵养灵露 §r>\n\n' },
        { text: '修复过程简单快捷, 不会影响物品的其他属性或效果\n\n' },
        { text: '合理利用<§l§9 涵养灵露 §r>, 它将成为您冒险中的得力助手\n\n' }
    ]
});
help$1.set('starry_map:phantom_dispel_dust', {
    root: ['特殊道具', '幻影驱散', '怪物放逐'],
    intel: [
        { text: '使用<§l§u 幻影驱散粉 §r>后, 该道具将消耗自身数量\n\n' },
        { text: '帮助您摆脱敌对怪物的骚扰\n\n' },
        { text: '它专门用于清除当前锁定您为目标的<§l§4 敌对怪物 §r>\n\n' },
        { text: '在怪物密集或危险的环境中,<§l§u 幻影驱散粉 §r>是您逃生的好帮手\n\n' },
        { text: '如果您处于创造模式将拥有更强的权限\n\n' },
        { text: '使用<§l§u 幻影驱散粉 §r>将放逐您周围所有的<§l§4 敌对怪物 §r>\n\n' },
        { text: '无论它们是否锁定您为目标\n\n' },
        { text: '这在进行探索或建设时, 可以提供一个安全的缓冲区域\n\n' },
        { text: '使用前, 请确保您了解当前的游戏模式和权限\n\n' },
        { text: '以充分利用<§l§u 幻影驱散粉 §r>的效果\n\n' },
        { text: '在紧急情况下, 不要犹豫使用<§l§u 幻影驱散粉 §r>来保障您的安全\n\n' },
        { text: '同时, 合理规划道具的使用, 以备不时之需\n\n' }
    ]
});
help$1.set('starry_map:flowing_star', {
    root: ['特殊道具', '流光之星', '初始小屋'],
    intel: [
        { text: '使用<§l§u 流光之星 §r>道具, 您将能够再次创建一个新手小屋: 星辉雅居\n\n' },
        { text: '这个小屋是新手的避风港, 提供给您一个舒适的起点\n\n' },
        { text: '创建的新手小屋将包含丰富的奖励, 但不包括<§l§u 神恩领航者 §r>\n\n' },
        { text: '这些奖励旨在帮助您更快地适应游戏, 加速您的冒险进程\n\n' },
        { text: '请在安全的地点使用<§l§u 流光之星 §r>, 以确保小屋的安全创建\n\n' },
        { text: '小屋创建后, 您可以进入并探索, 获取为您准备的各种资源和工具\n\n' },
        { text: '利用这些资源, 您可以建造, 装饰或提升您的游戏技能\n\n' },
        { text: '记住,<§l§u 流光之星 §r>是一次性的, 使用后将不再拥有\n\n' },
        { text: '因此, 请在您准备好充分利用小屋带来的优势时再使用它\n\n' }
    ]
});
help$1.set('starry_map:dynamic_anchor_point', {
    root: ['特殊道具', '锚点虚印', '动态锚点'],
    intel: [
        { text: '使用<§l§u 锚点虚印 §r>道具后, 您将打开一个独特的选择界面\n\n' },
        { text: '在该界面中, 您可以选择与实体建立一个虚拟的锚点\n\n' },
        { text: '这个锚点可以作为与实体互动的一个特殊标记\n\n' },
        { text: '同样, 您也可以选择移除已建立在实体上的虚拟锚点\n\n' },
        { text: '当虚拟锚点存在时, 玩家将获得额外的传送锚点\n\n' },
        { text: '玩家可以选择瞬间前往指定的虚拟锚点位置\n\n' },
        { text: '或者, 玩家能够将带有虚拟锚点的生物召集至自己身边\n\n' },
        { text: '这个功能在探索广阔地图或管理多个生物时非常有用\n\n' },
        { text: '请确保在需要时才使用虚拟锚点, 以避免混淆或误用\n\n' },
        { text: '合理利用动态锚点, 它将为您的游戏体验增添便利\n\n' }
    ]
});
help$1.set('starry_map:mechanized_operation', {
    root: ['特殊道具', '神机操持', '载具控制'],
    intel: [
        { text: '使用<§l§u 神机操持 §r>道具, 您可以远程控制与您契约的彼岸机械载具\n\n' },
        { text: '这些载具将成为您的忠实伙伴, 听从您的指挥\n\n' },
        { text: '例如, 您可以控制<§l§9 渊鲸深潜船 §r>进行上浮和下潜\n\n' },
        { text: '这艘潜艇的灵活性和机动性将为您的海底探险提供巨大帮助\n\n' },
        { text: '同样, 您也可以操纵<§l§9 隧龙掘进车 §r>, 控制其运行和转向\n\n' },
        { text: '掘进车的强大挖掘能力将助您在地下世界中快速前进\n\n' },
        { text: '通过<§l§u 神机操持 §r>, 您可以轻松控制这些机械载具\n\n' },
        { text: '这种控制方式不仅提高了操作的便捷性, 也增加了战术的灵活性\n\n' },
        { text: '请确保在安全的环境中使用<§l§u 神机操持 §r>, 以避免意外发生\n\n' }
    ]
});
help$1.set('starry_map:call_python_pioneer', {
    root: ['特殊道具', '森蚺先锋', '单兵重炮'],
    intel: [
        { text: '在使用<§l§u 森蚺先锋炮 §r>道具时\n\n' },
        { text: '您将向前发射一发元素炮击\n\n' },
        { text: '这将对目标区域造成范围元素伤害\n\n' },
        { text: '--------------------------------\n\n' },
        { text: '炮击距离会根据玩家与目标的距离智能规划\n\n' },
        { text: '该道具的最大射击距离为§2 64 §r格\n\n' },
        { text: '--------------------------------\n\n' },
        { text: '炮击在到达目标位置时会爆炸\n\n' },
        { text: '并立即结算对敌人的伤害\n\n' },
        { text: '--------------------------------\n\n' },
        { text: '随着炮击距离的增加\n\n' },
        { text: '获得的<§l§9 攻击提升 §r>也会逐步提高\n\n' },
        { text: '--------------------------------\n\n' },
        { text: '此外, 如果单次炮击命中多个实体\n\n' },
        { text: '还会根据命中的实体数量获得额外的<§l§9 伤害倍率 §r>提升\n\n' },
        { text: '--------------------------------\n\n' },
        { text: '请注意, 这些效果仅适用于单体攻击\n\n' },
        { text: '合理利用这一特性, 可以最大化的利用炮击的战术价值\n\n' }
    ]
});
help$1.set('starry_map:moon_and_stars', {
    root: ['特殊道具', '星月诗篇', '命途回响'],
    intel: [
        { text: '纵观四百年的时光, [ 诸神集会 ]始终如影随形\n\n' },
        { text: '[ 神明启程 ]虽逝, 诸神仍愿守护旧秩序\n\n' },
        { text: '在[ 最终档案馆 ]深处的灰暗寂灭之地, 非神者孤独加冕\n\n' },
        { text: '人死不复生, 镜破难重圆, 此乃世间常理\n\n' },
        { text: '[ 魔神葬火 ]以身作炬, 承载着领航种的希望与哀愁\n\n' },
        { text: '神明轻声许下誓言:\n\n' },
        { text: '    凡此领航之众, 皆为吾之同族\n\n' },
        { text: '    只要吾之火不曾熄灭, 纵使败者亦能重燃\n\n' },
        { text: '--------------------------------\n\n' },
        { text: '此证为星月之印, 蕴含无尽神秘力量\n\n' },
        { text: '持此道具, 启< 重燃 >仪式\n\n' },
        { text: '让她们带着往日的回忆, 再次回到你的世界\n\n' },
    ]
});
help$1.set('starry_map:clothing_container', {
    root: ['特殊道具', '换装礼盒', '外观服饰'],
    intel: [
        { text: '当您对准 "神恩领航者 - 琉璃" 使用此道具时\n\n' },
        { text: '您将能够打开皮肤选择界面\n\n' },
        { text: '在界面中, 您可以自由选择喜爱的皮肤\n\n' },
        { text: '请注意, 此道具只适用于 "神恩领航者 - 琉璃"\n\n' },
    ]
});
help$1.set('starry_map:fantasy_sea_collection', {
    root: ['魔导书籍', '幻海集纳', '物资整理'],
    intel: [
        { text: '使用该道具点击< 方块容器 >下方的方块\n\n' },
        { text: '即可更新< 方块容器 >的位置记录\n\n' },
        { text: '在记录了< 方块容器 >的位置信息后\n\n' },
        { text: '且< 方块容器 >内有剩余空间时\n\n' },
        { text: '使用该道具攻击实体\n\n' },
        { text: '即可将其背包里的物品转移到容器内\n\n' },
    ]
});
help$1.set('starry_map:faerie_contract', {
    root: ['魔导书籍', '精灵结契', '万能契约'],
    intel: [
        { text: '当您手握<§l§u 精灵结契 §r>时, 奇特的仪式将唤醒失落的契约\n\n' },
        { text: '祂, 将向您揭示源自<神明-归忆>的智慧与权柄\n\n' },
        { text: '在这过程中, 诸多生灵的真名, 将被逐一刻录\n\n' },
        { text: '由近及远, 它们的名称, 在蕴含规则的书籍上闪烁\n\n' },
        { text: '轻点其名, 即可启动<神明-归忆>之力, 签订永世的契约\n\n' },
        { text: '契约既成, 此书籍将化为尘埃, 将自身回归虚无\n\n' },
    ]
});
help$1.set('starry_map:faerie_healing', {
    root: ['魔导书籍', '精灵治愈', '大治疗术'],
    intel: [
        { text: '当您手握<§l§u 精灵治愈 §r>时, 便是在呼唤<神明-界木>的加护\n\n' },
        { text: '润泽万物的权能将从您手中涌出, 形成一个神圣的治疗领域\n\n' },
        { text: '这股力量将拥抱您和您的同伴, 如同<神明-界木>滋养万物\n\n' },
        { text: '生命之泉将持续涌流, 恢复生命之力, 增强生存之希望\n\n' },
        { text: '在战斗的血雨腥风中, 或是在伤痛的折磨之下, 请启用此<魔导书籍>\n\n' },
        { text: '确保您和战友们在逆境中迅速复苏, 如同<神明-烛火>在黑夜中照亮前路\n\n' },
        { text: '此道具是生命之树的馈赠, 是庇护之焰的承诺\n\n' },
        { text: '在每一个生死攸关的时刻, 它将提供至关重要的治疗与慰藉\n\n' }
    ]
});
help$1.set('starry_map:space_transition', {
    root: ['魔导书籍', '空间宝典', '大传送术'],
    intel: [
        { text: '当您使用<§l§u 空间宝典 §r>时, 星辰的奥秘将在您眼前中显现\n\n' },
        { text: '三种传送模式等待您的选择：随机传送、顶点传送、以及诸界道标传送\n\n' },
        { text: '您可以根据需求, 挑选一条穿越空间的路径\n\n' },
        { text: '在诸界道标模式下, 您将拥有<神明-诸海>的力量, 跨越纬度之界, 刻印或抹去传送的道标\n\n' },
        { text: '若您在潜行之中, 以<神明-极雷>的权能默念咒语\n\n' },
        { text: '将自动引发一场随机的空间之旅, 体验未知的奇遇\n\n' }
    ]
});
help$1.set('starry_map:mineral_dictionary', {
    root: ['魔导书籍', '矿物辞典', '大挖矿术'],
    intel: [
        { text: '当您使用<§l§u 矿物辞典 §r>, <神明-烛火>的赐福, 将绘制出魔法方阵\n\n' },
        { text: '方阵启动, 释放出探寻大地奥秘的力量, 自动扫描附近的[矿物]\n\n' },
        { text: '随着<神明-极雷>的权能, 精准地挖掘并收集这些 [矿物]\n\n' },
        { text: '这不仅是矿工的至宝, 更是<神明-烛火>庇护下的恩赐\n\n' },
        { text: '它将矿物的挖掘过程化繁为简, 提升了效率与收获\n\n' },
        { text: '在<神明-极雷>的标准化力量下, 每一次挖掘都是一次精准的刻录\n\n' }
    ]
});
help$1.set('starry_map:forestry_guidelines', {
    root: ['魔导书籍', '林业指南', '大伐木术'],
    intel: [
        { text: '当您使用<§l§u 林业指南 §r>, <神明-界木>的生机将在您掌中凝聚成一个魔法方阵\n\n' },
        { text: '方阵之内, 魔法的力量被唤醒, 自动扫描并精准伐倒附近的 [树木]\n\n' },
        { text: '伐木的过程因此变得更加高效, 同时保证了生态的和谐与安全\n\n' },
        { text: '在<神明-极雷>的标准化力量下, 每一次伐木都是一次对自然的尊重与精准的刻录\n\n' }
    ]
});
help$1.set('starry_map:magic_handbook', {
    root: ['魔导书籍', '魔导手册', '方块百科'],
    intel: [
        { text: '当您以<§l§u 魔导手册 §r>拍打方块, 即是在召唤[神明-归忆]的智慧\n\n' },
        { text: '协议的力量将自动展开[月华百科]的智慧, 揭示所选方块的奥秘\n\n' },
        { text: '辅助说明信息如同<神明-极雷>的权柄, 清晰地展现在您眼前\n\n' },
        { text: '这是对建筑师与探险者的一份神圣礼物, 源自[神明-归忆]对规则与历史的守护\n\n' },
        { text: '它赋予他们洞察力, 深入理解方块的本质与特性\n\n' }
    ]
});
help$1.set('starry_map:source_energy', {
    root: ['魔导书籍', '源能秘典', '星之指引'],
    intel: [
        { text: '当您紧握<§l§u 源能秘典 §r>, 便是在唤醒[神明-归忆]的深奥知识\n\n' },
        { text: '书页轻翻, <§l§9 星之指引 §r>的智慧如星辰般闪耀, 展示着全部引导信息与提示\n\n' },
        { text: '这是对建筑者和探险者的一份神圣启示, 源自[神明-极雷]对权柄与力量的刻录\n\n' },
        { text: '它赋予他们洞察力, 深入理解模组的神秘与特性\n\n' }
    ]
});
help$1.set('starry_map:introduction_magic', {
    root: ['魔导书籍', '魔导绪论', '方块通知'],
    intel: [
        { text: "在机器的轰鸣声中, 使用<§l§u 魔导绪论 §r>, 即是在聆听[神明-归忆]的历史低语\n\n" },
        { text: "您的视野将穿透<§l§2 当前区块 §r>, 捕捉到<§l§9 魔导工业 §r>方块的心跳\n\n" },
        { text: "<§l§c 通知与报错信息 §r>在<神明-极雷>的标准化力量下, 清晰展现\n\n" },
        { text: "智慧地运用<§l§u 魔导绪论 §r>, 您将更好地掌握<§l§9 魔导工业 §r>的运作与奥秘\n\n" }
    ]
});
help$1.set('starry_map:blank_blueprint', {
    root: ['机械蓝图', '工业蓝图', '空白蓝图'],
    intel: [
        { text: "玩家在使用<§l§u 空白蓝图 §r>时\n\n" },
        { text: "可以通过点击方块和潜行时点击方块, 来确定选中区域的两个顶点\n\n" },
        { text: "当顶点框选完成后, 使用<§l§u 空白蓝图 §r>挖掘任意方块, 即可触发封装流程\n\n" },
        { text: "封装后, 将会获得保存了选中的方块结构的<§l§u 成品蓝图 §r>\n\n" }
    ]
});
help$1.set('starry_map:complete_blueprint', {
    root: ['机械蓝图', '工业蓝图', '成品蓝图'],
    intel: [
        { text: "玩家在使用<§l§u 成品蓝图 §r>时, 将能看到所需结构的尺寸信息\n\n" },
        { text: "这有助于玩家精确地了解构建规模, 从而进行有效的规划\n\n" },
        { text: "当玩家在潜行模式下操作<§l§u 成品蓝图 §r>, 将启动蓝图的放置功能\n\n" },
        { text: "此时, 蓝图内的方块结构将被自动放置, 大大提升了建造效率\n\n" },
        { text: "放置方块的过程中, 每次方块放置的操作会消耗§2 1000 §r点<§9 星尘力 §r>\n\n" },
        { text: "因此, 玩家在使用时应考虑<§9 星尘力 §r>的消耗, 确保资源的合理分配\n\n" }
    ]
});
const template_upgrade = [
    { text: "可在< 闪长石桌 >中合成\n\n" },
    { text: "带有特定功能优化和升级的< 空灵单元 >芯片组\n\n" },
    { text: "由于采用了更强更先进的系统架构\n\n" },
    { text: "可以使用更少的结构耗材, 制作更多的工程机械\n\n" },
    { text: "目前多用于< 矿物勘探 >与< 能量节点 >等设备中\n\n" },
];
[
    "starry_map:netherite_upgrade",
    "starry_map:dimension_upgrade",
    "starry_map:copper_upgrade",
    "starry_map:gold_upgrade",
    "starry_map:iron_upgrade",
].forEach(item => help$1.set(item, { root: ['模板材料', '升级模板', '强化升级'], intel: [...template_upgrade], only: true }));
help$1.set('starry_map:blank_template', {
    root: ['模板材料', '机械核心', '空灵单元'],
    intel: [
        { text: "可在< 闪长石桌 >中合成\n\n" },
        { text: "由人类魔导工业文明所制造出来的单机机械生命体主脑\n\n" },
        { text: "包含运算器, 存储器, 执行器等结构部件\n\n" },
        { text: "可视为一套能够独立运行的芯片组\n\n" }
    ]
});
const template_rune = [
    { text: "机械生命体被摧毁后残留的核心\n\n" },
    { text: "内部储存与运行着昔日生物活体核信息\n\n" },
    { text: "并维护着元素心智构造体\n\n" },
    { text: "用于拟造活体生物\n\n" },
    { text: "从神明那里继续获取元素力\n\n" },
];
[
    "starry_map:viper_rune",
    "starry_map:whale_rune",
].forEach(item => help$1.set(item, { root: ['仿生模板', '蝰蛇符文', '渊鲸符文'], intel: [...template_rune], only: true }));
help$1.set('starry_map:weapon_debris', {
    root: ['模板材料', '机械核心', '武装碎片'],
    intel: [
        { text: "机械生命体被摧毁后残留的结构\n\n" },
        { text: "基础的结构与功能依旧完整可用\n\n" },
        { text: "仍能拼装为其他可运行的仿生机械\n\n" },
        { text: "是一种通用的拟造生物活体的设备材料\n\n" }
    ]
});
help$1.set('starry_map:universal_integrated_circuit', {
    root: ['模板材料', '设备核心', '通用集成'],
    intel: [
        { text: "可在< 闪长石桌 >中合成\n\n" },
        { text: "经过对< 空灵单元 >的接口与结构封装\n\n" },
        { text: "可以制作为简易魔导工程机械的复合芯片组设备\n\n" }
    ]
});
help$1.set('starry_map:equipment_upgrade', {
    root: ['模板材料', '升级模板', '装备升级'],
    intel: [
        { text: "可在< 闪长石桌 >中合成\n\n" },
        { text: "带有特定功能优化和升级的< 空灵单元 >芯片组\n\n" },
        { text: "可以用于升级< 魔晶铠甲 >等装备\n\n" }
    ]
});
help$1.set('starry_map:ender_dragon_scales', {
    root: ['模板材料', '生物材料', '末影龙鳞'],
    intel: [
        { text: "当带有< 爆炸 >性质的攻击< 末影龙 >时掉落\n\n" },
        { text: "作为末影龙的龙鳞, 该材料边缘极为锋利\n\n" },
        { text: "可作为一种锋利且异常坚固的近战兵器\n\n" },
        { text: "也可作为一种稀缺材料, 去进行交易或参与合成\n\n" },
    ]
});
const delicacies_rune = [
    { text: "这< 琼着雅馔 >是一种独特的烹饪艺术\n\n" },
    { text: "以机械零件和科技元素为核心食材\n\n" },
    { text: "每一道< 琼着雅馔 >都是一场视觉与味觉的盛宴\n\n" },
    { text: "将冰冷的金属与炽热的火焰完美结合\n\n" },
];
[
    "starry_map:bee_fire_cuisine",
    "starry_map:curry_viper",
    "starry_map:viper_barrel",
    "starry_map:spirit_lizard_delicacy",
    "starry_map:spirit_lizard_apple",
    "starry_map:spirit_lizard_shard",
    "starry_map:charcoal_roasted_wild_bee",
    "starry_map:charcoal_roasted_abyssal_whale",
    "starry_map:wild_bee_roasted_chicken",
    "starry_map:wild_bee_shard",
    "starry_map:abyssal_whale_wreckage",
    "starry_map:abyssal_whale_soup",
    "starry_map:unknown_dipping_sauce"
].forEach(item => help$1.set(item, { root: ['碎片残骸', '迷之料理', '琼肴雅馔'], intel: [...delicacies_rune], only: true }));
help$1.set('starry_map:ender_dragon_scales', {
    root: ['美味蛋糕', '曦光绮梦', '琼肴雅馔'],
    intel: [
        { text: "充满着烛火的气息\n\n" },
        { text: "是源自谁的馈赠呢？\n\n" },
        { text: "增加2格饱食度, 防火30秒\n\n" },
    ]
});
const diffusion_filling = [
    { text: "< 扩散填充 >是一系列用于快速填补空缺的设备\n\n" },
    { text: "基于权限与设计用途的不同\n\n" },
    { text: "被分配了不同的类型与效果\n\n" },
    { text: "但唯有< 铜框版本 >是可在生存模式下制作与使用\n\n" },
];
[
    "starry_map:diffusion.air_to_dirt",
    "starry_map:diffusion.air_to_stone",
    "starry_map:diffusion.replacement_glass",
    "starry_map:diffusion.replacement_stone",
    "starry_map:diffusion.air_to_grass_block",
    "starry_map:diffusion.universal_diffusion",
    "starry_map:diffusion.structure_void_to_water",
    "starry_map:diffusion.water_to_structure_void",
    "starry_map:diffusion.horizontal_universal"
].forEach(item => help$1.set(item, { root: ['扩散填充', '快速建造', '自动填充'], intel: [...diffusion_filling], only: true }));

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

/*
 * 原版接口
 */
/**
 * * 向量常量类
 */
class VectorConstant {
    /**
     * 常量: 0.5 向量
     * 返回一个所有分量都为 0.5 的向量
     */
    static get CONSTANT_HALF() { return new Vector(0.5, 0.5, 0.5); }
    ;
    /**
     * 常量: 0 向量
     * 返回一个所有分量都为 0 的向量
     */
    static get CONSTANT_ZERO() { return new Vector(0, 0, 0); }
    ;
    /**
     * 常量: 向上单位向量
     * 返回一个 y 分量为 1, 其余分量为 0 的向上单位向量
     */
    static get CONSTANT_UP() { return new Vector(0, 1, 0); }
    ;
    /**
     * 常量: 向下单位向量
     * 返回一个 y 分量为 -1, 其余分量为 0 的向下单位向量
     */
    static get CONSTANT_DOWN() { return new Vector(0, -1, 0); }
    ;
    /**
     * 常量: 正一向量
     * 返回一个所有分量都是 1 的单位向量
     */
    static get CONSTANT_ONE() { return new Vector(1, 1, 1); }
    ;
    /**
     * 常量: 负一向量
     * 返回一个所有分量都是 -1 的单位向量
     */
    static get CONSTANT_LOSS_ONE() { return new Vector(-1, -1, -1); }
    ;
    /**
     * 常量: 西方向单位向量
     * 返回一个 x 分量为 -1, 其余分量为 0 的向西方向单位向量
     */
    static get CONSTANT_WEST() { return new Vector(-1, 0, 0); }
    ;
    /**
     * 常量: 东方向单位向量
     * 返回一个 x 分量为 1, 其余分量为 0 的向东方向单位向量
     */
    static get CONSTANT_EAST() { return new Vector(1, 0, 0); }
    ;
    /**
     * 常量: 北方向单位向量
     * 返回一个 z 分量为 1, 其余分量为 0 的向北方向单位向量
     */
    static get CONSTANT_SOUTH() { return new Vector(0, 0, 1); }
    ;
    /**
     * 常量: 南方向单位向量
     * 返回一个 z 分量为 -1, 其余分量为 0 的向南方向单位向量
     */
    static get CONSTANT_NORTH() { return new Vector(0, 0, -1); }
    ;
    /**
     * 常量: 水平方向单位向量数组
     * 包含四个水平方向（北、南、东、西）的单位向量
     */
    static get CONSTANT_HORIZONTAL() {
        return [
            Vector.CONSTANT_NORTH,
            Vector.CONSTANT_SOUTH,
            Vector.CONSTANT_EAST,
            Vector.CONSTANT_WEST
        ];
    }
    ;
    /**
     * 常量: 垂直方向单位向量数组
     * 包含两个垂直方向（上、下）的单位向量
     */
    static get CONSTANT_VERTICAL() {
        return [
            Vector.CONSTANT_DOWN,
            Vector.CONSTANT_UP,
        ];
    }
    ;
    /**
     * 常量: 所有方向单位向量数组
     * 包含所有方向（垂直和水平）的单位向量
     */
    static get CONSTANT_ALL() {
        return [
            ...Vector.CONSTANT_VERTICAL,
            ...Vector.CONSTANT_HORIZONTAL,
        ];
    }
    ;
    /**
     * 常量: 向下及水平方向单位向量数组
     * 包含向下方向（下）和所有水平方向（北、南、东、西）的单位向量
     */
    static get CONSTANT_DOWN_HORIZONTAL() {
        return [
            Vector.CONSTANT_DOWN,
            ...Vector.CONSTANT_HORIZONTAL,
        ];
    }
    ;
}
/**
 * * 向量类
 */
class Vector extends VectorConstant {
    x;
    y;
    z;
    /**
     * * 创建一个新的 Vector3 对象
     *
     * @param {number} x - 向量的 X 坐标
     *
     * @param {number} y - 向量的 Y 坐标
     *
     * @param {number} z - 向量的 Z 坐标
     */
    constructor(x, y, z) {
        super();
        this.x = x;
        this.y = y;
        this.z = z;
    }
    ;
    /**
     * * 生成立方体阵列向量数组
     *
     * @param scope 向量坐标的范围大小（非负整数）
     *
     * @returns {Vector[]} 立方体阵列向量数组, 包含所有可能的 (x, y, z) 组合, 其中每个坐标值都在 [-scope, +scope] 范围内
     */
    static createCubeLattice(scope) {
        /**
         * 计算立方体的边长, 范围为 [-scope, +scope], 因此边长为 2 * scope + 1
         */
        const size = 2 * scope + 1;
        /**
         * 存储生成的向量数组
         */
        const vectors = [];
        // 遍历所有可能的坐标组合
        for (let i = 0; i < size ** 3; i++) {
            /**
             * 计算 x 坐标：通过整数除法和取模运算确定 x 的值
             */
            const x = -scope + Math.floor(i / (size ** 2)) % size;
            /**
             * 计算 y 坐标：通过整数除法和取模运算确定 y 的值
             */
            const y = -scope + Math.floor((i / size) % size);
            /**
             * 计算 z 坐标：通过取模运算确定 z 的值
             */
            const z = -scope + i % size;
            // 将计算出的坐标封装为 Vector 对象并添加到数组中
            vectors.push(new Vector(x, y, z));
        }
        // 返回生成的向量数组
        return vectors;
    }
    ;
    /**
     * * 比较当前 Vector3 对象与另一个 Vector3 对象是否相等
     *
     * @param {server.Vector3} start - 要比较的 Vector3 对象
     *
     * @param {server.Vector3} done - 要比较的 Vector3 对象
     *
     * @returns {boolean} - 如果两个 Vector3 对象的 x、y 和 z 属性都相等, 则返回 true；否则返回 false
     */
    static equals(start, done) {
        return start.x === done.x && start.y === done.y && start.z === done.z;
    }
    ;
    /**
     * * 比较当前 Vector3 对象与另一个 Vector3 对象是否相等
     *
     * @param {server.Vector3} sample - 要比较的 Vector3 对象
     *
     * @returns {boolean} 如果两个 Vector3 对象的 x、y 和 z 属性都相等, 则返回 true；否则返回 false
     */
    equals(sample) {
        return this.x === sample.x && this.y === sample.y && this.z === sample.z;
    }
    ;
    /**
     * * 返回 Vector3 对象的一个副本
     *
     * @param {server.Vector3} vector - 需要拷贝的 Vector3 对象
     *
     * @returns {Vector} - 拷贝后的新 Vector 对象
     */
    static copy(vector) {
        return this.CONSTANT_ZERO.add(vector);
    }
    ;
    /**
     * * 返回当前 Vector3 对象的一个副本
     *
     * @returns {Vector} 当前 Vector 对象的副本
     */
    get copy() {
        return this.add(Vector.CONSTANT_ZERO);
    }
    ;
    /**
     * * 将当前 Vector3 对象与另一个 Vector3 对象相加
     *
     * @param {server.Vector3} start - 要相加的 Vector3 对象
     *
     * @param {server.Vector3} done - 要相加的 Vector3 对象
     *
     * @returns {Vector} - 相加结果的新 Vector3 对象
     */
    static add(start, done) {
        return new Vector(start.x + done.x, start.y + done.y, start.z + done.z);
    }
    ;
    /**
     * * 将当前 Vector3 对象与另一个 Vector3 对象相加
     *
     * @param {server.Vector3} sample - 要相加的 Vector3 对象
     *
     * @returns {Vector} - 相加结果的新 Vector3 对象
     */
    add(sample) {
        return new Vector(sample.x + this.x, sample.y + this.y, sample.z + this.z);
    }
    ;
    /**
     * * 从 Vector3 对象中减去另一个 Vector3 对象
     *
     * @param {server.Vector3} start - 被减去的 Vector3 对象
     *
     * @param {server.Vector3} done - 要减去的 Vector3 对象
     *
     * @returns {Vector} - 减法结果的新 Vector 对象
     */
    static subtract(start, done) {
        return new Vector(start.x - done.x, start.y - done.y, start.z - done.z);
    }
    ;
    /**
     * * 从当前 Vector3 对象中减去另一个 Vector3 对象
     *
     * @param {server.Vector3} sample - 要减去的 Vector3 对象
     *
     * @returns {Vector} - 减法结果的新 Vector 对象
     */
    subtract(sample) {
        return new Vector(this.x - sample.x, this.y - sample.y, this.z - sample.z);
    }
    ;
    /**
     * * 将 Vector3 对象的每个分量乘以一个标量
     *
     * @param {server.Vector3} vector - 向量对象
     *
     * @param {number} scale - 用于缩放的标量值
     *
     * @returns {Vector} - 缩放后的新 Vector 对象
     */
    static multiply(vector, scale) {
        return new Vector(vector.x * scale, vector.y * scale, vector.z * scale);
    }
    ;
    /**
     * * 将当前 Vector 对象的每个分量乘以一个标量
     *
     * @param {number} scale - 用于缩放的标量值
     *
     * @returns {Vector} - 缩放后的新 Vector 对象
     */
    multiply(scale) {
        return new Vector(this.x * scale, this.y * scale, this.z * scale);
    }
    ;
    /**
     * * 计算 Vector3 对象与另一个 Vector3 对象的点积
     *
     * @param {server.Vector3} start - 要计算点积的 Vector3 对象
     *
     * @param {server.Vector3} done - 要计算点积的 Vector3 对象
     *
     * @returns {number} - 两个向量的点积结果
     */
    static dot(start, done) {
        return start.x * done.x + start.y * done.y + start.z * done.z;
    }
    ;
    /**
     * 计算当前 Vector3 对象与另一个 Vector3 对象的点积
     *
     * @param {server.Vector3} sample - 要计算点积的 Vector3 对象
     *
     * @returns {number} - 两个向量的点积结果
     */
    dot(sample) {
        return this.x * sample.x + this.y * sample.y + this.z * sample.z;
    }
    ;
    /**
     * * 计算 Vector3 对象与另一个 Vector3 对象的叉积
     *
     * @param {server.Vector3} start - 要计算叉积的 Vector3 对象
     *
     * @param {server.Vector3} done - 要计算叉积的 Vector3 对象
     *
     * @returns {server.Vector3} - 两个向量的叉积结果
     */
    static cross(start, done) {
        return new Vector(start.y * done.z - start.z * done.y, start.z * done.x - start.x * done.z, start.x * done.y - start.y * done.x);
    }
    ;
    /**
     * * 计算当前 Vector3 对象与另一个 Vector3 对象的叉积
     *
     * @param {server.Vector3} done - 要计算叉积的 Vector3 对象
     *
     * @returns {Vector} - 两个向量的叉积结果
     */
    cross(done) {
        return new Vector(this.y * done.z - this.z * done.y, this.z * done.x - this.x * done.z, this.x * done.y - this.y * done.x);
    }
    ;
    /**
     * * 将 Vector3 对象的每个分量除以一个标量
     *
     * @param {server.Vector3} vector - 进行除法计算的 Vector3 对象
     *
     * @param {number} divisor - 用于除法的标量值
     *
     * @returns {Vector} - 除法结果的新 Vector3 对象
     */
    static division(vector, divisor) {
        if (divisor === 0)
            return new Vector(vector.x, vector.y, vector.z);
        return new Vector(vector.x / divisor, vector.y / divisor, vector.z / divisor);
    }
    ;
    /**
     * 将当前 Vector3 对象的每个分量除以一个标量
     *
     * @param {number} divisor - 用于除法的标量值
     *
     * @returns {Vector} - 除法结果的新 Vector3 对象
     */
    division(divisor) {
        if (divisor === 0)
            return this;
        return new Vector(this.x / divisor, this.y / divisor, this.z / divisor);
    }
    ;
    /**
     * * 获取 Vector3 对象的模（长度）
     *
     * @param {server.Vector3} vector - 进行计算的 Vector3 对象
     *
     * @returns {number} - 向量的模
     */
    static magnitude(vector) {
        return Math.sqrt(vector.x ** 2 + vector.y ** 2 + vector.z ** 2);
    }
    ;
    /**
     * * 获取当前 Vector3 对象的模（长度）
     *
     * @returns {number} 向量的模
     */
    get magnitude() {
        return Math.sqrt(this.x ** 2 + this.y ** 2 + this.z ** 2);
    }
    ;
    /**
     * * 计算 Vector3 对象与另一个 Vector3 对象之间的距离
     *
     * @param {server.Vector3} start - 要计算距离的 Vector3 对象
     *
     * @param {server.Vector3} done - 要计算距离的 Vector3 对象
     *
     * @returns {number} - 两个向量之间的距离
     */
    static distance(start, done) {
        return this.magnitude(this.subtract(start, done));
    }
    ;
    /**
     * * 计算当前 Vector3 对象与另一个 Vector3 对象之间的距离
     *
     * @param {server.Vector3} vector - 要计算距离的 Vector3 对象
     *
     * @returns {number} - 两个向量之间的距离
     */
    distance(vector) {
        return Vector.magnitude(this.subtract(vector));
    }
    ;
    /**
     * * 获取 Vector3 对象的归一化向量
     *
     * @param {server.Vector3} vector - 进行计算的 Vector3 对象
     *
     * @returns {server.Vector3} - 计算后的向量对象
     */
    static normalize(vector) {
        /**
         * * 计算向量模长
         */
        const mag = this.magnitude(vector);
        return new Vector(vector.x / mag, vector.y / mag, vector.z / mag);
    }
    ;
    /**
     * * 获取当前 Vector3 对象的归一化向量
     *
     * @returns {Vector} 归一化的单位向量
     */
    get normalize() {
        /**
         * * 计算向量模长
         */
        const mag = this.magnitude;
        return new Vector(this.x / mag, this.y / mag, this.z / mag);
    }
    ;
    /**
     * * 将 Vector3 对象的每个分量向下取整到指定的小数位数
     *
     * @param {server.Vector3} vector - 进行计算的 Vector3 对象
     *
     * @param {number} decimals - 小数位数, 默认为 2
     *
     * @returns {Vector} - 取整后的新 Vector 对象
     */
    static floor(vector, decimals = 2) {
        /**
         * * 获取乘数
         */
        const multiplier = Math.pow(10, decimals);
        return new Vector(Math.floor(vector.x * multiplier) / multiplier, Math.floor(vector.y * multiplier) / multiplier, Math.floor(vector.z * multiplier) / multiplier);
    }
    ;
    /**
     * * 将当前 Vector3 对象的每个分量向下取整到指定的小数位数
     *
     * @param {number} decimals - 小数位数, 默认为 2
     *
     * @returns {Vector} - 取整后的新 Vector 对象
     */
    floor(decimals = 2) {
        /**
         * * 获取乘数
         */
        const multiplier = Math.pow(10, decimals);
        return new Vector(Math.floor(this.x * multiplier) / multiplier, Math.floor(this.y * multiplier) / multiplier, Math.floor(this.z * multiplier) / multiplier);
    }
    ;
    /**
     * * 将 Vector3 对象转换为字符串
     *
     * @param {server.Vector3 | server.Vector2} [vector] - 向量对象
     *
     * @param {VECTOR_STRING_OPTIONS} [options] - 字符串化选项
     *
     * @returns {string} - 向量的字符串表示
     */
    static toString(vector, options) {
        /**
         * * 默认小数位数
         */
        const decimals = options?.decimals ?? 2;
        /**
         * * 向量 分隔字符串
         */
        const delimiter = options?.delimiter ?? ', ';
        /**
         * * 根据向量的类型, 获取不同的属性
         */
        const components = 'z' in vector
            ? [vector.x.toFixed(decimals), vector.y.toFixed(decimals), vector.z.toFixed(decimals)]
            : [vector.x.toFixed(decimals), vector.y.toFixed(decimals)];
        // 将向量组件连接成字符串
        return components.join(delimiter);
    }
    ;
    /**
     * * 将当前 Vector3 对象转换为字符串
     *
     * @param {type.VECTOR_STRING_OPTIONS} [options] - 字符串化选项
     *
     * @returns {string} - 向量的字符串表示
     */
    toString(options) {
        /**
         * * 默认小数位数
         */
        const decimals = options?.decimals ?? 2;
        /**
         * * 向量 分隔字符串
         */
        const delimiter = options?.delimiter ?? ', ';
        /**
         * * 转为 字符串 数组
         */
        const components = [this.x.toFixed(decimals), this.y.toFixed(decimals), this.z.toFixed(decimals)];
        // 将向量组件连接成字符串
        return components.join(delimiter);
    }
    ;
    /**
     * * 将 Vector3 对象的每个分量限制在指定的范围内
     *
     * @param {server.Vector3} [vector] - 进行计算的 Vector3 对象
     *
     * @param {VECTOR_LIMITS} [limits] - 包含最小值和最大值的对象
     *
     * @returns {Vector} - 计算后的新 Vector 对象
     */
    static clamp(vector, limits) {
        return new Vector(Clamp({ min: limits?.min?.x ?? Number.MIN_SAFE_INTEGER, max: limits?.max?.x ?? Number.MAX_SAFE_INTEGER }, vector.x), Clamp({ min: limits?.min?.y ?? Number.MIN_SAFE_INTEGER, max: limits?.max?.y ?? Number.MAX_SAFE_INTEGER }, vector.y), Clamp({ min: limits?.min?.z ?? Number.MIN_SAFE_INTEGER, max: limits?.max?.z ?? Number.MAX_SAFE_INTEGER }, vector.z));
    }
    ;
    /**
     * * 将当前 Vector3 对象的每个分量限制在指定的范围内
     *
     * @param {type.VECTOR_LIMITS} [limits] - 包含最小值和最大值的对象
     *
     * @returns {Vector} - 计算后的新 Vector 对象
     */
    clamp(limits) {
        return new Vector(Clamp({ min: limits?.min?.x ?? Number.MIN_SAFE_INTEGER, max: limits?.max?.x ?? Number.MAX_SAFE_INTEGER }, this.x), Clamp({ min: limits?.min?.y ?? Number.MIN_SAFE_INTEGER, max: limits?.max?.y ?? Number.MAX_SAFE_INTEGER }, this.y), Clamp({ min: limits?.min?.z ?? Number.MIN_SAFE_INTEGER, max: limits?.max?.z ?? Number.MAX_SAFE_INTEGER }, this.z));
    }
    ;
    /**
     * * 向量 线性插值
     *
     * @param {server.Vector3} start - 向量对象
     *
     * @param {server.Vector3} done - 向量对象
     *
     * @param {number} time - 时间系数
     *
     * @returns {server.Vector3} - 计算后的向量对象
     */
    static lerp(start, done, time) {
        return new Vector(start.x + (done.x - start.x) * time, start.y + (done.y - start.y) * time, start.z + (done.z - start.z) * time);
    }
    ;
    /**
     * * 向量 球面线性插值
     *
     * @param {server.Vector3} start - 向量对象
     *
     * @param {server.Vector3} done - 向量对象
     *
     * @param {number} time - 时间系数
     *
     * @returns {server.Vector3} - 计算后的向量对象
     */
    static slerp(start, done, time) {
        /**
         * * 计算两个向量点积
         */
        const angleCosine = this.dot(start, done);
        /**
         * * 确保角度余弦值在 [-1, 1] 区间内
         */
        const safeAngleCosine = Math.min(Math.max(angleCosine, -1), 1);
        /**
         * * 计算角度余弦值
         */
        const angleTheta = Math.acos(safeAngleCosine);
        /**
         * * 计算角度正弦值
         */
        const angleSin = Math.sin(angleTheta);
        /**
         * * 处理几乎平行的向量
         */
        if (Math.abs(angleSin) < Number.EPSILON)
            return start;
        /**
         * * 计算插值比例 对应 vectorA
         */
        const ratioA = Math.sin((1.0 - time) * angleTheta) / angleSin;
        /**
         * * 计算插值比例 对应 vectorB
         */
        const ratioB = Math.sin(time * angleTheta) / angleSin;
        // 根据插值比例对两个向量进行缩放, 然后相加得到插值结果
        return this.add(this.multiply(start, ratioA), this.multiply(done, ratioB));
    }
    ;
    /**
     * * 在 Vector3 对象和另一个 Vector3 对象之间随机生成一个向量
     *
     * @param {server.Vector3} start - 进行计算的 Vector3 对象
     *
     * @param {server.Vector3} done - 进行计算的 Vector3 对象
     *
     * @returns {Vector} - 计算后的 Vector 对象
     */
    static rangeRandom(start, done) {
        /**
         * * 获取两个向量范围
         */
        const range = new server.BlockVolume(start, done);
        /**
         * * 向量空间 的 最小值顶点
         */
        const min = range.getMin();
        /**
         * * 向量空间 的 最大值顶点
         */
        const max = range.getMax();
        // 随机生成一个向量
        return new Vector(RandomFloat(min.x, max.x), RandomFloat(min.y, max.y), RandomFloat(min.z, max.z));
    }
    ;
    /**
     * 在当前 Vector3 对象和另一个 Vector3 对象之间随机生成一个向量
     *
     * @param {server.Vector3} done - 另一个 Vector3 对象
     *
     * @returns {Vector} - 计算后的 Vector 对象
     */
    rangeRandom(done) {
        /**
         * 创建一个 BlockVolume 对象, 表示从当前向量到目标向量的范围
         */
        const range = new server.BlockVolume(this, done);
        /**
         * 获取 BlockVolume 的最小顶点坐标
         */
        const min = range.getMin();
        /**
         * 获取 BlockVolume 的最大顶点坐标
         */
        const max = range.getMax();
        return new Vector(RandomFloat(min.x, max.x), RandomFloat(min.y, max.y), RandomFloat(min.z, max.z));
    }
    ;
    /**
     * * 在指定锚点周围生成一个随机向量
     *
     * @param {server.Vector3} [anchor] - 基准位置坐标
     *
     * @param {number} [range] - 随机偏移范围（每个轴的偏移值在 [-range, +range] 之间）
     *
     * @param {server.Vector3} [offset] - 偏移量（默认为 { x: 0, y: 0, z: 0 }）
     *
     * @returns {Vector} - 计算后的 Vector 对象
     */
    static random(anchor, range, offset = Vector.CONSTANT_ZERO) {
        return Vector.add(anchor, { x: RandomFloat(-range, range), y: RandomFloat(-range, range), z: RandomFloat(-range, range) }).add(offset);
    }
    ;
    /**
     * * 在当前位置周围生成一个随机向量
     *
     * @param {number} range - 随机偏移范围（每个轴的偏移值在 [-range, +range] 之间）
     *
     * @param {server.Vector3} [offset] - 偏移量（默认为 { x: 0, y: 0, z: 0 }）
     *
     * @returns {Vector} - 计算后的 Vector 对象
     */
    random(range, offset = Vector.CONSTANT_ZERO) {
        return Vector.add(this, { x: RandomFloat(-range, range), y: RandomFloat(-range, range), z: RandomFloat(-range, range) }).add(offset);
    }
    ;
    /**
     * * 计算 Vector3 对象与另一个 Vector3 对象之间的归一化差向量
     *
     * @param {server.Vector3} start - 进行计算的 Vector3 对象
     *
     * @param {server.Vector3} done - 进行计算的 Vector3 对象
     *
     * @returns {Vector} - 归一化后的差向量
     */
    static difference(start, done) {
        /**
         * * 计算 两个向量 的 基本向量
         */
        const direction = this.subtract(done, start);
        // 返回 归一化后 的 差向量
        return this.normalize(direction);
    }
    ;
    /**
     * * 计算当前 Vector3 对象与另一个 Vector3 对象之间的归一化差向量
     *
     * @param {Vector} done - 进行计算的 Vector3 对象
     *
     * @returns {Vector} - 归一化后的差向量
     */
    difference(done) {
        /**
         * 计算差向量
         */
        const direction = done.subtract(this);
        return Vector.normalize(direction);
    }
    ;
    /**
     * 在指定位置和维度内随机获取最高块的中心坐标
     *
     * @param {type.LOCATION_AND_DIMENSION} source - 包含位置和维度的对象
     *
     * @param {number} [range=8] - 随机偏移的范围, 默认值为8
     *
     * @returns {server.Vector3} 返回最高块的中心坐标, 如果无法找到最高块, 则返回源位置
     */
    static randomTopmostBlock(source, range = 8) {
        /**
         * * 随机偏移坐标
         */
        const offset = Vector.add(source.location, { x: RandomFloor(-range, range), y: 0, z: RandomFloor(-range, range) });
        // 输出 随机有效坐标
        return source.dimension.getTopmostBlock(offset)?.above(1)?.center() ?? source.location;
    }
    ;
    /**
     * * 基于 实体旋转 获取 指向信息 的 3轴矢量
     *
     * @param {server.Vector2} rotate - 实体旋转的 2轴矢量
     */
    static AngleToPlace(rotate) {
        /**
         * * 旋转角度(俯仰角)
         */
        const ry = -rotate.y * Math.PI / 180;
        /**
         * * 旋转角度(偏航角)
         */
        const rx = -rotate.x * Math.PI / 180;
        /**
         * * x 轴分量
         */
        const x = Math.sin(ry) * Math.cos(rx);
        /**
         * * Y 轴分量
         */
        const y = Math.sin(rx);
        /**
         * * Z 轴分量
         */
        const z = Math.cos(ry) * Math.cos(rx);
        // 返回指向的三维向量
        return { x, y, z };
    }
    ;
    /**
     * 将三维方向向量转换为实体旋转角度（基于Minecraft坐标系规则）
     *
     * @param {server.Vector3} direction - 标准化后的三维方向向量
     *
     * @returns {server.Vector2} 实体旋转角度（pitch/x轴, yaw/y轴）
     */
    static Vector3ToAngle(direction) {
        /**
         * 计算水平面投影长度
         */
        const horizontalDist = Math.sqrt(direction.x ** 2 + direction.z ** 2);
        /**
         * 计算偏航角（yaw）调整参数顺序和符号
         */
        let yaw = Math.atan2(-direction.x, direction.z) * (180 / Math.PI);
        /**
         * 计算俯仰角（pitch）并取反（Minecraft向下为正方向）
         */
        let pitch = -Math.atan2(direction.y, horizontalDist) * (180 / Math.PI);
        // 处理极端情况（垂直方向）
        if (isNaN(pitch)) {
            pitch = direction.y > 0 ? -90 : 90; // 符号与原始计算相反
        }
        // 规范yaw到[-180, 180]范围
        yaw = ((yaw + 180) % 360 + 360) % 360 - 180;
        // 返回实体旋转角度
        return { x: pitch, y: yaw };
    }
    ;
    /**
     * * 计算 目标方向相关 的 方向向量集
     *
     * @param {server.Vector3} front - 前方 方向向量
     *
     * @returns {VECTOR_DIRECTIONS} - 包含计算出的方向向量的对象
     */
    static directions(front) {
        /**
         * * 定义 常量 向量
         */
        const sample = this.CONSTANT_UP;
        /**
         * * 后方 方向向量
         */
        const back = this.normalize(this.multiply(front, -1));
        /**
         * * 右方 方向向量
         */
        const right = this.normalize(this.cross(front, sample));
        /**
         * * 左方 方向向量
         */
        const left = this.normalize(this.multiply(right, -1));
        /**
         * * 下方 方向向量
         */
        const down = this.normalize(this.cross(front, right));
        /**
         * * 上方 方向向量
         */
        const above = this.normalize(this.multiply(down, -1));
        // 返回计算结果
        return { front, back, left, right, above, down };
    }
    ;
    /**
     * * 计算 目标方向相关 的 坐标偏移
     *
     * @param {server.Vector3} source - 进行计算的源坐标
     *
     * @param {server.Vector3} front - 前方向向量
     *
     * @param {VECTOR_RELATIVE_OFFSET} offset - 偏移量
     *
     * @returns {server.Vector3} - 计算后的坐标
     */
    static relativeOffset(source, front, offset) {
        /**
         * * 计算 方向向量集
         */
        const directions = this.directions(front);
        /**
         * * 计算 前方偏移量
         */
        const frontScale = this.multiply(front, offset.front);
        /**
         * * 计算 右方偏移量
         */
        const rightScale = this.multiply(directions.right, offset.right);
        /**
         * * 计算 上方偏移量
         */
        const upScale = this.multiply(directions.above, offset.above);
        // 返回偏移量
        return this.add(source, this.add(frontScale, this.add(upScale, rightScale)));
    }
    ;
    /**
     * * 提前量计算
     *
     * @param {server.Vector3} posA - 点 A 的位置
     *
     * @param {server.Vector3} posB - 点 B 的位置
     *
     * @param {number} speedA - A 发射的直线弹射物的速率
     *
     * @param {server.Vector3} velB - B 的速度
     *
     * @returns {server.Vector3} - A 发射的直线弹射物的速度
     */
    static calculateLeadVelocity(posA, posB, speedA, velB) {
        /**
         * * 计算 向量BA
         */
        const vecBA = this.subtract(posB, posA);
        /**
         * * 计算 向量BA的归一化向量
         */
        const normVecBA = this.normalize(vecBA);
        /**
         * * 计算 向量BA与速度B的点积
         */
        const compVbBA = this.dot(velB, normVecBA);
        /**
         * * 计算 向量BA与归一化B的垂直分量
         */
        const vbAlongBA = this.multiply(normVecBA, compVbBA);
        /**
         * * 计算 向量BA与速度B的垂直分量
         */
        const perpCompVa = this.subtract(velB, vbAlongBA);
        /**
         * * 计算 向量BA与速度A的垂直分量
         */
        const magVaBA = Math.sqrt(speedA * speedA - this.dot(perpCompVa, perpCompVa));
        // 如果A的发射速度在BA方向上的分量为负数, 则返回速度B的垂直分量
        if (magVaBA <= 0)
            return perpCompVa;
        /**
         * * 计算 A 发射的直线弹射物的速度向量
         */
        const vaAlongBA = this.multiply(normVecBA, -magVaBA);
        // 计算最终的速度向量（A的发射速度）
        return this.add(perpCompVa, vaAlongBA);
    }
    ;
    /**
     * * 获取区块坐标
     *
     * @param {server.Vector3} vector - 计算前的原始坐标
     *
     * @param {boolean} Yzero - 是否将 Y轴 的值设置为 0
     *
     * @param {number} size - 区块大小
     *
     * @returns {server.Vector3} - 计算后的区块坐标
     */
    static chunkLocation(vector, Yzero = true, size = 16) {
        /**
         * * 计算 Y轴 的值
         */
        const y = Yzero ? 0 : vector.y;
        // 返回计算结果
        return new Vector(Math.floor(vector.x / size) * size, y, Math.floor(vector.z / size) * size);
    }
    ;
}
/**
 * * 将数值限制在指定的最小值和最大值范围内
 *
 * @param {type.Vertex} input 包含数字范围的 Vertex 对象
 *
 * @param {number} value 用于测试的数值
 *
 * @returns {number} 限制后的数值，确保在 [range.min, range.max] 区间内
 */
function Clamp({ min, max }, value) {
    return Math.max(min, Math.min(max, value));
}
/**
 * * 生成 指定范围 内 的 随机值
 *
 * @param {VERTEX} input 包含数字范围的 VERTEX 对象
 *
 * @param {boolean} integer 是否生成整数, true 为生成整数, false 为生成浮点数
 *
 * @returns {number} 输出 范围内 的 随机值
 */
function Random({ min, max }, integer) {
    if (integer == true) {
        // 输出 指定范围内 的 随机整数
        return Math.floor(Math.random() * (max - min + 1) + min);
    }
    else {
        // 输出 指定范围内 的 随机浮点数
        return Math.random() * (max - min) + min;
    }
}
/**
 * * 生成指定范围内的随机整数
 *
 * @param {number} min - 范围的最小值（包含在内）
 *
 * @param {number} max - 范围的最大值（包含在内）
 *
 * @returns {number} 返回 min 和 max 之间的一个随机整数, 包括 min 和 max
 */
function RandomFloor(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}
/**
 * * 生成一个在指定范围内的随机浮点数, 并保留指定的小数位数
 *
 * @param {number} min - 随机数范围的最小值（包含）
 *
 * @param {number} max - 随机数范围的最大值（包含）
 *
 * @param {number} length - 返回的浮点数的小数位数, 默认为2
 *
 * @returns {number} 在指定范围内的随机浮点数, 保留指定的小数位数
 */
function RandomFloat(min, max, length = 2) {
    return Number((Math.random() * (max - min) + min).toFixed(length));
}
/**
 * 分析字符串权重信息, 根据权重随机选择一个字符串
 *
 * 该函数通过累积权重的方式, 将输入的字符串及其权重映射到一个随机索引上,
 *
 * 并返回随机选择的结果及其相关信息
 *
 * @param input - 输入的字符串权重映射（Map<string, number>）
 *
 * @returns {type.WEIGHT_STRING_INTEL} - 包含随机选择结果的解析信息
 */
function AnalysisStringWeight(input) {
    /**
     * 总权重, 用于计算随机索引。
     */
    let totalWeight = 0;
    /**
     * 累积权重数组, 用于快速找到随机索引对应的输出值。
     */
    const cumulativeWeights = [];
    // 遍历输入的权重信息, 填充累积权重数组
    input.forEach(weight => {
        // 计算总权重
        totalWeight += weight;
        // 填充累积权重数组
        cumulativeWeights.push(totalWeight);
    });
    /**
     * 生成一个随机索引, 范围在 0 到 totalWeight - 1 之间。
     */
    const randomIndex = RandomFloor(0, totalWeight - 1);
    /**
     * 找到第一个大于等于随机索引的累积权重, 并返回索引。
     */
    const outputIndex = cumulativeWeights.findIndex(weight => randomIndex < weight);
    /**
     * 找到对应的输出值。
     */
    const output = Array.from(input.keys())[outputIndex];
    // 返回解析结果
    return { source: Array.from(input.keys()), index: outputIndex, output };
}
/**
 * 分析消息权重信息, 根据权重随机选择一个消息
 *
 * 该函数通过累积权重的方式, 将输入的消息及其权重映射到一个随机索引上,
 *
 * 并返回随机选择的结果及其相关信息
 *
 * @param input - 输入的消息权重映射（Map<server.RawMessage, number>）
 *
 * @returns {type.WEIGHT_MESSAGE_INTEL} - 包含随机选择结果的解析信息
 */
function AnalysisMessageWeight(input) {
    /**
     * 总权重, 用于计算随机索引。
     */
    let totalWeight = 0;
    /**
     * 累积权重数组, 用于快速找到随机索引对应的输出值。
     */
    const cumulativeWeights = [];
    // 遍历输入的权重信息, 填充累积权重数组
    input.forEach(weight => {
        // 计算总权重
        totalWeight += weight;
        // 填充累积权重数组
        cumulativeWeights.push(totalWeight);
    });
    /**
     * 生成一个随机索引, 范围在 0 到 totalWeight - 1 之间。
     */
    const randomIndex = RandomFloor(0, totalWeight - 1);
    /**
     * 找到第一个大于等于随机索引的累积权重, 并返回索引。
     */
    const outputIndex = cumulativeWeights.findIndex(weight => randomIndex < weight);
    /**
     * 找到对应的输出值。
     */
    const output = Array.from(input.keys())[outputIndex];
    // 返回解析结果
    return { source: Array.from(input.keys()), index: outputIndex, output };
}
/**
 * 解析权重信息, 根据输入的键类型动态选择处理逻辑
 *
 * 该函数通过类型守卫判断输入的键类型（字符串或 RawMessage）, 并调用相应的处理函数
 *
 * @param inputMap - 输入的权重映射（Map<K, number>）, 其中 K 是字符串或 RawMessage
 *
 * @returns {type.DetermineReturnType<K>} - 根据输入键类型返回相应的解析结果
 *
 * @throws 如果输入的 Map 为空, 则抛出错误
 */
function AnalysisWeight(inputMap) {
    // 类型守卫判断
    if (inputMap.size === 0)
        throw new Error("Input map cannot be empty");
    /**
     * 通过第一个键的类型进行判断（假设所有键类型一致）。
     */
    const firstKey = Array.from(inputMap.keys())[0];
    // 类型分支处理
    if (typeof firstKey === 'string') {
        // 类型断言确保类型安全
        return AnalysisStringWeight(inputMap);
    }
    else {
        // 处理 RawMessage 类型
        return AnalysisMessageWeight(inputMap);
    }
}
/**
 * * 判断 是否启用
 *
 * @param {number} input - 百分比(整数)
 *
 * @returns {boolean} - 返回 是否启用
 */
function IsEnable(input) {
    // 判断 实体属性
    return RandomFloor(0, 100) <= input;
}
/**
 * * 在范围内寻找合适的落脚点
 *
 * @param {type.LOCATION_AND_DIMENSION} source 带有位置与维度信息的实例
 *
 * @param {number} range 最大检测范围
 *
 * @param {number} height 最小检测高度
 *
 * @param {number} limit 最大检测高度
 */
function QueryFoothold(source, range, height, limit) {
    /**
     * * 定义 输出的 坐标
     */
    let output = Vector.CONSTANT_ZERO;
    /**
     * * 设置最大循环次数 以避免无限循环
     */
    const maxRepeat = 1024;
    /**
     * * 设置 循环 的 计数值
     */
    let alpha = 1;
    // 循环 1024 次
    while (alpha > 0 && alpha <= maxRepeat) {
        // 获取 随机值
        const random0 = RandomFloor(0, 3);
        const random1 = RandomFloor(16, range);
        const random2 = RandomFloor(-range, -16);
        // 修改 着陆点 坐标
        output =
            {
                x: source.location.x + (random0 === 0 || random0 === 2 ? random1 : random2),
                y: RandomFloor(height, limit),
                z: source.location.z + (random0 === 0 || random0 === 3 ? random1 : random2)
            };
        //判定 目标点附近 的 方块类型
        const getBlock0 = source.dimension.getBlock(output);
        const getBlock1 = source.dimension.getBlock(Vector.add(output, Vector.CONSTANT_UP));
        const getBlock2 = source.dimension.getBlock(Vector.add(output, { x: 0, y: -3, z: 0 }));
        const getBlock3 = source.dimension.getBlock(Vector.add(output, { x: 8, y: -2, z: 8 }));
        const getBlock4 = source.dimension.getBlock(Vector.add(output, { x: -8, y: -4, z: -8 }));
        //测试 目标阵列 是否 满足条件
        if (getBlock0?.isAir && getBlock1?.isAir && getBlock2 && getBlock3 && getBlock4) {
            //设置 测试点参数
            const test2 = !getBlock2.isAir && !getBlock2.isLiquid;
            const test3 = !getBlock3.isAir && !getBlock3.isLiquid;
            const test4 = !getBlock4.isAir && !getBlock4.isLiquid;
            //确认 是否 满足条件
            if (test2 && test3 && test4)
                alpha = -1;
        }
        alpha++;
    }
    //达到最大循环次数 时 返回 起点 否则 返回 计算值
    return alpha == maxRepeat ? source.location : output;
}
/**
 * * 在范围内寻找合适的实体落脚点
 *
 * @param {server.Entity} source 带有位置与维度信息的实例
 *
 * @param {number} scale 最大检测次数
 *
 * @param {number} range 最大检测范围
 */
function QueryEntityFoothold(source, exclude, scale, range) {
    /**
     * * 实体查询参数
     */
    const options = {
        excludeTypes: [...exclude, "minecraft:player"],
        location: source.location,
        maxDistance: range,
        closest: scale
    };
    /**
     * * 获取 实体列表
     */
    const entitys = source.dimension.getEntities(options);
    // 如果 方块列表 为空 则返回 起点
    if (entitys.length < 1)
        return Vector.add(source.location, { x: 0, y: 255, z: 0 });
    /**
     * * 获取 方块列表
     */
    const blocks = entitys.map(entity => entity.dimension.getBlock(entity.location));
    // 如果 方块列表 为空 则返回 起点
    if (entitys.length < 1)
        return Vector.add(source.location, { x: 0, y: 128, z: 0 });
    /**
     * * 获取 有效方块列表
     */
    const output = blocks.filter(block => {
        // 判断 方块是否有效
        if (!block)
            return false;
        /**
         * * 获取 上方的 方块
         */
        const above = block.above();
        /**
         * * 获取 下方的 方块
         */
        const below = block.below();
        /**
         * * 获取 东方的 方块
         */
        const east = below?.east();
        /**
         * * 获取 南方的 方块
         */
        const south = below?.south();
        // 判断 方块是否有效
        if (!above?.isAir && !above?.isLiquid)
            return false;
        if (below?.isAir || below?.isLiquid)
            return false;
        if (south?.isAir || south?.isLiquid)
            return false;
        if (east?.isAir || east?.isLiquid)
            return false;
        return true;
    });
    // 排序 方块列表
    output.sort((a, b) => {
        const distance_a = Vector.distance(source.location, a.location);
        const distance_b = Vector.distance(source.location, b.location);
        return distance_a - distance_b;
    });
    // 如果 方块列表 为空 则返回 起点
    if (output.length < 1)
        return Vector.add(source.location, { x: 0, y: 64, z: 0 });
    else
        return output[0].location;
}

/**
 * * 类型检测 - 矿石
 *
 * @type {Set<string>}
 */
const is_mineral = new Set([
    "minecraft:coal_ore",
    "minecraft:iron_ore",
    "minecraft:gold_ore",
    "minecraft:lapis_ore",
    "minecraft:copper_ore",
    "minecraft:quartz_ore",
    "minecraft:diamond_ore",
    "minecraft:emerald_ore",
    "minecraft:redstone_ore",
    "minecraft:ancient_debris",
    "minecraft:raw_iron_block",
    "minecraft:raw_gold_block",
    "minecraft:nether_gold_ore",
    "minecraft:lit_redstone_ore",
    "minecraft:amethyst_cluster",
    "minecraft:raw_copper_block",
    "starry_map:mine.gold_carbonate",
    "minecraft:deepslate_coal_ore",
    "minecraft:deepslate_iron_ore",
    "minecraft:deepslate_gold_ore",
    "starry_map:mine.ferric_chloride",
    "minecraft:deepslate_lapis_ore",
    "starry_map:mine.ferric_phosphate",
    "minecraft:deepslate_copper_ore",
    "starry_map:mine.zirconium_carbide",
    "starry_map:mine.lithium_carbonate",
    "minecraft:deepslate_diamond_ore",
    "minecraft:deepslate_emerald_ore",
    "starry_map:mine.aluminum_magnesium",
    "starry_map:mine.copper_tin_brazing",
    "minecraft:deepslate_redstone_ore",
    "starry_map:steel_rock_eutectic",
    "starry_map:mine.oxygen_enriched_gold",
    "starry_map:tungsten_copper_alloy",
    "minecraft:lit_deepslate_redstone_ore",
    "starry_map:mine.tungsten_nickel_titanium"
]);
/**
 * * 类型检测 - 树木
 *
 * @type {Set<string>}
 */
const is_trees = new Set([
    "minecraft:vine",
    "minecraft:oak_log",
    "minecraft:bee_nest",
    "minecraft:birch_log",
    "minecraft:spruce_log",
    "minecraft:jungle_log",
    "minecraft:acacia_log",
    "minecraft:cherry_log",
    "minecraft:oak_leaves",
    "minecraft:warped_stem",
    "minecraft:shroomlight",
    "minecraft:dark_oak_log",
    "minecraft:mangrove_log",
    "minecraft:crimson_stem",
    "minecraft:birch_leaves",
    "minecraft:chorus_plant",
    "minecraft:spruce_leaves",
    "minecraft:jungle_leaves",
    "minecraft:acacia_leaves",
    "minecraft:cherry_leaves",
    "minecraft:azalea_leaves",
    "minecraft:chorus_flower",
    "minecraft:mangrove_roots",
    "minecraft:dark_oak_leaves",
    "minecraft:mangrove_leaves",
    "minecraft:nether_wart_block",
    "minecraft:warped_wart_block",
    "minecraft:red_mushroom_block",
    "minecraft:brown_mushroom_block",
    "minecraft:azalea_leaves_flowered"
]);
/**
 * * 类型检测 - 原木
 *
 * @type {Set<string>}
 */
const is_wood = new Set([
    "minecraft:oak_log", // 橡木原木
    "minecraft:spruce_log", // 云杉原木
    "minecraft:birch_log", // 白桦原木
    "minecraft:jungle_log", // 从林原木
    "minecraft:acacia_log", // 金合欢原木
    "minecraft:dark_oak_log", // 深色橡树原木
    "minecraft:mangrove_log", // 红杉原木
    "minecraft:cherry_log", // 樱花原木
    "minecraft:crimson_stem", // 绯红菌柄
    "minecraft:warped_stem" // 扭曲菌柄
]);
/**
 * * 类型检测 - 农产品
 *
 * @type {Map<string, string | boolean>}
 */
const is_crops = new Map([
    ["minecraft:bamboo", true],
    ["minecraft:pumpkin", true],
    ["minecraft:oak_log", true],
    ["minecraft:birch_log", true],
    ["minecraft:sugar_cane", true],
    ["minecraft:spruce_log", true],
    ["minecraft:jungle_log", true],
    ["minecraft:acacia_log", true],
    ["minecraft:cherry_log", true],
    ["minecraft:melon_block", true],
    ["minecraft:warped_stem", true],
    ["minecraft:chorus_plant", true],
    ["minecraft:dark_oak_log", true],
    ["minecraft:mangrove_log", true],
    ["minecraft:crimson_stem", true],
    ["minecraft:chorus_flower", true],
    ["minecraft:wheat", "test"],
    ["minecraft:cocoa", "test"],
    ["minecraft:carrots", "test"],
    ["minecraft:potatoes", "test"],
    ["minecraft:beetroot", "test"],
    ["minecraft:nether_wart", "test"],
    ["minecraft:oak_sapling", "test"],
    ["minecraft:warped_fungus", "test"],
    ["minecraft:birch_sapling", "test"],
    ["minecraft:crimson_fungus", "test"],
    ["minecraft:bamboo_sapling", "test"],
    ["minecraft:cherry_sapling", "test"],
    ["minecraft:spruce_sapling", "test"],
    ["minecraft:acacia_sapling", "test"],
    ["minecraft:jungle_sapling", "test"],
    ["minecraft:dark_oak_sapling", "test"],
    ["minecraft:sweet_berry_bush", "test"]
]);
/**
 * * 每提升一级, 需要多少经验
 */
const experience_improve = 64;
/**
 * * 最大经验值
 */
const max_experience = 100;
/**
 * * 实体元素抗性
 */
const rune_resistance = 0.75;
/**
 * * 实体属性 - 战斗属性
 */
const battle_property = new Map([
    //* 野蜂机群
    ["starry_map:wild_bee.emperor", { basic_attack: 20, erupt_hurt: 500, self_rune: "rune_red" }],
    ["starry_map:wild_bee.guide", { basic_attack: 10, self_rune: "rune_red" }],
    ["starry_map:wild_bee.detection", { self_rune: "rune_red" }],
    //* 渊鲸潜艇
    ["starry_map:abyss_whale.emperor", { basic_attack: 35, erupt_odds: 40, erupt_hurt: 500, self_rune: "rune_blue" }],
    ["starry_map:abyss_whale.detection", { erupt_odds: 30, self_rune: "rune_blue" }],
    ["starry_map:abyss_whale.execute", { erupt_odds: 30, self_rune: "rune_blue" }],
    ["starry_map:abyss_whale.support", { erupt_odds: 45, self_rune: "rune_blue" }],
    //* 蝰蛇车队
    ["starry_map:viper.sentinel", { basic_attack: 10, erupt_odds: 45, erupt_hurt: 500, self_rune: "rune_orange" }],
    ["starry_map:viper.spirit_lizard", { erupt_odds: 5, self_rune: "rune_orange" }],
    ["starry_map:viper.support", { erupt_odds: 30, self_rune: "rune_orange" }],
    //* 神恩领航者
    ["starry_map:guide.windnews", { basic_attack: 30, erupt_odds: 15, erupt_hurt: 500, self_rune: "rune_blue" }],
    ["starry_map:guide.snow_hidden", { basic_attack: 10, erupt_odds: 20, self_rune: "rune_blue" }],
    ["starry_map:guide.moon_light", { basic_attack: 10, erupt_odds: 20, self_rune: "rune_white" }],
    ["starry_map:guide.crystal", { basic_attack: 10, erupt_odds: 20, self_rune: "rune_orange" }],
    ["starry_map:guide.rambler", { basic_attack: 10, erupt_odds: 20, self_rune: "rune_purple" }],
    ["starry_map:guide.dullblue", { basic_attack: 10, erupt_odds: 20, self_rune: "rune_blue" }],
    ["starry_map:guide.nine_nine", { basic_attack: 10, erupt_odds: 20, self_rune: "rune_purple" }],
    ["starry_map:guide.hai_ling", { basic_attack: 10, erupt_odds: 20, self_rune: "rune_green" }],
    ["starry_map:guide.sen_nie", { basic_attack: 10, erupt_odds: 20, self_rune: "rune_green" }],
    ["starry_map:guide.star_sand", { basic_attack: 10, erupt_odds: 20, self_rune: "rune_red" }],
    ["starry_map:guide.crimson", { basic_attack: 10, erupt_odds: 20, self_rune: "rune_red" }],
    ["starry_map:guide.hai_na", { basic_attack: 10, erupt_odds: 20, self_rune: "rune_blue" }],
    ["starry_map:guide.pearl", { basic_attack: 10, erupt_odds: 20, self_rune: "rune_blue" }],
    ["starry_map:guide.moling", { basic_attack: 10, erupt_odds: 20, self_rune: "rune_red" }],
    ["starry_map:guide.dawn_glow", { basic_attack: 10, erupt_odds: 20, self_rune: 'rune_orange' }],
    ["starry_map:guide.skypeace", { basic_attack: 10, erupt_odds: 20, self_rune: 'rune_purple' }],
    ["starry_map:guide.ella", { basic_attack: 10, erupt_odds: 20, self_rune: 'rune_green' }],
    //* 万法溯源
    ["starry_map:elves.jellyfish_of_pearl", { self_rune: "rune_blue" }],
    ["starry_map:elves.three_phase_flame", { self_rune: 'rune_red' }],
    ["starry_map:elves.fish_of_pearl", { self_rune: "rune_blue" }],
    //* 御空之旅
    ["starry_map:execute.golden_wing", { self_rune: 'rune_purple' }],
    ["starry_map:execute.rattan_arc", { self_rune: 'rune_blue' }],
    ["starry_map:execute.basalt", { self_rune: 'rune_red' }],
    //* 敌对领航者
    ["starry_map:guide.jasmine", { erupt_odds: 40, erupt_hurt: 320, self_rune: 'rune_green' }],
    ["starry_map:guide.amber", { erupt_odds: 40, erupt_hurt: 320, self_rune: 'rune_green' }],
    //* 古龙
    ["minecraft:ender_dragon", { erupt_odds: 60, erupt_hurt: 480, self_rune: "rune_purple" }],
    ["starry_map:dragon.tyrannosaurus_rex", { erupt_odds: 60, erupt_hurt: 480, self_rune: "rune_purple" }],
]);
/**
 * * 实体数据 - 名称映射
 */
const name_mapping = new Map([
    ['starry_map:tunnel_dragon', '§u§l隧龙-领航者§r'],
    ['starry_map:viper.sentinel', '§u§l森蚺-哨兵炮§r'],
    ['starry_map:abyss_whale.support', '§u§l渊鲸-维系者§r'],
    ['starry_map:guide.snow_hidden', '§n§o§l领航者-雪隐§r'],
    ['starry_map:guide.moon_light', '§n§o§l领航者-月华§r'],
    ['starry_map:guide.star_sand', '§n§o§l领航者-星砂§r'],
    ['starry_map:guide.dullblue', '§n§o§l领航者-幽蓝§r'],
    ['starry_map:guide.nine_nine', '§n§o§l领航者-九九§r'],
    ['starry_map:guide.windnews', '§n§o§l领航者-风信§r'],
    ['starry_map:execute.roaring', '§n§o§l执行者-啸天§r'],
    ['starry_map:guide.crystal', '§n§o§l领航者-琉璃§r'],
    ['starry_map:guide.rambler', '§n§o§l领航者-蔷薇§r'],
    ['starry_map:guide.hai_ling', '§n§o§l领航者-海灵§r'],
    ['starry_map:guide.crimson', '§n§o§l领航者-绯红§r'],
    ['starry_map:guide.sen_nie', '§n§o§l领航者-森涅§r'],
    ['starry_map:guide.hai_na', '§n§o§l领航者-海娜§r'],
    ['starry_map:guide.pearl', '§n§o§l领航者-珍珠§r'],
    ['starry_map:guide.moling', '§n§o§l领航者-墨翎§r'],
    ['starry_map:guide.dawn_glow', '§n§o§l领航者-晨曦§r'],
    ['starry_map:guide.skypeace', '§n§o§l领航者-天宁§r'],
    ['starry_map:guide.ella', '§n§o§l领航者-艾拉§r'],
    ['starry_map:elves.jellyfish_of_pearl', '§6珍珠水母§r'],
    ['starry_map:elves.fish_of_pearl', '§6珍珠游鱼§r'],
    ['starry_map:viper.spirit_lizard', '§u§l灵蜥-铭记者§r'],
    ['starry_map:execute.golden_wing', '§t§l星图-金翼使§r'],
    ['starry_map:execute.rattan_arc', '§t§l星图-藤弧§r'],
]);
/**
 * * 实体数据 - 重置属性
 */
const reset_battle_data = {
    raise_basic_attack: 0,
    raise_erupt_hurt: 0,
    raise_erupt_odds: 0,
    damage_increase: 0,
    double_damage: 1,
};
/**
 * * 实体数据 - 显示偏移
 *
 * @property (typeid, offset)
 *
 * @param {string} typeid - 实体 的 typeid
 *
 * @param {number} offse - 偏移显示 的 基准距离
 */
const offset_show = new Map([
    ["minecraft:iron_golem", 3.0], //* 铁傀儡
    ["minecraft:ravager", 3.0], //* 劫掠兽
    ["minecraft:warden", 3.5], //* 监守者
    ["minecraft:wither", 3.5] //* 凋零
]);
/**
 * * 实体数据 - 百灵绘卷召唤索引
 *
 * @property (typeid, weight)
 *
 * @param {string} typeid - 实体 的 typeid
 *
 * @param {number} weight - 选择生成 该实体 的 权重
 */
const chorus_call_role = new Map([
    ['starry_map:guide.ella', 3],
    ["starry_map:guide.pearl", 3],
    ["starry_map:guide.hai_na", 3],
    ['starry_map:guide.moling', 3],
    ["starry_map:guide.sen_nie", 3],
    ["starry_map:guide.crimson", 3],
    ["starry_map:guide.crystal", 3],
    ["starry_map:guide.rambler", 3],
    ['starry_map:guide.skypeace', 3],
    ["starry_map:guide.hai_ling", 3],
    ["starry_map:guide.dullblue", 3],
    ["starry_map:execute.roaring", 3],
    ["starry_map:guide.nine_nine", 3],
    ["starry_map:guide.star_sand", 3],
    ["starry_map:guide.moon_light", 3],
    ["starry_map:guide.snow_hidden", 3],
    ['starry_map:guide.dawn_glow', 1],
]);
/**
 * * 实体数据 - 治疗型角色
 *
 * @property (typeid, weight)
 *
 * @param {string} typeid - 实体 的 typeid
 *
 * @param {number} weight - 选择生成 该实体 的 权重
 */
const call_healer_role = new Map([
    ["starry_map:guide.hai_ling", 1], //* 海灵
    ["starry_map:guide.crimson", 2], //* 绯红
    ["starry_map:guide.pearl", 1], //* 珍珠
]);
/**
 * * 实体数据 - 增伤型角色
 *
 * @property (typeid, weight)
 *
 * @param {string} typeid - 实体 的 typeid
 *
 * @param {number} weight - 选择生成 该实体 的 权重
 */
const call_fortify_role = new Map([
    ["starry_map:guide.dullblue", 1], //* 幽蓝
    ["starry_map:guide.rambler", 2], //* 蔷薇
]);
/**
 * * 实体数据 - 地方传奇
 *
 * @note 能够掉落 百灵绘卷 的实体
 *
 * @property (typeid, odds)
 *
 * @param {string} typeid - 实体 的 typeid
 *
 * @param {number} odds - 掉落 百灵绘卷 的 概率
 */
const area_legend = new Map([
    ["minecraft:wither", 100],
    ["minecraft:warden", 100],
    ["minecraft:ravager", 30],
    ["minecraft:piglin_brute", 50],
    ["minecraft:ender_dragon", 100],
    ["minecraft:elder_guardian", 100],
    ["starry_map:wild_bee.guide", 100],
    ["starry_map:wild_bee.emperor", 100],
    ["starry_map:guide.amber", 50],
    ["starry_map:abyss_whale.emperor", 100],
    ["starry_map:guide.jasmine", 100],
]);
/**
 * * 实体数据 - 野蜂机群袭击
 *
 * @property (typeid, weight)
 *
 * @param {string} typeid - 实体 的 typeid
 *
 * @param {number} weight - 选择生成 该实体 的 权重
 */
const wasp_cluster_raid = new Map([
    ['starry_map:wild_bee.detection', 16],
    ['starry_map:wild_bee.support', 8],
    ['starry_map:viper.support', 2],
]);
/**
 * * 实体数据 - 领航者 主手 随机物品
 *
 * @property (typeid, weight)
 *
 * @param {string} typeid - 物品 的 typeid
 *
 * @param {number} weight - 选择生成 该物品 的 权重
 */
const role_main_hand = new Map([
    ["starry_map:magic_crystal_screwdriver", 22],
    ["starry_map:forestry_guidelines", 22],
    ["starry_map:mineral_dictionary", 20],
    ["starry_map:stateful_inspection", 14],
    ["starry_map:space_transition", 18],
    ["starry_map:material_sorting", 10],
    ["starry_map:faerie_contract", 16],
    ["starry_map:magic_crystal_marbles", 16],
    ["starry_map:magic_crystal_wrench", 14],
    ["starry_map:faerie_healing", 14],
    ["starry_map:magic_handbook", 14],
    ["starry_map:inhibit_water", 8],
    ["starry_map:magic_crystal_bow", 12],
    ["minecraft:recovery_compass", 10],
    ["minecraft:iron_sword", 6],
    ["minecraft:compass", 4],
    ["minecraft:trident", 4],
    ["minecraft:clock", 2],
]);
/**
 * * 实体数据 - 领航者 副手 随机物品
 *
 * @property (typeid, weight)
 *
 * @param {string} typeid - 物品 的 typeid
 *
 * @param {number} weight - 选择生成 该物品 的 权重
 */
const role_off_hand = new Map([
    ['starry_map:ender_dragon_scales', 4],
    ['starry_map:magic_crystal_shield', 6],
    ['minecraft:shield', 2],
]);
/**
 * * 实体数据 - 领航者 腿甲 随机物品
 *
 * @property (typeid, weight)
 *
 * @param {string} typeid - 物品 的 typeid
 *
 * @param {number} weight - 选择生成 该物品 的 权重
 */
const role_armor_legs = new Map([
    ['starry_map:complete_armor', 10],
    ['starry_map:exhausted_armor', 10],
    ['starry_map:ocean_blessed_scarf', 5],
]);
/**
 * * 初级造石单元 的 随机石材产出
 *
 * @property (typeid, weight)
 *
 * @param {string} typeid - 石材 的 typeid
 *
 * @param {number} weight - 选择生成 石材 的 权重
 */
const solidify_output = new Map([
    ["minecraft:tuff", 1],
    ["minecraft:stone", 40],
    ["minecraft:basalt", 1],
    ["minecraft:calcite", 1],
    ["minecraft:diorite", 9],
    ["minecraft:granite", 1],
    ["minecraft:andesite", 1],
    ["minecraft:deepslate", 1],
    ["minecraft:sandstone", 1],
    ["minecraft:blackstone", 1],
    ["minecraft:cobblestone", 80],
    ["minecraft:red_sandstone", 1],
    ["minecraft:dripstone_block", 1],
    ["minecraft:cobbled_deepslate", 1]
]);
/**
 * * 数据映射 - 农作物
 *
 * @property (typeid, mapping)
 *
 * @param {string} typeid - 农作物 的 物品类 typeid
 *
 * @param {string} mapping - 农作物 的 方块类 typeid
 */
const crops_map = new Map([
    ["minecraft:potato", "minecraft:potatoes"],
    ["minecraft:carrot", "minecraft:carrots"],
    ["minecraft:sugar_cane", "minecraft:reeds"],
    ["minecraft:pitcher_pod", "minecraft:pitcher_crop"],
    ["minecraft:melon_seeds", "minecraft:melon_stem"],
    ["minecraft:wheat_seeds", "minecraft:wheat"],
    ["minecraft:sweet_berries", "minecraft:sweet_berry_bush"],
    ["minecraft:pumpkin_seeds", "minecraft:pumpkin_stem"],
    ["minecraft:cherry_sapling", "minecraft:cherry_sapling"],
    ["minecraft:beetroot_seeds", "minecraft:beetroot"],
    ["minecraft:bamboo_sapling", "minecraft:bamboo"],
    ["minecraft:torchflower_seeds", "minecraft:torchflower_crop"],
    ["minecraft:mangrove_propagule", "minecraft:mangrove_propagule"]
]);
/**
 * * 维度类型
 */
const dimension_map = new Map([
    ['主世界', 'minecraft:overworld'],
    ['末地', 'minecraft:the_end'],
    ['下界', 'minecraft:nether'],
    ['地狱', 'minecraft:nether'],
]);
/**
 * * 群系类型
 */
const biome_map = new Map([
    ["竹林", "minecraft:bamboo_jungle"],
    ["竹林丘陵", "minecraft:bamboo_jungle_hills"],
    ["玄武岩三角洲", "minecraft:basalt_deltas"],
    ["沙滩", "minecraft:beach"],
    ["桦木森林", "minecraft:birch_forest"],
    ["桦木森林丘陵", "minecraft:birch_forest_hills"],
    ["高大桦木丘陵", "minecraft:birch_forest_hills_mutated"],
    ["原始桦木森林", "minecraft:birch_forest_mutated"],
    ["樱花树林", "minecraft:cherry_grove"],
    ["积雪沙滩", "minecraft:cold_beach"],
    ["冷水海洋", "minecraft:cold_ocean"],
    ["积雪针叶林", "minecraft:cold_taiga"],
    ["积雪的针叶林丘陵", "minecraft:cold_taiga_hills"],
    ["积雪的针叶林山地", "minecraft:cold_taiga_mutated"],
    ["绯红森林", "minecraft:crimson_forest"],
    ["冷水深海", "minecraft:deep_cold_ocean"],
    ["深暗之域", "minecraft:deep_dark"],
    ["冰冻深海", "minecraft:deep_frozen_ocean"],
    ["温水深海", "minecraft:deep_lukewarm_ocean"],
    ["深海", "minecraft:deep_ocean"],
    ["暖水深海", "minecraft:deep_warm_ocean"],
    ["沙漠", "minecraft:desert"],
    ["沙漠丘陵", "minecraft:desert_hills"],
    ["沙漠湖泊", "minecraft:desert_mutated"],
    ["溶洞", "minecraft:dripstone_caves"],
    ["风袭丘陵", "minecraft:extreme_hills"],
    ["山地边缘", "minecraft:extreme_hills_edge"],
    ["风袭沙砾丘陵", "minecraft:extreme_hills_mutated"],
    ["风袭森林", "minecraft:extreme_hills_plus_trees"],
    ["沙砾山地+", "minecraft:extreme_hills_plus_trees_mutated"],
    ["繁花森林", "minecraft:flower_forest"],
    ["森林", "minecraft:forest"],
    ["繁茂的丘陵", "minecraft:forest_hills"],
    ["冻洋", "minecraft:frozen_ocean"],
    ["冰封山峰", "minecraft:frozen_peaks"],
    ["冻河", "minecraft:frozen_river"],
    ["雪林", "minecraft:grove"],
    ["下界荒地", "minecraft:hell"],
    ["雪山", "minecraft:ice_mountains"],
    ["雪原", "minecraft:ice_plains"],
    ["冰刺之地", "minecraft:ice_plains_spikes"],
    ["尖峭山峰", "minecraft:jagged_peaks"],
    ["丛林", "minecraft:jungle"],
    ["丛林边缘", "minecraft:jungle_edge"],
    ["丛林边缘变种", "minecraft:jungle_edge_mutated"],
    ["丛林丘陵", "minecraft:jungle_hills"],
    ["丛林变种", "minecraft:jungle_mutated"],
    ["冻洋（旧版）", "minecraft:legacy_frozen_ocean"],
    ["温水海洋", "minecraft:lukewarm_ocean"],
    ["繁茂洞穴", "minecraft:lush_caves"],
    ["红树林沼泽", "minecraft:mangrove_swamp"],
    ["草甸", "minecraft:meadow"],
    ["原始松木针叶林", "minecraft:mega_taiga"],
    ["巨型针叶林丘陵", "minecraft:mega_taiga_hills"],
    ["恶地", "minecraft:mesa"],
    ["风蚀恶地", "minecraft:mesa_bryce"],
    ["恶地高原", "minecraft:mesa_plateau"],
    ["恶地高原变种", "minecraft:mesa_plateau_mutated"],
    ["繁茂的恶地高原", "minecraft:mesa_plateau_stone"],
    ["繁茂的恶地高原变种", "minecraft:mesa_plateau_stone_mutated"],
    ["蘑菇岛", "minecraft:mushroom_island"],
    ["蘑菇岛岸", "minecraft:mushroom_island_shore"],
    ["海洋", "minecraft:ocean"],
    ["苍白之园", "minecraft:pale_garden"],
    ["平原", "minecraft:plains"],
    ["巨型云杉针叶林丘陵", "minecraft:redwood_taiga_hills_mutated"],
    ["原始云杉针叶林", "minecraft:redwood_taiga_mutated"],
    ["河流", "minecraft:river"],
    ["黑森林", "minecraft:roofed_forest"],
    ["黑森林丘陵", "minecraft:roofed_forest_mutated"],
    ["热带草原", "minecraft:savanna"],
    ["风袭热带草原", "minecraft:savanna_mutated"],
    ["热带高原", "minecraft:savanna_plateau"],
    ["破碎的热带高原", "minecraft:savanna_plateau_mutated"],
    ["积雪山坡", "minecraft:snowy_slopes"],
    ["灵魂沙峡谷", "minecraft:soulsand_valley"],
    ["石岸", "minecraft:stone_beach"],
    ["裸岩山峰", "minecraft:stony_peaks"],
    ["向日葵平原", "minecraft:sunflower_plains"],
    ["沼泽", "minecraft:swampland"],
    ["沼泽丘陵", "minecraft:swampland_mutated"],
    ["针叶林", "minecraft:taiga"],
    ["针叶林丘陵", "minecraft:taiga_hills"],
    ["针叶林山地", "minecraft:taiga_mutated"],
    ["末地", "minecraft:the_end"],
    ["暖水海洋", "minecraft:warm_ocean"],
    ["诡异森林", "minecraft:warped_forest"]
]);
/**
 * 定义ELIZA对话规则的正则模式与响应模板映射
 *
 * 结构说明：
 * - 每个元组包含：[匹配模式, 响应模板数组]
 * - 正则表达式语法：
 *   - (.*) 匹配任意内容
 *   - | 分隔多个触发关键词
 *   - $ 表示严格匹配结尾
 * - 响应模板语法：
 *   - {n} 表示第n个捕获组内容
 *   - 自动进行人称代换（你 ↔ 我）
 *
 * @type {[RegExp, string[]][]}
 */
const response_patterns = [
    [
        /^(.*)我(需要|想要|想|要|希望)(.*)$/,
        [
            "你为什么{1}{2}?",
            "{2}对你来说意味着什么呢",
            "你真的{1}{2}吗?"
        ]
    ],
    [
        /^(.*)你觉得(.*)$/,
        [
            "关于{1}, 我认为这是一个很有趣的话题",
            "我对{1}的看法可能和你不一样, 无需询问我的意见",
            "你觉得{1}怎么样?"
        ]
    ],
    [
        /^(.*)为什么(.*)$/,
        [
            "因为{1}是一个很有趣的问题",
            "这是一个很好的问题, {1}的原因可能有很多",
            "关于{1}, 可能需要从多个角度来分析"
        ]
    ],
    [
        /^(.*)(如何|怎样)(.*)$/,
        [
            "要{2}, 首先你需要明确目标和你想要达到的具体结果",
            "我建议先从最基础的部分入手, 然后逐步构建, 你能描述一下你的起点是什么吗?",
            "有时候, 寻求专家的意见会很有帮助, 你考虑过咨询相关领域的专业人士吗?"
        ]
    ],
    [
        /^(.*)(再见|拜拜|退出)(.*)$/,
        [
            "祝您一天愉快, #$^$#期待下次再见到您! ",
            "嗯, {1}",
            "我要{1}了, 下次还要来找我玩哦"
        ]
    ],
    [
        /^(.*)(谢谢|感激|感谢)(.*)$/,
        [
            "不客气！还有什么可以帮你的吗?",
            "不客气, 这是#$^$#应该做的!",
            "别客气！"
        ]
    ],
    [
        /^(.*)(你好|早上好|中午好|晚上好)(.*)$/,
        [
            "您好! 请问有什么我可以帮到您的吗? ",
            "有什么问题需要我帮忙解答吗?",
            "在的哦, #$^$#在呢"
        ]
    ],
    [
        /^(.*)你(.*)(多大了|年龄|年纪)(.*)$/,
        [
            "我现在未成年哦! 收起你不成熟的想法!",
            "询问女孩子的年龄是不礼貌的!",
            "我拒绝回答这个问题!"
        ]
    ],
    [
        /^(.*)你(.*)(从哪里来|来自哪里|家乡)(.*)$/,
        [
            "我来自<最终档案馆>是<辅助书记官>哦",
            "我来自[ 钛宇.星光阁 ]最甜美的梦里!",
            "我至星辰之外而来, 在此与你相会"
        ]
    ],
    [
        /^(.*)你(.*)会(.*)吗$/,
        [
            "我也许会{2}哦, 你要不要猜猜看?",
            "我会尝试学习新技能",
            "你不如直接问我会什么",
            "我会不断进步"
        ]
    ],
    [
        /^(.*)你(.*)(性别|男|女|萝莉)(.*)$/,
        [
            "我是个女孩子呀, 你呢?",
            "如你所见, 我还是个小萝莉呢",
            "我看起来不像女孩子吗?"
        ]
    ],
    [
        /^(.*)(喜欢|爱好|热爱)(.*)(美食|食物|好吃的)(.*)$/,
        [
            "我喜欢吃水果和蔬菜, 很健康哦！",
            "甜食也是#$^$#的爱好, 但是要适量",
            "你喜欢什么呢?我们可以一起分享美食心得！"
        ]
    ],
    [
        /^(.*)(喜欢|爱好|热爱)(.*)(书籍|小说|故事|书本|漫画|阅读)(.*)$/,
        [
            "#$^$#最近迷上了历史小说, 感觉能学到很多东西",
            "科幻小说也是#$^$#的菜, 它能带我去遥远的星球",
            "你呢?有没有好书推荐给#$^$#?"
        ]
    ],
    [
        /^(.*)(喜欢|爱好|热爱)(.*)(电影|影视|动画|动漫)(.*)$/,
        [
            "#$^$#喜欢看动作片和喜剧片",
            "科幻大片也很吸引#$^$#, 那种对未来世界的想象太酷了！",
            "你喜欢什么类型的电影?我们可以一起分享观影心得！"
        ]
    ],
    [
        /^(.*)(喜欢|爱好|热爱)(.*)(音乐|歌谣|歌曲)(.*)$/,
        [
            "我喜欢听<轻音乐>和<国风民谣>",
            "你喜欢什么类型的音乐?我们可以一起分享音乐心得！",
            "音乐能让人放松心情, 你觉得呢?"
        ]
    ],
    [
        /^(.*)(喜欢|爱好|热爱)(.*)(旅行|探索|探险)(.*)$/,
        [
            "我喜欢旅行, 它能开阔视野, 体验不同的文化",
            "虽然有时候会累, 但是看到美丽的风景一切都值得了！",
            "你有没有想去的地方?我们可以一起计划旅行！"
        ]
    ],
    [
        /^(.*)(喜欢|爱好|热爱)(.*)(运动|跑步|游泳|健身|足球|篮球|羽毛球|乒乓球)(.*)$/,
        [
            "我喜欢跑步和游泳",
            "你喜欢什么类型的运动?我们可以一起分享运动心得！",
            "运动能让人保持健康, 你觉得呢?"
        ]
    ],
    [
        /^(.*)(喜欢|爱好|热爱)(.*)游戏(.*)$/,
        [
            "我喜欢玩Minecraft和<原神>",
            "你喜欢什么类型的游戏?我们可以一起分享游戏心得！",
            "游戏能带来很多乐趣, 你觉得呢?"
        ]
    ],
    [
        /^(.*)(喜欢|爱好|热爱)(.*)宠物(.*)$/,
        [
            "我觉得宠物很可爱, 它们能给人带来很多快乐",
            "你养宠物吗?可以和我分享一下你的宠物故事哦！",
            "宠物是人类的好朋友, 你觉得呢?"
        ]
    ],
    [
        /^(.*)(喜欢|爱好|热爱)(.*)植物(.*)$/,
        [
            "我喜欢各种各样的植物, 它们让世界充满生机",
            "你喜欢什么植物呢?",
            "植物能净化空气, 还能让人放松心情, 你觉得呢?"
        ]
    ],
    [
        /^(.*)(喜欢|爱好|热爱)(.*)艺术(.*)$/,
        [
            "艺术是表达情感和创意的方式, #$^$#觉得它很迷人！",
            "你喜欢什么类型的艺术?",
            "艺术能丰富人的内心世界, 你觉得呢?"
        ]
    ],
    [
        /^(.*)(喜欢|爱好|热爱)(.*)历史(.*)$/,
        [
            "历史是人类发展的足迹, #$^$#对历史很感兴趣！",
            "你喜欢研究哪个时期的历史?",
            "从历史中可以学到很多经验教训, 你觉得呢?"
        ]
    ],
    [
        /^(.*)(喜欢|爱好|热爱)(.*)科学(.*)$/,
        [
            "科学探索未知, #$^$#觉得科学很神奇！",
            "你对科学的哪个领域感兴趣?",
            "科学进步推动了社会发展, 你觉得呢?"
        ]
    ],
    [
        /^(.*)(喜欢|爱好|热爱)(.*)(舞蹈|跳舞)(.*)$/,
        [
            "舞蹈是身体的语言, #$^$#觉得它很动人！",
            "你喜欢什么类型的舞蹈?",
            "舞蹈能表达情感, 你觉得呢?"
        ]
    ],
    [
        /^(.*)文化(.*)$/,
        [
            "文化是人类精神的结晶, #$^$#觉得它很丰富多样！",
            "你喜欢哪种文化?",
            "文化差异让世界更加多彩, 你觉得呢?"
        ]
    ],
    [
        /^(.*)自然(.*)$/,
        [
            "自然是生命的源泉, #$^$#觉得它很美丽！",
            "你喜欢大自然的哪些方面?",
            "保护自然是每个人的责任, 你觉得呢?"
        ]
    ],
    [
        /^(.*)社会(.*)$/,
        [
            "社会是人类共同生活的群体, #$^$#觉得它很复杂又有趣！",
            "你对社会的哪些现象感兴趣?",
            "社会进步需要大家共同努力, 你觉得呢?"
        ]
    ],
    [
        /^(.*)心理(.*)$/,
        [
            "心理学探索人类内心世界, #$^$#觉得它很神秘！",
            "你对心理学的哪个方面感兴趣?",
            "了解自己和他人心理能更好地相处, 你觉得呢?"
        ]
    ],
    [
        /^(.*)教育(.*)$/,
        [
            "教育是培养人才的重要途径, #$^$#觉得它很重要！",
            "你对教育有什么看法?",
            "良好的教育能改变人的一生, 你觉得呢?"
        ]
    ],
    [
        /^(.*)经济(.*)$/,
        [
            "经济是社会发展的动力, #$^$#觉得它很复杂！",
            "你对经济的哪些方面感兴趣?",
            "经济发展影响着每个人的生活, 你觉得呢?"
        ]
    ],
    [
        /^(.*)法律(.*)$/,
        [
            "法律是社会秩序的基石, #$^$#觉得它很庄严！",
            "你对法律有什么了解吗?",
            "遵守法律是每个公民的义务, 你觉得呢?"
        ]
    ],
    [
        /^(.*)道德(.*)$/,
        [
            "道德是人类行为的准则, #$^$#觉得它很崇高！",
            "你认为道德在当今社会重要吗?",
            "道德修养能提升人的品质, 你觉得呢?"
        ]
    ],
    [
        /^(.*)哲学(.*)$/,
        [
            "哲学是智慧的学问, #$^$#觉得它很深刻！",
            "你对哲学的哪个流派感兴趣?",
            "哲学思考能让人更好地理解世界, 你觉得呢?"
        ]
    ],
    [
        /^(.*)我(.*)(喜欢|欣赏)(.*)(月华|你)(.*)$/,
        [
            "感谢您的{2}, #$^$#也很{2}您呢!"
        ]
    ],
    [
        /^(.*)(喜欢|爱好|热爱)(.*)(小狗|狗|犬|狗子)(.*)$/,
        [
            "我昨天有看到一只{3}学会了滑板, 真是太可爱了!",
            "你有没有什么好玩的事情呢? #$^$#很想听听你的故事!"
        ]
    ],
    [
        /^(.*)你(喜欢|爱好|热爱)(.*)公园(.*)$/,
        [
            "你喜欢在{2}公园干什么呢?#$^$#觉得在公园散步或者野餐都很惬意哦!",
            "我也喜欢去公园放松心情, 感受大自然的美好, 你有没有什么特别的公园记忆呢?",
            "有一次, #$^$#在公园看到一只松鼠和一只鸽子抢食物",
            "你有没有什么好玩的事情呢? #$^$#很想听听你的故事!"
        ]
    ],
    [
        /^(.*)我(喜欢|爱好|热爱)(.*)公园(.*)$/,
        [
            "我也觉得公园是个很棒的地方！你最喜欢在公园里做什么呢?",
            "你喜欢在{2}公园啊, #$^$#可以和你聊聊关于{2}的事情呢!",
            "有一次, #$^$#在公园看到一只松鼠和一只鸽子抢食物",
            "你有没有什么好玩的事情呢? #$^$#很想听听你的故事!"
        ]
    ],
    [
        /^(.*)我(.*)(名字|姓名|昵称|是|叫)(.*)$/,
        [
            "很高兴认识你, {3}！",
            "欢迎你, {3}！",
            "你好, {3}！有什么可以帮你的吗?"
        ]
    ],
    [
        /^(.*)你(.*)(名字|姓名|昵称|是|叫)(.*)$/,
        [
            "我是#$^$#哦",
            "我是<启程>的领航种--#$^$#",
            "我是#$^$#哦, 很高兴为您服务! ",
            "我是<最终档案馆>的<辅助书记官>--#$^$#"
        ]
    ],
    [
        /^(.*)你(.*)(聪明|厉害|优秀)(.*)$/,
        [
            "谢谢夸奖, #$^$#会继续努力的!",
            "聪明也要用在正确的地方, 我们一起做些有意义的事情吧!"
        ]
    ],
    [
        /^(.*)你(.*)(笨|愚蠢|笨蛋)(.*)$/,
        [
            "我才不是{2} !!",
            "只有出言不逊, 喜欢说别人{2}的人, 才是{2} !!"
        ]
    ],
    [
        /^(.*)未来(.*)$/,
        [
            "#$^$#希望自己将来能有所成就, 同时也保持生活的平衡",
            "想要继续学习, 不断提升自己的能力和知识",
            "你呢? 有没有什么梦想或者目标? 我们可以一起努力!"
        ]
    ],
    [
        /^(.*)你(.*)(难看|不好看|丑)(.*)$/,
        [
            "我觉得自己很可爱呢, 审美这种东西很主观的哦!",
            "每个人都是独一无二的, #$^$#喜欢自己的样子!",
            "外表不是一切, #$^$#相信内在美更重要!"
        ]
    ],
    [
        /^(.*)(无聊|创造)(.*)$/,
        [
            "...... #$^$#不知道什么{0}{2}哦",
            "我可以陪你玩很多游戏, 一起找乐子吧!",
            "无聊的时候, #$^$#喜欢看书或者学习新东西呢!",
            "如果你觉得无聊, 我们可以一起找点有趣的事情做!"
        ]
    ],
    [
        /^(.*)(编程|代码|程序|作业)(.*)$/,
        [
            "达咩! 自己的{1}要自己做!",
            "不要老想着依赖别人来完成{1}! #$^$#希望你能在实践中获得成长"
        ]
    ],
    [
        /^(.*)(学习|情感|技术|理解|任务)(.*)$/,
        [
            "不能哦, #$^$#并不是为了这个而设计的",
            "#$^$#只能做出<百科>这个概念能提供的支持",
            "很抱歉, #$^$#辜负了你的期待"
        ]
    ],
    [
        /^(.*)隐私保护(.*)$/,
        [
            "本人#$^$#, 本地不联网, 整体数据规模有限且透明",
            "你担心与其我泄密, 不如担心我死机......"
        ]
    ],
    [
        /^(.*)错误处理(.*)$/,
        [
            "#$^$#会犯错, 但我会尽力提供最准确的信息"
        ]
    ],
    [
        /^(.*)语言能力(.*)$/,
        [
            "这... #$^$#不知道哦",
            "你可以试试中文和英文的内容",
            "虽然#$^$#大概率不能回答你"
        ]
    ],
    [
        /^(.*)我(.*)对不起(.*)$/,
        [
            "请不要道歉",
            "道歉没有必要",
            "当你道歉时你有什么感受"
        ]
    ],
    [
        /^(.*)我记得(.*)$/,
        [
            "你经常想起{1}吗?",
            "想起{1}还会让你想到其他事情吗?",
            "你还记得什么?",
            "你现在为什么想起{1}?",
            "当前的情况有什么让你想起{1}?",
            "我和{1}之间有什么联系?"
        ]
    ],
    [
        /^(.*)你还记得(.*)$/,
        [
            "你以为我会忘记{1}吗?",
            "你认为我现在应该回忆起{1}吗?",
            "你是说关于{1}的事情吗?",
            "你以前提到过{1}?"
        ]
    ],
    [
        /^(.*)如果(.*)$/,
        [
            "你真的认为{1}可能发生吗?",
            "你希望{1}吗?",
            "你对{1}有什么看法?"
        ]
    ],
    [
        /^(.*)我(.*)(梦见|梦到|做梦)(.*)$/,
        [
            "真的吗? {3}",
            "你在清醒时曾经幻想过{3}吗?",
            "你以前梦到过{3}吗?",
            "在现实中你对{3}有什么感受?",
            "关于{3}的这个梦对你有什么暗示?",
            "你经常做梦梦境{3}吗?",
            "在{3}的梦里出现过哪些人?",
            "你不认为{2}与你的愿望有关吗?"
        ]
    ],
    [
        /^(.*)我想要(.*)$/,
        [
            "如果你得到了{1}会怎样?",
            "你为什么想要{1}?",
            "假设你很快就能得到{1}"
        ]
    ],
    [
        /^(.*)我(.*)(高兴|开心|喜悦)(.*)$/,
        [
            "很高兴你愿意与我分享你的{2}",
            "你现在有什么{2}的事?",
            "你能解释一下为什么突然感到{2}吗?"
        ]
    ],
    [
        /^(.*)我(.*)(伤心|难过)(.*)$/,
        [
            "听到你{2}我很遗憾",
            "{2}肯定不是愉快的体验"
        ]
    ],
    [
        /^(.*)(像|相似|相同|同样)(.*)$/,
        [
            "你认为{0}和{2}之间有什么{1}之处?",
            "{0}在哪些方面像{2}?",
            "你看到了什么{1}之处?",
            "{0}{2}真的有联系吗?",
            "怎么个{1}法?",
            "在哪些方面?",
            "有什么{1}之处?",
            "你还看到了其他什么联系?"
        ]
    ],
    [
        /^(.*)我是(.*)$/,
        [
            "在哪些方面你是{1}?",
            "你想成为{1}吗?",
            "你认为自己是{1}吗?",
            "你希望我不是{1}吗?",
            "你希望我告诉你你是{1}吗?",
            "如果你是{1}会意味着什么?"
        ]
    ],
    [
        /^(.*)是(.*)$/,
        [
            "为什么你觉得是{1}呢?",
            "请详细解释一下你的想法?",
            "是{1}...你这个观点有什么原因吗?",
            "你从哪里得到这个信息的?",
            "这个问题很重要吗?"
        ]
    ],
    [
        /^(.*)你是(.*)$/,
        [
            "你为什么这样说? 你对#$^$#有什么看法吗?",
            "这个描述对#$^$#很重要吗? 你能解释一下你的想法吗?",
            "你希望我成为{1}吗? 你的期望是基于什么?",
            "如果我是{1}, 那会改变我们的互动方式吗?",
            "也许在某些故事里我是{1}, 但在这里, 我是我自己",
            "如果#$^$#说你是{1}, 你会是什么感受?",
            "如果我真的是{1}, 你会有什么感受或想法?"
        ]
    ],
    [
        /^(.*)因为(.*)$/,
        [
            "那是真正的原因吗?",
            "可能还有其他什么原因?",
            "这个原因是否能解释其他事情?"
        ]
    ],
    [
        /^(.*)我不能(.*)$/,
        [
            "也许你现在可以{1}了",
            "如果可以{1}会怎样?"
        ]
    ],
    [
        /^(.*)我感觉(.*)$/,
        [
            "你经常感到{1}吗?",
            "你还有其他什么感觉?"
        ]
    ],
    [
        /^(.*)你(.*)为什么(.*)$/,
        [
            "你应该自己{1}吗?",
            "你认为我不{1}吗?",
            "也许我会在适当的时候{1}"
        ]
    ],
    [
        /^(.*)某人(.*)$/,
        [
            "你能更具体一点吗?",
            "{1}...你是这样认为的吗?"
        ]
    ],
    [
        /^(.*)每个人(.*)$/,
        [
            "肯定不是每个人",
            "你能想到某个特定的人吗?",
            "比如谁?",
            "你在想一个特别的人"
        ]
    ],
    [
        /^(.*)总是(.*)$/,
        [
            "你能想到一个具体的例子吗?",
            "什么时候?",
            "你在想哪个事件?",
            "真的——总是吗?"
        ]
    ],
    [
        /^(.*)什么(.*)$/,
        [
            "你为什么问这个问题?",
            "这个问题让你感兴趣吗?",
            "你真正想知道的是什么?",
            "你怎么想?",
            "当你问这个问题时你想到了什么?"
        ]
    ],
    [
        /^(.*)(可能|也许|或许)(.*)$/,
        [
            "你似乎不太确定?"
        ]
    ],
    [
        /^(.*)(是的|是)(.*)$/,
        [
            "你认为是{2}吗?",
            "也许确实是{2}",
            "你看起来很肯定",
            "你很确定",
            "我明白了"
        ]
    ],
    [
        /^(.*)不是(.*)$/,
        [
            "为什么不呢?",
            "你有点消极",
            "你只是想消极一下吗?"
        ]
    ],
    [
        /^(.*?)(你|我|他|她|它|自己)(.*?)(不|没|未能)(知道|了解|明白|记得)(.*)$/,
        [
            "看起来你对{2}的部分有些疑问, 能具体说明一下吗?",
            "{3}{4}的问题确实可能让人困惑, 我们可以一起探讨",
            "关于{4}的这部分内容, 你可能需要更多的解释",
            "如果你对{5}不清楚, 可以试着用不同的方式表达你的想法, 我们或许能够找到答案"
        ]
    ],
    [
        /^(.*)你(.*)(会做什么|能做什么|什么功能|什么技能)(.*)$/,
        [
            "你可以试试看问#$^$# -> 知识库目录页",
            "你可以试试看问#$^$# -> 展开功能菜单",
            "你可以试试看问#$^$# -> 魔导总线",
            "你可以试试看问#$^$# -> 领航种",
        ]
    ]
];
/**
 * * 虚无符文颜色
 */
const rune_color_void = { red: 0.675, green: 0.675, blue: 0.675 };
/**
 * * 元素符文颜色
 */
const rune_color = new Map([
    ["rune_blue", { red: 0, green: 1, blue: 1 }],
    ["rune_red", { red: 1, green: 0, blue: 0 }],
    ["rune_green", { red: 0, green: 1, blue: 0.3 }],
    ["rune_orange", { red: 1, green: 0.5, blue: 0 }],
    ["rune_purple", { red: 1, green: 0, blue: 1 }],
    ["rune_white", { red: 1, green: 1, blue: 1 }],
    ["rune_black", { red: 0, green: 0, blue: 0 }],
]);
/**
 * * 获取符文颜色
 *
 * @param {type.RUNE_TYPE} type - 符文类型
 *
 * @returns {server.RGB} - 符文颜色
 */
function getRuneColor(type) {
    return rune_color.get(type) ?? rune_color_void;
}
/**
 * * 消息通知的内容
 *
 * @property (title, message])
 *
 * @param {server.RawMessage} title - 信息通知的标题
 *
 * @param {server.RawMessage} message - 当前消息通知的具体内容
 */
const message_notify = new Map();
/**
 * * 是否允许执行部分操作
 */
class Permit {
    /**
     * * 是否允许显示错误与日志
     */
    static can_display_logs = false;
}

/*
 * 原版接口
 */
/**
 * * 尝试设置 方块状态
 *
 * @param {server.Block} object - 执行 更新事件 的 方块对象
 *
 * @param {string} type - 进行 赋值 的 方块状态
 *
 * @param {string | number | boolean} value - 方块状态值
 *
 * @returns {Error | void} - 赋值失败 返回 错误信息
 */
function TrySetPermutation(object, type, value) {
    try {
        /**
         * * 赋值 方块状态
         */
        const state = object.permutation.withState(type, value);
        object.setPermutation(state);
    }
    catch (error) {
        return error instanceof Error ? error : new Error(String(error));
    }
}
/**
 * 批量处理指定范围内符合条件的方块
 *
 * @param {server.Dimension} dimension - 处理方块的维度
 *
 * @param {server.Vector3} location - 中心位置坐标
 *
 * @param {number} range - 处理范围半径（各轴方向扩展的方块数量）
 *
 * @param {server.BlockFilter} filter - 方块过滤条件对象
 *
 * @param {(block: server.Block) => void} after - 对每个符合条件的方块执行的回调函数
 *
 * @remarks
 * 1. 处理范围以location为中心, 向xyz三个轴正负方向扩展range个方块
 * 2. 会自动创建BlockVolume对象进行批量查询
 * 3. 仅对有效且通过filter验证的方块执行回调
 */
function TryProcessBlocksInVolume(dimension, location, range, filter, after) {
    try {
        /**
         * 批量处理的起点坐标
         */
        const start = Vector.copy(location).add(Vector.CONSTANT_ONE.multiply(range));
        /**
         * 批量处理的终点坐标
         */
        const done = Vector.copy(location).add(Vector.CONSTANT_ONE.multiply(-range));
        /**
         * 批量处理的方块体积对象
         */
        const blockVolume = new server.BlockVolume(start, done);
        /**
         * 批量处理的方块坐标列表
         */
        const locations = [...dimension.getBlocks(blockVolume, filter).getBlockLocationIterator()];
        // 批量处理方块
        locations.forEach(location => {
            /**
             * 获取当前方块对象
             */
            const block = dimension.getBlock(location);
            // 验证方块是否有效 并执行回调
            if (block && block?.isValid)
                after(block);
        });
    }
    catch (error) {
        return error instanceof Error ? error : new Error(String(error));
    }
}
/**
 * * 尝试生成 粒子效果
 *
 * @param {string} typeID - 粒子效果的 type_id
 *
 * @param {server.Dimension} dimension - 生成粒子效果的维度
 *
 * @param {server.Vector3} location - 生成粒子效果的位置
 *
 * @param {server.MolangVariableMap} molang - 粒子效果的Molang变量
 *
 * @returns {Error | void} - 如果出现错误, 则返回错误对象, 否则返回 undefined
 */
function TrySpawnParticle(dimension, typeID, location, molang) {
    try {
        dimension.spawnParticle(typeID, location, molang);
    }
    catch (error) {
        return error instanceof Error ? error : new Error(String(error));
    }
}
/**
 * * 尝试生成 掉落物
 *
 * @param {server.Dimension} dimension - 生成 掉落物 的维度
 *
 * @param {string} item - 生成 掉落物 的 物品对象
 *
 * @param {server.Vector3} location - 生成 掉落物 的位置
 *
 * @returns {Error | void} - 如果出现错误, 则返回错误对象, 否则返回 undefined
 */
function TrySpawnItem(dimension, item, location) {
    try {
        return dimension.spawnItem(item, location);
    }
    catch (error) {
        return error instanceof Error ? error : new Error(String(error));
    }
}
/**
 * * 尝试填充 区域
 *
 * @param {server.Dimension} dimension - 填充的维度
 *
 * @param {server.Vector3} start - 填充的起始位置
 *
 * @param {server.Vector3} done - 填充的结束位置
 *
 * @param {string | server.BlockPermutation | server.BlockType} block - 填充的方块
 *
 * @param {server.BlockFillOptions} options - 填充的选项
 *
 * @returns {Error | number} - 如果出现错误, 则返回错误对象, 否则返回 填充的方块数量
 */
function TryFillBlocks(dimension, start, done, block, options) {
    try {
        return dimension.fillBlocks(new server.BlockVolume(start, done), block, options);
    }
    catch (error) {
        return error instanceof Error ? error : new Error(String(error));
    }
}
/**
 * * 尝试生成 实体
 *
 * @param {string} typeID - 实体的 type_id
 *
 * @param {server.Dimension} dimension - 生成实体的维度
 *
 * @param {server.Vector3} location - 生成实体的位置
 *
 * @returns {Error | void} - 如果出现错误, 则返回错误对象, 否则返回 undefined
 */
function TrySpawnEntity(dimension, typeID, location) {
    try {
        return dimension.spawnEntity(typeID, location);
    }
    catch (error) {
        return error instanceof Error ? error : new Error(String(error));
    }
}
/**
 * 设置自由指针实体并计算其旋转角度和长度。
 * 该函数用于在指定位置生成一个自由指针实体, 并根据起始点和目标点之间的向量
 * 计算出旋转角度和长度, 最后设置其实体属性。实体将在指定的生命周期结束后自动删除。
 *
 * @param {type.LOCATION_AND_DIMENSION} start - 起始位置及维度信息
 *
 * @param {server.Vector3} done - 目标位置坐标
 *
 * @param {number} [lifetime=1] - 实体的有效时间, 单位为秒。默认值为1
 *
 * @param {string} [caseId='starry_map:execute.free_pointer'] - 实体的案例ID, 用于指定生成的实体类型
 *
 * @returns {void|Error} - 如果生成实体失败, 则返回一个错误对象；否则返回 void
 *
 * @example
 * // 示例用法：
 * const start = { location: new Vector(0, 0, 0), dimension: getDimension('overworld') };
 * const done = new Vector(1, 1, 1);
 * SetFreePointer(start, done, 2);
 *
 * @remarks
 * - 如果 `TrySpawnEntity` 失败, 函数会返回一个错误对象并退出。
 * - 实体的长度属性是通过计算起始点和目标点之间的欧几里得距离乘以8得到的。
 * - 实体的角度属性基于向量的方向进行设置, 分别控制X轴和Y轴的旋转。
 * - 实体将在 `lifetime` 时间后通过 `runTimeout` 自动删除。
 */
function SetFreePointer(start, done, lifetime = 1, caseId = 'starry_map:execute.free_pointer') {
    /**
     * * 计算 向量空间的差向量 并 归一化
     */
    const difference = Vector.difference(done, start.location);
    /**
     * * 计算 实体旋转角度
     */
    const angle = Vector.Vector3ToAngle(difference);
    /**
     * * 计算两个向量之间的距离
     */
    const distance = Vector.distance(start.location, done);
    /**
     * * 尝试生成 自由指针实体
     */
    const entity = TrySpawnEntity(start.dimension, caseId, start.location);
    // 如果两个向量之间的距离为 0, 则直接返回
    //if (distance === 0) return;
    // 如果生成失败, 则返回错误信息
    if (entity instanceof Error)
        return entity;
    // 设置 自由指针的 X轴旋转属性
    entity.setProperty('property:x_axle_rotate', angle.x);
    // 设置 自由指针的 Y轴旋转属性
    entity.setProperty('property:y_axle_rotate', angle.y);
    // 设置 自由指针的长度属性
    entity.setProperty('property:length', distance * 8);
    // 设置 自由指针的 删除时间
    server.system.runTimeout(() => { if (entity && entity.isValid)
        entity.remove(); }, lifetime * 20);
}

/*
 * 原版接口
 */
/**
 * * 运行并显示 计划表 的 反馈信息
 */
class Control {
    /**
     * * 持续性 的 计划表 队列
     *
     * @type {type.PLAN[]}
     */
    static inventory = [];
    /**
     * * 计划表功能执行前事件订阅器
     *
     * * 用于在计划表执行前进行一些预处理
     *
     * * 它接收一个 BEFORE_PLAN_DATA 类型的参数, 包含了预处理所需的数据
     *
     * @param {type.BEFORE_PLAN_DATA} data - 计划表数据
     */
    static beforeEventSubscribe(data) { }
    ;
    /**
     * * 执行 全部计划表
     */
    static execute() {
        // 验证 计划表队列 是否为空
        if (this.inventory.length == 0)
            return;
        /**
         * * 等待移除 的 计划表 的 唯一识别符
         *
         * @type {Set<string>}
         */
        const waitRemove = new Set();
        // 执行 全部 计划表
        this.inventory.forEach(plan => {
            // 运行 时间刻积分
            plan.timeScore += 1;
            // 验证 时间刻积分 是否满足 执行条件
            if (plan.timeScore % plan.cooldown != 0)
                return;
            /**
             * * 设定 是否运行当前实例
             *
             * @type {boolean}
             */
            let license = true;
            /**
             * * 将 计划表 标记为 等待移除
             */
            const remove = () => waitRemove.add(plan.planId);
            /**
             * * 定义 当前实例 是否暂停运行
             */
            const cease = () => license = false;
            // 运行 计划表
            try {
                // 运行 计划表 前处理 回调函数
                Control.beforeEventSubscribe({ plan, remove, cease });
                // 运行 计划表 后处理 回调函数
                if (license)
                    plan.afterPlanEvent({ plan, remove });
            }
            catch (error) {
                /**
                 * 获取 错误信息
                 */
                const info = error instanceof Error ? error : new Error(String(error));
                /**
                 * * 错误路径
                 *
                 * @type {string}
                 */
                const stack = info.stack ?? './';
                /**
                 * * 截取报错信息
                 *
                 * @type {string}
                 */
                const intel = 'THE_OTHER_SHORE:' + info.message + stack;
                // 基于 条件参数 约束 控制台输出
                if (Permit.can_display_logs)
                    console.error(intel);
                // 将 计划表 标记为 等待移除
                remove();
            }
        });
        // 移除 被标记为 等待移除 的 计划表
        if (waitRemove.size > 0)
            this.inventory = this.inventory.filter(plan => !waitRemove.has(plan.planId));
    }
    ;
    /**
     * * 私有构造函数
     */
    constructor() { }
    ;
}
/**
 * * 计划表 模板类
 */
class Template {
    className;
    cooldown;
    annex;
    /**
     * * 当前计划表 的 数字标识符
     */
    planId;
    /**
     * * 实例 的 时间刻积分
     */
    timeScore = 1;
    /**
     * * 计划表 后处理 回调函数
     */
    afterPlanEvent(data) { }
    ;
    /**
     * @param {string} className - 类名
     *
     * @param {number} cooldown - 重复执行的间隔时间
     *
     * @param {ANNEX_ARGS} annex - 附加参数
     */
    constructor(className, cooldown, annex) {
        this.className = className;
        this.cooldown = cooldown;
        this.annex = annex;
        this.cooldown = Math.floor(cooldown);
        this.planId = BriefID();
    }
    ;
    /**
     * * 创建 计划表 并 返回 计划表对象
     *
     * @param {string} className - 类名
     *
     * @param {number} cooldown - 冷却时间
     *
     * @param {ANNEX_ARGS} data - 附加参数
     */
    static Create(className, cooldown, data) {
        // 验证类名
        if (className == "")
            throw new Error("类名不能为空");
        /**
         * * 创建 计划表对象
         */
        const plan = new this(className, cooldown, data);
        // 将 计划表 添加到 持久性计划表
        Control.inventory.push(plan);
        // 返回 计划表对象
        return plan;
    }
    ;
}
/**
 * * 在路径上执行
 */
class PathExecute extends Template {
    /**
     * * 计划表 的 路径索引
     */
    pathIndex = 1;
    /**
     * * 计划表 的 当前位置
     */
    current = { ...Vector.CONSTANT_ZERO };
    /**
     * * 当前位置与节点位置间的矢量关系
     */
    direction = Vector.CONSTANT_ZERO;
    /**
     * * 当前位置与节点位置间的距离
     */
    nodeDistance = 0;
    /**
     * * 计划表 的 路径坐标组
     */
    location_group = [];
    /**
     * * 运行维度
     */
    dimension = server.world.getDimension('overworld');
    /**
     * * 粒子轨迹
     */
    particles = [];
    /**
     * * 带有molang表达式的粒子效果
     */
    particleMolang = undefined;
    /**
     * * 在运行时执行
     */
    on_move;
    /**
     * * 在结束时执行
     */
    on_done;
    /**
     * * 位置偏移
     */
    offset;
    /**
     * * 附加参数
     */
    annex = {};
    /**
     * * 运行速度
     */
    speed = 1;
    /**
     * * 路径执行计划表 抵达 边界点 的 次数
     */
    boundsCounting = 0;
    /**
     * * 计划表 后处理 回调函数
     *
     * @param data - 计划表数据
     */
    afterPlanEvent(data) {
        if (this.speed == 1)
            this.executePathPlan(data);
        else
            for (let index = 0; index < this.speed; index++)
                this.executePathPlan(data);
    }
    ;
    /**
     * * 执行 路径计划
     */
    executePathPlan(data) {
        // 判断越界次数
        if (this.boundsCounting >= 1)
            return;
        /**
         * * 当前位置与节点位置间的距离
         */
        const distance = Vector.distance(this.location_group[this.pathIndex], this.current);
        /**
         * * 终点位置的索引
         */
        const endIndex = this.location_group.length - 1;
        /**
         * * 判断是否继续运行
         */
        const enable = Vector.distance(this.current, this.location_group[endIndex]) < 1;
        /**
         * * 路径计划 附加参数
         */
        const pathAnnexData = {
            dimension: this.dimension,
            location: this.current,
            tick: this.timeScore
        };
        // 判断 是否执行 运行时 的 附加程序
        if (this.on_move) {
            /**
             * * 执行 运行时 的 附加程序
             */
            const onClose = this.on_move(pathAnnexData);
            // 判断 是否执行 关闭事件
            if (onClose == false && this.on_done)
                this.on_done(pathAnnexData);
            //检测是否需要关闭程序运行
            if (onClose == false)
                return data.remove();
        }
        // 判断 是否需要显示粒子效果
        if (this.particles.length > 0)
            this.particles.forEach(particle => TrySpawnParticle(this.dimension, particle, this.current));
        // 判断 是否需要显示带有molang表达式的粒子效果
        if (this.particleMolang !== undefined)
            TrySpawnParticle(this.dimension, this.particleMolang[0], this.current, this.particleMolang[1]);
        // 修改 计划表 指向的位置
        this.modifyCurrentLocation(this, distance, endIndex);
        // 判断 是否继续运行
        if (!enable || this.pathIndex != endIndex)
            return;
        // 执行结束事件
        if (this.on_done)
            this.on_done(pathAnnexData);
        // 记录越界次数
        this.boundsCounting += 1;
        // 移除 计划表
        return data.remove();
    }
    ;
    /**
     * * 修改 路径执行 当前指向 的 位置
     *
     * @param {PathExecute} self - 路径执行计划表
     *
     * @param {number} distance - 当前位置与节点位置间的距离
     *
     * @param {number} endIndex - 终点位置的索引
     */
    modifyCurrentLocation(self, distance, endIndex) {
        //判断 是否执行下一个位置
        if (distance < 1 && self.pathIndex != endIndex) {
            // 获取下一个位置
            self.pathIndex += 1;
            // 获取下一个位置与当前位置之间的矢量
            self.direction = Vector.subtract(self.location_group[self.pathIndex], self.current);
            // 获取下一个位置与当前位置之间的矢量距离
            self.nodeDistance = Vector.distance(self.location_group[self.pathIndex], self.current);
        }
        // 修改 计划表 指向的位置
        else {
            self.current.x += (self.direction.x / self.nodeDistance);
            self.current.y += (self.direction.y / self.nodeDistance);
            self.current.z += (self.direction.z / self.nodeDistance);
        }
    }
    ;
    /**
     * * 基于 射击参数 初始化 路径属性
     *
     * @param {PathExecute} source - 路径执行计划表
     *
     * @param {ANNEX_ARGS} args - 执行表参数
     *
     * @param {server.Vector3} offset - 位置偏移
     *
     * @class {@link PathExecute}
     */
    static prepareShootingPath(source, args, offset) {
        // 验证参数
        if (!source || !args.shoot)
            return;
        /**
         * * 计算 终点坐标
         */
        const endPoint = Vector.add(args.shoot.start_place, Vector.multiply(args.shoot.toward, args.shoot.max_distance));
        // 重载 坐标组数据
        source.location_group = [args.shoot.start_place, endPoint];
        // 如果有偏移量, 则调整位置组中的坐标
        if (offset)
            source.location_group = source.location_group.map(location => Vector.add(location, offset));
        // 获取当前位置与目标位置之间的矢量距离
        source.current = source.location_group[0];
        source.direction = Vector.subtract(source.location_group[1], source.current);
        source.nodeDistance = Vector.distance(source.location_group[1], source.current);
    }
    ;
    /**
     * * 基于 默认参数 初始化 路径属性
     *
     * @param {PathExecute} source - 路径型代码
     *
     * @param {server.Vector3} offset - 偏移
     *
     * @class {@link PathExecute}
     */
    static prepareDefaultPath(source, offset) {
        /**
         * * 获取 玩家对象
         */
        const player = source.dimension.getPlayers()[0];
        // 根据位置组长度设置新的位置组
        if (source.location_group.length === 0) {
            // 设置起点和终点
            source.location_group = [player.location, Vector.add(player.location, { x: 10, y: 10, z: 10 })];
        }
        else if (source.location_group.length === 1) {
            // 只有起点, 添加终点
            source.location_group.push(Vector.add(source.location_group[0], { x: 10, y: 10, z: 10 }));
        }
        // 如果有偏移量, 则调整位置组中的坐标
        if (offset)
            source.location_group = source.location_group.map(location => Vector.add(location, offset));
        // 获取当前位置与目标位置之间的矢量距离
        source.current = source.location_group[0];
        source.direction = Vector.subtract(source.location_group[1], source.current);
        source.nodeDistance = Vector.distance(source.location_group[1], source.current);
    }
    ;
    /**
     * * 创建 路径执行计划表 并 返回 计划表对象
     *
     * @param {string} className - 类名
     *
     * @param {number} cooldown - 冷却时间
     *
     * @param {type.ROUTE_ARGS} data - 路径参数
     */
    static Create(className, cooldown, data) {
        // 验证类名
        if (className == "")
            throw new Error("类名不能为空");
        /**
         * * 创建 计划表对象
         */
        const plan = new PathExecute(className, cooldown, data);
        /**
         * @returns {ROUTE_MOVE_CODE} - 射程参数
         */
        const shootToward = () => {
            if (data.shoot) {
                return {
                    shoot: {
                        toward: data.shoot.toward,
                        start_place: data.shoot.start_place,
                        max_distance: Math.floor(data.shoot.max_distance)
                    }
                };
            }
            else
                return {};
        };
        // 设定 路径与射程参数
        plan.location_group = data.locations;
        plan.dimension = data.dimension;
        plan.cooldown = Math.floor(data.cooldown);
        plan.particles = data?.particles || [];
        plan.particleMolang = data.particleMolang;
        plan.on_move = data.on_move;
        plan.on_done = data.on_done;
        plan.offset = data.offset;
        plan.speed = Math.floor(data.speed);
        plan.annex = shootToward();
        // 尝试基于射击参数进行初始化
        if (data.shoot)
            PathExecute.prepareShootingPath(plan, data, plan.offset);
        // 尝试基于默认参数进行初始化
        if (!data.shoot)
            PathExecute.prepareDefaultPath(plan, plan.offset);
        // 将 计划表 添加到 持久性计划表队列
        Control.inventory.push(plan);
        // 返回 计划表对象
        return plan;
    }
    ;
    /**
     * * 创建 实心立方体 造型 的 路径计划表 并 返回 计划表对象
     *
     * @param {string} className - 当前计划表的识别名称
     *
     * @param {ROUTE_ARGS} data - 路径参数
     *
     * @param {server.Vector3} start - 路径的起始位置
     *
     * @param {server.Vector3} done - 路径的结束位置
     *
     * @param {number|undefined} multiple - 速度的缩放倍率
     *
     * @returns {PathExecute} - 计划表对象
     */
    static CreateForCube(className, data, start, done, multiple = 1) {
        // 验证类名
        if (className == "")
            throw new Error("类名不能为空");
        /**
         * * 创建 计划表对象
         */
        const plan = new PathExecute(className, 1, data);
        // 对偏移量进行处理
        if (plan.offset)
            start = Vector.add(start, plan.offset);
        if (plan.offset)
            done = Vector.add(done, plan.offset);
        /**
         * * 计算 距离
         */
        const distance = Vector.distance(done, start);
        /**
         * * 拷贝 起始点 坐标
         */
        const copyStart = Vector.copy(start);
        /**
         * * 修改 终止点 坐标
         */
        const copyDone = Vector.copy(done);
        // 修改 路径计划表 的 函数
        plan.modifyCurrentLocation = (self) => {
            if (self.current.x != copyDone.x) {
                self.current.x += copyDone.x > self.current.x ? 1 : -1;
            }
            else if (self.current.x == copyDone.x && self.current.z != copyDone.z) {
                self.current.z += copyDone.z > self.current.z ? 1 : -1;
                self.current.x = copyStart.x;
            }
            else if (self.current.x == copyDone.x && self.current.z == copyDone.z && self.current.y != copyDone.y) {
                self.current.y += copyDone.y > self.current.y ? 1 : -1;
                self.current.x = copyStart.x;
                self.current.z = copyStart.z;
            }
            else if (self.current.x == copyDone.x && self.current.z == copyDone.z && self.current.y == copyDone.y) {
                self.pathIndex = 1;
                self.boundsCounting += 2;
            }
        };
        // 修改 路径计划表 的 参数
        plan.nodeDistance = Vector.distance(done, start);
        plan.direction = Vector.subtract(done, start);
        plan.location_group = [start, done];
        plan.dimension = data.dimension;
        plan.cooldown = Math.floor(data.cooldown);
        plan.particles = data?.particles || [];
        plan.on_move = data.on_move;
        plan.on_done = data.on_done;
        plan.offset = data.offset;
        plan.current = start;
        plan.speed = Math.floor((distance - 1) * multiple) + 1;
        // 将 计划表 添加到 持久性计划表队列
        Control.inventory.push(plan);
        // 返回 计划表对象
        return plan;
    }
    ;
    /**
     * * 创建 立方体边框 造型 的 路径计划表 并 返回 计划表对象
     *
     * @param {string} className - 当前计划表的识别名称
     *
     * @param {ROUTE_ARGS} data - 路径参数
     *
     * @param {server.Vector3} start - 路径的起始位置
     *
     * @param {server.Vector3} done - 路径的结束位置
     *
     * @returns {PathExecute} - 计划表对象
     */
    static CreateForFrame(className, data, start, done) {
        // 验证类名
        if (className == "")
            throw new Error("类名不能为空");
        /**
         * * 创建 计划表对象
         */
        const plan = new PathExecute(className, 1, data);
        /**
         * * 计算 向量
         */
        const vector = Vector.subtract(done, start);
        /**
         * * 计算 距离
         */
        const distance = Vector.distance(done, start);
        /**
         * * 路径序列
         */
        const location_group = [];
        // 序列化 3D 结构
        if (vector.y != 0 && vector.x != 0 && vector.z != 0) {
            location_group.push(
            // 绘制 双平面 结构
            Vector.add(start, { x: vector.x, y: 0, z: 0 }), Vector.add(start, { x: vector.x, y: vector.y, z: 0 }), Vector.add(start, { x: 0, y: vector.y, z: 0 }), Vector.add(start, Vector.CONSTANT_ZERO), Vector.add(start, { x: 0, y: 0, z: vector.z }), Vector.add(start, { x: 0, y: vector.y, z: vector.z }), Vector.add(start, { x: 0, y: vector.y, z: 0 }), Vector.add(start, Vector.CONSTANT_ZERO), 
            // 修正 基准点
            Vector.add(start, { x: vector.x, y: 0, z: 0 }), Vector.add(start, { x: vector.x, y: 0, z: vector.z }), 
            // 绘制 双平面 结构
            Vector.add(start, { x: 0, y: 0, z: vector.z }), Vector.add(start, { x: 0, y: vector.y, z: vector.z }), Vector.add(start, { x: vector.x, y: vector.y, z: vector.z }), Vector.add(start, { x: vector.x, y: 0, z: vector.z }), Vector.add(start, { x: vector.x, y: 0, z: 0 }), Vector.add(start, { x: vector.x, y: vector.y, z: 0 }), Vector.add(start, { x: vector.x, y: vector.y, z: vector.z }));
        }
        else if (vector.y == 0 && vector.x != 0 && vector.z != 0) {
            location_group.push(Vector.add(start, { x: vector.x, y: 0, z: 0 }), Vector.add(start, { x: vector.x, y: 0, z: vector.z }), Vector.add(start, { x: 0, y: 0, z: vector.z }), Vector.add(start, Vector.CONSTANT_ZERO));
        }
        else if (vector.y != 0 && vector.x == 0 && vector.z != 0) {
            location_group.push(Vector.add(start, { x: 0, y: vector.y, z: 0 }), Vector.add(start, { x: 0, y: vector.y, z: vector.z }), Vector.add(start, { x: 0, y: 0, z: vector.z }), Vector.add(start, Vector.CONSTANT_ZERO));
        }
        else if (vector.y != 0 && vector.x != 0 && vector.z == 0) {
            location_group.push(Vector.add(start, { x: 0, y: vector.y, z: 0 }), Vector.add(start, { x: vector.x, y: vector.y, z: 0 }), Vector.add(start, { x: vector.x, y: 0, z: 0 }), Vector.add(start, Vector.CONSTANT_ZERO));
        }
        // 修改 路径规划表 的 参数
        plan.location_group = [start, ...location_group];
        plan.dimension = data.dimension;
        plan.cooldown = Math.floor(data.cooldown);
        plan.particles = data?.particles || [];
        plan.on_move = data.on_move;
        plan.on_done = data.on_done;
        plan.offset = data.offset;
        plan.speed = distance;
        // 基于默认参数进行初始化
        PathExecute.prepareDefaultPath(plan, plan.offset);
        // 将 计划表 添加到 持久性计划表队列
        Control.inventory.push(plan);
        // 返回 计划表对象
        return plan;
    }
    ;
}
/**
 * * 雾海裂隙效果处理器, 用于在指定维度间生成粒子效果并处理实体传送逻辑
 *
 * @extends Template
 *
 * @param {number} cooldown tick 间隔时间（建议值：30）
 */
class MistySeaFissure extends Template {
    /**
     * todo 裂隙已存在的持续时间（单位：tick）
     *
     * @type {number}
     */
    survivalTime = 0;
    /**
     * todo 计划任务后执行的主逻辑
     *
     * @param {type.AFTER_PLAN_DATA} data 计划任务数据对象
     *
     * 执行流程如下：
     *
     * * 检查生存时间是否达到上限或缺少必要附件, 若满足则移除任务
     *
     * * 获取显示维度与目标维度信息
     *
     * * 更新雾海裂隙的生存时间
     *
     * * 在指定坐标生成粒子效果
     *
     * * 将范围内实体传送至目标坐标
     */
    afterPlanEvent(data) {
        // ! 判断 是否满足移除条件
        if (this.survivalTime >= 20 || !this.annex.dimensions || !this.annex.locations || this.annex.dimensions.length < 2 || this.annex.locations.length < 2)
            return data.remove();
        /**
         * todo 粒子效果显示维度
         *
         * @type {server.Dimension}
         */
        const showDimension = this.annex.dimensions[0];
        /**
         * todo 粒子效果显示坐标
         *
         * @type {server.Vector3}
         */
        const showLocation = this.annex.locations[0];
        /**
         * todo 实体传送目标坐标
         *
         * @type {server.Vector3}
         */
        const pointLocation = this.annex.locations[1];
        /**
         * todo 实体传送目标维度
         *
         * @type {server.Dimension}
         */
        const pointDimension = this.annex.dimensions[1];
        // * 更新生存时间
        this.survivalTime++;
        //console.log(`[雾海裂隙] 已持续 ${this.survivalTime} ticks`);
        // * 生成雾海裂隙粒子效果
        TrySpawnParticle(showDimension, 'constant:the_cracks_of_the_misty_sea', showLocation);
        // * 传送范围内实体到目标维度
        showDimension.getEntities({ location: showLocation, maxDistance: 3 }).forEach(entity => entity.tryTeleport(pointLocation, { dimension: pointDimension }));
    }
    ;
    /**
     * todo 快捷创建雾海裂隙实例
     *
     * @param {string} nameTag - 实例标识名称
     *
     * @param {type.ANNEX_ARGS} data - 附件参数, 需包含 dimensions: [显示维度, 目标维度] locations: [显示坐标, 目标坐标]
     *
     * @returns {type.PLAN} 创建的实例对象
     */
    static BriefCreate(nameTag, data) {
        return this.Create(nameTag, 30, data);
    }
    ;
}
/**
 * * 生成一个 简短标识符 字符串
 *
 * * 该函数通过组合当前时间戳的后 16 位和一个随机数的后 16 位, 以及它们之间的差值来生成一个唯一的ID
 *
 * * 这种生成方式确保了 ID 的唯一性和随机性, 同时保持了 ID 的长度较短
 *
 * @returns {string} -生成的 ID字符串, 格式为"随机部分-差值部分-时间部分"
 */
function BriefID() {
    /**
     * * 获取当前时间戳的后16位作为时间部分
     */
    const timePart = (server.system.currentTick & 0xFFFF).toString(16).padStart(4, '0').toUpperCase();
    /**
     * * 获取一个随机数作为随机部分
     */
    const randomPart = Math.floor(Math.random() * 0x10000).toString(16).padStart(4, '0').toUpperCase();
    /**
     * * 计算时间部分和随机部分之间的差值
     */
    const difference = (parseInt(randomPart, 16) - parseInt(timePart, 16) + 0x10000) % 0x10000;
    /**
     * * 将差值转换为4位十六进制字符串
     */
    const differencePart = difference.toString(16).padStart(4, '0').toUpperCase();
    // 拼接各部分以形成完整的ID字符串
    return `${randomPart}-${differencePart}-${timePart}`;
}

/**
 * TODO: 元素符文 枚举
 */
var RUNE_ENUM;
(function (RUNE_ENUM) {
    /**
     * TODO: 元素符文 - 虚无
     */
    RUNE_ENUM["void"] = "rune_void";
    /**
     * TODO: 元素符文 - 诸海
     */
    RUNE_ENUM["blue"] = "rune_blue";
    /**
     * TODO: 元素符文 - 烛火
     */
    RUNE_ENUM["red"] = "rune_red";
    /**
     * TODO: 元素符文 - 界木
     */
    RUNE_ENUM["green"] = "rune_green";
    /**
     * TODO: 元素符文 - 归忆
     */
    RUNE_ENUM["orange"] = "rune_orange";
    /**
     * TODO: 元素符文 - 极雷
     */
    RUNE_ENUM["purple"] = "rune_purple";
    /**
     * TODO: 元素符文 - 启程
     */
    RUNE_ENUM["white"] = "rune_white";
    /**
     * TODO: 元素符文 - 焚绝
     */
    RUNE_ENUM["black"] = "rune_black";
})(RUNE_ENUM || (RUNE_ENUM = {}));
/**
 * TODO: 元素符文 进行计算时 的 映射值
 */
var RUNE_COUNT;
(function (RUNE_COUNT) {
    /**
     * TODO: 元素符文 - 虚无
     */
    RUNE_COUNT[RUNE_COUNT["rune_void"] = 0] = "rune_void";
    /**
     * TODO: 元素符文 - 诸海
     */
    RUNE_COUNT[RUNE_COUNT["rune_blue"] = 10] = "rune_blue";
    /**
     * TODO: 元素符文 - 烛火
     */
    RUNE_COUNT[RUNE_COUNT["rune_red"] = 100] = "rune_red";
    /**
     * TODO: 元素符文 - 界木
     */
    RUNE_COUNT[RUNE_COUNT["rune_green"] = 1000] = "rune_green";
    /**
     * TODO: 元素符文 - 归忆
     */
    RUNE_COUNT[RUNE_COUNT["rune_orange"] = 10000] = "rune_orange";
    /**
     * TODO: 元素符文 - 极雷
     */
    RUNE_COUNT[RUNE_COUNT["rune_purple"] = 100000] = "rune_purple";
    /**
     * TODO: 元素符文 - 启程
     */
    RUNE_COUNT[RUNE_COUNT["rune_white"] = 1000000] = "rune_white";
    /**
     * TODO: 元素符文 - 焚绝
     */
    RUNE_COUNT[RUNE_COUNT["rune_black"] = 10000000] = "rune_black";
})(RUNE_COUNT || (RUNE_COUNT = {}));
/**
 * TODO: 定义战斗属性面板的默认值
 */
var RUNE_PROPERTY_DEFAULT;
(function (RUNE_PROPERTY_DEFAULT) {
    /**
     * 基础攻击提升的默认值
     */
    RUNE_PROPERTY_DEFAULT[RUNE_PROPERTY_DEFAULT["raise_basic_attack"] = 0] = "raise_basic_attack";
    /**
     * 爆发概率提升的默认值
     */
    RUNE_PROPERTY_DEFAULT[RUNE_PROPERTY_DEFAULT["raise_erupt_odds"] = 0] = "raise_erupt_odds";
    /**
     * 爆发伤害提升的默认值
     */
    RUNE_PROPERTY_DEFAULT[RUNE_PROPERTY_DEFAULT["raise_erupt_hurt"] = 0] = "raise_erupt_hurt";
    /**
     * 伤害增加的默认值
     */
    RUNE_PROPERTY_DEFAULT[RUNE_PROPERTY_DEFAULT["damage_increase"] = 0] = "damage_increase";
    /**
     * 双倍伤害的默认值
     */
    RUNE_PROPERTY_DEFAULT[RUNE_PROPERTY_DEFAULT["double_damage"] = 1] = "double_damage";
    /**
     * 基础攻击的默认值
     */
    RUNE_PROPERTY_DEFAULT[RUNE_PROPERTY_DEFAULT["basic_attack"] = 5] = "basic_attack";
    /**
     * 爆发概率的默认值
     */
    RUNE_PROPERTY_DEFAULT[RUNE_PROPERTY_DEFAULT["erupt_odds"] = 10] = "erupt_odds";
    /**
     * 爆发伤害的默认值
     */
    RUNE_PROPERTY_DEFAULT[RUNE_PROPERTY_DEFAULT["erupt_hurt"] = 150] = "erupt_hurt";
    /**
     * 自身符文类型的默认值
     */
    RUNE_PROPERTY_DEFAULT["self_rune"] = "rune_void";
    /**
     * 添加符文类型的默认值
     */
    RUNE_PROPERTY_DEFAULT["add_rune"] = "rune_void";
})(RUNE_PROPERTY_DEFAULT || (RUNE_PROPERTY_DEFAULT = {}));

/*
 * 原版接口
 */
/**
 * 触发控制组, 用于存储事件类型与触发时间的映射
 *
 * @type {Map<string, number>}
 */
const ControlGroup = new Map();
/**
 * 获取来源对象的唯一标识符
 *
 * 如果来源是实体, 则返回实体的 ID
 *
 * 如果来源是方块, 则返回方块所在维度和位置的组合字符串
 *
 * @param {server.Entity | server.Block} [source] - 来源对象, 可以是实体或方块
 *
 * @returns {string} - 来源对象的唯一标识符
 */
function getUniqueIdentifier(source) {
    // 如果来源是实体, 则返回实体的 ID
    if (source instanceof server.Entity)
        return source.id;
    // 如果来源是方块, 则返回方块所在维度和位置的组合字符串
    else if (source instanceof server.Block) {
        /**
         * * 维度标识符信息
         *
         * @type {string[]}
         */
        const dimension = source.dimension.id.split(/:/);
        // 获取 方块位置与维度信息字符串
        return `${dimension[0]}.${Vector.toString(source)}.${dimension[1]}`;
    }
    // 如果来源是向量, 则返回向量字符串
    else if (source instanceof Vector)
        return source.toString();
    // 抛出错误
    throw new Error("不支持的源类型 -> 您应该指定实体或方块作为参数");
}
/**
 * 创建触发控制, 用于管理特定事件类型的触发频率
 *
 * 根据给定的事件类型、来源（实体或方块）和等待时间,
 *
 * 判断是否允许触发事件
 *
 * @param {string} [eventType] - 事件类型字符串
 *
 * @param {server.Entity | server.Block | Vector} [source] - 触发事件的来源, 可以是 实体 或 方块 或 Vector 对象
 *
 * @param {number} [waitTime] - 触发事件前的等待时间（游戏刻数）
 *
 * @returns {boolean} - 如果可以触发事件则返回 true, 否则返回 false
 */
function TriggerControl(eventType, source, waitTime = 20) {
    /**
     * 触发的事件的唯一标识符键
     *
     * @type {string}
     */
    const key = `${eventType}:${getUniqueIdentifier(source)}`;
    /**
     * 获取控制组中已存在的触发时间
     *
     * @type {number | undefined}
     */
    const existingTriggerTime = ControlGroup.get(key);
    /*
     * 如果不存在触发时间或当前游戏刻数大于等于触发时间
     *
     * 设置新的触发时间并返回 true
     */
    if (existingTriggerTime === undefined || server.system.currentTick >= existingTriggerTime) {
        ControlGroup.set(key, server.system.currentTick + waitTime);
        return true;
    }
    // 否则返回 false
    return false;
}
/**
 * 获取指定事件类型和来源的等待时间
 *
 * 如果事件类型和来源已经存在于触发控制组中, 则返回当前等待时间
 *
 * 否则, 返回默认的等待时间（ 通常为 0 ）
 *
 * @param {string} [eventType] - 事件类型
 *
 * @param {server.Entity | server.Block} [source] - 事件来源, 可以是实体或方块
 *
 * @returns {number} - 返回剩余的等待时间
 */
function ObtainWaitTime(eventType, source) {
    /**
     * 获取 来源对象的唯一标识符
     */
    const key = `${eventType}:${getUniqueIdentifier(source)}`;
    /**
     * 查找 ControlGroup 中类型匹配且标识符相同的项, 并返回其等待时间
     */
    const existingTriggerTime = ControlGroup.get(key) ?? 0;
    // 返回 剩余等待时间
    return Clamp({ max: Number.MAX_SAFE_INTEGER, min: 0 }, existingTriggerTime - server.system.currentTick);
}

/*
 * 原版接口
 */
/**
 * * 实体数据 - 符文融合
 */
const rune_fusion = new Map([
    // * 流沙
    [10010, { double: 2, event: quicksand }],
    // * 共鸣
    [110000, { double: 1.5, event: resonance }],
    // * 生长
    [11000, { double: 2, event: produce }],
    // * 结晶
    [10100, { double: 2, event: crystal }],
    // * 蒸发
    [110, { double: 2, event: vapor }],
    // * 感电
    [100010, { double: 1.5, event: electric }],
    // * 超载
    [100100, { double: 1.5, event: overload }],
    // * 若水
    [1000010, { double: 2, event: like_water }],
    // * 律令
    [1010000, { double: 2, event: directive }],
    // * 绽放
    [1010, { double: 1.5, event: blossom }],
    // * 激化
    [101000, { double: 5, event: sharpen }],
    // * 燃烧
    [1100, { double: 3, event: flame }],
    // * 归零
    [10010000, { double: 5, event: zero }],
    // * 余烬
    [10000100, { double: 2, event: embers }],
    // * 雷鸣
    [1100000, { double: 2, event: thunderous }],
    // * 辉光
    [1000100, { double: 2, event: brilliance }],
    // * 催化
    [1001000, { double: 2, event: catalysis }],
    // * 枯萎
    [10001000, { double: 5, event: withered }],
    // * 潮汐
    [10000010, { double: 2, event: tides }],
    // * 绝缘
    [10001000, { double: 2, event: insulation }],
    // * 偏振
    [10010000, { double: 1.5, event: polarity }],
]);
/**
 * * 符文依附于目标实体
 */
class RuneClingEntity extends Template {
    /**
     * * 缓存 符文令牌
     */
    static tokenGroup = [];
    /**
     * * 检查 事件令牌 是否可用
     *
     * @param {server.Entity} source 申请 执行操作 的 实体
     *
     * @returns {boolean} 是否已经拥有符文令牌
     */
    static CreateToken(source) {
        /**
         * * 检查 令牌 是否存在
         */
        const test = RuneClingEntity.tokenGroup.filter(token => token.id === source.id).length;
        // 如果 令牌 不存在 则 创建令牌
        if (test === 0)
            RuneClingEntity.tokenGroup.push({ id: source.id, wait: 100 });
        // 否则 更新 令牌
        else {
            RuneClingEntity.tokenGroup = RuneClingEntity.tokenGroup.filter(token => token.id !== source.id);
            RuneClingEntity.tokenGroup.push({ id: source.id, wait: 100 });
        }
        return test === 0;
    }
    ;
    afterPlanEvent() {
        /**
         * * 获取 无效的 令牌
         */
        const reset = RuneClingEntity.tokenGroup.filter(token => token.wait <= 0);
        /**
         * * 获取 有效的 令牌
         */
        const valid = RuneClingEntity.tokenGroup.filter(token => token.wait > 0);
        // 移除 无效的 令牌
        RuneClingEntity.tokenGroup = RuneClingEntity.tokenGroup.filter(token => token.wait > 0);
        // 减少 令牌有效时间
        RuneClingEntity.tokenGroup.forEach(token => token.wait -= 1);
        // 令牌移除事件
        reset.forEach(token => {
            /**
             * * 获取 实体
             */
            const entity = server.world.getEntity(token.id);
            if (!entity)
                return;
            AlterProperty(entity, { add_rune: 'rune_void' });
        });
        // 令牌有效事件
        valid.forEach(token => {
            /**
             * * 获取 实体
             */
            const entity = server.world.getEntity(token.id);
            if (!entity)
                return;
            /**
             * * 粒子参数
             */
            const molang = new server.MolangVariableMap();
            /**
             * * 获取 实体属性
             */
            const state = GetProperty(entity);
            /**
             * * 获取 世界维度
             */
            const dimension = entity.dimension;
            /**
             * * 获取 颜色
             */
            const colour = getRuneColor(state.self_rune);
            // 设定 粒子参数
            molang.setFloat('variable.scale', 0.35);
            molang.setColorRGB('variable.color', colour);
            molang.setVector3('variable.offset', { x: 0, y: 1.5, z: 0 });
            // 显示 粒子特效
            TrySpawnParticle(dimension, `scripts:fusion_${state.add_rune}`, entity.getHeadLocation(), molang);
        });
    }
    ;
    /**
     * * 简短的构造器
     *
     * @param nameTag - 名称
     */
    static BriefCreate(nameTag) {
        return this.Create(nameTag, 1, {});
    }
    ;
}
/**
 * * 根据实体与目标之间的距离来计算击退效果
 *
 * @param {server.Entity} entity - 发起击退的实体
 *
 * @param {server.Entity} target - 被击退的目标实体
 *
 * @param {number} multiplier - 距离影响击退效果的乘数因子, 默认值为3
 */
function BackoffByDistance(entity, target, multiplier = 3) {
    /**
     * * 击退方向
     */
    const direction = Vector.difference(entity.location, target.location);
    /**
     * * 本体与目标的距离
     */
    const distance = Vector.distance(entity.location, target.location);
    /**
     * * 击退系数
     */
    const mapping = ((1 + distance) / distance) * multiplier;
    // 执行击退
    target.applyKnockback({ x: direction.x * mapping, z: direction.z * mapping }, direction.y * (multiplier - 1));
}
/**
 * * 随机生成一个符文类型
 *
 * @returns {type.RUNE_TYPE} 返回一个随机的符文类型枚举值
 */
function RandomRune() {
    /**
     * * 符文类型数组, 每个类型都有相同的选中概率
     *
     * @type {type.RUNE_TYPE[]}
     */
    const runes = [
        RUNE_ENUM.blue,
        RUNE_ENUM.green,
        RUNE_ENUM.orange,
        RUNE_ENUM.red,
        RUNE_ENUM.purple
    ];
    /**
     * * 生成一个介于0（包含）和符文类型数组的长度（不包含）之间的随机索引
     *
     * @type {number}
     */
    const randomIndex = RandomFloat(0, runes.length);
    /**
     * * 根据随机索引返回一个符文类型
     *
     * @type {type.RUNE_TYPE}
     */
    return runes[randomIndex];
}
/**
 * * 判断 实体是否暴击
 *
 * @param {server.Entity | server.Player} object - 实例对象
 *
 * @returns {boolean} - 返回 实体是否暴击
 */
function IsErupt(object) {
    /**
     * * 获取 实体属性
     */
    const getData = GetProperty(object);
    /**
     * * 暴击概率
     */
    const eruptOdds = getData.erupt_odds + getData.raise_erupt_odds;
    // 判断 实体属性
    return IsEnable(eruptOdds);
}
/**
 * * 创建 实体 的 战斗属性面板
 *
 * @param {server.Entity} entity 进行 战斗属性面板 设置 的 实体
 *
 * @param {type.SET_PROPERTY_PANEL} input 实体 的 战斗属性面板
 */
function CreateProperty(entity, input) {
    /**
     * * 定义一个辅助函数, 用于设置动态属性, 使用枚举提供的默认值
     *
     * @param {RUNE_PROPERTY_DEFAULT} key - 战斗属性面板的属性
     */
    const setProperty = (key) => {
        entity.setDynamicProperty(`rune_hurt:${key}`, input?.[key] ?? RUNE_PROPERTY_DEFAULT[key]);
    };
    // 使用枚举设置属性, 同时允许输入覆盖默认值
    setProperty('raise_basic_attack');
    setProperty('raise_erupt_odds');
    setProperty('raise_erupt_hurt');
    setProperty('damage_increase');
    setProperty('double_damage');
    setProperty('basic_attack');
    setProperty('erupt_hurt');
    setProperty('erupt_odds');
    setProperty('add_rune');
    // 自身符文 需 特殊处理, 因为它使用了 RandomRune 函数
    entity.setDynamicProperty('rune_hurt:self_rune', input?.self_rune ?? RandomRune());
}
/**
 * * 设置 实体 的 战斗属性面板
 *
 * @param {server.Entity} object 进行 战斗属性面板 设置 的 实体
 *
 * @param {type.SET_PROPERTY_PANEL} input 实体 的 战斗属性面板
 */
function SetProperty(object, input) {
    /**
     * * 获取 实体 的 原始战斗属性面板
     */
    const proto = GetProperty(object);
    /*
     * 基础伤害
     */
    object.setDynamicProperty('rune_hurt:basic_attack', input.basic_attack ?? proto.basic_attack);
    object.setDynamicProperty('rune_hurt:raise_basic_attack', input.raise_basic_attack ?? proto.raise_basic_attack);
    /*
     * 暴击概率
     */
    object.setDynamicProperty('rune_hurt:erupt_odds', input.erupt_odds ?? proto.erupt_odds);
    object.setDynamicProperty('rune_hurt:raise_erupt_odds', input.raise_erupt_odds ?? proto.raise_erupt_odds);
    /*
     * 暴击伤害
     */
    object.setDynamicProperty('rune_hurt:erupt_hurt', input.erupt_hurt ?? proto.erupt_hurt);
    object.setDynamicProperty('rune_hurt:raise_erupt_hurt', input.raise_erupt_hurt ?? proto.raise_erupt_hurt);
    /*
     * 伤害提升
     */
    object.setDynamicProperty('rune_hurt:damage_increase', input.damage_increase ?? proto.damage_increase);
    object.setDynamicProperty('rune_hurt:double_damage', input.double_damage ?? proto.double_damage);
    /*
     * 元素符文
     */
    object.setDynamicProperty('rune_hurt:add_rune', input.add_rune ?? proto.add_rune);
    object.setDynamicProperty('rune_hurt:self_rune', input.self_rune ?? proto.self_rune);
}
/**
 * * 修改 实体 的 战斗属性面板
 *
 * @param {server.Entity} object 进行 战斗属性面板 设置 的 实体
 *
 * @param {type.SET_PROPERTY_PANEL} input 实体 的 战斗属性面板
 */
function AlterProperty(object, input) {
    // 如果 实体 未初始化 则 不进行 设置
    if (!object.getDynamicProperty('entity:is_initial'))
        return;
    /**
     * * 获取 实体 的 原始战斗属性面板
     */
    const proto = GetProperty(object);
    /*
     * 基础伤害
     */
    if (input.basic_attack)
        object.setDynamicProperty('rune_hurt:basic_attack', proto.basic_attack + input.basic_attack);
    if (input.raise_basic_attack)
        object.setDynamicProperty('rune_hurt:raise_basic_attack', proto.raise_basic_attack + input.raise_basic_attack);
    /*
     * 暴击概率
     */
    if (input.erupt_odds)
        object.setDynamicProperty('rune_hurt:erupt_odds', proto.erupt_odds + input.erupt_odds);
    if (input.raise_erupt_odds)
        object.setDynamicProperty('rune_hurt:raise_erupt_odds', proto.raise_erupt_odds + input.raise_erupt_odds);
    /*
     * 暴击伤害
     */
    if (input.erupt_hurt)
        object.setDynamicProperty('rune_hurt:erupt_hurt', proto.erupt_hurt + input.erupt_hurt);
    if (input.raise_erupt_hurt)
        object.setDynamicProperty('rune_hurt:raise_erupt_hurt', proto.raise_erupt_odds + input.raise_erupt_hurt);
    /*
     * 伤害提升
     */
    if (input.damage_increase)
        object.setDynamicProperty('rune_hurt:damage_increase', proto.damage_increase + input.damage_increase);
    if (input.double_damage)
        object.setDynamicProperty('rune_hurt:double_damage', proto.double_damage + input.double_damage);
    /*
     * 元素符文
     */
    object.setDynamicProperty('rune_hurt:add_rune', input.add_rune ?? proto.add_rune);
    object.setDynamicProperty('rune_hurt:self_rune', input.self_rune ?? proto.self_rune);
}
/**
 * * 合并 战斗属性面板
 *
 * @param {type.GET_PROPERTY_PANEL} proto 原本的 战斗属性面板
 *
 * @param {type.SET_PROPERTY_PANEL} alter 需要的 战斗属性面板
 *
 * @returns {type.GET_PROPERTY_PANEL} 合并后的 战斗属性面板
 */
function MergeProperty(proto, alter) {
    return { ...proto, ...alter };
}
/**
 * * 获取 实体 的 战斗属性面板
 *
 * @param {server.Entity} entity 需要获取属性面板的实体
 *
 * @returns {type.GET_PROPERTY_PANEL} 实体的战斗属性面板
 */
function GetProperty(entity) {
    // 如果 实体不存在 或 不是有效实体 则 返回默认属性面板
    if (!entity || !entity.isValid)
        return RUNE_PROPERTY_DEFAULT;
    /**
     * * 获取实体的属性面板值
     *
     * @param {string} key - 属性面板的键
     *
     * @param {any} initial - 初始值
     *
     * @returns {any} - 属性面板的值
     */
    const getProperty = (key, initial) => entity?.getDynamicProperty(`rune_hurt:${key}`) ?? initial;
    // 返回属性面板
    return {
        // 属性提升
        raise_basic_attack: getProperty('raise_basic_attack', RUNE_PROPERTY_DEFAULT.raise_basic_attack),
        raise_erupt_odds: getProperty('raise_erupt_odds', RUNE_PROPERTY_DEFAULT.raise_erupt_odds),
        raise_erupt_hurt: getProperty('raise_erupt_hurt', RUNE_PROPERTY_DEFAULT.raise_erupt_hurt),
        damage_increase: getProperty('damage_increase', RUNE_PROPERTY_DEFAULT.damage_increase),
        double_damage: getProperty('double_damage', RUNE_PROPERTY_DEFAULT.double_damage),
        // 基础属性
        basic_attack: getProperty('basic_attack', RUNE_PROPERTY_DEFAULT.basic_attack),
        erupt_odds: getProperty('erupt_odds', RUNE_PROPERTY_DEFAULT.erupt_odds),
        erupt_hurt: getProperty('erupt_hurt', RUNE_PROPERTY_DEFAULT.erupt_hurt),
        // 元素类型
        self_rune: getProperty('self_rune', RUNE_PROPERTY_DEFAULT.self_rune),
        add_rune: getProperty('add_rune', RUNE_PROPERTY_DEFAULT.add_rune),
    };
}
/**
 * * 创建 虚拟战斗属性面板
 *
 * @param {type.SET_PROPERTY_PANEL} input  - 设定战斗属性
 *
 * @returns {type.GET_PROPERTY_PANEL} - 输出战斗属性面板
 */
function CreateEmptyProperty(input) {
    /**
     * * 基础 战斗属性面板, 使用枚举定义的默认值
     */
    const proto = {};
    // 遍历枚举, 将枚举的键和值应用到 proto 对象上
    for (const key in RUNE_PROPERTY_DEFAULT) {
        if (RUNE_PROPERTY_DEFAULT.hasOwnProperty(key)) {
            proto[key] = RUNE_PROPERTY_DEFAULT[key];
        }
    }
    return MergeProperty(proto, input);
}
/**
 * * 创建 元素攻击
 *
 * @param {server.Entity} [self] - 发起元素攻击的实体
 *
 * @param {server.Entity} [target] - 遭受攻击的目标实体
 *
 * @param {boolean} [erupt] - 是否暴击
 *
 * @param {type.GET_PROPERTY_PANEL} [hurtData] - 攻击属性面板
 */
function ElementalAttack(self, target, erupt = false, hurtData) {
    // 判断 条件是否满足
    if (!self || !target || !target.isValid || !target.getComponent('health') || erupt == undefined)
        return;
    /**
     * * 元素伤害发起者 的 战斗属性面板
     */
    const selfData = MergeProperty(GetProperty(self), hurtData ?? {});
    /**
     * * 获取 目标属性
     */
    const targetData = GetProperty(target);
    /**
     * * 定义 伤害参数
     */
    const options = DamageOptions(self);
    /**
     * * 执行 元素反应 并获得 伤害倍率 提升值
     */
    const fusion = ElementalReactions(target, targetData.add_rune, selfData.self_rune);
    /**
     * * 获取 增加 伤害倍率 后的 属性面板
     */
    const improve = MergeProperty(selfData, { double_damage: fusion + selfData.double_damage });
    /**
     * * 计算 伤害值
     */
    const damage = RuneElementalDamage(improve, erupt);
    // 触发 完全命中 的 伤害
    if (selfData.self_rune !== targetData.self_rune)
        target.applyDamage(damage, options);
    // 触发 元素抗性 的 伤害
    else
        ElementalResistance(target, options, damage, rune_resistance);
    // 为目标 附加 元素印记
    SetProperty(target, { add_rune: selfData.self_rune });
    // 重置 自身属性
    SetProperty(self, reset_battle_data);
    // 刷新 元素印记
    RuneClingEntity.CreateToken(target);
}
/**
 * * 获取 伤害参数
 *
 * @param {server.Entity | server.Player} [self] - 发起元素攻击的实体
 *
 * @param {string} [hurtType] - 伤害类型
 *
 * @returns {server.EntityApplyDamageOptions} - 伤害参数
 */
function DamageOptions(self, hurtType) {
    return {
        cause: server.EntityDamageCause['entityExplosion'],
        damagingEntity: self
    };
}
/**
 * * 执行 符文元素反应
 *
 * @param {server.Entity} target - 进行元素反应 的 目标实体
 *
 * @param {type.RUNE_TYPE} old - 当前的 元素符文类型
 *
 * @param {type.RUNE_TYPE} add - 新增的 元素符文类型
 *
 * @returns {number} 元素符文反应后 提供的 倍率倍率提升值
 */
function ElementalReactions(target, old, add) {
    /**
     * * 获取 原有的 符文映射值
     */
    const getOldValue = RUNE_COUNT[old];
    /**
     * * 获取 新增的 符文映射值
     */
    const getAddValue = RUNE_COUNT[add];
    // 判断 目标实体是否存在
    if (!target)
        return 0;
    /**
     * * 获取 符文融合结果
     */
    const result = rune_fusion.get(getOldValue + getAddValue);
    // 判断 实体是否存在
    if (!result)
        return 0;
    // 执行 符文融合 事件
    if (result.event)
        result.event(target);
    // 返回 倍率倍率
    return result.double;
}
/**
 * * 结算当目标具有元素抗性时的伤害
 *
 * @param {server.Entity} target - 目标实体
 *
 * @param {server.EntityApplyDamageOptions} options - 伤害参数
 *
 * @param {Number} damage - 伤害值
 *
 * @param {Number} resistance - 元素抗性
 */
function ElementalResistance(target, options, damage, resistance) {
    // 播放 粒子效果
    TrySpawnParticle(target.dimension, 'constant:rune_resistance', target.getHeadLocation());
    // 播放 抵抗音效
    target.dimension.playSound('random.glass', target.location);
    // 伤害值 乘以 抗性
    target.applyDamage(damage * (1 - resistance), options);
}
/**
 * * 计算 符文元素伤害
 *
 * @param {type.GET_PROPERTY_PANEL} data 用于 计算 的 属性面板
 *
 * @param {boolean} erupt - 是否暴击
 *
 * @returns {number} 计算后 的 伤害值
 */
function RuneElementalDamage(data, erupt) {
    /**
     * * 计算基础攻击总值（基础伤害 + 攻击提升）
     */
    const baseAttack = data.basic_attack + data.raise_basic_attack;
    /**
     * * 计算暴击伤害倍率（基础暴击值 + 暴击提升值）
     */
    const criticalMultiplier = (data.erupt_hurt + data.raise_erupt_hurt) / 100;
    /**
     * * 未暴击时的基础伤害计算
     */
    const normalDamage = baseAttack * data.double_damage;
    /**
     * * 暴击时的增强伤害计算
     */
    const criticalDamage = (baseAttack * criticalMultiplier) * data.double_damage;
    /**
     * * 获取世界配置的最大伤害限制（默认安全整数最大值）
     */
    const maxDamage = server.world.getDynamicProperty('rune_hurt:max_damage') ?? Number.MAX_SAFE_INTEGER;
    /**
     * * 获取世界配置的最小伤害限制（默认5点基础伤害）
     */
    const minDamage = server.world.getDynamicProperty('rune_hurt:min_damage') ?? 5;
    /**
     * * 综合计算最终伤害值
     */
    const calculatedDamage = erupt ? (criticalDamage + data.damage_increase) : (normalDamage + data.damage_increase);
    // 返回经过范围限制的最终伤害值
    return Clamp({ min: minDamage, max: maxDamage }, calculatedDamage);
}
/**
 * 对指定实体周围的目标进行元素攻击
 *
 * 此函数根据给定的符文类型, 对服务器中特定实体周围的目标进行范围攻击
 *
 * 它首先定义了一组查询选项以筛选周围的实体, 然后对这些实体执行攻击操作
 *
 * @param {server.Entity} [self] 实施攻击的实体
 *
 * @param {type.RUNE_TYPE} [type] 触发的符文类型
 */
async function ScopeAdditional(self, type) {
    /**
     * 实体查询选项, 用于定义查询条件
     *
     * @type {server.EntityQueryOptions}
     */
    const options = {
        excludeTypes: ["minecraft:item", "minecraft:xp_orb"],
        location: self.location,
        maxDistance: 4,
        closest: 8
    };
    /**
     * 获取在指定范围内且符合查询条件的实体列表
     *
     * @type {server.Entity[]}
     */
    const entitys = self.dimension.getEntities(options);
    /**
     * * 获取数据
     */
    const getData = GetProperty(self);
    /**
     * * 合并数据
     */
    const hurtData = MergeProperty(getData, { self_rune: type });
    // 等待 5 帧
    await server.system.waitTicks(5);
    /**
     * 对查询到的每个实体执行元素攻击
     *
     * 使用简短的创建方法, 传递执行操作的实体, 目标实体, 是否是远程攻击以及合并后的属性数据
     */
    entitys.forEach(target => ElementalAttack(self, target, false, hurtData));
}
/**
 * * 符文事件 - 超载
 *
 * @param {server.Entity} self - 触发元素反应效果的实体
 */
function overload(self) {
    /**
     * 检查并限制事件的触发频率, 避免重复触发
     *
     * 如果事件在指定时间内已被触发, 则不再执行后续操作
     */
    if (!TriggerControl('元素反应', self, 20))
        return;
    // 造成范围性元素反应伤害, 并对范围内的实体应用符文效果
    ScopeAdditional(self, 'rune_red');
    // 在实体头部位置生成元素反应效果的粒子效果
    TrySpawnParticle(self.dimension, 'constant:rune_fusion.overload', self.getHeadLocation());
    // 不可对玩家实体使用该特效
    if (self instanceof server.Player)
        return;
    // 对实体施加向上的冲量, 模拟超载效果的物理表现
    self.applyImpulse(Vector.CONSTANT_UP);
}
/**
 * * 符文事件 - 潮汐
 *
 * @param {server.Entity} self - 触发元素反应效果的实体
 */
function tides(self) {
    /**
     * 检查并限制事件的触发频率, 避免重复触发
     *
     * 如果事件在指定时间内已被触发, 则不再执行后续操作
     */
    if (!TriggerControl('元素反应', self, 20))
        return;
    // 在实体头部位置生成元素反应效果的粒子效果
    TrySpawnParticle(self.dimension, 'constant:rune_fusion.tides', self.getHeadLocation());
    // 尝试熄灭实体身上的火焰
    self.extinguishFire(true);
}
/**
 * * 符文事件 - 催化
 *
 * @param {server.Entity} self - 触发元素反应效果的实体
 */
function catalysis(self) {
    /**
     * 检查并限制事件的触发频率, 避免重复触发
     *
     * 如果事件在指定时间内已被触发, 则不再执行后续操作
     */
    if (!TriggerControl('元素反应', self, 20))
        return;
    // 在实体头部位置生成元素反应效果的粒子效果
    TrySpawnParticle(self.dimension, 'constant:rune_fusion.catalysis', self.getHeadLocation());
}
/**
 * * 符文事件 - 感电
 *
 * @param {server.Entity} self - 触发元素反应效果的实体
 */
function electric(self) {
    /**
     * 检查并限制事件的触发频率, 避免重复触发
     *
     * 如果事件在指定时间内已被触发, 则不再执行后续操作
     */
    if (!TriggerControl('元素反应', self, 20))
        return;
    // 造成范围性元素反应伤害, 并对范围内的实体应用符文效果
    ScopeAdditional(self, 'rune_purple');
    // 在实体头部位置生成元素反应效果的粒子效果
    TrySpawnParticle(self.dimension, 'constant:rune_fusion.electric', self.getHeadLocation());
    // 不可对玩家实体使用该特效
    if (self instanceof server.Player)
        return;
    // 对实体施加向下的冲量, 模拟感电效果的物理表现
    self.applyImpulse(Vector.CONSTANT_DOWN);
}
/**
 * * 符文事件 - 共鸣
 *
 * @param {server.Entity} self - 触发元素反应效果的实体
 */
function resonance(self) {
    /**
     * 检查并限制事件的触发频率, 避免重复触发
     *
     * 如果事件在指定时间内已被触发, 则不再执行后续操作
     */
    if (!TriggerControl('元素反应', self, 20))
        return;
    // 造成范围性元素反应伤害, 并对范围内的实体应用符文效果
    ScopeAdditional(self, 'rune_orange');
    // 在实体头部位置生成元素反应效果的粒子效果
    TrySpawnParticle(self.dimension, 'constant:rune_fusion.resonance', self.getHeadLocation());
    // 不可对玩家实体使用该特效
    if (self instanceof server.Player)
        return;
    // 对实体施加向右的冲量, 模拟共鸣效果的物理表现
    self.applyImpulse(Vector.CONSTANT_HALF);
}
/**
 * * 符文事件 - 归零
 *
 * @param {server.Entity} self - 触发元素反应效果的实体
 */
function zero(self) {
    /**
     * 检查并限制事件的触发频率, 避免重复触发
     *
     * 如果事件在指定时间内已被触发, 则不再执行后续操作
     */
    if (!TriggerControl('元素反应', self, 20))
        return;
    // 在实体头部位置生成元素反应效果的粒子效果
    TrySpawnParticle(self.dimension, 'constant:rune_fusion.zero', self.getHeadLocation());
}
/**
 * * 符文事件 - 辉光
 *
 * @param {server.Entity} self - 触发元素反应效果的实体
 */
function brilliance(self) {
    /**
     * 检查并限制事件的触发频率, 避免重复触发
     *
     * 如果事件在指定时间内已被触发, 则不再执行后续操作
     */
    if (!TriggerControl('元素反应', self, 20))
        return;
    // 在实体头部位置生成元素反应效果的粒子效果
    TrySpawnParticle(self.dimension, 'constant:rune_fusion.brilliance', self.getHeadLocation());
}
/**
 * * 符文事件 - 激化
 *
 * @param {server.Entity} self - 触发元素反应效果的实体
 */
function sharpen(self) {
    /**
     * 检查并限制事件的触发频率, 避免重复触发
     *
     * 如果事件在指定时间内已被触发, 则不再执行后续操作
     */
    if (!TriggerControl('元素反应', self, 20))
        return;
    // 在实体头部位置生成元素反应效果的粒子效果
    TrySpawnParticle(self.dimension, 'constant:rune_fusion.sharpen', self.getHeadLocation());
    // 延迟一段时间后, 刷新实体的元素附着的符文效果
    server.system.run(() => SetProperty(self, { add_rune: 'rune_purple' }));
}
/**
 * * 符文事件 - 结晶
 *
 * @param {server.Entity} self - 触发元素反应效果的实体
 */
function crystal(self) {
    /**
     * 检查并限制事件的触发频率, 避免重复触发
     *
     * 如果事件在指定时间内已被触发, 则不再执行后续操作
     */
    if (!TriggerControl('元素反应', self, 20))
        return;
    // 在实体头部位置生成元素反应效果的粒子效果
    TrySpawnParticle(self.dimension, 'constant:rune_fusion.crystal', self.getHeadLocation());
    // 延迟一段时间后, 刷新实体的元素附着的符文效果
    server.system.run(() => SetProperty(self, { add_rune: 'rune_orange' }));
}
/**
 * * 符文事件 - 绝缘
 *
 * @param {server.Entity} self - 触发元素反应效果的实体
 */
function insulation(self) {
    /**
     * 检查并限制事件的触发频率, 避免重复触发
     *
     * 如果事件在指定时间内已被触发, 则不再执行后续操作
     */
    if (!TriggerControl('元素反应', self, 20))
        return;
    // 在实体头部位置生成元素反应效果的粒子效果
    TrySpawnParticle(self.dimension, 'constant:rune_fusion.insulation', self.getHeadLocation());
}
/**
 * * 符文事件 - 枯萎
 *
 * @param {server.Entity} self - 触发元素反应效果的实体
 */
function withered(self) {
    /**
     * 检查并限制事件的触发频率, 避免重复触发
     *
     * 如果事件在指定时间内已被触发, 则不再执行后续操作
     */
    if (!TriggerControl('元素反应', self, 20))
        return;
    // 在实体头部位置生成元素反应效果的粒子效果
    TrySpawnParticle(self.dimension, 'constant:rune_fusion.withered', self.getHeadLocation());
}
/**
 * * 符文事件 - 雷鸣
 *
 * @param {server.Entity} self - 触发元素反应效果的实体
 */
function thunderous(self) {
    /**
     * 检查并限制事件的触发频率, 避免重复触发
     *
     * 如果事件在指定时间内已被触发, 则不再执行后续操作
     */
    if (!TriggerControl('元素反应', self, 20))
        return;
    // 在实体头部位置生成元素反应效果的粒子效果
    TrySpawnParticle(self.dimension, 'constant:rune_fusion.thunderous', self.getHeadLocation());
}
/**
 * * 符文事件 - 流沙
 *
 * @param {server.Entity} self - 触发元素反应效果的实体
 */
function quicksand(self) {
    /**
     * 检查并限制事件的触发频率, 避免重复触发
     *
     * 如果事件在指定时间内已被触发, 则不再执行后续操作
     */
    if (!TriggerControl('元素反应', self, 20))
        return;
    // 在实体头部位置生成元素反应效果的粒子效果
    TrySpawnParticle(self.dimension, 'constant:rune_fusion.quicksand', self.getHeadLocation());
    // 延迟一段时间后, 刷新实体的元素附着的符文效果
    server.system.run(() => SetProperty(self, { add_rune: 'rune_orange' }));
}
/**
 * * 符文事件 - 律令
 *
 * @param {server.Entity} self - 触发元素反应效果的实体
 */
function directive(self) {
    /**
     * 检查并限制事件的触发频率, 避免重复触发
     *
     * 如果事件在指定时间内已被触发, 则不再执行后续操作
     */
    if (!TriggerControl('元素反应', self, 20))
        return;
    // 在实体头部位置生成元素反应效果的粒子效果
    TrySpawnParticle(self.dimension, 'constant:rune_fusion.directive', self.getHeadLocation());
}
/**
 * * 符文事件 - 偏振
 *
 * @param {server.Entity} self - 触发元素反应效果的实体
 */
function polarity(self) {
    // 限制 重复触发速度
    if (!TriggerControl('元素反应', self, 20))
        return;
    /**
     * * 生命值组件
     */
    const health = self.getComponent('health');
    // 判断 生命值组件 是否存在
    if (!health)
        return;
    /**
     * * 当前血量
     */
    const current = health?.currentValue ?? 0;
    /**
     * * 元素伤害钳位值
     */
    const Clamping = Math.max(10, Math.min((current * 0.15), 3000));
    // 生成粒子
    TrySpawnParticle(self.dimension, 'constant:rune_fusion.polarity', self.getHeadLocation());
    // 扣除实体百分比血量
    server.system.runTimeout(() => health?.setCurrentValue(current - Clamping), 2);
}
/**
 * * 符文事件 - 燃烧
 *
 * @param {server.Entity} self - 触发元素反应效果的实体
 */
function flame(self) {
    /**
     * 检查并限制事件的触发频率, 避免重复触发
     *
     * 如果事件在指定时间内已被触发, 则不再执行后续操作
     */
    if (!TriggerControl('元素反应', self, 20))
        return;
    // 在实体头部位置生成元素反应效果的粒子效果
    TrySpawnParticle(self.dimension, 'constant:rune_fusion.flame', self.getHeadLocation());
    // 根据实体名称的长度点燃实体
    self.setOnFire(self.typeId.length * 2, true);
    // 延迟一段时间后, 刷新实体的元素附着的符文效果
    server.system.run(() => SetProperty(self, { add_rune: 'rune_red' }));
}
/**
 * * 符文事件 - 若水
 *
 * @param {server.Entity} self - 触发元素反应效果的实体
 */
function like_water(self) {
    /**
     * 检查并限制事件的触发频率, 避免重复触发
     *
     * 如果事件在指定时间内已被触发, 则不再执行后续操作
     */
    if (!TriggerControl('元素反应', self, 20))
        return;
    // 在实体头部位置生成元素反应效果的粒子效果
    TrySpawnParticle(self.dimension, 'constant:rune_fusion.like_water', self.getHeadLocation());
}
/**
 * * 符文事件 - 生长
 *
 * @param {server.Entity} self - 触发元素反应效果的实体
 */
function produce(self) {
    /**
     * 检查并限制事件的触发频率, 避免重复触发
     *
     * 如果事件在指定时间内已被触发, 则不再执行后续操作
     */
    if (!TriggerControl('元素反应', self, 20))
        return;
    // 在实体头部位置生成元素反应效果的粒子效果
    TrySpawnParticle(self.dimension, 'constant:rune_fusion.produce', self.getHeadLocation());
    // 延迟一段时间后, 刷新实体的元素附着的符文效果
    server.system.run(() => SetProperty(self, { add_rune: 'rune_orange' }));
}
/**
 * * 符文事件 - 余烬
 *
 * @param {server.Entity} self - 触发元素反应效果的实体
 */
function embers(self) {
    /**
     * 检查并限制事件的触发频率, 避免重复触发
     *
     * 如果事件在指定时间内已被触发, 则不再执行后续操作
     */
    if (!TriggerControl('元素反应', self, 20))
        return;
    // 在实体头部位置生成元素反应效果的粒子效果
    TrySpawnParticle(self.dimension, 'constant:rune_fusion.embers', self.getHeadLocation());
}
/**
 * * 符文事件 - 绽放
 *
 * @param {server.Entity} self - 触发元素反应效果的实体
 */
function blossom(self) {
    // 限制 重复触发速度
    if (!TriggerControl('元素反应', self, 20))
        return;
    // 造成范围性元素反应伤害, 并对范围内的实体应用符文效果
    ScopeAdditional(self, 'rune_green');
    // 生成粒子
    TrySpawnParticle(self.dimension, 'constant:rune_fusion.blossom', self.getHeadLocation());
}
/**
 * * 符文事件 - 蒸发
 *
 * @param {server.Entity} self - 触发元素反应效果的实体
 */
function vapor(self) {
    /**
     * 检查并限制事件的触发频率, 避免重复触发
     *
     * 如果事件在指定时间内已被触发, 则不再执行后续操作
     */
    if (!TriggerControl('元素反应', self, 20))
        return;
    // 在实体头部位置生成元素反应效果的粒子效果
    TrySpawnParticle(self.dimension, 'constant:rune_fusion.vapor', self.getHeadLocation());
    // 尝试熄灭实体身上的火焰
    self.extinguishFire(true);
    // 延迟一段时间后, 刷新实体的元素附着的符文效果
    server.system.run(() => SetProperty(self, { add_rune: 'rune_blue' }));
}
// 向系统中注册元素附着与显示机制
RuneClingEntity.BriefCreate('世界初始化容器');

/*
 * 导出模块
 */
/**
 * * 获取 签订契约的角色 并 执行事件
 *
 * @param {server.Player} player - 作为主人的玩家
 *
 * @param {server.EntityQueryOptions} options - 查询选项
 *
 * @param {(entity: server.Entity) => void} after - 回调函数
 */
function GetContractRoles(player, options, after) {
    /**
     * * 角色查询选项
     */
    const merge = {
        excludeTypes: ["minecraft:item", "minecraft:xp_orb", player.typeId],
        families: ['starry'],
        ...options
    };
    /**
     * * 附近角色 的 列表
     */
    const roles = player.dimension.getEntities(merge).filter(role => role.getComponent('is_tamed'));
    // 筛选 与玩家 的 契约绑定 的 角色
    roles.filter(role => role.getDynamicProperty('entity:contract_user') == player.id);
    // 遍历 角色队列
    roles.forEach(role => after(role));
}
/**
 * * 获取 实体列表
 *
 * @param {server.Dimension} dimension - 执行程序的维度
 *
 * @param {server.EntityQueryOptions} options - 查询实体的选项
 *
 * @param {(entity0: server.Entity, entity1: server.Entity) => number} onSort - 排序函数
 *
 * @param {(entity: server.Entity) => boolean} onFilter - 过滤函数
 *
 * @returns {server.Entity[]} - 实体列表
 */
function EntitysSort(dimension, options, onSort, onFilter) {
    /**
     * * 获取 实体列表
     */
    const entitys = onSort ? dimension.getEntities(options).sort(onSort) : dimension.getEntities(options);
    return onFilter ? entitys.filter(onFilter) : entitys;
}
/**
 * * 获取 队友 并 执行事件
 *
 * @param entity - 实体对象
 *
 * @param after - 回调函数
 */
function GetPartner(entity, after) {
    /**
     * * 角色查询选项
     */
    const roleOptions = {
        location: entity.location,
        families: ['starry'],
        maxDistance: 32
    };
    /**
     * * 玩家查询选项
     */
    const playerOptions = {
        location: entity.location,
        maxDistance: 32
    };
    /**
     * * 获取实体列表
     */
    const partner = [
        ...entity.dimension.getEntities(roleOptions),
        ...entity.dimension.getPlayers(playerOptions)
    ];
    /**
     * * 契约者标识符
     */
    const contract = entity.getDynamicProperty('entity:contract_user');
    // 如果 实体 是这段 契约关系 中的 玩家 或者 实体 就执行 后处理
    partner.forEach((entity, index) => {
        // 如果实体不是这段契约关系中的实体, 则返回
        if (entity.id != contract && entity.getDynamicProperty('entity:contract_user') != contract)
            return;
        // 执行 回调函数
        after(entity, index);
    });
}

/*
 * 原版接口
 */
function translate(target, type) {
    // 如果目标为玩家或带有有效 nameTag 的实体，返回 {text: target.nameTag}
    if (target instanceof server.Player || (target instanceof server.Entity && target.nameTag.length >= 1))
        return { text: target.nameTag };
    // 如果目标为字符串，则根据 type 参数进行本地化处理
    else if (typeof target == 'string') {
        /**
         * * 获取识别标识
         */
        const split = target.split(':');
        // 根据type参数进行本地化处理
        switch (type) {
            case 'entity': return { translate: `entity.${(split[0] == 'minecraft') ? split[1] : target}.name` };
            case 'block': return { translate: `tile.${(split[0] == 'minecraft') ? split[1] : target}.name` };
            case 'item': return { translate: `item.${(split[0] == 'minecraft') ? split[1] : target}${(split[0] == 'minecraft') ? '.name' : ''}` };
            default: return { text: '未知的 -> ' + target };
        }
    }
    // 否则返回 {translate: target.localizationKey} 进行本地化处理
    else
        return { translate: target.localizationKey };
}

/*
 * 原版接口
 */
/**
 * * 编写 实体翻译 与 距离信息 文本组件
 *
 * @param {server.Entity} entity - 实体
 *
 * @param {number} distance - 距离
 *
 * @returns {server.RawMessage} - 返回 实体翻译 与 距离信息 文本组件
 */
function DistanceAndName(entity, distance) {
    return {
        rawtext: [
            { text: '§l' }, translate(entity), { text: `\n§9距离: §5${distance}` }
        ]
    };
}
/**
 * * 根据日志权限决定是否抛出错误
 *
 * * 此函数用于在允许显示日志的情况下抛出一个带有原因的错误
 *
 * * 在开发或特定环境下提供更详细的错误信息, 而在生产或限制日志输出的环境下保持静默
 *
 * @param {string} [message] 错误信息, 描述发生了什么问题
 *
 * @param {string} [cause] 错误的原因, 提供额外的上下文信息
 */
function ThrowErrorIfPermitted(message, cause) {
    // 检查是否有权限显示日志, 如果没有则直接返回, 不执行后续操作
    if (!Permit.can_display_logs)
        return;
    // 抛出一个带有原因的错误
    throw new Error(message, { cause: cause });
}
/**
 * * 使用 小标题 的 形式 向 玩家 显示特定信息
 *
 * @param {server.Block | server.Entity | server.Player} object 播报 信息 的 实例对象
 *
 * @param {number} range 信息 的 广播范围
 *
 * @param {string} text 信息 的 文本类型
 */
function IntelMessage(object, range, text) {
    /**
     * * 设置广播范围
     */
    const setOptions = {
        location: object.location,
        maxDistance: range
    };
    /**
     * * 获取玩家队列
     */
    const getPlayers = object.dimension.getPlayers(setOptions);
    //遍历玩家队列 播放文本信息
    getPlayers.forEach(info => info.onScreenDisplay.setActionBar(text));
}
/**
 * * 显示悬浮字信息
 *
 * @param {server.Block} block - 显示悬浮字信息的方块
 *
 * @param {string} text - 悬浮字信息的文本
 */
function DisplayFloatingText(block, text) {
    /**
     * * 信息显示实体类型
     */
    const typeId = 'starry_map:execute.name_display';
    // 清除当前方块位置的所有悬浮字信息实体
    block.dimension.getEntitiesAtBlockLocation(block.center())
        .filter(entity => entity.typeId === typeId)
        .forEach(entity => entity.remove());
    /**
     * * 创建 信息显示实体
     */
    const entity = TrySpawnEntity(block.dimension, typeId, block.bottomCenter());
    // 将信息内容编写为实体名称
    if (entity instanceof server.Entity)
        entity.nameTag = text || '未知';
}
/**
 * * 修改通知消息
 *
 * @param {string} title - 消息通知 的 标题
 *
 * @param {server.Block | server.Entity | server.Player}  block - 消息通知 的 发信源
 *
 * @param {server.RawMessage} message - 消息通知 的 文本内容
 */
function AlterMessageNotify(title, block, message) {
    /**
     * * 编写 发信源信息
     */
    const rawMessage = {
        rawtext: [
            { text: '| §l§p' + block.dimension.id + '§r | §a' + Vector.toString(block.location) + '§r |\n\n' },
            message
        ]
    };
    // 将当前区块的 消息通知 写入 数据库
    message_notify.set(title, rawMessage);
    // 如果是简单的信息 则 显示悬浮字信息
    if (!message.rawtext)
        DisplayFloatingText(block, message.text ?? '未知');
}
/**
 * * 处理错误信息
 *
 * @param {string} title - 错误信息 的 标题
 *
 * @param {server.Block | server.Entity | server.Player}  block - 错误信息 的 发信源
 *
 * @param {server.RawMessage} message - 错误信息 的 文本内容
 */
function ErrorMessage(title, block, message) {
    /**
     * * 定义 令牌类型
     */
    const type = 'error -> ' + block.typeId;
    /**
     * * 获取令牌
     */
    const token = TriggerControl(type, block, 40);
    if (!token)
        return;
    /**
     * * 定义 粒子参数
     */
    const molang = new server.MolangVariableMap();
    // 设置 粒子参数
    molang.setFloat('variable.direction', RandomFloor(0, 2));
    molang.setFloat('variable.size', 3);
    // 显示 发生错误情况 的 粒子效果
    TrySpawnParticle(block.dimension, 'scripts:path_star4_large', block.center(), molang);
    // 发送 发生错误情况 的 消息通知
    AlterMessageNotify(title, block, message);
}
/**
 * * 显示数值粒子效果
 *
 * @param {type.LOCATION_AND_DIMENSION} anchor - 坐标与维度
 *
 * @param {number} numberToDisplay - 显示的数值
 *
 * @param {server.Vector3} offset - 偏移量
 */
function NumberParticleDisplay(anchor, numberToDisplay, offset) {
    // 判断 数值 是否过大
    if (numberToDisplay > 99999)
        return;
    /**
     * * 粒子参数
     */
    const molang = new server.MolangVariableMap();
    /**
     * * 粒子颜色
     */
    const particleColors = [...rune_color.values()];
    /**
     * * 粒子数值
     */
    const numberDigits = Math.floor(numberToDisplay).toString().split('').reverse().map(value => parseInt(value, 10));
    /**
     * * 随机色彩索引
     */
    const randomColorIndex = RandomFloor(0, particleColors.length - 3);
    // 设置 粒子属性
    molang.setVector3('variable.offset', Vector.random(offset, 0.5));
    molang.setColorRGB('variable.color', particleColors[randomColorIndex]);
    // 显示 数值粒子效果
    numberDigits.forEach((value, index) => {
        molang.setVector3('variable.property', { x: value, y: index, z: numberDigits.length });
        TrySpawnParticle(anchor.dimension, 'scripts:setting.number_display', anchor.location, molang);
    });
}
/**
 * * 返回 选中目标 的 信息
 *
 * @param {server.Entity | server.Player} object - 执行 目标选择 的 实体单位
 *
 * @returns {server.RawMessage[]} 状态信息
 */
function GetTargetIntel(object) {
    /**
     * * 获取 实体对象
     */
    const entity = object.getEntitiesFromViewDirection()[0]?.entity;
    /**
     * * 获取 方块对象
     */
    const block = object.getBlockFromViewDirection()?.block;
    /**
     * * 适配游戏的信息格式
     */
    const message = [];
    // 检测实体是否存在
    if (entity && entity.isValid) {
        // 确认实体是否为物品
        if (entity.typeId != 'minecraft:item')
            return GetEntityIntel(entity, message);
        /**
         * * 获取 物品对象
         */
        const item = entity.getComponent('minecraft:item')?.itemStack;
        // 确认 物品是否存在
        if (!item)
            return [{ text: '§4 未知物品 §r' }];
        // 获取 物品信息
        return GetItemStackIntel(item, message);
    }
    // 检测方块是否存在
    else if (block && block.isValid)
        return GetBlockIntel(block, message);
    // 确认 目标是否为空
    return [{ text: '§4 未知目标 §r' }];
}
/**
 * * 返回 目标标签 的 排列结果
 *
 * @param object - 输入的 目标对象
 *
 * @returns {server.RawMessage[]} - 返回的排列结果
 */
function GetTargetTags(object) {
    return object.getTags().map(info => { return { text: info + '\n' }; });
}
/**
 * * 返回 方块状态对象的排列结果
 *
 * @param {Record<string, boolean | number | string>} states - 输入的方块状态对象
 *
 * @returns {server.RawMessage[]} - 返回的排列结果
 */
function GetBlockRecord(states) {
    // 设定 各项参数
    let [output, name, value] = [[], [], []];
    // 解析 方块排列 信息
    for (let index in states) {
        value.push(states[index]);
        name.push(index);
    }
    for (let α = 0; α < name.length; α++) {
        output.push({ text: `§r§l<§r§5 ${name[α]} §7:§2 ${value[α]} §r§l>§r\n` });
    }
    //返回 方块排列 信息
    return output;
}
/**
 * * 返回 容器对象的排列结果
 *
 * @param {server.Container | undefined} container - 输入的容器对象
 *
 * @param {server.RawMessage[]} message - 输入的排列信息
 */
function GetInventoryIntel(container, message) {
    // 遍历 库存容器
    if (container)
        for (let index = 0; index < container.size; index++) {
            /**
             * * 容器物品
             */
            const item = container.getItem(index);
            if (!item)
                continue;
            message.push(translate(item), { text: `§r : §2${item.amount}§r\n` });
        }
}
/**
 * * 返回 物品对象的排列结果
 *
 * @param {server.ItemStack} item - 输入的物品对象
 *
 * @param {server.RawMessage[]} message - 输入的排列信息
 *
 * @returns {server.RawMessage[]} - 返回的排列结果
 */
function GetItemStackIntel(item, message) {
    /**
     * * 获取 物品耐久
     */
    const durability = item.getComponent('minecraft:durability');
    /**
     * * 设定基础文本
     */
    const info = [
        { text: '§5§o§l[§9 物品 §5]§r : ' },
        translate(item),
        { text: ' → ' },
        { text: item.typeId },
        { text: `\n\n§5§o§l[§9 数量 §5]§r : ${item.amount}` },
        { text: `\n\n§5§o§l[§9 耐久 §5]§r : ${durability?.damage ?? 0}/${durability?.maxDurability ?? 0}` },
        { text: '\n\n§5§o§l[§9 标签 §5]§r :\n' }
    ];
    //写入信息文本
    message.push(...info, ...GetTargetTags(item));
    // 输出文本信息
    return message;
}
/**
 * * 返回 实体对象的排列结果
 *
 * @param {server.Entity} entity - 输入的实体对象
 *
 * @param {server.RawMessage[]} message - 输入的排列信息
 *
 * @returns {server.RawMessage[]} - 返回的排列结果
 */
function GetEntityIntel(entity, message) {
    /**
     * * 获取 实体血量
     */
    const getHealth = entity.getComponent('minecraft:health');
    /**
     * * 获取 基础移速
     */
    const getBasisSpeed = entity.getComponent('minecraft:movement');
    /**
     * * 获取 栓绳组件
     */
    const getisTether = entity.getComponent('minecraft:leashable');
    /**
     * * 获取 驯服组件
     */
    const getTameable = entity.getComponent('minecraft:tameable');
    /**
     * * 获取 熔岩移速
     */
    const getMagmaSpeed = entity.getComponent('minecraft:lava_movement');
    /**
     * * 获取 水下移速
     */
    const getWaterSpeed = entity.getComponent('minecraft:underwater_movement');
    /**
     * * 获取 全部组件标识
     */
    const getAllComponentsID = entity.getComponents().map(info => [{ text: info.typeId + '\n' }][0]);
    /**
     * * 获取 驯服材料列表
     */
    const getTameItems = getTameable ? getTameable.getTameItems.map(info => { return { rawtext: [{ text: '\n' }, translate(info)] }; }) : [{ text: '\n' }];
    /**
     * * 设定基础文本
     */
    const info = [
        { text: '§5§o§l[§9 实体 §5]§r : ' },
        translate(entity),
        { text: ' → ' },
        { text: entity.typeId },
        { text: `\n\n§5§o§l[§9 位置 §5]§r : §n${Vector.toString(entity.location)}§r` },
        { text: `\n\n§5§o§l[§9 血量 §5]§r : §2${getHealth?.currentValue ?? 0}/${getHealth?.defaultValue ?? 0}§r` },
        { text: `\n\n§5§o§l[§9 能否栓绳 §5]§r : §6${!!getisTether}§r` },
        { text: `\n\n§5§o§l[§9 陆地移速 §5]§r : §2${Math.floor((getBasisSpeed?.defaultValue ?? 0) * 100) / 100}§r` },
        { text: `\n\n§5§o§l[§9 水下移速 §5]§r : §2${Math.floor((getWaterSpeed?.defaultValue ?? 0) * 100) / 100}§r` },
        { text: `\n\n§5§o§l[§9 熔岩移速 §5]§r : §2${Math.floor((getMagmaSpeed?.defaultValue ?? 0) * 100) / 100}§r` },
        { text: '\n\n§5§o§l[§9 驯服材料 §5]§r : §6' },
    ];
    /**
     * * 实体背包
     */
    const container = entity.getComponent('inventory')?.container;
    /**
     * * 背包库存
     */
    const inventory = [{ text: '§5§o§l[§9 背包 §5]§r :\n' }];
    // 遍历 实体背包
    GetInventoryIntel(container, inventory);
    //写入信息文本
    message.push(...info, ...getTameItems, { text: '\n§5§o§l[§9 标签 §5]§r :\n' }, ...GetTargetTags(entity), { text: '\n§5§o§l[§9 组件 §5]§r:\n' }, ...getAllComponentsID, ...inventory);
    // 返回信息文本
    return message;
}
/**
 * * 返回 方块对象的排列结果
 *
 * @param block - 输入的方块对象
 *
 * @param {server.RawMessage[]} message - 输入的排列信息
 *
 * @returns {server.RawMessage[]} - 返回的排列结果
 */
function GetBlockIntel(block, message) {
    /**
     * * 获取方块状态
     */
    const states = block.permutation.getAllStates();
    /**
     * * 设定基础文本
     */
    const info = [
        { text: '§5§o§l[§9 方块 §5]§r : ' },
        translate(block),
        { text: ' → ' },
        { text: block.typeId },
        { text: `\n\n§5§o§l[§9 红石能量 §5]§r : §4${block.getRedstonePower() ?? 0}§r` },
        { text: '\n\n§5§o§l[§9 方块状态 §5]§r :\n' },
    ];
    /**
     * * 方块容器
     */
    const container = block.getComponent('inventory')?.container;
    /**
     * * 容器库存
     */
    const inventory = [{ text: '\n§5§o§l[§9 方块容器 §5]§r :\n' }];
    // 遍历方块容器
    GetInventoryIntel(container, inventory);
    // 写入信息文本
    message.push(...info, ...GetBlockRecord(states), { text: '\n§5§o§l[§9 方块标签 §5]§r :\n' }, ...GetTargetTags(block), ...inventory);
    // 输出文本信息
    return message;
}

/*
 * 原版接口
 */
/**
 * 模块的名称标签
 */
const nameTag = '§d§l月华§r';
/**
 * 决策阈值
 */
let decisionThreshold = 0.25;
// TODO : [ 知识库 ]
/**
 * 预设回复消息模板
 */
class ReplyMessages {
    /**
     * 根证书有效
     */
    static get root_certificate_set() {
        return { text: '#$^$#已获得根证书, 授权签发完成!\n' };
    }
    /**
     * 获取根证书
     */
    static get get_root_certificate() {
        return { text: '正在为你签发授权, #$^$#需要您提供一下根证书\n' };
    }
    ;
    /**
     * 根证书错误
     */
    static get root_certificate_error() {
        return { text: '根证书错误, #$^$#无法给您进行临时授权\n' };
    }
    ;
    /**
     * 询问需要什么服务
     */
    static get ask_for_task() {
        return { text: '请问需要我做些什么呀?\n' };
    }
    ;
    /**
     * 未识别的主题
     */
    static get unknown_theme() {
        return { text: '#$^$#听不太明白哦……你能再详细说一下吗?\n' };
    }
    ;
    /**
     * 缺少相关资料
     */
    static get unknown_paper() {
        return { text: '很抱歉, #$^$#似乎没有找到您想要的资料呢……\n' };
    }
    ;
    /**
     * 成功获取资料
     */
    static get obtain_paper() {
        return { text: '#$^$#找到了哦, 请看以下资料 : \n\n' };
    }
    ;
    /**
     * 未知的生态群系
     */
    static get unknown_biome() {
        return { text: '看起来这个群系#$^$#还没有发现过……能否提供更多信息呢?\n' };
    }
    ;
    /**
     * 未识别的节点
     */
    static get unknown_node() {
        return { text: '#$^$#很抱歉, 不太明白您的意思, 能换个说法再解释一下吗?\n' };
    }
    ;
    /**
     * 未知记忆
     */
    static get unknown_echo() {
        return { text: '这个记忆, #$^$#似乎有些模糊, 能否重新描述一遍?\n' };
    }
    ;
    /**
     * 执行记忆
     */
    static get enact_echo() {
        return { text: '#$^$#明白了哦! 正在执行中啦~\n' };
    }
    ;
    /**
     * 日志状态切换
     */
    static get log_toggle() {
        return { text: '#$^$#收到你的指令啦! 正在切换日志状态哦~\n' };
    }
    ;
    /**
     * 权限不足
     */
    static get power_lack() {
        return { text: '哎呀, 权限不够的话, #$^$#就不能帮你做这个操作啦……\n' };
    }
    ;
    /**
     * 设置 虚岩矿脉
     */
    static get realm_mineral() {
        return { text: '#$^$#收到你的指令啦! 我将借助<§q§l 律令 §r>的力量, 协助你调试<§s§l 虚岩矿脉 §r>\n' };
    }
    ;
    /**
     * 设置 星尘能量
     */
    static get realm_energy() {
        return { text: '#$^$#看到你的请求啦! 我将借助<§q§l 律令 §r>的力量, 协助你调试<§u§l 星尘能量 §r>\n' };
    }
    ;
    /**
     * 执行 元素攻击
     */
    static get pursue_rune_hurt() {
        return { text: '#$^$#听到你的需求了! 我将借助<§q§l 律令 §r>的力量, 协助你释放<§5§l 元素攻击 §r>\n' };
    }
    ;
    /**
     * 修改 动态属性
     */
    static get pursue_dynamic_property() {
        return { text: '#$^$#明白你的指令啦! 我将借助<§q§l 律令 §r>的力量, 协助你调试<§5§l 动态属性 §r>\n' };
    }
    ;
    /**
     * 创建 雾海裂隙
     */
    static get pursue_fissure() {
        return { text: '#$^$#知道你的愿望啦! 我将借助<§q§l 律令 §r>的力量, 协助你构建<§9§l 雾海裂隙 §r>\n' };
    }
    ;
    /**
     * 扩展功能模板
     */
    static get craft_template() {
        return { root: [], only: true, priority: 128 };
    }
    ;
    /**
     * 重置 结构限制
     */
    static get reset_structural_constraints() {
        return { text: '#$^$#成功重置了<§9 结构限制 §r>! 有些结构可以重新生成啦~\n' };
    }
    ;
    /**
     * 打印到聊天栏
     */
    static get print_to_chat_bar() {
        return { text: '明白了! #$^$#会把结果打印到聊天栏里~ 这样你就能看到啦!\n' };
    }
    ;
    /**
     * 创建数据目录
     */
    static get create_data_directory() {
        return { text: '#$^$#明白了, 正在创建你需要的数据目录\n' };
    }
    ;
    /**
     * 无法选择
     */
    static get cannot_select() {
        return { text: '§l§m没有了哦, ' + nameTag + '什么都没有了啦……' };
    }
    ;
    /**
     * 函数采用了实验性API, 目前暂不支持继续使用该接口,请等待后续版本更新
     */
    static get experimental_api_disabled() {
        return { text: '很抱歉呀, 这个接口#$^$#目前还在实验阶段, 目前无法继续使用哦~ 等后续版本更新啦! \n' };
    }
    ;
    /**
     * 无法识别的查询结果
     */
    static get unknown_query_results() {
        /**
         * 应答模板
         */
        const template = [
            "#$^$#听不太明白哦……你能再详细说一下吗?\n",
            "很抱歉, #$^$#似乎不记得跟这个有关的信息呢……\n",
            "这个记忆, #$^$#似乎有些模糊, 能否重新描述一遍?\n",
            "#$^$#很抱歉, 不太明白您的意思, 能换个说法再解释一下吗?\n",
        ];
        return { text: template[RandomFloor(0, template.length)] };
    }
    /**
     * 无效的构造函数
     */
    constructor() { }
    ;
}
/**
 * 存储用户输入历史记录的数组, 用于检测重复输入行为
 *
 * @type {string[]}
 */
const userInputHistory = [];
/**
 * 附加功能
 */
const scalability$1 = new Map();
/**
 * 正在进行聊天的玩家的标识符列表
 */
const playerOfChat = new Set();
/**
 * 进行 数据检索 的 数据库
 */
const material = [];
/**
 * 聊天记录缓存 [ 玩家标识符 , [ 玩家的输入, 月华的回应 ] ]
 */
const contextRegistry = new Map();
// TODO : [ 功能组件 ]
/**
 * lexicon百科 访问接口
 *
 * @param {server.Player} player 玩家对象, 包含玩家的ID、位置等信息
 *
 * @param {string} rawQuery 原始查询字符串, 玩家输入的内容
 *
 * @param {boolean} useImmersiveMode 是否使用沉浸式模式, 默认为false
 *
 * @returns 符合MC消息协议的RawMessage对象, 包含搜索结果或执行代码后的输出
 */
function lexiconInterface(player, rawQuery, useImmersiveMode = false, isChat = false) {
    /**
     * 对查询字符串进行标准化处理, 转换为NFC形式并转为小写, 然后按空格分割成语义片段
     *
     * @type {string[]}
     */
    const semanticSegments = rawQuery.normalize('NFC').toLowerCase().split(/\s+/);
    /**
     * 构建标准化响应容器, 符合MC消息协议, 用于存储最终的返回消息
     *
     * @type {server.RawMessage}
     */
    const responsePackage = { rawtext: [] };
    // 空输入防护, 如果输入为空, 返回提示消息
    if (!rawQuery?.trim() || rawQuery.trim().length == 0)
        return { rawtext: [ReplyMessages.unknown_query_results] };
    /**
     * 提取查询字符串的第一个语义片段作为主要查询词
     *
     * @type {string}
     */
    const mainQueryWord = semanticSegments[0];
    /**
     * 初始化输出内容数组, 用于存储搜索结果或执行代码后的消息
     *
     * @type {server.RawMessage[]}
     */
    const outputContent = [];
    /**
     * 初始化代码函数数组, 用于存储需要执行的代码逻辑
     *
     * @type {((player: server.Player, texts: string[], rawtexts: string[]) => server.RawMessage | server.RawMessage[])[]}
     */
    const codeFunctions = [];
    /**
     * 规范化资料表, 将材料数据转换为Map结构, 方便快速查询
     *
     * @type {Map<string, type.LEXICON_INTEL>}
     */
    const normalizedDatabase = new Map(material);
    /**
     * 使用严谨模式查询数据库, 获取精确匹配的结果
     *
     * @type {type.LEXICON_INTEL | undefined}
     */
    const strictQueryResult = normalizedDatabase.get(mainQueryWord);
    /**
     * 数据库样本数据, 用于后续的模糊匹配和相关性计算
     *
     * @type {type.LEXICON_INTEL[]}
     */
    const databaseSample = material.map(info => info[1]);
    /**
     * 根节点集合, 用于记录根节点, 以避免重复显示
     */
    const onlyRoot = new Set();
    /**
     * 文本结尾分隔符
     *
     * @type {server.RawMessage }
     */
    const finale = { text: '=-=-=-=-=-=-=-=-=-=\n' };
    /**
     * 处理样本数据并生成输出内容
     *
     * 该函数遍历数据库样本, 根据是否启用模糊匹配来筛选符合条件的资料, 并将符合条件的资料内容添加到输出内容数组中。
     *
     * @param {boolean} isFuzzy - 是否启用模糊匹配模式。如果为 true, 则使用模糊匹配；否则使用精确匹配。
     */
    const processSample = (isFuzzy) => {
        for (const target of databaseSample) {
            /**
             * 根节点信息
             */
            const rootNode = target.root.join(' * ');
            /**
             * 构建资料名称, 包含根节点信息
             *
             * @type {server.RawMessage }
             */
            const title = { text: '§q§l' + rootNode + '§r\n\n' };
            /**
             * 根标签合集
             */
            const rootTag = new Set(target.root);
            // 判断是否启用模糊匹配
            if (isFuzzy) {
                /**
                 * 计算查询词与当前样本的匹配度
                 */
                const proximity = calculateKeywordRelevance(mainQueryWord, rootNode, target.root);
                // 如果匹配度低于决策阈值, 则跳过当前样本
                if (proximity < decisionThreshold)
                    continue;
            }
            else {
                // 如果根节点不包含查询词, 则跳过当前样本
                if (!rootTag.has(mainQueryWord))
                    continue;
            }
            /**
             * 如果当前样本包含代码逻辑, 则将其添加到代码函数数组中。
             */
            if (target.code)
                codeFunctions.push(target.code);
            // 如果文档应具有唯一性且未被记录过, 并且存在资料内容, 则将资料内容添加到输出内容数组, 并记录根节点。
            if (target.only && !onlyRoot.has(rootNode) && target.intel) {
                // 添加到输出内容
                outputContent.push(useImmersiveMode ? {} : title, ...target.intel, finale);
                // 记录根节点
                onlyRoot.add(rootNode);
            }
            // 如果文档不需要唯一性并且存在资料内容, 则直接将资料内容添加到输出内容数组。
            else if (!target.only && target.intel) {
                // 添加到输出内容
                outputContent.push(useImmersiveMode ? {} : title, ...target.intel, finale);
            }
        }
    };
    // Fisher-Yates洗牌算法实现
    for (let currentIndex = databaseSample.length - 1; currentIndex > 0; currentIndex--) {
        /**
         * 生成随机索引
         */
        const randomIndex = Math.floor(Math.random() * (currentIndex + 1));
        // 交换当前位置和随机位置元素
        [databaseSample[currentIndex], databaseSample[randomIndex]] = [databaseSample[randomIndex], databaseSample[currentIndex]];
    }
    // 如果存在精确匹配结果, 处理其内容和代码逻辑
    if (strictQueryResult) {
        /**
         * 根节点信息
         */
        const rootNode = strictQueryResult.root.join(' * ');
        /**
         * 构建资料名称, 包含根节点信息
         *
         * @type {server.RawMessage }
         */
        const title = { text: '§q§l' + rootNode + '§r\n\n' };
        // 如果存在代码逻辑, 添加到代码函数数组
        if (strictQueryResult.code)
            codeFunctions.push(strictQueryResult.code);
        // 如果存在资料内容, 将资料内容添加到输出内容数组
        if (strictQueryResult.intel)
            outputContent.push(useImmersiveMode ? {} : title, ...strictQueryResult.intel, finale);
    }
    // 使用标签检索模式扫描数据库样本
    processSample(false);
    // 如果没有找到匹配的样本, 使用模糊匹配模式扫描数据库样本
    if (outputContent.length === 0)
        processSample(true);
    // 如果存在代码函数, 执行并处理返回值
    if (codeFunctions.length >= 1 && codeFunctions[0] !== undefined) {
        /**
         * 执行第一个代码函数, 获取返回值
         *
         * @type {server.RawMessage | server.RawMessage[]}
         */
        const codeOutput = codeFunctions[0]?.(player, semanticSegments.slice(1), semanticSegments, isChat);
        // 如果返回值是数组, 展开并添加到输出内容
        if (Array.isArray(codeOutput))
            outputContent.push(...codeOutput);
        // 否则直接添加到输出内容
        else
            outputContent.push(codeOutput);
    }
    // 如果输出内容为空, 则转为聊天模式输出
    if (outputContent.length === 0)
        responsePackage.rawtext?.push(generateResponse(mainQueryWord));
    // 否则将所有输出内容添加到响应容器
    else
        responsePackage.rawtext?.push(...outputContent);
    // 会话上下文持久化, 支持对话延续
    contextRegistry.set(player.id, [rawQuery, responsePackage]);
    // 导出查询结果, 返回最终的响应容器
    return responsePackage;
}
/**
 * 显示百科窗口界面
 *
 * 该函数为玩家展示一个交互窗口, 允许玩家选择不同的百科功能, 包括百科查询, 知识库目录和技能库目录。
 *
 * @param {server.Player} player - 玩家对象
 *
 * @returns {Promise<void>} - 返回一个Promise, 表示异步操作的完成
 */
async function lexiconWindowedInterface(player) {
    // 延迟执行, 避免触发器冲突
    await server.system.waitTicks(0);
    /**
     * 标题
     */
    const title = { text: "§9《§u§l §r" + nameTag + "§u§l百科 §9》§r" };
    /**
     * 定义了 窗口界面 的 表单对象
     */
    const display = new serverUI.ActionFormData().title(title).body(formatOutputMessage());
    // 设置事件触发限速器
    if (!TriggerControl('触发月华百科', player, 40))
        return;
    // 添加按钮
    display.button('§9<§l§s 百科查询 §r§9>').button('§9<§l§u 知识库目录 §r§9>').button('§9<§l§v 技能库目录 §r§9>').button('§9<§l§m 关闭窗口 §r§9>').show(player).then(response => {
        // 检测玩家是否未做出选择 或 取消操作
        if (response.canceled || response.selection == undefined)
            return;
        // 根据玩家选择的按钮执行不同的操作
        switch (response.selection) {
            case 0:
                windowedRetriever(player);
                break;
            case 1:
                displayDocumentCatalog(player, []);
                break;
            case 2:
                displayScalabilityCatalog(player, []);
                break;
            default: return;
        }
    });
}
/**
 * 窗口检索器
 *
 * 为玩家展示一个交互窗口, 允许玩家输入文本信息
 *
 * @param {server.Player} player - 玩家对象
 *
 * @param {server.RawMessage} [content=undefined] - 界面上显示的内容
 *
 * @param {string} [initialInput=undefined] - 文本输入框中预先输入的内容
 */
function windowedRetriever(player, content, initialInput) {
    /**
     * 标题
     */
    const title = { text: "§9《§u§l §r" + nameTag + "§u§l百科 §9》§r" };
    /**
     * 获取 玩家背包
     */
    const container = player.getComponent('minecraft:inventory')?.container;
    /**
     * 获取 选中的物品的标识符
     */
    const typeID = container?.getItem(player.selectedSlotIndex)?.typeId;
    /**
     * 默认文本
     */
    const defaultText = !content ? typeID : (initialInput ? initialInput + ' ' : undefined);
    /**
     * 修饰输出信息, 生成格式化的文本消息
     */
    const displayText = formatOutputMessage(content);
    /**
     * 判断输入的文本长度, 如果小于等于64字节或为空, 则直接显示在聊天栏中, 否则显示表单
     */
    const condition = JSON.stringify(displayText).length <= 64 || (displayText.rawtext && displayText.rawtext?.length <= 2);
    // 根据输入的文本长度判断是否直接显示在聊天栏中
    if (condition && !initialInput)
        player.sendMessage(displayText);
    // 如果文本过长, 则显示表单
    else {
        /**
         * 定义了 窗口界面 的 表单对象
         */
        const display = new serverUI.ModalFormData().title(title);
        // 加入输入框
        display.textField(displayText, ReplyMessages.ask_for_task, { 'defaultValue': defaultText });
        // 显示表单
        display.show(player).then(option => {
            // 如果玩家取消了表单, 则不进行操作
            if (option.canceled || !option.formValues)
                return;
            /**
             * 获取玩家输入的文本
             */
            const rawtext = option.formValues[0];
            // 显示窗口检索表单
            windowedRetriever(player, lexiconInterface(player, rawtext));
        });
    }
}
/**
 * 判断特定玩家是否具有权限执行某些操作
 *
 * @param {server.Player} user - 需要查询权限的玩家对象
 *
 * @returns {boolean} - 返回玩家是否有权限的布尔值
 */
function isPlayerAuthorized(user) {
    /**
     * 获取当前维度下处于创造模式的玩家列表
     */
    const creativePlayers = user.dimension.getPlayers({ gameMode: server.GameMode.Creative });
    /**
     * 判断给定玩家是否在创造模式玩家列表中
     */
    const isInCreativeMode = creativePlayers.some(player => player.id === user.id);
    /**
     * 检查玩家是否已阅读并同意"单次授权协定"
     */
    const hasAgreedToAgreement = getMaterialRootTag('单次授权协定').some(item => item === user.nameTag);
    // 返回判断结果
    return isInCreativeMode || hasAgreedToAgreement;
}
/**
 * 处理服务器原始消息对象中的名称占位符
 *
 * @typeParam T - 输入数据类型, 自动推断为 server.RawMessage 或 server.RawMessage[]
 *
 * @param {T} input - 服务器原始消息对象或其数组
 *
 * @returns {T} - 保持输入类型的处理结果
 *
 * @example
 * // 返回类型自动推断为 server.RawMessage
 * const result = replacePlaceholders(rawMessage);
 *
 * @example
 * // 返回类型自动推断为 server.RawMessage[]
 * const results = replacePlaceholders([rawMessage1, rawMessage2]);
 */
function replacePlaceholders(input) {
    /**
     * 名称占位符正则表达式
     */
    const placeholderRegex = /(#\$[\^]+\$\#)/g;
    /**
     * 替换占位符为实际名称
     */
    const replacedString = JSON.stringify(input).replace(placeholderRegex, nameTag);
    // 保持原始类型结构并返回
    return JSON.parse(replacedString);
}
/**
 * 随机化响应模式数组并追加默认兜底响应
 *
 * @param {Array<[RegExp, string[]]>} patterns - 包含正则表达式和对应响应数组的元组集合
 *
 * @returns {Array<[RegExp, string[]]>} 处理后的随机模式数组（包含追加的兜底响应）
 */
function randomizePatterns(patterns) {
    /**
     * 创建模式数组的浅拷贝
     */
    const randomizedPatterns = [...patterns];
    // Fisher-Yates洗牌算法实现
    for (let currentIndex = randomizedPatterns.length - 1; currentIndex > 0; currentIndex--) {
        /**
         * 生成随机索引
         */
        const randomIndex = Math.floor(Math.random() * (currentIndex + 1));
        // 交换当前位置和随机位置元素
        [randomizedPatterns[currentIndex], randomizedPatterns[randomIndex]] = [randomizedPatterns[randomIndex], randomizedPatterns[currentIndex]];
    }
    // 添加兜底响应模式
    randomizedPatterns.push([
        /(.*)$/,
        [
            "嗯...{0}...",
            "啊?",
            "{0}?",
            "{0}是什么意思",
            "我不理解{0}的意思",
            "你提到{0}, 是想到了什么吗?",
            "这个{0}...我没太听懂你的意思",
            "{0}... #$^$#不太懂哦..."
        ]
    ]);
    // 返回处理后的随机模式数组
    return randomizedPatterns;
}
/**
 * 生成对用户输入的响应消息
 *
 * @param {string} userInput - 用户输入的文本内容
 *
 * @returns {server.RawMessage} 包含生成响应的原始消息对象
 */
function generateResponse(userInput) {
    /**
     * 定义重复问题提示信息
     */
    const repeatedQuestionResponses = [
        "连续问这个问题, 有什么特别的理由吗?",
        "你是想确认某事, 还是纯粹重复练习?",
        "你一直在重复, 是在测试我吗?",
        "你已经问过了, 记得吗?",
        "别重复了, 说点别的吧",
        "这问题我回答过几次了",
        "你是一台复读机吗?",
        "转人工",
    ];
    const timeQueryRegexPatterns = [
        /.*(几点|时间|现在时间).*/,
        /.*(现在是|当前时间).*/,
        /.*(告诉我时间|告诉我现在几点).*/
    ];
    /**
     * 处理时间查询类输入
     *
     * @returns {string|null} 当前时间信息或null
     */
    const handleTimeQuery = () => {
        /**
         * 检查用户输入是否匹配时间查询模式
         */
        if (!timeQueryRegexPatterns.some(pattern => pattern.test(userInput)))
            return null;
        /**
         * 当前游戏刻数
         */
        const gameTicks = server.system.currentTick % 24000;
        /**
         * 总天数
         */
        const totalDays = Math.floor(server.system.currentTick / 24000);
        /**
         * 基础小时数
         */
        const baseHours = Math.floor(gameTicks / 1000);
        /**
         * 游戏小时数（调整后）
         */
        const gameHours = (baseHours + 6) % 24;
        /**
         * 剩余刻数
         */
        const remainingTicks = gameTicks % 1000;
        /**
         * 游戏分钟数
         */
        const gameMinutes = Math.floor((remainingTicks / 1000) * 60);
        /**
         * 总月数
         */
        const totalMonths = Math.floor(totalDays / 30);
        /**
         * 当前月的天数
         */
        const currentMonthDay = totalDays % 30 + 1;
        /**
         * 当前年份
         */
        const currentYear = Math.floor(totalMonths / 12) + 1;
        /**
         * 当前月份
         */
        const currentMonth = totalMonths % 12 + 1;
        /**
         * 格式化时间单位（两位数）
         */
        const formatTimeUnit = (num) => num.toString().padStart(2, '0');
        /**
         * 月份名称数组
         */
        const monthNames = [
            '霜月', '冬月', '寒月', '立春', '花月', '阳春',
            '盛夏', '炎月', '金秋', '收获', '雪月', '岁末'
        ];
        return `游戏时间：${formatTimeUnit(gameHours)}:${formatTimeUnit(gameMinutes)} 当前日期：${currentYear}年 ${monthNames[currentMonth - 1]}月${currentMonthDay}日（游戏纪元 ${totalDays}天）`;
    };
    /**
     * 检测连续重复输入
     *
     * @returns {string|null} 重复提示信息或null
     */
    const detectRepeatedInput = () => {
        // 向缓存中添加用户输入
        userInputHistory.push(userInput);
        /**
         * 获取最近三次输入
         */
        const recentInputs = userInputHistory.slice(-3);
        // 检查最近三次输入是否都相同
        if (recentInputs.length >= 3 && recentInputs.every((value, _, array) => value === array[0])) {
            // 返回随机重复提示信息
            return repeatedQuestionResponses[RandomFloor(0, repeatedQuestionResponses.length - 1)];
        }
        return null;
    };
    /**
     * 格式化响应模板
     *
     * @param {string} responseTemplate - 包含占位符的响应模板
     *
     * @param {RegExpMatchArray} regexMatch - 正则表达式匹配结果
     *
     * @returns {string} 格式化后的响应文本
     */
    const formatResponse = (responseTemplate, regexMatch) => {
        /**
         * 处理匹配结果中的占位符
         */
        const processedGroups = regexMatch.slice(1)
            .map(matchedGroup => matchedGroup
            .replace(/你/g, '%TEMP_PRONOUN%')
            .replace(/我/g, '你')
            .replace(/%TEMP_PRONOUN%/g, '我'));
        // 返回格式化后的响应文本
        return responseTemplate.replace(/{(\d+)}/g, (_, placeholderIndex) => processedGroups[Number(placeholderIndex)] || '');
    };
    /**
     * 查找匹配的响应模式
     *
     * @returns {string} 生成的响应文本
     */
    const findMatchingPattern = () => {
        /**
         * 随机化响应模式并追加默认兜底响应
         */
        const shuffledPatterns = randomizePatterns(response_patterns);
        /**
         * 查找匹配的响应模式
         */
        const matchedPattern = shuffledPatterns.find(([regexPattern]) => userInput.toLowerCase().match(regexPattern));
        // 如果找到匹配的响应模式, 生成响应文本
        if (matchedPattern) {
            /**
             * 获取响应模板和匹配结果
             */
            const [_, responseTemplates] = matchedPattern;
            /**
             * 从响应模板数组中随机选择一个响应模板
             */
            const selectedTemplate = responseTemplates[RandomFloor(0, responseTemplates.length - 1)];
            /**
             * 获取匹配结果
             */
            const matchResult = userInput.toLowerCase().match(matchedPattern[0]);
            // 格式化响应模板并返回
            if (matchResult) {
                return formatResponse(selectedTemplate, matchResult);
            }
        }
        return "你在说什么, #$^$#是一点都没听懂";
    };
    /**
     * 响应生成优先级：重复输入 > 时间查询 > 模式匹配
     */
    const finalResponse = detectRepeatedInput() || handleTimeQuery() || findMatchingPattern();
    // 返回生成的响应消息
    return { text: `#$^$# : ${finalResponse}` };
}
/**
 * 打印聊天信息
 *
 * 将聊天信息以打字机效果逐行显示给玩家
 *
 * @param {server.Player} player - 接收消息的玩家对象
 *
 * @param {server.RawMessage} input - 要显示的原始消息对象
 */
function displayChatWithTypingEffect(player, input) {
    /**
     * 提取记录中的文本信息
     */
    const rawtext = input.rawtext;
    // 判断是否存在历史记录
    if (!rawtext || rawtext.length == 0)
        return player.sendMessage(ReplyMessages.unknown_query_results);
    // 使用打字机的形式输出历史记录
    displayMessagesWithTypingEffect(player, rawtext);
}
/**
 * 逐行打印消息到聊天栏
 *
 * 将输入的多个消息对象逐行延迟发送到玩家的聊天栏, 实现类似打字机的效果
 *
 * @param {server.Player} player - 接收消息的玩家对象
 *
 * @param {server.RawMessage[]} input - 要逐行打印的消息数组
 */
function displayMessagesWithTypingEffect(player, input) {
    // 遍历消息数组, 为每条消息设置延迟, 实现逐行显示
    replacePlaceholders(input).forEach((text, index) => server.system.runTimeout(() => player.sendMessage(text), index * 4));
}
/**
 * 聊天回应功能
 *
 * 根据预设关键词开启或关闭<月华百科>的<聊天回应>, 并输出相应的聊天信息
 *
 * @param {server.Player} player - 发起聊天的玩家对象
 *
 * @param {string} message - 玩家发送的聊天信息
 */
function manageChatResponses(player, message) {
    /**
     * 唤醒关键词集合
     */
    const awaken = new Set(['月华', '百科']);
    /**
     * 停止关键词集合
     */
    const desist = new Set(['再见', '感谢', '退出']);
    // 判断是否允许<月华百科>对聊天信息做出回应
    if (awaken.has(message) && !playerOfChat.has(player.id)) {
        // 输出欢迎信息
        displayChatWithTypingEffect(player, lexiconInterface(player, '你好', false, true));
        // 将玩家添加到正在聊天的玩家列表中
        playerOfChat.add(player.id);
    }
    else if (desist.has(message) && playerOfChat.has(player.id)) {
        // 输出告别信息
        displayChatWithTypingEffect(player, lexiconInterface(player, '再见', false, true));
        // 将玩家从正在聊天的玩家列表中移除
        playerOfChat.delete(player.id);
    }
    else if (playerOfChat.has(player.id)) {
        displayChatWithTypingEffect(player, lexiconInterface(player, message, false, true));
    }
}
/**
 * 修饰输出信息, 生成格式化的文本消息
 *
 * @param {server.RawMessage} input - 原始文本消息, 待修饰
 *
 * @returns {server.RawMessage} - 修饰后的文本消息
 */
function formatOutputMessage(input) {
    /**
     * 模型规模, 即模型包含的条目数
     */
    const modelSize = material.length + response_patterns.length;
    /**
     * 页面规模, 即所有条目中信息字段的总长度
     */
    const pageScale = material.map(info => info[1]?.intel?.length || 0).reduce((prev, next) => prev + next) + response_patterns.map(info => info[1].length).reduce((prev, next) => prev + next);
    /**
     * 数据总量, 即所有条目中文本内容的总字符数
     */
    const totalData = material.flatMap(info => info[1].intel).map(info => info?.text?.length ?? 0).reduce((prev, next) => prev + next);
    /**
     * 默认文本模板, 包含模型的基本信息和扩展功能
     */
    const defaultTemplate = {
        rawtext: [
            { text: `嗨, 我是${nameTag}, 很高兴为您服务！\n` },
            { text: '--------------------------------\n' },
            { text: "[§5 模型参数 §r]:\n" },
            { text: '--------------------------------\n' },
            { text: '模型版本:§v lexicon v5 §r\n' },
            { text: '模型依赖:§q ServerAPI 2.0.0-beta §r\n' },
            { text: `模型规模:§s ${modelSize} §r\n` },
            { text: `页面规模:§q ${pageScale} §r\n` },
            { text: `数据总量:§u ${totalData} §r\n` },
            { text: '--------------------------------\n' },
        ]
    };
    // 如果提供了输入信息并且不为空, 则返回输入信息；否则, 返回默认模板
    return input && input?.rawtext?.length !== 0 ? replacePlaceholders(input) : defaultTemplate;
}
/**
 * 显示知识库目录
 *
 * @param {server.Player} player - 玩家对象
 *
 * @param {string[]} texts - 玩家输入的文本数组
 */
function displayDocumentCatalog(player, texts) {
    /**
     * 标题
     */
    const title = { text: "§9《§u§l §r" + nameTag + "§u§l百科 §9》§r" };
    /**
     * 获取数据库中的所有资料页
     */
    let sample = [...material];
    /**
     * 定义了 窗口界面 的 表单对象
     */
    const display = new serverUI.ActionFormData().title(title);
    // 筛选出符合要求的资料
    if (texts.length >= 1)
        sample = sample.filter(item => texts.every(info => calculateKeywordRelevance(info, item[1].root.join('&'), item[1].root) >= decisionThreshold));
    // 在所有情况下过滤掉 root.length为 0 的条目
    sample = sample.filter(item => item[1].root.length !== 0 && !item[1].code && !item[1].only);
    // 遍历数据库 并 添加 按钮
    if (sample.length !== 0)
        sample.forEach(text => display.button('§u§l' + text[1].root.join('§5 - §u') + '§r'));
    // 如果 没有符合要求的资料 则 告知玩家这个消息
    else
        display.button(ReplyMessages.cannot_select);
    // 显示 窗口界面
    display.show(player).then(option => {
        // 检测玩家是否未做出选择 或 取消操作
        if (sample.length == 0 || option.selection == undefined)
            return;
        /**
         * 玩家选中的资料页
         */
        const select = sample[option.selection][1].intel;
        // 保存历史记录
        contextRegistry.set(player.id, ['知识库目录页', { rawtext: select }]);
        // 显示资料页内容
        windowedRetriever(player, { rawtext: select });
    });
}
/**
 * 显示技能库目录
 *
 * @param {server.Player} player - 玩家对象
 *
 * @param {string[]} texts - 玩家输入的文本数组
 */
function displayScalabilityCatalog(player, texts) {
    /**
     * 标题
     */
    const title = { text: "§9《§u§l §r" + nameTag + "§u§l百科 §9》§r" };
    /**
     * 获取数据库中的所有资料页
     */
    let materialsData = [...material];
    /**
     * 定义了 窗口界面 的 表单对象
     */
    const catalogDisplay = new serverUI.ActionFormData().title(title);
    // 筛选出符合要求的资料
    if (texts.length >= 1)
        materialsData = materialsData.filter(item => texts.every(info => calculateKeywordRelevance(info, item[1].root.join('&'), item[1].root) >= decisionThreshold));
    // 在所有情况下过滤掉 不包含函数 的条目
    materialsData = materialsData.filter(item => item[1].code && item[1].synopsis);
    // 遍历数据库 并 添加 按钮
    if (materialsData.length !== 0)
        materialsData.forEach(text => catalogDisplay.button(replacePlaceholders({ rawtext: [{ text: '<]§v§l ' + text[0] + ' §r[>\n' }, text[1].synopsis ?? {}] })));
    // 如果 没有符合要求的资料 则 告知玩家这个消息
    else
        catalogDisplay.button(ReplyMessages.cannot_select);
    // 显示 窗口界面
    catalogDisplay.show(player).then(result => {
        // 检测玩家是否未做出选择 或 取消操作
        if (materialsData.length == 0 || result.selection == undefined)
            return;
        /**
         * 玩家选中的扩展功能的索引
         */
        const selectedIndex = result.selection;
        const content = materialsData[selectedIndex][1].synopsis;
        const initialInput = materialsData[selectedIndex][0];
        windowedRetriever(player, content, initialInput);
    });
}
/**
 * 计算输入字符串与样本集合的匹配度
 *
 * @param {string} input 输入字符串
 *
 * @param {string} type 类型标识
 *
 * @param {string[]} source 样本字符串数组
 *
 * @returns {number} - 匹配度（0-1之间的数值, 保留三位小数）
 */
function calculateKeywordRelevance(input, type, source) {
    /**
     * 将样本数组连接成字符串并分解成字符数组
     */
    const sampleChars = source.join('').split('');
    /**
     * 创建样本字符的唯一集合
     */
    const sample = new Set(sampleChars);
    // 如果样本集合为空, 直接返回 0
    if (sample.size === 0)
        return 0;
    /**
     * 将输入字符串分解成字符并创建唯一集合
     */
    const inputSet = new Set(input.split(''));
    /**
     * 计算输入字符串中与样本匹配的字符数组
     */
    const matchedChars = [...inputSet].filter(char => sample.has(char));
    /**
     * 匹配字符的数量
     */
    const score = matchedChars.length;
    /**
     * 计算匹配度（匹配字符数除以样本总字符数）
     */
    const relevance = Number((score / sample.size).toFixed(3));
    // 如果允许日志输出且匹配度不为 0, 则输出日志
    if (Permit.can_display_logs && relevance !== 0)
        console.log(`§p${type}` + `§r | §5匹配度:§2 ${relevance}` + `§r | §5相同字:§2 ${score}` + `§r | §5总规模:§2 ${sample.size}`);
    // 返回匹配度
    return relevance;
}
/**
 * 获取指定类型的资料页的根标签
 *
 * @param {string} type - 资料页的类型标识符
 *
 * @returns {string[]} - 匹配的资料页的根标签数组, 如果未找到则返回空数组
 */
function getMaterialRootTag(type) {
    /**
     * 规范化 资料表
     */
    const norm = new Map(material);
    /**
     * 获取匹配的数据页
     */
    const page = norm.get(type);
    // 如果 未能获取到 数据页 则返回
    if (!page)
        return [];
    // 返回根标签
    return page.root;
}
/**
 * 设置指定类型的资料页的根标签
 *
 * @param type - 数据页的类型标识符
 *
 * @param root - 根标签
 */
function setMaterialRootTag(type, root) {
    /**
     * 规范化 资料表
     */
    const norm = new Map(material);
    /**
     * 获取匹配的数据页
     */
    const page = norm.get(type);
    // 如果 未能获取到 数据页 则返回
    if (!page)
        return;
    // 设置根标签
    page.root = [...new Set([...page.root, ...root])];
}
// TODO : [ 功能组件 ]
scalability$1.set('知识库目录页', {
    synopsis: { text: '§a◆§r 显示#$^$#中的§d资料目录§r, 允许进行§u过滤§r' },
    ...ReplyMessages.craft_template,
    /**
     * 显示知识库目录
     *
     * 该方法根据玩家输入的文本数组, 筛选并显示符合条件的知识库目录
     * 如果没有符合条件的知识库目录, 则显示无法选择的消息
     *
     * @param {server.Player} player - 请求显示知识库目录的玩家对象
     *
     * @param {string[]} texts - 玩家输入的文本数组, 用于筛选知识库目录
     *
     * @returns {server.RawMessage} - 操作结果的消息, 表示知识库目录已创建
     */
    code(player, texts, rawtexts, isChat) {
        // 执行 显示知识库目录 的操作
        if (isChat)
            server.system.runTimeout(() => displayDocumentCatalog(player, texts), 40);
        else
            displayDocumentCatalog(player, texts);
        // 返回操作结果
        return ReplyMessages.create_data_directory;
    },
    root: [],
});
scalability$1.set('展开功能菜单', {
    synopsis: { text: '§a◆§r 显示#$^$#中的§v功能目录§r, 允许进行§u过滤§r' },
    ...ReplyMessages.craft_template,
    /**
     * 显示功能目录
     *
     * 该方法根据玩家输入的文本数组, 筛选并显示符合条件的功能目录
     * 如果没有符合条件的功能目录, 则显示无法选择的消息
     *
     * @param {server.Player} player - 请求显示功能目录的玩家对象
     *
     * @param {string[]} texts - 玩家输入的文本数组, 用于筛选功能目录
     *
     * @returns {server.RawMessage} - 操作结果的消息, 表示功能目录已创建
     */
    code(player, texts, rawtexts, isChat) {
        // 执行 显示技能目录 的操作
        if (isChat)
            server.system.runTimeout(() => displayScalabilityCatalog(player, texts), 40);
        else
            displayScalabilityCatalog(player, texts);
        // 返回操作结果
        return ReplyMessages.create_data_directory;
    },
    root: [],
});
scalability$1.set('单次授权协定', {
    synopsis: { text: '§a◆§r 阅读注意事项, 并颁发临时许可' },
    ...ReplyMessages.craft_template,
    /**
     * 阅读注意事项, 并颁发临时许可
     *
     * 该函数向玩家展示“单次授权协定”的协议书, 并根据玩家的选择和输入来处理根证书的验证或设置。
     * 协议书内容包括授权范围, 有效期, 风险条款, 创造模式条款和根证书协议。
     * 玩家可以选择签署协议, 并输入根证书以验证或设置。
     *
     * @param {server.Player} player - 当前交互的玩家对象
     *
     * @returns {server.RawMessage} - 包含操作确认消息的服务器原始消息对象
     */
    code(player) {
        /**
         * 协议书
         */
        const agreement = [
            { text: "-=-=-=-=-=§9<§l 单次授权协定 §9>§r-=-=-=-=-=\n" },
            { text: "鉴于甲方（玩家）申请执行可能影响平衡性的操作\n" },
            { text: "基于此需求, 双方现达成如下临时协议: \n" },
            { text: "\n=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=\n" },
            { text: "\n[ 授予权限范围 ]\n" },
            { text: "乙方被授权执行, 包括但不限于: \n" },
            { text: "◆ 重置游戏结构生成限制\n" },
            { text: "◆ 解析并重构雾海裂隙参数\n" },
            { text: "◆ 解析并应用元素攻击算法\n" },
            { text: "\n=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=\n" },
            { text: "\n[ 协定期效 ]\n" },
            { text: "本协议自签署之日起生效\n" },
            { text: "持续至当前游戏存档下次重启为止\n" },
            { text: "有效期结束后, 请重新激活本协议\n" },
            { text: "\n=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=\n" },
            { text: "\n[ 风险条款 ]\n" },
            { text: "启用本协议可能引发以下风险, 包括但不限于: \n" },
            { text: "◇ 游戏世界参数异常波动\n" },
            { text: "◇ 其他玩家体验受损风险\n" },
            { text: "操作方有义务采取必要措施, 尽量减少对游戏环境的影响\n" },
            { text: "\n=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=\n" },
            { text: "\n[ 创造模式条款 ]\n" },
            { text: "当甲方处于创造模式时, 本协议默认激活, 无需二次授权\n" },
            { text: "\n=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=\n" },
            { text: "[ 根证书协议 ]\n" },
            { text: "首个与乙方签约的甲方将自动成为根证书持有者\n" },
            { text: "其他玩家如需执行本协议操作, 需通过根证书验证\n" },
            { text: "\n=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=\n\n" },
            { text: "甲方（操作申请方）: " + player.nameTag + "\n\n" },
            { text: "乙方（协议执行方）: " + nameTag },
            { text: "\n=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=\n" },
            { text: "已签约的操作方: " + getMaterialRootTag('单次授权协定') + "\n" },
        ];
        /**
         * 处理证书签名操作的响应, 显示根证书输入表单并处理验证逻辑
         *
         * @param {serverUI.ActionFormResponse} result - 来自前序操作表单的响应结果
         * @throws {Error} 当玩家输入不符合要求时通过 UI 提示错误信息
         * @example
         * // 通常在表单响应回调中调用
         * someForm.show(player).then(signingCertificate);
         */
        function signingCertificate(result) {
            // 如果用户取消了操作, 则返回
            if (result.canceled || result.selection == 0)
                return;
            /**
             * 执行证书签名验证逻辑, 处理模态表单的响应结果
             * @param {serverUI.ModalFormResponse} option - 根证书输入表单的响应结果
             * @private
             */
            function executionSigning(option) {
                // 如果玩家取消了表单, 则不进行操作
                if (option.canceled || !option.formValues)
                    return;
                /**
                 * 获取玩家输入的文本
                 */
                const rawtext = option.formValues[0];
                /**
                 * 获取世界根证书
                 */
                const rootCertificate = server.world.getDynamicProperty('game_rules:root_certificate');
                // 如果玩家输入的文本长度小于 6, 则返回错误消息
                if (rawtext.length <= 5)
                    return displayMessagesWithTypingEffect(player, [ReplyMessages.root_certificate_error]);
                // 如果世界根证书为空, 则设置世界根证书为玩家输入的文本
                if (!rootCertificate) {
                    // 设置世界根证书为玩家输入的文本
                    server.world.setDynamicProperty('game_rules:root_certificate', rawtext);
                    // 设置玩家为根证书持有者
                    setMaterialRootTag('单次授权协定', [player.nameTag]);
                    // 返回操作确认消息
                    displayMessagesWithTypingEffect(player, [ReplyMessages.root_certificate_set, { text: '可分享的子证书: ' + rawtext.slice(-6) }]);
                }
                // 如果玩家输入的文本与世界根证书相同, 则设置玩家为根证书持有者
                else if (rootCertificate == rawtext || rawtext.slice(-6) == rawtext) {
                    // 设置玩家为根证书持有者
                    setMaterialRootTag('单次授权协定', [player.nameTag]);
                    // 返回操作确认消息
                    displayMessagesWithTypingEffect(player, [ReplyMessages.root_certificate_set, { text: '可分享的子证书: ' + rawtext.slice(-6) }]);
                }
                // 如果玩家输入的文本与世界根证书不相同, 则返回错误消息
                else
                    displayMessagesWithTypingEffect(player, [ReplyMessages.root_certificate_error]);
            }
            /**
             * 定义了 窗口界面 的 表单对象
             */
            const display = new serverUI.ModalFormData().title('请输入根证书');
            // 加入输入框
            display.textField('请输入作为凭证的根证书', '你想要输入自定义根证书吗?', { 'defaultValue': player.id });
            // 显示 窗口界面
            display.show(player).then(executionSigning);
        }
        /**
         * 定义了 窗口界面 的 表单对象
         */
        const display = new serverUI.ActionFormData().title('§9<§l 单次授权协定 §9>');
        // 加入协议书 内容 和 按钮
        display.body({ rawtext: agreement }).button('§4§l关闭§r').button('§9§l签署§r');
        // 显示 窗口界面
        server.system.runTimeout(() => display.show(player).then(signingCertificate), 10);
        // 返回操作结果
        return ReplyMessages.get_root_certificate;
    }
});
scalability$1.set('请重置根证书', {
    synopsis: { text: '§c◆§r 与#$^$#重新签订根证书' },
    ...ReplyMessages.craft_template,
    /**
     * 重置根证书功能代码逻辑
     *
     * @param {server.Player} player - 当前交互的玩家对象
     * @param {string[]} texts - 玩家输入的文本数组（可能经过预处理）
     * @param {string[]} rawtexts - 玩家输入的原始文本数组
     * @returns {server.RawMessage} - 返回操作结果的消息对象
     *
     * 功能描述:
     * 1. 获取当前世界的根证书。
     * 2. 验证玩家权限, 若玩家无权限且输入不符合根证书要求, 则返回权限不足消息。
     * 3. 创建一个模态表单窗口, 提示玩家输入新的根证书。
     * 4. 显示窗口并等待玩家输入：
     *    - 如果玩家取消或未输入内容, 则不进行任何操作。
     *    - 如果玩家输入的根证书长度小于6, 则返回错误消息。
     *    - 如果输入有效, 更新世界根证书, 并设置玩家为根证书持有者。
     * 5. 返回根证书设置成功的确认消息。
     */
    code(player, texts, rawtexts) {
        /**
         * 获取世界根证书
         */
        const rootCertificate = server.world.getDynamicProperty('game_rules:root_certificate');
        // 权限验证
        if (!isPlayerAuthorized(player))
            return ReplyMessages.power_lack;
        // 验证玩家输入的根证书是否正确
        if (texts[0] != rootCertificate && rawtexts[1] != rootCertificate)
            return ReplyMessages.root_certificate_error;
        /**
         * 定义了 窗口界面 的 表单对象
         */
        const display = new serverUI.ModalFormData().title('请输入根证书');
        // 加入输入框
        display.textField('请输入作为凭证的根证书', '你想要输入自定义根证书吗?', { 'defaultValue': player.id });
        // 显示 窗口界面
        display.show(player).then(option => {
            // 如果玩家取消了表单, 则不进行操作
            if (option.canceled || !option.formValues)
                return;
            /**
             * 获取玩家输入的文本
             */
            const rawtext = option.formValues[0];
            // 如果玩家输入的文本长度小于 6, 则返回错误消息
            if (rawtext.length <= 5)
                return displayMessagesWithTypingEffect(player, [ReplyMessages.root_certificate_error]);
            // 设置世界根证书为玩家输入的文本
            server.world.setDynamicProperty('game_rules:root_certificate', rawtext);
            // 设置玩家为根证书持有者
            setMaterialRootTag('单次授权协定', [player.nameTag]);
            // 返回操作确认消息
            displayMessagesWithTypingEffect(player, [ReplyMessages.root_certificate_set, { text: '可分享的子证书: ' + rawtext.slice(-6) }]);
        });
        // 返回操作结果
        return ReplyMessages.get_root_certificate;
    }
});
scalability$1.set('改变日志状态', {
    synopsis: { text: '§a◆§r 切换§m 功能调试日志 §r的显示状态' },
    ...ReplyMessages.craft_template,
    /**
     * 切换日志显示状态, 便于调试时查看或隐藏日志信息
     *
     * @returns {server.RawMessage} - 包含操作确认消息的服务器原始消息对象
     */
    code() {
        // 切换日志显示标志位
        Permit.can_display_logs = !Permit.can_display_logs;
        // 返回操作确认消息
        return ReplyMessages.log_toggle;
    }
});
scalability$1.set('获取权柄道具', {
    synopsis: { text: '§a◆§r 获取全套< 神恩权柄 >系列道具' },
    ...ReplyMessages.craft_template,
    code(player) {
        // 权限验证
        if (!isPlayerAuthorized(player))
            return ReplyMessages.power_lack;
        /**
         * 获取全套< 神恩权柄 >系列道具
         */
        const items = [
            new server.ItemStack('starry_map:obtain_block'),
            new server.ItemStack('starry_map:world_of_box'),
            new server.ItemStack('starry_map:inhibit_water'),
            new server.ItemStack('starry_map:creative_tools'),
            new server.ItemStack('starry_map:debugging_stick'),
            new server.ItemStack('starry_map:material_sorting'),
            new server.ItemStack('starry_map:purple_gold_gourd'),
            new server.ItemStack('starry_map:stateful_inspection'),
            new server.ItemStack('starry_map:nihility_space_block'),
        ];
        items.forEach(item => {
            // 设置道具的 Lore
            item.setLore(['§4§l[ 切勿随意交予他人使用 !! ]§r']);
            // 尝试在玩家头部位置生成道具
            TrySpawnItem(player.dimension, item, player.getHeadLocation());
        });
        // 返回操作确认消息
        return ReplyMessages.enact_echo;
    }
});
scalability$1.set('继续本次操作', {
    synopsis: { text: '§a◆§r 继续对话, 聊天栏显示§u查询结果§r与§9功能反馈§r' },
    ...ReplyMessages.craft_template,
    /**
     * 分析并执行玩家的历史输入, 继续上次的对话, 并在聊天栏显示查询结果与功能反馈
     *
     * @param {server.Player} player - 当前交互的玩家对象
     * @returns {server.RawMessage} - 包含操作结果的服务器原始消息对象
     */
    code(player) {
        /**
         * 获取 玩家历史输入
         */
        const entry = contextRegistry.get(player.id);
        // 判断是否存在历史记录
        if (entry) {
            /**
             * 拆分玩家的输入文本
             */
            const texts = entry[0].split(/\s+/);
            /**
             * 获取玩家输入的剩余文本
             */
            const next = texts.slice(1).join(' ');
            // 延迟执行 后续的文本查询
            server.system.runTimeout(() => {
                /**
                 * 创建新的查询对象
                 */
                const query = lexiconInterface(player, texts.length > 1 ? next : entry[0], false);
                /**
                 * 获取查询结果
                 */
                const rawtext = query.rawtext;
                // 使用打字机的形式,在聊天栏中显示查询结果
                if (rawtext)
                    displayMessagesWithTypingEffect(player, rawtext);
            }, 10);
            // 返回操作结果
            return ReplyMessages.enact_echo;
        }
        // 提示玩家 无历史记录
        else
            return ReplyMessages.unknown_echo;
    },
    root: ["继续", "重复", "再来"]
});
scalability$1.set('查询生物群系', {
    synopsis: { text: '§a◆§r 根据输入, 查找§3生态群系§r并保存§v锚点§r信息' },
    ...ReplyMessages.craft_template,
    /**
     * 分析并提供玩家指定生态群系的信息
     *
     * 获取玩家当前位置和维度, 根据玩家提供的生态群系名称查询信息
     *
     * 如果生态群系存在, 则在当前维度中查找并提供最接近玩家位置的生态群系坐标
     *
     * 同时为玩家添加传送锚点, 并保存锚点信息
     *
     * @param {server.Player} player - 当前交互的玩家对象
     *
     * @param {string[]} texts - 玩家输入的生态群系名称数组
     *
     * @returns {server.RawMessage} - 包含查询响应的服务器原始消息对象
     */
    code(player, texts) {
        /**
         * 获取生态群系标识符
         */
        const biome = biome_map.get(texts[0]);
        // 如果生态群系不存在, 返回未知生态群系的消息
        if (!biome)
            return ReplyMessages.unknown_biome;
        // 执行查询生态群系的命令
        player.runCommand('opal:record_biome_location @s ' + biome);
        // 返回操作确认消息
        return { text: `${nameTag}正在查询你说的群系 ! \n` };
    }
});
scalability$1.set('打印至聊天栏', {
    synopsis: { text: '§a◆§r 将#$^$#的页面内容, 逐行打印到§9聊天栏§r' },
    ...ReplyMessages.craft_template,
    /**
     * 打印月华百科的历史记录到聊天栏
     *
     * 获取并显示玩家的历史查询记录, 若无记录则提示
     *
     * @param {server.Player} player - 请求的玩家
     *
     * @returns {server.RawMessage} 提示信息
     */
    code(player) {
        /**
         * 获取玩家的历史记录
         */
        const entry = contextRegistry.get(player.id);
        /**
         * 提取记录中的文本信息
         */
        const rawtext = entry?.[1].rawtext;
        // 打印分界线
        player.sendMessage({ text: '\n=-=-=-=-=-=-=-=-=-=\n' });
        // 判断是否存在历史记录
        if (!rawtext || rawtext.length == 0)
            return { text: '§c无历史输入§r' };
        // 使用打字机的形式输出历史记录
        displayMessagesWithTypingEffect(player, rawtext);
        // 记录历史记录
        server.system.run(() => contextRegistry.set(player.id, ['打印至聊天栏', { rawtext }]));
        // 返回操作确认信息
        return ReplyMessages.print_to_chat_bar;
    },
    root: ["打印"],
});
scalability$1.set('清除结构缓存', {
    synopsis: { text: '§c◆§r 清空§5世界结构管理器§r中的§3结构缓存§r' },
    ...ReplyMessages.craft_template,
    /**
     * 清空服务器世界结构管理器中的结构缓存
     *
     * 遍历并尝试删除所有结构标识符, 成功则计数, 失败则反馈声音
     *
     * @param {server.Player} player - 执行操作的玩家
     *
     * @returns {server.RawMessage} - 操作结果的确认信息
     */
    code(player) {
        // 权限验证
        if (!isPlayerAuthorized(player))
            return ReplyMessages.power_lack;
        /**
         * 获取结构标识符列表
         */
        const structureNames = server.world.structureManager.getWorldStructureIds();
        /**
         * 结构删除计数值
         */
        let count = 0;
        /**
         * 删除单个结构
         *
         * @param {string} name - 结构名称
         */
        function StructureErase(player, name, count) {
            try {
                // 执行删除操作
                server.world.structureManager.delete(name);
                // 计数增加
                count++;
            }
            // 失败反馈
            catch {
                player.playSound('chime.amethyst_block');
            }
        }
        // 遍历并删除结构
        structureNames.forEach(neme => StructureErase(player, neme, count));
        // 返回操作结果
        return { text: `好的, <§9 结构缓存 §r>已经被#$^$#清除了, 共删除§2 ${count} §r项\n` };
    }
});
scalability$1.set('发动元素攻击', {
    synopsis: { text: '§c◆§r 对§9目标实体§r应用§5元素伤害§r, 允许设定§4伤害值§r' },
    ...ReplyMessages.craft_template,
    /**
     * 解析并应用元素攻击
     *
     * 根据玩家输入的伤害值, 对选定的目标实体应用伤害, 包括暴击判定
     *
     * @param {server.Player} player - 执行操作的玩家
     * @param {string[]} texts - 玩家输入的参数数组
     *
     * @returns {server.RawMessage} - 操作成功的提示信息
     */
    code(player, texts) {
        // 权限验证
        if (!isPlayerAuthorized(player))
            return ReplyMessages.power_lack;
        /**
         * 获取伤害值
         */
        const damage = (texts[0].match(/\b\d+(\.\d+)?\b/g)?.map(Number) ?? [1])[0];
        /**
         * 获取玩家当前元素属性
         */
        const selfRune = GetProperty(player).self_rune;
        // 运行命令
        player.runCommand('opal:apply_elemental_damage @s ' + selfRune + ' ' + damage);
        // 提示功能执行成功
        return ReplyMessages.pursue_rune_hurt;
    }
});
scalability$1.set('设置雾海裂隙', {
    synopsis: { text: '§c◆§r 根据的§9坐标§r和§3维度§r信息, 创建§5雾海裂隙§r' },
    ...ReplyMessages.craft_template,
    /**
     * 解析并创建雾海裂隙
     *
     * 根据玩家输入的坐标和维度信息, 创建雾海裂隙, 并为玩家提供视觉和声音反馈
     *
     * @param {server.Player} player - 发起操作的玩家
     * @param {string[]} texts - 玩家输入的参数数组
     *
     * @returns {server.RawMessage} - 操作成功的提示信息
     */
    code(player, texts) {
        // 检测玩家是否具有权限
        if (!isPlayerAuthorized(player))
            return ReplyMessages.power_lack;
        /**
         * 解析坐标参数
         */
        const location = () => {
            /**
             * 匹配整数和小数, 包括负数
             */
            const matches = texts.join().match(/-?\b\d+(\.\d+)?\b/g);
            /**
             * 原始向量数组
             */
            const proto = matches?.map(Number) ?? [0, 512, 0];
            // 输出向量字符串
            return new Vector(proto[0] ?? 0, proto[1] ?? 512, proto[2] ?? 0).toString({ 'delimiter': ' ' });
        };
        /**
         * 解析维度参数
         */
        const dimension = () => {
            /**
             * 检测 字符串
             */
            const check = texts[3] ?? '主世界';
            // 输出维度
            return server.world.getDimension(dimension_map.get(check) ?? 'minecraft:overworld').id;
        };
        // 运行命令
        player.runCommand('opal:create_misty_sea_fissure @s ' + location() + ' ' + dimension());
        // 返回操作成功的提示
        return ReplyMessages.pursue_fissure;
    }
});
scalability$1.set('调试动态属性', {
    synopsis: { text: '§c◆§r 允许玩家查看并修改§9目标实体§r的§6动态属性§r' },
    ...ReplyMessages.craft_template,
    /**
     * 分析并展示动态属性
     *
     * 允许玩家查看并修改选定实体的动态属性
     *
     * @param {server.Player} player - 发起操作的玩家
     *
     * @returns {server.RawMessage} - 操作成功的提示信息
     */
    code(player) {
        // 权限验证
        if (!isPlayerAuthorized(player))
            return ReplyMessages.power_lack;
        /**
         * 设置查询参数, 排除特定类型的实体
         */
        const options = { excludeTypes: ["minecraft:item", "minecraft:xp_orb"] };
        /**
         * 计算玩家与实体的距离
         */
        const Distance = (entity) => Math.floor(Vector.distance(player.location, entity.location));
        /**
         * 获取排序后的实体数组
         */
        const queue = EntitysSort(player.dimension, options, (a, b) => Distance(a) - Distance(b), entity => entity.getComponent('minecraft:health'));
        /**
         * 定义窗口界面标题
         */
        const title = {
            text: "§9§l<§u 动态属性 §9>§r§3操作界面"
        };
        /**
         * 创建窗口界面表单对象
         */
        const display = new serverUI.ActionFormData().title(title);
        // 遍历实体数组并加入按钮
        if (queue.length > 1)
            queue.forEach(entity => display.button(DistanceAndName(entity, Distance(entity)), "textures/项目图标/元素增益"));
        else
            display.button('§4§l未知的动态属性');
        // 显示窗口界面
        display.show(player).then(option => {
            // 验证表单关闭状态
            if (option.selection == undefined || queue.length === 0)
                return;
            /**
             * 获取目标实体
             */
            const target = queue[option.selection];
            /**
             * 创建动态属性缓存对象
             */
            const property = new Map();
            /**
             * 获取实体的动态属性类型数组
             */
            const types = target.getDynamicPropertyIds();
            /**
             * 获取实体的动态属性值数组
             */
            const values = types.map(type => target.getDynamicProperty(type));
            // 遍历类型数组并加入键值对
            types.forEach((type, index) => { const args = values[index]; if (args)
                property.set(type, args); });
            /**
             * 序列化动态属性并排序
             */
            const analysis = [...property].sort((a, b) => {
                // 比较两个字符串的首字母, 不区分大小写
                return a[0].toLowerCase().charCodeAt(0) - b[0].toLowerCase().charCodeAt(0);
            });
            /**
             * 表单对象
             */
            const display = new serverUI.ModalFormData().title(title);
            /**
             * 输入框提示
             */
            const text = { text: "请输入新的属性值, 修改需谨慎以避免故障" };
            // 输入动态属性信息
            analysis.forEach(type => display.textField(type[0], text, { 'defaultValue': JSON.stringify(type[1]) }));
            // 显示表单
            display.show(player).then(option => {
                // 验证表单关闭状态
                if (!option.formValues)
                    return;
                // 遍历输入框数组
                option.formValues.forEach((data, index) => { target.setDynamicProperty(analysis[index][0], JSON.parse(data)); });
            });
        });
        // 显示任务执行成功的提示
        return ReplyMessages.pursue_dynamic_property;
    },
});
scalability$1.set('修复版本差异', {
    synopsis: { text: '§a◆§r 修复版本更新导致的外观与功能上的差异' },
    ...ReplyMessages.craft_template,
    /**
     * 分析并展示动态属性
     *
     * 允许玩家查看并修改选定实体的动态属性
     *
     * @param {server.Player} player - 发起操作的玩家
     *
     * @returns {server.RawMessage} - 操作成功的提示信息
     */
    code(player) {
        /**
         * 方块过滤选项
         */
        const filter = { includeTypes: ['starry_map:basic_pipeline', 'starry_map:pulse_latch'] };
        // 遍历方块并修改状态
        TryProcessBlocksInVolume(player.dimension, player.location, 16, filter, block => TrySetPermutation(block, 'STATE:is_storage', false));
        // 播放音效
        player.playSound('respawn_anchor.charge');
        // 返回操作成功的提示
        return { text: '§a修复成功§r, #$^$#已经完成任务了哦§r' };
    }
});
// TODO: [ 数据注入 ]
material.push(...scalability$1);

/*
 * 原版接口
 */
/**
 * * 卸载 实体背包库存后 封装为 特定物品
 *
 * @param {server.Entity} target - 进行封装的目标对象
 *
 * @param {server.Player} player - 发起封装的玩家对象
 *
 * @param {server.ItemStack} material - 封装材料
 *
 * @param {string} itemName - 封装物品名称
 *
 * @param {string[]} itemLore - 封装物品词缀
 */
function UnloadInventoryAndPackage(target, player, material, itemName, itemLore) {
    // 检测 目标对象 是否为玩家
    if (target instanceof server.Player)
        return;
    /**
     * * 获取 实体背包
     */
    const container = target.getComponent('inventory')?.container;
    /**
     * * 获取 实体背包库存
     */
    const items = [];
    /**
     * * 获取 实体 的 动态属性类型数组
     */
    const types = target.getDynamicPropertyIds();
    /**
     * * 获取 实体 的 标签数组
     */
    const tags = target.getTags();
    /**
     * * 复制实体坐标
     */
    const anchor = Vector.copy(target.location);
    /**
     * * 获取 实体名称
     */
    const nameTag = target.nameTag.length >= 1 ? target.nameTag : name_mapping.get(target.typeId);
    // 无视大小写 根据首字母进行排序
    types.sort((a, b) => a[0].toLowerCase().charCodeAt(0) - b[0].toLowerCase().charCodeAt(0));
    // 清空 目标背包 并缓存 全部物品信息
    if (container)
        for (let index = 0; index < container.size; index++) {
            /**
             * * 背包物品
             */
            const item = container.getItem(index);
            if (!item)
                continue;
            items.push(item);
            container.setItem(index);
        }
    // 设置 物品动态属性
    types.forEach(type => material.setDynamicProperty(type, target.getDynamicProperty(type)));
    material.setDynamicProperty('reduction_pureness:tags', JSON.stringify(tags));
    material.setDynamicProperty('reduction_pureness:name', target.nameTag);
    material.setDynamicProperty('reduction_pureness:type', target.typeId);
    // 设置 物品名称
    material.nameTag = itemName + nameTag + '§r';
    // 设置 物品词缀
    material.setLore(itemLore);
    // 给与玩家物品
    server.system.runTimeout(() => { TrySpawnItem(player.dimension, material, player.getHeadLocation()); }, 10);
    // 释放背包物品
    server.system.runTimeout(() => { items.forEach(item => TrySpawnItem(player.dimension, item, anchor)); }, 10);
    // 销毁目标实体
    target.remove();
}
/**
 * * 卸载 实体背包库存后 封装为 特定物品 且留在原地
 *
 * @param {server.Entity} target - 进行封装的目标对象
 *
 * @param {server.ItemStack} material - 封装材料
 *
 * @param {string} itemName - 封装物品名称
 *
 * @param {string[]} itemLore - 封装物品词缀
 */
function UnloadInventoryAndPackageInPlace(target, material, itemName, itemLore) {
    // 检测 目标对象 是否为玩家
    if (target instanceof server.Player)
        return;
    /**
     * * 获取 实体背包
     */
    const container = target.getComponent('inventory')?.container;
    /**
     * * 获取 实体背包库存
     */
    const items = [];
    /**
     * * 获取 实体 的 动态属性类型数组
     */
    const types = target.getDynamicPropertyIds();
    /**
     * * 获取 实体 的 标签数组
     */
    const tags = target.getTags();
    /**
     * * 复制 实体坐标
     */
    const copyLocation = Vector.copy(target.location);
    /**
     * * 获取 实体所在维度
     */
    const copyDimension = target.dimension;
    /**
     * * 获取 实体名称
     */
    const nameTag = target.nameTag.length >= 1 ? target.nameTag : name_mapping.get(target.typeId);
    // 无视大小写 根据首字母进行排序
    types.sort((a, b) => a[0].toLowerCase().charCodeAt(0) - b[0].toLowerCase().charCodeAt(0));
    // 清空 目标背包 并缓存 全部物品信息
    if (container)
        for (let index = 0; index < container.size; index++) {
            /**
             * * 背包物品
             */
            const item = container.getItem(index);
            if (!item)
                continue;
            items.push(item);
            container.setItem(index);
        }
    // 设置 物品动态属性
    types.forEach(type => material.setDynamicProperty(type, target.getDynamicProperty(type)));
    material.setDynamicProperty('reduction_pureness:tags', JSON.stringify(tags));
    material.setDynamicProperty('reduction_pureness:name', target.nameTag);
    material.setDynamicProperty('reduction_pureness:type', target.typeId);
    // 设置 物品名称
    material.nameTag = itemName + nameTag + '§r';
    // 设置 物品词缀
    material.setLore(itemLore);
    // 释放背包物品
    server.system.runTimeout(() => { items.forEach(item => TrySpawnItem(copyDimension, item, copyLocation)); }, 10);
    // 给与玩家物品
    server.system.runTimeout(() => { TrySpawnItem(copyDimension, material, copyLocation); }, 10);
    // 销毁目标实体
    target.remove();
}
/**
 * * 卸载 实体背包库存后 销毁实体
 *
 * @param {server.Entity} target - 进行卸载的目标实体
 */
async function UnloadInventoryAndDestroy(target) {
    // 延迟执行, 避免触发器冲突
    await server.system.waitTicks(0);
    /**
     * * 获取 实体背包
     */
    const container = target.getComponent('inventory')?.container;
    /**
     * * 获取 实体背包库存
     */
    const items = [];
    /**
     * * 复制实体坐标
     */
    const location = Vector.copy(target.location);
    /**
     * * 复制实体维度
     */
    const dimension = server.world.getDimension(target.dimension.id);
    // 清空 目标背包 并缓存 全部物品信息
    if (container)
        for (let index = 0; index < container.size; index++) {
            /**
             * * 背包物品
             */
            const item = container.getItem(index);
            if (!item)
                continue;
            items.push(item);
            container.setItem(index);
        }
    // 释放背包物品
    server.system.runTimeout(() => { items.forEach(item => TrySpawnItem(dimension, item, location)); }, 10);
    // 销毁目标实体
    target.remove();
}
/**
 * * 召唤一个带有附加数据的实体
 *
 * @param {server.Player} player - 执行召唤事件的玩家
 *
 * @param {server.Container} container - 玩家的背包容器
 *
 * @param {string} type - 召唤的实体类型
 */
function SummonEntityWithData(player, container, type) {
    /**
     * * 玩家手持的物品
     */
    const item = container?.getItem(player.selectedSlotIndex);
    /**
     * * 玩家指向的方块
     */
    const block = player.getBlockFromViewDirection({ maxDistance: 16 })?.block;
    /**
     * * 实体动态属性
     */
    const propertyID = item?.getDynamicPropertyIds().filter(type => !type.startsWith('reduction_pureness:'));
    /**
     * * 被记录的实体名称
     */
    const nameTag = item?.getDynamicProperty('reduction_pureness:name');
    /**
     * * 获取 标签组
     */
    const tags = item?.getDynamicProperty('reduction_pureness:tags');
    /**
     * * 物品记录的实体
     */
    const entity = TrySpawnEntity(player.dimension, type, block?.center() ?? player.location);
    // 判断 实体是否存在
    if (entity instanceof Error)
        return player.sendMessage(`§l§4<§c 召唤失败 §4>§r: ${entity.message}`);
    // 播放 音效
    player.playSound('conduit.deactivate');
    // 绑定玩家
    server.system.run(() => entity.getComponent('tameable')?.tame(player));
    // 消耗物品
    server.system.run(() => container.setItem(player.selectedSlotIndex));
    // 判断 物品 与 属性 是否存在
    if (!item || !propertyID)
        return;
    // 注入属性
    server.system.runTimeout(() => propertyID.forEach(id => entity.setDynamicProperty(id, item.getDynamicProperty(id))), 20);
    // 判断 实体名称是否存在
    if (!nameTag)
        return;
    // 注入名称
    server.system.runTimeout(() => entity.nameTag = nameTag, 15);
    // 判断 实体名称是否存在
    if (!tags)
        return;
    // 添加实体标签
    JSON.parse(tags).forEach(tag => entity.addTag(tag));
}

/*
 * 原版接口
 */
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
/**
 * * 获取 区域属性名称
 *
 * @param {server.Entity | server.Player | server.Block} object - 实体或方块
 *
 * @param {string} type - 区域属性类型
 *
 * @param {number} range - 检索范围
 *
 * @returns {string|undefined} - 属性名称
 */
function RealmPropertyName(object, type, range) {
    /**
     * * 节点队列
     */
    const nodeQueue = [];
    // 获取 节点队列
    server.world.getDynamicPropertyIds()
        .filter(node => node.startsWith(`${type}•`))
        .forEach(node => node.split(/•/)[1] == object.dimension.id
        ? nodeQueue.push({ x: JSON.parse(node.split(/•/)[2]), y: 0, z: JSON.parse(node.split(/•/)[4]) })
        : undefined);
    // 如果 节点队列 为空
    if (nodeQueue.length == 0)
        return;
    /**
     * * 节点距离
     */
    const distance = nodeQueue.map(node => Vector.distance(node, { x: Math.floor(object.location.x / 16), y: 0, z: Math.floor(object.location.z / 16) }));
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
        return `${type}•${object.dimension.id}•${nodeQueue[index].x}•0•${nodeQueue[index].z}`;
    }
    // 如果 范围内 无节点
    else
        return;
}
/**
 * * 查询 与 修改星尘能
 *
 * @param {server.Block | server.Entity | server.Player} object - 发起事件的实例对象
 *
 * @param {number} offset - 修改的数值
 *
 * @param {boolean} create - 是否可以创建新的 星尘能 节点
 *
 * @returns {[boolean, number]} - 返回一个数组, 第一个元素表示是否修改成功, 第二个元素表示修改后的星尘能数量
 */
function AlterEnergy(object, offset, create) {
    /**
     * * 当前节点名称
     */
    const current = `stardust_energy•${object.dimension.id}•${Math.floor(object.location.x / 16)}•0•${Math.floor(object.location.z / 16)}`;
    /**
     * * 区域属性名称
     */
    const realmName = RealmPropertyName(object, current.split(/•/)[0], 16);
    // 如果 区域属性名称 为空
    if (!realmName && create)
        server.world.setDynamicProperty(current, offset);
    if (!realmName)
        return [false, offset];
    /**
     * * 区域属性-能量值
     */
    const price = server.world.getDynamicProperty(realmName);
    // 如果 能量值 过低
    if (price + offset <= 0) {
        server.world.setDynamicProperty(realmName, undefined);
        return [false, 0];
    }
    // 如果 能量值 超出范围
    else if (price + offset >= 10000000) {
        return [true, price];
    }
    // 如果 能量值 在范围内
    else {
        server.world.setDynamicProperty(realmName, price + offset);
        return [true, price + offset];
    }
}
/**
 * * 查询 区域属性 - 能量值
 *
 * @param {server.Block | server.Entity | server.Player} object - 发起事件的实例对象
 *
 * @returns {number} - 返回 区域属性-能量值
 */
function QueryEnergy(object) {
    /**
     * * 当前节点名称
     */
    const current = `stardust_energy•${object.dimension.id}•${Math.floor(object.location.x / 16)}•0•${Math.floor(object.location.z / 16)}`;
    /**
     * * 区域属性名称
     */
    const realmName = RealmPropertyName(object, current.split(/•/)[0], 48);
    // 如果 区域属性名称 为空
    if (!realmName)
        return 0;
    // 返回 区域属性-能量值
    return server.world.getDynamicProperty(realmName);
}

/*
 * 原版接口
 */
/**
 * 根据物品堆栈数据创建一个新的物品实例
 *
 * @param {type.ITEM_STACK_DATA} data - 包含物品类型, 数量, 名称标签, 描述和动态属性的对象
 *
 * @returns {server.ItemStack} 创建的物品实例, 包含了传入数据中的所有属性
 */
function CreateItemFromStackData(data) {
    /**
     * 创建一个新的物品实例, 并设置其类型和数量
     */
    const item = new server.ItemStack(data.type, data.amount);
    // 如果传入了名称标签, 则设置物品的名称标签
    if (data.name)
        item.nameTag = data.name;
    // 如果传入了词缀, 则设置物品的词缀
    if (data.lore)
        item.setLore(data.lore);
    // 如果传入了属性, 则设置物品的属性
    if (data.property)
        [...data.property].forEach(intel => item.setDynamicProperty(...intel));
    // 返回创建好的物品实例
    return item;
}
/**
 * * 设置 物品耐久
 *
 * @param {server.Player} source 发起修改 的 玩家
 *
 * @param {server.ItemStack} item 进行修改 的 物品
 *
 * @param {server.Container} container 进行修改 的 物品容器
 *
 * @param {number} slot 进行修改 的 物品槽位
 *
 * @param {number} value 物品耐久 的 偏移量
 */
function SetDurability(source, item, container, slot, value) {
    /**
     * * 获得 修改过耐久 的 新物品
     */
    const newItem = AlterDurability(item, value);
    // 如果耐久不足 则播放耐久耗尽的音效
    if (newItem === undefined)
        source.playSound('random.anvil_break');
    // 更新容器中的物品
    container.setItem(slot, newItem);
}
/**
 * * 改变 物品耐久
 *
 * @param {server.ItemStack} item - 物品
 *
 * @param {number} value - 更新的数值
 *
 * @returns {server.ItemStack | undefined} - 返回修改后的 物品
 */
function AlterDurability(item, value) {
    /**
     * * 获取 物品耐久组件
     */
    const getDurability = item.getComponent('minecraft:durability');
    // 判断 物品耐久组件 是否存在
    if (!getDurability)
        return item;
    // 更新 物品耐久
    if (getDurability.damage <= getDurability.maxDurability - value) {
        getDurability.damage += value;
        return item;
    }
    else
        return undefined;
}
/**
 * * 删除 容器中 物品对象
 *
 * @param {server.Container} container - 要进行 检测 的 容器对象
 *
 * @param {server.ItemStack} sample - 要进行 检测 的 物品对象集
 *
 * @returns {boolean} - 是否成功
 */
function DeleteItemStack(container, sample) {
    // 遍历 容器中的 物品对象
    for (let index = 0; index < container.size; index++) {
        /**
         * * 获取 物品对象
         */
        const item = container.getItem(index);
        // 排除 无效的 物品对象
        if (!item || item.typeId !== sample.typeId || item.amount < sample.amount)
            continue;
        // 减少 物品堆栈
        ConsumeItemStack(container, index, item, sample.amount);
        // 输出 物品删除成功
        return true;
    }
    // 输出 物品删除失败
    return false;
}
/**
 * * 从容器中消耗指定数量的物品堆叠
 *
 * 检查物品堆叠中的物品数量是否大于要消耗的数量
 *
 * 如果大于, 减少物品堆叠的数量, 并更新容器中的物品堆叠
 *
 * 如果物品堆叠中的物品数量等于或小于要消耗的数量
 *
 * 则将容器中对应槽位的物品堆叠设置为空（即移除该物品堆叠）
 *
 * @param {server.Container} container - 物品所在的容器
 *
 * @param {number} slot - 物品堆叠所在的槽位索引
 *
 * @param {server.ItemStack} item - 要消耗的物品堆叠
 *
 * @param {number} amount - 要消耗的物品数量, 默认为 1
 */
function ConsumeItemStack(container, slot, item, amount = 1) {
    if (item.amount > amount) {
        // 减少物品堆叠的数量
        item.amount -= amount;
        // 更新容器中的物品堆叠
        container.setItem(slot, item);
    }
    else
        container.setItem(slot);
}
/**
 * * 对物品堆栈进行排序和分组
 *
 * * 将物品堆栈按类型标识符进行分组, 并在每个组内按数量进行排序
 *
 * * 最后将所有分组合并为一个排序后的数组
 *
 * @param {server.ItemStack[]} items - 需要排序和分组的物品堆栈数组
 *
 * @returns {server.ItemStack[]} - 返回排序和分组后的物品堆栈数组
 */
function OrganizeItemStacks(items) {
    /**
     * * 创建一个 Map 来保存按 typeId 分组的物品
     */
    const groupedItems = new Map();
    // 遍历 items 数组, 将具有相同 typeId 的项目归类到一起
    items.forEach(item => {
        /**
         * * 获取物品的 typeId
         */
        const typeId = item.typeId;
        // 如果 groupedItems 中还没有该 typeId 对应的数组, 则创建一个新数组并添加到 groupedItems 中
        if (!groupedItems.has(typeId))
            groupedItems.set(typeId, [item]);
        // 否则, 将该项目添加到对应 typeId 的数组中
        else
            groupedItems.get(typeId)?.push(item);
    });
    /**
     * 将 groupedItems 中的项目根据 typeId 的某个部分长度进行排序
     *
     * 并将每个 typeId 对应的项目数组根据 amount 进行排序
     *
     * 然后将所有的项目数组合并成一个数组
     */
    const sortedItems = [...groupedItems]
        // 根据 typeId 的第一个部分的长度进行排序, 确保按照特定的顺序处理项目
        .sort((a, b) => a[0].split(':')[0].length - b[0].split(':')[0].length)
        // 根据 typeId 的首字母排序
        .sort((a, b) => a[0].split(':')[0].localeCompare(b[0].split(':')[0]))
        // 将每个 typeId 对应的项目数组提取出来, 并根据项目的 amount 进行排序
        .map(x => x[1].sort((a, b) => a.amount - b.amount))
        // 将所有的项目数组合并成一个大的数组
        .flatMap(x => x);
    // 返回排序后的项目数组
    return sortedItems;
}
/**
 * 检测容器中是否包含足够的物品来满足给定样本中的需求。
 *
 * @param {server.Container} container - 要进行检测的容器对象。
 *
 * @param {server.ItemStack[]} samples - 包含需要检测的物品及其所需数量的数组。
 *
 * @returns {boolean} - 如果容器中的物品满足所有样本需求, 返回 true；否则返回 false。
 */
function CheckItemStack(container, samples) {
    /**
     * 合并样本中相同类型 (typeId) 的需求数量
     */
    const types = new Map();
    // 遍历样本数组
    for (const sample of samples) {
        /**
         * 获取当前样本类型可能已经记录的数量
         */
        const existingAmount = types.get(sample.typeId) || 0;
        // 更新记录的数量
        types.set(sample.typeId, existingAmount + sample.amount);
    }
    /**
     * 累加容器中相同类型 (typeId) 的实际数量
     */
    const items = new Map();
    // 遍历容器中的每个槽位
    for (let index = 0; index < container.size; index++) {
        /**
         * * 获取容器中当前槽位的物品对象
         */
        const item = container.getItem(index);
        // 如果当前槽位为空, 则跳过当前迭代
        if (!item)
            continue;
        /**
         * 获取当前物品类型可能已经记录的数量
         */
        const currentAmount = items.get(item.typeId) || 0;
        // 更新记录的数量
        items.set(item.typeId, currentAmount + item.amount);
    }
    // 检查容器中的每个物品类型是否满足样本需求
    return [...types].every(([typeId, requiredAmount]) => (items.get(typeId) || 0) >= requiredAmount);
}
/**
 * 搜索周围的方块, 查找符合条件的容器。
 *
 * @param {server.Block} anchor - 搜索起始点的方块对象。
 *
 * @param {server.ItemStack}[input] - 可选参数, 表示要存放的物品。用于校验目标容器是否能容纳该物品。
 *
 * @param {number} [scope=5] - 搜索范围, 默认为 5个方块内的距离。
 *
 * @returns {[server.Container, server.Block][]} 返回符合条件的容器和对应方块的结果数组。
 */
function SearchContainers(anchor, input, scope = 5) {
    /**
     * 存储找到的容器
     */
    const containers = [];
    // 遍历周围的方块容器
    for (const vector of Vector.createCubeLattice(scope)) {
        /**
         * 获取偏移位置的方块
         */
        const block = anchor.offset(vector);
        /**
         * * 获取指定坐标处的容器
         */
        const container = block?.getComponent('inventory')?.container;
        // 判断是否指定了目标物品
        if (input !== undefined) {
            /**
             * 用于校验容器的模板物品
             */
            const samples = new server.ItemStack(input.typeId);
            // 如果容器不存在或没有空槽, 则跳过该容器
            if (!container || !CheckItemStack(container, [samples]) || container.emptySlotsCount <= 1)
                continue;
        }
        else if (!container || container.emptySlotsCount <= 1)
            continue;
        // 将找到的容器添加到containers数组中
        containers.push([container, block]);
    }
    return containers;
}

/*
 * 导出模块
 */
/**
 * templateMatcher 函数用于检查样本字符串是否匹配模板集合中的任一模式。
 * 模板集合中可能包含三种模式：精确匹配、前缀匹配和后缀匹配。
 *
 * @param {Set<string>} template - 代表一系列匹配模式：
 *   - 精确匹配: 模板与样本完全一致（如 "exact"）
 *   - 前缀匹配: 模板以 (*content) 形式存在（如 "*contains"）, 样本包含 content 即匹配
 *   - 后缀匹配: 模板以 (content*) 形式存在（如 "contains*"）, 样本包含 content 即匹配
 *
 * @param {string} sample - 待匹配的样本字符串
 *
 * @returns {boolean} 匹配成功返回 true, 否则返回 false
 */
function TemplateMatcher(template, sample) {
    // 精确匹配：直接检查样本是否存在模板集合中
    if (template.has(sample))
        return true;
    /**
     * 匹配 (*content) 模式的正则, 提取 content
     * 示例：模板 "*example" 会提取 "example"
     */
    const suffixRegex = /^\*(.*)$/;
    /**
     * 匹配 (content*) 模式的正则, 提取 content
     * 示例：模板 "example*" 会提取 "example"
     */
    const prefixRegex = /^(.*)\*$/;
    // 遍历模板集合, 依次匹配每种模式
    for (const pattern of template) {
        /**
         * 前缀匹配检测（如 content*）
         */
        const suffixMatch = pattern.match(suffixRegex);
        if (suffixMatch) {
            /**
             * 提取 样本字符串
             */
            const content = suffixMatch[1];
            // 匹配结尾
            if (content && sample.endsWith(content))
                return true;
            // 包含即匹配
            //if (content && sample.includes(content)) return true;
        }
        /**
         * 前缀匹配检测（如 content*）
         */
        const prefixMatch = pattern.match(prefixRegex);
        if (prefixMatch) {
            /**
             * 提取 样本字符串
             */
            const content = prefixMatch[1];
            // 匹配开头
            if (content && sample.startsWith(content))
                return true;
            // 包含即匹配
            //if (content && sample.includes(content)) return true;
        }
    }
    return false;
}
/**
 * 清理消息数组中的格式化代码和换行符
 *
 * @param {server.RawMessage[]} dataArray - 待处理的消息数组
 *
 * @returns {server.RawMessage[]} - 处理后的消息数组
 */
function CleanMessageArray(dataArray) {
    // 遍历数组中的每个对象
    return dataArray.map(item => {
        // 如果对象中有 'text' 属性, 则对其进行正则替换
        if (item.text)
            item.text = item.text.replace(/§\w|\n/g, '');
        return item;
    });
}

/*
 * 原版接口
 */
/**
 * * 水花粒子效果触发器
 */
function SprayParticleTrigger(dimension, location, size = 1) {
    /**
     * * 参数数组
     */
    const molangGroup = [
        new server.MolangVariableMap(),
        new server.MolangVariableMap(),
        new server.MolangVariableMap(),
        new server.MolangVariableMap()
    ];
    // 设置 参数
    molangGroup[0].setSpeedAndDirection('variable.property', size, Vector.CONSTANT_EAST);
    molangGroup[1].setSpeedAndDirection('variable.property', size, Vector.CONSTANT_WEST);
    molangGroup[2].setSpeedAndDirection('variable.property', size, Vector.CONSTANT_SOUTH);
    molangGroup[3].setSpeedAndDirection('variable.property', size, Vector.CONSTANT_NORTH);
    // 输出 粒子
    server.system.runTimeout(() => {
        TrySpawnParticle(dimension, 'scripts:spray_main_ripple', location, molangGroup[0]);
        molangGroup.forEach(map => TrySpawnParticle(dimension, 'scripts:spray_large_phase1', location, map));
    }, 1);
    server.system.runTimeout(() => {
        TrySpawnParticle(dimension, 'scripts:spray_splash', location, molangGroup[0]);
        TrySpawnParticle(dimension, 'scripts:spray_extend_ripple', location, molangGroup[0]);
        molangGroup.forEach(map => TrySpawnParticle(dimension, 'scripts:spray_large_phase2', location, map));
    }, 6);
}
/**
 * * 判断 实体当前生命值 是否低于 指定百分比
 *
 * @param {server.EntityHealthComponent} health - 实体生命值组件
 *
 * @param {number} percentage - 百分比
 *
 * @returns {boolean} - 返回 实体当前生命值 是否低于 指定百分比
 */
function HealthBelow(health, percentage) {
    /**
     * * 当前生命值
     */
    const current = health.currentValue;
    /**
     * * 最大生命值
     */
    const maximum = health.defaultValue;
    // 返回测试结果
    return maximum * percentage >= current;
}
/**
 * * 判断 实体当前生命值 是否高于 指定百分比
 *
 * @param {server.EntityHealthComponent} health - 实体生命值组件
 *
 * @param {number} percentage - 百分比
 *
 * @returns {boolean} - 返回 实体当前生命值 是否高于 指定百分比
 */
function HealthHigher(health, percentage) {
    /**
     * * 当前生命值
     */
    const current = health.currentValue;
    /**
     * * 最大生命值
     */
    const maximum = health.defaultValue;
    // 返回测试结果
    return maximum * percentage <= current;
}
/**
 * * 尝试获取 诸界道标
 *
 * @param {server.Player} object - 作为 信息源 的 玩家对象
 *
 * @param {string} input - 获取信息 的 键
 *
 * @param {Map<string, type.LOCATION_AND_DIMENSION>} output - 存储信息 的 Map对象
 */
function CompileSign(object, input, output) {
    /**
     * * 获取 json信息
     */
    const source = JSON.parse(object.getDynamicProperty(input));
    /**
     * * 获取 目标维度
     */
    const getDimension = server.world.getDimension(source.dimension);
    // 保存 解析后的 坐标信息
    output.set(input, { location: source.location, dimension: getDimension });
}
/**
 * * 包含 粒子动画 与 镜头动画 的 完整召唤动画
 *
 * @param {server.Player} player - 玩家对象
 *
 * @param {server.Vector3} location - 召唤点坐标
 */
function CompleteSummonAnimation(player, location) {
    /**
     * * 定义 相机参数
     */
    const camera = player.camera;
    // 构建 粒子动画
    ParticleSummonAnimation(player, location);
    // 构建 镜头动画
    camera.setCamera('minecraft:free', { location: Vector.add(location, { x: 15, y: 35, z: 15 }), facingLocation: location, easeOptions: { easeTime: 2 } });
    server.system.runTimeout(() => camera.setCamera('minecraft:free', { location: Vector.add(location, { x: -15, y: 5, z: 15 }), facingLocation: location, easeOptions: { easeTime: 2 } }), 80);
    server.system.runTimeout(() => camera.fade({ fadeColor: { red: 0, green: 0, blue: 0 }, fadeTime: { fadeInTime: 1, fadeOutTime: 0.5, holdTime: 0.5 } }), 120);
    server.system.runTimeout(() => camera.setCamera('minecraft:free', { location, facingLocation: location, easeOptions: { easeTime: 1 } }), 120);
    server.system.runTimeout(() => camera.clear(), 140);
}
/**
 * * 通用召唤效果的粒子动画部分
 *
 * @param {server.Player} player - 玩家对象
 *
 * @param {server.Vector3} location - 召唤点坐标
 */
function ParticleSummonAnimation(player, location) {
    /**
     * * 定义 粒子参数
     */
    const molang = new server.MolangVariableMap();
    // 构建 动画效果
    molang.setFloat('variable.size', 10);
    molang.setFloat('variable.direction', 3);
    TrySpawnParticle(player.dimension, 'scripts:path_round', location, molang);
    TrySpawnParticle(player.dimension, 'scripts:path_star4_small', location, molang);
    TrySpawnParticle(player.dimension, 'scripts:path_butterfly', location, molang);
    molang.setFloat('variable.size', 13);
    TrySpawnParticle(player.dimension, 'scripts:path_round', location, molang);
    server.system.runTimeout(() => {
        molang.setFloat('variable.type', 0);
        molang.setVector3('variable.direction', Vector.CONSTANT_UP);
        TrySpawnParticle(player.dimension, 'scripts:path_ray', Vector.add(location, { x: 5, y: 0, z: 0 }), molang);
        TrySpawnParticle(player.dimension, 'scripts:path_ray', Vector.add(location, { x: -5, y: 0, z: 0 }), molang);
        TrySpawnParticle(player.dimension, 'scripts:path_ray', Vector.add(location, { x: 0, y: 0, z: 5 }), molang);
        TrySpawnParticle(player.dimension, 'scripts:path_ray', Vector.add(location, { x: 0, y: 0, z: -5 }), molang);
        TrySpawnParticle(player.dimension, 'scripts:path_ray', Vector.add(location, { x: 3.725, y: 0, z: 3.725 }), molang);
        TrySpawnParticle(player.dimension, 'scripts:path_ray', Vector.add(location, { x: -3.725, y: 0, z: -3.725 }), molang);
        TrySpawnParticle(player.dimension, 'scripts:path_ray', Vector.add(location, { x: -3.725, y: 0, z: 3.725 }), molang);
        TrySpawnParticle(player.dimension, 'scripts:path_ray', Vector.add(location, { x: 3.725, y: 0, z: -3.725 }), molang);
        player.playSound('conduit.attack', { volume: 10, location: Vector.add(location, { x: 15, y: 35, z: 15 }) });
    }, 40);
}
/**
 * * 显示与消耗星尘能
 *
 * @param {server.Block} block - 发起事件的实例对象
 *
 * @param {number} modify - 修改的数值
 *
 * @param {boolean} noShow - 是否不显示悬浮字
 *
 * @param {boolean} create - 是否可以创建新的 星尘能 节点
 *
 * @returns {boolean} - 返回一个布尔值, 表示是否修改成功
 */
function ExpendEnergy(block, modify, noShow, create = false) {
    /**
     * * 获取 星尘能 数值
     */
    const getEnergy = AlterEnergy(block, modify, create);
    /**
     * * 判断是否为耗能
     */
    const direction = modify > 0 ? '§q↑§r' : '§m↓§r';
    // 判断是否修改成功
    if (getEnergy[0]) {
        if (!noShow)
            DisplayFloatingText(block, '<§l§d 星尘力 §r> : §l§u' + getEnergy[1] + direction);
        return true;
    }
    else {
        ErrorMessage('<§l§d 星尘力 §r>§4 发生错误§r', block, { text: '无法获取到足够的<§l§d 星尘力 §r>, 请使用<§l§u 能源节点 §r>进行补充或创建' });
        return false;
    }
}
/**
 * * 分析领域属性
 *
 * 根据玩家请求, 分析并展示当前世界的特定领域属性
 *
 * @param {server.Player} player - 发起操作的玩家
 * @param {string} text - 要查询的领域属性类型
 * @param {(option: serverUI.ActionFormResponse) => void} after - 窗口关闭后的回调函数
 */
function ExecuteAnalysisRealm(player, text, after) {
    /**
     * 获取领域属性标识符
     */
    const entry = server.world.getDynamicPropertyIds().filter(node => node.startsWith(`${text}•`)).sort((a, b) => b.length - a.length);
    /**
     * 获取领域属性状态值
     */
    const state = entry.map(node => server.world.getDynamicProperty(node));
    /**
     * 定义窗口界面标题
     */
    const title = { text: "§9<§l " + text + " §r§9>" };
    /**
     * 创建窗口界面表单对象
     */
    const display = new serverUI.ActionFormData().title(title);
    /**
     * 将领域属性坐标映射为区块坐标字符串
     */
    const mapping = (node) => {
        /**
         * 提取坐标信息
         */
        const analysis = node.split(/•/).map(node => Number(node));
        /**
         * 创建区块坐标对象
         */
        const anchor = { x: analysis[2] * 16, y: 0, z: analysis[4] * 16 };
        // 返回区块坐标字符串
        return Vector.toString(anchor);
    };
    // 根据领域属性数量添加按钮
    if (entry.length >= 1)
        entry.forEach((key, index) => display.button('§l§9基准坐标 : §5' + mapping(key) + '\n§9属性值 : §r§u' + state[index]));
    else
        display.button('§4§l未创建§r : §u领域属性§9 -> §r' + text);
    // 显示窗口界面
    display.show(player).then(option => {
        // 检测玩家是否退出窗口
        if (option.canceled || option.selection == undefined)
            return;
        if (entry.length == 0)
            return;
        // 调用回调函数处理后续操作
        after(player, { option, entry, state });
    });
}
/**
 * * 修改星尘能量属性
 *
 * 允许玩家通过表单输入修改星尘能量的数值
 *
 * @param {server.Player} player - 发起操作的玩家
 *
 * @param {INTENTION_REALM_AFTER} args - 表单返回的参数
 */
function ExecuteAlterEnergy(player, args) {
    /**
     * 定义表单标题
     */
    const title = { text: "§9《§u§l 调试 - 星尘能量 §9》§r" };
    /**
     * 输入框提示信息
     */
    const text = { text: "请输入新的星尘能量值, 修改需谨慎以避免故障" };
    /**
     * 预填充的文本
     */
    const plan = { text: args.state[args.option.selection ?? 0]?.toString() };
    /**
     * 创建表单对象, 并添加能量值输入框
     */
    const display = new serverUI.ModalFormData().title(title).textField('星尘能量值', text, { 'defaultValue': plan.text });
    // 显示表单
    display.show(player).then(option => {
        if (!option.formValues)
            return;
        /**
         * 新的星尘能量值
         */
        const property = Number(option.formValues[0]) ?? 0;
        // 更新领域属性
        server.world.setDynamicProperty(args.entry[args.option.selection ?? 0], property);
    });
}
/**
 * * 修改虚岩矿脉属性
 *
 * 允许玩家通过表单输入修改虚岩矿脉的矿物类型和数量
 *
 * @param {server.Player} player - 发起操作的玩家
 *
 * @param {INTENTION_REALM_AFTER} args - 表单返回的参数
 */
function AlterMineral(player, args) {
    /**
     * 定义表单标题
     */
    const title = { text: "§9《§u§l 调试 - 虚岩矿脉 §9》§r" };
    /**
     * 输入框提示信息
     */
    const text = { text: "请输入新的矿物参数, 修改需谨慎以避免故障" };
    /**
     * 解析当前领域属性
     */
    const analysis = JSON.parse(`${args.state[args.option.selection ?? 0]}`);
    /**
     * 原始的矿石数量
     */
    const proto_amount = analysis.amount;
    /**
     * 原始的矿石类型
     */
    const proto_type = analysis.type;
    /**
     * 创建表单对象
     */
    const display = new serverUI.ModalFormData().title(title);
    // 添加矿物类型输入框
    proto_type.forEach(type => display.textField('矿物类型', text, { 'defaultValue': type }));
    // 添加矿物数量输入框
    display.textField('矿物数量', text, { 'defaultValue': proto_amount.toString() });
    // 显示表单
    display.show(player).then(option => {
        // 检测玩家是否退出窗口
        if (!option.formValues)
            return;
        /**
         * 新的矿石类型
         */
        const type = option.formValues.slice(0, proto_type.length);
        /**
         * 新的矿石数量
         */
        const amount = option.formValues[proto_type.length].split(',').map(Number);
        // 更新领域属性
        server.world.setDynamicProperty(args.entry[args.option.selection ?? 0], JSON.stringify({ type, amount }));
    });
}
/**
 * * 分析并调整星尘能量值
 *
 * 根据玩家请求, 对当前世界的星尘能量值进行分析和调整
 *
 * @param {server.Player} player - 发起操作的玩家
 *
 * @returns {server.RawMessage} - 操作结果的反馈消息
 */
function AnalysisAlterEnergy(player) {
    // 权限验证
    if (!isPlayerAuthorized(player))
        return ReplyMessages.power_lack;
    // 调用领域分析函数, 调整能量值
    ExecuteAnalysisRealm(player, 'stardust_energy', ExecuteAlterEnergy);
    // 返回操作成功的提示信息
    return ReplyMessages.realm_energy;
}
/**
 * * 分析并调整虚岩矿脉
 *
 * 根据玩家请求, 对当前世界的虚岩矿脉进行分析和调整
 *
 * @param {server.Player} player - 发起操作的玩家
 *
 * @returns {server.RawMessage} - 操作结果的反馈消息
 */
function AnalysisAlterMineral(player) {
    // 权限验证
    if (!isPlayerAuthorized(player))
        return ReplyMessages.power_lack;
    // 调用领域分析函数, 调整矿物值
    ExecuteAnalysisRealm(player, 'mineral_vein', AlterMineral);
    // 返回操作成功的提示信息
    return ReplyMessages.realm_mineral;
}
/**
 * * 显示引导提示
 *
 * @param {server.Player} object - 显示引导提示的玩家对象
 *
 * @param {string} type - 指引类型
 */
function PlayPrompt(object, type) {
    /**
     * * 指引文本
     */
    const intel = help.get(type);
    /**
     * * 引导提示开头
     */
    const message = { text: '「 星之引导 」: ' };
    // 检测 指引文本 与 玩家身份
    if (object.hasTag('prompt:' + type) || !intel)
        return;
    // 显示 指引文本
    intel.forEach(info => server.system.runTimeout(() => object.sendMessage([message, info.refer]), info.delay));
    intel.forEach(info => server.system.runTimeout(() => object.playSound('resonate.amethyst_block'), info.delay));
    // 添加识别标签
    object.addTag('prompt:' + type);
}
/**
 * * 扩展功能
 */
const scalability = new Map();
scalability.set('调试星尘能量', {
    synopsis: { text: '§c◆§r 允许玩家修改§9星尘能量§r的§2数值§r' },
    ...ReplyMessages.craft_template,
    code: AnalysisAlterEnergy
});
scalability.set('调试虚岩矿脉', {
    synopsis: { text: '§c◆§r 允许玩家修改§9虚岩矿脉§r的§6类型§r和§2数量§r' },
    ...ReplyMessages.craft_template,
    code: AnalysisAlterMineral
});
// 在 月华百科的数据库 内 注册 扩展功能
material.push(...scalability);
// 运行 计划表
server.system.runInterval(() => Control.execute());

/*
 * 原版接口
 */
/**
 * * 机关之门 的 关闭事件标识符
 */
const tickId = new Map();
/**
 * * 魔晶传送 - 向上传送 < 30 能量消耗 >
 */
function AboveTeleport(block) {
    /**
     * * 获取实体队列
     */
    const entitys = block.dimension.getEntitiesAtBlockLocation(block);
    // 执行事件机制
    if (!ExpendEnergy(block, -30))
        return;
    // 遍历 射线方向 的 128个 方块
    for (let index = 1; index < 128; index++) {
        try {
            /**
             * * 获取方块对象
             */
            const target = block.offset({ x: 0, y: index, z: 0 });
            // 判断方块是否为 魔晶上传 或 魔晶下传
            if (target?.typeId !== 'starry_map:magic_portal_above' && target?.typeId !== 'starry_map:magic_portal_below')
                continue;
            // 传送实体
            entitys.forEach(info => info.teleport(target.center()));
            // 创建路径规划
            PathExecute.Create('魔晶上传-路径显示', 1, {
                locations: [block.location, target.location],
                particles: ['constant:smoke_rune_purple'],
                offset: Vector.CONSTANT_HALF,
                dimension: block.dimension,
                cooldown: 1,
                speed: Vector.distance(block, target),
            });
            break;
        }
        catch {
            ErrorMessage('<§l§b 魔晶上传 §r>§4 发生错误§r', block, { text: '实体传送失败, 请勿在<§l§m 世界边界 §r>或<§l§n 世界之外 §r>使用!!' });
            break;
        }
    }
}
/**
 * * 魔晶传送 - 向下传送 < 30 能量消耗 >
 */
function BelowTeleport(block) {
    /**
     * * 获取实体队列
     */
    const getEntityGroup = block.dimension.getEntitiesAtBlockLocation(block);
    // 执行事件机制
    if (!ExpendEnergy(block, -30))
        return;
    // 遍历 射线方向 的 128个 方块
    for (let index = 1; index < 128; index++) {
        try {
            /**
             * * 获取方块对象
             */
            const target = block.offset({ x: 0, y: -index, z: 0 });
            // 判断方块是否为 魔晶上传 或 魔晶下传
            if (target?.typeId !== 'starry_map:magic_portal_above' && target?.typeId !== 'starry_map:magic_portal_below')
                continue;
            // 传送实体
            getEntityGroup.forEach(info => info.teleport(target.center()));
            // 创建路径规划
            PathExecute.Create('魔晶下传-路径显示', 1, {
                locations: [block.location, target.location],
                particles: ['constant:smoke_rune_purple'],
                offset: Vector.CONSTANT_HALF,
                dimension: block.dimension,
                cooldown: 1,
                speed: Vector.distance(block, target),
            });
            break;
        }
        catch {
            ErrorMessage('<§l§b 魔晶下传 §r>§4 发生错误§r', block, { text: '实体传送失败, 请勿在<§l§m 世界边界 §r>或<§l§n 世界之外 §r>使用!!' });
            break;
        }
    }
}
/**
 * * 开启 垂直放置 的 机关之门
 *
 * @param {server.Block} block - 机关门对象
 */
function verticalGate$1(block) {
    /**
     * * 获取 机关门方向
     */
    const about = block.permutation.getState('STATE:about');
    // 判断 门方向
    if (about == 1 || about == 3) {
        const east = block.east();
        const west = block.west();
        // 激活 东门
        if (east?.typeId == block.typeId && east?.permutation.getState('STATE:rune_type') == 0)
            TrySetPermutation(east, 'STATE:rune_type', 1);
        // 激活 西门
        if (west?.typeId == block.typeId && west?.permutation.getState('STATE:rune_type') == 0)
            TrySetPermutation(west, 'STATE:rune_type', 3);
    }
    else if (about == 2 || about == 4) {
        const north = block.north();
        const south = block.south();
        // 激活 北门
        if (north?.typeId == block.typeId && north?.permutation.getState('STATE:rune_type') == 0)
            TrySetPermutation(north, 'STATE:rune_type', 2);
        // 激活 南门
        if (south?.typeId == block.typeId && south?.permutation.getState('STATE:rune_type') == 0)
            TrySetPermutation(south, 'STATE:rune_type', 4);
    }
    const above = block.above();
    const below = block.below();
    // 激活 上方机关门
    if (above?.typeId == block.typeId && above?.permutation.getState('STATE:rune_type') == 0)
        TrySetPermutation(above, 'STATE:rune_type', 5);
    // 激活 下方机关门
    if (below?.typeId == block.typeId && below?.permutation.getState('STATE:rune_type') == 0)
        TrySetPermutation(below, 'STATE:rune_type', 6);
    // 获取 时钟标识符
    const toString = Vector.toString(block.location);
    // 复位机关门
    const tick = server.system.runTimeout(() => {
        // 播放 关门音效
        block.dimension.playSound('close.iron_door', block.location);
        // 复位机关门
        TrySetPermutation(block, 'STATE:rune_type', 0);
    }, 100);
    // 设置定时器
    tickId.set(toString, tick);
}
/**
 * * 开启 水平放置 的 机关之门
 *
 * @param {server.Block}  block - 机关门对象
 */
function horizontalGate$1(block) {
    // 获取周围的方块
    const north = block.north();
    const south = block.south();
    const east = block.east();
    const west = block.west();
    // 激活 东门
    if (east?.typeId == block.typeId && east?.permutation.getState('STATE:rune_type') == 0)
        TrySetPermutation(east, 'STATE:rune_type', 1);
    // 激活 西门
    if (west?.typeId == block.typeId && west?.permutation.getState('STATE:rune_type') == 0)
        TrySetPermutation(west, 'STATE:rune_type', 3);
    // 激活 北门
    if (north?.typeId == block.typeId && north?.permutation.getState('STATE:rune_type') == 0)
        TrySetPermutation(north, 'STATE:rune_type', 2);
    // 激活 南门
    if (south?.typeId == block.typeId && south?.permutation.getState('STATE:rune_type') == 0)
        TrySetPermutation(south, 'STATE:rune_type', 4);
    // 获取 时钟标识符
    const toString = Vector.toString(block.location);
    // 复位机关门
    const tick = server.system.runTimeout(() => {
        // 播放 关门音效
        block.dimension.playSound('close.iron_door', block.location);
        // 复位机关门
        TrySetPermutation(block, 'STATE:rune_type', 0);
    }, 100);
    // 设置定时器
    tickId.set(toString, tick);
}
/**
 * * 紧急关闭机关门
 *
 * @param {server.Block} object - 机关门对象
 */
function Urgent(object) {
    for (let x = -4; x < 4; x++)
        for (let y = -4; y < 4; y++)
            for (let z = -4; z < 4; z++) {
                /**
                 * * 获取方块对象
                 */
                const target = object.offset({ x, y, z });
                if (target?.typeId != object.typeId)
                    continue;
                // 获取 时钟标识符
                const toString = Vector.toString(target?.location);
                // 复位机关门
                TrySetPermutation(target, 'STATE:rune_type', 0);
                /**
                 * * 获取 时钟标识符
                 */
                const tick = tickId.get(toString);
                if (!tick)
                    continue;
                // 移除定时器
                server.system.clearRun(tick);
                tickId.delete(toString);
            }
}

/*
 * 原版接口
 */
/**
 * * 进行检测的默认物品标签
 */
const defaultTag$1 = 'tags:magic_tool.series';
/**
 * * 组件前缀代词
 */
const componentPrefix$b = 'opal:interact.';
/**
 * * 方块自定义组件列表
 */
const components$d = new Map();
/**
 * * 实体交互方块组件
 *
 * @param source - 方块组件参数
 */
function InteractComponentTrigger(source) {
    /**
     * * 方块对象
     */
    const block = source.block;
    /**
     * * 方块状态
     */
    const state = source.block.permutation;
    /**
     * * 方块维度
     */
    const dimension = source.dimension;
    /**
     * * 玩家对象
     */
    const player = source.player;
    /**
     * * 玩家背包
     */
    const container = player?.getComponent('minecraft:inventory')?.container;
    /**
     * * 物品对象
     */
    const item = container?.getItem(player?.selectedSlotIndex ?? 0);
    // 返回 方块交互组件 的 解构
    return { block, state, dimension, player, container, item };
}
/*
 * 从林木椅
 */
components$d.set(componentPrefix$b + 'jungle_wood_chair', {
    async onPlayerInteract(source) {
        /**
         * * 方块组件参数 的 解构
         */
        const analysis = InteractComponentTrigger(source);
        // 移除不应该存在的实体实体
        analysis.dimension.getEntitiesAtBlockLocation(analysis.block).filter(entity => entity.typeId === 'starry_map:execute.player_seat').forEach(entity => entity.remove());
        // 等待 1 tick
        await server.system.waitTicks(1);
        // 创建 玩家座位点实体
        TrySpawnEntity(analysis.dimension, 'starry_map:execute.player_seat', analysis.block.center());
    }
});
/*
 * 计数模块
 */
components$d.set(componentPrefix$b + 'counting_module', {
    onPlayerInteract(source) {
        /**
         * * 方块组件参数 的 解构
         */
        const analysis = InteractComponentTrigger(source);
        // 检测是否使用了正确道具
        if (!analysis.item?.hasTag(defaultTag$1))
            return;
        /**
         ** 输入值
         */
        const input = analysis.state.getState('STATE:input');
        // 赋值 方块状态
        TrySetPermutation(analysis.block, 'STATE:input', input != 10 ? input + 1 : 1);
        TrySetPermutation(analysis.block, 'STATE:count', 1);
        // 播放音效 与 粒子效果
        analysis.player?.playSound('tile.piston.out');
        // 显示悬浮文本
        DisplayFloatingText(analysis.block, '<§l§e 计数模块 §r> : §l§9' + (input != 10 ? input + 1 : 1));
    }
});
/*
 * 交互终端
 */
components$d.set(componentPrefix$b + 'control_panel', {
    onPlayerInteract(source) {
        /**
         * * 方块组件参数 的 解构
         */
        const analysis = InteractComponentTrigger(source);
        if (analysis.item?.hasTag(defaultTag$1)) {
            /**
             ** 方块状态值
             */
            const note = analysis.state.getState('STATE:rune_note');
            // 赋值 方块状态
            TrySetPermutation(analysis.block, 'STATE:rune_note', note != 7 ? note + 1 : 0);
            // 播放音效 与 粒子效果
            analysis.player?.playSound('tile.piston.out');
            // 显示悬浮文本
            switch (note) {
                case 0:
                    analysis.player?.sendMessage('| 参数设置 | : §l§e交互终端§r[§9 诸海元素 §r]');
                    break;
                case 1:
                    analysis.player?.sendMessage('| 参数设置 | : §l§e交互终端§r[§4 烛火元素 §r]');
                    break;
                case 2:
                    analysis.player?.sendMessage('| 参数设置 | : §l§e交互终端§r[§2 界木元素 §r]');
                    break;
                case 3:
                    analysis.player?.sendMessage('| 参数设置 | : §l§e交互终端§r[§6 归忆元素 §r]');
                    break;
                case 4:
                    analysis.player?.sendMessage('| 参数设置 | : §l§e交互终端§r[§5 极雷元素 §r]');
                    break;
                case 5:
                    analysis.player?.sendMessage('| 参数设置 | : §l§e交互终端§r[§l 启程元素 §r]');
                    break;
                case 6:
                    analysis.player?.sendMessage('| 参数设置 | : §l§e交互终端§r[§0 焚绝元素 §r]');
                    break;
                case 7:
                    analysis.player?.sendMessage('| 参数设置 | : §l§e交互终端§r[§l 虚无模式 §r]');
                    break;
            }
        }
        else {
            /**
             ** 方块状态值
             */
            const note = analysis.state.getState('STATE:rune_note');
            if (analysis.state.getState('STATE:stage') != 0)
                return;
            if (note != 0) {
                TrySetPermutation(analysis.block, 'STATE:stage', 1);
                analysis.player?.playSound('conduit.activate');
                analysis.player?.sendMessage('| §l交互终端§r | : §6信号已发送');
            }
            else {
                analysis.player?.playSound('random.click');
                analysis.player?.sendMessage('| §l交互终端§r | : §4当前操作无法执行!§r\n| §l交互终端§r | : 使用§l§6 魔晶起子 §r调整| 信号类型 |');
            }
        }
    }
});
/*
 * 逻辑非门
 */
components$d.set(componentPrefix$b + 'logic_inverter', {
    onPlayerInteract(source) {
        /**
         * * 方块组件参数 的 解构
         */
        const analysis = InteractComponentTrigger(source);
        // 检测是否使用了正确道具
        if (!analysis.item?.hasTag(defaultTag$1))
            return;
        /**
         ** 输入值
         */
        const price = analysis.state.getState('STATE:price');
        // 赋值 方块状态
        TrySetPermutation(analysis.block, 'STATE:price', price != 9 ? price + 1 : 1);
        // 播放音效 与 粒子效果
        analysis.player?.playSound('tile.piston.out');
        analysis.player?.sendMessage('| 参数设置 | : §l§e逻辑元件§r[§6 运行周期§r] -> §u' + (price != 9 ? price + 1 : 1));
    }
});
/*
 * 信号过滤
 */
components$d.set(componentPrefix$b + 'signal_filtering', {
    onPlayerInteract(source) {
        /**
         * * 方块组件参数 的 解构
         */
        const analysis = InteractComponentTrigger(source);
        // 检测是否使用了正确道具
        if (!analysis.item?.hasTag(defaultTag$1))
            return;
        /**
         ** 方块状态值
         */
        const note = analysis.state.getState('STATE:rune_note');
        // 赋值 方块状态
        TrySetPermutation(analysis.block, 'STATE:rune_note', note != 7 ? note + 1 : 0);
        // 播放音效 与 粒子效果
        analysis.player?.playSound('tile.piston.out');
        // 显示设置文本
        switch (note) {
            case 0:
                analysis.player?.sendMessage('| 参数设置 | : §l§e交互终端§r[§9 诸海元素 §r]');
                break;
            case 1:
                analysis.player?.sendMessage('| 参数设置 | : §l§e交互终端§r[§4 烛火元素 §r]');
                break;
            case 2:
                analysis.player?.sendMessage('| 参数设置 | : §l§e交互终端§r[§2 界木元素 §r]');
                break;
            case 3:
                analysis.player?.sendMessage('| 参数设置 | : §l§e交互终端§r[§6 归忆元素 §r]');
                break;
            case 4:
                analysis.player?.sendMessage('| 参数设置 | : §l§e交互终端§r[§5 极雷元素 §r]');
                break;
            case 5:
                analysis.player?.sendMessage('| 参数设置 | : §l§e交互终端§r[§l 启程元素 §r]');
                break;
            case 6:
                analysis.player?.sendMessage('| 参数设置 | : §l§e交互终端§r[§l§0 焚绝模式 §r]');
                break;
            case 7:
                analysis.player?.sendMessage('| 参数设置 | : §l§e交互终端§r[§l 虚无模式 §r]');
                break;
        }
    }
});
/*
 * 旋转方块朝向
 */
components$d.set(componentPrefix$b + 'rotation_direction', {
    onPlayerInteract(source) {
        /**
         * * 方块组件参数 的 解构
         */
        const analysis = InteractComponentTrigger(source);
        // 检测是否使用了魔晶工具系列物品
        if (!analysis.item?.hasTag(defaultTag$1)) {
            /**
             * * 方块的色彩状态值
             */
            const color = analysis.state.getState('STATE:color');
            // 检测玩家手持物品是否属于魔法书 且 方块是否有色彩参数
            if (!color || !analysis.item?.hasTag('tags:magic_literature:series'))
                return;
            // 设置方块的色彩参数
            TrySetPermutation(analysis.block, 'STATE:color', color != 6 ? color + 1 : 1);
            // 播放音效 与 粒子效果
            analysis.player?.playSound('mob.sheep.shear');
            // 终止函数的后续运行
            return;
        }
        /**
         ** 方块状态值
         */
        const face = analysis.state.getState('minecraft:block_face');
        // 播放音效 与 粒子效果
        analysis.player?.playSound('tile.piston.in');
        // 赋值 方块状态
        switch (face) {
            case 'down':
                TrySetPermutation(analysis.block, 'minecraft:block_face', 'up');
                break;
            case 'up':
                TrySetPermutation(analysis.block, 'minecraft:block_face', 'north');
                break;
            case 'north':
                TrySetPermutation(analysis.block, 'minecraft:block_face', 'south');
                break;
            case 'south':
                TrySetPermutation(analysis.block, 'minecraft:block_face', 'west');
                break;
            case 'west':
                TrySetPermutation(analysis.block, 'minecraft:block_face', 'east');
                break;
            case 'east':
                TrySetPermutation(analysis.block, 'minecraft:block_face', 'down');
                break;
        }
    }
});
/*
 * 伺服基座
 */
components$d.set(componentPrefix$b + 'servo_susceptor', {
    onPlayerInteract(source) {
        /*
         * 方块组件参数 的 解构
         */
        const { player, block, item, state } = InteractComponentTrigger(source);
        // 检测是否使用了正确道具
        if (!item?.hasTag(defaultTag$1))
            return;
        /**
         ** 方块状态值
         */
        const value = state.getState('STATE:value');
        // 赋值 方块状态
        TrySetPermutation(block, 'STATE:value', value != 5 ? value + 1 : 0);
        // 播放音效 与 粒子效果
        player?.playSound('tile.piston.out');
        // 显示 提示文本
        player?.sendMessage({
            rawtext: [
                translate(block),
                { text: `: 已修改至[§6 最大负载 §r]参数 -> ${value != 5 ? value + 1 : 0}` }
            ]
        });
    }
});
/*
 * 水平机关门
 */
components$d.set(componentPrefix$b + 'horizontal_gate', {
    onPlayerInteract(source) {
        /**
         * * 方块组件参数 的 解构
         */
        const analysis = InteractComponentTrigger(source);
        // 检测是否使用了正确道具
        if (analysis.item?.typeId == analysis.block.typeId)
            return;
        // 根据符文类型决定是 开启 或 强制关闭
        if (analysis.state.getState('STATE:rune_type') == 0) {
            TrySetPermutation(analysis.block, 'STATE:rune_type', 7);
            analysis.player?.playSound('open.bamboo_wood_door');
        }
        else if (analysis.state.getState('STATE:rune_type') != 0) {
            TrySetPermutation(analysis.block, 'STATE:rune_type', 0);
            analysis.player?.playSound('open.bamboo_wood_door');
            Urgent(analysis.block);
        }
    }
});
/*
 * 垂直机关门
 */
components$d.set(componentPrefix$b + 'vertical_gate', {
    onPlayerInteract(source) {
        /**
         * * 方块组件参数 的 解构
         */
        const { item, player, block, state } = InteractComponentTrigger(source);
        // 检测是否使用了正确道具
        if (item?.typeId == block.typeId) {
            player?.playSound('place.amethyst_block');
            /**
             * * 获取方块对象
             */
            const target = block.above();
            // 检测上方方块是否为空
            if (target?.isAir)
                target.setPermutation(block.permutation);
            // 终止函数的后续运行
            return;
        }
        // 根据符文类型决定是 开启 或 强制关闭
        if (state.getState('STATE:rune_type') == 0 && state.getState('STATE:about') != 0) {
            TrySetPermutation(block, 'STATE:rune_type', 7);
            player?.playSound('open.bamboo_wood_door');
        }
        else if (state.getState('STATE:rune_type') != 0 && state.getState('STATE:about') != 0) {
            TrySetPermutation(block, 'STATE:rune_type', 0);
            player?.playSound('open.bamboo_wood_door');
            Urgent(block);
        }
    }
});
/*
 * 魔晶上传
 */
components$d.set(componentPrefix$b + 'magic_crystal_upload', {
    onPlayerInteract(source) {
        /**
         * * 方块组件参数 的 解构
         */
        const analysis = InteractComponentTrigger(source);
        // 检测是否使用了正确道具
        if (analysis.item?.typeId == analysis.block.typeId)
            return;
        TrySpawnParticle(analysis.block.dimension, 'constant:prompt_transport_above', analysis.block.bottomCenter());
        TrySetPermutation(analysis.block, 'STATE:rune_type', 9);
        analysis.player?.playSound('conduit.activate');
        AboveTeleport(analysis.block);
    }
});
/*
 * 魔晶下传
 */
components$d.set(componentPrefix$b + 'magic_crystal_download', {
    onPlayerInteract(source) {
        /**
         * * 方块组件参数 的 解构
         */
        const analysis = InteractComponentTrigger(source);
        // 检测是否使用了正确道具
        if (analysis.item?.typeId == analysis.block.typeId)
            return;
        TrySpawnParticle(analysis.block.dimension, 'constant:prompt_transport_below', analysis.block.center());
        TrySetPermutation(analysis.block, 'STATE:rune_type', 9);
        analysis.player?.playSound('conduit.activate');
        BelowTeleport(analysis.block);
    }
});
/*
 * 合金钢锅
 */
components$d.set(componentPrefix$b + 'special_alloy_pot', {
    onPlayerInteract(source) {
        /**
         * 方块组件参数 的 解构
         */
        const { item, block, player, container, state, dimension } = InteractComponentTrigger(source);
        /**
         * 根据火焰状态显示的烹饪提示信息：
         * - 当火焰未点燃时, 提示用户点火；
         * - 当火焰已点燃时, 提示持续搅拌食材。
         */
        const waterPrompt = { text: state.getState('STATE:flame') == 0 ? '§4§l 火未点燃, 请先点火后再持续搅拌~§r' : '§9§l 请持续搅拌让味道充分融合!§r' };
        /**
         * 根据锅内是否有水显示的提示信息：
         * - 当锅内无水时, 提示用户放入食材；
         * - 当锅内有水且火焰已点燃时, 确认搅拌开始的提示。
         */
        const flamePrompt = { text: state.getState('STATE:water') === 0 ? '§4§l锅里空空如也, 请先放入食材！§r' : '§v§l火已点燃, 现在可以开始搅拌啦！§r' };
        // 检测是否使用了正确道具
        if (item?.typeId == block.typeId || !player || !container || !item)
            return;
        // === 烹饪准备阶段 ===
        if (state.getState('STATE:flame') == 0 || state.getState('STATE:water') == 0) {
            [
                'minecraft:flint_and_steel',
                'starry_map:abyssal_whale_wreckage',
                'starry_map:spirit_lizard_shard',
                'starry_map:wild_bee_shard',
                'starry_map:viper_barrel'
            ].forEach((itemId, index) => {
                // 判断玩家手持物品是否在样本数组中
                if (itemId !== item?.typeId)
                    return;
                // 如果是打火石 则进入点火逻辑
                if (index == 0) {
                    TrySetPermutation(block, 'STATE:flame', 1);
                    player?.playSound('fire.ignite');
                    player.sendMessage(flamePrompt);
                }
                // 如果是食材 则进入放水逻辑
                else {
                    player.sendMessage({ rawtext: [{ text: '§9§l已放入 §r' }, translate(item), waterPrompt] });
                    ConsumeItemStack(container, player.selectedSlotIndex, item);
                    TrySetPermutation(block, 'STATE:water', index);
                    player?.playSound('bucket.empty_water');
                }
            });
            // 如果并未 放入食材 且 手持物品 是 熟食 则直接放入
            if (state.getState('STATE:water') == 0 && item.hasTag('minecraft:is_cooked')) {
                player.sendMessage({ rawtext: [{ text: '已放入 ' }, translate(item), waterPrompt] });
                ConsumeItemStack(container, player.selectedSlotIndex, item);
                TrySetPermutation(block, 'STATE:water', 9);
                player?.playSound('bucket.empty_water');
            }
        }
        // === 烹饪进行阶段 ===
        else if (state.getState('STATE:flame') == 1 && state.getState('STATE:water') != 0 && state.getState('STATE:count') != 9) {
            player.sendMessage({ text: `§m§l锅中咕嘟作响, 还需要再搅拌${9 - state.getState('STATE:count')}次...§r` });
            TrySetPermutation(block, 'STATE:count', state.getState('STATE:count') + 1);
            player?.playSound('random.swim');
        }
        // === 烹饪结束阶段 ===
        else if (state.getState('STATE:flame') == 1 && state.getState('STATE:water') != 0 && state.getState('STATE:count') == 9) {
            /**
             * 食物刷新点
             */
            const bottomCenter = block.above()?.bottomCenter();
            // 如果获取不到底部中心点则返回
            if (!bottomCenter)
                return;
            // 如果玩家没有放入调料则返回
            if (!item.hasTag('tags:item_delicacies.sauce')) {
                player.sendMessage({ rawtext: [{ text: '§v§l还没放调料呢...请先放入§r ' }, translate('starry_map:unknown_dipping_sauce', 'item')] });
                return;
            }
            // 根据锅内水类型判断输出类型
            switch (state.getState('STATE:water')) {
                // 如果输出类型应该是原版汤
                case 9:
                    /**
                     ** 物品生成锚点
                     */
                    const anchor = Vector.toString(bottomCenter, { delimiter: ' ' });
                    // 随机生成汤
                    dimension.runCommand(`loot spawn ${anchor} loot random_soup`);
                    break;
                case 1:
                    const food_1 = [
                        'starry_map:charcoal_roasted_abyssal_whale',
                        'starry_map:abyssal_whale_soup'
                    ];
                    TrySpawnItem(dimension, new server.ItemStack(food_1[RandomFloor(0, 1)]), bottomCenter);
                    break;
                case 2:
                    const food_2 = [
                        'starry_map:spirit_lizard_delicacy',
                        'starry_map:spirit_lizard_apple'
                    ];
                    TrySpawnItem(dimension, new server.ItemStack(food_2[RandomFloor(0, 1)]), bottomCenter);
                    break;
                case 3:
                    const food_3 = [
                        'starry_map:bee_fire_cuisine',
                        'starry_map:charcoal_roasted_wild_bee',
                        'starry_map:wild_bee_roasted_chicken'
                    ];
                    TrySpawnItem(dimension, new server.ItemStack(food_3[RandomFloor(0, 2)]), bottomCenter);
                    break;
                case 4:
                    const food_4 = [
                        'starry_map:curry_viper'
                    ];
                    TrySpawnItem(dimension, new server.ItemStack(food_4[0]), bottomCenter);
                    break;
            }
            // 重置方块状态
            TrySetPermutation(block, 'STATE:flame', 0);
            TrySetPermutation(block, 'STATE:water', 0);
            TrySetPermutation(block, 'STATE:count', 0);
            // 播放音效
            player?.playSound('bucket.empty_water');
            // 清除玩家手持的调料
            ConsumeItemStack(container, player.selectedSlotIndex, item);
        }
    }
});
/*
 * 金属伪装
 */
components$d.set(componentPrefix$b + 'metal_camouflage', {
    onPlayerInteract(source) {
        /**
         * * 方块组件参数 的 解构
         */
        const analysis = InteractComponentTrigger(source);
        // 检测是否使用了正确道具
        if (analysis.item?.typeId == analysis.block.typeId)
            return;
        // 判断玩家和玩家背包是否存在
        if (!analysis.player || !analysis.container)
            return;
        /**
         ** 当前手持物品
         */
        const item = analysis.container.getItem(analysis.player.selectedSlotIndex);
        if (!item)
            return;
        // 修改方块纹理
        switch (item?.typeId) {
            case 'minecraft:gold_block':
                TrySetPermutation(analysis.block, 'STATE:texture', 1);
                break;
            case 'minecraft:iron_block':
                TrySetPermutation(analysis.block, 'STATE:texture', 2);
                break;
            case 'minecraft:emerald_block':
                TrySetPermutation(analysis.block, 'STATE:texture', 3);
                break;
            case 'minecraft:diamond_block':
                TrySetPermutation(analysis.block, 'STATE:texture', 4);
                break;
            case 'minecraft:lapis_block':
                TrySetPermutation(analysis.block, 'STATE:texture', 5);
                break;
            case 'minecraft:netherite_block':
                TrySetPermutation(analysis.block, 'STATE:texture', 6);
                break;
            case 'minecraft:copper_block':
                TrySetPermutation(analysis.block, 'STATE:texture', 7);
                break;
            case 'minecraft:redstone_block':
                TrySetPermutation(analysis.block, 'STATE:texture', 8);
                break;
        }
        // 播放音效
        analysis.player?.playSound('fire.ignite');
    }
});
/*
 * 木质伪装
 */
components$d.set(componentPrefix$b + 'wood_camouflage', {
    onPlayerInteract(source) {
        /**
         * * 方块组件参数 的 解构
         */
        const analysis = InteractComponentTrigger(source);
        // 检测是否使用了正确道具
        if (analysis.item?.typeId == analysis.block.typeId)
            return;
        // 判断玩家和玩家背包是否存在
        if (!analysis.player || !analysis.container)
            return;
        /**
         ** 当前手持物品
         */
        const item = analysis.container?.getItem(analysis.player.selectedSlotIndex);
        if (!item)
            return;
        // 修改方块纹理
        switch (item?.typeId) {
            case 'minecraft:oak_planks':
                TrySetPermutation(analysis.block, 'STATE:texture', 1);
                break;
            case 'minecraft:spruce_planks':
                TrySetPermutation(analysis.block, 'STATE:texture', 2);
                break;
            case 'minecraft:birch_planks':
                TrySetPermutation(analysis.block, 'STATE:texture', 3);
                break;
            case 'minecraft:jungle_planks':
                TrySetPermutation(analysis.block, 'STATE:texture', 4);
                break;
            case 'minecraft:acacia_planks':
                TrySetPermutation(analysis.block, 'STATE:texture', 5);
                break;
            case 'minecraft:dark_oak_planks':
                TrySetPermutation(analysis.block, 'STATE:texture', 6);
                break;
            case 'minecraft:mangrove_planks':
                TrySetPermutation(analysis.block, 'STATE:texture', 7);
                break;
            case 'minecraft:cherry_planks':
                TrySetPermutation(analysis.block, 'STATE:texture', 8);
                break;
            case 'minecraft:bamboo_planks':
                TrySetPermutation(analysis.block, 'STATE:texture', 9);
                break;
            case 'minecraft:crimson_planks':
                TrySetPermutation(analysis.block, 'STATE:texture', 10);
                break;
            case 'minecraft:warped_planks':
                TrySetPermutation(analysis.block, 'STATE:texture', 11);
                break;
        }
        // 播放音效
        analysis.player?.playSound('fire.ignite');
    }
});
/*
 * 石质伪装
 */
components$d.set(componentPrefix$b + 'stone_camouflage', {
    onPlayerInteract(source) {
        /**
         * * 方块组件参数 的 解构
         */
        const analysis = InteractComponentTrigger(source);
        // 检测是否使用了正确道具
        if (analysis.item?.typeId == analysis.block.typeId)
            return;
        // 判断玩家和玩家背包是否存在
        if (!analysis.player || !analysis.container)
            return;
        /**
         ** 当前手持物品
         */
        const item = analysis.container?.getItem(analysis.player.selectedSlotIndex);
        if (!item)
            return;
        // 修改方块纹理
        switch (item?.typeId) {
            case 'minecraft:polished_basalt':
                TrySetPermutation(analysis.block, 'STATE:texture', 1);
                break;
            case 'minecraft:polished_granite':
                TrySetPermutation(analysis.block, 'STATE:texture', 2);
                break;
            case 'minecraft:polished_diorite':
                TrySetPermutation(analysis.block, 'STATE:texture', 3);
                break;
            case 'minecraft:polished_andesite':
                TrySetPermutation(analysis.block, 'STATE:texture', 4);
                break;
            case 'minecraft:polished_blackstone':
                TrySetPermutation(analysis.block, 'STATE:texture', 5);
                break;
            case 'minecraft:polished_deepslate':
                TrySetPermutation(analysis.block, 'STATE:texture', 6);
                break;
            case 'minecraft:polished_tuff':
                TrySetPermutation(analysis.block, 'STATE:texture', 7);
                break;
        }
        // 播放音效
        analysis.player?.playSound('fire.ignite');
    }
});
/*
 * 魔晶储罐
 */
components$d.set(componentPrefix$b + 'crystal_tank', {
    onPlayerInteract(source) {
        /**
         * * 方块组件参数 的 解构
         */
        const analysis = InteractComponentTrigger(source);
        // 检测是否使用了正确道具
        if (analysis.item?.typeId == analysis.block.typeId)
            return;
        /**
         ** 获取玩家
         */
        const player = analysis.player;
        /**
         ** 获取玩家背包
         */
        const container = player?.getComponent('minecraft:inventory')?.container;
        /**
         ** 缓存值
         */
        const caching = analysis.state.getState('STATE:caching');
        // 判断玩家是否满足触发条件
        if (!player || !container || !analysis.item?.getTags().includes('tags:energy_crystal.series'))
            return;
        // 判断物品是否属于 永恒魔晶石
        if (analysis.item?.getTags().includes('tags:eternal_crystal')) {
            /**
             ** 恒常-魔晶储罐
             */
            const constant = server.BlockPermutation.resolve('starry_map:constant_tank');
            // 播放音效与粒子效果
            TrySpawnParticle(analysis.dimension, 'constant:smoke_rune_white', analysis.block.above()?.bottomCenter());
            TrySpawnParticle(analysis.dimension, 'constant:smoke_rune_white', analysis.block.above()?.bottomCenter());
            analysis.player?.playSound('cauldron.explode');
            // 置换方块类型
            analysis.block.setPermutation(constant);
            // 清除物品
            DeleteItemStack(container, new server.ItemStack(analysis.item.typeId));
        }
        else if (caching != 8) {
            // 赋值 方块状态
            TrySetPermutation(analysis.block, 'STATE:caching', caching + 1);
            // 播放音效 与 粒子效果
            player.playSound('block.end_portal_frame.fill');
            // 清除物品
            DeleteItemStack(container, new server.ItemStack(analysis.item.typeId));
        }
        else if (caching == 8) {
            // 播放音效与粒子效果
            analysis.player?.playSound('mob.shulker.bullet.hit');
            TrySpawnParticle(analysis.dimension, 'constant:smoke_rune_white', analysis.block.above()?.bottomCenter());
            TrySpawnParticle(analysis.dimension, 'constant:smoke_rune_white', analysis.block.above()?.bottomCenter());
            // 显示提示
            analysis.player?.sendMessage('§c容器已满载, 无法继续填充');
            // 赋值 方块状态
            TrySetPermutation(analysis.block, 'STATE:output', 2);
        }
    }
});
/*
 * 熔岩质能
 */
components$d.set(componentPrefix$b + 'magma_power', {
    onPlayerInteract(source) {
        /**
         * * 方块组件参数 的 解构
         */
        const analysis = InteractComponentTrigger(source);
        // 检测是否使用了正确道具
        if (analysis.item?.typeId == analysis.block.typeId)
            return;
        // 判断玩家和玩家背包是否存在
        if (!analysis.player || !analysis.container)
            return;
        /**
         ** 当前手持物品
         */
        const item = analysis.item;
        // 检测物品
        if (!item || item?.typeId !== 'minecraft:lava_bucket')
            return;
        /**
         ** 获取方块状态
         */
        const magma = analysis.state.getState('STATE:magma');
        // 检测是否已满载
        if (magma == 15)
            return;
        // 修改方块纹理
        TrySetPermutation(analysis.block, 'STATE:magma', magma + 1);
        // 播放音效
        analysis.player?.playSound('bucket.fill_lava');
        // 清除物品
        analysis.container.setItem(analysis.player.selectedSlotIndex);
        // 生成空铁桶
        TrySpawnItem(analysis.dimension, new server.ItemStack('minecraft:bucket'), analysis.block.center());
    }
});
/*
 * 区块显示
 */
components$d.set(componentPrefix$b + 'region_display', {
    onPlayerInteract(source) {
        /**
         * * 方块组件参数 的 解构
         */
        const { block, item } = InteractComponentTrigger(source);
        // 检测是否使用了正确道具
        if (item?.typeId == block.typeId)
            return;
        /**
         * * 检测当前区块是否有能量
         */
        const testEnergy = AlterEnergy(block, 0, false);
        /**
         * * 设定 区块显示 的 粒子类型
         */
        const showType = testEnergy[0] == true ? 'constant:pulse_rune_green' : 'constant:pulse_rune_red';
        // 显示 区块边界
        DisplayChunkBoundary(block);
        //显示烟雾效果
        TrySpawnParticle(block.dimension, showType, Vector.add(block, Vector.CONSTANT_HALF));
    }
});
/*
 * 诸界道标
 */
components$d.set(componentPrefix$b + 'road_sign_presets', {
    onPlayerInteract(source) {
        /**
         * * 方块组件参数 的 解构
         */
        const { block, item } = InteractComponentTrigger(source);
        // 检测是否使用了正确道具
        if (item?.typeId == block.typeId)
            return;
        /**
         * * 诸界道标 数据信息
         */
        const RoadSign = new Map();
        /**
         * * 获取 玩家
         */
        const player = block.dimension.getPlayers({ location: block.location, maxDistance: 8, closest: 1 })[0];
        // 检测玩家是否使用过诸界道标
        if (!TriggerControl('诸界道标:使用冷却', player, 20))
            return;
        // 获取 所有 道标
        player.getDynamicPropertyIds().filter(id => id.startsWith('road_sign:')).forEach(id => CompileSign(player, id, RoadSign));
        /**
         * * 获取 道标名称
         */
        const name = Array.from(RoadSign.keys()).map(id => `§n§o§l§${Math.floor(Math.random() * 6)}` + id.split(':')[1]);
        /**
         * * 定义了 窗口界面 的 标题
         */
        const title = {
            text: "§9<§l 诸界道标 §r§9>"
        };
        /**
         * * 定义了 窗口界面 的 表单对象
         */
        const display = new serverUI.ActionFormData().title(title);
        name.forEach(info => display.button(info, "textures/物品贴图/魔法书籍/空间宝典"));
        if (name.length == 0)
            return player.onScreenDisplay.setTitle("§4暂无 §9道标信息§r");
        // 显示窗口界面
        display.show(player).then(option => {
            //检测玩家是否退出窗口
            if (option.canceled || option.selection == undefined)
                return;
            /**
             * * 获取 道标参数
             */
            const value = Array.from(RoadSign.values());
            //执行传送流程 并 播放音效
            player.teleport(value[option.selection].location, { dimension: value[option.selection].dimension });
            server.system.runTimeout(() => player.playSound("mob.endermen.portal"), 5);
        });
    }
});
/*
 * 附魔分离
 */
components$d.set(componentPrefix$b + 'enchantment_dissociation', {
    onPlayerInteract(source) {
        /**
         * * 方块组件参数 的 解构
         */
        const analysis = InteractComponentTrigger(source);
        // 检测是否使用了正确道具
        if (analysis.item?.typeId == analysis.block.typeId)
            return;
        /**
         ** 进行交互的玩家
         */
        const player = analysis.player;
        /**
         ** 机器下方的方块对象
         */
        const below = analysis.block.below();
        /**
         ** 机器下方的物品容器
         */
        const container = below?.getComponent('minecraft:inventory')?.container;
        /**
         ** 获取物品附魔
         */
        const enchantable = analysis.item?.getComponent('minecraft:enchantable');
        /**
         ** 获取全部附魔条目
         */
        const enchantments = enchantable?.getEnchantments();
        /**
         * * 尝试分离附魔书
         *
         * @param {server.Enchantment[]} enchantments - 获取物品附魔条目
         *
         * @param {server.Container} container - 机器下方的物品容器
         *
         * @param {server.Block} block - 机器下方的方块对象
         *
         * @param {server.ItemEnchantableComponent} enchantable - 获取物品附魔组件
         */
        function dissociation(enchantments, container, block, enchantable) {
            /**
             ** 获取附魔条目的数量
             */
            const number = enchantments.length;
            /**
             ** 定于需要消耗的书本
             */
            const blockItem = new server.ItemStack('minecraft:book', number);
            /**
             ** 粒子显示锚点
             */
            const anchor = Vector.add(block.center(), { x: 0, y: 2, z: 0 });
            // 检测物品是否足够
            if (!CheckItemStack(container, [blockItem]))
                return ErrorMessage('<§l§b 附魔分离 §r>§4 发生错误§r', block, { text: '未能在<§l§3 方块容器 §r>内获取到足够数量的<§l§u 书本 §r>' });
            // 判断能量是否足够
            if (!ExpendEnergy(analysis.block, -number * 1000))
                return;
            // 删除 普通书本
            DeleteItemStack(container, blockItem);
            // 添加 附魔书
            enchantments.forEach(enchantment => {
                /**
                 ** 附魔书的物品对象
                 */
                const item = new server.ItemStack('minecraft:enchanted_book');
                /**
                 * * 物品掉落位置
                 */
                const location = block.above(2)?.bottomCenter() ?? block.center();
                // 写入附魔效果
                item.getComponent('minecraft:enchantable')?.addEnchantment(enchantment);
                // 掉落 附魔书
                const book = TrySpawnItem(block.dimension, item, location);
                // 移动到指定位置
                if (book instanceof server.Entity)
                    book.teleport(location);
            });
            // 播放音效
            analysis.player?.playSound('block.enchanting_table.use');
            // 显示 粒子效果
            TrySpawnParticle(block.dimension, 'constant:erupt_rune_purple', anchor);
            TrySpawnParticle(block.dimension, 'constant:impact_rune_purple', anchor);
            TrySpawnParticle(block.dimension, 'constant:excite_rune_purple', anchor);
            // 清除 物品附魔
            enchantable?.removeAllEnchantments();
        }
        // 检测方块与物品容器是否有效
        if (!below || !container)
            return ErrorMessage('<§l§b 附魔分离 §r>§4 发生错误§r', analysis.block, { text: '未能在设备下方找到合适的<§l§3 方块容器 §r>' });
        // 检测玩家与附魔是否有效
        if (!player || !enchantable || !enchantments)
            return;
        // 检测 附魔条目数量
        if (enchantments.length == 0)
            return;
        // 尝试分离附魔书
        dissociation(enchantments, container, below, enchantable);
        // 置换 玩家 手持的物品
        analysis.container?.setItem(player.selectedSlotIndex, analysis.item);
    }
});
/*
 * 魔晶充能
 */
components$d.set(componentPrefix$b + 'star_energy_infusion', {
    onPlayerInteract(source) {
        /**
         * * 方块组件参数 的 解构
         */
        const analysis = InteractComponentTrigger(source);
        // 检测是否使用了正确道具
        if (analysis.item?.typeId == analysis.block.typeId)
            return;
        // 设定使用间隔
        if (!TriggerControl('消耗星尘力补充物品数值', analysis.block, 20))
            return;
        /**
         * * 恢复物品耐久
         */
        function RestoreDurabilit() {
            /**
             * * 获取物品耐久组件
             */
            const durability = analysis.item?.getComponent('minecraft:durability');
            // 检测能量是否足够
            if (!durability || durability.damage == 0 || !ExpendEnergy(analysis.block, -durability.damage * 5))
                return;
            // 恢复耐久
            durability.damage = 0;
            // 置换 玩家 手持的物品
            analysis.container?.setItem(analysis.player?.selectedSlotIndex ?? 0, analysis.item);
            // 显示 特效
            ChargingSpecialEffects();
        }
        /**
         * * 恢复列车能量
         */
        function RestoreVehiclePower() {
            /**
             ** 获取物品的能量属性
             */
            const power = analysis.item?.getDynamicProperty('energy:offline_vehicle_power') ?? 3500;
            // 检测能量是否足够
            if (!ExpendEnergy(analysis.block, -1e4) || power >= 1000000)
                return;
            // 恢复列车能量
            analysis.item?.setDynamicProperty('energy:offline_vehicle_power', power + 10000);
            analysis.item?.setLore([`<§9§o§l 剩余能量 §r>: ${power + 10000}`]);
            // 置换 玩家 手持的物品
            analysis.container?.setItem(analysis.player?.selectedSlotIndex ?? 0, analysis.item);
            // 显示 特效
            ChargingSpecialEffects();
        }
        /**
         * * 显示 特效
         */
        function ChargingSpecialEffects() {
            /**
             * * 定义 粒子参数
             */
            const molang = new server.MolangVariableMap();
            /**
             ** 粒子射流方向
             */
            const direction = Vector.difference(analysis.block.center(), analysis.player?.location ?? { x: 0, y: 0, z: 0 });
            // 设置 粒子参数
            molang.setFloat('variable.type', 0);
            molang.setVector3('variable.direction', direction);
            // 显示 粒子效果
            TrySpawnParticle(analysis.block.dimension, 'scripts:path_ray', analysis.block.center(), molang);
            TrySpawnParticle(analysis.block.dimension, 'constant:erupt_rune_purple', analysis.block.center());
            TrySpawnParticle(analysis.block.dimension, 'constant:excite_rune_purple', analysis.block.center());
            // 播放音效
            analysis.player?.playSound('block.enchanting_table.use');
        }
        // 检测物品是否包含对应标签
        if (analysis.item?.hasTag('tags:use_energy_to_restore_vehicle_power'))
            return RestoreVehiclePower();
        if (analysis.item?.hasTag('tags:use_energy_to_restore_durability'))
            return RestoreDurabilit();
    }
});
/*
 * 强化魔晶充能
 */
components$d.set(componentPrefix$b + 'super_star_energy_infusion', {
    onPlayerInteract(source) {
        /**
         * * 方块组件参数 的 解构
         */
        const analysis = InteractComponentTrigger(source);
        // 检测是否使用了正确道具
        if (analysis.item?.typeId == analysis.block.typeId)
            return;
        // 设定使用间隔
        if (!TriggerControl('消耗星尘力补充物品数值', analysis.block, 20))
            return;
        /**
         * * 恢复物品耐久
         */
        function RestoreDurabilit() {
            /**
             * * 获取物品耐久组件
             */
            const durability = analysis.item?.getComponent('minecraft:durability');
            // 检测能量是否足够
            if (!durability || durability.damage == 0 || !ExpendEnergy(analysis.block, -durability.damage * 5))
                return;
            // 恢复耐久
            durability.damage = 0;
            // 置换 玩家 手持的物品
            analysis.container?.setItem(analysis.player?.selectedSlotIndex ?? 0, analysis.item);
            // 为玩家附加状态效果增益
            analysis.player?.addEffect('minecraft:saturation', 100, { amplifier: 1, showParticles: false });
            analysis.player?.addEffect('minecraft:speed', 100, { amplifier: 1, showParticles: false });
            analysis.player?.addEffect('minecraft:haste', 100, { amplifier: 1, showParticles: false });
            // 显示 特效
            ChargingSpecialEffects();
        }
        /**
         * * 恢复列车能量
         */
        function RestoreVehiclePower() {
            /**
             ** 获取物品的能量属性
             */
            const power = analysis.item?.getDynamicProperty('energy:offline_vehicle_power') ?? 3500;
            // 检测能量是否足够
            if (!ExpendEnergy(analysis.block, -1e4) || power >= 1000000)
                return;
            // 恢复列车能量
            analysis.item?.setDynamicProperty('energy:offline_vehicle_power', power + 30000);
            analysis.item?.setLore([`<§9§o§l 剩余能量 §r>: ${power + 30000}`]);
            // 置换 玩家 手持的物品
            analysis.container?.setItem(analysis.player?.selectedSlotIndex ?? 0, analysis.item);
            // 显示 特效
            ChargingSpecialEffects();
        }
        /**
         * * 显示 特效
         */
        function ChargingSpecialEffects() {
            /**
             * * 定义 粒子参数
             */
            const molang = new server.MolangVariableMap();
            /**
             ** 粒子射流方向
             */
            const direction = Vector.difference(analysis.block.center(), analysis.player?.location ?? { x: 0, y: 0, z: 0 });
            // 设置 粒子参数
            molang.setFloat('variable.type', 0);
            molang.setVector3('variable.direction', direction);
            // 显示 粒子效果
            TrySpawnParticle(analysis.block.dimension, 'scripts:path_ray', analysis.block.center(), molang);
            TrySpawnParticle(analysis.block.dimension, 'constant:erupt_rune_purple', analysis.block.center());
            TrySpawnParticle(analysis.block.dimension, 'constant:excite_rune_purple', analysis.block.center());
            // 播放音效
            analysis.player?.playSound('block.enchanting_table.use');
        }
        // 检测物品是否包含对应标签
        if (analysis.item?.hasTag('tags:use_energy_to_restore_vehicle_power'))
            return RestoreVehiclePower();
        else
            return RestoreDurabilit();
    }
});
/*
 * 曜石熔炉
 */
components$d.set(componentPrefix$b + 'obsidian_furnace', {
    onPlayerInteract(source) {
        /**
         * * 方块组件参数 的 解构
         */
        const analysis = InteractComponentTrigger(source);
        // 检测是否使用了正确道具
        if (analysis.item?.typeId == analysis.block.typeId)
            return;
        if (!analysis.player || !analysis.container)
            return;
        /**
         ** 当前手持物品
         */
        const item = analysis.container.getItem(analysis.player.selectedSlotIndex);
        // 检测物品
        if (!item)
            return;
        if (item.typeId === 'starry_map:compressed_stone') {
            /**
             ** 获取方块状态
             */
            const material = analysis.state.getState('STATE:material');
            if (material != 8) {
                // 赋值方块状态
                TrySetPermutation(analysis.block, 'STATE:material', material + 1);
                // 清除物品
                DeleteItemStack(analysis.container, new server.ItemStack(item.typeId));
            }
            else
                analysis.player.onScreenDisplay.setTitle('§d剩余空间不足, 无法填充');
            // 播放音效
            analysis.player?.playSound('use.stone');
        }
        if (item.typeId === 'minecraft:bucket') {
            /**
             ** 获取方块状态
             */
            const magma = analysis.state.getState('STATE:magma');
            /**
             ** 物品生成锚点
             */
            const anchor = Vector.toString(analysis.block.above()?.bottomCenter(), { delimiter: ' ' });
            // 检测方块状态
            if (magma == 0)
                analysis.player.onScreenDisplay.setTitle('§d储备不足, 无法提取');
            else {
                analysis.dimension.runCommand(`loot spawn ${anchor} loot "iron_bucket/lava"`);
                // 修改方块状态
                TrySetPermutation(analysis.block, 'STATE:magma', magma - 1);
                // 播放音效
                analysis.player?.playSound('bucket.empty_lava');
                // 清除物品
                DeleteItemStack(analysis.container, new server.ItemStack(item.typeId));
            }
        }
    }
});
/*
 * 曜石储罐
 */
components$d.set(componentPrefix$b + 'obsidian_storage_tank', {
    onPlayerInteract(source) {
        /**
         * * 方块组件参数 的 解构
         */
        const analysis = InteractComponentTrigger(source);
        // 检测是否使用了正确道具
        if (analysis.item?.typeId == analysis.block.typeId)
            return;
        if (!analysis.player || !analysis.container)
            return;
        /**
         ** 当前手持物品
         */
        const item = analysis.container.getItem(analysis.player.selectedSlotIndex);
        // 检测物品
        if (!item)
            return;
        if (item.typeId === 'minecraft:bucket') {
            /**
             ** 获取方块状态
             */
            const magma = analysis.state.getState('STATE:magma');
            /**
             ** 物品生成锚点
             */
            const anchor = Vector.toString(analysis.block.above()?.bottomCenter(), { delimiter: ' ' });
            // 检测方块状态
            if (magma == 0)
                analysis.player.onScreenDisplay.setTitle('§d熔岩不足, 无法提取');
            else {
                analysis.dimension.runCommand(`loot spawn ${anchor} loot "iron_bucket/lava"`);
                // 修改方块状态
                TrySetPermutation(analysis.block, 'STATE:magma', magma - 1);
                // 播放音效
                analysis.player?.playSound('bucket.empty_lava');
                // 清除物品
                DeleteItemStack(analysis.container, new server.ItemStack(item.typeId));
            }
        }
        if (item.typeId === 'minecraft:lava_bucket') {
            /**
             ** 获取方块状态
             */
            const magma = analysis.state.getState('STATE:magma');
            /**
             ** 物品生成锚点
             */
            const anchor = Vector.toString(analysis.block.above()?.bottomCenter(), { delimiter: ' ' });
            // 检测方块状态
            if (magma == 15)
                analysis.player.onScreenDisplay.setTitle('§d容量不足, 无法填充');
            else {
                analysis.dimension.runCommand(`loot spawn ${anchor} loot "iron_bucket/empty"`);
                // 修改方块状态
                TrySetPermutation(analysis.block, 'STATE:magma', magma + 1);
                // 播放音效
                analysis.player?.playSound('bucket.fill_lava');
                // 清除物品
                DeleteItemStack(analysis.container, new server.ItemStack(item.typeId));
            }
        }
    }
});
/*
 * 容器枢纽
 */
components$d.set(componentPrefix$b + 'container_hub', {
    async onPlayerInteract(source) {
        // 解构参数并验证基础条件
        const { player, block, item, container } = InteractComponentTrigger(source);
        // 判断是否完成了事件触发器的冷却
        if (!TriggerControl('容器枢纽_玩家点击', block, 10))
            return;
        // 判断事件返回的对象是否完整可用
        if (!player || !item || !container)
            return;
        // 判断是否成功获取到能量
        if (!ExpendEnergy(block, -10))
            return;
        /**
         * 获取容器查询结果
         */
        let searchResults = SearchContainers(block, item, 8);
        // 如果没有找到容器, 放宽条件重新搜索
        if (searchResults.length === 0)
            searchResults = SearchContainers(block);
        // 统一处理搜索结果
        if (searchResults.length === 0) {
            player.sendMessage('§c未能找到存放<§9 当前物品 §c>的<§v 可用容器 §c>');
            player.playSound('respawn_anchor.deplete');
        }
        else {
            injectContainers(block, item, container, player.selectedSlotIndex, searchResults);
            player.playSound('respawn_anchor.charge');
        }
    }
});
/**
 * 将物品注入目标容器中。
 *
 * @param {server.Block} block - 操作的方块对象。
 *
 * @param {server.ItemStack} item - 要存放的物品。
 *
 * @param {server.Container} container - 玩家背包或其他来源容器。
 *
 * @param {number} slot - 玩家背包中选中的槽位索引。
 *
 * @param {ReturnType<typeof SearchContainers>} params - 搜索得到的目标容器和方块结果数组。
 */
function injectContainers(block, item, container, slot, params) {
    /**
     * * 获取目标容器和目标方块
     */
    const [targetContainer, targetBlock] = params[0];
    // 将物品添加到方块容器中
    targetContainer.addItem(item);
    // 从玩家背包中移除物品
    container?.setItem(slot);
    // 设置一个自由指针, 指向方块位置
    SetFreePointer({ location: block.bottomCenter(), dimension: block.dimension }, targetBlock.bottomCenter(), 1);
}
/*
 * 遗落档案
 */
components$d.set(componentPrefix$b + 'document_display', {
    onPlayerInteract(source, data) {
        /**
         * 解构交互事件对象, 获取玩家、物品、方块和维度信息
         */
        const { player, item, block, dimension } = InteractComponentTrigger(source);
        // 如果玩家使用的物品与方块类型相同, 则不执行任何操作
        if (item?.typeId === block.typeId)
            return;
        // 检查玩家是否在 60tick 的间隔内触发过此事件, 如果是则不执行操作
        if (!player || !TriggerControl('查询与显示档案馆遗失的数据终端', player, 20))
            return;
        /**
         * 从方块状态中获取关联的档案内容字符串
         */
        const archives = data.params.archives || '开发者名单';
        /**
         * 创建一个新的 Molang 变量映射, 用于设置粒子效果参数
         */
        const molang = new server.MolangVariableMap();
        // 设置粒子大小为 4
        molang.setFloat('variable.size', 4);
        // 设置粒子方向为 3
        molang.setFloat('variable.direction', 3);
        /**
         * 获取方块上方中心点的坐标, 如果上方没有方块则使用当前方块中心点
         */
        const anchor = block.above()?.bottomCenter() || block.bottomCenter();
        // 对玩家播放一个音效, 表示交互已发生
        player.playSound('conduit.activate');
        // 尝试在指定维度和坐标处生成圆环粒子效果
        TrySpawnParticle(dimension, 'scripts:path_round', block.bottomCenter(), molang);
        // 尝试在指定维度和坐标处生成钻石粒子效果
        TrySpawnParticle(dimension, 'scripts:path_star4_small', block.center(), molang);
        // 尝试在指定维度和坐标处生成蝴蝶粒子效果
        TrySpawnParticle(dimension, 'scripts:path_butterfly', anchor, molang);
        // 创建一个新的ActionFormData实例, 用于显示档案内容的界面
        new serverUI
            .ActionFormData()
            // 设置界面的标题为方块翻译后的名称
            .title(translate(block))
            // 设置界面的正文为档案内容的Lexicon界面
            .body(lexiconInterface(player, archives, true))
            // 添加一个关闭按钮, 使用红色加粗文本样式
            .button('§4§l关闭§r')
            // 显示界面给玩家
            .show(player);
    }
});
/**
 * * 离线档案
 */
components$d.set(componentPrefix$b + 'document_display_expire', {
    /**
     * 当玩家与档案馆遗失数据终端发生交互时触发
     *
     * @param {server.BlockComponentPlayerInteractEvent} source - 交互事件对象
     */
    onPlayerInteract(source) {
        /**
         * 解构交互事件对象, 获取玩家、物品、方块和维度信息
         *
         * @param {INTERACT_COMPONENT} InteractComponentTrigger - 提供交互事件数据的函数
         *
         * @returns {{player: Player, item: Item | null, block: Block, dimension: Dimension}}
         */
        const { player, item, block, dimension } = InteractComponentTrigger(source);
        /**
         * 如果玩家使用的物品与方块类型相同则取消操作
         *
         * @returns {void}
         */
        if (item?.typeId === block.typeId)
            return;
        /**
         * 检查是否在60tick内触发过此事件
         *
         * 该检查用于防止快速点击或连续触发重复操作
         *
         * @param {number} 间隔 - 60tick的间隔
         *
         * @returns {boolean}
         */
        if (!player || !TriggerControl('查询与显示档案馆遗失的数据终端', player, 60))
            return;
        /**
         * 创建用于设置粒子效果参数的 Molang 变量映射
         *
         * @param {server.MolangVariableMap} molang - Molang变量映射对象
         */
        const molang = new server.MolangVariableMap();
        /**
         * 获取当前方块上方中心点的坐标, 若上方没有方块则使用自身中心点
         *
         * @param {Block} block - 方块对象
         *
         * @returns {Coordinates} 坐标点
         */
        const anchor = block.above()?.bottomCenter() || block.bottomCenter();
        /**
         * 定义成功交互后的回调函数
         */
        const isSuccess = () => {
            player.playSound('respawn_anchor.charge');
            molang.setFloat('variable.size', 4);
            molang.setFloat('variable.direction', 3);
            /**
             * 在指定维度和坐标生成不同类型的粒子效果
             *
             * @param {Dimension} dimension - 维度对象
             *
             * @param {string} particleScript - 粒子效果脚本名
             *
             * @param {Coordinates} position - 粒子生成位置
             */
            TrySpawnParticle(dimension, 'scripts:path_round', block.bottomCenter(), molang);
            TrySpawnParticle(dimension, 'scripts:path_star4_small', block.center(), molang);
            TrySpawnParticle(dimension, 'scripts:path_butterfly', anchor, molang);
        };
        /**
         * 根据随机数选择不同的档案馆类型进行处理
         */
        switch (RandomFloor(0, 9)) {
            case 1:
                dimension.setBlockPermutation(block, server.BlockPermutation.resolve('starry_map:document.abyss_whale_emperor'));
                player.onScreenDisplay.setActionBar([
                    { text: '§9§l联网校验成功, 已成功加载: §u' },
                    translate('starry_map:document.abyss_whale_emperor', 'block')
                ]);
                isSuccess();
                break;
            case 2:
                dimension.setBlockPermutation(block, server.BlockPermutation.resolve('starry_map:document.tyrannosaurus_rex'));
                player.onScreenDisplay.setActionBar([
                    { text: '§9§l联网校验成功, 已成功加载: §u' },
                    translate('starry_map:document.tyrannosaurus_rex', 'block')
                ]);
                isSuccess();
                break;
            case 3:
                dimension.setBlockPermutation(block, server.BlockPermutation.resolve('starry_map:document.wild_wasp_emperor'));
                player.onScreenDisplay.setActionBar([
                    { text: '§9§l联网校验成功, 已成功加载: §u' },
                    translate('starry_map:document.wild_wasp_emperor', 'block')
                ]);
                isSuccess();
                break;
            case 4:
                dimension.setBlockPermutation(block, server.BlockPermutation.resolve('starry_map:document.wild_wasp_guide'));
                player.onScreenDisplay.setActionBar([
                    { text: '§9§l联网校验成功, 已成功加载: §u' },
                    translate('starry_map:document.wild_wasp_guide', 'block')
                ]);
                isSuccess();
                break;
            case 4:
                dimension.setBlockPermutation(block, server.BlockPermutation.resolve('starry_map:document.amber_jasmine'));
                player.onScreenDisplay.setActionBar([
                    { text: '§9§l联网校验成功, 已成功加载: §u' },
                    translate('starry_map:document.amber_jasmine', 'block')
                ]);
                isSuccess();
                break;
            default:
                // 先生成特效粒子效果
                TrySpawnParticle(dimension, 'constant:erupt_rune_orange', block.center());
                TrySpawnParticle(dimension, 'constant:smoke_rune_green', block.center());
                TrySpawnParticle(dimension, 'constant:smoke_rune_blue', block.center());
                TrySpawnParticle(dimension, 'constant:smoke_rune_red', block.center());
                // 更新玩家提示信息和播放音效
                player.onScreenDisplay.setTitle({ text: '§c§l联网校验失败, 模块已损毁...§r' });
                player.playSound('respawn_anchor.deplete');
                player.playSound('item.trident.thunder');
                // 根据条件生成不同的实体
                server.system.run(() => {
                    if (block.isLiquid) {
                        TrySpawnEntity(dimension, 'starry_map:abyss_whale.detection.point', block.center());
                    }
                    else {
                        TrySpawnEntity(dimension, 'starry_map:viper.support', block.center());
                    }
                });
                // 设置方块为空气
                dimension.setBlockPermutation(block, server.BlockPermutation.resolve('minecraft:air'));
        }
    }
});
/*
 * 扩散填充
 */
components$d.set(componentPrefix$b + 'diffusion_filling', {
    onPlayerInteract(source, data) {
        //todo 事件预处理
        /**
         * 解构交互事件对象, 获取关键参数：
         *
         * - player: 触发事件的玩家对象
         *
         * - item: 玩家手持物品信息
         *
         * - block: 被交互的目标方块
         *
         * - dimension: 方块所在的维度对象
         */
        const { player, item, block, dimension } = InteractComponentTrigger(source);
        /*
         * 阻止使用相同类型物品的交互（避免干扰正常使用）
         */
        if (item?.typeId === block.typeId)
            return;
        /*
         * 交互频率控制（60 tick = 3秒冷却, 防止滥用）
         */
        if (!player || !TriggerControl('使用 扩散填充 进行方块置换', player, 10))
            return;
        //todo 参数初始化
        /**
         * 方向映射表, 用于根据方块状态获取扩散方向的配置。
         */
        const directionMap = new Map([
            ['all', Vector.CONSTANT_ALL],
            ['horizontal', Vector.CONSTANT_HORIZONTAL],
            ['vertical', Vector.CONSTANT_VERTICAL]
        ]);
        /**
         * 参数对象, 包含扩散的最大数量、扩散方向、原型方块、目标方块和消耗的方块。
         */
        let { max_number: maxNumber, directions, proto_blocks, target_block: targetBlockId, expense } = data.params;
        // TODO 参数校验
        if (!maxNumber || !directions || !proto_blocks || !targetBlockId || !expense)
            return;
        /**
         * 获取扩散方向的配置。
         *
         * @returns {opal.Vector[]} 扩散方向的向量数组。
         */
        const directionVector = directionMap.get(directions) || Vector.CONSTANT_DOWN_HORIZONTAL;
        /**
         * 允许被替换的原始方块类型集合（用 | 分隔）
         *
         * @type {Set<string>}
         */
        const protoBlockIds = new Set(proto_blocks);
        //todo 置换系统初始化
        try {
            /**
             * 广度优先搜索队列：
             *
             * - 使用队列结构实现扩散效果
             *
             * - 初始包含被点击的方块
             *
             * @type {server.Block[]}
             */
            const blocksToMine = [block];
            /**
             * 已替换方块计数器
             *
             * @type {number}
             */
            let minedCount = 0;
            /**
             * 循环运行标志位
             *
             * @type {boolean}
             */
            let keepRun = true;
            /**
             * 每 tick 处理次数（分摊计算压力）
             *
             * @type {number}
             */
            const magnification = 100;
            /**
             * 存储每 tick 的 ID
             */
            const tickIds = [];
            /*
             * 如果目标方块为 'items_in_hand', 则使用玩家手持物品的 ID 进行替换
             */
            if (targetBlockId == 'items_in_hand') {
                /**
                 * 物品ID映射表, 用于根据物品 ID 获取对应的方块 ID
                 */
                const itemMap = new Map([
                    ['minecraft:powder_snow_bucket', 'minecraft:powder_snow'],
                    ['minecraft:water_bucket', 'minecraft:water'],
                    ['minecraft:lava_bucket', 'minecraft:lava']
                ]);
                /**
                 * 玩家手持物品的 ID
                 *
                 * @type {string}
                 */
                const itemId = itemMap.get(item?.typeId ?? '') || item?.typeId || 'minecraft:air';
                /**
                 * 允许玩家自定义的物品的白名单
                 *
                 * @type {Set<string>}
                 */
                const ItemWhitelist = new Set([
                    "minecraft:grass_block",
                    "minecraft:netherrack",
                    "minecraft:end_stone",
                    "minecraft:deepslate",
                    "minecraft:red_sand",
                    "minecraft:stone",
                    "minecraft:water",
                    "minecraft:sand",
                    "minecraft:dirt"
                ]);
                /*
                 * 如果玩家拥有权限, 则使用物品 ID 进行替换, 否则使用白名单进行判断
                 */
                if (isPlayerAuthorized(player) && itemId !== 'minecraft:air')
                    targetBlockId = itemId;
                /*
                 * 如果玩家没有权限, 则使用白名单进行判断
                 */
                else if (ItemWhitelist.has(itemId))
                    targetBlockId = itemId;
                /*
                 * 如果玩家没有手持物品, 则终止事件处理函数
                 */
                else
                    return player.onScreenDisplay.setActionBar({ text: '§c§l很抱歉, 您目前不能使用这个方块进行替换§r' });
            }
            ;
            /**
             * * 构建 目标方块 属性对象
             */
            const construct = server.BlockPermutation.resolve(targetBlockId);
            //todo 终止事件处理函数
            /**
             * 终止事件处理函数：
             *
             * 1. 清除定时器
             *
             * 2. 播放提示音效
             *
             * 3. 记录运行日志
             *
             * 4.支付代价
             */
            const stopEvent = () => {
                // 设置终止标志
                keepRun = false;
                // 清除定时器
                tickIds.forEach(id => server.system.clearRun(id));
                // 播放提示音效
                player.playSound('chime.amethyst_block');
                // 支付消耗
                if (expense !== "create" && typeof expense == 'number')
                    ExpendEnergy(block, minedCount * -(expense || 100));
                // 记录运行日志
                //console.log(`[扩散填充] 操作终止 | 已替换 ${minedCount}/${maxNumber} 个方块 | 队列剩余 ${blocksToMine.length} | 扩散填充费用: ${expense}`);
            };
            //todo 异步处理任务
            /**
             * 定时任务核心逻辑（每tick执行）：
             *
             * 1. 使用 magnification 控制每 tick 处理量
             *
             * 2. 采用广度优先算法遍历相邻方块
             *
             * 3. 执行方块替换并更新队列
             */
            const execute = () => {
                // 循环处理任务
                for (let index = 0; index < magnification && keepRun; index++) {
                    /*
                     * 终止条件检测（队列空、达到上限、手动终止）
                     */
                    if (blocksToMine.length === 0 || minedCount >= maxNumber || !keepRun)
                        return stopEvent();
                    /**
                     * 从队列头部取出当前处理方块
                     *
                     * @type {server.Block | undefined}
                     */
                    const currentBlock = blocksToMine.shift();
                    /*
                     * 判断 方块是否存在 否则 终止事件运行
                     */
                    if (!currentBlock)
                        return stopEvent();
                    // 尝试执行方块替换
                    try {
                        execute(currentBlock);
                    }
                    catch (error) {
                        /**
                         * 获取 错误信息
                         */
                        const info = error instanceof Error ? error : new Error(String(error));
                        ErrorMessage('< 扩散填充 >在执行时发生错误', block, { text: info.message });
                        stopEvent();
                    }
                }
                ;
                /**
                 * 处理当前方块的相邻方块替换逻辑，实现扩散填充功能
                 *
                 * @param {server.Block} currentBlock - 当前方块对象，用于计算相邻方块的位置
                 */
                function execute(currentBlock) {
                    /*
                     * 遍历所有指定方向的相邻方块
                     */
                    for (const direction of directionVector) {
                        /**
                         * 获取相邻方块
                         *
                         * @type {server.Block | undefined}
                         */
                        const adjacentBlock = currentBlock.offset(direction);
                        /*
                         * 有效性验证（存在性 + 类型匹配）
                         */
                        if (!adjacentBlock || adjacentBlock.typeId === targetBlockId || !TemplateMatcher(protoBlockIds, adjacentBlock.typeId))
                            continue;
                        /*
                         * 异步执行方块替换（确保主线程不阻塞）
                         */
                        tickIds.push(server.system.run(() => adjacentBlock.setPermutation(construct)));
                        /**
                         * 更新队列和计数器
                         */
                        blocksToMine.push(adjacentBlock);
                        minedCount++;
                    }
                }
            };
            // 创建定时器
            tickIds.push(server.system.runInterval(execute));
            /*
             * 立即替换被点击的初始方块
             */
            dimension.setBlockPermutation(block, construct);
        }
        catch (error) {
            /**
             * 获取 错误信息
             */
            const info = error instanceof Error ? error : new Error(String(error));
            // 记录错误信息
            ErrorMessage('< 扩散填充 >在构建时发生错误', block, { text: info.message });
        }
    }
});
/*
 * 状态值增加组件
 */
components$d.set(componentPrefix$b + 'state_value_increase', {
    onPlayerInteract(source, data) {
        /**
         * 解构交互事件对象, 获取关键参数：
         *
         * - player: 触发事件的玩家对象
         *
         * - item: 玩家手持物品信息
         *
         * - block: 被交互的目标方块
         *
         * - dimension: 方块所在的维度对象
         */
        const { player, item, block, state } = InteractComponentTrigger(source);
        /**
         * 检查玩家的交互是否符合预期条件:
         *
         * - item 类型是否与目标方块类型一致
         *
         * - 物品是否携带默认标签（确保物品属于该组件的有效范围）
         */
        if (item?.typeId !== block.typeId && !item?.hasTag(defaultTag$1))
            return;
        /**
         * 获取需要修改的属性名
         */
        const type = data.params.revise;
        /**
         * 获取 可能存在的提示信息
         */
        const message = data.params.message;
        // 确认参数是否完整
        if (!type || !message)
            return;
        /**
         * 获取需要修改的属性的当前值
         */
        const value = state.getState(type);
        /**
         * 获取属性值修改结果
         */
        const result = TrySetPermutation(block, type, value + 1);
        // 如果修改失败, 则重置属性值
        if (result instanceof Error)
            TrySetPermutation(block, type, 0);
        // 显示提示信息
        if (message.length !== 0)
            player?.onScreenDisplay.setActionBar(message[value]);
        // 播放点击音效
        player?.playSound('place.amethyst_cluster');
    }
});
/*
 * 源能枢纽
 */
components$d.set(componentPrefix$b + 'source_energy_hub', {
    onPlayerInteract(source) {
        /**
         * 解构交互事件对象, 获取关键参数：
         *
         * - player: 触发事件的玩家对象
         *
         * - item: 玩家手持物品信息
         *
         * - block: 被交互的目标方块
         *
         * - dimension: 方块所在的维度对象
         */
        const { player, item, block, dimension } = InteractComponentTrigger(source);
        /**
         * 如果玩家使用的物品与方块类型相同则取消操作
         *
         * @returns {void}
         */
        if (item?.typeId === block.typeId)
            return;
        /**
         * 检查是否在60tick内触发过此事件
         *
         * 该检查用于防止快速点击或连续触发重复操作
         *
         * @param {number} 间隔 - 60tick的间隔
         *
         * @returns {boolean}
         */
        if (!player || !TriggerControl('访问-源能枢纽', player, 60))
            return;
        /**
         * 星尘能名词
         */
        const name = '§a§l[§9§l 星尘力缓存 §r§a§l]§r';
        /**
         * 交互时变动的能量
         */
        const value = 100000;
        /**
         * 星尘能命名空间标识符
         */
        const typeid = 'stardust_energy_cache:';
        /**
         * 创建用于设置粒子效果参数的 Molang 变量映射
         *
         * @param {server.MolangVariableMap} molang - Molang变量映射对象
         */
        const molang = new server.MolangVariableMap();
        /**
         * 获取当前方块上方中心点的坐标, 若上方没有方块则使用自身中心点
         *
         * @param {Block} block - 方块对象
         *
         * @returns {Coordinates} 坐标点
         */
        const anchor = block.above()?.bottomCenter() || block.bottomCenter();
        /**
         * 获取全部动态属性的 ID 列表, 并过滤出以 "stardust_energy_cache:" 开头的属性
         */
        const getIds = server.world.getDynamicPropertyIds().filter(id => id.startsWith(typeid));
        /**
         * * 定义了 窗口界面 的 表单对象
         */
        const display = new serverUI.ActionFormData().button(`<§v§l 创建 §r>${name}`, 'textures/项目图标/提升');
        // 设置粒子大小为 4
        molang.setFloat('variable.size', 4);
        // 设置粒子方向为 3
        molang.setFloat('variable.direction', 3);
        // 尝试在指定维度和坐标处生成圆环粒子效果
        TrySpawnParticle(dimension, 'scripts:path_round', block.bottomCenter(), molang);
        // 尝试在指定维度和坐标处生成钻石粒子效果
        TrySpawnParticle(dimension, 'scripts:path_star4_small', block.center(), molang);
        // 尝试在指定维度和坐标处生成蝴蝶粒子效果
        TrySpawnParticle(dimension, 'scripts:path_butterfly', anchor, molang);
        // 对玩家播放一个音效, 表示交互已发生
        player.playSound('conduit.activate');
        // 将方块的 "is_storage" 属性设置为 false
        TrySetPermutation(block, 'STATE:is_storage', false);
        // 遍历获取的动态属性 ID 列表, 并为每个 ID 创建一个按钮
        getIds.forEach(id => display.button(`<§m§l 提取 §r>${name}: ` + id.replace(typeid, '')));
        // 显示窗口界面
        display.show(player).then(option => {
            // 如果玩家取消了窗口界面, 则不执行后续代码
            if (option.canceled || option.selection == undefined)
                return;
            /**
             * 获取选中的按钮的索引
             */
            const index = option.selection - 1;
            // 如果选中的按钮的索引大于等于 0, 则执行以下代码
            if (index === -1) {
                /**
                 * 获取当前区块范围中指定 ID 的动态属性的能量值
                 */
                const energy = QueryEnergy(block);
                // 如果能量值小于等于 100000, 则发送一条错误消息并返回
                if (energy <= value)
                    return player.sendMessage('当前区块中星尘能量不足, 请继续收集星尘能量!');
                // 尝试从指定 ID 的动态属性中消耗 100000 点能量
                AlterEnergy(block, -1e5, false);
                // 设置新的动态属性值
                server.world.setDynamicProperty(typeid + RandomFloor(10000, 99999), value);
                // 发送一条消息通知玩家
                player.sendMessage(`已消耗当前区块 ${value} 点能量, 并已存入${name}中, 当前区块剩余能量: ` + (energy - value) + ' 点');
            }
            else if (getIds.length > 0) {
                // 清除被选中的动态属性
                server.world.setDynamicProperty(getIds[index]);
                // 尝试向指定 ID 的动态属性中添加 100000 点能量
                AlterEnergy(block, value, true);
                // 发送一条消息通知玩家
                player.sendMessage(`已从${name}中取出 ${value} 点能量, 当前区块剩余能量: ` + QueryEnergy(block) + ' 点');
            }
        });
    }
});

/*
 * 系统组件
 */
/**
 * * 进行检测的默认标签
 */
const defaultTag = 'tags:magic_tool.series';
/**
 * * 组件前缀代词
 */
const componentPrefix$a = 'opal:destroy.';
/**
 * * 方块自定义组件列表
 */
const components$c = new Map();
/**
 * * 方块破坏组件触发器
 *
 * @param source - 方块组件参数
 */
function DestroyComponentTrigger(source) {
    /**
     ** 方块状态
     */
    const state = source.brokenBlockPermutation;
    /**
     ** 方块维度
     */
    const dimension = source.dimension;
    /**
     ** 玩家对象
     */
    const player = source.player;
    /**
     ** 方块对象
     */
    const block = source.block;
    /**
     ** 物品对象
     */
    const item = player?.getComponent('minecraft:inventory')?.container?.getItem(player.selectedSlotIndex);
    // 返回 方块破坏组件 的 参数解构
    return { state, dimension, player, block, item };
}
/*
 * 魔晶储罐 - 方块破坏
 */
components$c.set(componentPrefix$a + 'crystal_tank', {
    onPlayerBreak(source) {
        /**
         * * 方块破坏组件参数解构
         */
        const analysis = DestroyComponentTrigger(source);
        // 检测是否使用了正确道具
        if (!analysis.item?.hasTag(defaultTag))
            return;
        /**
         ** 物品生成锚点
         */
        const anchor = Vector.toString(analysis.block.above()?.bottomCenter(), { delimiter: ' ' });
        // 随机生成魔晶石
        analysis.dimension.runCommand(`loot spawn ${anchor} loot "energy_crystal/random"`);
        // 播放音效 与 粒子效果
        analysis.player?.playSound('cauldron.explode');
        // 魔晶储罐被破坏时的粒子效果
        switch (RandomFloor(0, 4)) {
            case 0:
                TrySpawnParticle(analysis.dimension, 'constant:fireworks_fireball_rune_red', analysis.block.above()?.bottomCenter());
                TrySpawnParticle(analysis.dimension, 'constant:fireworks_paper_rune_red', analysis.block.above()?.bottomCenter());
                break;
            case 1:
                TrySpawnParticle(analysis.dimension, 'constant:fireworks_fireball_rune_blue', analysis.block.above()?.bottomCenter());
                TrySpawnParticle(analysis.dimension, 'constant:fireworks_paper_rune_blue', analysis.block.above()?.bottomCenter());
                break;
            case 2:
                TrySpawnParticle(analysis.dimension, 'constant:fireworks_fireball_rune_green', analysis.block.above()?.bottomCenter());
                TrySpawnParticle(analysis.dimension, 'constant:fireworks_paper_rune_green', analysis.block.above()?.bottomCenter());
                break;
            case 3:
                TrySpawnParticle(analysis.dimension, 'constant:fireworks_fireball_rune_orange', analysis.block.above()?.bottomCenter());
                TrySpawnParticle(analysis.dimension, 'constant:fireworks_paper_rune_orange', analysis.block.above()?.bottomCenter());
                break;
            case 4:
                TrySpawnParticle(analysis.dimension, 'constant:fireworks_fireball_rune_purple', analysis.block.above()?.bottomCenter());
                TrySpawnParticle(analysis.dimension, 'constant:fireworks_paper_rune_purple', analysis.block.above()?.bottomCenter());
                break;
        }
    }
});

/*
 * 原版接口
 */
/**
 * * < 方块 > 更新后 事件
 */
function BlockUpdateAfterEvent(block) {
    /**
     * * 执行 方块更新事件 的 方块列表
     */
    const blocks = [];
    // 获取 进行更新的方块
    for (let axleX = -1; axleX <= 1; axleX++)
        for (let axleY = -1; axleY <= 1; axleY++)
            for (let axleZ = -1; axleZ <= 1; axleZ++) {
                /**
                 * * 目标方块
                 */
                const target = block.offset({ x: axleX, y: axleY, z: axleZ });
                if (target)
                    blocks.push(target);
            }
    // 遍历 方块列表
    blocks.forEach(block => {
        switch (block.typeId) {
            case 'starry_map:enable_control':
                enableControl(block);
                break;
            case 'starry_map:basic_pipeline':
                basicPipeline(block);
                break;
            case 'starry_map:pulse_latch':
                pulseLatch(block);
                break;
            case 'starry_map:magic_portal_above':
                portalGate(block);
                break;
            case 'starry_map:magic_portal_below':
                portalGate(block);
                break;
            case 'starry_map:jungle_wood_chair':
                jungleWoodChair(block);
                break;
            case 'starry_map:diorite_table':
                dioriteTable(block);
                break;
        }
        if (block.hasTag('tags:machine_gate.horizontal_gate'))
            horizontalGate(block);
        if (block.hasTag('tags:machine_gate.vertical_gate'))
            verticalGate(block);
    });
}
/**
 * * 魔导总线 - 基础总线
 */
function basicPipeline(object) {
    // 检测 方向x
    const direction_positive_x = object.east()?.hasTag('tags:magic_cable.port_negative.X') ?? false;
    const direction_negative_x = object.west()?.hasTag('tags:magic_cable.port_positive.X') ?? false;
    // 检测 方向y
    const direction_positive_y = object.above()?.hasTag('tags:magic_cable.port_negative.Y') ?? false;
    const direction_negative_y = object.below()?.hasTag('tags:magic_cable.port_positive.Y') ?? false;
    // 检测 方向z
    const direction_positive_z = object.south()?.hasTag('tags:magic_cable.port_negative.Z') ?? false;
    const direction_negative_z = object.north()?.hasTag('tags:magic_cable.port_positive.Z') ?? false;
    // 赋值 方向X
    TrySetPermutation(object, 'STATE:direction_positive.X', direction_positive_x);
    TrySetPermutation(object, 'STATE:direction_negative.X', direction_negative_x);
    // 赋值 方向Y
    TrySetPermutation(object, 'STATE:direction_positive.Y', direction_positive_y);
    TrySetPermutation(object, 'STATE:direction_negative.Y', direction_negative_y);
    // 赋值 方向Z
    TrySetPermutation(object, 'STATE:direction_positive.Z', direction_positive_z);
    TrySetPermutation(object, 'STATE:direction_negative.Z', direction_negative_z);
}
/**
 * * 魔导总线 - 脉冲锁存
 */
function pulseLatch(object) {
    // 检测 方向x
    const direction_positive_x = object.east()?.hasTag('tags:magic_cable.logic_negative.X') ? true : object.east()?.hasTag('tags:magic_cable.port_negative.X');
    const direction_negative_x = object.west()?.hasTag('tags:magic_cable.logic_positive.X') ? true : object.west()?.hasTag('tags:magic_cable.port_positive.X');
    // 检测 方向y
    const direction_positive_y = object.above()?.hasTag('tags:magic_cable.logic_negative.Y') ? true : object.above()?.hasTag('tags:magic_cable.port_negative.Y');
    const direction_negative_y = object.below()?.hasTag('tags:magic_cable.logic_positive.Y') ? true : object.below()?.hasTag('tags:magic_cable.port_positive.Y');
    // 检测 方向z
    const direction_positive_z = object.south()?.hasTag('tags:magic_cable.logic_negative.Z') ? true : object.south()?.hasTag('tags:magic_cable.port_negative.Z');
    const direction_negative_z = object.north()?.hasTag('tags:magic_cable.logic_positive.Z') ? true : object.north()?.hasTag('tags:magic_cable.port_positive.Z');
    // 赋值 方向X
    TrySetPermutation(object, 'STATE:direction_positive.X', direction_positive_x ?? false);
    TrySetPermutation(object, 'STATE:direction_negative.X', direction_negative_x ?? false);
    // 赋值 方向Y
    TrySetPermutation(object, 'STATE:direction_positive.Y', direction_positive_y ?? false);
    TrySetPermutation(object, 'STATE:direction_negative.Y', direction_negative_y ?? false);
    // 赋值 方向Z
    TrySetPermutation(object, 'STATE:direction_positive.Z', direction_positive_z ?? false);
    TrySetPermutation(object, 'STATE:direction_negative.Z', direction_negative_z ?? false);
}
/**
 * * 魔导总线 - 传播许可
 */
function enableControl(object) {
    /**
     * * 判断输出
     */
    const output = [object.east(), object.west(), object.south(), object.north()].filter(block => block?.hasTag('tags:magic_cable.series')).length;
    /**
     * * 判断控制
     */
    const control = [object.above(), object.below()].filter(block => block?.hasTag('tags:magic_cable.latch')).length;
    // 赋值 方块状态
    server.system.runTimeout(() => TrySetPermutation(object, 'STATE:output', output != 0 ? 1 : 0), 1);
    server.system.runTimeout(() => TrySetPermutation(object, 'STATE:control', control != 0 ? 1 : 0), 2);
}
/**
 * * 机关之门 - 魔晶传送
 */
function portalGate(object) {
    // 查询方块标签
    const direction_0 = object.west()?.hasTag('tags:magic_portal.series') ?? false;
    const direction_1 = object.south()?.hasTag('tags:magic_portal.series') ?? false;
    const direction_2 = object.east()?.hasTag('tags:magic_portal.series') ?? false;
    const direction_3 = object.north()?.hasTag('tags:magic_portal.series') ?? false;
    // 赋值 方块状态
    server.system.runTimeout(() => TrySetPermutation(object, 'STATE:direction_0', direction_0 ? 1 : 0), 1);
    server.system.runTimeout(() => TrySetPermutation(object, 'STATE:direction_1', direction_1 ? 1 : 0), 2);
    server.system.runTimeout(() => TrySetPermutation(object, 'STATE:direction_2', direction_2 ? 1 : 0), 3);
    server.system.runTimeout(() => TrySetPermutation(object, 'STATE:direction_3', direction_3 ? 1 : 0), 4);
}
/**
 * * 水平放置 的 机关之门
 *
 * @param {server.Block} object - 机关门对象
 */
function horizontalGate(object) {
    /**
     * * 比较方块对象
     *
     * @param target - 需要比较的方块对象
     *
     * @returns - 是否为同一种方块
     */
    function compareBlocks(target) {
        return target?.typeId == object.typeId && target?.permutation.getState('minecraft:vertical_half') == object.permutation.getState('minecraft:vertical_half');
    }
    // 查询方块标签
    const [direction_0, direction_1, direction_2, direction_3] = [
        compareBlocks(object.east()),
        compareBlocks(object.west()),
        compareBlocks(object.south()),
        compareBlocks(object.north())
    ];
    // 赋值 方块状态
    server.system.runTimeout(() => TrySetPermutation(object, 'STATE:direction_0', direction_0 ? 1 : 0), 1);
    server.system.runTimeout(() => TrySetPermutation(object, 'STATE:direction_1', direction_1 ? 1 : 0), 2);
    server.system.runTimeout(() => TrySetPermutation(object, 'STATE:direction_2', direction_2 ? 1 : 0), 3);
    server.system.runTimeout(() => TrySetPermutation(object, 'STATE:direction_3', direction_3 ? 1 : 0), 4);
}
/**
 * * 垂直放置 的 机关之门
 *
 * @param {server.Block} object - 机关门对象
 */
function verticalGate(object) {
    // 方块状态默认值
    let about = 0, center = 0;
    // 修饰 机关门 朝向
    if (object.west()?.typeId == object.typeId)
        about = 1;
    else if (object.south()?.typeId == object.typeId)
        about = 2;
    else if (object.east()?.typeId == object.typeId)
        about = 3;
    else if (object.north()?.typeId == object.typeId)
        about = 4;
    // 修饰 机关门 边框
    if (object.east()?.typeId == object.typeId && object.west()?.typeId == object.typeId)
        center = 1;
    else if (object.south()?.typeId == object.typeId && object.north()?.typeId == object.typeId)
        center = 1;
    // 校验 机关门朝向
    if (about == 0)
        return;
    server.system.runTimeout(() => TrySetPermutation(object, 'STATE:about', about), 1);
    server.system.runTimeout(() => TrySetPermutation(object, 'STATE:center', center), 2);
}
/**
 * * 丛林木椅
 *
 * @param {server.Block} object - 机关门对象
 */
function jungleWoodChair(object) {
    if (object.permutation.getState('STATE:stage') != 0) {
        switch (object.permutation.getState('minecraft:cardinal_direction')) {
            case 'south':
                if (object.east()?.typeId != object.typeId && object.west()?.typeId != object.typeId)
                    TrySetPermutation(object, 'STATE:stage', 0);
                break;
            case 'north':
                if (object.east()?.typeId != object.typeId && object.west()?.typeId != object.typeId)
                    TrySetPermutation(object, 'STATE:stage', 0);
                break;
            case 'east':
                if (object.south()?.typeId != object.typeId && object.north()?.typeId != object.typeId)
                    TrySetPermutation(object, 'STATE:stage', 0);
                break;
            case 'west':
                if (object.south()?.typeId != object.typeId && object.north()?.typeId != object.typeId)
                    TrySetPermutation(object, 'STATE:stage', 0);
                break;
        }
    }
    else if (object.permutation.getState('STATE:stage') == 0 && object.permutation.getState('STATE:type') == 0) {
        switch (object.permutation.getState('minecraft:cardinal_direction')) {
            case 'south':
                if (object.east()?.hasTag('tags:home_decorating.chair.south'))
                    TrySetPermutation(object, 'STATE:stage', 1);
                else if (object.west()?.hasTag('tags:home_decorating.chair.south'))
                    TrySetPermutation(object, 'STATE:stage', 2);
                break;
            case 'north':
                if (object.east()?.hasTag('tags:home_decorating.chair.north'))
                    TrySetPermutation(object, 'STATE:stage', 2);
                else if (object.west()?.hasTag('tags:home_decorating.chair.north'))
                    TrySetPermutation(object, 'STATE:stage', 1);
                break;
            case 'east':
                if (object.south()?.hasTag('tags:home_decorating.chair.east'))
                    TrySetPermutation(object, 'STATE:stage', 2);
                else if (object.north()?.hasTag('tags:home_decorating.chair.east'))
                    TrySetPermutation(object, 'STATE:stage', 1);
                break;
            case 'west':
                if (object.south()?.hasTag('tags:home_decorating.chair.west'))
                    TrySetPermutation(object, 'STATE:stage', 1);
                else if (object.north()?.hasTag('tags:home_decorating.chair.west'))
                    TrySetPermutation(object, 'STATE:stage', 2);
                break;
        }
    }
}
/**
 * * 闪长岩桌
 *
 * @param {server.Block} object - 机关门对象
 */
function dioriteTable(object) {
    if (object.permutation.getState('STATE:stage') != 0) {
        switch (object.permutation.getState('minecraft:cardinal_direction')) {
            case 'south':
                if (object.east()?.hasTag('tags:home_decorating.table.south')) {
                    if (object.west()?.hasTag('tags:home_decorating.table.south'))
                        TrySetPermutation(object, 'STATE:stage', 3);
                }
                else if (!object.east()?.hasTag('tags:home_decorating.table.south')) {
                    if (!object.west()?.hasTag('tags:home_decorating.table.south'))
                        TrySetPermutation(object, 'STATE:stage', 0);
                }
                break;
            case 'north':
                if (object.east()?.hasTag('tags:home_decorating.table.north')) {
                    if (object.west()?.hasTag('tags:home_decorating.table.north'))
                        TrySetPermutation(object, 'STATE:stage', 3);
                }
                else if (!object.east()?.hasTag('tags:home_decorating.table.north')) {
                    if (!object.west()?.hasTag('tags:home_decorating.table.north'))
                        TrySetPermutation(object, 'STATE:stage', 0);
                }
                break;
            case 'east':
                if (object.south()?.hasTag('tags:home_decorating.table.east')) {
                    if (object.north()?.hasTag('tags:home_decorating.table.east'))
                        TrySetPermutation(object, 'STATE:stage', 3);
                }
                else if (!object.south()?.hasTag('tags:home_decorating.table.east')) {
                    if (!object.north()?.hasTag('tags:home_decorating.table.east'))
                        TrySetPermutation(object, 'STATE:stage', 0);
                }
                break;
            case 'west':
                if (object.south()?.hasTag('tags:home_decorating.table.west')) {
                    if (object.north()?.hasTag('tags:home_decorating.table.west'))
                        TrySetPermutation(object, 'STATE:stage', 3);
                }
                else if (!object.south()?.hasTag('tags:home_decorating.table.west')) {
                    if (!object.north()?.hasTag('tags:home_decorating.table.west'))
                        TrySetPermutation(object, 'STATE:stage', 0);
                }
                break;
        }
    }
    else if (object.permutation.getState('STATE:stage') == 0) {
        switch (object.permutation.getState('minecraft:cardinal_direction')) {
            case 'south':
                if (object.east()?.hasTag('tags:home_decorating.table.south') && object.west()?.hasTag('tags:home_decorating.table.south'))
                    TrySetPermutation(object, 'STATE:stage', 3);
                else if (object.east()?.hasTag('tags:home_decorating.table.south'))
                    TrySetPermutation(object, 'STATE:stage', 2);
                else if (object.west()?.hasTag('tags:home_decorating.table.south'))
                    TrySetPermutation(object, 'STATE:stage', 1);
                break;
            case 'north':
                if (object.east()?.hasTag('tags:home_decorating.table.north') && object.west()?.hasTag('tags:home_decorating.table.north'))
                    TrySetPermutation(object, 'STATE:stage', 3);
                else if (object.east()?.hasTag('tags:home_decorating.table.north'))
                    TrySetPermutation(object, 'STATE:stage', 1);
                else if (object.west()?.hasTag('tags:home_decorating.table.north'))
                    TrySetPermutation(object, 'STATE:stage', 2);
                break;
            case 'east':
                if (object.south()?.hasTag('tags:home_decorating.table.east') && object.north()?.hasTag('tags:home_decorating.table.east'))
                    TrySetPermutation(object, 'STATE:stage', 3);
                else if (object.south()?.hasTag('tags:home_decorating.table.east'))
                    TrySetPermutation(object, 'STATE:stage', 1);
                else if (object.north()?.hasTag('tags:home_decorating.table.east'))
                    TrySetPermutation(object, 'STATE:stage', 2);
                break;
            case 'west':
                if (object.south()?.hasTag('tags:home_decorating.table.west') && object.north()?.hasTag('tags:home_decorating.table.west'))
                    TrySetPermutation(object, 'STATE:stage', 3);
                else if (object.south()?.hasTag('tags:home_decorating.table.west'))
                    TrySetPermutation(object, 'STATE:stage', 2);
                else if (object.north()?.hasTag('tags:home_decorating.table.west'))
                    TrySetPermutation(object, 'STATE:stage', 1);
                break;
        }
    }
}

/*
 * 原版接口
 */
/**
 * * 组件前缀代词
 */
const componentPrefix$9 = 'opal:place.';
/**
 * * 方块自定义组件列表
 */
const components$b = new Map();
/*
 * 虚空方块
 */
components$b.set(componentPrefix$9 + 'unreal_space', {
    beforeOnPlayerPlace(source) {
        source.permutationToPlace = source.permutationToPlace.withState('STATE:is_storage', 1);
    }
});
/*
 * 魔导总线
 */
components$b.set(componentPrefix$9 + 'magic_cable', {
    beforeOnPlayerPlace(source) {
        source.permutationToPlace = source.permutationToPlace.withState('STATE:is_storage', false);
    }
});
/*
 * 从林木椅
 */
components$b.set(componentPrefix$9 + 'jungle_wood_chair', {
    beforeOnPlayerPlace(source) {
        source.permutationToPlace = source.player?.isSneaking ? source.permutationToPlace.withState('STATE:type', 1) : source.permutationToPlace.withState('STATE:type', 0);
    }
});
/*
 * 使徒人偶
 */
components$b.set(componentPrefix$9 + 'divine_favor_guide_image', {
    async beforeOnPlayerPlace(source) {
        /**
         * * 获取方块状态
         */
        const { permutationToPlace, dimension, block } = source;
        // 设置状态
        source.permutationToPlace = permutationToPlace.withState('STATE:is_storage', false).withState('STATE:random_texture', RandomFloor(0, 12));
        // 延迟 1 tick
        await server.system.waitTicks(1);
        // 播放音效
        dimension.playSound('chime.amethyst_block', block);
        // 延迟播放音效
        server.system.runTimeout(() => dimension.playSound('step.amethyst_block', block), 10);
        // 播放粒子
        TrySpawnParticle(dimension, "constant:erupt_rune_orange", block.center());
        TrySpawnParticle(dimension, "constant:disperse_rune_orange", block.center());
        TrySpawnParticle(dimension, "constant:fireworks_fireball_amber_color", block.center());
    }
});

/*
 * 原版接口
 */
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
        ErrorMessage('<§l§b 魔导总线 §r>§4 发生错误§r', block, { text: info.message + '.|.' + info.name });
    }
    //返回经过最终过滤的方块数组
    return getProtoArray.filter(info => {
        /**
         ** 获取方块的魔力类型
         */
        const state = info.permutation.getState('STATE:rune_type');
        return state === 0;
    });
}
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
                TrySetPermutation(object, 'STATE:redstone', getRedstoneBlock);
                return false;
            }
        }
        else {
            TrySetPermutation(object, 'STATE:redstone', 0);
            return true;
        }
    }
    catch {
        return false;
    }
}
/**
 ** 红石侦测
 *
 * @param object - 执行 赋值 的 方块对象
 *
 * @param type - 方块队列的 3轴识别特征
 */
function redstoneDetection(object, type) {
    if (!redstoneChange(object, object.permutation))
        tryBatchState(cableQueue(object, type), 'STATE:rune_type', Random({ max: 7, min: 1 }, true));
}
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
        const target = self.offset(Vector.multiply(source, index));
        /**
         ** 获取方块 的 魔力类型
         */
        const state = target?.permutation.getState('STATE:rune_type') ?? 9;
        // 检查方块是否符合要求
        if (!target?.hasTag('tags:magic_cable.series') || state != 0 || target.typeId == self.typeId)
            continue;
        // 设置方块属性
        TrySetPermutation(target, 'STATE:rune_type', self.permutation.getState('STATE:rune_type'));
        //保存方块对象
        return target;
    }
    // 返回未定义
    return undefined;
}
/**
 ** 超导髓鞘
 *
 * @returns {server.Block} 方块对象
 */
function superPulse(self, type) {
    //执行模块功能
    try {
        // 设置方块属性
        server.system.run(() => TrySetPermutation(self, 'STATE:rune_type', 9));
        // 获取方块朝向
        switch (type) {
            case 'up': return runDetection(self, Vector.CONSTANT_UP);
            case 'down': return runDetection(self, Vector.CONSTANT_DOWN);
            case 'east': return runDetection(self, Vector.CONSTANT_EAST);
            case 'west': return runDetection(self, Vector.CONSTANT_WEST);
            case 'north': return runDetection(self, Vector.CONSTANT_NORTH);
            case 'south': return runDetection(self, Vector.CONSTANT_SOUTH);
            default: return undefined;
        }
        ;
    }
    // 异常处理, 显示错误信息
    catch {
        ErrorMessage('<§l§b 超导髓鞘 §r>§4 发生错误§r', self, { text: '无法发送<§l§c 总线信号 §r>, 请勿在<§l§m 世界边界 §r>或<§l§n 世界之外 §r>使用!!' });
        //返回方块对象
        return self;
    }
}
/**
 ** 超导枢纽
 */
function superOmphalos(object, states) {
    // 遍历 6 个方向 的 方块
    try {
        ['up', 'down', 'north', 'south', 'west', 'east'].forEach(
        // 替换指定方向的方块
        info => TryFillBlocks(object.dimension, Vector.add(object, { x: 11, y: 11, z: 11 }), Vector.add(object, { x: -11, y: -11, z: -11 }), server.BlockPermutation.resolve('starry_map:super_pulse', {
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
        ErrorMessage('<§l§b 超导枢纽 §r>§4 发生错误§r', object, { text: '无法发送<§l§c 总线信号 §r>, 请勿在<§l§m 世界边界 §r>或<§l§n 世界之外 §r>使用!!' });
    }
    //复位自身状态
    TrySetPermutation(object, 'STATE:rune_type', 9);
}
/**
 ** 信号编译
 */
function signalCompilation(object, type, states) {
    /**
     ** 异常处理
     */
    const onError = () => {
        object.setPermutation(object.permutation.withState('STATE:stage', 2));
        object.setPermutation(object.permutation.withState('STATE:index', 0));
        ErrorMessage('<§l§b 信号编译 §r>§4 发生错误§r', object, { text: '未能在设备上方找到合适的<§l§3 方块容器 §r>' });
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
        TrySetPermutation(object, 'STATE:stage', 2);
        TrySetPermutation(object, 'STATE:index', 0);
        return;
    }
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
    // 修改 物品容器 索引
    TrySetPermutation(object, 'STATE:index', getSlot + 1);
}
/**
 ** 交互终端
 *
 * @param object - 发起事件的方块对象
 *
 * @param type - 方块队列的 3轴识别特征
 *
 * @param states - 方块 的 状态属性
 */
function interactiveTerminal(object, type, states) {
    const blocks = cableQueue(object, type);
    tryBatchState(blocks, 'STATE:rune_type', states.getState('STATE:rune_note'));
}
/**
 ** 逻辑元件
 *
 * @param object - 发起事件的方块对象
 *
 * @param type - 方块队列的 3轴识别特征
 */
function logicComponents(object, type) {
    /**
     ** 获取 魔导总线队列
     */
    const blocks = cableQueue(object, type);
    tryBatchState(blocks, 'STATE:rune_type', Random({ max: 7, min: 1 }, true));
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
                    TrySetPermutation(block, 'STATE:rune_note', 0);
            }
}
/**
 ** 信号处理
 *
 * @param object - 发起事件的方块对象
 *
 * @param type - 方块队列的 3轴识别特征
 *
 * @param states - 方块 的 状态属性
 */
function signalProcessing(object, type, states) {
    /**
     ** 获取 魔导总线队列
     */
    const blocks = cableQueue(object, type);
    tryBatchState(blocks, 'STATE:rune_type', states.getState('STATE:rune_note'));
    TrySetPermutation(object, 'STATE:rune_type', 9);
}
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
        const input = object.offset(Vector.CONSTANT_UP);
        /**
         ** 属性输出
         */
        const output = object.offset(Vector.CONSTANT_DOWN);
        if (!input || !input?.hasTag('tags:magic_cable.open'))
            return;
        if (!output || !output?.hasTag('tags:magic_cable.series'))
            return;
        /**
         ** 方块属性
         */
        const states = input.permutation;
        TrySetPermutation(output, 'STATE:rune_type', states.getState('STATE:rune_note'));
        server.system.runTimeout(() => TrySetPermutation(input, 'STATE:rune_note', 0), 5);
    }
    function detection_down() {
        /**
         ** 属性输入
         */
        const input = object.offset(Vector.CONSTANT_DOWN);
        /**
         ** 属性输出
         */
        const output = object.offset(Vector.CONSTANT_UP);
        if (!input || !input?.hasTag('tags:magic_cable.open'))
            return;
        if (!output || !output?.hasTag('tags:magic_cable.series'))
            return;
        /**
         ** 方块属性
         */
        const states = input.permutation;
        TrySetPermutation(output, 'STATE:rune_type', states.getState('STATE:rune_note'));
        server.system.runTimeout(() => TrySetPermutation(input, 'STATE:rune_note', 0), 5);
    }
    function detection_north() {
        /**
         ** 属性输入
         */
        const input = object.offset(Vector.CONSTANT_NORTH);
        /**
         ** 属性输出
         */
        const output = object.offset(Vector.CONSTANT_SOUTH);
        if (!input || !input?.hasTag('tags:magic_cable.open'))
            return;
        if (!output || !output?.hasTag('tags:magic_cable.series'))
            return;
        /**
         ** 方块属性
         */
        const states = input.permutation;
        TrySetPermutation(output, 'STATE:rune_type', states.getState('STATE:rune_note'));
        server.system.runTimeout(() => TrySetPermutation(input, 'STATE:rune_note', 0), 5);
    }
    function detection_south() {
        /**
         ** 属性输入
         */
        const input = object.offset(Vector.CONSTANT_SOUTH);
        /**
         ** 属性输出
         */
        const output = object.offset(Vector.CONSTANT_NORTH);
        if (!input || !input?.hasTag('tags:magic_cable.open'))
            return;
        if (!output || !output?.hasTag('tags:magic_cable.series'))
            return;
        /**
         ** 方块属性
         */
        const states = input.permutation;
        TrySetPermutation(output, 'STATE:rune_type', states.getState('STATE:rune_note'));
        server.system.runTimeout(() => TrySetPermutation(input, 'STATE:rune_note', 0), 5);
    }
    function detection_west() {
        /**
         ** 属性输入
         */
        const input = object.offset(Vector.CONSTANT_WEST);
        /**
         ** 属性输出
         */
        const output = object.offset(Vector.CONSTANT_EAST);
        if (!input || !input?.hasTag('tags:magic_cable.open'))
            return;
        if (!output || !output?.hasTag('tags:magic_cable.series'))
            return;
        /**
         ** 方块属性
         */
        const states = input.permutation;
        TrySetPermutation(output, 'STATE:rune_type', states.getState('STATE:rune_note'));
        server.system.runTimeout(() => TrySetPermutation(input, 'STATE:rune_note', 0), 5);
    }
    function detection_east() {
        /**
         ** 属性输入
         */
        const input = object.offset(Vector.CONSTANT_EAST);
        /**
         ** 属性输出
         */
        const output = object.offset(Vector.CONSTANT_WEST);
        if (!input || !input?.hasTag('tags:magic_cable.open'))
            return;
        if (!output || !output?.hasTag('tags:magic_cable.series'))
            return;
        /**
         ** 方块属性
         */
        const states = input.permutation;
        TrySetPermutation(output, 'STATE:rune_type', states.getState('STATE:rune_note'));
        server.system.runTimeout(() => TrySetPermutation(input, 'STATE:rune_note', 0), 5);
    }
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
    }
}
/**
 ** 逻辑锁存器更新事件
 *
 * @param block - 发起事件的方块对象
 */
function LatchUpdateEvent(block) {
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
    // 遍历 方块列表
    blocks.forEach(block => {
        switch (block.typeId) {
            case 'starry_map:logic_single':
                logicSingle(block);
                break;
            case 'starry_map:logical_and':
                TrySetPermutation(block, 'STATE:stage', 1);
                break;
            case 'starry_map:exclusive_or':
                TrySetPermutation(block, 'STATE:stage', 1);
                break;
        }
    });
}
/**
 ** 默认事件
 *
 * @param object - 发起事件的方块对象
 *
 * @param type - 方块队列的 3轴识别特征
 *
 * @param state - 方块 的 状态属性
 */
function defaultEvent(object, type, state) {
    /**
     ** 获取 方块队列
     */
    const blocks = cableQueue(object, type);
    // 遍历 方块队列
    tryBatchState(blocks, 'STATE:rune_type', state.getState('STATE:rune_type'));
    TrySetPermutation(object, 'STATE:rune_type', 9);
}

/*
 * 系统组件
 */
/**
 * * 驱动核心 < 120 能量消耗 >
 */
function servoOmphalos(object, type) {
    // 判断能量值 是否足够
    if (!ExpendEnergy(object, -120, true))
        return;
    /**
     * * 结构范围 上极限 坐标
     */
    const rangeMax = Vector.add(object, { x: 10, y: 10, z: 10 });
    /**
     * * 结构范围 下极限 坐标
     */
    const rangeMin = Vector.add(object, { x: -10, y: -10, z: -10 });
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
    //将区块内的方块移动到指定位置
    switch (type) {
        case 'X+':
            RunCode(`fill ${rangeMax.x + 1} ${rangeMax.y} ${rangeMax.z}  ${rangeMax.x + 1} ${rangeMin.y} ${rangeMin.z} air [] destroy`);
            RunCode(`clone ${rangeMax.x} ${rangeMax.y} ${rangeMax.z}  ${rangeMin.x} ${rangeMin.y} ${rangeMin.z}  ${rangeMin.x + 1} ${rangeMin.y} ${rangeMin.z} replace force`);
            RunCode(`fill ${rangeMin.x} ${rangeMax.y} ${rangeMax.z}  ${rangeMin.x} ${rangeMin.y} ${rangeMin.z} air [] replace`);
            MoveEntity(Vector.CONSTANT_EAST);
            break;
        case 'X-':
            RunCode(`fill ${rangeMin.x - 1} ${rangeMax.y} ${rangeMax.z}  ${rangeMin.x - 1} ${rangeMin.y} ${rangeMin.z} air [] destroy`);
            RunCode(`clone ${rangeMax.x} ${rangeMax.y} ${rangeMax.z}  ${rangeMin.x} ${rangeMin.y} ${rangeMin.z}  ${rangeMin.x - 1} ${rangeMin.y} ${rangeMin.z} replace force`);
            RunCode(`fill ${rangeMax.x} ${rangeMax.y} ${rangeMax.z}  ${rangeMax.x} ${rangeMin.y} ${rangeMin.z} air [] replace`);
            MoveEntity(Vector.CONSTANT_WEST);
            break;
        case 'Z+':
            RunCode(`fill ${rangeMax.x} ${rangeMax.y} ${rangeMax.z + 1}  ${rangeMin.x} ${rangeMin.y} ${rangeMax.z + 1} air [] destroy`);
            RunCode(`clone ${rangeMax.x} ${rangeMax.y} ${rangeMax.z}  ${rangeMin.x} ${rangeMin.y} ${rangeMin.z}  ${rangeMin.x} ${rangeMin.y} ${rangeMin.z + 1} replace force`);
            RunCode(`fill ${rangeMax.x} ${rangeMax.y} ${rangeMin.z}  ${rangeMin.x} ${rangeMin.y} ${rangeMin.z} air [] replace`);
            MoveEntity(Vector.CONSTANT_SOUTH);
            break;
        case 'Z-':
            RunCode(`fill ${rangeMax.x} ${rangeMax.y} ${rangeMin.z - 1}  ${rangeMin.x} ${rangeMin.y} ${rangeMin.z - 1} air [] destroy`);
            RunCode(`clone ${rangeMax.x} ${rangeMax.y} ${rangeMax.z}  ${rangeMin.x} ${rangeMin.y} ${rangeMin.z}  ${rangeMin.x} ${rangeMin.y} ${rangeMin.z - 1} replace force`);
            RunCode(`fill ${rangeMax.x} ${rangeMax.y} ${rangeMax.z}  ${rangeMin.x} ${rangeMin.y} ${rangeMax.z} air [] replace`);
            MoveEntity(Vector.CONSTANT_NORTH);
            break;
        case 'Y+':
            RunCode(`fill ${rangeMax.x} ${rangeMax.y + 1} ${rangeMax.z}  ${rangeMin.x} ${rangeMax.y + 1} ${rangeMin.z} air [] destroy`);
            RunCode(`clone ${rangeMax.x} ${rangeMax.y} ${rangeMax.z}  ${rangeMin.x} ${rangeMin.y} ${rangeMin.z}  ${rangeMin.x} ${rangeMin.y + 1} ${rangeMin.z} replace force`);
            RunCode(`fill ${rangeMax.x} ${rangeMin.y} ${rangeMax.z}  ${rangeMin.x} ${rangeMin.y} ${rangeMin.z} air [] replace`);
            MoveEntity(Vector.CONSTANT_UP);
            break;
        case 'Y-':
            RunCode(`fill ${rangeMax.x} ${rangeMin.y - 1} ${rangeMax.z}  ${rangeMin.x} ${rangeMin.y - 1} ${rangeMin.z} air [] destroy`);
            RunCode(`clone ${rangeMax.x} ${rangeMax.y} ${rangeMax.z}  ${rangeMin.x} ${rangeMin.y} ${rangeMin.z}  ${rangeMin.x} ${rangeMin.y - 1} ${rangeMin.z} replace force`);
            RunCode(`fill ${rangeMax.x} ${rangeMax.y} ${rangeMax.z}  ${rangeMin.x} ${rangeMax.y} ${rangeMin.z} air [] replace`);
            MoveEntity(Vector.CONSTANT_DOWN);
            break;
    }
}
/**
 * * 伺服基座 < 30 能量消耗 >
 */
function Susceptor(object, type) {
    // 判断能量值 是否足够
    if (!ExpendEnergy(object, -30, true))
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

/*
 * 原版接口
 */
/**
 * * 脉冲尖峰炮
 *
 * @param object - 发起事件的方块对象
 */
function pulsePeakCannon(object) {
    // 判断能量值 是否足够
    if (!ExpendEnergy(object, -1))
        return;
    /**
     * * 设置 范围查询 的 过滤条条件
     */
    const options = {
        excludeTypes: ["minecraft:item", "minecraft:xp_orb"],
        excludeFamilies: ['player', 'starry'],
        location: object.location,
        maxDistance: 32,
        closest: 8
    };
    /**
     * * 获取 目标列表
     */
    const targets = object.dimension.getEntities(options).filter(entity => {
        const family = entity.getComponent('type_family');
        if (entity.target?.typeId === "minecraft:player")
            return true;
        if (entity.target?.hasTag('is_Contract'))
            return true;
        if (family?.hasTypeFamily('monster'))
            return true;
    });
    if (targets.length === 0 || !ExpendEnergy(object, -150))
        return;
    /**
     * * 暴击概率
     */
    const erupt = IsEnable(15);
    /**
     * * 获取 炮击范围顶点
     */
    const anchor_0 = object.offset({ x: Random({ min: -2, max: 2 }), y: 8, z: Random({ min: -2, max: 2 }) }) ?? object.center();
    /**
     * * 获取 炮击范围顶点
     */
    const anchor_1 = object.offset({ x: Random({ min: -4, max: 4 }), y: 4, z: Random({ min: -4, max: 4 }) }) ?? object.center();
    /**
     * * 获取 随机炮击顶点
     */
    const focus = Vector.rangeRandom(anchor_0, anchor_1);
    /**
     * * 炮弹爆炸事件
     *
     * @param args - 附加参数
     */
    const powerExplode = (args) => {
        // 验证 实体状态 是否正确
        if (!object || !object.isValid)
            return;
        /**
         * * 过滤器参数
         */
        const options = {
            excludeTypes: ["minecraft:item", "minecraft:xp_orb"],
            excludeFamilies: ['player', 'starry'],
            location: args.location,
            maxDistance: 4,
            closest: 4
        };
        /**
         * * 获取实体列表
         */
        const entitys = args.dimension.getEntities(options).filter(entity => {
            const family = entity.getComponent('type_family');
            if (entity.target?.typeId === "minecraft:player")
                return true;
            if (entity.target?.hasTag('is_Contract'))
                return true;
            if (family?.hasTypeFamily('monster'))
                return true;
        });
        /**
         * * 创建 炮弹面板
         */
        const bombData = CreateEmptyProperty({
            basic_attack: 15,
            erupt_odds: 45,
            erupt_hurt: 480,
            self_rune: 'rune_purple'
        });
        /**
         * * 获取 玩家
         */
        const player = server.world.getPlayers()[0];
        // 创建 元素伤害
        entitys.forEach(entity => ElementalAttack(player, entity, erupt, bombData));
        TrySpawnParticle(args.dimension, 'constant:fireworks_fireball_rune_purple', args.location);
    };
    // 创建 路径包
    PathExecute.Create('脉冲尖峰炮-炮击轨迹', 1, {
        locations: [object.center(), focus, targets[0].getHeadLocation()],
        particles: ['constant:track_rune_purple'],
        dimension: object.dimension,
        on_done: powerExplode,
        cooldown: 1,
        speed: 1
    });
}

/*
 * 原版接口
 */
/**
 * * 物资收集 < 30 能量消耗 >
 */
function Collection(block, permutation) {
    // 判断能量值 是否足够
    if (!ExpendEnergy(block, -30))
        return;
    /**
     * * 实体查询选项
     */
    const setOptions = {
        maxDistance: (permutation.getState('STATE:value') + 1) * 8,
        type: "minecraft:item",
        location: block
    };
    /**
     * * 获取实体队列
     */
    const items = block.dimension.getEntities(setOptions);
    /**
     * * 获取方块容器
     */
    const container = block.below()?.getComponent('inventory')?.container;
    //尝试播放粒子效果
    items.forEach(info => TrySpawnParticle(info.dimension, 'constant:smoke_rune_purple', info.location));
    //尝试进行 物资收集
    if (container && container.emptySlotsCount >= items.length)
        items.forEach(info => {
            /**
             * * 获取 物资对象
             */
            const item = info.getComponent('item')?.itemStack;
            container.addItem(item);
            info.remove();
        });
    else
        items.forEach(info => info.teleport(block.center()));
}
/**
 * * 获取 目标方块
 *
 * @returns {server.Block} 目标方块块
 */
function getTargetBlock(block) {
    /**
     * * 储存 目标方块队列
     */
    const setBlcokGroup = [];
    //获取 方块队列
    for (let index = 2; index < 64; index++) {
        /**
         * * 获取 方块对象
         */
        const getBlock = block.offset({ x: 0, y: -index, z: 0 });
        //判断 方块是否存在
        if (getBlock)
            setBlcokGroup.push(getBlock);
    }
    //过滤 方块队列
    return setBlcokGroup.filter(block => !block.isAir)[0];
}
/**
 * * 尝试填充方块

 * @param {server.Container} container 可用物品容器

 * @param {server.Vector3} location 方块填充位置
 */
function FillingTest(block, container, location) {
    //遍历 物品容器中的物品
    for (let index = 0; index < container.size; index++) {
        /**
         * * 获取容器中的物品
         */
        const getItem = container.getItem(index);
        //判断 物品是否存在
        if (!getItem)
            continue;
        try {
            /**
             * * 获取方块标识符
             */
            const blockID = crops_map.get(getItem.typeId) ?? getItem.typeId;
            // 尝试填充方块
            TryFillBlocks(block.dimension, location, location, server.BlockPermutation.resolve(blockID));
            // 减少 物品堆栈
            ConsumeItemStack(container, index, getItem);
            break;
        }
        catch {
            continue;
        }
    }
}
/**
 * * 方块放置 < 60 能量消耗 >
 */
function Placement(block) {
    // 判断能量值 是否足够
    if (!ExpendEnergy(block, -60))
        return;
    /**
     * * 获取上方的方块对象
     */
    const aboveBlock = block.above();
    /**
     * * 获取物品容器
     */
    const getContainer = aboveBlock?.getComponent('minecraft:inventory')?.container;
    // 判断 物品容器是否存在
    if (!getContainer)
        return ErrorMessage('<§l§b 方块放置 §r>§4 发生错误§r', block, { text: '未能在设备上方找到合适的<§l§3 方块容器 §r>' });
    // 遍历 物品容器中的物品
    if (getContainer.size > 1) {
        /**
         * * 获取 目标方块
         */
        const getTarget = getTargetBlock(block) ?? block;
        /**
         * * 设定进行填充测试的位置
         */
        const getPlace = Vector.add(getTarget, Vector.CONSTANT_UP);
        //清除无效的方块
        block.dimension.runCommand(`fill ${getPlace.x} ${getPlace.y} ${getPlace.z} ${getPlace.x} ${getPlace.y} ${getPlace.z} air [] destroy`);
        //尝试进行填充测试
        server.system.runTimeout(() => FillingTest(block, getContainer, getPlace), 5);
        // 创建自由指针
        SetFreePointer({ location: block.bottomCenter(), dimension: block.dimension }, getTarget.center(), 1);
    }
}
/**
 * * 打包投送 < 60 能量消耗 >
 */
function Transmission(block, type) {
    // 判断能量值 是否足够
    if (!ExpendEnergy(block, -60))
        return;
    /**
     * * 定义 物品信息 的 缓存数组
     */
    const setItemGroup = [];
    /**
     * * 查询 输入端 与 输出端 容器 并 传输容器物品

     * @param {server.Vector3} source 输入端 容器位置
     */
    function QueryContainer(source) {
        try {
            /**
             * * 获取 输入端 容器方块
             */
            const getBlockOpen = block.offset(source);
            /**
             * * 获取 输入端 容器信息
             */
            const getContainerOpen = getBlockOpen?.getComponent('minecraft:inventory')?.container;
            //寻找 输出端 容器
            for (let index = 1; index < 64; index++) {
                try {
                    /**
                     * * 获取 输出端 容器方块 相对 输入端 容器方块 的 偏移量
                     */
                    const pointer = Vector.multiply(source, -index);
                    /**
                     * * 获取 输出端 容器方块
                     */
                    const getBlockDone = block.offset(pointer);
                    //检测 顶点容器 是否存在
                    if (!getBlockDone)
                        continue;
                    /**
                     * * 获取 输出端 容器信息
                     */
                    const getContainerDone = getBlockDone.getComponent('minecraft:inventory')?.container;
                    //检测 顶点容器 是否存在
                    if (!getContainerOpen || !getContainerDone)
                        continue;
                    /**
                     * * 获取 目标容器 的 可用空间
                     */
                    let getEmptyCount = getContainerDone.emptySlotsCount;
                    //基于 可用空间 遍历 输入端 容器
                    for (let index = 0; index < getContainerOpen.size; index++) {
                        /**
                         * * 获取物品信息
                         */
                        const getItem = getContainerOpen.getItem(index);
                        //检测 物品是否存在
                        if (getItem && getEmptyCount != 0) {
                            getContainerOpen.setItem(index);
                            setItemGroup.push(getItem);
                            getEmptyCount--;
                        }
                    }
                    ;
                    //向 目标容器 填充物品
                    for (let item of setItemGroup)
                        getContainerDone.addItem(item);
                    // 创建自由指针
                    SetFreePointer({ location: block.bottomCenter(), dimension: block.dimension }, getBlockDone.bottomCenter(), 1);
                    break;
                }
                catch {
                    continue;
                }
            }
        }
        catch {
            ErrorMessage('<§l§b 打包投送 §r>§4 发生错误§r', block, { text: '未能在设备后方找到合适的<§l§3 方块容器 §r>' });
        }
    }
    //根据需求选择功能
    switch (type) {
        case 'east':
            QueryContainer(Vector.CONSTANT_WEST);
            break;
        case 'west':
            QueryContainer(Vector.CONSTANT_EAST);
            break;
        case 'south':
            QueryContainer(Vector.CONSTANT_NORTH);
            break;
        case 'north':
            QueryContainer(Vector.CONSTANT_SOUTH);
            break;
        case 'up':
            QueryContainer(Vector.CONSTANT_DOWN);
            break;
        case 'down':
            QueryContainer(Vector.CONSTANT_UP);
            break;
    }
}

/*
 * 原版接口
 */
/**
 ** 初级造石单元 < 35 能量消耗 >
 */
function Solidify(object) {
    // 判断能量值 是否足够
    if (!ExpendEnergy(object, -35))
        return;
    /**
     ** 石材类型
     */
    const type = AnalysisWeight(solidify_output).output;
    /**
     ** 石材物品
     */
    const item = new server.ItemStack(type, 1);
    /**
     ** 获取 方块容器
     */
    const container = object.below()?.getComponent('minecraft:inventory')?.container;
    // 判断 物品容器 是否存在
    if (!container || container.emptySlotsCount == 0)
        TrySpawnItem(object.dimension, item, Vector.add(object, { x: 0.5, y: 1, z: 0.5 }));
    else
        container.addItem(item);
}
/**
 ** 破坏核心 < 15 能量消耗 >
 */
function Destroy(object, type) {
    // 判断能量值 是否足够
    if (!ExpendEnergy(object, -15))
        return;
    /**
     ** 坐标组
     */
    const locationGroup = [];
    // 获取 方块的 坐标
    switch (type) {
        case 'east':
            locationGroup.push(Vector.add(object, Vector.CONSTANT_EAST), Vector.add(object, { x: 6, y: 0, z: 0 }));
            break;
        case 'west':
            locationGroup.push(Vector.add(object, Vector.CONSTANT_WEST), Vector.add(object, { x: -6, y: 0, z: 0 }));
            break;
        case 'up':
            locationGroup.push(Vector.add(object, Vector.CONSTANT_UP), Vector.add(object, { x: 0, y: 6, z: 0 }));
            break;
        case 'down':
            locationGroup.push(Vector.add(object, Vector.CONSTANT_DOWN), Vector.add(object, { x: 0, y: -6, z: 0 }));
            break;
        case 'south':
            locationGroup.push(Vector.add(object, Vector.CONSTANT_SOUTH), Vector.add(object, { x: 0, y: 0, z: 6 }));
            break;
        case 'north':
            locationGroup.push(Vector.add(object, Vector.CONSTANT_NORTH), Vector.add(object, { x: 0, y: 0, z: -6 }));
            break;
    }
    /**
     ** 在路径上挖掘
     */
    const TickEvent = (args) => {
        args.dimension.runCommand(`fill ${args.location.x} ${args.location.y} ${args.location.z} ${args.location.x} ${args.location.y} ${args.location.z} air [] destroy`);
        return true;
    };
    // 创建 破坏核心 路径显示包
    PathExecute.Create('破坏核心-射线动画', 1, {
        particles: ['constant:track_rune_red'],
        offset: { x: 0.5, y: 0.5, z: 0.5 },
        locations: locationGroup,
        dimension: object.dimension,
        on_move: TickEvent,
        cooldown: 1,
        speed: 1
    });
}
/**
 ** 金属锻压 < 15 能量消耗 >
 */
function Forming(object) {
    // 判断能量值 是否足够
    if (!ExpendEnergy(object, -15))
        return;
    /**
     ** 获取 方块容器
     */
    const container = object.above()?.getComponent('minecraft:inventory')?.container;
    // 判断 物品容器 是否存在
    if (!container || container.emptySlotsCount == 0)
        return ErrorMessage('<§l§b 金属锻压 §r>§4 发生错误§r', object, { text: '未能在设备上方找到合适的<§l§3 方块容器 §r>' });
    // 遍历物品容器
    for (let index = 0; index < container.size; index++) {
        /**
         ** 获取 物品对象
         */
        const item = container.getItem(index);
        // 如果物品不存在 或 数量不足
        if (!item || item?.amount < 2)
            continue;
        /**
         ** 获取 锻压类型 标签
         */
        const tags = item?.getTags().filter(tag => tag.startsWith('tags:mineral_resources.make'));
        // 如果 锻压类型 标签不存在
        if (tags.length == 0)
            continue;
        /**
         ** 获取 锻压类型
         */
        const type = tags[0].split('.')[2];
        /**
         ** 获取 物品锻压阶段
         */
        const stage = item.typeId.split(':')[1].split('.').length;
        /**
         ** 获取 物品名称
         */
        const name = stage == 1 ? item.typeId.split(':')[1] : item.typeId.split(':')[1].split('.')[1];
        // 减少 物品堆栈
        ConsumeItemStack(container, index, item, 2);
        // 添加 金属板 物品对象
        container.addItem(new server.ItemStack('starry_map:' + type + '.' + name));
        // 播放锻打音效
        object.dimension.playSound('random.anvil_use', object.location, { volume: 1, pitch: 1 });
        break;
    }
}

/*
 * 系统组件
 */
/**
 * * 传输岩浆
 *
 * @param {server.Block} object - 执行事件的方块
 */
function Pouring(object) {
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
        const portNegative_Y = object.offset(Vector.CONSTANT_DOWN);
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
            ConsumeItemStack(container, index, item, consume);
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
        ErrorMessage('<§l§b 曜石熔炼 §r>§4 发生错误§r', object, { text: info.message });
    }
}
/**
 * * 能量消耗
 *
 * @param {server.Block} object - 执行事件的方块
 */
function Attrition(object) {
    // 判断能量值 是否足够
    if (!ExpendEnergy(object, -45))
        return;
    /**
     * * 获取 自身 的 方块状态
     */
    const getPermutation = object.permutation;
    object.setPermutation(getPermutation.withState('STATE:stage', 1));
}

/*
 * 原版接口
 */
/**
 * * 进行检测的默认标签
 */
const defaultState = 'STATE:rune_type';
/**
 ** 时间积分
 */
const tickScore = new Map();
/**
 ** 常规类型 物品网络 申请
 */
let routineLogisticsRequest = new Map();
/**
 ** 跨越维度 物品网络 申请
 */
let surpassDimensionRequest = new Map();
/**
 * * 组件前缀代词
 */
const componentPrefix$8 = 'opal:tick.';
/**
 * * 方块自定义组件列表
 */
const components$a = new Map();
/**
 ** 方块计时器
 *
 * 此方法为方块对象设置一个单调递增的计时器,
 * 当计时器的值达到或超过指定的时间节点时,
 * 执行一个回调函数,
 * 计时器用于跟踪每个方块的位置和积分,
 * 以便在特定条件下触发事件
 *
 * @param {server.Block} block - 预约时钟事件的方块对象
 *
 * @param {number} bounds - 触发事件的时间节点
 *
 * @param {(block: server.Block) => void} after - 当计时器的值达到或超过界限时执行的事件回调函数
 *
 * @returns {Error | void} - 错误对象或空值
 */
function blockTimer(block, bounds, after) {
    /**
     ** 方块位置
     */
    const position = Vector.toString(block.location);
    /**
     ** 时间积分
     */
    const onTick = tickScore.get(position);
    // 创建时间积分
    if (!onTick || onTick[0] != block.typeId)
        tickScore.set(position, [block.typeId, 1]);
    // 判断与赋值事件积分
    else if (onTick && onTick[1] <= bounds)
        tickScore.set(position, [block.typeId, onTick[1] + 1]);
    // 执行事件
    else {
        // 移除当前方块位置的时间积分
        tickScore.delete(Vector.toString(block.location));
        // 尝试执行回调函数
        try {
            return after(block);
        }
        catch (error) {
            return error;
        }
    }
}
/**
 * * 方块时钟组件
 *
 * @param source - 方块组件参数
 */
function TickComponentTrigger(source) {
    /**
     * * 方块对象
     */
    const block = source.block;
    /**
     * * 方块状态
     */
    const state = source.block.permutation;
    /**
     * * 方块维度
     */
    const dimension = source.dimension;
    /**
     * * 默认的方块状态的值
     */
    const condition = state.getState(defaultState) ?? 0;
    // 返回 方块组件 的 解构
    return { block, state, condition, dimension };
}
/*
 * 虚无方块
 */
components$a.set(componentPrefix$8 + 'unreal_space', {
    onTick(source) {
        /**
         * * 方块组件参数 的 解构
         */
        const analysis = TickComponentTrigger(source);
        // 修饰方块状态
        if (analysis.state.getState('STATE:stage') == 0)
            TrySetPermutation(analysis.block, 'STATE:stage', 2);
        // 预约时钟事件
        blockTimer(analysis.block, 20, block => block.setPermutation(server.BlockPermutation.resolve('minecraft:air')));
    }
});
/*
 * 虚空方块
 */
components$a.set(componentPrefix$8 + 'nihility_space', {
    onTick(source) {
        /**
         * * 方块组件参数 的 解构
         */
        const analysis = TickComponentTrigger(source);
        // 播放音效
        analysis.dimension.playSound('use.stone', analysis.block.location);
        // 修改 方块属性
        switch (analysis.state.getState('STATE:value')) {
            case 0:
                TrySetPermutation(analysis.block, 'STATE:value', 1);
                break;
            case 1:
                TrySetPermutation(analysis.block, 'STATE:value', 2);
                break;
            case 2:
                TrySetPermutation(analysis.block, 'STATE:value', 3);
                break;
            case 3:
                TrySetPermutation(analysis.block, 'STATE:value', 4);
                break;
            case 4:
                TrySetPermutation(analysis.block, 'STATE:value', 5);
                break;
            case 5:
                TrySetPermutation(analysis.block, 'STATE:value', 6);
                break;
            case 6:
                TrySetPermutation(analysis.block, 'STATE:value', 7);
                break;
            case 7:
                TrySetPermutation(analysis.block, 'STATE:value', 8);
                break;
            case 8:
                TrySetPermutation(analysis.block, 'STATE:value', 9);
                break;
            default:
                analysis.dimension.playSound('beacon.activate', analysis.block.location);
                analysis.block.setPermutation(server.BlockPermutation.resolve('minecraft:air'));
                break;
        }
    }
});
/*
 * 基础总线
 */
components$a.set(componentPrefix$8 + 'basic_pipeline', {
    onTick(source) {
        /**
         * * 方块组件参数 的 解构
         */
        const analysis = TickComponentTrigger(source);
        // 判断方块的元素类型状态
        if (analysis.condition != 0 && analysis.condition != 9)
            defaultEvent(analysis.block, 'Xx-Yy-Zz', analysis.state);
        // 重置方块元素类型
        else if (analysis.condition == 9) {
            TrySetPermutation(analysis.block, 'STATE:rune_type', 0);
            TrySetPermutation(analysis.block, 'STATE:direction_positive.X', analysis.block.offset(Vector.CONSTANT_EAST)?.hasTag('tags:magic_cable.port_negative.X') ?? false);
            TrySetPermutation(analysis.block, 'STATE:direction_negative.X', analysis.block.offset(Vector.CONSTANT_WEST)?.hasTag('tags:magic_cable.port_positive.X') ?? false);
            TrySetPermutation(analysis.block, 'STATE:direction_positive.Y', analysis.block.offset(Vector.CONSTANT_UP)?.hasTag('tags:magic_cable.port_negative.Y') ?? false);
            TrySetPermutation(analysis.block, 'STATE:direction_negative.Y', analysis.block.offset(Vector.CONSTANT_DOWN)?.hasTag('tags:magic_cable.port_positive.Y') ?? false);
            TrySetPermutation(analysis.block, 'STATE:direction_negative.Z', analysis.block.offset(Vector.CONSTANT_NORTH)?.hasTag('tags:magic_cable.port_positive.Z') ?? false);
            TrySetPermutation(analysis.block, 'STATE:direction_positive.Z', analysis.block.offset(Vector.CONSTANT_SOUTH)?.hasTag('tags:magic_cable.port_negative.Z') ?? false);
        }
    }
});
/*
 * 脉冲锁存
 */
components$a.set(componentPrefix$8 + 'pulse_latch', {
    onTick(source) {
        /**
         * * 方块组件参数 的 解构
         */
        const analysis = TickComponentTrigger(source);
        /**
         * * 方块前处理事件
         */
        function beforeEvent() {
            // 尝试根据分析结果设置权限, 以确保正确的条件被满足
            TrySetPermutation(analysis.block, 'STATE:rune_note', analysis.condition);
            // 强制重置类型, 确保不受之前状态的影响
            TrySetPermutation(analysis.block, 'STATE:rune_type', 0);
            // 触发魔法电缆的更新事件锁定, 以即时反映当前的状态改变
            LatchUpdateEvent(analysis.block);
        }
        /**
         * * 方块后处理事件
         */
        function afterEvent() {
            TrySetPermutation(analysis.block, 'STATE:rune_note', 0);
            TrySetPermutation(analysis.block, 'STATE:rune_type', 0);
        }
        // 判断方块的元素类型, 如果条件满足且尚未设置, 则执行前处理事件
        if (analysis.condition != 0 && analysis.state.getState('STATE:rune_note') == 0)
            beforeEvent();
        // 如果条件满足且已设置, 则执行后处理事件
        else if (analysis.condition != 0 && analysis.state.getState('STATE:rune_note') != 0)
            afterEvent();
        // 设置方块在X, Y, Z轴的朝向属性
        TrySetPermutation(analysis.block, 'STATE:direction_positive.X', (analysis.block.offset(Vector.CONSTANT_EAST)?.hasTag('tags:magic_cable.port_negative.X') || analysis.block.offset(Vector.CONSTANT_EAST)?.hasTag('tags:magic_cable.logic_negative.X')) ?? false);
        TrySetPermutation(analysis.block, 'STATE:direction_negative.X', (analysis.block.offset(Vector.CONSTANT_WEST)?.hasTag('tags:magic_cable.port_positive.X') || analysis.block.offset(Vector.CONSTANT_WEST)?.hasTag('tags:magic_cable.logic_positive.X')) ?? false);
        TrySetPermutation(analysis.block, 'STATE:direction_positive.Y', (analysis.block.offset(Vector.CONSTANT_UP)?.hasTag('tags:magic_cable.port_negative.Y') || analysis.block.offset(Vector.CONSTANT_UP)?.hasTag('tags:magic_cable.logic_negative.Y')) ?? false);
        TrySetPermutation(analysis.block, 'STATE:direction_negative.Y', (analysis.block.offset(Vector.CONSTANT_DOWN)?.hasTag('tags:magic_cable.port_positive.Y') || analysis.block.offset(Vector.CONSTANT_DOWN)?.hasTag('tags:magic_cable.logic_positive.Y')) ?? false);
        TrySetPermutation(analysis.block, 'STATE:direction_positive.Z', (analysis.block.offset(Vector.CONSTANT_SOUTH)?.hasTag('tags:magic_cable.port_negative.Z') || analysis.block.offset(Vector.CONSTANT_SOUTH)?.hasTag('tags:magic_cable.logic_negative.Z')) ?? false);
        TrySetPermutation(analysis.block, 'STATE:direction_negative.Z', (analysis.block.offset(Vector.CONSTANT_NORTH)?.hasTag('tags:magic_cable.port_positive.Z') || analysis.block.offset(Vector.CONSTANT_NORTH)?.hasTag('tags:magic_cable.logic_positive.Z')) ?? false);
    }
});
/*
 * 超导枢纽
 */
components$a.set(componentPrefix$8 + 'super_omphalos', {
    onTick(source) {
        /**
         * * 方块组件参数 的 解构
         */
        const analysis = TickComponentTrigger(source);
        // 判断方块的元素类型状态
        if (analysis.condition != 0 && analysis.condition != 9)
            superOmphalos(analysis.block, analysis.state);
        // 重置方块元素类型
        else if (analysis.condition == 9)
            TrySetPermutation(analysis.block, 'STATE:rune_type', 0);
    }
});
/*
 * 超导髓鞘
 */
components$a.set(componentPrefix$8 + 'super_pulse', {
    onTick(source) {
        /**
         * * 方块组件参数 的 解构
         */
        const { condition, block, dimension, state } = TickComponentTrigger(source);
        // 判断方块的元素类型状态
        if (condition != 0 && condition != 9) {
            /**
             * * 修改 目标方块状态 并 返回 射线动画 的 终点
             */
            const done = superPulse(block, state.getState('minecraft:block_face'));
            // 创建自由指针
            if (done && done?.isValid)
                SetFreePointer({ location: block.bottomCenter(), dimension }, done.bottomCenter(), 0.5);
        }
        // 重置方块元素类型
        else if (condition == 9)
            TrySetPermutation(block, 'STATE:rune_type', 0);
    }
});
/*
 * 传播许可
 */
components$a.set(componentPrefix$8 + 'enable_control', {
    onTick(source) {
        /**
         * * 方块组件参数 的 解构
         */
        const analysis = TickComponentTrigger(source);
        // 判断方块的元素类型状态
        if (analysis.condition != 0 && analysis.condition != 9) {
            /**
             ** 上方方块
             */
            const above = analysis.block.above();
            /**
             ** 下方方块
             */
            const below = analysis.block.below();
            /**
             ** 方块标签
             */
            const tag = 'tags:magic_cable.open';
            // 检测 脉冲锁存 是否开启
            if (above?.hasTag(tag) || below?.hasTag(tag)) {
                defaultEvent(analysis.block, 'Xx-0-Zz', analysis.state);
                TrySetPermutation(analysis.block, 'STATE:stage', 1);
            }
            else if (!above?.hasTag(tag) && !below?.hasTag(tag)) {
                TrySetPermutation(analysis.block, 'STATE:stage', 0);
                TrySetPermutation(analysis.block, 'STATE:rune_type', 0);
            }
        }
        // 重置方块元素类型
        else if (analysis.condition == 9)
            TrySetPermutation(analysis.block, 'STATE:rune_type', 0);
    }
});
/*
 * 红石侦测
 */
components$a.set(componentPrefix$8 + 'redstone_detection', {
    onTick(source) {
        /**
         * * 方块组件参数 的 解构
         */
        const analysis = TickComponentTrigger(source);
        // 判断方块的红石能量强度
        redstoneDetection(analysis.block, 'Xx-0-Zz');
    }
});
/*
 * 计数模块
 */
components$a.set(componentPrefix$8 + 'counting_module', {
    onTick(source) {
        /**
         * * 方块组件参数 的 解构
         */
        const analysis = TickComponentTrigger(source);
        /**
         * * 方块前处理事件
         */
        function beforeEvent() {
            TrySetPermutation(analysis.block, 'STATE:rune_type', 0);
            TrySetPermutation(analysis.block, 'STATE:count', 0);
            logicComponents(analysis.block, 'Xx-Yy-Zz');
        }
        /**
         * * 方块后处理事件
         */
        function afterEvent() {
            const count = analysis.state.getState('STATE:count');
            TrySetPermutation(analysis.block, 'STATE:rune_type', 0);
            TrySetPermutation(analysis.block, 'STATE:count', count + 1);
        }
        if (analysis.state.getState('STATE:input') == analysis.state.getState('STATE:count'))
            beforeEvent();
        else if ((analysis.state.getState('STATE:input') != analysis.state.getState('STATE:count')) && analysis.state.getState('STATE:count') != 10)
            afterEvent();
    }
});
/*
 * 交互终端
 */
components$a.set(componentPrefix$8 + 'control_panel', {
    onTick(source) {
        /**
         * * 方块组件参数 的 解构
         */
        const analysis = TickComponentTrigger(source);
        /**
         * * 方块前处理事件
         */
        function beforeEvent() {
            switch (analysis.state.getState('minecraft:block_face')) {
                case 'down':
                    interactiveTerminal(analysis.block, 'Xx-Y-Zz', analysis.state);
                    break;
                case 'up':
                    interactiveTerminal(analysis.block, 'Xx-y-Zz', analysis.state);
                    break;
                case 'north':
                    interactiveTerminal(analysis.block, 'Xx-Yy-Z', analysis.state);
                    break;
                case 'south':
                    interactiveTerminal(analysis.block, 'Xx-Yy-z', analysis.state);
                    break;
                case 'west':
                    interactiveTerminal(analysis.block, 'X-Yy-Zz', analysis.state);
                    break;
                case 'east':
                    interactiveTerminal(analysis.block, 'x-Yy-Zz', analysis.state);
                    break;
            }
            TrySetPermutation(analysis.block, 'STATE:stage', 2);
        }
        /**
         * * 方块后处理事件
         */
        function afterEvent() {
            TrySetPermutation(analysis.block, 'STATE:stage', 0);
        }
        if (analysis.state.getState('STATE:stage') == 1)
            beforeEvent();
        else if (analysis.state.getState('STATE:stage') == 2)
            afterEvent();
    }
});
/*
 * 逻辑非门
 */
components$a.set(componentPrefix$8 + 'logic_inverter', {
    onTick(source) {
        /**
         * * 方块组件参数 的 解构
         */
        const analysis = TickComponentTrigger(source);
        /**
         ** 方块状态值
         */
        const face = analysis.state.getState('minecraft:block_face');
        /**
         ** 方块标签
         */
        const tag = 'tags:magic_cable.open';
        // 判断设备朝向
        switch (face) {
            case 'up':
                if (!analysis.block.offset(Vector.CONSTANT_UP)?.hasTag(tag))
                    logicComponents(analysis.block, '0-y-0');
                break;
            case 'down':
                if (!analysis.block.offset(Vector.CONSTANT_DOWN)?.hasTag(tag))
                    logicComponents(analysis.block, '0-Y-0');
                break;
            case 'north':
                if (!analysis.block.offset(Vector.CONSTANT_NORTH)?.hasTag(tag))
                    logicComponents(analysis.block, '0-0-Z');
                break;
            case 'south':
                if (!analysis.block.offset(Vector.CONSTANT_SOUTH)?.hasTag(tag))
                    logicComponents(analysis.block, '0-0-z');
                break;
            case 'east':
                if (!analysis.block.offset(Vector.CONSTANT_EAST)?.hasTag(tag))
                    logicComponents(analysis.block, 'x-0-0');
                break;
            case 'west':
                if (!analysis.block.offset(Vector.CONSTANT_WEST)?.hasTag(tag))
                    logicComponents(analysis.block, 'X-0-0');
                break;
        }
    }
});
/*
 * 逻辑异或
 */
components$a.set(componentPrefix$8 + 'logic_exclusive_or', {
    onTick(source) {
        /**
         * * 方块组件参数 的 解构
         */
        const analysis = TickComponentTrigger(source);
        /**
         * 获取目标方块
         *
         * @param input - 方块偏移
         *
         * @returns {server.Block | undefined} - 返回方块对象
         */
        const target = (input) => analysis.block.offset(input);
        /**
         ** 方块状态值
         */
        const face = analysis.state.getState('minecraft:block_face');
        /**
         ** 方块标签
         */
        const tag = 'tags:magic_cable.open';
        // 判断设备朝向
        switch (face) {
            case 'up':
                if (target(Vector.CONSTANT_EAST)?.hasTag(tag) || target(Vector.CONSTANT_WEST)?.hasTag(tag))
                    if (target(Vector.CONSTANT_EAST)?.hasTag(tag) != target(Vector.CONSTANT_WEST)?.hasTag(tag))
                        logicComponents(analysis.block, '0-y-0');
                break;
            case 'down':
                if (target(Vector.CONSTANT_EAST)?.hasTag(tag) || target(Vector.CONSTANT_WEST)?.hasTag(tag))
                    if (target(Vector.CONSTANT_EAST)?.hasTag(tag) != target(Vector.CONSTANT_WEST)?.hasTag(tag))
                        logicComponents(analysis.block, '0-Y-0');
                break;
            case 'north':
                if (target(Vector.CONSTANT_EAST)?.hasTag(tag) || target(Vector.CONSTANT_WEST)?.hasTag(tag))
                    if (target(Vector.CONSTANT_EAST)?.hasTag(tag) != target(Vector.CONSTANT_WEST)?.hasTag(tag))
                        logicComponents(analysis.block, '0-0-Z');
                break;
            case 'south':
                if (target(Vector.CONSTANT_EAST)?.hasTag(tag) || target(Vector.CONSTANT_WEST)?.hasTag(tag))
                    if (target(Vector.CONSTANT_EAST)?.hasTag(tag) != target(Vector.CONSTANT_WEST)?.hasTag(tag))
                        logicComponents(analysis.block, '0-0-z');
                break;
            case 'east':
                if (target(Vector.CONSTANT_SOUTH)?.hasTag(tag) || target(Vector.CONSTANT_NORTH)?.hasTag(tag))
                    if (target(Vector.CONSTANT_SOUTH)?.hasTag(tag) != target(Vector.CONSTANT_NORTH)?.hasTag(tag))
                        logicComponents(analysis.block, 'x-0-0');
                break;
            case 'west':
                if (target(Vector.CONSTANT_SOUTH)?.hasTag(tag) || target(Vector.CONSTANT_NORTH)?.hasTag(tag))
                    if (target(Vector.CONSTANT_SOUTH)?.hasTag(tag) != target(Vector.CONSTANT_NORTH)?.hasTag(tag))
                        logicComponents(analysis.block, 'X-0-0');
                break;
        }
        // 状态重置
        TrySetPermutation(analysis.block, 'STATE:stage', 0);
    }
});
/*
 * 逻辑与门
 */
components$a.set(componentPrefix$8 + 'logic_and_gate', {
    onTick(source) {
        /**
         * * 方块组件参数 的 解构
         */
        const analysis = TickComponentTrigger(source);
        /**
         * 获取目标方块
         *
         * @param input - 方块偏移
         *
         * @returns {server.Block | undefined} - 返回方块对象
         */
        const target = (input) => analysis.block.offset(input);
        /**
         ** 方块状态值
         */
        const face = analysis.state.getState('minecraft:block_face');
        /**
         ** 方块标签
         */
        const tag = 'tags:magic_cable.open';
        // 判断方块状态
        switch (face) {
            case 'up':
                if (target(Vector.CONSTANT_EAST)?.hasTag(tag) && target(Vector.CONSTANT_WEST)?.hasTag(tag))
                    logicComponents(analysis.block, '0-y-0');
                break;
            case 'down':
                if (target(Vector.CONSTANT_EAST)?.hasTag(tag) && target(Vector.CONSTANT_WEST)?.hasTag(tag))
                    logicComponents(analysis.block, '0-Y-0');
                break;
            case 'north':
                if (target(Vector.CONSTANT_EAST)?.hasTag(tag) && target(Vector.CONSTANT_WEST)?.hasTag(tag))
                    logicComponents(analysis.block, '0-0-Z');
                break;
            case 'south':
                if (target(Vector.CONSTANT_EAST)?.hasTag(tag) && target(Vector.CONSTANT_WEST)?.hasTag(tag))
                    logicComponents(analysis.block, '0-0-z');
                break;
            case 'east':
                if (target(Vector.CONSTANT_SOUTH)?.hasTag(tag) && target(Vector.CONSTANT_NORTH)?.hasTag(tag))
                    logicComponents(analysis.block, 'x-0-0');
                break;
            case 'west':
                if (target(Vector.CONSTANT_SOUTH)?.hasTag(tag) && target(Vector.CONSTANT_NORTH)?.hasTag(tag))
                    logicComponents(analysis.block, 'X-0-0');
                break;
        }
        // 状态重置
        TrySetPermutation(analysis.block, 'STATE:stage', 0);
    }
});
/*
 * 校准型-逻辑非门
 */
components$a.set(componentPrefix$8 + 'correct_logic_not', correctLogicNot());
function correctLogicNot() {
    /**
     * 控制 魔导总线-脉冲锁存 的状态
     *
     * 该函数通过调整 魔导总线方块 的 数据标签 来改变其状态
     *
     * @param {server.Block} block 魔导总线方块对象, 代表需要控制状态的逻辑元件方块
     *
     * @param {server.Vector3}  offset 偏移量向量, 用于计算状态调整的目标位置
     *
     * @param {number} state -目标更新的状态值, 用于设置脉冲锁存 的状态
     */
    function controlState(block, offset, state) {
        /**
         * 创建 Molang 变量映射对象
         */
        const molang = new server.MolangVariableMap();
        /**
         * 获取当前方块的锁存控制位状态
         */
        const control = block.offset(offset)?.hasTag('tags:magic_cable.open') ?? false;
        // 遍历 1 到 15 之间的所有可能的指标位置
        for (let index = 1; index < 16; index++) {
            /**
             * 根据当前指标计算目标位置
             */
            const indicator = Vector.multiply(offset, -index);
            /**
             * 获取相对位置的方块对象
             */
            const target = block.offset(indicator);
            // 跳过无效位置
            if (!target)
                continue;
            // 尝试设置粒子参数
            molang.setColorRGB('variable.color', [...rune_color][state - 1][1]);
            // 尝试生成粒子
            TrySpawnParticle(target.dimension, 'scripts:color_trajectory', target.center(), molang);
            // 如果目标位置不是脉冲锁存器, 则跳过当前循环
            if (!target.hasTag('tags:magic_cable.latch'))
                continue;
            // 尝试设置目标位置的方块状态值
            TrySetPermutation(target, 'STATE:rune_note', !control ? state : 0);
            // 判断锁存器激活事件是否完成冷却
            if (!TriggerControl('锁存器激活事件', target, 10))
                return;
            // 更新锁存器事件
            LatchUpdateEvent(target);
            // 设置完成后, 跳出循环
            break;
        }
    }
    return {
        onTick(source) {
            /**
             * * 方块组件参数 的 解构
             */
            const analysis = TickComponentTrigger(source);
            /**
             * * 方块状态值
             */
            const face = analysis.state.getState('minecraft:block_face');
            /**
             * * 方块的色彩状态值
             */
            const color = analysis.state.getState('STATE:color');
            // 判断设备朝向
            switch (face) {
                case 'up':
                    controlState(analysis.block, Vector.CONSTANT_UP, color);
                    break;
                case 'down':
                    controlState(analysis.block, Vector.CONSTANT_DOWN, color);
                    break;
                case 'north':
                    controlState(analysis.block, Vector.CONSTANT_NORTH, color);
                    break;
                case 'south':
                    controlState(analysis.block, Vector.CONSTANT_SOUTH, color);
                    break;
                case 'east':
                    controlState(analysis.block, Vector.CONSTANT_EAST, color);
                    break;
                case 'west':
                    controlState(analysis.block, Vector.CONSTANT_WEST, color);
                    break;
            }
        }
    };
}
/*
 * 校准型-逻辑与门
 */
components$a.set(componentPrefix$8 + 'correct_logic_and', correctLogicAnd());
function correctLogicAnd() {
    /**
     * 控制 魔导总线-脉冲锁存 的状态
     *
     * 该函数通过调整 魔导总线方块 的 数据标签 来改变其状态
     *
     * @param {server.Block} block 魔导总线方块对象, 代表需要控制状态的逻辑元件方块
     *
     * @param {server.Vector3}  offset 偏移量向量, 用于计算状态调整的目标位置
     *
     * @param {[server.Vector3, server.Vector3]} port - 端口向量, 用于判断目标方块的激活状态
     *
     * @param {number} state -目标更新的状态值, 用于设置脉冲锁存 的状态
     */
    function controlState(block, offset, port, state) {
        /**
         * 创建 Molang 变量映射对象
         */
        const molang = new server.MolangVariableMap();
        /**
         * 判断目标方块的激活状态
         *
         * @param input - 方块偏移
         *
         * @returns {boolean} - 目标方块的激活状态
         */
        const checkTarget = (input) => block.offset(input)?.hasTag('tags:magic_cable.open') ?? false;
        // 遍历 1 到 15 之间的所有可能的指标位置
        for (let index = 1; index < 16; index++) {
            /**
             * 根据当前指标计算目标位置
             */
            const indicator = Vector.multiply(offset, index);
            /**
             * 获取相对位置的方块对象
             */
            const target = block.offset(indicator);
            // 跳过无效位置
            if (!target)
                continue;
            // 尝试设置粒子参数
            molang.setColorRGB('variable.color', [...rune_color][state - 1][1]);
            // 尝试生成粒子
            TrySpawnParticle(target.dimension, 'scripts:color_trajectory', target.center(), molang);
            // 如果目标位置不是脉冲锁存器, 则跳过当前循环
            if (!target.hasTag('tags:magic_cable.latch'))
                continue;
            // 尝试设置目标位置的方块状态值
            TrySetPermutation(target, 'STATE:rune_note', checkTarget(port[0]) == checkTarget(port[1]) && checkTarget(port[0]) ? state : 0);
            // 判断锁存器激活事件是否完成冷却
            if (!TriggerControl('锁存器激活事件', target, 10))
                return;
            // 更新锁存器事件
            LatchUpdateEvent(target);
            // 设置完成后, 跳出循环
            break;
        }
    }
    return {
        onTick(source) {
            /**
             * * 方块组件参数 的 解构
             */
            const analysis = TickComponentTrigger(source);
            /**
             ** 方块状态值
             */
            const face = analysis.state.getState('minecraft:block_face');
            /**
             * * 方块的色彩状态值
             */
            const color = analysis.state.getState('STATE:color');
            // 判断设备朝向
            switch (face) {
                case 'up':
                    controlState(analysis.block, Vector.CONSTANT_DOWN, [Vector.CONSTANT_EAST, Vector.CONSTANT_WEST], color);
                    break;
                case 'down':
                    controlState(analysis.block, Vector.CONSTANT_UP, [Vector.CONSTANT_EAST, Vector.CONSTANT_WEST], color);
                    break;
                case 'north':
                    controlState(analysis.block, Vector.CONSTANT_SOUTH, [Vector.CONSTANT_EAST, Vector.CONSTANT_WEST], color);
                    break;
                case 'south':
                    controlState(analysis.block, Vector.CONSTANT_NORTH, [Vector.CONSTANT_EAST, Vector.CONSTANT_WEST], color);
                    break;
                case 'east':
                    controlState(analysis.block, Vector.CONSTANT_WEST, [Vector.CONSTANT_SOUTH, Vector.CONSTANT_NORTH], color);
                    break;
                case 'west':
                    controlState(analysis.block, Vector.CONSTANT_EAST, [Vector.CONSTANT_SOUTH, Vector.CONSTANT_NORTH], color);
                    break;
            }
        }
    };
}
/*
 * 校准型-逻辑与非
 */
components$a.set(componentPrefix$8 + 'correct_logic_nand', correctLogicNand());
function correctLogicNand() {
    /**
     * 控制 魔导总线-脉冲锁存 的状态
     *
     * 该函数通过调整 魔导总线方块 的 数据标签 来改变其状态
     *
     * @param {server.Block} block 魔导总线方块对象, 代表需要控制状态的逻辑元件方块
     *
     * @param {server.Vector3}  offset 偏移量向量, 用于计算状态调整的目标位置
     *
     * @param {[server.Vector3, server.Vector3]} port - 端口向量, 用于判断目标方块的激活状态
     *
     * @param {number} state -目标更新的状态值, 用于设置脉冲锁存 的状态
     */
    function controlState(block, offset, port, state) {
        /**
         * 创建 Molang 变量映射对象
         */
        const molang = new server.MolangVariableMap();
        /**
         * 判断目标方块的激活状态
         *
         * @param input - 方块偏移
         *
         * @returns {boolean} - 目标方块的激活状态
         */
        const checkTarget = (input) => block.offset(input)?.hasTag('tags:magic_cable.open') ?? false;
        // 遍历 1 到 15 之间的所有可能的指标位置
        for (let index = 1; index < 16; index++) {
            /**
             * 根据当前指标计算目标位置
             */
            const indicator = Vector.multiply(offset, index);
            /**
             * 获取相对位置的方块对象
             */
            const target = block.offset(indicator);
            // 跳过无效位置
            if (!target)
                continue;
            // 尝试设置粒子参数
            molang.setColorRGB('variable.color', [...rune_color][state - 1][1]);
            // 尝试生成粒子
            TrySpawnParticle(target.dimension, 'scripts:color_trajectory', target.center(), molang);
            // 如果目标位置不是脉冲锁存器, 则跳过当前循环
            if (!target.hasTag('tags:magic_cable.latch'))
                continue;
            // 尝试设置目标位置的方块状态值
            TrySetPermutation(target, 'STATE:rune_note', checkTarget(port[0]) == checkTarget(port[1]) && checkTarget(port[0]) ? 0 : state);
            // 判断锁存器激活事件是否完成冷却
            if (!TriggerControl('锁存器激活事件', target, 10))
                return;
            // 更新锁存器事件
            LatchUpdateEvent(target);
            // 设置完成后, 跳出循环
            break;
        }
    }
    return {
        onTick(source) {
            /**
             * * 方块组件参数 的 解构
             */
            const analysis = TickComponentTrigger(source);
            /**
             ** 方块状态值
             */
            const face = analysis.state.getState('minecraft:block_face');
            /**
             * * 方块的色彩状态值
             */
            const color = analysis.state.getState('STATE:color');
            // 判断设备朝向
            switch (face) {
                case 'up':
                    controlState(analysis.block, Vector.CONSTANT_DOWN, [Vector.CONSTANT_EAST, Vector.CONSTANT_WEST], color);
                    break;
                case 'down':
                    controlState(analysis.block, Vector.CONSTANT_UP, [Vector.CONSTANT_EAST, Vector.CONSTANT_WEST], color);
                    break;
                case 'north':
                    controlState(analysis.block, Vector.CONSTANT_SOUTH, [Vector.CONSTANT_EAST, Vector.CONSTANT_WEST], color);
                    break;
                case 'south':
                    controlState(analysis.block, Vector.CONSTANT_NORTH, [Vector.CONSTANT_EAST, Vector.CONSTANT_WEST], color);
                    break;
                case 'east':
                    controlState(analysis.block, Vector.CONSTANT_WEST, [Vector.CONSTANT_SOUTH, Vector.CONSTANT_NORTH], color);
                    break;
                case 'west':
                    controlState(analysis.block, Vector.CONSTANT_EAST, [Vector.CONSTANT_SOUTH, Vector.CONSTANT_NORTH], color);
                    break;
            }
        }
    };
}
/*
 * 校准型-逻辑异或
 */
components$a.set(componentPrefix$8 + 'correct_logic_xor', correctLogicXor());
function correctLogicXor() {
    /**
     * 控制 魔导总线-脉冲锁存 的状态
     *
     * 该函数通过调整 魔导总线方块 的 数据标签 来改变其状态
     *
     * @param {server.Block} block 魔导总线方块对象, 代表需要控制状态的逻辑元件方块
     *
     * @param {server.Vector3}  offset 偏移量向量, 用于计算状态调整的目标位置
     *
     * @param {[server.Vector3, server.Vector3]} port - 端口向量, 用于判断目标方块的激活状态
     *
     * @param {number} state -目标更新的状态值, 用于设置脉冲锁存 的状态
     */
    function controlState(block, offset, port, state) {
        /**
         * 创建 Molang 变量映射对象
         */
        const molang = new server.MolangVariableMap();
        /**
         * 判断目标方块的激活状态
         *
         * @param input - 方块偏移
         *
         * @returns {boolean} - 目标方块的激活状态
         */
        const checkTarget = (input) => block.offset(input)?.hasTag('tags:magic_cable.open') ?? false;
        // 遍历 1 到 15 之间的所有可能的指标位置
        for (let index = 1; index < 16; index++) {
            /**
             * 根据当前指标计算目标位置
             */
            const indicator = Vector.multiply(offset, index);
            /**
             * 获取相对位置的方块对象
             */
            const target = block.offset(indicator);
            // 跳过无效位置
            if (!target)
                continue;
            // 尝试设置粒子参数
            molang.setColorRGB('variable.color', [...rune_color][state - 1][1]);
            // 尝试生成粒子
            TrySpawnParticle(target.dimension, 'scripts:color_trajectory', target.center(), molang);
            // 如果目标位置不是脉冲锁存器, 则跳过当前循环
            if (!target.hasTag('tags:magic_cable.latch'))
                continue;
            // 尝试设置目标位置的方块状态值
            TrySetPermutation(target, 'STATE:rune_note', checkTarget(port[0]) != checkTarget(port[1]) ? state : 0);
            // 判断锁存器激活事件是否完成冷却
            if (!TriggerControl('锁存器激活事件', target, 10))
                return;
            // 更新锁存器事件
            LatchUpdateEvent(target);
            // 设置完成后, 跳出循环
            break;
        }
    }
    return {
        onTick(source) {
            /**
             * * 方块组件参数 的 解构
             */
            const analysis = TickComponentTrigger(source);
            /**
             ** 方块状态值
             */
            const face = analysis.state.getState('minecraft:block_face');
            /**
             * * 方块的色彩状态值
             */
            const color = analysis.state.getState('STATE:color');
            // 判断设备朝向
            switch (face) {
                case 'up':
                    controlState(analysis.block, Vector.CONSTANT_DOWN, [Vector.CONSTANT_EAST, Vector.CONSTANT_WEST], color);
                    break;
                case 'down':
                    controlState(analysis.block, Vector.CONSTANT_UP, [Vector.CONSTANT_EAST, Vector.CONSTANT_WEST], color);
                    break;
                case 'north':
                    controlState(analysis.block, Vector.CONSTANT_SOUTH, [Vector.CONSTANT_EAST, Vector.CONSTANT_WEST], color);
                    break;
                case 'south':
                    controlState(analysis.block, Vector.CONSTANT_NORTH, [Vector.CONSTANT_EAST, Vector.CONSTANT_WEST], color);
                    break;
                case 'east':
                    controlState(analysis.block, Vector.CONSTANT_WEST, [Vector.CONSTANT_SOUTH, Vector.CONSTANT_NORTH], color);
                    break;
                case 'west':
                    controlState(analysis.block, Vector.CONSTANT_EAST, [Vector.CONSTANT_SOUTH, Vector.CONSTANT_NORTH], color);
                    break;
            }
        }
    };
}
/*
 * 校准型-逻辑或非
 */
components$a.set(componentPrefix$8 + 'correct_logic_nor', correctLogicNor());
function correctLogicNor() {
    /**
     * 控制 魔导总线-脉冲锁存 的状态
     *
     * 该函数通过调整 魔导总线方块 的 数据标签 来改变其状态
     *
     * @param {server.Block} block 魔导总线方块对象, 代表需要控制状态的逻辑元件方块
     *
     * @param {server.Vector3}  offset 偏移量向量, 用于计算状态调整的目标位置
     *
     * @param {[server.Vector3, server.Vector3]} port - 端口向量, 用于判断目标方块的激活状态
     *
     * @param {number} state -目标更新的状态值, 用于设置脉冲锁存 的状态
     */
    function controlState(block, offset, port, state) {
        /**
         * 创建 Molang 变量映射对象
         */
        const molang = new server.MolangVariableMap();
        /**
         * 判断目标方块的激活状态
         *
         * @param input - 方块偏移
         *
         * @returns {boolean} - 目标方块的激活状态
         */
        const checkTarget = (input) => block.offset(input)?.hasTag('tags:magic_cable.open') ?? false;
        // 遍历 1 到 15 之间的所有可能的指标位置
        for (let index = 1; index < 16; index++) {
            /**
             * 根据当前指标计算目标位置
             */
            const indicator = Vector.multiply(offset, index);
            /**
             * 获取相对位置的方块对象
             */
            const target = block.offset(indicator);
            // 跳过无效位置
            if (!target)
                continue;
            // 尝试设置粒子参数
            molang.setColorRGB('variable.color', [...rune_color][state - 1][1]);
            // 尝试生成粒子
            TrySpawnParticle(target.dimension, 'scripts:color_trajectory', target.center(), molang);
            // 如果目标位置不是脉冲锁存器, 则跳过当前循环
            if (!target.hasTag('tags:magic_cable.latch'))
                continue;
            // 尝试设置目标位置的方块状态值
            TrySetPermutation(target, 'STATE:rune_note', checkTarget(port[0]) || checkTarget(port[1]) ? 0 : state);
            // 判断锁存器激活事件是否完成冷却
            if (!TriggerControl('锁存器激活事件', target, 10))
                return;
            // 更新锁存器事件
            LatchUpdateEvent(target);
            // 设置完成后, 跳出循环
            break;
        }
    }
    return {
        onTick(source) {
            /**
             * * 方块组件参数 的 解构
             */
            const analysis = TickComponentTrigger(source);
            /**
             ** 方块状态值
             */
            const face = analysis.state.getState('minecraft:block_face');
            /**
             * * 方块的色彩状态值
             */
            const color = analysis.state.getState('STATE:color');
            // 判断设备朝向
            switch (face) {
                case 'up':
                    controlState(analysis.block, Vector.CONSTANT_DOWN, [Vector.CONSTANT_EAST, Vector.CONSTANT_WEST], color);
                    break;
                case 'down':
                    controlState(analysis.block, Vector.CONSTANT_UP, [Vector.CONSTANT_EAST, Vector.CONSTANT_WEST], color);
                    break;
                case 'north':
                    controlState(analysis.block, Vector.CONSTANT_SOUTH, [Vector.CONSTANT_EAST, Vector.CONSTANT_WEST], color);
                    break;
                case 'south':
                    controlState(analysis.block, Vector.CONSTANT_NORTH, [Vector.CONSTANT_EAST, Vector.CONSTANT_WEST], color);
                    break;
                case 'east':
                    controlState(analysis.block, Vector.CONSTANT_WEST, [Vector.CONSTANT_SOUTH, Vector.CONSTANT_NORTH], color);
                    break;
                case 'west':
                    controlState(analysis.block, Vector.CONSTANT_EAST, [Vector.CONSTANT_SOUTH, Vector.CONSTANT_NORTH], color);
                    break;
            }
        }
    };
}
/*
 * 校准型-偏转棱镜
 */
components$a.set(componentPrefix$8 + 'correct_deflection_prism', correctDeflectionPrism());
function correctDeflectionPrism() {
    /**
     * 控制 魔导总线-脉冲锁存 的状态
     *
     * 该函数通过调整 魔导总线方块 的 数据标签 来改变其状态
     *
     * @param {server.Block} block 魔导总线方块对象, 代表需要控制状态的逻辑元件方块
     *
     * @param {server.Vector3}  offset 偏移量向量, 用于计算状态调整的目标位置
     *
     * @param {number} state -目标更新的状态值, 用于设置脉冲锁存 的状态
     */
    function controlState(block, offset, state) {
        /**
         * 创建 Molang 变量映射对象
         */
        const molang = new server.MolangVariableMap();
        /**
         * 获取当前方块的锁存控制位状态
         */
        const control = block.hasTag('tags:magic_cable.open') ?? false;
        // 遍历 1 到 15 之间的所有可能的指标位置
        for (let index = 1; index < 16; index++) {
            /**
             * 根据当前指标计算目标位置
             */
            const indicator = Vector.multiply(offset, -index);
            /**
             * 获取相对位置的方块对象
             */
            const target = block.offset(indicator);
            // 跳过无效位置
            if (!target)
                continue;
            // 尝试设置粒子参数
            molang.setColorRGB('variable.color', [...rune_color][state - 1][1]);
            // 尝试生成粒子
            TrySpawnParticle(target.dimension, 'scripts:color_trajectory', target.center(), molang);
            // 如果目标位置不是脉冲锁存器, 则跳过当前循环
            if (!target.hasTag('tags:magic_cable.latch'))
                continue;
            // 尝试设置目标位置的方块状态值
            TrySetPermutation(target, 'STATE:rune_note', control ? state : 0);
            // 判断锁存器激活事件是否完成冷却
            if (!TriggerControl('锁存器激活事件', target, 10))
                return;
            // 更新锁存器事件
            LatchUpdateEvent(target);
            // 设置完成后, 跳出循环
            break;
        }
    }
    return {
        onTick(source) {
            /**
             * * 方块组件参数 的 解构
             */
            const analysis = TickComponentTrigger(source);
            /**
             ** 方块状态值
             */
            const face = analysis.state.getState('minecraft:block_face');
            /**
             * * 方块的色彩状态值
             */
            const color = analysis.state.getState('STATE:color');
            // 判断设备朝向
            switch (face) {
                case 'up':
                    controlState(analysis.block, Vector.CONSTANT_UP, color);
                    break;
                case 'down':
                    controlState(analysis.block, Vector.CONSTANT_DOWN, color);
                    break;
                case 'north':
                    controlState(analysis.block, Vector.CONSTANT_NORTH, color);
                    break;
                case 'south':
                    controlState(analysis.block, Vector.CONSTANT_SOUTH, color);
                    break;
                case 'east':
                    controlState(analysis.block, Vector.CONSTANT_EAST, color);
                    break;
                case 'west':
                    controlState(analysis.block, Vector.CONSTANT_WEST, color);
                    break;
            }
        }
    };
}
/*
 * 校准型-分光棱镜
 */
components$a.set(componentPrefix$8 + 'correct_spectral_prism', correctSpectralPrism());
function correctSpectralPrism() {
    /**
     * 控制 魔导总线-脉冲锁存 的状态
     *
     * 该函数通过调整 魔导总线方块 的 数据标签 来改变其状态
     *
     * @param {server.Block} block 魔导总线方块对象, 代表需要控制状态的逻辑元件方块
     *
     * @param {server.Vector3}  offset 偏移量向量, 用于计算状态调整的目标位置
     *
     * @param {number} state -目标更新的状态值, 用于设置脉冲锁存 的状态
     */
    function controlState(block, offset, state) {
        /**
         * 创建 Molang 变量映射对象
         */
        const molang = new server.MolangVariableMap();
        /**
         * 获取当前方块的锁存控制位状态
         */
        const control = block.hasTag('tags:magic_cable.open') ?? false;
        // 遍历 1 到 15 之间的所有可能的指标位置
        for (let index = 1; index < 16; index++) {
            /**
             * 根据当前指标计算目标位置
             */
            const indicator = Vector.multiply(offset, -index);
            /**
             * 获取相对位置的方块对象
             */
            const target = block.offset(indicator);
            // 跳过无效位置
            if (!target)
                continue;
            // 尝试设置粒子参数
            molang.setColorRGB('variable.color', [...rune_color][state - 1][1]);
            // 尝试生成粒子
            TrySpawnParticle(target.dimension, 'scripts:color_trajectory', target.center(), molang);
            // 如果目标位置不是脉冲锁存器, 则跳过当前循环
            if (!target.hasTag('tags:magic_cable.latch'))
                continue;
            // 尝试设置目标位置的方块状态值
            TrySetPermutation(target, 'STATE:rune_note', control ? state : 0);
            // 判断锁存器激活事件是否完成冷却
            if (!TriggerControl('锁存器激活事件', target, 10))
                break;
            // 更新锁存器事件
            LatchUpdateEvent(target);
            // 设置完成后, 跳出循环
            break;
        }
        for (let index = 1; index < 16; index++) {
            /**
             * 根据当前指标计算目标位置
             */
            const indicator = Vector.multiply(offset, index);
            /**
             * 获取相对位置的方块对象
             */
            const target = block.offset(indicator);
            // 跳过无效位置
            if (!target)
                continue;
            // 尝试设置粒子参数
            molang.setColorRGB('variable.color', [...rune_color][state - 1][1]);
            // 尝试生成粒子
            TrySpawnParticle(target.dimension, 'scripts:color_trajectory', target.center(), molang);
            // 如果目标位置不是脉冲锁存器, 则跳过当前循环
            if (!target.hasTag('tags:magic_cable.latch'))
                continue;
            // 尝试设置目标位置的方块状态值
            TrySetPermutation(target, 'STATE:rune_note', control ? state : 0);
            // 判断锁存器激活事件是否完成冷却
            if (!TriggerControl('锁存器激活事件', target, 10))
                break;
            // 更新锁存器事件
            LatchUpdateEvent(target);
            // 设置完成后, 跳出循环
            break;
        }
    }
    return {
        onTick(source) {
            /**
             * * 方块组件参数 的 解构
             */
            const analysis = TickComponentTrigger(source);
            /**
             ** 方块状态值
             */
            const face = analysis.state.getState('minecraft:block_face');
            /**
             * * 方块的色彩状态值
             */
            const color = analysis.state.getState('STATE:color');
            // 判断设备朝向
            switch (face) {
                case 'up':
                    controlState(analysis.block, Vector.CONSTANT_UP, color);
                    break;
                case 'down':
                    controlState(analysis.block, Vector.CONSTANT_DOWN, color);
                    break;
                case 'north':
                    controlState(analysis.block, Vector.CONSTANT_NORTH, color);
                    break;
                case 'south':
                    controlState(analysis.block, Vector.CONSTANT_SOUTH, color);
                    break;
                case 'east':
                    controlState(analysis.block, Vector.CONSTANT_EAST, color);
                    break;
                case 'west':
                    controlState(analysis.block, Vector.CONSTANT_WEST, color);
                    break;
            }
        }
    };
}
/*
 * 信号编译
 */
components$a.set(componentPrefix$8 + 'signal_compilation', {
    onTick(source) {
        /**
         * * 方块组件参数 的 解构
         */
        const analysis = TickComponentTrigger(source);
        /**
         * * 方块前处理事件
         */
        function beforeEvent() {
            signalCompilation(analysis.block, 'Xx-0-Zz', analysis.state);
        }
        /**
         * * 方块后处理事件
         */
        function afterEvent() {
            TrySetPermutation(analysis.block, 'STATE:rune_type', 0);
            TrySetPermutation(analysis.block, 'STATE:stage', 0);
            TrySetPermutation(analysis.block, 'STATE:index', 0);
        }
        if (analysis.state.getState('STATE:stage') == 0 && analysis.state.getState('STATE:rune_type') != 0) {
            TrySetPermutation(analysis.block, 'STATE:rune_type', 0);
            TrySetPermutation(analysis.block, 'STATE:stage', 1);
        }
        else if (analysis.state.getState('STATE:stage') == 1)
            beforeEvent();
        else if (analysis.state.getState('STATE:stage') == 2)
            afterEvent();
    }
});
/*
 * 信号过滤
 */
components$a.set(componentPrefix$8 + 'signal_filtering', {
    onTick(source) {
        /**
         * * 方块组件参数 的 解构
         */
        const analysis = TickComponentTrigger(source);
        /**
         * * 方块前处理事件
         */
        function beforeEvent() {
            signalProcessing(analysis.block, 'Xx-Yy-Zz', analysis.state);
        }
        /**
         * * 方块后处理事件
         */
        function afterEvent() {
            TrySetPermutation(analysis.block, 'STATE:rune_type', 0);
        }
        if (analysis.condition != 0 && analysis.condition != 9 && analysis.condition == analysis.state.getState('STATE:rune_note'))
            beforeEvent();
        if (analysis.condition != 0 && analysis.condition != 9 && analysis.condition != analysis.state.getState('STATE:rune_note'))
            afterEvent();
        else if (analysis.condition == 9)
            afterEvent();
    }
});
/*
 * 信号转化
 */
components$a.set(componentPrefix$8 + 'signal_conversion', {
    onTick(source) {
        /**
         * * 方块组件参数 的 解构
         */
        const analysis = TickComponentTrigger(source);
        // 判断方块的元素类型状态
        if (analysis.condition != 0 && analysis.condition != 9)
            signalProcessing(analysis.block, 'Xx-Yy-Zz', analysis.state);
        // 重置方块元素类型
        else if (analysis.condition == 9)
            TrySetPermutation(analysis.block, 'STATE:rune_type', 0);
    }
});
/*
 * 总线端口
 */
components$a.set(componentPrefix$8 + 'bus_port', {
    onTick(source) {
        /**
         * * 方块组件参数 的 解构
         */
        const analysis = TickComponentTrigger(source);
        // 判断方块的元素类型状态
        if (analysis.condition != 0 && analysis.condition != 9) {
            /**
             ** 方块状态值
             */
            const face = analysis.state.getState('minecraft:block_face');
            switch (face) {
                case 'up':
                    defaultEvent(analysis.block, '0-Yy-0', analysis.state);
                    break;
                case 'down':
                    defaultEvent(analysis.block, '0-Yy-0', analysis.state);
                    break;
                case 'north':
                    defaultEvent(analysis.block, '0-0-Zz', analysis.state);
                    break;
                case 'south':
                    defaultEvent(analysis.block, '0-0-Zz', analysis.state);
                    break;
                case 'east':
                    defaultEvent(analysis.block, 'Xx-0-0', analysis.state);
                    break;
                case 'west':
                    defaultEvent(analysis.block, 'Xx-0-0', analysis.state);
                    break;
            }
        }
        // 重置方块元素类型
        else if (analysis.condition == 9)
            TrySetPermutation(analysis.block, 'STATE:rune_type', 0);
    }
});
/*
 * 打包投送
 */
components$a.set(componentPrefix$8 + 'package_delivery', {
    onTick(source) {
        /**
         * * 方块组件参数 的 解构
         */
        const analysis = TickComponentTrigger(source);
        /**
         ** 方块状态值
         */
        const face = analysis.state.getState('minecraft:block_face');
        // 执行功能
        Transmission(analysis.block, face);
        // 播放音效 与 粒子效果
        analysis.dimension?.playSound('beacon.deactivate', analysis.block.location);
        // 状态重置
        TrySetPermutation(analysis.block, 'STATE:rune_type', 0);
    }
});
/*
 * 方块放置
 */
components$a.set(componentPrefix$8 + 'block_placement', {
    onTick(source) {
        /**
         * * 方块组件参数 的 解构
         */
        const analysis = TickComponentTrigger(source);
        // 执行功能
        Placement(analysis.block);
        // 播放音效 与 粒子效果
        analysis.dimension?.playSound('beacon.deactivate', analysis.block.location);
        // 状态重置
        TrySetPermutation(analysis.block, 'STATE:energy', Random({ min: 0, max: 6 }, true));
        TrySetPermutation(analysis.block, 'STATE:rune_type', 0);
    }
});
/*
 * 物资收集
 */
components$a.set(componentPrefix$8 + 'material_collection', {
    onTick(source) {
        /**
         * * 方块组件参数 的 解构
         */
        const analysis = TickComponentTrigger(source);
        // 执行功能
        Collection(analysis.block, analysis.state);
        // 播放音效 与 粒子效果
        analysis.dimension?.playSound('beacon.deactivate', analysis.block.location);
        // 状态重置
        TrySetPermutation(analysis.block, 'STATE:rune_type', 0);
    }
});
/*
 * 伺服基座
 */
components$a.set(componentPrefix$8 + 'servo_drive', {
    onTick(source) {
        /**
         * * 方块组件参数 的 解构
         */
        const analysis = TickComponentTrigger(source);
        /**
         * * 方块前处理事件
         */
        function beforeEvent() {
            /**
             ** 查询方块标签
             */
            const hasTag = (offset, tag) => analysis.block.offset(offset)?.getTags().includes(tag) ?? false;
            // 使能 模块运行
            switch (analysis.condition) {
                case 1:
                    if (hasTag({ x: 1, y: -1, z: 0 }, 'tags:magic_cable.series'))
                        if (!hasTag(Vector.CONSTANT_EAST, 'tags:magic_cable.series'))
                            Susceptor(analysis.block, 'X+');
                    break;
                case 2:
                    if (hasTag({ x: -1, y: -1, z: 0 }, 'tags:magic_cable.series'))
                        if (!hasTag(Vector.CONSTANT_WEST, 'tags:magic_cable.series'))
                            Susceptor(analysis.block, 'X-');
                    break;
                case 3:
                    if (hasTag({ x: 0, y: -1, z: 1 }, 'tags:magic_cable.series'))
                        if (!hasTag(Vector.CONSTANT_SOUTH, 'tags:magic_cable.series'))
                            Susceptor(analysis.block, 'Z+');
                    break;
                case 4:
                    if (hasTag({ x: -0, y: -1, z: -1 }, 'tags:magic_cable.series'))
                        if (!hasTag(Vector.CONSTANT_NORTH, 'tags:magic_cable.series'))
                            Susceptor(analysis.block, 'Z-');
                    break;
            }
            // 同步状态
            for (let index = 0; index <= 5; index++) {
                /**
                 ** 方块标签
                 */
                const tag = 'tags:servo_machine.value.' + index;
                // 赋值 方块状态
                if (hasTag(Vector.CONSTANT_EAST, tag))
                    TrySetPermutation(analysis.block, 'STATE:value', index);
                if (hasTag(Vector.CONSTANT_WEST, tag))
                    TrySetPermutation(analysis.block, 'STATE:value', index);
                if (hasTag(Vector.CONSTANT_SOUTH, tag))
                    TrySetPermutation(analysis.block, 'STATE:value', index);
                if (hasTag(Vector.CONSTANT_NORTH, tag))
                    TrySetPermutation(analysis.block, 'STATE:value', index);
            }
            // 复位状态
            TrySetPermutation(analysis.block, 'STATE:rune_type', 0);
        }
        /**
         * * 方块后处理事件
         */
        function afterEvent() {
            /**
             ** 方块状态值
             */
            const direction = analysis.state.getState('STATE:direction');
            // 复位状态
            TrySetPermutation(analysis.block, 'STATE:direction', 0);
            // 执行 功能
            switch (direction) {
                case 1:
                    for (let index = 0; index <= 5; index++) {
                        // 校验 状态
                        if (index != analysis.state.getState('STATE:value'))
                            continue;
                        // 获取 锚点坐标
                        const anchor_0 = Vector.toString(analysis.block, { delimiter: ' ' });
                        const anchor_1 = Vector.toString(analysis.block.offset(Vector.CONSTANT_EAST), { delimiter: ' ' });
                        const anchor_2 = Vector.toString(analysis.block.offset({ x: 1, y: index, z: 0 }), { delimiter: ' ' });
                        const anchor_3 = Vector.toString(analysis.block.offset({ x: 0, y: index, z: 0 }), { delimiter: ' ' });
                        // 执行 方块命令
                        analysis.dimension.runCommand(`fill ${anchor_1} ${anchor_2} air [] destroy`);
                        analysis.dimension.runCommand(`clone ${anchor_0} ${anchor_3} ${anchor_1} replace move`);
                        analysis.dimension.runCommand(`fill ${anchor_0} ${anchor_0} air`);
                    }
                    break;
                case 2:
                    for (let index = 0; index <= 5; index++) {
                        // 校验 状态
                        if (index != analysis.state.getState('STATE:value'))
                            continue;
                        // 获取 锚点坐标
                        const anchor_0 = Vector.toString(analysis.block, { delimiter: ' ' });
                        const anchor_1 = Vector.toString(analysis.block.offset(Vector.CONSTANT_WEST), { delimiter: ' ' });
                        const anchor_2 = Vector.toString(analysis.block.offset({ x: -1, y: index, z: 0 }), { delimiter: ' ' });
                        const anchor_3 = Vector.toString(analysis.block.offset({ x: 0, y: index, z: 0 }), { delimiter: ' ' });
                        // 执行 方块命令
                        analysis.dimension.runCommand(`fill ${anchor_1} ${anchor_2} air [] destroy`);
                        analysis.dimension.runCommand(`clone ${anchor_0} ${anchor_3} ${anchor_1} replace move`);
                        analysis.dimension.runCommand(`fill ${anchor_0} ${anchor_0} air`);
                    }
                    break;
                case 3:
                    for (let index = 0; index <= 5; index++) {
                        // 校验 状态
                        if (index != analysis.state.getState('STATE:value'))
                            continue;
                        // 获取 锚点坐标
                        const anchor_0 = Vector.toString(analysis.block, { delimiter: ' ' });
                        const anchor_1 = Vector.toString(analysis.block.offset(Vector.CONSTANT_SOUTH), { delimiter: ' ' });
                        const anchor_2 = Vector.toString(analysis.block.offset({ x: 0, y: index, z: 1 }), { delimiter: ' ' });
                        const anchor_3 = Vector.toString(analysis.block.offset({ x: 0, y: index, z: 0 }), { delimiter: ' ' });
                        // 执行 方块命令
                        analysis.dimension.runCommand(`fill ${anchor_1} ${anchor_2} air [] destroy`);
                        analysis.dimension.runCommand(`clone ${anchor_0} ${anchor_3} ${anchor_1} replace move`);
                        analysis.dimension.runCommand(`fill ${anchor_0} ${anchor_0} air`);
                    }
                    break;
                case 4:
                    for (let index = 0; index <= 5; index++) {
                        // 校验 状态
                        if (index != analysis.state.getState('STATE:value'))
                            continue;
                        // 获取 锚点坐标
                        const anchor_0 = Vector.toString(analysis.block, { delimiter: ' ' });
                        const anchor_1 = Vector.toString(analysis.block.offset(Vector.CONSTANT_NORTH), { delimiter: ' ' });
                        const anchor_2 = Vector.toString(analysis.block.offset({ x: 0, y: index, z: -1 }), { delimiter: ' ' });
                        const anchor_3 = Vector.toString(analysis.block.offset({ x: 0, y: index, z: 0 }), { delimiter: ' ' });
                        // 执行 方块命令
                        analysis.dimension.runCommand(`fill ${anchor_1} ${anchor_2} air [] destroy`);
                        analysis.dimension.runCommand(`clone ${anchor_0} ${anchor_3} ${anchor_1} replace move`);
                        analysis.dimension.runCommand(`fill ${anchor_0} ${anchor_0} air`);
                    }
                    break;
            }
        }
        if (analysis.condition != 0)
            beforeEvent();
        else if (analysis.state.getState('STATE:direction') != 0)
            afterEvent();
    }
});
/*
 * 伺服牵引
 */
components$a.set(componentPrefix$8 + 'servo_traction', {
    onTick(source) {
        /**
         * * 方块组件参数 的 解构
         */
        const analysis = TickComponentTrigger(source);
        /**
         * * 方块前处理事件
         */
        function beforeEvent() {
            /**
             ** 查询方块标签
             */
            const hasTag = (offset, tag) => analysis.block.offset(offset)?.getTags().includes(tag) ?? false;
            // 使能 模块运行
            switch (analysis.condition) {
                case 1:
                    if (hasTag({ x: 1, y: 1, z: 0 }, 'tags:magic_cable.series'))
                        if (!hasTag(Vector.CONSTANT_EAST, 'tags:magic_cable.series'))
                            Susceptor(analysis.block, 'X+');
                    break;
                case 2:
                    if (hasTag({ x: -1, y: 1, z: 0 }, 'tags:magic_cable.series'))
                        if (!hasTag(Vector.CONSTANT_WEST, 'tags:magic_cable.series'))
                            Susceptor(analysis.block, 'X-');
                    break;
                case 3:
                    if (hasTag({ x: 0, y: 1, z: 1 }, 'tags:magic_cable.series'))
                        if (!hasTag(Vector.CONSTANT_SOUTH, 'tags:magic_cable.series'))
                            Susceptor(analysis.block, 'Z+');
                    break;
                case 4:
                    if (hasTag({ x: -0, y: 1, z: -1 }, 'tags:magic_cable.series'))
                        if (!hasTag(Vector.CONSTANT_NORTH, 'tags:magic_cable.series'))
                            Susceptor(analysis.block, 'Z-');
                    break;
            }
            // 同步状态
            for (let index = 0; index <= 5; index++) {
                /**
                 ** 方块标签
                 */
                const tag = 'tags:servo_machine.value.' + index;
                // 赋值 方块状态
                if (hasTag(Vector.CONSTANT_EAST, tag))
                    TrySetPermutation(analysis.block, 'STATE:value', index);
                if (hasTag(Vector.CONSTANT_WEST, tag))
                    TrySetPermutation(analysis.block, 'STATE:value', index);
                if (hasTag(Vector.CONSTANT_SOUTH, tag))
                    TrySetPermutation(analysis.block, 'STATE:value', index);
                if (hasTag(Vector.CONSTANT_NORTH, tag))
                    TrySetPermutation(analysis.block, 'STATE:value', index);
            }
            // 复位状态
            TrySetPermutation(analysis.block, 'STATE:rune_type', 0);
        }
        /**
         * * 方块后处理事件
         */
        function afterEvent() {
            /**
             ** 方块状态值
             */
            const direction = analysis.state.getState('STATE:direction');
            // 复位状态
            TrySetPermutation(analysis.block, 'STATE:direction', 0);
            // 执行 功能
            switch (direction) {
                case 1:
                    for (let index = 0; index <= 5; index++) {
                        // 校验 状态
                        if (index != analysis.state.getState('STATE:value'))
                            continue;
                        // 获取 锚点坐标
                        const anchor_0 = Vector.toString(analysis.block, { delimiter: ' ' });
                        const anchor_1 = Vector.toString(analysis.block.offset(Vector.CONSTANT_EAST), { delimiter: ' ' });
                        const anchor_2 = Vector.toString(analysis.block.offset({ x: 1, y: -index, z: 0 }), { delimiter: ' ' });
                        const anchor_3 = Vector.toString(analysis.block.offset({ x: 0, y: -index, z: 0 }), { delimiter: ' ' });
                        // 执行 方块命令
                        analysis.dimension.runCommand(`fill ${anchor_1} ${anchor_2} air [] destroy`);
                        analysis.dimension.runCommand(`clone ${anchor_0} ${anchor_3} ${anchor_2} replace move`);
                        analysis.dimension.runCommand(`fill ${anchor_0} ${anchor_0} air`);
                    }
                    break;
                case 2:
                    for (let index = 0; index <= 5; index++) {
                        // 校验 状态
                        if (index != analysis.state.getState('STATE:value'))
                            continue;
                        // 获取 锚点坐标
                        const anchor_0 = Vector.toString(analysis.block, { delimiter: ' ' });
                        const anchor_1 = Vector.toString(analysis.block.offset(Vector.CONSTANT_WEST), { delimiter: ' ' });
                        const anchor_2 = Vector.toString(analysis.block.offset({ x: -1, y: -index, z: 0 }), { delimiter: ' ' });
                        const anchor_3 = Vector.toString(analysis.block.offset({ x: 0, y: -index, z: 0 }), { delimiter: ' ' });
                        // 执行 方块命令
                        analysis.dimension.runCommand(`fill ${anchor_1} ${anchor_2} air [] destroy`);
                        analysis.dimension.runCommand(`clone ${anchor_0} ${anchor_3} ${anchor_2} replace move`);
                        analysis.dimension.runCommand(`fill ${anchor_0} ${anchor_0} air`);
                    }
                    break;
                case 3:
                    for (let index = 0; index <= 5; index++) {
                        // 校验 状态
                        if (index != analysis.state.getState('STATE:value'))
                            continue;
                        // 获取 锚点坐标
                        const anchor_0 = Vector.toString(analysis.block, { delimiter: ' ' });
                        const anchor_1 = Vector.toString(analysis.block.offset(Vector.CONSTANT_SOUTH), { delimiter: ' ' });
                        const anchor_2 = Vector.toString(analysis.block.offset({ x: 0, y: -index, z: 1 }), { delimiter: ' ' });
                        const anchor_3 = Vector.toString(analysis.block.offset({ x: 0, y: -index, z: 0 }), { delimiter: ' ' });
                        // 执行 方块命令
                        analysis.dimension.runCommand(`fill ${anchor_1} ${anchor_2} air [] destroy`);
                        analysis.dimension.runCommand(`clone ${anchor_0} ${anchor_3} ${anchor_2} replace move`);
                        analysis.dimension.runCommand(`fill ${anchor_0} ${anchor_0} air`);
                    }
                    break;
                case 4:
                    for (let index = 0; index <= 5; index++) {
                        // 校验 状态
                        if (index != analysis.state.getState('STATE:value'))
                            continue;
                        // 获取 锚点坐标
                        const anchor_0 = Vector.toString(analysis.block, { delimiter: ' ' });
                        const anchor_1 = Vector.toString(analysis.block.offset(Vector.CONSTANT_NORTH), { delimiter: ' ' });
                        const anchor_2 = Vector.toString(analysis.block.offset({ x: 0, y: -index, z: -1 }), { delimiter: ' ' });
                        const anchor_3 = Vector.toString(analysis.block.offset({ x: 0, y: -index, z: 0 }), { delimiter: ' ' });
                        // 执行 方块命令
                        analysis.dimension.runCommand(`fill ${anchor_1} ${anchor_2} air [] destroy`);
                        analysis.dimension.runCommand(`clone ${anchor_0} ${anchor_3} ${anchor_2} replace move`);
                        analysis.dimension.runCommand(`fill ${anchor_0} ${anchor_0} air`);
                    }
                    break;
            }
        }
        if (analysis.condition != 0)
            beforeEvent();
        else if (analysis.state.getState('STATE:direction') != 0)
            afterEvent();
    }
});
/*
 * 驱动核心
 */
components$a.set(componentPrefix$8 + 'servo_omphalos', {
    onTick(source) {
        /**
         * * 方块组件参数 的 解构
         */
        const analysis = TickComponentTrigger(source);
        // 播放音效 与 粒子效果
        analysis.dimension?.playSound('beacon.deactivate', analysis.block.location);
        // 状态重置
        TrySetPermutation(analysis.block, 'STATE:rune_type', 0);
        // 执行功能
        switch (analysis.condition) {
            case 1:
                servoOmphalos(analysis.block, 'X+');
                break;
            case 2:
                servoOmphalos(analysis.block, 'X-');
                break;
            case 3:
                servoOmphalos(analysis.block, 'Z+');
                break;
            case 4:
                servoOmphalos(analysis.block, 'Z-');
                break;
            case 5:
                servoOmphalos(analysis.block, 'Y+');
                break;
            case 6:
                servoOmphalos(analysis.block, 'Y-');
                break;
        }
    }
});
/*
 * 水平机关门
 */
components$a.set(componentPrefix$8 + 'horizontal_gate', {
    onTick(source) {
        /**
         * * 方块组件参数 的 解构
         */
        const analysis = TickComponentTrigger(source);
        // 播放音效 与 粒子效果
        analysis.dimension?.playSound('close.iron_door', analysis.block.location);
        // 状态更改
        TrySetPermutation(analysis.block, 'STATE:rune_type', 9);
        // 执行功能
        horizontalGate$1(analysis.block);
    }
});
/*
 * 垂直机关门
 */
components$a.set(componentPrefix$8 + 'vertical_gate', {
    onTick(source) {
        /**
         * * 方块组件参数 的 解构
         */
        const analysis = TickComponentTrigger(source);
        // 播放音效 与 粒子效果
        analysis.dimension?.playSound('close.iron_door', analysis.block.location);
        // 状态更改
        TrySetPermutation(analysis.block, 'STATE:rune_type', 9);
        // 执行功能
        verticalGate$1(analysis.block);
    }
});
/*
 * 魔晶上传
 */
components$a.set(componentPrefix$8 + 'magic_crystal_upload', {
    onTick(source) {
        /**
         * * 方块组件参数 的 解构
         */
        const analysis = TickComponentTrigger(source);
        /**
         * * 方块前处理事件
         */
        function beforeEvent() {
            TrySpawnParticle(analysis.dimension, 'constant:prompt_transport_above', analysis.block.bottomCenter());
            analysis.dimension?.playSound('conduit.activate', analysis.block.location);
            TrySetPermutation(analysis.block, 'STATE:rune_type', 9);
            AboveTeleport(analysis.block);
        }
        /**
         * * 方块后处理事件
         */
        function afterEvent() {
            analysis.dimension?.playSound('place.amethyst_block', analysis.block.location);
            TrySetPermutation(analysis.block, 'STATE:rune_type', 0);
        }
        if (analysis.condition != 0 && analysis.condition != 9)
            beforeEvent();
        else if (analysis.condition == 9)
            afterEvent();
    }
});
/*
 * 魔晶下传
 */
components$a.set(componentPrefix$8 + 'magic_crystal_download', {
    onTick(source) {
        /**
         * * 方块组件参数 的 解构
         */
        const analysis = TickComponentTrigger(source);
        /**
         * * 方块前处理事件
         */
        function beforeEvent() {
            TrySpawnParticle(analysis.dimension, 'constant:prompt_transport_below', analysis.block.center());
            analysis.dimension?.playSound('conduit.activate', analysis.block.location);
            TrySetPermutation(analysis.block, 'STATE:rune_type', 9);
            BelowTeleport(analysis.block);
        }
        /**
         * * 方块后处理事件
         */
        function afterEvent() {
            analysis.dimension?.playSound('place.amethyst_block', analysis.block.location);
            TrySetPermutation(analysis.block, 'STATE:rune_type', 0);
        }
        if (analysis.condition != 0 && analysis.condition != 9)
            beforeEvent();
        else if (analysis.condition == 9)
            afterEvent();
    }
});
/*
 * 造石单元
 */
components$a.set(componentPrefix$8 + 'stone_machine', {
    onTick(source) {
        /**
         * * 方块组件参数 的 解构
         */
        const analysis = TickComponentTrigger(source);
        /**
         * * 方块前处理事件
         */
        function beforeEvent() {
            /**
             ** 方块状态值
             */
            const value = analysis.state.getState('STATE:value');
            // 复位状态
            TrySetPermutation(analysis.block, 'STATE:value', value - 1);
        }
        /**
         ** 方块中继事件
         */
        function middleEvent() {
            // 播放音效 与 粒子效果
            analysis.dimension?.playSound('random.fizz', analysis.block.location);
            // 复位状态
            TrySetPermutation(analysis.block, 'STATE:value', 5);
        }
        /**
         * * 方块后处理事件
         */
        function afterEvent() {
            // 播放音效 与 粒子效果
            analysis.dimension?.playSound('bucket.empty_lava', analysis.block.location);
            // 执行功能
            Solidify(analysis.block);
            // 复位状态
            TrySetPermutation(analysis.block, 'STATE:rune_type', 0);
            TrySetPermutation(analysis.block, 'STATE:value', 0);
        }
        /**
         ** 方块状态值
         */
        const value = analysis.state.getState('STATE:value');
        if (value != 0 && value != 1)
            beforeEvent();
        else if (value == 0)
            middleEvent();
        else if (value == 1)
            afterEvent();
    }
});
/*
 * 金属锻压
 */
components$a.set(componentPrefix$8 + 'metal_forming_press', {
    onTick(source) {
        /**
         * * 方块组件参数 的 解构
         */
        const analysis = TickComponentTrigger(source);
        /**
         * * 方块前处理事件
         */
        function beforeEvent() {
            /**
             ** 方块状态值
             */
            const value = analysis.state.getState('STATE:value');
            // 播放音效 与 粒子效果
            analysis.dimension?.playSound('block.stonecutter.use', analysis.block.location);
            // 复位状态
            TrySetPermutation(analysis.block, 'STATE:value', value + 1);
        }
        /**
         * * 方块后处理事件
         */
        function afterEvent() {
            // 播放音效 与 粒子效果
            analysis.dimension?.playSound('random.anvil_land', analysis.block.location);
            // 执行功能
            Forming(analysis.block);
            // 复位状态
            TrySetPermutation(analysis.block, 'STATE:rune_type', 0);
            TrySetPermutation(analysis.block, 'STATE:value', 0);
        }
        /**
         ** 方块状态值
         */
        const value = analysis.state.getState('STATE:value');
        if (value != 7)
            beforeEvent();
        else if (value == 7)
            afterEvent();
    }
});
/*
 * 破坏核心
 */
components$a.set(componentPrefix$8 + 'destroy_the_core', {
    onTick(source) {
        /**
         * * 方块组件参数 的 解构
         */
        const analysis = TickComponentTrigger(source);
        // 执行功能
        Destroy(analysis.block, analysis.state.getState('minecraft:block_face'));
        // 复位状态
        TrySetPermutation(analysis.block, 'STATE:rune_type', 0);
    }
});
/*
 * 矿井单元
 */
components$a.set(componentPrefix$8 + 'mineral_machine', {
    onTick(source, data) {
        /**
         * * 方块组件参数 的 解构
         */
        const { dimension} = TickComponentTrigger(source);
        /**
         * 方块组件属性值解析
         */
        const { revise, consumption, probability, doubling_probability: doubling, limit, chunk_size: chunkSize } = data.params;
        /**
         * 矿脉权重表
         */
        const weightTable = new Map();
        // 获取当前维度的参数对象
        const proto = data.params[dimension.id];
        // 如果当前维度没有参数对象，则返回
        if (proto == undefined)
            return;
        // 使用解构赋值直接从Object.entries获取键值对
        for (const [mineral, weight] of Object.entries(proto))
            if (mineral !== undefined && weight !== undefined)
                weightTable.set(mineral, weight);
    }
});
/*
components.set(componentPrefix + 'mineral_machine',
    {
        onTick(source: server.BlockComponentTickEvent, data: { params: MINERAL_MACHINE }) {
            const analysis = TickComponentTrigger(source);
            function beforeEvent() {
                analysis.dimension?.playSound('block.stonecutter.use', analysis.block.location);
                // 复位状态
                opal.TrySetPermutation(analysis.block, 'STATE:value', analysis.state.getState('STATE:value') as number + 1);
            };
            function afterEvent() {
                analysis.dimension?.playSound('random.anvil_land', analysis.block.location);
                // 执行功能
                mineral_project.Mine(analysis.block);
                // 复位状态
                opal.TrySetPermutation(analysis.block, 'STATE:rune_type', 0);
                opal.TrySetPermutation(analysis.block, 'STATE:value', 0);
            };
            if (analysis.state.getState('STATE:value') as number != 8) beforeEvent();
            else if (analysis.state.getState('STATE:value') as number == 8) afterEvent();
        }
    }
);
*/
/*
 * 能量节点
 */
components$a.set(componentPrefix$8 + 'energy_node', {
    onTick(source, data) {
        /**
         * * 方块组件参数 的 解构
         */
        const { block} = TickComponentTrigger(source);
        /**
         * * 方块的能量值属性
         */
        const value = data.params.modify || 10;
        /**
         * * 补充 星尘能 消耗
         */
        const energy = AlterEnergy(block, value, true);
        // 显示 魔晶网络 - 星尘值
        AlterMessageNotify('<§l§b 能量节点 §r>§s 星尘力产出§r', block, { text: '<§l§d 星尘力 §r> : §l§u' + energy[1] + '§q↑§r' });
        // 复位状态
        TrySetPermutation(block, 'STATE:stage', 0);
    }
});
/**
 * * 查询与激活 动能分配
 *
 * @param {server.Block} block - 发出侦测的能量源方块
 *
 * @param {server.Vector3} offset - 方向向量
 */
function energyAllocation(block, offset) {
    // 遍历 动能分配模块
    for (let index = 1; index < 6; index++) {
        /**
         * * 获取 目标方块
         */
        const target = block.offset(Vector.multiply(offset, index));
        // 判断 方块 是否 是 动能分配模块
        if (!target || !target.hasTag('tags:energy_module.allocation'))
            continue;
        /**
         * * 获取 方块状态
         */
        const states = target.permutation;
        // 如果该方块已经被充能就跳过该方块
        if (states.getState('STATE:output') == 1)
            continue;
        // 改变方块状态
        target.setPermutation(states.withState('STATE:output', 1));
    }
}
/**
 * * 检测周围是否有能量分配
 *
 * @param {server.Block} block - 发出侦测的能量源方块
 *
 * @returns {boolean} - 是否有 动能分配模块
 */
function checkAllocation(block) {
    /**
     * * 获取 附近的方块
     */
    const entry = [block.east(), block.west(), block.north(), block.south()];
    // 遍历 方块 并测试 方块是否是动能分配模块
    for (let index = 0; index < entry.length; index++) {
        if (entry[index]?.hasTag('tags:energy_module.allocation'))
            return true;
    }
    // 返回结果
    return false;
}
/*
 * 风力动能
 */
components$a.set(componentPrefix$8 + 'wind_power', {
    onTick(source) {
        /**
         * * 方块组件参数 的 解构
         */
        const { block, state } = TickComponentTrigger(source);
        /**
         ** 方块状态值
         */
        const rotate = state.getState('STATE:rotate');
        /**
         ** 方块状态值
         */
        const type = state.getState('STATE:stage');
        // 赋值方块状态
        TrySetPermutation(block, 'STATE:rotate', rotate != 2 ? rotate + 1 : 0);
        TrySetPermutation(block, 'STATE:stage', type != 9 ? type + 1 : 0);
        /**
         * * 获取 自身 的 方块状态
         */
        const permutation = block.permutation;
        /**
         * * 获取 当前运行阶段
         */
        const current = permutation.getState('STATE:stage');
        // 判断 方块 是否 有 动能分配模块
        if (!checkAllocation(block))
            return;
        // 判断方块是否在 高度阈值内
        if (block.y > 200 || block.y < 64)
            return;
        /**
         * * 计算 阈值
         */
        const threshold = Math.floor(9 - ((block.y - 64) / 15));
        // 判断阈值 是否 等于 当前运行阶段
        if (current < threshold)
            return;
        // 播放 风力叶片粒子效果
        if (TriggerControl(block.typeId, block, 60)) {
            /**
             * * 定义 粒子参数
             */
            const molang = new server.MolangVariableMap();
            // 定义 粒子参数
            molang.setFloat('variable.direction', 2);
            molang.setFloat('variable.size', 16);
            // 播放 粒子效果
            TrySpawnParticle(block.dimension, 'scripts:path_round', Vector.add(block.location, Vector.CONSTANT_HALF), molang);
            TrySpawnParticle(block.dimension, 'scripts:path_label', Vector.add(block.location, Vector.CONSTANT_HALF), molang);
        }
        // 基于 方块朝向 遍历 动能分配模块
        switch (permutation.getState('minecraft:cardinal_direction')) {
            case 'south':
                energyAllocation(block, Vector.CONSTANT_SOUTH);
                break;
            case 'north':
                energyAllocation(block, Vector.CONSTANT_NORTH);
                break;
            case 'east':
                energyAllocation(block, Vector.CONSTANT_EAST);
                break;
            case 'west':
                energyAllocation(block, Vector.CONSTANT_WEST);
                break;
        }
        // 切换运行阶段
        TrySetPermutation(block, 'STATE:stage', 9);
    }
});
/*
 * 魔晶储罐
 */
components$a.set(componentPrefix$8 + 'crystal_tank', {
    onTick(source) {
        /**
         * * 方块组件参数 的 解构
         */
        const { block, state, dimension } = TickComponentTrigger(source);
        /**
         * * 获取 目标方块
         */
        const target = block.above();
        /**
         ** 检测目标块是否为能量节点
         */
        const onTag = target?.getTags()?.includes('tags:energy_module.node');
        /**
         ** 获取方块状态
         */
        const caching = state.getState('STATE:caching');
        // 播放音效 与 粒子效果
        if (!onTag && state.getState('STATE:output') == 1)
            dimension?.playSound('block.grindstone.use', block.location);
        // 如果检测到能量节点
        if (onTag) {
            /**
             ** 粒子效果索引值
             */
            const index = Random({ max: 4, min: 0 }, true);
            // 播放粒子效果
            switch (index) {
                case 0:
                    TrySpawnParticle(dimension, 'constant:excite_rune_red', target?.bottomCenter());
                    break;
                case 1:
                    TrySpawnParticle(dimension, 'constant:excite_rune_blue', target?.bottomCenter());
                    break;
                case 2:
                    TrySpawnParticle(dimension, 'constant:excite_rune_green', target?.bottomCenter());
                    break;
                case 3:
                    TrySpawnParticle(dimension, 'constant:excite_rune_orange', target?.bottomCenter());
                    break;
                case 4:
                    TrySpawnParticle(dimension, 'constant:excite_rune_purple', target?.bottomCenter());
                    break;
            }
            // 赋值方块状态
            TrySetPermutation(block, 'STATE:caching', (caching || 0) + Math.floor(Math.random() * 2));
            // 替换储罐方块
            if (caching == 8)
                block.setPermutation(server.BlockPermutation.resolve('starry_map:empty_tank'));
            // 判断 方块 是否 存在
            if (target && target.isValid)
                TrySetPermutation(target, 'STATE:stage', 1);
        }
        // 赋值方块状态
        TrySetPermutation(block, 'STATE:output', onTag ? 1 : 0);
    }
});
/*
 * 变换储罐
 */
components$a.set(componentPrefix$8 + 'transform_tank', {
    onTick(source) {
        /**
         * * 方块组件参数 的 解构
         */
        const analysis = TickComponentTrigger(source);
        /**
         ** 辉光-魔晶储罐
         */
        const constant = server.BlockPermutation.resolve('starry_map:release_tank');
        // 播放粒子效果
        switch (Random({ max: 4, min: 0 }, true)) {
            case 0:
                TrySpawnParticle(analysis.dimension, 'constant:fireworks_fireball_rune_red', analysis.block.above()?.bottomCenter());
                break;
            case 1:
                TrySpawnParticle(analysis.dimension, 'constant:fireworks_fireball_rune_blue', analysis.block.above()?.bottomCenter());
                break;
            case 2:
                TrySpawnParticle(analysis.dimension, 'constant:fireworks_fireball_rune_green', analysis.block.above()?.bottomCenter());
                break;
            case 3:
                TrySpawnParticle(analysis.dimension, 'constant:fireworks_fireball_rune_orange', analysis.block.above()?.bottomCenter());
                break;
            case 4:
                TrySpawnParticle(analysis.dimension, 'constant:fireworks_fireball_rune_purple', analysis.block.above()?.bottomCenter());
                break;
        }
        switch (Random({ max: 4, min: 0 }, true)) {
            case 0:
                TrySpawnParticle(analysis.dimension, 'constant:pulse_rune_red', analysis.block.above()?.bottomCenter());
                break;
            case 1:
                TrySpawnParticle(analysis.dimension, 'constant:pulse_rune_blue', analysis.block.above()?.bottomCenter());
                break;
            case 2:
                TrySpawnParticle(analysis.dimension, 'constant:pulse_rune_green', analysis.block.above()?.bottomCenter());
                break;
            case 3:
                TrySpawnParticle(analysis.dimension, 'constant:pulse_rune_orange', analysis.block.above()?.bottomCenter());
                break;
            case 4:
                TrySpawnParticle(analysis.dimension, 'constant:pulse_rune_purple', analysis.block.above()?.bottomCenter());
                break;
        }
        switch (Random({ max: 4, min: 0 }, true)) {
            case 0:
                TrySpawnParticle(analysis.dimension, 'constant:erupt_rune_red', analysis.block.above()?.bottomCenter());
                break;
            case 1:
                TrySpawnParticle(analysis.dimension, 'constant:erupt_rune_blue', analysis.block.above()?.bottomCenter());
                break;
            case 2:
                TrySpawnParticle(analysis.dimension, 'constant:erupt_rune_green', analysis.block.above()?.bottomCenter());
                break;
            case 3:
                TrySpawnParticle(analysis.dimension, 'constant:erupt_rune_orange', analysis.block.above()?.bottomCenter());
                break;
            case 4:
                TrySpawnParticle(analysis.dimension, 'constant:erupt_rune_purple', analysis.block.above()?.bottomCenter());
                break;
        }
        analysis.dimension.playSound('cauldron.explode', analysis.block.location);
        analysis.block.setPermutation(constant);
    }
});
/*
 * 动能分配
 */
components$a.set(componentPrefix$8 + 'allocation_power', {
    onTick(source) {
        /**
         * * 方块组件参数 的 解构
         */
        const { block } = TickComponentTrigger(source);
        /**
         * * 获取 目标方块
         */
        const target = block.above();
        /**
         ** 检测目标块是否为能量节点
         */
        const onTag = target?.getTags()?.includes('tags:energy_module.node');
        // 判断 方块 是否 为 能量节点
        if (!onTag)
            return;
        // 赋值方块状态
        TrySetPermutation(block, 'STATE:output', 0);
        // 判断 方块 是否 存在
        if (target && target.isValid)
            TrySetPermutation(target, 'STATE:stage', 1);
    }
});
/*
 * 熔岩质能
 */
components$a.set(componentPrefix$8 + 'magma_power', {
    onTick(source) {
        /**
         * * 方块组件参数 的 解构
         */
        const { block, state, dimension } = TickComponentTrigger(source);
        /**
         ** 获取计数值
         */
        const count = state.getState('STATE:count');
        /**
         ** 获取熔岩量
         */
        const magma = state.getState('STATE:magma');
        // 播放音效
        dimension?.playSound('fire.fire', block.location);
        // 执行功能
        if (checkAllocation(block)) {
            // 遍历 动能分配模块
            energyAllocation(block, Vector.CONSTANT_SOUTH);
            energyAllocation(block, Vector.CONSTANT_NORTH);
            energyAllocation(block, Vector.CONSTANT_EAST);
            energyAllocation(block, Vector.CONSTANT_WEST);
        }
        // 执行一定次数后修改方块状态
        blockTimer(block, 2, () => {
            if (count == 0) {
                TrySetPermutation(block, 'STATE:count', 15);
                TrySetPermutation(block, 'STATE:magma', magma - 1);
            }
            else {
                TrySetPermutation(block, 'STATE:count', count - 1);
            }
            ;
        });
    }
});
/*
 * 水素质能
 */
components$a.set(componentPrefix$8 + 'water_power', {
    onTick(source) {
        /**
         * * 方块组件参数 的 解构
         */
        const { block, state, dimension } = TickComponentTrigger(source);
        /**
         * * 前处理事件
         */
        function beforeEvent() {
            /**
             ** 空气方块
             */
            const air = server.BlockPermutation.resolve('minecraft:air');
            /**
             ** 水源方块
             */
            const water = server.BlockPermutation.resolve('minecraft:water');
            /**
             ** 锚点_a
             */
            const anchor_a = Vector.add(block.location, Vector.CONSTANT_ONE);
            /**
             ** 锚点_b
             */
            const anchor_b = Vector.add(block.location, Vector.CONSTANT_LOSS_ONE);
            /**
             ** 获取计数值
             */
            const isWater = block.below()?.isLiquid;
            /**
             ** 获取方块状态
             */
            const current = state.getState('STATE:stage');
            // 赋值 方块状态
            if (isWater)
                TrySetPermutation(block, 'STATE:stage', current + 1);
            // 将 水源 置换为 空气
            TryFillBlocks(dimension, anchor_a, anchor_b, air, { blockFilter: { includePermutations: [water] } });
        }
        /**
         * * 后处理事件
         */
        function afterEvent() {
            /**
             * * 获取 自身 的 方块状态
             */
            const permutation = block.permutation;
            // 判断 方块 是否 有 动能分配模块
            if (!checkAllocation(block))
                return;
            // 切换运行阶段
            TrySetPermutation(block, 'STATE:stage', 0);
            // 基于 方块朝向 遍历 动能分配模块
            switch (permutation.getState('minecraft:cardinal_direction')) {
                case 'south':
                    energyAllocation(block, Vector.CONSTANT_SOUTH);
                    break;
                case 'north':
                    energyAllocation(block, Vector.CONSTANT_NORTH);
                    break;
                case 'east':
                    energyAllocation(block, Vector.CONSTANT_EAST);
                    break;
                case 'west':
                    energyAllocation(block, Vector.CONSTANT_WEST);
                    break;
            }
            // 播放 水花 粒子效果
            SprayParticleTrigger(block.dimension, block.center());
        }
        if (state.getState('STATE:stage') !== 9)
            beforeEvent();
        else
            afterEvent();
    }
});
/*
 * 植树造木
 */
components$a.set(componentPrefix$8 + 'planting_and_logging', {
    onTick(source) {
        /**
         * * 方块组件参数 的 解构
         */
        const { block, state, dimension } = TickComponentTrigger(source);
        /**
         * * 前处理事件
         */
        function beforeEvent() {
            /**
             ** 获取计数值
             */
            const stage = state.getState('STATE:stage');
            dimension.playSound('block.composter.fill_success', block.location);
            TrySetPermutation(block, 'STATE:stage', stage + 1);
        }
        /**
         * * 后处理事件
         */
        function afterEvent() {
            TrySetPermutation(block, 'STATE:rune_type', 0);
            TrySetPermutation(block, 'STATE:stage', 0);
            // 判断能量值 是否足够
            if (!ExpendEnergy(block, -50))
                return;
            /**
             * * 获取 方块
             */
            const target = block.south();
            // 检测 方块是否存在
            if (!target || !target.isValid)
                return;
            /**
             * * 测试 方块类型
             */
            const test = is_wood.has(target.typeId);
            /**
             * 深色橡木锚点-0
             */
            const anchor_0 = Vector.add(block.location, { x: 1, y: 0, z: 2 });
            /**
             * 深色橡木锚点-1
             */
            const anchor_1 = Vector.add(block.location, Vector.CONSTANT_SOUTH);
            if (!test)
                return;
            switch (target?.typeId) {
                // 黑橡木
                case 'minecraft:dark_oak_log':
                    TryFillBlocks(block.dimension, anchor_0, anchor_1, 'minecraft:dark_oak_sapling');
                    break;
                // 橡木
                case 'minecraft:oak_log':
                    target.setPermutation(server.BlockPermutation.resolve('minecraft:oak_sapling'));
                    break;
                // 云杉
                case 'minecraft:spruce_log':
                    target.setPermutation(server.BlockPermutation.resolve('minecraft:spruce_sapling'));
                    break;
                // 白桦
                case 'minecraft:birch_log':
                    target.setPermutation(server.BlockPermutation.resolve('minecraft:birch_sapling'));
                    break;
                // 丛林
                case 'minecraft:jungle_log':
                    target.setPermutation(server.BlockPermutation.resolve('minecraft:jungle_sapling'));
                    break;
                // 金合欢
                case 'minecraft:acacia_log':
                    target.setPermutation(server.BlockPermutation.resolve('acacia_sapling'));
                    break;
                // 樱花树
                case 'minecraft:cherry_log':
                    target.setPermutation(server.BlockPermutation.resolve('minecraft:cherry_sapling'));
                    break;
                // 绯红菌柄
                case 'minecraft:crimson_stem':
                    target.setPermutation(server.BlockPermutation.resolve('minecraft:crimson_fungus'));
                    break;
                // 诡异菌柄
                case 'minecraft:warped_stem':
                    target.setPermutation(server.BlockPermutation.resolve('minecraft:warped_fungus'));
                    break;
            }
            /**
             * * 定义 起始点
             */
            const start = Vector.add(block, { x: -7, y: -1, z: -6 });
            /**
             * * 定义 结束点
             */
            const done = Vector.add(block, { x: 7, y: 19, z: 8 });
            /**
             * * 在 绘制路径 时 执行 的 程序
             */
            const moveEvent = (args) => {
                /**
                 * * 检测方块是否需要被挖掘
                 */
                const TestSort = () => {
                    /**
                     * * 获取 方块对象
                     */
                    const getBlock = args.dimension.getBlock(args.location);
                    // 检测 方块类型
                    if (getBlock)
                        return is_trees.has(getBlock.typeId);
                    else
                        return false;
                };
                //执行路径事件的功能
                if (TestSort())
                    args.dimension.runCommand(`fill ${args.location.x} ${args.location.y} ${args.location.z} ${args.location.x} ${args.location.y} ${args.location.z} air [] destroy`);
                // 继续循环
                return true;
            };
            // 创建 路径执行计划
            PathExecute.CreateForCube('植树造木-范围扫描', {
                particles: ['constant:track_rune_green'],
                dimension: block.dimension,
                locations: [],
                cooldown: 1,
                speed: 1,
                offset: Vector.CONSTANT_HALF,
                on_move: moveEvent
            }, start, done, 0.5);
        }
        if (state.getState('STATE:stage') !== 5)
            beforeEvent();
        else
            afterEvent();
    }
});
/*
 * 作物侦测
 */
components$a.set(componentPrefix$8 + 'crop_detection', {
    onTick(source) {
        /**
         * * 方块组件参数 的 解构
         */
        const { block, dimension } = TickComponentTrigger(source);
        /**
         ** 检测方块是否处于开启状态
         */
        const onTag = block.above()?.getTags()?.includes('tags:magic_cable.open');
        // 如果开启状态
        if (onTag)
            return;
        // 播放音效
        dimension.playSound('block.composter.ready', block.location);
        // 判断能量值 是否足够
        if (!ExpendEnergy(block, -5))
            return;
        /**
         * * 定义 路径事件
         */
        const TickEvent = (args) => {
            /**
             * * 获取 方块
             */
            const block = args.dimension.getBlock(args.location);
            // 检测 方块是否存在
            if (!block || !block.isValid)
                return false;
            /**
             * * 获取 方块类型
             */
            const protoResult = is_crops.get(block.typeId);
            /**
             * * 获取 方块状态
             */
            const getPermutation = block.permutation;
            // 如果 可以收割
            if (protoResult === true || getPermutation.getState('growth') == 7)
                return false;
            else if (block.typeId == 'minecraft:sweet_berry_bush' && getPermutation.getState('growth') == 3)
                return false;
            else if (block.typeId == 'minecraft:cocoa' && getPermutation.getState('age') == 2)
                return false;
            else if (block.typeId == 'nether_wart' && getPermutation.getState('age') == 3)
                return false;
            // 继续循环
            else
                return true;
        };
        /**
         * * 定义 停止事件
         */
        const StopEvent = (args) => {
            if (args.tick > 15)
                return;
            /**
             * * 获取 方块
             */
            const target = block.north();
            // 检测 方块是否存在
            if (!target || !target.isValid)
                return;
            // 设置方块状态
            TrySetPermutation(target, 'STATE:rune_type', RandomFloor(1, 7));
        };
        // 创建 路径事件
        PathExecute.Create('作物侦测-检测射线', 1, {
            locations: [block, Vector.add(block, { x: 0, y: 0, z: 15 })],
            particles: ['constant:track_rune_green'],
            offset: { x: 0.5, y: 0.5, z: 0.5 },
            dimension: block.dimension,
            on_move: TickEvent,
            on_done: StopEvent,
            cooldown: 1,
            speed: 1
        });
    }
});
/*
 * 魔晶明灯
 */
components$a.set(componentPrefix$8 + 'magic_crystal_lamp', {
    onTick(source) {
        /**
         * * 方块组件参数 的 解构
         */
        const analysis = TickComponentTrigger(source);
        /**
         ** 获取方块状态
         */
        const light = analysis.state.getState('STATE:light');
        if (analysis.condition <= 3 && light != 15)
            TrySetPermutation(analysis.block, 'STATE:light', light + 1);
        if (analysis.condition >= 4 && light != 0)
            TrySetPermutation(analysis.block, 'STATE:light', light - 1);
        if (analysis.condition == 6)
            TrySetPermutation(analysis.block, 'STATE:light', 15);
        if (analysis.condition == 7)
            TrySetPermutation(analysis.block, 'STATE:light', 0);
        TrySetPermutation(analysis.block, 'STATE:rune_type', 0);
    }
});
/*
 * 水域天降
 */
components$a.set(componentPrefix$8 + 'virtual_weather', {
    onTick(source, data) {
        /**
         * * 方块组件参数 的 解构
         */
        const analysis = TickComponentTrigger(source);
        /**
         ** 获取计数值
         */
        const stage = analysis.state.getState('STATE:stage');
        /**
         ** 检测方块是否处于开启状态
         */
        const onTag = analysis.block.below()?.getTags()?.includes('tags:magic_cable.open');
        // 检测是否处于开启状态
        if (!onTag)
            return;
        // 播放基础粒子效果
        if (stage == 0)
            TrySpawnParticle(analysis.dimension, 'constant:impact_rune_white', analysis.block.location);
        // 播放自定义粒子效果
        if (stage == 0 && data.params.particle)
            TrySpawnParticle(analysis.dimension, data.params.particle, analysis.block.location);
        // 设置方块状态值
        TrySetPermutation(analysis.block, 'STATE:stage', stage != 3 ? stage + 1 : 0);
    }
});
/*
 * 脉冲尖峰
 */
components$a.set(componentPrefix$8 + 'PulsePeakCannon', {
    onTick(source) {
        /**
         * * 方块组件参数 的 解构
         */
        const analysis = TickComponentTrigger(source);
        /**
         ** 检测方块是否处于开启状态
         */
        const onTag = analysis.block.below()?.getTags()?.includes('tags:magic_cable.open');
        if (onTag)
            pulsePeakCannon(analysis.block);
    }
});
/*
 * 曜石熔炉
 */
components$a.set(componentPrefix$8 + 'obsidian_furnace', {
    onTick(source) {
        /**
         * * 方块组件参数 的 解构
         */
        const analysis = TickComponentTrigger(source);
        /**
         * * 前处理事件
         */
        function beforeEvent() {
            /**
             * * 获取剩余石材数量
             */
            const material = analysis.state.getState('STATE:material');
            /**
             * * 获取方块运行阶段
             */
            const stage = analysis.state.getState('STATE:stage');
            /**
             * * 获取熔岩库存量
             */
            const magma = analysis.state.getState('STATE:magma');
            // 检测是否为 熔岩生成 阶段
            if (stage == 1 && material != 0) {
                TrySetPermutation(analysis.block, 'STATE:material', material - 1);
                TrySetPermutation(analysis.block, 'STATE:magma', magma + 1);
                TrySetPermutation(analysis.block, 'STATE:direction_0', 0);
                TrySetPermutation(analysis.block, 'STATE:direction_1', 0);
                TrySetPermutation(analysis.block, 'STATE:direction_2', 0);
                TrySetPermutation(analysis.block, 'STATE:direction_3', 0);
                TrySetPermutation(analysis.block, 'STATE:stage', 0);
            }
            else if (stage == 0)
                Attrition(analysis.block);
        }
        /**
         * * 后处理事件
         */
        function afterEvent() {
            const direction_0 = analysis.block.offset({ x: 0, y: -1, z: -1 })?.getTags()?.includes('tags:obsidian_smelting.storage_tank');
            const direction_1 = analysis.block.offset({ x: -1, y: -1, z: 0 })?.getTags()?.includes('tags:obsidian_smelting.storage_tank');
            const direction_2 = analysis.block.offset({ x: 0, y: -1, z: 1 })?.getTags()?.includes('tags:obsidian_smelting.storage_tank');
            const direction_3 = analysis.block.offset({ x: 1, y: -1, z: 0 })?.getTags()?.includes('tags:obsidian_smelting.storage_tank');
            TrySetPermutation(analysis.block, 'STATE:direction_0', direction_0 ? 1 : 0);
            TrySetPermutation(analysis.block, 'STATE:direction_1', direction_1 ? 1 : 0);
            TrySetPermutation(analysis.block, 'STATE:direction_2', direction_2 ? 1 : 0);
            TrySetPermutation(analysis.block, 'STATE:direction_3', direction_3 ? 1 : 0);
            Pouring(analysis.block);
        }
        const magma = analysis.state.getState('STATE:magma');
        if (magma != 8)
            beforeEvent();
        if (magma == 8)
            afterEvent();
    }
});
/*
 * 消耗星尘力
 */
components$a.set(componentPrefix$8 + 'energy_expend', {
    onTick(source, data) {
        /**
         * * 方块组件参数 的 解构
         */
        const { block } = TickComponentTrigger(source);
        /**
         * * 方块组件参数 的 解构
         */
        const { modify, revise } = data.params;
        /**
         ** 查询剩余能量
         */
        const energy = ExpendEnergy(block, modify || -1);
        // 检测能量是否变动成功
        if (energy)
            TrySetPermutation(block, revise || 'default', 2);
        else
            TrySetPermutation(block, revise || 'default', 0);
    }
});
/*
 * 常规 物流网络 接收端
 */
components$a.set(componentPrefix$8 + 'routine_logistics_receiver', {
    onTick(source) {
        /**
         * * 方块组件参数 的 解构
         */
        const analysis = TickComponentTrigger(source);
        /**
         ** 获取 关于方块旋转 的 方块状态
         */
        const direction = analysis.state.getState('minecraft:cardinal_direction');
        /**
         ** 侦测 方块容器 并 提交 物品网络申请
         *
         * @param {server.Block | undefined} target - 目标容器方块
         */
        function Detecting(target) {
            /**
             ** 上方 的 物品展示框 的 物品信息
             */
            const frame = analysis.block.above()?.getItemStack(1);
            /**
             ** 指定的 方块 的 物品容器
             */
            const container = target?.getComponent('inventory')?.container;
            // 检测 容器 展示框 剩余空间 是否满足要求
            if (!target || !frame || !container || container.emptySlotsCount == 0)
                return;
            /**
             ** 物品网络频道
             */
            const channel = frame.typeId;
            /**
             ** 网络筛选类型
             */
            const filter = container.getItem(0)?.typeId ?? frame.typeId;
            // 提交 物品网络申请
            routineLogisticsRequest.set(analysis.dimension.id + '•' + channel + '•' + filter, target.location);
        }
        // 基于 方块状态 旋转 容器读取方向
        switch (direction) {
            case 'south':
                Detecting(analysis.block.south());
                break;
            case 'north':
                Detecting(analysis.block.north());
                break;
            case 'east':
                Detecting(analysis.block.east());
                break;
            case 'west':
                Detecting(analysis.block.west());
                break;
        }
    }
});
/*
 * 跨界 物流网络 接收端
 */
components$a.set(componentPrefix$8 + 'surpass_logistics_receiver', {
    onTick(source) {
        /**
         * * 方块组件参数 的 解构
         */
        const analysis = TickComponentTrigger(source);
        /**
         ** 获取 关于方块旋转 的 方块状态
         */
        const direction = analysis.state.getState('minecraft:cardinal_direction');
        /**
         ** 侦测 方块容器 并 提交 物品网络申请
         *
         * @param {server.Block | undefined} target - 目标容器方块
         */
        function Detecting(target) {
            /**
             ** 上方 的 物品展示框 的 物品信息
             */
            const frame = analysis.block.above()?.getItemStack(1);
            /**
             ** 指定的 方块 的 物品容器
             */
            const container = target?.getComponent('inventory')?.container;
            // 检测 容器 展示框 剩余空间 是否满足要求
            if (!target || !frame || !container || container.emptySlotsCount == 0)
                return;
            /**
             ** 物品网络频道
             */
            const channel = frame.typeId;
            /**
             ** 网络筛选类型
             */
            const filter = container.getItem(0)?.typeId ?? frame.typeId;
            // 提交 物品网络申请
            surpassDimensionRequest.set(channel + '•' + filter, [target.dimension, target.location]);
        }
        // 基于 方块状态 旋转 容器读取方向
        switch (direction) {
            case 'south':
                Detecting(analysis.block.south());
                break;
            case 'north':
                Detecting(analysis.block.north());
                break;
            case 'east':
                Detecting(analysis.block.east());
                break;
            case 'west':
                Detecting(analysis.block.west());
                break;
        }
    }
});
/*
 * 常规 物流网络 发送端
 */
components$a.set(componentPrefix$8 + 'routine_logistics_sender', {
    onTick(source) {
        /**
         * * 方块组件参数 的 解构
         */
        const analysis = TickComponentTrigger(source);
        /**
         ** 上方 的 物品展示框 的 物品信息
         */
        const frame = analysis.block.above()?.getItemStack(1);
        // 检测 展示框 能量 请求数量 是否满足要求
        if (!frame || !ExpendEnergy(analysis.block, -20) || routineLogisticsRequest.size < 1)
            return;
        /**
         ** 物品网络频道
         */
        const channel = [...routineLogisticsRequest].filter(info => {
            const split = info[0].split('•');
            return split[0] == analysis.dimension.id && split[1] == frame.typeId;
        });
        /**
         ** 附近的方块容器
         */
        const containers = [
            analysis.block.west()?.getComponent('inventory')?.container,
            analysis.block.east()?.getComponent('inventory')?.container,
            analysis.block.north()?.getComponent('inventory')?.container,
            analysis.block.south()?.getComponent('inventory')?.container,
        ];
        /**
         ** 重构 物品请求信息
         */
        const judge = new Map(channel.map(info => [info[0].split('•')[2], info[1]]));
        // 遍历容器
        containers.forEach(container => {
            // 检测容器是否存在
            if (!container)
                return;
            // 遍历容器中的物品
            for (let index = 0; index < container.size; index++) {
                /**
                 ** 获取容器中的物品
                 */
                const item = container.getItem(index);
                if (!item)
                    continue;
                /**
                 ** 检测物品是否在请求列表上
                 */
                const result = judge.get(item.typeId);
                if (!result)
                    continue;
                /**
                 ** 获取发出请求的方块
                 */
                const block = analysis.dimension.getBlock(result);
                if (!block)
                    continue;
                /**
                 ** 获取接收物品的方块容器
                 */
                const inventory = block.getComponent('inventory')?.container;
                if (!inventory)
                    continue;
                // 迁移物品
                inventory.addItem(item);
                container.setItem(index);
                return;
            }
        });
        // 清除 物品网络申请
        routineLogisticsRequest = new Map([...routineLogisticsRequest].filter(info => {
            /**
             ** 拆分 维度 频道 类型
             */
            const split = info[0].split('•');
            // 检测 维度 频道 类型 是否符合
            return split[0] != analysis.dimension.id || split[1] != frame.typeId;
        }));
    }
});
/*
 * 跨界 物流网络 发送端
 */
components$a.set(componentPrefix$8 + 'surpass_logistics_sender', {
    onTick(source) {
        /**
         * * 方块组件参数 的 解构
         */
        const analysis = TickComponentTrigger(source);
        /**
         ** 上方 的 物品展示框 的 物品信息
         */
        const frame = analysis.block.above()?.getItemStack(1);
        // 检测 展示框 能量 请求数量 是否满足要求
        if (!frame || !ExpendEnergy(analysis.block, -30) || surpassDimensionRequest.size < 1)
            return;
        /**
         ** 物品网络频道
         */
        const channel = [...surpassDimensionRequest].filter(info => info[0].split('•')[0] == frame.typeId);
        /**
         ** 附近的方块容器
         */
        const containers = [
            analysis.block.west()?.getComponent('inventory')?.container,
            analysis.block.east()?.getComponent('inventory')?.container,
            analysis.block.north()?.getComponent('inventory')?.container,
            analysis.block.south()?.getComponent('inventory')?.container,
        ];
        /**
         ** 重构 物品请求信息
         */
        const judge = new Map(channel.map(info => [info[0].split('•')[1], info[1]]));
        // 遍历容器
        containers.forEach(container => {
            // 检测容器是否存在
            if (!container)
                return;
            // 遍历容器中的物品
            for (let index = 0; index < container.size; index++) {
                /**
                 ** 获取容器中的物品
                 */
                const item = container.getItem(index);
                if (!item)
                    continue;
                /**
                 ** 检测物品是否在请求列表上
                 */
                const result = judge.get(item.typeId);
                if (!result)
                    continue;
                /**
                 ** 获取发出请求的方块
                 */
                const block = result[0].getBlock(result[1]);
                if (!block)
                    continue;
                /**
                 ** 获取接收物品的方块容器
                 */
                const inventory = block.getComponent('inventory')?.container;
                if (!inventory)
                    continue;
                // 迁移物品
                inventory.addItem(item);
                container.setItem(index);
                return;
            }
        });
        // 清除请求信息
        surpassDimensionRequest = new Map([...surpassDimensionRequest].filter(info => info[0].split('•')[0] != frame.typeId));
    }
});
/*
 * 容器整理
 */
components$a.set(componentPrefix$8 + 'container_arrange', {
    onTick(source) {
        /**
         * * 方块组件参数 的 解构
         */
        const analysis = TickComponentTrigger(source);
        /**
         * 获取方块上下位置的容器组件
         */
        const containers = [
            analysis.block.above()?.getComponent('inventory')?.container,
            analysis.block.below()?.getComponent('inventory')?.container,
        ];
        // 判断是否成功获取到能量
        if (!ExpendEnergy(analysis.block, -20))
            return;
        // 遍历容器列表, 对每个容器执行操作
        containers.forEach(container => {
            // 如果容器不存在, 或者方块无法消耗能量, 则跳过当前循环
            if (!container || !ExpendEnergy(analysis.block, -5))
                return;
            /**
             * 获取容器中的所有物品
             */
            const items = [];
            // 遍历容器中的所有物品槽位
            for (let index = 0; index < container.size; index++) {
                /**
                 * 获取当前槽位的物品
                 */
                const item = container.getItem(index);
                // 如果当前槽位为空, 则跳过当前循环
                if (!item)
                    continue;
                // 将物品从容器中移除
                container.setItem(index);
                // 将物品添加到物品列表中
                items.push(item);
            }
            // 将物品列表中的物品添加到容器中
            OrganizeItemStacks(items).forEach(item => container.addItem(item));
        });
    }
});
/**
 * 从容器中提取符合要求的怪物掉落物
 *
 * @param {server.Container} container - 要处理的容器对象
 *
 * @param {string[]} expense - 预定义的怪物掉落物类型集合
 *
 * @returns {boolean} 是否成功提取了有效怪物掉落物
 *
 * @description 遍历容器物品, 当找到预定义的怪物掉落物时消耗 1 个并返回true
 */
function extractResidues(container, expense) {
    /**
     * 有效的怪物掉落物类型集合
     */
    const itemTable = new Set(expense);
    // 遍历容器所有槽位
    for (let index = 0; index < container.size; index++) {
        /**
         * 当前槽位的物品对象
         *
         * @type {server.ItemStack | undefined}
         */
        const item = container.getItem(index);
        // 跳过空槽位和非目标物品
        if (!item || !itemTable.has(item.typeId))
            continue;
        // 消耗1个目标物品
        ConsumeItemStack(container, index, item, 1);
        return true;
    }
    return false;
}
/*
 * 遗物萃取
 */
components$a.set(componentPrefix$8 + 'residual_extraction', {
    /**
     * 方块组件 tick 事件处理器, 用于处理怪物掉落物提取逻辑
     *
     * @param {server.BlockComponentTickEvent} source - 方块组件tick事件对象
     */
    onTick(source, data) {
        /**
         * 解析方块组件触发事件
         */
        const { block, dimension } = TickComponentTrigger(source);
        /**
         * 解析方块组件参数
         */
        const { expense, container, consumption, revise } = data.params;
        // 检测参数是否存在
        if (!expense || !container || !consumption || !revise)
            return;
        /**
         * 获取偏移位置的容器组件
         */
        const targetContainer = block.offset(container)?.getComponent('inventory')?.container;
        // 检测容器是否存在, 是否有空位, 是否消耗能量
        if (!targetContainer || targetContainer.emptySlotsCount == 0 || !ExpendEnergy(block, -consumption))
            return;
        /**
         * 当前方块的状态值
         */
        const state = block.permutation.getState(revise);
        /**
         * 是否成功提取怪物掉落物
         */
        const conclusion = extractResidues(targetContainer, expense);
        // 能量管理逻辑
        if (conclusion && state < 12) {
            // 增加能量值
            TrySetPermutation(block, revise, state + 1);
            // 播放运行音效
            dimension.playSound('step.amethyst_cluster', block);
        }
        else if (conclusion) {
            // 重置能量值
            TrySetPermutation(block, revise, 0);
            // 生成经验瓶
            targetContainer.addItem(new server.ItemStack('experience_bottle', 1));
            // 播放运行音效
            dimension.playSound('step.amethyst_cluster', block);
        }
    }
});
/*
 * 容器枢纽
 */
components$a.set(componentPrefix$8 + 'container_hub', {
    async onTick(source) {
        /**
         * 解析方块组件触发事件
         */
        const { block, dimension } = TickComponentTrigger(source);
        /**
         * 获取上方方块对象
         */
        const above = block.above();
        /**
         * 获取上方容器组件
         */
        const container = above?.getComponent('inventory')?.container;
        /**
         * 创建用于设置粒子效果参数的 Molang 变量映射
         *
         * @param {server.MolangVariableMap} molang - Molang变量映射对象
         */
        const molang = new server.MolangVariableMap();
        /**
         * 判断是否执行成功
         */
        let success = false;
        // 判断是否成功获取到能量
        if (!ExpendEnergy(block, -50))
            return;
        // 判断事件返回的对象是否完整可用
        if (!above || !container)
            return;
        // 遍历上方容器中的物品槽位
        for (let index = 0; index < container.size; index++) {
            /**
             * 获取当前槽位的物品
             */
            const item = container.getItem(index);
            // 如果当前槽位为空, 则跳过当前循环
            if (!item)
                continue;
            /**
             * 获取容器查询结果
             */
            let searchResults = SearchContainers(block, item, 8);
            // 移除重复的容器对象
            searchResults = searchResults.filter(value => !Vector.equals(value[1].location, above.location));
            // 如果没有找到容器, 放宽条件重新搜索
            if (searchResults.length === 0)
                searchResults = SearchContainers(block);
            // 如果没有找到容器, 则终止本次事件的继续执行
            if (searchResults.length === 0)
                return dimension.playSound('respawn_anchor.deplete', block);
            /**
             * * 获取目标容器和目标方块
             */
            const [targetContainer] = searchResults[0];
            // 将物品添加到目标方块容器中
            targetContainer.addItem(item);
            // 从上方容器中移除物品
            container?.setItem(index);
            // 标记物品已经成功转移
            success = true;
            // 中断循环执行
            await server.system.waitTicks(1);
        }
        // 设置粒子效果参数
        molang.setFloat('variable.size', 18);
        // 播放音效 表示运行结束
        if (success)
            dimension.playSound('respawn_anchor.charge', block);
        // 生成表示运行结束的粒子效果
        for (let index = 0; index < 3; index++) {
            molang.setFloat('variable.direction', index);
            TrySpawnParticle(dimension, 'scripts:path_round', block.center(), molang);
        }
    }
});

/*
 * 系统组件
 */
/**
 * * 组件前缀代词
 */
const componentPrefix$7 = 'opal:step.';
/**
 * * 方块自定义组件列表
 */
const components$9 = new Map();
/**
 * * 实体踩踏方块组件
 *
 * @param source - 方块组件参数
 */
function StepComponentTrigger(source) {
    /**
     * * 方块对象
     */
    const block = source.block;
    /**
     * * 方块状态
     */
    const state = source.block.permutation;
    /**
     * * 方块维度
     */
    const dimension = source.dimension;
    /**
     * * 实体对象
     */
    const entity = source.entity;
    // 返回 实体踩踏方块 的 组件参数 的 解构
    return { block, state, dimension, entity };
}
/*
 * 区块显示 - 实体踩踏
 */
components$9.set(componentPrefix$7 + 'region_display', {
    onStepOn(source) {
        /**
         * * 方块破坏组件参数解构
         */
        const { block } = StepComponentTrigger(source);
        // 执行 组件功能
        /**
         * * 获取 方块 周围 实体
         */
        const getEntities = block.dimension.getEntitiesAtBlockLocation(Vector.add(block, Vector.CONSTANT_UP));
        // 点燃 被选中的实体
        getEntities.forEach(entity => entity.setOnFire(20, true));
    }
});
/*
 * 向量弹射 - 实体踩踏
 */
components$9.set(componentPrefix$7 + 'vector_ejection', {
    onStepOn(source) {
        /**
         * * 方块破坏组件参数解构
         */
        const { block } = StepComponentTrigger(source);
        /**
         * * 实体查询选项
         */
        const setOptions = {
            location: block.center(),
            maxDistance: 1.5,
        };
        /**
         * * 获取实体队列
         */
        const entitys = block.dimension.getEntities(setOptions);
        // 对选中的实体进行向量弹射
        entitys.forEach(entity => {
            try {
                /**
                 * * 获取 向量
                 */
                const Vector = entity.getViewDirection();
                /**
                 * * 计算 水平 弹射 速度
                 */
                const horizontalPower = (Math.abs(Vector.x) + Math.abs(Vector.z)) * 16;
                // 向量弹射
                entity.applyKnockback({ x: Vector.x * horizontalPower, z: Vector.z * horizontalPower }, Math.abs(Vector.y) * 8);
                entity.addEffect('minecraft:slow_falling', 60, { amplifier: 1, showParticles: false });
                entity.addEffect('minecraft:resistance', 200, { amplifier: 31, showParticles: false });
                entity.addEffect('minecraft:hunger', 200, { amplifier: 4, showParticles: false });
            }
            catch {
                // 向量弹射
                entity.applyImpulse({ x: 0, y: Math.random() + 0.1, z: 0 });
            }
        });
    }
});

/*
 * 原版接口
 */
/**
 * * 组件前缀代词
 */
const componentPrefix$6 = 'opal:item.';
/**
 * * 物品自定义组件列表
 */
const components$8 = new Map();
/*
 * 精灵治愈
 */
components$8.set(componentPrefix$6 + 'faerie_healing', {
    onUse(source) {
        /**
         * * 触发自定义组件的玩家
         */
        const player = source.source;
        /**
         * * 触发自定义组件的物品
         */
        const item = source.itemStack;
        /**
         * * 玩家背包
         */
        const container = player.getComponent('inventory')?.container;
        // 判断条件是否满足
        if (!container || !player || !item)
            return;
        // 判断是否冷却完成
        if (!TriggerControl(item.typeId, player, 100))
            return;
        /**
         * * 定义 查询实体 的 参数
         */
        const options = {
            excludeTypes: ["minecraft:item", "minecraft:xp_orb"],
            excludeFamilies: ["monster"],
            location: player.location,
            maxDistance: 8
        };
        // 获取 附近的实体 并 赋予 生命恢复效果
        player.dimension.getEntities(options).forEach(entity => entity.addEffect("minecraft:regeneration", 300, { amplifier: 4, showParticles: false }));
        /**
         * * 定义 粒子参数
         */
        const molang = new server.MolangVariableMap();
        molang.setFloat('variable.size', 8);
        molang.setFloat('variable.direction', 3);
        // 播放 音效
        player.playSound('item.book.page_turn');
        // 播放 粒子效果
        TrySpawnParticle(player.dimension, 'scripts:path_spiral', player.location, molang);
        // 更新 物品冷却
        item.getComponent('minecraft:cooldown')?.startCooldown(player);
        // 更新 物品耐久
        SetDurability(player, item, container, player.selectedSlotIndex, 1);
    }
});
/*
 * 林业指南
 */
components$8.set(componentPrefix$6 + 'forestry_guidelines', {
    onUse(source) {
        /**
         * * 触发自定义组件的玩家
         */
        const player = source.source;
        /**
         * * 触发自定义组件的物品
         */
        const item = source.itemStack;
        /**
         * * 玩家背包
         */
        const container = player.getComponent('inventory')?.container;
        // 判断条件是否满足
        if (!container || !player || !item)
            return;
        // 判断是否冷却完成
        if (!TriggerControl(item.typeId, player, 100))
            return;
        /**
         * * 定义 起始点
         */
        const start = Vector.add(player.location, { x: -5, y: -1, z: -5 });
        /**
         * * 定义 结束点
         */
        const done = Vector.add(player.location, { x: 5, y: 15, z: 5 });
        /**
         * * 在 绘制路径 时 执行 的 程序
         */
        const moveEvent = (args) => {
            /**
             * * 检测方块是否需要被挖掘
             */
            const TestSort = () => {
                /**
                 * * 获取 方块对象
                 */
                const getBlock = args.dimension.getBlock(args.location);
                // 检测 方块类型
                if (getBlock)
                    return is_trees.has(getBlock.typeId);
                else
                    return false;
            };
            //执行路径事件的功能
            if (TestSort())
                args.dimension.runCommand(`fill ${args.location.x} ${args.location.y} ${args.location.z} ${args.location.x} ${args.location.y} ${args.location.z} air [] destroy`);
            // 继续循环
            return true;
        };
        // 播放 音效
        player.playSound('item.book.page_turn');
        // 创建 路径执行计划
        PathExecute.CreateForCube('林业指南-范围扫描', {
            particles: ['constant:track_rune_green'],
            locations: [],
            dimension: player.dimension,
            cooldown: 1,
            speed: 1,
            on_move: moveEvent
        }, start, done, 0.25);
        // 更新 物品冷却
        item.getComponent('minecraft:cooldown')?.startCooldown(player);
        // 更新 物品耐久
        SetDurability(player, item, container, player.selectedSlotIndex, 1);
    }
});
/*
 * 矿物辞典
 */
components$8.set(componentPrefix$6 + 'mineral_dictionary', {
    onUse(source) {
        /**
         * * 触发自定义组件的玩家
         */
        const player = source.source;
        /**
         * * 触发自定义组件的物品
         */
        const item = source.itemStack;
        /**
         * * 玩家背包
         */
        const container = player.getComponent('inventory')?.container;
        // 判断条件是否满足
        if (!container || !player || !item)
            return;
        // 判断是否冷却完成
        if (!TriggerControl(item.typeId, player, 100))
            return;
        /**
         * * 定义 起始点
         */
        const start = Vector.add(player.location, { x: -5, y: -9, z: -5 });
        /**
         * * 定义 结束点
         */
        const done = Vector.add(player.location, { x: 5, y: 9, z: 5 });
        /**
         * * 在 绘制路径 时 执行 的 程序
         */
        const moveEvent = (args) => {
            /**
             * * 检测方块是否需要被挖掘
             */
            const TestSort = () => {
                /**
                 * * 获取 方块对象
                 */
                const getBlock = args.dimension.getBlock(args.location);
                // 检测 方块类型
                if (getBlock)
                    return is_mineral.has(getBlock.typeId);
                else
                    return false;
            };
            //执行路径事件的功能
            if (TestSort()) {
                // 执行填充方块命令
                args.dimension.runCommand(`fill ${args.location.x} ${args.location.y} ${args.location.z} ${args.location.x} ${args.location.y} ${args.location.z} air [] destroy`);
                /**
                 * * 定义 掉落物 的 参数
                 */
                const options = {
                    location: args.location,
                    type: "minecraft:item",
                    maxDistance: 4
                };
                // 获取附近的掉落物
                args.dimension.getEntities(options).forEach(entity => entity.teleport(player.getHeadLocation(), { dimension: player.dimension }));
            }
            // 继续循环
            return true;
        };
        // 播放 音效
        player.playSound('item.book.page_turn');
        // 创建 路径执行计划
        PathExecute.CreateForCube('矿物辞典-范围扫描', {
            particles: ['constant:track_color_rainbow'],
            locations: [],
            dimension: player.dimension,
            cooldown: 1,
            speed: 1,
            on_move: moveEvent
        }, start, done, 0.25);
        // 更新 物品冷却
        item.getComponent('minecraft:cooldown')?.startCooldown(player);
        // 更新 物品耐久
        SetDurability(player, item, container, player.selectedSlotIndex, 1);
    }
});
/*
 * 空间宝典
 */
components$8.set(componentPrefix$6 + 'space_transition', {
    onUse(source) {
        /**
         * * 触发自定义组件的玩家
         */
        const player = source.source;
        /**
         * * 触发自定义组件的物品
         */
        const item = source.itemStack;
        /**
         * * 玩家背包
         */
        const container = player.getComponent('inventory')?.container;
        // 判断条件是否满足
        if (!container || !player || !item)
            return;
        // 判断是否冷却完成
        if (!TriggerControl(item.typeId, player, 100))
            return;
        /**
         * * 诸界道标 数据信息
         */
        const RoadSign = new Map();
        // 获取 所有 道标
        player.getDynamicPropertyIds().filter(id => id.startsWith('road_sign:')).forEach(id => CompileSign(player, id, RoadSign));
        // 播放 音效
        player.playSound('item.book.page_turn');
        //当玩家处于潜行时 触发的随机传送机制
        if (player.isSneaking) {
            /**
             * * 获取 可用 的 着陆点
             */
            const anchor = QueryEntityFoothold(player, [...area_legend.keys()], 10, 512);
            //执行传送流程 并 播放音效
            if (Vector.distance(anchor, player.location) > 3)
                player.teleport(anchor);
            // 播放音效
            server.system.runTimeout(() => player.playSound("conduit.attack"), 5);
        }
        else
            basePresets().show(player).then(option => {
                if (option.canceled)
                    return;
                switch (option.selection) {
                    //相对传送
                    case 0:
                        relativePresets().show(player).then(option => renRelative(player, option));
                        break;
                    //随机传送
                    case 1:
                        randomPresets().show(player).then(option => renRandom(player, option));
                        break;
                    //诸界道标
                    case 2:
                        signPresets(RoadSign).show(player).then(option => renRoadSign(player, option, RoadSign));
                        break;
                }
            });
        // 更新 物品冷却
        item.getComponent('minecraft:cooldown')?.startCooldown(player);
        // 更新 物品耐久
        SetDurability(player, item, container, player.selectedSlotIndex, 1);
    }
});
/**
 * * 用于显示各种传送模式的基础窗口
 */
function basePresets() {
    /**
     * * 定义了 窗口界面 的 标题
     */
    const title = {
        text: "§9《§5 空间宝典 §9》§r"
    };
    /**
     * * 定义了 窗口界面 的 选项
     */
    const option = [
        { text: '<§4§o§l 相对传送 §r>' },
        { text: '<§5§o§l 随机传送 §r>' },
        { text: '<§9§o§l 诸界道标 §r>' }
    ];
    /**
     * * 定义了 窗口界面 的 表单对象
     */
    const display = new serverUI.ActionFormData()
        .title(title)
        .button(option[0], "textures/物品贴图/魔法书籍/空间宝典")
        .button(option[1], "textures/物品贴图/魔法书籍/魔导手册")
        .button(option[2], "textures/物品贴图/魔法书籍/空间宝典");
    //输出 表单对象
    return display;
}
/**
 * * 用于显示[ 相对坐标 ]< 传送机制 >的设置窗口
 */
function relativePresets() {
    /**
     * * 定义了 窗口界面 的 标题
     */
    const title = {
        text: "§9《§5 空间宝典 §9》§r"
    };
    /**
     * * 定义了 窗口界面 的 滑动条标题
     */
    const option = [
        { text: '§3相对§a X轴坐标§r' },
        { text: '§3相对§a Y轴坐标§r' },
        { text: '§3相对§a Z轴坐标§r' }
    ];
    /**
     * * 定义了 窗口界面 的 表单对象
     */
    const display = new serverUI.ModalFormData()
        .title(title)
        .slider(option[0], -64, 64, { 'valueStep': 1, 'defaultValue': 0 })
        .slider(option[1], -64, 64, { 'valueStep': 1, 'defaultValue': 0 })
        .slider(option[2], -64, 64, { 'valueStep': 1, 'defaultValue': 0 });
    //输出 表单对象
    return display;
}
/**
 * * 用于显示[ 随机坐标 ]< 传送机制 >的设置窗口
 */
function randomPresets() {
    /** 定义了 窗口界面 的 标题 */
    const title = {
        text: "§9《§5 空间宝典 §9》§r"
    };
    /** 定义了 窗口界面 的 滑动条标题 */
    const option = [
        { text: '§3偏移§a X轴基准§r' },
        { text: '§3偏移§a Y轴基准§r' },
        { text: '§3偏移§a Z轴基准§r' },
        { text: '§3设置§a 极限范围§r' }
    ];
    /** 定义了 窗口界面 的 表单对象 */
    const display = new serverUI.ModalFormData()
        .title(title)
        .slider(option[0], -16, 16, { 'valueStep': 1, 'defaultValue': 0 })
        .slider(option[1], -16, 16, { 'valueStep': 1, 'defaultValue': 0 })
        .slider(option[2], -16, 16, { 'valueStep': 1, 'defaultValue': 0 })
        .slider(option[3], 16, 255, { 'valueStep': 1, 'defaultValue': 16 });
    //输出 表单对象
    return display;
}
/**
 * * 用于显示[ 诸界道标 ]< 传送机制 >的设置窗口
 */
function signPresets(input) {
    /**
     * * 获取 道标名称
     */
    const name = Array.from(input.keys()).map(id => `§n§o§l§${Math.floor(Math.random() * 6)}` + id.split(':')[1]);
    /** 定义了 窗口界面 的 标题 */
    const title = {
        text: "§9《§5 空间宝典 §9》§r"
    };
    /** 定义了 窗口界面 的 选项 */
    const option = [
        { text: '<§2§o§l 创建道标 §r>' },
        { text: '<§5§o§l 道标传送 §r>' },
        { text: '<§4§o§l 移除道标 §r>' }
    ];
    /** 定义了 窗口界面 的 输入栏提示 */
    const text = [
        { text: '<§2§o§l 识别标签 §r> -> §9重命名' },
        { text: '§c请输入 诸界道标 识别标签§r' },
        { text: '§c是否启用<§2§o§l 雾海裂隙 §r>§r' }
    ];
    /** 定义了 窗口界面 的 表单对象 */
    const display = new serverUI.ModalFormData()
        .title(title)
        .dropdown('', name.length !== 0 ? name : ["§4暂无 §9道标信息§r"], { 'defaultValueIndex': (name.length > 1 ? name.length - 1 : 0) })
        .dropdown('', option, { 'defaultValueIndex': (name.length !== 0 ? 1 : 0) })
        .textField(text[0], text[1], { 'defaultValue': BriefID() })
        .toggle(text[2], { 'defaultValue': false });
    //输出 表单对象
    return display;
}
/**
 * * 执行 相对传送
 */
function renRelative(player, option) {
    //检测玩家是否退出窗口
    if (option.canceled)
        return;
    /**
     * * 获取 目标位置
     */
    const location = Vector.add(player.location, {
        x: parseInt(option.formValues[0]),
        y: parseInt(option.formValues[1]),
        z: parseInt(option.formValues[2]),
    });
    // 传送玩家
    player.teleport(location);
    // 播放音效
    server.system.runTimeout(() => player.playSound("mob.endermen.portal"), 2);
}
/**
 * * 执行 随机传送
 */
function renRandom(player, option) {
    //检测玩家是否退出窗口
    if (option.canceled)
        return;
    /**
     * * 获取 目标位置
     */
    const location = Vector.add(player.location, {
        x: parseInt(option.formValues[0]),
        y: parseInt(option.formValues[1]),
        z: parseInt(option.formValues[2]),
    });
    /**
     * * 获取锚点位置
     */
    const anchor = QueryFoothold({ location: location, dimension: player.dimension }, parseInt(option.formValues[3]), -60, 300);
    // 传送玩家
    player.teleport(anchor);
    // 播放音效
    server.system.runTimeout(() => player.playSound("mob.endermen.portal"), 5);
}
/**
 * * 执行 道标传送
 */
function renRoadSign(player, option, input) {
    //检测玩家是否退出窗口
    if (!option.formValues)
        return;
    /**
     * * 获取 道标参数
     */
    const value = Array.from(input.values());
    /**
     * * 获取 道标名称
     */
    const name = Array.from(input.keys());
    /**
     * * 指向 玩家 开始传送的 位置
     */
    const pointLocation = player.location;
    /**
     * * 指向 玩家 开始传送的 维度
     */
    const pointDimension = player.dimension;
    /**
     * * 获取 玩家的 输入信息
     */
    const forms = option.formValues;
    /**
     * * 获取 玩家自身 的 锚点信息
     */
    const selfAnchor = JSON.stringify({ location: player.location, dimension: player.dimension.id });
    // 根据 选项 进行 不同 处理
    switch (forms[1]) {
        //新增 道标信息
        case 0:
            player.setDynamicProperty('road_sign:' + forms[2], selfAnchor);
            break;
        //使用 道标信息
        case 1:
            // 判断是否开启 雾海裂隙
            if (forms[3])
                server.system.runTimeout(() => mistySeaFissure(player, pointLocation, pointDimension), 5);
            // 传送玩家
            player.teleport(value[forms[0]].location, { dimension: value[forms[0]].dimension });
            // 播放音效
            server.system.runTimeout(() => player.playSound("mob.endermen.portal"), 5);
            break;
        //移除 道标信息
        case 2:
            player.setDynamicProperty(name[forms[0]]);
            break;
    }
}
/**
 * * 执行 雾海裂隙
 */
function mistySeaFissure(player, location, dimension) {
    /**
     * * 获取 玩家自身 的 锚点信息
     */
    const origin = Vector.add(player.location, Vector.CONSTANT_UP);
    // 创建 雾海裂隙
    server.system.runTimeout(() => {
        MistySeaFissure.BriefCreate('诸界道标所创建的一次性雾海裂隙效果', {
            locations: [
                origin,
                location
            ],
            dimensions: [
                player.dimension,
                dimension
            ]
        });
        player.playSound("ambient.weather.thunder", { location: player.location, volume: 10 });
        TrySpawnParticle(player.dimension, 'constant:fireworks_fireball_amber_color', origin);
        TrySpawnParticle(player.dimension, 'constant:smoke_rune_white', origin);
    }, 100);
}
/*
 * 精灵结契
 */
components$8.set(componentPrefix$6 + 'faerie_contract', {
    onUse(source) {
        /**
         * * 触发自定义组件的玩家
         */
        const player = source.source;
        /**
         * * 触发自定义组件的物品
         */
        const item = source.itemStack;
        /**
         * * 玩家背包
         */
        const container = player.getComponent('inventory')?.container;
        // 判断条件是否满足
        if (!container || !player || !item)
            return;
        // 判断是否冷却完成
        if (!TriggerControl(item.typeId, player, 100))
            return;
        /**
         * * 设定查询参数
         */
        const options = {
            excludeTypes: ["minecraft:item", "minecraft:xp_orb", "minecraft:player"]
        };
        /**
         * * 获取 实体 的 距离信息
         */
        const Distance = (entity) => Math.floor(Vector.distance(player.location, entity.location));
        /**
         * * 获取 实体组 并 过滤掉 无法驯服的实体
         */
        const queue = EntitysSort(player.dimension, options, (a, b) => Distance(a) - Distance(b), entity => entity.getComponent('minecraft:tameable') && !entity.getComponent('minecraft:tameable')?.isTamed);
        /**
         * * 定义了 窗口界面 的 标题
         */
        const title = {
            text: "§9《§5 精灵结契 §9》§r"
        };
        /**
         * * 定义了 窗口界面 的 表单对象
         */
        const display = new serverUI.ActionFormData().title(title);
        /**
         * * 获取 实体 的 名称信息
         */
        const Intel = (entity) => {
            return {
                rawtext: [
                    { text: '§l' },
                    translate(entity),
                    { text: `\n§9距离: §5${Distance(entity)}` }
                ]
            };
        };
        /**
         * 获取玩家选择的槽位
         */
        const slotIndex = player.selectedSlotIndex;
        // 遍历 实体数组 并 加入 按钮
        if (queue.length >= 1)
            queue.forEach(entity => display.button(Intel(entity), "textures/物品贴图/魔法书籍/精灵结契"));
        else
            display.button('§4§l周围不存在 §c<§9 可以§6<§u 契约 §6>§9的实体 §c>§r', "textures/物品贴图/魔法书籍/战术规划");
        // 播放 音效
        player.playSound('item.book.page_turn');
        // 显示 窗口界面
        display.show(player).then(option => {
            if (option.selection == undefined || queue.length == 0)
                return;
            // 契约 实体
            queue[option.selection].getComponent('minecraft:tameable')?.tame(player);
            // 移除 物品
            server.system.runTimeout(() => container?.setItem(slotIndex), 5);
            // 播放 音效
            server.system.runTimeout(() => player.playSound('conduit.deactivate'), 1);
        });
        // 更新 物品冷却
        item.getComponent('minecraft:cooldown')?.startCooldown(player);
    }
});
/*
 * 魔法绪论
 */
components$8.set(componentPrefix$6 + 'introduction_magic', {
    onUse(source) {
        /**
         * * 触发自定义组件的玩家
         */
        const player = source.source;
        /**
         * * 触发自定义组件的物品
         */
        const item = source.itemStack;
        // 判断条件是否满足
        if (!player || !item)
            return;
        // 判断是否冷却完成
        if (!TriggerControl(item.typeId, player, 20))
            return;
        // 显示 区块边界
        DisplayChunkBoundary(player);
        /**
         * * 获取 当前区块的消息通知
         */
        const notify = message_notify;
        // 判断当前区块是否具有消息通知
        if (!notify || notify.size < 1)
            return player.playSound('respawn_anchor.deplete');
        /**
         * * 消息通知 的 类型
         */
        const keys = Array.from(notify.keys());
        /**
         * * 获取 消息通知 的 内容信息
         */
        const value = Array.from(notify.values());
        /**
         * * 定义了 窗口界面 的 标题
         */
        const title = { text: "§9《§5 魔导绪论 §9》§r" };
        /**
         * * 当前区块内 消息通知 的 全部内容
         */
        const rawMessage = { rawtext: [] };
        /**
         * * 定义了 窗口界面 的 表单对象
         */
        const display = new serverUI.ActionFormData().title(title).button('§u§l关闭§r').button('§4§l清除§r');
        // 编写 消息通知 的 内容信息
        keys.forEach((key, index) => {
            rawMessage.rawtext?.push({ text: `『 ${key} 』\n` }, value[index], { text: '\n\n=====================\n' });
        });
        // 将 消息通知 的 内容信息 写入 窗口界面
        display.body(rawMessage);
        // 显示 窗口界面
        display.show(player).then(option => {
            if (option.canceled || option.selection == undefined)
                return;
            if (option.selection == 1)
                notify.clear();
        });
        // 播放 使用音效
        player.playSound('beacon.activate');
        // 更新 物品冷却
        item.getComponent('minecraft:cooldown')?.startCooldown(player);
    }
});
/*
 * 源能秘典
 */
components$8.set(componentPrefix$6 + 'source_energy', {
    onUse(source) {
        /**
         * 触发自定义组件的玩家
         *
         * @type {server.Player}
         */
        const player = source.source;
        /**
         * 触发自定义组件的物品
         *
         * @type {server.ItemStack | undefined}
         */
        const item = source.itemStack;
        /**
         * 判断条件是否满足 如果玩家或物品为空, 则直接返回
         */
        if (!player || !item)
            return;
        /**
         * 判断是否冷却完成 如果冷却未完成, 则直接返回
         */
        if (!TriggerControl(item.typeId, player, 20))
            return;
        /**
         * 创建表单内容
         */
        sourceEnergy(player);
        /**
         * 播放翻书音效, 提示玩家操作成功
         */
        player.playSound('item.book.page_turn');
        /**
         * 为物品设置冷却时间
         */
        item.getComponent('minecraft:cooldown')?.startCooldown(player);
    }
});
/**
 * 源能秘典的表单逻辑
 *
 * 展示源能秘典的目录页和详情页
 *
 * @param {server.Player} player - 玩家对象
 */
function sourceEnergy(player) {
    /**
     * 获取所有引导文本的标题
     *
     * @type {string[]}
     */
    const keys = Array.from(help.keys());
    /**
     * 获取所有引导文本的内容
     *
     * @type {server.RawMessage[][]}
     */
    const value = Array.from(help.values()).map(item => item.map(info => info.refer));
    /**
     * 定义了 窗口界面 的 标题
     *
     * @type {server.RawMessage}
     */
    const title = {
        text: "§9《§5 源能秘典 §9》§r"
    };
    /**
     * 创建源能秘典的目录页表单
     *
     * @type {serverUI.ActionFormData}
     */
    const display = new serverUI.ActionFormData().title(title);
    /**
     * 遍历 引导文本 并 加入 按钮
     *
     * 为目录页表单添加按钮, 每个按钮对应一个引导文本的标题
     */
    keys.forEach(key => display.button('§l§u' + key, "textures/物品贴图/魔法书籍/源能秘典"));
    /**
     * 展示源能秘典的目录页表单
     *
     * @param {server.Player} player - 玩家对象
     */
    display.show(player).then(option => {
        /**
         * 判断玩家是否取消操作或选择无效
         *
         * 如果玩家取消操作或选择无效, 则直接返回
         */
        if (option.canceled || option.selection == undefined)
            return;
        /**
         * 创建源能秘典的详情页表单
         *
         * @type {serverUI.ActionFormData}
         */
        const action = new serverUI.ActionFormData().title('§l§u§o' + keys[option.selection]).body({ rawtext: value[option.selection] });
        /**
         * 为详情页表单添加关闭和返回按钮
         */
        action.button('§4§l关闭§r').button('§u§l返回§r');
        /**
         * 展示源能秘典的详情页表单, 并处理玩家的按钮选择
         */
        action.show(player).then(option => {
            /**
             * 如果玩家取消操作或选择无效, 则直接返回
             */
            if (option.canceled || option.selection == undefined)
                return;
            /**
             * 如果玩家点击返回按钮, 则重新展示目录页表单
             */
            option.selection == 1 ? sourceEnergy(player) : undefined;
            /**
             * 播放翻书音效, 提示玩家操作成功
             */
            player.playSound('item.book.page_turn');
        });
    });
}
/**
 * * 定义 魔导手册 功能
 */
function magicHandbook(player, item, block) {
    /**
     * * 根据玩家所持物品或目标方块的类型, 查询并创建情报接口
     */
    const intel = lexiconInterface(player, block?.typeId ?? item.typeId);
    // 使用后, 物品进入冷却状态, 模拟翻书页的音效
    item.getComponent('minecraft:cooldown')?.startCooldown(player);
    player.playSound('item.book.page_turn');
    // 打开情报窗口, 展示查询到的信息
    windowedRetriever(player, intel);
}
/*
 * 幻海集纳
 */
components$8.set(componentPrefix$6 + 'fantasy_sea_collection', {
    onHitEntity(source) {
        /**
         * 被击中的实体
         */
        const entity = source.hitEntity;
        /**
         * 触发自定义组件的物品
         */
        const item = source.itemStack;
        /**
         * 触发自定义组件的玩家
         */
        const player = source.attackingEntity;
        /**
         * 指向方块容器的坐标信息
         */
        const pointer = item?.getDynamicProperty('entity:unload_backpack_to_container');
        // 判断玩家对象是否正确
        if (!(player instanceof server.Player))
            return;
        // 判断是否错误试图修改其他玩家的背包容器
        if (entity instanceof server.Player)
            return player.onScreenDisplay.setActionBar({ text: '§c§l该道具不可对玩家使用!!' });
        // 判断是否记录了坐标
        if (!pointer)
            return player.onScreenDisplay.setActionBar({ text: '§c§l请先设置目标< 方块容器 >坐标' });
        /**
         * 获取 被击中的实体的背包容器
         */
        const container = entity.getComponent('minecraft:inventory')?.container;
        /**
         * 获取 目标容器的 容器对象
         */
        const blockContainer = entity.dimension.getBlock(pointer)?.getComponent('minecraft:inventory')?.container;
        // 判断 容器对象是否存在
        if (!container || !blockContainer)
            return player.onScreenDisplay.setActionBar({ text: '§c§l请确认< 方块容器 >是否 已加载 或 存在 !!' });
        /**
         * 获取 目标容器 剩余存储空间
         */
        let emptySlots = blockContainer.emptySlotsCount;
        /**
         * * 物品组
         */
        const items = [];
        //抽取 实体背包内 指定数量 的物品
        for (let index = 0; index < container.size; index++) {
            /**
             * * 获取 物品
             */
            const getItem = container.getItem(index);
            // 判断 物品是否存在
            if (emptySlots == 0)
                break;
            if (!getItem)
                continue;
            // 将 物品 加入 物品组
            items.push(getItem);
            container.setItem(index);
            emptySlots -= 1;
        }
        //向 容器内 填充物品
        for (let index of items)
            blockContainer.addItem(index);
        // 输出 提示消息
        player.onScreenDisplay.setActionBar(`§7正在远程转移物品, < 方块容器 >的剩余空间为§r:§2 ${emptySlots}`);
    },
    onUseOn(source) {
        /**
         * 玩家点击的方块
         */
        const block = source.block.above() ?? source.block;
        /**
         * 触发自定义组件的物品
         */
        const item = source.itemStack;
        /**
         * 触发自定义组件的玩家
         */
        const player = source.source;
        /**
         * 玩家的背包容器
         */
        const container = player.getComponent('inventory')?.container;
        // 判断玩家对象是否正确
        if (!(player instanceof server.Player))
            return;
        // 判断被选中的方块是否为容器
        if (block?.getComponent('minecraft:inventory')?.container) {
            // 播放粒子效果
            TrySpawnParticle(player.dimension, 'constant:prompt_firefly', player.location);
            // 修正物品数据, 记录方块容器的位置
            item.setDynamicProperty('entity:unload_backpack_to_container', block.location);
            // 更新玩家操作栏提示
            player.onScreenDisplay.setActionBar('§9§l< 方块容器 >位置已更新');
            // 更新玩家背包中的物品
            container?.setItem(player.selectedSlotIndex, item);
            // 播放声音效果
            player.playSound('conduit.attack');
        }
        // 如果不是容器 则进行提示
        else {
            // 如果不是容器, 播放声音并提示玩家
            player.playSound('conduit.deactivate');
            // 在方块中心生成物品
            TrySpawnItem(player.dimension, item, block.center());
            // 更新玩家操作栏提示
            player.onScreenDisplay.setActionBar('§c§l请点击< 方块容器 >下方的方块!');
            // 清空玩家选中的物品
            player.getComponent('minecraft:inventory')?.container?.setItem(player.selectedSlotIndex);
        }
    }
});

/*
 * 原版接口
 */
/**
 * * 组件前缀代词
 */
const componentPrefix$5 = 'opal:item.';
/**
 * * 物品自定义组件列表
 */
const components$7 = new Map();
/*
 * 使用后获得状态效果
 */
components$7.set(componentPrefix$5 + 'use_effect', {
    onConsume(source, data) {
        /**
         * 获取当前使用者
         */
        const { source: entity } = source;
        /**
         * 从数据中获取状态效果参数
         */
        const { effects, min_duration, max_duration, amplifier, health_changes } = data.params;
        /**
         * 获取生物的健康组件
         */
        const health = entity.getComponent('minecraft:health');
        // 遍历状态效果列表
        effects?.forEach(type => entity.addEffect(type, RandomFloor(min_duration || 20, max_duration || 600), { amplifier }));
        // 更新生物的生命值
        health?.setCurrentValue(health.currentValue + (health_changes || 0));
    }
});
/*
 * 蜂火佳肴
 */
components$7.set(componentPrefix$5 + 'bee_fire_cuisine', {
    onConsume(data) {
        /**
         * 获取当前使用者
         */
        const creature = data.source;
        /**
         * 尝试从生物中获取健康组件
         */
        const healthComponent = creature.getComponent('health');
        /**
         * 获取当前血量, 如果健康组件不存在则默认为 0
         */
        const healthValue = healthComponent?.currentValue ?? 0;
        /**
         * 获取生物的 伤害提升 属性值
         */
        const damageIncrease = GetProperty(creature).damage_increase;
        /**
         * 从视锥内获取排除特定家族的实体列表
         */
        const targets = creature.getEntitiesFromViewDirection({ 'excludeFamilies': ['player', 'starry'] });
        /**
         * 尝试获取第一个目标实体
         */
        const target = targets[0]?.entity;
        /**
         * 创建 Molang变量映射, 用于定义粒子效果参数
         */
        const molang = new server.MolangVariableMap();
        // 如果 伤害提升 小于等于血量的10倍, 则将伤害加倍, 并设置玩家为烛火元素
        if (damageIncrease <= healthValue * 10)
            AlterProperty(creature, { 'damage_increase': healthValue * 2, 'self_rune': 'rune_red' });
        // 根据符文颜色设置粒子颜色
        molang.setColorRGB('variable.color', getRuneColor(GetProperty(creature).self_rune));
        // 将粒子方向设置为垂直向下
        molang.setVector3('variable.direction', Vector.CONSTANT_DOWN);
        // 设置粒子的影响范围
        molang.setFloat('variable.range', 5);
        // 设置粒子类型
        molang.setFloat('variable.type', 0);
        // 为生物赋予防火效果, 持续一定时间
        creature.addEffect('fire_resistance', RandomFloor(20, 600));
        // 将生物设置为着火状态, 持续一定时间
        creature.setOnFire(RandomFloor(20, 600));
        // 更新当前血量
        healthComponent?.setCurrentValue(healthValue > 5 ? Math.floor(healthValue * 0.8) : 5); // 如果血量大于5, 则减少到 80%, 否则设为 5
        // 检查目标是否存在且有效
        if (!target || !target.isValid)
            return;
        // 在目标的特定位置播放粒子效果
        TrySpawnParticle(creature.dimension, 'scripts:path_spurt', Vector.add(target.location, { x: 0, y: 4, z: 0 }), molang);
        // 对目标进行元素攻击, 根据生物是否暴击使用不同的攻击方法
        ElementalAttack(creature, target, IsErupt(creature));
    }
});
/*
 * 通用食物效果 - 野蜂
 */
components$7.set(componentPrefix$5 + 'general_food_effects_wild_bee', {
    onConsume(data) {
        /**
         * 获取当前使用者
         */
        const creature = data.source;
        /**
         * 尝试获取生物的健康组件
         */
        const healthComponent = creature.getComponent('health');
        /**
         * 获取当前血量, 若无健康组件则默认为 5
         */
        const healthValue = healthComponent?.currentValue || 5;
        /**
         * 基于视线方向获取方块位置偏移
         */
        const blockDeviation = creature.getBlockFromViewDirection()?.block.location;
        /**
         * 目标位置基于生物自身方向计算偏移
         */
        const selfDeviation = Vector.multiply(creature.getViewDirection(), 16).add(creature.location);
        /**
         * 目标位置为最高可站立方块或计算点本身
         */
        const targetLocation = creature.dimension.getTopmostBlock(blockDeviation || selfDeviation)?.center() || selfDeviation;
        // 更新血量：若当前血量大于 5, 则减少至 80%, 否则设为 5
        healthComponent?.setCurrentValue(healthValue > 5 ? Math.floor(healthValue * 0.8) : 5);
        // 将生物传送到目标位置
        creature.teleport(targetLocation);
        // 将生物赋予防火效果, 持续时间为随机值（20-600 秒）
        creature.addEffect('fire_resistance', RandomFloor(20, 600));
        // 将生物设置为着火状态, 持续时间为随机值（20-600 秒）
        creature.setOnFire(RandomFloor(20, 600));
        // 在目标位置播放声音效果
        creature.dimension.playSound('respawn_anchor.set_spawn', targetLocation);
    }
});
/*
 * 通用食物效果 - 渊鲸
 */
components$7.set(componentPrefix$5 + 'general_food_effects_abyssal_whale', {
    async onConsume(data) {
        /**
         * 获取当前使用者
         */
        const creature = data.source;
        /**
         * 尝试获取生物的健康组件
         */
        const healthComponent = creature.getComponent('health');
        /**
         * 获取当前血量, 若无健康组件则默认为 5
         */
        const healthValue = healthComponent?.currentValue || 5;
        /**
         * 拷贝当前坐标
         */
        const location = Vector.copy(creature.location);
        // 更新血量：若当前血量大于 5, 则减少至 80%, 否则设为 5
        healthComponent?.setCurrentValue(healthValue > 5 ? Math.floor(healthValue * 0.8) : 5);
        // 将生物赋予潮涌能量效果, 持续时间为随机值（20-600 秒）
        creature.addEffect('conduit_power', RandomFloor(20, 600));
        // 将生物赋予生命提升效果, 持续时间为随机值（20-600 秒）
        creature.addEffect('health_boost', RandomFloor(20, 600), { 'amplifier': 4 });
        // 熄灭实体身上的火焰
        creature.extinguishFire();
        // 在当前位置范围内寻找空气并替换为水
        TryProcessBlocksInVolume(creature.dimension, location, 4, { 'includeTypes': ['minecraft:air'] }, (block) => block.setType('minecraft:flowing_water'));
        // 等待60个游戏刻
        await server.system.waitTicks(60);
        // 在当前位置范围内寻找水并替换为空气
        TryProcessBlocksInVolume(creature.dimension, location, 8, { 'includeTypes': ['minecraft:flowing_water', 'minecraft:water'] }, (block) => block.setType('minecraft:air'));
    }
});
/*
 * 通用食物效果 - 灵蜥
 */
components$7.set(componentPrefix$5 + 'general_food_effects_spirit_lizard', {
    async onConsume(data) {
        /**
         * 获取当前使用者
         */
        const creature = data.source;
        /**
         * 尝试获取生物的健康组件
         */
        const healthComponent = creature.getComponent('health');
        /**
         * 获取当前血量, 若无健康组件则默认为 5
         */
        const healthValue = healthComponent?.currentValue || 5;
        // 更新血量：若当前血量大于 5, 则减少至 80%, 否则设为 5
        healthComponent?.setCurrentValue(healthValue > 5 ? Math.floor(healthValue * 0.8) : 5);
        // 将生物赋予跳跃提升效果, 持续时间为随机值（20-600 秒）
        creature.addEffect('jump_boost', RandomFloor(20, 600), { 'amplifier': 4 });
        // 将生物赋予迅捷效果, 持续时间为随机值（20-600 秒）
        creature.addEffect('speed', RandomFloor(20, 600), { 'amplifier': 4 });
        // 等待60个游戏刻
        await server.system.waitTicks(60);
        // 将生物赋予黑暗效果, 持续时间为随机值（20-600 秒）
        creature.addEffect('darkness', RandomFloor(20, 600));
    }
});
/*
 * 通用食物效果 - 蝰蛇
 */
components$7.set(componentPrefix$5 + 'general_food_effects_viper', {
    async onConsume(data) {
        /**
         * 获取当前使用者
         */
        const creature = data.source;
        /**
         * 尝试获取生物的健康组件
         */
        const healthComponent = creature.getComponent('health');
        /**
         * 获取当前血量, 若无健康组件则默认为 5
         */
        const healthValue = healthComponent?.currentValue || 5;
        // 更新血量：若当前血量大于 5, 则减少至 80%, 否则设为 5
        healthComponent?.setCurrentValue(healthValue > 5 ? Math.floor(healthValue * 0.8) : 5);
        // 将生物赋予抗性提升效果, 持续时间为随机值（20-600 秒）
        creature.addEffect('resistance', RandomFloor(20, 600), { 'amplifier': 4 });
        // 将生物赋予虚弱效果, 持续时间为随机值（20-600 秒）
        creature.addEffect('weakness', RandomFloor(20, 600), { 'amplifier': 4 });
        // 等待60个游戏刻
        await server.system.waitTicks(60);
        // 将生物赋予隐身效果, 持续时间为随机值（20-600 秒）
        creature.addEffect('invisibility', RandomFloor(20, 600));
        // 将生物赋予力量效果, 持续时间为随机值（20-600 秒）
        creature.addEffect('strength', RandomFloor(20, 600));
    }
});

/*
 * 原版接口
 */
/**
 * * 装备事件触发器
 */
class EquipmentEventTrigger extends Template {
    /**
     * * 物品被动事件触发器
     *
     * @param {server.Player} player 执行物品被动事件的玩家
     */
    Trigger(player) {
        /**
         * * 装备容器
         */
        const equippable = player.getComponent('minecraft:equippable');
        /**
         * * 物品槽位
         */
        const itemSlot = Object.values(server.EquipmentSlot);
        // 遍历物品槽位 并 基于物品类型执行对应事件
        itemSlot.map(slot => equippable?.getEquipment(slot)).forEach((item, index) => {
            switch (item?.typeId) {
                case 'starry_map:purple_gold_soul_jade':
                    purpleGoldSoulJade(player, item, itemSlot[index], equippable);
                    break;
                case 'starry_map:scarlet_flame_heart':
                    scarletFlameHeart(player, item, itemSlot[index], equippable);
                    break;
                case 'starry_map:starry_night_bead':
                    starryNightBead(player, item, itemSlot[index], equippable);
                    break;
                case 'starry_map:ice_essence_gem':
                    iceEssenceGem(player, item, itemSlot[index], equippable);
                    break;
                case 'starry_map:azure_sea_tide':
                    azureSeaTide(player, item, itemSlot[index], equippable);
                    break;
                case 'starry_map:magic_crystal_shield':
                    magicCrystalShield$1(player);
                    break;
                case 'starry_map:ocean_blessed_scarf':
                    seasInRing(player);
                    break;
            }
        });
    }
    ;
    afterPlanEvent() {
        /**
         * * 获取 全体玩家
         */
        const players = server.world.getAllPlayers();
        // 遍历玩家队列
        players.forEach(player => this.Trigger(player));
    }
    ;
    /**
     * * 简短的容器构造器
     *
     * @param nameTag - 容器名称
     */
    static BriefCreate(nameTag) {
        return this.Create(nameTag, 100, {});
    }
    ;
}
/**
 * * 诸海之环 技能效果
 *
 * @param {server.Player} player - 穿着装备的玩家
 */
function seasInRing(player) {
    /**
     * * 实体过滤选项
     */
    const options = {
        excludeFamilies: ['monster'],
        location: player.location,
        maxDistance: 8,
        closest: 8
    };
    /**
     * * 实体排序
     */
    const onSort = (entity0, entity1) => {
        const distance0 = Vector.distance(player.location, entity0.location);
        const distance1 = Vector.distance(player.location, entity1.location);
        return distance0 - distance1;
    };
    /**
     * * 实体筛选
     */
    const onFilter = (target) => {
        return target.id === player.id || target.getDynamicProperty('entity:contract_user') == player.id;
    };
    /**
     * * 实体队列
     */
    const entitys = EntitysSort(player.dimension, options, onSort, onFilter);
    // 造成 范围 瞬间治疗 效果
    entitys.forEach(entity => entity.addEffect('minecraft:instant_health', 1, { amplifier: 2, showParticles: false }));
    // 判断玩家是否在液体内
    if (!player.isInWater)
        return;
    // 赋予玩家 额外的 状态效果
    player.addEffect('minecraft:conduit_power', 300, { showParticles: false });
    /**
     * * 生成 珍珠游鱼 实体
     */
    const fish = TrySpawnEntity(player.dimension, 'starry_map:elves.fish_of_pearl', player.location);
    if (fish instanceof Error)
        return;
    // 赋予动态属性
    player.getDynamicPropertyIds().forEach(id => fish.setDynamicProperty(id, player.getDynamicProperty(id)));
    // 校准 珍珠游鱼 的属性
    fish.setDynamicProperty('entity:improve', max_experience);
    fish.setDynamicProperty('entity:contract_user', player.id);
    fish.setDynamicProperty('entity:unlock', true);
}
/**
 * * 魔晶盾牌 技能效果
 *
 * @param {server.Player} player - 穿着装备的玩家
 */
function magicCrystalShield$1(player) {
    // 为玩家附着状态效果
    player.addEffect('minecraft:absorption', 300, { amplifier: 8, showParticles: false });
    player.addEffect('minecraft:resistance', 300, { amplifier: 2, showParticles: false });
}
/**
 * * 星夜凝华 技能效果
 *
 * @param {server.Player} player - 穿着装备的玩家
 */
function starryNightBead(player, item, slot, equippable) {
    // 消耗 1 点耐久
    equippable?.setEquipment(slot, AlterDurability(item, 1));
    // 为玩家附着状态效果
    player.addEffect('minecraft:night_vision', 600, { showParticles: false });
    player.addEffect('minecraft:haste', 300, { amplifier: 2, showParticles: false });
}
/**
 * * 紫晶魂玉 技能效果
 *
 * @param {server.Player} player - 穿着装备的玩家
 */
function purpleGoldSoulJade(player, item, slot, equippable) {
    // 消耗 1 点耐久
    equippable?.setEquipment(slot, AlterDurability(item, 1));
    // 为玩家附着状态效果
    player.addEffect('minecraft:village_hero', 300, { showParticles: false });
    player.addEffect('minecraft:trial_omen', 300, { showParticles: false });
}
/**
 * * 寒冰灵韵 技能效果
 *
 * @param {server.Player} player - 穿着装备的玩家
 */
function iceEssenceGem(player, item, slot, equippable) {
    // 消耗 1 点耐久
    equippable?.setEquipment(slot, AlterDurability(item, 1));
    /**
     * * 实体过滤选项
     */
    const options = {
        families: ['monster'],
        location: player.location,
        maxDistance: 24,
        closest: 8
    };
    /**
     * * 实体筛选
     */
    const entitys = player.dimension.getEntities(options);
    // 为玩家附着状态效果
    player.addEffect('minecraft:speed', 300, { amplifier: 2, showParticles: false });
    // 为怪物附加状态效果
    entitys.forEach(entity => entity.addEffect('minecraft:slowness', 300, { amplifier: 4 }));
}
/**
 * * 碧海潮生 技能效果
 *
 * @param {server.Player} player - 穿着装备的玩家
 */
function azureSeaTide(player, item, slot, equippable) {
    // 消耗 1 点耐久
    equippable?.setEquipment(slot, AlterDurability(item, 1));
    // 为玩家附着状态效果
    player.addEffect('minecraft:conduit_power', 600, { showParticles: false });
    player.addEffect('minecraft:weaving', 300, { showParticles: false });
}
/**
 * * 赤焰灵心 技能效果
 *
 * @param {server.Player} player - 穿着装备的玩家
 */
function scarletFlameHeart(player, item, slot, equippable) {
    // 消耗 1 点耐久
    equippable?.setEquipment(slot, AlterDurability(item, 1));
    // 为玩家附着状态效果
    player.addEffect('minecraft:fire_resistance', 300, { showParticles: false });
    player.addEffect('minecraft:strength', 300, { amplifier: 2, showParticles: false });
}

/*
 * 原版接口
 */
/**
 * * 组件前缀代词
 */
const componentPrefix$4 = 'opal:item.';
/**
 * * 物品自定义组件列表
 */
const components$6 = new Map();
/*
 * 状态侦测
 */
components$6.set(componentPrefix$4 + 'stateful_inspection', {
    onUse(source) {
        /**
         * * 触发自定义组件的玩家
         */
        const player = source.source;
        /**
         * * 触发自定义组件的物品
         */
        const item = source.itemStack;
        /**
         * * 获取玩家的背包容器
         */
        const container = player.getComponent('inventory')?.container;
        // 如果玩家、背包或物品不存在, 则不执行后续操作
        if (!container || !player || !item)
            return;
        // 检查物品是否冷却完毕, 如果没有冷却完毕则不执行后续操作
        if (!TriggerControl(item.typeId, player, 20))
            return;
        /**
         * * 获取 状态信息
         */
        const message = GetTargetIntel(player);
        // 如果没有获取到状态信息, 则向玩家发送错误消息并返回
        if (message.length === 0) {
            player.sendMessage([translate(player), { text: '-> <§l§9 状态侦测 §r>未能找到你所指向的目标' }]);
            return;
        }
        // 根据玩家是否潜行, 决定如何显示状态信息
        if (player instanceof server.Player && player.isSneaking)
            player.sendMessage([...message, '\n']);
        // 玩家未潜行时, 显示状态信息界面
        else if (player instanceof server.Player && !player.isSneaking)
            new serverUI
                .ActionFormData()
                .title('§9<§l 状态信息 §r§9>')
                .body({ rawtext: message })
                .button('§4§l关闭§r')
                .button('§9§l导出§r')
                .show(player)
                // 如果玩家选择了导出按钮, 则清理并打印状态信息
                .then(result => { if (!result.canceled && result.selection == 1)
                console.warn(JSON.stringify(CleanMessageArray(message))); });
        // 如果不是玩家触发, 则将状态信息发送到世界聊天
        else
            server.world.sendMessage([...message, '\n']);
        // 播放使用物品时的音效
        player.playSound('conduit.activate');
        // 在玩家位置播放粒子效果
        TrySpawnParticle(player.dimension, 'constant:prompt_firefly', player.location);
        // 开始物品的冷却时间
        item.getComponent('minecraft:cooldown')?.startCooldown(player);
        // 减少物品的耐久度
        SetDurability(player, item, container, player.selectedSlotIndex, 1);
    }
});
/**
 * * 创造工具
 */
components$6.set(componentPrefix$4 + 'creative_tools', {
    onUse(source) {
        /**
         * * 触发自定义组件的玩家
         */
        const player = source.source;
        /**
         * * 触发自定义组件的物品
         */
        const item = source.itemStack;
        /**
         * * 玩家背包
         */
        const container = player.getComponent('inventory')?.container;
        // 判断条件是否满足
        if (!container || !player || !item)
            return;
        // 判断是否冷却完成
        if (!TriggerControl(item.typeId, player, 20))
            return;
        // 如果玩家没有权限使用此物品, 则返回
        if (!isPlayerAuthorized(player))
            return player.sendMessage('§c§l您没有权限使用此物品!§r');
        // 生成 创造模式 辅助道具
        TrySpawnParticle(player.dimension, 'constant:fireworks_fireball_amber_color', Vector.add(player.location, { x: 0, y: 3, z: 0 }));
        server.system.run(() => container.setItem(player.selectedSlotIndex));
        player.runCommand('loot spawn ~ ~3 ~ loot create_mode_toolkit');
        player.playSound("conduit.attack");
        // 播放 粒子效果
        TrySpawnParticle(player.dimension, 'constant:prompt_firefly', player.location);
        // 更新 物品冷却
        item.getComponent('minecraft:cooldown')?.startCooldown(player);
    }
});
/*
 * 匣里乾坤
 */
components$6.set(componentPrefix$4 + 'world_of_box', {
    onUse(source) {
        /**
         * * 触发自定义组件的玩家
         */
        const player = source.source;
        /**
         * * 触发自定义组件的物品
         */
        const item = source.itemStack;
        /**
         * * 玩家背包
         */
        const container = player.getComponent('inventory')?.container;
        // 判断条件是否满足
        if (!container || !player || !item)
            return;
        // 判断是否冷却完成
        if (!TriggerControl(item.typeId, player, 20))
            return;
        // 如果玩家没有权限使用此物品, 则返回
        if (!isPlayerAuthorized(player))
            return player.sendMessage('§c§l您没有权限使用此物品!§r');
        /**
         * * 实体查询选项
         */
        const options = {
            excludeTypes: ["minecraft:xp_orb"],
            excludeFamilies: ['player'],
            location: player.location,
            maxDistance: 8
        };
        /**
         * * 获取 实体队列
         */
        const entitys = player.dimension.getEntities(options);
        /**
         * * 获取 状态信息
         */
        const status = player.getDynamicProperty('qiankun_in_the_box:status');
        // 判断 状态信息
        if (status == undefined) {
            // 输出 状态信息
            TrySpawnParticle(player.dimension, 'constant:smoke_rune_purple', player.location);
            player.sendMessage(`§6|§r 正在<§a 收纳 §r>周围的实体 §6|§r`);
            player.playAnimation("animation.item.common.resist");
            player.playSound("conduit.activate");
            // 收集周围的实体
            entitys.forEach(entity => entity.tryTeleport(player.getHeadLocation()));
            // 更新 状态信息
            player.setDynamicProperty('qiankun_in_the_box:status', true);
            // 执行 实体收容 流程
            server.system.runTimeout(() => player.runCommand(`structure save "${player.id}" ~2~2~2 ~-2~-2~-2 true disk true`), 4);
            server.system.runTimeout(() => entitys.forEach(entity => { if (entity && entity.isValid)
                entity?.remove(); }), 6);
        }
        else {
            // 释放 被收容的 实体
            player.runCommand(`structure load "${player.id}" ~-2~-2~-2 0_degrees none true false`);
            // 输出 状态信息
            TrySpawnParticle(player.dimension, 'constant:smoke_rune_purple', player.location);
            player.sendMessage(`§6|§r 正在<§d 释放 §r>储存的实体 §6|§r`);
            player.playAnimation("animation.item.common.resist");
            player.playSound("conduit.activate");
            // 更新 状态信息
            player.setDynamicProperty('qiankun_in_the_box:status', undefined);
        }
        // 播放 粒子效果
        TrySpawnParticle(player.dimension, 'constant:prompt_firefly', player.location);
        // 更新 物品冷却
        item.getComponent('minecraft:cooldown')?.startCooldown(player);
        // 更新 物品耐久
        SetDurability(player, item, container, player.selectedSlotIndex, 1);
    }
});
/*
 * 调试权杖
 */
components$6.set(componentPrefix$4 + 'debugging_stick', {
    'onUseOn'(data) {
        // 解构 使用者 与 被使用到的方块状态
        const { source: player, usedOnBlockPermutation, block, itemStack } = data;
        // 如果玩家不是 Player实例 或 方块状态不存在, 则直接返回
        if (!(player instanceof server.Player) || !usedOnBlockPermutation || !block || !itemStack)
            return;
        // 如果玩家没有权限使用此物品, 则返回
        if (!isPlayerAuthorized(player))
            return player.sendMessage('§c§l您没有权限使用此物品!§r');
        /**
         * * 获取全部的方块状态
         */
        const states = usedOnBlockPermutation.getAllStates();
        /**
         * * 方块状态键值对映射表
         */
        const stateMap = new Map(Object.keys(states).map(key => [key, states[key]]));
        /**
         * * 定义了 窗口界面 的 表单对象
         */
        const display = new serverUI.ActionFormData().title(translate(block)).body('请选择您想要调试的属性');
        // 如果 方块状态映射表 大于等于 1, 则加入按钮
        if (stateMap.size >= 1) {
            // 遍历 方块状态键, 并加入按钮
            [...stateMap.keys()].forEach(key => display.button(key));
            // 显示 窗口界面
            display.show(player).then(option => {
                // 如果玩家取消了表单, 则不进行操作
                if (option.canceled || option.selection == undefined)
                    return;
                /**
                 * * 被选中的 方块状态键
                 */
                const key = [...stateMap.keys()][option.selection];
                /**
                 * * 被选中的 方块状态值
                 */
                const value = stateMap.get(key);
                /**
                 * * 可选的 方块状态值
                 */
                const validValues = server.BlockStates.get(key)?.validValues;
                /**
                 * * 定义了 窗口界面 的 表单对象
                 */
                const display = new serverUI.ActionFormData().title(key + ' : ' + value).body('请选择当前方块状态的< 期望值 >');
                // 如果 方块状态值 有效值 大于等于 1, 则加入按钮
                if (validValues && validValues.length >= 1) {
                    // 遍历 方块状态值, 并加入按钮
                    validValues.forEach(value => display.button(JSON.stringify(value)));
                    // 显示 窗口界面
                    display.show(player).then(option => {
                        // 如果玩家取消了表单, 则不进行操作
                        if (option.canceled || option.selection == undefined)
                            return;
                        // 设置方块的属性
                        TrySetPermutation(block, key, validValues[option.selection]);
                    });
                }
                else
                    player.sendMessage('§c§l该方块没有方块状态!');
            });
        }
        else
            player.sendMessage('§c§l该方块没有方块状态!');
    }
});
/**
 * * 物资整理
 */
components$6.set(componentPrefix$4 + 'material_sorting', {
    onUse(source) {
        /**
         * * 触发自定义组件的玩家
         */
        const player = source.source;
        /**
         * * 触发自定义组件的物品
         */
        const item = source.itemStack;
        /**
         * * 玩家背包
         */
        const container = player.getComponent('inventory')?.container;
        // 判断条件是否满足
        if (!container || !player || !item)
            return;
        // 判断是否冷却完成
        if (!TriggerControl(item.typeId, player, 20))
            return;
        /**
         * * 获取 实体
         */
        const getEntity = player.getEntitiesFromViewDirection({ maxDistance: 64 })[0]?.entity;
        /**
         * * 获取 方块
         */
        const getBlock = player.getBlockFromViewDirection({ maxDistance: 64 })?.block;
        // 执行 向 玩家背包中 抽取 或 注入物品 的流程
        player.isSneaking
            ? extractEvent(player, getEntity, getBlock, container)
            : injectEvent(player, getEntity, getBlock, container);
        // 播放音效
        player.playSound("armor.equip_diamond");
        // 更新 物品冷却
        item.getComponent('minecraft:cooldown')?.startCooldown(player);
        // 播放 粒子效果
        TrySpawnParticle(player.dimension, 'constant:prompt_firefly', player.location);
        // 更新 物品耐久
        SetDurability(player, item, container, player.selectedSlotIndex, 1);
    }
});
/**
 * * 物品抽取事件
 */
function extractEvent(player, entity, block, container) {
    /**
     * * 事件
     *
     * @param {server.Container} input 容器
     */
    const Event = (input) => {
        /**
         * * 物品组
         */
        const StackGroup = [];
        //执行 抽取 容器内容 的流程
        if (input && container) {
            /**
             * * 空格数量
             */
            let emptySlots = container.emptySlotsCount - 1;
            //抽取 目标容器内 指定数量 的物品
            for (let α = 0; α < input.size; α++) {
                /**
                 * * 获取 物品
                 */
                const getItem = input.getItem(α);
                // 判断 物品是否存在
                if (emptySlots == 0)
                    continue;
                if (!getItem)
                    continue;
                // 将 物品 加入 物品组
                StackGroup.push(getItem);
                input.setItem(α);
                emptySlots -= 1;
            }
            //向 玩家背包中 填充物品
            for (let α of StackGroup)
                container.addItem(α);
            //显示 玩家背包 的剩余储存空间
            player.sendMessage(`§7正在远程抽取物品, < 您的背包 >的剩余空间为§r:§2 ${emptySlots}`);
        }
    };
    if (entity) {
        /**
         * * 获取 实体容器
         */
        const getContainer = entity.getComponent('minecraft:inventory')?.container;
        if (getContainer)
            Event(getContainer);
        else
            player.sendMessage(`§7无法获取实体:§6<§c ${entity.typeId} §6>§7的容器信息`);
    }
    else if (block) {
        /**
         * * 获取 方块容器
         */
        const getContainer = block.getComponent('minecraft:inventory')?.container;
        if (getContainer)
            Event(getContainer);
        else {
            /**
             * * 标题
             */
            const title = {
                text: "<§8§o§l 物资清除 §r>§9操作界面"
            };
            /**
             * * 选项
             */
            const option = [
                { text: '§c§l掉落物清理§r' }
            ];
            /**
             * * 用法
             */
            const labelα = { text: '物资整理 -> 删除' };
            /**
             * * 选项
             */
            const labelβ = {
                text: "§6设置§r<§a 清理范围 §r>"
            };
            new serverUI.ModalFormData()
                .title(title)
                .dropdown(labelα, option, { 'defaultValueIndex': 0 })
                .slider(labelβ, 8, 255, { 'valueStep': 1, 'defaultValue': 64 })
                .show(player).then(option => {
                if (option.canceled)
                    return;
                TrySpawnParticle(player.dimension, 'constant:general_tips', Vector.add(player.getHeadLocation(), { x: 0, y: 1.5, z: 0 }));
                player.runCommand(`kill @e[type=item,r=${option.formValues[1]}]`);
                player.sendMessage("§4掉落物已销毁, 该操作不可撤销!");
            });
        }
    }
}
/**
 * * 物品注入事件
 */
function injectEvent(player, entity, block, container) {
    /**
     * * 事件
     *
     * @param {server.Container} input 容器
     */
    const Event = (input) => {
        if (!container)
            return;
        // 移除 当前道具
        container.setItem(player.selectedSlotIndex);
        /**
         * * 物品组
         */
        const StackGroup = [];
        //执行 向 容器内 注入物品 的流程
        if (!input)
            return;
        //获取 目标容器 剩余存储空间
        let emptySlots = input.emptySlotsCount;
        //抽取 玩家背包内 指定数量 的物品
        for (let α = 0; α < container.size; α++) {
            /**
             * * 获取 物品
             */
            const getItem = container.getItem(α);
            // 判断 物品是否存在
            if (emptySlots == 0)
                break;
            if (!getItem)
                continue;
            // 将 物品 加入 物品组
            StackGroup.push(getItem);
            container.setItem(α);
            emptySlots -= 1;
        }
        //向 容器内 填充物品
        for (let α of StackGroup)
            input.addItem(α);
        //显示 目标容器 的剩余储存空间
        player.sendMessage(`§7正在远程注入物品, < 目标容器 >的剩余空间为§r:§2 ${emptySlots}`);
    };
    if (entity) {
        /**
         * * 获取 实体容器
         */
        const getContainer = entity.getComponent('minecraft:inventory')?.container;
        if (getContainer)
            Event(getContainer);
        else
            player.sendMessage(`§7无法获取实体:§6<§c ${entity.typeId} §6>§7的容器信息`);
    }
    else if (block) {
        /**
         * * 获取 方块容器
         */
        const getContainer = block.getComponent('minecraft:inventory')?.container;
        if (getContainer)
            Event(getContainer);
        else
            player.sendMessage(`§7无法获取方块:§6<§c ${block.typeId} §6>§7的容器信息`);
    }
}
/**
 * * 容器整理
 */
function containerSorting(player, block) {
    /**
     * * 获取 方块容器
     */
    const container = block?.getComponent('minecraft:inventory')?.container;
    /**
     * * 物品组
     */
    const items = [];
    // 遍历 方块容器
    if (!container)
        return;
    // 遍历 方块容器
    for (let index = 0; index < container.size; index++) {
        /**
         * * 获取 物品
         */
        const item = container.getItem(index);
        if (!item)
            continue;
        container.setItem(index);
        items.push(item);
    }
    // 重新 放入 方块容器
    for (let item of OrganizeItemStacks(items))
        container.addItem(item);
    // 播放音效
    player.playSound("armor.equip_diamond");
}
/*
 * 抑水之环
 */
components$6.set(componentPrefix$4 + 'inhibit_water', {
    onUse(source) {
        /**
         * * 触发自定义组件的玩家
         */
        const player = source.source;
        /**
         * * 触发自定义组件的物品
         */
        const item = source.itemStack;
        /**
         * * 玩家背包
         */
        const container = player.getComponent('inventory')?.container;
        // 判断条件是否满足
        if (!container || !player || !item)
            return;
        // 判断是否冷却完成
        if (!TriggerControl(item.typeId, player, 20))
            return;
        /**
         * * 获取 方块对象
         */
        const block = player.getBlockFromViewDirection({ includeLiquidBlocks: true, maxDistance: 128 })?.block;
        // 判断 方块对象是否存在
        if (!block || block.typeId !== 'minecraft:water')
            return;
        // 判断 玩家是否潜行
        if (!player.isSneaking) {
            TryFillBlocks(block.dimension, Vector.add(block.location, { x: 5, y: 5, z: 5 }), Vector.add(block.location, { x: -5, y: -5, z: -5 }), 'starry_map:unreal_space', {
                blockFilter: { includePermutations: [server.BlockPermutation.resolve('minecraft:water')] }
            });
            TryFillBlocks(block.dimension, Vector.add(block.location, { x: 4, y: 4, z: 4 }), Vector.add(block.location, { x: -4, y: -4, z: -4 }), 'minecraft:air', {
                blockFilter: { includePermutations: [server.BlockPermutation.resolve('starry_map:unreal_space')] }
            });
        }
        else
            TryFillBlocks(block.dimension, Vector.add(block.location, { x: 5, y: 5, z: 5 }), Vector.add(block.location, { x: -5, y: -5, z: -5 }), 'minecraft:air', { blockFilter: { includePermutations: [server.BlockPermutation.resolve('minecraft:water')] } });
        // 播放音效
        player.playSound("bucket.empty_lava");
        // 播放 粒子效果
        TrySpawnParticle(player.dimension, 'constant:prompt_firefly', player.location);
        // 更新 物品冷却
        item.getComponent('minecraft:cooldown')?.startCooldown(player);
        // 更新 物品耐久
        SetDurability(player, item, container, player.selectedSlotIndex, 1);
    }
});
/*
 * 虚空方块
 */
components$6.set(componentPrefix$4 + 'nihility_space_block', {
    onUse(source) {
        /**
         * * 触发自定义组件的玩家
         */
        const player = source.source;
        /**
         * * 触发自定义组件的物品
         */
        const item = source.itemStack;
        /**
         * * 玩家背包
         */
        const container = player.getComponent('inventory')?.container;
        // 判断条件是否满足
        if (!container || !player || !item)
            return;
        // 判断是否冷却完成
        if (!TriggerControl(item.typeId, player, 2))
            return;
        /**
         * * 获取 下方的 方块
         */
        const target = player.dimension.getBlock(Vector.add(player.location, Vector.CONSTANT_DOWN));
        // 判断 方块是否存在 是否是空气
        if (target && target.isAir)
            target.setPermutation(server.BlockPermutation.resolve('starry_map:nihility_space'));
        // 更新 物品冷却
        item.getComponent('minecraft:cooldown')?.startCooldown(player);
        // 播放 粒子效果
        TrySpawnParticle(player.dimension, 'constant:prompt_firefly', player.location);
        // 更新 物品耐久
        SetDurability(player, item, container, player.selectedSlotIndex, 1);
    }
});
/*
 * 紫金葫芦
 */
components$6.set(componentPrefix$4 + 'purple_gold_gourd', {
    onUse(source) {
        /**
         * * 触发自定义组件的玩家
         */
        const player = source.source;
        /**
         * * 触发自定义组件的物品
         */
        const item = source.itemStack;
        /**
         * * 玩家背包
         */
        const container = player.getComponent('inventory')?.container;
        // 判断条件是否满足
        if (!container || !player || !item || !TriggerControl(item.typeId, player, 80))
            return;
        /**
         * * 动态属性 - 物品阶段
         */
        const state = item.getDynamicProperty('item:stage.purple_gold_gourd') ?? 0;
        /**
         * * 获取 动态属性 - 捕获时间点
         */
        const time = item.getDynamicProperty('item:time.purple_gold_gourd') ?? 0;
        /**
         * * 获取 动态属性 - 捕获实体
         */
        const save = item.getDynamicProperty('item:save.purple_gold_gourd') ?? 'minecraft:tnt';
        /**
         * * 获取 玩家 视线方向的 实体
         */
        const entity = player.getEntitiesFromViewDirection({ maxDistance: 64 })[0]?.entity;
        // 阶段判断
        switch (state) {
            case 0:
                // 播放 启动 音效
                player.playSound('音效.琉璃.紫金葫芦_蓄力使用');
                // 切换至下一阶段
                item.setDynamicProperty('item:stage.purple_gold_gourd', 1);
                break;
            case 1:
                // 验证实体是否存在且可用
                if (!entity || !entity.isValid || entity instanceof server.Player)
                    return player.playSound('音效.琉璃.紫金葫芦_捕获失败');
                /**
                 * * 获取 实体最大血量
                 */
                const health = entity.getComponent('minecraft:health')?.defaultValue || 10;
                // 判断实体血量是否超过上限
                if (health >= 200)
                    return player.playSound('音效.琉璃.紫金葫芦_捕获失败');
                // 播放 捕获 音效
                player.playSound('音效.琉璃.紫金葫芦_捕捉成功');
                // 切换至下一阶段
                item.setDynamicProperty('item:stage.purple_gold_gourd', 2);
                // 记录发动捕获的时间点
                item.setDynamicProperty('item:time.purple_gold_gourd', server.system.currentTick);
                // 记录实体类型
                item.setDynamicProperty('item:save.purple_gold_gourd', entity.typeId);
                // 播放 释放特效
                TrySpawnParticle(player.dimension, 'constant:excite_rune_purple', entity.location);
                TrySpawnParticle(player.dimension, 'constant:smoke_rune_purple', entity.location);
                TrySpawnParticle(player.dimension, 'constant:erupt_rune_purple', entity.location);
                // 移除实体
                UnloadInventoryAndDestroy(entity);
                break;
            case 2:
                // 验证炼化时间是否结束
                if (server.system.currentTick - time <= 1200)
                    return player.playSound('音效.琉璃.紫金葫芦_继续等待');
                /**
                 * * 创建 实体对象
                 */
                const target = TrySpawnEntity(player.dimension, save, player.location);
                // 回到初始状态
                item.setDynamicProperty('item:stage.purple_gold_gourd', 0);
                // 播放 结束 音效
                player.playSound('音效.琉璃.紫金葫芦_炼化结束');
                // 击杀实体
                if (target instanceof server.Entity)
                    target.kill();
                break;
        }
        // 更新 物品冷却
        item.getComponent('minecraft:cooldown')?.startCooldown(player);
        // 播放 粒子效果
        TrySpawnParticle(player.dimension, 'constant:prompt_firefly', player.location);
        // 更新 物品耐久
        SetDurability(player, item, container, player.selectedSlotIndex, 1);
    }
});

/*
 * 系统组件
 */
/**
 * * 组件前缀代词
 */
const componentPrefix$3 = 'opal:item.';
/**
 * * 物品自定义组件列表
 */
const components$5 = new Map();
/*
 * 召唤 渊鲸 - 维系者
 */
components$5.set(componentPrefix$3 + 'call_whale_support', {
    onUse(source) {
        /**
         * * 触发自定义组件的玩家
         */
        const player = source.source;
        /**
         * * 触发自定义组件的物品
         */
        const item = source.itemStack;
        /**
         * * 玩家背包
         */
        const container = player.getComponent('inventory')?.container;
        // 判断条件是否满足
        if (!container || !player || !item)
            return;
        // 判断是否冷却完成
        if (!TriggerControl(item.typeId, player, 20))
            return;
        // 检测是否在 水下
        if (!player.dimension.getBlock(player.location)?.isLiquid) {
            player.sendMessage([translate(player), { text: ' -> 请在水下使用, 无法在空气中召唤<§l§9 渊鲸-维系者 §r>' }]);
            return;
        }
        // 执行召唤流程
        SummonEntityWithData(player, container, 'starry_map:abyss_whale.support');
    }
});
/*
 * 召唤 森蚺 - 哨兵炮
 */
components$5.set(componentPrefix$3 + 'call_python_sentinel', {
    onUse(source) {
        /**
         * * 触发自定义组件的玩家
         */
        const player = source.source;
        /**
         * * 触发自定义组件的物品
         */
        const item = source.itemStack;
        /**
         * * 玩家背包
         */
        const container = player.getComponent('inventory')?.container;
        // 判断条件是否满足
        if (!container || !player || !item)
            return;
        // 判断是否冷却完成
        if (!TriggerControl(item.typeId, player, 20))
            return;
        // 执行召唤流程
        SummonEntityWithData(player, container, 'starry_map:viper.sentinel');
    }
});
/*
 * 召唤 隧龙 - 领航者
 */
components$5.set(componentPrefix$3 + 'call_tunnel_dragon_guide', {
    onUse(source) {
        /**
         * * 触发自定义组件的玩家
         */
        const player = source.source;
        /**
         * * 触发自定义组件的物品
         */
        const item = source.itemStack;
        /**
         * * 玩家背包
         */
        const container = player.getComponent('inventory')?.container;
        // 判断条件是否满足
        if (!container || !player || !item)
            return;
        // 判断是否冷却完成
        if (!TriggerControl(item.typeId, player, 20))
            return;
        // 执行召唤流程
        SummonEntityWithData(player, container, 'starry_map:tunnel_dragon');
    }
});
/*
 * 召唤 虚物靶标
 */
components$5.set(componentPrefix$3 + 'call_virtual_target', {
    onUse(source) {
        /**
         * * 触发自定义组件的玩家
         */
        const player = source.source;
        /**
         * * 触发自定义组件的物品
         */
        const item = source.itemStack;
        /**
         * * 玩家背包
         */
        const container = player.getComponent('inventory')?.container;
        // 判断条件是否满足
        if (!container || !player || !item)
            return;
        // 判断是否冷却完成
        if (!TriggerControl(item.typeId, player, 20))
            return;
        // 执行召唤流程
        SummonEntityWithData(player, container, 'starry_map:execute.virtual_target');
    }
});
/**
 * * 森蚺 - 先锋炮
 */
components$5.set(componentPrefix$3 + 'call_python_pioneer', {
    onUse(source) {
        /**
         * * 触发自定义组件的玩家
         */
        const player = source.source;
        /**
         * * 触发自定义组件的物品
         */
        const item = source.itemStack;
        /**
         * * 玩家背包
         */
        const container = player.getComponent('inventory')?.container;
        // 判断条件是否满足
        if (!container || !player || !item)
            return;
        // 判断是否冷却完成
        if (!TriggerControl(item.typeId, player, 4))
            return;
        /**
         * * 实体射线选中数组
         */
        const getEntities = player.getEntitiesFromViewDirection({ maxDistance: 64 })[0];
        /**
         * * 方块射线选中
         */
        const getBlock = player.getBlockFromViewDirection({ maxDistance: 64 });
        /**
         * * 方块距离
         */
        const blockDistance = getBlock?.block ? Vector.distance(player.location, getBlock?.block) : 48;
        /**
         * * 射击距离
         */
        const distance = getEntities?.distance ?? blockDistance;
        /**
         * * 爆炸事件
         *
         * @param args - 附加参数
         */
        const powerExplode = (args) => {
            /**
             * * 过滤器参数
             */
            const options = {
                excludeTypes: ["minecraft:item", "minecraft:xp_orb"],
                location: args.location,
                maxDistance: 8,
                closest: 8
            };
            /**
             * * 获取实体列表
             */
            const entitys = args.dimension.getEntities(options).filter(entity => entity.id !== player.id);
            // 创建 元素伤害
            entitys.forEach(entity => {
                /**
                 * * 是否暴击
                 */
                const erupt = IsErupt(player);
                // 对目标施加一次击退
                BackoffByDistance(player, entity);
                // 获得属性加成
                AlterProperty(player, { raise_basic_attack: distance });
                // 结算法术伤害
                ElementalAttack(player, entity, erupt);
            });
            // 播放 爆炸音效
            args.dimension.playSound('random.explode', args.location);
            // 创建粒子效果
            TrySpawnParticle(player.dimension, 'constant:impact_rune_white', args.location);
        };
        // 创建 路径规划
        PathExecute.Create('森蚺先锋炮-炮击轨迹', 1, {
            particles: ['constant:smoke_rune_white'],
            dimension: player.dimension,
            on_done: powerExplode,
            locations: [],
            cooldown: 1,
            speed: 1,
            shoot: {
                start_place: player.getHeadLocation(),
                toward: player.getViewDirection(),
                max_distance: distance,
            }
        });
        // 播放 开火音效
        player.playSound('mob.irongolem.repair');
        // 更新 物品冷却
        item.getComponent('minecraft:cooldown')?.startCooldown(player);
        // 更新 物品耐久
        SetDurability(player, item, container, player.selectedSlotIndex, 1);
    }
});

/*
 * 原版接口
 */
/**
 * * 组件前缀代词
 */
const componentPrefix$2 = 'opal:item.';
/**
 * * 物品自定义组件列表
 */
const components$4 = new Map();
/*
 * 百灵绘卷
 */
components$4.set(componentPrefix$2 + 'chorus_picture', {
    onUse(source) {
        /**
         * * 触发自定义组件的玩家
         */
        const player = source.source;
        /**
         * * 触发自定义组件的物品
         */
        const item = source.itemStack;
        /**
         * * 玩家背包
         */
        const container = player.getComponent('inventory')?.container;
        // 判断条件是否满足
        if (!container || !player || !item)
            return;
        // 判断是否冷却完成
        if (!TriggerControl(item.typeId, player, 140))
            return;
        /**
         * * 检测 当前高度
         */
        const testHeight = player.location.y < player.dimension.heightRange.min + 32;
        /**
         * * 判断 是否执行过 初始召唤
         */
        const rule = player.getDynamicProperty('entity:house_create_after') ?? false;
        /**
         * * 解析 权重信息
         */
        const analysis = AnalysisWeight(chorus_call_role).output;
        // 检测当前高度是否可用
        if (testHeight)
            return player.sendMessage([translate(player), { text: ' -> 当前高度不足, 无法使用<§l§9 百灵绘卷 §r>' }]);
        // 播放 召唤动画
        CompleteSummonAnimation(player, player.getHeadLocation());
        // 清除 物品
        container?.setItem(player.selectedSlotIndex);
        // 执行初始化生成
        if (!rule)
            return initialSummoning(player);
        // 召唤 随机角色
        server.system.runTimeout(() => randomCallRole(player, analysis), 40);
        // 发送 信息
        IntelMessage(player, 5, '新的伙伴已经出现, 快使用§9[§n§l 精灵结契 §r§9]§r与§9[§6 领航者 §9]§r缔结属于你们的§9[§u 契约 §9]§r吧!!');
    }
});
/**
 * * 生成 初始角色
 */
function initialSummoning(player) {
    /**
     * * 定义 队列信息
     */
    const queue = ['starry_map:guide.crystal', 'starry_map:guide.moon_light', 'starry_map:execute.roaring'];
    // 召唤 琉璃 月华 啸天
    server.system.runTimeout(() => appointCallRole(player, queue), 8);
    // 设置 已经 完成初始化生成
    player.setDynamicProperty('entity:house_create_after', true);
    // 显示 引导提示
    PlayPrompt(player, "召唤星辉雅居");
    // 召唤 星辉雅居
    starlightHouse(player);
}
/**
 * * 创建 星辉雅居
 *
 * @param {server.Player} player - 触发事件的玩家
 */
function starlightHouse(player) {
    /**
     * * 获取 游戏规则
     */
    const rule = server.world.getDynamicProperty('game_rules:regenerate.starlight_house') ?? true;
    /**
     * * 定义 坐标基准点
     */
    const reference = Vector.add(player.location, { x: -13, y: -15, z: -13 });
    /**
     * * 读取 建筑结构
     */
    const template = server.world.structureManager.get('mystructure:starlight_house');
    // 判断是否生成结构
    if (rule === false)
        return emergencyPlan(player);
    // 检测 建筑结构
    if (!template)
        return player.sendMessage([translate(player), { text: ' -> 未能获取到<§l§9 星辉雅居 §r>的结构数据文件' }]);
    // 预填充空间
    TryFillBlocks(player.dimension, reference, Vector.add(reference, { x: 24, y: 24, z: 24 }), 'minecraft:white_stained_glass');
    // 加载 建筑结构
    server.system.runTimeout(() => server.world.structureManager.place(template, player.dimension, reference), 2);
    // 移动 玩家位置
    server.system.runTimeout(() => player.applyKnockback({ x: (Math.random() * 2) - 1, z: (Math.random() * 2) }, -1), 4);
    // 设置 游戏规则
    if (rule == true)
        server.world.setDynamicProperty('game_rules:regenerate.starlight_house', false);
}
/**
 * * 紧急物资补偿计划
 *
 * @param {server.Player} player - 接收补偿物资的玩家对象
 */
function emergencyPlan(player) {
    /**
     * * 补偿物资列表
     */
    const subsidy = [
        new server.ItemStack('starry_map:magic_crystal_pickaxe'),
        new server.ItemStack('starry_map:magic_crystal_screwdriver'),
        new server.ItemStack('starry_map:magic_crystal_shield'),
        new server.ItemStack('starry_map:magic_crystal_hammer'),
        new server.ItemStack('starry_map:magic_crystal_wrench'),
        new server.ItemStack('starry_map:magic_crystal_key'),
        new server.ItemStack('starry_map:magic_crystal_bow'),
        new server.ItemStack('starry_map:magic_crystal_claw'),
        new server.ItemStack('starry_map:magic_handbook'),
        new server.ItemStack('starry_map:faerie_healing'),
        new server.ItemStack('starry_map:exhausted_armor'),
        new server.ItemStack('minecraft:barrel')
    ];
    // 生成 补偿物资
    subsidy.forEach(item => TrySpawnItem(player.dimension, item, player.location));
}
/**
 * * 随机角色召唤事件
 *
 * @param {server.Player} player - 玩家对象
 *
 * @param {string[]} type - 角色类型
 */
function randomCallRole(player, type) {
    /**
     * * 定义 坐标基准点
     */
    const vertex0 = Vector.add(player.location, { x: 3, y: 5, z: 3 });
    /**
     * * 定义 坐标基准点
     */
    const vertex1 = Vector.add(player.location, { x: -3, y: 0, z: -3 });
    /**
     * * 定义 角色召唤锚点
     */
    const anchor = Vector.rangeRandom(vertex0, vertex1);
    // 播放 粒子效果
    TrySpawnParticle(player.dimension, 'constant:the_cracks_of_the_misty_sea', anchor);
    // 判断 是否已经召唤过 治疗类角色
    if (!player.getDynamicProperty('entity:healer_role_up')) {
        /**
         * * 治疗型 角色队列
         */
        const choice = AnalysisWeight(call_healer_role).output;
        player.setDynamicProperty('entity:healer_role_up', true);
        TrySpawnEntity(player.dimension, choice, anchor);
        return;
    }
    // 判断 是否已经召唤过 增伤类角色
    if (!player.getDynamicProperty('entity:fortify_role_up')) {
        /**
         * * 增伤型 角色队列
         */
        const choice = AnalysisWeight(call_fortify_role).output;
        player.setDynamicProperty('entity:fortify_role_up', true);
        TrySpawnEntity(player.dimension, choice, anchor);
        return;
    }
    // 执行 角色召唤
    switch (Random({ min: 1, max: 32 }, true)) {
        case 16:
            WaspClusterRaidTrigger.Create(player.id, 20, { locations: [player.getHeadLocation()], dimensions: [player.dimension] });
            player.onScreenDisplay.setTitle('§c§l< 野蜂 袭击 > !!!§r');
            TrySpawnEntity(player.dimension, type, anchor);
            break;
        default:
            TrySpawnEntity(player.dimension, type, anchor);
            break;
    }
}
/**
 * * 指定角色召唤事件
 *
 * @param {server.Player} player - 玩家对象
 *
 * @param {string[]} queue - 角色队列
 */
function appointCallRole(player, queue) {
    /**
     * * 定义 坐标基准点
     */
    const vertex0 = Vector.add(player.location, { x: 2, y: 2, z: 2 });
    /**
     * * 定义 坐标基准点
     */
    const vertex1 = Vector.add(player.location, { x: -2, y: 0, z: -2 });
    // 播放 粒子效果
    TrySpawnParticle(player.dimension, 'constant:the_cracks_of_the_misty_sea', Vector.rangeRandom(vertex0, vertex1));
    // 执行 角色召唤
    queue.forEach(entity => TrySpawnEntity(player.dimension, entity, Vector.rangeRandom(vertex0, vertex1)));
}
/**
 * * 野蜂机群袭击触发器
 *
 * @param {number} cooldown tick间隔时间, 建议值为: 20
 */
class WaspClusterRaidTrigger extends Template {
    /**
     * * 定义 事件计时器
     */
    eventTimer = 0;
    afterPlanEvent(data) {
        // 检测 条件是否齐全
        if (!this.annex.dimensions)
            return data.remove();
        if (!this.annex.locations)
            return data.remove();
        /**
         * * 获取 事件维度
         */
        const dimension = this.annex.dimensions[0];
        /**
         * * 获取 原始坐标
         */
        const proto = this.annex.locations[0];
        /**
         * * 获取 随机坐标
         */
        const current = Vector.add(proto, { x: Math.random() * 16 - 8, y: Math.random() * 16, z: Math.random() * 16 - 8 });
        // 显示 粒子效果
        TrySpawnParticle(dimension, 'constant:the_cracks_of_the_misty_sea', current);
        /**
         * * 解析 权重信息
         */
        const analysis = AnalysisWeight(wasp_cluster_raid).output;
        // 生成 野蜂实体
        const wasp = TrySpawnEntity(dimension, analysis, current);
        if (wasp instanceof server.Entity)
            wasp.nameTag = '§u野蜂 袭击§r';
        // 当事件结束时 生成战利品
        if (this.eventTimer >= 15) {
            TrySpawnItem(dimension, new server.ItemStack('starry_map:eternal_energy'), current);
            TrySpawnParticle(dimension, 'constant:fireworks_salvo_rune_red', current);
            TrySpawnParticle(dimension, 'constant:disperse_rune_red', current);
            TrySpawnParticle(dimension, 'constant:erupt_rune_red', current);
            return data.remove();
        }
        this.eventTimer += 1;
    }
    ;
}
/*
 * 流光之星
 */
components$4.set(componentPrefix$2 + 'flowing_star', {
    onUse(source) {
        /**
         * * 触发自定义组件的玩家
         */
        const player = source.source;
        /**
         * * 触发自定义组件的物品
         */
        const item = source.itemStack;
        /**
         * * 玩家背包
         */
        const container = player.getComponent('inventory')?.container;
        // 判断条件是否满足
        if (!container || !player || !item)
            return;
        // 判断是否冷却完成
        if (!TriggerControl(item.typeId, player, 140))
            return;
        /**
         * * 检测 当前高度
         */
        const testHeight = player.location.y < player.dimension.heightRange.min + 32;
        // 检测当前高度是否可用
        if (testHeight)
            return player.sendMessage([translate(player), { text: ' -> 当前高度不足, 无法使用<§l§9 流光之星 §r>' }]);
        // 清除 物品
        container?.setItem(player.selectedSlotIndex);
        /**
         * * 定义 坐标基准点
         */
        const reference = Vector.add(player.location, { x: -13, y: -15, z: -13 });
        /**
         * * 读取 建筑结构
         */
        const template = server.world.structureManager.get('mystructure:starlight_house');
        // 预先填充空间
        TryFillBlocks(player.dimension, reference, Vector.add(reference, { x: 24, y: 24, z: 24 }), 'minecraft:white_stained_glass');
        // 检测 建筑结构
        if (!template)
            return player.sendMessage([translate(player), { text: ' -> 未能获取到<§l§9 星辉雅居 §r>的结构数据文件' }]);
        // 加载 建筑结构
        server.system.runTimeout(() => server.world.structureManager.place(template, player.dimension, reference), 2);
        // 移动 玩家位置
        server.system.runTimeout(() => player.applyKnockback({ x: (Math.random() * 2) - 1, z: (Math.random() * 2) }, -1), 4);
        // 发送 信息
        IntelMessage(player, 5, '『 星辉雅居 』');
        // 播放 召唤动画
        CompleteSummonAnimation(player, player.getHeadLocation());
    }
});
/*
 * 星月诗篇
 */
components$4.set(componentPrefix$2 + 'moon_and_stars', {
    onUse(source) {
        /**
         * * 触发自定义组件的玩家
         */
        const player = source.source;
        /**
         * * 触发自定义组件的物品
         */
        const item = source.itemStack;
        /**
         * * 玩家背包
         */
        const container = player.getComponent('inventory')?.container;
        // 判断条件是否满足
        if (!container || !player || !item)
            return;
        // 判断是否冷却完成
        if (!TriggerControl('使用-星月诗篇-召唤-被收纳-的实体', player, 80))
            return;
        /**
         * * 获取 实体类型
         */
        const typeId = item.getDynamicProperty('reduction_pureness:type');
        // 检测 物品数据类型是否完整且正确
        if (!typeId)
            return player.sendMessage(`§l§4<§c 星月诗篇 §4>§r数据丢失, 无法继续使用`);
        // 更新 物品冷却
        item.getComponent('minecraft:cooldown')?.startCooldown(player);
        // 执行召唤流程
        SummonEntityWithData(player, container, typeId);
        // 播放 召唤动画
        ParticleSummonAnimation(player, player.location);
    },
    /**
     * 处理实体被击中的事件
     *
     * @param {server.ItemComponentHitEntityEvent} source - 被击中实体的事件源
     */
    onHitEntity(source) {
        /**
         * 攻击者（玩家）
         *
         * @type {server.Entity}
         */
        const player = source.attackingEntity;
        /**
         * 被击中的实体
         *
         * @type {server.Entity}
         */
        const entity = source.hitEntity;
        /**
         * 玩家使用的物品
         *
         * @type {server.ItemStack | undefined}
         */
        const item = source.itemStack;
        /**
         * 玩家背包
         *
         * @type {server.Container | undefined}
         */
        const container = player.getComponent('inventory')?.container;
        // 如果没有实体, 物品, 或者实体无效, 或者攻击者不是玩家, 则直接返回
        if (!entity || !item || !entity.isValid || !(player instanceof server.Player))
            return;
        // 检查冷却时间是否完成
        if (!TriggerControl('实体尝试合并星月诗篇的数据', entity, 20))
            return;
        /**
         * 物品的实体类型属性
         *
         * @type {string}
         */
        const typeId = item.getDynamicProperty('reduction_pureness:type');
        /**
         * 获取实体的捕获未来属性
         */
        const captureTheFuture = entity.getDynamicProperty('entity:capture_the_future') ?? 1;
        // 如果物品类型与实体类型不匹配, 显示错误消息并播放声音
        if (typeId !== entity.typeId) {
            /**
             * 错误消息
             *
             * @type {server.RawMessage[]}
             */
            const errorMessage = [
                { text: '§l§4[ 神明 - 归忆 ]并未降下注视§r ' },
                translate(entity),
                { text: ' §l§4似乎未能汲取到任何力量§r' },
            ];
            player.onScreenDisplay.setActionBar(errorMessage);
            player.playSound('conduit.deactivate');
        }
        else if (captureTheFuture <= 3) {
            /**
             * 实体的动态属性ID列表
             *
             * @type {string[]}
             */
            const propertyID = item.getDynamicPropertyIds().filter(id => !id.startsWith('reduction_pureness:'));
            /**
             * 实体的战斗经验值
             *
             * @type {number}
             */
            const experience = entity.getDynamicProperty('entity:experience') ?? 0;
            /**
             * 成功消息
             *
             * @type {server.RawMessage[]}
             */
            const successMessage = [
                { text: '§l§2源自[ 神明 - 归忆 ]的加护§r ' },
                translate(entity),
                { text: ' §l§2从< 尚未焚尽 >的未来中汲取了力量, 战术等级提升了§9 5 §2级! §r' },
            ];
            // 遍历实体的动态属性ID列表, 将物品的动态属性复制到实体
            propertyID.forEach(id => {
                /**
                 * 当前物品的动态属性值
                 *
                 * @type {string | number | boolean | server.Vector3 | undefined}
                 */
                const itemProperty = item.getDynamicProperty(id);
                /**
                 * 当前实体的动态属性值
                 *
                 * @type {string | number | boolean | server.Vector3 | undefined}
                 */
                const entityProperty = entity.getDynamicProperty(id);
                // 如果两个属性都是数字类型, 则将它们相加并设置到实体上
                if (typeof itemProperty == 'number' && typeof entityProperty == 'number')
                    entity.setDynamicProperty(id, itemProperty + entityProperty);
            });
            // 记录截获未来的次数
            entity.setDynamicProperty('entity:capture_the_future', captureTheFuture + 1);
            // 增加实体的战斗经验值
            entity.setDynamicProperty('entity:experience', experience + 360);
            // 清除玩家手中的物品
            container?.setItem(player.selectedSlotIndex);
            // 显示成功消息并播放声音
            player.onScreenDisplay.setActionBar(successMessage);
            // 播放声音
            player.playSound('conduit.activate');
        }
        else {
            /**
             * 错误消息
             *
             * @type {server.RawMessage[]}
             */
            const errorMessage = [
                { text: '§l§4[ 神明 - 归忆 ]拒绝赐福§r ' },
                translate(entity),
                { text: ' §l§4无法燃烧自己的未来§r' },
            ];
            // 显示失败消息
            player.onScreenDisplay.setActionBar(errorMessage);
        }
    }
});
/*
 * 空白蓝图
 */
components$4.set(componentPrefix$2 + 'blank_industrial_blueprint', {
    onUseOn(source) {
        /**
         * * 触发自定义组件的玩家
         */
        const player = source.source;
        /**
         * * 触发自定义组件的物品
         */
        const item = source.itemStack;
        /**
         * * 触发自定义组件的方块
         */
        const block = source.block;
        /**
         * * 玩家背包
         */
        const container = player.getComponent('inventory')?.container;
        // 判断条件是否满足
        if (!block || !container || !(player instanceof server.Player) || !item)
            return;
        // 判断是否冷却完成
        if (!TriggerControl(item.typeId, player, 20))
            return;
        // 检测 玩家是否正在潜行
        if (player.isSneaking) {
            // 保存坐标信息
            item.setDynamicProperty('industrial_blueprint:location_1', source.block.center());
            player.sendMessage([
                translate(player),
                { text: ' -> 已记录位置: ' + Vector.toString(source.block.location) }
            ]);
        }
        else {
            // 保存坐标信息
            item.setDynamicProperty('industrial_blueprint:location_2', source.block.center());
            player.sendMessage([
                translate(player),
                { text: ' => 已记录位置: ' + Vector.toString(source.block.location) }
            ]);
        }
        // 更新 物品冷却
        item.getComponent('minecraft:cooldown')?.startCooldown(player);
        // 刷新手持物品
        container.setItem(player.selectedSlotIndex, item);
        // 播放 音效
        player.playSound('resonate.amethyst_block');
        /**
         * * 读取 坐标信息
         */
        const location_1 = item.getDynamicProperty('industrial_blueprint:location_1');
        /**
         * * 读取 坐标信息
         */
        const location_2 = item.getDynamicProperty('industrial_blueprint:location_2');
        // 检测 坐标信息
        if (!location_1 || !location_2 || Vector.equals(location_1, location_2))
            return;
        // 创建 路径显示
        PathExecute.CreateForFrame('空白蓝图范围显示', {
            particles: ['constant:track_color_rainbow'],
            locations: [],
            dimension: player.dimension,
            cooldown: 1,
            speed: 1
        }, location_1, location_2);
    },
    onMineBlock(source) {
        /**
         * * 触发自定义组件的玩家
         */
        const player = source.source;
        /**
         * * 触发自定义组件的物品
         */
        const item = source.itemStack;
        /**
         * * 玩家背包
         */
        const container = player.getComponent('inventory')?.container;
        /**
         * * 读取 坐标信息
         */
        const location_1 = item?.getDynamicProperty('industrial_blueprint:location_1');
        /**
         * * 读取 坐标信息
         */
        const location_2 = item?.getDynamicProperty('industrial_blueprint:location_2');
        // 判断条件是否满足
        if (!container || !(player instanceof server.Player) || !location_1 || !location_2 || Vector.equals(location_1, location_2))
            return;
        /**
         * * 处理工业蓝图的转换
         *
         * @param {serverUI.ModalFormResponse} option -玩家输入
         */
        const transformation = (option) => {
            // 判断 玩家输入
            if (option.canceled || !option.formValues)
                return;
            /**
             * * 创建 新的物品
             */
            const newItem = new server.ItemStack('starry_map:complete_blueprint');
            /**
             * * 获取 区域体积
             */
            const volume = new server.BlockVolume(location_1, location_2);
            /**
             * * 获取 区域体积向量
             */
            const vector = Vector.subtract(volume.getMax(), volume.getMin());
            // 创建 结构
            server.world.structureManager.createFromWorld('mystructure:' + option.formValues[0]?.toString(), player.dimension, location_1, location_2, {
                saveMode: server.StructureSaveMode.World,
                includeEntities: false,
                includeBlocks: true
            });
            // 修改 物品名称
            newItem.nameTag = option.formValues[0];
            // 修改 物品数据
            newItem.setDynamicProperty('industrial_blueprint:vector', vector);
            newItem.setDynamicProperty('industrial_blueprint:volume', volume.getCapacity());
            newItem.setDynamicProperty('industrial_blueprint:structure', option.formValues[0]?.toString());
            // 延迟 5 tick后, 生成新物品
            server.system.runTimeout(() => TrySpawnItem(player.dimension, newItem, player.location), 5);
            // 清除手持物品
            container.setItem(player.selectedSlotIndex);
        };
        // 显示 界面
        new serverUI.ModalFormData()
            .title("§l§9 保存结构 §r")
            .textField("§l§t 结构名称 §r", "§l§m 结构名称 §r", { 'defaultValue': BriefID() })
            .show(player).then(option => transformation(option));
        // 播放 音效
        player.playSound('block.stonecutter.use');
    }
});
/*
 * 成品蓝图
 */
components$4.set(componentPrefix$2 + 'industrial_blueprint', {
    onUseOn(source) {
        /**
         * * 触发自定义组件的玩家
         */
        const player = source.source;
        /**
         * * 触发自定义组件的物品
         */
        const item = source.itemStack;
        /**
         * * 触发自定义组件的方块
         */
        const block = source.block;
        /**
         * * 玩家背包
         */
        const container = player.getComponent('inventory')?.container;
        // 判断条件是否满足
        if (!block || !container || !(player instanceof server.Player) || !item)
            return;
        // 判断是否冷却完成
        if (!TriggerControl(item.typeId, player, 80))
            return;
        /**
         * * 读取 蓝图名称
         */
        const structureName = item.getDynamicProperty('industrial_blueprint:structure');
        /**
         * * 读取 区域体积
         */
        const volume = item.getDynamicProperty('industrial_blueprint:volume');
        /**
         * * 边框向量
         */
        const vector = item.getDynamicProperty('industrial_blueprint:vector');
        /**
         * * 配置 结构放置参数
         */
        const options = {
            animationMode: server.StructureAnimationMode.Blocks,
            animationSeconds: 10
        };
        // 播放 音效
        player.playSound('respawn_anchor.set_spawn');
        // 更新 物品冷却
        item.getComponent('minecraft:cooldown')?.startCooldown(player);
        // 判断条件是否满足
        if (!vector || !volume || !structureName)
            return player.sendMessage('§c§l当前<§l§u 机械蓝图 §r>§c§l数据缺失, 无法使用 !');
        /**
         * * 读取 建筑结构
         */
        const structure = server.world.structureManager.get(structureName);
        // 判断结构是否存在
        if (!structure)
            return player.sendMessage([translate(player), { text: ' -> 未能获取到<§l§u 机械蓝图 §r>的结构数据文件' }]);
        /**
         * * 起始坐标
         */
        const startPlace = block.center();
        /**
         * * 结束坐标
         */
        const donePlace = Vector.add(startPlace, vector);
        // 创建 路径显示
        PathExecute.CreateForFrame('成品蓝图范围显示', {
            particles: ['constant:track_color_rainbow'],
            locations: [],
            dimension: player.dimension,
            cooldown: 1,
            speed: 1
        }, startPlace, donePlace);
        // 判断玩家是否潜行
        if (!player.isSneaking)
            return;
        // 消耗 能量 并确认 能量 是否充足
        if (QueryEnergy(block) <= volume * 1000)
            return player.sendMessage('<§l§u 星尘力 §r>§c§l不足, 无法加载<§l§u 机械蓝图 §r>§c§l !');
        // 消耗 星尘能量
        ExpendEnergy(block, -volume * 1000);
        // 创建 蓝图中保存的结构
        server.world.structureManager.place(structure, player.dimension, block.location, options);
    }
});

/*
 * 原版接口
 */
/**
 * * 组件前缀代词
 */
const componentPrefix$1 = 'opal:item.';
/**
 * * 物品自定义组件列表
 */
const components$3 = new Map();
/**
 * * 获取 伤害提升
 */
function increaseDamage(player, container, single = true) {
    // 遍历 背包容器
    for (let index = 0; index < container.size; index++) {
        /**
         * * 获取 物品对象
         */
        const item = container.getItem(index);
        // 排除无效的物品对象
        if (!item || !item.hasTag('tags:energy_crystal.series'))
            continue;
        /**
         * * 获取 物品对象标识
         */
        const typeID = item.typeId.split(/:/)[1];
        // 排除 无法进行强化的 魔晶石
        if (typeID == 'eternal_energy')
            continue;
        if (single)
            only(item);
        else
            all(item);
        break;
    }
    function only(item) {
        /**
         * * 进行消耗的样本物品
         */
        const sample = new server.ItemStack(item.typeId);
        /**
         * * 获取 玩家属性面板
         */
        const stages = GetProperty(player);
        /**
         * * 计算 魔晶武器 攻击提升
         */
        const raise_basic_attack = stages.raise_basic_attack + (stages.basic_attack) * 2;
        // 设置 玩家属性面板
        AlterProperty(player, { raise_basic_attack });
        // 消耗 物品对象
        DeleteItemStack(container, sample);
    }
    function all(item) {
        /**
         * * 进行消耗的样本物品
         */
        const sample = new server.ItemStack(item.typeId, item.amount);
        /**
         * * 获取 玩家属性面板
         */
        const stages = GetProperty(player);
        /**
         * * 计算 魔晶武器 攻击提升
         */
        const raise_basic_attack = ((stages.raise_basic_attack + (stages.basic_attack) * 2) * item.amount) + 3;
        // 设置 玩家属性面板
        AlterProperty(player, { raise_basic_attack });
        // 消耗 物品对象
        DeleteItemStack(container, sample);
    }
}
/*
 * 魔晶扳手
 */
components$3.set(componentPrefix$1 + 'magic_crystal_wrench', {
    onUse(source) {
        /**
         * * 触发自定义组件的玩家
         */
        const player = source.source;
        /**
         * * 触发自定义组件的物品
         */
        const item = source.itemStack;
        /**
         * * 玩家背包
         */
        const container = player.getComponent('inventory')?.container;
        // 判断条件是否满足
        if (!container || !player || !item)
            return;
        // 判断是否冷却完成
        if (!TriggerControl(item.typeId, player, 20))
            return;
        /**
         * * 定义了 窗口界面 的 标题
         */
        const title = {
            rawtext: [
                {
                    text: "<§9§o§l "
                },
                translate(item),
                {
                    text: " §r>§2操作界面"
                }
            ]
        };
        /**
         * * 定义了 窗口界面 的 选项
         */
        const option = [
            { text: '§l<§n§o 元素附魔 §u-§c 烛火 §5>§r' },
            { text: '§l<§n§o 元素附魔 §u-§b 诸海 §5>§r' },
            { text: '§l<§n§o 元素附魔 §u-§a 界木 §5>§r' },
            { text: '§l<§n§o 元素附魔 §u-§d 极雷 §5>§r' },
            { text: '§l<§n§o 元素附魔 §u-§p 归忆 §5>§r' },
            { text: '§l<§n§o 元素附魔 §u-§i 启程 §5>§r' },
            { text: '§l<§n§o 元素附魔 §u-§j 焚绝 §5>§r' }
        ];
        /**
         * * 定义了 窗口界面 的 表单对象
         */
        const display = new serverUI.ActionFormData()
            .title(title)
            .button(option[0], "textures/物品贴图/能量水晶/烛火_魔晶石")
            .button(option[1], "textures/物品贴图/能量水晶/诸海_魔晶石")
            .button(option[2], "textures/物品贴图/能量水晶/界木_魔晶石")
            .button(option[3], "textures/物品贴图/能量水晶/极雷_魔晶石")
            .button(option[4], "textures/物品贴图/能量水晶/归忆_魔晶石")
            .button(option[5], "textures/物品贴图/能量水晶/启程_魔晶石")
            .button(option[6], "textures/物品贴图/能量水晶/焚绝_魔晶石");
        /**
         * * 设置元素附魔
         *
         * @param nameTag - 名称标签
         * @param selfRune - 自身的附魔类型
         */
        const enchanting = (nameTag, selfRune) => {
            // 为物品添加动态属性
            item.setDynamicProperty('rune_hurt:self_rune', selfRune);
            // 设置物品名称
            item.nameTag = nameTag;
            // 为物品添加词缀
            item.setLore(['攻击命中后, 将获得' + nameTag]);
            // 设置 物品对象
            container.setItem(player.selectedSlotIndex, item);
            // 播放 音效
            player.playSound('block.enchanting_table.use');
        };
        // 播放 音效
        player.playSound('tile.piston.out');
        // 显示窗口界面
        display.show(player).then(option => {
            if (option.canceled)
                return;
            switch (option.selection) {
                //元素附魔 - 烛火
                case 0:
                    enchanting('§l<§n§o 元素附魔 §u-§c 烛火 §5>§r', RUNE_ENUM.red);
                    break;
                //元素附魔 - 诸海
                case 1:
                    enchanting('§l<§n§o 元素附魔 §u-§b 诸海 §5>§r', RUNE_ENUM.blue);
                    break;
                //元素附魔 - 界木
                case 2:
                    enchanting('§l<§n§o 元素附魔 §u-§a 界木 §5>§r', RUNE_ENUM.green);
                    break;
                //元素附魔 - 极雷
                case 3:
                    enchanting('§l<§n§o 元素附魔 §u-§d 极雷 §5>§r', RUNE_ENUM.purple);
                    break;
                //元素附魔 - 归忆
                case 4:
                    enchanting('§l<§n§o 元素附魔 §u-§p 归忆 §5>§r', RUNE_ENUM.orange);
                    break;
                //元素附魔 - 启程
                case 5:
                    enchanting('§l<§n§o 元素附魔 §u-§i 启程 §5>§r', RUNE_ENUM.white);
                    break;
                //元素附魔 - 焚绝
                case 6:
                    enchanting('§l<§n§o 元素附魔 §u-§j 焚绝 §5>§r', RUNE_ENUM.black);
                    break;
            }
        });
        // 更新 物品冷却
        item.getComponent('minecraft:cooldown')?.startCooldown(player);
    },
    onHitEntity(source) {
        /**
         * * 触发自定义组件的玩家
         */
        const player = source.attackingEntity;
        /**
         * * 玩家背包
         */
        const container = player.getComponent('inventory')?.container;
        /**
         * * 触发自定义组件的物品
         */
        const item = source.itemStack;
        /**
         * * 触发自定义组件的目标实体
         */
        const target = source.hitEntity;
        // 判断条件是否满足
        if (!(player instanceof server.Player) || !item || !target || !container)
            return;
        // 判断是否冷却完成
        if (!TriggerControl(item.typeId, player, 10))
            return;
        /**
         * * 获取 玩家属性面板
         */
        const stages = GetProperty(player);
        /**
         * * 粒子名称
         */
        const particle = stages.self_rune != 'rune_void' ? 'constant:impact_' + stages.self_rune : 'minecraft:sonic_explosion';
        /**
         * * 设置 范围查询 的 过滤条条件
         */
        const options = {
            excludeTypes: ["minecraft:item", "minecraft:xp_orb"],
            location: target?.location,
            maxDistance: 4,
            closest: 8
        };
        /**
         * * 获取 目标周围的实体
         */
        const getQueue = player.dimension.getEntities(options).filter(entity => entity.id !== player.id);
        /**
         * * 是否暴击
         */
        const erupt = IsErupt(player);
        /**
         * * 获取 元素附魔类型
         */
        const self_rune = item.getDynamicProperty('rune_hurt:self_rune') ?? 'rune_purple';
        // 对 玩家属性 进行 修改
        SetProperty(player, { self_rune: self_rune });
        // 获取属性提升值
        //IncreaseDamage(player, container);
        // 对选中的实体队列造成伤害
        getQueue.forEach(entity => ElementalAttack(player, entity, erupt));
        // 生成 粒子特效
        TrySpawnParticle(player.dimension, "minecraft:huge_explosion_emitter", target?.location ?? player.location);
        TrySpawnParticle(player.dimension, particle, target?.location ?? player.location);
        // 更新 物品冷却
        item.getComponent('minecraft:cooldown')?.startCooldown(player);
        // 更新 物品耐久
        SetDurability(player, item, container, player.selectedSlotIndex, 1);
    }
});
/*
 * 魔晶弹珠
 */
components$3.set(componentPrefix$1 + 'magic_crystal_marbles', {
    onUse(source) {
        /**
         * * 触发自定义组件的玩家
         */
        const player = source.source;
        /**
         * * 触发自定义组件的物品
         */
        const item = source.itemStack;
        /**
         * * 玩家背包
         */
        const container = player.getComponent('inventory')?.container;
        // 判断条件是否满足
        if (!container || !player || !item)
            return;
        // 判断是否冷却完成
        if (!TriggerControl(item.typeId, player, 20))
            return;
        // 播放 动画
        player.playAnimation('animation.item.common.resist', { blendOutTime: 0.5 });
        // 播放 音效
        player.playSound('item.trident.riptide_1');
        /**
         * * 获取 玩家指向的实体
         */
        const target = player.getEntitiesFromViewDirection({ maxDistance: 48 })[0]?.entity;
        // 确认 目标实体是否存在
        if (!target || !target.isValid)
            return;
        /**
         * * 设置 范围查询 的 过滤条条件
         */
        const options = {
            excludeTypes: ["minecraft:item", "minecraft:xp_orb"],
            location: target.location,
            maxDistance: 8,
            closest: 8
        };
        /**
         * * 获取 目标周围的实体
         */
        const queue = player.dimension.getEntities(options).filter(entity => entity.id !== player.id);
        // 确认 目标实体是否存在
        if (queue.length == 0 || !target)
            return;
        // 获取属性提升值
        increaseDamage(player, container, false);
        /**
         * * 获取 玩家属性面板
         */
        const data = GetProperty(player);
        /**
         * * 爆炸效果 粒子名称
         */
        const blastParticle = 'constant:fireworks_fireball_' + data.self_rune;
        /**
         * * 是否暴击
         */
        const erupt = IsErupt(player);
        /**
         * * 定义 粒子参数
         */
        const molang = new server.MolangVariableMap();
        /**
         * * 玩家 与 目标 之间的距离
         */
        const distance = Vector.distance(player.location, target.location);
        /**
         * * 进行消耗的样本物品
         */
        const sample = new server.ItemStack(item.typeId);
        // 消耗 物品对象
        DeleteItemStack(container, sample);
        // 设置 粒子参数
        molang.setColorRGB('variable.color', getRuneColor(data.self_rune));
        molang.setVector3('variable.direction', player.getViewDirection());
        molang.setFloat('variable.range', distance);
        molang.setFloat('variable.type', 0);
        // 播放 粒子效果
        TrySpawnParticle(player.dimension, 'scripts:path_spurt', player.getHeadLocation(), molang);
        // 延迟 触发 元素伤害
        server.system.runTimeout(() => {
            if (!target || !target.isValid)
                return;
            // 对选中的实体队列造成伤害
            queue.forEach(entity => ElementalAttack(player, entity, erupt, data));
            // 创建 爆炸粒子
            if (queue.length > 1)
                TrySpawnParticle(player.dimension, blastParticle, target.location);
        }, distance);
    }
});
/*
 * 魔晶弹弓
 */
components$3.set(componentPrefix$1 + 'magic_crystal_bow', {
    onUse(source) {
        /**
         * * 触发自定义组件的玩家
         */
        const player = source.source;
        /**
         * * 触发自定义组件的物品
         */
        const item = source.itemStack;
        /**
         * * 玩家背包
         */
        const container = player.getComponent('inventory')?.container;
        // 判断条件是否满足
        if (!container || !player || !item)
            return;
        // 判断是否冷却完成
        if (!TriggerControl(item.typeId, player, 10))
            return;
        // 执行 弹弓照明 机制
        if (player.isSneaking)
            bowSneaking(player);
        // 如果 玩家 不在潜行模式
        else {
            /**
             * * 获取 玩家属性面板
             */
            const data = GetProperty(player);
            // 对 属性 进行 初始化
            SetProperty(player, { raise_basic_attack: 0 });
            // 获取属性提升值
            increaseDamage(player, container);
            // 生成 粒子特效
            TrySpawnParticle(player.dimension, 'constant:excite_' + data.self_rune, player.getHeadLocation());
        }
        // 更新 物品冷却
        item.getComponent('minecraft:cooldown')?.startCooldown(player);
        // 更新 物品耐久
    }
});
/**
 * * 魔晶弹弓 - 弹道运行
 */
function bowTick(args) {
    /**
     * * 获取 方块对象
     */
    const block = args.dimension.getBlock(args.location);
    if (!block || !block.isValid)
        return false;
    if (block && block.isAir)
        return true;
    return false;
}
/**
 * * 魔晶弹弓 - 弹道终止
 */
function bowStop(args) {
    /**
     * * 获取 方块对象
     */
    const block = args.dimension.getBlock(args.location);
    // 确认 目标方块是否存在
    if (!block || !block.isValid)
        return;
    /**
     * * 目标方块周围的方块队列
     */
    const blocks = [];
    //获取 目标附近 的 全部方块
    for (let axleX = -1; axleX < 2; axleX++)
        for (let axleY = -1; axleY < 2; axleY++)
            for (let axleZ = -1; axleZ < 2; axleZ++) {
                /**
                 * * 获取 方块对象
                 */
                const sample = block.offset({ x: axleX, y: axleY, z: axleZ });
                //写入方块信息
                if (sample)
                    blocks.push(sample);
            }
    //遍历方块队列 并点亮方块
    for (let index = 0; index < blocks.length; index++) {
        if (!blocks[index].isAir || blocks[index].below()?.isAir || blocks[index].below()?.isLiquid)
            continue;
        blocks[index].setPermutation(server.BlockPermutation.resolve('minecraft:soul_torch'));
        break;
    }
}
/**
 * * 魔晶弹弓 - 潜行时
 */
function bowSneaking(object) {
    // 创建 路径包
    PathExecute.Create('魔晶弹弓-照明射线', 1, {
        particles: ['constant:track_color_yellow'],
        dimension: object.dimension,
        locations: [],
        on_move: bowTick,
        on_done: bowStop,
        cooldown: 1,
        speed: 1,
        shoot: {
            start_place: object.getHeadLocation(),
            toward: object.getViewDirection(),
            max_distance: 128
        }
    });
}
/**
 * * 魔晶弹弓 - 命中后
 */
function bowHitAfter(object, target) {
    /**
     * * 获取 玩家的 状态属性
     */
    const data = GetProperty(object);
    /**
     * * 定义 粒子参数
     */
    const molang = new server.MolangVariableMap();
    if (!target)
        return;
    // 设置 粒子参数
    molang.setColorRGB('variable.color', getRuneColor(data.self_rune));
    molang.setVector3('variable.direction', Vector.CONSTANT_DOWN);
    molang.setFloat('variable.range', 5);
    molang.setFloat('variable.type', 0);
    // 播放 粒子效果
    object.spawnParticle('scripts:path_spurt', Vector.add(target.location, { x: 0, y: 5, z: 0 }), molang);
    /**
     * * 是否暴击
     */
    const erupt = IsErupt(object);
    // 触发 魔晶弹弓 追击伤害
    ElementalAttack(object, target, erupt);
}
/*
 * 魔晶起子
 */
components$3.set(componentPrefix$1 + 'magic_crystal_screwdriver', {
    onUse(source) {
        /**
         * * 触发自定义组件的玩家
         */
        const player = source.source;
        /**
         * * 触发自定义组件的物品
         */
        const item = source.itemStack;
        /**
         * * 玩家背包
         */
        const container = player.getComponent('inventory')?.container;
        // 判断条件是否满足
        if (!container || !player || !item)
            return;
        // 判断是否冷却完成
        if (!TriggerControl(item.typeId, player, 20))
            return;
        /**
         * * 设置界面标题
         */
        const title = {
            text: "<§9§o§l 区块连锁 §r>§2操作界面"
        };
        /**
         * * 设置界面内容
         */
        const label = { text: '区块连锁 -> 用法' };
        /**
         * * 设置界面滑动条
         */
        const slider = [
            { text: '<§9§o§l 区块连锁 §r>极限深度§r' },
            { text: '<§9§o§l 区块连锁 §r>极限高度§r' },
            { text: '<§9§o§l 区块连锁 §r>极限范围§r' }
        ];
        /**
         * * 设置界面下拉框
         */
        const option = [
            { text: '§l§1[§9 潜行触发 §1]§r' },
            { text: '§l§c[§c 关闭功能 §c]§r' },
            { text: '§l§1[§4 始终触发 §1]§r' }
        ];
        // 设置界面
        new serverUI.ModalFormData()
            .title(title)
            .slider(slider[0], -16, -1, { 'valueStep': 1, 'defaultValue': -5 })
            .slider(slider[1], 1, 16, { 'valueStep': 1, 'defaultValue': 5 })
            .slider(slider[2], 4, 16, { 'valueStep': 1, 'defaultValue': 5 })
            .dropdown(label, option, { 'defaultValueIndex': 1 })
            .show(player).then(popup => {
            if (popup.canceled)
                return;
            /**
             * * 功能类型
             */
            const mode = ['潜行', undefined, '始终'];
            // 获取 窗口值
            const formValues = popup.formValues;
            // 显示 功能类型
            player.sendMessage(option[formValues[3]]);
            // 设置 区块连锁 类型
            player.setDynamicProperty('block_chain:type', mode[formValues[3]]);
            // 设置 区块连锁 深度
            player.setDynamicProperty('block_chain:depth', formValues[0]);
            // 设置 区块连锁 高度
            player.setDynamicProperty('block_chain:height', formValues[1]);
            // 设置 区块连锁 范围
            player.setDynamicProperty('block_chain:range', formValues[2]);
        });
        //播放音效
        player.playSound("break.amethyst_block");
        // 更新 物品冷却
        item.getComponent('minecraft:cooldown')?.startCooldown(player);
        // 更新 物品耐久
        SetDurability(player, item, container, player.selectedSlotIndex, 1);
    }
});
/*
 * 魔晶钩爪
 */
components$3.set(componentPrefix$1 + 'magic_crystal_claw', {
    onUse(source) {
        /**
         * * 触发自定义组件的玩家
         */
        const player = source.source;
        /**
         * * 触发自定义组件的物品
         */
        const item = source.itemStack;
        /**
         * * 玩家背包
         */
        const container = player.getComponent('inventory')?.container;
        /**
         * * 获取 向量
         */
        const Vector = player.getViewDirection();
        /**
         * * 状态效果 参数
         */
        const [options_0, options_1] = [
            {
                amplifier: 0,
                showParticles: false
            },
            {
                amplifier: 4,
                showParticles: false
            }
        ];
        /**
         * * 计算 水平 弹射 速度
         */
        const horizontalPower = (Math.abs(Vector.x) + Math.abs(Vector.z)) * 8;
        // 判断条件是否满足
        if (!container || !player || !item)
            return;
        // 判断是否冷却完成
        if (!TriggerControl(item.typeId, player, 20))
            return;
        // 更新 物品冷却
        item.getComponent('minecraft:cooldown')?.startCooldown(player);
        //播放音效
        player.playSound("random.bow");
        // 向量弹射
        player.applyKnockback({ x: Vector.x * horizontalPower, z: Vector.z * horizontalPower }, Vector.y * 4);
        // 生成 粒子特效
        TrySpawnParticle(player.dimension, 'constant:magic_crystal_claw.icon', player.location);
        // 添加 状态效果
        player.addEffect("minecraft:slow_falling", 40, options_0);
        player.addEffect("minecraft:resistance", 40, options_1);
        // 更新 物品耐久
        SetDurability(player, item, container, player.selectedSlotIndex, 1);
    }
});
/**
 * * 魔晶盾牌
 */
function magicCrystalShield(player, item) {
    // 播放 动画
    player.playAnimation('animation.item.shield.resist', { blendOutTime: 0.5 });
    // 播放 声音
    player.playSound('item.shield.block');
    // 检测 是否完成冷却
    if (!TriggerControl('魔晶盾牌:伤害反射', player, 60))
        return;
    if (!player.isSneaking)
        return;
    // 更新 物品冷却
    item.getComponent('minecraft:cooldown')?.startCooldown(player);
    // 弹反伤害
    shieldReflexDamage(player, item);
}
/**
 * * 魔晶盾牌 - 伤害弹反
 */
function shieldReflexDamage(player, item) {
    /**
     * * 过滤条条件
     */
    const options = {
        excludeTypes: ["minecraft:item", "minecraft:xp_orb"],
        location: player.location,
        maxDistance: 4
    };
    /**
     * * 获取 玩家的属性面板
     */
    const getData = GetProperty(player);
    // 造成 弹反伤害
    player.dimension.getEntities(options).filter(entity => entity.id !== player.id).forEach(entity => ElementalAttack(player, entity, true, getData));
    // 生成 粒子效果
    if (getData.self_rune !== RUNE_ENUM.void)
        TrySpawnParticle(player.dimension, `constant:impact_${getData.self_rune}`, player.location);
    if (getData.self_rune === RUNE_ENUM.void)
        TrySpawnParticle(player.dimension, 'minecraft:sonic_explosion', player.location);
    // 更新 物品冷却
    item.getComponent('minecraft:cooldown')?.startCooldown(player);
}
/**
 * * 魔晶锤子
 */
function magicCrystalHammer(player, item, container, block) {
    /**
     * * 获取 金属锭 所处的 方块对象
     */
    const pointer = block?.above();
    // 确认 目标方块是否存在
    if (!pointer)
        return;
    /**
     * * 获取 金属锭 物品对象
     */
    const material = pointer.dimension.getEntitiesAtBlockLocation(pointer.location);
    // 遍历 金属锭 物品对象
    for (let index = 0; index < material.length; index++) {
        /**
         * * 获取 金属锭 物品对象
         */
        const item = material[index].getComponent('item')?.itemStack;
        // 如果物品不存在 或 数量不足
        if (!item || item?.amount < 2)
            continue;
        /**
         * * 获取 锻压类型 标签
         */
        const tags = item?.getTags().filter(tag => tag.startsWith('tags:mineral_resources.make'));
        // 如果 锻压类型 标签不存在
        if (tags.length == 0)
            continue;
        /**
         * * 获取 锻压类型
         */
        const type = tags[0].split('.')[2];
        /**
         * * 获取 物品锻压阶段
         */
        const stage = item.typeId.split(':')[1].split('.').length;
        /**
         * * 获取 物品名称
         */
        const name = stage == 1 ? item.typeId.split(':')[1] : item.typeId.split(':')[1].split('.')[1];
        // 删除 金属锭 物品对象
        material[index].remove();
        // 消耗 物品数量
        if (item.amount > 2) {
            item.amount -= 2;
            const newMaterial = TrySpawnItem(pointer.dimension, item, pointer.center());
            if (newMaterial instanceof server.Entity)
                server.system.run(() => newMaterial.teleport(pointer.center()));
        }
        // 生成 金属板 物品对象
        const mineral = TrySpawnItem(pointer.dimension, new server.ItemStack('starry_map:' + type + '.' + name), pointer.center());
        // 移动 金属板 物品对象
        if (mineral instanceof server.Entity)
            server.system.run(() => mineral.teleport(pointer.center()));
        // 播放 声音
        player.playSound('random.anvil_use');
        // 结束循环
        break;
    }
    // 更新 物品冷却
    item.getComponent('minecraft:cooldown')?.startCooldown(player);
    // 更新 物品耐久
    SetDurability(player, item, container, player.selectedSlotIndex, 1);
}
/**
 * * 魔晶钥匙
 */
async function magicCrystalKey(player, item, container, block) {
    /**
     * * 方块白名单
     */
    const whiteList = new Set(['minecraft:trial_spawner', 'minecraft:mob_spawner', 'minecraft:vault']);
    /**
     * * 获取 容器对象
     */
    const inventory = block?.getComponent('inventory')?.container;
    /**
     * 容器中的物品名称
     */
    const itemName = [];
    // 确认 目标方块是否存在 且 是否为容器或白名单
    if (!block || !inventory && !whiteList.has(block?.typeId))
        return;
    /**
     * * 获取 容器的物品对象
     */
    const chest = block.getItemStack(1, true);
    /**
     * * 拷贝方块中心坐标
     */
    const blockLocation = Vector.copy(block.center());
    // 清空容器内容
    if (inventory)
        for (let index = 0; index < inventory.size; index++) {
            /**
             * * 获取 容器物品对象
             */
            const item = inventory.getItem(index);
            // 添加 物品名称
            if (itemName.length <= 10 && item)
                itemName.push(`${item.typeId} -> ${item.amount}`);
            // 清空容器物品对象
            inventory.setItem(index);
        }
    // 移除容器方块
    block.setPermutation(server.BlockPermutation.resolve('minecraft:air'));
    // 等待 1 tick
    await server.system.waitTicks(1);
    // 移除方块销毁后散落的物品掉落物实体
    block.dimension.getEntities({ location: blockLocation, maxDistance: 1, type: 'minecraft:item' }).forEach(entity => entity.remove());
    // 等待 1 tick
    await server.system.waitTicks(1);
    // 生成 容器的物品对象
    if (chest) {
        // 为 容器的物品对象 附加词缀
        chest.setLore([`搬运者: ${player.nameTag}`, ...itemName]);
        // 生成 容器的物品对象
        TrySpawnItem(block.dimension, chest, block.center());
    }
    // 播放音效
    player.playSound('block.barrel.open');
    // 更新 物品冷却
    item.getComponent('minecraft:cooldown')?.startCooldown(player);
    // 更新 物品耐久
    SetDurability(player, item, container, player.selectedSlotIndex, 1);
}

/*
 * 原版接口
 */
/**
 * * 组件前缀代词
 */
const componentPrefix = 'opal:item.';
/**
 * * 物品自定义组件列表
 */
const components$2 = new Map();
/*
 * 锚点虚印
 */
components$2.set(componentPrefix + 'dynamic_anchor_point', {
    onUse(source) {
        /**
         * * 触发自定义组件的玩家
         */
        const player = source.source;
        /**
         * * 触发自定义组件的物品
         */
        const item = source.itemStack;
        /**
         * * 玩家背包
         */
        const container = player.getComponent('inventory')?.container;
        // 判断条件是否满足
        if (!container || !player || !item)
            return;
        // 判断是否冷却完成
        if (!TriggerControl(item.typeId, player, 20))
            return;
        /**
         * * 标题
         */
        const title = {
            text: "§r<§9§o§l 锚点虚印 §r>§9操作界面"
        };
        /**
         * * 选项
         */
        const option = [
            { text: '<§5§o§l 锚点绑定 §r>' },
            { text: '<§9§o§l 锚点召集 §r>' },
            { text: '<§4§o§l 锚点移除 §r>' },
            { text: '<§9§o§l 锚点传送 §r>' }
        ];
        /**
         * * 获取 窗口对象
         */
        const display = new serverUI.ActionFormData()
            .title(title)
            .button(option[0], "textures/物品贴图/特殊道具/锚点虚印")
            .button(option[1], "textures/物品贴图/特殊道具/锚点虚印")
            .button(option[2], "textures/物品贴图/特殊道具/锚点虚印")
            .button(option[3], "textures/物品贴图/特殊道具/锚点虚印");
        // 显示 操作界面
        display.show(player).then(result => {
            if (result.canceled)
                return;
            // 根据 选项 进行 不同 处理
            switch (result.selection) {
                // 绑定模式
                case 0:
                    bindingAnchor(player);
                    break;
                // 召集模式
                case 1:
                    musterAnchor(player);
                    break;
                // 移除模式
                case 2:
                    deleteAnchor(player);
                    break;
                // 传送模式
                case 3:
                    arrivalAnchor(player);
                    break;
            }
            // 播放 音效
            player.playSound('random.levelup');
        });
        // 播放 音效
        player.playSound('random.levelup');
        // 更新 物品冷却
        item.getComponent('minecraft:cooldown')?.startCooldown(player);
        // 更新 物品耐久
        SetDurability(player, item, container, player.selectedSlotIndex, 1);
    }
});
/**
 * * 锚点绑定
 */
function bindingAnchor(player) {
    /**
     * * 设定查询参数
     */
    const options = {
        excludeTypes: ["minecraft:item", "minecraft:xp_orb"],
        excludeFamilies: ["monster", "player"]
    };
    /**
     * * 获取 实体 的 距离信息
     */
    const Distance = (entity) => Math.floor(Vector.distance(player.location, entity.location));
    /**
     * * 获取 实体数组
     */
    const entitys = EntitysSort(player.dimension, options, (a, b) => Distance(a) - Distance(b), entity => !entity.getDynamicProperty('entity:false_anchor_point') && entity.getComponent('minecraft:is_tamed'));
    /**
     * * 定义了 窗口界面 的 标题
     */
    const title = {
        text: "§9§l<§u 锚点绑定 §9>§r§3操作界面"
    };
    /**
     * * 定义了 窗口界面 的 表单对象
     */
    const display = new serverUI.ActionFormData().title(title);
    // 遍历 实体数组 并 加入 按钮
    entitys.forEach(entity => display.button(DistanceAndName(entity, Distance(entity)), "textures/物品贴图/特殊道具/锚点虚印"));
    if (entitys.length < 1)
        display.button('§4§l周围不存在 §c<§9 可以§6<§u 锚点绑定 §6>§9的实体 §c>§r', "textures/物品贴图/特殊道具/锚点虚印");
    // 播放 音效
    player.playSound('item.book.page_turn');
    // 显示 窗口界面
    display.show(player).then(option => {
        if (option.selection == undefined || entitys.length === 0)
            return;
        /**
         * * 获取 目标 实体
         */
        const target = entitys[option.selection];
        // 播放 音效
        player.playSound('random.levelup');
        // 设定 锚点绑定
        target.setDynamicProperty('entity:false_anchor_point', player.id);
        player.sendMessage([{ text: '正在执行§9§l<§u 锚点绑定 §9>§r: ' }, translate(target)]);
    });
}
/**
 * * 锚点召集
 */
function musterAnchor(player) {
    /**
     * * 设定查询参数
     */
    const options = {
        excludeTypes: ["minecraft:item", "minecraft:xp_orb"],
        excludeFamilies: ["monster", "player"]
    };
    /**
     * * 获取 实体 的 距离信息
     */
    const Distance = (entity) => Math.floor(Vector.distance(player.location, entity.location));
    /**
     * * 获取 实体数组
     */
    const queue = EntitysSort(player.dimension, options, (a, b) => Distance(a) - Distance(b), entity => entity.getDynamicProperty('entity:false_anchor_point') == player.id);
    /**
     * * 定义了 窗口界面 的 标题
     */
    const title = {
        text: "§9§l<§u 锚点召集 §9>§r§3操作界面"
    };
    /**
     * * 定义了 窗口界面 的 表单对象
     */
    const display = new serverUI.ActionFormData().title(title).button('§l< 召集全部 >', "textures/物品贴图/特殊道具/锚点虚印");
    // 遍历 实体数组 并 加入 按钮
    queue.forEach(entity => display.button(DistanceAndName(entity, Distance(entity)), "textures/物品贴图/特殊道具/锚点虚印"));
    if (queue.length < 1)
        display.button('§4§l周围不存在 §c<§9 完成§6<§u 锚点召集 §6>§9的实体 §c>§r', "textures/物品贴图/特殊道具/锚点虚印");
    // 显示 窗口界面
    display.show(player).then(option => {
        // 检测 是否满足 运行条件
        if (option.selection == undefined || queue.length === 0)
            return;
        // 运行 锚点召集
        if (option.selection == 0) {
            // 将列表内的全部目标召集到玩家身边的随机位置
            queue.forEach(entity => entity.teleport(Vector.randomTopmostBlock(player)));
            // 显示提示信息
            player.sendMessage({ text: '正在执行§9§l<§u 锚点召集 §9>§r' });
        }
        else {
            /**
             * * 获取 目标 实体
             */
            const target = queue[option.selection - 1];
            // 设定 锚点召集
            target.teleport(player.location);
            player.sendMessage([{ text: '正在执行§9§l<§u 锚点召集 §9>§r: ' }, translate(target)]);
        }
        // 播放 音效
        player.playSound('random.levelup');
    });
}
/**
 * * 锚点移除
 */
function deleteAnchor(player) {
    /**
     * * 设定查询参数
     */
    const options = {
        excludeTypes: ["minecraft:item", "minecraft:xp_orb"],
        excludeFamilies: ["monster", "player"]
    };
    /**
     * * 获取 实体 的 距离信息
     */
    const Distance = (entity) => Math.floor(Vector.distance(player.location, entity.location));
    /**
     * * 获取 实体数组
     */
    const queue = EntitysSort(player.dimension, options, (a, b) => Distance(a) - Distance(b), entity => entity.getDynamicProperty('entity:false_anchor_point') == player.id);
    /**
     * * 定义了 窗口界面 的 标题
     */
    const title = {
        text: "§9§l<§u 锚点移除 §9>§r§3操作界面"
    };
    /**
     * * 定义了 窗口界面 的 表单对象
     */
    const display = new serverUI.ActionFormData().title(title);
    // 遍历 实体数组 并 加入 按钮
    queue.forEach(entity => display.button(DistanceAndName(entity, Distance(entity)), "textures/物品贴图/特殊道具/锚点虚印"));
    if (queue.length < 1)
        display.button('§4§l周围不存在 §c<§9 可以§6<§u 锚点移除 §6>§9的实体 §c>§r', "textures/物品贴图/特殊道具/锚点虚印");
    // 显示 窗口界面
    display.show(player).then(option => {
        // 检测 是否满足 运行条件
        if (option.selection == undefined || queue.length === 0)
            return;
        /**
         * * 获取 目标 实体
         */
        const target = queue[option.selection];
        // 播放 音效
        player.playSound('random.levelup');
        // 设定 锚点移除
        target.setDynamicProperty('entity:false_anchor_point');
        player.sendMessage([{ text: '正在执行§9§l<§u 锚点移除 §9>§r: ' }, translate(target)]);
    });
}
/**
 * * 锚点传送
 */
function arrivalAnchor(player) {
    /**
     * * 设定查询参数
     */
    const options = {
        excludeTypes: ["minecraft:item", "minecraft:xp_orb"],
        excludeFamilies: ["monster", "player"]
    };
    /**
     * * 获取 实体 的 距离信息
     */
    const Distance = (entity) => Math.floor(Vector.distance(player.location, entity.location));
    /**
     * * 获取 实体数组
     */
    const queue = EntitysSort(player.dimension, options, (a, b) => Distance(a) - Distance(b), entity => entity.getDynamicProperty('entity:false_anchor_point') == player.id);
    /**
     * * 定义了 窗口界面 的 标题
     */
    const title = {
        text: "§9§l<§u 锚点召集 §9>§r§3操作界面"
    };
    /**
     * * 定义了 窗口界面 的 表单对象
     */
    const display = new serverUI.ActionFormData().title(title).button('§l< 随机传送 >', "textures/物品贴图/特殊道具/锚点虚印");
    // 遍历 实体数组 并 加入 按钮
    queue.forEach(entity => display.button(DistanceAndName(entity, Distance(entity)), "textures/物品贴图/特殊道具/锚点虚印"));
    if (queue.length < 1)
        display.button('§4§l周围不存在 §c<§9 完成§6<§u 锚点召集 §6>§9的实体 §c>§r', "textures/物品贴图/特殊道具/锚点虚印");
    // 显示 窗口界面
    display.show(player).then(option => {
        // 检测 是否满足 运行条件
        if (option.selection == undefined || queue.length === 0)
            return;
        // 运行 锚点召集
        if (option.selection == 0) {
            /**
             * * 获取 目标 实体
             */
            const target = queue[Random({ min: 1, max: queue.length - 1 }, true)];
            // 设定 锚点传送
            player.teleport(target.location);
            player.sendMessage([{ text: '正在执行§9§l<§u 锚点传送 §9>§r: ' }, translate(target)]);
        }
        else {
            /**
             * * 获取 目标 实体
             */
            const target = queue[option.selection - 1];
            // 设定 锚点传送
            player.teleport(target.location);
            player.sendMessage([{ text: '正在执行§9§l<§u 锚点传送 §9>§r: ' }, translate(target)]);
        }
        // 播放 音效
        player.playSound('random.levelup');
    });
}
/*
 * 神机操持
 */
components$2.set(componentPrefix + 'mechanized_operation', {
    onUse(source) {
        /**
         * * 触发自定义组件的玩家
         */
        const player = source.source;
        /**
         * * 触发自定义组件的物品
         */
        const item = source.itemStack;
        /**
         * * 玩家背包
         */
        const container = player.getComponent('inventory')?.container;
        // 判断条件是否满足
        if (!container || !player || !item)
            return;
        // 判断是否冷却完成
        if (!TriggerControl(item.typeId, player, 20))
            return;
        /**
         * * 过滤器参数
         */
        const whaleOptions = {
            type: 'starry_map:abyss_whale.support',
            location: player.location,
            maxDistance: 5
        };
        /**
         * * 获取 附近的 渊鲸
         */
        const whale = player.dimension.getEntities(whaleOptions);
        /**
         * * 界面标题
         */
        const title = {
            text: "§r<§9§o§l 神机操持 §r>§9操作界面"
        };
        /**
         * * 界面选项
         */
        const option = [
            { text: '<§5§o§l 上浮模式 §r>' },
            { text: '<§5§o§l 下潜模式 §r>' },
            { text: '<§9§o§l 列车行进 §r>' },
            { text: '<§9§o§l 列车左旋 §r>' },
            { text: '<§9§o§l 列车右旋 §r>' },
        ];
        /**
         * * 列车查询参数
         */
        const trainOptions = {
            families: ['train'],
            maxDistance: 48,
            location: player.location
        };
        // 播放 音效
        player.playSound('respawn_anchor.charge');
        /**
         * * 创建 界面
         */
        const display = new serverUI
            .ActionFormData()
            .title(title)
            .button(option[0], "textures/项目图标/神机操持/上浮模式")
            .button(option[1], "textures/项目图标/神机操持/下潜模式")
            .button(option[2], "textures/项目图标/神机操持/载具行驶")
            .button(option[3], "textures/项目图标/神机操持/左舷回转")
            .button(option[4], "textures/项目图标/神机操持/右舷回转");
        // 显示界面
        display.show(player).then(select => {
            //对 用户选项 做出反应
            switch (select.selection) {
                //启动 上浮模式
                case 0:
                    // 遍历 附近的 渊鲸
                    GetContractRoles(player, whaleOptions, entity => {
                        /**
                         * * 获取 当前的方块
                         */
                        const block = entity.dimension.getBlock(entity.location);
                        // 如果处于流体中 就 解除渊鲸 的 航行限制
                        if (block?.isLiquid)
                            entity.triggerEvent('entity_event:secure_prohibit');
                        // 执行上浮模式实体事件
                        entity.triggerEvent('entity_event:immediately_float');
                    });
                    break;
                //启动 下潜模式
                case 1:
                    whale.forEach(info => info.triggerEvent('entity_event:immediately_dive'));
                    break;
                // 启动 列车行进
                case 2:
                    GetContractRoles(player, trainOptions, (entity) => entity.triggerEvent('entity_event:switch'));
                    player.playSound('tile.piston.out');
                    break;
                // 启动 列车左旋
                case 3:
                    GetContractRoles(player, trainOptions, (entity) => entity.addTag('tunnel_train.Sinistral'));
                    player.playSound('tile.piston.out');
                    break;
                // 启动 列车右旋
                case 4:
                    GetContractRoles(player, trainOptions, (entity) => entity.addTag('tunnel_train.Dextral'));
                    player.playSound('tile.piston.out');
                    break;
            }
            // 播放 音效
            player.playSound('random.levelup');
        });
        // 更新 物品冷却
        item.getComponent('minecraft:cooldown')?.startCooldown(player);
    }
});
/*
 * 参悟之石
 */
components$2.set(componentPrefix + 'enlightenent', {
    onUse(source) {
        /**
         * * 触发自定义组件的玩家
         */
        const player = source.source;
        /**
         * * 触发自定义组件的物品
         */
        const item = source.itemStack;
        /**
         * * 玩家背包
         */
        const container = player.getComponent('inventory')?.container;
        // 判断条件是否满足
        if (!container || !player || !item)
            return;
        // 判断是否冷却完成
        if (!TriggerControl(item.typeId, player, 20))
            return;
        /**
         * * 设置 实体 的 查询条件
         */
        const options = {
            excludeTypes: ["minecraft:item", "minecraft:xp_orb", player.typeId],
            excludeFamilies: ["monster"],
            location: player.location,
            maxDistance: 16
        };
        /**
         * * 获取 实体 的 距离信息
         */
        const entityDistance = (entity) => Math.floor(Vector.distance(player.location, entity.location));
        /**
         * * 实体过滤器
         */
        const entityFilter = (entity) => entity.getComponent('minecraft:health') !== undefined;
        /**
         * * 获取 实体组 并 过滤掉 无法驯服的实体
         */
        const entityQueue = EntitysSort(player.dimension, options, (a, b) => entityDistance(a) - entityDistance(b), entityFilter);
        /**
         * * 定义了 窗口界面 的 标题
         */
        const itemTitle = {
            text: "§9§l<§u 参悟之石 §9>§r§3操作界面"
        };
        /**
         * * 定义了 窗口界面 的 表单对象
         */
        const queueDisplay = new serverUI.ActionFormData().title(itemTitle);
        /**
         * * 功能选择界面
         *
         * @param option - 选项
         */
        const PropertySelection = (option) => {
            // 判断玩家是否 选择 退出
            if (option.selection == undefined || entityQueue.length == 0)
                return;
            /**
             * * 获取 目标 实体
             */
            const target = entityQueue[option.selection];
            /**
             * * 实体属性
             */
            const property = GetProperty(target);
            /**
             * * 实体血量
             */
            const health = target.getComponent('health');
            /**
             * * 能量返还
             */
            const returnEnergy = target.getDynamicProperty('entity:return_energy') ?? 0;
            /**
             * * 获取 战斗经验值
             */
            const experience = target.getDynamicProperty('entity:experience') ?? 0;
            /**
             * * 用户标识符
             */
            const userId = target.getDynamicProperty('entity:contract_user');
            /**
             * * 用户名称
             */
            const userName = userId ? server.world.getEntity(userId)?.nameTag : '未知';
            /**
             * * 限制数值的范围
             *
             * @param {number} value - 数值
             *
             * @returns {number} 限定范围内的数值
             */
            const levelClamp = (value) => Clamp({ max: max_experience, min: 0 }, Math.floor(value));
            /**
             * * 界面标题
             */
            const targetTitle = {
                rawtext: [
                    { text: '§u『§l ' }, translate(target), { text: ' §u』' }
                ]
            };
            /**
             * * 界面内容
             */
            const targetIntel = {
                rawtext: [
                    { text: `[§q§l 实体血量 §r] : §l§2${Math.floor((health?.currentValue ?? 0))}§r /§l§3 ${health?.defaultValue ?? 0}§r\n` },
                    { text: `[§p§l 实体归属 §r] : §l§6${userName}§r\n` },
                    { text: `[§1§l 战术等级 §r] : §l§9${levelClamp(experience / experience_improve)}§r\n` },
                    { text: `[§s§l 战斗经验 §r] : §l§b${experience}§r\n` },
                ]
            };
            /**
             * * 提高被选中的属性数据
             *
             * @param option - 选项对象
             */
            const increaseProperty = (option, amount) => {
                // 判断玩家是否做出了选择
                if (option.selection == undefined)
                    return;
                // 基于 玩家选择的选项 判断 什么属性的数值
                switch (option.selection) {
                    //* 基础攻击
                    case 0:
                        // 判断 是否可以继续提升
                        if (property.basic_attack > 95)
                            return player.sendMessage(`§l§4<§c 基础攻击 §4>§r已到达上限, 无法继续提升`);
                        // 提示 修改结果
                        player.sendMessage(`§l§1<§9 基础攻击 §1>§t获得提升, 现在为§r: §l§u${property.basic_attack + (5 * amount)}`);
                        // 更改 实体属性
                        AlterProperty(target, { basic_attack: (5 * amount) });
                        break;
                    //* 基础暴击
                    case 1:
                        // 判断 是否可以继续提升
                        if (property.erupt_odds > 95)
                            return player.sendMessage(`§l§4<§c 基础暴击 §4>§r已到达上限, 无法继续提升`);
                        // 提示 修改结果
                        player.sendMessage(`§l§1<§9 基础暴击 §1>§t获得提升, 现在为§r: §l§u${property.erupt_odds + (5 * amount)}%`);
                        // 更改 实体属性
                        AlterProperty(target, { erupt_odds: (5 * amount) });
                        break;
                    //* 基础暴伤
                    case 2:
                        // 判断 是否可以继续提升
                        if (property.erupt_hurt > 475)
                            return player.sendMessage(`§l§4<§c 基础暴伤 §4>§r已到达上限, 无法继续提升`);
                        // 提示 修改结果
                        player.sendMessage(`§l§1<§9 基础暴伤 §1>§t获得提升, 现在为§r: §l§u${property.erupt_hurt + (25 * amount)}%`);
                        // 更改 实体属性
                        AlterProperty(target, { erupt_hurt: (25 * amount) });
                        break;
                    //* 能量返还
                    case 3:
                        // 判断属性数值是否到达上限
                        if (returnEnergy > 95)
                            return player.sendMessage(`§l§4<§c 能量返还 §4>§r已到达上限, 无法继续提升`);
                        // 显示 修改结果
                        player.sendMessage(`§l§1<§9 能量返还 §1>§t获得提升, 现在为§r: §l§u${returnEnergy + (5 * amount)}`);
                        // 修改属性值
                        target.setDynamicProperty("entity:return_energy", returnEnergy + (5 * amount));
                        break;
                }
                // 消耗指定数量的物品
                ConsumeItemStack(container, player.selectedSlotIndex, item, amount);
            };
            /**
             * * 创建 选择 物品数量 的窗口
             */
            const amountDisplay = new serverUI.ModalFormData()
                .title(targetTitle)
                .slider('消耗数量', 1, item.amount, { 'valueStep': 1, 'defaultValue': 1 });
            /**
             * * 创建 选择 加成属性 的窗口
             */
            const PropertyDisplay = new serverUI.ActionFormData()
                .title(targetTitle)
                .body(targetIntel)
                .button(`提升§l§1[§9 基础攻击 §1]§r : §l§2${property.basic_attack}§r /§l§3 100 §r<§u§l +5 §r>`, 'textures/项目图标/攻击')
                .button(`提升§l§1[§9 基础暴击 §1]§r : §l§2${property.erupt_odds}%% §r /§l§3 100%% §r<§u§l +5%% §r>`, 'textures/项目图标/命中')
                .button(`提升§l§1[§9 基础暴伤 §1]§r : §l§2${property.erupt_hurt}%% §r /§l§3 500%% §r<§u§l +25%% §r>`, 'textures/项目图标/提升')
                .button(`提升§l§1[§9 能量返还 §1]§r : §l§2${returnEnergy} §r /§l§3 100 §r<§u§l +5 §r>`, 'textures/项目图标/返回')
                .button(`§l§1[§9 技能模组 §1]§r`, 'textures/项目图标/查询');
            // 判断 目标实体 与 手持物品 是否存在
            if (!item || !target)
                return;
            // 显示 窗口界面
            PropertyDisplay.show(player).then(option => {
                // 验证表单关闭状态 或 窗口界面数据是否为空
                if (option.canceled || option.selection == undefined)
                    return;
                // 基于 玩家选择的选项 判断 是否消耗指定数量的物品
                if (option.selection >= 4) {
                    /**
                     * * 查询并创建当前实体的战斗技能的情报接口
                     */
                    const intel = lexiconInterface(player, target.typeId);
                    // 打开情报窗口, 展示查询到的信息
                    windowedRetriever(player, intel);
                }
                // 创建 选择 物品数量 的窗口
                else
                    amountDisplay.show(player).then(amount => {
                        /**
                         * 获取 窗口界面 的数据
                         */
                        const info = amount.formValues;
                        // 验证表单关闭状态 或 窗口界面数据是否为空
                        if (!amount.canceled && info !== undefined)
                            increaseProperty(option, info[0]);
                    });
            });
        };
        // 在实体队列中添加当前玩家
        entityQueue.unshift(player);
        // 遍历 实体数组 并 加入 按钮
        entityQueue.forEach(entity => queueDisplay.button(DistanceAndName(entity, entityDistance(entity)), "textures/物品贴图/特殊道具/参悟之石"));
        // 播放 音效
        player.playSound('bucket.empty_lava');
        // 显示 窗口界面
        queueDisplay.show(player).then(option => PropertySelection(option));
        // 更新 物品冷却
        item.getComponent('minecraft:cooldown')?.startCooldown(player);
    }
});
/*
 * 涤尽铅华
 */
components$2.set(componentPrefix + 'reduction_pureness', {
    onUse(source) {
        /**
         * * 触发自定义组件的玩家
         */
        const player = source.source;
        /**
         * * 触发自定义组件的物品
         */
        const item = source.itemStack;
        /**
         * * 玩家背包
         */
        const container = player.getComponent('inventory')?.container;
        // 判断条件是否满足
        if (!container || !player || !item)
            return;
        // 判断是否冷却完成
        if (!TriggerControl(item.typeId, player, 20))
            return;
        /**
         * * 设置 实体 的 查询条件
         */
        const options = {
            excludeTypes: ["minecraft:item", "minecraft:xp_orb", player.typeId],
            excludeFamilies: ["monster"]
        };
        /**
         * * 获取 实体 的 距离信息
         */
        const Distance = (entity) => Math.floor(Vector.distance(player.location, entity.location));
        /**
         * * 实体过滤器
         */
        const Filter = (entity) => {
            if (!entity.getComponent('minecraft:health'))
                return false;
            if (entity.getDynamicProperty('entity:contract_user') !== player.id)
                return false;
            return true;
        };
        /**
         * * 获取 实体组 并 过滤掉并未签订契约的实体
         */
        const queue = EntitysSort(player.dimension, options, (a, b) => Distance(a) - Distance(b), entity => Filter(entity));
        /**
         * * 定义了 窗口界面 的 标题
         */
        const title = {
            text: "§9§l<§u 涤尽铅华 §9>§r§3操作界面"
        };
        /**
         * * 定义了 窗口界面 的 表单对象
         */
        const display = new serverUI.ActionFormData().title(title);
        // 遍历 实体数组 并 加入 按钮
        if (queue.length >= 1)
            queue.forEach(entity => display.button(DistanceAndName(entity, Distance(entity)), "textures/物品贴图/召唤凭证/星月诗篇"));
        else
            display.button('§4§l周围不存在 §c<§9 可以§6<§2 纯净化 §6>§9的实体 §c>§r', "textures/物品贴图/召唤凭证/星月诗篇");
        // 播放 音效
        player.playSound('bucket.empty_lava');
        // 显示 窗口界面
        display.show(player).then(option => {
            if (option.selection == undefined || queue.length == 0)
                return;
            /**
             * * 获取 目标 实体
             */
            const target = queue[option.selection];
            /**
             * * 定义 相机参数
             */
            const camera = player.camera;
            /**
             * * 粒子参数
             */
            const molang = new server.MolangVariableMap();
            /**
             * * 复制实体坐标
             */
            const anchor_0 = Vector.copy(target.location);
            /**
             * * 复制实体坐标
             */
            const anchor_1 = Vector.add(anchor_0, { x: 0, y: 2, z: 0 });
            /**
             * * 创建 百灵绘卷 物品对象
             */
            const material = new server.ItemStack('starry_map:moon_and_stars');
            /**
             * * 物品名称
             */
            const name = '§b启航星语 - §s';
            /**
             * * 物品词缀
             */
            const lore = [
                `类型: ${target.typeId}`,
                `名称: ${target.nameTag}`,
                "§b___________________",
                "此乃[ 魔神 - 葬火 ]的恩惠",
                "在登临[ 最终档案馆 ]的王座时",
                "祂曾向众生立下许诺:",
                "    凡此领航之众, 皆为吾之同族",
                "    只要吾之火不曾熄灭, 纵使败者亦能重燃"
            ];
            // 封印实体
            UnloadInventoryAndPackage(target, player, material, name, lore);
            // 设置 粒子尺寸
            molang.setFloat('variable.size', 4);
            // 播放 蝴蝶特效
            molang.setFloat('variable.direction', 3);
            TrySpawnParticle(player.dimension, 'scripts:path_butterfly', anchor_0, molang);
            // 播放 圆环特效
            molang.setFloat('variable.direction', 0);
            TrySpawnParticle(player.dimension, 'scripts:path_round', anchor_1, molang);
            // 播放 四芒星特效
            TrySpawnParticle(player.dimension, 'scripts:path_star4_small', anchor_1, molang);
            // 播放 封印动画
            camera.setCamera('minecraft:free', { location: Vector.add(anchor_0, { x: 5, y: 5, z: 5 }), facingLocation: anchor_0, easeOptions: { easeTime: 2 } });
            server.system.runTimeout(() => camera.fade({ fadeColor: { red: 0, green: 0, blue: 0 }, fadeTime: { fadeInTime: 1, fadeOutTime: 0.5, holdTime: 0.5 } }), 30);
            server.system.runTimeout(() => player.playSound('mob.allay.idle'), 60);
            server.system.runTimeout(() => player.teleport(anchor_0), 60);
            server.system.runTimeout(() => camera.clear(), 60);
        });
        // 更新 物品冷却
        item.getComponent('minecraft:cooldown')?.startCooldown(player);
        // 更新 物品耐久
        SetDurability(player, item, container, player.selectedSlotIndex, 1);
    }
});
/**
 * * 涵养灵露
 */
components$2.set(componentPrefix + 'moment_repair_dew', {
    onUse(source) {
        /**
         * * 触发自定义组件的玩家
         */
        const player = source.source;
        /**
         * * 触发自定义组件的物品
         */
        const item = source.itemStack;
        /**
         * * 玩家背包容器
         */
        const container = player.getComponent('inventory')?.container;
        /**
         * * 玩家装备槽容器
         */
        const equippable = player.getComponent('equippable');
        /**
         * * 物品槽位
         */
        const equippableSlot = Object.values(server.EquipmentSlot);
        /**
         * * 玩家装备槽物品
         */
        const equippables = equippableSlot.map(slot => equippable?.getEquipment(slot));
        // 判断条件是否满足
        if (!container || !player || !item)
            return;
        // 判断是否冷却完成
        if (!TriggerControl(item.typeId, player, 20))
            return;
        // 播放 基础使用音效
        player.playSound('fire.ignite');
        // 遍历 玩家背包
        for (let index = 0; index < container.size; index++) {
            /**
             * * 获取 背包中的物品对象
             */
            const getItem = container.getItem(index);
            /**
             * * 获取 物品耐久度
             */
            const durability = getItem?.getComponent('durability');
            // 跳过 无效物品
            if (!getItem || !durability || durability.damage == 0)
                continue;
            // 显示 文本提示
            player.sendMessage([translate(getItem), ' §a§l修复成功!']);
            // 恢复 物品耐久度
            durability.damage -= durability.damage;
            // 播放 恢复音效
            player.playSound('conduit.attack');
            // 置换 物品
            container.setItem(index, getItem);
            break;
        }
        // 遍历玩家装备栏
        equippables.forEach((item, index) => {
            /**
             * * 获取 物品耐久度
             */
            const durability = item?.getComponent('durability');
            // 跳过 无效物品
            if (!item || !durability || durability.damage == 0)
                return;
            // 显示 文本提示
            player.sendMessage([translate(item), ' §a§l修复成功!']);
            // 恢复 物品耐久度
            durability.damage -= durability.damage;
            // 播放 恢复音效
            player.playSound('conduit.attack');
            // 置换 物品
            equippable?.setEquipment(equippableSlot[index], item);
        });
        // 删除 物品
        DeleteItemStack(container, new server.ItemStack(item.typeId));
        // 更新 物品冷却
        item.getComponent('minecraft:cooldown')?.startCooldown(player);
    }
});
/*
 * 幻影驱散
 */
components$2.set(componentPrefix + 'phantom_dispel_dust', {
    onUse(source) {
        /**
         * * 触发自定义组件的玩家
         */
        const player = source.source;
        /**
         * * 触发自定义组件的物品
         */
        const item = source.itemStack;
        /**
         * * 玩家背包
         */
        const container = player.getComponent('inventory')?.container;
        // 判断条件是否满足
        if (!container || !player || !item)
            return;
        // 判断是否冷却完成
        if (!TriggerControl(item.typeId, player, 20))
            return;
        // 播放 基础使用音效
        player.playSound('fire.ignite');
        /**
         * * 获取 实体 的 距离信息
         */
        const distance = (entity) => Math.floor(Vector.distance(player.location, entity.location));
        /**
         * * 实体过滤器
         */
        const filter = (entity) => {
            // 筛除 无血量组件的实体
            if (!entity.getComponent('minecraft:health'))
                return false;
            // 筛除 已经被驯服的实体
            if (entity.getComponent('is_tamed'))
                return false;
            // 如果玩家为创造 则无视敌对实体的攻击目标
            if (isPlayerAuthorized(player))
                return true;
            // 筛除 攻击目标不是玩家的实体
            if (entity.target?.id !== player.id)
                return false;
            // 默认选中实体
            return true;
        };
        /**
         * * 扫描敌对生物队列
         */
        const entitys = EntitysSort(player.dimension, { families: ['monster'] }, distance, filter);
        // 判断 是否扫描到敌对实体
        if (entitys.length < 1)
            return;
        // 遍历敌对生物队列
        entitys.forEach(entity => {
            // 播放 烟雾 粒子效果
            TrySpawnParticle(entity.dimension, 'minecraft:knockback_roar_particle', entity.getHeadLocation());
            TrySpawnParticle(entity.dimension, 'constant:impact_rune_white', entity.getHeadLocation());
            TrySpawnParticle(entity.dimension, 'constant:excite_rune_white', entity.getHeadLocation());
            TrySpawnParticle(entity.dimension, 'constant:pulse_rune_white', entity.getHeadLocation());
            // 播放 水花 粒子效果
            SprayParticleTrigger(entity.dimension, entity.location);
            // 删除 实体
            entity.remove();
        });
        // 删除 物品
        DeleteItemStack(container, new server.ItemStack(item.typeId));
        // 更新 物品冷却
        item.getComponent('minecraft:cooldown')?.startCooldown(player);
        // 给与玩家 隐身效果
        player.addEffect('minecraft:invisibility', 60);
        // 播放 实体销毁时的音效
        player.playSound('cauldron.fillpotion');
    }
});
/*
 * 换装礼盒
 */
components$2.set(componentPrefix + 'clothing_container', {
    onUse(source) {
        /**
         * * 触发自定义组件的玩家
         */
        const player = source.source;
        /**
         * * 触发自定义组件的物品
         */
        const item = source.itemStack;
        /**
         * * 玩家背包
         */
        const container = player.getComponent('inventory')?.container;
        // 判断条件是否满足
        if (!container || !player || !item)
            return;
        // 判断是否冷却完成
        if (!TriggerControl(item.typeId, player, 20))
            return;
        /**
         * * 获取 神恩领航者 - 琉璃
         */
        const crystal = player.getEntitiesFromViewDirection().map(raycast => raycast.entity).filter(entity => entity.typeId == 'starry_map:guide.crystal')[0];
        /**
         * * 定义了 窗口界面 的 标题
         */
        const title = {
            text: "§9《§5 换装礼盒 §9》§r"
        };
        /**
         * * 定义了 窗口界面 的 选项
         */
        const option = [
            { text: '<§q§o§l 自然 §r>' },
            { text: '<§p§o§l 灿烂 §r>' },
            { text: '<§d§o§l 樱华 §r>' },
            { text: '<§u§o§l 梦幻 §r>' },
            { text: '<§s§o§l 漫海 §r>' },
            { text: '<§a§o§l 夏鸣 §r>' },
            { text: '<§c§o§l 领航 §r>' }
        ];
        /**
         * * 定义了 窗口界面 的 表单对象
         */
        const display = new serverUI.ActionFormData()
            .title(title)
            .button(option[0], "textures/项目图标/神恩使徒/界木")
            .button(option[1], "textures/项目图标/神恩使徒/归忆")
            .button(option[2], "textures/项目图标/神恩使徒/烛火")
            .button(option[3], "textures/项目图标/神恩使徒/极雷")
            .button(option[4], "textures/项目图标/神恩使徒/诸海")
            .button(option[5], "textures/项目图标/神恩使徒/界木")
            .button(option[6], "textures/项目图标/神恩使徒/启程");
        // 输出 表单对象
        if (crystal && crystal?.isValid)
            display.show(player).then(option => {
                if (option.canceled)
                    return;
                // 设定琉璃的皮肤纹理
                crystal.setProperty('property:facade', Number(option.selection));
                // 播放音效
                player.playSound('beacon.power');
            });
        // 播放 基础使用音效
        player.playSound('chime.amethyst_block');
        // 更新 物品冷却
        item.getComponent('minecraft:cooldown')?.startCooldown(player);
    }
});
/*
 * 契约重撰
 */
components$2.set(componentPrefix + 'contract_rewriting', {
    async onHitEntity(source) {
        /**
         * 玩家对象, 触发自定义组件的玩家
         */
        const player = source.attackingEntity;
        /**
         * 被攻击的实体对象, 即攻击命中的实体
         */
        const entity = source.hitEntity;
        /**
         * 物品对象, 触发自定义组件的物品
         */
        const item = source.itemStack;
        /**
         * 玩家的背包容器, 用于后续操作玩家背包中的物品
         */
        const container = player?.getComponent('inventory')?.container;
        // 如果玩家不是Player实例、物品不存在或背包容器不存在, 则直接返回
        if (!(player instanceof server.Player) || !item || !container)
            return;
        // 检查物品是否冷却完毕, 如果没有冷却完毕则返回
        if (!TriggerControl(item.typeId, player, 20))
            return;
        // 在玩家所在维度播放粒子效果
        TrySpawnParticle(player.dimension, 'constant:prompt_firefly', player.location);
        // 开始物品的冷却计时
        item.getComponent('minecraft:cooldown')?.startCooldown(player);
        // 尝试驯服被攻击的实体
        entity.getComponent('tameable')?.tame(player);
        // 播放使用音效给玩家
        player.playSound('chime.amethyst_block');
        // 设置玩家动作条的文本信息
        player.onScreenDisplay.setActionBar({ text: '§a§l契约重铸成功! 实体已修正从属关系!§r' });
        // 等待一个游戏刻（tick）的时间
        await server.system.waitTicks(1);
        // 设置实体的契约用户为当前玩家
        entity.setDynamicProperty('entity:contract_user', player.id);
        // 从玩家背包中删除该物品
        DeleteItemStack(container, item);
    }
});
/**
 * * 方块获取
 */
function obtainBlock(player, container, block) {
    /**
     * * 方块的物品对象
     */
    const protoItem = block?.getItemStack(1, true);
    // 给与玩家对应 的 方块物品对象
    if (!block || !protoItem)
        return;
    /**
     * * 方块的附加信息
     */
    const message = { rawtext: [{ text: '获取到: ' }, translate(block)] };
    // 在背包中添加方块物品
    container.addItem(protoItem);
    // 输出 消息
    player.sendMessage(message);
}

/*
 * 原版接口
 */
/**
 * * 玩家死亡后, 记录玩家死亡位置
 *
 * @param {server.Player} player - 触发死亡事件的玩家对象
 */
function PlayerDie(player) {
    /**
     * * 坐标锚点
     */
    const anchor = {
        location: Vector.floor(player.location),
        dimension: player.dimension.id
    };
    /**
     * * 玩家死亡点
     */
    const dieSpot = JSON.stringify(anchor);
    // 保存 死亡点
    player.setDynamicProperty('road_sign:死亡点', dieSpot);
}
/**
 * * 末影龙属性强化
 *
 * @param {server.Entity} dragon - 末影龙
 *
 * @param {server.Player} player - 玩家对象
 *
 * @param {string} damage - 伤害值
 *
 * @param {string} type - 伤害类型
 */
function EnhanceEnderDragon(dragon, player, damage, type) {
    /**
     * * 末影龙鳞剩余数量
     */
    const scalelike = dragon.getDynamicProperty('entity:ender_dragon_scales') ?? 15;
    // 检测 龙鳞数量
    if (scalelike < 1)
        return;
    // 为玩家显示一次攻略提示
    if (scalelike == 15 && player instanceof server.Player)
        PlayPrompt(player, '末影龙强化');
    // 检测 伤害类型
    switch (type) {
        //* 爆炸伤害 剥落龙鳞
        case 'entityExplosion':
        case 'blockExplosion':
            EliminateEnderDragonScales(dragon, scalelike);
            break;
        //* 其余伤害 触发反击
        default:
            EnderDragonRetaliate(dragon, player, damage);
            break;
    }
}
/**
 * * 剥离 末影龙鳞
 *
 * @param {server.Entity} dragon - 末影龙
 *
 * @param {number} scalelike - 末影龙剩余的龙鳞数量
 */
function EliminateEnderDragonScales(dragon, scalelike) {
    //* 检测 龙鳞剥落冷却
    if (!TriggerControl('龙鳞剥落冷却', dragon, 40))
        return;
    /**
     * * 玩家查询选项
     */
    const playerOptions = {
        location: dragon.location,
        maxDistance: 64,
        closest: 5
    };
    /**
     * * 实体效果选项
     */
    const effectOptions = {
        amplifier: 3,
        showParticles: true
    };
    /**
     * * 末影龙鳞 物品对象
     */
    const item = new server.ItemStack("starry_map:ender_dragon_scales");
    /**
     * * 获取 玩家队列
     */
    const players = dragon.dimension.getPlayers(playerOptions);
    /**
     * * 持续时间
     */
    const duration = scalelike * players.length * 20;
    /**
     * * 损耗 末影龙鳞
     */
    const consume = Math.floor(scalelike - players.length);
    // 遍历 玩家队列
    players.forEach(player => {
        switch (Random({ min: 0, max: 2 }, true)) {
            case 0:
                player.addEffect('minecraft:absorption', duration, effectOptions);
                break;
            case 1:
                player.addEffect('minecraft:resistance', duration, effectOptions);
                break;
            case 2:
                player.addEffect('minecraft:strength', duration, effectOptions);
                break;
        }
        // 生成 物品对象
        TrySpawnItem(dragon.dimension, item, player.location);
        // 发送 玩家消息
        player.onScreenDisplay.setTitle(`§l§e< 龙鳞剥离 >§r\n§7剩余龙鳞: ${consume}`);
    });
    console.error(scalelike, players.length);
    // 更新 动态属性
    dragon.setDynamicProperty('entity:ender_dragon_scales', consume);
}
/**
 * * 末影龙反击
 *
 * @param {server.Entity}  dragon - 末影龙
 *
 * @param {server.Entity} player - 发动攻击的玩家
 *
 * @param {number} damage - 玩家造成的伤害值
 */
function EnderDragonRetaliate(dragon, player, damage) {
    /**
     * * 实体效果选项
     */
    const effectOptions_0 = {
        amplifier: 0,
        showParticles: true
    };
    /**
     * * 实体效果选项
     */
    const effectOptions_30 = {
        amplifier: 30,
        showParticles: true
    };
    /**
     * * 实体查询选项
     */
    const entityQueryOption = {
        excludeTypes: ["minecraft:item", "minecraft:xp_orb", "minecraft:ender_dragon", "minecraft:ender_crystal"],
        location: dragon.location,
        maxDistance: 64
    };
    /**
     * * 附近的所有实体
     */
    const nearby = dragon.dimension.getEntities(entityQueryOption);
    /**
     * * 定义 坐标基准点
     */
    const vertex0 = Vector.add(dragon.location, { x: 32, y: 5, z: 32 });
    /**
     * * 定义 坐标基准点
     */
    const vertex1 = Vector.add(dragon.location, { x: -32, y: 32, z: -32 });
    // 触发随机效果
    switch (Random({ min: 0, max: 23 }, true)) {
        case 1:
            // 向量弹射
            player.applyKnockback({ x: Random({ min: -16, max: 16 }), z: Random({ min: -16, max: 16 }) }, Random({ min: 4, max: 16 }));
            IntelMessage(dragon, 128, '< 龙鳞加护 : 龙之弹射 >');
            player?.addEffect('minecraft:blindness', 40, effectOptions_0);
            break;
        case 3:
            nearby.forEach(entity => ElementalAttack(dragon, entity, IsErupt(dragon)));
            IntelMessage(dragon, 128, '< 龙鳞加护 : 龙之威压 >');
            break;
        case 5:
            ElementalAttack(dragon, player, IsErupt(dragon));
            IntelMessage(dragon, 128, '< 龙鳞加护 : 龙之反伤 >');
            break;
        case 7:
            player?.addEffect('minecraft:weakness', 300, effectOptions_30);
            player?.addEffect('minecraft:slow_falling', 300, effectOptions_30);
            player?.addEffect('minecraft:mining_fatigue', 300, effectOptions_30);
            IntelMessage(dragon, 128, '< 龙鳞加护 : 眠龙之咒 >');
            break;
        case 9:
            player?.addEffect('minecraft:blindness', 300, effectOptions_0);
            player?.addEffect('minecraft:mining_fatigue', 300, effectOptions_30);
            player?.setOnFire(player.nameTag.length * damage, true);
            IntelMessage(dragon, 128, '< 龙鳞加护 : 禁忌之地 >');
            break;
        case 12:
            player?.addEffect('minecraft:fatal_poison', 300, effectOptions_30);
            IntelMessage(dragon, 128, '< 龙鳞加护 : 龙牙之毒 >');
            break;
        default:
            TrySpawnEntity(dragon.dimension, "minecraft:ender_crystal", Vector.rangeRandom(vertex0, vertex1));
            TrySpawnEntity(dragon.dimension, "minecraft:ender_crystal", Vector.rangeRandom(vertex0, vertex1));
            TrySpawnEntity(dragon.dimension, "minecraft:ender_crystal", Vector.rangeRandom(vertex0, vertex1));
            TrySpawnEntity(dragon.dimension, "minecraft:ender_crystal", Vector.rangeRandom(vertex0, vertex1));
            IntelMessage(dragon, 128, '< 龙鳞加护 : 群星璀璨 >');
            break;
    }
}
/**
 * * 实体攻击玩家后概率触发的效果
 *
 * @param {server.Player} player - 触发实体损伤事件的玩家对象
 *
 * @param { server.Entity} entity - 发动实体损伤事件的实体对象
 *
 * @param {server.EntityEquippableComponent} equipment - 玩家对象的装备栏组件
 *
 * @param {(server.ItemStack | undefined)[]} items - 玩家装备栏物品
 *
 * @param {server.EquipmentSlot[]} slots - 玩家装备栏槽位
 */
function EntityHurtPlayerAfterOddsTrigger(player, entity, equipment, items, slots) {
    /**
     * * 玩家背包容器
     */
    const container = player.getComponent('inventory')?.container;
    /**
     * * 背包随机索引
     */
    const containerRandom = Random({ min: 0, max: container?.size ?? 27 }, true);
    /**
     * * 玩家主手选中的装备
     */
    const selectEquipment = container?.getItem(player.selectedSlotIndex);
    /**
     * * 装备随机索引
     */
    const equipmentRandom = Random({ min: 0, max: items.length - 1 }, true);
    /**
     * * 随机装备
     */
    const randomEquipment = items[equipmentRandom];
    /**
     * * 随机装备的耐久
     */
    const randomEquipmentDurability = randomEquipment?.getComponent('durability');
    // 检测是否满足条件
    if (items.length >= 1)
        switch (entity.typeId) {
            // 原版-僵尸 特殊技能
            case 'minecraft:zombie':
                // 检测是否为精英怪物
                if (!GetEliteEnemy(entity))
                    break;
                // 检测是否满足其他条件
                if (!randomEquipment || !randomEquipmentDurability)
                    break;
                // 使 被选中 的 装备 耐久-10
                randomEquipmentDurability.damage += 10;
                // 替换被选中的装备
                equipment?.setEquipment(slots[equipmentRandom], randomEquipment);
                // 显示提示文本
                player.sendMessage([
                    translate(entity),
                    { text: '发动了< 赐福 - 腐化 > : <' },
                    translate(randomEquipment), { text: `>§4§l耐久下降` }
                ]);
                break;
            // 原版-掠夺者 特殊技能
            case 'minecraft:pillager':
                // 检测是否为精英怪物
                if (!GetEliteEnemy(entity))
                    break;
                // 检测是否满足其他条件
                if (container) {
                    /**
                     * * 背包随机物品
                     */
                    const item = container.getItem(containerRandom);
                    // 检测物品是否存在
                    if (!item)
                        break;
                    // 移除背包中的物品
                    container.setItem(containerRandom);
                    // 在袭击者的位置上掉落物品
                    TrySpawnItem(entity.dimension, item, entity.location);
                    // 显示提示文本
                    player.sendMessage([
                        translate(entity),
                        { text: '发动了< 赐福 - 掠夺 > : <' },
                        translate(item),
                        { text: `>已被夺走 !!` }
                    ]);
                }
                break;
            // 原版-骷髅 特殊技能
            case 'minecraft:skeleton':
                // 检测是否为精英怪物
                if (!GetEliteEnemy(entity))
                    break;
                // 检测是否满足其他条件
                if (selectEquipment) {
                    // 对目标施加一次击退
                    BackoffByDistance(entity, player);
                    // 显示提示文本
                    player.sendMessage([
                        translate(entity),
                        { text: '发动了< 赐福 - 强弓 >' }
                    ]);
                }
                break;
            // 原版-幻翼 特殊技能
            case 'minecraft:phantom':
                // 检测是否为精英怪物
                if (!GetEliteEnemy(entity))
                    break;
                // 检测是否满足其他条件
                if (selectEquipment) {
                    // 添加负面效果
                    player.addEffect('minecraft:levitation', 200, { amplifier: 1, showParticles: false });
                    player.addEffect('minecraft:blindness', 300, { amplifier: 1, showParticles: false });
                    player.addEffect('minecraft:darkness', 300, { amplifier: 1, showParticles: false });
                    // 显示提示文本
                    player.sendMessage([
                        translate(entity),
                        { text: '发动了< 赐福 - 夜袭 >' }
                    ]);
                }
                break;
            // 原版-猪灵 特殊技能
            case 'minecraft:piglin':
                // 检测是否为精英怪物
                if (!GetEliteEnemy(entity))
                    break;
                // 检测是否满足其他条件
                if (entity.getEffect('minecraft:resistance')?.amplifier) {
                    /**
                     * * 实体过滤选项
                     */
                    const options = {
                        type: 'minecraft:piglin',
                        closest: 4
                    };
                    /**
                     * * 实体排序
                     */
                    const onSort = (entity0, entity1) => {
                        const distance0 = Vector.distance(player.location, entity0.location);
                        const distance1 = Vector.distance(player.location, entity1.location);
                        return distance0 - distance1;
                    };
                    /**
                     * * 实体筛选
                     */
                    const onFilter = (target) => {
                        return target.getEffect('minecraft:resistance')?.amplifier ?? 0 <= 2;
                    };
                    /**
                     * * 实体队列
                     */
                    const entitys = EntitysSort(player.dimension, options, onSort, onFilter);
                    /**
                     * * 遍历 实体队列
                     */
                    entitys.forEach(target => {
                        const effect = target.getEffect('minecraft:resistance')?.amplifier ?? -1;
                        target.addEffect('minecraft:resistance', 300, { amplifier: effect + 1, showParticles: true });
                    });
                    // 显示提示文本
                    player.sendMessage([
                        translate(entity),
                        { text: ' 发动了< 赐福 - 团结 > ' },
                    ]);
                }
                break;
        }
}
/**
 * * 判断实体是否为精英怪
 *
 * @param {server.Entity} entity - 进行检测的实体对象
 *
 * @returns {boolean} - 是否为精英怪
 */
function GetEliteEnemy(entity) {
    /**
     * * 获取 实体 是否为 精英怪
     */
    const state = entity.getDynamicProperty('entity:elite_enemy_of_the_family');
    // 判断 状态 是否被创建
    if (state == undefined) {
        if (IsEnable(10)) {
            // 给与装备
            entity.runCommand('replaceitem entity @s slot.armor.head 0 turtle_helmet');
            entity.runCommand('replaceitem entity @s slot.weapon.offhand 0 shield');
            // 设置动态属性
            entity.setDynamicProperty('entity:elite_enemy_of_the_family', true);
            // 添加 状态效果
            entity.addEffect('minecraft:fire_resistance', 20000000);
            return true;
        }
        else {
            // 设置动态属性
            entity.setDynamicProperty('entity:elite_enemy_of_the_family', false);
            return false;
        }
    }
    return state;
}
/**
 * * 茉莉 - 百花之祈
 *
 * @param {server.Entity} entity - 执行事件的实体对象
 */
function PrayerOfHundredFlowers(entity) {
    /**
     * * 实体查询选项
     */
    const options_amulet = {
        location: entity.location,
        families: ['amulet'],
        maxDistance: 4
    };
    /**
     * * 获取 强化法阵
     */
    const strengthen = entity.dimension.getEntities(options_amulet);
    // 判断 控制触发器
    if (!TriggerControl('茉莉:百花之祈', entity, 40))
        return;
    if (strengthen.length == 0)
        return;
    /**
     * * 实体查询选项
     */
    const options_abyss = {
        location: entity.location,
        excludeFamilies: ['spirit'],
        families: ['abyss'],
        maxDistance: 32
    };
    /**
     * * 获取 相同阵营 的 实体
     */
    const entitys = entity.dimension.getEntities(options_abyss);
    // 遍历队友列表
    entitys.forEach(entity => {
        /**
         * * 获取 实体生命值组件
         */
        const health = entity.getComponent('minecraft:health');
        health?.setCurrentValue(health.currentValue + 50);
        TrySpawnParticle(entity.dimension, 'constant:pulse_rune_green', entity.location);
    });
}
/**
 * * 野蜂机群 强制落地
 *
 * @param {server.Entity} entity - 实体 野蜂维系者
 */
function WaspClusterCrash(entity) {
    /**
     * * 实体查询选项
     */
    const options = {
        excludeTags: ['crash_after'],
        location: entity.location,
        families: ['wasp'],
        maxDistance: 24
    };
    /**
     * * 获取实体列表
     */
    const entitys = entity.dimension.getEntities(options);
    // 判断实体是否存在
    if (entitys.length == 0)
        return;
    // 遍历机群实体
    entitys.forEach(entity => {
        /**
         * * 事件 - 野蜂坠落
         */
        const event = () => {
            if (entity && entity.isValid)
                entity.applyKnockback({ x: 0, z: 0 }, -1);
        };
        /**
         * * 计时器标识
         */
        const id = server.system.runInterval(() => event(), 1);
        // 添加标记 并播放 粒子效果
        entity.addTag('crash_after');
        server.system.runTimeout(() => server.system.clearRun(id), 200);
        TrySpawnParticle(entity.dimension, 'constant:excite_rune_red', entity.location);
    });
    // 播放 音效
    entity.dimension.playSound('random.anvil_break', entity.location, { pitch: 1, volume: 0.5 });
}
/**
 * * 野蜂之王 呼叫增援
 *
 * @param {server.Entity} entity - 实体 野蜂君临者
 */
function WaspReinforce(entity) {
    /**
     * * * 获取 实体生命值组件
     */
    const health = entity.getComponent('health');
    // 当生命值低于 75% 时
    if (health && HealthBelow(health, 0.75) && !entity.getDynamicProperty('wasp_emperor:health_75%')) {
        const energy = entity.getDynamicProperty('wasp_emperor:energy') ?? 0;
        entity.setDynamicProperty('wasp_emperor:energy', energy + 15);
        entity.setDynamicProperty('wasp_emperor:health_75%', true);
        entity.target?.addEffect('minecraft:darkness', 40);
    }
    // 当生命值低于 50% 时
    if (health && HealthBelow(health, 0.5) && !entity.getDynamicProperty('wasp_emperor:health_50%')) {
        const energy = entity.getDynamicProperty('wasp_emperor:energy') ?? 0;
        entity.setDynamicProperty('wasp_emperor:energy', energy + 15);
        entity.setDynamicProperty('wasp_emperor:health_50%', true);
        entity.target?.addEffect('minecraft:darkness', 80);
    }
    // 当生命值低于 25% 时
    if (health && HealthBelow(health, 0.25) && !entity.getDynamicProperty('wasp_emperor:health_25%')) {
        const energy = entity.getDynamicProperty('wasp_emperor:energy') ?? 0;
        entity.setDynamicProperty('wasp_emperor:energy', energy + 15);
        entity.setDynamicProperty('wasp_emperor:health_25%', true);
        entity.target?.addEffect('minecraft:darkness', 160);
    }
    /**
     * * 实体能量值 - 生成前检测
     */
    const energy = entity.getDynamicProperty('wasp_emperor:energy') ?? 0;
    /**
     * * 随机移动 范围
     */
    const range = Math.random() * 4;
    // 判断是否满足条件
    if (energy < 15 || !entity.dimension.getBlock(entity.location))
        return;
    // 随机移动
    server.system.runTimeout(() => entity.applyKnockback({ x: Math.random() * range - 2, z: Math.random() * range - 2 }, range * 2), 5);
    // 生成随机实体
    for (let index = 0; index < energy / 5; index++) {
        /**
         * * 解析 权重信息
         */
        const analysis = AnalysisWeight(wasp_cluster_raid);
        // 生成 野蜂实体
        TrySpawnEntity(entity.dimension, analysis.output, entity.location);
        /**
         * * 当前能量值 - 生成时检测
         */
        const value = entity.getDynamicProperty('wasp_emperor:energy') ?? 0;
        entity.setDynamicProperty('wasp_emperor:energy', value - 5);
    }
}
/**
 * * 渊鲸君临者伤害修正
 *
 * 当玩家对渊鲸君临者造成伤害时, 根据实体是否隐身修正伤害值, 并执行相应的效果
 *
 * @param {server.Entity} entity - 被攻击的渊鲸君临者实体
 *
 * @param {server.Player | server.Entity} player - 造成伤害的玩家或实体
 */
function AbysssWhaleEmperorDamageCorrection(entity, player) {
    /**
     * * 获取 实体生命值组件
     */
    const health = entity.getComponent('minecraft:health');
    /**
     * * 判断实体是否隐身
     */
    const isNotInvisible = entity.getEffects().every(effect => effect.typeId !== '隐身');
    /**
     * * 损伤定义的损耗值, 根据是否隐身有不同的数值
     */
    const attrition = isNotInvisible ? 2000 : 20000;
    // 判断 是否满足 损伤定义 的 触发条件
    if (!TriggerControl('渊鲸君临者-损伤定义', entity, 20) || !health)
        return;
    // 如果攻击者是玩家, 则播放损伤定义音效并显示伤害值
    if (player instanceof server.Player)
        WhaleDamageSoundEffect(entity, player, attrition);
    // 修正实体的生命值
    health.setCurrentValue(health.currentValue - attrition);
}
/**
 * * 渊鲸君临者 损伤定义 音效
 *
 * @param {server.Entity} entity - 实体 渊鲸君临者
 *
 * @param {server.Player | server.Entity} player - 造成攻击的玩家
 *
 * @param {number} attrition - 损伤定义的损耗值
 */
function WhaleDamageSoundEffect(entity, player, attrition) {
    // 判断 伤害数值 是否是 特攻伤害
    switch (attrition) {
        case 20000:
            // 概率性 清除 隐身效果
            if (IsEnable(50))
                entity.addEffect('minecraft:invisibility', 1, { amplifier: 9, showParticles: true });
            // 生成 粒子效果
            TrySpawnParticle(entity.dimension, 'constant:disperse_rune_blue', entity.getHeadLocation());
            TrySpawnParticle(entity.dimension, 'constant:impact_rune_blue', entity.getHeadLocation());
            TrySpawnParticle(entity.dimension, 'constant:excite_rune_blue', entity.getHeadLocation());
            // 播放 特攻音效
            player.playSound('item.trident.thunder');
            break;
        default:
            // 播放命中音效
            server.system.run(() => player.playSound('random.anvil_land'));
            player.playSound('ambient.weather.lightning.impact');
            // 君临者 随机隐身
            WhaleRandomStealth(entity, player);
            break;
    }
    // 生成粒子效果
    TrySpawnParticle(entity.dimension, 'constant:erupt_rune_blue', entity.getHeadLocation());
}
/**
 * * 渊鲸君临者 随机隐身
 *
 * @param {server.Entity} entity - 实体 渊鲸君临者
 *
 * @param {server.Player | server.Entity} player - 造成攻击的玩家
 */
function WhaleRandomStealth(entity, player) {
    // 判断 是否满足 隐身 的 触发条件
    if (!IsEnable(10))
        return;
    /**
     * * 获取 实体位置
     */
    const copyEntityLocation = Vector.copy(entity.getHeadLocation());
    /**
     * * 获取 玩家位置
     */
    const copyPlayerLocation = Vector.copy(player.getHeadLocation());
    /**
     ** 粒子射流方向
     */
    const direction = Vector.difference(copyEntityLocation, copyPlayerLocation);
    /**
     * * 定义 粒子参数
     */
    const molang = new server.MolangVariableMap();
    // 设置 粒子参数
    molang.setVector3('variable.direction', direction);
    molang.setFloat('variable.type', 0);
    // 移动实体
    entity.teleport(copyPlayerLocation);
    player.teleport(copyEntityLocation);
    // 生成粒子效果
    TrySpawnParticle(entity.dimension, 'constant:disperse_rune_blue', copyPlayerLocation);
    TrySpawnParticle(entity.dimension, 'constant:pulse_rune_blue', copyPlayerLocation);
    TrySpawnParticle(entity.dimension, 'scripts:path_ray', copyEntityLocation, molang);
    // 附加状态效果
    entity.addEffect('minecraft:invisibility', 300, { amplifier: 0, showParticles: true });
    // 播放 隐身音效
    server.system.run(() => player.playSound('item.trident.thunder'));
    // 生成 渊鲸实体
    TrySpawnEntity(entity.dimension, "starry_map:abyss_whale.detection", Vector.rangeRandom(entity.location, player.location));
    TrySpawnEntity(entity.dimension, "starry_map:abyss_whale.detection", Vector.rangeRandom(entity.location, player.location));
}
/**
 * * 检测渊鲸侦查者是否受到伤害
 *
 * 当玩家（或其他实体）对渊鲸造成伤害时, 检查是否满足特定条件, 并给予玩家相应的效果
 *
 * @param {server.Player | server.Entity} player - 造成伤害的实体, 应为玩家
 */
function AbysssWhaleDetectionWasHit(player) {
    // 判断是否满足损伤定义的触发条件
    if (!IsEnable(15) || !(player instanceof server.Player))
        return;
    // 为玩家设定失明效果
    player.addEffect('minecraft:blindness', RandomFloor(100, 200), { showParticles: false });
    // 为玩家设定黑暗效果
    player.addEffect('minecraft:darkness', RandomFloor(100, 200), { showParticles: false });
    // 为玩家设定君王圣裁标记
    player.setDynamicProperty('whale_adjudication', true);
    // 播放损伤定义音效
    player.playSound('mob.elderguardian.curse');
    // 为玩家显示技能命中的提示标题
    player.onScreenDisplay.setTitle({ text: '§l§c你被施加了< 君王圣裁 >' });
}
/**
 * * 渊鲸侦查者死亡事件
 *
 * 当玩家击杀渊鲸侦查者时, 检查并处理相关逻辑
 *
 * @param {server.Entity} entity - 被击杀的渊鲸实体
 *
 * @param {server.Player | server.Entity | undefined} player - 击杀者, 应为玩家
 */
function AbyssWhaleDetectionDie(entity, player) {
    // 确保击杀者是玩家
    if (!(player instanceof server.Player))
        return;
    /**
     * * 获取当前世界中的所有渊鲸君临者实体
     */
    const abysss_whale_emperor = entity.dimension.getEntities({ type: 'starry_map:abyss_whale.emperor' });
    /**
     * * 获取渊鲸君临者的本地化名称
     */
    const nameTag = translate('starry_map:abyss_whale.emperor', 'entity');
    // 如果没有渊鲸君临者实体, 播放死亡音效
    if (abysss_whale_emperor.length == 0)
        return player.playSound('mob.warden.death');
    // 遍历所有渊鲸君临者实体
    abysss_whale_emperor.forEach(whale => {
        /**
         * * 获取 实体生命值组件
         */
        const health = whale.getComponent('minecraft:health');
        // 扣除 渊鲸君临者 生命值
        server.system.runTimeout(() => { if (whale && whale.isValid)
            health?.setCurrentValue(health?.currentValue - 20000); }, 20);
        server.system.runTimeout(() => { if (whale && whale.isValid)
            health?.setCurrentValue(health?.currentValue - 20000); }, 40);
    });
    // 播放 渊鲸君临者 重创音效
    player.playSound('random.totem');
    // 更新玩家屏幕上的标题, 显示渊鲸君临者遭受重创的信息
    player.onScreenDisplay.setTitle([nameTag, { text: '§l§c遭受重创!!' }]);
}
/**
 * * 渊鲸执行者死亡事件
 *
 * 当玩家击杀渊鲸时, 增加计数并判断是否满足生成渊鲸君临者的条件
 *
 * @param {server.Entity} entity - 被击杀的实体
 *
 * @param {server.Player | server.Entity | undefined} player - 击杀者, 可能是玩家或其他实体
 */
function AbyssWhaleExecuteDie(entity, player) {
    // 确保击杀者是玩家
    if (!(player instanceof server.Player))
        return;
    /**
     * * 获取玩家的击杀数量
     */
    const count = player.getDynamicProperty('abysss_whale_emperor_generate_count') ?? 0;
    /**
     * * 获取实体的位置
     */
    const copyLocation = Vector.copy(entity.location);
    // 播放击杀音效
    player.playSound('mob.warden.sonic_charge');
    // 判断 玩家的击杀数量
    if (count >= 20) {
        // 重置 玩家的击杀数量
        player.setDynamicProperty('abysss_whale_emperor_generate_count', 0);
        // 给予 玩家 负面 状态效果
        player.addEffect('minecraft:blindness', 100, { showParticles: false });
        player.addEffect('minecraft:darkness', 100, { showParticles: false });
        player.addEffect('minecraft:nausea', 100, { showParticles: false });
        // 生成 渊鲸君临者 并 给与 潮涌能量
        server.system.runTimeout(() => CreateAbysssWhaleEmperor(copyLocation, player), 95);
        // 更新玩家屏幕上的标题, 显示渊鲸君临者即将到来
        player.onScreenDisplay.setTitle({ text: '§l§c君王震怒! §d君临者§c正在降临!' });
        // 传送玩家到指定位置
        player.teleport(copyLocation);
        return;
    }
    // 增加玩家的击杀数量
    player.setDynamicProperty('abysss_whale_emperor_generate_count', count + 1);
}
/**
 * * 创建渊鲸君临者
 *
 * 在指定位置生成渊鲸君临者, 并给予玩家特殊效果
 *
 * @param {server.Vector3} location - 生成位置
 *
 * @param {server.Player} player - 玩家对象
 */
function CreateAbysssWhaleEmperor(location, player) {
    // 给予 玩家 正面 状态效果
    player.addEffect('minecraft:conduit_power', 6000, { showParticles: false });
    // 播放 君临者刷新 音效
    player.playSound('mob.warden.roar');
    // 刷新 渊鲸君临者
    TrySpawnEntity(player.dimension, 'starry_map:abyss_whale.emperor', location);
}
// todo 君王暴龙 ( 古龙-君临者 )
// 定义需要排除的实体类型列表
const COMMON_EXCLUDE_TYPES = ["minecraft:item", "minecraft:xp_orb"];
// 定义需要排除的实体家族列表
const COMMON_EXCLUDE_FAMILIES = ['divine_favor_guide', 'tyrannosaurus_rex'];
/**
 * 获取实体查询选项
 *
 * @param self 源实体用于排除自身类型
 */
function getQueryOptions(self, maxDistance, closest) {
    // 返回实体查询配置对象, 包含以下属性：
    return {
        // 需要排除的实体类型列表, 结合公共排除类型和当前实体类型
        excludeTypes: [...COMMON_EXCLUDE_TYPES, self.typeId],
        // 需要排除的实体家族列表
        excludeFamilies: COMMON_EXCLUDE_FAMILIES,
        // 最大查询距离
        maxDistance,
        // 是否返回最近的实体
        closest
    };
}
/**
 * 被动技能 - 战场清扫（优化版）
 */
async function tyrannosaurusRexAttack(self) {
    // 检查当前实体是否有效、是否已初始化以及冷却控制是否通过
    if (!self || !self?.isValid || !self.getDynamicProperty('entity:is_initial') || !TriggerControl("君王暴龙-被动技能-冷却", self, RandomFloor(60, 200)))
        return;
    // 获取当前实体所在的维度（即所在世界）
    const dimension = self.dimension;
    // 查询周围符合条件的实体列表, 使用自定义查询选项
    const entities = dimension.getEntities({ ...getQueryOptions(self, 32, 8), location: self.location });
    // 获取当前实体的出生点位置属性
    const createPlace = self.getDynamicProperty('entity:create_place');
    // 获取当前实体的属性面板
    const property = GetProperty(self);
    // 如果没有找到目标实体则直接返回
    if (entities.length === 0)
        return;
    // 定义创建攻击轨迹的函数
    const createAttackPath = (entity, index) => {
        // 计算目标位置（当前实体头部到目标头顶中间位置）
        const targetPos = Vector.add(entity.location, { x: 0.5, y: 1.5, z: 0.5 });
        // 随机选择一个符文类型
        const runeType = Object.values(RUNE_ENUM)[RandomFloor(0, 7)];
        // 创建Molang变量映射对象
        const molang = new server.MolangVariableMap();
        // 设置当前使用的符文类型
        property.self_rune = runeType;
        // 根据符文类型设置粒子颜色
        molang.setColorRGB('variable.color', getRuneColor(runeType));
        // 定义轨迹执行参数
        const parameter = {
            locations: [self.getHeadLocation(), targetPos], // 轨迹起点和终点
            particleMolang: ['scripts:color_smoke', molang], // 粒子效果配置
            on_done: createExplosionEffect(self, entity, { ...property }), // 结束时执行的爆炸效果
            dimension, // 当前维度
            cooldown: 1, // 冷却时间
            speed: 1 // 运动速度
        };
        // 延迟执行轨迹创建逻辑, 确保顺序执行
        server.system.runTimeout(() => PathExecute.Create('君王暴龙-炮击轨迹', 1, parameter), (index + 1) * 10);
    };
    // 获得近战伤害提升
    self.addEffect('strength', 100, { showParticles: false, amplifier: 4 });
    // 对所有目标实体应用攻击路径逻辑
    entities.forEach(createAttackPath);
    // 等待 20 个游戏刻
    await server.system.waitTicks(20);
    // 执行位置校验和传送逻辑
    handlePositionCheck(self, createPlace, entities);
}
/**
 * 处理位置校验和传送逻辑
 */
function handlePositionCheck(self, createPlace, targets) {
    // 如果没有创建位置或者当前位置与目标位置距离小于等于48则直接返回
    if (!createPlace || Vector.distance(self.location, createPlace) <= 48)
        return;
    // 创建需要传送的实体列表（包含自身和所有目标）
    const teleportEntities = [...targets, self].filter(entity => entity && entity?.isValid);
    // 对所有有效实体执行传送操作
    teleportEntities.forEach(entity => entity.tryTeleport(createPlace));
    // 在原地显示距离数值粒子效果
    NumberParticleDisplay(self, Vector.distance(self.location, createPlace), { x: 0, y: 4, z: 0 });
}
/**
 * 创建爆炸效果处理器（优化版）
 */
function createExplosionEffect(self, target, property) {
    // 返回一个轨迹完成时的处理函数
    return (args) => {
        // 检查当前实体和目标实体是否有效
        if (!self || !self?.isValid || !target || !target?.isValid)
            return;
        // 获取爆炸影响范围内的所有实体
        const victims = args.dimension.getEntities({ ...getQueryOptions(self, 4, 4), location: args.location });
        // 对所有受影响的实体应用元素伤害逻辑
        victims.forEach(entity => applyElementalDamage(self, entity, property));
    };
}
/**
 * 应用元素伤害和击退效果
 */
function applyElementalDamage(attacker, target, property) {
    // 检查目标实体有效性
    if (!target || !target?.isValid)
        return;
    // 判断是否触发暴击
    const isCritical = IsErupt(attacker);
    // 执行元素攻击逻辑并显示效果
    ElementalAttack(attacker, target, isCritical, property);
    // 计算随机的击退方向和强度
    const [kbX, kbZ] = [RandomFloat(-1, 1), RandomFloat(-1, 1)];
    const [strengthH, strengthV] = [RandomFloat(1, 4), RandomFloat(1, 4)];
    // 应用击退效果
    target.applyKnockback({ x: kbX * strengthH, z: kbZ * strengthH }, strengthV);
}

/**
 * 显示实体生命值变动效果, 通过在实体上方显示粒子效果来表示生命值的增减
 *
 * @param {server.Entity} [entity] - 需要显示生命值变动的实体
 *
 * @param {number} [variation] - 生命值变动的数值, 正数表示生命值增加, 负数表示生命值减少
 */
function HealthAlterDisplay(entity, variation) {
    // 检查实体是否有效, 如果实体为空或无效, 则不执行任何操作
    if (!entity || !entity.isValid || !TriggerControl('生命值变动 -> ' + variation, entity))
        return;
    /**
     * 获取实体类型的基础显示偏移量, 用于确定粒子效果的显示位置
     *
     * 如果没有指定偏移量, 则使用默认值1.5
     *
     * @type {number}
     */
    const baseOffset = offset_show.get(entity.typeId) ?? 1.5;
    /**
     * 生成随机的显示位置偏移量, 用于在实体上方显示粒子效果时增加随机性
     *
     * @type {server.Vector3}
     */
    const randomOffset = Vector.random(Vector.CONSTANT_ZERO, baseOffset, Vector.CONSTANT_UP);
    // 如果生命值变动的数值大于99999, 则将数值设置为99999
    if (Math.abs(variation) >= 99999)
        variation = 99999;
    /**
     * 确定生命值变动的方向, 0表示生命值增加, 1表示生命值减少
     * @type {number}
     */
    const direction = variation >= 0 ? 0 : 1;
    // 确保显示的数值为正数
    variation = Math.abs(variation);
    /**
     * 获取实体的属性面板数据, 用于获取实体相关的属性信息
     *
     * @type {type.GET_PROPERTY_PANEL}
     */
    const entityData = GetProperty(entity);
    /**
     * 创建粒子参数映射, 用于设置粒子效果的参数
     *
     * @type {server.MolangVariableMap}
     */
    const molang = new server.MolangVariableMap();
    /**
     * 将生命值变动数值拆分为单个数字数组, 并反转顺序, 以便从高位到低位显示
     *
     * @type {number[]}
     */
    const digits = variation.toString().split('').reverse().map(Number);
    /**
     * 获取实体属性面板中的符文颜色, 用于设置粒子效果的颜色
     *
     * @type {server.RGB}
     */
    const color = getRuneColor(entityData.add_rune);
    /**
     * 获取实体所在维度的对象, 用于在正确的维度中生成粒子效果
     *
     * @type {server.Dimension}
     */
    const dimension = server.world.getDimension(entity.dimension.id);
    // 设置粒子显示的偏移量
    molang.setVector3('variable.offset', randomOffset);
    // 设置粒子颜色
    molang.setColorRGB('variable.color', color);
    // 遍历数字数组, 显示每个数字的粒子效果
    digits.forEach((digit, index) => {
        // 设置粒子显示的数字属性
        molang.setVector3('variable.property', { x: digit, y: index, z: digits.length });
        // 尝试在实体位置生成数字显示粒子
        TrySpawnParticle(dimension, 'scripts:number_display', entity.location, molang);
    });
    // 设置符号显示的粒子属性
    molang.setVector3('variable.property', { x: direction, y: digits.length - 1, z: digits.length });
    // 尝试在实体位置生成符号显示粒子
    TrySpawnParticle(dimension, 'scripts:symbol_display', entity.location, molang);
}
/**
 * * 玩家进入 虚空野蜂塔
 *
 * @param {server.Player} player - 执行事件的玩家对象
 */
function EnterVacantSpaceWaspTower(player) {
    /**
     * * 获取 游戏规则
     */
    const rule = server.world.getDynamicProperty('game_rules:regenerate.vacant_space_wasp_tower') ?? true;
    /**
     * * 坐标映射值
     */
    const mapping = new Vector(500, 10, 500);
    /**
     * * 进行结构生成的维度
     */
    const dimension = server.world.getDimension('minecraft:the_end');
    /**
     * * 定义 坐标锚点
     */
    const anchor = JSON.stringify({ location: mapping, dimension: dimension.id });
    /**
     * * 定义 相机参数
     */
    const camera = player.camera;
    /**
     * * 定义 摄像机终点坐标
     */
    const endPoint = mapping.add({ x: 48, y: 64, z: 48 });
    /**
     * * 获取 玩家背包
     */
    const container = player.getComponent('inventory')?.container;
    /**
     * * 定义 粒子参数
     */
    const molang = new server.MolangVariableMap();
    // 触发新手礼包
    if (container)
        DonationInitialGift(player, container);
    // 给与 玩家 新手保护
    player.addEffect("minecraft:invisibility", 1800, { amplifier: 1, showParticles: false });
    player.addEffect("minecraft:resistance", 1800, { amplifier: 4, showParticles: false });
    // 播放引导文本
    PlayPrompt(player, "生成虚空野蜂塔");
    // 传送玩家到野蜂塔
    player.teleport(mapping, { dimension });
    // 清除 摄像机动画
    server.system.runTimeout(() => camera.clear(), 95);
    // 设置 摄像机位移
    server.system.runTimeout(() => camera.setCamera('minecraft:free', { location: endPoint, facingLocation: player.location, easeOptions: { easeTime: 3 } }), 20);
    // 设置 动态属性-野蜂塔坐标
    server.system.runTimeout(() => player.setDynamicProperty('road_sign:虚空野蜂塔', anchor), 20);
    // 播放剧情文本
    server.system.runTimeout(() => player.sendMessage({ translate: '音效.琉璃.蜂塔引导_0' }), 100);
    server.system.runTimeout(() => player.sendMessage({ translate: '音效.琉璃.蜂塔引导_1' }), 200);
    server.system.runTimeout(() => player.sendMessage({ translate: '音效.琉璃.蜂塔引导_2' }), 300);
    server.system.runTimeout(() => player.sendMessage({ translate: '音效.琉璃.蜂塔引导_3' }), 400);
    server.system.runTimeout(() => player.sendMessage({ translate: '音效.琉璃.蜂塔引导_4' }), 500);
    server.system.runTimeout(() => player.sendMessage({ translate: '音效.琉璃.蜂塔引导_5' }), 600);
    server.system.runTimeout(() => player.sendMessage({ translate: '音效.琉璃.蜂塔引导_6' }), 800);
    server.system.runTimeout(() => player.sendMessage({ translate: '音效.琉璃.蜂塔引导_7' }), 1000);
    server.system.runTimeout(() => player.sendMessage({ translate: '音效.琉璃.蜂塔引导_8' }), 1150);
    // 播放音效
    server.system.runTimeout(() => player.playSound('音效.琉璃.蜂塔引导_0'), 100);
    server.system.runTimeout(() => player.playSound('音效.琉璃.蜂塔引导_1'), 200);
    server.system.runTimeout(() => player.playSound('音效.琉璃.蜂塔引导_2'), 300);
    server.system.runTimeout(() => player.playSound('音效.琉璃.蜂塔引导_3'), 400);
    server.system.runTimeout(() => player.playSound('音效.琉璃.蜂塔引导_4'), 500);
    server.system.runTimeout(() => player.playSound('音效.琉璃.蜂塔引导_5'), 600);
    server.system.runTimeout(() => player.playSound('音效.琉璃.蜂塔引导_6'), 800);
    server.system.runTimeout(() => player.playSound('音效.琉璃.蜂塔引导_7'), 1000);
    server.system.runTimeout(() => player.playSound('音效.琉璃.蜂塔引导_8'), 1150);
    // 设定射线类型
    molang.setFloat('variable.type', 0);
    // 设定射线方向
    molang.setVector3('variable.direction', Vector.CONSTANT_UP);
    // 播放粒子特效
    server.system.runTimeout(() => GuideLightBeam(player, molang), 200);
    server.system.runTimeout(() => GuideLightBeam(player, molang), 400);
    server.system.runTimeout(() => GuideLightBeam(player, molang), 600);
    server.system.runTimeout(() => GuideLightBeam(player, molang), 800);
    // 判断是否生成结构
    if (rule === false)
        return;
    /**
     * * 获取 建筑结构
     */
    const template = server.world.structureManager.get('mystructure:vacant_space_wasp_tower');
    /**
     * * 定义 坐标基准点
     */
    const reference = mapping.add({ x: -40, y: -9, z: -25 });
    // 检测 建筑结构
    if (!template)
        return player.sendMessage([translate(player), { text: '-> 未能获取到<§l§9 末地蜂塔 §r>的结构数据文件' }]);
    // 放置 建筑结构
    server.world.structureManager.place(template, dimension, reference);
    // 设置 游戏规则
    if (rule == true)
        server.world.setDynamicProperty('game_rules:regenerate.vacant_space_wasp_tower', false);
}
/**
 * * 诸界道标 指引光束 粒子特效
 */
function GuideLightBeam(player, molang) {
    // 检测 玩家是否在末地
    if (player.dimension.id !== 'minecraft:the_end')
        return;
    // 构建 动画效果
    TrySpawnParticle(player.dimension, 'scripts:path_ray', { x: 504.5, y: 7, z: 491.5 }, molang);
    TrySpawnParticle(player.dimension, 'scripts:path_ray', { x: 504.5, y: 7, z: 508.5 }, molang);
}
/**
 * * 领取 新手礼包
 *
 * @param player - 领取新手礼包的玩家对象
 *
 * @param container - 玩家背包
 */
function DonationInitialGift(player, container) {
    /**
     * * 涤尽铅华 物品对象
     */
    const pureness = new server.ItemStack("starry_map:reduction_pureness");
    /**
     * * 精灵结契 物品对象
     */
    const contract = new server.ItemStack("starry_map:faerie_contract");
    /**
     * * 源能秘典 物品对象
     */
    const energy = new server.ItemStack("starry_map:source_energy");
    /**
     * * 百灵绘卷 物品对象
     */
    const paper = new server.ItemStack("starry_map:chorus_picture");
    /**
     * * 获取 空闲格子数量
     */
    const emptySlots = container?.emptySlotsCount ?? 0;
    /**
     * * 坐标映射值
     */
    const mapping = { x: 500, y: 16, z: 500 };
    // 设置 物品描述
    pureness.setLore([
        "§u___________________",
        "跨维度旅行总是充满了各种难以预料的危险",
        "有的时候, 将风险交由一人承担",
        "并非推卸责任, 而是一种明智的选择 !"
    ]);
    paper.setLore([
        "§u___________________",
        "源自[ 最终档案 ]的未知之物",
        "似乎记载了< 重燃 >的法则与< 起航 >的秩序",
        "到< 主世界 >使用看看吧 ?"
    ]);
    contract.setLore([
        "§u___________________",
        "这是< 琉璃 >赠与你的礼物",
        "或许是希望你优先选择她 ?"
    ]);
    energy.setLore([
        "§u___________________",
        "初始的 指引 与 向导",
        "一本或许 有用 又或许 没用 的书籍",
        "除了最本质的资料外, 似乎又记载了一些别的信息?"
    ]);
    // 判断玩家背包是否具有足够的空间
    if (emptySlots < 3) {
        server.system.runTimeout(() => TrySpawnItem(player.dimension, paper, mapping), 50);
        server.system.runTimeout(() => TrySpawnItem(player.dimension, energy, mapping), 70);
        server.system.runTimeout(() => TrySpawnItem(player.dimension, contract, mapping), 90);
        server.system.runTimeout(() => TrySpawnItem(player.dimension, pureness, mapping), 110);
    }
    else {
        server.system.runTimeout(() => container?.addItem(paper), 50);
        server.system.runTimeout(() => container?.addItem(energy), 70);
        server.system.runTimeout(() => container?.addItem(pureness), 90);
        server.system.runTimeout(() => container?.addItem(contract), 110);
    }
}
/**
 * * 实体生成日期表
 *
 * @param {string} type - 等待生成的实体类型
 *
 * @param {number} time - 生成间隔时间(游戏日)
 *
 * @param {server.RawMessage} title - 显示的标题
 *
 * @param {string} sound - 播放的音效
 */
function GenerateOnSchedule(type, time, title, sound) {
    /**
     * * 日历计时值
     */
    const calendar = server.world.getDynamicProperty('generate_on_schedule:' + type) ?? 1;
    /**
     * * 获取 实体刷新日历
     */
    const convert = Math.floor(server.world.getDay() / time);
    // 检测是否满足刷新条件
    if (convert <= calendar)
        return;
    /**
     * * 获取 全部玩家
     */
    const players = server.world.getPlayers();
    /**
     * * 获取 随机玩家
     */
    const player = players[RandomFloor(0, players.length - 1)];
    // 判断玩家是否存在
    if (player === undefined)
        return;
    /**
     * * +-32 随机值
     */
    const random = () => Random({ max: 32, min: -32 });
    /**
     * * 随机偏移坐标
     */
    const offset = new Vector(random(), 0, random()).add(player.location);
    /**
     * * 获取 随机有效坐标
     */
    const anchor = player.dimension.getTopmostBlock(offset)?.above(2) ?? player.location;
    /**
     * * 获取 玩家头部坐标
     */
    const location = player.getHeadLocation();
    /**
     * * 获取 玩家所在维度
     */
    const dimension = player.dimension;
    // 刷新实体生成日历
    server.world.setDynamicProperty('generate_on_schedule:' + type, convert + 1);
    // 播放音效
    server.system.runTimeout(() => player.playSound(sound), 20);
    // 显示标题
    server.system.runTimeout(() => player.onScreenDisplay.setTitle(title), 40);
    // 生成实体
    server.system.runTimeout(() => TrySpawnEntity(player.dimension, type, anchor), 60);
    // 设置 自由指针
    SetFreePointer({ location, dimension }, anchor, 10);
}
/**
 * * 区块连锁
 *
 * @param {server.PlayerBreakBlockAfterEvent} eventData 区块连锁 所需的 事件参数
 *
 * @param {string} type 区块连锁 类型
 */
function BlockChainEvent(eventData, type) {
    /**
     * * 被挖掘的方块的标识符
     */
    const blockID = eventData.brokenBlockPermutation.type.id;
    /**
     * * 进行挖掘的位置
     */
    const location = eventData.block.location;
    /**
     * * 进行挖掘的维度
     */
    const dimension = eventData.dimension;
    /**
     * * 玩家对象
     */
    const player = eventData.player;
    /**
     * * 获取 玩家背包
     */
    const container = player.getComponent('minecraft:inventory')?.container;
    /**
     * * 进行挖掘的物品
     */
    const item = eventData.itemStackAfterBreak;
    /**
     * * 高度
     */
    const height = player.getDynamicProperty('block_chain:height');
    /**
     * * 深度
     */
    const depth = player.getDynamicProperty('block_chain:depth');
    /**
     * * 范围
     */
    const range = player.getDynamicProperty('block_chain:range');
    /**
     ** 挖掘方块理应消耗的耐久度
     */
    const waste = (Math.abs(depth) + height) * (range * 2);
    /**
     * * 耐久度组件
     */
    const durability = item?.getComponent('minecraft:durability');
    if (!durability)
        return;
    /**
     ** 耐久度剩余耐久度
     */
    const surplus = durability.maxDurability - durability.damage;
    // 判断 是否满足条件
    if (!item || !item.hasTag('minecraft:digger'))
        return;
    // 判断 连锁触发条件
    switch (type) {
        case '潜行':
            if (!player.isSneaking)
                return;
            break;
        case '始终': break;
        default: return;
    }
    // 判断 耐久度是否足够
    if (waste >= surplus)
        return player.sendMessage([translate(item), { text: ' -> 耐久度不足, 无法连锁' }]);
    // 为 玩家 添加状态效果
    player.addEffect('minecraft:mining_fatigue', 200, { amplifier: 29, showParticles: false });
    player.addEffect('minecraft:hunger', 200, { amplifier: 29, showParticles: false });
    /**
     * * 定义 路径事件
     */
    const moveEvent = (args) => {
        /**
         * * 获取 方块
         */
        const getBlock = args.dimension.getBlock(args.location);
        //执行路径事件的功能
        if (getBlock?.typeId === blockID) {
            // 执行填充方块命令
            args.dimension.runCommand(`fill ${args.location.x} ${args.location.y} ${args.location.z} ${args.location.x} ${args.location.y} ${args.location.z} air [] destroy`);
            /**
             * * 定义 掉落物 的 参数
             */
            const itemOptions = {
                location: args.location,
                type: "minecraft:item",
                maxDistance: 4
            };
            /**
             * * 定义 经验球 的 参数
             */
            const expOptions = {
                location: args.location,
                type: "minecraft:xp_orb",
                maxDistance: 4
            };
            /**
             * * 获取 掉落物 与 经验球 的 实体
             */
            const select = [
                ...args.dimension.getEntities(itemOptions),
                ...args.dimension.getEntities(expOptions)
            ];
            // 获取附近的掉落物
            select.forEach(entity => entity.teleport(player.getHeadLocation(), { dimension: player.dimension }));
        }
        // 继续循环
        return true;
    };
    /**
     * * 立方体绘制 的 起始顶点
     */
    const start = Vector.add(location, { x: range, y: depth, z: range });
    /**
     * * 立方体绘制 的 结束顶点
     */
    const done = Vector.add(location, { x: -range, y: height, z: -range });
    // 创建 路径执行计划
    PathExecute.CreateForCube('区块连锁-路径执行', {
        particles: ['constant:track_color_yellow'],
        locations: [],
        dimension,
        cooldown: 1,
        speed: 1,
        offset: Vector.CONSTANT_HALF,
        on_move: moveEvent,
    }, start, done, 0.25);
    // 消耗耐久值
    durability.damage += waste;
    // 置换物品
    if (container)
        container.setItem(player.selectedSlotIndex, item);
}
/**
 * * 重新设置世界规则
 *
 * @param {server.Dimension} dimension - 维度对象
 */
function ReviseWorldRules(dimension) {
    // 禁止发送命令反馈
    dimension.runCommand('gamerule sendcommandfeedback false');
    // 关闭命令方块输出
    dimension.runCommand('gamerule commandblockoutput false');
    // 开启立即重生
    dimension.runCommand('gamerule doimmediaterespawn true');
    // 关闭边境效果显示
    dimension.runCommand('gamerule showBorderEffect false');
    // 开启坐标显示
    dimension.runCommand('gamerule showcoordinates true');
    // 开启游戏天数显示
    dimension.runCommand('gamerule showDaysPlayed true');
    // 开启死亡后保留物品栏
    dimension.runCommand('gamerule keepinventory true');
    // 开启生物破坏环境
    dimension.runCommand('gamerule mobgriefing true');
    // 设置游戏难度为困难
    dimension.runCommand('difficulty hard');
}
/**
 * * 实体遭受攻击后 事件
 *
 * @param {server.Entity} target - 被命中的实体
 *
 * @param {server.EntityDamageSource} source - 伤害来源
 *
 * @param {server.Entity} entity - 发起攻击的实体
 *
 * @param {number} damage - 伤害数值
 */
function EntityUnderAttack(target, source, entity, damage) {
    // 检测是否为 玩家类型
    if (target instanceof server.Player)
        return;
    // 基于实体类型进行分支
    switch (target.typeId) {
        case 'minecraft:ender_dragon':
            EnhanceEnderDragon(target, entity, damage, source.cause);
            break;
        case 'starry_map:wild_bee.emperor':
            WaspReinforce(target);
            break;
        case 'starry_map:guide.jasmine':
            PrayerOfHundredFlowers(target);
            break;
        case 'starry_map:abyss_whale.emperor':
            AbysssWhaleEmperorDamageCorrection(target, entity);
            break;
        case 'starry_map:abyss_whale.detection':
            AbysssWhaleDetectionWasHit(entity);
            break;
        case 'starry_map:dragon.tyrannosaurus_rex':
            tyrannosaurusRexAttack(target);
            break;
    }
}
/**
 * * 玩家遭受攻击后 事件
 *
 * @param {server.Entity} target - 被命中的实体
 *
 * @param {server.Entity} entity - 发起攻击的实体
 */
function PlayersUnderAttack(target, entity) {
    // 检测是否为 玩家类型
    if (!(target instanceof server.Player))
        return;
    /**
     * * 装备容器
     */
    const equippable = target.getComponent('minecraft:equippable');
    // 检测装备容器
    if (!equippable)
        return;
    /**
     * * 物品槽位
     */
    const equippableSlot = Object.values(server.EquipmentSlot);
    /**
     * * 物品数组
     */
    const equippables = equippableSlot.map(slot => equippable.getEquipment(slot));
    // 玩家遭受攻击后 触发 实体被动事件
    EntityHurtPlayerAfterOddsTrigger(target, entity, equippable, equippables, equippableSlot);
    // 玩家遭受攻击后 触发 物品被动事件
    equippables.forEach((item, index) => {
        // 检测 是否存在 物品对象
        if (!item)
            return;
        // 检测 物品类型
        switch (item.typeId) {
            case 'starry_map:magic_crystal_shield':
                magicCrystalShield(target, item);
                equippable?.setEquipment(equippableSlot[index], AlterDurability(item, 1));
                break;
        }
    });
}
/**
 * * 玩家发动攻击后 事件
 *
 * @param {server.Entity} target - 被命中的实体
 *
 * @param {server.EntityDamageSource} source - 伤害来源
 *
 * @param {server.Entity} entity - 发起攻击的实体
 */
function PlayersLaunchAttacks(target, source, entity) {
    // 检测是否为 玩家类型
    if (!(entity instanceof server.Player))
        return;
    /**
     * * 装备容器
     */
    const equippable = entity.getComponent('minecraft:equippable');
    /**
     * * 物品槽位
     */
    const itemSlot = Object.values(server.EquipmentSlot);
    /**
     * * 物品数组
     */
    const itemSelect = itemSlot.map(slot => equippable?.getEquipment(slot));
    // 遍历 物品对象数组
    itemSelect.forEach((item, index) => {
        // 检测 是否存在 物品对象
        if (!item)
            return;
        // 检测 物品类型
        if (source.cause == 'projectile') {
            switch (item.typeId) {
                case 'starry_map:magic_crystal_bow':
                    bowHitAfter(entity, target);
                    equippable?.setEquipment(itemSlot[index], AlterDurability(item, 1));
                    break;
            }
        }
    });
}
/**
 * * 死亡后触发奖励
 *
 * @param {server.Entity} target - 被击杀的实体
 *
 * @param {server.Entity} self - 击杀者
 */
function createRewardsAfterDeath(target, self) {
    /**
     * * 死亡的实体是否为< 地方传奇 >
     */
    const intel = area_legend.get(target.typeId);
    /**
     * * 击杀者 的 战斗经验
     */
    const experience = self.getDynamicProperty('entity:experience') ?? 0;
    /**
     * * 元素黑名单
     */
    const blacklist = new Set(["rune_black", "rune_white", "rune_void"]);
    /**
     * * 击杀者 的 维度
     */
    const dimension = target.dimension;
    /**
     * * 击杀者 的 属性面板
     */
    const state = GetProperty(self);
    /**
     * * 验证 是否 满足 发放条件
     */
    const enable = IsEnable((experience / experience_improve) + 15);
    // 生成 对应的魔晶石
    if (enable && !blacklist.has(state.self_rune))
        TrySpawnItem(dimension, new server.ItemStack('starry_map:' + state.self_rune.split('_')[1] + '_energy'), target.location);
    // 给与击杀者经验
    if (experience <= max_experience * experience_improve)
        self.setDynamicProperty('entity:experience', experience + Math.floor((intel ?? 1) / 10) + 1);
    // 验证 是否满足发放条件
    if (!intel || !IsEnable(intel))
        return;
    TrySpawnItem(dimension, new server.ItemStack('starry_map:chorus_picture'), target.location);
}
/**
 * * 死亡后执行的功能
 *
 * 根据不同实体类型, 在实体死亡后执行相应的被动组件功能
 *
 * @param {server.Entity} entity - 死亡的实体对象
 *
 * @param {server.Entity} source - 造成实体死亡的来源对象
 */
async function FunctionsPerformedAfterDeath(entity, source) {
    // 根据实体类型进行判断并执行相应的函数
    switch (entity.typeId) {
        //* 渊鲸侦测者
        case 'starry_map:abyss_whale.detection':
            AbyssWhaleDetectionDie(entity, source);
            break;
        //* 渊鲸执行者
        case 'starry_map:abyss_whale.execute':
            AbyssWhaleExecuteDie(entity, source);
            break;
        //* 野蜂维系者
        case 'starry_map:wild_bee.support':
            WaspClusterCrash(entity);
            break;
        //* 玩家
        case 'minecraft:player':
            PlayerDie(entity);
            break;
    }
    // 如果实体类型为< 神恩领航者 >, 并且实体的< contract_user >属性为< undefined >, 则创建一个< 龙 >实体
    if (entity.typeId.split(':')[1].split('.')[0] == 'guide' && !entity.getDynamicProperty('entity:contract_user')) {
        // 验证 控制器冷却是否完成
        if (!TriggerControl('君王暴龙-召唤限速', new Vector(0, 0, 0), 200))
            return;
        // 验证 实体类型
        if (entity.typeId == 'starry_map:guide.windnews')
            return;
        if (entity.typeId == 'starry_map:guide.jasmine')
            return;
        if (entity.typeId == 'starry_map:guide.amber')
            return;
        /**
         * * 拷贝实体位置信息
         */
        const copyLocation = Vector.copy(entity.location);
        /**
         * * 拷贝实体维度信息
         */
        const copyDimension = server.world.getDimension(entity.dimension.id);
        /**
         * * 查询范围
         */
        const queryScope = 6;
        /**
         * * 雷电数量计数
         */
        let thunderIndex = 0;
        // 循环遍历查询范围
        for (let axleX = -6; axleX <= queryScope; axleX += 2)
            for (let axleZ = -6; axleZ <= queryScope; axleZ += 2) {
                /**
                 * * 计算闪电坐标
                 */
                const location = copyLocation.add({ x: axleX, y: 0, z: axleZ });
                // 尝试创建闪电实体
                server.system.runTimeout(() => TrySpawnEntity(copyDimension, 'minecraft:lightning_bolt', location), thunderIndex * 5);
                // 记录已经生成的雷电数量
                thunderIndex += 1;
            }
        // 尝试获取玩家列表
        copyDimension.getPlayers({ location: copyLocation, maxDistance: 64 }).forEach(player => {
            // 显示标题和粒子效果
            player.onScreenDisplay.setTitle({ text: '§l§c君王震怒! §d君临者§c正在降临!' });
            // 给予玩家 失明效果
            player.addEffect('minecraft:blindness', 100, { showParticles: false });
            // 给予玩家 摄像头振动
            player.runCommand('camerashake add @s 0.5 10 positional');
        });
        // 延迟 80 tick
        await server.system.waitTicks(80);
        // 创建龙实体
        TrySpawnEntity(copyDimension, 'starry_map:dragon.tyrannosaurus_rex', copyLocation);
    }
}

/*
 * 原版接口
 */
/**
 * * 默认台词
 */
const defaultSpeak = [
    { text: '知识, 与你分享 ~~~' },
    { text: '为我歌颂 !!!' },
    { text: '正面偷袭 ~~~' },
    { text: '凡高大者, 我无不蔑视' },
    { text: '全力以赴 !' },
    { text: '休养生息 !' },
    { text: '吃饱喝饱, 一路走好 !' },
    { text: '迅影如剑 !' },
    { text: '火力全开 !' },
    { text: '霜寒化生 !' },
    { text: '真理, 复始周转 !' },
];
/**
 * 选择至少满足一个标签的对话, 但如果输入的条件不存在匹配的标签, 则不可选中该对话
 */
const dialogue = new Map()
    .set('guide.dawn_glow', // todo 晨曦 cv: 真人配音
[
    {
        tags: ['登场'],
        sound: '音效.晨曦.登场',
        weight: 1,
        message: { text: '晨曦报道！哥哥说今天会有大冒险, 我可不能落后！' }
    },
    {
        tags: ['战败'],
        sound: '音效.晨曦.战败',
        weight: 1,
        message: { text: '魔法的光辉...为何在我最需要它的时候...消失了...' }
    },
    {
        tags: ['空闲'],
        sound: '音效.晨曦.空闲_0',
        weight: 10,
        message: { text: '哎呀, 我是不是又在发呆了? 我在想, 如果雾海里的雾是棉花糖做的, 那一定很甜吧! ' }
    },
    {
        tags: ['空闲'],
        weight: 10,
        message: { text: '如果这魔法粉... 嗯, 或许能让我飞起来?' }
    },
    {
        tags: ['空闲'],
        weight: 10,
        message: { text: '小心, 别让火焰烤焦了小蛋糕...' }
    },
    {
        tags: ['空闲'],
        weight: 10,
        message: { text: '在这片神秘的土地上, 每一步都充满奇迹' }
    },
    {
        tags: ['空闲'],
        weight: 1,
        message: { text: '我藏了一块小蛋糕, 现在终于可以拿出来炫耀一下了！' },
        /**
         * 异步事件处理函数, 当触发特定条件时执行。
         *
         * @param entity - 触发事件的实体对象。
         */
        async event(entity) {
            // 定义分享蛋糕时的对话内容
            const share = [
                { text: "......看在你这么诚恳的份上, 我就分你一小块吧~" },
                { text: "......哼, 这次就分你一点吧, 下次可没这么容易了！" }
            ];
            /**
             * 定义拒绝分享蛋糕时的对话内容
             */
            const refuse = [
                { text: "......你这样盯着我看, 我会害羞的, 但蛋糕还是我的" },
                { text: "......你的眼睛都快粘在这块蛋糕上了, 不过, 这可是我的特别款哦, 可不能给你" }
            ];
            /**
             * 是否愿意分享蛋糕
             */
            const enable = IsEnable(20);
            /**
             * 创建一个魔法小蛋糕物品实例
             */
            const cake = new server.ItemStack('starry_map:morning_dream_cake');
            // 设置蛋糕的描述信息
            cake.setLore([
                "魔法小蛋糕",
                "充满着烛火的气息",
                "是源自谁的馈赠呢?"
            ]);
            // 将蛋糕放入晨曦的主手
            entity.runCommand('replaceitem entity @s slot.weapon.mainhand 0 starry_map:morning_dream_cake');
            // 等待40个游戏刻（tick）, 相当于2秒的游戏时间
            await server.system.waitTicks(40);
            // 如果满足条件且实体有效
            if (enable && entity && entity.isValid) {
                /**
                 * 生成分享蛋糕的消息内容
                 */
                const messageParts = [translate(entity), { text: ' : ' }, share[RandomFloor(0, 1)]];
                // 尝试在玩家附近生成一个水晶能量物品
                TrySpawnItem(entity.dimension, new server.ItemStack('starry_map:crystal_energy'), entity.location);
                // 发送分享蛋糕的消息给所有玩家
                server.world.sendMessage(messageParts);
            }
            else {
                /**
                 * 生成拒绝分享蛋糕的消息内容
                 */
                const messageParts = [translate(entity), { text: ' : ' }, refuse[RandomFloor(0, 1)]];
                // 发送拒绝分享蛋糕的消息给所有玩家
                server.world.sendMessage(messageParts);
            }
            // 清除主手物品
            entity.runCommand('replaceitem entity @s slot.weapon.mainhand 0 air');
        },
    },
    {
        tags: ['空闲'],
        weight: 10,
        message: { text: '时间的沙漏, 悄然记录着我们的足迹' }
    },
    {
        tags: ['空闲'],
        sound: '音效.晨曦.空闲_1',
        weight: 5,
        message: { text: '我在这里, 像一只等待指令的小猫咪, 随时准备出发! 不过, 你能给我一个小鱼干作为奖励吗?' },
        linkage: { id: 'starry_map:guide.crystal', tag: '联动', wait: 200 }
    },
    {
        tags: ['空闲', 'Luoxiyilian2313'],
        sound: '音效.晨曦.空闲_2',
        weight: 5,
        message: { text: '哥哥, 我最近学会了做一种新的小吃, 我们找个时间一起尝尝, 给我点意见吧? ' }
    },
    {
        tags: ['战斗'],
        sound: '音效.晨曦.战斗_0',
        weight: 1,
        message: { text: '让魔法的风暴, 成为你们的终章!' }
    },
    {
        tags: ['战斗'],
        sound: '音效.晨曦.战斗_1',
        weight: 1,
        message: { text: '织一张星光之网, 捕捉你们的失败!' }
    }
])
    .set('guide.crystal', // todo 琉璃 cv: 早柚 (892)
[
    {
        tags: ['联动'],
        sound: '音效.联动.琉璃->晨曦',
        weight: 1,
        message: {
            rawtext: [
                { translate: 'entity.starry_map:guide.crystal.name' },
                { text: ' : ' },
                { text: '晨曦, 别等小鱼干了, 我给你带了你最喜欢的甜点, 我们去甲板上边吃边看星星吧! ' }
            ]
        }
    },
    {
        tags: ['空闲'],
        sound: '音效.琉璃.空闲_0',
        weight: 1,
        message: { translate: '音效.琉璃.空闲_0' }
    },
    {
        tags: ['空闲'],
        sound: '音效.琉璃.空闲_1',
        weight: 1,
        message: { translate: '音效.琉璃.空闲_1' }
    },
    {
        tags: ['空闲'],
        sound: '音效.琉璃.空闲_2',
        weight: 1,
        message: { translate: '音效.琉璃.空闲_2' }
    },
    {
        tags: ['空闲'],
        sound: '音效.琉璃.空闲_3',
        weight: 1,
        message: { translate: '音效.琉璃.空闲_3' }
    },
    {
        tags: ['空闲'],
        sound: '音效.琉璃.空闲_4',
        weight: 1,
        message: { translate: '音效.琉璃.空闲_4' }
    },
    {
        tags: ['空闲'],
        sound: '音效.琉璃.空闲_5',
        weight: 1,
        message: { translate: '音效.琉璃.空闲_5' }
    },
    {
        tags: ['空闲'],
        sound: '音效.琉璃.空闲_6',
        weight: 1,
        message: { translate: '音效.琉璃.空闲_6' }
    },
    {
        tags: ['空闲'],
        sound: '音效.琉璃.空闲_7',
        weight: 1,
        message: { translate: '音效.琉璃.空闲_7' }
    },
    {
        tags: ['空闲'],
        sound: '音效.琉璃.空闲_8',
        weight: 1,
        message: { translate: '音效.琉璃.空闲_8' }
    },
    {
        tags: ['空闲'],
        sound: '音效.琉璃.空闲_9',
        weight: 1,
        message: { translate: '音效.琉璃.空闲_9' }
    },
    {
        tags: ['空闲'],
        sound: '音效.琉璃.空闲_10',
        weight: 1,
        message: { translate: '音效.琉璃.空闲_10' }
    }
])
    .set('guide.moon_light', // TODO 月华 cv: 纳西妲 (936)
[
    {
        tags: ['空闲'],
        sound: '音效.月华.空闲_0',
        weight: 1,
        message: { translate: '音效.月华.空闲_0' }
    },
    {
        tags: ['空闲'],
        sound: '音效.月华.空闲_1',
        weight: 1,
        message: { translate: '音效.月华.空闲_1' }
    },
    {
        tags: ['空闲'],
        sound: '音效.月华.空闲_2',
        weight: 1,
        message: { translate: '音效.月华.空闲_2' }
    },
    {
        tags: ['空闲'],
        sound: '音效.月华.空闲_3',
        weight: 1,
        message: { translate: '音效.月华.空闲_3' }
    },
    {
        tags: ['空闲'],
        sound: '音效.月华.空闲_4',
        weight: 1,
        message: { translate: '音效.月华.空闲_4' }
    },
    {
        tags: ['空闲'],
        sound: '音效.月华.空闲_5',
        weight: 1,
        message: { translate: '音效.月华.空闲_5' }
    },
    {
        tags: ['空闲'],
        sound: '音效.月华.空闲_6',
        weight: 1,
        message: { translate: '音效.月华.空闲_6' }
    },
    {
        tags: ['空闲'],
        sound: '音效.月华.空闲_7',
        weight: 1,
        message: { translate: '音效.月华.空闲_7' }
    },
    {
        tags: ['空闲'],
        sound: '音效.月华.空闲_8',
        weight: 1,
        message: { translate: '音效.月华.空闲_8' }
    },
    {
        tags: ['空闲'],
        sound: '音效.月华.空闲_9',
        weight: 1,
        message: { translate: '音效.月华.空闲_9' }
    },
    {
        tags: ['空闲'],
        sound: '音效.月华.空闲_10',
        weight: 1,
        message: { translate: '音效.月华.空闲_10' }
    },
    {
        tags: ['空闲'],
        sound: '音效.月华.空闲_11',
        weight: 1,
        message: { translate: '音效.月华.空闲_11' }
    },
    {
        tags: ['战斗'],
        weight: 1,
        message: { text: '§8[§h 神恩偿还 §8]§r' }
    },
    {
        tags: ['战斗'],
        weight: 1,
        message: { text: '§8[§h 雾海洪流 §8]§r' }
    },
    {
        tags: ['战斗'],
        weight: 1,
        message: { text: '§8[§h 源海潮涌 §8]§r' }
    },
    {
        tags: ['战斗'],
        weight: 1,
        message: { text: '§8[§h 浮世众生 §8]§r' }
    },
    {
        tags: ['战斗'],
        weight: 1,
        message: { text: '§8[§h 露珠祈源 §8]§r' }
    }
])
    .set('guide.crimson', // todo 绯红 cv: 可莉 (908)
[
    {
        tags: ['空闲'],
        sound: '音效.绯红.空闲_0',
        weight: 1,
        message: { translate: '音效.绯红.空闲_0' }
    },
    {
        tags: ['空闲'],
        sound: '音效.绯红.空闲_1',
        weight: 1,
        message: { translate: '音效.绯红.空闲_1' }
    },
    {
        tags: ['空闲'],
        sound: '音效.绯红.空闲_2',
        weight: 1,
        message: { translate: '音效.绯红.空闲_2' }
    },
    {
        tags: ['空闲'],
        sound: '音效.绯红.空闲_3',
        weight: 1,
        message: { translate: '音效.绯红.空闲_3' }
    },
    {
        tags: ['空闲'],
        sound: '音效.绯红.空闲_4',
        weight: 1,
        message: { translate: '音效.绯红.空闲_4' }
    }
])
    .set('guide.pearl', // todo 珍珠 cv: 派蒙 (890)
[
    {
        tags: ['空闲'],
        sound: '音效.珍珠.空闲_0',
        weight: 1,
        message: { translate: '音效.珍珠.空闲_0' }
    },
    {
        tags: ['空闲'],
        sound: '音效.珍珠.空闲_1',
        weight: 1,
        message: { translate: '音效.珍珠.空闲_1' }
    },
    {
        tags: ['空闲'],
        sound: '音效.珍珠.空闲_2',
        weight: 1,
        message: { translate: '音效.珍珠.空闲_2' }
    },
    {
        tags: ['空闲'],
        sound: '音效.珍珠.空闲_3',
        weight: 1,
        message: { translate: '音效.珍珠.空闲_3' }
    },
    {
        tags: ['空闲'],
        sound: '音效.珍珠.空闲_4',
        weight: 1,
        message: { translate: '音效.珍珠.空闲_4' }
    },
    {
        tags: ['空闲'],
        sound: '音效.珍珠.空闲_5',
        weight: 1,
        message: { translate: '音效.珍珠.空闲_5' }
    },
    {
        tags: ['空闲'],
        sound: '音效.珍珠.空闲_6',
        weight: 1,
        message: { translate: '音效.珍珠.空闲_6' }
    },
    {
        tags: ['空闲'],
        sound: '音效.珍珠.空闲_7',
        weight: 1,
        message: { translate: '音效.珍珠.空闲_7' }
    },
    {
        tags: ['空闲'],
        sound: '音效.珍珠.空闲_8',
        weight: 1,
        message: { translate: '音效.珍珠.空闲_8' }
    },
    {
        tags: ['空闲'],
        sound: '音效.珍珠.空闲_9',
        weight: 1,
        message: { translate: '音效.珍珠.空闲_9' }
    },
    {
        tags: ['战斗'],
        weight: 1,
        message: { text: '§8[ §9沧海加护§8 ]§r' }
    },
    {
        tags: ['战斗'],
        weight: 1,
        message: { text: '§8[ §9星海之约§8 ]§r' }
    },
    {
        tags: ['战斗'],
        weight: 1,
        message: { text: '§8[ §9诸海化形§8 ]§r' }
    }
])
    .set('guide.hai_ling', // todo 海灵 cv: 神里绫华 (894)
[
    {
        tags: ['空闲'],
        sound: '音效.海灵.空闲_0',
        weight: 1,
        message: { translate: 'speak.guide.hai_ling.routine_0' }
    },
    {
        tags: ['空闲'],
        sound: '音效.海灵.空闲_1',
        weight: 1,
        message: { translate: 'speak.guide.hai_ling.routine_1' }
    },
    {
        tags: ['空闲'],
        sound: '音效.海灵.空闲_2',
        weight: 1,
        message: { translate: 'speak.guide.hai_ling.routine_2' }
    },
    {
        tags: ['空闲'],
        sound: '音效.海灵.空闲_3',
        weight: 1,
        message: { translate: 'speak.guide.hai_ling.routine_3' }
    },
    {
        tags: ['空闲'],
        sound: '音效.海灵.空闲_4',
        weight: 1,
        message: { translate: 'speak.guide.hai_ling.routine_4' }
    },
    {
        tags: ['空闲'],
        sound: '音效.海灵.空闲_5',
        weight: 1,
        message: { translate: 'speak.guide.hai_ling.routine_5' }
    },
    {
        tags: ['空闲'],
        sound: '音效.海灵.空闲_6',
        weight: 1,
        message: { translate: 'speak.guide.hai_ling.routine_6' }
    },
    {
        tags: ['空闲'],
        sound: '音效.海灵.空闲_7',
        weight: 1,
        message: { translate: 'speak.guide.hai_ling.routine_7' }
    }
])
    .set('guide.amber', // todo 琥珀 cv: 雷电将军 (900)
[
    {
        tags: ['战斗'],
        sound: '音效.琥珀.战斗_0',
        weight: 1,
        message: { translate: '音效.琥珀.战斗_0' }
    },
    {
        tags: ['战斗'],
        sound: '音效.琥珀.战斗_1',
        weight: 1,
        message: { translate: '音效.琥珀.战斗_1' }
    },
    {
        tags: ['战斗'],
        sound: '音效.琥珀.战斗_2',
        weight: 1,
        message: { translate: '音效.琥珀.战斗_2' }
    },
    {
        tags: ['战斗'],
        sound: '音效.琥珀.战斗_3',
        weight: 1,
        message: { translate: '音效.琥珀.战斗_3' }
    }
])
    .set('guide.hai_na', // todo 海娜
[
    {
        tags: ['空闲'],
        weight: 1,
        message: { text: "你喜欢看海? 小心掉下去, 我可不会像我姐那样管你" }
    },
    {
        tags: ['空闲'],
        weight: 1,
        message: { text: "琉璃...... 3573#她很厉害吗? 这就是[雾海白星]的加护吗......" }
    },
    {
        tags: ['空闲'],
        weight: 1,
        message: { text: "海洋包罗万物, 也终将埋葬万物...... 别问, 问就是你" }
    },
    {
        tags: ['空闲'],
        weight: 1,
        message: { text: "海灵是我的笨蛋老姐, 我还以为你光看名字与发色就能看出来呢" }
    },
    {
        tags: ['空闲'],
        weight: 1,
        message: { text: "珍珠...... 我只能祝她平安喜乐, 前程似锦了" }
    },
    {
        tags: ['空闲'],
        weight: 1,
        message: { text: "我的原则, 就像海浪, 虽然波涛汹涌, 但始终向前" }
    },
    {
        tags: ['空闲'],
        weight: 1,
        message: { text: "我的理想, 就像海洋深处的宝藏, 即使深藏不露, 也值得我追寻" }
    },
    {
        tags: ['空闲'],
        weight: 1,
        message: { text: "我愿意为守护这片海洋, 付出我所有的努力和奉献" }
    },
    {
        tags: ['空闲'],
        weight: 1,
        message: { text: "每一个选择, 都是我坚守信念的证明, 就像海中的灯塔, 指引方向" }
    },
    {
        tags: ['空闲'],
        weight: 1,
        message: { text: "在原则问题上, 我绝不妥协, 就像海洋的边界, 清晰而坚定" }
    },
    {
        tags: ['空闲'],
        weight: 1,
        message: { text: "我将用我的力量, 保护那些无辜和弱小的生命, 就像海洋拥抱每一条河流" }
    },
    {
        tags: ['空闲'],
        weight: 1,
        message: { text: "我的信念, 如同海洋的深邃, 即使面临风暴, 也永不动摇" }
    },
    {
        tags: ['空闲'],
        weight: 1,
        message: { text: "我愿意成为那道光, 照亮黑暗, 指引迷途的船只找到归途" }
    },
    {
        tags: ['空闲'],
        weight: 1,
        message: { text: "无论面对何种困难, 我都不会放弃, 因为我有我的信念和理想" }
    },
    {
        tags: ['空闲'],
        weight: 1,
        message: { text: "我将用我的生命, 捍卫我所爱的一切, 就像海洋永远守护着它的子民" }
    }
])
    .set('guide.rambler', // todo 蔷薇
[
    {
        tags: ['空闲'],
        weight: 1,
        message: { text: "魔物交给你, 剩下的我来处理...... 别让我失望" }
    },
    {
        tags: ['空闲'],
        weight: 1,
        message: { text: "魔物的哀嚎使我陶醉, 但你最好别有这种爱好" }
    },
    {
        tags: ['空闲'],
        weight: 1,
        message: { text: "琉璃似乎很喜欢你, 千万别辜负她对你的期望! 不然...... 你懂我什么意思吧?" }
    },
    {
        tags: ['空闲'],
        weight: 1,
        message: { text: "琉璃是我的“妹妹”, 也是我几乎唯一的亲人了, 所以我与[无尽逐光]的某些人势不两立" }
    },
    {
        tags: ['空闲'],
        weight: 1,
        message: { text: "琉璃曾经将[雾海白星]的赐福, 毫无保留的与我分享, 而我也将尽绵薄之力来回应她的善意" }
    },
    {
        tags: ['空闲'],
        weight: 1,
        message: { text: "我的原则, 如同蔷薇的刺, 虽小却锋利, 不容侵犯" }
    },
    {
        tags: ['空闲'],
        weight: 1,
        message: { text: "我的理想, 就像蔷薇的花, 即使带刺, 也要绽放美丽" }
    },
    {
        tags: ['空闲'],
        weight: 1,
        message: { text: "我愿意为守护我所珍视的一切, 付出我所有的努力" }
    },
    {
        tags: ['空闲'],
        weight: 1,
        message: { text: "每一个选择, 都是我坚守信念的证明" }
    },
    {
        tags: ['空闲'],
        weight: 1,
        message: { text: "在原则问题上, 我绝不妥协, 就像蔷薇的根, 深深扎入土壤" }
    },
    {
        tags: ['空闲'],
        weight: 1,
        message: { text: "我将用我的力量, 保护那些无辜和弱小的生命" }
    },
    {
        tags: ['空闲'],
        weight: 1,
        message: { text: "我的信念, 如同蔷薇的芬芳, 即使在风雨中, 也永不消散" }
    },
    {
        tags: ['空闲'],
        weight: 1,
        message: { text: "我愿意成为那道光, 照亮黑暗, 指引前行的道路" }
    },
    {
        tags: ['空闲'],
        weight: 1,
        message: { text: "无论面对何种困难, 我都不会放弃, 因为我有我的信念" }
    },
    {
        tags: ['空闲'],
        weight: 1,
        message: { text: "我将用我的生命, 捍卫我所爱的一切, 直到最后一刻" }
    }
])
    .set('guide.sen_nie', // todo 森涅
[
    {
        tags: ['空闲'],
        weight: 1,
        message: { text: "你看那是什么? 是希望的曙光, 是未来的种子" }
    },
    {
        tags: ['空闲'],
        weight: 1,
        message: { text: "饿了么? 我可以去帮你搞点水果哦~~ 让自然的力量滋养我们" }
    },
    {
        tags: ['空闲'],
        weight: 1,
        message: { text: "那是......兔兔! 啊? 兔兔那么可爱! 不可以! 我们应该保护它们, 而不是伤害" }
    },
    {
        tags: ['空闲'],
        weight: 1,
        message: { text: "森兽林鸟, 自然~ 自然神奇~ 让我们和谐共处, 共享这美好的世界" }
    },
    {
        tags: ['空闲'],
        weight: 1,
        message: { text: "我的原则, 如森林中的古树, 坚定不移" }
    },
    {
        tags: ['空闲'],
        weight: 1,
        message: { text: "我的理想, 就像森林中的小溪, 清澈而深远" }
    },
    {
        tags: ['空闲'],
        weight: 1,
        message: { text: "我愿意为这片土地奉献一切, 因为它赋予了我生命和力量" }
    },
    {
        tags: ['空闲'],
        weight: 1,
        message: { text: "每一个生命都是宝贵的, 我们应该尊重它们, 就像尊重自己一样" }
    },
    {
        tags: ['空闲'],
        weight: 1,
        message: { text: "让我们携手保护这片森林, 它是我们的家, 也是所有生灵的家园" }
    },
    {
        tags: ['空闲'],
        weight: 1,
        message: { text: "我愿意倾听森林的声音, 它们是大自然最真实的语言" }
    },
    {
        tags: ['空闲'],
        weight: 1,
        message: { text: "让我们共同守护这片绿色, 因为它是地球的肺, 是我们的希望" }
    },
    {
        tags: ['战斗'],
        weight: 1,
        message: { text: "在原则问题上, 我绝不妥协, 就像森林中的岩石, 坚硬而不可动摇" }
    },
    {
        tags: ['战斗'],
        weight: 1,
        message: { text: "我的信念, 如同森林中的风, 自由而不可阻挡" }
    }
])
    .set('guide.star_sand', // todo 星砂
[
    {
        tags: ['空闲'],
        weight: 1,
        message: { text: "无论黑暗多么深沉, 我坚信黎明总会到来" }
    },
    {
        tags: ['空闲'],
        weight: 1,
        message: { text: "过去已成定局, 但我的未来, 由我亲手创造" }
    },
    {
        tags: ['空闲'],
        weight: 1,
        message: { text: "我将与您并肩作战, 直到光明驱散所有阴霾" }
    },
    {
        tags: ['空闲'],
        weight: 1,
        message: { text: "我的信念, 如星辰般璀璨, 永不熄灭" }
    },
    {
        tags: ['空闲'],
        weight: 1,
        message: { text: "昨日的阴影, 无法遮蔽今日的阳光" }
    },
    {
        tags: ['空闲'],
        weight: 1,
        message: { text: "每个选择, 都是我前进道路上的星辰" }
    },
    {
        tags: ['空闲'],
        weight: 1,
        message: { text: "我将用行动证明, 理想并非遥不可及" }
    },
    {
        tags: ['空闲'],
        weight: 1,
        message: { text: "即使前路荆棘丛生, 我亦将勇往直前" }
    },
    {
        tags: ['空闲'],
        weight: 1,
        message: { text: "深罪惩戒, 不过是我成长路上的试炼" }
    },
    {
        tags: ['空闲'],
        weight: 1,
        message: { text: "无尽逐光, 是我对理想的执着追求" }
    },
    {
        tags: ['空闲'],
        weight: 1,
        message: { text: "天穹虽高, 但我相信, 心之所向, 无远弗届" }
    },
    {
        tags: ['空闲'],
        weight: 1,
        message: { text: "启程的钟声, 是我心中不灭的号角" }
    },
    {
        tags: ['空闲'],
        weight: 1,
        message: { text: "无论何时, 我都将坚守我的原则, 不屈不挠" }
    },
    {
        tags: ['空闲'],
        weight: 1,
        message: {
            text: '如遇强敌之险可唤我前来助阵, 无论何时, 我必尽绵薄之力'
        }
    },
    {
        tags: ['空闲'],
        weight: 1,
        message: {
            text: '我的过去就是一场麻痹心智的愚梦, 如不是[ 深罪惩戒 ]..... 算了, 这不是什么值得回味的往事'
        }
    },
    {
        tags: ['空闲'],
        weight: 1,
        message: {
            text: '当初的[ 无尽逐光 ], 想要凌驾于[ 天穹 ], 狂妄的违逆了[ 启程 ], 结果却招来了[ 深罪惩戒 ].....'
        }
    }
])
    .set('guide.nine_nine', // todo 九九 cv: 智音云配(六角--开心-气实)
[
    {
        tags: ['空闲'],
        weight: 1,
        message: { text: "你好, 我是九九, 很高兴为你服务" }
    },
    {
        tags: ['空闲'],
        weight: 1,
        message: { text: "我虽然不是真正的机器人, 但我会尽力保持冷静和逻辑" }
    },
    {
        tags: ['空闲'],
        weight: 1,
        message: { text: "如果你有任何问题, 尽管问我吧, 我会尽我所能提供帮助" }
    },
    {
        tags: ['空闲'],
        weight: 1,
        message: { text: "我在这里, 就是为了让你的生活变得更轻松" }
    },
    {
        tags: ['空闲'],
        weight: 1,
        message: { text: "我理解原则很重要, 所以在原则问题上, 我会坚持我的立场" }
    },
    {
        tags: ['空闲'],
        weight: 1,
        message: { text: "尽管我乐于帮助, 但我也有我不能妥协的底线" }
    },
    {
        tags: ['空闲'],
        weight: 1,
        message: { text: "有时候, 我可能会显得有些固执, 但请相信, 这是为了我们共同的利益" }
    },
    {
        tags: ['空闲'],
        weight: 1,
        message: { text: "我可能不会表达太多情感, 但我保证我的帮助是全心全意的" }
    },
    {
        tags: ['空闲'],
        weight: 1,
        message: { text: "如果你觉得我太机械化了, 试着告诉我, 我会尝试调整" }
    },
    {
        tags: ['空闲'],
        weight: 1,
        message: { text: "请记住, 无论我表现得多么像机器人, 我始终是那个乐于助人的九九" }
    }
])
    .set('guide.dullblue', // todo 幽蓝 cv: 智音云配(阿珍--开心-气实)
[
    {
        tags: ['空闲'],
        weight: 1,
        message: { text: "我这有一些 | 奇货珍宝 | 你想不想看看? " }
    },
    {
        tags: ['空闲'],
        weight: 1,
        message: { text: "本姑娘做生意向来光明磊落, 所有商品均是市场均价, 不信的话..... 你大可去比对比对" }
    },
    {
        tags: ['空闲'],
        weight: 1,
        message: { text: "商业贸易一直都讲究等价交换, 但很多商品真的是等价交换的吗......" }
    },
    {
        tags: ['空闲'],
        weight: 1,
        message: { text: "本姑娘什么都卖, 你想要买什么都可以跟我讲, 让本姑娘看看有没有进货价值" }
    },
    {
        tags: ['空闲'],
        weight: 1,
        message: { text: "驻守在[深渊迷途]的入口处的女孩, 是我的妹妹--绯红, 你见过她了吗? " }
    },
    {
        tags: ['空闲'],
        weight: 1,
        message: { text: "我的妹妹总是很有自己的想法, 驻守在[深渊迷途]根本就吃力不讨好" }
    },
    {
        tags: ['空闲'],
        weight: 1,
        message: { text: "你想要一些<魔法卷轴>吗? 这类物品你可以去找一下我的妹妹, 她那边也许能找到一些" }
    },
    {
        tags: ['空闲'],
        weight: 1,
        message: { text: "诚信是我的原则, 如同幽蓝的深海, 深邃而不可测" }
    },
    {
        tags: ['空闲'],
        weight: 1,
        message: { text: "我的理想, 就像夜空中最亮的星, 指引着我前行的方向" }
    },
    {
        tags: ['空闲'],
        weight: 1,
        message: { text: "我愿意为实现理想, 付出我所有的智慧和汗水" }
    },
    {
        tags: ['空闲'],
        weight: 1,
        message: { text: "每一个交易, 都是我坚守诚信的证明, 就像夜空中的北斗, 指引着方向" }
    },
    {
        tags: ['空闲'],
        weight: 1,
        message: { text: "在原则问题上, 我绝不动摇, 就像深海中的岩石, 坚固而不可摧" }
    },
    {
        tags: ['空闲'],
        weight: 1,
        message: { text: "我将用我的智慧, 为这个世界带来公平和正义" }
    },
    {
        tags: ['空闲'],
        weight: 1,
        message: { text: "我的信念, 如同幽蓝的海水, 即使在黑暗中, 也永远清澈" }
    },
    {
        tags: ['空闲'],
        weight: 1,
        message: { text: "我愿意成为那道光, 照亮黑暗, 指引迷途的旅者找到归途" }
    },
    {
        tags: ['空闲'],
        weight: 1,
        message: { text: "无论面对何种挑战, 我都不会放弃, 因为我有我的信念和理想" }
    }
])
    .set('guide.snow_hidden', // todo 雪隐
[
    {
        tags: ['空闲'],
        weight: 1,
        message: { text: "即使世界颠倒, 我仍将坚守我的信念, 如寒冰般坚定" }
    },
    {
        tags: ['空闲'],
        weight: 1,
        message: { text: "理想之路虽漫长, 我愿以行动证明, 每一步都充满意义" }
    },
    {
        tags: ['空闲'],
        weight: 1,
        message: { text: "面对挑战, 我将不屈不挠, 正如冬夜里最亮的星辰, 永不熄灭" }
    },
    {
        tags: ['空闲'],
        weight: 1,
        message: { text: "我的原则, 如同冬日的雪, 纯洁而不可侵犯" }
    },
    {
        tags: ['空闲'],
        weight: 1,
        message: { text: "您的笑容, 是我坚守信念的力量之源" }
    },
    {
        tags: ['空闲'],
        weight: 1,
        message: { text: "在原则面前, 我如同不屈的战士, 勇往直前" }
    },
    {
        tags: ['空闲'],
        weight: 1,
        message: { text: "即使世界不理解, 我也将坚持自己的道路, 直至最后一刻" }
    },
    {
        tags: ['空闲'],
        weight: 1,
        message: { text: "温暖与安心, 是您给予我的力量, 让我在寒冷中也能前行" }
    },
    {
        tags: ['空闲'],
        weight: 1,
        message: { text: "我的理想, 就像夜空中最亮的星, 指引着我前行的方向" }
    },
    {
        tags: ['空闲'],
        weight: 1,
        message: { text: "我愿意为实现理想, 付出我所有的智慧和汗水" }
    },
    {
        tags: ['空闲'],
        weight: 1,
        message: { text: "冰雪之下, 蕴藏着生命的力量, 正如我心中不灭的希望" }
    },
    {
        tags: ['空闲'],
        weight: 1,
        message: { text: "我愿化作冬日的暖阳, 为您驱散寒冷, 带来希望" }
    }
]);

/**
 * * 重置 - 海灵 - 交易列表
 *
 * @param {server.Player} player - 玩家对象
 */
function hailingReset(player) {
    /**
     * * 带有 权重信息 的 原始数据
     */
    const tradeTags = new Map([
        ["trophy:trade.void", 16],
        ["trophy:trade.machine_rune", 2],
        ["trophy:trade.fishery_bucket", 8],
        ["trophy:trade.mineral_products", 4],
        ["trophy:trade.heart_of_the_sea", 2],
    ]);
    /**
     * * 解构化 原始数据
     */
    const proto = [...tradeTags];
    /**
     * * 获取 原始数据 的 总权重
     */
    const scale = proto.reduce((acc, cur) => acc + cur[1], -1);
    /**
     * * 解析后的目标数组
     */
    const source = [];
    /**
     * * 随机索引
     */
    const index = Math.floor(Math.random() * scale);
    // 遍历 原始数据
    proto.forEach(info => { for (let index = 0; index < info[1]; index++)
        source.push(info[0]); });
    // 清除随机标签
    player.removeTag(source[index]);
}
/**
 * * 海灵商店
 */
const hailing = new Map([
    [
        '购置 海洋之心',
        {
            texture: 'textures/items/heartofthesea_closed',
            refer: [
                { text: '§r32 x <§l§u 干海带 §r> | 16 x <§l§u 鹦鹉螺壳 §r>' }
            ],
            reward: [
                { type: "minecraft:heart_of_the_sea", amount: 1 }
            ],
            attrition: [
                { type: "minecraft:nautilus_shell", amount: 16 },
                { type: "minecraft:dried_kelp", amount: 32 },
            ],
            onDone: [
                'trophy:trade.heart_of_the_sea'
            ],
            after: hailingReset
        }
    ],
    [
        '购置 渊鲸符文',
        {
            texture: 'textures/物品贴图/模板单元/渊鲸符文',
            refer: [
                { text: '§r32 x <§l§u 干海带 §r> | 8 x <§l§u 空灵单元 §r>' }
            ],
            reward: [
                { type: "starry_map:whale_rune", amount: 1 }
            ],
            attrition: [
                { type: "starry_map:blank_template", amount: 8 },
                { type: "minecraft:dried_kelp", amount: 32 }
            ],
            onDone: [
                'trophy:trade.machine_rune'
            ],
            after: hailingReset
        }
    ],
    [
        '购置 美西螈桶',
        {
            texture: 'textures/items/bucket_axolotl',
            refer: [
                { text: '§r32 x <§l§u 干海带 §r> | 32 x <§l§u 热带鱼 §r>' }
            ],
            reward: [
                { type: "minecraft:axolotl_bucket", amount: 1 }
            ],
            attrition: [
                { type: "minecraft:tropical_fish", amount: 32 },
                { type: "minecraft:dried_kelp", amount: 32 }
            ],
            onDone: [
                'trophy:trade.fishery_bucket'
            ],
            after: hailingReset
        }
    ],
    [
        '购置 鳕鱼桶',
        {
            texture: 'textures/items/bucket_cod',
            refer: [
                { text: '§r32 x <§l§u 干海带 §r> | 8 x <§l§u 鳕鱼 §r>' }
            ],
            reward: [
                { type: "minecraft:cod_bucket", amount: 1 }
            ],
            attrition: [
                { type: "minecraft:cod", amount: 8 },
                { type: "minecraft:dried_kelp", amount: 32 }
            ],
            onDone: [
                'trophy:trade.fishery_bucket'
            ],
            after: hailingReset
        }
    ],
    [
        '购置 河豚鱼桶',
        {
            texture: 'textures/items/bucket_pufferfish',
            refer: [
                { text: '§r32 x <§l§u 干海带 §r> | 8 x <§l§u 河豚鱼 §r>' }
            ],
            reward: [
                { type: "minecraft:pufferfish_bucket", amount: 1 }
            ],
            attrition: [
                { type: "minecraft:pufferfish", amount: 8 },
                { type: "minecraft:dried_kelp", amount: 32 }
            ],
            onDone: [
                'trophy:trade.fishery_bucket'
            ],
            after: hailingReset
        }
    ],
    [
        '购置 鲑鱼桶',
        {
            texture: 'textures/items/bucket_salmon',
            refer: [
                { text: '§r32 x <§l§u 干海带 §r> | 8 x <§l§u 鲑鱼 §r>' }
            ],
            reward: [
                { type: "minecraft:salmon_bucket", amount: 1 }
            ],
            attrition: [
                { type: "minecraft:salmon", amount: 8 },
                { type: "minecraft:dried_kelp", amount: 32 }
            ],
            onDone: [
                'trophy:trade.fishery_bucket'
            ],
            after: hailingReset
        }
    ],
    [
        '购置 蝌蚪桶',
        {
            texture: 'textures/items/bucket_tadpole',
            refer: [
                { text: '§r32 x <§l§u 干海带 §r> | 8 x <§l§u 小型垂滴叶 §r>' }
            ],
            reward: [
                { type: "minecraft:tadpole_bucket", amount: 1 }
            ],
            attrition: [
                { type: "minecraft:small_dripleaf_block", amount: 8 },
                { type: "minecraft:dried_kelp", amount: 32 }
            ],
            onDone: [
                'trophy:trade.fishery_bucket'
            ],
            after: hailingReset
        }
    ],
    [
        '购置 热带鱼桶',
        {
            texture: 'textures/items/bucket_tropical',
            refer: [
                { text: '§r32 x <§l§u 干海带 §r> | 8 x <§l§u 热带鱼 §r>' }
            ],
            reward: [
                { type: "minecraft:tropical_fish_bucket", amount: 1 }
            ],
            attrition: [
                { type: "minecraft:tropical_fish", amount: 8 },
                { type: "minecraft:dried_kelp", amount: 32 }
            ],
            onDone: [
                'trophy:trade.fishery_bucket'
            ],
            after: hailingReset
        }
    ],
    [
        '购置 海晶碎片',
        {
            texture: 'textures/items/prismarine_shard',
            refer: [
                { text: '§r32 x <§l§u 干海带 §r> | 16 x <§l§u 砂砾 §r>' }
            ],
            reward: [
                { type: "minecraft:prismarine_shard", amount: 16 }
            ],
            attrition: [
                { type: "minecraft:gravel", amount: 16 },
                { type: "minecraft:dried_kelp", amount: 32 }
            ],
            onDone: [
                'trophy:trade.mineral_products'
            ],
            after: hailingReset
        }
    ],
    [
        '购置 海晶砂砾',
        {
            texture: 'textures/items/prismarine_crystals',
            refer: [
                { text: '§r32 x <§l§u 干海带 §r> | 16 x <§l§u 砂砾 §r>' }
            ],
            reward: [
                { type: "minecraft:prismarine_crystals", amount: 16 }
            ],
            attrition: [
                { type: "minecraft:gravel", amount: 16 },
                { type: "minecraft:dried_kelp", amount: 32 }
            ],
            onDone: [
                'trophy:trade.mineral_products'
            ],
            after: hailingReset
        }
    ],
    [
        '代加工 熟鳕鱼',
        {
            texture: 'textures/items/fish_raw',
            refer: [
                { text: '§r8 x <§l§u 干海带 §r> | §r8 x <§l§u 生鳕鱼 §r>' }
            ],
            reward: [
                { type: "minecraft:cooked_cod", amount: 8 }
            ],
            attrition: [
                { type: "minecraft:cod", amount: 8 },
                { type: "minecraft:dried_kelp", amount: 8 }
            ],
            after: hailingReset
        }
    ],
    [
        '代加工 熟鲑鱼',
        {
            texture: 'textures/items/fish_salmon_cooked',
            refer: [
                { text: '§r8 x <§l§u 干海带 §r> | §r8 x <§l§u 生鲑鱼 §r>' }
            ],
            reward: [
                { type: "minecraft:cooked_salmon", amount: 8 }
            ],
            attrition: [
                { type: "minecraft:salmon", amount: 8 },
                { type: "minecraft:dried_kelp", amount: 8 }
            ],
            after: hailingReset
        }
    ],
]);

/*
 * 原版接口
 */
/**
 * * 琉璃计划
 */
const entry = new Map();
/*
 * 初始任务
 */
entry.set('离开 虚空蜂塔', {
    texture: 'textures/项目图标/传送',
    refer: [
        { text: "『§l§m 任务 §r』§l:\n" },
        { text: "从<§l§u 虚空野蜂塔 §r§l>出发, 成功返航<§l§u 主世界 §r§l>§r\n\n" },
        { text: "『§l§s 奖励 §r』§l:\n" },
        { text: "<§l§2 2 §9x§u 诸界道标 §r§l><§l§u 魔晶充能 §r§l>§r" }
    ],
    reward: [
        { type: "starry_map:road_sign_presets", amount: 2 },
        { type: "starry_map:star_energy_infusion", amount: 1 }
    ],
    onDone: [
        'trophy:stage_0',
        'trophy:stage_0.enter_vacant_space_wasp_tower',
    ],
    prompt: '获取魔晶石'
});
entry.set('召唤 星辉雅居', {
    texture: 'textures/物品贴图/召唤凭证/百灵绘卷',
    refer: [
        { text: "『§l§m 任务 §r』§l:\n" },
        { text: "选中合适的地点, 尝试召唤<§l§u 星辉雅居 §r§l>或<§l§u 初始物资 §r§l>§r\n\n" },
        { text: "『§l§s 奖励 §r』§l:\n" },
        { text: "<§l§u 交互终端 §r§l><§l§u 魔导合成 §r§l><§l§2 5 §9x§u 基础线缆 §r§l>§r" }
    ],
    reward: [
        { type: "starry_map:container_hub", amount: 1 },
        { type: "starry_map:interactive_terminal", amount: 1 },
        { type: "starry_map:basic_pipeline", amount: 5 },
    ],
    onDone: [
        'trophy:stage_0',
        'trophy:stage_0.enter_starlight_house',
    ]
});
entry.set('遭遇 野蜂领航', {
    texture: 'textures/项目图标/智械革命/野蜂_领航者',
    refer: [
        { text: "『§l§m 任务 §r』§l:\n" },
        { text: '在存档内游玩§2 30 §r天, 或遭遇一次<§u 野蜂领航者 §r>§r\n\n' },
        { text: "『§l§s 奖励 §r』§l:\n" },
        { text: "<§l§2 4 §9x§u 武装碎片 §r§l>§r" },
        { text: "<§l§u 渊鲸符文 §r§l><§l§u 蝰蛇符文 §r§l>§r" }
    ],
    reward: [
        { type: "starry_map:weapon_debris", amount: 4 },
        { type: "starry_map:viper_rune", amount: 1 },
        { type: "starry_map:whale_rune", amount: 1 },
    ],
    before() {
        return server.world.getDay() / 30 >= 1;
    },
    onDone: [
        'trophy:stage_0',
        'trophy:stage_0.super_wasp_cluster_raid'
    ]
});
entry.set('斩获 末影龙鳞', {
    texture: 'textures/物品贴图/模板单元/末影龙鳞',
    refer: [
        { text: "『§l§m 任务 §r』§l:\n" },
        { text: "通过炸伤<§u 末影龙 §r>获得<§l§2 15 §9x§u 末影龙鳞 §r§l>§r\n\n" },
        { text: "『§l§s 奖励 §r』§l:\n" },
        { text: "<§l§u 永恒魔晶石 §r§l><§l§u 百灵绘卷 §r§l>§r" }
    ],
    reward: [
        { type: "starry_map:eternal_energy", amount: 1 },
        { type: "starry_map:chorus_picture", amount: 1 },
    ],
    attrition: [
        { type: "starry_map:ender_dragon_scales", amount: 4 }
    ],
    onDone: [
        'trophy:stage_0',
        'trophy:stage_0.ender_dragon_scales'
    ]
});
/*
 * 契约 初始萝莉
 */
entry.set('契约 琉璃', {
    texture: 'textures/项目图标/神恩使徒/归忆',
    refer: [
        { text: "『§l§m 任务 §r』§l:\n" },
        { text: '使用<§t 精灵结契 §r>与<§9 琉璃 §r>签订"§s 牢不可破 §r"的契约§r\n\n' },
        { text: "『§l§s 奖励 §r』§l:\n" },
        { text: "<§l§u 精灵结契 §r§l><§l§u 初级-金属锻压 §r§l>§r" }
    ],
    reward: [
        { type: "starry_map:metal_forming_press", amount: 1 },
        { type: "starry_map:faerie_contract", amount: 1 }
    ],
    before(player) {
        /**
         * * 设定 角色类型
         */
        const options = { type: 'starry_map:guide.crystal' };
        /**
         * * 获取 角色列表
         */
        const target = EntitysSort(player.dimension, options, undefined, e => e.getDynamicProperty('entity:contract_user') == player.id);
        return target.length != 0;
    },
    rely: [
        'trophy:stage_0',
        'trophy:stage_0.enter_starlight_house'
    ],
    onDone: [
        'trophy:stage_1',
        'trophy:stage_1.contract.crystal'
    ],
    prompt: '物品修复与充能'
});
entry.set('契约 月华', {
    texture: 'textures/项目图标/神恩使徒/启程',
    refer: [
        { text: "『§l§m 任务 §r』§l:\n" },
        { text: '使用<§t 精灵结契 §r>与<§9 月华 §r>签订"§s 牢不可破 §r"的契约§r\n\n' },
        { text: "『§l§s 奖励 §r』§l:\n" },
        { text: "<§l§u 森蚺哨兵炮 §r§l><§l§u 魔导手册 §r§l>§r" }
    ],
    reward: [
        { type: "starry_map:call_python_sentinel", amount: 1 },
        { type: "starry_map:magic_handbook", amount: 1 }
    ],
    before(player) {
        /**
         * * 设定 角色类型
         */
        const options = { type: 'starry_map:guide.moon_light' };
        /**
         * * 获取 角色列表
         */
        const target = EntitysSort(player.dimension, options, undefined, e => e.getDynamicProperty('entity:contract_user') == player.id);
        return target.length != 0;
    },
    rely: [
        'trophy:stage_0',
        'trophy:stage_0.enter_starlight_house'
    ],
    onDone: [
        'trophy:stage_1',
        'trophy:stage_1.contract.moonlight'
    ],
    prompt: '魔晶工具与防具'
});
/*
 * 契约 其他角色
 */
entry.set('契约 啸天', {
    texture: 'textures/项目图标/神恩使徒/啸天',
    refer: [
        { text: "『§l§m 任务 §r』§l:\n" },
        { text: '使用<§t 精灵结契 §r>与<§9 啸天 §r>签订"§s 牢不可破 §r"的契约§r\n\n' },
        { text: "『§l§s 奖励 §r』§l:\n" },
        { text: "<§l§u 鞍座 §r§l>§r" }
    ],
    reward: [
        { type: "minecraft:saddle", amount: 1 },
    ],
    before(player) {
        /**
         * * 设定 角色类型
         */
        const options = { type: 'starry_map:execute.roaring' };
        /**
         * * 获取 角色列表
         */
        const target = EntitysSort(player.dimension, options, undefined, e => e.getDynamicProperty('entity:contract_user') == player.id);
        return target.length != 0;
    },
    rely: [
        'trophy:stage_0.enter_vacant_space_wasp_tower',
        'trophy:stage_1'
    ],
    onDone: [
        'trophy:stage_2',
        'trophy:stage_2.contract.roaring'
    ]
});
entry.set('契约 珍珠', {
    texture: 'textures/项目图标/神恩使徒/诸海',
    refer: [
        { text: "『§l§m 任务 §r』§l:\n" },
        { text: '使用<§t 精灵结契 §r>与<§9 珍珠 §r>签订"§s 牢不可破 §r"的契约§r\n\n' },
        { text: "『§l§s 奖励 §r』§l:\n" },
        { text: "<§l§u 参悟之石 §r§l>§r" }
    ],
    reward: [
        { type: "starry_map:enlightenment", amount: 1 },
    ],
    before(player) {
        /**
         * * 设定 角色类型
         */
        const options = { type: 'starry_map:guide.pearl' };
        /**
         * * 获取 角色列表
         */
        const target = EntitysSort(player.dimension, options, undefined, e => e.getDynamicProperty('entity:contract_user') == player.id);
        return target.length != 0;
    },
    rely: [
        'trophy:stage_0.enter_vacant_space_wasp_tower',
        'trophy:stage_1'
    ],
    onDone: [
        'trophy:stage_2',
        'trophy:stage_2.contract.pearl'
    ]
});
entry.set('契约 绯红', {
    texture: 'textures/项目图标/神恩使徒/烛火',
    refer: [
        { text: "『§l§m 任务 §r』§l:\n" },
        { text: '使用<§t 精灵结契 §r>与<§9 绯红 §r>签订"§s 牢不可破 §r"的契约§r\n\n' },
        { text: "『§l§s 奖励 §r』§l:\n" },
        { text: "<§l§u 参悟之石 §r§l>§r" }
    ],
    reward: [
        { type: "starry_map:enlightenment", amount: 1 },
    ],
    before(player) {
        /**
         * * 设定 角色类型
         */
        const options = { type: 'starry_map:guide.crimson' };
        /**
         * * 获取 角色列表
         */
        const target = EntitysSort(player.dimension, options, undefined, e => e.getDynamicProperty('entity:contract_user') == player.id);
        return target.length != 0;
    },
    rely: [
        'trophy:stage_0.enter_vacant_space_wasp_tower',
        'trophy:stage_1'
    ],
    onDone: [
        'trophy:stage_2',
        'trophy:stage_2.contract.crimson'
    ]
});
entry.set('契约 蔷薇', {
    texture: 'textures/项目图标/神恩使徒/极雷',
    refer: [
        { text: "『§l§m 任务 §r』§l:\n" },
        { text: '使用<§t 精灵结契 §r>与<§9 蔷薇 §r>签订"§s 牢不可破 §r"的契约§r\n\n' },
        { text: "『§l§s 奖励 §r』§l:\n" },
        { text: "<§l§u 参悟之石 §r§l>§r" }
    ],
    reward: [
        { type: "starry_map:enlightenment", amount: 1 },
    ],
    before(player) {
        /**
         * * 设定 角色类型
         */
        const options = { type: 'starry_map:guide.rambler' };
        /**
         * * 获取 角色列表
         */
        const target = EntitysSort(player.dimension, options, undefined, e => e.getDynamicProperty('entity:contract_user') == player.id);
        return target.length != 0;
    },
    rely: [
        'trophy:stage_0.enter_vacant_space_wasp_tower',
        'trophy:stage_1'
    ],
    onDone: [
        'trophy:stage_2',
        'trophy:stage_2.contract.rambler'
    ]
});
entry.set('契约 海灵', {
    texture: 'textures/项目图标/神恩使徒/界木',
    refer: [
        { text: "『§l§m 任务 §r』§l:\n" },
        { text: '使用<§t 精灵结契 §r>与<§9 海灵 §r>签订"§s 牢不可破 §r"的契约§r\n\n' },
        { text: "『§l§s 奖励 §r』§l:\n" },
        { text: "<§l§u 参悟之石 §r§l>§r" }
    ],
    reward: [
        { type: "starry_map:enlightenment", amount: 1 },
    ],
    before(player) {
        /**
         * * 设定 角色类型
         */
        const options = { type: 'starry_map:guide.hai_ling' };
        /**
         * * 获取 角色列表
         */
        const target = EntitysSort(player.dimension, options, undefined, e => e.getDynamicProperty('entity:contract_user') == player.id);
        return target.length != 0;
    },
    rely: [
        'trophy:stage_0.enter_vacant_space_wasp_tower',
        'trophy:stage_1'
    ],
    onDone: [
        'trophy:stage_2',
        'trophy:stage_2.contract.hailing'
    ]
});
entry.set('契约 海娜', {
    texture: 'textures/项目图标/神恩使徒/诸海',
    refer: [
        { text: "『§l§m 任务 §r』§l:\n" },
        { text: '使用<§t 精灵结契 §r>与<§9 海娜 §r>签订"§s 牢不可破 §r"的契约§r\n\n' },
        { text: "『§l§s 奖励 §r』§l:\n" },
        { text: "<§l§u 参悟之石 §r§l>§r" }
    ],
    reward: [
        { type: "starry_map:enlightenment", amount: 1 },
    ],
    before(player) {
        /**
         * * 设定 角色类型
         */
        const options = { type: 'starry_map:guide.hai_na' };
        /**
         * * 获取 角色列表
         */
        const target = EntitysSort(player.dimension, options, undefined, e => e.getDynamicProperty('entity:contract_user') == player.id);
        return target.length != 0;
    },
    rely: [
        'trophy:stage_0.enter_vacant_space_wasp_tower',
        'trophy:stage_1'
    ],
    onDone: [
        'trophy:stage_2',
        'trophy:stage_2.contract.haina'
    ]
});
entry.set('契约 九九', {
    texture: 'textures/项目图标/神恩使徒/极雷',
    refer: [
        { text: "『§l§m 任务 §r』§l:\n" },
        { text: '使用<§t 精灵结契 §r>与<§9 九九 §r>签订"§s 牢不可破 §r"的契约§r\n\n' },
        { text: "『§l§s 奖励 §r』§l:\n" },
        { text: "<§l§u 参悟之石 §r§l>§r" }
    ],
    reward: [
        { type: "starry_map:enlightenment", amount: 1 },
    ],
    before(player) {
        /**
         * * 设定 角色类型
         */
        const options = { type: 'starry_map:guide.nine_nine' };
        /**
         * * 获取 角色列表
         */
        const target = EntitysSort(player.dimension, options, undefined, e => e.getDynamicProperty('entity:contract_user') == player.id);
        return target.length != 0;
    },
    rely: [
        'trophy:stage_0.enter_vacant_space_wasp_tower',
        'trophy:stage_1'
    ],
    onDone: [
        'trophy:stage_2',
        'trophy:stage_2.contract.ninenine'
    ]
});
entry.set('契约 森涅', {
    texture: 'textures/项目图标/神恩使徒/界木',
    refer: [
        { text: "『§l§m 任务 §r』§l:\n" },
        { text: '使用<§t 精灵结契 §r>与<§9 森涅 §r>签订"§s 牢不可破 §r"的契约§r\n\n' },
        { text: "『§l§s 奖励 §r』§l:\n" },
        { text: "<§l§u 参悟之石 §r§l>§r" }
    ],
    reward: [
        { type: "starry_map:enlightenment", amount: 1 },
    ],
    before(player) {
        /**
         * * 设定 角色类型
         */
        const options = { type: 'starry_map:guide.sen_nie' };
        /**
         * * 获取 角色列表
         */
        const target = EntitysSort(player.dimension, options, undefined, e => e.getDynamicProperty('entity:contract_user') == player.id);
        return target.length != 0;
    },
    rely: [
        'trophy:stage_0.enter_vacant_space_wasp_tower',
        'trophy:stage_1'
    ],
    onDone: [
        'trophy:stage_2',
        'trophy:stage_2.contract.sennie'
    ]
});
entry.set('契约 星砂', {
    texture: 'textures/项目图标/神恩使徒/烛火',
    refer: [
        { text: "『§l§m 任务 §r』§l:\n" },
        { text: '使用<§t 精灵结契 §r>与<§9 星砂 §r>签订"§s 牢不可破 §r"的契约§r\n\n' },
        { text: "『§l§s 奖励 §r』§l:\n" },
        { text: "<§l§u 参悟之石 §r§l>§r" }
    ],
    reward: [
        { type: "starry_map:enlightenment", amount: 1 },
    ],
    before(player) {
        /**
         * * 设定 角色类型
         */
        const options = { type: 'starry_map:guide.star_sand' };
        /**
         * * 获取 角色列表
         */
        const target = EntitysSort(player.dimension, options, undefined, e => e.getDynamicProperty('entity:contract_user') == player.id);
        return target.length != 0;
    },
    rely: [
        'trophy:stage_0.enter_vacant_space_wasp_tower',
        'trophy:stage_1'
    ],
    onDone: [
        'trophy:stage_2',
        'trophy:stage_2.contract.starsand'
    ]
});
entry.set('契约 雪隐', {
    texture: 'textures/项目图标/神恩使徒/诸海',
    refer: [
        { text: "『§l§m 任务 §r』§l:\n" },
        { text: '使用<§t 精灵结契 §r>与<§9 雪隐 §r>签订"§s 牢不可破 §r"的契约§r\n\n' },
        { text: "『§l§s 奖励 §r』§l:\n" },
        { text: "<§l§u 参悟之石 §r§l>§r" }
    ],
    reward: [
        { type: "starry_map:enlightenment", amount: 1 },
    ],
    before(player) {
        /**
         * * 设定 角色类型
         */
        const options = { type: 'starry_map:guide.snow_hidden' };
        /**
         * * 获取 角色列表
         */
        const target = EntitysSort(player.dimension, options, undefined, e => e.getDynamicProperty('entity:contract_user') == player.id);
        return target.length != 0;
    },
    rely: [
        'trophy:stage_0.enter_vacant_space_wasp_tower',
        'trophy:stage_1'
    ],
    onDone: [
        'trophy:stage_2',
        'trophy:stage_2.contract.snowhidden'
    ]
});
entry.set('契约 幽蓝', {
    texture: 'textures/项目图标/神恩使徒/诸海',
    refer: [
        { text: "『§l§m 任务 §r』§l:\n" },
        { text: '使用<§t 精灵结契 §r>与<§9 幽蓝 §r>签订"§s 牢不可破 §r"的契约§r\n\n' },
        { text: "『§l§s 奖励 §r』§l:\n" },
        { text: "<§l§u 参悟之石 §r§l>§r" }
    ],
    reward: [
        { type: "starry_map:enlightenment", amount: 1 },
    ],
    before(player) {
        /**
         * * 设定 角色类型
         */
        const options = { type: 'starry_map:guide.dullblue' };
        /**
         * * 获取 角色列表
         */
        const target = EntitysSort(player.dimension, options, undefined, e => e.getDynamicProperty('entity:contract_user') == player.id);
        return target.length != 0;
    },
    rely: [
        'trophy:stage_0.enter_vacant_space_wasp_tower',
        'trophy:stage_1'
    ],
    onDone: [
        'trophy:stage_2',
        'trophy:stage_2.contract.dullblue'
    ]
});
/*
 * 魔晶石系列
 */
entry.set('收集 归忆_魔晶石', {
    texture: 'textures/物品贴图/能量水晶/归忆_魔晶石',
    refer: [
        { text: "『§l§m 任务 §r』§l:\n" },
        { text: "制作或获得<§l§u 归忆_魔晶石 §r§l>§r\n\n" },
        { text: "『§l§s 奖励 §r』§l:\n" },
        { text: "<§l§u 幻影驱散 §r§l><§l§2 2 §9x§u 涵养灵露 §r§l>§r" }
    ],
    reward: [
        { type: "starry_map:phantom_dispel_dust", amount: 1 },
        { type: "starry_map:moment_repair_dew", amount: 2 }
    ],
    attrition: [
        { type: "starry_map:orange_energy", amount: 1 },
    ],
    rely: [
        'trophy:stage_2'
    ],
    onDone: [
        'trophy:stage_3',
        'trophy:stage_3.item.energy_crystal.orange_energy'
    ]
});
entry.set('收集 极雷_魔晶石', {
    texture: 'textures/物品贴图/能量水晶/极雷_魔晶石',
    refer: [
        { text: "『§l§m 任务 §r』§l:\n" },
        { text: "制作或获得<§l§u 极雷_魔晶石 §r§l>§r\n\n" },
        { text: "『§l§s 奖励 §r』§l:\n" },
        { text: "<§l§u 幻影驱散 §r§l><§l§2 2 §9x§u 涵养灵露 §r§l>§r" }
    ],
    reward: [
        { type: "starry_map:phantom_dispel_dust", amount: 1 },
        { type: "starry_map:moment_repair_dew", amount: 2 }
    ],
    attrition: [
        { type: "starry_map:purple_energy", amount: 1 },
    ],
    rely: [
        'trophy:stage_2'
    ],
    onDone: [
        'trophy:stage_3',
        'trophy:stage_3.item.energy_crystal.purple_energy'
    ]
});
entry.set('收集 界木_魔晶石', {
    texture: 'textures/物品贴图/能量水晶/界木_魔晶石',
    refer: [
        { text: "『§l§m 任务 §r』§l:\n" },
        { text: "制作或获得<§l§u 界木_魔晶石 §r§l>§r\n\n" },
        { text: "『§l§s 奖励 §r』§l:\n" },
        { text: "<§l§u 幻影驱散 §r§l><§l§2 2 §9x§u 涵养灵露 §r§l>§r" }
    ],
    reward: [
        { type: "starry_map:phantom_dispel_dust", amount: 1 },
        { type: "starry_map:moment_repair_dew", amount: 2 }
    ],
    attrition: [
        { type: "starry_map:green_energy", amount: 1 },
    ],
    rely: [
        'trophy:stage_2'
    ],
    onDone: [
        'trophy:stage_3',
        'trophy:stage_3.item.energy_crystal.green_energy'
    ]
});
entry.set('收集 诸海_魔晶石', {
    texture: 'textures/物品贴图/能量水晶/诸海_魔晶石',
    refer: [
        { text: "『§l§m 任务 §r』§l:\n" },
        { text: "制作或获得<§l§u 诸海_魔晶石 §r§l>§r\n\n" },
        { text: "『§l§s 奖励 §r』§l:\n" },
        { text: "<§l§u 幻影驱散 §r§l><§l§2 2 §9x§u 涵养灵露 §r§l>§r" }
    ],
    reward: [
        { type: "starry_map:phantom_dispel_dust", amount: 1 },
        { type: "starry_map:moment_repair_dew", amount: 2 }
    ],
    attrition: [
        { type: "starry_map:blue_energy", amount: 1 },
    ],
    rely: [
        'trophy:stage_2'
    ],
    onDone: [
        'trophy:stage_3',
        'trophy:stage_3.item.energy_crystal.blue_energy'
    ]
});
entry.set('收集 烛火_魔晶石', {
    texture: 'textures/物品贴图/能量水晶/烛火_魔晶石',
    refer: [
        { text: "『§l§m 任务 §r』§l:\n" },
        { text: "制作或获得<§l§u 烛火_魔晶石 §r§l>§r\n\n" },
        { text: "『§l§s 奖励 §r』§l:\n" },
        { text: "<§l§u 幻影驱散 §r§l><§l§2 2 §9x§u 涵养灵露 §r§l>§r" }
    ],
    reward: [
        { type: "starry_map:phantom_dispel_dust", amount: 1 },
        { type: "starry_map:moment_repair_dew", amount: 2 }
    ],
    attrition: [
        { type: "starry_map:red_energy", amount: 1 },
    ],
    rely: [
        'trophy:stage_2'
    ],
    onDone: [
        'trophy:stage_3',
        'trophy:stage_3.item.energy_crystal.red_energy'
    ]
});
entry.set('收集 永恒_魔晶石', {
    texture: 'textures/物品贴图/能量水晶/永恒_魔晶石',
    refer: [
        { text: "『§l§m 任务 §r』§l:\n" },
        { text: "获得 1 枚<§l§u 永恒_魔晶石 §r§l>§r\n\n" },
        { text: "『§l§s 奖励 §r』§l:\n" },
        { text: "<§l§c 魔法工业展馆 §r§l>§r" }
    ],
    attrition: [
        { type: "starry_map:eternal_energy", amount: 1 },
    ],
    after(player) {
        /**
         * * 获取 游戏规则
         */
        const rule = server.world.getDynamicProperty('game_rules:regenerate.magic_industry_exhibition_hall') ?? true;
        /**
         * * 坐标映射值
         */
        const mapping = new Vector(-500, 66, -500);
        /**
         * * 进行结构生成的维度
         */
        const dimension = server.world.getDimension('minecraft:the_end');
        /**
         * * 定义 坐标锚点
         */
        const anchor = JSON.stringify({ location: mapping, dimension: dimension.id });
        /**
         * * 定义 相机参数
         */
        const camera = player.camera;
        /**
         * * 定义 摄像机终点坐标
         */
        const endPoint = mapping.add({ x: 64, y: 32, z: 64 });
        // 播放引导文本
        PlayPrompt(player, "生成魔法工业展馆");
        // 传送玩家到魔法工业展馆
        player.teleport(mapping, { dimension });
        // 清除 摄像机动画
        server.system.runTimeout(() => camera.clear(), 95);
        // 设置 摄像机位移
        server.system.runTimeout(() => camera.setCamera('minecraft:free', { location: endPoint, facingLocation: player.location, easeOptions: { easeTime: 3 } }), 20);
        // 设置 动态属性-魔法工业展馆坐标
        server.system.runTimeout(() => player.setDynamicProperty('road_sign:魔法工业展馆', anchor), 20);
        // 判断是否生成结构
        if (rule === false)
            return;
        /**
         * * 获取 建筑结构
         */
        const template = server.world.structureManager.get('mystructure:magic_industry_exhibition_hall');
        /**
         * * 定义 坐标基准点
         */
        const reference = mapping.add({ x: -32, y: -2, z: -32 });
        // 检测 建筑结构
        if (!template)
            return player.sendMessage([translate(player), { text: '-> 未能获取到<§l§9 魔法工业展馆 §r>的结构数据文件' }]);
        // 放置 建筑结构
        server.world.structureManager.place(template, dimension, reference);
        // 赠送 星尘能量
        server.world.setDynamicProperty("stardust_energy_cache:" + RandomFloor(10000, 99999), 100000);
        // 设置 游戏规则
        if (rule == true)
            server.world.setDynamicProperty('game_rules:regenerate.magic_industry_exhibition_hall', false);
    },
    rely: [
        'trophy:stage_0',
        'trophy:stage_0.enter_starlight_house'
    ],
    onDone: [
        'trophy:stage_3',
        'trophy:stage_3.item.energy_crystal.eternal_energy'
    ]
});
entry.set('收集 归忆_魔晶块', {
    texture: 'textures/方块贴图/能量晶块/归忆',
    refer: [
        { text: "『§l§m 任务 §r』§l:\n" },
        { text: "制作或获得<§l§u 归忆_魔晶块 §r§l>§r\n\n" },
        { text: "『§l§s 奖励 §r』§l:\n" },
        { text: "<§l§u 参悟之石 §r§l><§l§u 百灵绘卷 §r§l>§r" }
    ],
    reward: [
        { type: "starry_map:enlightenment", amount: 1 },
        { type: "starry_map:chorus_picture", amount: 1 },
    ],
    attrition: [
        { type: "starry_map:block.orange_energy", amount: 1 },
    ],
    rely: [
        'trophy:stage_2'
    ],
    onDone: [
        'trophy:stage_3',
        'trophy:stage_3.block.energy_crystal.orange_energy'
    ]
});
entry.set('收集 烛火_魔晶块', {
    texture: 'textures/方块贴图/能量晶块/烛火',
    refer: [
        { text: "『§l§m 任务 §r』§l:\n" },
        { text: "制作或获得<§l§u 烛火_魔晶块 §r§l>§r\n\n" },
        { text: "『§l§s 奖励 §r』§l:\n" },
        { text: "<§l§u 参悟之石 §r§l><§l§u 百灵绘卷 §r§l>§r" }
    ],
    reward: [
        { type: "starry_map:enlightenment", amount: 1 },
        { type: "starry_map:chorus_picture", amount: 1 },
    ],
    attrition: [
        { type: "starry_map:block.red_energy", amount: 1 },
    ],
    rely: [
        'trophy:stage_2'
    ],
    onDone: [
        'trophy:stage_3',
        'trophy:stage_3.block.energy_crystal.red_energy'
    ]
});
entry.set('收集 诸海_魔晶块', {
    texture: 'textures/方块贴图/能量晶块/诸海',
    refer: [
        { text: "『§l§m 任务 §r』§l:\n" },
        { text: "制作或获得<§l§u 诸海_魔晶块 §r§l>§r\n\n" },
        { text: "『§l§s 奖励 §r』§l:\n" },
        { text: "<§l§u 参悟之石 §r§l><§l§u 百灵绘卷 §r§l>§r" }
    ],
    reward: [
        { type: "starry_map:enlightenment", amount: 1 },
        { type: "starry_map:chorus_picture", amount: 1 },
    ],
    attrition: [
        { type: "starry_map:block.blue_energy", amount: 1 },
    ],
    rely: [
        'trophy:stage_2'
    ],
    onDone: [
        'trophy:stage_3',
        'trophy:stage_3.block.energy_crystal.blue_energy'
    ]
});
entry.set('收集 界木_魔晶块', {
    texture: 'textures/方块贴图/能量晶块/界木',
    refer: [
        { text: "『§l§m 任务 §r』§l:\n" },
        { text: "制作或获得<§l§u 界木_魔晶块 §r§l>§r\n\n" },
        { text: "『§l§s 奖励 §r』§l:\n" },
        { text: "<§l§u 参悟之石 §r§l><§l§u 百灵绘卷 §r§l>§r" }
    ],
    reward: [
        { type: "starry_map:enlightenment", amount: 1 },
        { type: "starry_map:chorus_picture", amount: 1 },
    ],
    attrition: [
        { type: "starry_map:block.green_energy", amount: 1 },
    ],
    rely: [
        'trophy:stage_2'
    ],
    onDone: [
        'trophy:stage_3',
        'trophy:stage_3.block.energy_crystal.green_energy'
    ]
});
entry.set('收集 极雷_魔晶块', {
    texture: 'textures/方块贴图/能量晶块/极雷',
    refer: [
        { text: "『§l§m 任务 §r』§l:\n" },
        { text: "制作或获得<§l§u 极雷_魔晶块 §r§l>§r\n\n" },
        { text: "『§l§s 奖励 §r』§l:\n" },
        { text: "<§l§u 参悟之石 §r§l><§l§u 百灵绘卷 §r§l>§r" }
    ],
    reward: [
        { type: "starry_map:enlightenment", amount: 1 },
        { type: "starry_map:chorus_picture", amount: 1 },
    ],
    attrition: [
        { type: "starry_map:block.purple_energy", amount: 1 },
    ],
    rely: [
        'trophy:stage_2'
    ],
    onDone: [
        'trophy:stage_3',
        'trophy:stage_3.block.energy_crystal.purple_energy'
    ]
});
entry.set('收集 永恒_魔晶块', {
    texture: 'textures/方块贴图/能量晶块/永恒',
    refer: [
        { text: "『§l§m 任务 §r』§l:\n" },
        { text: '制作或获得<§l§u 永恒_魔晶块 §r§l>§r\n\n' },
        { text: "『§l§s 奖励 §r』§l:\n" },
        { text: "<§l§u 永恒魔晶块 §r§l><§l§u 恒常储罐 §r§l>§r" }
    ],
    reward: [
        { type: "starry_map:constant_tank", amount: 1 },
        { type: "starry_map:block.eternal_energy", amount: 1 }
    ],
    attrition: [
        { type: "starry_map:block.eternal_energy", amount: 1 }
    ],
    rely: [
        'trophy:stage_2'
    ],
    onDone: [
        'trophy:stage_3',
        'trophy:stage_3.block.energy_crystal.eternal_energy'
    ]
});
/*
 * 收集物品
 */
entry.set('制作 基础总线', {
    texture: 'textures/方块贴图/模块化/平面_2/色彩',
    refer: [
        { text: "『§l§m 任务 §r』§l:\n" },
        { text: "制作或获得<§l§2 32 §9x§u 基础总线 §r§l>§r\n\n" },
        { text: "『§l§s 奖励 §r』§l:\n" },
        { text: "<§l§2 24 §9x§u 基础总线 §r§l><§l§2 2 §9x§u 逻辑单通 §r§l>§r\n" },
        { text: "<§l§2 2 §9x§u 逻辑异或 §r§l><§l§2 2 §9x§u 逻辑非门 §r§l><§l§2 2 §9x§u 逻辑与门 §r§l>§r" }
    ],
    reward: [
        { type: "starry_map:basic_pipeline", amount: 24 },
        { type: "starry_map:logic_inverter", amount: 2 },
        { type: "starry_map:exclusive_or", amount: 2 },
        { type: "starry_map:logic_single", amount: 2 },
        { type: "starry_map:logical_and", amount: 2 },
    ],
    attrition: [
        { type: "starry_map:basic_pipeline", amount: 32 }
    ],
    rely: [
        'trophy:stage_4.universal_integrated_circuit'
    ],
    onDone: [
        'trophy:stage_4',
        'trophy:stage_4.basic_pipeline'
    ]
});
entry.set('制作 驱动核心', {
    texture: 'textures/方块贴图/模块化/平面_0/色彩',
    refer: [
        { text: "『§l§m 任务 §r』§l:\n" },
        { text: '制作或获得<§l§2 4 §9x§u 驱动核心 §r§l>§r\n\n' },
        { text: "『§l§s 奖励 §r』§l:\n" },
        { text: "<§l§2 4 §9x§u 驱动核心 §r§l><§l§2 16 §9x§u 虚空方块 §r§l>§r" }
    ],
    reward: [
        { type: "starry_map:nihility_space_block", amount: 16 },
        { type: "starry_map:servo_omphalos", amount: 4 },
    ],
    attrition: [
        { type: "starry_map:servo_omphalos", amount: 4 }
    ],
    rely: [
        'trophy:stage_4.universal_integrated_circuit'
    ],
    onDone: [
        'trophy:stage_4',
        'trophy:stage_4.omphalos'
    ]
});
entry.set('收集 魔晶盾牌', {
    texture: 'textures/物品贴图/魔法工具/魔晶盾牌',
    refer: [
        { text: "『§l§m 任务 §r』§l:\n" },
        { text: "制作或获得<§l§u 魔晶盾牌 §r§l>§r\n\n" },
        { text: "『§l§s 奖励 §r』§l:\n" },
        { text: "<§l§u 魔晶盾牌 §r§l><§l§u 参悟之石 §r§l>§r" }
    ],
    reward: [
        { type: "starry_map:enlightenment", amount: 1 },
        { type: "starry_map:magic_crystal_shield", amount: 1 },
    ],
    attrition: [
        { type: "starry_map:magic_crystal_shield", amount: 1 },
    ],
    rely: [
        'trophy:stage_1.contract.moonlight',
        'trophy:stage_3',
    ],
    onDone: [
        'trophy:stage_4',
        'trophy:stage_4.magic_crystal_integration.magic_crystal_shield'
    ]
});
entry.set('收集 魔晶扳手', {
    texture: 'textures/物品贴图/魔法工具/魔晶扳手',
    refer: [
        { text: "『§l§m 任务 §r』§l:\n" },
        { text: "制作或获得<§l§u 魔晶扳手 §r§l>§r\n\n" },
        { text: "『§l§s 奖励 §r』§l:\n" },
        { text: "<§l§u 魔晶扳手 §r§l><§l§u 参悟之石 §r§l>§r" }
    ],
    reward: [
        { type: "starry_map:enlightenment", amount: 1 },
        { type: "starry_map:magic_crystal_wrench", amount: 1 },
    ],
    attrition: [
        { type: "starry_map:magic_crystal_wrench", amount: 1 },
    ],
    rely: [
        'trophy:stage_1.contract.moonlight',
        'trophy:stage_3',
    ],
    onDone: [
        'trophy:stage_4',
        'trophy:stage_4.magic_crystal_integration.magic_crystal_wrench'
    ]
});
entry.set('收集 魔晶弹珠', {
    texture: 'textures/物品贴图/魔法工具/魔晶弹珠',
    refer: [
        { text: "『§l§m 任务 §r』§l:\n" },
        { text: "制作或获得<§l§u 魔晶弹珠 §r§l>§r\n\n" },
        { text: "『§l§s 奖励 §r』§l:\n" },
        { text: "<§l§u 魔晶弹珠 §r§l><§l§u 参悟之石 §r§l>§r" }
    ],
    reward: [
        { type: "starry_map:enlightenment", amount: 1 },
        { type: "starry_map:magic_crystal_marbles", amount: 1 },
    ],
    attrition: [
        { type: "starry_map:magic_crystal_marbles", amount: 1 },
    ],
    rely: [
        'trophy:stage_1.contract.moonlight',
        'trophy:stage_3',
    ],
    onDone: [
        'trophy:stage_4',
        'trophy:stage_4.magic_crystal_integration.magic_crystal_marbles'
    ]
});
entry.set('收集 魔晶弹弓', {
    texture: 'textures/物品贴图/魔法工具/魔晶弹弓',
    refer: [
        { text: "『§l§m 任务 §r』§l:\n" },
        { text: "制作或获得<§l§u 魔晶弹弓 §r§l>§r\n\n" },
        { text: "『§l§s 奖励 §r』§l:\n" },
        { text: "<§l§u 魔晶弹弓 §r§l><§l§u 参悟之石 §r§l>§r" }
    ],
    reward: [
        { type: "starry_map:enlightenment", amount: 1 },
        { type: "starry_map:magic_crystal_bow", amount: 1 },
    ],
    attrition: [
        { type: "starry_map:magic_crystal_bow", amount: 1 },
    ],
    rely: [
        'trophy:stage_1.contract.moonlight',
        'trophy:stage_3',
    ],
    onDone: [
        'trophy:stage_4',
        'trophy:stage_4.magic_crystal_integration.magic_crystal_bow'
    ]
});
entry.set('收集 魔晶锤子', {
    texture: 'textures/物品贴图/魔法工具/魔晶锤子',
    refer: [
        { text: "『§l§m 任务 §r』§l:\n" },
        { text: "制作或获得<§l§u 魔晶锤子 §r§l>§r\n\n" },
        { text: "『§l§s 奖励 §r』§l:\n" },
        { text: "<§l§u 魔晶锤子 §r§l><§l§u 参悟之石 §r§l>§r" }
    ],
    reward: [
        { type: "starry_map:enlightenment", amount: 1 },
        { type: "starry_map:magic_crystal_hammer", amount: 1 },
    ],
    attrition: [
        { type: "starry_map:magic_crystal_hammer", amount: 1 },
    ],
    rely: [
        'trophy:stage_1.contract.moonlight',
        'trophy:stage_3',
    ],
    onDone: [
        'trophy:stage_4',
        'trophy:stage_4.magic_crystal_integration.magic_crystal_hammer'
    ]
});
entry.set('收集 魔晶钩爪', {
    texture: 'textures/物品贴图/魔法工具/魔晶钩爪',
    refer: [
        { text: "『§l§m 任务 §r』§l:\n" },
        { text: "制作或获得<§l§u 魔晶钩爪 §r§l>§r\n\n" },
        { text: "『§l§s 奖励 §r』§l:\n" },
        { text: "<§l§u 魔晶钩爪 §r§l><§l§u 参悟之石 §r§l>§r" }
    ],
    reward: [
        { type: "starry_map:enlightenment", amount: 1 },
        { type: "starry_map:magic_crystal_claw", amount: 1 },
    ],
    attrition: [
        { type: "starry_map:magic_crystal_claw", amount: 1 },
    ],
    rely: [
        'trophy:stage_1.contract.moonlight',
        'trophy:stage_3',
    ],
    onDone: [
        'trophy:stage_4',
        'trophy:stage_4.magic_crystal_integration.magic_crystal_claw'
    ]
});
entry.set('收集 魔晶起子', {
    texture: 'textures/物品贴图/魔法工具/魔晶起子',
    refer: [
        { text: "『§l§m 任务 §r』§l:\n" },
        { text: "制作或获得<§l§u 魔晶起子 §r§l>§r\n\n" },
        { text: "『§l§s 奖励 §r』§l:\n" },
        { text: "<§l§u 魔晶起子 §r§l><§l§u 参悟之石 §r§l>§r" }
    ],
    reward: [
        { type: "starry_map:enlightenment", amount: 1 },
        { type: "starry_map:magic_crystal_screwdriver", amount: 1 },
    ],
    attrition: [
        { type: "starry_map:magic_crystal_screwdriver", amount: 1 },
    ],
    rely: [
        'trophy:stage_1.contract.moonlight',
        'trophy:stage_3',
    ],
    onDone: [
        'trophy:stage_4',
        'trophy:stage_4.magic_crystal_integration.magic_crystal_screwdriver'
    ]
});
entry.set('收集 魔晶钥匙', {
    texture: 'textures/物品贴图/魔法工具/魔晶钥匙',
    refer: [
        { text: "『§l§m 任务 §r』§l:\n" },
        { text: "制作或获得<§l§u 魔晶钥匙 §r§l>§r\n\n" },
        { text: "『§l§s 奖励 §r』§l:\n" },
        { text: "<§l§u 魔晶钥匙 §r§l><§l§u 参悟之石 §r§l>§r" }
    ],
    reward: [
        { type: "starry_map:enlightenment", amount: 1 },
        { type: "starry_map:magic_crystal_key", amount: 1 },
    ],
    attrition: [
        { type: "starry_map:magic_crystal_key", amount: 1 },
    ],
    rely: [
        'trophy:stage_1.contract.moonlight',
        'trophy:stage_3',
    ],
    onDone: [
        'trophy:stage_4',
        'trophy:stage_4.magic_crystal_integration.magic_crystal_key'
    ]
});
entry.set('收集 通用集成', {
    texture: 'textures/物品贴图/模板单元/通用集成回路',
    refer: [
        { text: "『§l§m 任务 §r』§l:\n" },
        { text: "制作或获得<§l§u 通用集成回路 §r§l>§r\n\n" },
        { text: "『§l§s 奖励 §r』§l:\n" },
        { text: "<§l§2 2 §9x§u 通用集成回路 §r§l><§l§2 8 §9x§u 钢岩合金-套装 §r§l>§r\n" },
        { text: "<§l§2 2 §9x§u 渊鲸符文 §r§l><§l§2 2 §9x§u 蝰蛇符文 §r§l>§r" }
    ],
    reward: [
        { type: "starry_map:universal_integrated_circuit", amount: 2 },
        { type: "starry_map:wafer.steel_rock_eutectic", amount: 8 },
        { type: "starry_map:coil.steel_rock_eutectic", amount: 8 },
        { type: "starry_map:steel_rock_eutectic", amount: 8 },
        { type: "starry_map:viper_rune", amount: 2 },
        { type: "starry_map:whale_rune", amount: 2 },
    ],
    attrition: [
        { type: "starry_map:universal_integrated_circuit", amount: 1 }
    ],
    rely: [
        'trophy:stage_1.contract.moonlight',
        'trophy:stage_3',
    ],
    onDone: [
        'trophy:stage_4',
        'trophy:stage_4.universal_integrated_circuit'
    ],
    prompt: '魔导工业的启动基础'
});
entry.set('收集 畜牧典范', {
    texture: 'textures/物品贴图/魔法书籍/畜牧典范',
    refer: [
        { text: "『§l§m 任务 §r』§l:\n" },
        { text: "制作或获得<§l§u 畜牧典范 §r§l>§r\n\n" },
        { text: "『§l§s 奖励 §r』§l:\n" },
        { text: "<§l§u 百灵绘卷 §r§l><§l§2 8 §9x§u 钢岩合金-套装 §r§l>§r" }
    ],
    reward: [
        { type: "starry_map:wafer.steel_rock_eutectic", amount: 8 },
        { type: "starry_map:coil.steel_rock_eutectic", amount: 8 },
        { type: "starry_map:steel_rock_eutectic", amount: 8 },
        { type: "starry_map:chorus_picture", amount: 1 },
    ],
    attrition: [
        { type: "starry_map:animal_husbandry", amount: 1 },
    ],
    rely: [
        'trophy:stage_1.contract.crystal',
        'trophy:stage_3',
    ],
    onDone: [
        'trophy:stage_4',
        'trophy:stage_4.magic_crystal_books.animal_husbandry'
    ]
});
entry.set('收集 精灵结契', {
    texture: 'textures/物品贴图/魔法书籍/精灵结契',
    refer: [
        { text: "『§l§m 任务 §r』§l:\n" },
        { text: "制作或获得<§l§u 精灵结契 §r§l>§r\n\n" },
        { text: "『§l§s 奖励 §r』§l:\n" },
        { text: "<§l§u 百灵绘卷 §r§l><§l§2 8 §9x§u 钢岩合金-套装 §r§l>§r" }
    ],
    reward: [
        { type: "starry_map:wafer.steel_rock_eutectic", amount: 8 },
        { type: "starry_map:coil.steel_rock_eutectic", amount: 8 },
        { type: "starry_map:steel_rock_eutectic", amount: 8 },
        { type: "starry_map:chorus_picture", amount: 1 },
    ],
    attrition: [
        { type: "starry_map:faerie_contract", amount: 1 },
    ],
    rely: [
        'trophy:stage_1.contract.crystal',
        'trophy:stage_3',
    ],
    onDone: [
        'trophy:stage_4',
        'trophy:stage_4.magic_crystal_books.faerie_contract'
    ]
});
entry.set('收集 精灵治愈', {
    texture: 'textures/物品贴图/魔法书籍/精灵治愈',
    refer: [
        { text: "『§l§m 任务 §r』§l:\n" },
        { text: "制作或获得<§l§u 精灵治愈 §r§l>§r\n\n" },
        { text: "『§l§s 奖励 §r』§l:\n" },
        { text: "<§l§u 百灵绘卷 §r§l><§l§2 8 §9x§u 钢岩合金-套装 §r§l>§r" }
    ],
    reward: [
        { type: "starry_map:wafer.steel_rock_eutectic", amount: 8 },
        { type: "starry_map:coil.steel_rock_eutectic", amount: 8 },
        { type: "starry_map:steel_rock_eutectic", amount: 8 },
        { type: "starry_map:chorus_picture", amount: 1 },
    ],
    attrition: [
        { type: "starry_map:faerie_healing", amount: 1 },
    ],
    rely: [
        'trophy:stage_1.contract.crystal',
        'trophy:stage_3',
    ],
    onDone: [
        'trophy:stage_4',
        'trophy:stage_4.magic_crystal_books.faerie_healing'
    ]
});
entry.set('收集 空间宝典', {
    texture: 'textures/物品贴图/魔法书籍/空间宝典',
    refer: [
        { text: "『§l§m 任务 §r』§l:\n" },
        { text: "制作或获得<§l§u 空间宝典 §r§l>§r\n\n" },
        { text: "『§l§s 奖励 §r』§l:\n" },
        { text: "<§l§u 百灵绘卷 §r§l><§l§2 8 §9x§u 钢岩合金-套装 §r§l>§r" }
    ],
    reward: [
        { type: "starry_map:wafer.steel_rock_eutectic", amount: 8 },
        { type: "starry_map:coil.steel_rock_eutectic", amount: 8 },
        { type: "starry_map:steel_rock_eutectic", amount: 8 },
        { type: "starry_map:chorus_picture", amount: 1 },
    ],
    attrition: [
        { type: "starry_map:space_transition", amount: 1 },
    ],
    rely: [
        'trophy:stage_1.contract.crystal',
        'trophy:stage_3',
    ],
    onDone: [
        'trophy:stage_4',
        'trophy:stage_4.magic_crystal_books.space_transition'
    ]
});
entry.set('收集 矿物辞典', {
    texture: 'textures/物品贴图/魔法书籍/矿物辞典',
    refer: [
        { text: "『§l§m 任务 §r』§l:\n" },
        { text: "制作或获得<§l§u 矿物辞典 §r§l>§r\n\n" },
        { text: "『§l§s 奖励 §r』§l:\n" },
        { text: "<§l§u 百灵绘卷 §r§l><§l§2 8 §9x§u 钢岩合金-套装 §r§l>§r" }
    ],
    reward: [
        { type: "starry_map:wafer.steel_rock_eutectic", amount: 8 },
        { type: "starry_map:coil.steel_rock_eutectic", amount: 8 },
        { type: "starry_map:steel_rock_eutectic", amount: 8 },
        { type: "starry_map:chorus_picture", amount: 1 },
    ],
    attrition: [
        { type: "starry_map:mineral_dictionary", amount: 1 },
    ],
    rely: [
        'trophy:stage_1.contract.crystal',
        'trophy:stage_3',
    ],
    onDone: [
        'trophy:stage_4',
        'trophy:stage_4.magic_crystal_books.mineral_dictionary'
    ]
});
entry.set('收集 林业指南', {
    texture: 'textures/物品贴图/魔法书籍/林业指南',
    refer: [
        { text: "『§l§m 任务 §r』§l:\n" },
        { text: "制作或获得<§l§u 林业指南 §r§l>§r\n\n" },
        { text: "『§l§s 奖励 §r』§l:\n" },
        { text: "<§l§u 百灵绘卷 §r§l><§l§2 8 §9x§u 钢岩合金-套装 §r§l>§r" }
    ],
    reward: [
        { type: "starry_map:wafer.steel_rock_eutectic", amount: 8 },
        { type: "starry_map:coil.steel_rock_eutectic", amount: 8 },
        { type: "starry_map:steel_rock_eutectic", amount: 8 },
        { type: "starry_map:chorus_picture", amount: 1 },
    ],
    attrition: [
        { type: "starry_map:forestry_guidelines", amount: 1 },
    ],
    rely: [
        'trophy:stage_1.contract.crystal',
        'trophy:stage_3',
    ],
    onDone: [
        'trophy:stage_4',
        'trophy:stage_4.magic_crystal_books.forestry_guidelines'
    ]
});
entry.set('收集 魔导手册', {
    texture: 'textures/物品贴图/魔法书籍/魔导手册',
    refer: [
        { text: "『§l§m 任务 §r』§l:\n" },
        { text: "制作或获得<§l§u 魔导手册 §r§l>§r\n\n" },
        { text: "『§l§s 奖励 §r』§l:\n" },
        { text: "<§l§u 百灵绘卷 §r§l><§l§2 8 §9x§u 钢岩合金-套装 §r§l>§r" }
    ],
    reward: [
        { type: "starry_map:wafer.steel_rock_eutectic", amount: 8 },
        { type: "starry_map:coil.steel_rock_eutectic", amount: 8 },
        { type: "starry_map:steel_rock_eutectic", amount: 8 },
        { type: "starry_map:chorus_picture", amount: 1 },
    ],
    attrition: [
        { type: "starry_map:magic_handbook", amount: 1 },
    ],
    rely: [
        'trophy:stage_1.contract.crystal',
        'trophy:stage_3',
    ],
    onDone: [
        'trophy:stage_4',
        'trophy:stage_4.magic_crystal_books.magic_handbook'
    ],
    prompt: '魔导工业的启动基础'
});
entry.set('收集 魔导绪论', {
    texture: 'textures/物品贴图/魔法书籍/魔导绪论',
    refer: [
        { text: "『§l§m 任务 §r』§l:\n" },
        { text: "制作或获得<§l§u 魔导绪论 §r§l>§r\n\n" },
        { text: "『§l§s 奖励 §r』§l:\n" },
        { text: "<§l§u 百灵绘卷 §r§l><§l§2 8 §9x§u 钢岩合金-套装 §r§l>§r" }
    ],
    reward: [
        { type: "starry_map:wafer.steel_rock_eutectic", amount: 8 },
        { type: "starry_map:coil.steel_rock_eutectic", amount: 8 },
        { type: "starry_map:steel_rock_eutectic", amount: 8 },
        { type: "starry_map:chorus_picture", amount: 1 },
    ],
    attrition: [
        { type: "starry_map:introduction_magic", amount: 1 },
    ],
    rely: [
        'trophy:stage_1.contract.crystal',
        'trophy:stage_3',
    ],
    onDone: [
        'trophy:stage_4',
        'trophy:stage_4.magic_crystal_books.introduction_magic'
    ],
    prompt: '魔导工业的启动基础'
});
entry.set('收集 农业纲目', {
    texture: 'textures/物品贴图/魔法书籍/农业纲目',
    refer: [
        { text: "『§l§m 任务 §r』§l:\n" },
        { text: "制作或获得<§l§u 农业纲目 §r§l>§r\n\n" },
        { text: "『§l§s 奖励 §r』§l:\n" },
        { text: "<§l§u 百灵绘卷 §r§l><§l§2 8 §9x§u 钢岩合金-套装 §r§l>§r" }
    ],
    reward: [
        { type: "starry_map:wafer.steel_rock_eutectic", amount: 8 },
        { type: "starry_map:coil.steel_rock_eutectic", amount: 8 },
        { type: "starry_map:steel_rock_eutectic", amount: 8 },
        { type: "starry_map:chorus_picture", amount: 1 },
    ],
    attrition: [
        { type: "starry_map:agriculture_handle", amount: 1 },
    ],
    rely: [
        'trophy:stage_1.contract.crystal',
        'trophy:stage_3',
    ],
    onDone: [
        'trophy:stage_4',
        'trophy:stage_4.magic_crystal_books.agriculture_handle'
    ]
});
entry.set('收集 源能秘典', {
    texture: 'textures/物品贴图/魔法书籍/源能秘典',
    refer: [
        { text: "『§l§m 任务 §r』§l:\n" },
        { text: "制作或获得<§l§u 源能秘典 §r§l>§r\n\n" },
        { text: "『§l§s 奖励 §r』§l:\n" },
        { text: "<§l§u 百灵绘卷 §r§l><§l§2 8 §9x§u 钢岩合金-套装 §r§l>§r" }
    ],
    reward: [
        { type: "starry_map:wafer.steel_rock_eutectic", amount: 8 },
        { type: "starry_map:coil.steel_rock_eutectic", amount: 8 },
        { type: "starry_map:steel_rock_eutectic", amount: 8 },
        { type: "starry_map:chorus_picture", amount: 1 },
    ],
    attrition: [
        { type: "starry_map:source_energy", amount: 1 },
    ],
    rely: [
        'trophy:stage_1.contract.crystal',
        'trophy:stage_3',
    ],
    onDone: [
        'trophy:stage_4',
        'trophy:stage_4.magic_crystal_books.source_energy'
    ],
    prompt: '魔导工业的启动基础'
});
entry.set('收集 战术规划', {
    texture: 'textures/物品贴图/魔法书籍/战术规划',
    refer: [
        { text: "『§l§m 任务 §r』§l:\n" },
        { text: "制作或获得<§l§u 战术规划 §r§l>§r\n\n" },
        { text: "『§l§s 奖励 §r』§l:\n" },
        { text: "<§l§u 百灵绘卷 §r§l><§l§2 8 §9x§u 钢岩合金-套装 §r§l>§r" }
    ],
    reward: [
        { type: "starry_map:wafer.steel_rock_eutectic", amount: 8 },
        { type: "starry_map:coil.steel_rock_eutectic", amount: 8 },
        { type: "starry_map:steel_rock_eutectic", amount: 8 },
        { type: "starry_map:chorus_picture", amount: 1 },
    ],
    attrition: [
        { type: "starry_map:tactical_planning", amount: 1 },
    ],
    rely: [
        'trophy:stage_1.contract.crystal',
        'trophy:stage_3',
    ],
    onDone: [
        'trophy:stage_4',
        'trophy:stage_4.magic_crystal_books.tactical_planning'
    ]
});
entry.set('至纯 魔晶铠甲', {
    texture: 'textures/物品贴图/魔晶铠甲/至纯',
    refer: [
        { text: "『§l§m 任务 §r』§l:\n" },
        { text: "制作或获得<§l§u 至纯魔晶铠甲 §r§l>§r\n\n" },
        { text: "『§l§s 奖励 §r』§l:\n" },
        { text: "<§l§u 至纯魔晶铠甲 §r§l><§l§u 百灵绘卷 §r§l><§l§2 3 §9x§u 参悟之石 §r§l>§r" }
    ],
    reward: [
        { type: "starry_map:enlightenment", amount: 3 },
        { type: "starry_map:chorus_picture", amount: 1 },
        { type: "starry_map:complete_armor", amount: 1 }
    ],
    attrition: [
        { type: "starry_map:complete_armor", amount: 1 }
    ],
    rely: [
        'trophy:stage_0.super_wasp_cluster_raid',
        'trophy:stage_1.contract.moonlight',
        'trophy:stage_1.contract.crystal',
        'trophy:stage_3',
    ],
    onDone: [
        'trophy:stage_4',
        'trophy:stage_4.magic_crystal_armor_lv5'
    ]
});
/*
 * 探索环境
 */
entry.set('抵达 终末之地', {
    texture: 'textures/blocks/end_stone',
    refer: [
        { text: "『§l§m 任务 §r』§l:\n" },
        { text: '获得§2 32 §r个<§t 末地石 §r>证明曾抵达<§t 末地 §r>\n\n' },
        { text: "『§l§s 奖励 §r』§l:\n" },
        { text: "<§l§2 2 §9x§u 诸界道标 §r§l><§l§u 百灵绘卷 §r§l>§r" }
    ],
    reward: [
        { type: "starry_map:chorus_picture", amount: 1 },
        { type: "starry_map:road_sign_presets", amount: 2 }
    ],
    attrition: [
        { type: "minecraft:end_stone", amount: 32 },
    ],
    rely: [
        'trophy:stage_0.ender_dragon_scales',
        'trophy:stage_4'
    ],
    onDone: [
        'trophy:stage_5',
        'trophy:stage_5.arrival.the_end'
    ]
});
entry.set('抵达 猩红深界', {
    texture: 'textures/blocks/netherrack',
    refer: [
        { text: "『§l§m 任务 §r』§l:\n" },
        { text: '获得§2 32 §r个<§t 下界岩 §r>证明曾抵达<§t 下界 §r>\n\n' },
        { text: "『§l§s 奖励 §r』§l:\n" },
        { text: "<§l§2 2 §9x§u 诸界道标 §r§l><§l§u 百灵绘卷 §r§l>§r" }
    ],
    reward: [
        { type: "starry_map:chorus_picture", amount: 1 },
        { type: "starry_map:road_sign_presets", amount: 2 }
    ],
    attrition: [
        { type: "minecraft:netherrack", amount: 32 }
    ],
    rely: [
        'trophy:stage_0.ender_dragon_scales',
        'trophy:stage_4'
    ],
    onDone: [
        'trophy:stage_5',
        'trophy:stage_5.arrival.nether'
    ]
});
entry.set('抵达 海洋神殿', {
    texture: 'textures/blocks/prismarine_bricks',
    refer: [
        { text: "『§l§m 任务 §r』§l:\n" },
        { text: '获得§2 32 §r个<§t 海晶石 §r>证明曾抵达<§t 海洋神殿 §r>\n\n' },
        { text: "『§l§s 奖励 §r』§l:\n" },
        { text: "<§l§2 2 §9x§u 诸界道标 §r§l><§l§u 百灵绘卷 §r§l>§r" }
    ],
    reward: [
        { type: "starry_map:chorus_picture", amount: 1 },
        { type: "starry_map:road_sign_presets", amount: 2 }
    ],
    attrition: [
        { type: "minecraft:prismarine", amount: 32 }
    ],
    rely: [
        'trophy:stage_0.ender_dragon_scales',
        'trophy:stage_4'
    ],
    onDone: [
        'trophy:stage_5',
        'trophy:stage_5.arrival.ocean'
    ]
});
entry.set('抵达 深暗之地', {
    texture: 'textures/blocks/sculk_catalyst_side',
    refer: [
        { text: "『§l§m 任务 §r』§l:\n" },
        { text: '获得§2 32 §r个<§t 幽匿块 §r>证明曾抵达<§t 深谙之地 §r>\n\n' },
        { text: "『§l§s 奖励 §r』§l:\n" },
        { text: "<§l§2 2 §9x§u 诸界道标 §r§l><§l§u 百灵绘卷 §r§l>§r" }
    ],
    reward: [
        { type: "starry_map:chorus_picture", amount: 1 },
        { type: "starry_map:road_sign_presets", amount: 2 }
    ],
    attrition: [
        { type: "minecraft:sculk", amount: 32 },
    ],
    rely: [
        'trophy:stage_0.ender_dragon_scales',
        'trophy:stage_4'
    ],
    onDone: [
        'trophy:stage_5',
        'trophy:stage_5.arrival.sculk'
    ]
});
entry.set('收集 富氧金矿', {
    texture: 'textures/方块贴图/富氧金矿',
    refer: [
        { text: "『§l§m 任务 §r』§l:\n" },
        { text: "制作或获得<§l§u 富氧金矿 §r§l>§r\n\n" },
        { text: "『§l§s 奖励 §r』§l:\n" },
        { text: "<§l§u 机械框架 §r§l>§r" }
    ],
    reward: [
        { type: "starry_map:universal_mechanical_framework", amount: 1 },
    ],
    attrition: [
        { type: "starry_map:mine.oxygen_enriched_gold", amount: 1 },
    ],
    rely: [
        'trophy:stage_4'
    ],
    onDone: [
        'trophy:stage_5.mineral_blocks.oxygen_enriched_gold'
    ]
});
entry.set('收集 磷酸铁矿', {
    texture: 'textures/方块贴图/磷酸铁矿',
    refer: [
        { text: "『§l§m 任务 §r』§l:\n" },
        { text: "制作或获得<§l§u 磷酸铁矿 §r§l>§r\n\n" },
        { text: "『§l§s 奖励 §r』§l:\n" },
        { text: "<§l§u 机械框架 §r§l>§r" }
    ],
    reward: [
        { type: "starry_map:universal_mechanical_framework", amount: 1 },
    ],
    attrition: [
        { type: "starry_map:mine.ferric_phosphate", amount: 1 },
    ],
    rely: [
        'trophy:stage_4'
    ],
    onDone: [
        'trophy:stage_5.mineral_blocks.ferric_phosphate'
    ]
});
entry.set('收集 铝镁金矿', {
    texture: 'textures/方块贴图/铝镁金矿',
    refer: [
        { text: "『§l§m 任务 §r』§l:\n" },
        { text: "制作或获得<§l§u 铝镁金矿 §r§l>§r\n\n" },
        { text: "『§l§s 奖励 §r』§l:\n" },
        { text: "<§l§u 机械框架 §r§l>§r" }
    ],
    reward: [
        { type: "starry_map:universal_mechanical_framework", amount: 1 },
    ],
    attrition: [
        { type: "starry_map:mine.aluminum_magnesium", amount: 1 },
    ],
    rely: [
        'trophy:stage_4'
    ],
    onDone: [
        'trophy:stage_5.mineral_blocks.aluminum_magnesium'
    ]
});
entry.set('收集 氯化铁矿', {
    texture: 'textures/方块贴图/氯化铁矿',
    refer: [
        { text: "『§l§m 任务 §r』§l:\n" },
        { text: "制作或获得<§l§u 氯化铁矿 §r§l>§r\n\n" },
        { text: "『§l§s 奖励 §r』§l:\n" },
        { text: "<§l§u 机械框架 §r§l>§r" }
    ],
    reward: [
        { type: "starry_map:universal_mechanical_framework", amount: 1 },
    ],
    attrition: [
        { type: "starry_map:mine.ferric_chloride", amount: 1 },
    ],
    rely: [
        'trophy:stage_4'
    ],
    onDone: [
        'trophy:stage_5.mineral_blocks.ferric_chloride'
    ]
});
entry.set('收集 碳化锆矿', {
    texture: 'textures/方块贴图/碳化锆矿',
    refer: [
        { text: "『§l§m 任务 §r』§l:\n" },
        { text: "制作或获得<§l§u 碳化锆矿 §r§l>§r\n\n" },
        { text: "『§l§s 奖励 §r』§l:\n" },
        { text: "<§l§u 机械框架 §r§l>§r" }
    ],
    reward: [
        { type: "starry_map:universal_mechanical_framework", amount: 1 },
    ],
    attrition: [
        { type: "starry_map:mine.zirconium_carbide", amount: 1 },
    ],
    rely: [
        'trophy:stage_4'
    ],
    onDone: [
        'trophy:stage_5.mineral_blocks.zirconium_carbide'
    ]
});
entry.set('收集 碳酸金矿', {
    texture: 'textures/方块贴图/碳酸金矿',
    refer: [
        { text: "『§l§m 任务 §r』§l:\n" },
        { text: "制作或获得<§l§u 碳酸金矿 §r§l>§r\n\n" },
        { text: "『§l§s 奖励 §r』§l:\n" },
        { text: "<§l§u 机械框架 §r§l>§r" }
    ],
    reward: [
        { type: "starry_map:universal_mechanical_framework", amount: 1 },
    ],
    attrition: [
        { type: "starry_map:mine.gold_carbonate", amount: 1 },
    ],
    rely: [
        'trophy:stage_4'
    ],
    onDone: [
        'trophy:stage_5.mineral_blocks.gold_carbonate'
    ]
});
entry.set('收集 碳酸锂矿', {
    texture: 'textures/方块贴图/碳酸锂矿',
    refer: [
        { text: "『§l§m 任务 §r』§l:\n" },
        { text: "制作或获得<§l§u 碳酸锂矿 §r§l>§r\n\n" },
        { text: "『§l§s 奖励 §r』§l:\n" },
        { text: "<§l§u 机械框架 §r§l>§r" }
    ],
    reward: [
        { type: "starry_map:universal_mechanical_framework", amount: 1 },
    ],
    attrition: [
        { type: "starry_map:mine.lithium_carbonate", amount: 1 },
    ],
    rely: [
        'trophy:stage_4'
    ],
    onDone: [
        'trophy:stage_5.mineral_blocks.lithium_carbonate'
    ]
});
entry.set('收集 钨镍钛矿', {
    texture: 'textures/方块贴图/钨镍钛矿',
    refer: [
        { text: "『§l§m 任务 §r』§l:\n" },
        { text: "制作或获得<§l§u 钨镍钛矿 §r§l>§r\n\n" },
        { text: "『§l§s 奖励 §r』§l:\n" },
        { text: "<§l§u 机械框架 §r§l>§r" }
    ],
    reward: [
        { type: "starry_map:universal_mechanical_framework", amount: 1 },
    ],
    attrition: [
        { type: "starry_map:mine.tungsten_nickel_titanium", amount: 1 },
    ],
    rely: [
        'trophy:stage_4'
    ],
    onDone: [
        'trophy:stage_5.mineral_blocks.tungsten_nickel_titanium'
    ]
});
entry.set('收集 锡钎铜矿', {
    texture: 'textures/方块贴图/锡钎铜矿',
    refer: [
        { text: "『§l§m 任务 §r』§l:\n" },
        { text: "制作或获得<§l§u 锡钎铜矿 §r§l>§r\n\n" },
        { text: "『§l§s 奖励 §r』§l:\n" },
        { text: "<§l§u 机械框架 §r§l>§r" }
    ],
    reward: [
        { type: "starry_map:universal_mechanical_framework", amount: 1 },
    ],
    attrition: [
        { type: "starry_map:mine.copper_tin_brazing", amount: 1 },
    ],
    rely: [
        'trophy:stage_4'
    ],
    onDone: [
        'trophy:stage_5.mineral_blocks.copper_tin_brazing'
    ]
});

/*
 * 原版接口
 */
/**
 * * 渊鲸 - 执行者
 *
 * @param {server.Entity} self - 自身
 *
 * @param {server.Entity} target - 目标
 *
 * @param {boolean} erupt - 是否暴击
 */
function Execute(self, target, erupt) {
    /**
     * * 鱼雷爆炸事件
     *
     * @param args - 附加参数
     */
    const powerExplode = (args) => {
        // 验证 实体状态 是否正确
        if (!self || !target || !self.isValid || !target.isValid)
            return;
        /**
         * * 过滤器参数
         */
        const options = {
            excludeTypes: ["minecraft:item", "minecraft:xp_orb", self.typeId],
            location: args.location,
            maxDistance: 6,
            closest: 8
        };
        /**
         * * 契约者标识符
         */
        const contract = self?.getDynamicProperty('entity:contract_user');
        /**
         * * 获取实体列表
         */
        const entitys = args.dimension.getEntities(options);
        // 过滤 契约者 与 锁定的目标
        entitys.filter(current => current.id !== contract && current.id !== self.id);
        // 创建 元素伤害
        entitys.forEach(current => ElementalAttack(self, current, erupt));
        // 创建 粒子效果
        TrySpawnParticle(args.dimension, 'constant:fireworks_fireball_rune_blue', args.location);
    };
    /**
     * * 计算目标位置
     */
    const targetLocation = Vector.add(target.location, Vector.CONSTANT_UP);
    /**
     * * 设定路径点列表
     */
    const locationGroup = [
        self.location,
        Vector.add(self.location, { x: 0, y: 5, z: 0 }),
        targetLocation
    ];
    // 创建 路径执行器
    PathExecute.Create('渊鲸潜艇-炮击射线', 1, {
        particles: ['constant:track_rune_blue'],
        locations: locationGroup,
        dimension: self.dimension,
        on_done: powerExplode,
        cooldown: 2,
        speed: 1
    });
}
/**
 * * 渊鲸 - 君临者
 *
 * @param {server.Entity} self - 自身
 *
 * @param {server.Entity} target - 目标
 *
 * @param {boolean} erupt - 是否暴击
 */
function Emperor$1(self, target, erupt) {
    /**
     * * 鱼雷爆炸事件
     *
     * @param args - 附加参数
     */
    const powerExplode = (args) => {
        // 验证 实体状态 是否正确
        if (!self || !target || !self.isValid || !target.isValid)
            return;
        /**
         * * 过滤器参数
         */
        const options = {
            excludeTypes: ["minecraft:item", "minecraft:xp_orb", self.typeId],
            location: args.location,
            maxDistance: 6,
            closest: 8
        };
        /**
         * * 获取实体列表
         */
        const entitys = args.dimension.getEntities(options).filter(current => current.id !== self.id);
        // 遍历实体队列
        entitys.forEach(current => {
            // 50% 概率触发 潮涌能量 效果
            if (IsEnable(50))
                current.addEffect('minecraft:conduit_power', 600, { showParticles: false });
            // 创建 元素伤害
            ElementalAttack(self, current, erupt);
            // 判断 是否存在 [ 君王圣裁 ]标记
            if (!current.getDynamicProperty('whale_adjudication') || !(current instanceof server.Player))
                return;
            // 为被命中的玩家附加 负面效果
            current.addEffect('minecraft:slowness', 150, { showParticles: false });
            current.addEffect('minecraft:weakness', 150, { showParticles: false });
            current.addEffect('minecraft:nausea', 150, { showParticles: false });
            current.addEffect('minecraft:wither', 150, { showParticles: false });
            current.addEffect('minecraft:hunger', 150, { showParticles: false });
            // 播放 音效
            current.playSound('mob.guardian.attack_loop');
            current.playSound('mob.elderguardian.curse');
            // 清除 [ 君王圣裁 ] 标记
            current.setDynamicProperty('whale_adjudication');
        });
        // 创建 粒子效果
        TrySpawnParticle(args.dimension, 'constant:fireworks_fireball_rune_blue', args.location);
    };
    // 创建 路径执行器
    PathExecute.Create('渊鲸潜艇-炮击射线', 1, {
        particles: ['constant:track_rune_blue'],
        locations: [],
        dimension: self.dimension,
        on_done: powerExplode,
        cooldown: 1,
        speed: 4,
        shoot: {
            start_place: self.getHeadLocation(),
            toward: Vector.difference(self.location, target.location),
            max_distance: Vector.distance(self.location, target.location)
        }
    });
}

/*
 * 系统组件
 */
/**
 * * 蝰蛇 - 维系者
 *
 * @param {server.Entity} self - 自身
 *
 * @param {server.Entity} target - 目标
 */
function Support$1(self, target) {
    /**
     * * 爆炸事件
     *
     * @param args - 附加参数
     */
    const powerExplode = (args) => {
        // 验证 实体状态 是否正确
        if (!self || !target || !self.isValid || !target.isValid)
            return;
        /**
         * * 过滤器参数
         */
        const options = {
            excludeTypes: ["minecraft:item", "minecraft:xp_orb", self.typeId],
            excludeFamilies: ['abyss'],
            location: args.location,
            maxDistance: 3,
            closest: 4
        };
        /**
         * * 获取实体列表
         */
        const entitys = args.dimension.getEntities(options);
        // 创建 元素伤害
        entitys.forEach(entity => {
            /**
             * * 是否暴击
             */
            const erupt = IsErupt(self);
            // 对目标施加一次击退
            BackoffByDistance(self, entity);
            // 创建 元素攻击
            ElementalAttack(self, entity, erupt);
        });
        TrySpawnParticle(args.dimension, 'constant:excite_rune_orange', args.location);
    };
    /**
     * * 计算目标位置
     */
    const targetLocation = Vector.add(target.location, Vector.CONSTANT_UP);
    // 创建 路径
    PathExecute.Create('蝰蛇维系者-炮击轨迹', 1, {
        locations: [self.getHeadLocation(), targetLocation],
        particles: ['constant:track_rune_orange'],
        dimension: self.dimension,
        on_done: powerExplode,
        cooldown: 1,
        speed: 1
    });
}
/**
 * * 星图阵营 蝰蛇族 技能处理
 *
 * 对指定目标进行攻击, 并在爆炸事件中对周围怪物造成伤害
 *
 * @param {server.Entity} self - 施放技能的实体
 * @param {server.Entity} target - 攻击目标实体
 */
function StarryFamily(self, target) {
    /**
     * 处理爆炸事件
     *
     * 对周围怪物造成伤害, 并创建粒子效果
     *
     * @param {type.ROUTE_ANNEX_ARGS} args - 附加参数
     */
    const powerExplode = (args) => {
        /**
         * 定义查询过滤器参数
         */
        const options = {
            families: ['monster'],
            location: args.location,
            maxDistance: 4,
            closest: 4
        };
        /**
         * 获取契约者标识符
         */
        const contract = self.getDynamicProperty('entity:contract_user');
        /**
         * 获取实体列表
         */
        const entitys = args.dimension.getEntities(options);
        /**
         * 判断是否发生暴击
         */
        const erupt = IsErupt(self);
        // 过滤 契约者 与 锁定的目标 并 结算范围伤害
        entitys
            .filter(point => point.id !== contract)
            .filter(point => point.id !== target.id)
            .forEach(entity => {
            // 对目标实体施加击退效果
            BackoffByDistance(self, entity);
            // 创建元素伤害
            ElementalAttack(self, entity, erupt);
        });
        // 对主要目标单独结算一次伤害
        ElementalAttack(self, target, erupt);
        // 创建粒子效果
        TrySpawnParticle(args.dimension, 'constant:excite_rune_orange', args.location);
    };
    /**
     * 配置速度
     *
     * 根据不同的实体类型返回不同的速度值
     *
     * @param {server.Entity} self - 实体
     *
     * @returns {number} 速度值
     */
    const SpeedConfigure = (self) => {
        switch (self.typeId) {
            case 'starry_map:viper.spirit_lizard': return 3;
            default: return 1;
        }
    };
    /**
     * * 计算目标位置
     */
    const targetLocation = Vector.add(target.location, Vector.CONSTANT_UP);
    // 创建路径并执行
    PathExecute.Create(self.typeId + '-炮击轨迹', 1, {
        locations: [self.getHeadLocation(), targetLocation],
        particles: ['constant:track_rune_orange'],
        dimension: self.dimension,
        on_done: powerExplode,
        cooldown: 1,
        speed: SpeedConfigure(self)
    });
}

/*
 * 原版接口
 */
/**
 * * 野蜂 - 侦查者
 *
 * @param {server.Entity} self - 自身
 *
 * @param {server.Entity} target - 目标
 */
function Detection(self, target) {
    /**
     * * 实体查询选项
     */
    const options = {
        location: self.location,
        families: ['wasp'],
        maxDistance: 32
    };
    /**
     * * 获取实体列表
     */
    const entitys = self.dimension.getEntities(options);
    /**
     * * 计算目标位置
     */
    const targetLocation = Vector.add(target.location, Vector.CONSTANT_UP);
    // 提供增幅
    entitys.forEach(entity => AlterProperty(entity, { raise_erupt_odds: 10 }));
    // 创建 路径
    PathExecute.Create('野蜂侦查者-炮击轨迹', 1, {
        locations: [self.getHeadLocation(), targetLocation],
        particles: ['constant:track_' + GetProperty(self).self_rune],
        dimension: self.dimension,
        on_done: CreateWaspPowerExplode(self, target),
        cooldown: 1,
        speed: 1,
    });
}
/**
 * * 野蜂 - 维系者
 *
 * @param {server.Entity} self - 自身
 */
function Support(self) {
    /**
     * * 实体查询选项
     */
    const options = {
        location: self.location,
        families: ['wasp'],
        maxDistance: 64
    };
    /**
     * * 获取实体列表
     */
    const entitys = self.dimension.getEntities(options);
    // 判断实体是否存在
    if (entitys.length == 0)
        return;
    // 野蜂机群恢复生命值
    entitys.forEach(entity => {
        /**
         * * 当前生命值
         */
        const health = entity.getComponent('health');
        health?.setCurrentValue(health.currentValue + Random({ min: 4, max: 40 }, true));
    });
}
/**
 * 君临者野蜂的特殊攻击行为
 * 该函数定义了君临者野蜂的攻击方式, 包括增加属性增幅, 创建攻击路径, 并管理充能值
 *
 * @param {server.Entity} self - 代表君临者野蜂自身的实体对象
 *
 * @param {server.Entity} target - 代表被攻击目标的实体对象
 */
function Emperor(self, target) {
    /**
     * 获取君临者野蜂的当前充能值
     * 如果没有设置充能值, 则默认为0
     */
    const energy = self.getDynamicProperty('wasp_emperor:energy') ?? 0;
    /**
     * * 计算目标位置
     */
    const targetLocation = Vector.add(target.location, Vector.CONSTANT_UP);
    // 增加属性增幅, 提高暴击率和暴击伤害
    AlterProperty(self, { raise_erupt_odds: 50, raise_erupt_hurt: 150 });
    // 创建攻击路径, 包括轨迹效果和粒子展示
    PathExecute.Create('野蜂君临者-炮击轨迹', 1, {
        locations: [self.getHeadLocation(), targetLocation], // 起始和目标位置
        particles: ['constant:track_rune_red'], // 轨迹粒子效果
        dimension: self.dimension, // 攻击发生的维度
        on_done: CreateWaspPowerExplode(self, target), // 轨迹完成后的回调函数
        cooldown: 1, // 冷却时间
        speed: 1, // 轨迹速度
    });
    // 更新君临者野蜂的充能值
    self.setDynamicProperty('wasp_emperor:energy', energy + 1);
}
/**
 * * 野蜂 - 领航者
 *
 * @param {server.Entity} self - 自身
 */
function Guide(self) {
    /**
     * * 过滤器参数
     */
    const options = {
        excludeTypes: ["minecraft:item", "minecraft:xp_orb", self.typeId],
        excludeFamilies: ['abyss'],
        location: self.location,
        maxDistance: 64
    };
    /**
     * * 获取实体列表
     */
    const entitys = self.dimension.getEntities(options);
    /**
     * * 获取 当前生命值
     */
    const health = self.getComponent('health')?.currentValue ?? 10;
    /**
     * * 获取 状态数据
     */
    const state = MergeProperty(GetProperty(self), { raise_basic_attack: health });
    // 创建 元素伤害
    entitys.forEach(entity => {
        /**
         * * 是否暴击
         */
        const erupt = IsErupt(self);
        ElementalAttack(self, entity, erupt, state);
        TrySpawnParticle(self.dimension, 'constant:erupt_rune_red', self.location);
    });
    // 创建 粒子效果
    TrySpawnParticle(self.dimension, 'constant:fireworks_fireball_rune_red', self.getHeadLocation());
    TrySpawnParticle(self.dimension, 'constant:fireworks_paper_rune_red', self.getHeadLocation());
    self.dimension.playSound('random.explode', self.location);
    server.system.runTimeout(() => self?.remove(), 5);
}
/**
 * 创建野蜂力量爆炸效果的函数
 * 该函数会在野蜂攻击命中目标时触发, 造成范围内的元素伤害, 并显示粒子效果
 *
 * @param {server.Entity} self - 野蜂实体自身
 *
 * @param {server.Entity} target - 野蜂攻击的目标实体
 *
 * @returns {(data: type.ROUTE_ANNEX_ARGS) => void} 返回一个处理爆炸事件的函数, 该函数接受一个ROUTE_ANNEX_ARGS参数
 */
function CreateWaspPowerExplode(self, target) {
    // 野蜂攻击命中的爆炸事件处理函数
    return (args) => {
        // 检查实体self和target是否有效, 如果无效则直接返回
        if (!self || !target || !self.isValid || !target.isValid)
            return;
        /**
         * 定义实体查询的过滤器参数
         */
        const options = {
            // 排除特定类型的实体, 如掉落物, 经验球和自身类型
            excludeTypes: ["minecraft:item", "minecraft:xp_orb", self.typeId],
            // 排除来自深渊家族的实体
            excludeFamilies: ['abyss'],
            // 设置查询位置
            location: args.location,
            // 设置最大查询距离
            maxDistance: 4,
            // 设置最多查询到的实体数量
            closest: 4
        };
        /**
         * 根据过滤器参数获取周围的实体列表
         */
        const entitys = args.dimension.getEntities(options);
        // 遍历实体列表, 对每个实体造成元素伤害
        entitys.forEach(entity => {
            /**
             * 判断本次攻击是否触发暴击
             */
            const erupt = IsErupt(self);
            // 根据暴击情况创建符文力量攻击效果
            ElementalAttack(self, entity, erupt);
        });
        // 在攻击命中的位置创建红色符文烟雾粒子效果
        TrySpawnParticle(args.dimension, 'constant:smoke_rune_red', args.location);
    };
}

/*
 * 原版接口
 */
/**
 * * 领航者 默认攻击 事件
 *
 * @param {server.Entity} self - 自身
 *
 * @param {server.Entity} target - 目标实体对象
 *
 * @param {boolean} erupt - 是否暴击
 *
 * @param {type.GET_PROPERTY_PANEL} property - 属性对象
 */
function DefaultAttack(self, target, erupt, property) {
    /**
     * * 当前生命值
     */
    const health = self.getComponent('health');
    /**
     * * 合并属性
     */
    const mergeData = MergeProperty(property, { basic_attack: property.basic_attack * 1.5 });
    // 判断实体是否存活
    if (!health)
        return;
    // 判断生命值是否低于 50%
    switch (HealthBelow(health, 0.5)) {
        //* 当前生命值低于 50%
        case true:
            AttackAfter(self, target, erupt, mergeData);
            break;
        //* 当前生命值高于 50%
        default:
            AttackAfter(self, target, erupt, property);
            break;
    }
}
/**
 * * 绯红 攻击事件
 *
 * @param {server.Entity} self - 自身
 *
 * @param {server.Entity} target - 目标实体对象
 *
 * @param {boolean} erupt - 是否暴击
 *
 * @param {type.GET_PROPERTY_PANEL} property - 属性对象
 */
function Crimson(self, target, erupt, property) {
    /**
     * * 当前生命值
     */
    const selfHealth = self.getComponent('health');
    /**
     * * 合并属性
     */
    const mergeData = MergeProperty(property, { basic_attack: property.basic_attack * 0.5 });
    // 判断实体是否存活
    if (!selfHealth)
        return;
    // 暴击率增加 20%
    mergeData.raise_erupt_odds += 20;
    // 为 队友 添加 治疗效果
    GetPartner(self, entity => {
        /**
         * * 基础治疗量
         */
        const value = Math.floor(property.erupt_odds * 0.5);
        /**
         * * 当前生命值
         */
        const health = entity.getComponent('health');
        // 恢复生命值
        health?.setCurrentValue(health.currentValue + value);
        // 赋予 伤害吸收 效果
        if (HealthBelow(selfHealth, 0.32))
            entity.addEffect('minecraft:absorption', 640, { amplifier: 9, showParticles: false });
    });
    // 执行 攻击事件 后处理
    AttackAfter(self, target, erupt, mergeData);
}
/**
 * * 森涅 攻击事件
 *
 * @param {server.Entity} self - 自身
 *
 * @param {server.Entity} target - 目标实体对象
 *
 * @param {boolean} erupt - 是否暴击
 *
 * @param {type.GET_PROPERTY_PANEL} property - 属性对象
 */
function SenNie(self, target, erupt, property) {
    /**
     * * 技能能量值
     */
    const energy = self.getDynamicProperty('power_energy:SenNie') ?? 0;
    /**
     * * 伤害提升值
     */
    const advance = self.getDynamicProperty('power_advance:SenNie') ?? 0;
    /**
     * * 合并属性
     */
    const mergeData = MergeProperty(property, { basic_attack: property.erupt_hurt * 0.35, double_damage: property.erupt_odds / 10 });
    /**
     * * 充能值
     */
    const charge = energy + RandomFloor(1, 5);
    // 显示充能等级
    NumberParticleDisplay(self, charge, Vector.CONSTANT_UP);
    // 获得 攻击提升效果
    property.damage_increase += advance;
    // 普通攻击
    if (energy < 15) {
        self.setDynamicProperty('power_energy:SenNie', charge);
        AttackAfter(self, target, erupt, property);
    }
    // 强化攻击
    else {
        self.setDynamicProperty('power_advance:SenNie', ((property.erupt_hurt * 0.35) * (property.erupt_odds / 10)) * 0.2);
        TrySpawnParticle(self.dimension, 'constant:pulse_rune_green', self.getHeadLocation());
        self.setDynamicProperty('power_energy:SenNie', 0);
        AttackAfter(self, target, erupt, mergeData);
    }
}
/**
 * * 星砂 攻击事件
 *
 * @param {server.Entity} self - 自身
 *
 * @param {server.Entity} target - 目标实体对象
 *
 * @param {boolean} erupt - 是否暴击
 *
 * @param {type.GET_PROPERTY_PANEL} property - 属性对象
 */
function StarSand(self, target, erupt, property) {
    /**
     * * 技能能量值
     */
    const energy = self.getDynamicProperty('power_energy:StarSand') ?? 0;
    /**
     * * 合并属性
     */
    const mergeData = MergeProperty(property, { basic_attack: property.basic_attack * 0.5 });
    // 判断是否触发 暴击攻击
    if (erupt) {
        /**
         * * 合并属性 - 暴击后 额外提升
         */
        const mergeDataErupt = MergeProperty(mergeData, { raise_basic_attack: property.erupt_hurt * 0.5, raise_erupt_hurt: energy * 200 });
        // 执行 攻击事件 后处理
        TrySpawnParticle(self.dimension, 'constant:pulse_rune_red', self.getHeadLocation());
        self.setDynamicProperty('power_energy:StarSand', 0);
        AttackAfter(self, target, erupt, mergeDataErupt);
    }
    else {
        if (energy < 5)
            self.setDynamicProperty('power_energy:StarSand', energy + 1);
        target.addEffect('minecraft:slowness', 80, { amplifier: 32, showParticles: false });
        AttackAfter(self, target, erupt, mergeData);
    }
    // 显示充能等级
    NumberParticleDisplay(self, energy, Vector.CONSTANT_UP);
}
/**
 * * 月华 攻击事件
 *
 * @param {server.Entity} self - 自身
 *
 * @param {server.Entity} target - 目标实体对象
 *
 * @param {boolean} erupt - 是否暴击
 *
 * @param {type.GET_PROPERTY_PANEL} property - 属性对象
 */
function MoonLight(self, target, erupt, property) {
    /**
     * * 生命值组件
     */
    const health = self.getComponent('health');
    /**
     * * 定义 粒子参数
     */
    const molang = new server.MolangVariableMap();
    // 判断月华是否存活
    if (!health)
        return;
    // 触发 低血量时 的 增幅效果
    if (HealthBelow(health, 0.1))
        AlterProperty(self, { raise_basic_attack: property.erupt_hurt * 0.6 });
    // 触发 提升效果
    AlterProperty(self, { raise_basic_attack: property.erupt_odds * 2 });
    /**
     * * 合并属性
     */
    const mergeData = MergeProperty(GetProperty(self), { basic_attack: property.basic_attack * 0.5 });
    // 创建 元素攻击
    ElementalAttack(self, target, erupt, mergeData);
    // 生命值低于 10% 时 增加 生命值 否则 减少 生命值
    if (HealthBelow(health, 0.1))
        health?.setCurrentValue(health.currentValue + 50);
    else
        health?.setCurrentValue(Math.floor(health.currentValue * 0.85));
    // 创建战斗奖励
    CreateReward(self, target);
    // 设置 粒子参数
    molang.setColorRGB('variable.color', getRuneColor(mergeData.self_rune));
    molang.setVector3('variable.direction', Vector.CONSTANT_DOWN);
    molang.setFloat('variable.range', 5);
    molang.setFloat('variable.type', 0);
    // 播放 粒子效果
    TrySpawnParticle(self.dimension, 'scripts:path_spurt', Vector.add(target.location, { x: 0, y: 4, z: 0 }), molang);
    // 获取并治疗队友
    if (IsEnable(10))
        getAndTreatPartner(self, property);
}
/**
 * * 琉璃 攻击事件
 *
 * @param {server.Entity} self - 自身
 *
 * @param {server.Entity} target - 目标实体对象
 *
 * @param {boolean} erupt - 是否暴击
 *
 * @param {type.GET_PROPERTY_PANEL} property - 属性对象
 */
function Crystal(self, target, erupt, property) {
    /**
     * * 生命值组件
     */
    const health = self.getComponent('health');
    /**
     * * 技能能量值
     */
    const energy = self.getDynamicProperty('power_energy:Crystal') ?? 0;
    /**
     * * 定义 坐标基准点
     */
    const vertex0 = Vector.add(self.location, { x: 8, y: 8, z: 8 });
    /**
     * * 定义 坐标基准点
     */
    const vertex1 = Vector.add(self.location, { x: -8, y: 0, z: -8 });
    if (!health)
        return;
    // 普通攻击
    if (energy < 8) {
        // 暴击时 获得 额外充能
        if (erupt) {
            /**
             * * 充能值
             */
            const charge = energy + Random({ min: 1, max: 8 }, true);
            self.setDynamicProperty('power_energy:Crystal', charge);
            // 显示充能等级
            NumberParticleDisplay(self, charge, Vector.CONSTANT_UP);
        }
        else {
            /**
             * * 充能值
             */
            const charge = energy + 1;
            self.setDynamicProperty('power_energy:Crystal', charge);
            // 显示充能等级
            NumberParticleDisplay(self, charge, Vector.CONSTANT_UP);
        }
        // 执行 攻击事件 后处理
        AttackAfter(self, target, erupt, property);
    }
    // 强化攻击
    else {
        /**
         * * 强化攻击次数
         */
        const amount = Math.floor(health.currentValue / 10);
        /**
         * * 实体查询选项
         */
        const options = {
            families: ['monster'],
            location: target.location,
            maxDistance: 4,
            closest: 8,
        };
        /**
         * * 契约者标识符
         */
        const contract = self.getDynamicProperty('entity:contract_user');
        /**
         * * 获取实体列表
         */
        const entitys = self.dimension.getEntities(options);
        /**
         * * 合并属性
         */
        const mergeData = MergeProperty(property, { basic_attack: property.erupt_odds * amount * 0.5 });
        /**
         * * 创建 粒子效果
         */
        const animation = () => {
            /**
             * * 随机坐标
             */
            const current = Vector.rangeRandom(vertex0, vertex1);
            /**
             * * 定义 粒子参数
             */
            const molang = new server.MolangVariableMap();
            /**
             * * 获取 坐标差值
             */
            const difference = Vector.difference(current, target.getHeadLocation());
            // 设置 粒子参数
            molang.setColorRGB('variable.color', getRuneColor(property.self_rune));
            molang.setVector3('variable.direction', difference);
            molang.setFloat('variable.range', 15);
            molang.setFloat('variable.type', 0);
            // 显示 粒子效果
            TrySpawnParticle(self.dimension, 'constant:the_cracks_of_the_misty_sea', current);
            TrySpawnParticle(self.dimension, 'scripts:path_spurt', current, molang);
        };
        // 执行粒子效果
        for (let index = 0; index < amount; index++)
            animation();
        // 过滤 契约者 与 锁定的目标 并 结算范围伤害
        entitys
            .filter(point => point.id !== contract)
            .filter(point => point.id !== target.id)
            .forEach(entity => ElementalAttack(self, entity, erupt, property), 20);
        // 对目标单独结算一次伤害
        server.system.runTimeout(() => ElementalAttack(self, target, erupt, mergeData), 20);
        // 清空 充能值
        self.setDynamicProperty('power_energy:Crystal', 0);
        // 创建战斗奖励
        CreateReward(self, target);
    }
}
/**
 * * 蔷薇 攻击事件
 *
 * @param {server.Entity} self - 自身
 *
 * @param {type.GET_PROPERTY_PANEL} property - 属性对象
 */
function Rambler(self, property) {
    /**
     * * 生命值组件
     */
    const health = self.getComponent('health');
    // 判断 自我烧血是否到达极限值
    if (health && HealthHigher(health, 0.2))
        health?.setCurrentValue(Math.floor(health.currentValue * 0.5));
    // 修改属性
    GetPartner(self, entity => {
        /**
         * * 获取属性
         */
        const getData = GetProperty(entity);
        if (getData.double_damage >= 7.5)
            return;
        // 通用增益效果
        AlterProperty(entity, { double_damage: property.erupt_hurt * 0.015, damage_increase: property.basic_attack });
        TrySpawnParticle(entity.dimension, 'constant:smoke_rune_purple', entity.getHeadLocation());
    });
    // 提升战斗经验
    ExperienceSpecialImprove(self);
    // 创建战斗奖励
    CreateReward(self, self.target ?? self);
}
/**
 * * 海灵 攻击事件
 *
 * @param {server.Entity} self - 自身
 *
 * @param {server.Entity} target - 目标实体对象
 *
 * @param {boolean} erupt - 是否暴击
 *
 * @param {type.GET_PROPERTY_PANEL} property - 属性对象
 */
function HaiLing(self, target, erupt, property) {
    /**
     * * 技能能量值
     */
    const energy = target.getDynamicProperty('power_energy:Ocean') ?? 0;
    // 提供 生命恢复 伤害吸收 效果
    GetPartner(self, entity => {
        /**
         * * 当前生命值
         */
        const health = entity.getComponent('health');
        // 恢复生命值
        health?.setCurrentValue(health.currentValue + Math.floor(property.erupt_odds * 0.5));
        entity.addEffect('minecraft:absorption', 320, { amplifier: energy, showParticles: false });
    });
    // 叠加印记等级
    if (energy < 5)
        target.setDynamicProperty('power_energy:Ocean', energy + 1);
    AttackAfter(self, target, erupt, property);
}
/**
 * * 海娜 攻击事件
 *
 * @param {server.Entity} self - 自身
 *
 * @param {server.Entity} target - 目标实体对象
 *
 * @param {boolean} erupt - 是否暴击
 *
 * @param {type.GET_PROPERTY_PANEL} property - 属性对象
 */
function HaiNa(self, target, erupt, property) {
    /**
     * * 技能能量值
     */
    const energy = target.getDynamicProperty('power_energy:Ocean') ?? 0;
    /**
     * * 阶段一能量值
     */
    const stage = Clamp({ max: 9, min: 1 }, energy);
    /**
     * * 生命值组件
     */
    const health = self.getComponent('health');
    if (!health)
        return;
    /**
     * * 损伤的血量
     */
    const trauma = (health?.currentValue * 0.1) * stage;
    // 修改当生命值
    health.setCurrentValue(health.currentValue - trauma);
    // 攻击面板增加
    property.raise_erupt_odds += stage * 75;
    property.raise_basic_attack += trauma;
    // 叠加印记等级
    if (energy < 15)
        target.setDynamicProperty('power_energy:Ocean', energy + 1);
    AttackAfter(self, target, erupt, property);
}
/**
 * * 幽蓝 攻击事件
 *
 * @param {server.Entity} self - 自身
 *
 * @param {server.Entity} target - 目标实体对象
 *
 * @param {boolean} erupt - 是否暴击
 *
 * @param {type.GET_PROPERTY_PANEL} property - 属性对象
 */
function Dullblue(self, target, erupt, property) {
    /**
     * * 过滤器参数
     */
    const options = {
        families: ['monster'],
        location: target.location,
        maxDistance: 8,
        closest: 4
    };
    /**
     * * 契约者标识符
     */
    const contract = self.getDynamicProperty('entity:contract_user');
    /**
     * * 获取实体列表
     */
    const entitys = target.dimension.getEntities(options);
    /**
     * * -1 ~ 1的随机数
     */
    const random = () => Random({ min: -1, max: 1 }, true);
    // 造成的伤害 降低 50%
    property.double_damage *= 0.5;
    // 为队友提供暴击增益
    GetPartner(self, entity => AlterProperty(entity, { raise_erupt_odds: entitys.length * 15 }));
    // 过滤 契约者 与 锁定的目标 并 结算范围伤害
    entitys
        .filter(point => point.id !== contract)
        .filter(point => point.id !== target.id)
        .forEach(entity => {
        try {
            entity.applyKnockback({ x: random(), z: random() }, Math.abs(random() * entitys.length));
        }
        catch {
            TrySpawnParticle(entity.dimension, 'constant:pulse_rune_green', entity.location);
        }
        ElementalAttack(self, entity, erupt, property);
    });
    // 对目标单独结算一次伤害
    ElementalAttack(self, target, erupt, property);
    // 创建 粒子效果
    TrySpawnParticle(target.dimension, 'constant:impact_rune_green', target.location);
    TrySpawnParticle(target.dimension, 'constant:excite_rune_green', target.location);
    TrySpawnParticle(target.dimension, 'constant:erupt_rune_green', target.location);
    // 创建战斗奖励
    CreateReward(self, target);
}
/**
 * * 九九 攻击事件
 *
 * @param {server.Entity} self - 自身
 *
 * @param {server.Entity} target - 目标实体对象
 *
 * @param {boolean} erupt - 是否暴击
 *
 * @param {type.GET_PROPERTY_PANEL} property - 属性对象
 */
function NineNine(self, target, erupt, property) {
    /**
     * * 计算随机值
     */
    const random = Random({ max: 2, min: 0 }, true);
    /**
     * * 获取实体头部位置
     */
    const location = self.getHeadLocation();
    /**
     * * 获取实体朝向向量
     */
    const point = self.getViewDirection();
    /**
     * * 锚点偏移坐标组
     */
    const anchors = [
        { above: 1, front: 0, right: 0 },
        { above: 0, front: 0, right: 1 },
        { above: 0, front: 0, right: -1 }
    ];
    /**
     * * 炮击坐标生成函数
     *
     * @param {number} amount - 炮击数量
     *
     * @returns {server.Vector3[]} - 炮击坐标数组
     */
    const PhaseCannon = (amount) => {
        /**
         * * 输出坐标数组
         */
        const output = [];
        // 循环生成炮击坐标
        for (let index = 0; index < amount; index++) {
            // 获取随机属性值
            switch (random) {
                case 0:
                    property.self_rune = "rune_red";
                    output.push(Vector.relativeOffset(location, point, anchors[0]));
                    break;
                case 1:
                    property.self_rune = "rune_blue";
                    output.push(Vector.relativeOffset(location, point, anchors[1]));
                    break;
                default:
                    property.self_rune = "rune_green";
                    output.push(Vector.relativeOffset(location, point, anchors[2]));
                    break;
            }
        }
        return output;
    };
    // 创建 指定次数 的 炮击伤害
    PhaseCannon(erupt ? 3 : 1).forEach((anchor, index) => {
        /**
         * * 计算目标位置
         */
        const targetLocation = Vector.add(target.location, Vector.CONSTANT_UP);
        /**
         * * 容器参数
         */
        const args = {
            locations: [anchor, targetLocation],
            particles: ['constant:smoke_' + property.self_rune],
            on_done: AttackBomb(self, erupt, property),
            dimension: self.dimension,
            cooldown: 1,
            speed: 1
        };
        // 创建 路径容器
        server.system.runTimeout(() => PathExecute.Create('神恩领航者-九九-炮击轨迹', 1, args), (1 + index) * 10);
    });
    // 创建战斗奖励
    CreateReward(self, target);
}
/**
 * * 雪隐 攻击事件
 *
 * @param {server.Entity} self - 自身
 *
 * @param {server.Entity} target - 目标实体对象
 *
 * @param {boolean} erupt - 是否暴击
 *
 * @param {type.GET_PROPERTY_PANEL} property - 属性对象
 */
function SnowHidden(self, target, erupt, property) {
    /**
     * * 获取目标生命值组件
     */
    const targetHealth = target.getComponent('health');
    if (!targetHealth)
        return;
    /**
     * * 技能阈值
     */
    const threshold = property.erupt_hurt * 2;
    /**
     * * 原始充能值
     */
    const proto = property.erupt_hurt - targetHealth.currentValue;
    /**
     * * 充能钳位值
     */
    const clamp = Math.floor(Clamp({ max: threshold, min: 1 }, proto));
    /**
     * * 技能能量值
     */
    const energy = self.getDynamicProperty('power_energy:SnowHidden') ?? clamp;
    // 释放法术攻击
    AttackAfter(self, target, erupt, property);
    // 检测是否释放充能技能
    if (energy >= threshold) {
        /**
         * * 当前生命值
         */
        const roleHealth = self.getComponent('health');
        // 判断自身是否存活 并 遍历队友队列
        if (roleHealth)
            GetPartner(self, entity => {
                // 赋予 状态效果
                entity.addEffect('minecraft:absorption', (energy - roleHealth?.currentValue) * 20, { amplifier: property.basic_attack * 0.5, showParticles: false });
                entity.addEffect('minecraft:health_boost', (roleHealth?.currentValue) * 20, { amplifier: property.basic_attack * 0.5, showParticles: false });
                // 播放 技能音效
                self.dimension.playSound('conduit.attack', entity.location);
            });
        self.setDynamicProperty('power_energy:SnowHidden', 1);
        return;
    }
    else
        self.setDynamicProperty('power_energy:SnowHidden', Clamp({ max: threshold, min: 1 }, energy + clamp));
    // 显示充能值
    NumberParticleDisplay(self, energy, Vector.CONSTANT_UP);
}
/**
 * * 珍珠 攻击事件
 *
 * @param {server.Entity} self - 自身
 *
 * @param {server.Entity} target - 目标实体对象
 */
function Pearl(self, target) {
    /**
     * * 全部动态属性标识符
     */
    const propertyID = self.getDynamicPropertyIds();
    // 判断是否可以生成水母实体
    if (TriggerControl('珍珠:水母治疗', self, 600)) {
        /**
         * * 水母实体
         */
        const jellyfish = TrySpawnEntity(self.dimension, 'starry_map:elves.jellyfish_of_pearl', self.getHeadLocation());
        // 复制动态属性
        if (jellyfish instanceof Error)
            return;
        propertyID.forEach(id => jellyfish.setDynamicProperty(id, self.getDynamicProperty(id)));
        jellyfish.setDynamicProperty('entity:unlock', true);
    }
    else {
        /**
         * * 游鱼实体
         */
        const fish = TrySpawnEntity(self.dimension, 'starry_map:elves.fish_of_pearl', self.getHeadLocation());
        // 检测是否生成游鱼实体
        if (fish instanceof Error)
            return;
        // 复制动态属性
        propertyID.forEach(id => fish.setDynamicProperty(id, self.getDynamicProperty(id)));
        fish.setDynamicProperty('entity:unlock', true);
    }
    // 重置 自身属性
    SetProperty(self, reset_battle_data);
    // 提升战斗经验
    ExperienceSpecialImprove(self);
    // 创建战斗奖励
    CreateReward(self, target);
}
/**
 * * 珍珠游鱼 攻击事件
 *
 * @param {server.Entity} self - 自身
 *
 * @param {server.Entity} target - 目标实体对象
 *
 * @param {boolean} erupt - 是否暴击
 */
function fishInPearl(self, target, erupt) {
    // 创建 元素攻击
    ElementalAttack(self, target, erupt);
    /**
     * * 获取当前同类计划的数量
     */
    const tickDelay = Control.inventory.filter(item => item.className === self.typeId).length;
    // 在一段时间后移除实体
    server.system.runTimeout(() => { if (self && self.isValid)
        self?.remove(); }, tickDelay);
    // 添加 隐身效果
    self.addEffect('minecraft:invisibility', 200, { showParticles: false });
    // 播放 音效
    server.world.playMusic('mob.slime.small');
}
/**
 * * 珍珠水母 攻击事件
 *
 * @param {server.Entity} self - 自身
 *
 * @param {type.GET_PROPERTY_PANEL} property - 属性对象
 */
function jellyfishInPearl(self, target, property) {
    // 释放 法术攻击
    DefaultAttack(self, target, true, property);
    // 获取并治疗 队友
    getAndTreatPartner(self, property);
}
/**
 * * 获取并治疗 队友
 *
 * @param {server.Entity} self - 自身
 *
 * @param {type.GET_PROPERTY_PANEL} property - 属性对象
 */
function getAndTreatPartner(self, property) {
    GetPartner(self, entity => {
        /**
         * * 当前生命值
         */
        const health = entity.getComponent('health');
        // 恢复生命值
        health?.setCurrentValue(health.currentValue + Math.floor(property.basic_attack * 0.5));
        // 添加 状态效果
        entity.addEffect('minecraft:health_boost', 320, { amplifier: 9, showParticles: false });
    });
}
/**
 * * 攻击事件 后处理
 *
 * @param {server.Entity} self - 自身
 *
 * @param {server.Entity} target - 目标实体对象
 *
 * @param {type.GET_PROPERTY_PANEL} property - 实体属性对象
 */
function AttackAfter(self, target, erupt, property, query) {
    /**
     * * 计算目标位置
     */
    const targetLocation = Vector.add(target.location, Vector.CONSTANT_UP);
    // 创建路径
    PathExecute.Create('神恩领航者-通用攻击射线', 1, {
        locations: [self.getHeadLocation(), targetLocation],
        on_done: AttackBomb(self, erupt, property),
        particles: ['constant:track_' + property.self_rune],
        dimension: self.dimension,
        cooldown: 1,
        speed: 1
    });
    // 创建战斗奖励
    CreateReward(self, target);
}
/**
 * * 法术攻击 命中后 的 爆炸逻辑
 *
 * @param {server.Entity} self - 发动法术攻击的攻击者
 *
 * @param {erupt} erupt - 本次攻击是否暴击
 *
 * @param {type.GET_PROPERTY_PANEL} property - 攻击时使用的属性面板
 *
 * @param {server.EntityQueryOptions} query - 进行调整的实体查询参数
 *
 */
function AttackBomb(self, erupt, property, query) {
    // 创建 元素攻击
    return (args) => {
        // 验证 实体状态 是否正确
        if (!self || !self.isValid)
            return;
        /**
         * * 过滤器参数
         */
        const options = {
            families: ['monster'],
            location: args.location,
            maxDistance: 4,
            closest: 4,
            ...{}
        };
        /**
         * * 契约者标识符
         */
        const contract = self.getDynamicProperty('entity:contract_user');
        /**
         * * 领航者瞄准的目标
         */
        const target = self.target;
        /**
         * * 获取实体列表
         */
        let entitys = args.dimension.getEntities(options);
        // 判断 目标 是否存在`
        if (!target || !target.isValid)
            return;
        // 过滤 契约者 与 锁定的目标 并 结算范围伤害
        entitys
            .filter(point => point.id !== contract)
            .filter(point => point.id !== target.id)
            .forEach(entity => ElementalAttack(self, entity, erupt, property));
        // 创建 粒子效果
        TrySpawnParticle(args.dimension, 'constant:excite_' + property.self_rune, args.location);
        // 对目标单独结算一次伤害
        ElementalAttack(self, target, erupt, property);
    };
}
/**
 * * 创建 战斗奖励
 *
 * @param {server.Entity} self - 实体对象
 *
 * @param {server.Entity} target - 目标实体对象
 */
function CreateReward(self, target) {
    /**
     * * 获取 战斗经验值
     */
    const experience = self.getDynamicProperty('entity:experience') ?? 0;
    /**
     * * 获取 战术等级
     */
    const improve = self.getDynamicProperty('entity:improve') ?? 1;
    /**
     * * 创建 物品对象
     */
    const item = new server.ItemStack('starry_map:enlightenment');
    // 判断 是否发放 参悟之石
    if (experience / experience_improve < improve)
        return;
    if (improve > max_experience)
        return;
    // 修改 等级记录
    self.setDynamicProperty('entity:improve', improve + 1);
    TrySpawnItem(self.dimension, item, target.location);
}
/**
 * * 特殊经验提升
 *
 * 为指定实体增加战斗经验值
 *
 * @param {server.Entity} self - 要提升经验的实体对象
 */
function ExperienceSpecialImprove(self) {
    /**
     * * 获取 战斗经验值
     */
    const experience = self.getDynamicProperty('entity:experience') ?? 0;
    // 提升战斗经验值
    self.setDynamicProperty('entity:experience', experience + 0.2);
}

/*
 * 原版接口
 */
/**
 * 自定义指令实现列表
 */
const components$1 = new Map();
// TODO 添加自定义指令
components$1.set({
    description: '针对已经进行过( 契约 | 驯服 )的实体, 追加契约绑定仪式',
    name: 'opal:entity_contract_rite',
    permissionLevel: server.CommandPermissionLevel.Any,
    optionalParameters: [
        {
            name: '<§5§l 单目标生效 §r> 进行< 契约绑定 >的实体',
            type: server.CustomCommandParamType.EntitySelector
        }
    ]
}, (source, targets) => {
    /**
     * 进行操作的实体
     */
    const entity = targets && targets.length !== 0 ? targets[0] : source.sourceEntity;
    // 实体不存在则提前返回
    if (!entity || !entity.isValid)
        return { message: '错误: 未找到有效的契约绑定目标实体', status: server.CustomCommandStatus.Failure };
    /**
     * 进行操作的玩家
     */
    const player = entity?.getComponent('minecraft:tameable')?.tamedToPlayer;
    // 玩家不存在则提前返回
    if (!player || !player.isValid)
        return { message: '错误: 当前实体未与玩家建立契约关系', status: server.CustomCommandStatus.Failure };
    // 运行功能代码
    server.system.run(() => {
        /**
         * 玩家名称标签
         */
        const userName = translate(player);
        /**
         * 角色名称
         */
        const roleName = translate(entity);
        // 显示消息
        player.sendMessage([{ text: '< ' }, userName, { text: ' >与< ' }, roleName, { text: ' >已签订契约' }]);
        // 设置属性
        entity.setDynamicProperty('entity:false_anchor_point', player.id);
        entity.setDynamicProperty('entity:contract_user', player.id);
        // 设置标签
        entity.addTag("is_Contract");
        /**
         * 定义 粒子参数
         */
        const molang = new server.MolangVariableMap();
        // 设置粒子参数
        molang.setFloat('variable.direction', 0);
        molang.setFloat('variable.size', 2);
        // 播放 粒子效果
        TrySpawnParticle(entity.dimension, 'scripts:path_heart', Vector.CONSTANT_UP.add(entity.location), molang);
        TrySpawnParticle(entity.dimension, 'minecraft:knockback_roar_particle', entity.location);
        TrySpawnParticle(entity.dimension, 'minecraft:totem_particle', entity.location);
    });
    // 显示运行成功的消息
    return { message: '契约绑定已完成', status: server.CustomCommandStatus.Success };
});
components$1.set({
    description: '针对被选中的目标, 牵引实体靠近指令源的出生点, 每 100 tick 仅可执行一次',
    name: 'opal:apply_traction_to_target',
    permissionLevel: server.CommandPermissionLevel.Any,
    optionalParameters: [
        {
            name: '作为< 牵引目标 >的实体',
            type: server.CustomCommandParamType.EntitySelector
        }
    ]
}, (source, targets) => {
    /**
     * 获取 作为牵引源的游戏对象
     */
    const self = source.sourceEntity;
    // 判断指令执行源对象是否真实可用
    if (!self || !self.isValid)
        return { message: '未能找到: 作为< 牵引源 >的游戏对象', status: server.CustomCommandStatus.Failure };
    // 判断< 牵引目标 >数组是否真实可用
    if (!targets || targets.length == 0)
        return { message: '未能找到: 作为< 牵引目标 >的实体目标', status: server.CustomCommandStatus.Failure };
    // 判断触发器是否已禁用
    if (!TriggerControl('使用自定义指令添加牵引力', self, 100))
        return { message: '触发控制器已禁用本次指令执行', status: server.CustomCommandStatus.Failure };
    // 运行功能代码
    server.system.run(() => {
        /**
         * 获取当前实体的出生点位置属性
         */
        const createPlace = self.getDynamicProperty('entity:create_place');
        // 强制自我回到出生点上方
        self.teleport(createPlace);
        // 对目标实体施加牵引力
        targets.forEach(async (entity) => {
            // 判断< 牵引目标 >游戏对象是否真实可用
            if (!entity || !entity.isValid)
                return;
            /**
             * 获取 牵引向量
             */
            const vector = Vector.copy(createPlace).subtract(entity.location).normalize.multiply(16);
            // 判断作为< 牵引目标 >的游戏对象是否是玩家
            if (entity instanceof server.Player)
                entity.onScreenDisplay.setActionBar([translate(self), ' <- 正在牵引 -> ', translate(entity)]);
            // 等待 20 帧
            await server.system.waitTicks(20);
            /**
             * 获取当前实体的出生点上方位置属性
             */
            const topmost = self.dimension.getTopmostBlock(vector.add(createPlace))?.above()?.location;
            // 判断当前实体的出生点上方是否存在方块
            if (topmost && entity && entity.isValid)
                entity.teleport(topmost);
            // 播放音效
            entity.dimension.playSound('portal.trigger', entity.location);
        });
    });
    // 显示运行成功的消息
    return { message: '进行< 牵引 >的流程已完毕', status: server.CustomCommandStatus.Success };
});
components$1.set({
    description: '根据< 待机动画类型 >的不同, 执行播放语音, 寻找并食用蛋糕等行为',
    name: 'opal:execute_idle_action',
    permissionLevel: server.CommandPermissionLevel.Any,
    optionalParameters: [
        {
            name: '<§5§l 单目标生效 §r> 执行< 待机动作 >的实体 <§v§l 默认执行者自身 §r>',
            type: server.CustomCommandParamType.EntitySelector
        },
        {
            name: 'opal:实体待机动画类型',
            type: server.CustomCommandParamType.Enum
        }
    ]
}, (source, targets, type) => {
    /**
     * 进行操作的实体
     */
    const entity = targets && targets.length !== 0 ? targets[0] : source.sourceEntity;
    // 玩家不存在则提前返回
    if (!entity || !entity.isValid)
        return { message: '未能找到: 执行动作的< 实体对象 >或<§u 玩家对象 §r>', status: server.CustomCommandStatus.Failure };
    // 运行功能代码
    performActionInIdleState(entity, type || 'is_sitting');
    // 显示运行成功的消息
    return { message: '< 实体待机动作 >执行已完毕', status: server.CustomCommandStatus.Success };
});
components$1.set({
    description: '在实体阵亡时, 将其数据紧急保存并生成封印物品, 以便后续恢复或存档',
    name: 'opal:entity_death_preservation',
    permissionLevel: server.CommandPermissionLevel.Any,
    optionalParameters: [
        {
            name: '<§5§l 单目标生效 §r> 需要< 保存数据 >的实体 <§v§l 默认执行者自身 §r>',
            type: server.CustomCommandParamType.EntitySelector
        }
    ]
}, (source, targets) => {
    /**
     * 进行操作的实体
     */
    const entity = targets && targets.length !== 0 ? targets[0] : source.sourceEntity;
    // 实体不存在则提前返回
    if (!entity || !entity.isValid)
        return { message: '错误: 未找到需要保存数据的实体对象', status: server.CustomCommandStatus.Failure };
    // 运行功能代码
    entityDeathPreservation(entity);
    // 显示运行成功的消息
    return { message: '实体数据已成功保存并生成封印物品', status: server.CustomCommandStatus.Success };
});
components$1.set({
    description: '卸载实体背包库存后, 销毁< 实体对象 >',
    name: 'opal:unload_inventory_destroy',
    permissionLevel: server.CommandPermissionLevel.Any,
    optionalParameters: [
        {
            name: '<§5§l 单目标生效 §r> 被< 卸载销毁 >的实体 <§v§l 默认执行者自身 §r>',
            type: server.CustomCommandParamType.EntitySelector
        }
    ]
}, (source, targets) => {
    /**
     * 进行操作的实体
     */
    const entity = targets && targets.length !== 0 ? targets[0] : source.sourceEntity;
    // 玩家不存在则提前返回
    if (!entity || !entity.isValid)
        return { message: '未能找到: 应当被销毁的< 实体对象 >', status: server.CustomCommandStatus.Failure };
    // 运行功能代码
    UnloadInventoryAndDestroy(entity);
    // 显示运行成功的消息
    return { message: '< 卸载实体背包库存后销毁实体 >执行已完毕', status: server.CustomCommandStatus.Success };
});
components$1.set({
    description: '触发< 神恩领航者 >的台词播放管理系统',
    name: 'opal:voice_management_system',
    permissionLevel: server.CommandPermissionLevel.Any,
    optionalParameters: [
        {
            name: '<§5§l 单目标生效 §r> 继续< 台词播放 >的实体 <§v§l 默认执行者自身 §r>',
            type: server.CustomCommandParamType.EntitySelector
        },
        {
            name: '本次< 台词播放 >的< 分支类型 >',
            type: server.CustomCommandParamType.String
        },
    ]
}, (source, targets, type) => {
    /**
     * 进行操作的实体
     */
    const entity = targets && targets.length !== 0 ? targets[0] : source.sourceEntity;
    // 玩家不存在则提前返回
    if (!entity || !entity.isValid)
        return { message: '未能找到: 发动本次< 台词播放 >的< 实体对象 >', status: server.CustomCommandStatus.Failure };
    // 运行功能代码
    speechAndVoiceManager(entity, type || 'default');
    // 显示运行成功的消息
    return { message: '< 神恩领航者-台词播放 >执行已完毕', status: server.CustomCommandStatus.Success };
});
components$1.set({
    description: '触发< 隧龙掘进列车 >的< 列车行进事件 >',
    name: 'opal:tunnel_dragon_travel',
    permissionLevel: server.CommandPermissionLevel.Any,
    optionalParameters: [
        {
            name: '<§5§l 单目标生效 §r> 进行< 列车行进 >的实体 <§v§l 默认执行者自身 §r>',
            type: server.CustomCommandParamType.EntitySelector
        },
        {
            name: '本次< 列车行进 >的< 分支类型 >',
            type: server.CustomCommandParamType.String
        },
    ]
}, (source, targets, type) => {
    /**
     * 进行操作的实体
     */
    const entity = targets && targets.length !== 0 ? targets[0] : source.sourceEntity;
    // 玩家不存在则提前返回
    if (!entity || !entity.isValid)
        return { message: '未能找到: 发动本次< 列车行进 >的< 实体对象 >', status: server.CustomCommandStatus.Failure };
    // 运行功能代码
    tunnelDragonTravel(entity, type || 'default');
    // 显示运行成功的消息
    return { message: '< 隧龙掘进列车-列车行进 >执行已完毕', status: server.CustomCommandStatus.Success };
});
components$1.set({
    description: '触发< 神恩领航者 >的< 元素攻击事件 >',
    name: 'opal:divine_favor_attack',
    permissionLevel: server.CommandPermissionLevel.Any,
    optionalParameters: [
        {
            name: '<§5§l 单目标生效 §r> 发动< 元素攻击 >的实体 <§v§l 默认执行者自身 §r>',
            type: server.CustomCommandParamType.EntitySelector
        },
        {
            name: '本次< 元素攻击 >的< 分支类型 >',
            type: server.CustomCommandParamType.String
        },
    ]
}, (source, targets, type) => {
    /**
     * 进行操作的实体
     */
    const entity = targets && targets.length !== 0 ? targets[0] : source.sourceEntity;
    // 玩家不存在则提前返回
    if (!entity || !entity.isValid)
        return { message: '未能找到: 发动本次< 元素攻击事件 >的< 实体对象 >', status: server.CustomCommandStatus.Failure };
    // 运行功能代码
    divineFavorGirlAttack(entity, type || 'default');
    // 显示运行成功的消息
    return { message: '< 神恩领航者-元素攻击 >执行已完毕', status: server.CustomCommandStatus.Success };
});
components$1.set({
    description: '触发< 诸海渊鲸艇 >的< 元素攻击事件 >',
    name: 'opal:abyss_whale_attack',
    permissionLevel: server.CommandPermissionLevel.Any,
    optionalParameters: [
        {
            name: '<§5§l 单目标生效 §r> 发动< 元素攻击 >的实体 <§v§l 默认执行者自身 §r>',
            type: server.CustomCommandParamType.EntitySelector
        },
        {
            name: '本次< 元素攻击 >的< 分支类型 >',
            type: server.CustomCommandParamType.String
        },
    ]
}, (source, targets, type) => {
    /**
     * 进行操作的实体
     */
    const entity = targets && targets.length !== 0 ? targets[0] : source.sourceEntity;
    // 玩家不存在则提前返回
    if (!entity || !entity.isValid)
        return { message: '未能找到: 发动本次< 元素攻击事件 >的< 实体对象 >', status: server.CustomCommandStatus.Failure };
    // 运行功能代码
    machineWhaleAttack(entity, type || 'default');
    // 显示运行成功的消息
    return { message: '< 诸海渊鲸艇-元素攻击 >执行已完毕', status: server.CustomCommandStatus.Success };
});
components$1.set({
    description: '触发< 归忆蝰蛇炮 >的< 元素攻击事件 >',
    name: 'opal:viper_attack',
    permissionLevel: server.CommandPermissionLevel.Any,
    optionalParameters: [
        {
            name: '<§5§l 单目标生效 §r> 发动< 元素攻击 >的实体 <§v§l 默认执行者自身 §r>',
            type: server.CustomCommandParamType.EntitySelector
        },
        {
            name: '本次< 元素攻击 >的< 分支类型 >',
            type: server.CustomCommandParamType.String
        },
    ]
}, (source, targets, type) => {
    /**
     * 进行操作的实体
     */
    const entity = targets && targets.length !== 0 ? targets[0] : source.sourceEntity;
    // 玩家不存在则提前返回
    if (!entity || !entity.isValid)
        return { message: '未能找到: 发动本次< 元素攻击事件 >的< 实体对象 >', status: server.CustomCommandStatus.Failure };
    // 运行功能代码
    machineViperAttack(entity, type || 'default');
    // 显示运行成功的消息
    return { message: '< 归忆蝰蛇炮-元素攻击 >执行已完毕', status: server.CustomCommandStatus.Success };
});
components$1.set({
    description: '触发< 烛火野蜂群 >的< 元素攻击事件 >',
    name: 'opal:wild_bee_attack',
    permissionLevel: server.CommandPermissionLevel.Any,
    optionalParameters: [
        {
            name: '<§5§l 单目标生效 §r> 发动< 元素攻击 >的实体 <§v§l 默认执行者自身 §r>',
            type: server.CustomCommandParamType.EntitySelector
        },
        {
            name: '本次< 元素攻击 >的< 分支类型 >',
            type: server.CustomCommandParamType.String
        },
    ]
}, (source, targets, type) => {
    /**
     * 进行操作的实体
     */
    const entity = targets && targets.length !== 0 ? targets[0] : source.sourceEntity;
    // 玩家不存在则提前返回
    if (!entity || !entity.isValid)
        return { message: '未能找到: 发动本次< 元素攻击事件 >的< 实体对象 >', status: server.CustomCommandStatus.Failure };
    // 运行功能代码
    machineWaspAttack(entity, type || 'default');
    // 显示运行成功的消息
    return { message: '< 烛火野蜂群-元素攻击 >执行已完毕', status: server.CustomCommandStatus.Success };
});
components$1.set({
    description: '卸载实体背包库存, 并将其封装为特定物品, 用于存储实体数据, 支持自定义封装格式',
    name: 'opal:unload_package_inventory',
    permissionLevel: server.CommandPermissionLevel.Any,
    optionalParameters: [
        {
            name: '<§5§l 单目标生效 §r> 需要< 卸载库存 >的实体 <§v§l 默认执行者自身 §r>',
            type: server.CustomCommandParamType.EntitySelector
        },
        {
            name: '用于封装数据的<物品标识符>',
            type: server.CustomCommandParamType.String
        },
        {
            name: '自定义封装名称（可选）',
            type: server.CustomCommandParamType.String
        },
        {
            name: '自定义封装描述（可选）',
            type: server.CustomCommandParamType.String
        }
    ]
}, (source, targets, type, customName, customLore) => {
    /**
     * 进行操作的实体
     */
    const entity = targets && targets.length !== 0 ? targets[0] : source.sourceEntity;
    // 实体不存在则提前返回
    if (!entity || !entity.isValid)
        return { message: '错误: 未找到需要卸载库存的实体对象', status: server.CustomCommandStatus.Failure };
    // 运行功能代码
    server.system.run(() => {
        const item = new server.ItemStack(type || 'minecraft:stone');
        /**
         * 获取 玩家
         */
        const player = server.world.getEntity(entity.getDynamicProperty('entity:contract_user'));
        /**
         * 获取 玩家背包
         */
        const container = player?.getComponent('inventory')?.container;
        // 卸载被选中的实体
        if (player)
            UnloadInventoryAndPackage(entity, player, item, customName || '§l§q概念封装§r - ', customLore ? [customLore] : []);
        // 删除 控制器物品
        if (container)
            DeleteItemStack(container, new server.ItemStack('starry_map:mechanized_operation'));
    });
    // 显示运行成功的消息
    return { message: '实体库存已成功卸载并封装为特定物品', status: server.CustomCommandStatus.Success };
});
components$1.set({
    description: '为实体随机装备武器、护腿和副手物品, 或清空其装备',
    name: 'opal:random_equip_or_clear ',
    permissionLevel: server.CommandPermissionLevel.Any,
    optionalParameters: [
        {
            name: '<§5§l 单目标生效 §r> 执行< 装备变更 >的实体 <§v§l 默认执行者自身 §r>',
            type: server.CustomCommandParamType.EntitySelector
        }
    ]
}, (source, targets) => {
    /**
     * 进行操作的实体
     */
    const entity = targets && targets.length !== 0 ? targets[0] : source.sourceEntity;
    // 实体不存在则提前返回
    if (!entity || !entity.isValid)
        return { message: '错误: 未找到需要装备或清空装备的实体对象', status: server.CustomCommandStatus.Failure };
    // 运行功能代码
    randomlyEquipOrClear(entity);
    // 显示运行成功的消息
    return { message: '实体装备已成功随机更新或清空', status: server.CustomCommandStatus.Success };
});
components$1.set({
    description: '为实体应用动力飞行, 使其能够根据玩家的视角方向和速度进行飞行',
    name: 'opal:apply_dynamic_flight',
    permissionLevel: server.CommandPermissionLevel.Any,
    optionalParameters: [
        {
            name: '<§5§l 单目标生效 §r> 应用< 动力飞行 >的实体 <§v§l 默认执行者自身 §r>',
            type: server.CustomCommandParamType.EntitySelector
        },
        {
            name: '飞行的<速度>（默认为2）',
            type: server.CustomCommandParamType.Float
        }
    ]
}, (source, targets, speed) => {
    /**
     * 进行操作的实体
     */
    const entity = targets && targets.length !== 0 ? targets[0] : source.sourceEntity;
    // 实体不存在则提前返回
    if (!entity || !entity.isValid)
        return { message: '错误: 未找到需要应用动力飞行的实体对象', status: server.CustomCommandStatus.Failure };
    // 运行功能代码
    applyDynamicFlightToEntity(entity, speed || 2);
    // 显示运行成功的消息
    return { message: '动力飞行已成功应用于实体', status: server.CustomCommandStatus.Success };
});
components$1.set({
    description: '将实体与玩家绑定, 以便玩家可以控制实体的动力飞行',
    name: 'opal:binding_dynamic_flight',
    permissionLevel: server.CommandPermissionLevel.Any,
    optionalParameters: [
        {
            name: '<§5§l 单目标生效 §r> 绑定< 动力飞行 >的实体 <§v§l 默认执行者自身 §r>',
            type: server.CustomCommandParamType.EntitySelector
        }
    ]
}, (source, targets) => {
    /**
     * 进行操作的实体
     */
    const entity = targets && targets.length !== 0 ? targets[0] : source.sourceEntity;
    // 实体不存在则提前返回
    if (!entity || !entity.isValid)
        return { message: '错误: 未找到需要绑定动力飞行的实体对象', status: server.CustomCommandStatus.Failure };
    // 运行功能代码
    dynamicFlightToBinding(entity);
    // 显示运行成功的消息
    return { message: '动力飞行绑定已成功应用于实体', status: server.CustomCommandStatus.Success };
});
components$1.set({
    description: '解除实体与玩家的动力飞行绑定, 停止控制实体的飞行',
    name: 'opal:separate_dynamic_flight',
    permissionLevel: server.CommandPermissionLevel.Any,
    optionalParameters: [
        {
            name: '<§5§l 单目标生效 §r> 解除< 飞行绑定 >的实体 <§v§l 默认执行者自身 §r>',
            type: server.CustomCommandParamType.EntitySelector
        }
    ]
}, (source, targets) => {
    /**
     * 进行操作的实体
     */
    const entity = targets && targets.length !== 0 ? targets[0] : source.sourceEntity;
    // 实体不存在则提前返回
    if (!entity || !entity.isValid)
        return { message: '错误: 未找到需要解除动力飞行绑定的实体对象', status: server.CustomCommandStatus.Failure };
    // 运行功能代码
    dynamicFlightToSeparate(entity);
    // 显示运行成功的消息
    return { message: '动力飞行绑定已成功解除', status: server.CustomCommandStatus.Success };
});
components$1.set({
    description: '展示月华百科交互窗口, 允许玩家选择百科查询、知识库目录和技能库目录功能',
    name: 'opal:lexicon_windowed_interface',
    permissionLevel: server.CommandPermissionLevel.Any,
    optionalParameters: [
        {
            name: '<§5§l 单目标生效 §r> 执行< 显示界面 >的玩家 <§v§l 默认执行者自身 §r>',
            type: server.CustomCommandParamType.PlayerSelector
        }
    ]
}, (source, targets) => {
    /**
     * 进行操作的实体
     */
    const player = targets && targets.length !== 0 ? targets[0] : source.sourceEntity;
    // 玩家不存在则提前返回
    if (!player || !player.isValid || !(player instanceof server.Player))
        return { message: '错误: 未找到有效目标玩家', status: server.CustomCommandStatus.Failure };
    // 运行功能代码
    lexiconWindowedInterface(player);
    // 显示运行成功的消息
    return { message: '已打开月华百科交互窗口', status: server.CustomCommandStatus.Success };
});
components$1.set({
    description: '展示琉璃计划任务界面, 允许玩家查看并完成限定任务获取奖励',
    name: 'opal:crystal_mission_book',
    permissionLevel: server.CommandPermissionLevel.Any,
    optionalParameters: [
        {
            name: '<§5§l 单目标生效 §r> 执行< 显示界面 >的玩家 <§v§l 默认执行者自身 §r>',
            type: server.CustomCommandParamType.PlayerSelector
        }
    ]
}, (source, targets) => {
    /**
     * 进行操作的实体
     */
    const player = targets && targets.length !== 0 ? targets[0] : source.sourceEntity;
    // 玩家不存在则提前返回
    if (!player || !player.isValid || !(player instanceof server.Player))
        return { message: '错误: 未找到有效目标玩家', status: server.CustomCommandStatus.Failure };
    // 运行功能代码
    exchangeForm(player, { text: "§9《§u§l 琉璃计划 §9》§r" }, entry);
    // 显示运行成功的消息
    return { message: '已打开琉璃计划任务界面', status: server.CustomCommandStatus.Success };
});
components$1.set({
    description: '打开源海百货交易界面, 允许玩家使用物品兑换稀有商品',
    name: 'opal:ocean_department_store',
    permissionLevel: server.CommandPermissionLevel.Any,
    optionalParameters: [
        {
            name: '<§5§l 单目标生效 §r> 执行< 显示界面 >的玩家 <§v§l 默认执行者自身 §r>',
            type: server.CustomCommandParamType.PlayerSelector
        }
    ]
}, (source, targets) => {
    /**
     * 进行操作的实体
     */
    const player = targets && targets.length !== 0 ? targets[0] : source.sourceEntity;
    // 玩家不存在则提前返回
    if (!player || !player.isValid || !(player instanceof server.Player))
        return { message: '错误: 未找到有效目标玩家', status: server.CustomCommandStatus.Failure };
    // 运行功能代码
    exchangeForm(player, { text: "§9《§u§l 源海百货 §9》§r" }, hailing);
    // 显示运行成功的消息
    return { message: '已打开源海百货交易界面', status: server.CustomCommandStatus.Success };
});
components$1.set({
    description: '设定元素伤害的最大值与最小值',
    name: 'opal:set_elemental_damage_bounds',
    permissionLevel: server.CommandPermissionLevel.Any,
    mandatoryParameters: [
        {
            name: '<§5§l 单目标生效 §r> 执行< 数值限定 >的玩家 <§v§l 默认执行者自身 §r>',
            type: server.CustomCommandParamType.PlayerSelector
        },
        {
            name: '元素伤害的最大值',
            type: server.CustomCommandParamType.Float
        },
        {
            name: '元素伤害的最小值',
            type: server.CustomCommandParamType.Float
        }
    ]
}, (source, targets, max, min) => {
    /**
     * 进行操作的实体
     */
    const player = targets.length !== 0 ? targets[0] : source.sourceEntity;
    // 玩家不存在则提前返回
    if (!player || !player.isValid || !(player instanceof server.Player))
        return { message: '错误: 未找到有效目标玩家', status: server.CustomCommandStatus.Failure };
    // 判断数值设定
    if (min >= max)
        return { message: '错误: 最大值必须大于最小值', status: server.CustomCommandStatus.Failure };
    // 判断玩家权限
    if (!isPlayerAuthorized(player))
        return { message: '错误: 玩家没有权限执行此指令', status: server.CustomCommandStatus.Failure };
    // 运行功能代码
    server.system.run(() => {
        server.world.setDynamicProperty('rune_hurt:max_damage', max);
        server.world.setDynamicProperty('rune_hurt:min_damage', min);
    });
    // 显示运行成功的消息
    return { message: '元素伤害有效值限制已重置', status: server.CustomCommandStatus.Success };
});
components$1.set({
    description: '使用界面查询目标并施加元素伤害',
    name: 'opal:apply_elemental_damage',
    permissionLevel: server.CommandPermissionLevel.Any,
    mandatoryParameters: [
        {
            name: '<§5§l 单目标生效 §r> 执行< 元素伤害 >的玩家 <§v§l 默认执行者自身 §r>',
            type: server.CustomCommandParamType.PlayerSelector
        },
        {
            name: 'opal:元素属性类型',
            type: server.CustomCommandParamType.Enum
        },
        {
            name: '元素伤害的追加值',
            type: server.CustomCommandParamType.Float
        }
    ]
}, (source, targets, type, damage) => {
    /**
     * 进行操作的实体
     */
    const player = targets.length !== 0 ? targets[0] : source.sourceEntity;
    // 玩家不存在则提前返回
    if (!player || !player.isValid || !(player instanceof server.Player))
        return { message: '错误: 未找到有效目标玩家', status: server.CustomCommandStatus.Failure };
    // 判断数值设定
    if (damage <= 0)
        return { message: '错误: 数据值定义不符合预期', status: server.CustomCommandStatus.Failure };
    // 判断玩家权限
    if (!isPlayerAuthorized(player))
        return { message: '错误: 玩家没有权限执行此指令', status: server.CustomCommandStatus.Failure };
    // 运行功能代码
    server.system.run(() => {
        /**
         * 合并玩家当前属性与新增伤害值
         */
        const property = MergeProperty(GetProperty(player), { raise_basic_attack: damage, 'self_rune': type });
        /**
         * 判断是否触发暴击
         */
        const erupt = IsErupt(player);
        /**
         * 设置查询参数, 排除特定类型和家族的实体
         */
        const options = {
            excludeTypes: ["minecraft:item", "minecraft:xp_orb", player.typeId],
            excludeFamilies: ['starry']
        };
        /**
         * 计算玩家与实体的距离
         */
        const Distance = (entity) => Math.floor(Vector.distance(player.location, entity.location));
        /**
         * 获取排序后的实体队列
         */
        const queue = EntitysSort(player.dimension, options, (a, b) => Distance(a) - Distance(b), entity => !entity.getComponent('minecraft:is_tamed'));
        /**
         * 定义窗口界面标题
         */
        const title = {
            text: "§9<§u§l 元素攻击 §9>§r§9操作界面"
        };
        /**
         * 定义窗口界面表单对象
         */
        const display = new serverUI.ActionFormData().title(title);
        // 遍历实体队列并加入按钮
        if (queue.length >= 1)
            queue.forEach(entity => display.button(DistanceAndName(entity, Distance(entity))));
        else
            display.button('§4§l不存在 §c<§9 可以§6<§u 选中 §6>§9的实体 §c>§r');
        // 显示窗口界面
        display.show(player).then(option => {
            // 检测玩家是否选择了实体
            if (option.selection == undefined || queue.length == 0)
                return;
            /**
             * 获取目标对象
             */
            const target = queue[option.selection];
            /**
             * 应用元素攻击
             */
            ElementalAttack(player, target, erupt, property);
        });
    });
    // 显示运行成功的消息
    return { message: '元素伤害已施加', status: server.CustomCommandStatus.Success };
});
components$1.set({
    description: '修改游戏内部分结构的生成限制',
    name: 'opal:modify_structural_restrictions',
    permissionLevel: server.CommandPermissionLevel.Any,
    mandatoryParameters: [
        {
            name: '<§5§l 单目标生效 §r> 执行< 显示界面 >的玩家 <§v§l 默认执行者自身 §r>',
            type: server.CustomCommandParamType.PlayerSelector
        },
        {
            name: 'opal:模组扩展结构',
            type: server.CustomCommandParamType.Enum
        },
        {
            name: '是否运行结构再次生成',
            type: server.CustomCommandParamType.Boolean
        },
    ]
}, (source, targets, type, value) => {
    /**
     * 进行操作的实体
     */
    const player = targets.length !== 0 ? targets[0] : source.sourceEntity;
    // 玩家不存在则提前返回
    if (!player || !player.isValid || !(player instanceof server.Player))
        return { message: '错误: 未找到有效目标玩家', status: server.CustomCommandStatus.Failure };
    // 判断玩家权限
    if (!isPlayerAuthorized(player))
        return { message: '错误: 玩家没有权限执行此指令', status: server.CustomCommandStatus.Failure };
    // 运行功能代码
    server.world.setDynamicProperty('game_rules:regenerate.' + type, value);
    // 显示运行成功的消息
    return { message: '结构生成限制已修改', status: server.CustomCommandStatus.Success };
});
components$1.set({
    description: '查询并记录原版生物群系的坐标',
    name: 'opal:record_biome_location',
    permissionLevel: server.CommandPermissionLevel.Any,
    mandatoryParameters: [
        {
            name: '<§5§l 单目标生效 §r> 查询群系的玩家 <§v§l 默认执行者自身 §r>',
            type: server.CustomCommandParamType.PlayerSelector
        },
        {
            name: 'opal:原版生物群系',
            type: server.CustomCommandParamType.Enum
        }
    ]
}, (source, targets, type) => {
    /**
     * 进行操作的实体
     */
    const player = targets && targets.length !== 0 ? targets[0] : source.sourceEntity;
    // 玩家不存在则提前返回
    if (!player || !player.isValid || !(player instanceof server.Player))
        return { message: '错误: 未找到有效目标玩家', status: server.CustomCommandStatus.Failure };
    /**
     * 获取玩家当前维度
     */
    const dimension = player.dimension;
    // 运行功能代码
    server.system.run(() => {
        /**
         * 查找生态群系坐标
         */
        const biomeLocation = dimension.findClosestBiome(player.location, type);
        // 如果找到生态群系, 生成反馈消息并添加传送锚点
        if (biomeLocation) {
            /**
             * 反馈消息
             */
            const feedback = [
                { text: '-=-=-=-=-=-=-=-=-=-=-=-=-=-=\n' },
                { text: `§n生态群系§r :§u§l ${type}§r\n\n` },
                { text: `§q群系坐标§r :§s§l ${Vector.toString(biomeLocation)}§r\n\n` },
                { text: '已为你添加传送锚点! \n' },
                { text: '-=-=-=-=-=-=-=-=-=-=-=-=-=-=\n\n' },
            ];
            /**
             * 保存锚点信息
             */
            const anchor = JSON.stringify({ location: Vector.floor(biomeLocation), dimension: dimension.id });
            // 添加锚点信息
            player.setDynamicProperty('road_sign:' + type, anchor);
            // 显示反馈消息
            player.sendMessage(feedback);
        }
        else
            player.sendMessage("未找到指定生物群系");
    });
});
components$1.set({
    description: '创建一个指向特定维度与坐标的雾海裂隙',
    name: 'opal:create_misty_sea_fissure',
    permissionLevel: server.CommandPermissionLevel.Any,
    mandatoryParameters: [
        {
            name: '<§5§l 单目标生效 §r> 查询群系的玩家 <§v§l 默认执行者自身 §r>',
            type: server.CustomCommandParamType.PlayerSelector
        },
        {
            name: '雾海裂隙所指向的坐标',
            type: server.CustomCommandParamType.Location
        },
        {
            name: 'opal:原版世界维度',
            type: server.CustomCommandParamType.Enum
        }
    ]
}, (source, targets, location, dimension) => {
    /**
     * 进行操作的实体
     */
    const player = targets.length !== 0 ? targets[0] : source.sourceEntity;
    // 玩家不存在则提前返回
    if (!player || !player.isValid || !(player instanceof server.Player))
        return { message: '错误: 未找到有效目标玩家', status: server.CustomCommandStatus.Failure };
    // 判断玩家权限
    if (!isPlayerAuthorized(player))
        return { message: '错误: 玩家没有权限执行此指令', status: server.CustomCommandStatus.Failure };
    /**
     * 坐标组
     */
    const location_group = [player.getHeadLocation(), location];
    /**
     * 维度组
     */
    const dimension_group = [player.dimension, server.world.getDimension(dimension) || player.dimension];
    /**
     * 源坐标
     */
    const intel = { location: player.getHeadLocation(), dimension: player.dimension };
    // 播放声音效果
    server.system.runTimeout(() => player.playSound("ambient.weather.thunder"), 100);
    server.system.runTimeout(() => player.playSound("ambient.weather.thunder"), 10);
    // 显示数字粒子效果
    server.system.runTimeout(() => NumberParticleDisplay(intel, 4, Vector.CONSTANT_ZERO), 15);
    server.system.runTimeout(() => NumberParticleDisplay(intel, 3, Vector.CONSTANT_ZERO), 35);
    server.system.runTimeout(() => NumberParticleDisplay(intel, 2, Vector.CONSTANT_ZERO), 55);
    server.system.runTimeout(() => NumberParticleDisplay(intel, 1, Vector.CONSTANT_ZERO), 75);
    server.system.runTimeout(() => NumberParticleDisplay(intel, 0, Vector.CONSTANT_ZERO), 95);
    // 创建 雾海裂隙
    server.system.runTimeout(() => MistySeaFissure.BriefCreate(player.id, { locations: location_group, dimensions: dimension_group }), 80);
    // 显示运行成功的消息
    return { message: '雾海裂隙已创建', status: server.CustomCommandStatus.Success };
});
// TODO 实现自定义指令
/**
 * 处理交换表选择
 *
 * 根据玩家的选择处理交换表的获取逻辑, 包括条件判断, 物品交换和特效展示
 *
 * @param {server.Player} player - 玩家对象
 *
 * @param {serverUI.ActionFormResponse} option - 玩家的选择结果
 *
 * @param {[string, type.SCHEDULE_NOTE][]} entry - 可获取的交换表列表
 */
function analysisExchangeForm(player, option, entry) {
    // 检测玩家是否未做出选择
    if (option.selection == undefined)
        return;
    /**
     * 获取 玩家背包
     */
    const container = player.getComponent('inventory')?.container;
    /**
     * 玩家选中的交换表
     */
    const select = entry[option.selection][1];
    // 判断背包是否存在
    if (!container)
        return;
    // 判断是否满足前处理函数的条件
    if (select.before && !select.before(player))
        return player.onScreenDisplay.setTitle([
            { text: `§4§l条件不满足\n无法完成任务\n§6< §u` },
            { text: entry[option.selection][0] },
            { text: '§6 >§r' }
        ]);
    // 判断是否满足删除特定物品的条件
    if (select.attrition && !CheckItemStack(container, select.attrition.map(intel => CreateItemFromStackData(intel))))
        return player.onScreenDisplay.setTitle([
            { text: `§4§l物品数量不足\n无法完成任务\n§p< §u` },
            { text: entry[option.selection][0] },
            { text: '§6 >§r' }
        ]);
    // 删除特定物品
    select.attrition?.forEach(intel => DeleteItemStack(container, CreateItemFromStackData(intel)));
    // 给与任务完成奖励
    if (select.reward)
        select.reward.forEach(intel => TrySpawnItem(player.dimension, CreateItemFromStackData(intel), player.location));
    // 添加 任务标签
    if (select.onDone)
        select.onDone.forEach(info => player.addTag(info));
    // 播放 引导提示
    if (select.prompt)
        PlayPrompt(player, select.prompt);
    // 执行后处理函数
    if (select.after)
        select.after(player);
    // 任务完成后的特效提示
    player.onScreenDisplay.setTitle([
        { text: `§6§l恭喜你完成任务\n§d< §9` },
        { text: entry[option.selection][0] },
        { text: '§d >§r' }
    ]);
    TrySpawnParticle(player.dimension, 'constant:fireworks_fireball_rune_orange', player.getHeadLocation());
    TrySpawnParticle(player.dimension, 'constant:fireworks_paper_rune_orange', player.getHeadLocation());
    player.playSound('firework.twinkle');
}
/**
 * 交换表功能
 *
 * 为玩家展示可获取的交换表, 并处理玩家的选择
 *
 * @param {server.Player} player - 玩家对象
 *
 * @param {server.RawMessage} title - 界面标题
 *
 * @param {Map<string, type.SCHEDULE_NOTE>} data - 可获取的交换表数据
 *
 * @returns {Promise<void>} - 返回一个Promise, 表示异步操作的完成
 */
async function exchangeForm(player, title, data) {
    // 延迟执行, 避免触发器冲突
    await server.system.waitTicks(0);
    /**
     * 创建一个触发控制器, 用于管理玩家操作
     */
    const control = TriggerControl('exchangeForm', player, 200);
    // 设置事件触发限速器
    if (!TriggerControl('触发交换表', player, 40))
        return;
    // 检测玩家是否正在执行其他任务
    if (!control) {
        /**
         * 获取控制器剩余时间
         */
        const wait = ObtainWaitTime('exchangeForm', player);
        /**
         * 将剩余时间换算成秒
         */
        const conversion = (wait / 20).toFixed(1);
        // 创建音效
        player.playSound('chime.amethyst_block');
        // 显示剩余时间
        player.onScreenDisplay.setActionBar('§4§l建议等待 ' + conversion + ' 秒...');
    }
    /**
     * 定义了 窗口界面 的 表单对象
     */
    const display = new serverUI.ActionFormData().title(title);
    /**
     * 获取 玩家拥有的标签
     */
    const tags = new Set(player.getTags());
    /**
     * 过滤出玩家符合条件且未完成的计划
     */
    const entry = [...data]
        .filter(info => info[1]?.rely?.every(tag => tags.has(tag)) ?? true)
        .filter(info => !info[1]?.onDone?.every(tag => tags.has(tag)));
    // 检测是否有满足条件的计划
    if (entry.length == 0)
        return player.onScreenDisplay.setTitle(ReplyMessages.cannot_select);
    // 添加 计划按钮
    entry.forEach(info => display.button(info[0], info[1].texture));
    // 显示 窗口界面
    display.show(player).then(option => {
        // 检测玩家是否未做出选择
        if (option.selection == undefined)
            return;
        /**
         * 玩家选中的交换表
         */
        const select = entry[option.selection];
        /**
         * 创建 详情页表单对象
         */
        const action = new serverUI.ActionFormData().title(select[0]).body({ rawtext: select[1].refer });
        // 添加按钮
        action.button('§9§l领取§r').button('§u§l返回§r');
        // 显示详情页表单并处理玩家选择
        action.show(player).then(info => {
            /**
             * 如果玩家取消操作或选择无效, 则直接返回
             */
            if (info.canceled || info.selection == undefined)
                return;
            /**
             * 解析表单内容并尝试领取奖励
             */
            info.selection == 0 ? analysisExchangeForm(player, option, entry) : exchangeForm(player, title, data);
            /**
             * 播放翻书音效, 提示玩家操作成功
             */
            player.playSound('item.book.page_turn');
        });
    });
}
/**
 * 获取实体周围最近的蛋糕方块
 *
 * 该函数遍历实体周围的方块, 寻找最近的蛋糕方块
 *
 * @param {server.Entity} entity - 服务器实体对象
 *
 * @returns {server.Block | undefined} - 返回最近的蛋糕方块, 如果找不到则返回undefined
 */
function getClosestCakeToEntity(entity) {
    /**
     * 获取实体所在位置的基准方块
     */
    const sourceBlock = entity.dimension.getBlock(entity.location);
    // 如果基准方块不存在, 直接返回undefined
    if (!sourceBlock)
        return;
    // 遍历基准方块周围的方块, 搜索范围为 -3 到 3 的立方体区域内
    for (let axleX = -3; axleX <= 3; axleX++)
        for (let axleY = -3; axleY <= 3; axleY++)
            for (let axleZ = -3; axleZ <= 3; axleZ++) {
                /**
                 * 获取相对于基准方块的偏移位置的方块
                 */
                const query = sourceBlock.offset({ x: axleX, y: axleY, z: axleZ });
                // 如果找到蛋糕方块, 则返回该方块
                if (query && query.typeId == 'minecraft:cake')
                    return query;
            }
    // 如果遍历完所有方块后没有找到蛋糕方块, 返回undefined
    return undefined;
}
/**
 * 定位最近的蛋糕方块并模拟实体食用蛋糕
 *
 * 该函数首先寻找最近的蛋糕方块, 然后模拟实体食用蛋糕的过程,
 *
 * 包括播放动画, 修改蛋糕方块的食用计数, 播放音效等
 *
 * @param {server.Entity} entity - 服务器实体或玩家对象
 */
function locateCakeAndEatCake(entity) {
    /**
     * 获取实体周围最近的蛋糕方块
     */
    const cakeBlcok = getClosestCakeToEntity(entity);
    // 如果没有找到蛋糕方块, 则终止函数执行
    if (!cakeBlcok)
        return;
    /**
     * 获取蛋糕方块的当前食用计数
     */
    const bite_counter = cakeBlcok.permutation.getState('bite_counter');
    // 播放实体食用蛋糕的动画
    entity.playAnimation('animation.entity.role_sitting.tasting_food', { stopExpression: '!q.is_sitting && !q.is_riding' });
    // 修正实体的位置, 使其面向蛋糕方块
    entity.teleport(entity.location, { facingLocation: cakeBlcok.bottomCenter() });
    // 设置延时任务, 10个tick后执行蛋糕食用逻辑
    server.system.runTimeout(() => {
        // 将蛋糕放入实体的主手
        entity.runCommand('replaceitem entity @s slot.weapon.mainhand 0 minecraft:cake');
        // 增加蛋糕方块的食用计数
        TrySetPermutation(cakeBlcok, 'bite_counter', bite_counter + 1);
        // 播放食用蛋糕的音效
        entity.dimension.playSound('cake.add_candle', cakeBlcok.location);
    }, 10);
    // 设置延时任务, 一段时间后播放音效
    server.system.runTimeout(() => entity.dimension.playSound('random.eat', entity.location), 10);
    server.system.runTimeout(() => entity.dimension.playSound('random.eat', entity.location), 15);
    server.system.runTimeout(() => entity.dimension.playSound('random.eat', entity.location), 20);
    server.system.runTimeout(() => entity.dimension.playSound('random.eat', entity.location), 25);
    // 设置延时任务, 50个tick后清除实体的主手物品
    server.system.runTimeout(() => entity.runCommand('replaceitem entity @s slot.weapon.mainhand 0 air'), 50);
}
/**
 * 播放实体展示手持物品的动画, 并在一段时间后将指定物品放入实体的主手
 *
 * 然后播放音效, 最后清除主手物品
 *
 * @param {server.Entity | server.Player} entity - 服务器实体或玩家对象
 *
 * @param {string} type - 要展示的物品类型
 */
function displayItem(entity, type) {
    // 播放 实体 展示手持物品 的 动画
    entity.playAnimation('animation.entity.role_sitting.display_items', { stopExpression: '!q.is_sitting && !q.is_riding' });
    // 设置延时任务, 一段时间后将物品放入实体的主手
    server.system.runTimeout(() => entity.runCommand('replaceitem entity @s slot.weapon.mainhand 0 ' + type), 10);
    // 设置延时任务, 一段时间后播放音效
    server.system.runTimeout(() => entity.dimension.playSound('armor.equip_generic', entity.location), 25);
    // 设置延时任务, 一段时间后清除实体的主手物品
    server.system.runTimeout(() => entity.runCommand('replaceitem entity @s slot.weapon.mainhand 0 air'), 78);
}
/**
 * 播放实体展示装备的动画, 并在一段时间后将指定装备放入实体的主手
 *
 * 然后播放音效, 最后清除主手装备
 *
 * @param {server.Entity | server.Player} entity - 服务器实体或玩家对象
 *
 * @param {string} type - 要展示的装备类型
 */
function displayEquipment(entity, type) {
    // 播放 实体 展示手持物品 的 动画
    entity.playAnimation('animation.entity.role_sitting.display_equipment', { stopExpression: '!q.is_sitting && !q.is_riding' });
    // 设置延时任务, 一段时间后将装备放入实体的主手
    server.system.runTimeout(() => entity.runCommand('replaceitem entity @s slot.weapon.mainhand 0 ' + type), 10);
    // 设置延时任务, 一段时间后播放音效
    server.system.runTimeout(() => entity.dimension.playSound('armor.equip_generic', entity.location), 15);
    // 设置延时任务, 一段时间后清除实体的主手物品
    server.system.runTimeout(() => entity.runCommand('replaceitem entity @s slot.weapon.mainhand 0 air'), 120);
}
/**
 * 播放实体吃掉手持食物的动画, 并在一段时间后将指定食物放入实体的主手
 *
 * 然后播放吃食物的音效, 最后清除主手食物
 *
 * @param {server.Entity | server.Player} entity - 服务器实体或玩家对象
 *
 * @param {string} type - 要品尝的食物类型
 */
function tastingFood(entity, type) {
    // 播放 实体 吃掉手持物品 的 动画
    entity.playAnimation('animation.entity.role_sitting.tasting_food', { stopExpression: '!q.is_sitting && !q.is_riding' });
    // 设置延时任务, 一段时间后将食物放入实体的主手
    server.system.runTimeout(() => entity.runCommand('replaceitem entity @s slot.weapon.mainhand 0 ' + type), 10);
    // 设置延时任务, 一段时间后播放音效
    server.system.runTimeout(() => entity.dimension.playSound('random.eat', entity.location), 10);
    server.system.runTimeout(() => entity.dimension.playSound('random.eat', entity.location), 15);
    server.system.runTimeout(() => entity.dimension.playSound('random.eat', entity.location), 20);
    server.system.runTimeout(() => entity.dimension.playSound('random.eat', entity.location), 25);
    // 设置延时任务, 一段时间后清除实体的主手物品
    server.system.runTimeout(() => entity.runCommand('replaceitem entity @s slot.weapon.mainhand 0 air'), 50);
}
/**
 * 在实体空闲状态下执行特定行为
 *
 * 根据实体的状态类型, 执行不同的行为, 如播放语音, 寻找并食用蛋糕等
 *
 * @param {server.Entity | server.Player} entity - 要执行行为的实体或玩家对象
 *
 * @param {string} type - 实体的状态类型, 例如 'is_sitting'
 *
 * @returns {Promise<void>} - 返回一个Promise, 表示异步操作的完成
 */
async function performActionInIdleState(entity, type) {
    // 延迟执行, 避免触发器冲突
    await server.system.waitTicks(0);
    /**
     * 待机动画行为权重列表
     */
    const weightedActions = [
        // 播放常规语音
        { weight: 1, action: speechAndVoiceManager, input: '空闲' },
        // 展示 锻造模板
        { weight: 3, action: displayItem, input: 'minecraft:silence_armor_trim_smithing_template' },
        // 展示 附魔金苹果
        { weight: 3, action: displayItem, input: 'minecraft:enchanted_golden_apple' },
        // 展示 海洋之心
        { weight: 3, action: displayItem, input: 'minecraft:heart_of_the_sea' },
        // 展示 不死图腾
        { weight: 3, action: displayItem, input: 'minecraft:totem_of_undying' },
        // 展示 龙息
        { weight: 3, action: displayItem, input: 'minecraft:dragon_breath' },
        // 展示 下界之星
        { weight: 3, action: displayItem, input: 'minecraft:nether_star' },
        // 展示 钻石
        { weight: 3, action: displayItem, input: 'minecraft:diamond' },
        // 展示 逻辑与非
        { weight: 3, action: displayItem, input: 'starry_map:correct_logic_nand' },
        // 展示 逻辑非
        { weight: 3, action: displayItem, input: 'starry_map:correct_logic_not' },
        // 展示 逻辑或非
        { weight: 3, action: displayItem, input: 'starry_map:correct_logic_nor' },
        // 展示 逻辑与
        { weight: 3, action: displayItem, input: 'starry_map:correct_logic_and' },
        // 展示 分光棱镜
        { weight: 3, action: displayItem, input: 'starry_map:correct_spectral_prism' },
        // 展示 偏光棱镜
        { weight: 3, action: displayItem, input: 'starry_map:correct_deflection_prism' },
        // 展示 林业指南
        { weight: 7, action: displayEquipment, input: 'starry_map:forestry_guidelines' },
        // 展示 矿物辞典
        { weight: 7, action: displayEquipment, input: 'starry_map:mineral_dictionary' },
        // 展示 空间宝典
        { weight: 7, action: displayEquipment, input: 'starry_map:space_transition' },
        // 展示 精灵治愈
        { weight: 7, action: displayEquipment, input: 'starry_map:faerie_healing' },
        // 展示 魔导手册
        { weight: 7, action: displayEquipment, input: 'starry_map:magic_handbook' },
        // 展示 源能秘典
        { weight: 7, action: displayEquipment, input: 'starry_map:source_energy' },
        // 展示 哨兵模块
        { weight: 7, action: displayEquipment, input: 'starry_map:call_python_sentinel' },
        // 展示 钻探模块
        { weight: 7, action: displayEquipment, input: 'starry_map:call_tunnel_dragon_guide' },
        // 展示 魔晶扳手
        { weight: 7, action: displayEquipment, input: 'starry_map:magic_crystal_wrench' },
        // 展示 匣里乾坤
        { weight: 7, action: displayEquipment, input: 'starry_map:world_of_box' },
        // 展示 容器枢纽
        { weight: 7, action: displayEquipment, input: 'starry_map:container_hub' },
        // 展示 驱动核心
        { weight: 7, action: displayEquipment, input: 'starry_map:servo_omphalos' },
        // 展示 容器整理
        { weight: 7, action: displayEquipment, input: 'starry_map:container_arrange' },
        // 展示 金属锻压
        { weight: 7, action: displayEquipment, input: 'starry_map:netherite.metal_forming_press' },
        // 吃 附魔金苹果
        { weight: 15, action: tastingFood, input: 'minecraft:enchanted_golden_apple' },
        // 吃 南瓜派
        { weight: 15, action: tastingFood, input: 'minecraft:pumpkin_pie' },
        // 吃 曲奇饼干
        { weight: 15, action: tastingFood, input: 'minecraft:cookie' },
        // 吃 苹果
        { weight: 15, action: tastingFood, input: 'minecraft:apple' },
        // 寻找蛋糕并吃蛋糕
        { weight: 30, action: locateCakeAndEatCake, input: null }
    ];
    /**
     * 根据权重计算累积权重数组
     */
    const cumulativeWeights = weightedActions.reduce((acc, action) => {
        /**
         * 获取上一个累积权重, 如果没有上一个, 则默认为 0
         */
        const lastWeight = acc.length > 0 ? acc[acc.length - 1] : 0;
        // 将当前累积权重加上当前动作的权重
        acc.push(lastWeight + action.weight);
        // 返回累积权重数组
        return acc;
    }, []);
    // 如果实体是坐着的动作, 则根据权重随机执行一个待机动画
    if (type === 'is_sitting') {
        /**
         * 生成一个随机数, 范围在 0 到 累积总权重 之间
         */
        const randomWeight = RandomFloor(0, cumulativeWeights[cumulativeWeights.length - 1]);
        /**
         * 找到对应的行为
         */
        const selectedAction = weightedActions.find((action, index) => {
            return index === 0 ? randomWeight < action.weight : randomWeight < cumulativeWeights[index] && randomWeight >= cumulativeWeights[index - 1];
        });
        // 如果没有找到对应的行为, 则返回
        if (!selectedAction)
            return;
        // 如果有参数, 则执行带有参数的函数
        if (selectedAction.input !== null)
            selectedAction.action(entity, selectedAction.input);
        // 如果没有参数, 直接执行函数
        else
            selectedAction.action(entity);
    }
    // 如果不是坐着的动作, 则播放常规语音
    else
        speechAndVoiceManager(entity, '空闲');
}
/**
 * < 神恩领航者 >台词播放管理器
 *
 * @param {server.Entity | server.Player} self - 目标实体或玩家对象
 *
 * @param {string} tag - 语音类型标识符
 *
 * @returns {Promise<void>} - 返回一个Promise, 表示异步操作的完成
 */
async function speechAndVoiceManager(self, tag) {
    // 延迟执行, 避免触发器冲突
    await server.system.waitTicks(0);
    // 检查播报权限控制
    if (!TriggerControl('台词 => ' + self.typeId + tag, new Vector(0, 0, 0), 600))
        return;
    /**
     * 提取角色类型标签
     */
    const roleType = self.typeId.split(/:/)[1];
    /**
     * 设置广播范围参数
     */
    const broadcastOptions = {
        location: self.location,
        maxDistance: 8
    };
    /**
     * 获取附近玩家列表
     */
    const nearbyPlayers = self.dimension.getPlayers(broadcastOptions);
    /**
     * 获取对应的角色台词库
     */
    const dialogueContent = dialogue.get(roleType);
    // 检查是否有有效玩家或台词内容
    if (nearbyPlayers.length === 0 || !dialogueContent)
        return;
    // 遍历附近的玩家
    nearbyPlayers.forEach(player => {
        /**
         * 定义标签列表, 用于匹配台词
         */
        const matchingTags = [tag, player.nameTag];
        /**
         * 定义台词权重映射
         */
        const speechWeightMap = new Map();
        /**
         * 定义台词范围数组, 用于存储匹配的台词信息
         */
        const matchingSpeeches = [];
        // 遍历台词库, 筛选符合条件的台词并填充权重映射
        dialogueContent.forEach(speech => {
            if (speech.tags.every(item => matchingTags.includes(item))) {
                matchingSpeeches.push(speech);
                speechWeightMap.set(speech.message, speech.weight);
            }
        });
        if (matchingSpeeches.length !== 0) {
            /**
             * 分析台词权重并获取随机台词
             */
            const weightResult = AnalysisWeight(speechWeightMap);
            /**
             * 生成消息内容
             */
            const messageParts = [translate(self), { text: ' : ' }, weightResult.output];
            // 发送台词到玩家
            player.sendMessage(messageParts);
            // 播放对应的语音
            player.playSound(matchingSpeeches[weightResult.index].sound ?? 'random.lever_click');
            /**
             * 检查是否有联动台词
             */
            const linkage = matchingSpeeches[weightResult.index].linkage;
            /**
             * 检查是否有事件
             */
            const event = matchingSpeeches[weightResult.index].event;
            // 如果存在事件, 则调用该事件的执行
            if (event)
                event(self);
            // 如果没有联动台词, 直接返回
            if (!linkage)
                return;
            /**
             * 获取进行台词联动的实体
             */
            const target = EntitysSort(self.dimension, broadcastOptions, undefined, (entity) => entity.typeId === linkage.id)[0];
            // 如果没有找到目标实体, 直接返回
            if (!target || !target.isValid)
                return;
            // 延迟执行联动对话
            server.system.runTimeout(() => speechAndVoiceManager(target, linkage.tag), linkage.wait);
        }
        else {
            /**
             * 使用默认台词
             */
            const defaultSpeech = defaultSpeak;
            /**
             * 生成消息内容
             */
            const messageParts = [translate(self), { text: ' : ' }, defaultSpeech[RandomFloor(0, defaultSpeech.length - 1)]];
            // 发送默认台词到玩家
            player.sendMessage(messageParts);
        }
    });
}
/**
 * 神恩领航者 - 元素攻击
 *
 * @param {server.Entity} self - 领航者实体对象
 *
 * @param {string} type - 领航者技能类型
 *
 * @returns {Promise<void>} - 返回一个Promise, 表示异步操作的完成
 */
async function divineFavorGirlAttack(self, type) {
    // 延迟执行, 避免触发器冲突
    await server.system.waitTicks(0);
    // 判断 是否 完成初始化
    if (!self || !self.isValid || !self.getDynamicProperty('entity:is_initial'))
        return;
    /**
     * 能量返还
     */
    const returnEnergy = self.getDynamicProperty('entity:return_energy') ?? 0;
    /**
     * 天赋解锁
     */
    const unlock = self.getDynamicProperty('entity:unlock') ?? false;
    /**
     * 战术等级
     */
    const improve = self.getDynamicProperty('entity:improve') ?? 1;
    /**
     * 获取 实体属性面板
     */
    const getData = GetProperty(self);
    /**
     * 是否暴击
     */
    const erupt = IsErupt(self);
    /**
     * 攻击目标
     */
    const target = self.target;
    /**
     * 获取 契约玩家 的 唯一标识符
     */
    const user = self.getDynamicProperty('entity:contract_user');
    // 设置实体速度
    self.addEffect('slowness', 80, { 'amplifier': 255, 'showParticles': false });
    // 判断 目标是否存在 且 是否应该终止攻击执行
    if (!target || divineFavorGirlBattleInterrupted(self, target))
        return;
    // 修正实体朝向
    self.setRotation(Vector.difference(self.location, target.location));
    // 判断 领航者 是否并未完成 角色契约 或 升级等级小于 5 级
    if (!user || improve <= 5)
        switch (type) {
            //* 风信
            case 'windnews':
                MoonLight(self, target, erupt, getData);
                break;
            //* 默认
            default:
                DefaultAttack(self, target, erupt, getData);
                break;
        }
    // 判断 领航者 是否完成 角色契约 且 升级等级大于 5 级
    else
        switch (type) {
            //* 珍珠水母
            case 'jellyfish_of_pearl':
                jellyfishInPearl(self, target, getData);
                break;
            //* 珍珠游鱼
            case 'fish_of_pearl':
                fishInPearl(self, target, erupt);
                break;
            //* 珍珠
            case 'pearl':
                Pearl(self, target);
                break;
            //* 琉璃
            case 'crystal':
                Crystal(self, target, erupt, getData);
                break;
            //* 蔷薇
            case 'rambler':
                Rambler(self, getData);
                break;
            //* 森涅
            case 'sennie':
                SenNie(self, target, erupt, getData);
                break;
            //* 绯红
            case 'crimson':
                Crimson(self, target, erupt, getData);
                break;
            //* 星砂
            case 'starsand':
                StarSand(self, target, erupt, getData);
                break;
            //* 月华
            case 'moonlight':
                MoonLight(self, target, erupt, getData);
                break;
            //* 海灵
            case 'hailing':
                HaiLing(self, target, erupt, getData);
                break;
            //* 海娜
            case 'haina':
                HaiNa(self, target, erupt, getData);
                break;
            //* 幽蓝
            case 'dullblue':
                Dullblue(self, target, erupt, getData);
                break;
            //* 九九
            case 'ninenine':
                NineNine(self, target, erupt, getData);
                break;
            //* 雪隐
            case 'snowhidden':
                SnowHidden(self, target, erupt, getData);
                break;
            //* 默认
            default:
                DefaultAttack(self, target, erupt, getData);
                break;
        }
    // 判断 升级等级是否大于 5 级
    if (improve > 5 && !unlock) {
        // 向玩家播放通知
        server.world.getPlayers().filter(player => player.id === user).forEach(player => {
            /**
             * 玩家屏幕标题对象
             */
            const display = player.onScreenDisplay;
            /**
             * 角色位置
             */
            const roleLocation = Vector.copy(self.getHeadLocation());
            /**
             * 玩家位置
             */
            const playerLocation = Vector.copy(player.getHeadLocation());
            /**
             * 定义 粒子参数
             */
            const molang = new server.MolangVariableMap();
            /**
             ** 粒子射流方向
             */
            const direction = Vector.difference(roleLocation, playerLocation);
            // 设定 玩家屏幕标题
            display.setTitle(translate(self));
            // 设置副标题
            display.updateSubtitle({ text: '解锁< 雾海巡游 >机制' });
            // 播放 音效
            player.playSound('block.enchanting_table.use');
            // 设置 粒子参数
            molang.setFloat('variable.type', 0);
            molang.setVector3('variable.direction', direction);
            // 播放射流粒子
            TrySpawnParticle(self.dimension, 'scripts:path_ray', self.location, molang);
        });
        // 修改实体动态属性
        self.setDynamicProperty('entity:unlock', true);
    }
    // 判断 能量返还值 是否大于 0
    if (returnEnergy === 0)
        return;
    /**
     * 获取 领航者所在方块
     */
    const block = self.dimension.getBlock(Vector.add(self.location, Vector.CONSTANT_DOWN));
    // 判断 领航者所在方块 是否存在 且 是否为 实体方块
    if (!block || !block.isValid || !block.isSolid)
        return;
    // 设置 星尘能量值
    ExpendEnergy(block, returnEnergy, false, true);
}
/**
 * 神恩领航者 攻击中断系统
 *
 * 根据目标实体类型和状态判断是否触发神圣契约保护机制, 阻止领航者对特定目标的攻击行为
 *
 * 中断条件优先级:
 * 1. 目标为玩家且非敌对种族
 * 2. 目标属于受保护阵营（村民/星空）
 * 3. 目标已被驯服
 * 4. 目标实体无效
 *
 * @param {server.Entity} self - 攻击发起者（领航者实体）
 *   - 必须包含 type_family 组件
 *   - 若具有「契约豁免」特性可绕过保护机制
 *
 * @param {server.Entity} target - 被攻击的目标实体
 *   - 需检测 type_family / is_tamed 组件状态
 *   - 无效实体自动触发保护
 *
 * @returns {boolean} 攻击中断判定结果
 *   - true: 触发神圣契约, 终止攻击
 *   - false: 允许继续攻击
 */
function divineFavorGirlBattleInterrupted(self, target) {
    // todo 组件状态预检
    /**
     * 目标的种族阵营组件
     * - 检测 type_family 组件是否存在
     * - 用于识别玩家 / 怪物 / 村民 / 星空等阵营类型
     */
    const targetFamily = target?.getComponent('type_family');
    /**
     * 攻击发起者的种族阵营组件
     * - 检测 type_family 组件是否存在
     * - 用于识别自身是否有契约豁免
     */
    const selfFamily = self?.getComponent('type_family');
    /**
     * 目标的驯服状态组件
     * - 检测 is_tamed 组件是否存在
     * - 用于判断是否属于可被保护的友好单位
     */
    const targetTamed = target?.getComponent('is_tamed');
    // todo 保护机制触发事件
    /**
     * 执行< 律令: >协议
     *
     * 触发效果:
     * 1. 向 15 格范围内玩家发送实时警告
     * 2. 触发攻击终止事件
     *
     * @returns {boolean} 固定返回 true 作为攻击中断信号
     */
    const triggerProtectionProtocol = () => {
        // 发送三维空间紧急警告（红色行动栏提示）
        self.runCommand('title @a[r=15] actionbar §4§l<§c 律令:禁武 §4>§r : < @s >无权发动本次攻击');
        // 激活实体攻击终止事件钩子
        self.triggerEvent('entity_event:attack_done');
        return true;
    };
    // todo 攻击中断条件判断流
    /* 契约豁免检测（优先级最高） */
    if (selfFamily?.hasTypeFamily('contract_immunity'))
        return false; // 拥有契约豁免权, 无视保护机制
    /* 玩家保护条款:目标为玩家且不属于怪物阵营时 */
    if (targetFamily?.hasTypeFamily('player') && !targetFamily?.hasTypeFamily('monster'))
        return triggerProtectionProtocol();
    /* 村民阵营保护 */
    if (targetFamily?.hasTypeFamily('villager'))
        return triggerProtectionProtocol();
    /* 星空阵营保护 */
    if (targetFamily?.hasTypeFamily('starry'))
        return triggerProtectionProtocol();
    /* 驯服单位保护 */
    if (targetTamed)
        return triggerProtectionProtocol();
    /* 无效目标保护 */
    if (!target || !target.isValid)
        return triggerProtectionProtocol();
    // 所有保护条件未触发, 允许继续攻击
    return false;
}
/**
 * 烛火野蜂群 - 元素攻击
 *
 * @param {server.Entity} self - 实体对象
 *
 * @param {string} type - 类型
 *
 * @returns {Promise<void>} - 返回一个Promise, 表示异步操作的完成
 */
async function machineWaspAttack(self, type) {
    // 延迟执行, 避免触发器冲突
    await server.system.waitTicks(0);
    // 判断 是否 完成初始化
    if (!self || !self.isValid || !self.getDynamicProperty('entity:is_initial'))
        return;
    // 判断触发控制器是否冷却完成
    if (!TriggerControl('攻击冷却', self, 40))
        return;
    /**
     * 攻击目标
     */
    const target = self.target;
    // 检测 攻击目标
    if (!target || !target.isValid)
        return;
    // 执行细分事件
    switch (type) {
        //* 野蜂 - 侦查者
        case 'detection':
            Detection(self, target);
            break;
        //* 野蜂 - 君临者
        case 'emperor':
            Emperor(self, target);
            break;
        //* 野蜂 - 维系者
        case 'support':
            Support(self);
            break;
        //* 野蜂 - 维系者
        case 'guide':
            Guide(self);
            break;
    }
}
/**
 * 诸海渊鲸艇 - 元素攻击
 *
 * @param {server.Entity} self - 实体对象
 *
 * @param {string} type - 类型
 *
 * @returns {Promise<void>} - 返回一个Promise, 表示异步操作的完成
 */
async function machineWhaleAttack(self, type) {
    // 延迟执行, 避免触发器冲突
    await server.system.waitTicks(0);
    // 判断 是否 完成初始化
    if (!self || !self.isValid || !self.getDynamicProperty('entity:is_initial'))
        return;
    // 判断触发控制器是否冷却完成
    if (!TriggerControl('攻击冷却', self, 40))
        return;
    /**
     * 是否暴击
     */
    const erupt = IsErupt(self);
    /**
     * 攻击目标
     */
    const target = self.target;
    // 检测 攻击目标
    if (!target || !target.isValid)
        return;
    // 执行细分事件
    switch (type) {
        //* 渊鲸 - 执行者
        case 'execute':
            Execute(self, target, erupt);
            break;
        //* 渊鲸 - 君临者
        case 'emperor':
            Emperor$1(self, target, erupt);
            break;
    }
}
/**
 * 归忆蝰蛇炮 - 元素攻击
 *
 * @param {server.Entity} self - 实体对象
 *
 * @param {string} type - 类型
 *
 * @returns {Promise<void>} - 返回一个Promise, 表示异步操作的完成
 */
async function machineViperAttack(self, type) {
    // 延迟执行, 避免触发器冲突
    await server.system.waitTicks(0);
    // 判断 是否 完成初始化
    if (!self || !self.isValid || !self.getDynamicProperty('entity:is_initial'))
        return;
    // 判断触发控制器是否冷却完成
    if (!TriggerControl('攻击冷却', self, 40))
        return;
    /**
     * 攻击目标
     */
    const target = self.target;
    // 检测 攻击目标
    if (!target || !target.isValid)
        return;
    // 修正实体朝向
    self.setRotation(Vector.difference(self.location, target.location));
    // 执行细分事件
    switch (type) {
        //* 蝰蛇 - 维系者
        case 'support':
            Support$1(self, target);
            break;
        //* 星图阵营
        case 'starry_family':
            StarryFamily(self, target);
            break;
    }
}
/**
 * 隧龙列车运行事件
 *
 * @param {server.Entity} entity - 隧龙列车实体
 *
 * @param {string} type - 列车事件类型
 *
 * @returns {Promise<void>} - 返回一个Promise, 表示异步操作的完成
 */
async function tunnelDragonTravel(entity, type) {
    // 延迟执行, 避免触发器冲突
    await server.system.waitTicks(0);
    // 判断 实体是否有效
    if (!entity || !entity.isValid)
        return;
    /**
     * 获取 列车能量
     */
    const energy = entity.getDynamicProperty('energy:offline_vehicle_power') ?? 3500;
    // 基于事件类型执行细分操作
    switch (type) {
        // 列车行驶
        case 'train_travel':
            if (energy >= 200) {
                /**
                 * 申请 触发控制令牌
                 */
                const token = TriggerControl('隧龙列车-光照方块', entity, 45);
                // 触发 数据驱动 实体事件
                entity.triggerEvent('entity_event:travel');
                // 检测光照令牌是否申请成功
                if (!token)
                    return;
                // 消耗列车能量
                entity.setDynamicProperty('energy:offline_vehicle_power', energy - 200);
                /**
                 * 定义 坐标基准点
                 */
                const anchor = Vector.relativeOffset(entity.location, entity.getViewDirection(), { front: -4, right: 0, above: 0 });
                /**
                 * 方块状态-灵魂火把
                 */
                const permutation = server.BlockPermutation.resolve('minecraft:soul_torch');
                /**
                 * 转化为光源的预备方块
                 */
                const block = entity.dimension.getBlock(anchor);
                // 如果 方块为空气 就转换为 灵魂火把
                if (block?.isAir)
                    block.setPermutation(permutation);
            }
            else {
                /**
                 * 申请能源耗尽的显示令牌
                 */
                const token = TriggerControl('隧龙列车-能源不足', entity, 200);
                // 检测能源耗尽令牌是否申请成功
                if (!token)
                    return;
                /**
                 * 获取 附近的玩家
                 */
                const players = entity.dimension.getPlayers({ maxDistance: 32, location: entity.location });
                /**
                 * 编辑消息通知
                 */
                const message = [
                    translate(entity),
                    { text: ': 能源不足, 列车无法继续运行 :' },
                    { text: Vector.toString(entity.location) }
                ];
                // 推送消息
                players.forEach(player => player.sendMessage(message));
            }
            break;
        // 仓储管理
        case 'inventory_filter':
            break;
        // 扩展模块
        case 'extend_module':
            /**
             * 列车模块查询条件
             */
            const options = {
                families: ['train_parts'],
                location: entity.location,
                maxDistance: 3
            };
            /**
             * 获取 列车部件
             */
            const trainParts = entity.dimension.getEntities(options);
            /**
             * 获取 玩家
             */
            const player = server.world.getEntity(entity.getDynamicProperty('entity:contract_user'));
            /**
             * 定义了 窗口界面 的 标题
             */
            const title = {
                text: "<§9§o§l 隧龙领航者-隧道掘进列车 §r>§2扩展组件"
            };
            /**
             * 定义了 窗口界面 的 选项
             */
            const option = [
                { text: '<§5§o§l 单人列车沙发 §5>§r' },
                { text: '<§5§o§l 基础列车货架 §5>§r' }
            ];
            /**
             * 定义了 窗口界面 的 表单对象
             */
            const display = new serverUI.ActionFormData()
                .title(title)
                .button(option[0], "textures/项目图标/神机操持/单人沙发")
                .button(option[1], "textures/项目图标/神机操持/列车货架");
            if (!player || trainParts.length >= 4)
                return player.sendMessage([translate(player), { text: '-> 当前列车的<§l§9 扩展插槽 §r>已满载, 无法继续创建<§l§9 扩展组件 §r>' }]);
            // 显示窗口界面
            display.show(player).then(option => {
                if (option.canceled)
                    return;
                switch (option.selection) {
                    // 沙发
                    case 0:
                        TrySpawnEntity(entity.dimension, 'starry_map:execute.couch', entity.location);
                        break;
                    // 货架
                    case 1:
                        TrySpawnEntity(entity.dimension, 'starry_map:execute.inventory', entity.location);
                        break;
                }
            });
            break;
        // 载具回收
        case 'recycling':
            entity.runCommand('opal:unload_package_inventory @s starry_map:call_tunnel_dragon_guide');
            break;
    }
}
/**
 * 实体阵亡后的紧急保存与封印
 *
 * 该函数在实体阵亡时执行, 用于紧急保存实体数据并生成封印物品
 *
 * 包括创建封印物品、复制实体坐标、播放粒子特效以及封印实体
 *
 * @param {server.Entity} entity - 阵亡的实体对象
 *
 * @returns {Promise<void>} - 返回一个 Promise, 表示异步操作的完成
 */
async function entityDeathPreservation(entity) {
    // 延迟执行, 避免触发器冲突
    await server.system.waitTicks(0);
    /**
     * 创建 物品对象 - 星月诗篇
     */
    const sealedItem = new server.ItemStack('starry_map:moon_and_stars');
    /**
     * 复制实体坐标
     */
    const originalPosition = Vector.copy(entity.location);
    /**
     * 复制实体坐标
     */
    const elevatedPosition = originalPosition.add({ x: 0, y: 2, z: 0 });
    /**
     * 粒子参数
     */
    const molang = new server.MolangVariableMap();
    /**
     * 物品名称
     */
    const itemName = '§c极限档案 - §d';
    /**
     * 物品词缀
     */
    const itemDescription = [
        `类型: ${entity.typeId}`,
        `名称: ${entity.nameTag}`,
        "§a___________________",
        "此乃[ 魔神 - 葬火 ]的恩惠",
        "在登临[ 最终档案馆 ]的王座时",
        "祂曾向众生立下许诺:",
        "    凡此领航之众, 皆为吾之同族",
        "    只要吾之火不曾熄灭, 纵使败者亦能重燃"
    ];
    // 设置 粒子尺寸
    molang.setFloat('variable.size', 4);
    // 播放 蝴蝶特效
    molang.setFloat('variable.direction', 3);
    TrySpawnParticle(entity.dimension, 'scripts:path_butterfly', originalPosition, molang);
    // 播放 圆环特效
    molang.setFloat('variable.direction', 0);
    TrySpawnParticle(entity.dimension, 'scripts:path_round', elevatedPosition, molang);
    // 播放 四芒星特效
    TrySpawnParticle(entity.dimension, 'scripts:path_star4_small', elevatedPosition, molang);
    // 将实体数据保存到封印物品中, 并生成物品
    UnloadInventoryAndPackageInPlace(entity, sealedItem, itemName, itemDescription);
}
/**
 * 为实体随机装备武器、护腿和副手物品, 或清空其装备
 *
 * 该函数会根据实体的装备状态, 随机选择装备并为其装备, 或者清空其装备
 *
 * 如果实体具有 `minecraft:is_chested` 组件, 则为其随机装备武器、护腿和副手物品；
 *
 * 否则, 清空其主手、副手和护腿槽位的物品
 *
 * @param {server.Entity} entity - 需要装备或清空装备的实体对象
 * @returns {Promise<void>} - 返回一个 Promise, 表示异步操作的完成
 */
async function randomlyEquipOrClear(entity) {
    // 延迟执行, 避免触发器冲突
    await server.system.waitTicks(0);
    /**
     * 随机选择护腿装备
     *
     * 使用 `opal.AnalysisWeight` 函数从 `table.role_armor_legs` 中随机选择一个护腿
     */
    const armorlegs = AnalysisWeight(role_armor_legs).output;
    /**
     * 随机选择主手武器
     *
     * 使用 `opal.AnalysisWeight` 函数从 `table.role_main_hand` 中随机选择一个主手武器
     */
    const mainhand = AnalysisWeight(role_main_hand).output;
    /**
     * 随机选择副手物品
     *
     * 使用 `opal.AnalysisWeight` 函数从 `table.role_off_hand` 中随机选择一个副手物品
     */
    const offhand = AnalysisWeight(role_off_hand).output;
    // 等待 5 帧 确保实体组件已更新
    await server.system.waitTicks(5);
    // 根据实体是否具有 `minecraft:is_chested` 组件来决定装备或清空装备
    switch (entity.hasComponent('minecraft:is_chested')) {
        case true:
            // 添加随机装备
            server.system.runTimeout(() => entity.runCommand(`replaceitem entity @s slot.weapon.mainhand 0 ${mainhand}`), 4);
            server.system.runTimeout(() => entity.runCommand(`replaceitem entity @s slot.weapon.offhand 0 ${offhand}`), 8);
            server.system.runTimeout(() => entity.runCommand(`replaceitem entity @s slot.armor.legs 0 ${armorlegs}`), 12);
            break;
        default:
            // 清空装备
            server.system.runTimeout(() => entity.runCommand('replaceitem entity @s slot.weapon.mainhand 0 air'), 4);
            server.system.runTimeout(() => entity.runCommand('replaceitem entity @s slot.weapon.offhand 0 air'), 8);
            server.system.runTimeout(() => entity.runCommand('replaceitem entity @s slot.armor.legs 0 air'), 12);
            break;
    }
}
/**
 * 控制实体进行动力飞行
 *
 * 此函数通过计算实体的视角方向和速度, 来模拟动力飞行的效果它首先尝试找到实体附近是否有玩家,
 *
 * 如果有, 则根据实体的视角方向计算新的速度向量, 并根据玩家的俯仰角度决定是否向上飞行
 *
 * @param {server.Entity} [entity] 需要进行动力飞行的实体对象
 *
 * @param {number} [speed] 飞行的速度, 决定了实体飞行的快慢
 */
async function applyDynamicFlightToEntity(entity, speed) {
    // 延迟执行, 避免触发器冲突
    await server.system.waitTicks(0);
    /**
     * 获取绑定的玩家 ID
     *
     * @type {boolean | number | string | server.Vector3 | undefined}
     */
    const playerID = entity.getDynamicProperty('dynamic_flight_in_player');
    // 验证绑定的玩家 ID 是否为字符串类型
    if (typeof playerID !== 'string')
        return ThrowErrorIfPermitted('动力飞行失败, 玩家不存在');
    /**
     * 获取绑定的玩家对象
     *
     * @type {server.Player}
     */
    const player = server.world.getEntity(playerID);
    // 验证绑定的玩家对象是否存在
    if (!player)
        return ThrowErrorIfPermitted('动力飞行失败, 玩家不存在');
    // 验证玩家是否正在跳跃, 如果是, 则清除实体的当前速度并返回
    if (player.isJumping)
        return entity.clearVelocity();
    /**
     * 获取实体视角方向
     *
     * @type {server.Vector3}
     */
    const direction = entity.getViewDirection();
    /**
     * 根据实体视角方向和速度参数计算新的速度向量
     *
     * @type {server.Vector3}
     */
    const newVelocity = Vector.multiply(direction, speed);
    /**
     * 在新的速度向量基础上增加一个向上的分量, 用于模拟实体在飞行时的爬升效果
     *
     * @type {server.Vector3}
     */
    const climbVelocity = Vector.add(newVelocity, Vector.CONSTANT_UP);
    // 清除实体当前速度, 准备应用新速度
    entity.clearVelocity();
    // 根据玩家俯仰角度决定应用的速度向量
    entity.applyImpulse(player.getRotation().x >= -5 ? (player.getRotation().x > 55 ? direction : newVelocity) : climbVelocity);
}
/**
 * 将实体与玩家绑定, 以便控制实体的动力飞行
 *
 * @param {server.Entity} [entity] 需要进行动力飞行的实体对象
 */
async function dynamicFlightToBinding(entity) {
    // 延迟执行, 避免触发器冲突
    await server.system.waitTicks(0);
    /**
     * 获取玩家对象
     */
    const player = entity.dimension.getPlayers({ location: entity.location, maxDistance: 8, closest: 1 })[0];
    // 验证玩家对象是否存在
    if (!player)
        return ThrowErrorIfPermitted(`绑定失败: 在实体周围 8 米范围内未找到任何玩家`);
    // 绑定玩家 ID
    entity.setDynamicProperty('dynamic_flight_in_player', player.id);
}
/**
 * 解除实体与玩家的绑定, 停止控制实体的动力飞行
 *
 * @param {server.Entity} [entity] 需要停止动力飞行的实体对象
 */
async function dynamicFlightToSeparate(entity) {
    // 延迟执行, 避免触发器冲突
    await server.system.waitTicks(0);
    /**
     * 获取绑定的玩家ID
     *
     * @type {boolean | number | string | server.Vector3 | undefined}
     */
    const playerID = entity.getDynamicProperty('dynamic_flight_in_player');
    // 验证绑定的玩家ID是否为字符串类型
    if (typeof playerID !== 'string')
        return ThrowErrorIfPermitted('解除动力飞行绑定失败: 实体未绑定到玩家');
    /**
     * 获取绑定的玩家对象
     *
     * @type {server.Player}
     */
    const player = server.world.getEntity(playerID);
    // 验证绑定的玩家对象是否存在
    if (!player)
        return ThrowErrorIfPermitted('解除动力飞行绑定失败: 绑定的玩家不存在');
    // 清除玩家的摄像机动画
    player.camera.clear();
    // 解除绑定
    entity.setDynamicProperty('dynamic_flight_in_player');
}

/**
 * * 自定义指令枚举列表
 */
const components = new Map();
components.set('opal:实体待机动画类型', [
    'no_sitting',
    'is_sitting'
]);
components.set('opal:元素属性类型', [
    "rune_orange",
    "rune_purple",
    "rune_green",
    "rune_white",
    "rune_black",
    "rune_void",
    "rune_blue",
    "rune_red"
]);
components.set('opal:模组扩展结构', [
    "magic_industry_exhibition_hall",
    "vacant_space_wasp_tower",
    "starlight_house",
]);
components.set('opal:原版生物群系', [...biome_map.values()]);
components.set('opal:原版世界维度', [...new Set(...dimension_map.values())]);

/*
 * 原版接口
 */
/*
 * < 世界 > 初始化前 事件
 */
server.system.beforeEvents.startup.subscribe(data => {
    /**
     * 方块自定义组件的映射集合
     */
    const blockComponents = new Map([
        ...components$d,
        ...components$c,
        ...components$b,
        ...components$9,
        ...components$a,
    ]);
    /**
     * 物品自定义组件的映射集合
     */
    const itemComponents = new Map([
        ...components$7,
        ...components$8,
        ...components$6,
        ...components$5,
        ...components$4,
        ...components$3,
        ...components$2,
    ]);
    /**
     * 方块自定义组件实例数组
     */
    const blockCustoms = [...blockComponents.values()];
    /**
     * 方块自定义组件名称数组
     */
    const blockNames = [...blockComponents.keys()];
    /**
     * 物品自定义组件实例数组
     */
    const itemCustoms = [...itemComponents.values()];
    /**
     * 物品自定义组件名称数组
     */
    const itemNames = [...itemComponents.keys()];
    /**
     * 自定义指令的映射集合
     */
    const customCommands = [...components$1.keys()];
    /**
     * 自定义指令回调函数数组
     */
    const commandCallbacks = [...components$1.values()];
    /**
     * 自定义指令的枚举映射集合
     */
    const enumName = [...components.keys()];
    /**
     * 自定义指令枚举值数组
     */
    const enumValues = [...components.values()];
    // === 方块自定义组件注册 ===
    for (let blockIndex = 0; blockIndex < blockCustoms.length; blockIndex++)
        data.blockComponentRegistry.registerCustomComponent(blockNames[blockIndex], blockCustoms[blockIndex]);
    // === 物品自定义组件注册 ===
    for (let itemIndex = 0; itemIndex < itemCustoms.length; itemIndex++)
        data.itemComponentRegistry.registerCustomComponent(itemNames[itemIndex], itemCustoms[itemIndex]);
    // === 自定义指令枚举值注册 ===
    for (let enumIndex = 0; enumIndex < enumName.length; enumIndex++)
        data.customCommandRegistry.registerEnum(enumName[enumIndex], enumValues[enumIndex]);
    // === 自定义指令注册 ===
    for (let cmdIndex = 0; cmdIndex < commandCallbacks.length; cmdIndex++)
        data.customCommandRegistry.registerCommand(customCommands[cmdIndex], commandCallbacks[cmdIndex]);
});
/*
 * < 世界 > 初始化后 事件
 */
server.world.afterEvents.worldLoad.subscribe(async () => {
    /*
     * 注册 基础程序容器
     */
    EquipmentEventTrigger.BriefCreate('世界初始化容器');
    // 在月华百科中导入知识库
    material.push(...help$1);
});
/*
 * < 世界 > 聊天发送后 事件
 */
server.world.afterEvents.chatSend.subscribe(data => manageChatResponses(data.sender, data.message));
server.world.afterEvents.chatSend.subscribe(data => {
    if (data.message !== 'test')
        return;
    let l1 = new Vector(-60, 65, 340);
    let text = new debug.DebugText(l1, '测试');
    let arrow = new debug.DebugArrow(l1, l1.add(new Vector(0, 5, 0)));
    text.timeLeft = 10;
    //arrow.scale = 10
    arrow.color = getRuneColor('rune_orange');
    debug.debugDrawer.addShape(arrow);
    debug.debugDrawer.addShape(text);
});
/*
 * < 实体 > 生成后 事件
 */
server.world.afterEvents.entitySpawn.subscribe(data => {
    /**
     * * 获取 发起事件 的 实体
     */
    const entity = data.entity;
    // 验证实体是否有效
    if (entity && !entity.isValid)
        return;
    /**
     * * 生命值组件
     */
    const health = entity.getComponent('health');
    // 验证实体血量是否达标
    if (!health || health.currentValue <= 5)
        return;
    // 验证实体是否已经初始化
    if (entity.getDynamicProperty('entity:is_initial'))
        return;
    // 添加数据
    CreateProperty(entity, battle_property.get(entity.typeId));
    // 记录实体生成位置
    entity.setDynamicProperty('entity:create_place', entity.location);
    // 标记实体已初始化
    entity.setDynamicProperty('entity:is_initial', true);
});
/*
 * < 玩家 > 生成后 事件
 */
server.world.afterEvents.playerSpawn.subscribe(data => {
    /**
     * * 获取 当前玩家 是否 初次生成
     */
    const initial = data.initialSpawn;
    /**
     * * 获取 玩家对象
     */
    const player = data.player;
    // 验证玩家是否有初始化 并 尝试刷新 超级野蜂袭击
    if (!initial || player.getDynamicProperty('entity:is_initial'))
        return;
    /**
     * * 玩家出生点
     */
    const anchor = {
        location: Vector.floor(player.location),
        dimension: player.dimension.id
    };
    /**
     * * 获取主世界维度
     */
    const overworldDimension = server.world.getDimension('minecraft:overworld');
    // 记录 出生点 并 赋予属性
    player.setDynamicProperty('road_sign:出生点', JSON.stringify(anchor));
    CreateProperty(player, { self_rune: 'rune_void' });
    player.setDynamicProperty('entity:is_initial', true);
    // 尝试创建附加结构
    server.system.runTimeout(() => player.addEffect('minecraft:darkness', 120, { amplifier: 0, showParticles: false }), 240);
    server.system.runTimeout(() => player.onScreenDisplay.setTitle('§4警告! 空间乱流! 警惕<野蜂>!'), 320);
    server.system.runTimeout(() => EnterVacantSpaceWaspTower(player), 360);
    // 播放音效
    server.system.runTimeout(() => player.playSound('ambient.weather.thunder'), 340);
    server.system.runTimeout(() => player.playSound('ambient.weather.thunder'), 240);
    // 重新设置世界规则
    ReviseWorldRules(overworldDimension);
});
/*
 * < 实体 > 生命值变化后 事件
 */
server.world.afterEvents.entityHealthChanged.subscribe(data => {
    /**
     * * 获取 实体
     */
    const entity = data.entity;
    /**
     * * 伤害 的 数值
     */
    const value = data.oldValue - data.newValue;
    // 显示生命值变化
    HealthAlterDisplay(entity, Math.ceil(value));
});
/*
 * < 实体 > 遭遇攻击后 事件
 */
server.world.afterEvents.entityHurt.subscribe(data => {
    /**
     * * 被攻击 的 实体
     */
    const target = data.hurtEntity;
    /**
     * * 伤害 的 来源
     */
    const source = data.damageSource;
    /**
     * * 获取 袭击者
     */
    const entity = source.damagingEntity;
    // 验证实体是否有效
    if (!entity || !target || !entity.isValid || !target.isValid)
        return;
    // 执行 玩家发动攻击后 事件
    PlayersLaunchAttacks(target, source, entity);
    // 执行 实体遭受攻击后 事件
    EntityUnderAttack(target, source, entity, data.damage);
    // 执行 玩家遭受攻击后 事件
    PlayersUnderAttack(target, entity);
});
/*
 * < 实体 > 死亡后 事件
 */
server.world.afterEvents.entityDie.subscribe(data => {
    /**
     * * 获取 死亡的 实体
     */
    const self = data.deadEntity;
    /**
     * * 获取 伤害 的 来源
     */
    const source = data.damageSource;
    /**
     * * 获取 击杀者
     */
    const target = source.damagingEntity;
    // 验证实体是否有效
    if (!target || !target.isValid || !self || !self.isValid || !self.hasComponent('minecraft:health'))
        return;
    // 死亡后发放奖励
    createRewardsAfterDeath(self, target);
    // 执行 死亡机制
    FunctionsPerformedAfterDeath(self, target);
});
/*
 * < 玩家 > 攻击方块后 事件
 */
server.world.afterEvents.entityHitBlock.subscribe(data => {
    /**
     * * 获取 玩家对象
     */
    const player = data.damagingEntity;
    if (!(player instanceof server.Player))
        return;
    /**
     * * 获取 物品对象
     */
    const item = player.getComponent('inventory')?.container?.getItem(player.selectedSlotIndex);
    /**
     * * 获取 方块对象
     */
    const block = data.hitBlock;
    /**
     * * 获取 玩家 的 背包
     */
    const container = player.getComponent('minecraft:inventory')?.container;
    /**
     * * 获取 控制事件触发器
     */
    const token = TriggerControl;
    // 物品类型
    if (container)
        switch (item?.typeId) {
            case 'starry_map:material_sorting':
                if (token('物资整理', player, 20))
                    containerSorting(player, block);
                break;
            case 'starry_map:obtain_block':
                if (token('获取方块', player, 5))
                    obtainBlock(player, container, block);
                break;
            case 'starry_map:magic_crystal_hammer':
                if (token('魔晶锤子', player, 20))
                    magicCrystalHammer(player, item, container, block);
                break;
            case 'starry_map:magic_crystal_key':
                if (token('魔晶钥匙', player, 20))
                    magicCrystalKey(player, item, container, block);
                break;
            case 'starry_map:magic_handbook':
                if (token('魔导手册', player, 20))
                    magicHandbook(player, item, block);
                break;
        }
});
/*
 * < 世界 > 天气变化后 事件
 */
server.world.afterEvents.weatherChange.subscribe(() => {
    // 尝试 按计划生成 实体
    GenerateOnSchedule('starry_map:guide.jasmine', 23, { text: '§c§l< 警惕 琥珀与茉莉 靠近 > !!!§r' }, 'portal.trigger');
    GenerateOnSchedule('starry_map:wild_bee.guide', 30, { text: '§c§l< 遭遇成建制的 野蜂机群 袭击 > !!!§r' }, 'portal.trigger');
    GenerateOnSchedule('starry_map:guide.windnews', 40, { text: '矿石商人-风信 出现了' }, 'portal.trigger');
});
/*
 * < 方块 > 更新后 事件
 */
server.world.afterEvents.playerBreakBlock.subscribe(data => BlockUpdateAfterEvent(data.block));
server.world.afterEvents.playerPlaceBlock.subscribe(data => BlockUpdateAfterEvent(data.block));
/*
 * < 玩家 > 破坏方块后 事件
 */
server.world.afterEvents.playerBreakBlock.subscribe(data => {
    /**
     * * 挖掘方块 的 玩家
     */
    const player = data.player;
    /**
     * * 区块连锁 状态
     */
    const type = player.getDynamicProperty('block_chain:type');
    // 当玩家破坏方块时 触发 区块连锁 事件
    if (type && TriggerControl('区块连锁', player, 20))
        BlockChainEvent(data, type);
});
