// 驗收翻譯檔：檢查鍵完整、占位符一致、無簡體字、無空值、JSON 可寫入
import fs from 'node:fs'

const repo = 'F:/DevProjects/OrcaADE/orca-zh'
// 翻譯檔 -> 對應的 missing 清單
const jobs = [
  ['desktop-b5.mjs', 'missing-src_renderer_src_i18n_locales.json', 'src/renderer/src/i18n/locales/en.json'],
  ['desktop-b6.mjs', 'missing-src_renderer_src_i18n_locales.json', 'src/renderer/src/i18n/locales/en.json'],
  ['desktop-b7.mjs', 'missing-src_renderer_src_i18n_locales.json', 'src/renderer/src/i18n/locales/en.json'],
  ['desktop-b8.mjs', 'missing-src_renderer_src_i18n_locales.json', 'src/renderer/src/i18n/locales/en.json'],
  ['mobile-m1.mjs', 'missing-mobile_src_i18n_locales.json', 'mobile/src/i18n/locales/en.json'],
  ['mobile-m2.mjs', 'missing-mobile_src_i18n_locales.json', 'mobile/src/i18n/locales/en.json'],
  ['mobile-m3.mjs', 'missing-mobile_src_i18n_locales.json', 'mobile/src/i18n/locales/en.json'],
  ['mobile-m4.mjs', 'missing-mobile_src_i18n_locales.json', 'mobile/src/i18n/locales/en.json'],
  ['mobile-m5.mjs', 'missing-mobile_src_i18n_locales.json', 'mobile/src/i18n/locales/en.json'],
  ['mobile-m6.mjs', 'missing-mobile_src_i18n_locales.json', 'mobile/src/i18n/locales/en.json'],
  ['mobile-m7.mjs', 'missing-mobile_src_i18n_locales.json', 'mobile/src/i18n/locales/en.json'],
  ['mobile-m8.mjs', 'missing-mobile_src_i18n_locales.json', 'mobile/src/i18n/locales/en.json'],
]

// 簡體字特徵字（繁體應完全不含；挑出轉換會出錯的常見字）
const SIMPLIFIED = '们个为发复经会们说话该过问讯间长阳队体余丽贼驳庄单卖卫则刚场划均则布带席常待庞乔亿华乐举仓书买乱丧亚亲充冲庄压庆厅击份况军农决农况冻块坚场壳块处备复够头兴条冬况冻净减减凑准况冲决况冻况况况'
const SIMPLIFIED_SET = [...new Set('们个为发经会说话该过问讯间长阳队体余丽驳庄单卖卫刚场划均布带席常庞乔亿华乐举仓书买乱丧亚亲充冲压庆厅击份况军农决冻块坚场壳处备够头兴条冬净减凑准准况'.split(''))]
// 注意：「准、准」等字在繁體也用，只保留純簡體字
const STRICT_SIMPLIFIED = [...new Set('们个为发经会该过问讯间长队体丽驳庄单卖卫刚划均布席庞乔亿华乐举仓买乱丧亚亲冲压庆击份军农决冻净凑们个为发经会该过问讯间长队体丽驳庄单卖卫刚划均布席庞乔亿华乐举仓买乱丧亚亲冲压庆击份军农决冻净凑'.split(''))]

function placeholders(s) {
  return [...(s.match(/\{\{[^}]*\}\}/g) || [])].sort()
}

for (const [file, missingFile, enFile] of jobs) {
  const path = `F:/DevProjects/OrcaADE/zh-work/${file}`
  if (!fs.existsSync(path)) { console.log(`\n## ${file}: 尚未產生`); continue }
  const mod = await import(path)
  const trans = mod.default
  const en = JSON.parse(fs.readFileSync(`${repo}/${enFile}`, 'utf8'))
  const flatEn = {}
  ;(function walk(o, p) { for (const [k, v] of Object.entries(o)) { const q = p ? p + '.' + k : k; if (typeof v === 'string') flatEn[q] = v; else if (v && typeof v === 'object') walk(v, q) } })(en)

  let ok = true
  const errs = []
  // 1. 每個值必須對應 missing 清單裡的鍵
  const missingKeys = new Set(JSON.parse(fs.readFileSync(`F:/DevProjects/OrcaADE/${missingFile}`, 'utf8')).map(m => m.key))
  for (const [k, v] of Object.entries(trans)) {
    if (!missingKeys.has(k)) { errs.push(`未列在缺鍵清單: ${k}`); continue }
    if (typeof v !== 'string' || !v.trim()) { errs.push(`空值或非字串: ${k}`); continue }
    const p1 = placeholders(flatEn[k] ?? ''), p2 = placeholders(v)
    if (p1.join('|') !== p2.join('|')) errs.push(`占位符不符: ${k}\n  en: ${p1}\n  zh: ${p2}`)
    for (const c of STRICT_SIMPLIFIED) if (v.includes(c)) { errs.push(`疑似簡體字「${c}」: ${k} = ${v}`); break }
    if (/[“”]/.test(v)) errs.push(`含英式引號: ${k}`)
  }
  const missingInTrans = [...missingKeys].filter(k => !(k in trans))
  console.log(`\n## ${file}: ${Object.keys(trans).length} 鍵, 錯誤 ${errs.length}, 漏翻 ${missingInTrans.length}`)
  for (const e of errs.slice(0, 40)) console.log('  ✗', e.replace(/\n/g, ' '))
  if (errs.length === 0 && missingInTrans.length === 0) ok = true
  else ok = false
  if (!ok) process.exitCode = 1
}
console.log('\n驗收完成')
