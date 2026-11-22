import { readFileSync, writeFileSync } from 'node:fs'
const p = 'F:/DevProjects/OrcaADE/orca-zh/src/renderer/src/i18n/locales/zh-Hant.json'
let s = readFileSync(p, 'utf8')
const fixes = [
  ['settings.browser.memorySaver.description', [['所占', '所佔']]],
  ['settings.groupHooks.description', [['创建', '建立']]],
  ['auto.lib.ephemeralVmEnvironmentCheck.openedDegraded', [['创建', '建立']]],
  ['auto.components.worktree.creation.PendingNativeChatCreation.sendBlockedFailed', [['创建', '建立']]],
  ['auto.components.worktree.creation.VmBuildSheet.create', [['创建', '建立']]],
  ['auto.components.worktree.creation.VmBuildSheet.openAnywayHint', [['创建', '建立']]],
  ['auto.components.worktree.creation.WorktreeSetupSteps.create', [['创建', '建立']]],
  ['auto.components.settings.appearance.search.statusBarUsageFormat.description', [['占位符', '佔位符']]],
  ['auto.components.settings.appearance.search.statusBarUsageFormat.placeholder', [['占位符', '佔位符']]],
  ['auto.components.settings.StatusBarUsageFormatSetting.placeholder.optional', [['占位符', '佔位符']]],
  ['components.native-chat.approval.folderTrust.hint', [['征得', '徵得'], ['读取', '讀取'], ['此檔案夾中的文件', '此資料夾中的檔案']]],
  ['components.native-chat.contextMenu.noSessionContext', [['没有可用', '沒有可用']]],
  ['components.native-chat.ciResultLine.failingLead', [['失敗于', '失敗於']]],
  ['components.native-chat.ciResultLine.greenLead', [['通過于', '通過於']]],
  ['components.native-chat.ciResultLine.at', [['于', '於']]],
  ['components.settings.nativeChat.usageLimitContinueCopy', [['额度', '額度']]],
  ['components.settings.nativeChat.usageLimitContinueSearchLimit', [['额度', '額度']]],
  ['components.settings.nativeChat.usageLimitContinueTitle', [['额度', '額度']]],
  ['components.settings.nativeChat.usageLimitContinueToggleLabel', [['额度', '額度']]],
  ['components.contextualTours.agentSessions.newTab.body', [['浏览器标签页', '瀏覽器分頁']]],
  ['components.contextualTours.agentSessions.newTab.title', [['这里', '這裡']]],
  ['components.dictation.cleanupNotice.timedOut', [['超时', '超時']]],
  ['components.RepositoryBrowserProfileSection.description', [['新开', '新開']]],
  ['resourceManager.owner.description', [['所占', '所佔']]],
  ['wslDriveProject.blocker.notWindowsDrive', [['驱動器', '驅動器']]],
  ['wslDriveProject.blocker.worktreeFolder', [['驱動器', '驅動器']]],
  ['wslDriveProject.description', [['驱動器', '驅動器']]],
  ['wslDriveUnc.blocker.mixed', [['驱動器', '驅動器']]],
  ['wslDriveUnc.blocker.notConvertible', [['驱動器', '驅動器']]],
  ['wslDriveUnc.blocker.notDriveMount', [['驱動器', '驅動器']]],
  ['auto.components.sidebar.SidebarHeader.collapseAllProjects', [['折疊所有專案', '摺疊所有專案']]],
]
const obj = JSON.parse(s)
function get(path) { let c = obj; for (const p of path.split('.')) { if (!c || typeof c !== 'object') return undefined; c = c[p] } return c }
let fail = false
for (const [key, reps] of fixes) {
  let old = get(key)
  if (typeof old !== 'string') { console.log(`⚠ 略過 ${key}: 值不存在`); fail = true; continue }
  const needle = JSON.stringify(old)
  const count = s.split(needle).length - 1
  if (count !== 1) { console.log(`⚠ 略過 ${key}: 舊值出現 ${count} 次`); fail = true; continue }
  let next = old
  for (const [from, to] of reps) {
    if (!next.includes(from)) { console.log(`⚠ 略過 ${key}: 找不到 ${from}`); fail = true; continue }
    next = next.replaceAll(from, to)
  }
  s = s.replace(needle, JSON.stringify(next))
  console.log(`✓ ${key}: ${reps.map(([a, b]) => `${a}→${b}`).join(', ')}`)
}
if (fail) { console.error('\n有項目未修正，中止寫入'); process.exit(1) }
writeFileSync(p, s, 'utf8')
console.log(`\n已寫入 ${fixes.length} 個 key 的修正`)
