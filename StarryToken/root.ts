// TODO : 导入数据类型
import { ONE_TOKEN, PARSER_PARAMETERS, TOKENIZER_MODEL, OPTIMIZE_MODEL, PosTagTable } from "./intel";
// TODO : 导入数据表
import { primaryDictionaryTable, wildcardDictionaryTable, synonymDictionaryTable, stopwordDictionaryTable, lengthDictionaryTable, wildcardLengthDictionaryTable } from "./record";
// TODO : 导出模块函数
export { openAnalysis, toString, split, indexOf };
/**
 * 开始分词
 *
 * @param {string} text - 待分词的文本
 *
 * @param {PARSER_PARAMETERS|undefined} options - 分词器参数
 *
 * @return {ONE_TOKEN[]} - 分词结果
 */
function openAnalysis(text: string, options: PARSER_PARAMETERS | undefined): ONE_TOKEN[] {
    /**
     * 分词后的输出结果
     */
    let output: ONE_TOKEN[] = [];
    /**
     * 置换同义词
     *
     * @param {ONE_TOKEN[]} token - 待置换的分词结果
     *
     * @returns {{ count: number, token: ONE_TOKEN[] }} - 置换后的分词结果
     */
    function convertSynonym(token: ONE_TOKEN[]): { count: number, tokens: ONE_TOKEN[] } {
        /**
         * 词条数量
         */
        let count = 0;
        /**
         * 更新词条列表
         */
        const output: ONE_TOKEN[] = token.map(
            item => {
                /**
                 * 在词表中查询词条
                 */
                const result = synonymDictionaryTable.get(item.word);
                // 判断词条是否存在
                if (result) {
                    // 使同义词计数加一
                    count++;
                    // 输出同义词信息
                    return { ...item, word: result, postag: item.postag };
                }
                else return item;
            }
        );
        return { count: count, tokens: output };
    }
    // 将文本按照换行符分割成多段，并逐一分词
    text.replace(/\r/g, '\n').split(/(\n|\s)+/).forEach(
        line => {
            /**
             * 剔除待处理文本的空格与制表符并转换为小写，确保大小写不敏感匹配
             */
            const section = line.trim().toLowerCase();
            // 忽略空行
            if (section.length < 1) return;
            /**
             * 运行分词模块
             */
            let results = runTokenizer(section, []);
            // 运行分词优化模块
            results = runOptimizer(results, []);
            // 连接分词结果
            if (results.length > 0) output = output.concat(results);
        }
    );
    // 去除标点符号
    if (options?.stripPunctuation) {
        output = output.filter(token => token.postag !== PosTagTable.D_W.value);
    };
    // 转换同义词
    //    if (options?.convertSynonym) {
    /**
     * 同义词转换反馈结果
     */
    //        let result: { count: number, tokens: ONE_TOKEN[] };
    // 循环执行同义词转换
    //        do {
    //            result = convertSynonym(output);
    //            output = result.tokens;
    //        }
    //        while (result.count > 0);
    //    };
    // 转换同义词
    if (options?.convertSynonym) {
        /**
         * 是否继续转换同义词
         */
        let hasChanges = true;
        // 持续转换直到没有更多同义词替换
        while (hasChanges) {
            /**
             * 同义词转换反馈结果
             */
            const { count, tokens } = convertSynonym(output);
            // 如果有转换结果, 则更新输出结果
            output = tokens;
            // 检查转换结果是否为空
            hasChanges = count > 0;
        }
    };
    // 去除停止符
    if (options?.stripStopword) {
        output = output.filter(token => !stopwordDictionaryTable.has(token.word));
    };
    // 仅返回单词内容
    if (options?.simple) {
        output = output.map(token => { return { word: token.word }; });
    };
    // 返回分词结果
    return output;
};
/**
 * 将单词数组连接成字符串
 *
 * @param {ONE_TOKEN[]} tokens 单词数组
 *
 * @return {string} - 连接后的字符串
 */
function toString(tokens: ReturnType<typeof openAnalysis>): string {
    return tokens.map(token => token.word).join('');
};
/**
 * 根据某个单词或词性来分割单词数组
 *
 * @param {ONE_TOKEN[]} tokens 单词数组，每个元素是一个包含词性和单词信息的对象
 *
 * @param {string | number} separator 用于分割的单词或词性
 *
 * @return {ONE_TOKEN[][]} 分割后的二维数组，包含按分隔符切分的子数组
 */
function split(tokens: ReturnType<typeof openAnalysis>, separator: string | number): ONE_TOKEN[][] {
    /**
     * 用于存储分割后的结果数组
     */
    const result: ONE_TOKEN[][] = [];
    /**
     * 记录上一次分割的位置，用于截取子数组
     */
    let lastSplitIndex = 0;
    /**
     * 当前遍历的索引位置
     */
    let currentIndex = 0;
    /**
     * 判断分隔符是单词还是词性，决定要检查的字段
     *
     * 如果 separator 是字符串，则检查 'word' 字段；否则检查 'postag' 字段
     */
    const fieldToCheck = typeof separator === 'string' ? 'word' : 'postag';
    // 开始遍历单词数组
    while (currentIndex < tokens.length) {
        // 检查当前单词对象的指定字段是否匹配分隔符, 如果未匹配，继续向后遍历
        if (tokens[currentIndex][fieldToCheck] !== separator) currentIndex++;
        // 如果从上次分割位置到当前位置之间有内容（即非空片段），则将其作为一个子数组加入结果
        if (lastSplitIndex < currentIndex) result.push(tokens.slice(lastSplitIndex, currentIndex));
        // 将当前分隔符项单独作为一个子数组加入结果
        result.push(tokens.slice(currentIndex, currentIndex + 1));
        // 移动指针并更新下次分割的起始位置
        currentIndex++;
        // 更新下次分割的起始位置
        lastSplitIndex = currentIndex;
    }
    // 处理末尾未被分割的部分：如果遍历结束后还有剩余内容未加入结果，则在此处补上
    if (lastSplitIndex < tokens.length - 1) result.push(tokens.slice(lastSplitIndex, tokens.length));
    // 返回最终的分割结果
    return result;
};
/**
 * 在单词数组中查找某一个单词或词性所在的位置
 *
 * @param {ONE_TOKEN[]} tokens 单词数组，每个元素是一个包含词性和单词信息的对象
 *
 * @param {string | number} target 要查找的单词（字符串）或词性（数字）
 *
 * @param {number} startIndex 开始查找的起始索引
 *
 * @return {number} 如果未找到目标，返回 -1
 */
function indexOf(tokens: ReturnType<typeof openAnalysis>, target: string | number, startIndex: number): number {
    /**
     * 校正起始索引：如果非数字则默认从 0 开始
     */
    let validStartIndex = isNaN(startIndex) ? 0 : startIndex;
    /**
     * 判断目标是单词还是词性，决定要检查的字段：
     *
     * 如果 target 是字符串，则检查 'word' 字段（单词）；否则检查 'postag' 字段（词性）
     */
    const fieldToCheck = typeof target === 'string' ? 'word' : 'postag';
    // 从起始位置开始遍历单词数组
    while (validStartIndex < tokens.length) {
        // 如果当前项的指定字段匹配目标值，返回当前索引
        if (tokens[validStartIndex][fieldToCheck] === target) return validStartIndex;
        // 继续下一个位置
        validStartIndex++;
    }
    // 遍历结束仍未找到目标，返回 -1
    return -1;
}
/**
 * 对一段文本进行分词
 *
 * @param {string} text - 待分词的文本
 *
 * @param {TOKENIZER_MODEL[]} models - 分词模块数组
 *
 * @return {ONE_TOKEN[]} - 分词结果
 */
function runTokenizer(text: string, models: TOKENIZER_MODEL[]): ONE_TOKEN[] {
    // 检测是否传入了有效的分词模块
    if (models.length < 1) throw Error('未能正确加载有效的< 分词模块 >')
    /**
     * 按顺序分别调用各个分词器模型来进行分词
     *
     * 各个分词器模型仅对没有识别类型的单词进行分词
     */
    let output: ONE_TOKEN[] = [{ word: text }];
    // 运行各个分词器模型
    models.forEach(
        model => {
            output = model.split(output);
        }
    );
    // 返回结果
    return output;
};
/**
 * 对一段文本进行分词优化
 *
 * @param {ONE_TOKEN[]} tokens - 未优化的分词结果数组
 *
 * @param {OPTIMIZE_MODEL[]} models 分词模块数组
 *
 * @return {ONE_TOKEN[]} - 分词结果
 */
function runOptimizer(tokens: ONE_TOKEN[], models: OPTIMIZE_MODEL[]): ONE_TOKEN[] {
    /*
     * 按顺序分别调用各个module来进行分词 ： 各个module仅对没有识别类型的单词进行分词
     */
    models.forEach(model => tokens = model.doOptimize(tokens));
    // 返回结果
    return tokens;
};
/**
 * 计算字符串在UTF-8编码下的大小（单位KB，保留两位小数）
 *
 * @param {string} data 要计算大小的字符串
 *
 * @returns 返回字符串大小的KB值，格式为字符串（如"12.34"）
 */
function getStringSizeInKb(data: string): string {
    /**
     * 字节量
     */
    let bytes = 0;
    // 使用for循环遍历字符串中的每个字符
    for (let i = 0; i < data.length; i++) {
        /**
         * 获取当前字符的Unicode码点（比charCodeAt()更能处理代理对）
         */
        const codePoint = data.codePointAt(i)!;
        // 处理代理对（大于0xFFFF的字符，如emoji）
        if (codePoint > 0xFFFF) {
            i++; // 跳过代理对的第二部分
        }
        // 根据UTF-8编码规则计算字节数
        if (codePoint <= 0x7F) {          // ASCII字符（0-127）
            bytes += 1;                   // UTF-8中占1字节
        }
        else if (codePoint <= 0x7FF) {  // 扩展拉丁文、希腊文等
            bytes += 2;                   // UTF-8中占2字节
        }
        else if (codePoint <= 0xFFFF) { // 基本多文种平面字符（如中文）
            bytes += 3;                   // UTF-8中占3字节
        }
        else {                          // 辅助平面字符（如复杂emoji）
            bytes += 4;                   // UTF-8中占4字节
        }
    }
    // 将字节数转换为KB并保留两位小数
    return (bytes / 1024).toFixed(2);
};
/**
 * 加载指定的词典文件到当前分词器实例中。
 *
 * @param {[string, string, number][]} data - 词库数据数组，每个元素包含词汇、词性标签和频率
 */
function loadDictionary(data: [string, string, number][]) {
    // 输出词典规模
    console.log(`正在载入词典 - 规模: ${getStringSizeInKb(JSON.stringify(data))}KB`);
    // 遍历词库数据
    data.forEach(
        parts => {
            // 忽略无效数据（字段数量不正确）
            if (parts.length !== 3) return console.error('字段数量不正确: ' + parts);
            /**
             * 提取并去除两端空白字符的词汇
             */
            const word = parts[0].trim().toLowerCase();
            /**
             * 将第二个字段转为数字，表示词性标签
             */
            const posTag = Number(parts[1]);
            /**
             * 将第三个字段表示词频
             */
            const frequency = parts[2];
            // 忽略无效数据（词汇长度不足或词性标签非数字）
            if (word.length < 1 || isNaN(posTag)) return console.error('词汇长度不足或词性标签非数字: ' + parts);
            // 添加至: 基础词典表
            primaryDictionaryTable.set(word, { posTag, frequency });
            // 添加至: 长度词典表
            lengthDictionaryTable.get(word.length)?.set(word, { posTag, frequency });
        }
    );
};
/**
 * 加载指定的通配符词典文件到当前分词器实例中。
 *
 * @param {[string, string, number][]} data - 词库数据数组，每个元素包含词汇、词性标签和频率
 */
function loadWildcardDictionary(data: [string, string, number][]) {
    // 输出词典规模
    console.log(`正在载入词典 - 规模: ${getStringSizeInKb(JSON.stringify(data))}KB`);
    // 遍历词库数据
    data.forEach(
        parts => {
            // 忽略无效数据（字段数量不正确）
            if (parts.length !== 3) return console.error('字段数量不正确: ' + parts);
            /**
             * 提取并去除两端空白字符的词汇
             */
            const word = parts[0].trim().toLowerCase();
            /**
             * 将第二个字段转为数字，表示词性标签
             */
            const posTag = Number(parts[1]);
            /**
             * 将第三个字段表示词频
             */
            const frequency = parts[2];
            // 忽略无效数据（词汇长度不足或词性标签非数字）
            if (word.length < 1 || isNaN(posTag)) return console.error('词汇长度不足或词性标签非数字: ' + parts);
            // 添加至: 通配符词典表
            wildcardDictionaryTable.set(word, { posTag, frequency });
            // 添加至: 通配符长度词典表
            wildcardLengthDictionaryTable.get(word.length)?.set(word, { posTag, frequency });
        }
    );
};
/**
 * 载入同义词词典文件，并将其映射为标准词。
 *
 * @param {[string, string][]} data - 词库数据数组，每个元素包含词汇、词性标签和频率
 */
function loadSynonymDictionary(data: [string, string][]) {
    // 输出词典规模
    console.log(`正在载入词典 - 规模: ${getStringSizeInKb(JSON.stringify(data))}KB`);
    // 遍历词库数据
    data.forEach(
        line => {
            /**
             * 提取并去除两端空白字符的同义词
             */
            const token0 = line[0].trim().toLowerCase();
            /**
             * 提取并去除两端空白字符的标准词
             */
            const token1 = line[1].trim().toLowerCase();
            // 在词典中保存同义词到标准词的映射
            if (token0 !== token1) synonymDictionaryTable.set(token0, token1)
            // 如果标准词本身也被登记为同义词（双向指向），则删除反向条目，保持单向映射
            else synonymDictionaryTable.delete(token0)
        }
    )

};
/**
 * 载入停止词（停用词）词典文件，用于标记哪些词在分词时应被忽略。
 *
 * @param {[string, string][]} data - 词库数据数组，每个元素包含词汇、词性标签和频率
 */
function loadStopwordDictionary(data: string[]) {
    // 输出词典规模
    console.log(`正在载入词典 - 规模: ${getStringSizeInKb(JSON.stringify(data))}KB`);
    // 遍历词库数据
    data.forEach(
        line => {
            /**
             * 剔除待处理文本的空格与制表符
             */
            const token = line.trim().toLowerCase();
            // 跳过空行
            if (token || token.length > 0) stopwordDictionaryTable.add(token);
            // 输出错误信息
            else console.error('无效的停止词: ' + token);
        }
    )
};
//TODO : 初始化词库数据
import('./lexicon/dict').then(data => loadDictionary(data.list));
import('./lexicon/dict2').then(data => loadDictionary(data.list));
import('./lexicon/dict3').then(data => loadDictionary(data.list));
import('./lexicon/names').then(data => loadDictionary(data.list));
import('./lexicon/wildcard').then(data => loadWildcardDictionary(data.list));
import('./lexicon/synonym').then(data => loadSynonymDictionary(data.list));
import('./lexicon/stopword').then(data => loadStopwordDictionary(data.list));
