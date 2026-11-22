import fs from 'node:fs'
let s = fs.readFileSync('desktop-t05.mjs','utf8')
const newKey = "  'auto.components.sidebar.WorktreeList.projectGroupRefreshSuccess_other': '已將 {{count}} 個專案新增至 {{group}}',\n"
s = s.replace(/\n\}\s*$/, '\n' + newKey + '}\n')
fs.writeFileSync('desktop-t05.mjs', s)
console.log('done')