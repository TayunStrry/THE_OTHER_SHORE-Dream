'use strict';

/**
 * 外文字符、数字识别模块
 *
 * @author 老雷<leizongmin@gmail.com>
 */

type POSTAGType = {
    A_M: number;
    A_NX: number;
    UNK: number;
};

export const type = 'tokenizer';

/**
 * 模块初始化
 *
 * @param {Segment} segment 分词接口
 */
export function init(segment: any): void {
    exports.segment = segment;
}

/**
 * 对未识别的单词进行分词
 *
 * @param {array} words 单词数组
 * @return {array}
 */
export function split(words: any[]): any[] {
    const POSTAG: POSTAGType = (exports.segment as any).POSTAG;
    const ret: any[] = [];

    for (const word of words) {
        if (word.p) {
            ret.push(word);
        }
        else {
            // 仅对未识别的词进行匹配
            ret.push(...splitForeign(word.w));
        }
    }
    return ret;
}

/**
 * 匹配包含的英文字符和数字，并分割
 *
 * @param {string} text 文本
 * @param {int} cur 开始位置
 * @return {array}  返回格式   {w: '单词', c: 开始位置}
 */
function splitForeign(text: string, cur: number = 0): any[] {
    const POSTAG: POSTAGType = (exports.segment as any).POSTAG;
    const ret: any[] = [];

    // 取第一个字符的ASCII码
    let lastcur = 0;
    let lasttype = 0;
    let c = text.charCodeAt(0);

    // 全角数字或字母
    if (c >= 65296 && c <= 65370) c -= 65248;

    // 数字  lasttype = POSTAG.A_M
    if (c >= 48 && c <= 57) lasttype = POSTAG.A_M;

    // 字母 lasttype = POSTAG.A_NX
    else if ((c >= 65 && c <= 90) || (c >= 97 && c <= 122)) lasttype = POSTAG.A_NX;
    else lasttype = POSTAG.UNK;

    for (let i = 1; i < text.length; i++) {
        c = text.charCodeAt(i);

        // 全角数字或字母
        if (c >= 65296 && c <= 65370) c -= 65248;

        // 数字  lasttype = POSTAG.A_M
        if (c >= 48 && c <= 57) {
            if (lasttype !== POSTAG.A_M) {
                const nw = { w: text.substr(lastcur, i - lastcur), p: 0 };
                if (lasttype !== POSTAG.UNK) nw.p = lasttype;
                ret.push(nw);
                lastcur = i;
            }
            lasttype = POSTAG.A_M;
        }
        else if ((c >= 65 && c <= 90) || (c >= 97 && c <= 122)) {
            // 字母 lasttype = POSTAG.A_NX
            if (lasttype !== POSTAG.A_NX) {
                const nw = { w: text.substr(lastcur, i - lastcur), p: 0 };
                if (lasttype !== POSTAG.UNK) nw.p = lasttype;
                ret.push(nw);
                lastcur = i;
            }
            lasttype = POSTAG.A_NX;
        }
        else {
            // 其他
            if (lasttype !== POSTAG.UNK) {
                ret.push({
                    w: text.substr(lastcur, i - lastcur),
                    p: [lasttype]
                });
                lastcur = i;
            }
            lasttype = POSTAG.UNK;
        }
    }

    // 剩余部分
    const nw = { w: text.substr(lastcur, text.length - lastcur), p: 0 };
    if (lasttype !== POSTAG.UNK) nw.p = lasttype;
    ret.push(nw);

    return ret;
}