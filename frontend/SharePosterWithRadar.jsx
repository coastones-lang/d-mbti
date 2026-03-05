import React, { useRef } from 'react';
import html2canvas from 'html2canvas';

/**
 * SharePosterWithRadar - D-MBTI 结果分享海报组件 (带雷达图)
 * 
 * 使用方法:
 * 1. 安装依赖: npm install html2canvas
 * 2. 导入组件: import SharePosterWithRadar from './SharePosterWithRadar'
 * 3. 传入数据: <SharePosterWithRadar data={resultData} />
 */

// ========== 雷达图组件 (内联，确保 html2canvas 截图完整) ==========
const RadarChart = ({ data, themeColor = "#6B66DA", fillColor = "rgba(107, 102, 218, 0.35)" }) => {
  const VIEWBOX_SIZE = 200;
  const CENTER = VIEWBOX_SIZE / 2;
  const MAX_RADIUS = 70;
  
  const scoreToRadius = (score) => (score / 100) * MAX_RADIUS;
  
  const getCoordinates = (radius, direction) => {
    switch (direction) {
      case 'top': return { x: CENTER, y: CENTER - radius };
      case 'right': return { x: CENTER + radius, y: CENTER };
      case 'bottom': return { x: CENTER, y: CENTER + radius };
      case 'left': return { x: CENTER - radius, y: CENTER };
      default: return { x: CENTER, y: CENTER };
    }
  };
  
  const dataPoints = {
    top: getCoordinates(scoreToRadius(data.top.score), 'top'),
    right: getCoordinates(scoreToRadius(data.right.score), 'right'),
    bottom: getCoordinates(scoreToRadius(data.bottom.score), 'bottom'),
    left: getCoordinates(scoreToRadius(data.left.score), 'left')
  };
  
  const polygonPoints = `${dataPoints.top.x},${dataPoints.top.y} ${dataPoints.right.x},${dataPoints.right.y} ${dataPoints.bottom.x},${dataPoints.bottom.y} ${dataPoints.left.x},${dataPoints.left.y}`;
  
  const gridLevels = [0.25, 0.5, 0.75, 1];
  const getGridPoints = (ratio) => {
    const r = MAX_RADIUS * ratio;
    const points = ['top', 'right', 'bottom', 'left'].map(dir => {
      const coords = getCoordinates(r, dir);
      return `${coords.x},${coords.y}`;
    });
    return points.join(' ');
  };
  
  const vertexPoints = {
    top: getCoordinates(MAX_RADIUS, 'top'),
    right: getCoordinates(MAX_RADIUS, 'right'),
    bottom: getCoordinates(MAX_RADIUS, 'bottom'),
    left: getCoordinates(MAX_RADIUS, 'left')
  };

  return (
    <svg viewBox={`0 0 ${VIEWBOX_SIZE} ${VIEWBOX_SIZE}`} className="w-full h-full">
      <defs>
        <radialGradient id="radarGradient" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor={themeColor} stopOpacity="0.6" />
          <stop offset="100%" stopColor={themeColor} stopOpacity="0.2" />
        </radialGradient>
        <radialGradient id="radarDotGradient" cx="30%" cy="30%" r="70%">
          <stop offset="0%" stopColor="#FFFFFF" />
          <stop offset="100%" stopColor={themeColor} />
        </radialGradient>
      </defs>
      
      {/* 网格层 */}
      {gridLevels.map((level, idx) => (
        <polygon key={idx} points={getGridPoints(level)} fill="none" stroke="#E2E8F0" strokeWidth="1" opacity={0.6 + idx * 0.1} />
      ))}
      
      {/* 坐标轴 */}
      <line x1={CENTER} y1={CENTER} x2={vertexPoints.top.x} y2={vertexPoints.top.y} stroke="#CBD5E1" strokeWidth="1" strokeDasharray="3 3" opacity="0.5" />
      <line x1={CENTER} y1={CENTER} x2={vertexPoints.right.x} y2={vertexPoints.right.y} stroke="#CBD5E1" strokeWidth="1" strokeDasharray="3 3" opacity="0.5" />
      <line x1={CENTER} y1={CENTER} x2={vertexPoints.bottom.x} y2={vertexPoints.bottom.y} stroke="#CBD5E1" strokeWidth="1" strokeDasharray="3 3" opacity="0.5" />
      <line x1={CENTER} y1={CENTER} x2={vertexPoints.left.x} y2={vertexPoints.left.y} stroke="#CBD5E1" strokeWidth="1" strokeDasharray="3 3" opacity="0.5" />
      
      {/* 数据多边形 */}
      <polygon points={polygonPoints} fill={fillColor} stroke={themeColor} strokeWidth="2.5" strokeLinejoin="round" />
      <polygon points={polygonPoints} fill="url(#radarGradient)" opacity="0.5" />
      
      {/* 顶点圆点 */}
      {Object.values(dataPoints).map((point, idx) => (
        <circle key={idx} cx={point.x} cy={point.y} r="4" fill="url(#radarDotGradient)" stroke={themeColor} strokeWidth="1.5" />
      ))}
      
      {/* 中心点 */}
      <circle cx={CENTER} cy={CENTER} r="2.5" fill={themeColor} opacity="0.3" />
    </svg>
  );
};

// ========== 性格小精灵 SVG ==========
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
  </svg>
);

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
  </svg>
);

const getSpriteByMBTI = (mbti) => {
  const first = mbti.charAt(0);
  return first === 'I' ? <ISpriteSVG /> : <ESpriteSVG />;
};

const SharePosterWithRadar = ({ 
  data = {
    dogName: 'Yoki',
    mbti: 'ENFP',
    title: '快乐小疯子',
    quote: '只要我跑得够快，烦恼就追不上我！',
    radarData: {
      top: { label: "社交能量", score: 90 },
      right: { label: "拆家指数", score: 85 },
      bottom: { label: "粘人程度", score: 70 },
      left: { label: "通人性", score: 40 }
    }
  }
}) => {
  const posterRef = useRef(null);

  const handleSavePoster = async () => {
    if (!posterRef.current) return;

    try {
      await document.fonts.ready;

      const canvas = await html2canvas(posterRef.current, {
        scale: 3,
        useCORS: true,
        backgroundColor: null,
        logging: false,
      });

      console.log('Canvas size:', canvas.width, 'x', canvas.height);

      const link = document.createElement('a');
      link.download = `${data.dogName}-DMBTI结果.png`;
      link.href = canvas.toDataURL('image/png', 1.0);
      link.click();

    } catch (error) {
      console.error('生成海报失败:', error);
      alert('保存失败，请重试');
    }
  };

  const { dogName, mbti, title, quote, radarData } = data;

  const getThemeColor = (mbti) => {
    const first = mbti.charAt(0);
    const second = mbti.charAt(1);
    if (first === 'E' && second === 'N') return { theme: '#FFD166', fill: 'rgba(255, 209, 102, 0.4)' };
    if (first === 'I') return { theme: '#4D96FF', fill: 'rgba(77, 150, 255, 0.4)' };
    if (first === 'E' && second === 'S') return { theme: '#FF6B6B', fill: 'rgba(255, 107, 107, 0.4)' };
    return { theme: '#6B66DA', fill: 'rgba(107, 102, 218, 0.4)' };
  };

  const { theme, fill } = getThemeColor(mbti);

  return (
    <div className="flex flex-col items-center gap-6 p-4 bg-gray-100 min-h-screen">
      {/* 海报容器 */}
      <div 
        ref={posterRef}
        id="share-poster"
        className="relative w-[360px] aspect-[9/19] bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500 rounded-3xl overflow-hidden shadow-2xl"
        style={{ aspectRatio: '9/19', width: '360px', height: '760px' }}
      >
        {/* 装饰背景 */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-10 left-6 w-3 h-3 bg-yellow-300 rounded-full opacity-70" />
          <div className="absolute top-24 right-8 w-4 h-4 bg-pink-300 rounded-full opacity-50" />
          <div className="absolute bottom-48 left-8 w-2 h-2 bg-cyan-300 rounded-full opacity-60" />
          <div className="absolute top-36 left-10 w-2 h-2 bg-white rounded-full opacity-40" />
        </div>

        {/* Header */}
        <div className="relative pt-8 pb-3 text-center">
          <p className="text-white/90 text-sm font-medium mb-2 tracking-wider">{dogName} 的专属灵魂鉴定</p>
          <div className="inline-block px-7 py-2 bg-gradient-to-r from-yellow-300 to-amber-400 rounded-full shadow-lg shadow-yellow-400/30">
            <span className="text-2xl font-black text-white tracking-widest">{mbti}</span>
          </div>
        </div>

        {/* 核心视觉区 */}
        <div className="mx-4 mb-3">
          <div className="bg-white rounded-[1.5rem] p-4 shadow-xl">
            {/* 小精灵 */}
            <div className="w-20 h-20 mx-auto mb-2">{getSpriteByMBTI(mbti)}</div>
            
            {/* 称号 */}
            <h2 className="text-xl font-black text-slate-800 text-center mb-1">{title}</h2>
            
            {/* 金句 */}
            <p className="text-slate-500 text-center italic text-xs px-2 mb-3">&quot;{quote}&quot;</p>

            {/* 雷达图数据可视化 */}
            <div className="bg-slate-50 rounded-xl p-3">
              <div className="flex items-center justify-center gap-3">
                {/* 左侧标签 */}
                <div className="text-right space-y-2">
                  <div><p className="text-[10px] font-bold text-slate-600">{radarData.top.label}</p><p className="text-xs font-black" style={{ color: theme }}>{radarData.top.score}%</p></div>
                  <div><p className="text-[10px] font-bold text-slate-600">{radarData.left.label}</p><p className="text-xs font-black" style={{ color: theme }}>{radarData.left.score}%</p></div>
                </div>
                
                {/* 雷达图 */}
                <div className="w-24 h-24"><RadarChart data={radarData} themeColor={theme} fillColor={fill} /></div>
                
                {/* 右侧标签 */}
                <div className="text-left space-y-2">
                  <div><p className="text-[10px] font-bold text-slate-600">{radarData.right.label}</p><p className="text-xs font-black" style={{ color: theme }}>{radarData.right.score}%</p></div>
                  <div><p className="text-[10px] font-bold text-slate-600">{radarData.bottom.label}</p><p className="text-xs font-black" style={{ color: theme }}>{radarData.bottom.score}%</p></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Match 区 */}
        <div className="mx-4 mb-3">
          <div className="bg-white/20 backdrop-blur-sm rounded-xl p-3 text-center">
            <p className="text-white text-xs mb-1">最佳人类伴侣：<span className="font-bold text-yellow-300">INTJ / INFJ</span></p>
            <p className="text-white/70 text-[10px] italic">&quot;建议主人多备点速效救心丸和耐咬胶 🦴&quot;</p>
          </div>
        </div>

        {/* Footer */}
        <div className="absolute bottom-0 left-0 right-0 px-4 pb-3 pt-2 bg-gradient-to-t from-black/30 to-transparent">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-white font-black text-base">D-MBTI</p>
              <p className="text-white/60 text-[9px]">狗狗性格测试</p>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-10 h-10 bg-white rounded-lg p-1 shadow-lg">
                <div className="w-full h-full bg-slate-800 rounded flex items-center justify-center">
                  <svg viewBox="0 0 32 32" className="w-6 h-6">
                    <rect x="4" y="4" width="8" height="8" fill="white"/>
                    <rect x="20" y="4" width="8" height="8" fill="white"/>
                    <rect x="4" y="20" width="8" height="8" fill="white"/>
                    <rect x="12" y="12" width="8" height="8" fill="white"/>
                    <rect x="20" y="20" width="8" height="8" fill="white"/>
                  </svg>
                </div>
              </div>
              <p className="text-white/70 text-[7px] mt-0.5">扫码测测你的狗</p>
            </div>
          </div>
        </div>
      </div>

      {/* 保存按钮 */}
      <button onClick={handleSavePoster} className="px-10 py-4 bg-gradient-to-r from-pink-400 via-rose-400 to-orange-400 text-white font-extrabold text-lg rounded-full shadow-xl shadow-pink-500/40 hover:scale-105 transition-all flex items-center gap-2">
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
        </svg>
        保存海报
      </button>
    </div>
  );
};

export default SharePosterWithRadar;
