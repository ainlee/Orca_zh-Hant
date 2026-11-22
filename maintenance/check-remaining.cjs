const fs=require('fs');
const translated=new Set();
for (let i=1;i<=4;i++){
  const p='desktop-b'+i+'.mjs';
  if(!fs.existsSync(p)) continue;
  const src=fs.readFileSync(p,'utf8');
  const re=/['"]([^'"]+)['"]\s*:/g;
  let m; while((m=re.exec(src))!==null) translated.add(m[1]);
}
console.log('translated desktop keys:', translated.size);
const missing=JSON.parse(fs.readFileSync('missing-src_renderer_src_i18n_locales.json','utf8'));
console.log('total missing:', missing.length);
const remaining=missing.filter(m=>!translated.has(m.key));
console.log('remaining:', remaining.length);
fs.writeFileSync('desktop-remaining.json', JSON.stringify(remaining,null,1));