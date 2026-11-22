import fs from 'node:fs'
import { execFileSync } from 'node:child_process'

const root = 'F:/DevProjects/OrcaADE/orca-zh'
const files = [
  'src/renderer/src/i18n/locales/zh-Hant.json',
  'mobile/src/i18n/locales/zh-Hant.json',
]
const isObj = v => v && typeof v === 'object' && !Array.isArray(v)

function side(file, stage) {
  return JSON.parse(execFileSync('git', ['-C', root, 'show', `:${stage}:${file}`], { encoding: 'utf8', maxBuffer: 64 * 1024 * 1024 }))
}
function merge(base, extra) {
  for (const [k, v] of Object.entries(extra)) {
    if (!(k in base)) base[k] = v
    else if (isObj(v) && isObj(base[k])) merge(base[k], v)
  }
  return base
}

for (const file of files) {
  const merged = merge(side(file, 3), side(file, 2))
  const out = JSON.stringify(merged, null, 2).replace(/\n/g, '\r\n') + '\r\n'
  fs.writeFileSync(`${root}/${file}`, out, 'utf8')
  console.log(`resolved ${file}`)
}
