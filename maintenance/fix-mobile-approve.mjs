import fs from 'fs';
const p = 'mobile/src/i18n/locales/zh-Hant.json';
let s = fs.readFileSync(p, 'utf8');
const old = '"approvals_other": "{{count}} 個批准"';
const nw = '"approvals_other": "{{count}} 個核准"';
if (s.includes(old)) { s = s.split(old).join(nw); fs.writeFileSync(p, s, 'utf8'); console.log('fixed'); }
else { console.log('not found'); }
