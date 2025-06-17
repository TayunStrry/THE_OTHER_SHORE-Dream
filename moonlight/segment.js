import { existsSync, readFileSync } from 'fs';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';

/**
 * 单词类型
 */
const POSTAG = {};

POSTAG.D_A = 0x40000000; // 形容词 形语素
POSTAG.D_B = 0x20000000; // 区别词 区别语素
POSTAG.D_C = 0x10000000; // 连词 连语素
POSTAG.D_D = 0x08000000; // 副词 副语素
POSTAG.D_E = 0x04000000; // 叹词 叹语素
POSTAG.D_F = 0x02000000; // 方位词 方位语素
POSTAG.D_I = 0x01000000; // 成语
POSTAG.D_L = 0x00800000; // 习语
POSTAG.A_M = 0x00400000; // 数词 数语素
POSTAG.D_MQ = 0x00200000; // 数量词
POSTAG.D_N = 0x00100000; // 名词 名语素
POSTAG.D_O = 0x00080000; // 拟声词
POSTAG.D_P = 0x00040000; // 介词
POSTAG.A_Q = 0x00020000; // 量词 量语素
POSTAG.D_R = 0x00010000; // 代词 代语素
POSTAG.D_S = 0x00008000; // 处所词
POSTAG.D_T = 0x00004000; // 时间词
POSTAG.D_U = 0x00002000; // 助词 助语素
POSTAG.D_V = 0x00001000; // 动词 动语素
POSTAG.D_W = 0x00000800; // 标点符号
POSTAG.D_X = 0x00000400; // 非语素字
POSTAG.D_Y = 0x00000200; // 语气词 语气语素
POSTAG.D_Z = 0x00000100; // 状态词
POSTAG.A_NR = 0x00000080; // 人名
POSTAG.A_NS = 0x00000040; // 地名
POSTAG.A_NT = 0x00000020; // 机构团体
POSTAG.A_NX = 0x00000010; // 外文字符
POSTAG.A_NZ = 0x00000008; // 其他专名
POSTAG.D_ZH = 0x00000004; // 前接成分
POSTAG.D_K = 0x00000002; // 后接成分
POSTAG.UNK = 0x00000000; // 未知词性
POSTAG.URL = 0x00000001; // 网址、邮箱地址
/**
 * 词性
 */
var _POSTAG = {};
for (var i$1 in POSTAG) _POSTAG[i$1] = POSTAG[i$1];
for (var i$1 in POSTAG) POSTAG[i$1.toLowerCase()] = POSTAG[i$1];


/** 中文说明 */
POSTAG.chsName = function (p) {
	if (isNaN(p)) {
		return CHSNAME[p] || CHSNAME.UNK;
	}
	else {
		var ret = [];
		for (var i in _POSTAG) {
			if ((p & _POSTAG[i]) > 0) {
				ret.push(CHSNAME[i]);
			}
		}
		if (ret.length < 1) {
			return CHSNAME.UNK;
		}
		else {
			return ret.toString();
		}
	}
};

var CHSNAME = POSTAG.CHSNAME = {};
POSTAG.CHSNAME.D_A = '形容词 形语素';
POSTAG.CHSNAME.D_B = '区别词 区别语素';
POSTAG.CHSNAME.D_C = '连词 连语素';
POSTAG.CHSNAME.D_D = '副词 副语素';
POSTAG.CHSNAME.D_E = '叹词 叹语素';
POSTAG.CHSNAME.D_F = '方位词 方位语素';
POSTAG.CHSNAME.D_I = '成语';
POSTAG.CHSNAME.D_L = '习语';
POSTAG.CHSNAME.A_M = '数词 数语素';
POSTAG.CHSNAME.D_MQ = '数量词';
POSTAG.CHSNAME.D_N = '名词 名语素';
POSTAG.CHSNAME.D_O = '拟声词';
POSTAG.CHSNAME.D_P = '介词';
POSTAG.CHSNAME.A_Q = '量词 量语素';
POSTAG.CHSNAME.D_R = '代词 代语素';
POSTAG.CHSNAME.D_S = '处所词';
POSTAG.CHSNAME.D_T = '时间词';
POSTAG.CHSNAME.D_U = '助词 助语素';
POSTAG.CHSNAME.D_V = '动词 动语素';
POSTAG.CHSNAME.D_W = '标点符号';
POSTAG.CHSNAME.D_X = '非语素字';
POSTAG.CHSNAME.D_Y = '语气词 语气语素';
POSTAG.CHSNAME.D_Z = '状态词';
POSTAG.CHSNAME.A_NR = '人名';
POSTAG.CHSNAME.A_NS = '地名';
POSTAG.CHSNAME.A_NT = '机构团体';
POSTAG.CHSNAME.A_NX = '外文字符';
POSTAG.CHSNAME.A_NZ = '其他专名';
POSTAG.CHSNAME.D_ZH = '前接成分';
POSTAG.CHSNAME.D_K = '后接成分';
POSTAG.CHSNAME.UNK = '未知';
POSTAG.CHSNAME.URL = '网址 邮箱地址';

for (var i$1 in CHSNAME) {
	CHSNAME[i$1.toLowerCase()] = CHSNAME[i$1];
}

/**
 * 分词模块管理器
 *
 * @author 老雷<leizongmin@gmail.com>
 */

/**
 * 分词模块管理器
*
* @param {Segment} 分词接口
*/
class Tokenizer {
	constructor(segment) {
		this.segment = segment;
	}
	/**
	 * 对一段文本进行分词
	 *
	 * @param {string} text 文本
	 * @param {array} modules 分词模块数组
	 * @return {array}
	 */
	split(text, modules) {
		if (modules.length < 1) {
			throw Error('No tokenizer module!');
		}
		else {
			// 按顺序分别调用各个module来进行分词 ： 各个module仅对没有识别类型的单词进行分词
			var ret = [{ w: text }];
			modules.forEach(function (module) {
				ret = module.split(ret);
			});
			return ret;
		}
	}
}

/**
 * 优化模块管理器
 *
 * @author 老雷<leizongmin@gmail.com>
 */

/**
 * 优化模块管理器
 *
 * @param {Segment} 分词接口
 */
class Optimizer {
	constructor(segment) {
		this.segment = segment;
	}
	/**
	 * 对一段文本进行分词
	 *
	 * @param {array} words 单词数组
	 * @param {array} modules 分词模块数组
	 * @return {array}
	 */
	doOptimize(words, modules) {
		// 按顺序分别调用各个module来进行分词 ： 各个module仅对没有识别类型的单词进行分词
		modules.forEach(function (module) {
			words = module.doOptimize(words);
		});
		return words;
	}
}

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

/**
 * 创建分词器接口
*/
class Segment {
	constructor() {
		this.POSTAG = POSTAG; // 词性
		this.DICT = {}; // 词典表
		this.modules = {
			tokenizer: [], // 分词模块
			optimizer: [] // 优化模块
		};
		this.tokenizer = new Tokenizer(this);
		this.optimizer = new Optimizer(this);
	}
	/**
	 * 载入分词模块
	 *
	 * @param {String|Array|Object} module 模块名称(数组)或模块对象
	 * @return {Promise<Segment>}
	 */
	async use(module) {
		var me = this;

		if (Array.isArray(module)) {
			module.forEach(
				function (module) {
					me.use(module[i]);
				}
			);
		}
		else {
			if (typeof module == 'string') {
				var filename = path.resolve(__dirname, 'module', module + '.js');
				if (!existsSync(filename)) {
					throw Error('Cannot find module "' + module + '".');
				}
				else {
					module = await import(filename);
				}
			}
			// 初始化并注册模块
			module.init(this);
			this.modules[module.type].push(module);
		}
		return this;
	}
	_resolveDictFilename(name) {
		var filename = path.resolve(name);
		if (!existsSync(filename)) {
			var filename = path.resolve(__dirname, './dicts', name);
			if (!existsSync(filename)) {
				throw Error('Cannot find dict file "' + filename + '".');
			}
		}
		return filename;
	}
	/**
	 * 加载指定的词典文件到当前分词器实例中。
	 *
	 * @param {String} name - 字典文件名（不包含路径）
	 * @param {String} type - 词典类型，默认为 'TABLE'
	 * @param {Boolean} convert_to_lower - 是否将词典中的单词转换为小写形式
	 * @returns {Segment} 返回当前 Segment 实例以支持链式调用
	 */
	loadDict(name, type, convert_to_lower) {
		// 解析字典文件的实际路径
		const filename = this._resolveDictFilename(name);

		// 如果未提供 type，则默认设置为 'TABLE'
		let dictionaryType = type || 'TABLE';

		// 如果主词典表尚未初始化，则创建一个新的空对象
		if (!this.DICT[dictionaryType]) {
			this.DICT[dictionaryType] = {};
		}

		// 辅助词典类型为原类型 + '2'，用于按词长分类存储词汇
		const secondaryDictionaryType = dictionaryType + '2';

		// 如果辅助词典表尚未初始化，则创建一个新的空对象
		if (!this.DICT[secondaryDictionaryType]) {
			this.DICT[secondaryDictionaryType] = {};
		}

		// 主词典引用：用于存储词汇及其属性 {'词' => {频率: f, 词性: p}}
		const primaryDictionary = this.DICT[dictionaryType];

		// 辅助词典引用：用于按长度分类存储词汇 {'长度' => {'词' => {频率: f, 词性: p}}}
		const secondaryDictionary = this.DICT[secondaryDictionaryType];

		// 获取词性标注模块（可能用于后续处理）
		this.POSTAG;

		// 读取文件内容为 UTF-8 编码的字符串
		let fileContent = readFileSync(filename, 'utf8');

		// 如果需要，将整个文件内容转换为小写，确保大小写不敏感匹配
		if (convert_to_lower) {
			fileContent = fileContent.toLowerCase();
		}

		// 按行分割文件内容（兼容 Windows 和 Unix 换行符）
		fileContent.split(/\r?\n/).forEach(line => {
			// 每一行按 '|' 分割成多个字段，格式应为 "word|pos|freq"
			const parts = line.split('|');

			// 确保至少有三个字段（词、词性、频率），避免非法数据
			if (parts.length >= 3) {
				// 提取并去除两端空白字符的词汇
				const word = parts[0].trim();

				// 将第二个字段转为数字，表示词性标签
				const posTag = Number(parts[1]);

				// 将第三个字段转为数字，表示词频
				const frequency = Number(parts[2]);

				// 只处理非空词汇，防止空键导致的问题
				if (word.length > 0) {
					// 在主词典中保存该词及其属性
					primaryDictionary[word] = { f: frequency, p: posTag };

					// 如果当前词长对应的子词典不存在，则先创建
					if (!secondaryDictionary[word.length]) {
						secondaryDictionary[word.length] = {};
					}

					// 在子词典中保存该词及其属性
					secondaryDictionary[word.length][word] = primaryDictionary[word];
				}
			}
		});

		// 返回当前实例，支持链式调用
		return this;
	}
	/**
	 * 取词典表
	 *
	 * @param {String} type 类型
	 * @return {object}
	 */
	getDict(type) {
		return this.DICT[type];
	}
	/**
	 * 载入同义词词典文件，并将其映射为标准词。
	 *
	 * @param {String} name - 字典文件名（不包含路径）
	 * @returns {Segment} 返回当前 Segment 实例以支持链式调用
	 */
	loadSynonymDict(name) {
		// 解析字典文件的实际路径
		var filename = this._resolveDictFilename(name);

		// 设置词典类型为 'SYNONYM'，用于标识这是同义词词典
		var type = 'SYNONYM';

		// 如果同义词词典 TABLE[type] 尚未初始化，则创建一个新的空对象
		if (!this.DICT[type]) this.DICT[type] = {};

		// 引用该类型的词典表，用于存储同义词到标准词的映射关系
		var TABLE = this.DICT[type]; // 词典表：'同义词' => '标准词'

		// 读取文件内容为 UTF-8 编码的字符串
		var data = readFileSync(filename, 'utf8');

		// 按行分割文件内容（兼容 Windows 和 Unix 换行符）
		data.split(/\r?\n/).forEach(function (line) {

			// 每一行按 ',' 分割成多个字段，格式应为 "同义词,标准词"
			var blocks = line.split(',');

			// 确保至少有两个字段（同义词、标准词），避免非法数据
			if (blocks.length > 1) {

				// 提取并去除两端空白字符的同义词
				var n1 = blocks[0].trim();

				// 提取并去除两端空白字符的标准词
				var n2 = blocks[1].trim();

				// 在词典中保存同义词到标准词的映射
				TABLE[n1] = n2;

				// 如果标准词本身也被登记为同义词（双向指向），则删除反向条目，保持单向映射
				if (TABLE[n2] === n1) {
					delete TABLE[n2];
				}
			}
		});

		// 返回当前实例，支持链式调用
		return this;
	}
	/**
	 * 载入停止词（停用词）词典文件，用于标记哪些词在分词时应被忽略。
	 *
	 * @param {String} name - 字典文件名（不包含路径）
	 * @returns {Segment} 返回当前 Segment 实例以支持链式调用
	 */
	loadStopwordDict(name) {
		// 解析字典文件的实际路径
		var filename = this._resolveDictFilename(name);

		// 设置词典类型为 'STOPWORD'，表示这是停用词词典
		var type = 'STOPWORD';

		// 如果停用词词典 TABLE[type] 尚未初始化，则创建一个新的空对象
		if (!this.DICT[type]) this.DICT[type] = {};

		// 引用该类型的词典表，用于存储停用词集合
		var TABLE = this.DICT[type]; // 词典表：'停用词' => true

		// 读取文件内容为 UTF-8 编码的字符串
		var data = readFileSync(filename, 'utf8');

		// 按行分割文件内容（兼容 Windows 和 Unix 换行符）
		data.split(/\r?\n/).forEach(function (line) {

			// 去除当前行两端的空白字符（包括换行符等）
			line = line.trim();

			// 如果去除空白后仍为非空字符串，则将其加入停用词表
			if (line) {
				TABLE[line] = true;
			}
		});

		// 返回当前实例，支持链式调用
		return this;
	}
	/**
	 * 使用默认的识别模块和字典文件
	 *
	 * @return {Segment}
	 */
	useDefault() {
		// 识别模块
		// 强制分割类单词识别
		this.use('URLTokenizer'); // URL识别
		this.use('WildcardTokenizer'); // 通配符，必须在标点符号识别之前
		this.use('PunctuationTokenizer'); // 标点符号识别
		this.use('ForeignTokenizer'); // 外文字符、数字识别，必须在标点符号识别之后

		// 中文单词识别
		this.use('DictTokenizer'); // 词典识别
		this.use('ChsNameTokenizer'); // 人名识别，建议在词典识别之后


		// 优化模块
		this.use('EmailOptimizer'); // 邮箱地址识别
		this.use('ChsNameOptimizer'); // 人名识别优化
		this.use('DictOptimizer'); // 词典识别优化
		this.use('DatetimeOptimizer'); // 日期时间识别优化


		// 字典文件
		this
			.loadDict('dict.txt') // 盘古词典
			.loadDict('dict2.txt') // 扩展词典（用于调整原盘古词典）
			.loadDict('dict3.txt') // 扩展词典（用于调整原盘古词典）
			.loadDict('names.txt') // 常见名词、人名
			.loadDict('wildcard.txt', 'WILDCARD', true) // 通配符
			.loadSynonymDict('synonym.txt') // 同义词
			.loadStopwordDict('stopword.txt') // 停止符
			;
		return this;
	}
	/**
	 * 开始分词
	 *
	 * @param {String} text 文本
	 * @param {Object} options 选项
	 *   - {Boolean} simple 是否仅返回单词内容
	 *   - {Boolean} stripPunctuation 去除标点符号
	 *   - {Boolean} convertSynonym 转换同义词
	 *   - {Boolean} stripStopword 去除停止符
	 * @return {Array}
	 */
	doSegment(text, options) {
		var me = this;
		options = options || {};
		var ret = [];

		// 将文本按照换行符分割成多段，并逐一分词
		text.replace(/\r/g, '\n').split(/(\n|\s)+/).forEach(function (section) {
			var section = section.trim();
			if (section.length < 1) return;
			// ======================================
			// 分词
			var sret = me.tokenizer.split(section, me.modules.tokenizer);

			// 优化
			sret = me.optimizer.doOptimize(sret, me.modules.optimizer);

			// ======================================
			// 连接分词结果
			if (sret.length > 0) ret = ret.concat(sret);
		});

		// 去除标点符号
		if (options.stripPunctuation) {
			ret = ret.filter(function (item) {
				return item.p !== POSTAG.D_W;
			});
		}

		// 转换同义词
		function convertSynonym(list) {
			var count = 0;
			var TABLE = me.getDict('SYNONYM');
			list = list.map(
				function (item) {
					if (item.w in TABLE) {
						count++;
						return { w: TABLE[item.w], p: item.p };
					}
					else {
						return item;
					}
				}
			);
			return { count: count, list: list };
		}
		if (options.convertSynonym) {
			do {
				var result = convertSynonym(ret);
				ret = result.list;
			} while (result.count > 0);
		}

		// 去除停止符
		if (options.stripStopword) {
			var STOPWORD = me.getDict('STOPWORD');
			ret = ret.filter(function (item) {
				return !(item.w in STOPWORD);
			});
		}

		// 仅返回单词内容
		if (options.simple) {
			ret = ret.map(function (item) {
				return item.w;
			});
		}

		return ret;
	}
	/**
	 * 将单词数组连接成字符串
	 *
	 * @param {Array} words 单词数组
	 * @return {String}
	 */
	toString(words) {
		return words.map(function (item) {
			return item.w;
		}).join('');
	}
	/**
	 * 根据某个单词或词性来分割单词数组
	 *
	 * @param {Array} words 单词数组
	 * @param {Number|String} s 用于分割的单词或词性
	 * @return {Array}
	 */
	split(words, s) {
		var ret = [];
		var lasti = 0;
		var i = 0;
		var f = typeof s === 'string' ? 'w' : 'p';

		while (i < words.length) {
			if (words[i][f] == s) {
				if (lasti < i) ret.push(words.slice(lasti, i));
				ret.push(words.slice(i, i + 1));
				i++;
				lasti = i;
			} else {
				i++;
			}
		}
		if (lasti < words.length - 1) {
			ret.push(words.slice(lasti, words.length));
		}

		return ret;
	}
	/**
	 * 在单词数组中查找某一个单词或词性所在的位置
	 *
	 * @param {Array} words 单词数组
	 * @param {Number|String} s 要查找的单词或词性
	 * @param {Number} cur 开始位置
	 * @return {Number} 找不到，返回-1
	 */
	indexOf(words, s, cur) {
		cur = isNaN(cur) ? 0 : cur;
		var f = typeof s === 'string' ? 'w' : 'p';

		while (cur < words.length) {
			if (words[cur][f] == s) return cur;
			cur++;
		}

		return -1;
	}
}

export { Segment as default };
