# Nick Engineering

`nick-engineering` 是一套面向 AI Agent 的个人工程方法 Skill，沉淀 Nick 在代码、架构、领域建模、测试、交付和生产运行方面的实践。核心内容不依赖某个模型、厂商或 Agent 产品；不同平台只需要提供自己的发现、安装和调用适配。

它把工程工作视为一个持续学习循环：

1. Build the right thing.
2. Build it right.
3. Run it right.
4. Feed production learning back into the next decision.

工作代码只是底线。好的工程结果还应具备清晰的领域表达、可信的行为测试、安全的交付方式、可观察的生产行为，以及把真实运行经验带回下一次决策的能力。

## 核心偏好

- 把写出好代码视为程序员的核心职业能力。
- 使用小型 DSL 压缩反复出现的领域知识，而不只是包装语法。
- 把 TDD 作为设计纪律，通过 Red–Green–Refactor 演进实现。
- 坚持芝加哥学派测试：优先真实对象、状态和行为验证，只在真实边界使用替身。
- 把清晰的代码和行为测试视为系统当前行为最可信的文档。
- 让产品决策、领域模型、代码、交付、生产运行和反馈学习形成闭环。
- 使用现代 Java 表达不可变性、封闭类型域、穷举决策和数据导向设计。
- 使用英文 Conventional Commits，让提交历史可读、可检索并支持交付自动化。

## 能做什么

在实现具体需求时，这个 Skill 会引导 AI Agent：

1. 当需求模糊时，以资深开发者视角检查现有系统并提出高价值澄清问题；需求足够清晰后，只输出 Implementation Plan 并停止。用户明确表示 Plan 没问题后，再进入 Task 拆解。
2. 同时采用自上而下和自下而上的工作分解。自上而下从目标、验收行为和垂直切片展开；自下而上理解现有代码、测试、约束和可复用能力，并让两种视角在具体改动点会合。
3. 优先复用现有代码中语义一致的领域知识与行为，判断何时直接复用、组合、适配或暂时不抽象；只有存在明确设计压力和变化轴时才采用设计模式。
4. 在需求实现后重新阅读完整变更，识别命名、职责、重复知识、条件复杂度、耦合、过度 Mock 和推测性通用化等 code smell，并保留有证据支持的扩展点。
5. 常常使用 TDD 驱动实现，通过小步 Red–Green–Refactor 让测试参与接口、职责和边界设计。
6. 采用滚动式敏捷规划：一个 Implementation Plan 只覆盖一个可独立验证的垂直切片，一个 User Story 可以逐步产生多个 Plan；用户认可当前 Plan 后，Nick 运用架构、领域、TDD、兼容性、交付和生产运行经验拆分可执行 Task，而不是机械复制 Plan 章节。

## 阶段门

```text
Requirement Understanding
    --需求足够清晰--> Implementation Plan
    --用户批准--> TDD Task Breakdown
    --Task 已评审批准 + 用户要求执行 + Git clean--> Task Implementation
    --交付与观察--> Production Learning
```

最初的“帮我实现这个需求”会启动需求分析。需求模糊时，Agent 只提出澄清问题并等待回答；达到 Requirement Ready 后，Agent 自动创建一个小型 Implementation Plan，然后停止。用户随后明确回复“OK”“可以”“按这个 Plan”或同等含义时，即授权 Nick 为刚刚确认的 Plan 创建 Task 列表；Task 创建完成后再次停止。只有 Task 已被用户评审批准、用户明确要求执行，并且 `git status --porcelain` 没有任何输出时，Nick 才会开始写测试或实现代码。

如果 Git 工作区存在 staged、unstaged 或 untracked 文件，Nick 只报告状态并停止，不会自动 commit、stash、reset、删除或隐藏已有改动来绕过门禁。Plan 和 Task 文件若保存在目标仓库中，也需要先由用户决定如何纳入干净基线。

## 目录

```text
nick-engineering/
├── SKILL.md
├── agents/
│   └── openai.yaml
├── assets/
│   ├── engineering-task-template.md
│   ├── feature-plan-template.md
│   ├── implementation-plan-template.md
│   ├── implementation-task-template.md
│   └── production-learning-template.md
└── references/
    ├── delivery-and-operations.md
    ├── git-workflow.md
    ├── implementation-planning.md
    ├── implementation-tasks.md
    ├── implementation-thinking.md
    ├── java-style.md
    ├── modeling-and-dsl.md
    ├── requirements-analysis.md
    ├── testing.md
    └── workflows.md
```

- `SKILL.md` 保存核心原则、工作循环和渐进加载路由。
- `references/` 保存按任务加载的详细方法。
- `assets/` 保存 Feature Plan、工程任务、Implementation Plan、Implementation Task 和生产学习模板。
- `agents/openai.yaml` 是 OpenAI/Codex 的可选界面适配，不属于核心方法。

## 可移植性

- `SKILL.md`、`references/` 和 `assets/` 构成跨 Agent 的核心。
- `agents/` 保存特定 Agent 平台需要的可选元数据。
- 核心工作流不假设自定义 Slash Command、`$ARGUMENTS` 或某个固定工具名称。
- Agent 可以使用自己已有的代码搜索、文件读写、测试和版本控制能力执行方法。
- 如果目标 Agent 不支持原生 Skill，只需把仓库加入上下文并要求它完整读取 `SKILL.md`。

## 安装与接入

### 支持 Skill 的 AI Agent

把仓库克隆或链接到目标 Agent 的 Skill 搜索目录。具体目录、刷新方式和显式调用语法以该 Agent 的文档为准：

```bash
git clone https://github.com/hcy1223/nick-engineering.git \
  /path/to/agent-skills/nick-engineering
```

如果需要持续维护源码，可以把仓库保留在常规开发目录，再从 Agent 的 Skill 目录创建符号链接：

```bash
git clone https://github.com/hcy1223/nick-engineering.git "$HOME/src/nick-engineering"
ln -s "$HOME/src/nick-engineering" \
  /path/to/agent-skills/nick-engineering
```

### 不原生支持 Skill 的 AI Agent

把仓库克隆到任意可访问位置，然后在任务中提供入口：

```text
Read /path/to/nick-engineering/SKILL.md completely and apply it to this task.
Load only the references routed by SKILL.md and use the relevant assets as output templates.
```

### OpenAI/Codex

OpenAI/Codex 可以使用仓库中的 `agents/openai.yaml` 作为界面元数据，并从个人 Skill 目录发现该 Skill。

使用 Skill Installer：


```text
使用 $skill-installer 从 https://github.com/hcy1223/nick-engineering 安装 nick-engineering。
```

或者直接克隆：

```bash
mkdir -p "$HOME/.agents/skills"
git clone https://github.com/hcy1223/nick-engineering.git \
  "$HOME/.agents/skills/nick-engineering"
```

更新：

```bash
git -C "$HOME/.agents/skills/nick-engineering" pull
```

## 使用

把 Plan、Task 和 Implementation 作为三个独立步骤使用。Nick 会在每个阶段结束后停止，等待用户 Review 和明确授权，不会从模糊需求直接跳到写代码。

以下示例使用 `$nick-engineering` 表示目标 Agent 的具名 Skill 调用语法；如果平台使用其他语法，请替换为对应形式。

### 1. 让 Nick 创建 Implementation Plan

可以直接描述需求：

```text
使用 $nick-engineering 分析下面的需求：

<需求描述>

如果需求不清晰，先从资深开发者角度提出澄清问题并等待我的回答。
需求足够清晰后，只创建一个覆盖下一垂直切片的 Implementation Plan，然后停止。
```

也可以提供已有需求文档：

```text
使用 $nick-engineering 分析 requirements/<feature>.md。
需求足够清晰后创建 Implementation Plan；只输出 Plan，不要拆 Task 或修改代码。
```

Nick 会先检查现有代码和测试。需求仍有关键歧义时，它只提出问题；达到 Requirement Ready 后，它创建 Plan 并停止，等待 Review。

### 2. 让 Nick 根据 Plan 创建 Task

Review Plan 后，明确表示批准并提供路径：

```text
我已经 Review 并批准这个 Implementation Plan：
docs/<implementation-plan>.md

使用 $nick-engineering 根据该 Plan 拆分可执行的 TDD Task。
运用你的工程经验确定行为切片、依赖和顺序，只输出 Task 列表，然后停止。
```

如果 Plan 是 Nick 在当前对话中刚刚创建的，也可以直接回复：

```text
这个 Plan 没问题，我批准它。请使用 $nick-engineering 根据该 Plan 创建 Task，然后停止。
```

Nick 会结合 Plan、现有代码、架构、领域模型、风险和测试策略进行拆解，而不是机械复制 Plan 章节。Task 创建完成后不会开始实现。

### 3. 让 Nick 根据 Task 实现

Review Task 列表后，明确批准一个具体 Task 并要求执行：

```text
我已经 Review 并批准 tasks/<task-list>.md 中的 Task 1.1。

使用 $nick-engineering 执行 Task 1.1。
开始前检查 git status；只有工作区 clean 才能按 TDD 开始实现。
```

Nick 会在每个已批准 Task 开始前运行 `git status --porcelain`。如果存在 staged、unstaged 或 untracked 文件，它只报告状态并停止；工作区 clean 时，才会从失败测试开始执行 Red–Green–Refactor。完成实现不等于授权提交，仍需用户另外明确要求 commit。

### 不支持具名 Skill 的 Agent

如果目标 Agent 不支持 `$skill-name` 语法，先要求它读取 Skill，再附上上述对应阶段的指令：

```text
Read /path/to/nick-engineering/SKILL.md completely and apply it to this task.
Load only the references routed by SKILL.md for the current workflow stage.
```

`$nick-engineering` 只是某些 Agent 的调用适配，不是核心方法的一部分。

## 渐进加载

1. Agent 先读取 `SKILL.md` 的名称、描述、核心方法和路由。
2. Agent 根据当前任务加载相关的 `references/` 文件。
3. 需要创建计划或记录时，复制并填写 `assets/` 中的模板。
4. 平台适配文件只负责发现和调用，不复制核心工程规则。

这样可以保持核心方法稳定，同时避免无关细节占用上下文。

## 开发与验证

保持 `SKILL.md` 精简，把详细规则放入对应 reference，不要在多个文件中重复同一原则。验证时应分别检查：

- 核心 Markdown 路由、相对链接和模板是否完整。
- 目标 Agent 是否能发现并加载 `SKILL.md`。
- 平台专属元数据是否与核心 Skill 保持一致。

在 OpenAI/Codex 环境中，可以调用内置创建器进行结构验证：

```text
使用 $skill-creator 验证当前仓库中的 nick-engineering Skill。
```

这项验证确认 OpenAI/Codex 兼容性，不代表其他 Agent 平台的安装或调用方式完全相同。OpenAI/Codex 适配背景参见 [Codex Build skills documentation](https://learn.chatgpt.com/docs/build-skills)。
