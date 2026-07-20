# Nick Engineering

`nick-engineering` 是一套面向 Codex 的个人工程方法 Skill，沉淀 Nick 在代码、架构、领域建模、测试、交付和生产运行方面的实践。

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

## 目录

```text
nick-engineering/
├── SKILL.md
├── agents/
│   └── openai.yaml
├── assets/
│   ├── engineering-task-template.md
│   ├── feature-plan-template.md
│   └── production-learning-template.md
└── references/
    ├── delivery-and-operations.md
    ├── java-style.md
    ├── modeling-and-dsl.md
    ├── testing.md
    └── workflows.md
```

- `SKILL.md` 保存核心原则、工作循环和渐进加载路由。
- `references/` 保存按任务加载的详细方法。
- `assets/` 保存 Feature Plan、工程任务和生产学习模板。
- `agents/openai.yaml` 保存 Codex 界面元数据与默认调用提示。

## 安装

Codex 从 `~/.agents/skills` 加载个人 Skill，并支持指向其他源码目录的符号链接。

### 使用 Skill Installer

在 Codex 中调用内置安装器，并要求它从本仓库安装：

```text
使用 $skill-installer 从 https://github.com/hcy1223/nick-engineering 安装 nick-engineering。
```

Codex 会自动检测新安装的 Skill；如果没有出现，再重启 Codex。

### 直接安装

适合只需要使用，并通过 Git 拉取更新的场景：

```bash
mkdir -p "$HOME/.agents/skills"
git clone https://github.com/hcy1223/nick-engineering.git \
  "$HOME/.agents/skills/nick-engineering"
```

更新：

```bash
git -C "$HOME/.agents/skills/nick-engineering" pull
```

### 源码与安装位置分离

适合持续完善 Skill，并用独立仓库管理源码的场景：

```bash
git clone https://github.com/hcy1223/nick-engineering.git "$HOME/src/nick-engineering"
mkdir -p "$HOME/.agents/skills"
ln -s "$HOME/src/nick-engineering" \
  "$HOME/.agents/skills/nick-engineering"
```

这种方式让源码留在常规开发目录中，同时让 Codex 通过符号链接发现它。请确保目标链接不存在，并根据自己的源码位置调整路径。

## 使用

安装后启动一个新的 Codex 任务并显式调用：

```text
Use $nick-engineering to plan and implement this feature.
```

或使用中文：

```text
使用 $nick-engineering 规划这个功能，并拆分为可独立交付的工程任务。
```

Codex 也可以根据 `SKILL.md` 中的 `description` 在相关任务中自动选择该 Skill。如果新任务中没有发现它，请确认安装路径和目录名，然后重启 Codex。

## 渐进加载

1. Codex 先用名称和描述判断是否触发。
2. 触发后加载 `SKILL.md` 的核心方法和路由。
3. 根据当前任务读取相关的 `references/` 文件。
4. 需要创建计划或记录时，复制并填写 `assets/` 中的模板。

这样可以保持核心方法稳定，同时避免无关细节占用上下文。

## 开发与验证

保持 `SKILL.md` 精简，把详细规则放入对应 reference，不要在多个文件中重复同一原则。修改后在 Codex 中调用内置创建器进行验证：

```text
使用 $skill-creator 验证当前仓库中的 nick-engineering Skill。
```

更多背景参见 [Codex Build skills documentation](https://learn.chatgpt.com/docs/build-skills)。
