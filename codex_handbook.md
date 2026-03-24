# Codex 中文手册

本文是一个整合入口，基于 OpenAI 官方文档与当前目录中的三份文档整理而成，更新时间为 `2026-03-24`。

配套原文档：

- [codex.md](./codex.md)
- [codex_concepts.md](./codex_concepts.md)
- [prompt_template.md](./prompt_template.md)

## 目录

1. 速查区
2. 快速上手
3. 核心概念
4. 怎么组织规则、技能和工具
5. 适合中文用户的提示词模板
6. 常见问题与排查
7. 官方文档索引

## 1. 速查区

### 1.1 一句话理解 Codex

```text
Codex = 模型 + 上下文 + 规则 + 工具 + 安全边界 + 工作流
```

### 1.2 最常用命令

```bash
codex
codex "解释这个项目"
codex exec "修复 CI 失败"
codex review
codex resume --last
codex --search "查最新文档"
codex --cd /path/to/project
```

### 1.3 会话里最常用的命令

- `/plan`：复杂任务先规划
- `/permissions`：查看或调整权限
- `/status`：查看模型、目录、权限等状态
- `/compact`：压缩长对话上下文
- `/diff`：查看当前改动
- `/review`：做代码审查
- `/resume`：恢复历史会话
- `/init`：生成 `AGENTS.md`
- `@文件路径`：把文件加入上下文
- `!命令`：直接执行本地命令

### 1.4 最重要的概念区分

| 概念 | 解决什么问题 | 最适合放什么 |
| --- | --- | --- |
| Prompt | 这次要做什么 | 当前任务目标、上下文、约束、完成标准 |
| `AGENTS.md` | 长期如何做 | 仓库规则、测试命令、禁改区域、验收标准 |
| Skill | 某类重复任务怎么做 | 固定流程、SOP、排查方法、审查清单 |
| MCP | 连到哪里做 | 外部文档、浏览器、设计稿、监控平台、第三方系统 |
| Subagent | 如何并行拆任务 | 多模块探索、并行审查、分块实现 |
| Sandbox / Approval | 怎么控风险 | 读写边界、是否先问用户 |

### 1.5 建议的新手配置

```toml
model = "gpt-5.4"
approval_policy = "on-request"
sandbox_mode = "workspace-write"
web_search = "cached"
```

## 2. 快速上手

### 2.1 安装

```bash
npm install -g @openai/codex
# 或
brew install codex
```

检查版本：

```bash
codex --version
```

### 2.2 登录

首次运行：

```bash
codex
```

如果当前环境不方便打开浏览器：

```bash
codex login --device-auth
```

如果用 API key：

```bash
printenv OPENAI_API_KEY | codex login --with-api-key
```

查看登录状态：

```bash
codex login status
```

### 2.3 三种最常见启动方式

交互式：

```bash
codex
```

单次任务：

```bash
codex "修复首页白屏"
```

非交互：

```bash
codex exec "修复 CI 失败"
```

### 2.4 建议的日常工作流

```text
1. 进入项目目录
2. 运行 codex
3. 说清目标、上下文、约束、完成标准
4. 复杂任务先 /plan
5. 必要时用 @文件路径 补充上下文
6. 做完后用 /diff 检查改动
7. 再用 /review 做一次审查
8. 自己补跑测试并提交
```

## 3. 核心概念

### 3.1 Agent

Agent 不是单独一个模型，而是一个能完成任务的系统。它通常包含：

- 模型
- 指令
- 工具
- 上下文
- 控制逻辑
- 安全边界

在 Codex 里，当前会话本身就可以看作一个 agent。

### 3.2 Model

Model 是大脑，负责理解、推理、编码和使用工具的决策。模型决定上限，但不决定全部结果。很多问题并不是模型不够强，而是：

- 上下文不够
- 工具没接上
- 权限太小
- 规则不清楚

### 3.3 Prompt

Prompt 是这一次任务的临时说明。最稳的结构是：

- 目标
- 上下文
- 约束
- 完成标准

提示词只解决当前任务，不适合承载长期规范。

### 3.4 Tool

Tool 是 agent 的行动能力。没有工具时，模型只能输出文本；有了工具，模型才能读文件、改代码、跑命令、查文档、调用外部系统。

### 3.5 MCP

`MCP` 是 `Model Context Protocol`，本质上是把模型连接到外部工具和外部上下文的标准协议。

它最适合：

- 官方文档
- 浏览器
- 设计稿
- 监控平台
- 第三方系统

一句话记忆：

```text
Skill 决定怎么做
MCP 决定连到哪里做
```

### 3.6 Skill

Skill 是可复用的方法包。它不是“能力”的抽象说法，而是一套可触发、可维护、可复用的工作流目录，通常以 `SKILL.md` 为核心。

适合做成 skill 的事：

- 固定格式的代码审查
- 某类故障排查流程
- 发布说明生成
- 迁移步骤模板

### 3.7 AGENTS.md

`AGENTS.md` 是长期规则文件。它适合放：

- 项目结构说明
- 启动、测试、lint、build 命令
- 代码规范
- 禁改区域
- 完成标准
- 团队偏好

它不是给一次任务用的，而是给 Codex 长期记住“这个项目该怎么做”。

### 3.8 Subagent

Subagent 是并行子代理。适合：

- 多模块并行探索
- 分块实现
- 并行审查
- 非阻塞的侧向调查

它能提高并行效率，但也会增加 token 消耗和协调复杂度。

### 3.9 Sandbox 与 Approval

这两个要分开理解：

- `Sandbox`：技术边界，决定能读写哪里、能执行到什么范围
- `Approval`：批准策略，决定越界前要不要先问你

常见组合：

```toml
approval_policy = "on-request"
sandbox_mode = "workspace-write"
```

这代表：

- 工作区内可低摩擦执行
- 需要越界时先请求批准

### 3.10 Automation

Automation 是固定流程的定时或后台运行。官方给出的判断非常实用：

```text
Skill 负责方法
Automation 负责调度
```

## 4. 怎么组织规则、技能和工具

### 4.1 什么时候用 Prompt

当前任务需要说明时用 prompt，例如：

- 修复某个 bug
- 实现一个具体功能
- 解释某个模块
- 做当前工作区审查

### 4.2 什么时候用 AGENTS.md

长期规则需要稳定生效时用 `AGENTS.md`，例如：

- 全程用中文解释
- 修改后必须跑哪些测试
- 不能改哪些目录
- 仓库统一使用什么命令

### 4.3 什么时候用 Skill

当你发现自己反复复制同一类长提示词时，通常就该升级成 skill。例如：

- 固定的日志排查流程
- 标准化 PR 审查
- 某服务的故障处理 SOP

### 4.4 什么时候用 MCP

当信息不在仓库里、而且需要实时访问时，就该考虑 MCP。例如：

- 外部文档
- 设计稿
- 浏览器页面
- issue 系统
- 监控或报警平台

### 4.5 什么时候用 Subagent

当任务能明显拆成彼此独立的分块，并且并行确实能节省时间时，再用 subagent。不要为了“显得高级”而乱开并行。

## 5. 适合中文用户的提示词模板

### 5.1 通用骨架

```text
目标：
我想让你做什么。

上下文：
相关文件、目录、报错、页面、接口、分支、文档。
需要时我会用 @文件路径 提供上下文。

约束：
不要改哪些文件。
遵守什么技术栈、代码风格、架构约束。
是否允许安装依赖、改接口、改数据库、改文案。

完成标准：
什么算完成。
例如：测试通过、页面恢复正常、CI 通过、接口返回符合预期、无控制台报错。

输出要求：
请全程用中文。
先简要说明计划，再动手。
如果信息不足，先提关键问题或先做最小范围排查。
做完后给出修改摘要、影响范围、验证结果和剩余风险。
```

### 5.2 修 Bug 模板

```text
目标：
修复这个项目中的问题：{一句话描述问题}

上下文：
- 项目目录：{目录}
- 相关文件：{@a @b @c}
- 现象：{报错/页面异常/接口异常}
- 复现步骤：{步骤}
- 期望行为：{正确结果}

约束：
- 不要修改无关文件
- 不要引入新依赖，除非先说明必要性
- 保持现有代码风格
- 优先做最小可行修复

完成标准：
- 问题可稳定复现并被修复
- 相关测试通过；如果没有测试，补最小必要测试
- 给出根因说明
- 列出你修改的文件和验证方法

输出要求：
- 全程中文
- 先排查再改
- 最后输出：根因、改动、验证、风险
```

### 5.3 做功能模板

```text
目标：
为这个需求实现一个完整功能：{需求名称}

上下文：
- 技术栈：{React/Vue/Node/Python/...}
- 相关页面或模块：{@文件}
- 参考设计或接口文档：{链接或说明}
- 现状：{现在缺什么}

约束：
- 保持现有目录结构
- 优先复用已有组件/工具函数
- 注意边界情况：{列出}
- 注意性能/安全/兼容性要求：{列出}

完成标准：
- 功能能正常使用
- 关键边界情况覆盖到
- 必要的测试、lint、typecheck 通过
- 给出后续可选优化，但不要顺手过度重构

输出要求：
- 用中文说明实现思路
- 如果任务较大，先给计划再实施
- 做完后给我一个可人工验收的检查清单
```

### 5.4 代码审查模板

```text
目标：
请对当前改动做代码审查。

上下文：
- 审查范围：当前工作区 / 当前 commit / 当前分支相对 main
- 重点关注：bug、回归风险、边界条件、测试缺失、安全问题
- 相关文件：{@文件}

约束：
- 以发现问题为主，不要重写整套实现
- 按严重程度排序
- 给出文件位置和原因
- 没把握的地方明确写成“需确认”

完成标准：
- 列出明确问题
- 说明影响
- 给出修复建议
- 如果没有明显问题，也说明剩余风险和测试空白

输出要求：
- 用中文
- 先给 findings，再给简短总结
```

### 5.5 先澄清需求模板

```text
目标：
请先不要写代码，先把需求问清楚并给出执行计划。

上下文：
我现在只有一个模糊想法：{你的想法}

约束：
- 先提 5 到 10 个关键澄清问题
- 挑战不合理假设
- 不要急着实现
- 在问题问清前，不输出具体代码

完成标准：
- 形成一份可执行的计划
- 明确范围、风险、依赖、验收标准

输出要求：
- 用中文
- 问题要具体，尽量贴近工程决策
```

### 5.6 解释代码模板

```text
目标：
解释这段代码或这个项目给我听。

上下文：
- 相关文件：{@文件}
- 我最关心：{运行流程/状态管理/接口调用/构建流程/为什么报错}

约束：
- 假设我是中文开发者
- 少讲空话，多讲调用链、数据流、关键函数
- 必要时给出阅读顺序

完成标准：
- 让我知道“它是怎么工作的”
- 标出最关键的文件和入口
- 如果有明显问题，顺带指出

输出要求：
- 中文
- 尽量按“入口 -> 流程 -> 关键点 -> 风险”讲
```

## 6. 常见问题与排查

### 6.1 浏览器打不开，无法登录

```bash
codex login --device-auth
```

### 6.2 想在脚本或 CI 里用 Codex

```bash
printenv OPENAI_API_KEY | codex login --with-api-key
codex exec "你的任务"
```

### 6.3 想让 Codex 查最新网页

```bash
codex --search "你的问题"
```

或者配置：

```toml
web_search = "live"
```

### 6.4 命令总被拦截

先检查：

- `/permissions`
- `approval_policy`
- `sandbox_mode`

推荐日常配置：

```bash
codex -a on-request -s workspace-write
```

### 6.5 会话太长，回答开始发散

```text
/compact
```

### 6.6 想恢复上次工作

```bash
codex resume --last
```

### 6.7 想在别的目录工作

```bash
codex --cd /path/to/project
codex --add-dir /another/path
```

### 6.8 想保留终端滚动历史

```bash
codex --no-alt-screen
```

## 7. 官方文档索引

- https://developers.openai.com/codex/quickstart
- https://developers.openai.com/codex/cli
- https://developers.openai.com/codex/cli/features
- https://developers.openai.com/codex/cli/slash-commands
- https://developers.openai.com/codex/config-basic
- https://developers.openai.com/codex/auth
- https://developers.openai.com/codex/agent-approvals-security
- https://developers.openai.com/codex/concepts/sandboxing
- https://developers.openai.com/codex/learn/best-practices
- https://developers.openai.com/codex/guides/agents-md
- https://developers.openai.com/codex/skills
- https://developers.openai.com/codex/mcp
- https://developers.openai.com/codex/subagents
- https://developers.openai.com/codex/models
- https://developers.openai.com/api/docs/guides/agents
