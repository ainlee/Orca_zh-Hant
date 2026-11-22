import fs from 'node:fs'
const repo = 'F:/DevProjects/OrcaADE/orca-zh'
const targets = [
  ['desktop', 'bots.whoCanAsk.showMore'],
  ['mobile', 'bots.needs.open'],
  ['mobile', 'bots.needs.worker'],
  ['mobile', 'bots.items.ask.youAnswered'],
  ['desktop', 'settings.bots.skills.openFolder'],
  ['desktop', 'components.native-chat.automationSaved.editDraft'],
  ['desktop', 'settings.bots.tools.fromYours'],
  ['desktop', 'settings.bots.tools.commandWarning'],
  ['desktop', 'settings.bots.tools.pasteDecision'],
]
function flat(o, p = '', out = new Map()) {
  if (typeof o === 'string') { out.set(p, o); return out }
  if (!o || typeof o !== 'object' || Array.isArray(o)) return out
  for (const [k, v] of Object.entries(o)) flat(v, p ? `${p}.${k}` : k, out)
  return out
}
for (const [scope, key] of targets) {
  const dir = scope === 'desktop' ? 'src/renderer/src/i18n/locales' : 'mobile/src/i18n/locales'
  const en = flat(JSON.parse(fs.readFileSync(`${repo}/${dir}/en.json`, 'utf8')))
  const zh = flat(JSON.parse(fs.readFileSync(`${repo}/${dir}/zh-Hant.json`, 'utf8')))
  const map = JSON.parse(fs.readFileSync(`phrase-map-${scope}.json`, 'utf8'))
  console.log(`\n[${scope}] ${key}`)
  console.log(`  en: ${JSON.stringify(en.get(key))}`)
  console.log(`  既有zh-Hant: ${JSON.stringify(zh.get(key))}`)
  const eng = en.get(key)
  console.log(`  建議(phrase-map): ${eng && map[eng] ? JSON.stringify(map[eng].zh) : '(無)'}`)
}
