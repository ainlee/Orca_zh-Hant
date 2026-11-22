# Orca 繁體中文化補丁（Orca_zh-Hant）

此儲存庫作為 **Orca 繁體中文化補丁專案** 使用，僅收錄繁體中文（zh-Hant）語系檔與維護用腳本/清單，不包含 Orca 上游完整原始碼。

## 內容

- `src/renderer/src/i18n/locales/zh-Hant.json`：Orca 桌面版/Renderer 繁體中文語系檔。
- `mobile/src/i18n/locales/zh-Hant.json`：Orca 行動版繁體中文語系檔（`mobile/src/i18n/locales` 路徑）。
- `mobile/locales/zh-Hant.json`：Orca 行動版繁體中文語系檔（`mobile/locales` 路徑，與部分版本相容）。
- `maintenance/missing-src_renderer_src_i18n_locales.json`：桌面版缺漏鍵清單（維護產物）。
- `maintenance/missing-mobile_src_i18n_locales.json`：行動版缺漏鍵清單（維護產物）。
- `maintenance/zh-Hant-upstream-sample.json`：上游/參考樣本（維護產物）。
- `maintenance/*.mjs`、`maintenance/*.cjs`、`maintenance/*.md`：翻譯維護、檢查、合併、驗證腳本與說明。

## 使用方式（手動套用）

1. 取得對應版本的 Orca 原始碼或安裝檔內容。
2. 將本 repo 的 `zh-Hant.json` 覆蓋/放置到 Orca 對應路徑：
   - `src/renderer/src/i18n/locales/zh-Hant.json`
   - `mobile/src/i18n/locales/zh-Hant.json`
   - `mobile/locales/zh-Hant.json`（若該版本使用此路徑）
3. 重新建置或重新封裝 Orca 後驗證介面顯示。

> 注意：語系鍵可能隨 Orca 上游版本變動。升級 Orca 後，請先比對 `maintenance/missing-*.json` 或重新產生缺漏清單，再補齊翻譯。

## 維護

`maintenance/` 內的腳本主要來自繁中化維護工作區，部分腳本可能依賴原始工作區的檔案結構或產物。使用前請先檢視腳本內的路徑假設與輸入/輸出檔名。

## 授權與來源

- 本 repo 僅包含繁體中文化補丁與維護產物。
- Orca 本體為上游專案所有；使用時請遵循上游授權與相關條款。
