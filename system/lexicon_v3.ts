/*
 * 原版接口
 */
import * as serverUI from "@minecraft/server-ui";
import * as server from "@minecraft/server";
/*
 * 系统数据
 */
import * as table from "../data/table";
import * as type from "../data/type";
import prompt from "../data/prompt";
import help from "../data/help";
/*
 * 数学模块
 */
import { RandomFloor } from './maths';
/*
 * 导出模块
 */
export { ReplyMessages, IntelSource, Lexicon, Window, ChatEcho, PrintChat, PrintToChatBar };
/**
 * * 预设回复消息模板
 */
class ReplyMessages {
	/**
	 * * 提供帮助询问
	 */
	static get ask_for_task(): server.RawMessage {
		return { text: '请问需要我做些什么呀? \n' };
	};
	/**
	 * * 未识别的主题
	 */
	static get unknown_theme(): server.RawMessage {
		return { text: '#$^$#听不太明白哦……你能再详细说一下吗? \n' };
	};
	/**
	 * * 缺少相关资料
	 */
	static get unknown_paper(): server.RawMessage {
		return { text: '很抱歉, #$^$#似乎没有找到您想要的资料呢……\n' };
	};
	/**
	 * * 成功获取资料
	 */
	static get obtain_paper(): server.RawMessage {
		return { text: '#$^$#找到了哦, 请看以下资料 : \n\n' };
	};
	/**
	 * * 未知的生态群系
	 */
	static get unknown_biome(): server.RawMessage {
		return { text: '看起来这个群系#$^$#还没有发现过……能否提供更多信息呢? \n' };
	};
	/**
	 * * 未识别的节点
	 */
	static get unknown_node(): server.RawMessage {
		return { text: '#$^$#很抱歉, 不太明白您的意思, 能换个说法再解释一下吗? \n' };
	};
	/**
	 * * 未知记忆
	 */
	static get unknown_echo(): server.RawMessage {
		return { text: '这个记忆, #$^$#似乎有些模糊, 能否重新描述一遍? \n' };
	};
	/**
	 * * 执行记忆
	 */
	static get enact_echo(): server.RawMessage {
		return { text: '#$^$#明白了哦! 正在执行中啦~\n' };
	};
	/**
	 * * 日志状态切换
	 */
	static get log_toggle(): server.RawMessage {
		return { text: '#$^$#收到你的指令啦! 正在切换日志状态哦~\n' };
	};
	/**
	 * * 权限不足
	 */
	static get power_lack(): server.RawMessage {
		return { text: '哎呀, 权限不够的话, #$^$#就不能帮你做这个操作啦……\n' };
	};
	/**
	 * * 设置 虚岩矿脉
	 */
	static get realm_mineral(): server.RawMessage {
		return { text: '#$^$#收到你的指令啦! 我将借助<§q§l 律令 §r>的力量, 协助你调试<§s§l 虚岩矿脉 §r>\n' };
	};
	/**
	 * * 设置 星尘能量
	 */
	static get realm_energy(): server.RawMessage {
		return { text: '#$^$#看到你的请求啦! 我将借助<§q§l 律令 §r>的力量, 协助你调试<§u§l 星尘能量 §r>\n' };
	};
	/**
	 * * 执行 元素攻击
	 */
	static get pursue_rune_hurt(): server.RawMessage {
		return { text: '#$^$#听到你的需求了! 我将借助<§q§l 律令 §r>的力量, 协助你释放<§5§l 元素攻击 §r>\n' };
	};
	/**
	 * * 修改 动态属性
	 */
	static get pursue_dynamic_property(): server.RawMessage {
		return { text: '#$^$#明白你的指令啦! 我将借助<§q§l 律令 §r>的力量, 协助你调试<§5§l 动态属性 §r>\n' };
	};
	/**
	 * * 创建 雾海裂隙
	 */
	static get pursue_fissure(): server.RawMessage {
		return { text: '#$^$#知道你的愿望啦! 我将借助<§q§l 律令 §r>的力量, 协助你构建<§9§l 雾海裂隙 §r>\n' };
	};
	/**
	 * * 扩展功能模板
	 */
	static get craft_template(): type.LEXICON_INTEL {
		return { root: [], intel: [], only: true, priority: 128 };
	};
	/**
	 * * 重置 结构限制
	 */
	static get reset_structural_constraints(): server.RawMessage {
		return { text: '#$^$#成功重置了<§9 结构限制 §r>! 有些结构可以重新生成啦~\n' }
	};
	/**
	 * * 打印到聊天栏
	 */
	static get print_to_chat_bar(): server.RawMessage {
		return { text: '明白了! #$^$#会把结果打印到聊天栏里~ 这样你就能看到啦! \n\n' }
	};
	/**
	 * * 创建数据目录
	 */
	static get create_data_directory(): server.RawMessage {
		return { text: '#$^$#明白了, 正在创建你需要的数据目录\n' }
	};
	/**
	 * * 无法选择
	 */
	static get cannot_select(): server.RawMessage {
		return { text: '§l§m没有了哦, #$^$#什么都没有了啦……' }
	};
	/**
	 * * 函数采用了实验性API, 目前暂不支持继续使用该接口,请等待后续版本更新
	 */
	static get experimental_api_disabled(): server.RawMessage {
		return { text: '很抱歉呀, 这个接口#$^$#目前还在实验阶段, 目前无法继续使用哦~ 等后续版本更新啦! \n' };
	};
	/**
	 * * 无效的构造函数
	 */
	protected constructor() { };
};
/**
 * * 『 百科 』模块数据集
 */
class IntelSource {
	/**
	 * * 模块的名称标签
	 */
	static nameTag: string = '§d§l月华§r';
	/**
	 * * 聊天记录缓存 [ 玩家标识符 , [ 玩家的输入, 月华的回应 ] ]
	 */
	static history = new Map<string, [string, server.RawMessage]>();
	/**
	 * * 进行 数据检索 的 数据库
	 */
	static material = [
		...help,
	];
	/**
	 * * 输出文本
	 */
	public output: server.RawMessage = { rawtext: [] };
	/**
	 * * 无效的构造函数
	 */
	protected constructor() { };
};
/**
 **『 百科 』模块
 */
class Lexicon extends IntelSource {
	/**
	 **『 百科 』模块
	 *
	 * @param {server.Player} player - 发起对话 的 玩家对象
	 *
	 * @param {string} rawtext - 玩家输入的 完整字符串
	 *
	 * @param {boolean} immerse - 是否为 沉浸式检索
	 */
	constructor(public player: server.Player, rawtext: string, immerse: boolean = false) {
		// 继承父类
		super();
		/**
		 * * 将玩家输入的字符串拆分为多个短语
		 */
		const sections = rawtext.split(/\s+/);
		/**
		 * * 输出结果
		 */
		const output = this.output.rawtext;
		/**
		 * * 名称置换占位符
		 */
		const sign = /(#\$[\^]+\$\#)/g;
		// 检测输入是否为空或仅包含空白字符
		if (!rawtext || rawtext.trim().length <= 1) output?.push(ReplyMessages.unknown_node);
		// 如果输入有效, 则检索数据库
		else Lexicon.analysisQuery(player, sections, this.output, immerse);
		// 将输出的文本中的占位符替换为模型参数中的名称
		output?.forEach(info => { if (info.text) info.text = info.text.replace(sign, Lexicon.nameTag) });
		// 保存对话记录
		Lexicon.history.set(player.id, [rawtext, this.output]);
	};
	/**
	 * * 获取 实例输出信息
	 */
	public get interface(): server.RawMessage { return this.output };
	/**
	 * * 检索数据库
	 *
	 * @param {server.Player} player - 发起对话 的 玩家对象
	 *
	 * @param {string[]} request - 经过 初步处理 的 玩家输入文本组
	 *
	 * @param {server.RawMessage} output - 输出信息
	 *
	 * @param {boolean} immerse - 是否为 沉浸式检索
	 */
	public static analysisQuery(player: server.Player, request: string[], output: server.RawMessage, immerse: boolean = false) {
		/**
		 * * 输入字符串
		 */
		const entry = request[0];
		/**
		 * * 资料内容
		 */
		const detail: server.RawMessage[] = [];
		/**
		 * * 根标签
		 */
		const rootTags = Lexicon.material.map(info => info[1].root);
		/**
		 * * 规范化 资料表
		 */
		const norm = new Map(Lexicon.material);
		/**
		 * * 使用 严谨模式 查询 数据库 获得的 查询结果
		 */
		const strictQuery = norm.get(entry);
		// 严格模式下 如果 获取到 代码 则 执行 代码
		if (strictQuery && strictQuery.code) {
			/**
			 * * 执行代码并获取返回值
			 */
			const codeOutput = strictQuery?.code(player, request.slice(1), request);
			// 如果 代码返回值 是 数组 则 结构并输出所有值
			if (Array.isArray(codeOutput)) detail.push(...codeOutput)
			// 否则 直接输出
			else detail.push(codeOutput)
		};
		// 如果 严谨模式 未能获取到 文本数据 则查询 根标签
		if (strictQuery?.intel) detail.push(...strictQuery.intel);
		else detail.push(...this.rootTagQuery(player, false, entry, rootTags, request, immerse));
		// 如果 未能查询到数据 则进行 模糊检索
		if (detail.length == 0) detail.push(...this.rootTagQuery(player, true, entry, rootTags, request, immerse));
		// 如果 未能查询到数据 则返回 默认文本
		if (detail.length == 0) detail.push(ReplyMessages.unknown_paper);
		// 输出文本
		if (detail.length >= 5 && !immerse) output.rawtext?.push(ReplyMessages.obtain_paper, ...detail);
		else output.rawtext?.push(...detail);
	};
	/**
	 * * 基于 根标签 进行 检索 资料库
	 *
	 * @param {boolean} type - 是否启用模糊搜索
	 *
	 * @param {string} input - 输入的 搜索内容
	 *
	 * @param {string[][]} tags - 搜索的 标签数组
	 *
	 * @param {string[]} rawtexts - 原始文本数组
	 *
	 * @param {boolean} immerse - 是否为 沉浸式检索
	 *
	 * @returns {server.RawMessage[]} - 搜索结果
	 */
	public static rootTagQuery(player: server.Player, type: boolean, input: string, tags: string[][], rawtexts: string[], immerse: boolean = false): server.RawMessage[] {
		/**
		 * * 数据库
		 */
		const sample: type.LEXICON_INTEL[] = Lexicon.material.map(info => info[1]);
		/**
		 * * 唯一性检测
		 */
		const detect: [type.LEXICON_INTEL, number][] = [];
		/**
		 * * 信息输出
		 */
		const output: server.RawMessage[] = [];
		// 检索资料
		tags.forEach(
			(tag, index) => {
				/**
				 * * 当前 被选中 的 信息对象
				 */
				const target = sample[index];
				/**
				 * * 构建资料名称
				 */
				const title = { text: '§q§l' + target.root.join(' - ') + '§r\n\n' };
				/**
				 * * 文本结尾
				 */
				const finale = { text: '\n=-=-=-=-=-=-=-=-=-=\n' };
				/**
				 * * 当前信息对象 的 模糊检测 阈值
				 */
				const confine = 0.25;
				/**
				 * * 计算 文本关联度
				 */
				const proximity = Lexicon.Correlation(input, target.root.join('*'), tag);
				// 提取合适的数据
				switch (type) {
					// 当前信息对象 进行 模糊检测
					case true: if (proximity >= confine && target.intel)
						target.only
							? detect.push([target, proximity])
							: output.push(immerse ? {} : title, ...target.intel, finale);
						break;

					// 当前信息对象 进行 标签检测
					default: if (new Set(tag).has(input) && target.intel)
						target.only
							? detect.push([target, proximity])
							: output.push(immerse ? {} : title, ...target.intel, finale);
						break;
				}
			}
		);
		// 如果 唯一性检测 为空 则返回 所有资料页
		if (detect.length == 0) return output;
		// 如果 唯一性检测 不为空 则返回 最高优先级资料页
		else {
			/**
			 * * 获取 优先级数组
			 */
			const detectMap = detect.map(info => info[0].priority ?? 0 * info[1]);
			/**
			 * * 获取 最高优先级
			 */
			const maxPriority = Math.max(...detectMap);
			/**
			 * * 获取 节点索引
			 */
			const index = detectMap.indexOf(maxPriority);
			/**
			 * * 获取 随机输出
			 */
			const randomOutput = detect[RandomFloor(0, detect.length - 1)][0].intel;
			// 如果 最高优先级为 0 则返回 随机输出
			if (randomOutput && maxPriority == 0) return randomOutput;
			// 如果 最高优先级不为 0 则返回 最高优先级资料页 并 执行模块函数
			else {
				/**
				 * * 获取 函数运行后的 反馈
				 */
				const feedback = detect[index][0].code?.(player, rawtexts.slice(1), rawtexts);
				/**
				 * * 复制 文献数据
				 */
				const intelCopy = detect[index][0]?.intel ? [...detect[index][0]?.intel] : [];
				// 添加 反馈信息
				if (feedback) {
					// 如果 代码返回值 是 数组 则 结构并输出所有值
					if (Array.isArray(feedback)) intelCopy.push(...feedback)
					// 否则 直接输出
					else intelCopy.push(feedback)
				};
				// 输出 文献 与 反馈信息
				return intelCopy;
			}
		}
	};
	/**
	 * * 修饰输出信息 生成格式化的文本消息
	 *
	 * @param {server.RawMessage} input - 原始文本消息, 待修饰
	 *
	 * @returns {server.RawMessage} - 修饰后的文本消息
	 */
	public static Format(input?: server.RawMessage): server.RawMessage {
		/**
		 * * 模型规模, 即模型包含的条目数
		 */
		const model = Lexicon.material.length;
		/**
		 * * 页面规模, 即所有条目中信息字段的总长度
		 */
		const paper = Lexicon.material.map(info => info[1].intel?.length || 0).reduce((pre, next) => pre + next);
		/**
		 * * 数据总量, 即所有条目中文本内容的总字符数
		 */
		const total = Lexicon.material.flatMap(info => info[1].intel).map(info => info?.text?.length ?? 0).reduce((pre, next) => pre + next);
		/**
		 * * 默认文本模板, 包含模型的基本信息和扩展功能
		 */
		const template: server.RawMessage = {
			rawtext: [
				{ text: `嗨, 我是${Lexicon.nameTag}, 很高兴为您服务 !\n` },
				{ text: '--------------------------------\n' },
				{ text: "[§5 模型参数 §r]:\n" },
				{ text: '--------------------------------\n' },
				{ text: '模型版本:§d Lexicon v3 §r\n' },
				{ text: '模型依赖:§q ServerAPI 2.0.0-alpha §r\n' },
				{ text: `模型规模:§s ${model} §r\n` },
				{ text: `页面规模:§q ${paper} §r\n` },
				{ text: `数据总量:§u ${total} §r\n` },
				{ text: '--------------------------------\n' },
			]
		};
		// 如果提供了输入信息并且不为空, 则返回输入信息；否则, 返回默认模板
		return input && input?.rawtext?.length != 0 ? input : template;
	};
	/**
	 * * 基于 关键词 获得 匹配度积分
	 *
	 * @param {string} input - 玩家输入的关键词
	 *
	 * @param {string} type - 节点类型
	 *
	 * @param {string[]} source - 样本数组
	 *
	 * @returns {number} - 匹配度, 四舍五入到小数点后三位
	 */
	public static Correlation(input: string, type: string, source: string[]): number {
		/**
		 * * 初始化关键词
		 */
		const sample = new Set(source.join('').split(''));
		/**
		 * * 拆分输入信息
		 */
		const stage = [...new Set(input.split(''))];
		/**
		 * * 相同字符数
		 */
		let score = 0;
		// 统计 输入字符串 与 关键词 的匹配程度
		stage.forEach(node => sample.has(node) ? score++ : 0);
		/**
		 * * 计算得分
		 */
		const count = Number((score / sample.size).toFixed(6));
		/**
		 * * 日志参数 - 样本规模
		 */
		const sampleData = '§r | §5' + '总规模:§2 ' + sample.size;
		/**
		 * * 日志参数 - 匹配度
		 */
		const countData = '§r | §5' + '匹配度:§2 ' + count;
		/**
		 * * 日志参数 - 相同字数
		 */
		const scoreData = '§r | §5' + '相同字:§2 ' + score;
		// 输出日志
		if (table.Permit.can_display_logs && count != 0) console.error('§p' + type + countData + scoreData + sampleData);
		// 输出结果
		return count;
	};
};
/**
 * * 显示交互窗口
 *
 * 为玩家展示一个交互窗口, 允许玩家输入文本信息
 *
 * @param {server.Player} player - 玩家对象
 *
 * @param {server.RawMessage} [content=undefined] - 窗口中的默认内容
 */
function Window(player: server.Player, content?: server.RawMessage) {
	/**
	 * * 标题
	 */
	const title: server.RawMessage = { text: "§9《§u§l §r" + Lexicon.nameTag + "§u§l百科 §9》§r" };
	/**
	 * * 获取 玩家背包
	 */
	const container = player.getComponent('minecraft:inventory')?.container;
	/**
	 * * 获取 选中的物品的标识符
	 */
	const typeID = container?.getItem(player.selectedSlotIndex)?.typeId;
	/**
	 * * 默认文本
	 */
	const defaultText = !content ? typeID : undefined;
	/**
	 * * 表单对象
	 */
	const display = new serverUI.ModalFormData().title(title).textField(Lexicon.Format(content), ReplyMessages.ask_for_task, defaultText);
	// 检测是否输入了文本
	if (content?.rawtext) {
		// 根据输入的文本长度判断是否直接显示在聊天栏中
		if (content.rawtext.length < 2) player.sendMessage(content);
		// 如果文本过长, 则显示表单
		else display.show(player).then(
			option => {
				if (option.canceled || !option.formValues) return;
				Window(player, new Lexicon(player, option.formValues[0] as string).interface);
			}
		)
	}
	// 如果没有输入文本, 则显示默认表单
	else display.show(player).then(
		option => {
			// 如果玩家取消了表单, 则不进行操作
			if (option.canceled || !option.formValues) return;
			Window(player, new Lexicon(player, option.formValues[0] as string).interface);
		}
	)
};
/**
 * * 聊天回应功能
 *
 * 根据预设关键词开启或关闭<月华百科>的<聊天回应>, 并输出相应的聊天信息
 *
 * @param {server.Player} player - 发起聊天的玩家对象
 *
 * @param {string} message - 玩家发送的聊天信息
 */
function ChatEcho(player: server.Player, message: string) {
	/**
	 * 唤醒关键词集合
	 */
	const awaken = new Set(['月华', '小可爱']);
	/**
	 * 停止关键词集合
	 */
	const desist = new Set(['再见', '感谢', '退出']);
	// 判断是否允许<月华百科>对聊天信息做出回应
	if (can_echo_chat) {
		// 如果收到停止关键词, 则输出告别信息并关闭<月华百科>的<聊天回应>
		if (desist.has(message)) {
			PrintChat(player, new Lexicon(player, '再见').interface);
			can_echo_chat = false;
			return;
		}
		// 否则, 基于玩家的聊天信息输出<月华百科>的<聊天回应>
		PrintChat(player, new Lexicon(player, message).interface);
	}
	// 如果收到唤醒关键词, 则开启<月华百科>的<聊天回应>并输出问候信息
	else if (awaken.has(message)) {
		PrintChat(player, new Lexicon(player, '你好').interface);
		can_echo_chat = true;
	};
};
let can_echo_chat = false
/**
 * * 打印聊天信息
 *
 * 将聊天信息以打字机效果逐行显示给玩家
 *
 * @param {server.Player} player - 接收消息的玩家对象
 *
 * @param {server.RawMessage} input - 要显示的原始消息对象
 */
function PrintChat(player: server.Player, input: server.RawMessage) {
	/**
	 * * 提取记录中的文本信息
	 */
	const rawtext = input.rawtext;
	// 判断是否存在历史记录
	if (!rawtext || rawtext.length == 0) return player.sendMessage({ text: '§c未知输入§r' });
	// 使用打字机的形式输出历史记录
	PrintToChatBar(player, rawtext);
};
/**
 * * 逐行打印消息到聊天栏
 *
 * 将输入的多个消息对象逐行延迟发送到玩家的聊天栏, 实现类似打字机的效果
 *
 * @param {server.Player} player - 接收消息的玩家对象
 *
 * @param {server.RawMessage[]} input - 要逐行打印的消息数组
 */
function PrintToChatBar(player: server.Player, input: server.RawMessage[]) {
	// 遍历消息数组, 为每条消息设置延迟, 实现逐行显示
	input.forEach((text, index) => server.system.runTimeout(() => player.sendMessage(text), index * 4));
};