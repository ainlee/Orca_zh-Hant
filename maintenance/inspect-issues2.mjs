import fs from 'node:fs'
const repo = 'F:/DevProjects/OrcaADE/orca-zh'
const targets = [
  ['desktop', 'bots.workspaces.showMore'],
  ['desktop', 'bots.chats.showMoreCount'],
  ['desktop', 'bots.items.group.showMore'],
  ['mobile', 'bots.settings.needsPermissionDetail'],
  ['mobile', 'bots.settings.taskCompleteDetail'],
  ['mobile', 'bots.settings.couldNotFinishDetail'],
  ['mobile', 'bots.needs.worker'],
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
  console.log(`[${scope}] ${key} => ${JSON.stringify(en.get(key))}`)
}
