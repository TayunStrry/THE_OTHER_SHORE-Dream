// TODO : 导入数据类型
import { ONE_TOKEN, TOKENIZER_MODEL, PosTagTable } from "../../intel";
// TODO : 导入数据表
import { wildcardDictionaryTable, wildcardLengthDictionaryTable } from "../../record";
/**
 * 常见的协议URL头集合
 */
const protocolHeaders = new Set(['http://', 'https://', 'ftp://', 'news://', 'telnet://']);
/**
 * 协议头的最小长度值
 */
let minHeaderLength = 100;
// 遍历协议头集合，找到最短的协议头长度
protocolHeaders.forEach(header => { if (header.length < minHeaderLength) minHeaderLength = header.length; });
/**
 * URL 中允许出现的字符列表
 */
const allowedUrlChars = new Set(
    [
        'a', 'b', 'c', 'd', 'e',
        'f', 'g', 'h', 'i', 'j',
        'k', 'l', 'm', 'n', 'o',
        'p', 'q', 'r', 's', 't',
        'u', 'v', 'w', 'x', 'y',
        'z', 'A', 'B', 'C', 'D',
        'E', 'F', 'G', 'H', 'I',
        'J', 'K', 'L', 'M', 'N',
        'O', 'P', 'Q', 'R', 'S',
        'T', 'U', 'V', 'W', 'X',
        'Y', 'Z', '0', '1', '2',
        '3', '4', '5', '6', '7',
        '8', '9', '!', '#', '$',
        '%', '&', '‘', '(', ')',
        '*', '+', ',', '-', '.',
        '/', ':', ';', '=', '?',
        '@', '[', '\\', ']', '^',
        '_', '`', '|', '~'
    ]
);
/**
 * 导出: 通配符-分词器模块
 */
export default class Tokenizer implements TOKENIZER_MODEL {
    split(tokens: ONE_TOKEN[]) {
        /**
         * 初始化输出数组，用于存储处理后的词元
         */
        const output: ONE_TOKEN[] = [];
        for (let index = 0; index < tokens.length; index++) {
            /**
             * 当前词元
             */
            const token = tokens[index];
            // 检查当前词元是否已经有词性标注(postag)
            if (token.postag !== undefined && token.postag > 0) {
                output.push(token);
                continue;
            }
            // 仅对未识别的词进行匹配
            var urlinfo = matchURL(word.w);
            if (urlinfo.length < 1) {
                ret.push(word);
                continue;
            }
            // 分离出URL
            var lastc = 0;
            for (var ui = 0, url; url = urlinfo[ui]; ui++) {
                if (url.c > lastc) {
                    ret.push({ w: word.w.substr(lastc, url.c - lastc) });
                }
                ret.push({ w: url.w, p: POSTAG.URL });
                lastc = url.c + url.w.length;
            }
            var lasturl = urlinfo[urlinfo.length - 1];
            if (lasturl.c + lasturl.w.length < word.w.length) {
                ret.push({ w: word.w.substr(lasturl.c + lasturl.w.length) });
            }
        }
        // debug(ret);
        return ret;
    }
    /**
     * 匹配单词，返回相关信息
     *
     * @param {string} text 文本
     *
     * @param {number} startIndex 开始位置
     *
     * @return {ONE_TOKEN[]}  返回词元数组
     */
    matchURL(text: string, startIndex: number = 0): ONE_TOKEN[] {
        /**
         * 进行输出的词元数组
         */
        const output: ONE_TOKEN[] = [];
        /**
         * 将输入文本转为小写
         */
        const lowertext = text.toLowerCase();
        /**
         * 链接起始索引
         */
        let urlStartIndex = 0;
        // 遍历文本
        while (startIndex < lowertext.length) {
            // 判断是否为 http:// 之类的协议开头
            if (urlStartIndex === 0 && startIndex < lowertext.length - minHeaderLength) {
                // 遍历协议头信息
                [...protocolHeaders].some(
                    protocol => {
                        // 判断是否包含协议头
                        if (lowertext.substring(startIndex, startIndex + protocol.length) === protocol) {
                            // 设定协议头起始索引位置
                            urlStartIndex = startIndex;
                            // 跳过协议头
                            startIndex += protocol.length - 1;
                            // 跳过协议头后面的字符
                            return true;
                        }
                        return false;
                    }
                );
            }
            else if (urlStartIndex !== 0 && !(allowedUrlChars.has(lowertext.charAt(startIndex)))) {
                // 如果以协议头开始，遇到非 URL 字符，则结束当前 URL 匹配
                output.push(
                    {
                        word: lowertext.substring(urlStartIndex, startIndex - urlStartIndex),
                        location: urlStartIndex
                    }
                );
                urlStartIndex = 0;
            }
            startIndex++;
        }
        return output;
    }
}
