/**
 * 单词结构
 */
export interface ONE_TOKEN {
    /**
     * TODO: 单词
     */
    word: string;
    /**
     * TODO: 词性
     */
    postag?: number;
    /**
     * TODO: 链接(?)
     */
    url?: string;
    /**
     * TODO: 上下文(?)
     */
    context?: any[];
    /**
     * TODO: 位置
     */
    location?: number;
    /**
     * TODO: 词频
     */
    frequency?: number;
};
/**
 * 词典表
 */
export interface DICTIONARY_TABLE {
    /**
     * TODO: 词性标签值
     */
    posTag: number;
    /**
     * TODO: 词频
     */
    frequency: number;
};
/**
 * 分词器解析模式参数
 */
export interface PARSER_PARAMETERS {
    /**
     * 是否仅返回单词内容
     */
    simple?: boolean;
    /**
     * 是否去除标点符号
     */
    stripPunctuation?: boolean;
    /**
     * 是否转换同义词
     */
    convertSynonym?: boolean;
    /**
     * 是否去除停止符
     */
    stripStopword?: boolean;
};
/**
 * 分词器模块-通用接口
 */
export interface TOKENIZER_MODEL {
    /**
     * 对未识别的单词进行分词
     *
     * @param {ONE_TOKEN[]} tokens 单词数组
     *
     * @return {ONE_TOKEN[]} - 分词结果
     */
    split(tokens: ONE_TOKEN[]): ONE_TOKEN[];
};
/**
 * 分词优化模块-通用接口
 */
export interface OPTIMIZE_MODEL {
    /**
     * 对未识别的单词进行分词优化
     *
     * @param {ONE_TOKEN[]} tokens 单词数组
     *
     * @return {ONE_TOKEN[]} - 分词结果
     */
    doOptimize(tokens: ONE_TOKEN[]): ONE_TOKEN[];
};
/**
 * 词性枚举（Part-Of-Speech Tag）
 *
 * 该对象定义了各种中文词语的词性标记（Part-Of-Speech Tag，简称POSTAG）。
 *
 * 每个标记都有一个对应的十六进制值，用于表示不同的词性和语素类型。
 *
 * 该对象定义了各种词性标记对应的中文名称，
 *
 * 支持通过大写或小写形式访问相同的值。
 */
export class PosTagTable {
    /** 禁止创建实例 */
    protected constructor() { };
    /** 形容词-形语素 */
    static get D_A() {
        return { value: 0x40000000, description: '形容词-形语素' };
    };
    /** 区别词-区别语素 */
    static get D_B() {
        return { value: 0x20000000, description: '区别词-区别语素' };
    };
    /** 连词-连语素 */
    static get D_C() {
        return { value: 0x10000000, description: '连词-连语素' };
    };
    /** 副词-副语素 */
    static get D_D() {
        return { value: 0x08000000, description: '副词-副语素' };
    };
    /** 介词-介语素 */
    static get D_E() {
        return { value: 0x04000000, description: '叹词-叹语素' };
    };
    /** 方位词-方位语素 */
    static get D_F() {
        return { value: 0x02000000, description: '方位词-方位语素' };
    };
    /** 成语 */
    static get D_I() {
        return { value: 0x01000000, description: '成语' };
    };
    /** 习语 */
    static get D_L() {
        return { value: 0x00800000, description: '习语' };
    };
    /** 数词-数语素 */
    static get A_M() {
        return { value: 0x00400000, description: '数词-数语素' };
    };
    /** 数量词 */
    static get D_MQ() {
        return { value: 0x00200000, description: '数量词' };
    };
    /** 名词-名语素 */
    static get D_N() {
        return { value: 0x00100000, description: '名词-名语素' };
    };
    /** 拟声词 */
    static get D_O() {
        return { value: 0x00080000, description: '拟声词' };
    };
    /** 介词 */
    static get D_P() {
        return { value: 0x00040000, description: '介词' };
    };
    /** 量词-量语素 */
    static get A_Q() {
        return { value: 0x00020000, description: '量词-量语素' };
    };
    /** 代词-代语素 */
    static get D_R() {
        return { value: 0x00010000, description: '代词-代语素' };
    };
    /** 处所词 */
    static get D_S() {
        return { value: 0x00008000, description: '处所词' };
    };
    /** 时间词 */
    static get D_T() {
        return { value: 0x00004000, description: '时间词' };
    };
    /** 助词-助语素 */
    static get D_U() {
        return { value: 0x00002000, description: '助词-助语素' };
    };
    /** 动词-动语素 */
    static get D_V() {
        return { value: 0x00001000, description: '动词-动语素' };
    };
    /** 标点符号 */
    static get D_W() {
        return { value: 0x00000800, description: '标点符号' };
    };
    /** 非语素字 */
    static get D_X() {
        return { value: 0x00000400, description: '非语素字' };
    };
    /** 语气词-语气语素 */
    static get D_Y() {
        return { value: 0x00000200, description: '语气词-语气语素' };
    };
    /** 状态词 */
    static get D_Z() {
        return { value: 0x00000100, description: '状态词' };
    };
    /** 地名 */
    static get A_NS() {
        return { value: 0x00000040, description: '地名' };
    };
    /** 机构团体 */
    static get A_NT() {
        return { value: 0x00000020, description: '机构团体' };
    };
    /** 人名 */
    static get A_NR() {
        return { value: 0x00000080, description: '人名' };
    };
    /** 外文字符 */
    static get A_NX() {
        return { value: 0x00000010, description: '外文字符' };
    };
    /** 其他专名 */
    static get A_NZ() {
        return { value: 0x00000008, description: '其他专名' };
    };
    /** 前接成分 */
    static get D_ZH() {
        return { value: 0x00000004, description: '前接成分' };
    };
    /** 后接成分 */
    static get D_K() {
        return { value: 0x00000002, description: '后接成分' };
    };
    /** 未知-占位符 */
    static get UNK() {
        return { value: 0x00000000, description: '未知-占位符' };
    };
    /** 网址-邮箱地址 */
    static get URL() {
        return { value: 0x00000001, description: '网址-邮箱地址' };
    };
    /**
     * 根据词性标记获取对应的描述信息
     * @param tag 词性标记
     * @returns 对应的描述信息
     */
    static getDescription(tag: string): string | undefined {
        const key = tag.toUpperCase();
        const property = this[key] as typeof this.UNK | undefined;
        if (property) return property.description;
        return undefined;
    }
    /**
     * 根据词性标记获取对应的值
     * @param tag 词性标记
     * @returns 对应的值
     */
    static getValue(tag: string): number | undefined {
        const key = tag.toUpperCase();
        if (key in this) return this[key]?.value;
        return undefined;
    }
    /**
     * 根据给定的值获取对应的词性标记
     * @param value 词性标记的值
     * @returns 对应的词性标记
     */
    static getTagByValue(value: number): string | undefined {
        const tags = this.getAllTags();
        for (const tag of tags) if (this[tag].value === value) return tag;
        return undefined;
    }
    /**
     * 获取所有词性标记的列表
     * @returns 所有词性标记的列表
     */
    static getAllTags(): string[] {
        const keys = Object.getOwnPropertyNames(this);
        return keys.filter(
            key => {
                const property = (this as Record<string, any>)[key];
                return typeof property === 'object' && property !== null && 'value' in property;
            }
        ).map(key => key);
    }
    /**
     * 获取所有有效的词性标记的描述信息
     * @returns 所有有效的词性标记的描述信息
     */
    static getAllDescriptions(): Record<string, string> {
        const descriptions: Record<string, string> = {};
        const tags = this.getAllTags();
        for (const tag of tags) {
            descriptions[tag] = this[tag].description;
        }
        return descriptions;
    }
    /**
     * 获取所有有效的词性标记的值
     * @returns 所有有效的词性标记的值
     */
    static getAllValues(): Record<string, number> {
        const values: Record<string, number> = {};
        const tags = this.getAllTags();
        for (const tag of tags) {
            values[tag] = this[tag].value;
        }
        return values;
    }
    /**
     * 获取所有有效的词性标记的详细信息
     * @returns 所有有效的词性标记的详细信息
     */
    static getAllTagDetails(): Record<string, { value: number; description: string }> {
        const details: Record<string, { value: number; description: string }> = {};
        const tags = this.getAllTags();
        for (const tag of tags) {
            const tagValue = (this as Record<string, any>)[tag]?.value;
            const tagDescription = (this as Record<string, any>)[tag]?.description;

            if (tagValue !== undefined && tagDescription !== undefined) {
                details[tag] = {
                    value: tagValue,
                    description: tagDescription,
                };
            }
        }
        return details;
    }
    /**
     * 检查给定的词性标记是否有效
     * @param tag 要检查的词性标记
     * @returns 如果有效返回true，否则返回false
     */
    static isValidTag(tag: string): boolean {
        const key = tag.toUpperCase();
        return key in this;
    }
};