// 比對 en.json 與 zh-Hant.json，列出缺鍵與各語系參考譯法
import fs from 'node:fs'

const dir = process.argv[2] ?? 'src/renderer/src/i18n/locales'
const root = process.argv[3] ?? 'F:/DevProjects/OrcaADE/orca-zh'

function load(name) {
  return JSON.parse(fs.readFileSync(`${root}/${dir}/${name}.json`, 'utf8'))
}

function flatten(value, prefix = '', out = new Map()) {
  if (typeof value === 'string') { out.set(prefix, value); return out }
  if (typeof value !== 'object' || value === null || Array.isArray(value)) return out
  for (const [k, child] of Object.entries(value)) {
    flatten(child, prefix ? `${prefix}.${k}` : k, out)
  }
  return out
}

const langs = ['en', 'zh', 'ja', 'de', 'ru']
const en = flatten(load('en'))
const zhHant = flatten(load('zh-Hant'))
const refs = Object.fromEntries(langs.map(l => [l, flatten(load(l))]))

const plural = /^(.*)_(zero|one|two|few|many|other)$/
const missing = []
for (const [key, value] of en) {
  if (zhHant.has(key)) continue
  // 複數族由 _other 自動補，不需翻
  const m = plural.exec(key)
  if (m && en.has(`${m[1]}_other`) && zhHant.has(`${m[1]}_other`)) continue
  missing.push({
    key,
    en: value,
    zh: refs.zh.get(key),
    ja: refs.ja.get(key),
    de: refs.de.get(key),
    ru: refs.ru.get(key),
    siblings: langs.filter(l => l !== 'en').map(l => refs[l].get(key)).filter(v => v && v !== value).length
  })
}

console.error(`missing=${missing.length}`)
fs.writeFileSync(`${root}/../missing-${dir.replace(/[\\/]+/g, '_')}.json`, JSON.stringify(missing, null, 1))
console.log(JSON.stringify(missing.slice(0, 3)))
