import fs from 'node:fs'

const size = Number(process.argv[2] ?? 100)
const jobs = [
  ['../missing-src_renderer_src_i18n_locales.json', 'desktop-chunk-'],
  ['../missing-mobile_src_i18n_locales.json', 'mobile-chunk-'],
]
for (const [src, prefix] of jobs) {
  const list = JSON.parse(fs.readFileSync(src, 'utf8'))
  let n = 0
  for (let i = 0; i < list.length; i += size) {
    const name = `${prefix}${String(n).padStart(2, '0')}.json`
    fs.writeFileSync(name, JSON.stringify(list.slice(i, i + size), null, 2), 'utf8')
    n++
  }
  console.log(`${src}: ${list.length} keys -> ${n} chunks`)
}
