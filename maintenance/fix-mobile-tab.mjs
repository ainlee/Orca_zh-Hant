import fs from 'fs';
const p = 'mobile/src/i18n/locales/zh-Hant.json';
let s = fs.readFileSync(p, 'utf8');
const old = '點擊 + 即可啟動代理程式、終端機或浏览器标签页。';
const nw = '點擊 + 即可啟動代理程式、終端機或瀏覽器分頁。';
if (s.includes(old)) { s = s.split(old).join(nw); fs.writeFileSync(p, s, 'utf8'); console.log('fixed'); }
else { console.log('not found, has 浏览?', s.includes('浏览'), 'has 标签页?', s.includes('标签页')); }
