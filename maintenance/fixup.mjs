// 收尾修正：補上 find-missing 略過的 _one 複數鍵、修正 cliTooOld 佔位符、移除上游已刪除的舊鍵
import fs from 'node:fs'

const repo = 'F:/DevProjects/OrcaADE/orca-zh'
const jobs = [
  {
    dir: 'src/renderer/src/i18n/locales',
    oneKeys: [
      'auto.components.sidebar.RemoveFolderDialog.linkedWorkspaceWarning_one',
      'auto.components.NativeChatResumeToast.resumingOn_one',
      'auto.components.NativeChatResumeToast.resuming_one',
      'auto.components.NativeChatResumeToast.resumedOn_one',
      'auto.components.NativeChatResumeToast.resumedUpdate_one',
      'auto.components.NativeChatResumeToast.resumedRestart_one',
      'auto.components.NativeChatResumeToast.partial_one',
      'auto.components.NativeChatResumeToast.stoppedOn_one',
      'auto.components.NativeChatResumeToast.stoppedUpdate_one',
      'auto.components.NativeChatResumeToast.stoppedRestart_one',
      'bots.palette.scopedStatus_one',
    ],
    overrides: {
      'components.native-chat.failureWords.cliTooOld': '{{host}} 上的 {{agent}} {{installedVersion}} 版本過舊，無法用於聊天。請更新至 {{minimumVersion}} 或較新版本。',
    },
  },
  { dir: 'mobile/src/i18n/locales', oneKeys: [], overrides: {} },
]

function flat(o, p = '', out = new Map()) {
  if (typeof o === 'string') { out.set(p, o); return out }
  if (!o || typeof o !== 'object' || Array.isArray(o)) return out
  for (const [k, v] of Object.entries(o)) flat(v, p ? `${p}.${k}` : k, out)
  return out
}
function get(obj, path) { let c = obj; for (const p of path.split('.')) { if (!c || typeof c !== 'object') return undefined; c = c[p] } return c }
function setNested(obj, keyPath, value) {
  const parts = keyPath.split('.')
  let cur = obj
  for (let i = 0; i < parts.length - 1; i++) {
    if (!cur[parts[i]] || typeof cur[parts[i]] !== 'object') cur[parts[i]] = {}
    cur = cur[parts[i]]
  }
  cur[parts[parts.length - 1]] = value
}
function removeNested(obj, keyPath) {
  const parts = keyPath.split('.')
  let cur = obj
  for (let i = 0; i < parts.length - 1; i++) {
    if (!cur[parts[i]] || typeof cur[parts[i]] !== 'object') return
    cur = cur[parts[i]]
  }
  delete cur[parts[parts.length - 1]]
}
function pruneEmpty(obj) {
  for (const [k, v] of Object.entries(obj)) {
    if (v && typeof v === 'object' && !Array.isArray(v)) {
      pruneEmpty(v)
      if (Object.keys(v).length === 0) delete obj[k]
    }
  }
}

for (const job of jobs) {
  const zhPath = `${repo}/${job.dir}/zh-Hant.json`
  const enPath = `${repo}/${job.dir}/en.json`
  const zh = JSON.parse(fs.readFileSync(zhPath, 'utf8'))
  const enFlat = flat(JSON.parse(fs.readFileSync(enPath, 'utf8')))
  const zhFlat = flat(zh)

  let added = 0, removed = 0
  // 1) 補上 _one 鍵：沿用 _other 譯文
  for (const k of job.oneKeys) {
    if (zhFlat.has(k)) continue
    const other = k.replace(/_one$/, '_other')
    const v = zhFlat.get(other)
    if (typeof v !== 'string') { console.log(`  ⚠ 找不到 _other 譯文: ${k}`); continue }
    setNested(zh, k, v)
    added++
  }
  // 2) 覆寫修正（佔位符）
  for (const [k, v] of Object.entries(job.overrides)) {
    setNested(zh, k, v)
  }
  // 3) 移除上游 en.json 已不存在的舊鍵
  const extra = [...flat(zh).keys()].filter(k => !enFlat.has(k))
  for (const k of extra) { removeNested(zh, k); removed++ }
  pruneEmpty(zh)

  const out = JSON.stringify(zh, null, 2) + '\n'
  fs.writeFileSync(zhPath, out, 'utf8')
  console.log(`${job.dir}: 補上 ${added} 個 _one 鍵, 覆寫 ${Object.keys(job.overrides).length} 鍵, 移除 ${removed} 個舊鍵`)
}
