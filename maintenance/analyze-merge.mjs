import { execFileSync } from 'node:child_process'

const root = 'F:/DevProjects/OrcaADE/orca-zh'
const files = [
  'src/renderer/src/i18n/locales/zh-Hant.json',
  'mobile/src/i18n/locales/zh-Hant.json',
]

function side(file, stage) {
  return JSON.parse(execFileSync('git', ['-C', root, 'show', `:${stage}:${file}`], { encoding: 'utf8', maxBuffer: 64 * 1024 * 1024 }))
}
function flat(value, prefix = '', out = new Map()) {
  if (typeof value === 'string') { out.set(prefix, value); return out }
  if (!value || typeof value !== 'object') return out
  for (const [k, v] of Object.entries(value)) flat(v, prefix ? `${prefix}.${k}` : k, out)
  return out
}

for (const file of files) {
  const ours = flat(side(file, 2))
  const theirs = flat(side(file, 3))
  const onlyOurs = [...ours.keys()].filter(k => !theirs.has(k))
  const onlyTheirs = [...theirs.keys()].filter(k => !ours.has(k))
  const diff = [...ours.keys()].filter(k => theirs.has(k) && ours.get(k) !== theirs.get(k))
  console.log(`\n=== ${file} ===`)
  console.log(`ours=${ours.size} theirs=${theirs.size} onlyOurs=${onlyOurs.length} onlyTheirs=${onlyTheirs.length} valueDiff=${diff.length}`)
  console.log('onlyTheirs:', JSON.stringify(onlyTheirs.slice(0, 12)))
  console.log('valueDiff:')
  for (const k of diff.slice(0, 25)) console.log(`  ${k}\n    ours:   ${JSON.stringify(ours.get(k))}\n    theirs: ${JSON.stringify(theirs.get(k))}`)
}
