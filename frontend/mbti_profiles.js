/**
 * MBTI Profiles - 16种狗狗性格类型配置
 * 
 * 使用方法:
 * import MBTI_PROFILES from './mbti_profiles.js';
 * 
 * const profile = MBTI_PROFILES['ENFP'];
 * console.log(profile.title); // '快乐小疯子'
 */

const MBTI_PROFILES = {
  // 1. ENFP - 竞选者型
  ENFP: {
    title: '快乐小疯子',
    quote: '只要我跑得够快，烦恼就追不上我！',
    tags: ['社交恐怖分子', '永动机', '阳光小狗'],
    match: 'INTJ / INFJ',
    advice: '建议主人多备点速效救心丸和耐咬胶',
    color: '#FFD166',
    sprite: 'E'
  },

  // 2. ISTJ - 物流师型
  ISTJ: {
    title: '退休老干部',
    quote: '规矩就是规矩，今天这个门你不能进。',
    tags: ['皇家护卫队', '守时达人', '稳如老狗'],
    match: 'ESFP / ESTP',
    advice: '保持规律作息，TA会是最好的陪伴者',
    color: '#4D96FF',
    sprite: 'I'
  },

  // 3. ENTP - 辩论家型
  ENTP: {
    title: '拆迁办主任',
    quote: '我不是在搞破坏，我是在进行空间重构。',
    tags: ['战术大师', '智商碾压', '撒手没'],
    match: 'INFJ / INTJ',
    advice: '准备好耐咬玩具和充足的运动时间',
    color: '#FFD166',
    sprite: 'E'
  },

  // 4. ISFP - 探险家型
  ISFP: {
    title: '佛系小甜心',
    quote: '你若安好，便是晴天；你若发火，我先装死。',
    tags: ['嘤嘤怪', '粘人精', '情绪稳定'],
    match: 'ESFJ / ENFJ',
    advice: '温柔的引导和陪伴是最好的训练方式',
    color: '#4D96FF',
    sprite: 'I'
  },

  // 5. ESTJ - 总经理型
  ESTJ: {
    title: '小区巡逻大队长',
    quote: '方圆十里，谁敢不服？汪！',
    tags: ['霸道总裁', '护主狂魔', '气场两米八'],
    match: 'ISFP / INFP',
    advice: '训练很容易，但不要过于严厉哦',
    color: '#FFD166',
    sprite: 'E'
  },

  // 6. INTP - 逻辑学家型
  INTP: {
    title: '哲学家',
    quote: '人类太复杂了，我还是继续思考这根骨头的意义吧。',
    tags: ['独行侠', '眼神高冷', '难以捉摸'],
    match: 'ENTJ / ESTJ',
    advice: '用智力游戏满足TA的好奇心和探索欲',
    color: '#4D96FF',
    sprite: 'I'
  },

  // 7. ENTJ - 指挥官型
  ENTJ: {
    title: '汪星大霸总',
    quote: '这个家没我迟早得散，还不快去倒狗粮！',
    tags: ['气场压制', '绝对领导权', '智商在线'],
    match: 'INFP / ISFP',
    advice: '让TA参与家庭决策，会更有归属感',
    color: '#FFD166',
    sprite: 'E'
  },

  // 8. INTJ - 建筑师型
  INTJ: {
    title: '高冷战术家',
    quote: '人类的愚蠢，总是超乎我的想象。',
    tags: ['鄙视链顶端', '独立思考', '眼神拉丝'],
    match: 'ENFP / ENTP',
    advice: '尊重TA的独立空间，但也要坚持基本训练',
    color: '#4D96FF',
    sprite: 'I'
  },

  // 9. ENFJ - 主人公型
  ENFJ: {
    title: '居委会大妈',
    quote: '别吵了别吵了！大家都是好朋友，先互相闻闻屁股吧！',
    tags: ['汪星外交官', '和事佬', '操碎了心'],
    match: 'INFP / ISFP',
    advice: 'TA天生擅长调解，是多狗家庭的好帮手',
    color: '#FFD166',
    sprite: 'E'
  },

  // 10. INFJ - 提倡者型
  INFJ: {
    title: '灵魂伴侣',
    quote: '我不仅能听懂你的指令，还能看穿你的灵魂。',
    tags: ['专属天使', '极度共情', '敏感多疑'],
    match: 'ENTP / ENFP',
    advice: '理解TA的深度，陪伴是最好的礼物',
    color: '#4D96FF',
    sprite: 'I'
  },

  // 11. ESFP - 表演者型
  ESFP: {
    title: '气氛组组长',
    quote: '只要我翻肚皮的速度够快，就没有要不到的零食！',
    tags: ['搞笑担当', '人来疯', '没心没肺'],
    match: 'ISFJ / ISTJ',
    advice: '需要主人有充足的体力陪玩和互动',
    color: '#FFD166',
    sprite: 'E'
  },

  // 12. ISFJ - 守卫者型
  ISFJ: {
    title: '金牌小保姆',
    quote: '你放心地去上班吧，这个沙发我替你守着。',
    tags: ['贴心小棉袄', '默默守护', '极度忠诚'],
    match: 'ESFP / ESTP',
    advice: 'TA值得最好的照顾和陪伴，多多关爱',
    color: '#4D96FF',
    sprite: 'I'
  },

  // 13. ESFJ - 执政官型
  ESFJ: {
    title: '迎宾大堂经理',
    quote: '你看我尾巴摇得像不像直升机？快夸我快夸我！',
    tags: ['摇尾巴机器', '极度求生欲', '热情好客'],
    match: 'ISFP / INFP',
    advice: '多给正面反馈和夸奖，TA会表现更好',
    color: '#FFD166',
    sprite: 'E'
  },

  // 14. ISTP - 鉴赏家型
  ISTP: {
    title: '越狱专家',
    quote: '笼子？那只是对我柔韧性的一种考验罢了。',
    tags: ['动作派', '沉默寡言', '探索欲强'],
    match: 'ESFJ / ESTJ',
    advice: '提供可以"拆解"的安全玩具，满足探索欲',
    color: '#4D96FF',
    sprite: 'I'
  },

  // 15. ESTP - 企业家型
  ESTP: {
    title: '街头小霸王',
    quote: '看到那个飞盘了吗？下一秒它就是我的了！',
    tags: ['永远在跑', '反应神速', '冲动狂魔'],
    match: 'ISFJ / ISTJ',
    advice: '看好贵重物品，准备充足的户外活动',
    color: '#FFD166',
    sprite: 'E'
  },

  // 16. INFP - 调停者型
  INFP: {
    title: '玻璃心小诗人',
    quote: '一片落叶掉下来了，我的心也跟着碎了……求抱抱。',
    tags: ['森林小精灵', '敏感娇弱', '幻想家'],
    match: 'ENFJ / ESFJ',
    advice: '温柔的呵护和安全感是TA最需要的',
    color: '#4D96FF',
    sprite: 'I'
  }
};

// 根据MBTI获取主题色配置
export const getThemeByMBTI = (mbti) => {
  const profile = MBTI_PROFILES[mbti];
  if (!profile) return { theme: '#6B66DA', fill: 'rgba(107, 102, 218, 0.35)', sprite: 'E' };
  
  return {
    theme: profile.color,
    fill: profile.color + '59', // 35% opacity in hex
    sprite: profile.sprite
  };
};

// 获取雷达图维度标签映射
export const RADAR_DIMENSIONS = {
  top: { label: '社交能量', emoji: '🔥' },
  right: { label: '拆家指数', emoji: '🏠' },
  bottom: { label: '粘人程度', emoji: '💖' },
  left: { label: '通人性', emoji: '🧠' }
};

// 计算雷达图分数的辅助函数
export const calculateRadarScores = (mbti, scores) => {
  // 根据MBTI维度和实际得分计算雷达图四个维度的分数
  const mbtiMap = {
    'E': 'top',    // 社交能量
    'I': 'top',    // 社交能量 (反向)
    'S': 'left',   // 通人性
    'N': 'left',   // 通人性 (反向)
    'T': 'bottom', // 粘人程度 (反向)
    'F': 'bottom', // 粘人程度
    'J': 'right',  // 拆家指数 (反向)
    'P': 'right'   // 拆家指数
  };
  
  return {
    top: scores.find(s => s.dimension === 'E/I')?.letter === 'E' ? 85 : 40,
    right: scores.find(s => s.dimension === 'J/P')?.letter === 'P' ? 85 : 30,
    bottom: scores.find(s => s.dimension === 'T/F')?.letter === 'F' ? 80 : 45,
    left: scores.find(s => s.dimension === 'S/N')?.letter === 'N' ? 75 : 60
  };
};

export default MBTI_PROFILES;
