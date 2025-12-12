export interface Slide {
  type: "cover" | "content" | "end"
  title: string
  subtitle?: string
  content?: string
  name?: string
  message?: string
}

export interface SlideData {
  day: number
  title: string
  slug: string
  description: string
  slides: Slide[]
}

// Update the slideDecks array to include the new Day 6 and renumbered Day 7
export const slideDecks: SlideData[] = [
  {
    day: 1,
    title: "Technical SEO是什么？",
    slug: "day1-what-is-technical-seo",
    description:
      'Technical SEO 是网站优化的"骨骼"，确保搜索引擎能轻松抓取、理解和索引你的内容。了解为什么它对网站排名至关重要。',
    slides: [
      {
        type: "cover",
        title: "Technical SEO是什么？",
        subtitle: '网站优化的"骨骼"',
      },
      {
        type: "content",
        title: "Technical SEO 的定义",
        content:
          'Technical SEO 是网站优化的"骨骼"。它不像内容 SEO 那样盯着关键词，而是聚焦网站的技术架构，确保搜索引擎能轻松抓取、理解和索引你的内容。网站速度、移动适配、结构化数据这些技术细节，都会直接影响你的排名。',
      },
      {
        type: "content",
        title: "为什么它重要？",
        content:
          "没有技术 SEO，网站就像一栋地基不稳的房子，哪怕内容再精彩，也很难被用户发现。Google 偏爱技术优化到位的网站，做好它，排名和流量自然就上去了。",
      },
      {
        type: "content",
        title: "谁需要关心 Technical SEO？",
        content:
          "不只是开发者，网站所有者、SEOer，甚至技术小白都该懂点基础知识。想让网站在竞争中脱颖而出？技术优化绝对是你的秘密武器。",
      },
      {
        type: "content",
        title: "从哪里开始？",
        content:
          '先从基础入手：检查网站速度、确保移动端适配、升级到 HTTPS。这些是 Technical SEO 的"入门三件套"，简单又实用。',
      },
      {
        type: "content",
        title: "小贴士",
        content:
          "推荐用 Google PageSpeed Insights 测测网站速度，免费又靠谱。别怕技术名词，Technical SEO 其实没你想的那么复杂！",
      },
      {
        type: "end",
        name: "Meathill",
        title: "Full stack SEO",
        message: "你知道 Technical SEO 是什么吗？快来分享你的理解吧！",
      },
    ],
  },
  // ... days 2-5 remain unchanged
  // Updated day 2 with website speed content
  {
    day: 2,
    title: "网站速度有多重要？",
    slug: "day2-website-speed",
    description: "网站加载速度直接影响用户体验和搜索引擎排名。了解如何检测和优化网站速度，提升流量和转化率。",
    slides: [
      {
        type: "cover",
        title: "网站速度有多重要？",
        subtitle: "提升排名与用户体验的关键因素",
      },
      {
        type: "content",
        title: "加载速度直接影响流量",
        content:
          "数据显示，网站加载时间超过 3 秒，用户流失率将增加 32%。搜索引擎同样重视速度，Google 将其作为排名的重要依据。优化速度是提升流量的关键。",
      },
      {
        type: "content",
        title: "速度优化提升排名与体验",
        content:
          "页面加载速度不仅关乎用户体验，还直接影响 SEO 表现。Google 尤其关注移动端速度，快速网站更容易获得排名优势，实现用户与搜索引擎的双赢。",
      },
      {
        type: "content",
        title: "实用技巧加速网站",
        content:
          "提升网站速度可通过以下方法实现：采用 WebP 格式压缩图片、使用 CDN 加速内容分发、减少重定向。这些技术简单高效，显著改善性能。更多优化技术可通过 B 站搜索 meathill 获取专业指导。",
      },
      {
        type: "content",
        title: "专业工具检测与改进",
        content:
          "使用 Google PageSpeed Insights 或 GTmetrix，可精准检测网站速度并提供优化建议。这些工具免费且易用，适合快速评估与改进。",
      },
      {
        type: "end",
        name: "Meathill",
        title: "Full stack SEO",
        message: "你的网站评分多少？取用 PageSpeed 测一下，在评论区分享吧！优化经验更欢迎！",
      },
    ],
  },
  // Updated day 3 with mobile optimization content
  {
    day: 3,
    title: "移动端优化：SEO的重要一环",
    slug: "day3-mobile-optimization",
    description:
      "随着移动设备使用率的提高，移动端优化已成为SEO策略的核心。了解如何提升移动端体验，满足Google移动优先索引的要求。",
    slides: [
      {
        type: "cover",
        title: "移动端优化：SEO的重要一环",
        subtitle: "提升排名与用户体验的必要策略",
      },
      {
        type: "content",
        title: "Google 移动优先索引的现实",
        content:
          "Google 已将移动版网站作为排名的重要依据。如果移动端未优化，可能直接影响网站在搜索引擎中的表现，流量获取将面临挑战。",
      },
      {
        type: "content",
        title: "用户体验与流量的关系",
        content:
          "当前，超过一半的网络流量来自移动设备。若页面加载缓慢或布局不适配，用户可能迅速流失。优化移动端是提升用户留存的关键步骤。",
      },
      {
        type: "content",
        title: "实用优化建议",
        content:
          "采用响应式设计是基础，同时通过压缩图片和精简 JavaScript 等方式提升加载速度，可显著改善移动端体验。想了解更多技巧，欢迎关注私聊。",
      },
      {
        type: "content",
        title: "友情提示",
        content:
          "即使您的目标群体主要使用桌面端，移动端表现不佳仍可能拖累整体排名。Google 的评估标准适用于所有网站，忽视移动端优化存在风险。",
      },
      {
        type: "content",
        title: "免费工具助力优化",
        content:
          "使用 Google Mobile-Friendly Test 检查移动适配性，或借助 PageSpeed Insights 分析加载性能。这些工具操作简单，能快速定位问题并提供改进建议。",
      },
      {
        type: "end",
        name: "Meathill",
        title: "Full stack SEO",
        message: "你的网站移动端友好吗？留个链接给大家看看，欢迎互相交流优化经验！",
      },
    ],
  },
  // Updated day 4 with Web Vitals content
  {
    day: 4,
    title: "Web Vitals 及 CrUX 的重要性",
    slug: "day4-web-vitals",
    description:
      "了解 Google 的 Web Vitals 指标如何衡量网站性能，以及 Chrome 用户体验报告(CrUX)对 SEO 的影响。掌握优化技巧提升用户体验和搜索排名。",
    slides: [
      {
        type: "cover",
        title: "Web Vitals 及 CrUX 的重要性",
        subtitle: "提升用户体验与搜索排名的关键指标",
      },
      {
        type: "content",
        title: "Web Vitals 是什么",
        content:
          "Web Vitals 是 Google 设计的一组指标，旨在衡量网站在加载性能、交互性和视觉稳定性方面的表现。主要包括 LCP，INP，CLS。",
      },
      {
        type: "content",
        title: "为什么它对 SEO 和用户体验至关重要",
        content:
          "Google 的目标是找到用户喜欢的网站。而他们也认为，在这些指标上表现的好，用户就喜欢。所以优化这些指标，可以让用户获得更流畅的体验，同时提升网站的搜索引擎排名，减少用户流失。核心目标是通过数据驱动的方式，让网站更贴近用户需求。",
      },
      {
        type: "content",
        title: "Web Vitals 核心指标：LCP",
        content:
          "最大内容绘制(LCP)衡量加载性能。为了提供良好的用户体验，应在网页首次开始加载的 2.5 秒内完成 LCP。请确保你最大的内容区块尽快加载并渲染。",
      },
      {
        type: "content",
        title: "Web Vitals 核心指标：INP",
        content:
          "输入延迟(INP)衡量互动性。为了提供良好的用户体验，网页的 INP 应不超过 200 毫秒。页面中的程序执行不应该太久，让用户随时可以操作。",
      },
      {
        type: "content",
        title: "Web Vitals 核心指标：CLS",
        content:
          "累计布局偏移(CLS)衡量视觉稳定性。为了提供良好的用户体验，网页的 CLS 应保持在 0.1 或更低。不要让页面抖动，布局变化只应该在用户操作时发生。",
      },
      {
        type: "content",
        title: "Web Vital 数据来源",
        content: "Web Vitals 的数据来源有两个层面，缺一不可：Google 爬虫模拟测试和真实用户体验数据(CrUX)。",
      },
      {
        type: "content",
        title: "Google 爬虫模拟测试",
        content:
          "通过工具如 Lighthouse，模拟用户访问，生成性能报告。这种方式适合快速检测问题和开发阶段调优，有用但不够全面。",
      },
      {
        type: "content",
        title: "Chrome 用户体验报告（CrUX）",
        content:
          "CrUX 收集了真实用户在 Chrome 浏览器中的匿名数据，覆盖不同设备（如手机、桌面）和网络条件（如 4G、WiFi）。它反映了用户在现实场景中的实际体验，是优化 Web Vitals 的重要参考。",
      },
      {
        type: "content",
        title: "实战经验分享",
        content:
          "CrUX 非常重要，非常非常重要。会极大影响网站在搜索中的排名，所以一定要注意。最好配合 GA 分析了解你的用户，做出相应的优化。",
      },
      {
        type: "content",
        title: "优化 LCP 的方法",
        content:
          "加快服务器响应时间（使用 CDN，使用缓存，使用 SSR，优化后端响应速度）。优化图片和字体加载（延迟加载非关键资源、使用现代格式如 WebP）。减少阻塞渲染的代码（如过大的 CSS 或 JS）。找到你真正的 Largest Content，不要优化错误的元素。",
      },
      {
        type: "content",
        title: "优化 INP 的方法",
        content:
          "精简 JavaScript，减少执行时间。优化第三方脚本，按需加载，分模块加载。把大运算量的功能放在 worker。减轻 DOM 结构，能省则省。",
      },
      {
        type: "content",
        title: "优化 CLS 的方法",
        content:
          "预设图片和视频尺寸，可以在服务器端计算后带入 html。避免动态内容插入，比如广告，可能是重灾区。在用户操作的一小段时间窗口，可以改变 DOM。",
      },
      {
        type: "content",
        title: "实用工具推荐",
        content:
          "PageSpeed Insights、Lighthouse、CrUX 报告都是优化 Web Vitals 的实用工具，可以帮助你分析和改进网站性能。",
      },
      {
        type: "end",
        name: "Meathill",
        title: "Full stack SEO",
        message: "Web Vitals 是我钻研最深的部份，也是我纠正自己误解最深的部份。欢迎挑战！",
      },
    ],
  },
  // Updated day 5 with content about when to start Technical SEO
  {
    day: 5,
    title: "应该什么时候开始 Technical SEO？",
    slug: "day5-when-to-start-technical-seo",
    description:
      "了解为什么应该立即开始 Technical SEO，以及拖延优化可能带来的严重后果。无论是新网站还是老网站，现在就是最佳时机。",
    slides: [
      {
        type: "cover",
        title: "应该什么时候开始 Technical SEO？",
        subtitle: "现在立刻马上！",
      },
      {
        type: "content",
        title: "请尽早开始 Technical SEO",
        content:
          "Technical SEO 绝非可有可无，它是网站成功的根基。不管你的网站刚刚上线，还是已经运营多年，都不要忽视优化，更不要误信花钱买来的虚假流量。提升用户体验，才能在竞争中抢占先机。",
      },
      {
        type: "content",
        title: "用户体验的幕后英雄",
        content:
          "网站好不好用，用户说了算。加载卡顿？页面崩溃？手机端乱七八糟？用户不爽他们就不再来。用户存留数据不好，搜索引擎也会调低你的排名。Technical SEO 专治这些“病”，让网站快如闪电、安全可靠，用户体验飙升的同时，排名自然不成问题。",
      },
      {
        type: "content",
        title: "竞争中的隐秘王牌",
        content:
          "内容接近，谁能排在前面？用户体验更好，存留时间更长，交互操作更多，就会排在前面。搜索引擎其实一直在收集这些数据，而只有Technical SEO 能改进这些数据，让您的网站在搜索排名和用户心中双双领先。是你甩开对手的秘密武器。",
      },
      {
        type: "content",
        title: "早优化，早受益",
        content:
          "建站时就必须看重 Technical SEO，比如规范 URL、提升 Web Vitals、符合 SEO 规范，能省去后期翻修的麻烦。搜索引擎对新网站没什么耐心，就像我们人类的第一印象一样，如果启动时没做好，后面要改正需要更多时间。",
      },
      {
        type: "content",
        title: "持续优化，永葆活力",
        content:
          "搜索引擎算法在变，用户习惯也在变，技术设备更在变。定期技术审计，修复死链、优化抓取预算、及时配置分享图片和搜索结果，能让网站抓住用户有限的注意力，提升打开率，进一步保持领先。",
      },
      {
        type: "content",
        title: "拖延的代价太高",
        content:
          "不做 Technical SEO，花钱买来的流量就都打了水漂。那些卖流量为主的 SEO 供应商可能不会告诉你这些，因为你越依赖他们，他们就越能赚钱。而 Technical SEO 做好，就会细水长流，稳步提升，何乐而不为？",
      },
      {
        type: "content",
        title: "马上行动，从这开始",
        content:
          "新站：URL 设计、移动适配，一步到位。\n\n老站：定期查漏补缺，解决技术隐患。\n\n改版时：重定向到位，Sitemap 别忘更新。\n\n今天就动手吧！",
      },
      {
        type: "end",
        name: "Meathill",
        title: "Full stack SEO",
        message: "你的网站有技术问题吗？评论区说出来，我来助你！",
      },
    ],
  },
  // New Day 6
  {
    day: 6,
    title: "Technical SEO 要做多久？",
    slug: "day6-technical-seo-timeline",
    description: "了解 Technical SEO 的时间周期、预期效果和合作模式，避免短视行为，获取长期稳定的流量增长。",
    slides: [
      {
        type: "cover",
        title: "Technical SEO 要做多久？",
        subtitle: "耐心与长期主义的价值",
      },
      {
        type: "content",
        title: "Technical SEO 不会立刻生效",
        content:
          "Technical SEO 会让搜索引擎更好的抓取和索引你的网站，但这些过程有赖搜索引擎来完成，我们无法主动加速这一过程，所以我们必须有耐心，等待每周一两次的更新。",
      },
      {
        type: "content",
        title: "Technical SEO 可能不会带来立竿见影的流量",
        content:
          "Technical SEO 并不直接关注关键词，所以刚刚做完优化的网站可能不会立刻流量飞涨。甚至在一段时间里，都看不出什么变化。但这绝不是是努力都白费了，在未来很长一段时间里，网站都会得到助益。",
      },
      {
        type: "content",
        title: "Technical SEO 的流程",
        content:
          "1. 分析当前的问题\n2. 提出修改方案\n3. 实施修改方案\n4. 验收修改结果\n5. 继续分析，直到所有问题均被解决",
      },
      {
        type: "content",
        title: "Technical SEO 的收效",
        content:
          "一般来说，从第一次修改之后，网站就会享受到 Technical SEO 带来的好处。这些好处会积累，与日俱增，绝对不会浪费。\n随着用户停留时间增长、访问页面数增多、跳出率减少，在搜索导入量提高之前，你就会感觉到种种好处。",
      },
      {
        type: "content",
        title: "Technical SEO 的合作模式",
        content:
          "所以 Technical SEO 和合作也不会是一蹴而就的，无论是我，还是我的同行，只要是真正像帮助你和你的网站，我们都会投入至少一个月的时间，帮助你的网站取得真正的进步。",
      },
      {
        type: "content",
        title: "警惕流量贩子",
        content:
          "不得不说，有些友商并不擅长 SEO，也不打算给你做 SEO。他们只是在你们付钱的阶段，从其它地方采购流量，帮你们把流量推起来。当到你们的费用用完，他就不管你们，你们的流量也就没了。只有我们真正的从 Technical SEO 做起，才有长期稳定的流量。",
      },
      {
        type: "end",
        name: "Meathill",
        title: "Full stack SEO",
        message: "跟时间交朋友，追求长期价值，获取真正的流量。",
      },
    ],
  },
  // Updated Day 7 (previously Day 6)
  {
    day: 7,
    title: "实战第一步：Google Search Console",
    slug: "day7-google-search-console",
    description:
      "了解如何使用 Google Search Console 监控和优化网站在 Google 搜索中的表现，掌握实用技巧提升网站可见性。",
    slides: [
      {
        type: "cover",
        title: "实战第一步：Google Search Console",
        subtitle: "即将推出",
      },
      {
        type: "content",
        title: "敬请期待",
        content:
          "本系列的第七天内容即将推出，我们将深入探讨 Google Search Console 的使用方法和实战技巧。\n\n通过 Google Search Console，您可以监控网站在 Google 搜索中的表现，发现并解决问题，提升网站在搜索结果中的可见性。",
      },
      {
        type: "end",
        name: "Meathill",
        title: "Full stack SEO",
        message: "敬请期待更多实用的 SEO 技巧和工具使用指南！",
      },
    ],
  },
]

export function getSlideDataBySlug(slug: string): SlideData | undefined {
  return slideDecks.find((deck) => deck.slug === slug)
}

export function getAllSlugs(): string[] {
  return slideDecks.map((deck) => deck.slug)
}

// Get the slug of the previous day's slide deck
export function getPrevDaySlug(currentDay: number): string | null {
  if (!currentDay || currentDay <= 1) return null

  const prevDeck = slideDecks.find((deck) => deck.day === currentDay - 1)
  return prevDeck ? prevDeck.slug : null
}

// Get the slug of the next day's slide deck
export function getNextDaySlug(currentDay: number): string | null {
  if (!currentDay || currentDay >= slideDecks.length) return null

  const nextDeck = slideDecks.find((deck) => deck.day === currentDay + 1)
  return nextDeck ? nextDeck.slug : null
}
