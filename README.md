# 🐕 D-MBTI 狗狗性格测试

基于 16 型人格的狗狗性格测评工具。

## 技术栈

- **后端**: Python FastAPI
- **前端**: HTML + TailwindCSS (原生，无构建)
- **数据结构**: 40 道题目，5 个维度

## 项目结构

```
d-mbti/
├── backend/
│   ├── main.py          # FastAPI 应用入口
│   ├── questions.py    # 题目数据 (40题)
│   ├── requirements.txt # Python 依赖
│   └── routes/
│       └── quiz.py      # 计分逻辑 API
├── frontend/
│   └── index.html       # 响应式前端页面
├── start.sh            # 启动脚本
└── README.md
```

## 快速开始

### 1. 启动后端

```bash
cd d-mbti
./start.sh
```

或手动:

```bash
cd d-mbti/backend
pip install -r requirements.txt
uvicorn main:app --reload --host 0.0.0.0 --port 8000
```

### 2. 启动前端

使用任意静态服务器:

```bash
# Python 内置服务器
cd d-mbti/frontend
python -m http.server 8080

# 或使用 VS Code Live Server 插件打开 index.html
```

访问: http://localhost:8080

## API 接口

| 方法 | 路径 | 说明 |
|-----|------|------|
| GET | `/questions` | 获取所有题目 |
| GET | `/categories` | 获取分类信息 |
| POST | `/api/submit` | 提交答案，获取结果 |

## 题目维度

| 维度 | 说明 | 对应 MBTI |
|-----|------|----------|
| 社交性 | 外向 vs 内向 | E / I |
| 感知力 | 实际 vs 直觉 | S / N |
| 判断力 | 理性 vs 情感 | T / F |
| 生活方式 | 判断 vs 知觉 | J / P |
| 精力模式 | 活跃 vs 冷静 | A / C (自定义) |

## 默认测试狗狗

名字: **Yoki**

## 截图

(待添加)

## License

MIT
