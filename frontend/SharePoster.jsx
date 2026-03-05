import React, { useRef } from 'react';
import html2canvas from 'html2canvas';

/**
 * SharePoster - D-MBTI 结果分享海报组件
 * 
 * 使用方法:
 * 1. 安装依赖: npm install html2canvas
 * 2. 导入组件: import SharePoster from './SharePoster'
 * 3. 传入数据: <SharePoster data={resultData} />
 * 
 * 保存图片功能集成:
 * - 已预留 html2canvas 集成点（见 handleSavePoster 函数）
 * - 取消注释相关代码即可启用
 */

// E精灵 SVG (外向/社牛) - 阳光黄
const ESpriteSVG = () => (
  <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
    <path d="M100 25 C115 25, 125 35, 130 50 C145 45, 160 50, 165 65 C170 80, 160 95, 150 105 C160 120, 155 140, 140 150 C125 160, 110 150, 100 145 C90 150, 75 160, 60 150 C45 140, 40 120, 50 105 C40 95, 30 80, 35 65 C40 50, 55 45, 70 50 C75 35, 85 25, 100 25Z" fill="#FFD166"/>
    <ellipse cx="35" cy="85" rx="18" ry="12" fill="#FFD166" transform="rotate(-30 35 85)"/>
    <ellipse cx="165" cy="85" rx="18" ry="12" fill="#FFD166" transform="rotate(30 165 85)"/>
    <ellipse cx="65" cy="155" rx="12" ry="18" fill="#FFD166" transform="rotate(-20 65 155)"/>
    <ellipse cx="135" cy="155" rx="12" ry="18" fill="#FFD166" transform="rotate(20 135 155)"/>
    <path d="M72 78 Q78 72, 84 78" stroke="#2D3748" strokeWidth="3" fill="none" strokeLinecap="round"/>
    <path d="M116 78 Q122 72, 128 78" stroke="#2D3748" strokeWidth="3" fill="none" strokeLinecap="round"/>
    <path d="M85 92 Q100 110, 115 92 Q100 95, 85 92" fill="#FF6B6B"/>
    <path d="M88 95 Q100 105, 112 95" fill="#FFFFFF"/>
    <ellipse cx="55" cy="95" rx="10" ry="6" fill="#FF9A8B" opacity="0.6"/>
    <ellipse cx="145" cy="95" rx="10" ry="6" fill="#FF9A8B" opacity="0.6"/>
    <path d="M155 35 L158 42 L165 43 L160 48 L162 55 L155 51 L148 55 L150 48 L145 43 L152 42Z" fill="#FFE66D"/>
    <path d="M175 60 L177 65 L182 66 L178 70 L179 75 L175 72 L171 75 L172 70 L168 66 L173 65Z" fill="#FFE66D"/>
  </svg>
);

// I精灵 SVG (内向/高冷) - 宁静蓝
const ISpriteSVG = () => (
  <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
    <path d="M100 35 C130 35, 155 55, 160 85 C165 115, 150 145, 120 158 C100 166, 80 160, 65 145 C45 125, 40 95, 50 70 C60 45, 80 35, 100 35Z" fill="#4D96FF"/>
    <ellipse cx="45" cy="110" rx="12" ry="10" fill="#4D96FF"/>
    <ellipse cx="155" cy="110" rx="12" ry="10" fill="#4D96FF"/>
    <ellipse cx="70" cy="160" rx="10" ry="8" fill="#4D96FF"/>
    <ellipse cx="130" cy="160" rx="10" ry="8" fill="#4D96FF"/>
    <circle cx="78" cy="88" r="14" stroke="#2D3748" strokeWidth="2.5" fill="none"/>
    <circle cx="122" cy="88" r="14" stroke="#2D3748" strokeWidth="2.5" fill="none"/>
    <line x1="92" y1="88" x2="108" y2="88" stroke="#2D3748" strokeWidth="2.5"/>
    <circle cx="78" cy="88" r="4" fill="#2D3748"/>
    <circle cx="122" cy="88" r="4" fill="#2D3748"/>
    <line x1="92" y1="115" x2="108" y2="115" stroke="#2D3748" strokeWidth="2.5" strokeLinecap="round"/>
    <ellipse cx="55" cy="100" rx="8" ry="5" fill="#FFB4BA" opacity="0.5"/>
    <ellipse cx="145" cy="100" rx="8" ry="5" fill="#FFB4BA" opacity="0.5"/>
    <text x="145" y="55" fontFamily="Arial, sans-serif" fontSize="20" fontWeight="bold" fill="#4D96FF" opacity="0.7">Z</text>
    <text x="155" y="40" fontFamily="Arial, sans-serif" fontSize="14" fontWeight="bold" fill="#4D96FF" opacity="0.5">z</text>
    <text x="165" y="28" fontFamily="Arial, sans-serif" fontSize="10" fontWeight="bold" fill="#4D96FF" opacity="0.3">z</text>
  </svg>
);

// P精灵 SVG (随性/自由) - 珊瑚粉
const PSpriteSVG = () => (
  <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
    <path d="M85 45 C110 40, 135 50, 145 70 C155 90, 150 115, 140 130 C135 140, 145 155, 160 160 C170 163, 165 170, 155 170 C140 170, 125 160, 115 145 C100 150, 80 145, 65 135 C45 120, 40 95, 50 75 C58 58, 70 48, 85 45Z" fill="#FF6B6B"/>
    <ellipse cx="40" cy="95" rx="15" ry="10" fill="#FF6B6B" transform="rotate(-40 40 95)"/>
    <ellipse cx="170" cy="165" rx="20" ry="12" fill="#FF6B6B" transform="rotate(10 170 165)"/>
    <ellipse cx="60" cy="140" rx="12" ry="15" fill="#FF6B6B" transform="rotate(30 60 140)"/>
    <circle cx="95" cy="80" r="5" fill="#2D3748"/>
    <path d="M118 77 L125 80 L118 83" stroke="#2D3748" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
    <ellipse cx="108" cy="105" rx="6" ry="10" fill="#FF8BA7"/>
    <line x1="108" y1="105" x2="108" y2="115" stroke="#FF4757" strokeWidth="1"/>
    <path d="M95 98 Q108 108, 121 98" stroke="#2D3748" strokeWidth="2" fill="none" strokeLinecap="round"/>
    <ellipse cx="75" cy="95" rx="9" ry="5" fill="#FFB4BA" opacity="0.6"/>
    <path d="M75 55 C85 45, 115 45, 125 55 L125 65 C115 60, 85 60, 75 65Z" fill="#FFD93D"/>
    <path d="M120 58 L140 62 L138 68 L118 65Z" fill="#FFD93D"/>
    <circle cx="85" cy="52" r="4" fill="#FFFFFF" opacity="0.8"/>
    <circle cx="115" cy="52" r="4" fill="#FFFFFF" opacity="0.8"/>
  </svg>
);

// J精灵 SVG (守序/乖巧) - 薄荷绿
const JSpriteSVG = () => (
  <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
    <path d="M100 40 C125 40, 150 55, 155 85 C160 110, 150 140, 130 155 C115 165, 85 165, 70 155 C50 140, 40 110, 45 85 C50 55, 75 40, 100 40Z" fill="#06D6A0"/>
    <ellipse cx="50" cy="115" rx="12" ry="10" fill="#06D6A0"/>
    <ellipse cx="150" cy="115" rx="12" ry="10" fill="#06D6A0"/>
    <ellipse cx="75" cy="165" rx="11" ry="9" fill="#06D6A0"/>
    <ellipse cx="125" cy="165" rx="11" ry="9" fill="#06D6A0"/>
    <circle cx="82" cy="88" r="5" fill="#2D3748"/>
    <circle cx="118" cy="88" r="5" fill="#2D3748"/>
    <path d="M88 105 Q100 115, 112 105" stroke="#2D3748" strokeWidth="2.5" fill="none" strokeLinecap="round"/>
    <ellipse cx="65" cy="100" rx="9" ry="5" fill="#FFB4BA" opacity="0.5"/>
    <ellipse cx="135" cy="100" rx="9" ry="5" fill="#FFB4BA" opacity="0.5"/>
    <ellipse cx="100" cy="32" rx="35" ry="8" stroke="#FFD700" strokeWidth="3" fill="none" opacity="0.9"/>
    <ellipse cx="100" cy="32" rx="25" ry="5" stroke="#FFE66D" strokeWidth="2" fill="none" opacity="0.6"/>
    <g transform="translate(135, 105) rotate(15)">
      <rect x="0" y="-6" width="28" height="12" rx="3" fill="#FFFFFF"/>
      <circle cx="0" cy="-6" r="5" fill="#FFFFFF"/>
      <circle cx="0" cy="6" r="5" fill="#FFFFFF"/>
      <circle cx="28" cy="-6" r="5" fill="#FFFFFF"/>
      <circle cx="28" cy="6" r="5" fill="#FFFFFF"/>
    </g>
  </svg>
);

// 根据MBTI类型获取对应的小精灵
const getSpriteByMBTI = (mbti) => {
  const firstLetter = mbti.charAt(0);
  switch (firstLetter) {
    case 'E': return <ESpriteSVG />;
    case 'I': return <ISpriteSVG />;
    default: return <ESpriteSVG />;
  }
};

// 根据MBTI第二字母获取辅助色
const getSecondaryColor = (mbti) => {
  const secondLetter = mbti.charAt(1);
  return secondLetter === 'N' ? 'from-purple-400 to-pink-400' : 'from-blue-400 to-cyan-400';
};

const SharePoster = ({ 
  data = {
    dogName: 'Yoki',
    mbti: 'ENFP',
    title: '快乐小疯子',
    quote: '只要我跑得够快，烦恼就追不上我！',
    stats: {
      energy: 90,
      social: 85,
      empathy: 70,
      obedience: 30
    }
  }
}) => {
  const posterRef = useRef(null);

  /**
   * 保存海报为图片
   * 
   * 集成步骤:
   * 1. 安装 html2canvas: npm install html2canvas
   * 2. 导入: import html2canvas from 'html2canvas'
   * 3. 取消下方注释并调用此函数
   */
  const handleSavePoster = async () => {
    if (!posterRef.current) return;

    try {
      // 等待字体和图像加载完成
      await document.fonts.ready;

      const canvas = await html2canvas(posterRef.current, {
        scale: 3,
        useCORS: true,
        backgroundColor: null,
        logging: false,
        // 不指定 width/height，让 html2canvas 根据元素实际尺寸和 scale 自动计算
        // 360px * 3 = 1080px, 760px * 3 = 2280px
      });

      // 验证输出尺寸
      console.log('Canvas size:', canvas.width, 'x', canvas.height);

      // 生成图片并下载
      const link = document.createElement('a');
      link.download = `${data.dogName}-DMBTI结果.png`;
      link.href = canvas.toDataURL('image/png', 1.0);
      link.click();

    } catch (error) {
      console.error('生成海报失败:', error);
      alert('保存失败，请重试');
    }
  };

  const { dogName, mbti, title, quote, stats } = data;

  // 进度条数据
  const progressBars = [
    { label: '社交能量', value: stats.social || 85, color: 'bg-gradient-to-r from-coral-400 to-rose-400', emoji: '🔥' },
    { label: '干饭热情', value: stats.energy || 90, color: 'bg-gradient-to-r from-orange-400 to-yellow-400', emoji: '🍖' },
    { label: '拆家指数', value: 100 - (stats.obedience || 30), color: 'bg-gradient-to-r from-pink-400 to-purple-400', emoji: '🏠' },
    { label: '粘人程度', value: stats.empathy || 70, color: 'bg-gradient-to-r from-mint-400 to-teal-400', emoji: '💖' },
  ];

  return (
    <div className="flex flex-col items-center gap-6 p-4 bg-gray-100 min-h-screen">
      {/* 海报容器 - 9:19 比例 */}
      <div
        ref={posterRef}
        id="share-poster"
        className="relative w-[360px] aspect-[9/19] bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 rounded-3xl overflow-hidden shadow-2xl"
        style={{ aspectRatio: '9/19', width: '360px', height: '760px' }}
      >
        {/* 装饰背景 */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-8 left-4 w-2 h-2 bg-yellow-300 rounded-full opacity-60" />
          <div className="absolute top-20 right-6 w-3 h-3 bg-pink-300 rounded-full opacity-40" />
          <div className="absolute bottom-40 left-6 w-2 h-2 bg-cyan-300 rounded-full opacity-50" />
          <div className="absolute top-32 left-8 w-1.5 h-1.5 bg-white rounded-full opacity-30" />
        </div>

        {/* 1. Header 区域 */}
        <div className="relative pt-10 pb-4 text-center">
          <p className="text-white/90 text-sm font-medium mb-2 tracking-wide">
            {dogName} 的专属灵魂鉴定
          </p>
          <div className="inline-block px-8 py-2 bg-gradient-to-r from-yellow-300 to-amber-400 rounded-full shadow-lg shadow-yellow-400/30">
            <span className="text-3xl font-black text-white tracking-wider drop-shadow-sm">
              {mbti}
            </span>
          </div>
        </div>

        {/* 2. 核心视觉区 - 白色卡片 */}
        <div className="mx-5 mb-4">
          <div className="bg-white rounded-[2rem] p-6 shadow-xl shadow-purple-900/20">
            {/* 小精灵 */}
            <div className="w-28 h-28 mx-auto mb-3">
              {getSpriteByMBTI(mbti)}
            </div>
            
            {/* 称号 */}
            <h2 className="text-2xl font-black text-slate-800 text-center mb-2">
              {title}
            </h2>
            
            {/* 金句 */}
            <p className="text-slate-500 text-center italic text-sm px-2">
              "{quote}"
            </p>
          </div>
        </div>

        {/* 3. 数据可视化区 */}
        <div className="mx-5 mb-4">
          <div className="bg-white/15 backdrop-blur-sm rounded-2xl p-4">
            <h3 className="text-white/80 text-xs font-bold uppercase tracking-wider mb-3 text-center">
              性格雷达
            </h3>
            <div className="space-y-3">
              {progressBars.map((bar, index) => (
                <div key={index} className="flex items-center gap-3">
                  <span className="text-white/90 text-xs font-medium w-16 flex items-center gap-1">
                    <span>{bar.emoji}</span>
                    <span>{bar.label}</span>
                  </span>
                  <div className="flex-1 h-2.5 bg-white/20 rounded-full overflow-hidden">
                    <div 
                      className={`h-full rounded-full ${bar.color}`}
                      style={{ width: `${bar.value}%` }}
                    />
                  </div>
                  <span className="text-white text-xs font-bold w-8 text-right">
                    {bar.value}%
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* 4. Match 区 */}
        <div className="mx-5 mb-4">
          <div className="bg-gradient-to-r from-white/20 to-white/10 backdrop-blur-sm rounded-xl p-3">
            <p className="text-white/90 text-xs text-center mb-1">
              最佳人类伴侣：
              <span className="font-bold text-yellow-300">INTJ / INFJ</span>
            </p>
            <p className="text-white/70 text-[10px] text-center italic">
              "建议主人多备点速效救心丸和耐咬胶"
            </p>
          </div>
        </div>

        {/* 5. Footer 引流区 */}
        <div className="absolute bottom-0 left-0 right-0 px-5 pb-4 pt-3 bg-gradient-to-t from-black/20 to-transparent">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <div>
              <p className="text-white font-black text-lg tracking-tight">D-MBTI</p>
              <p className="text-white/60 text-[10px]">狗狗性格测试</p>
            </div>
            
            {/* 二维码占位 */}
            <div className="flex flex-col items-center">
              <div className="w-12 h-12 bg-white rounded-lg p-1 shadow-lg">
                {/* 简单的二维码样式占位 */}
                <div className="w-full h-full bg-slate-800 rounded flex items-center justify-center">
                  <div className="grid grid-cols-3 gap-0.5 w-8 h-8">
                    <div className="bg-white" />
                    <div className="bg-white" />
                    <div className="bg-white" />
                    <div className="bg-white" />
                    <div className="bg-transparent" />
                    <div className="bg-white" />
                    <div className="bg-white" />
                    <div className="bg-white" />
                    <div className="bg-white" />
                  </div>
                </div>
              </div>
              <p className="text-white/70 text-[8px] mt-1">长按扫码测测你的狗</p>
            </div>
          </div>
        </div>
      </div>

      {/* 保存按钮 */}
      <button
        onClick={handleSavePoster}
        className="px-10 py-4 bg-gradient-to-r from-pink-400 via-rose-400 to-orange-400 text-white font-extrabold text-lg rounded-full shadow-xl shadow-pink-500/40 hover:scale-105 hover:shadow-2xl transition-all duration-300 flex items-center gap-2"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
        </svg>
        保存海报
      </button>

      {/* 使用说明 */}
      <div className="max-w-[360px] text-xs text-slate-500 bg-white p-4 rounded-xl">
        <p className="font-bold mb-2">💡 如何启用保存功能：</p>
        <ol className="list-decimal list-inside space-y-1">
          <li>安装依赖：<code className="bg-slate-100 px-1 rounded">npm install html2canvas</code></li>
          <li>取消 SharePoster.jsx 中 handleSavePoster 函数的注释</li>
          <li>导入 html2canvas：<code className="bg-slate-100 px-1 rounded">import html2canvas from 'html2canvas'</code></li>
        </ol>
      </div>
    </div>
  );
};

export default SharePoster;
