import { readFileSync } from 'node:fs'
function flat(o, p = '', out = new Map()) {
  if (typeof o === 'string') { out.set(p, o); return out }
  if (!o || typeof o !== 'object' || Array.isArray(o)) return out
  for (const [k, v] of Object.entries(o)) flat(v, p ? `${p}.${k}` : k, out)
  return out
}
const zh = flat(JSON.parse(readFileSync('F:/DevProjects/OrcaADE/orca-zh/src/renderer/src/i18n/locales/zh-Hant.json', 'utf8')))
const en = flat(JSON.parse(readFileSync('F:/DevProjects/OrcaADE/orca-zh/src/renderer/src/i18n/locales/en.json', 'utf8')))
const pairs = [
  ['折疊/摺疊', /折疊|摺疊/],
  ['檔案總管/檔案管理員', /檔案總管|檔案管理員/],
  ['終端機/終端', /終端機|終端/],
  ['工作者/代理程式/機器人', /工作者|代理程式|機器人/],
  ['您/你', /您|你/],
]
for (const [label, re] of pairs) {
  console.log(`\n=== ${label} ===`)
  const rows = [...zh].filter(([, v]) => re.test(v))
  console.log(`count=${rows.length}`)
  for (const [k, v] of rows.slice(0, 50)) console.log(`  ${k}\n    EN: ${en.get(k)}\n    ZH: ${v}`)
}
