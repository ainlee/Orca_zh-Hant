import fs from 'node:fs'
const root = 'F:/DevProjects/OrcaADE/orca-zh'
const zhPath = root + '/src/renderer/src/i18n/locales/zh-Hant.json'
const enPath = root + '/src/renderer/src/i18n/locales/en.json'

// Read existing zh-Hant
const zh = JSON.parse(fs.readFileSync(zhPath, 'utf8'))
const en = JSON.parse(fs.readFileSync(enPath, 'utf8'))

// Collect all translations
const allTrans = {}
for (let i = 0; i <= 29; i++) {
  const n = String(i).padStart(2, '0')
  const mod = await import(`./desktop-t${n}.mjs`)
  Object.assign(allTrans, mod.default)
}
console.log('total translated keys:', Object.keys(allTrans).length)

// Merge into nested structure
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

// Write back with CRLF (original format)
const out = JSON.stringify(zh, null, 2).replace(/\n/g, '\r\n') + '\r\n'
fs.writeFileSync(zhPath, out, 'utf8')
console.log('written to', zhPath)