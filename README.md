# Orca 繁體中文化補丁（Orca_zh-Hant）

此儲存庫提供 Orca 的 **繁體中文（zh-Hant）語系 plugin**（data-only），作為「完整修補」語系安裝使用，**不修改** Orca 內建 `zh-Hant-*.json`。

## 以 GitHub 安裝（推薦）

在已安裝 Orca 且可用 `orca` CLI 的機器上執行：

```powershell
& "C:\Users\<你>\AppData\Local\Programs\orca\resources\bin\orca.exe" plugin install https://github.com/ainlee/Orca_zh-Hant.git --json
```

或：

```powershell
& "C:\Users\<你>\AppData\Local\Programs\orca\resources\bin\orca.exe" plugin install ainlee/Orca_zh-Hant --json
```

安裝後重啟 Orca，於 **Settings > Language** 選擇：**繁體中文（台灣）完整修補**。

> 備註：publisher 由 GitHub owner 推導為 `ainlee`，安裝後 plugin key 會是 `ainlee.zh-hant-full-patch`。

## 本 repo 結構（插件）

- `orca-plugin.json`：插件清單（language pack）
- `locales/zh-Hant.json`：完整繁中 catalog（來自維護來源）
- `src/`、`mobile/`、`maintenance/`：維護用原始/對照與腳本（不影響插件載入；保留供追溯）

## 版本策略

建議 `version` 跟隨對應的 **Orca 官方版本**（例如 `1.4.269`），方便對應支援的 Orca 版本與後續更新。每次 Orca 發新版、翻譯有增補時，更新 `locales/zh-Hant.json` 並同步調整 `version`（或改用 `1.4.269.1` 這類 patch 版本，依你偏好）。

## 維護流程（簡述）

1. 從 `F:\DevProjects\OrcaADE\orca-zh\src\renderer\src\i18n\locales\zh-Hant.json`（或你的維護來源）更新 `locales/zh-Hant.json`。
2. 視需要更新 `version`（建議跟隨 Orca 官方版本）。
3. Commit + push 到 GitHub。

## 授權與來源

- 本 repo 僅包含繁體中文化補丁/插件與維護產物。
- Orca 本體為上游專案所有；使用時請遵循上游授權與相關條款。