'use strict';

/**
 * 单字切分模块
 *
 * @author 老雷<leizongmin@gmail.com>
 */

var debug = console.log;

export const type = 'tokenizer';

/**
 * 模块初始化
 *
 * @param {Segment} segment 分词接口
 */
export function init (segment) {
  exports.segment = segment;
}

/**
 * 对未识别的单词进行分词
 *
 * @param {array} words 单词数组
 * @return {array}
 */
export function split (words) {
  var POSTAG = _segment.POSTAG;
  var ret = [];
  for (var i = 0, word; word = words[i]; i++) {
    if (word.p) {
      ret.push(word);
    } else {
      // 仅对未识别的词进行匹配
      ret = ret.concat(splitSingle(word.w));
    }
  }
  return ret;
}

// =================================================================
/**
 * 单字切分
 *
 * @param {string} text 要切分的文本
 * @param {int} cur 开始位置
 * @return {array}
 */
var splitSingle= function (text, cur) {
  var POSTAG = _segment.POSTAG;
  if (isNaN(cur)) cur = 0;
  var ret = [];
  while (cur < text.length) {
    ret.push({
      w:  text.charAt(cur),
      p:  POSTAG.UNK
    });
    cur++;
  }
  return ret;
};
