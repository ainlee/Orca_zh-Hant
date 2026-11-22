import { readdirSync, readFileSync } from 'node:fs'
const keys = [
  'settings.browser.memorySaver.description',
  'settings.groupHooks.description',
  'auto.lib.ephemeralVmEnvironmentCheck.openedDegraded',
  'auto.components.worktree.creation.PendingNativeChatCreation.sendBlockedFailed',
  'auto.components.worktree.creation.VmBuildSheet.create',
  'auto.components.worktree.creation.VmBuildSheet.openAnywayHint',
  'auto.components.worktree.creation.WorktreeSetupSteps.create',
  'auto.components.settings.appearance.search.statusBarUsageFormat.description',
  'auto.components.settings.appearance.search.statusBarUsageFormat.placeholder',
  'auto.components.settings.StatusBarUsageFormatSetting.placeholder.optional',
  'components.native-chat.approval.folderTrust.hint',
  'components.native-chat.contextMenu.noSessionContext',
  'components.native-chat.ciResultLine.at',
  'components.native-chat.ciResultLine.failingLead',
  'components.native-chat.ciResultLine.greenLead',
  'components.settings.nativeChat.usageLimitContinueCopy',
  'components.settings.nativeChat.usageLimitContinueSearchLimit',
  'components.settings.nativeChat.usageLimitContinueTitle',
  'components.settings.nativeChat.usageLimitContinueToggleLabel',
  'components.contextualTours.agentSessions.newTab.body',
  'components.contextualTours.agentSessions.newTab.title',
  'components.dictation.cleanupNotice.timedOut',
  'components.RepositoryBrowserProfileSection.description',
  'resourceManager.owner.description',
  'wslDriveProject.blocker.notWindowsDrive',
  'wslDriveProject.blocker.worktreeFolder',
  'wslDriveProject.description',
  'wslDriveUnc.blocker.mixed',
  'wslDriveUnc.blocker.notConvertible',
  'wslDriveUnc.blocker.notDriveMount',
  'auto.components.sidebar.SidebarHeader.collapseAllProjects',
]
const files = readdirSync('F:/DevProjects/OrcaADE/zh-work').filter(f => /^desktop-t\d+\.mjs$/.test(f))
for (const key of keys) {
  const found = []
  for (const f of files) {
    const txt = readFileSync(`F:/DevProjects/OrcaADE/zh-work/${f}`, 'utf8')
    if (txt.includes(key)) found.push(f)
  }
  console.log(`${key}\n  ${found.join(', ') || '⚠ 找不到'}`)
}
