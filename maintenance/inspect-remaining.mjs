import fs from 'node:fs'
const repo = 'F:/DevProjects/OrcaADE/orca-zh'
function flat(o, p = '', out = new Map()) {
  if (typeof o === 'string') { out.set(p, o); return out }
  if (!o || typeof o !== 'object' || Array.isArray(o)) return out
  for (const [k, v] of Object.entries(o)) flat(v, p ? `${p}.${k}` : k, out)
  return out
}
const dir = 'src/renderer/src/i18n/locales'
const en = flat(JSON.parse(fs.readFileSync(`${repo}/${dir}/en.json`, 'utf8')))
const zh = flat(JSON.parse(fs.readFileSync(`${repo}/${dir}/zh-Hant.json`, 'utf8')))
const missing = [...en.keys()].filter(k => !zh.has(k))
console.log('桌面缺鍵（連同 _other 對照）:')
for (const k of missing) {
  console.log(`\n${k}`)
  console.log(`  en: ${JSON.stringify(en.get(k))}`)
  const other = k.replace(/_one$/, '_other')
  if (other !== k) console.log(`  zh(_other): ${JSON.stringify(zh.get(other))}`)
}
console.log(`\ncliTooOld 現況: ${JSON.stringify(zh.get('components.native-chat.failureWords.cliTooOld'))}`)
