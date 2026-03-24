# Codex 使用指南

本文根据 OpenAI 官方文档与本机 `codex-cli 0.116.0` 帮助信息整理，更新时间为 `2026-03-24`。

## 1. Codex 是什么

Codex 是 OpenAI 的编码代理，可在终端里帮助你理解代码、修改文件、运行命令、审查改动和处理开发任务。

## 2. 安装与登录

### 安装

```bash
npm install -g @openai/codex
# 或
brew install codex
```

安装后先确认版本：

```bash
codex --version
```

### 登录

首次启动：

```bash
codex
```

无浏览器或远程机器常用：

```bash
codex login --device-auth
```

如果使用 API key：

```bash
printenv OPENAI_API_KEY | codex login --with-api-key
```

查看登录状态：

```bash
codex login status
```

退出登录：

```bash
codex logout
```

## 3. 启动方式

### 交互式

```bash
codex
```

适合日常开发、边聊边改、持续上下文任务。

### 单次任务

```bash
codex "解释这个项目"
codex "修复首页白屏问题"
```

适合快速提问或一次性任务。

### 非交互执行

```bash
codex exec "修复 CI 失败"
```

适合脚本、自动化、CI 流程。

### 指定目录

```bash
codex --cd /path/to/project "检查这个仓库"
```

### 允许实时网页搜索

```bash
codex --search "查最新的 OpenAI 文档变更"
```

## 4. 常用命令

```bash
codex
codex "解释这个项目"
codex --model gpt-5.4 "检查这个仓库"
codex exec "修复 CI 失败"
codex review
codex resume --last
codex fork --last
codex completion zsh
```

说明：

- `codex`：进入交互式终端
- `codex exec`：非交互模式运行
- `codex review`：非交互代码审查
- `codex resume --last`：恢复最近一次会话
- `codex fork --last`：从最近会话分叉新会话
- `codex completion zsh`：生成 shell 自动补全

## 5. 会话内高频操作

- `/plan`：复杂任务先做计划
- `/permissions`：调整权限模式
- `/status`：查看模型、权限、工作目录等状态
- `/compact`：压缩长对话上下文
- `/diff`：查看当前改动
- `/review`：请 Codex 审查当前工作区改动
- `/resume`：恢复历史会话
- `/init`：生成 `AGENTS.md`
- `/model`：切换模型
- `@文件路径`：把文件加入上下文
- `!命令`：直接运行本地命令，例如 `!ls`

## 6. 配置文件

用户级配置通常在：

```text
~/.codex/config.toml
```

项目级配置可放在：

```text
.codex/config.toml
```

示例配置：

```toml
model = "gpt-5.4"
model_reasoning_effort = "high"
approval_policy = "on-request"
sandbox_mode = "workspace-write"
web_search = "cached"
personality = "pragmatic"
```

如果你希望默认允许实时网页搜索，可改成：

```toml
web_search = "live"
```

配置优先级：

```text
CLI 参数 > --profile > 项目 .codex/config.toml > 用户 ~/.codex/config.toml > 系统配置 > 默认值
```

## 7. 权限与安全

Codex 常见的执行控制主要由两项决定：

- `approval_policy`：什么时候需要你批准
- `sandbox_mode`：模型可在什么范围内执行命令和写文件

常见组合：

- `approval_policy = "on-request"`：由模型决定何时请求批准
- `approval_policy = "untrusted"`：只允许可信命令直接执行
- `approval_policy = "never"`：不询问，失败直接返回给模型
- `sandbox_mode = "read-only"`：只读模式
- `sandbox_mode = "workspace-write"`：工作区可写，适合日常开发
- `sandbox_mode = "danger-full-access"`：完全访问，风险最高

命令行里也能直接指定：

```bash
codex --full-auto
codex -a on-request -s workspace-write
codex -a untrusted -s read-only
```

不建议日常使用：

```bash
codex --dangerously-bypass-approvals-and-sandbox
```

## 8. 最稳的提问模板

```text
目标：我要你做什么
上下文：相关文件、报错、分支、文档
约束：编码规范、不能改什么、性能或安全要求
完成标准：什么算完成，例如测试通过、页面恢复、CI 变绿
```

长期规则不要每次重复，放进 `AGENTS.md` 更稳。

## 9. 推荐工作流

```text
1. 进入项目目录
2. 运行 codex
3. 先给出目标、上下文、约束、完成标准
4. 复杂任务先用 /plan
5. 需要具体文件时用 @文件路径
6. 做完后用 /diff 查看改动
7. 再用 /review 做一次审查
8. 自己补跑测试并提交
```

## 10. 常见问题与排查

### 浏览器打不开，无法登录

改用设备码登录：

```bash
codex login --device-auth
```

### 想在脚本或 CI 里用 Codex

优先使用 API key 登录：

```bash
printenv OPENAI_API_KEY | codex login --with-api-key
```

然后用非交互模式：

```bash
codex exec "你的任务"
```

### Codex 读不到最新网页信息

单次任务加：

```bash
codex --search "你的问题"
```

或者把配置改为：

```toml
web_search = "live"
```

### 命令执行总被拦截

先检查当前权限：

- 会话里用 `/permissions`
- 启动时检查 `approval_policy`
- 启动时检查 `sandbox_mode`

日常开发最常用的是：

```bash
codex -a on-request -s workspace-write
```

### 上下文太长，回答开始变散

在会话里执行：

```text
/compact
```

### 想恢复之前那次工作

```bash
codex resume --last
```

### 想在别的目录改代码

启动时指定目录：

```bash
codex --cd /path/to/project
```

如果还需要额外可写目录：

```bash
codex --add-dir /another/path
```

### 终端滚动历史不方便看

可改用：

```bash
codex --no-alt-screen
```

## 11. 官方文档

- https://developers.openai.com/codex/quickstart
- https://developers.openai.com/codex/cli
- https://developers.openai.com/codex/cli/features
- https://developers.openai.com/codex/cli/slash-commands
- https://developers.openai.com/codex/config-basic
- https://developers.openai.com/codex/auth
- https://developers.openai.com/codex/agent-approvals-security
- https://developers.openai.com/codex/learn/best-practices
