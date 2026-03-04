import React from 'react';
import RadarChart from './RadarChart';

/**
 * RadarChartDemo - 雷达图组件预览用例
 * 
 * 展示 Yoki 的 ENFP 性格雷达图
 */

const RadarChartDemo = () => {
  // Yoki 的测试数据
  const yokiData = {
    top: { label: "社交能量", score: 90 },
    right: { label: "拆家指数", score: 85 },
    bottom: { label: "粘人程度", score: 70 },
    left: { label: "通人性", score: 40 }
  };

  // 其他测试用例数据
  const testCases = [
    {
      name: "Yoki (ENFP)",
      data: yokiData,
      theme: "#6B66DA",
      fill: "rgba(107, 102, 218, 0.35)"
    },
    {
      name: "豆豆 (ISTJ)",
      data: {
        top: { label: "社交能量", score: 30 },
        right: { label: "拆家指数", score: 20 },
        bottom: { label: "粘人程度", score: 60 },
        left: { label: "通人性", score: 85 }
      },
      theme: "#4D96FF",
      fill: "rgba(77, 150, 255, 0.35)"
    },
    {
      name: "旺财 (ESTP)",
      data: {
        top: { label: "社交能量", score: 95 },
        right: { label: "拆家指数", score: 90 },
        bottom: { label: "粘人程度", score: 40 },
        left: { label: "通人性", score: 50 }
      },
      theme: "#FF6B6B",
      fill: "rgba(255, 107, 107, 0.35)"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-slate-800 mb-2">
          RadarChart 雷达图组件
        </h1>
        <p className="text-slate-500 mb-8">
          纯 SVG 实现，无第三方依赖，适用于 D-MBTI 性格测试结果展示
        </p>

        {/* 主要展示 - Yoki */}
        <div className="bg-white rounded-3xl shadow-xl p-8 mb-8">
          <h2 className="text-xl font-bold text-slate-700 mb-6 flex items-center gap-2">
            <span className="w-8 h-8 bg-indigo-500 rounded-full flex items-center justify-center text-white text-sm">
              1
            </span>
            Yoki 的 ENFP 性格雷达
          </h2>
          
          <div className="flex flex-col md:flex-row items-center gap-8">
            {/* 雷达图 */}
            <div className="w-80 h-80">
              <RadarChart 
                data={yokiData}
                themeColor="#6B66DA"
                fillColor="rgba(107, 102, 218, 0.35)"
              />
            </div>
            
            {/* 数据说明 */}
            <div className="flex-1 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-indigo-50 rounded-xl p-4">
                  <p className="text-indigo-600 text-sm font-medium mb-1">社交能量</p>
                  <p className="text-2xl font-bold text-indigo-700">90%</p>
                  <div className="w-full h-2 bg-indigo-100 rounded-full mt-2">
                    <div className="w-[90%] h-full bg-indigo-500 rounded-full" />
                  </div>
                </div>
                <div className="bg-rose-50 rounded-xl p-4">
                  <p className="text-rose-600 text-sm font-medium mb-1">拆家指数</p>
                  <p className="text-2xl font-bold text-rose-700">85%</p>
                  <div className="w-full h-2 bg-rose-100 rounded-full mt-2">
                    <div className="w-[85%] h-full bg-rose-500 rounded-full" />
                  </div>
                </div>
                <div className="bg-pink-50 rounded-xl p-4">
                  <p className="text-pink-600 text-sm font-medium mb-1">粘人程度</p>
                  <p className="text-2xl font-bold text-pink-700">70%</p>
                  <div className="w-full h-2 bg-pink-100 rounded-full mt-2">
                    <div className="w-[70%] h-full bg-pink-500 rounded-full" />
                  </div>
                </div>
                <div className="bg-teal-50 rounded-xl p-4">
                  <p className="text-teal-600 text-sm font-medium mb-1">通人性</p>
                  <p className="text-2xl font-bold text-teal-700">40%</p>
                  <div className="w-full h-2 bg-teal-100 rounded-full mt-2">
                    <div className="w-[40%] h-full bg-teal-500 rounded-full" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 多主题对比 */}
        <div className="grid md:grid-cols-3 gap-6">
          {testCases.map((testCase, index) => (
            <div key={index} className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="text-lg font-bold text-slate-700 mb-4 text-center">
                {testCase.name}
              </h3>
              <div className="w-48 h-48 mx-auto">
                <RadarChart 
                  data={testCase.data}
                  themeColor={testCase.theme}
                  fillColor={testCase.fill}
                />
              </div>
            </div>
          ))}
        </div>

        {/* 组件使用说明 */}
        <div className="mt-8 bg-slate-800 rounded-2xl p-6 text-white">
          <h3 className="text-lg font-bold mb-4">组件使用</h3>
          <pre className="bg-slate-900 rounded-lg p-4 text-sm overflow-x-auto">
{`import RadarChart from './RadarChart';

// 基础用法
<RadarChart 
  data={{
    top: { label: "社交能量", score: 90 },
    right: { label: "拆家指数", score: 85 },
    bottom: { label: "粘人程度", score: 70 },
    left: { label: "通人性", score: 40 }
  }}
  themeColor="#6B66DA"
  fillColor="rgba(107, 102, 218, 0.35)"
/>`}
          </pre>
        </div>
      </div>
    </div>
  );
};

export default RadarChartDemo;
