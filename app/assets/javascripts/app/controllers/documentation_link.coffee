App.Config.set('admin_docs', {
  name: __('Help Center'),
  permission: ['admin.*'],
  target: '/help',
  containerClass: 'navbar-link-admin-docs',
  prio: 10,
  external: false,
  parent: '#current_user',
  translate: true,
  iconClass: 'help'
}, 'NavBarRight')

App.Config.set('agent_docs', {
  name: __('Help Center'),
  permission: ['ticket.agent', 'report', 'knowledge_base.*', 'chat.agent', 'cti.agent'],
  target: '/help',
  containerClass: 'navbar-link-agent-docs',
  prio: 11,
  external: false,
  parent: '#current_user',
  translate: true,
  iconClass: 'help'
}, 'NavBarRight')
