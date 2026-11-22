# Orca_zh-Hant 維護工作流程（AGENTS）

本 repo 是 **Orca 繁體中文（zh-Hant）完整修補** 的 data-only language-pack plugin。目標：在不修改 Orca 內建語系檔的前提下，透過 GitHub 安裝提供完整繁中介面。

## 關鍵事實（不要違反）

- **Plugin 類型**：`manifestVersion: 2`、`execution: "data"`、`contributes.languagePacks`。
- **安裝來源**：`https://github.com/ainlee/Orca_zh-Hant.git`（安裝 key 預期為 `ainlee.zh-hant-full-patch`，publisher 由 GitHub owner 推導）。
- **完整 catalog 必須**：language pack 缺鍵會 fallback 到英文（`en`）。因此 `locales/zh-Hant.json` 必須維持「完整 catalog」，不可只放差異鍵。
- **不要改內建 asset**：不要覆寫 Orca 安裝目錄內的 `zh-Hant-*.json` / `app.asar` 內容；維護方式是更新 plugin、重裝/更新 plugin。
- **受保護字串**：Orca 會忽略部分安全/系統敏感字串（plugin validate 可能出現 "protected strings are ignored" 警告），屬預期行為。
- **版本策略**：`orca-plugin.json` 的 `version` 建議跟隨對應 Orca 官方版本（例如 `1.4.269`）。同一官方版內的翻譯修補可用 `1.4.269.1`、`1.4.269.2`。

## 檔案角色

| 檔案/目錄 | 角色 | 更新時機 |
|---|---|---|
| `orca-plugin.json` | Plugin manifest（版本、languagePack 路徑） | 每次發布都要檢查/更新 `version` |
| `locales/zh-Hant.json` | **Plugin 實際載入的繁中 catalog（canonical）** | 官方更新/翻譯修補時更新 |
| `src/renderer/src/i18n/locales/zh-Hant.json` | 維護/對照來源（歷史相容） | 建議與 `locales/zh-Hant.json` 同步 |
| `mobile/.../zh-Hant.json` | 行動版語系（若有維護） | 依行動版需求更新 |
| `maintenance/` | 檢查/合併/驗證腳本與缺漏清單 | 需要時使用；注意腳本可能含舊工作區路徑假設 |
| `README.md` | 安裝說明 | 流程或版本策略變更時更新 |

> 原則：**先更新 `locales/zh-Hant.json`**，再同步 `src/renderer/src/i18n/locales/zh-Hant.json`（兩者應保持一致）。

## 官方新版本發布時的標準流程

### 0. 準備

- 確認目標 Orca 版本（例：`1.4.270`）。
- 在本機保留對應版本的 Orca 安裝/原始碼參考（至少要能取得新版本 `en.json` 或官方 `zh-Hant` 基準）。
- 工作目錄：`F:\DevProjects\Orca_zh-Hant`。

### 1. 取得/更新繁中 catalog

依情況選一種：

1. **有官方/上游新版 zh-Hant**：以新版完整 `zh-Hant.json` 為基底，合併既有繁中修補（避免退回簡中或英文）。
2. **只有新版 en.json / 缺漏鍵**：先找出新增/缺漏 key，補齊繁中翻譯後合併回完整 catalog。
3. **快速修補**：直接編修 `locales/zh-Hant.json`，但仍要確保 key 完整、JSON 有效、無簡體殘留。

更新後同步：

```powershell
Copy-Item .\locales\zh-Hant.json .\src\renderer\src\i18n\locales\zh-Hant.json -Force
```

### 2. 本地檢查

```powershell
# JSON 可解析
Get-Content .\locales\zh-Hant.json -Raw | ConvertFrom-Json | Out-Null

# 檔案大小/雜湊（確認有變更）
Get-FileHash .\locales\zh-Hant.json -Algorithm SHA256

# 與 src 對照一致
Get-FileHash .\locales\zh-Hant.json,.\src\renderer\src\i18n\locales\zh-Hant.json -Algorithm SHA256
```

如需更完整檢查，可參考 `maintenance/` 腳本（執行前先檢視腳本路徑假設）：

- `maintenance/validate.mjs` / `validate-all.mjs`
- `maintenance/final-check.mjs`
- `maintenance/ui-term-audit.mjs`
- `maintenance/simp-scan*.mjs`（簡體殘留掃描）

### 3. 更新 manifest 版本

編輯 `orca-plugin.json`：

- `version`：跟隨官方版號（建議）或使用 patch 版。
- `engines.orca`：若新版本有最低相容需求再調整；通常維持 `>=1.4.245` 或依實測更新。

### 4. Commit / Tag / Push

```powershell
Set-Location F:\DevProjects\Orca_zh-Hant
git add orca-plugin.json locales/zh-Hant.json src/renderer/src/i18n/locales/zh-Hant.json README.md
git commit -m "chore: update zh-Hant catalog for Orca <X.Y.Z>"
git tag v<X.Y.Z>   # 若同版多次修補可用 v<X.Y.Z>.1
git push origin main --tags
```

> 注意：push 是離開本機的遠端操作；執行前確認變更內容正確。

### 5. 安裝驗證

```powershell
& "C:\Users\艾因\AppData\Local\Programs\orca\resources\bin\orca.exe" plugin install https://github.com/ainlee/Orca_zh-Hant.git --json
& "C:\Users\艾因\AppData\Local\Programs\orca\resources\bin\orca.exe" plugin list --json
```

驗證清單：

- [ ] `plugin list` 顯示 `ainlee.zh-hant-full-patch`，版本正確。
- [ ] Orca 重啟後 **Settings > Language** 可選「繁體中文（台灣）完整修補」。
- [ ] 主要畫面無大量英文 fallback、無載入錯誤。
- [ ] 若有「找不到版本標籤」提示：確認對應 tag 已 push；不影響已安裝 commit 內容。

## 常見問題

- **安裝回 `runtime_unavailable`**：Orca 主程式尚未完全啟動或缺 `%APPDATA%\orca\orca-runtime.json`，先啟動 Orca 再重試。
- **語言切換失敗/異常**：檢查 JSON 是否完整、是否有破壞性 key 結構；確認是安裝 plugin 而非覆寫內建 asset。
- **仍有英文**：可能是缺鍵 fallback、或 Orca protected strings（預期）。缺鍵需補 catalog；protected strings 不應硬改。
- **`maintenance/` 腳本路徑失效**：這些腳本來自舊維護工作區，使用前先檢查腳本內的輸入/輸出路徑與工作目錄假設。

## 發版檢查清單（精簡）

- [ ] `locales/zh-Hant.json` 已更新且為完整 catalog
- [ ] `src/renderer/src/i18n/locales/zh-Hant.json` 已同步
- [ ] `orca-plugin.json` version 已更新
- [ ] JSON parse 通過
- [ ] commit message / tag 正確
- [ ] 已 push `main` + tag
- [ ] Orca 安裝驗證通過