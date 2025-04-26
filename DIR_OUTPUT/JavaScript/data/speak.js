/*
 * 原版接口
 */
import * as server from "@minecraft/server";
/*
 * 系统组件
 */
import * as opal from "../system/opal";
/**
 * * 默认台词
 */
export const defaultSpeak = [
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
export const dialogue = new Map()
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
            const enable = opal.IsEnable(20);
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
                const messageParts = [opal.translate(entity), { text: ' : ' }, share[opal.RandomFloor(0, 1)]];
                // 尝试在玩家附近生成一个水晶能量物品
                opal.TrySpawnItem(entity.dimension, new server.ItemStack('starry_map:crystal_energy'), entity.location);
                // 发送分享蛋糕的消息给所有玩家
                server.world.sendMessage(messageParts);
            }
            else {
                /**
                 * 生成拒绝分享蛋糕的消息内容
                 */
                const messageParts = [opal.translate(entity), { text: ' : ' }, refuse[opal.RandomFloor(0, 1)]];
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
