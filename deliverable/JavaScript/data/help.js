/**
 * * 月华百科的知识库
 *
 * * 存储 INTENTION_NOTE 类型的帮助信息
 */
const help = new Map();
help.set('开发者名单', {
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
const crystal = [
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
].forEach(item => help.set(item, { root: ['魔晶石', '能量水晶', '魔晶星尘'], intel: [...crystal], only: true }));
help.set('星尘力概述', {
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
help.set('元素攻击计算公式', {
    root: ['元素攻击', '计算公式'],
    intel: [
        { text: "((攻击乘区 × 暴击乘区 × 伤害倍率) + 伤害提升) × (1 - 元素抗性)\n\n" },
        { text: "攻击乘区: (基础伤害 + 攻击提升)\n\n" },
        { text: "暴击乘区: (暴击伤害 + 暴伤提升) ÷ 100)\n\n" },
        { text: "**提升: 将在发动攻击后归§2 0 §r, 该类效果可以叠加\n\n" },
        { text: "**倍率: 将在发动攻击后归§2 1 §r, 该类效果可以叠加\n\n" },
    ]
});
help.set('背景设定', {
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
help.set('神明的起源', {
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
help.set('雾海的概念与世界的轮回', {
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
help.set('人造之神的起源', {
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
help.set('神之葬礼', {
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
help.set("starry_map:jungle_wood_chair", {
    root: ['家居装饰', '从林木椅'],
    intel: [
        { text: "<§6 放置 §r>[§5 从林木椅 §r]时, 将进行<§n 外观衔接 §r>\n\n" },
        { text: "如果<§6 放置 §r>时正在潜行, 则不会执行<§n 外观衔接 §r>\n\n" },
        { text: "如果[§5 玩家 §r]<§6 站立 §r>在[§5 从林木椅 §r]上时, [§5 玩家 §r]将坐在椅子上\n\n" }
    ]
});
help.set("starry_map:special_alloy_pot", {
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
help.set("starry_map:diorite_table", {
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
help.set("starry_map:metal_camouflage", {
    root: ['家居装饰', '金属伪装'],
    intel: [
        ...decorating
    ]
});
help.set("starry_map:stone_camouflage", {
    root: ['家居装饰', '石质伪装'],
    intel: [
        ...decorating
    ]
});
help.set("starry_map:wood_camouflage", {
    root: ['家居装饰', '木质伪装'],
    intel: [
        ...decorating
    ]
});
help.set("starry_map:package_delivery", {
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
help.set("starry_map:block_placement", {
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
help.set("starry_map:material_collection", {
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
help.set("starry_map:container_arrange", {
    root: ['仓储管理', '物资整理', '管理'],
    intel: [
        { text: "将每隔 5 秒钟消耗<§p星尘力§r>:§2 20§r\n\n" },
        { text: "运行时消耗<§p星尘力§r>:§2 5 ~ 10§r\n\n" },
        { text: "上下方为<§u 容器端口 §r>可与[§3 方块容器 §r]进行连接\n\n" },
        { text: "每隔§2 5 §r秒, 设备将自动整理被选中的[§3 方块容器 §r]\n\n" }
    ]
});
help.set("starry_map:enchantment_dissociation", {
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
help.set("starry_map:routine_logistics_receiver", {
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
help.set("starry_map:routine_logistics_sender", {
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
help.set("starry_map:surpass_logistics_receiver", {
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
help.set("starry_map:surpass_logistics_sender", {
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
help.set('starry_map:container_hub', {
    root: ['仓储管理', '容器枢纽', '容器整理'],
    intel: [
        { text: "将每隔 5 秒钟消耗<§p星尘力§r>:§2 50§r\n\n" },
        { text: '该设备会查询附近一定范围内的<§n方块容器§r>\n\n' },
        { text: '并提取上方<§n方块容器§r>的全部<§a物品§r>\n\n' },
        { text: '将<§a物品§r>放置在已经存放了该物品的<§n方块容器§r>内\n\n' },
        { text: '如果未找到合适的<§n方块容器§r>, 则随机挑选一个<§n方块容器§r>放置\n\n' },
    ]
});
help.set('starry_map:residual_extraction', {
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
help.set("starry_map:stone_machine", {
    root: ['矿产勘探', '初级', '造石单元'],
    intel: [
        { text: "设备<§u 运行频率 §r>:§2 10§r tick\n\n" },
        { text: "运行时消耗<§p星尘力§r>:§2 35§r\n\n" },
        { text: "北面为<§u 虹彩端口 §r>可与[§3 魔导总线 §r]进行连接\n\n" },
        { text: "当[§3 魔导总线 §r]输入<§9 信号 §r>时, 将在一段时间后产出[§3 石头 §r]\n\n" },
        { text: "如果下方存在[§3 方块容器 §r], 则[§3 石头 §r]将直接存入其中\n\n" },
    ]
});
help.set("starry_map:copper.stone_machine", {
    root: ['矿产勘探', '铜制强化', '造石单元'],
    intel: [
        { text: "设备<§u 运行频率 §r>:§2 6§r tick\n\n" },
        { text: "运行时消耗<§p星尘力§r>:§2 35§r\n\n" },
        { text: "北面为<§u 虹彩端口 §r>可与[§3 魔导总线 §r]进行连接\n\n" },
        { text: "当[§3 魔导总线 §r]输入<§9 信号 §r>时, 将在一段时间后产出[§3 石头 §r]\n\n" },
        { text: "如果下方存在[§3 方块容器 §r], 则[§3 石头 §r]将直接存入其中\n\n" },
    ]
});
help.set("starry_map:iron.stone_machine", {
    root: ['矿产勘探', '铁制强化', '造石单元'],
    intel: [
        { text: "设备<§u 运行频率 §r>:§2 4§r tick\n\n" },
        { text: "运行时消耗<§p星尘力§r>:§2 35§r\n\n" },
        { text: "北面为<§u 虹彩端口 §r>可与[§3 魔导总线 §r]进行连接\n\n" },
        { text: "当[§3 魔导总线 §r]输入<§9 信号 §r>时, 将在一段时间后产出[§3 石头 §r]\n\n" },
        { text: "如果下方存在[§3 方块容器 §r], 则[§3 石头 §r]将直接存入其中\n\n" },
    ]
});
help.set("starry_map:gold.stone_machine", {
    root: ['矿产勘探', '金制强化', '造石单元'],
    intel: [
        { text: "设备<§u 运行频率 §r>:§2 2§r tick\n\n" },
        { text: "运行时消耗<§p星尘力§r>:§2 35§r\n\n" },
        { text: "北面为<§u 虹彩端口 §r>可与[§3 魔导总线 §r]进行连接\n\n" },
        { text: "当[§3 魔导总线 §r]输入<§9 信号 §r>时, 将在一段时间后产出[§3 石头 §r]\n\n" },
        { text: "如果下方存在[§3 方块容器 §r], 则[§3 石头 §r]将直接存入其中\n\n" },
    ]
});
help.set("starry_map:netherite.stone_machine", {
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
help.set("starry_map:metal_forming_press", {
    root: ['矿产勘探', '初级', '金属锻压'],
    intel: [
        { text: "设备<§u 运行频率 §r>:§2 10§r tick\n\n" },
        { text: "运行时消耗<§p星尘力§r>:§2 15§r\n\n" },
        ...metal_forming,
    ]
});
help.set("starry_map:copper.metal_forming_press", {
    root: ['矿产勘探', '铜制强化', '金属锻压'],
    intel: [
        { text: "设备<§u 运行频率 §r>:§2 6§r tick\n\n" },
        { text: "运行时消耗<§p星尘力§r>:§2 15§r\n\n" },
        ...metal_forming,
    ]
});
help.set("starry_map:iron.metal_forming_press", {
    root: ['矿产勘探', '铁制强化', '金属锻压'],
    intel: [
        { text: "设备<§u 运行频率 §r>:§2 4§r tick\n\n" },
        { text: "运行时消耗<§p星尘力§r>:§2 15§r\n\n" },
        ...metal_forming,
    ]
});
help.set("starry_map:gold.metal_forming_press", {
    root: ['矿产勘探', '金制强化', '金属锻压'],
    intel: [
        { text: "设备<§u 运行频率 §r>:§2 2§r tick\n\n" },
        { text: "运行时消耗<§p星尘力§r>:§2 15§r\n\n" },
        ...metal_forming,
    ]
});
help.set("starry_map:netherite.metal_forming_press", {
    root: ['矿产勘探', '合金强化', '金属锻压'],
    intel: [
        { text: "设备<§u 运行频率 §r>:§2 1§r tick\n\n" },
        { text: "运行时消耗<§p星尘力§r>:§2 15§r\n\n" },
        ...metal_forming,
    ]
});
help.set("starry_map:destroy_the_core", {
    root: ['矿产勘探', '初级', '破坏核心'],
    intel: [
        { text: "运行时消耗<§p星尘力§r>:§2 15§r\n\n" },
        { text: "一端为<§u 虹彩端口 §r>可与[§3 魔导总线 §r]进行连接\n\n" },
        { text: "当[§3 魔导总线 §r]输入<§9 信号 §r>时, 将<§6 破坏 §r>指向的 6 个[§3方块§r]\n\n" }
    ]
});
help.set("starry_map:mineral_machine", {
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
help.set("starry_map:copper.mineral_machine", {
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
help.set("starry_map:iron.mineral_machine", {
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
help.set("starry_map:gold.mineral_machine", {
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
help.set("starry_map:netherite.mineral_machine", {
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
help.set('starry_map:mine.oxygen_enriched_gold', {
    root: ['富氧金', '自然生成', '原矿方块'],
    intel: [
        ...mineral
    ]
});
help.set('starry_map:mine.ferric_phosphate', {
    root: ['磷酸铁', '自然生成', '原矿方块'],
    intel: [
        ...mineral
    ]
});
help.set('starry_map:mine.aluminum_magnesium', {
    root: ['铝镁金', '自然生成', '原矿方块'],
    intel: [
        ...mineral
    ]
});
help.set('starry_map:mine.ferric_chloride', {
    root: ['氯化铁', '自然生成', '原矿方块'],
    intel: [
        ...mineral
    ]
});
help.set('starry_map:mine.zirconium_carbide', {
    root: ['碳化锆', '自然生成', '原矿方块'],
    intel: [
        ...mineral
    ]
});
help.set('starry_map:mine.gold_carbonate', {
    root: ['碳酸金', '自然生成', '原矿方块'],
    intel: [
        ...mineral
    ]
});
help.set('starry_map:mine.lithium_carbonate', {
    root: ['碳酸锂', '自然生成', '原矿方块'],
    intel: [
        ...mineral
    ]
});
help.set('starry_map:mine.tungsten_nickel_titanium', {
    root: ['钨镍钛', '自然生成', '原矿方块'],
    intel: [
        ...mineral
    ]
});
help.set('starry_map:mine.copper_tin_brazing', {
    root: ['锡钎铜', '自然生成', '原矿方块'],
    intel: [
        ...mineral
    ]
});
help.set("starry_map:copper.intensify_node", {
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
help.set("starry_map:copper.intensify_node", {
    root: ['能源模块', '能量节点', '强化', '铜制'],
    intel: [
        { text: "运行时补充<§p星尘力§r>:§2 30§r\n\n" },
        { text: "当获得<§u 充能 §r>时, 将为一定范围内的<§9 区块 §r>补充<§p星尘力§r>\n\n" },
        { text: "<§p星尘力§r>仅在一定范围内有效, 超出范围将无法获取<§p星尘力§r>\n\n" },
        { text: "当<§p星尘力§r>耗尽时, 需放置[§3 能量节点 §r]重新补充<§p星尘力§r>\n\n" }
    ]
});
help.set("starry_map:iron.intensify_node", {
    root: ['能源模块', '能量节点', '强化', '铁制'],
    intel: [
        { text: "运行时补充<§p星尘力§r>:§2 60§r\n\n" },
        { text: "当获得<§u 充能 §r>时, 将为一定范围内的<§9 区块 §r>补充<§p星尘力§r>\n\n" },
        { text: "<§p星尘力§r>仅在一定范围内有效, 超出范围将无法获取<§p星尘力§r>\n\n" },
        { text: "当<§p星尘力§r>耗尽时, 需放置[§3 能量节点 §r]重新补充<§p星尘力§r>\n\n" }
    ]
});
help.set("starry_map:gold.intensify_node", {
    root: ['能源模块', '能量节点', '强化', '金制'],
    intel: [
        { text: "运行时补充<§p星尘力§r>:§2 120§r\n\n" },
        { text: "当获得<§u 充能 §r>时, 将为一定范围内的<§9 区块 §r>补充<§p星尘力§r>\n\n" },
        { text: "<§p星尘力§r>仅在一定范围内有效, 超出范围将无法获取<§p星尘力§r>\n\n" },
        { text: "当<§p星尘力§r>耗尽时, 需放置[§3 能量节点 §r]重新补充<§p星尘力§r>\n\n" }
    ]
});
help.set("starry_map:netherite.intensify_node", {
    root: ['能源模块', '能量节点', '强化', '合金'],
    intel: [
        { text: "运行时补充<§p星尘力§r>:§2 240§r\n\n" },
        { text: "当获得<§u 充能 §r>时, 将为一定范围内的<§9 区块 §r>补充<§p星尘力§r>\n\n" },
        { text: "<§p星尘力§r>仅在一定范围内有效, 超出范围将无法获取<§p星尘力§r>\n\n" },
        { text: "当<§p星尘力§r>耗尽时, 需放置[§3 能量节点 §r]重新补充<§p星尘力§r>\n\n" }
    ]
});
help.set("starry_map:initial_node", {
    root: ['能源模块', '能量节点', '初级'],
    intel: [
        { text: "运行时补充<§p星尘力§r>:§2 15§r\n\n" },
        { text: "当获得<§u 充能 §r>时, 将为一定范围内的<§9 区块 §r>补充<§p星尘力§r>\n\n" },
        { text: "<§p星尘力§r>仅在一定范围内有效, 超出范围将无法获取<§p星尘力§r>\n\n" },
        { text: "当<§p星尘力§r>耗尽时, 需放置[§3 能量节点 §r]重新补充<§p星尘力§r>\n\n" }
    ]
});
help.set("starry_map:wind_power", {
    root: ['能源模块', '风力动能'],
    intel: [
        { text: "当<§3 方块高度 §r>高于 64 且 低于 200\n\n" },
        { text: "将周期性的为后方的 5 个[§3 基础-动能分配 §r]提供<§u 动能 §r>\n\n" },
        { text: "<§3 方块高度 §r>越高, 提供<§u 动能 §r>的效率就越高\n\n" }
    ]
});
help.set("starry_map:allocation_power", {
    root: ['能源模块', '动能分配'],
    intel: [
        { text: "当获得<§u 动能 §r>时, 将对上方的[§3 能量节点 §r]进行<§p 充能 §r>\n\n" }
    ]
});
help.set("starry_map:magma_power", {
    root: ['能源模块', '熔岩质能'],
    intel: [
        { text: "可以与[§3 黑曜石熔炉 §r]进行<§p 联动 §r>\n\n" },
        { text: "当自身存储有[§3 熔岩 §r]时\n\n" },
        { text: "将周期性的为 4 个轴线上的的 5 个[§3 基础-动能分配 §r]提供<§u 动能 §r>\n\n" },
        { text: "并在输出一段时间后, 消耗自身的[§3 熔岩 §r]储备\n\n" },
    ]
});
help.set("starry_map:water_power", {
    root: ['能源模块', '水素质能'],
    intel: [
        { text: "当下方存在[§3 水源 §r]时\n\n" },
        { text: "将周期性的为后方的 5 个[§3 基础-动能分配 §r]提供<§u 动能 §r>\n\n" },
        { text: "并消耗下方 5 x 5 的[§3 水源 §r]\n\n" },
    ]
});
help.set("starry_map:constant_tank", {
    root: ['能源模块', '魔晶储罐', '恒常'],
    intel: [
        { text: "[§5 恒常单元 §r]将周期性的为上方的[§3 能量节点 §r]提供<§u 充能 §r>\n\n" },
        { text: "当[§5 恒常单元 §r]被破坏时, 将掉落为[§5 虚无单元 §r]\n\n" },
        { text: "如果破坏时, 手持[§5 魔晶工具 §r], 将掉落随机[§5 魔晶石 §r]\n\n" },
    ]
});
help.set("starry_map:release_tank", {
    root: ['能源模块', '魔晶储罐', '辉光'],
    intel: [
        { text: "[§5 辉光单元 §r]将周期性的为上方的[§3 能量节点 §r]提供<§u 充能 §r>\n\n" },
        { text: "并在提供一定<§u 充能 §r>次数后, 消耗自身<§u 能量储备 §r>\n\n" },
        { text: "当<§u 能量储备 §r>耗尽时, 将转化为[§5 虚无单元 §r]\n\n" },
        { text: "当[§5 辉光单元 §r]被破坏时, 将掉落为[§5 虚无单元 §r]\n\n" },
        { text: "如果破坏时, 手持[§5 魔晶工具 §r], 将掉落随机[§5 魔晶石 §r]\n\n" },
    ]
});
help.set("starry_map:empty_tank", {
    root: ['能源模块', '魔晶储罐', '虚无'],
    intel: [
        { text: "使用[§5 任意§u魔晶石 §r]<§6 点击 §r>, 将逐步填充<§5 魔晶储量 §r>\n\n" },
        { text: "当<§5 魔晶储量 §r>充满时, 将转化为[§5 辉光单元 §r]\n\n" },
        { text: "如果使用[§6 永恒魔晶石 §r]进行填充, 将转化为[§5 恒常单元 §r]\n\n" },
    ]
});
help.set("starry_map:star_energy_infusion", {
    root: ['能源模块', '魔晶充能', '超级快充'],
    intel: [
        { text: "当玩家手持[§5 特殊道具 §r]<§6 点击 §r>该方块时\n\n" },
        { text: "将会汲取周围的<§l§d 星尘力 §r>为玩家的[§5 手持物品 §r]进行充能\n\n" },
        { text: "部分道具将直接恢复损失的耐久\n\n" },
        { text: "该设备目前支持: [§5 魔晶工具 §r][§5 魔晶铠甲 §r][§5 注魔宝珠 §r][§5 隧龙掘进 §r][§5 神恩权柄 §r]\n\n" },
    ]
});
help.set("starry_map:super_star_energy_infusion", {
    root: ['能源模块', '强化-魔晶充能', '超级快充'],
    intel: [
        { text: "当玩家手持[§5 特殊道具 §r]<§6 点击 §r>该方块时\n\n" },
        { text: "将会汲取周围的<§l§d 星尘力 §r>为玩家的[§5 手持物品 §r]进行充能\n\n" },
        { text: "部分道具将直接恢复损失的耐久\n\n" },
        { text: "该设备目前支持: [§5 任意具有耐久值的物品 §r]\n\n" },
    ]
});
help.set("starry_map:magic_crystal_lamp", {
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
help.set("starry_map:region_display", {
    root: ['效应机关', '区块显示'],
    intel: [
        { text: "如果[§9 实体 §r]踩踏[§3方块§r]时, 将被短暂<§4 点燃 §r>\n\n" },
        { text: "如果[§9 玩家 §r]点击方块, 将显示<§9 区块范围 §r>\n\n" },
        { text: "当<§9 区块范围 §r>内存在<§p星尘力§r>, 将喷射绿色粒子射流\n\n" },
        { text: "当<§9 区块范围 §r>内不存在<§p星尘力§r>, 将喷射红色粒子射流\n\n" },
    ]
});
help.set("starry_map:vector_ejection", {
    root: ['效应机关', '向量弹射'],
    intel: [
        { text: "如果[§9 实体 §r]踩踏[§3方块§r]时, 将被<§u 弹射 §r>\n\n" },
        { text: "<§4 弹射 §r>的<§6 方向 | 速度 | 力度 §r>取决于[§9 实体 §r]的姿态\n\n" }
    ]
});
help.set("starry_map:road_sign_presets", {
    root: ['效应机关', '诸界道标'],
    intel: [
        { text: "与[§3 空间宝典 §r]共享<§9 传送锚点 §r>的设备\n\n" },
        { text: "点击后, 可选择<§9 传送锚点 §r>进行<§9 传送 §r>\n\n" },
        { text: "无法通过该设备<§6 删除 | 创建 §r><§9 传送锚点 §r>\n\n" }
    ]
});
help.set("starry_map:universal_mechanical_framework", {
    root: ['基础方块', '通用机械框架'],
    intel: [
        { text: "放置时, 消耗周围§2 1 §r点<§6 星尘力 §r>的设备\n\n" },
        { text: "如果周围存在<§6 星尘力 §r>方块将变为§9 蓝色§r\n\n" },
        { text: "如果周围不存在<§6 星尘力 §r>方块将变为§c 红色§r\n\n" }
    ]
});
help.set("starry_map:nihility_space", {
    root: ['基础方块', '虚空方块'],
    intel: [
        { text: "等待§2 10 §r后, 该方块将会自动消失\n\n" }
    ]
});
help.set("starry_map:unreal_space", {
    root: ['基础方块', '虚无方块'],
    intel: [
        { text: "等待§2 10 §r后, 该方块将会自动消失\n\n" }
    ]
});
help.set("starry_map:unreal_space", {
    root: ['基础方块', '压缩圆石'],
    intel: [
        { text: "用于配套<§9 黑曜石熔炉 §r>使用的方块\n\n" },
        { text: "可以煅烧为<§4 熔岩 §r>\n\n" },
    ]
});
help.set("starry_map:wind_and_rain", {
    root: ['效应机关', '水域天降'],
    intel: [
        { text: "下方<§u 控制端口 §r>可与[§3 脉冲锁存 §r]进行连接\n\n" },
        { text: "当[§3 脉冲锁存 §r]为<§d 激活状态 §r>时\n\n" },
        { text: "将会降下装饰性的<§9 雨水 或 雪花 §r>特效\n\n" }
    ]
});
help.set("starry_map:wind_and_snow", {
    root: ['效应机关', '雪域霜华'],
    intel: [
        { text: "下方<§u 控制端口 §r>可与[§3 脉冲锁存 §r]进行连接\n\n" },
        { text: "当[§3 脉冲锁存 §r]为<§d 激活状态 §r>时\n\n" },
        { text: "将会降下装饰性的<§9 雨水 或 雪花 §r>特效\n\n" }
    ]
});
help.set("starry_map:super_omphalos", {
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
help.set("starry_map:super_pulse", {
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
help.set("starry_map:enable_control", {
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
help.set("starry_map:redstone_detection", {
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
help.set("starry_map:basic_pipeline", {
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
help.set("starry_map:counting_module", {
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
help.set("starry_map:interactive_terminal", {
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
help.set("starry_map:logic_single", {
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
help.set("starry_map:logic_inverter", {
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
help.set("starry_map:exclusive_or", {
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
help.set("starry_map:logical_and", {
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
help.set("starry_map:pulse_latch", {
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
help.set("starry_map:signal_compilation", {
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
help.set("starry_map:signal_filtering", {
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
help.set("starry_map:signal_conversion", {
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
help.set("starry_map:cable_port", {
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
help.set("starry_map:spectral_prism", {
    root: ['魔导总线', '校准元件', '分光棱镜'],
    intel: [
        { text: '此模块可等效为<§3 脉冲锁存 §r>进行使用\n\n' },
        ...cable,
        { text: '   将输入的逻辑射线转发为§a 2 §r道\n\n' },
        { text: '   类型相同, 方向相反的逻辑射线\n\n' }
    ]
});
help.set("starry_map:logic_not", {
    root: ['魔导总线', '校准元件', '逻辑非门'],
    intel: [
        ...cable,
        { text: '   对输入信号进行取反, 如果输入为高电平, 输出为低电平\n\n' },
        { text: '   如果输入为低电平, 输出为高电平\n\n' }
    ]
});
help.set("starry_map:logic_nor", {
    root: ['魔导总线', '校准元件', '逻辑或非'],
    intel: [
        ...cable,
        { text: '   与<§2 逻辑或门 §r>相反\n\n' },
        { text: '   只有当所有输入都为低电平时, 输出才为高电平\n\n' },
        { text: '   如果任一输入为高电平, 输出为低电平\n\n' }
    ]
});
help.set("starry_map:logic_xor", {
    root: ['魔导总线', '校准元件', '逻辑异或'],
    intel: [
        ...cable,
        { text: '   当输入信号的电平不同时, 输出为高电平\n\n' },
        { text: '   如果输入信号的电平相同, 输出为低电平\n\n' }
    ]
});
help.set('starry_map:logic_and', {
    root: ['魔导总线', '校准元件', '逻辑与门'],
    intel: [
        ...cable,
        { text: '   只有当所有输入都为高电平时, 输出才为高电平\n\n' },
        { text: '   如果任一输入为低电平, 输出为低电平\n\n' }
    ]
});
help.set('starry_map:logic_or', {
    root: ['魔导总线', '校准元件', '逻辑或门'],
    intel: [
        ...cable,
        { text: '   只要任一输入为高电平, 输出即为高电平\n\n' },
        { text: '   只有当所有输入都为低电平时, 输出才为低电平\n\n' }
    ]
});
help.set('starry_map:logic_xnor', {
    root: ['魔导总线', '校准元件', '逻辑同或'],
    intel: [
        ...cable,
        { text: '   当输入信号的电平相同时, 输出为高电平\n\n' },
        { text: '   如果输入信号的电平不同, 输出为低电平\n\n' }
    ]
});
help.set('starry_map:deflection_prism', {
    root: ['魔导总线', '校准元件', '偏光棱镜'],
    intel: [
        { text: '此模块可等效为<§3 脉冲锁存 §r>进行使用\n\n' },
        ...cable,
        { text: '   直接传递输入信号, 不进行任何逻辑操作\n\n' },
        { text: '   输出信号与输入信号电平相同\n\n' }
    ]
});
help.set("starry_map:logic_nand", {
    root: ['魔导总线', '校准元件', '逻辑与非'],
    intel: [
        ...cable,
        { text: '   只有当所有输入都为高电平时, 输出才为低电平\n\n' },
        { text: '   如果任一输入为低电平, 输出为高电平\n\n' }
    ]
});
help.set("starry_map:logic_nor", {
    root: ['魔导总线', '校准元件', '逻辑或非'],
    intel: [
        ...cable,
        { text: '   只有当所有输入都为低电平时, 输出才为高电平\n\n' },
        { text: '   如果任一输入为高电平, 输出为低电平\n\n' }
    ]
});
help.set("starry_map:magic_portal_above", {
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
help.set("starry_map:magic_portal_below", {
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
].forEach(item => help.set(item, { root: ["机关之门", "石门", "木门", "玻璃门", "岩门"], intel: [...block_gate], only: true }));
help.set("starry_map:servo_parameter", {
    root: ['伺服驱动', '参数设置', '控制'],
    intel: [
        { text: "使用[§2 魔晶工具 §r]点击, 可以调整<§n 设置参数 §r>\n\n" },
        { text: "在[§5 伺服基座 §r]或[§5 伺服牵引 §r]与之接触时, 同步<§n 设置参数 §r>\n\n" },
        { text: "可作为<§9 限位器 §r>阻止[§5 伺服基座 §r]或[§5 伺服牵引 §r]继续移动\n\n" }
    ]
});
help.set("starry_map:servo_susceptor", {
    root: ['伺服驱动', '伺服基座', '驱动'],
    intel: [
        { text: "运行时消耗<§p星尘力§r>:§2 30§r\n\n" },
        { text: "使用[§2 魔晶工具 §r]点击, 可以调整<§n 设置参数 §r>\n\n" },
        { text: "下方为<§u 虹彩端口 §r>可与[§3 魔导总线 §r]进行连接\n\n" },
        { text: "当[§3 魔导总线 §r]输入<§9 信号 §r>时, 将携带上方[§d 方块 §r]进行移动\n\n" }
    ]
});
help.set("starry_map:servo_traction", {
    root: ['伺服驱动', '伺服牵引', '驱动'],
    intel: [
        { text: "运行时消耗<§p星尘力§r>:§2 30§r\n\n" },
        { text: "使用[§2 魔晶工具 §r]点击, 可以调整<§n 设置参数 §r>\n\n" },
        { text: "上方为<§u 虹彩端口 §r>可与[§3 魔导总线 §r]进行连接\n\n" },
        { text: "当[§3 魔导总线 §r]输入<§9 信号 §r>时, 将携带下方[§d 方块 §r]进行移动\n\n" }
    ]
});
help.set("starry_map:servo_omphalos", {
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
help.set("starry_map:pulse_peak_cannon", {
    root: ['魔导武器', '脉冲尖峰'],
    intel: [
        { text: "下方<§u 控制端口 §r>可与[§3 脉冲锁存 §r]进行连接\n\n" },
        { text: "当[§3 脉冲锁存 §r]为<§d 激活状态 §r>时\n\n" },
        { text: "将每秒钟消耗<§p星尘力§r>:§2 1§r\n\n" },
        { text: "并在查询到<§c 目标 §r>时, 消耗<§p星尘力§r>:§2 150§r\n\n" },
        { text: "对<§c 目标 §r>造成单体<§u 极雷 §r>伤害\n\n" }
    ]
});
help.set("starry_map:planting_and_logging", {
    root: ['农林工程', '植树造木'],
    intel: [
        { text: "运行时消耗<§p星尘力§r>:§2 50§r\n\n" },
        { text: "北面为<§u 虹彩端口 §r>可与[§3 魔导总线 §r]进行连接\n\n" },
        { text: "南面为<§6 工程端口 §r>负责<§9 伐木 §r>与<§9 植树 §r>\n\n" },
        { text: "当[§3 魔导总线 §r]输入<§9 信号 §r>时, 且[§2 树苗 §r]生长为<§2 树 §r>\n\n" },
        { text: "将种下对应[§2 树苗 §r], 并砍伐树木\n\n" }
    ]
});
help.set("starry_map:crop_detection", {
    root: ['农林工程', '作物侦测'],
    intel: [
        { text: "运行时消耗<§p星尘力§r>:§2 5§r\n\n" },
        { text: "北面为<§u 虹彩端口 §r>可与[§3 魔导总线 §r]进行连接\n\n" },
        { text: "上方<§u 控制端口 §r>可与[§3 脉冲锁存 §r]进行连接\n\n" },
        { text: "当[§3 脉冲锁存 §r]为<§d 激活状态 §r>时, 南面的<§n 发射端 §r>将周期性的发射<§5 侦测射线 §r>\n\n" },
        { text: "如果<§5 侦测射线 §r>击中<§9 成熟 §r>[§3 作物 §r], 将输出<§9 信号 §r>\n\n" }
    ]
});
help.set("starry_map:obsidian_furnace", {
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
help.set("starry_map:obsidian_storage_tank", {
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
help.set('starry_map:guide.crimson', {
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
help.set('starry_map:guide.sen_nie', {
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
help.set('starry_map:guide.star_sand', {
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
help.set('starry_map:guide.moon_light', {
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
help.set('starry_map:guide.pearl', {
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
help.set('starry_map:guide.crystal', {
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
help.set('starry_map:guide.rambler', {
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
help.set('starry_map:guide.hai_ling', {
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
help.set('starry_map:guide.hai_na', {
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
help.set('starry_map:guide.nine_nine', {
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
help.set('starry_map:guide.snow_hidden', {
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
help.set('starry_map:guide.dullblue', {
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
help.set('starry_map:guide.windnews', {
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
help.set('starry_map:amber_jasmine', {
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
help.set('starry_map:wild_bee.detection', {
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
help.set('entity_machine:wasp_chaser', {
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
help.set('starry_map:wild_bee.support', {
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
help.set('entity_machine:wasp_annihilator', {
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
help.set('starry_map:wild_bee.emperor', {
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
help.set('starry_map:wild_bee.guide', {
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
help.set('starry_map:dragon.tyrannosaurus_rex', {
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
help.set('starry_map:abyss_whale.emperor', {
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
help.set('starry_map:abyss_whale.detection', {
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
help.set('starry_map:abyss_whale.execute', {
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
help.set('starry_map:magic_crystal_pickaxe', {
    root: ['魔晶工具', '魔晶镐子', '快速挖掘'],
    intel: [
        { text: '<§l§u 魔晶镐子 §r>可用于挖掘矿物和机械方块, 提升速度\n\n' },
        { text: '可用于加速挖掘< 模组方块 >与< 部分原版方块 >\n\n' }
    ]
});
help.set('starry_map:magic_crystal_wrench', {
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
].forEach(item => help.set(item, { root: ['魔晶工具', '魔晶剑', '近战武器'], intel: [...sword], only: true }));
help.set('starry_map:magic_crystal_claw', {
    root: ['魔晶工具', '魔晶钩爪', '快速位移'],
    intel: [
        { text: '当对着一定距离内的方块使用<§l§u 魔晶钩爪 §r>时\n' },
        { text: '玩家将获得<§l§b 漂浮 §r>效果, 并移动到目标位置附近\n\n' }
    ]
});
help.set('starry_map:magic_crystal_hammer', {
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
help.set('starry_map:magic_crystal_bow', {
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
help.set('starry_map:magic_crystal_marbles', {
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
help.set('starry_map:magic_crystal_screwdriver', {
    root: ['魔晶工具', '魔晶起子', '区块连锁'],
    intel: [
        { text: '使用<§l§u 魔晶起子 §r>后, 将出现<§l§s 设置界面 §r>\n\n' },
        { text: '在此界面, 您可以根据需求调整参数, 提升挖掘效率\n\n' },
        { text: '--------------------------------\n\n' },
        { text: '在挖掘黑曜石时, <§l§u 魔晶起子 §r>将显著加速\n\n' },
        { text: '这使挖掘黑曜石变得轻松快捷\n\n' },
        { text: '--------------------------------\n\n' },
        { text: '<§l§u 魔晶起子 §r>也适用于挖掘矿物和机械方块, 提升速度\n\n' }
    ]
});
help.set('starry_map:magic_crystal_key', {
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
help.set('starry_map:magic_crystal_shield', {
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
].forEach(item => help.set(item, { root: ['富氧金', '合页', '板材'], intel: [ore_generate, ore_make, ...item_mineral], only: true }));
[
    "starry_map:mine.ferric_phosphate",
    "starry_map:ferric_phosphate",
    "starry_map:gear.ferric_phosphate",
    "starry_map:hinge.ferric_phosphate",
].forEach(item => help.set(item, { root: ['磷酸铁', '合页', '齿轮'], intel: [ore_generate, ore_make, ...item_mineral], only: true }));
[
    "starry_map:mine.aluminum_magnesium",
    "starry_map:aluminum_magnesium",
    "starry_map:plate.aluminum_magnesium",
    "starry_map:hinge.aluminum_magnesium",
].forEach(item => help.set(item, { root: ['铝镁金', '合页', '板材'], intel: [ore_generate, ore_make, ...item_mineral], only: true }));
[
    "starry_map:mine.ferric_chloride",
    "starry_map:ferric_chloride",
    "starry_map:plate.ferric_chloride",
    "starry_map:hinge.ferric_chloride",
].forEach(item => help.set(item, { root: ['氯化铁', '合页', '板材'], intel: [ore_generate, ore_make, ...item_mineral], only: true }));
[
    "starry_map:mine.zirconium_carbide",
    "starry_map:zirconium_carbide",
    "starry_map:gear.zirconium_carbide",
    "starry_map:hinge.zirconium_carbide",
].forEach(item => help.set(item, { root: ['碳化锆', '合页', '齿轮'], intel: [ore_generate, ore_make, ...item_mineral], only: true }));
[
    "starry_map:mine.gold_carbonate",
    "starry_map:gold_carbonate",
    "starry_map:gear.gold_carbonate",
    "starry_map:hinge.gold_carbonate",
].forEach(item => help.set(item, { root: ['碳酸金', '合页', '齿轮'], intel: [ore_generate, ore_make, ...item_mineral], only: true }));
[
    "starry_map:mine.lithium_carbonate",
    "starry_map:lithium_carbonate",
    "starry_map:gear.lithium_carbonate",
    "starry_map:hinge.lithium_carbonate",
].forEach(item => help.set(item, { root: ['碳酸锂', '合页', '齿轮'], intel: [ore_generate, ore_make, ...item_mineral], only: true }));
[
    "starry_map:mine.tungsten_nickel_titanium",
    "starry_map:tungsten_nickel_titanium",
    "starry_map:plate.tungsten_nickel_titanium",
    "starry_map:hinge.tungsten_nickel_titanium",
].forEach(item => help.set(item, { root: ['钨镍钛', '合页', '板材'], intel: [ore_generate, ore_make, ...item_mineral], only: true }));
[
    "starry_map:mine.copper_tin_brazing",
    "starry_map:copper_tin_brazing",
    "starry_map:plate.copper_tin_brazing",
    "starry_map:hinge.copper_tin_brazing",
].forEach(item => help.set(item, { root: ['锡钎铜', '合页', '板材'], intel: [ore_generate, ore_make, ...item_mineral], only: true }));
[
    "starry_map:steel_rock_eutectic",
    "starry_map:coil.steel_rock_eutectic",
    "starry_map:wafer.steel_rock_eutectic",
].forEach(item => help.set(item, { root: ['钢岩合金', '晶圆', '线圈'], intel: [ore_make, ...item_mineral], only: true }));
[
    "starry_map:tungsten_copper_alloy",
    "starry_map:plate.tungsten_copper_alloy",
    "starry_map:hinge.tungsten_copper_alloy",
].forEach(item => help.set(item, { root: ['钨铜合金', '合页', '板材'], intel: [ore_make, ...item_mineral], only: true }));
help.set('starry_map:call_python_sentinel', {
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
help.set('starry_map:call_whale_support', {
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
help.set('starry_map:call_tunnel_dragon_guide', {
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
help.set('starry_map:world_of_box', {
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
help.set('starry_map:nihility_space_block', {
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
help.set('starry_map:inhibit_water', {
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
help.set('starry_map:stateful_inspection', {
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
help.set('starry_map:purple_gold_gourd', {
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
help.set('starry_map:material_sorting', {
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
help.set('starry_map:ocean_blessed_scarf', {
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
help.set('starry_map:exhausted_armor', {
    root: ['魔晶铠甲', '伤害吸收', '枯竭'],
    intel: [
        ...magic_crystal_armor,
        { text: '该装备<§u 耐久值 §r>:§2 500 §r\n\n' },
        { text: '该装备<§u 盔甲值 §r>:§2 5 §r\n\n' },
    ]
});
help.set('starry_map:complete_armor', {
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
].forEach(item => help.set(item, { root: ['元素守护', '伤害吸收', '特种护甲'], intel: [...magic_crystal_armor, ...shelter], only: true }));
help.set('starry_map:starry_night_bead', {
    root: ['注魔宝珠', '星夜凝华', '增益道具'],
    intel: [
        ...magic_orbs,
        { text: '该道具的增益效果为<§l§b 夜视 §r>与<§l§b 急迫 §r>\n\n' },
    ]
});
help.set('starry_map:purple_gold_soul_jade', {
    root: ['注魔宝珠', '紫晶魂玉', '增益道具'],
    intel: [
        ...magic_orbs,
        { text: '该道具的增益效果为<§l§b 村庄英雄 §r>与<§l§b 试炼征兆 §r>\n\n' },
    ]
});
help.set('starry_map:ice_essence_gem', {
    root: ['注魔宝珠', '寒冰灵韵', '增益道具'],
    intel: [
        ...magic_orbs,
        { text: '该道具的增益效果为<§l§b 速度 §r>与<§l§b 怪物减速 §r>\n\n' },
    ]
});
help.set('starry_map:azure_sea_tide', {
    root: ['注魔宝珠', '碧海潮生', '增益道具'],
    intel: [
        ...magic_orbs,
        { text: '该道具的增益效果为<§l§b 潮涌能量 §r>与<§l§b 盘丝 §r>\n\n' },
    ]
});
help.set('starry_map:scarlet_flame_heart', {
    root: ['注魔宝珠', '赤焰灵心', '增益道具'],
    intel: [
        ...magic_orbs,
        { text: '该道具的增益效果为<§l§b 力量 §r>与<§l§b 防火 §r>\n\n' },
    ]
});
help.set('starry_map:chorus_picture', {
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
help.set('starry_map:contract_rewriting', {
    root: ['特殊道具', '契约重撰', '万能契约'],
    intel: [
        { text: '当使用该道具命中目标时, 将消耗该道具\n\n' },
        { text: '如果命中的目标可被驯服, 那么将强制再次驯服\n\n' },
        { text: '在这个过程中将强制修正从属关系\n\n' },
    ]
});
help.set('starry_map:enlightenment', {
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
help.set('starry_map:reduction_pureness', {
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
help.set('starry_map:moment_repair_dew', {
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
help.set('starry_map:phantom_dispel_dust', {
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
help.set('starry_map:flowing_star', {
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
help.set('starry_map:dynamic_anchor_point', {
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
help.set('starry_map:mechanized_operation', {
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
help.set('starry_map:call_python_pioneer', {
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
help.set('starry_map:moon_and_stars', {
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
help.set('starry_map:clothing_container', {
    root: ['特殊道具', '换装礼盒', '外观服饰'],
    intel: [
        { text: '当您对准 "神恩领航者 - 琉璃" 使用此道具时\n\n' },
        { text: '您将能够打开皮肤选择界面\n\n' },
        { text: '在界面中, 您可以自由选择喜爱的皮肤\n\n' },
        { text: '请注意, 此道具只适用于 "神恩领航者 - 琉璃"\n\n' },
    ]
});
help.set('starry_map:fantasy_sea_collection', {
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
help.set('starry_map:faerie_contract', {
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
help.set('starry_map:faerie_healing', {
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
help.set('starry_map:space_transition', {
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
help.set('starry_map:mineral_dictionary', {
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
help.set('starry_map:forestry_guidelines', {
    root: ['魔导书籍', '林业指南', '大伐木术'],
    intel: [
        { text: '当您使用<§l§u 林业指南 §r>, <神明-界木>的生机将在您掌中凝聚成一个魔法方阵\n\n' },
        { text: '方阵之内, 魔法的力量被唤醒, 自动扫描并精准伐倒附近的 [树木]\n\n' },
        { text: '伐木的过程因此变得更加高效, 同时保证了生态的和谐与安全\n\n' },
        { text: '在<神明-极雷>的标准化力量下, 每一次伐木都是一次对自然的尊重与精准的刻录\n\n' }
    ]
});
help.set('starry_map:magic_handbook', {
    root: ['魔导书籍', '魔导手册', '方块百科'],
    intel: [
        { text: '当您以<§l§u 魔导手册 §r>拍打方块, 即是在召唤[神明-归忆]的智慧\n\n' },
        { text: '协议的力量将自动展开[月华百科]的智慧, 揭示所选方块的奥秘\n\n' },
        { text: '辅助说明信息如同<神明-极雷>的权柄, 清晰地展现在您眼前\n\n' },
        { text: '这是对建筑师与探险者的一份神圣礼物, 源自[神明-归忆]对规则与历史的守护\n\n' },
        { text: '它赋予他们洞察力, 深入理解方块的本质与特性\n\n' }
    ]
});
help.set('starry_map:source_energy', {
    root: ['魔导书籍', '源能秘典', '星之指引'],
    intel: [
        { text: '当您紧握<§l§u 源能秘典 §r>, 便是在唤醒[神明-归忆]的深奥知识\n\n' },
        { text: '书页轻翻, <§l§9 星之指引 §r>的智慧如星辰般闪耀, 展示着全部引导信息与提示\n\n' },
        { text: '这是对建筑者和探险者的一份神圣启示, 源自[神明-极雷]对权柄与力量的刻录\n\n' },
        { text: '它赋予他们洞察力, 深入理解模组的神秘与特性\n\n' }
    ]
});
help.set('starry_map:introduction_magic', {
    root: ['魔导书籍', '魔导绪论', '方块通知'],
    intel: [
        { text: "在机器的轰鸣声中, 使用<§l§u 魔导绪论 §r>, 即是在聆听[神明-归忆]的历史低语\n\n" },
        { text: "您的视野将穿透<§l§2 当前区块 §r>, 捕捉到<§l§9 魔导工业 §r>方块的心跳\n\n" },
        { text: "<§l§c 通知与报错信息 §r>在<神明-极雷>的标准化力量下, 清晰展现\n\n" },
        { text: "智慧地运用<§l§u 魔导绪论 §r>, 您将更好地掌握<§l§9 魔导工业 §r>的运作与奥秘\n\n" }
    ]
});
help.set('starry_map:blank_blueprint', {
    root: ['机械蓝图', '工业蓝图', '空白蓝图'],
    intel: [
        { text: "玩家在使用<§l§u 空白蓝图 §r>时\n\n" },
        { text: "可以通过点击方块和潜行时点击方块, 来确定选中区域的两个顶点\n\n" },
        { text: "当顶点框选完成后, 使用<§l§u 空白蓝图 §r>挖掘任意方块, 即可触发封装流程\n\n" },
        { text: "封装后, 将会获得保存了选中的方块结构的<§l§u 成品蓝图 §r>\n\n" }
    ]
});
help.set('starry_map:complete_blueprint', {
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
].forEach(item => help.set(item, { root: ['模板材料', '升级模板', '强化升级'], intel: [...template_upgrade], only: true }));
help.set('starry_map:blank_template', {
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
].forEach(item => help.set(item, { root: ['仿生模板', '蝰蛇符文', '渊鲸符文'], intel: [...template_rune], only: true }));
help.set('starry_map:weapon_debris', {
    root: ['模板材料', '机械核心', '武装碎片'],
    intel: [
        { text: "机械生命体被摧毁后残留的结构\n\n" },
        { text: "基础的结构与功能依旧完整可用\n\n" },
        { text: "仍能拼装为其他可运行的仿生机械\n\n" },
        { text: "是一种通用的拟造生物活体的设备材料\n\n" }
    ]
});
help.set('starry_map:universal_integrated_circuit', {
    root: ['模板材料', '设备核心', '通用集成'],
    intel: [
        { text: "可在< 闪长石桌 >中合成\n\n" },
        { text: "经过对< 空灵单元 >的接口与结构封装\n\n" },
        { text: "可以制作为简易魔导工程机械的复合芯片组设备\n\n" }
    ]
});
help.set('starry_map:equipment_upgrade', {
    root: ['模板材料', '升级模板', '装备升级'],
    intel: [
        { text: "可在< 闪长石桌 >中合成\n\n" },
        { text: "带有特定功能优化和升级的< 空灵单元 >芯片组\n\n" },
        { text: "可以用于升级< 魔晶铠甲 >等装备\n\n" }
    ]
});
help.set('starry_map:ender_dragon_scales', {
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
].forEach(item => help.set(item, { root: ['碎片残骸', '迷之料理', '琼肴雅馔'], intel: [...delicacies_rune], only: true }));
help.set('starry_map:ender_dragon_scales', {
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
].forEach(item => help.set(item, { root: ['扩散填充', '快速建造', '自动填充'], intel: [...diffusion_filling], only: true }));
export default help;
