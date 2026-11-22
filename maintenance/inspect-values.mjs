import fs from 'node:fs'
const root = 'F:/DevProjects/OrcaADE/orca-zh'
const jobs = [
  ['src/renderer/src/i18n/locales', [
    'auto.components.settings.AgentsPane.codexSessionSource',
    'auto.components.settings.AgentsPane.codexSessionSourceInfo',
    'auto.components.settings.AgentsPane.codexSessionSourceTooltip',
    'auto.components.settings.GeneralUpdateSettingsSection.8311da27ba',
    'auto.components.settings.RuntimeAccessGrantList.sshAccessCaveat',
    'components.native-chat.rewind.busy',
    'keybindings.title.worktreePalette',
  ]],
  ['mobile/src/i18n/locales', [
    'chat.rewind.busy',
    'session.useTerminalPaste.pasteTooLarge',
  ]],
]
function flat(value, prefix = '', out = new Map()) {
  if (typeof value === 'string') { out.set(prefix, value); return out }
  if (!value || typeof value !== 'object') return out
  for (const [k, v] of Object.entries(value)) flat(v, prefix ? `${prefix}.${k}` : k, out)
  return out
}
for (const [dir, keys] of jobs) {
  const maps = Object.fromEntries(['en', 'zh', 'ja'].map(l => [l, flat(JSON.parse(fs.readFileSync(`${root}/${dir}/${l}.json`, 'utf8')))]))
  console.log(`\n=== ${dir} ===`)
  for (const k of keys) {
    console.log(`\n${k}`)
    for (const l of ['en', 'zh', 'ja']) console.log(`  ${l}: ${JSON.stringify(maps[l].get(k))}`)
  }
}
