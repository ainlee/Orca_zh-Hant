// 比對 en.json 與 zh-Hant.json，列出缺鍵（含正確複數規則）
// 規則：每個複數族 B，若 en 有 B_other，則合併後的目錄必須有 B_one 與 B_other
//      （官方 verify 的 CLDR 補齊檢查：目錄有 _other 就要求所有 zh CLDR 類別 one/other）
//      若 en 只有 B_one，只需 B_one。
import fs from 'node:fs'

const dir = process.argv[2] ?? 'src/renderer/src/i18n/locales'
const root = 'F:/DevProjects/OrcaADE/orca-zh'
const outName = process.argv[4] ?? `F:/DevProjects/OrcaADE/zh-work/missing-${dir.replace(/[\\/]+/g, '_')}.json`

function load(name) {
  return JSON.parse(fs.readFileSync(`${root}/${dir}/${name}.json`, 'utf8'))
}
function flatten(value, prefix = '', out = new Map()) {
  if (typeof value === 'string') { out.set(prefix, value); return out }
  if (typeof value !== 'object' || value === null || Array.isArray(value)) return out
  for (const [k, v] of Object.entries(value)) flatten(v, prefix ? `${prefix}.${k}` : k, out)
  return out
}

const langs = ['zh', 'ja']
const en = flatten(load('en'))
const zhHant = flatten(load('zh-Hant'))
const refs = Object.fromEntries(langs.map(l => [l, flatten(load(l))]))

const plural = /^(.*)_(zero|one|two|few|many|other)$/
// 1) 先按正確規則算出需要的缺鍵
const needed = new Set()
for (const key of en.keys()) {
  if (zhHant.has(key)) continue
  const m = plural.exec(key)
  if (m) {
    // 複數形式：只有在其「族」需要的類別裡才算缺
    const [base, cat] = m
    const enHasOther = en.has(base + '_other')
    const enHasOne = en.has(base + '_one')
    // 需要的形式：en 有 _other → one+other；只有 _one → one；只有 _other → 不單獨需要（會由 _one 族規則覆蓋；若無 _one 則目錄補齊檢查不觸發，但為了完整仍補 _other）
    const wanted = new Set()
    if (enHasOther) { wanted.add('one'); wanted.add('other') }
    if (enHasOne) wanted.add('one')
    if (!enHasOne && !enHasOther) wanted.add(cat) // 不該發生
    if (wanted.has(cat)) needed.add(key)
    // 把同族的其他需要形式也加進來（即使它已在 en 裡，但若 zh-Hant 缺就要補）
    for (const w of wanted) {
      const wk = base + '_' + w
      if (en.has(wk) && !zhHant.has(wk)) needed.add(wk)
    }
  } else {
    needed.add(key)
  }
}
// 2) 去重後排序
const missing = [...needed].sort().map(key => ({
  key,
  en: en.get(key),
  zh: refs.zh.get(key),
  ja: refs.ja.get(key),
}))
fs.writeFileSync(outName, JSON.stringify(missing, null, 1))
console.log(`${dir}: 需翻譯 ${missing.length} 鍵（含複數補齊）`)
