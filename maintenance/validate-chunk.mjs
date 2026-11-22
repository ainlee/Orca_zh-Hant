import fs from 'node:fs'
const chunkNum = process.argv[2] || '00'
const t = (await import(`./desktop-t${chunkNum}.mjs`)).default
const chunk = JSON.parse(fs.readFileSync(`desktop-chunk-${chunkNum}.json`,'utf8'))
const en = JSON.parse(fs.readFileSync('F:/DevProjects/OrcaADE/orca-zh/src/renderer/src/i18n/locales/en.json','utf8'))
const flat={}
function walk(o,p){for(const[k,v]of Object.entries(o)){const q=p?p+'.'+k:k;if(typeof v==='string')flat[q]=v;else if(v)walk(v,q)}}
walk(en)
const mkeys=new Set(chunk.map(x=>x.key))
let errs=0
for(const[k,v]of Object.entries(t)){
  if(!mkeys.has(k)){console.log('NOT MISSING:',k);errs++}
  if(!v.trim()){console.log('EMPTY:',k);errs++}
  const p1=[...(flat[k]||'').match(/\{\{[^}]*\}\}/g)||[]].sort()
  const p2=[...v.match(/\{\{[^}]*\}\}/g)||[]].sort()
  if(p1.join('|')!==p2.join('|')){console.log('PH:',k,p1,p2);errs++}
  const sim='们个为发经会该过问讯间长队体丽驳庄单卖卫刚划庞乔亿华乐举仓买乱丧亚亲冲压庆击军农决冻净凑'.split('')
  for(const c of sim){if(v.includes(c)){console.log('SIMPLIFIED:',c,k,v);errs++;break}}
}
const missingInTrans=chunk.filter(x=>!(x.key in t))
console.log(`chunk${chunkNum}: keys=${Object.keys(t).length} errs=${errs} missing=${missingInTrans.length}`)
if(missingInTrans.length) console.log('  missing:', missingInTrans.map(x=>x.key).slice(0,5).join(', '))