# 繁體中文（台灣）翻譯指南 — Orca i18n

## 輸出格式
- 建立指定的 `.mjs` 檔，內容為：`export default { 'key': '譯文', ... }`
- **每一個 key 都要有**，不可遺漏、不可多加、 key 字串保持原樣（單引號）
- 值用單引號包住；若譯文含單引號，請用反斜線跳脫（`\'`）或用雙引號包住該值
- 不要加任何其他程式碼、註解或說明

## 絕對規則
1. **只用繁體中文，不得出現任何簡體字**。常見純簡體字（繁體絕不使用）：们 个 为 发 经 会 说 话 该 过 问 讯 间 长 队 体 丽 驳 庄 单 卖 卫 刚 划 均 布 席 庞 乔 亿 华 乐 举 仓 买 乱 丧 亚 亲 冲 压 庆 击 份 军 农 决 冻 净 凑 这 门 闪 闭 闲 闹 闸 阅 阀 阁 网 内 冈 写 冯 冰 况 减 凝 凭 凯 删 别 剑 剧 剩 剪 灭 厌 厅 厕 厉 县 参 双 变 叶 号 叹 鸣 员 驾 驾 苍 苹 荐 数 药 虑 虚 虫 蚕 蚁 蝇 蜡 蝉 蝶 蟹 衬 袄 袜 袭 装 裤 觅 觉 览 订 计 认 讨 让 训 议 讯 记 讲 论 设 访 证 评 识 诊 词 诏 译 诗 诚 诛 话 诣 订 针 钉 钒 钓 钙 钛 铁 铃 铅 银 铜 铝 锌 锐 锈 键 锁 链 镇 镜 长 门 闯 闰 闲 阅 闹 阔 阚 阵 陆 陕 险 随 隐 难 骀 骁 骊 骋 验 骑 骗 骚 骤 鱼 鲁 鲜 鲈 鲑 鲤 鲨 鲫 鲭 鲲 鲵 鲷 鲸 鳃 鳄 鳅 鳌 鳍 鳏 鳕 鳗 鳜 鸟 鸡 鸦 鸨 鸩 鸽 鸾 鸿 鹅 鹉 鹏 鹤 鹦 鹰 盐 麦 黄 黉
2. **保留所有佔位符**：`{{name}}`、`{{count}}`、`{{value0}}` 等，拼写與順序都不可改
3. **保留所有標記**：`<path>...</path>`、`<cmd>...</cmd>`、`<label>...</label>`、`<code>...</code>`、`<link>...</link>`
4. 保留 `{key}` 形式的 i18n 參考（例如 `{sidebar.projects.toggleCollapse}`）
5. 保留反引號 `\`code\``、檔案路徑、網址、數字、產品名稱與技術術語原文
6. 不要用「”“」或 `"` 當引號；需要強調時用「」或不要加引號
7. 語氣簡潔、自然，符合台灣繁中 UI 習慣

## 產品與專有名詞（保留原文，不翻譯）
Orca, Claude, Codex, GitHub, GitLab, Jira, Linear, Slack, Gmail, Google, WSL, SSH, ACP, MCP, CLI, PTY, Orca Agents, Copilot, Kimi, Grok, Antigravity, OpenCode, Qwen, Hermes, CodeBuddy, Droid, iTerm, PowerShell, Git Bash, WebView, Chrome

## 術語對照（務必一致）
| 英文 | 繁中（台灣） |
|---|---|
| agent | 代理程式 |
| bot | 機器人 |
| session | 工作階段 |
| chat / conversation | 聊天 / 對話 |
| terminal | 終端機 |
| workspace | 工作區 |
| worktree | 工作樹 |
| project | 專案 |
| repository / repo | 存放庫 |
| file | 檔案 |
| folder | 資料夾 |
| tab | 分頁 |
| settings | 設定 |
| save | 儲存 |
| delete | 刪除 |
| remove | 移除 |
| cancel | 取消 |
| approve / approval | 核准 |
| permission | 權限 |
| refresh | 重新整理 |
| view | 檢視 |
| click / tap | 按一下 / 輕點 |
| open / close | 開啟 / 關閉 |
| link | 連結 |
| message | 訊息 |
| notification | 通知 |
| memory | 記憶 |
| automation | 自動化 |
| update | 更新 |
| download | 下載 |
| install | 安裝 |
| sign in | 登入 |
| account | 帳號 |
| usage | 用量 |
| limit | 上限 |
| error | 錯誤 |
| failed / failure | 失敗 |
| retry | 重試 |
| rerun | 重新執行 |
| search | 搜尋 |
| filter | 篩選 |
| stage / staged | 暫存 / 已暫存 |
| commit | 提交 |
| branch | 分支 |
| pull request / PR | PR |
| review | 評審 |
| sidebar | 側邊欄 |
| status bar | 狀態列 |
| model | 模型 |
| host | 主機 |
| device | 裝置 |
| desktop | 桌面 |
| phone | 手機 |
| copy | 複製 |
| paste | 貼上 |
| reset | 重設 |
| default | 預設 |
| optional | 選用 |
| loading | 載入中 |
| running | 執行中 |
| idle | 閒置 |
| offline | 離線 |
| online | 上線 |
| unread | 未讀 |
| archive | 封存 |
| backup | 備份 |
| workspace card | 工作區卡片 |
| smart rail | 智慧快捷列 |

## 複數鍵
`_one` / `_other` 等複數後綴的 key，中文譯文通常相同（都帶 `{{count}}`）；照英文意思翻即可，不要改成不含佔位固定文字。
