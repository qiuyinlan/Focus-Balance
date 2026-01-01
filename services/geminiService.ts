
/**
 * 本地金句库：为了支持纯静态部署（如 GitHub Pages），我们使用预设的激励语。
 */
const LOCAL_QUOTES = [
  "每一秒的坚持，都是在为未来的自己积攒复利。",
  "专注是这个时代最稀缺的超能力。",
  "财富之树不会一天长成，但它每天都在悄悄扎根。",
  "你不是在浪费时间，你是在打磨一颗名为‘耐心’的钻石。",
  "当你在挖矿时，全世界的干扰都与你无关。",
  "30分钟的积累是复利爆炸的前奏，请再坚持一下。",
  "这里的每一枚金币，都是你意志力的结晶。",
  "高手和普通人的区别，就在于这最后几分钟的专注。",
  "你的时间很贵，不要把它浪费在无意义的刷屏上。",
  "看，金山又高了一点点，那是你汗水的颜色。",
  "别看手机，树上的金币正在为你跳舞。",
  "专注的深度，决定了财富的高度。",
  "每一次拒绝诱惑，都是对灵魂的一次奖励。"
];

export const getMotivationalQuote = async (timeFocused: number, totalGold: number): Promise<string> => {
  // 模拟异步调用，增加真实感
  return new Promise((resolve) => {
    setTimeout(() => {
      // 如果专注超过 30 分钟，给点特别的鼓励
      if (timeFocused > 1800) {
        resolve("复利引擎已全面启动！你现在的每一秒都价值连城！");
      } else {
        const randomIndex = Math.floor(Math.random() * LOCAL_QUOTES.length);
        resolve(LOCAL_QUOTES[randomIndex]);
      }
    }, 500);
  });
};
