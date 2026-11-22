// 從現有 en/zh-Hant 建立「英文字串 -> 既有繁中譯法」對照表，供翻譯時沿用一致用語
import fs from 'node:fs'

const repo = 'F:/DevProjects/OrcaADE/orca-zh'
const pairs = []

function flatEnZh(en, zh, p = '') {
  for (const [k, v] of Object.entries(en)) {
    const q = p ? `${p}.${k}` : k
    if (typeof v === 'string') {
      const zv = getZh(zh, q)
      if (typeof zv === 'string' && zv.trim()) pairs.push([v.trim(), zv.trim()])
    } else if (v && typeof v === 'object' && !Array.isArray(v)) flatEnZh(v, zh, q)
  }
}
function getZh(obj, path) {
  let cur = obj
  for (const part of path.split('.')) {
    if (!cur || typeof cur !== 'object') return undefined
    cur = cur[part]
  }
  return cur
}

for (const [dir, out] of [
  ['src/renderer/src/i18n/locales', 'phrase-map-desktop.json'],
  ['mobile/src/i18n/locales', 'phrase-map-mobile.json'],
]) {
  const en = JSON.parse(fs.readFileSync(`${repo}/${dir}/en.json`, 'utf8'))
  const zh = JSON.parse(fs.readFileSync(`${repo}/${dir}/zh-Hant.json`, 'utf8'))
  pairs.length = 0
  flatEnZh(en, zh)
  // 統計每個英文字串的各譯法次數，取最多數者
  const byEn = new Map()
  for (const [e, z] of pairs) {
    if (!byEn.has(e)) byEn.set(e, new Map())
    const m = byEn.get(e)
    m.set(z, (m.get(z) || 0) + 1)
  }
  const map = {}
  for (const [e, m] of byEn) {
    const sorted = [...m.entries()].sort((a, b) => b[1] - a[1])
    map[e] = { zh: sorted[0][0], variants: sorted.length }
  }
  fs.writeFileSync(out, JSON.stringify(map, null, 2), 'utf8')
  console.log(`${out}: ${Object.keys(map).length} 個英文字串, ${pairs.length} 組配對`)
}
