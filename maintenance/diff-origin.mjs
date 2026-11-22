import { execFileSync } from 'node:child_process'
import { readFileSync } from 'node:fs'
const repo = 'F:/DevProjects/OrcaADE/orca-zh'
function flat(o, p = '', out = new Map()) {
  if (typeof o === 'string') { out.set(p, o); return out }
  if (!o || typeof o !== 'object' || Array.isArray(o)) return out
  for (const [k, v] of Object.entries(o)) flat(v, p ? `${p}.${k}` : k, out)
  return out
}
const oldZh = flat(JSON.parse(execFileSync('git', ['-C', repo, 'show', `origin/main:src/renderer/src/i18n/locales/zh-Hant.json`], { encoding: 'utf8', maxBuffer: 50 * 1024 * 1024 })))
const newZh = flat(JSON.parse(readFileSync(`${repo}/src/renderer/src/i18n/locales/zh-Hant.json`, 'utf8')))
const protectedKeys = new Set(JSON.parse(readFileSync(`${repo}/src/shared/plugins/languages/protected-copy-keys.json`, 'utf8')).keys)
const targets = [
  'settings.groupHooks.description',
  'auto.components.sidebar.SidebarHeader.collapseAllProjects',
  'auto.components.settings.GeneralEditorSettingsSection.916c5582f2',
  'auto.components.settings.general.search.collapseUnchangedKw',
  'auto.components.settings.general.search.foldKw',
  'auto.components.settings.GitHubPRStackMap.7737bd66be',
  'auto.components.right.sidebar.FileExplorerToolbar.31b4c3195d',
  'auto.components.right.sidebar.FileExplorerToolbar.d95e30fe28',
  'auto.components.sidebar.WorktreeOpenInMenu.bd0e8159f8',
  'auto.components.settings.KeybindingsFileActions.c322555264',
]
for (const k of targets) {
  console.log(`\n=== ${k} ===`)
  console.log(`  origin: ${oldZh.get(k) ?? '(不存在)'}`)
  console.log(`  now   : ${newZh.get(k) ?? '(不存在)'}`)
  console.log(`  status: ${oldZh.has(k) ? '既有' : '新增'} / protected=${protectedKeys.has(k)}`)
}
// 全面掃描新增鍵的簡體可疑字
const simp = [...new Set('们个为发经会该过问讯间长队体丽驳庄单卖卫刚划庞乔亿华乐举仓买乱丧亚亲冲压庆击军农决冻净凑创设备这样远过还进语言选择设置问题时间' .split(''))]
console.log('\n=== 新增鍵含簡體可疑字 ===')
let n = 0
for (const [k, v] of newZh) {
  if (oldZh.has(k)) continue
  const hits = simp.filter(c => v.includes(c))
  if (hits.length) { console.log(`  ${k} [${hits.join('')}] ${v}`); n++; if (n > 60) break }
}
console.log(`total(shown)=${n}`)
