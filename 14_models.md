# 14 个模型节点优缺点整理

更新时间：`2026-03-26 19:10`（Asia/Shanghai）  
状态数据时间：`2026-03-26T03:10:06.349Z`

本文基于两类信息整理：

- 状态页实时数据：`https://statusv.ice.v.ua/`
- 状态页接口：`https://statusv.ice.v.ua/api/dashboard?trendPeriod=7d`
- OpenAI 官方模型文档：`https://platform.openai.com/docs/models`

说明：

- 这里的“优缺点”分为两部分：一部分来自 OpenAI 官方模型定位，另一部分来自状态页的实时指标（`status`、`latencyMs`、`pingLatencyMs`、`availabilityPct`）。
- 页面中的 14 条记录并不都是 14 个完全不同的模型；其中有重复型号，表示不同节点或不同检查项。
- 本文中的“节点 ID”使用状态页里的前 8 位 ID 便于区分。

## 实时状态总表

| # | 名称 | 模型 | 节点 ID | 状态 | 对话延迟 | PING | 7d 可用率 |
| --- | --- | --- | --- | --- | --- | --- | --- |
| 1 | GPT-5 | `gpt-5` | `bf0048cd` | operational | 1760 ms | 24 ms | 99.22% |
| 2 | GPT-5-CodeX | `gpt-5-codex` | `45be0647` | operational | 692 ms | 30 ms | 98.17% |
| 3 | GPT-5-CodeX-Mini | `gpt-5-codex-mini` | `3a2d2af6` | operational | 666 ms | 31 ms | 99.19% |
| 4 | GPT-5-CodeX-Mini | `gpt-5-codex-mini` | `0f158bd3` | operational | 600 ms | 31 ms | 99.36% |
| 5 | GPT-5.1 | `gpt-5.1` | `9d572d37` | operational | 684 ms | 27 ms | 98.99% |
| 6 | GPT-5.1-CodeX | `gpt-5.1-codex` | `bb64c5e7` | operational | 591 ms | 27 ms | 98.67% |
| 7 | GPT-5.1-CodeX-Max | `gpt-5.1-codex-max` | `aedbff26` | operational | 5421 ms | 30 ms | 97.31% |
| 8 | GPT-5.1-CodeX-Mini | `gpt-5.1-codex-mini` | `a32bc82d` | operational | 613 ms | 35 ms | 99.30% |
| 9 | GPT-5.2 | `gpt-5.2` | `5c6535ff` | operational | 1252 ms | 21 ms | 99.42% |
| 10 | GPT-5.2 | `gpt-5.2` | `12508cea` | operational | 757 ms | 20 ms | 99.42% |
| 11 | GPT-5.2-CodeX | `gpt-5.2-codex` | `8ba0b72f` | operational | 865 ms | 31 ms | 99.22% |
| 12 | GPT-5.3-CodeX | `gpt-5.3-codex` | `9253bb06` | operational | 826 ms | 18 ms | 99.10% |
| 13 | GPT-5.4 | `gpt-5.4` | `63e006db` | operational | 1028 ms | 7 ms | 97.13% |
| 14 | GPT-5.4-Mini | `gpt-5.4-mini` | `54b83e6d` | operational | 921 ms | 26 ms | 97.53% |

## 逐条优缺点

### 1. GPT-5 (`gpt-5`, `bf0048cd`)

优点：

- OpenAI 官方定位里仍属于强推理、强编码、通用性很高的一档。
- 7d 可用率高，达到 `99.22%`。

缺点：

- 当前这个节点对话延迟偏高，达到 `1760 ms`。
- 官方已经更明确推荐把很多专业任务迁移到 `GPT-5.1` 或更新型号。

### 2. GPT-5-CodeX (`gpt-5-codex`, `45be0647`)

优点：

- 官方定位是专门面向 agentic coding 的 Codex 优化版。
- 当前节点延迟低，`692 ms`，交互体感较好。

缺点：

- 7d 可用率只有 `98.17%`，在这 14 条里偏低。
- 这条线已经不是官方最新一代 Codex 能力代表。

### 3. GPT-5-CodeX-Mini (`gpt-5-codex-mini`, `3a2d2af6`)

优点：

- 当前节点延迟较低，`666 ms`。
- 7d 可用率较高，`99.19%`。

缺点：

- `gpt-5-codex-mini` 这个精确名称在 OpenAI 官方模型页没有对应卡片，更像站点侧命名。
- 相同型号的另一条节点表现更好。

### 4. GPT-5-CodeX-Mini (`gpt-5-codex-mini`, `0f158bd3`)

优点：

- 这是两条 `gpt-5-codex-mini` 里表现更好的一条。
- 当前延迟 `600 ms`，7d 可用率 `99.36%`，属于稳且快。

缺点：

- 同样存在“官方无同名模型卡”的命名不确定性。
- 仍然更适合作为轻量或成本敏感型编码节点，而不是最高能力首选。

### 5. GPT-5.1 (`gpt-5.1`, `9d572d37`)

优点：

- 官方把它作为“编码与 agentic 任务旗舰”之一。
- 当前节点延迟 `684 ms`，速度很好。

缺点：

- 7d 可用率 `98.99%`，不算最稳定的一档。
- 在更复杂的专业场景里，官方定位上已被 `GPT-5.4` 压过。

### 6. GPT-5.1-CodeX (`gpt-5.1-codex`, `bb64c5e7`)

优点：

- 当前 14 条里最低延迟，`591 ms`。
- 官方定位明确是 GPT-5.1 的 Codex 优化版，适合编码工作流。

缺点：

- 7d 可用率 `98.67%`，稳定性一般。
- 不是最便宜的节点，也不是最高能力的节点。

### 7. GPT-5.1-CodeX-Max (`gpt-5.1-codex-max`, `aedbff26`)

优点：

- 官方定位偏向长时任务和更重的 agentic coding。
- 当前状态仍是 `operational`。

缺点：

- 当前这条节点是全表最慢，达到 `5421 ms`。
- 7d 可用率也最低之一，仅 `97.31%`。
- 如果看这张状态页，它不适合作为主力线上节点。

### 8. GPT-5.1-CodeX-Mini (`gpt-5.1-codex-mini`, `a32bc82d`)

优点：

- 官方定位是更便宜的 Codex 版本，性价比高。
- 当前节点延迟 `613 ms`，7d 可用率 `99.30%`，综合表现很强。

缺点：

- 能力上限低于 `gpt-5.1-codex` 和更高代模型。
- PING `35 ms`，在这 14 条里不算低。

### 9. GPT-5.2 (`gpt-5.2`, `5c6535ff`)

优点：

- 7d 可用率达到 `99.42%`，属于全表最佳之一。
- 官方定位上它仍是前代强专业模型。

缺点：

- 当前延迟 `1252 ms`，明显慢于很多 5.1/Codex Mini 节点。
- 在官方产品谱系里，它已不是最新推荐主线。

### 10. GPT-5.2 (`gpt-5.2`, `12508cea`)

优点：

- 与另一条 `gpt-5.2` 一样，可用率 `99.42%`，非常稳。
- 当前延迟 `757 ms`，明显优于另一条同型号节点。

缺点：

- 虽然稳定，但模型代际上已经不是最新前沿。
- 对成本敏感场景不一定划算。

### 11. GPT-5.2-CodeX (`gpt-5.2-codex`, `8ba0b72f`)

优点：

- 官方定位偏向长程 agentic coding。
- 当前节点延迟 `865 ms`，7d 可用率 `99.22%`，平衡度不错。

缺点：

- 不如 `gpt-5.3-codex` 新。
- 不是速度最优，也不是稳定性最优。

### 12. GPT-5.3-CodeX (`gpt-5.3-codex`, `9253bb06`)

优点：

- 官方明确把它放在很强的 agentic coding 档位。
- 当前节点 PING 很低，`18 ms`，延迟 `826 ms`，7d 可用率 `99.10%`，综合均衡。

缺点：

- 价格通常不会低。
- 如果你只追求极限稳定，这一条仍略低于最强的 `gpt-5.2` 节点。

### 13. GPT-5.4 (`gpt-5.4`, `63e006db`)

优点：

- 官方当前前沿专业模型，长上下文和工具支持最强。
- 当前节点 PING 极低，`7 ms`。

缺点：

- 7d 可用率只有 `97.13%`，在这 14 条里偏低。
- 当前延迟 `1028 ms`，并不占优。
- 如果只看这张状态页，不适合当“唯一主力节点”。

### 14. GPT-5.4-Mini (`gpt-5.4-mini`, `54b83e6d`)

优点：

- 官方定位是新一代高性能 mini 模型。
- 当前延迟 `921 ms`，比大模型版 `gpt-5.4` 更轻。

缺点：

- 7d 可用率 `97.53%`，仍然偏低。
- 能力上限不如 `gpt-5.4`、`gpt-5.3-codex`、`gpt-5.2` 这类更高档模型。

## 简短结论

如果只根据这张状态页选主力节点：

- 想要 `稳 + 快`：优先看 `gpt-5-codex-mini (0f158bd3)`、`gpt-5.1-codex-mini (a32bc82d)`、`gpt-5.2 (12508cea)`
- 想要 `代码能力优先`：优先看 `gpt-5.3-codex`，其次是稳定些的 `gpt-5.2-codex` 或较快的 `gpt-5.1-codex`
- 当前不建议做唯一主力：`gpt-5.1-codex-max`、当前这条 `gpt-5.4`

## 参考链接

- 状态页：<https://statusv.ice.v.ua/>
- 实时接口：<https://statusv.ice.v.ua/api/dashboard?trendPeriod=7d>
- OpenAI 模型文档：<https://platform.openai.com/docs/models>
