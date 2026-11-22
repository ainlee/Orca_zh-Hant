import fs from 'node:fs'
const repo = 'F:/DevProjects/OrcaADE/orca-zh'
const en = JSON.parse(fs.readFileSync(`${repo}/src/renderer/src/i18n/locales/en.json`, 'utf8'))
function get(obj, path) { let c = obj; for (const p of path.split('.')) { if (!c || typeof c !== 'object') return undefined; c = c[p] } return c }
for (const prefix of ['bots.workspaces', 'bots.chats', 'bots.items.group', 'bots.whoCanAsk']) {
  console.log(`\n=== ${prefix} ===`)
  const node = get(en, prefix)
  if (node && typeof node === 'object') {
    for (const [k, v] of Object.entries(node)) if (typeof v === 'string') console.log(`  ${k}: ${JSON.stringify(v)}`)
  }
}
