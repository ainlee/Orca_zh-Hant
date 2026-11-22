// 合併後最終驗收：缺鍵、多餘鍵、空值、佔位符、簡體字、英式引號
import fs from 'node:fs'

const repo = 'F:/DevProjects/OrcaADE/orca-zh'
// 移除繁簡同形常用字，避免誤判
const SIMP = [...new Set('们个为发经会该过问讯间长队体丽驳庄单卖卫刚划庞乔亿华乐举仓买乱丧亚亲冲压庆击军农决冻净凑'.split(''))]
const ph = s => [...(s.match(/\{\{[^}]*\}\}/g) || [])].sort().join('|')
function flat(o, p = '', out = new Map()) {
  if (typeof o === 'string') { out.set(p, o); return out }
  if (!o || typeof o !== 'object' || Array.isArray(o)) return out
  for (const [k, v] of Object.entries(o)) flat(v, p ? `${p}.${k}` : k, out)
  return out
}
let failed = false
for (const dir of ['src/renderer/src/i18n/locales', 'mobile/src/i18n/locales']) {
  const en = flat(JSON.parse(fs.readFileSync(`${repo}/${dir}/en.json`, 'utf8')))
  const zh = flat(JSON.parse(fs.readFileSync(`${repo}/${dir}/zh-Hant.json`, 'utf8')))
  const missing = [...en.keys()].filter(k => !zh.has(k))
  const extra = [...zh.keys()].filter(k => !en.has(k))
  const errs = []
  for (const [k, v] of zh) {
    if (!v.trim()) { errs.push(`空值: ${k}`); continue }
    if (en.has(k) && ph(en.get(k)) !== ph(v)) errs.push(`佔位符不符: ${k} (en=${ph(en.get(k))} zh=${ph(v)})`)
    for (const c of SIMP) if (v.includes(c)) { errs.push(`簡體字「${c}」: ${k} = ${v}`); break }
    if (/[“”]/.test(v)) errs.push(`英式引號: ${k} = ${v}`)
  }
  console.log(`\n=== ${dir} ===`)
  console.log(`en=${en.size} zh=${zh.size} 缺鍵=${missing.length} 多餘鍵=${extra.length} 錯誤=${errs.length}`)
  if (missing.length) console.log('  缺鍵:', JSON.stringify(missing.slice(0, 20)))
  if (extra.length) console.log('  多餘鍵:', JSON.stringify(extra.slice(0, 20)))
  for (const e of errs.slice(0, 40)) console.log('  ✗', e)
  if (missing.length || extra.length || errs.length) failed = true
}
console.log(failed ? '\n❌ 最終驗收失敗' : '\n✅ 最終驗收通過')
if (failed) process.exitCode = 1
