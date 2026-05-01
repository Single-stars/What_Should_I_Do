const startScreen = document.querySelector("#start-screen");
const quizScreen = document.querySelector("#quiz-screen");
const resultScreen = document.querySelector("#result-screen");
const startButton = document.querySelector("#start-button");
const backButton = document.querySelector("#back-button");
const restartButton = document.querySelector("#restart-button");
const shareButton = document.querySelector("#share-button");
const questionTitle = document.querySelector("#question-title");
const questionKicker = document.querySelector("#question-kicker");
const optionsGrid = document.querySelector("#options-grid");
const stepCount = document.querySelector("#step-count");
const progressLabel = document.querySelector("#progress-label");
const progressFill = document.querySelector("#progress-fill");
const toast = document.querySelector("#toast");

const resultType = document.querySelector("#result-type");
const resultTitle = document.querySelector("#result-title");
const resultSummary = document.querySelector("#result-summary");
const resultToday = document.querySelector("#result-today");
const resultAvoid = document.querySelector("#result-avoid");
const resultSteps = document.querySelector("#result-steps");
const shareTag = document.querySelector("#share-tag");
const shareTitle = document.querySelector("#share-title");
const shareNote = document.querySelector("#share-note");

const resultMap = {
  info: {
    label: "信息缺口型",
    title: "是时候去找一个真实的人聊聊了！",
    summary:
      "你现在不是缺少努力，而是缺少真实信息。继续在脑子里想，只会把想象放大；你需要让现实给你反馈。",
    today: "选一个你想了解的方向，约一个正在做这件事的人，问 5 个具体问题。",
    avoid: "继续刷经验帖，然后把别人的人生当成自己的答案。",
    steps: [
      "写下你最想确认的 1 个方向，不要超过 12 个字。",
      "找到 1 个真实从业者、学长学姐或朋友的朋友，发出一条简短求教消息。",
      "准备 5 个问题：日常做什么、最难的部分、入门门槛、真实收入或回报、是否建议新人进入。",
    ],
  },
  overload: {
    label: "选择过载型",
    title: "是时候把选择缩到 3 个以内了！",
    summary:
      "你不是没有选择，而是选择太多导致每一个都无法开始。现在最重要的不是找到完美答案，而是先减少噪音。",
    today: "列出所有选项，删到只剩 3 个，再给每个选项写一个最小验证动作。",
    avoid: "为了不后悔而继续收集更多选项。",
    steps: [
      "把所有方向写出来，包括那些你只是随口想过的。",
      "用两个标准筛掉：现在完全做不了、其实不想付出代价。",
      "给剩下 3 个方向各安排一个 30 分钟验证动作。",
    ],
  },
  expectation: {
    label: "外界期待型",
    title: "是时候从别人的期待里退出来了！",
    summary:
      "你的迷茫里混进了太多别人的声音。你不需要马上对抗谁，但需要先把自己的判断从外界期待里分离出来。",
    today: "写两列清单：我真正想要的、别人希望我做到的。只保留你愿意承担代价的部分。",
    avoid: "用讨好别人来换短暂安全感。",
    steps: [
      "找一张纸分成两列，左边写“我想要”，右边写“别人希望我”。",
      "圈出你愿意为它付出 6 个月的 1 件事。",
      "把其他期待改写成“我可以考虑，但不自动接受”。",
    ],
  },
  energy: {
    label: "低能量停滞型",
    title: "是时候停下无效努力，先恢复能量了！",
    summary:
      "你现在做重大人生决策的条件并不好。先把睡眠、节律和身体感受拉回来，比逼自己想清楚更有效。",
    today: "今天只做一件恢复节律的小事：洗澡、散步 20 分钟、早点睡，三选一。",
    avoid: "在极度疲惫时逼自己决定未来几年的人生。",
    steps: [
      "把今天的任务压缩到 1 件必须完成的小事。",
      "安排 20 分钟不带目的的走路或整理房间。",
      "睡前写下明天只需要完成的第一件小事。",
    ],
  },
  experiment: {
    label: "完美主义卡死型",
    title: "是时候去试一次低成本转向了！",
    summary:
      "你一直在等准备充分，但真正的答案只能从尝试里出现。先做一个不需要公开、不需要完美的小实验。",
    today: "用 30 分钟做一个低成本版本，不求作品完整，只求产生一个真实产出。",
    avoid: "等到完全准备好再开始。",
    steps: [
      "把想做的事缩小到 30 分钟内能完成的版本。",
      "今天产出一个看得见的东西：一页文档、一次咨询、一个样稿、一个报名。",
      "完成后只记录两个问题：哪里卡住、下一次要验证什么。",
    ],
  },
  path: {
    label: "路径断裂型",
    title: "是时候给自己搭一条 7 天过渡路了！",
    summary:
      "你不是不知道终点有多远，而是脚下没有桥。先设计一条 7 天过渡路径，让自己重新获得连续感。",
    today: "写一个 7 天表，每天只安排一个能让状态往前一点点移动的动作。",
    avoid: "一边想彻底翻盘，一边因为跨度太大而什么都不做。",
    steps: [
      "确定 7 天后的一个小结果，例如完成一次访谈、投出 3 份简历、做完一个样稿。",
      "把它拆成 7 个每天 30 分钟以内的动作。",
      "今天只完成第 1 步，并记录完成证据。",
    ],
  },
  feedback: {
    label: "反馈缺失型",
    title: "是时候把想法拿出去见光了！",
    summary:
      "你卡住是因为一直在内部循环。一个想法只有被真实的人看见、使用或评价，才会变清楚。",
    today: "把一个想法发给 3 个具体的人，请他们只回答一个问题：你会不会真的用它？",
    avoid: "独自打磨到自己也失去判断力。",
    steps: [
      "选一个最想验证的想法，写成 5 句话以内。",
      "发给 3 个可能相关的人，明确请他们挑问题。",
      "只记录真实反馈，不急着解释或防御。",
    ],
  },
  decision: {
    label: "逃避决策型",
    title: "是时候给这个选择设一个期限了！",
    summary:
      "你可能已经知道大概方向，只是一直在等待一个不会出现的确定感。现在需要一个短期限，把悬而未决变成可执行。",
    today: "给当前选择设一个 48 小时期限，并写下如果选错你能承受的最坏结果。",
    avoid: "把拖延包装成谨慎。",
    steps: [
      "写下你正在逃避的那个决定。",
      "设定一个 48 小时内必须做出的版本，而不是最终人生答案。",
      "写下可逆成本和不可逆成本，优先选择可逆成本低的动作。",
    ],
  },
  transition: {
    label: "身份转换焦虑型",
    title: "是时候先完成一个小闭环了！",
    summary:
      "你正处在身份切换期，混乱感本身很正常。不要急着证明自己已经稳定，先完成一个能闭环的小任务。",
    today: "选一个 2 小时内能完成的小项目，从开始、完成到交付都走一遍。",
    avoid: "用一个新身份要求自己立刻成熟、稳定、厉害。",
    steps: [
      "选一个能在今天结束前完成的小项目。",
      "明确交付物：一份表格、一条申请、一版作品、一次沟通。",
      "完成后写一句复盘：我已经能独立完成什么。",
    ],
  },
  meaning: {
    label: "无意义感型",
    title: "是时候回到真实问题和真实人了！",
    summary:
      "你需要的不只是目标，而是重新连接到一个真实问题。意义感通常不是想出来的，而是在帮某个真实的人解决真实问题时出现的。",
    today: "找一个你愿意关心的人或问题，做一件 30 分钟内能产生帮助的小事。",
    avoid: "把意义感当成必须先想明白的抽象命题。",
    steps: [
      "写下你最近真正会心疼、愤怒或在意的 1 类人或问题。",
      "选一个 30 分钟内能帮到他们的小动作。",
      "完成后记录：我刚才解决了谁的什么问题。",
    ],
  },
};

const identityOptions = [
  ["student", "在校学生", "还在学习阶段，但已经开始担心未来。"],
  ["graduate", "应届/准毕业生", "正在从学校过渡到社会。"],
  ["newcomer", "职场新人", "刚进入工作世界，还在适应规则。"],
  ["switcher", "工作几年但想转向", "已有一些经验，但不想继续原路走。"],
  ["gap", "待业/空窗/休整中", "暂时停在中间，需要重新接上生活。"],
  ["solo", "自由职业/创业探索中", "方向很多，但反馈和稳定感不足。"],
];

const concernCopy = {
  student: "你最近最烦的是什么？",
  graduate: "站在毕业门口，最让你卡住的是什么？",
  newcomer: "进入工作后，最让你消耗的是什么？",
  switcher: "想转向时，最难推动的是什么？",
  gap: "空窗或休整中，最重的压力来自哪里？",
  solo: "独自探索时，最让你没底的是什么？",
};

const questions = [
  {
    id: "identity",
    kicker: "先定入口",
    title: "你现在最接近哪种状态？",
    progress: "选择当前身份",
    options: identityOptions.map(([value, label, description]) => ({
      value,
      label,
      description,
      scores: { transition: value === "graduate" || value === "gap" ? 2 : 0 },
    })),
  },
  {
    id: "concern",
    kicker: "近期苦恼",
    title: ({ identity }) => concernCopy[identity] || "你最近最烦的是什么？",
    progress: "定位近期苦恼",
    options: [
      {
        value: "unknown",
        label: "不知道未来做什么",
        description: "方向很多或很空，怎么想都没底。",
        scores: { info: 2, path: 1 },
      },
      {
        value: "meaningless",
        label: "现在做的事没意义",
        description: "每天都在推进，但心里不觉得这件事重要。",
        scores: { meaning: 3, feedback: 1 },
      },
      {
        value: "start",
        label: "想改变但不知道从哪开始",
        description: "知道不能再这样，但第一步总是悬着。",
        scores: { path: 2, experiment: 1 },
      },
      {
        value: "many",
        label: "有很多选择但不敢定",
        description: "每个方向都有理由，也都有风险。",
        scores: { overload: 3, decision: 1 },
      },
      {
        value: "others",
        label: "被期待推着走",
        description: "家人、同龄人或社会标准的声音太大。",
        scores: { expectation: 3, decision: 1 },
      },
      {
        value: "tired",
        label: "每天很累，什么都不想做",
        description: "不是不懂道理，是没力气再推动自己。",
        scores: { energy: 3, path: 1 },
      },
    ],
  },
  {
    id: "area",
    kicker: "迷茫领域",
    title: "这件事主要发生在哪个领域？",
    progress: "确认迷茫领域",
    options: [
      ["study", "学业/考试/升学", "现在的学习路径让你怀疑。", { info: 1, path: 1 }],
      ["career", "职业/实习/工作", "跟赚钱、能力和长期发展有关。", { info: 2 }],
      ["city", "城市/去留/迁移", "在哪里生活或发展让你摇摆。", { decision: 1, overload: 1 }],
      ["relationship", "关系/家庭/同龄人", "人的期待正在影响你的判断。", { expectation: 2 }],
      ["money", "钱/稳定/生存压力", "现实约束让你不敢轻易变动。", { path: 1, decision: 1 }],
      ["self", "自我价值/意义感", "你在怀疑自己到底要什么。", { meaning: 2 }],
      ["life", "生活状态", "节律、情绪和身体状态都在下滑。", { energy: 2 }],
    ].map(toOption),
  },
  {
    id: "stuck",
    kicker: "卡住原因",
    title: "最像卡住你的那个原因是？",
    progress: "确认卡点",
    options: [
      ["no-info", "缺少真实信息", "你不知道真实情况到底是什么。", { info: 3 }],
      ["too-many", "选项太多", "越比较越乱，最后什么也没定。", { overload: 3 }],
      ["fail", "害怕失败", "一想到做错就不敢开始。", { experiment: 2, decision: 1 }],
      ["no-feedback", "缺少反馈", "不知道自己做的东西有没有价值。", { feedback: 3 }],
      ["expect", "外界期待太强", "你很难分清这是自己的选择还是别人的安排。", { expectation: 3 }],
      ["no-energy", "能量不足", "你不是没有想法，是没有余力。", { energy: 3 }],
    ].map(toOption),
  },
  {
    id: "pattern",
    kicker: "反复模式",
    title: "你最常陷入哪种循环？",
    progress: "识别反复模式",
    options: [
      ["collect", "一直查资料", "看了很多，但行动没有增加。", { info: 1, decision: 2 }],
      ["compare", "一直比较别人", "越看别人越觉得自己落后。", { expectation: 2, energy: 1 }],
      ["perfect", "一直想准备好", "总觉得还差一点才配开始。", { experiment: 3 }],
      ["brain", "一直在脑内推演", "事情都发生在想象里，没有现实反馈。", { feedback: 2, overload: 1 }],
      ["escape", "一直逃开决定", "拖到最后才被迫选择。", { decision: 3 }],
      ["reset", "总想彻底重来", "想翻篇，但跨度太大。", { path: 3 }],
    ].map(toOption),
  },
  {
    id: "constraint",
    kicker: "现实限制",
    title: "现在最限制你的资源是什么？",
    progress: "确认现实限制",
    options: [
      ["time", "时间", "事情太多，抽不出完整时间。", { path: 1 }],
      ["money", "钱", "不敢做成本太高的尝试。", { experiment: 1, decision: 1 }],
      ["energy", "精力", "每天消耗很大，很难持续。", { energy: 3 }],
      ["skill", "技能", "感觉自己还没准备好。", { experiment: 2 }],
      ["people", "人脉/信息源", "没人能问，也不知道去哪问。", { info: 3 }],
      ["family", "家庭压力", "你要顾及别人的看法或安排。", { expectation: 3 }],
    ].map(toOption),
  },
  {
    id: "strength",
    kicker: "行动强度",
    title: "你今天真实能承受多大的动作？",
    progress: "选择行动强度",
    options: [
      ["ten", "10 分钟", "只能做一个很小的动作。", { energy: 2, path: 1 }],
      ["thirty", "30 分钟", "可以完成一个明确的小任务。", { experiment: 1, feedback: 1 }],
      ["halfday", "半天", "可以认真验证一个方向。", { info: 1, experiment: 1 }],
      ["week", "连续 7 天", "可以做一个短周期计划。", { path: 2 }],
    ].map(toOption),
  },
  {
    id: "need",
    kicker: "真正需要",
    title: "如果只能选一个，你现在最需要什么？",
    progress: "锁定核心需要",
    options: [
      ["clarity", "看清真实情况", "知道这个方向到底长什么样。", { info: 3 }],
      ["less", "少一点选择", "让自己不要再分裂。", { overload: 3 }],
      ["space", "夺回自己的判断", "先听见自己的声音。", { expectation: 3 }],
      ["rest", "恢复一点力气", "先别把自己逼坏。", { energy: 3 }],
      ["try", "低成本试一次", "不用完美，但要真的动手。", { experiment: 3 }],
      ["deadline", "把决定定下来", "别让它继续悬着。", { decision: 3 }],
    ].map(toOption),
  },
  {
    id: "evidence",
    kicker: "证据来源",
    title: "哪种证据最能让你安心？",
    progress: "确认验证方式",
    options: [
      ["person", "一个真实的人怎么做", "比起文章，你更需要真实经历。", { info: 3 }],
      ["output", "一个看得见的产出", "做出来你才知道行不行。", { experiment: 2, feedback: 1 }],
      ["response", "别人真实的反应", "需要市场、朋友或用户的反馈。", { feedback: 3 }],
      ["plan", "一条可走的路径", "需要知道明天和后天怎么接上。", { path: 3 }],
      ["cost", "最坏情况可承受", "知道输得起才敢定。", { decision: 3 }],
      ["body", "身体先不崩", "恢复状态比证明自己更急。", { energy: 3 }],
    ].map(toOption),
  },
  {
    id: "share",
    kicker: "传播句",
    title: "你更希望结果给你哪种推动？",
    progress: "生成分享结论",
    options: [
      ["push", "直接推我去做", "不要再分析了，给我一个动作。", { experiment: 2, decision: 1 }],
      ["sort", "帮我把混乱理清", "先把声音和选择分开。", { overload: 2, expectation: 1 }],
      ["connect", "让我去接触真实世界", "找人、拿反馈、别闭门想。", { info: 1, feedback: 2 }],
      ["recover", "提醒我先恢复", "现在需要把自己接回来。", { energy: 3 }],
      ["bridge", "给我一段过渡路", "不用一步到位，但要连续往前。", { path: 3 }],
    ].map(toOption),
  },
];

let currentStep = 0;
let answers = {};
let history = [];
let lastResult = null;

function toOption([value, label, description, scores]) {
  return { value, label, description, scores };
}

function showScreen(screen) {
  [startScreen, quizScreen, resultScreen].forEach((item) => item.classList.add("hidden"));
  screen.classList.remove("hidden");
}

function getQuestionTitle(question) {
  return typeof question.title === "function" ? question.title(answers) : question.title;
}

function renderQuestion() {
  const question = questions[currentStep];
  questionKicker.textContent = question.kicker;
  questionTitle.textContent = getQuestionTitle(question);
  stepCount.textContent = `${currentStep + 1} / ${questions.length}`;
  progressLabel.textContent = question.progress;
  progressFill.style.width = `${((currentStep + 1) / questions.length) * 100}%`;
  backButton.disabled = currentStep === 0;
  backButton.style.visibility = currentStep === 0 ? "hidden" : "visible";

  optionsGrid.replaceChildren();
  question.options.forEach((option) => {
    const button = document.createElement("button");
    button.className = "option-button";
    button.type = "button";
    button.innerHTML = `<strong>${option.label}</strong><span>${option.description}</span>`;
    button.addEventListener("click", () => chooseOption(question.id, option));
    optionsGrid.append(button);
  });
}

function chooseOption(questionId, option) {
  answers[questionId] = option.value;
  history.push({ step: currentStep, questionId, option });

  if (currentStep === questions.length - 1) {
    showResult();
    return;
  }

  currentStep += 1;
  renderQuestion();
}

function calculateResult() {
  const scores = Object.fromEntries(Object.keys(resultMap).map((key) => [key, 0]));

  history.forEach(({ option }) => {
    Object.entries(option.scores || {}).forEach(([key, score]) => {
      scores[key] += score;
    });
  });

  const identity = answers.identity;
  if (identity === "graduate" || identity === "gap") scores.transition += 2;
  if (identity === "solo") scores.feedback += 1;
  if (identity === "switcher") scores.experiment += 1;
  if (answers.concern === "meaningless" && scores.meaning < scores.energy) scores.meaning += 2;

  const [key] = Object.entries(scores).sort((a, b) => {
    if (b[1] !== a[1]) return b[1] - a[1];
    return Object.keys(resultMap).indexOf(a[0]) - Object.keys(resultMap).indexOf(b[0]);
  })[0];

  return { key, ...resultMap[key] };
}

function showResult() {
  lastResult = calculateResult();
  resultType.textContent = lastResult.label;
  resultTitle.textContent = lastResult.title;
  resultSummary.textContent = lastResult.summary;
  resultToday.textContent = lastResult.today;
  resultAvoid.textContent = lastResult.avoid;
  shareTag.textContent = lastResult.label;
  shareTitle.textContent = lastResult.title;
  shareNote.textContent = "今天先做一件具体的小事。";

  resultSteps.replaceChildren();
  lastResult.steps.forEach((step) => {
    const item = document.createElement("li");
    item.textContent = step;
    resultSteps.append(item);
  });

  showScreen(resultScreen);
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function restart() {
  currentStep = 0;
  answers = {};
  history = [];
  lastResult = null;
  showScreen(startScreen);
}

function goBack() {
  if (currentStep === 0) return;
  const previous = history.pop();
  if (previous) delete answers[previous.questionId];
  currentStep -= 1;
  renderQuestion();
}

async function shareResult() {
  if (!lastResult) return;
  const text = `${lastResult.title}\n${lastResult.label}\n${lastResult.today}`;
  const shareData = {
    title: "我的行动测试结果",
    text,
    url: window.location.href,
  };

  if (navigator.share) {
    try {
      await navigator.share(shareData);
      return;
    } catch (error) {
      if (error.name === "AbortError") return;
    }
  }

  await navigator.clipboard.writeText(`${text}\n${window.location.href}`);
  showToast();
}

function showToast() {
  toast.classList.remove("hidden");
  window.setTimeout(() => toast.classList.add("hidden"), 1800);
}

startButton.addEventListener("click", () => {
  showScreen(quizScreen);
  renderQuestion();
});

backButton.addEventListener("click", goBack);
restartButton.addEventListener("click", restart);
shareButton.addEventListener("click", shareResult);
