import OpenCC from 'opencc-js'
import { readFileSync } from 'node:fs'
const conv = OpenCC.Converter({ from: 'cn', to: 'tw' })
// OpenCC 會把台灣合法用法也轉換，這些不視為簡體問題
const legit = new Set(['台', '准', '游', '了', '表', '面', '系'])
function flat(o, p = '', out = new Map()) {
  if (typeof o === 'string') { out.set(p, o); return out }
  if (!o || typeof o !== 'object' || Array.isArray(o)) return out
  for (const [k, v] of Object.entries(o)) flat(v, p ? `${p}.${k}` : k, out)
  return out
}
for (const dir of ['src/renderer/src/i18n/locales', 'mobile/src/i18n/locales']) {
  const zh = flat(JSON.parse(readFileSync(`F:/DevProjects/OrcaADE/orca-zh/${dir}/zh-Hant.json`, 'utf8')))
  console.log(`\n=== ${dir} ===`)
  const bad = []
  for (const [k, v] of zh) {
    const c = conv(v)
    if (c === v) continue
    const chars = [...new Set([...v].filter((ch, i) => ch !== c[i] && /[\u4e00-\u9fff]/.test(ch) && !legit.has(ch)))]
    if (chars.length) bad.push([k, chars.join(''), v, c])
  }
  console.log(`真簡體可疑=${bad.length}`)
  for (const [k, chars, v, c] of bad.slice(0, 60)) console.log(`  ${k} [${chars}]\n    ZH: ${v}\n    TW: ${c}`)
}
