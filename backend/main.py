from fastapi import FastAPI
from fastapi.staticfiles import StaticFiles
from fastapi.responses import HTMLResponse
import os
from pydantic import BaseModel
from typing import List, Optional
from questions import questions
from routes import quiz

app = FastAPI(title="D-MBTI API", version="1.0.0")

# 获取前端文件路径
FRONTEND_DIR = os.path.join(os.path.dirname(os.path.dirname(__file__)), "frontend")

# 挂载静态文件
app.mount("/static", StaticFiles(directory=FRONTEND_DIR), name="static")

# 提供前端页面
@app.get("/", response_class=HTMLResponse)
async def root():
    index_path = os.path.join(FRONTEND_DIR, "index.html")
    with open(index_path, "r", encoding="utf-8") as f:
        return f.read()

app.include_router(quiz.router, prefix="/api", tags=["quiz"])

@app.get("/api/questions")
def get_questions():
    """返回所有题目"""
    return {"questions": questions}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8001)
