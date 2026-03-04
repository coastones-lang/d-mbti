#!/bin/bash
# D-MBTI 一键部署脚本
# 使用 ngrok 快速暴露本地服务

echo "🐕 D-MBTI 部署工具"
echo "=================="

# 检查 ngrok
if ! command -v ngrok &> /dev/null; then
    echo "📦 正在安装 ngrok..."
    if [[ "$OSTYPE" == "darwin"* ]]; then
        brew install ngrok
    else
        curl -s https://ngrok-agent.s3.amazonaws.com/ngrok.asc | sudo tee /etc/apt/trusted.gpg.d/ngrok.asc >/dev/null
        echo "deb https://ngrok-agent.s3.amazonaws.com buster main" | sudo tee /etc/apt/sources.list.d/ngrok.list
        sudo apt update && sudo apt install ngrok
    fi
fi

# 检查后端
if ! pgrep -f "uvicorn main:app" > /dev/null; then
    echo "🚀 启动后端服务..."
    cd "$(dirname "$0")/backend"
    pip install -q fastapi uvicorn pydantic
    uvicorn main:app --host 0.0.0.0 --port 8001 &
    sleep 3
fi

# 启动 ngrok
echo "🌐 启动 ngrok 隧道..."
echo ""
echo "正在生成公网访问链接..."
echo ""

cd "$(dirname "$0")"
ngrok http 8001 --domain=d-mbti.ngrok.dev 2>/dev/null || ngrok http 8001
