import fs from 'node:fs'
const root = 'F:/DevProjects/OrcaADE/orca-zh'
const zhPath = root + '/src/renderer/src/i18n/locales/zh-Hant.json'

const zh = JSON.parse(fs.readFileSync(zhPath, 'utf8'))

// Collect b1-b4 translations
const allTrans = {}
for (let i = 1; i <= 4; i++) {
  const mod = await import(`./desktop-b${i}.mjs`)
  Object.assign(allTrans, mod.default)
}
console.log('b-translations:', Object.keys(allTrans).length)

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

const out = JSON.stringify(zh, null, 2).replace(/\n/g, '\r\n') + '\r\n'
fs.writeFileSync(zhPath, out, 'utf8')
console.log('written')