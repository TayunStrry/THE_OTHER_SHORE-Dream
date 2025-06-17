// TODO : 导入数据类型
import { DICTIONARY_TABLE } from "./intel";
/**
 * 基础-词典表
 *
 * @param {string}  type - 词典表单词
 */
export const primaryDictionaryTable = new Map<string, DICTIONARY_TABLE>();
/**
 * 通配符-词典表
 *
 * @param {string}  type - 词典表单词
 */
export const wildcardDictionaryTable = new Map<string, DICTIONARY_TABLE>();
/**
 * 长度-词典表
 *
 * @param {number}  type - 单词长度
 *
 * @param {string}  type - 词典表单词
 */
export const lengthDictionaryTable = new Map<number, Map<string, DICTIONARY_TABLE>>();
/**
 * 通配符长度-词典表
 *
 * @param {number}  type - 单词长度
 *
 * @param {string}  type - 词典表单词
 */
export const wildcardLengthDictionaryTable = new Map<number, Map<string, DICTIONARY_TABLE>>();
/**
 * 同义词-词典表
 */
export const synonymDictionaryTable = new Map<string, string>();
/**
 * 停用词-词典表
 */
export const stopwordDictionaryTable = new Set<string>();