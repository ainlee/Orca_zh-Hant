# Orca 繁體中文化補丁（Orca_zh-Hant）

此儲存庫提供 Orca 的 **繁體中文（zh-Hant）語系 plugin**（data-only），作為「完整修補」語系安裝使用，**不修改** Orca 內建 `zh-Hant-*.json`。

- Repo: <https://github.com/ainlee/Orca_zh-Hant>
- Plugin id: `zh-hant-full-patch`
- 安裝後 plugin key: `ainlee.zh-hant-full-patch`（publisher 由 GitHub owner 推導）

## 安裝方式（建議）

**建議從 Orca 官方社群外掛市場安裝與更新。** 透過社群市場安裝，Orca 可偵測新版本並提示/自動更新；從本倉庫直接安裝則**無法自動偵測更新**，需自行追蹤版本與重新安裝。

- 社群外掛頁面（上架後）：<https://orca.dev/plugins/ainlee/Orca_zh-Hant>
- 安裝後重啟 Orca，於 **Settings > Language** 選擇：**繁體中文（台灣）完整修補**。

### 不建議：從 GitHub 直接安裝（無自動更新）

僅在無法使用社群市場時，才建議手動安裝：

```powershell
& "C:Users<你>AppDataLocalProgramsorcaesourcesinorca.exe" plugin install ainlee/Orca_zh-Hant --json
```

或指定完整 Git URL：

```powershell
& "C:Users<你>AppDataLocalProgramsorcaesourcesinorca.exe" plugin install https://github.com/ainlee/Orca_zh-Hant.git --json
```

> 注意：此方式不會由 Orca 社群市場管理更新。當本倉庫發布新版本時，請自行重新執行安裝指令或改用社群市場安裝。

## 上架 Orca 社群外掛目錄

本 repo 依 [Add your plugin](https://orca.dev/plugins/add/) 與 [Plugin listing policy](https://github.com/stablyai/orca/blob/main/docs/reference/plugin-listing-policy.md) 準備：

1. Repo 為公開、非 fork、非 archived，root 含 `orca-plugin.json`（manifest v2）。
2. `publisher` 由 GitHub owner 推導（`ainlee`），manifest 不硬寫 `publisher`。
3. 授權為 MIT（[LICENSE](LICENSE)）。
4. 發布使用 `vX.Y.Z` tag（目錄只認最新 3 段版本 tag）。
5. GitHub repo topic 需包含 `orca-plugin`。

發布新版本時：

```powershell
git tag v1.4.271
git push origin main
git push origin v1.4.271
```

加上 topic（首次）：

```powershell
gh repo edit ainlee/Orca_zh-Hant --add-topic orca-plugin
```

狀態頁（上架後）會在：`https://orca.dev/plugins/ainlee/Orca_zh-Hant`。

## 本 repo 結構（插件）

- `orca-plugin.json`：插件清單（language pack）
- `locales/zh-Hant.json`：完整繁中 catalog
- `src/`、`mobile/`、`maintenance/`：維護用原始/對照與腳本（不影響插件載入）

## 版本策略

`version` / tag 使用 Orca 相容的 `X.Y.Z`。目錄只認 `vX.Y.Z`，因此不使用四段版本。當 Orca 發新版或翻譯增補時，更新 `locales/zh-Hant.json`、同步 `version`、建立新 tag 並推送。

## 授權與來源

- 本 repo 的翻譯補丁/插件檔案以 [MIT License](LICENSE) 授權。
- Orca 本體為上游專案所有；使用時請遵循上游授權與相關條款。