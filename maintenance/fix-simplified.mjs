import fs from 'fs';
const p = 'src/renderer/src/i18n/locales/zh-Hant.json';
let s = fs.readFileSync(p, 'utf8');
const reps = [
  ['请在執行此聊天的计算机上執行 `agy` 进行登入，然后重新傳送訊息。', '請在執行此聊天的電腦上執行 `agy` 進行登入，然後重新傳送訊息。'],
  ['Claude 推理强度无效；请選擇 low、medium、high、xhigh 或 max，然后重新傳送。', 'Claude 推理強度無效；請選擇 low、medium、high、xhigh 或 max，然後重新傳送。'],
  ['请開啟該聊天，待最新回覆完成后再從它建立分支。', '請開啟該聊天，待最新回覆完成後再從它建立分支。'],
  ['找不到此回复。请開啟原始聊天并從那里建立分支。', '找不到此回覆。請開啟原始聊天並從那裡建立分支。'],
  ['"modelAndEffort": "模型与推理强度"', '"modelAndEffort": "模型與推理強度"'],
  ['"answerInTerminal": "请在工作者的終端機中回答"', '"answerInTerminal": "請在工作者的終端機中回答"'],
  ['"answerNotApplied": "{{name}}：回答未送达此提示"', '"answerNotApplied": "{{name}}：回答未送達此提示"'],
  ['"answerWorkerEnded": "{{name}} 已结束，因此此提示已關閉"', '"answerWorkerEnded": "{{name}} 已結束，因此此提示已關閉"'],
  ['"autoDenied": "已由 Claude 在 2:00 后自动拒絕"', '"autoDenied": "已由 Claude 在 2:00 後自動拒絕"'],
  ['"closedUnnamed": "已關閉，未记录回答"', '"closedUnnamed": "已關閉，未記錄回答"'],
  ['"countdown": "如果无人回答，Claude 将在 {{time}} 后自动拒絕。"', '"countdown": "如果無人回答，Claude 將在 {{time}} 後自動拒絕。"'],
  ['你的工作樹已就绪，但聊天未能開啟。请重试以開啟聊天并带上你的訊息。', '你的工作樹已就緒，但聊天未能開啟。請重試以開啟聊天並帶上你的訊息。'],
  ['请将該發行版新增為 WSL 主機（新增项目 → 新增遠端主機 → 新增 WSL 發行版）后在那里聊天', '請將該發行版新增為 WSL 主機（新增專案 → 新增遠端主機 → 新增 WSL 發行版）後在那裡聊天'],
  ['请在 WSL 主機上執行项目后在那里聊天', '請在 WSL 主機上執行專案後在那裡聊天'],
  ['"explicitChatWslRunAsHost": "将 {{distro}} 作為主機執行"', '"explicitChatWslRunAsHost": "將 {{distro}} 作為主機執行"'],
  ['按 {sidebar.projects.toggleCollapse}、點擊此按钮，或按住 {{modifier}} 點擊任意项目标题。', '按 {sidebar.projects.toggleCollapse}、點擊此按鈕，或按住 {{modifier}} 點擊任意專案標題。'],
  ['點擊此按钮，或按住 {{modifier}} 點擊任意项目标题。', '點擊此按鈕，或按住 {{modifier}} 點擊任意專案標題。'],
  ['"title": "一次性折叠所有项目"', '"title": "一次摺疊所有專案"'],
  ['"activeTerminalUnavailable": "開啟此工作樹中的代理程式終端機，然后重新傳送備註。"', '"activeTerminalUnavailable": "開啟此工作樹中的代理程式終端機，然後重新傳送備註。"'],
  ['"approvalUnseen": "{{target}} 代理程式可能正在等待批准。请在本轮结束后再傳送備註。"', '"approvalUnseen": "{{target}} 代理程式可能正在等待核准。請在本輪結束後再傳送備註。"'],
  ['"empty": "没有可傳送的備註。"', '"empty": "沒有可傳送的備註。"'],
  ['"hostUpdateRequired": "请更新 {{target}} 代理程式所在主機上的 Orca 后再傳送備註。"', '"hostUpdateRequired": "請更新 {{target}} 代理程式所在主機上的 Orca 後再傳送備註。"'],
  ['"notAgentSession": "{{target}} 終端機不是可识别的代理程式工作階段。"', '"notAgentSession": "{{target}} 終端機不是可識別的代理程式工作階段。"'],
  ['"notReady": "{{target}} 代理程式尚未准备好接收输入。"', '"notReady": "{{target}} 代理程式尚未準備好接收輸入。"'],
  ['"notWritable": "{{target}} 代理程式未接受这些備註。"', '"notWritable": "{{target}} 代理程式未接受這些備註。"'],
  ['"notWritableSelection": "{{target}} 代理程式未接受所选内容。"', '"notWritableSelection": "{{target}} 代理程式未接受所選內容。"'],
  ['"selectedAgentNeedsPermission": "所选代理程式需要权限。"', '"selectedAgentNeedsPermission": "所選代理程式需要權限。"'],
  ['"selectedSubmitFailed": "備註可能已貼上到所选終端機，但 Orca 無法提交它們。"', '"selectedSubmitFailed": "備註可能已貼上到所選終端機，但 Orca 無法提交它們。"'],
  ['"selectedTerminalUnavailable": "所选終端機已不可用。"', '"selectedTerminalUnavailable": "所選終端機已不可用。"'],
  ['"statusUnverified": "無法验证 {{target}} 代理程式的狀態。"', '"statusUnverified": "無法驗證 {{target}} 代理程式的狀態。"'],
  ['"targetSelected": "所选"', '"targetSelected": "所選"'],
];
let changed = 0;
for (const [a,b] of reps) {
  if (!s.includes(a)) { console.error('NOT FOUND:', a.slice(0,60)); continue; }
  s = s.split(a).join(b);
  changed++;
}
fs.writeFileSync(p, s, 'utf8');
console.log('changed', changed, 'replacements');
