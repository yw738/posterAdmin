const dataList = [
  { quote: '横眉冷对千夫指，俯首甘为孺子牛。', author: '鲁迅' },
  { quote: '星星之火，可以燎原。', author: '毛泽东' },
  { quote: '教育要面向现代化，面向世界，面向未来。', author: '邓小平' },
  { quote: '科学没有国界，但科学家有祖国。', author: '钱三强' },
  { quote: '虚心使人进步，骄傲使人落后。', author: '毛泽东' },
  { quote: '与有肝胆人共事，从无字句处读书。', author: '周恩来' },
  { quote: '知识就是力量。', author: '弗朗西斯·培根' },
  { quote: '我思故我在。', author: '勒内·笛卡尔' },
  { quote: '存在即合理。', author: '格奥尔格·黑格尔' },
  { quote: '人生而自由，却无往不在枷锁之中。', author: '让-雅克·卢梭' },
  { quote: '一切确定的皆是否定。', author: '巴鲁赫·斯宾诺莎' },
  { quote: '人是一根能思想的苇草。', author: '布莱兹·帕斯卡' },
  { quote: '上帝已死。', author: '弗里德里希·尼采' },
  { quote: '我们不能两次踏进同一条河流。', author: '赫拉克利特' },
  { quote: '知识是人类进步的阶梯。', author: '马克西姆·高尔基' },
  { quote: '唯一不变的是变化本身。', author: '赫拉克利特' },
  { quote: '最大的危险是无所行动。', author: '肯尼迪' },
  { quote: '预测未来最好的方式就是去创造它。', author: '亚伯拉罕·林肯' },
  { quote: '想象力比知识更重要。', author: '爱因斯坦' },
  { quote: '简单是可靠的先决条件。', author: 'Edsger W. Dijkstra' },
  { quote: '软件要么是要么在建造中，要么在消亡。', author: 'Lehman' },
  { quote: '生存还是毁灭，这是一个问题。', author: '威廉·莎士比亚' },
  { quote: '世界以痛吻我，我要报之以歌。', author: '泰戈尔' },
  { quote: '一个人可以被毁灭，但不能被打败。', author: '欧内斯特·海明威' },
  { quote: '我们都在阴沟里，但仍有人仰望星空。', author: '奥斯卡·王尔德' },
  { quote: '重要的不是永恒的生命，而是永恒的活力。', author: '弗里德里希·尼采' },
  { quote: '没有可怕深度，就没有美丽的水面。', author: '弗里德里希·尼采' },
  { quote: '过去都是假的，回忆是一条没有归途的路。', author: '加西亚·马尔克斯' },
  { quote: '战争即和平，自由即奴役，无知即力量。', author: '乔治·奥威尔' },
  { quote: '黑夜无论怎样悠长，白昼总会到来。', author: '威廉·莎士比亚' },
  { quote: '欢乐与痛苦交织的人生才是真正的人生。', author: '赫尔曼·黑塞' },
  {
    quote: '人的一切痛苦，本质上都是对自己无能的愤怒。',
    author: '王小波'
  },
  {
    quote: '世界上只有一种真正的英雄主义。',
    author: '罗曼·罗兰'
  },
  {
    quote: '美是到处都有的，对于眼睛，不是缺少美。',
    author: '罗丹'
  },
  {
    quote: '真理的大海，让未发现的一切事物躺卧在我的眼前。',
    author: '牛顿'
  },
  {
    quote: '如果说我比别人看得更远些，那是因为我站在了巨人的肩上。',
    author: '牛顿'
  },
  {
    quote: '耐心是一切聪明才智的基础。',
    author: '柏拉图'
  },
  {
    quote: '良好的开端是成功的一半。',
    author: '亚里士多德'
  },
  {
    quote: '追求完美的脚步永不停歇。',
    author: '达芬奇'
  },
  {
    quote: '音乐是比一切智慧、一切哲学更高的启示。',
    author: '贝多芬'
  },
  {
    quote: '我要扼住命运的咽喉。',
    author: '贝多芬'
  },
  {
    quote: '艺术的目的不是模仿，而是表现。',
    author: '毕加索'
  },
  {
    quote: '简洁是智慧的灵魂。',
    author: '莎士比亚'
  },
  {
    quote: '书籍是人类进步的阶梯。',
    author: '高尔基'
  },
  {
    quote: '世界上最宽阔的是海洋，比海洋更宽阔的是天空。',
    author: '雨果'
  },
  {
    quote: '生活就像一盒巧克力，你永远不知道下一块是什么味道。',
    author: '阿甘正传'
  },

  {
    quote: '不忘初心，方得始终。',
    author: '《华严经》'
  },
  {
    quote: '人生没有彩排，每一天都是现场直播。',
    author: '佚名'
  },
  {
    quote: '世界上最遥远的距离，是鱼与飞鸟的距离。',
    author: '泰戈尔'
  },
  {
    quote: '生活不止眼前的苟且，还有诗和远方。',
    author: '高晓松'
  },
  {
    quote: '愿你出走半生，归来仍是少年。',
    author: '苏轼'
  },
  {
    quote: '穷则独善其身，达则兼济天下',
    author: '孟子'
  },
  {
    quote: '知行合一',
    author: '王阳明'
  },
  {
    quote: '志不立，天下无可成之事',
    author: '王阳明'
  }
]

console.log(dataList)
// 随机抽取两条不重复的数据
export function extractRandomData() {
  // 复制数组以避免修改原数组
  const tempArray = [...dataList]
  const result = []

  // 随机选择两条数据
  for (let i = 0; i < 2; i++) {
    if (tempArray.length === 0) break

    const randomIndex = Math.floor(Math.random() * tempArray.length)
    result.push(tempArray[randomIndex])
    tempArray.splice(randomIndex, 1)
  }

  return result
}
