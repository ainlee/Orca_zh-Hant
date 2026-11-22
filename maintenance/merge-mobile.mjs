import fs from 'node:fs'
const root = 'F:/DevProjects/OrcaADE/orca-zh'
const zhPath = root + '/mobile/src/i18n/locales/zh-Hant.json'

const zh = JSON.parse(fs.readFileSync(zhPath, 'utf8'))

const allTrans = {}
for (let i = 0; i <= 7; i++) {
  const n = String(i).padStart(2, '0')
  const mod = await import(`./mobile-t${n}.mjs`)
  Object.assign(allTrans, mod.default)
}
console.log('total translated keys:', Object.keys(allTrans).length)

function setNested(obj, keyPath, value) {
  const parts = keyPath.split('.')
  let cur = obj
  for (let i = 0; i < parts.length - 1; i++) {
    if (!cur[parts[i]] || typeof cur[parts[i]] !== 'object') {
      cur[parts[i]] = {}
    }
    cur = cur[parts[i]]
  }
  cur[parts[parts.length - 1]] = value
}

let added = 0
for (const [key, val] of Object.entries(allTrans)) {
  setNested(zh, key, val)
  added++
}
console.log('added:', added)

// Mobile uses LF
const out = JSON.stringify(zh, null, 2) + '\n'
fs.writeFileSync(zhPath, out, 'utf8')
console.log('written to', zhPath)