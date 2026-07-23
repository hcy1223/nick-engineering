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

## 能做什么

在实现具体需求时，这个 Skill 会引导 AI Agent：

1. 同时采用自上而下和自下而上的工作分解。自上而下从目标、验收行为和垂直切片展开；自下而上理解现有代码、测试、约束和可复用能力，并让两种视角在具体改动点会合。
2. 优先复用现有代码中语义一致的领域知识与行为，判断何时直接复用、组合、适配或暂时不抽象；只有存在明确设计压力和变化轴时才采用设计模式。
3. 在需求实现后重新阅读完整变更，识别命名、职责、重复知识、条件复杂度、耦合、过度 Mock 和推测性通用化等 code smell，并保留有证据支持的扩展点。
4. 常常使用 TDD 驱动实现，通过小步 Red–Green–Refactor 让测试参与接口、职责和边界设计。
5. 采用滚动式敏捷规划：一个 Implementation Plan 只覆盖一个可独立验证的垂直切片，一个 User Story 可以逐步产生多个 Plan；只为当前 Plan 拆分 Task，并用交付反馈决定下一步。

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
    ├── implementation-planning.md
    ├── implementation-tasks.md
    ├── implementation-thinking.md
    ├── java-style.md
    ├── modeling-and-dsl.md
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

如果目标 Agent 支持具名 Skill，可以使用它支持的显式调用语法，例如：

```text
Use $nick-engineering to plan and implement this feature.
```

或使用中文：

```text
使用 $nick-engineering 规划这个功能，并拆分为可独立交付的工程任务。
```

如果目标 Agent 不支持 `$skill-name` 语法，直接要求它读取 `SKILL.md` 并执行指定工作流。`$nick-engineering` 只是某些 Agent 的调用适配，不是核心方法的一部分。

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
