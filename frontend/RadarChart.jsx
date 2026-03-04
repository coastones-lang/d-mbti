import React from 'react';

/**
 * RadarChart - 纯 SVG 四维雷达图组件
 * 
 * 纯手工 SVG 实现，无第三方依赖
 * 适用于 D-MBTI 性格测试结果展示
 */

const RadarChart = ({ 
  data = {
    top: { label: "社交能量", score: 90 },
    right: { label: "拆家指数", score: 85 },
    bottom: { label: "粘人程度", score: 70 },
    left: { label: "通人性", score: 40 }
  },
  themeColor = "#6B66DA",
  fillColor = "rgba(107, 102, 218, 0.35)"
}) => {
  // SVG 画布配置
  const VIEWBOX_SIZE = 240;
  const CENTER = VIEWBOX_SIZE / 2; // 120
  const MAX_RADIUS = 80;
  
  // 将 0-100 分数映射到 0-80 半径
  const scoreToRadius = (score) => (score / 100) * MAX_RADIUS;
  
  // 四个方向的坐标计算
  const getCoordinates = (radius, direction) => {
    switch (direction) {
      case 'top':
        return { x: CENTER, y: CENTER - radius };
      case 'right':
        return { x: CENTER + radius, y: CENTER };
      case 'bottom':
        return { x: CENTER, y: CENTER + radius };
      case 'left':
        return { x: CENTER - radius, y: CENTER };
      default:
        return { x: CENTER, y: CENTER };
    }
  };
  
  // 计算数据多边形的四个顶点
  const dataPoints = {
    top: getCoordinates(scoreToRadius(data.top.score), 'top'),
    right: getCoordinates(scoreToRadius(data.right.score), 'right'),
    bottom: getCoordinates(scoreToRadius(data.bottom.score), 'bottom'),
    left: getCoordinates(scoreToRadius(data.left.score), 'left')
  };
  
  // 构建多边形的 points 字符串
  const polygonPoints = `
    ${dataPoints.top.x},${dataPoints.top.y} 
    ${dataPoints.right.x},${dataPoints.right.y} 
    ${dataPoints.bottom.x},${dataPoints.bottom.y} 
    ${dataPoints.left.x},${dataPoints.left.y}
  `;
  
  // 网格层配置 (25%, 50%, 75%, 100%)
  const gridLevels = [0.25, 0.5, 0.75, 1];
  
  // 计算网格菱形坐标
  const getGridPoints = (ratio) => {
    const r = MAX_RADIUS * ratio;
    const top = getCoordinates(r, 'top');
    const right = getCoordinates(r, 'right');
    const bottom = getCoordinates(r, 'bottom');
    const left = getCoordinates(r, 'left');
    return `${top.x},${top.y} ${right.x},${right.y} ${bottom.x},${bottom.y} ${left.x},${left.y}`;
  };
  
  // 四个顶点的坐标 (用于坐标轴和标签)
  const vertexPoints = {
    top: getCoordinates(MAX_RADIUS, 'top'),
    right: getCoordinates(MAX_RADIUS, 'right'),
    bottom: getCoordinates(MAX_RADIUS, 'bottom'),
    left: getCoordinates(MAX_RADIUS, 'left')
  };
  
  // 标签位置 (稍微向外偏移)
  const labelOffset = 20;
  const labelPositions = {
    top: { x: CENTER, y: vertexPoints.top.y - labelOffset },
    right: { x: vertexPoints.right.x + labelOffset, y: CENTER },
    bottom: { x: CENTER, y: vertexPoints.bottom.y + labelOffset + 5 },
    left: { x: vertexPoints.left.x - labelOffset, y: CENTER }
  };

  return (
    <svg 
      viewBox={`0 0 ${VIEWBOX_SIZE} ${VIEWBOX_SIZE}`} 
      className="w-full h-full"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* 定义渐变和滤镜 */}
      <defs>
        {/* 数据区域渐变 */}
        <radialGradient id="dataGradient" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor={themeColor} stopOpacity="0.6" />
          <stop offset="100%" stopColor={themeColor} stopOpacity="0.2" />
        </radialGradient>
        
        {/* 发光滤镜 */}
        <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="2" result="coloredBlur" />
          <feMerge>
            <feMergeNode in="coloredBlur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        
        {/* 顶点高光渐变 */}
        <radialGradient id="dotGradient" cx="30%" cy="30%" r="70%">
          <stop offset="0%" stopColor="#FFFFFF" />
          <stop offset="100%" stopColor={themeColor} />
        </radialGradient>
      </defs>
      
      {/* 1. 背景网格层 - 同心菱形 */}
      {gridLevels.map((level, index) => (
        <polygon
          key={index}
          points={getGridPoints(level)}
          fill="none"
          stroke="#E2E8F0"
          strokeWidth="1"
          opacity={0.6 + index * 0.1}
        />
      ))}
      
      {/* 2. 坐标轴 - 4条虚线 */}
      <line
        x1={CENTER} y1={CENTER}
        x2={vertexPoints.top.x} y2={vertexPoints.top.y}
        stroke="#CBD5E1"
        strokeWidth="1"
        strokeDasharray="4 4"
        opacity="0.5"
      />
      <line
        x1={CENTER} y1={CENTER}
        x2={vertexPoints.right.x} y2={vertexPoints.right.y}
        stroke="#CBD5E1"
        strokeWidth="1"
        strokeDasharray="4 4"
        opacity="0.5"
      />
      <line
        x1={CENTER} y1={CENTER}
        x2={vertexPoints.bottom.x} y2={vertexPoints.bottom.y}
        stroke="#CBD5E1"
        strokeWidth="1"
        strokeDasharray="4 4"
        opacity="0.5"
      />
      <line
        x1={CENTER} y1={CENTER}
        x2={vertexPoints.left.x} y2={vertexPoints.left.y}
        stroke="#CBD5E1"
        strokeWidth="1"
        strokeDasharray="4 4"
        opacity="0.5"
      />
      
      {/* 3. 数据多边形 */}
      <polygon
        points={polygonPoints}
        fill={fillColor}
        stroke={themeColor}
        strokeWidth="3"
        strokeLinejoin="round"
        filter="url(#glow)"
        className="transition-all duration-500 ease-out"
      />
      
      {/* 数据区域内部装饰 - 半透明叠加层 */}
      <polygon
        points={polygonPoints}
        fill="url(#dataGradient)"
        opacity="0.5"
        className="transition-all duration-500 ease-out"
      />
      
      {/* 4. 顶点高亮圆点 */}
      <circle
        cx={dataPoints.top.x}
        cy={dataPoints.top.y}
        r="5"
        fill="url(#dotGradient)"
        stroke={themeColor}
        strokeWidth="2"
        filter="url(#glow)"
      />
      <circle
        cx={dataPoints.right.x}
        cy={dataPoints.right.y}
        r="5"
        fill="url(#dotGradient)"
        stroke={themeColor}
        strokeWidth="2"
        filter="url(#glow)"
      />
      <circle
        cx={dataPoints.bottom.x}
        cy={dataPoints.bottom.y}
        r="5"
        fill="url(#dotGradient)"
        stroke={themeColor}
        strokeWidth="2"
        filter="url(#glow)"
      />
      <circle
        cx={dataPoints.left.x}
        cy={dataPoints.left.y}
        r="5"
        fill="url(#dotGradient)"
        stroke={themeColor}
        strokeWidth="2"
        filter="url(#glow)"
      />
      
      {/* 中心点 */}
      <circle
        cx={CENTER}
        cy={CENTER}
        r="3"
        fill={themeColor}
        opacity="0.3"
      />
      
      {/* 5. 文本标签 */}
      {/* 上方标签 - 社交能量 */}
      <text
        x={labelPositions.top.x}
        y={labelPositions.top.y}
        textAnchor="middle"
        fontSize="12"
        fontWeight="bold"
        fill="#334155"
      >
        {data.top.label}
      </text>
      <text
        x={labelPositions.top.x}
        y={labelPositions.top.y + 14}
        textAnchor="middle"
        fontSize="11"
        fontWeight="800"
        fill={themeColor}
      >
        {data.top.score}%
      </text>
      
      {/* 右方标签 - 拆家指数 */}
      <text
        x={labelPositions.right.x}
        y={labelPositions.right.y - 6}
        textAnchor="start"
        fontSize="12"
        fontWeight="bold"
        fill="#334155"
      >
        {data.right.label}
      </text>
      <text
        x={labelPositions.right.x}
        y={labelPositions.right.y + 10}
        textAnchor="start"
        fontSize="11"
        fontWeight="800"
        fill={themeColor}
      >
        {data.right.score}%
      </text>
      
      {/* 下方标签 - 粘人程度 */}
      <text
        x={labelPositions.bottom.x}
        y={labelPositions.bottom.y}
        textAnchor="middle"
        fontSize="12"
        fontWeight="bold"
        fill="#334155"
      >
        {data.bottom.label}
      </text>
      <text
        x={labelPositions.bottom.x}
        y={labelPositions.bottom.y + 14}
        textAnchor="middle"
        fontSize="11"
        fontWeight="800"
        fill={themeColor}
      >
        {data.bottom.score}%
      </text>
      
      {/* 左方标签 - 通人性 */}
      <text
        x={labelPositions.left.x}
        y={labelPositions.left.y - 6}
        textAnchor="end"
        fontSize="12"
        fontWeight="bold"
        fill="#334155"
      >
        {data.left.label}
      </text>
      <text
        x={labelPositions.left.x}
        y={labelPositions.left.y + 10}
        textAnchor="end"
        fontSize="11"
        fontWeight="800"
        fill={themeColor}
      >
        {data.left.score}%
      </text>
    </svg>
  );
};

export default RadarChart;
