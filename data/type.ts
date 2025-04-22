/*
 * 原版接口
 */
import * as serverUI from "@minecraft/server-ui";
import * as server from "@minecraft/server";

/**
 * TODO: 元素符文 类型
 */
export type RUNE_TYPE =
	| "rune_orange"
	| "rune_purple"
	| "rune_green"
	| "rune_white"
	| "rune_black"
	| "rune_void"
	| "rune_blue"
	| "rune_red";

/**
 * TODO: 元素符文 枚举
 */
export enum RUNE_ENUM {
	/**
	 * TODO: 元素符文 - 虚无
	 */
	void = 'rune_void',
	/**
	 * TODO: 元素符文 - 诸海
	 */
	blue = 'rune_blue',
	/**
	 * TODO: 元素符文 - 烛火
	 */
	red = 'rune_red',
	/**
	 * TODO: 元素符文 - 界木
	 */
	green = 'rune_green',
	/**
	 * TODO: 元素符文 - 归忆
	 */
	orange = 'rune_orange',
	/**
	 * TODO: 元素符文 - 极雷
	 */
	purple = 'rune_purple',
	/**
	 * TODO: 元素符文 - 启程
	 */
	white = 'rune_white',
	/**
	 * TODO: 元素符文 - 焚绝
	 */
	black = 'rune_black'
};

/**
 * TODO: 元素符文 进行计算时 的 映射值
 */
export enum RUNE_COUNT {
	/**
	 * TODO: 元素符文 - 虚无
	 */
	'rune_void' = 0,
	/**
	 * TODO: 元素符文 - 诸海
	 */
	'rune_blue' = 10,
	/**
	 * TODO: 元素符文 - 烛火
	 */
	'rune_red' = 100,
	/**
	 * TODO: 元素符文 - 界木
	 */
	'rune_green' = 1000,
	/**
	 * TODO: 元素符文 - 归忆
	 */
	'rune_orange' = 10000,
	/**
	 * TODO: 元素符文 - 极雷
	 */
	'rune_purple' = 100000,
	/**
	 * TODO: 元素符文 - 启程
	 */
	'rune_white' = 1000000,
	/**
	 * TODO: 元素符文 - 焚绝
	 */
	'rune_black' = 10000000
};

/**
 * TODO: 定义战斗属性面板的默认值
 */
export enum RUNE_PROPERTY_DEFAULT {
	/**
	 * 基础攻击提升的默认值
	 */
	raise_basic_attack = 0,
	/**
	 * 爆发概率提升的默认值
	 */
	raise_erupt_odds = 0,
	/**
	 * 爆发伤害提升的默认值
	 */
	raise_erupt_hurt = 0,
	/**
	 * 伤害增加的默认值
	 */
	damage_increase = 0,
	/**
	 * 双倍伤害的默认值
	 */
	double_damage = 1,
	/**
	 * 基础攻击的默认值
	 */
	basic_attack = 5,
	/**
	 * 爆发概率的默认值
	 */
	erupt_odds = 10,
	/**
	 * 爆发伤害的默认值
	 */
	erupt_hurt = 150,
	/**
	 * 自身符文类型的默认值
	 */
	self_rune = RUNE_ENUM.void,
	/**
	 * 添加符文类型的默认值
	 */
	add_rune = RUNE_ENUM.void
};

/**
 * 符文融合数据接口, 定义了符文融合所需的数据结构
 */
export interface RUNE_FUSION_DATA {
	/**
	 * 伤害倍增系数, 表示融合效果对伤害的增强倍数
	 *
	 * @type {number}
	 */
	double: number;
	/**
	 * 事件处理器, 可选, 如果融合效果有特殊事件需要处理, 则提供该函数
	 *
	 * @type {(entity: server.Entity) => void}
	 */
	event?: (entity: server.Entity) => void;
};
/**
 * TODO: 路径执行容器 附属程序 回调参数
 */
export interface ROUTE_ANNEX_ARGS {
	/**
	 * TODO: 每个 时钟周期 中 传入 的 坐标
	 */
	location: server.Vector3;
	/**
	 * TODO: 每个 时钟周期 中 传入 的 维度
	 */
	dimension: server.Dimension;
	/**
	 * TODO: 每个 时钟周期 中 传入 的 时间积分
	 */
	tick: number;
};

/**
 * TODO: 坐标信息 与 维度信息
 */
export interface LOCATION_AND_DIMENSION {
	/**
	 * TODO: 位置对象
	 */
	location: server.Vector3,
	/**
	 * TODO: 维度对象
	 */
	dimension: server.Dimension
};

/**
 * TODO: 设置属性 - 符文类型
 */
export interface SET_PROPERTY_PANEL {
	/**
	 * TODO: 附着 - 元素符文
	 *
	 * @description 当实体被攻击时 被附加上的 元素符文
	 */
	add_rune?: RUNE_TYPE;
	/**
	 * TODO: 自身 - 元素符文
	 *
	 * @description 当实体发动攻击时 附加到目标实体上的元素符文
	 */
	self_rune?: RUNE_TYPE;
};

/**
 * TODO: 设置属性 - 攻击面板
 */
export interface SET_PROPERTY_PANEL {
	/**
	 * TODO: 基础伤害
	 *
	 * @description 基础的 攻击伤害 属性值
	 */
	basic_attack?: number;
	/**
	 * TODO: 攻击提升
	 *
	 * @description 单次生效的 基础伤害 提升值
	 */
	raise_basic_attack?: number;
};

/**
 * TODO: 设置属性 - 暴击面板
 */
export interface SET_PROPERTY_PANEL {
	/**
	 * TODO: 暴击概率
	 *
	 * @description 基础的 暴击概率 属性值
	 */
	erupt_odds?: number;
	/**
	 * TODO: 提升 - 暴击概率
	 *
	 * @description 单次生效的 暴击概率 提升值
	 */
	raise_erupt_odds?: number;
	/**
	 * TODO: 暴击伤害
	 *
	 * @description 基础的 暴击伤害 属性值
	 */
	erupt_hurt?: number;
	/**
	 * TODO: 暴伤提升
	 *
	 * @description 单次生效的 暴击伤害 提升值
	 */
	raise_erupt_hurt?: number;
};

/**
 * TODO: 设置属性 - 增伤面板
 */
export interface SET_PROPERTY_PANEL {
	/**
	 * TODO: 伤害提升
	 *
	 * @description 最终结算时 单次生效的 额外增加的 不参与其他运算的 伤害数值
	 */
	damage_increase?: number;
	/**
	 * TODO: 伤害倍率
	 *
	 * @description 最终结算时 单次生效的 按照设定的数值 提高实体造成的伤害
	 */
	double_damage?: number;
};

/**
 * TODO: 获取属性 - 符文类型
 */
export interface GET_PROPERTY_PANEL {
	/**
	 * TODO: 附着 - 元素符文
	 *
	 * @description 当实体被攻击时 被附加上的 元素符文
	 */
	add_rune: RUNE_TYPE;
	/**
	 * TODO: 自身 - 元素符文
	 *
	 * @description 当实体发动攻击时 附加到目标实体上的元素符文
	 */
	self_rune: RUNE_TYPE;
};

/**
 * TODO: 获取属性 - 攻击面板
 */
export interface GET_PROPERTY_PANEL {
	/**
	 * TODO: 基础伤害
	 *
	 * @description 基础的 攻击伤害 属性值
	 */
	basic_attack: number;
	/**
	 * TODO: 攻击提升
	 *
	 * @description 单次生效的 基础伤害 提升值
	 */
	raise_basic_attack: number;
};

/**
 * TODO: 获取属性 - 暴击面板
 */
export interface GET_PROPERTY_PANEL {
	/**
	 * TODO: 暴击概率
	 *
	 * @description 基础的 暴击概率 属性值
	 */
	erupt_odds: number;
	/**
	 * TODO: 提升 - 暴击概率
	 *
	 * @description 单次生效的 暴击概率 提升值
	 */
	raise_erupt_odds: number;
	/**
	 * TODO: 暴击伤害
	 *
	 * @description 基础的 暴击伤害 属性值
	 */
	erupt_hurt: number;
	/**
	 * TODO: 暴伤提升
	 *
	 * @description 单次生效的 暴击伤害 提升值
	 */
	raise_erupt_hurt: number;
};

/**
 * TODO: 获取属性 - 增伤面板
 */
export interface GET_PROPERTY_PANEL {
	/**
	 * TODO: 伤害提升
	 *
	 * @description 最终结算时 单次生效的 额外增加的 不参与其他运算的 伤害数值
	 */
	damage_increase: number;
	/**
	 * TODO: 伤害倍率
	 *
	 * @description 最终结算时 单次生效的 按照设定的数值 提高实体造成的伤害
	 */
	double_damage: number;
};

/**
 * TODO: 「百科」 - 信息存储
 */
export interface LEXICON_INTEL {
	/**
	 * TODO: 用于检索的根标签
	 */
	root: string[];
	/**
	 * TODO: 文本内容
	 */
	intel?: server.RawMessage[];
	/**
	 * TODO: 是否在特定场合下具有唯一性
	 */
	only?: boolean;
	/**
	 * TODO: 优先级
	 */
	priority?: number;
	/**
	 * TODO: 模块简介
	 *
	 * @description 建议与< code >一同搭配使用
	 */
	synopsis?: server.RawMessage;
	/**
	 * TODO: 模块代码
	 *
	 * @param {server.Player} player - 用于 执行函数 的 玩家对象
	 *
	 * @param {string[]} texts - 用于 执行函数 的 识别文本数组
	 *
	 * @description 使用时建议启用< only >
	 *
	 * @description 函数返回值会作为 识别文本 的结果
	 *
	 * @returns {server.RawMessage} - 用于 识别文本 的 结果
	 */
	code?: (player: server.Player, texts: string[], rawtexts: string[], isChat: boolean) => server.RawMessage | server.RawMessage[];
};
/**
 * TODO: 「百科」 - 权重因子
 */
export interface LEXICON_WEIGHT_FACTOR {
	/**
	 * TODO: 基础权重
	 */
	weight: number;
	/**
	 * TODO: 响应文本
	 */
	responses: server.RawMessage[]
};

/**
 * TODO: 物品信息
 */
export interface ITEM_STACK_DATA {
	/**
	 * TODO: 物品类型
	 */
	type: string;
	/**
	 * TODO: 物品数量
	 */
	amount?: number;
	/**
	 * TODO: 物品名称
	 */
	name?: string;
	/**
	 * TODO: 物品词缀
	 */
	lore?: string[];
	/**
	 * TODO: 物品动态属性
	 */
	property?: Map<string, boolean | number | string | server.Vector3>;
};

/**
 * TODO: 「奖杯」 - 信息存储
 */
export interface SCHEDULE_NOTE {
	/**
	 * TODO: 当前任务依赖的标签
	 */
	rely?: string[];
	/**
	 * TODO: 任务完成后添加的标签
	 */
	onDone?: string[];
	/**
	 * TODO: 任务完成后触发的引导
	 */
	prompt?: string;
	/**
	 * TODO: 任务的图标纹理
	 */
	texture?: string;
	/**
	 * TODO: 任务的文本描述
	 */
	refer: server.RawMessage[];
	/**
	 * TODO: 任务完成后的奖励
	 */
	reward?: ITEM_STACK_DATA[];
	/**
	 * TODO: 任务完成后的损耗
	 */
	attrition?: ITEM_STACK_DATA[];
	/**
	 * TODO: 任务完成后处理函数
	 */
	after?: (player: server.Player) => void;
	/**
	 * TODO: 任务完成前处理函数
	 */
	before?: (player: server.Player) => boolean;
};

/**
 * TODO: 「指引」 - 信息存储
 */
export interface PROMPT_NOTE {
	/**
	 * TODO: 文本描述
	 */
	refer: server.RawMessage;
	/**
	 * TODO: 文本显示的延迟时间
	 */
	delay: number;
};

/**
 * TODO: 计划表模板类所需的方法和属性
 */
export interface PLAN {
	/**
	 * 当前计划表的唯一数字标识符
	 *
	 * 它用于在系统中追踪和识别特定的计划表实例
	 */
	planId: string;
	/**
	 * 实例的时间刻积分
	 *
	 * 这个分数通常用于计算计划表的优先级或者执行顺序
	 */
	timeScore: number;
	/**
	 * 用于在计划表执行后进行一些后处理
	 *
	 * 它接收一个 AFTER_PLAN_DATA 类型的参数, 包含了后处理所需的数据
	 *
	 * @param data - 后处理所需的数据
	 */
	afterPlanEvent(data: AFTER_PLAN_DATA): void;
	/**
	 * 计划表的类名
	 *
	 * 类名用于标识不同的计划表类型, 并在系统中作为区分的依据
	 */
	className: string;
	/**
	 * 计划表重复执行的间隔时间
	 *
	 * 冷却时间定义了计划表可以再次执行之前需要等待的时间
	 */
	cooldown: number;
	/**
	 * 计划表的附加参数
	 *
	 * 附加参数提供了额外的配置选项, 这些选项可以用于自定义计划表的行为
	 */
	annex: ANNEX_ARGS;
};

/**
 * TODO: 计划表 的 前处理回调 数据接口
 */
export interface BEFORE_PLAN_DATA {
	/**
	 * 当前计划表的实例
	 *
	 * 包含了计划表的所有属性和方法, 用于在预处理过程中访问和修改
	 */
	plan: PLAN,
	/**
	 * 移除当前计划表实例的回调函数
	 *
	 * 调用此函数将从系统中移除当前计划表实例
	 */
	remove: () => void,
	/**
	 * 停止当前计划表实例的回调函数
	 *
	 * 调用此函数将停止当前计划表实例的执行, 但可能不会从系统中移除
	 */
	cease: () => void
};

/**
 * TODO: 计划表 的 后处理回调 数据接口
 */
export interface AFTER_PLAN_DATA {
	/**
	 * 当前计划表的实例
	 *
	 * 包含了计划表的所有属性和方法, 用于在后处理过程中访问和修改
	 */
	plan: PLAN,
	/**
	 * 移除当前计划表实例的回调函数
	 *
	 * 调用此函数将从系统中移除当前计划表实例
	 */
	remove: () => void,
};

/**
 * TODO: 符文附着于实体 的 数据接口
 */
export interface RUNE_CLING_ENTITY {
	/**
	 * TODO: 实体的唯一标识符
	 */
	id: string;
	/**
	 * TODO: 元素符文的剩余附着时间
	 */
	wait: number;
};

/**
 * TODO: 控制事件触发器 的 数据接口
 */
export interface CONTROL_EVENT_TRIGGER {
	/**
	 * TODO: 触发器的唯一标识
	 */
	id: string;
	/**
	 * TODO: 触发器的类型
	 */
	type: string;
	/**
	 * TODO: 触发器触发前的等待时间
	 */
	wait: number;
};

/**
 * TODO: 计划表附加参数 - 杂项
 */
export interface ANNEX_ARGS {
	/**
	 * TODO: 目标方块
	 */
	block?: server.Block;
	/**
	 * TODO: 索引
	 */
	index?: number;
	/**
	 * TODO: 其他参数
	 */
	other?: { [key: string]: any }
};

/**
 * TODO: 计划表附加参数 - 战斗
 */
export interface ANNEX_ARGS {
	/**
	 * TODO: 是否暴击
	 */
	erupt?: boolean;
	/**
	 * TODO: 目标实体
	 */
	target?: server.Entity | server.Player;
	/**
	 * TODO: 源头实体
	 */
	self?: server.Entity | server.Player;
	/**
	 * TODO: 战斗属性数据
	 */
	hurtData?: GET_PROPERTY_PANEL;
	/**
	 * TODO: 伤害类型
	 */
	hurtType?: `${server.EntityDamageCause}`;
};

/**
 * TODO: 计划表附加参数 - 路径
 */
export interface ANNEX_ARGS {
	/**
	 * TODO: 维度组
	 */
	dimensions?: server.Dimension[];
	/**
	 * TODO: 位置组
	 */
	locations?: server.Vector3[];
	/**
	 * TODO: 射击
	 */
	shoot?: {
		/**
		 * TODO: 射击起始位置
		 */
		start_place: server.Vector3,
		/**
		 * TODO: 射击方向
		 */
		toward: server.Vector3,
		/**
		 * TODO: 射击距离
		 */
		max_distance: number,
	};
};

/**
 * TODO: 路径执行计划表 的 输入参数
 */
export interface ROUTE_ARGS {
	/**
	 * TODO: 坐标组
	 *
	 * @description 如果与< shoot >同时定义, 则 本参数失效
	 */
	locations: server.Vector3[];
	/**
	 * TODO: 运行维度
	 */
	dimension: server.Dimension;
	/**
	 * TODO: 在运行时 执行的代码
	 */
	on_move?: ROUTE_MOVE_CODE;
	/**
	 * TODO: 在结束时 执行的代码
	 */
	on_done?: ROUTE_CLOSE_CODE;
	/**
	 * TODO: 带有参数设定 的 粒子效果
	 */
	particleMolang?: [string, server.MolangVariableMap];
	/**
	 * TODO: 粒子效果
	 */
	particles?: string[];
	/**
	 * TODO: 冷却时间
	 */
	cooldown: number;
	/**
	 * TODO: 运行速度
	 */
	speed: number;
	/**
	 * TODO: 坐标偏移
	 */
	offset?: server.Vector3;
	/**
	 * TODO: 射击
	 *
	 * @description 如果与< locations >同时定义, 参数< locations >失效
	 */
	shoot?: {
		/**
		 * TODO: 射击起始位置
		 */
		start_place: server.Vector3;
		/**
		 * TODO: 射击方向
		 */
		toward: server.Vector3;
		/**
		 * TODO: 射击距离
		 */
		max_distance: number;
	};
};

/**
 * TODO: 路径执行计划表 运行时 的 回调函数
 *
 * @returns {boolean} 容器是否继续运行
 */
export interface ROUTE_MOVE_CODE { (data: ROUTE_ANNEX_ARGS): boolean; };

/**
 * TODO: 路径执行计划表 关闭时 的 回调函数
 */
export interface ROUTE_CLOSE_CODE { (data: ROUTE_ANNEX_ARGS): void; };

/**
 * TODO: 向量偏移接口
 */
export interface VECTOR_RELATIVE_OFFSET {
	/**
	 * TODO: 前方 偏移量
	 */
	front: number;
	/**
	 * TODO: 右方 偏移量
	 */
	right: number;
	/**
	 * TODO: 上方 偏移量
	 */
	above: number;
};

/**
 * TODO: 矢量 字符串化 参数
 */
export interface VECTOR_STRING_OPTIONS {
	/**
	 * TODO: 指定要保留的小数位数, 默认为[ 2 ]
	 */
	decimals?: number;
	/**
	 * TODO: 指定分隔符, 默认为[ , ]
	 */
	delimiter?: string
};

/**
 * TODO: 向量方向接口
 */
export interface VECTOR_DIRECTIONS {
	/**
	 * TODO: 右方 向量
	 */
	right: server.Vector3;
	/**
	 * TODO: 后方 向量
	 */
	back: server.Vector3;
	/**
	 * TODO: 左方 向量
	 */
	left: server.Vector3;
	/**
	 * TODO: 前方 向量
	 */
	front: server.Vector3;
	/**
	 * TODO: 上方 向量
	 */
	above: server.Vector3;
	/**
	 * TODO: 下方 向量
	 */
	down: server.Vector3
};

/**
 * TODO: 矢量限制
 */
export interface VECTOR_LIMITS {
	/**
	 * TODO: 最小值
	 */
	min?: Partial<server.Vector3>;
	/**
	 * TODO: 最大值
	 */
	max?: Partial<server.Vector3>;
};

/**
 * TODO: 数组 特征信息 对象
 */
export interface VERTEX {
	/**
	 * TODO: 获取数组的最大值
	 */
	max: number;
	/**
	 * TODO: 获取数组的最小值
	 */
	min: number;
	/**
	 * TODO: 获取数组的平均值
	 */
	average?: number;
	/**
	 * TODO: 获取数组的中位值
	 */
	median?: number;
	/**
	 * TODO: 获取数组的众数
	 */
	mode?: number[];
};

/**
 * TODO: 定义JSON值类型, 可以是字符串, 布尔值, 数字, JSON对象, JSON数组
 */
export type JSON_VALUE = string | boolean | number | JSON_OBJECT | JSON_ARRAY;
/**
 * TODO: 定义JSON对象, 键值对的值可以是JSON值类型
 */
export interface JSON_OBJECT { [key: string]: JSON_VALUE };
/**
 * TODO: 定义JSON数组, 数组中的元素可以是JSON值类型
 */
export interface JSON_ARRAY extends Array<JSON_VALUE> { };
/**
 * TODO: 定义游戏对象类型, 可以是实体, 方块, 玩家, 维度或物品堆
 */
export type GAME_OBJECT = server.Entity | server.Block | server.Player | server.Dimension | server.ItemStack | server.Container | server.RawMessage;
/**
 * TODO: 定义传输数据类型, 可以是JSON值, 服务器实体, 方块, 玩家, 维度, 物品堆或它们的数组
 */
export type TRANSFER_DATA = TRANSFER_DATA[] | JSON_VALUE | GAME_OBJECT | undefined | void;
/**
 * TODO: 定义一个导出函数类型, 它可以接受一个或多个TransmissionDataType类型的参数, 并返回一个TransmissionDataType类型的值
 */
export type TRANSFER_FUNCTION = (...para: (TRANSFER_DATA)[]) => TRANSFER_DATA;
/**
 * TODO: 定义批量导出函数时所使用的数据格式
 */
export interface EXPORT_FUNCTION { [key: string]: TRANSFER_FUNCTION | Record<string, any> };

/**
 * TODO: 权重信息接口, 用于处理字符串类型的权重解析结果。
 */
export interface WEIGHT_STRING_INTEL {
	/**
	 * TODO: 解析后展开的信息数组, 包含原始字符串数据。
	 */
	source: string[];
	/**
	 * TODO: 解析后返回的索引, 表示在 `source` 数组中的位置。
	 */
	index: number;
	/**
	 * TODO: 解析后返回的值, 表示最终处理结果的字符串。
	 */
	output: string;
};

/**
 * TODO: 权重信息接口, 用于处理服务器原始消息类型的权重解析结果。
 */
export interface WEIGHT_MESSAGE_INTEL {
	/**
	 * TODO: 解析后展开的信息数组, 包含原始服务器消息数据。
	 */
	source: server.RawMessage[];
	/**
	 * TODO: 解析后返回的索引, 表示在 `source` 数组中的位置。
	 */
	index: number;
	/**
	 * TODO: 解析后返回的值, 表示最终处理结果的服务器消息。
	 */
	output: server.RawMessage;
}

/**
 * 根据输入类型 K 确定返回的权重信息类型。
 *
 * - 如果 K 是字符串, 则返回 `WEIGHT_STRING_INTEL` 类型。
 * - 如果 K 是 `server.RawMessage` 类型, 则返回 `WEIGHT_MESSAGE_INTEL` 类型。
 * - 否则返回 `never`, 表示不支持的类型。
 */
export type DetermineReturnType<K> = K extends string
	? WEIGHT_STRING_INTEL
	: K extends server.RawMessage
	? WEIGHT_MESSAGE_INTEL
	: never;

/**
 * 对话作用域接口, 定义了对话的基本属性和行为。
 */
export interface DIALOGUE_SCOPE {
	/**
	 * 对话的标签数组, 用于分类和标识对话。
	 */
	tags: string[];
	/**
	 * 对话的消息内容, 使用服务器原始消息格式。
	 */
	message: server.RawMessage;
	/**
	 * 对话的权重, 用于决定对话的优先级或出现概率。
	 */
	weight: number;
	/**
	 * 对话播放时的音效文件路径（可选）。
	 */
	sound?: string;
	/**
	 * 对话的链接信息（可选）, 定义了对话之间的跳转和等待时间。
	 */
	linkage?: {
		/**
		 * 链接的目标对话的唯一标识符。
		 */
		id: string;
		/**
		 * 链接的目标对话的标签。
		 */
		tag: string;
		/**
		 * 对话跳转前的等待时间（以毫秒为单位）。
		 */
		wait: number;
	};
	/**
	 * 对话事件处理函数（可选）, 用于在对话播放时执行自定义操作。
	 *
	 * @param {server.Entity} entity - 实体对象
	 *
	 * @returns - 执行对话事件
	 */
	event?: (entity: server.Entity) => void;
}

/**
 * TODO: 『 百科 』 - 领域属性 - 后处理函数
 */
export interface INTENTION_REALM_AFTER {
	/**
	 * TODO: 领域属性 状态值
	 */
	state: (string | number | boolean | server.Vector3 | undefined)[];
	/**
	 * TODO: 界面选项
	 */
	option: serverUI.ActionFormResponse;
	/**
	 * TODO: 领域属性 识别名称
	 */
	entry: string[];
};

/**
 * TODO: 待机动作的权重列表
 */
export interface IDLE_ACTION_WEIGHT {
	/**
	 * TODO: 权重, 用于计算随机概率
	 */
	weight: number;
	/**
	 * TODO: 要执行的函数
	 */
	action: Function;
	/**
	 * TODO: 输入参数, 用于传递给函数
	 */
	input: string | null;
};