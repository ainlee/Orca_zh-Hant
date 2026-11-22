// 為缺鍵產生「建議譯法」：若英文字串在既有翻譯中出現過，直接沿用
import fs from 'node:fs'

const jobs = [
  ['../missing-src_renderer_src_i18n_locales.json', 'phrase-map-desktop.json', 'suggested-desktop.json'],
  ['../missing-mobile_src_i18n_locales.json', 'phrase-map-mobile.json', 'suggested-mobile.json'],
]
for (const [missingF, mapF, outF] of jobs) {
  const list = JSON.parse(fs.readFileSync(missingF, 'utf8'))
  const map = JSON.parse(fs.readFileSync(mapF, 'utf8'))
  const suggested = {}
  let hit = 0, hitClean = 0
  for (const item of list) {
    const key = item.en?.trim()
    if (key && map[key]) {
      suggested[item.key] = map[key].zh
      hit++
      if (map[key].variants === 1) hitClean++
    }
  }
  fs.writeFileSync(outF, JSON.stringify(suggested, null, 2), 'utf8')
  console.log(`${outF}: ${list.length} 缺鍵, 可直接沿用 ${hit} (其中譯法唯一 ${hitClean}), 需新譯 ${list.length - hit}`)
}
