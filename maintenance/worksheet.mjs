import fs from 'node:fs'
const dir = process.argv[2]
const list = JSON.parse(fs.readFileSync(`F:/DevProjects/OrcaADE/missing-${dir.replace(/[\\/]+/g, '_')}.json`, 'utf8'))
const groups = {}
for (const item of list) {
  const parts = item.key.split('.')
  const g = parts[0] === 'auto' ? parts.slice(0, 2).join('/') : parts[0]
  ;(groups[g] ??= []).push(item)
}
const sorted = Object.entries(groups).sort((a, b) => b[1].length - a[1].length)
console.log(`total=${list.length}`)
for (const [g, items] of sorted) console.log(`${String(items.length).padStart(5)}  ${g}`)
// write worksheets: one file per top-level group
for (const [g, items] of sorted) {
  const lines = items.map(i => [i.key, JSON.stringify(i.en), i.zh ? JSON.stringify(i.zh) : '', i.ja ? JSON.stringify(i.ja) : ''].join(' | '))
  fs.writeFileSync(`F:/DevProjects/OrcaADE/zh-work/ws-${dir.replace(/[\\/]+/g, '_').split('/').pop()}-${g.replace(/[^a-zA-Z0-9_-]/g, '')}.txt`, lines.join('\n'), 'utf8')
}
console.log('worksheets written')
