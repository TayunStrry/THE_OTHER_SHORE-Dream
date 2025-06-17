// TODO : 导入数据类型
import { ONE_TOKEN, TOKENIZER_MODEL } from "../../intel";
// TODO : 导入数据表
import { wildcardDictionaryTable, wildcardLengthDictionaryTable } from "../../record";
/**
 * 导出: 通配符-分词器模块
 */
export default class Tokenizer implements TOKENIZER_MODEL {
    /**
     * 将输入的词元数组进行分割处理
     *
     * @param tokens 输入的词元数组，每个词元包含 word 和可选的 postag 属性
     *
     * @returns 处理后的词元数组，包含分割后的词元和词性标注
     */
    split(tokens: ONE_TOKEN[]): ONE_TOKEN[] {
        /**
         * 初始化输出数组，用于存储处理后的词元
         */
        const output: ONE_TOKEN[] = [];
        // 遍历输入的词元数组
        for (let index = 0; index < tokens.length; index++) {
            /**
             * 当前词元
             */
            const token = tokens[index];
            // 检查当前词元是否已经有词性标注(postag)
            if (token.postag !== undefined && token.postag > 0) {
                // 如果有词性标注，直接加入输出数组，不做进一步处理
                output.push(token);
                // 跳过当前循环的剩余部分
                continue;
            };
            // TODO : 尝试在当前词元的word中匹配已知的单词
            /**
             * 以下仅对未识别的词（没有postag的词）进行处理
             */
            let wordinfo = this.matchWord(token.word);
            // 如果没有匹配到任何单词
            if (wordinfo.length < 1) {
                // 将原词元直接加入输出数组
                output.push(token);
                // 跳过当前循环的剩余部分
                continue;
            };
            // 记录上一个匹配的结束位置，初始为0（词的开头）
            let lastCharLocation = 0;
            // 遍历:匹配结果数组 - wordinfo
            for (let index1 = 0; index1 < wordinfo.length; index1++) {
                /**
                 * 当前匹配结果对象
                 */
                const treatAfter = wordinfo[index1];
                // 检查当前位置之前是否有未处理的字符. 如果有，将这部分未处理的字符作为新词元加入输出
                if ((treatAfter.location || 0) > lastCharLocation) {
                    // 截取从lastc到当前匹配位置的子串
                    output.push({ word: token.word.slice(lastCharLocation, treatAfter.location) });
                }
                // 将匹配到的单词及其词性（转为小写后查找）添加到输出数组
                output.push({ word: treatAfter.word, postag: wildcardDictionaryTable.get(treatAfter.word.toLowerCase())?.posTag });
                // 更新最后处理的位置：当前匹配位置 + 匹配单词的长度
                lastCharLocation = (treatAfter.location || 0) + treatAfter.word.length;
            };
            // TODO : 处理最后一个匹配项之后可能剩余的字符
            /**
             * 获取最后一个匹配项
             */
            let lastword = wordinfo[wordinfo.length - 1];
            // 检查最后一个匹配项之后是否还有字符
            if ((lastword.location || 0) + lastword.word.length < token.word.length) {
                // 如果有，将剩余部分作为新词元加入输出
                output.push({ word: token.word.slice((lastword.location || 0) + lastword.word.length) });
            }
        }
        // 返回处理后的词元数组
        return output;
    };
    /**
     * 匹配单词，返回相关信息
     *
     * @param {string} text 文本
     *
     * @param {number} startIndex 开始位置
     *
     * @return {ONE_TOKEN[]}  返回词元数组
     */
    matchWord(text: string, startIndex: number = 0): ONE_TOKEN[] {
        /**
         * 进行输出的词元数组
         */
        const output: ONE_TOKEN[] = [];
        /**
         * 将输入文本转为小写
         */
        const lowertext = text.toLowerCase();
        // 匹配可能出现的单词，取长度最大的那个
        while (startIndex < text.length) {
            /**
             * 记录当前找到的最长匹配长度
             */
            let maxLength = 0;
            // 遍历词典表
            wildcardLengthDictionaryTable.forEach(
                (value, key) => {
                    /**
                     * 截取用于测试的词元
                     */
                    const word = lowertext.substring(startIndex, startIndex + key);
                    // 测试词元是否存在于词库中
                    if (value.has(word) && key >= maxLength) {
                        // 向输出中添加词元
                        output.push({ word, location: startIndex });
                        // 更新获取到的最大长度
                        maxLength = key;
                    }
                }
            );
            // 如果词元已经查表成功, 则跳出当前循环
            if (maxLength !== 0) startIndex += maxLength;
            // 否则, 继续尝试下一个长度的词元
            else startIndex++;
        }
        return output;
    };
};