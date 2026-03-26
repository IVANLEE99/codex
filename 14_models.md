# 14 个模型节点优缺点整理

副标题：`仅基于 OpenAI 官方资料，不使用第三方状态站数据`

更新时间：`2026-03-26`  
资料范围：仅使用 `developers.openai.com` / `platform.openai.com` 的官方模型文档

## 说明

- 本文不使用 `https://statusv.ice.v.ua/` 的延迟、可用率、PING、节点状态等任何第三方监控数据。
- 这 14 条记录沿用你给出的“14 个模型”顺序来整理，但其中并不都是 14 个不同的官方模型。
- 其中有重复项：
  - `gpt-5-codex-mini` 出现 2 次
  - `gpt-5.2` 出现 2 次
- 其中有 2 个精确模型名在 OpenAI 官方模型目录中没有找到对应页面：
  - `gpt-5-codex-mini`
  - `gpt-5.4-mini`
- 对于官方没有对应页面的精确模型名，本文只会写“无法用官方资料确认”，不会引用第三方站点做补充判断。

## 官方口径下的整体结论

如果只看 OpenAI 官方模型文档：

- 复杂推理、复杂编码、专业工作：优先 `gpt-5.4`
- 编码与 agentic 任务的主力旗舰：`gpt-5.1`
- 当前最强 agentic coding 专项模型：`gpt-5.3-codex`
- 更便宜的小模型编码选择：`gpt-5.1-codex-mini`
- 更低成本、低延迟、批量任务：官方当前主推的是 `gpt-5-mini`

换句话说：

- `gpt-5.4` 是官方当前总旗舰
- `gpt-5.3-codex` 是官方当前 Codex 线最强
- `gpt-5.1` 是官方当前“编码与 agentic 任务”主力通用旗舰

## 14 条记录逐条整理

### 1. GPT-5 (`gpt-5`)

官方定位：

- OpenAI 官方把它定义为“上一代用于编码、推理和 agentic 任务的智能模型”
- 官方明确建议：优先使用更新的 `gpt-5.1`

优点：

- 仍然是通用的强编码/强推理模型
- `400,000` 上下文窗口
- `128,000` 最大输出
- 支持 `distillation`
- 支持 `Web search`、`File search`、`Image generation`、`Code interpreter`、`MCP`
- 价格比 `gpt-5.2`、`gpt-5.4` 更低

缺点：

- 已被官方归类为“previous model”
- 官方直接推荐迁移到 `gpt-5.1`
- 不支持 `Hosted shell`、`Apply patch`、`Skills`、`Computer use`

### 2. GPT-5-CodeX (`gpt-5-codex`)

官方定位：

- `A version of GPT-5 optimized for agentic coding in Codex`

优点：

- 明确针对 agentic coding 优化
- `400,000` 上下文窗口
- `128,000` 最大输出
- 价格与 `gpt-5`、`gpt-5.1` 同档：`$1.25 / $10`
- 官方明确适用于 `Codex or similar environments`

缺点：

- 不是当前最强的 Codex 线模型
- 官方页明确它是 Codex 专项优化版本，不是最通用的全场景旗舰
- 不支持 `Distillation`
- 不支持 `Predicted outputs`
- 官方说明它主要面向 `Responses API`

### 3. GPT-5-CodeX-Mini (`gpt-5-codex-mini`)

官方情况：

- 截至 `2026-03-26`，OpenAI 官方模型目录中没有找到 `gpt-5-codex-mini` 这个精确模型页

基于官方资料能确定的内容：

- 不能确认它是否是 OpenAI 官方公开模型 ID
- 不能仅凭官方资料确认它与 `gpt-5.1-codex-mini` 或 `codex-mini-latest` 的对应关系

优点：

- 无法仅基于官方资料确认

缺点：

- 官方没有这个精确模型页
- 因而不能给出可信的官方优缺点结论

### 4. GPT-5-CodeX-Mini (`gpt-5-codex-mini`)

这一条与第 3 条相同。

优点：

- 无法仅基于官方资料确认

缺点：

- 官方没有这个精确模型页
- 不能从官方文档推导出与第 3 条不同的结论

### 5. GPT-5.1 (`gpt-5.1`)

官方定位：

- `The best model for coding and agentic tasks with configurable reasoning effort`
- 属于官方当前主力编码/agentic 旗舰

优点：

- 官方直接把它定位成编码与 agentic 任务旗舰
- `400,000` 上下文窗口
- `128,000` 最大输出
- 支持 `none / low / medium / high` 推理档位
- 支持 `Distillation`
- 价格与 `gpt-5` 相同：`$1.25 / $10`

缺点：

- 在“复杂专业工作”这条线上，官方最新旗舰已经是 `gpt-5.4`
- 不是 Codex 专项最强模型；如果目标是 agentic coding，官方 Codex 线还有更强选择

### 6. GPT-5.1-CodeX (`gpt-5.1-codex`)

官方定位：

- `A version of GPT-5.1 optimized for agentic coding in Codex`

优点：

- 明确针对 Codex / agentic coding 优化
- `400,000` 上下文窗口
- `128,000` 最大输出
- 价格仍是 `gpt-5.1` 档：`$1.25 / $10`
- 适合在 Codex 或类似环境中做软件工程任务

缺点：

- 不是当前官方最强 Codex 模型
- 不支持 `Distillation`
- 不支持 `Predicted outputs`
- 官方说明它主要面向 `Responses API`

### 7. GPT-5.1-CodeX-Max (`gpt-5.1-codex-max`)

官方定位：

- `A version of GPT-5.1-codex optimized for long running tasks`
- `purpose-built for agentic coding`

优点：

- 明确面向长时任务
- 明确针对 agentic coding
- 价格仍是 `gpt-5.1` 档：`$1.25 / $10`
- 如果任务很长、链路很多，它的定位比普通 `gpt-5.1-codex` 更聚焦

缺点：

- 不是官方当前最强 Codex 线模型
- 官方没有把它描述成“最强”，而是“长任务专用”
- 不支持 `Predicted outputs`
- 官方说明它只在 `Responses API` 中可用

### 8. GPT-5.1-CodeX-Mini (`gpt-5.1-codex-mini`)

官方定位：

- `Smaller, more cost-effective, less-capable version of GPT-5.1-Codex`

优点：

- 官方明确指出它更便宜
- 价格很低：`$0.25 / $2`
- `400,000` 上下文窗口
- `128,000` 最大输出
- 非常适合成本敏感的 Codex / coding 工作流

缺点：

- 官方明确指出它 `less-capable`
- 能力上限低于 `gpt-5.1-codex`
- 不支持 `Distillation`
- 不支持 `Predicted outputs`

### 9. GPT-5.2 (`gpt-5.2`)

官方定位：

- `Previous frontier model for professional work with configurable reasoning effort`
- 官方明确建议：优先使用更新的 `gpt-5.4`

优点：

- 仍属于强专业工作模型
- 支持 `none / low / medium / high / xhigh`
- `400,000` 上下文窗口
- `128,000` 最大输出
- 支持 `Distillation`

缺点：

- 已被官方标为 `previous frontier model`
- 官方直接推荐用 `gpt-5.4`
- 价格高于 `gpt-5` / `gpt-5.1`：`$1.75 / $14`

### 10. GPT-5.2 (`gpt-5.2`)

这一条与第 9 条相同。

优点：

- 仍属于强专业工作模型
- 支持 `xhigh` 推理档位
- 支持 `Distillation`

缺点：

- 已被官方更新型号取代
- 官方推荐迁移到 `gpt-5.4`
- 成本不低

### 11. GPT-5.2-CodeX (`gpt-5.2-codex`)

官方定位：

- `Our most intelligent coding model optimized for long-horizon, agentic coding tasks`

优点：

- 明确针对长程 agentic coding
- 支持 `low / medium / high / xhigh` 推理档位
- `400,000` 上下文窗口
- `128,000` 最大输出
- 比 `gpt-5.1-codex` 更高一档

缺点：

- 已经不是官方当前最新最强 Codex 线模型
- 价格较高：`$1.75 / $14`
- 不支持 `Distillation`
- 不支持 `Predicted outputs`

### 12. GPT-5.3-CodeX (`gpt-5.3-codex`)

官方定位：

- `The most capable agentic coding model to date`

优点：

- 官方当前对 Codex 线最强的明确描述
- 明确针对 agentic coding
- 支持 `low / medium / high / xhigh`
- `400,000` 上下文窗口
- `128,000` 最大输出

缺点：

- 价格高：`$1.75 / $14`
- 不支持 `Distillation`
- 不支持 `Predicted outputs`
- 更偏专用编码/agent 工作流，而不是最低成本选择

### 13. GPT-5.4 (`gpt-5.4`)

官方定位：

- `Best intelligence at scale for agentic, coding, and professional workflows`
- 官方模型总览明确建议：复杂推理和编码优先从 `gpt-5.4` 开始

优点：

- 当前官方总旗舰
- `1,050,000` 上下文窗口
- `128,000` 最大输出
- 支持 `none / low / medium / high / xhigh`
- 工具支持最全之一：
  - `Web search`
  - `File search`
  - `Image generation`
  - `Code interpreter`
  - `Hosted shell`
  - `Apply patch`
  - `Skills`
  - `Computer use`
  - `MCP`
  - `Tool search`

缺点：

- 成本最高：`$2.50 / $15`
- 超长上下文场景有更高计费规则
- 如果目标是极低成本/高并发，它不是最佳选择

### 14. GPT-5.4-Mini (`gpt-5.4-mini`)

官方情况：

- 截至 `2026-03-26`，OpenAI 官方模型目录中没有找到 `gpt-5.4-mini` 这个精确模型页

基于官方资料能确定的内容：

- OpenAI 官方有 `gpt-5-mini`
- 官方没有 `gpt-5.4-mini` 这个精确公开模型页
- 因而不能把 `gpt-5.4-mini` 直接等同于 `gpt-5-mini`

优点：

- 无法仅基于官方资料确认

缺点：

- 官方没有这个精确模型页
- 不能只靠官方文档确认其定位、价格、上下文和能力边界

## 简短结论

如果只接受 OpenAI 官方资料，不看任何第三方监控：

- 通用复杂任务首选：`gpt-5.4`
- 通用编码/agent 主力：`gpt-5.1`
- Codex 线最强：`gpt-5.3-codex`
- 长程编码任务：`gpt-5.2-codex` 或 `gpt-5.1-codex-max`
- 成本敏感的 Codex 小模型：`gpt-5.1-codex-mini`

需要特别保留的结论：

- `gpt-5-codex-mini` 不是当前官方可确认的精确模型页
- `gpt-5.4-mini` 不是当前官方可确认的精确模型页
- 因此这两类条目不能再写“官方优缺点”，只能写“官方未找到对应模型”

## 官方参考链接

- 模型总览：<https://developers.openai.com/api/docs/models>
- 全量模型目录：<https://developers.openai.com/api/docs/models/all>
- GPT-5：<https://developers.openai.com/api/docs/models/gpt-5>
- GPT-5-Codex：<https://developers.openai.com/api/docs/models/gpt-5-codex>
- GPT-5.1：<https://developers.openai.com/api/docs/models/gpt-5.1>
- GPT-5.1-Codex：<https://developers.openai.com/api/docs/models/gpt-5.1-codex>
- GPT-5.1-Codex-Max：<https://developers.openai.com/api/docs/models/gpt-5.1-codex-max>
- GPT-5.1-Codex-Mini：<https://developers.openai.com/api/docs/models/gpt-5.1-codex-mini>
- GPT-5.2：<https://developers.openai.com/api/docs/models/gpt-5.2>
- GPT-5.2-Codex：<https://developers.openai.com/api/docs/models/gpt-5.2-codex>
- GPT-5.3-Codex：<https://developers.openai.com/api/docs/models/gpt-5.3-codex>
- GPT-5.4：<https://developers.openai.com/api/docs/models/gpt-5.4>
- GPT-5 mini：<https://developers.openai.com/api/docs/models/gpt-5-mini>
- codex-mini-latest：<https://developers.openai.com/api/docs/models/codex-mini-latest>
