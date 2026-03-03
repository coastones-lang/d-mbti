#!/bin/bash
# 启动 D-MBTI (后端 + 前端)

cd "$(dirname "$0")"

# 安装依赖
echo "安装依赖..."
pip3 install fastapi uvicorn pydantic python-multipart -q

echo ""
echo "🎉 启动成功！"
echo "访问地址: http://localhost:8001"
echo ""
echo "按 Ctrl+C 停止服务"
echo ""

cd backend
uvicorn main:app --reload --host 0.0.0.0 --port 8001
