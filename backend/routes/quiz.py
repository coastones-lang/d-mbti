from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from typing import List, Dict, Optional
from questions import questions

router = APIRouter()

# ========== 数据模型 ==========

class Answer(BaseModel):
    question_id: int
    option_index: int  # 0: 左, 1: 中, 2: 右


class Submission(BaseModel):
    dog_name: str = "Yoki"
    answers: List[Answer]


class ScoreResult(BaseModel):
    dimension: str
    score: float
    letter: str


class PersonalityResult(BaseModel):
    mbti_type: str
    description: str
    scores: List[ScoreResult]


# ========== 16型人格描述 ==========

PERSONALITY_DESCRIPTIONS = {
    # E + S + T + J
    "ESTJ": "🐕 领袖型小管家 - 稳重可靠，执行力强，是主人的小助手",
    "ESTP": "🐕 冒险家 - 活力四射，喜欢探索，随时准备出发",
    "ESFJ": "🐕 社交达人 - 热情友好，喜欢交狗狗朋友",
    "ESFP": "🐕 开心果 - 活泼开朗，走到哪都带来欢乐",
    
    # E + S + T + P
    "ENTJ": "🐕 指挥官 - 自信果断，有领导风范",
    "ENTP": "🐕 辩论家 - 聪明好奇，喜欢新鲜事物",
    "ENFJ": "🐕 主人公 - 温柔体贴，善于照顾小伙伴",
    "ENFP": "🐕 竞选者 - 热情洋溢，创造力满分",
    
    # I + S + T + J
    "ISTJ": "🐕 物流师 - 忠诚可靠，遵守规则",
    "ISTP": "🐕 鉴赏家 - 冷静观察，自在随性",
    "ISFJ": "🐕 守卫者 - 温柔细心，守护主人",
    "ISFP": "🐕 探险家 - 艺术气质，自由自在",
    
    # I + S + F + J
    "INTJ": "🐕 战略家 - 聪明独立，有自己的见解",
    "INTP": "🐕 逻辑学家 - 思考者，喜欢分析",
    "INFJ": "🐕 提倡者 - 敏感细腻，善解人意",
    "INFP": "🐕 调停者 - 温柔浪漫，内心丰富",
    
    # 自定义维度: A (Active) / C (Calm) 后缀
    "_active": "精力充沛的活跃小分子",
    "_calm": "安静沉稳的小天使"
}

# 简化版描述
SIMPLE_DESCRIPTIONS = {
    "E": "外向活泼，喜欢社交",
    "I": "内向安静，注重个人空间",
    "S": "脚踏实地，关注当下",
    "N": "直觉敏锐，喜欢想象",
    "T": "理性思考，注重逻辑",
    "F": "情感丰富，注重感受",
    "J": "有计划，有组织",
    "P": "灵活开放，随性自在",
    "A": "精力旺盛，活力满满",
    "C": "冷静沉稳，气定神闲"
}


# ========== 计分核心逻辑 ==========

def calculate_mbti(answers: List[Answer]) -> Dict[str, float]:
    """
    计算各维度的得分
    
    返回格式: {
        "E": -2,  # 负数偏向E，正数偏向I
        "S": 0,   # 负数偏向S，正数偏向N
        "T": -1,  # 负数偏向T，正数偏向F
        "J": 2,   # 负数偏向J，正数偏向P
        "A": -3,  # 负数偏向A，正数偏向C
    }
    """
    scores = {
        "E": 0, "S": 0, "T": 0, "J": 0, "A": 0,
        "I": 0, "N": 0, "F": 0, "P": 0, "C": 0
    }
    
    # 按维度分组统计
    dimension_questions = {
        "E": [], "I": [],
        "S": [], "N": [],
        "T": [], "F": [],
        "J": [], "P": [],
        "A": [], "C": []
    }
    
    # 收集每个问题对应的维度
    for q in questions["questions"]:
        cat = q["category"]
        for opt in q["options"]:
            dim = opt.get("dimension", "")
            if dim in dimension_questions:
                dimension_questions[dim].append({
                    "question_id": q["id"],
                    "score": opt["score"]
                })
    
    # 计算得分
    answer_map = {a.question_id: a.option_index for a in answers}
    
    for dim, q_list in dimension_questions.items():
        for q_info in q_list:
            qid = q_info["question_id"]
            if qid in answer_map:
                opt_idx = answer_map[qid]
                # 找到对应选项的分数
                for q in questions["questions"]:
                    if q["id"] == qid:
                        scores[dim] += q["options"][opt_idx]["score"]
                        break
    
    # 转换为float
    return {k: float(v) for k, v in scores.items()}


def get_dimension_letter(scores: Dict[str, float], dim_pair: tuple) -> str:
    """根据得分判断维度字母"""
    left, right = dim_pair
    total = scores.get(left, 0) + scores.get(right, 0)
    
    if total <= -2:
        return left
    elif total >= 2:
        return right
    else:
        # 中间值，根据哪个更强势判断
        if scores.get(left, 0) <= scores.get(right, 0):
            return right
        else:
            return left


def generate_mbti_type(scores: Dict[str, float]) -> tuple:
    """生成完整的MBTI类型"""
    # 标准4维
    e_or_i = get_dimension_letter(scores, ("E", "I"))
    s_or_n = get_dimension_letter(scores, ("S", "N"))
    t_or_f = get_dimension_letter(scores, ("T", "F"))
    j_or_p = get_dimension_letter(scores, ("J", "P"))
    
    base_type = e_or_i + s_or_n + t_or_f + j_or_p
    
    # 自定义维度: A/C
    a_or_c = get_dimension_letter(scores, ("A", "C"))
    
    return base_type, a_or_c


def get_result_description(mbti_type: str, suffix: str) -> str:
    """获取结果描述"""
    # 先查完整类型
    if mbti_type in PERSONALITY_DESCRIPTIONS:
        base_desc = PERSONALITY_DESCRIPTIONS[mbti_type]
    else:
        # 组合描述
        letters = list(mbti_type)
        desc_parts = []
        for letter in letters:
            if letter in SIMPLE_DESCRIPTIONS:
                desc_parts.append(SIMPLE_DESCRIPTIONS[letter])
        base_desc = "🐕 " + "，".join(desc_parts)
    
    # 添加精力后缀
    if suffix == "A":
        base_desc += f"\n{PERSONALITY_DESCRIPTIONS['_active']}"
    else:
        base_desc += f"\n{PERSONALITY_DESCRIPTIONS['_calm']}"
    
    return base_desc


# ========== API 端点 ==========

@router.post("/submit", response_model=PersonalityResult)
def submit_answers(submission: Submission):
    """
    提交答案，返回MBTI结果
    """
    # 验证答案数量
    if len(submission.answers) < 5:
        raise HTTPException(
            status_code=400, 
            detail="请至少回答5道题"
        )
    
    # 计算得分
    scores = calculate_mbti(submission.answers)
    
    # 生成MBTI类型
    mbti_type, energy_suffix = generate_mbti_type(scores)
    
    # 构建结果
    full_type = mbti_type + energy_suffix
    description = get_result_description(mbti_type, energy_suffix)
    
    # 详细分数
    score_results = [
        ScoreResult(
            dimension="外向-E / 内向-I",
            score=scores.get("E", 0) + scores.get("I", 0),
            letter=mbti_type[0]
        ),
        ScoreResult(
            dimension="感知-S / 直觉-N", 
            score=scores.get("S", 0) + scores.get("N", 0),
            letter=mbti_type[1]
        ),
        ScoreResult(
            dimension="思考-T / 情感-F",
            score=scores.get("T", 0) + scores.get("F", 0),
            letter=mbti_type[2]
        ),
        ScoreResult(
            dimension="判断-J / 知觉-P",
            score=scores.get("J", 0) + scores.get("P", 0),
            letter=mbti_type[3]
        ),
        ScoreResult(
            dimension="活跃-A / 冷静-C",
            score=scores.get("A", 0) + scores.get("C", 0),
            letter=energy_suffix
        )
    ]
    
    return PersonalityResult(
        mbti_type=full_type,
        description=description,
        scores=score_results
    )


@router.get("/categories")
def get_categories():
    """返回所有分类信息"""
    return {"categories": questions["categories"]}
