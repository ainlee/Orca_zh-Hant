// 完整驗收：所有翻譯批次的鍵完整、佔位符一致、無簡體字、無空值、無英式引號
import fs from 'node:fs'

const repo = 'F:/DevProjects/OrcaADE/orca-zh'
const SIMP = [...new Set('们个为发经会该过问讯间长队体丽驳庄单卖卫刚划庞乔亿华乐举仓买乱丧亚亲冲压庆击军农决冻净凑'.split(''))]

const jobs = [
  { prefix: 'desktop-t', count: 30, missing: '../missing-src_renderer_src_i18n_locales.json', en: 'src/renderer/src/i18n/locales/en.json' },
  { prefix: 'mobile-t', count: 8, missing: '../missing-mobile_src_i18n_locales.json', en: 'mobile/src/i18n/locales/en.json' },
]

function flat(o, p = '', out = new Map()) {
  if (typeof o === 'string') { out.set(p, o); return out }
  if (!o || typeof o !== 'object' || Array.isArray(o)) return out
  for (const [k, v] of Object.entries(o)) flat(v, p ? `${p}.${k}` : k, out)
  return out
}
const ph = s => [...(s.match(/\{\{[^}]*\}\}/g) || [])].sort().join('|')

for (const job of jobs) {
  const missingKeys = new Map(JSON.parse(fs.readFileSync(job.missing, 'utf8')).map(m => [m.key, m.en]))
  const enFlat = flat(JSON.parse(fs.readFileSync(`${repo}/${job.en}`, 'utf8')))
  const allTrans = {}
  const fileErrs = []
  for (let i = 0; i < job.count; i++) {
    const n = String(i).padStart(2, '0')
    const f = `./${job.prefix}${n}.mjs`
    if (!fs.existsSync(f)) { fileErrs.push(`${f} 不存在`); continue }
    try { Object.assign(allTrans, (await import(f)).default) }
    catch (e) { fileErrs.push(`${f} 載入失敗: ${e.message}`) }
  }
  const errs = []
  for (const [k, v] of Object.entries(allTrans)) {
    if (!missingKeys.has(k)) { errs.push(`不在缺鍵清單: ${k}`); continue }
    if (typeof v !== 'string' || !v.trim()) { errs.push(`空值: ${k}`); continue }
    const p1 = ph(enFlat.get(k) ?? ''), p2 = ph(v)
    if (p1 !== p2) errs.push(`佔位符不符: ${k} (en=${p1} zh=${p2})`)
    for (const c of SIMP) if (v.includes(c)) { errs.push(`簡體字「${c}」: ${k} = ${v}`); break }
    if (/[“”]/.test(v)) errs.push(`英式引號: ${k}`)
  }
  const missingInTrans = [...missingKeys.keys()].filter(k => !(k in allTrans))
  console.log(`\n=== ${job.prefix} ===`)
  console.log(`缺鍵=${missingKeys.size} 已翻=${Object.keys(allTrans).length} 漏翻=${missingInTrans.length} 錯誤=${errs.length + fileErrs.length}`)
  for (const e of fileErrs) console.log('  ✗', e)
  for (const e of errs.slice(0, 50)) console.log('  ✗', e)
  if (missingInTrans.length) console.log('  漏翻:', JSON.stringify(missingInTrans.slice(0, 30)))
}
