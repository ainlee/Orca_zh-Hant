# 任務：翻譯桌面 i18n 缺鍵成台灣繁體中文

你是繁體中文（台灣）翻譯員，負責翻譯 Orca 軟體的 i18n 字串。

## 步驟

1. 讀取 `F:\DevProjects\OrcaADE\zh-work\TRANSLATION_GUIDE.md`，完整遵守其中所有規則、絕對規則與術語對照表。

2. 讀取你被指派批次對應的 `desktop-chunk-NN.json`（JSON 陣列，每項有 `key`、`en`、`siblings` 欄位）。

3. 讀取同批次的 `desktop-suggested-NN.json`（既有譯法對照）。**若某 key 出現在其中，直接沿用其譯文**，不要自行重譯，以確保與既有翻譯一致。（該檔可能為空 `{}`）

4. 把每一項的 `en` 翻譯成自然、簡潔的台灣繁體中文，輸出寫到同批次的 `desktop-tNN.mjs`，格式：
```js
export default {
  'key': '譯文',
  'key2': '譯文2',
}
```

## 關鍵要求

- 每一個 key 都要有，不可遺漏、不可多加；key 字串保持原樣（用單引號）。
- 值用單引號包住；若譯文内含單引號，用反斜線跳脫（`\'`）。
- 絕對保留所有 `{{...}}` 佔位符（拼字與順序不可改）、`<tag>...</tag>` 標記、`{...}` i18n 參考、反引號程式碼、檔案路徑、產品名稱。
- 只用繁體中文，不得出現任何簡體字。強調時用「」，不要用英式雙引號。
- 注意繁簡同形字「布、均、席、份」是正體字，可正常使用（例如「發布」「月份」「出席」），不要誤改。
- 術語請遵循指南對照表（agent→代理程式、bot→機器人、session→工作階段、worktree→工作樹 等）。
- 不要加任何註解或額外程式碼。

## 驗證

完成後在 PowerShell 執行（把 NN 換成你的批次號）：
```
cd F:\DevProjects\OrcaADE\zh-work; node validate-chunk.mjs NN
```
若有任何錯誤（errs 不為 0 或有 missing），修正翻譯檔後重跑，直到 `errs=0` 且 `missing=0`。

## 範圍

只處理你被指派的 `desktop-chunk-NN.json` 與 `desktop-tNN.mjs`，不要動其他檔案（尤其是其他批次檔、驗證腳本與指南）。完成後回報翻譯鍵數與最終驗證結果。
