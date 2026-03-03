"""
D-MBTI 题目数据结构

维度映射:
- E/I: 外向性 (Extraversion vs Introversion)
- S/N: 感知方式 (Sensing vs Intuition)  
- T/F: 判断方式 (Thinking vs Feeling)
- J/P: 生活态度 (Judging vs Perceiving)
- A/C: 活跃度 (Active vs Calm) - 自定义维度

每题3个选项: 极左(-2), 中间(0), 极右(+2)
"""

questions = {
    "categories": [
        {"id": "social", "name": "社交性", "dimension": "E/I"},
        {"id": "perception", "name": "感知力", "dimension": "S/N"},
        {"id": "judgment", "name": "判断力", "dimension": "T/F"},
        {"id": "lifestyle", "name": "生活方式", "dimension": "J/P"},
        {"id": "energy", "name": "精力模式", "dimension": "A/C"}
    ],
    "questions": [
        # ========== 社交性 (Social - E/I) ==========
        {
            "id": 1,
            "category": "social",
            "question": "Yoki见到陌生人时，通常会：",
            "options": [
                {"text": "立刻冲上去热情打招呼，摇尾巴扑上去", "score": -2, "dimension": "E"},
                {"text": "保持距离，先观察一会儿再决定", "score": 2, "dimension": "I"},
                {"text": "平静地等待对方先示好", "score": 0, "dimension": "I"}
            ]
        },
        {
            "id": 2,
            "category": "social",
            "question": "带Yoki去狗公园玩，它更喜欢：",
            "options": [
                {"text": "和很多狗狗一起追逐打闹", "score": -2, "dimension": "E"},
                {"text": "和熟悉的狗狗朋友安静地待在一起", "score": 2, "dimension": "I"},
                {"text": "一会儿社交一会儿自己玩", "score": 0, "dimension": "E"}
            ]
        },
        {
            "id": 3,
            "category": "social",
            "question": "当主人回家时，Yoki的反应是：",
            "options": [
                {"text": "极度兴奋，扑跳、转圈、叫个不停", "score": -2, "dimension": "E"},
                {"text": "温柔地摇尾巴，平静地迎接", "score": 2, "dimension": "I"},
                {"text": "开心但比较克制", "score": 0, "dimension": "I"}
            ]
        },
        {
            "id": 4,
            "category": "social",
            "question": "Yoki在陌生环境中会：",
            "options": [
                {"text": "很快和周围的人狗打成一片", "score": -2, "dimension": "E"},
                {"text": "紧跟在主人身边，不敢离开", "score": 2, "dimension": "I"},
                {"text": "试探一会儿后开始探索", "score": 0, "dimension": "E"}
            ]
        },
        {
            "id": 5,
            "category": "social",
            "question": "Yoki对陌生人来访的态度：",
            "options": [
                {"text": "热烈欢迎，像见了老朋友", "score": -2, "dimension": "E"},
                {"text": "警惕地吠叫，需要时间接受", "score": 2, "dimension": "I"},
                {"text": "先观察，然后决定态度", "score": 0, "dimension": "I"}
            ]
        },
        {
            "id": 6,
            "category": "social",
            "question": "Yoki和其他狗狗互动时通常是：",
            "options": [
                {"text": "发起游戏的主导者", "score": -2, "dimension": "E"},
                {"text": "跟随者，等待对方主动", "score": 2, "dimension": "I"},
                {"text": "看情况，有时主动有时被动", "score": 0, "dimension": "E"}
            ]
        },
        {
            "id": 7,
            "category": "social",
            "question": "当Yoki独自在家时，它会：",
            "options": [
                {"text": "可能有点焦虑，需要安抚", "score": -2, "dimension": "E"},
                {"text": "安静地休息，自得其乐", "score": 2, "dimension": "I"},
                {"text": "有点不安但能适应", "score": 0, "dimension": "I"}
            ]
        },
        {
            "id": 8,
            "category": "social",
            "question": "Yoki在散步时遇到其他狗狗：",
            "options": [
                {"text": "强制拉绳子要过去打招呼", "score": -2, "dimension": "E"},
                {"text": "希望绕道走开", "score": 2, "dimension": "I"},
                {"text": "看对方态度再决定", "score": 0, "dimension": "I"}
            ]
        },

        # ========== 感知力 (Perception - S/N) ==========
        {
            "id": 9,
            "category": "perception",
            "question": "Yoki学习新技能时：",
            "options": [
                {"text": "通过反复练习记住动作", "score": -2, "dimension": "S"},
                {"text": "很快理解命令的含义", "score": 2, "dimension": "N"},
                {"text": "学习速度一般", "score": 0, "dimension": "S"}
            ]
        },
        {
            "id": 10,
            "category": "perception",
            "question": "Yoki对环境的感知更注重：",
            "options": [
                {"text": "实际的气味、声音、眼前的事物", "score": -2, "dimension": "S"},
                {"text": "整体氛围和人的情绪变化", "score": 2, "dimension": "N"},
                {"text": "两者都有注意", "score": 0, "dimension": "S"}
            ]
        },
        {
            "id": 11,
            "category": "perception",
            "question": "Yoki看到新玩具时首先：",
            "options": [
                {"text": "直接扑上去咬/玩", "score": -2, "dimension": "S"},
                {"text": "先闻一闻，观察一下", "score": 2, "dimension": "N"},
                {"text": "看看主人的反应再行动", "score": 0, "dimension": "N"}
            ]
        },
        {
            "id": 12,
            "category": "perception",
            "question": "Yoki能记住：",
            "options": [
                {"text": "经常走的路线和常去的地方", "score": -2, "dimension": "S"},
                {"text": "不同人的特点和互动方式", "score": 2, "dimension": "N"},
                {"text": "记得一些重要的事情", "score": 0, "dimension": "S"}
            ]
        },
        {
            "id": 13,
            "category": "perception",
            "question": "面对突发事件，Yoki会：",
            "options": [
                {"text": "立刻根据当下情况做出反应", "score": -2, "dimension": "S"},
                {"text": "思考一下再行动", "score": 2, "dimension": "N"},
                {"text": "看情况反应", "score": 0, "dimension": "S"}
            ]
        },
        {
            "id": 14,
            "category": "perception",
            "question": "Yoki更擅长：",
            "options": [
                {"text": "执行熟悉的命令和任务", "score": -2, "dimension": "S"},
                {"text": "理解主人的意图和情绪", "score": 2, "dimension": "N"},
                {"text": "两者差不多", "score": 0, "dimension": "S"}
            ]
        },
        {
            "id": 15,
            "category": "perception",
            "question": "Yoki对奖励的理解是：",
            "options": [
                {"text": "零食=好，惩罚=不好", "score": -2, "dimension": "S"},
                {"text": "主人的态度和情绪变化", "score": 2, "dimension": "N"},
                {"text": "两者都有理解", "score": 0, "dimension": "S"}
            ]
        },

        # ========== 判断力 (Judgment - T/F) ==========
        {
            "id": 16,
            "category": "judgment",
            "question": "Yoki犯错被批评时的反应：",
            "options": [
                {"text": "明显表现出愧疚和内疚", "score": -2, "dimension": "F"},
                {"text": "困惑或无所谓的样子", "score": 2, "dimension": "T"},
                {"text": "看主人态度决定", "score": 0, "dimension": "F"}
            ]
        },
        {
            "id": 17,
            "category": "judgment",
            "question": "Yoki对其他狗狗受伤时的态度：",
            "options": [
                {"text": "表现出关心，试图安慰", "score": -2, "dimension": "F"},
                {"text": "继续自己的事情", "score": 2, "dimension": "T"},
                {"text": "好奇但有点关心", "score": 0, "dimension": "F"}
            ]
        },
        {
            "id": 18,
            "category": "judgment",
            "question": "训练时Yoki更在意：",
            "options": [
                {"text": "主人的赞美和抚摸", "score": -2, "dimension": "F"},
                {"text": "是否完成了任务得到奖励", "score": 2, "dimension": "T"},
                {"text": "两者都重要", "score": 0, "dimension": "F"}
            ]
        },
        {
            "id": 19,
            "category": "judgment",
            "question": "Yoki在冲突中会：",
            "options": [
                {"text": "尝试调和或安慰双方", "score": -2, "dimension": "F"},
                {"text": "按照规则决定谁对谁错", "score": 2, "dimension": "T"},
                {"text": "看情况决定", "score": 0, "dimension": "F"}
            ]
        },
        {
            "id": 20,
            "category": "judgment",
            "question": "Yoki选择玩具时更看重：",
            "options": [
                {"text": "好玩带来的快乐", "score": -2, "dimension": "F"},
                {"text": "能展示自己的能力", "score": 2, "dimension": "T"},
                {"text": "看心情", "score": 0, "dimension": "F"}
            ]
        },
        {
            "id": 21,
            "category": "judgment",
            "question": "当主人情绪低落时，Yoki会：",
            "options": [
                {"text": "主动靠近，陪伴安慰", "score": -2, "dimension": "F"},
                {"text": "继续做自己的事", "score": 2, "dimension": "T"},
                {"text": "有点不知所措", "score": 0, "dimension": "F"}
            ]
        },
        {
            "id": 22,
            "category": "judgment",
            "question": "Yoki对规则的接受程度：",
            "options": [
                {"text": "喜欢一致性和安全感", "score": -2, "dimension": "F"},
                {"text": "更关注规则是否合理", "score": 2, "dimension": "T"},
                {"text": "看情况接受", "score": 0, "dimension": "F"}
            ]
        },

        # ========== 生活方式 (Lifestyle - J/P) ==========
        {
            "id": 23,
            "category": "lifestyle",
            "question": "Yoki对散步路线的态度：",
            "options": [
                {"text": "喜欢走固定的路线", "score": -2, "dimension": "J"},
                {"text": "喜欢探索新路线和气味", "score": 2, "dimension": "P"},
                {"text": "都可以", "score": 0, "dimension": "J"}
            ]
        },
        {
            "id": 24,
            "category": "lifestyle",
            "question": "Yoki吃饭的习惯：",
            "options": [
                {"text": "定时定点，胃口稳定", "score": -2, "dimension": "J"},
                {"text": "有时吃有时不吃，挑食", "score": 2, "dimension": "P"},
                {"text": "大体定时，偶尔变化", "score": 0, "dimension": "J"}
            ]
        },
        {
            "id": 25,
            "category": "lifestyle",
            "question": "Yoki对日程变化的反应：",
            "options": [
                {"text": "很快适应固定的作息", "score": -2, "dimension": "J"},
                {"text": "需要时间适应变化", "score": 2, "dimension": "P"},
                {"text": "适应能力一般", "score": 0, "dimension": "J"}
            ]
        },
        {
            "id": 26,
            "category": "lifestyle",
            "question": "Yoki玩耍时的风格：",
            "options": [
                {"text": "有明确的开始和结束", "score": -2, "dimension": "J"},
                {"text": "想玩就玩，随时开始和停止", "score": 2, "dimension": "P"},
                {"text": "看情况", "score": 0, "dimension": "J"}
            ]
        },
        {
            "id": 27,
            "category": "lifestyle",
            "question": "Yoki对指令的响应：",
            "options": [
                {"text": "等待明确指令再行动", "score": -2, "dimension": "J"},
                {"text": "自己判断该做什么", "score": 2, "dimension": "P"},
                {"text": "看情况", "score": 0, "dimension": "J"}
            ]
        },
        {
            "id": 28,
            "category": "lifestyle",
            "question": "Yoki睡觉的地方：",
            "options": [
                {"text": "喜欢固定的睡觉位置", "score": -2, "dimension": "J"},
                {"text": "哪里都能睡，很随意", "score": 2, "dimension": "P"},
                {"text": "一般有偏好但也能变通", "score": 0, "dimension": "J"}
            ]
        },
        {
            "id": 29,
            "category": "lifestyle",
            "question": "Yoki对训练新技能的态度：",
            "options": [
                {"text": "喜欢掌握后的稳定感", "score": -2, "dimension": "J"},
                {"text": "喜欢学习新东西的新鲜感", "score": 2, "dimension": "P"},
                {"text": "都可以", "score": 0, "dimension": "J"}
            ]
        },

        # ========== 精力模式 (Energy - A/C) ==========
        {
            "id": 30,
            "category": "energy",
            "question": "Yoki日常的精力水平：",
            "options": [
                {"text": "非常活跃，好像永远用不完", "score": -2, "dimension": "A"},
                {"text": "相对平静，喜欢休息", "score": 2, "dimension": "C"},
                {"text": "一般水平", "score": 0, "dimension": "A"}
            ]
        },
        {
            "id": 31,
            "category": "energy",
            "question": "Yoki早上起床后的状态：",
            "options": [
                {"text": "立刻清醒，精力充沛", "score": -2, "dimension": "A"},
                {"text": "需要一点时间清醒", "score": 2, "dimension": "C"},
                {"text": "慢慢清醒", "score": 0, "dimension": "A"}
            ]
        },
        {
            "id": 32,
            "category": "energy",
            "question": "Yoki对运动的需求：",
            "options": [
                {"text": "需要大量运动来消耗精力", "score": -2, "dimension": "A"},
                {"text": "适度运动即可，容易满足", "score": 2, "dimension": "C"},
                {"text": "看情况", "score": 0, "dimension": "A"}
            ]
        },
        {
            "id": 33,
            "category": "energy",
            "question": "Yoki兴奋时的表现：",
            "options": [
                {"text": "跳来跳去，停不下来", "score": -2, "dimension": "A"},
                {"text": "开心但比较克制", "score": 2, "dimension": "C"},
                {"text": "有点兴奋但能控制", "score": 0, "dimension": "A"}
            ]
        },
        {
            "id": 34,
            "category": "energy",
            "question": "Yoki独自玩耍时：",
            "options": [
                {"text": "会自己找各种活动", "score": -2, "dimension": "A"},
                {"text": "更多是休息或发呆", "score": 2, "dimension": "C"},
                {"text": "有时玩有时休息", "score": 0, "dimension": "A"}
            ]
        },
        {
            "id": 35,
            "category": "energy",
            "question": "Yoki在户外的状态：",
            "options": [
                {"text": "非常激动，充满活力", "score": -2, "dimension": "A"},
                {"text": "相对稳重，慢慢探索", "score": 2, "dimension": "C"},
                {"text": "看情况兴奋程度", "score": 0, "dimension": "A"}
            ]
        },
        {
            "id": 36,
            "category": "energy",
            "question": "Yoki一天中清醒的时间：",
            "options": [
                {"text": "大部分时间都清醒活跃", "score": -2, "dimension": "A"},
                {"text": "经常睡觉，动静皆宜", "score": 2, "dimension": "C"},
                {"text": "一般水平", "score": 0, "dimension": "A"}
            ]
        },
        {
            "id": 37,
            "category": "energy",
            "question": "Yoki遇到感兴趣的事物时：",
            "options": [
                {"text": "立刻扑上去，行动派", "score": -2, "dimension": "A"},
                {"text": "慢慢靠近，仔细观察", "score": 2, "dimension": "C"},
                {"text": "看情况决定速度", "score": 0, "dimension": "A"}
            ]
        },
        
        # 额外题目补充到40道
        {
            "id": 38,
            "category": "social",
            "question": "Yoki独处时的表现：",
            "options": [
                {"text": "喜欢有人陪伴，不喜欢孤单", "score": -2, "dimension": "E"},
                {"text": "能很好地享受独处时光", "score": 2, "dimension": "I"},
                {"text": "都可以，能适应", "score": 0, "dimension": "I"}
            ]
        },
        {
            "id": 39,
            "category": "lifestyle",
            "question": "Yoki对新环境的适应速度：",
            "options": [
                {"text": "需要时间慢慢适应", "score": -2, "dimension": "J"},
                {"text": "很快就能融入新环境", "score": 2, "dimension": "P"},
                {"text": "适应速度一般", "score": 0, "dimension": "J"}
            ]
        },
        {
            "id": 40,
            "category": "energy",
            "question": "Yoki对刺激的反应：",
            "options": [
                {"text": "反应强烈，激动不已", "score": -2, "dimension": "A"},
                {"text": "反应平和，沉着应对", "score": 2, "dimension": "C"},
                {"text": "反应一般", "score": 0, "dimension": "A"}
            ]
        }
    ]
}
