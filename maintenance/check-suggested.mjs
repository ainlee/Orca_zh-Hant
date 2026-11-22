import fs from 'node:fs'
const repo = 'F:/DevProjects/OrcaADE/orca-zh'
const SIMP = [...new Set('们个为发经会该过问讯间长队体丽驳庄单卖卫刚划庞乔亿华乐举仓买乱丧亚亲冲压庆击军农决冻净凑'.split(''))]
const ph = s => [...(s.match(/\{\{[^}]*\}\}/g) || [])].sort().join('|')
function flat(o, p = '', out = new Map()) {
  if (typeof o === 'string') { out.set(p, o); return out }
  if (!o || typeof o !== 'object' || Array.isArray(o)) return out
  for (const [k, v] of Object.entries(o)) flat(v, p ? `${p}.${k}` : k, out)
  return out
}
for (const [sugF, missingF, enFile] of [
  ['suggested-desktop.json', '../missing-src_renderer_src_i18n_locales.json', 'src/renderer/src/i18n/locales/en.json'],
  ['suggested-mobile.json', '../missing-mobile_src_i18n_locales.json', 'mobile/src/i18n/locales/en.json'],
]) {
  const sug = JSON.parse(fs.readFileSync(sugF, 'utf8'))
  const en = flat(JSON.parse(fs.readFileSync(`${repo}/${enFile}`, 'utf8')))
  const bad = []
  for (const [k, v] of Object.entries(sug)) {
    if (ph(en.get(k) ?? '') !== ph(v)) bad.push(`佔位符不符: ${k} (${v})`)
    for (const c of SIMP) if (v.includes(c)) { bad.push(`簡體字「${c}」: ${k} = ${v}`); break }
    if (/[“”]/.test(v)) bad.push(`英式引號: ${k} = ${v}`)
    if (!v.trim()) bad.push(`空值: ${k}`)
  }
  console.log(`\n${sugF}: ${Object.keys(sug).length} 鍵, 問題 ${bad.length}`)
  for (const b of bad.slice(0, 30)) console.log('  ✗', b)
}
