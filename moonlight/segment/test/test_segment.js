
import path from 'path';
var assert = path.require('assert');
var Segment = path.require('../');

describe('ChsNameTokenizer', function () {

  var segment = null;

  var toStringArray = function (arr) {
    return arr.map(function (w) {
      return w.w;
    });
  };

  it('init', function () {
    segment = new Segment();
    segment.useDefault();
  });

  it('default test', function () {

    var equal = function (a, b) {
      a = toStringArray(segment.doSegment(a));
      console.log(a.join('/'));
      assert.equal(a.toString('\t'), b.toString('\t'));
    };

    console.log('分词测试');

    // 常用测试题目
    equal('随着智能化住宅小区的普及和宽带接入技术的发展，各种基于宽带技术的应用服务也日益被人们所熟悉。',
          ['随着', '智能化', '住宅小区', '的', '普及', '和', '宽带接入', '技术', '的', '发展', '，', '各种', '基于', '宽带', '技术', '的', '应用服务', '也', '日益', '被', '人们', '所', '熟悉', '。']);
    equal('工信处女干事每月经过下属科室都要亲口交代24口交换机等技术性器件的安装工作。',
          ['工信处', '女', '干事', '每月', '经过', '下属', '科室', '都', '要', '亲口', '交代', '24口', '交换机', '等', '技术性', '器件', '的', '安装', '工作', '。']);
    equal('永和服装饰品有限公司',
          ['永和', '服装', '饰品有限公司']);
    equal('本科班学生',
          ['本科', '班', '学生']);
    equal('一次性交一百元',
          ['一次性', '交', '一百元']);
    equal('研究生命起源',
          ['研究', '生命', '起源']);
    equal('李三买了一张三角桌子',
          ['李三', '买', '了', '一张', '三角', '桌子']);
    equal('这就导致一些不太常见的人名无法被分出来',
          ['这', '就', '导致', '一些', '不', '太', '常见的', '人名', '无法', '被', '分', '出来']);
    equal('杭州市长春药店',
          ['杭州市', '长春', '药店']);
    equal('两个中国人名之间的成分',
          ['两个', '中国', '人名', '之间', '的', '成分']);
    //equal('叶莲美的一位亲戚',
    //      ['叶莲美', '的', '一位', '亲戚']);
    equal('前几天王老头刚收到小孩寄来的照片',
          ['前几天', '王老头', '刚', '收到', '小孩', '寄', '来', '的', '照片']);

    // 针对特定类型识别
    equal('1989年景甜出生于西安市。',
          ['1989年', '景甜', '出生', '于', '西安市', '。']);
    equal('王五和张三丰、李强是谁',
          ['王五', '和', '张三丰', '、', '李强', '是谁']);
    equal('她十二岁时是班花',
          ['她', '十二岁时', '是', '班花']);
    equal('10个100%纯度的',
          ['10个', '100%', '纯度', '的']);
    equal('分词正确率高达97.58%(即百分之九十七点五八，973专家评测结果)',
          ['分词', '正确率', '高达', '97.58%', '(', '即', '百分之九十七点五八', '，', '973', '专家', '评测', '结果', ')']);
    equal('邮箱mail-me@mail.ucdok.com',
          ['邮箱', 'mail-me@mail.ucdok.com']);
    equal('邮箱@mail.ucdok.com',
          ['邮箱', '@', 'mail.ucdok.com']);
    equal('我的邮箱是leizongmin@gmail.com，mail-me@mail.ucdok.com',
          ['我', '的', '邮箱', '是', 'leizongmin@gmail.com', '，', 'mail-me@mail.ucdok.com']);
    equal('欢迎访问我的个人主页http://ucdok.com娃哈哈',
          ['欢迎', '访问', '我', '的', '个人主页', 'http://ucdok.com', '娃哈哈']);

    // 其他
    equal('胡锦涛出席APEC领导人会议后回京',
          ['胡锦涛', '出席', 'APEC', '领导人', '会议', '后', '回京']);
    equal('温家宝:主权问题中国绝不退让半步',
          ['温家宝', ':', '主权', '问题', '中国', '绝不', '退让', '半步']);
    equal('吴邦国与伊朗议长举行会谈',
          ['吴邦国', '与', '伊朗', '议长', '举行', '会谈']);
    equal('贾庆林会见厄瓜多尔客人',
          ['贾庆林', '会见', '厄瓜多尔', '客人']);
    equal('李克强会见世界经济论坛主席并座谈',
          ['李克强', '会见', '世界经济', '论坛', '主席', '并', '座谈']);
    equal('周永康会见新加坡荣誉国务资政',
          ['周永康', '会见', '新加坡', '荣誉', '国务', '资政']);
    equal('4700万资金至贵州灾区，震区民众生活获保障',
          ['4700万', '资金', '至', '贵州', '灾区', '，', '震区', '民众', '生活', '获', '保障']);
    equal('中国两艘海监船赴钓鱼岛宣示主权',
          ['中国', '两艘', '海监船', '赴', '钓鱼岛', '宣示', '主权']);
    equal('中日关系因钓鱼岛问题面临严峻局面',
          ['中日关系', '因', '钓鱼岛', '问题', '面临', '严峻', '局面']);
    equal('一一', ['一一']);
    equal('一 一', ['一', '一']);
  });

  it('options: simple=true', function () {
    assert.equal(segment.doSegment('永和服装饰品有限公司', {simple: true}).join('\t'),
      ['永和', '服装', '饰品有限公司'].join('\t'));
  });

  it('options: stripPunctuation=true', function () {
    assert.equal(segment.doSegment('王五和张三丰、李强是谁', {simple: true, stripPunctuation: true}).join('\t'),
      ['王五', '和', '张三丰', '李强', '是谁'].join('\t'));
  });

  it('options: convertSynonym=true', function () {
    assert.equal(segment.doSegment('何时入睡', {simple: true, convertSynonym: true}).join('\t'),
      ['什么时候', '入眠'].join('\t'));
  });

  it('options: stripStopword=true', function () {
    assert.equal(segment.doSegment('因为李三买了一张三角桌子', {simple: true, stripStopword: true}).join('\t'),
      ['李三', '买', '一张', '三角', '桌子'].join('\t'));
  });

});
