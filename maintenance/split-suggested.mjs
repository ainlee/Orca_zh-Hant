import fs from 'node:fs'
const jobs = [
  ['../missing-src_renderer_src_i18n_locales.json', 'suggested-desktop.json', 'desktop', 30],
  ['../missing-mobile_src_i18n_locales.json', 'suggested-mobile.json', 'mobile', 8],
]
for (const [missingF, sugF, prefix, count] of jobs) {
  const list = JSON.parse(fs.readFileSync(missingF, 'utf8'))
  const sug = JSON.parse(fs.readFileSync(sugF, 'utf8'))
  const size = 100
  let summary = []
  for (let i = 0; i < count; i++) {
    const chunk = list.slice(i * size, (i + 1) * size)
    const part = {}
    for (const item of chunk) if (item.key in sug) part[item.key] = sug[item.key]
    const n = String(i).padStart(2, '0')
    fs.writeFileSync(`${prefix}-suggested-${n}.json`, JSON.stringify(part, null, 2), 'utf8')
    summary.push(`${n}:${Object.keys(part).length}`)
  }
  console.log(`${prefix}: ${summary.join(' ')}`)
}
