import fs from 'node:fs'
function load(dir, name) {
  return JSON.parse(fs.readFileSync(`F:/DevProjects/OrcaADE/orca-zh/${dir}/${name}.json`, 'utf8'))
}
function flatten(value, prefix = '', out = new Map()) {
  if (typeof value === 'string') { out.set(prefix, value); return out }
  if (typeof value !== 'object' || value === null || Array.isArray(value)) return out
  for (const [k, v] of Object.entries(value)) flatten(v, prefix ? `${prefix}.${k}` : k, out)
  return out
}
for (const dir of ['src/renderer/src/i18n/locales', 'mobile/src/i18n/locales']) {
  const zh = flatten(load(dir, 'zh-Hant'))
  const vals = [...zh.values()]
  const count = re => vals.filter(v => typeof v === 'string' && v.match(re)).length
  const show = re => vals.filter(v => typeof v === 'string' && v.match(re)).slice(0, 5)
  const report = (label, re) => `${label}: ${count(re)}  e.g. ${JSON.stringify(show(re))}`
  console.log(`\n=== ${dir} (${vals.length} strings) ===`)
  console.log(report('代理程式', /代理程式/))
  console.log(report('智慧體', /智慧體/))
  console.log(report('會話', /會話/))
  console.log(report('工作階段', /工作階段/))
  console.log(report('存放庫', /存放庫/))
  console.log(report('工作樹', /工作樹/))
  console.log(report('終端機', /終端機/))
  console.log(report('「corner」', /「/))
  console.log(report('英式引號', /"/))
  console.log(report('開啟', /開啟/))
  console.log(report('點擊', /點擊/))
  console.log(report('按一下', /按一下/))
  console.log(report('啟動', /啟動/))
  console.log(report('工作區', /工作區/))
  console.log(report('外掛', /外掛/))
  console.log(report('擴充功能', /擴充功能/))
}
