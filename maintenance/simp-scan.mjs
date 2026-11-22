import OpenCC from 'opencc-js'
import { execFileSync } from 'node:child_process'
import { readFileSync } from 'node:fs'
const repo = 'F:/DevProjects/OrcaADE/orca-zh'
const conv = OpenCC.Converter({ from: 'cn', to: 'tw' })
function flat(o, p = '', out = new Map()) {
  if (typeof o === 'string') { out.set(p, o); return out }
  if (!o || typeof o !== 'object' || Array.isArray(o)) return out
  for (const [k, v] of Object.entries(o)) flat(v, p ? `${p}.${k}` : k, out)
  return out
}
const oldZh = flat(JSON.parse(execFileSync('git', ['-C', repo, 'show', 'origin/main:src/renderer/src/i18n/locales/zh-Hant.json'], { encoding: 'utf8', maxBuffer: 50 * 1024 * 1024 })))
const newZh = flat(JSON.parse(readFileSync(`${repo}/src/renderer/src/i18n/locales/zh-Hant.json`, 'utf8')))
const added = new Map([...newZh].filter(([k]) => !oldZh.has(k)))
const kept = new Map([...newZh].filter(([k]) => oldZh.has(k)))
for (const [scope, map] of [['新增', added], ['既有', kept]]) {
  console.log(`\n===== ${scope}鍵：cn→tw 轉換會改變的字串 =====`)
  let n = 0
  const changed = new Map()
  for (const [k, v] of map) {
    const c = conv(v)
    if (c !== v) {
      n++
      const chars = [...new Set([...v].filter((ch, i) => ch !== c[i] && /[\u4e00-\u9fff]/.test(ch)).map((ch, i) => ch))]
      for (const ch of chars) changed.set(ch, (changed.get(ch) || 0) + 1)
      if (n <= 120) console.log(`  ${k}\n    ZH: ${v}\n    TW: ${c}`)
    }
  }
  console.log(`total=${n}`)
  console.log('--- 被轉換的字元統計 ---')
  console.log([...changed].sort((a, b) => b[1] - a[1]).map(([c, n]) => `${c}:${n}`).join(' '))
}
