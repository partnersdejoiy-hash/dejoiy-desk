# Copyright (C) 2024-2026 Dejoiy

org_community = Organization.create_if_not_exists(
  id:   1,
  name: __('DEJOIY Team'),
)

user_community = User.create_or_update(
  id:              2,
  login:           'demo.user@dejoiy.internal',
  firstname:       'Alex',
  lastname:        'Demo',
  email:           'demo.user@dejoiy.internal',
  password:        '',
  active:          true,
  roles:           [ Role.find_by(name: 'Customer') ],
  organization_id: org_community.id,
)

UserInfo.current_user_id = user_community.id

if Ticket.none?
  ticket = Ticket.create!(
    group_id:    Group.find_by(name: 'Users').id,
    customer_id: User.find_by(login: 'demo.user@dejoiy.internal').id,
    title:       __('Help me! I am an example ticket 🎓'),
  )
  Ticket::Article.create!(
    ticket_id:    ticket.id,
    type_id:      Ticket::Article::Type.find_by(name: 'phone').id,
    sender_id:    Ticket::Article::Sender.find_by(name: 'Customer').id,
    content_type: 'text/html',
    from:         'DEJOIY Support <support@dejoiy.internal>',
    body:         '<p>Hi, I\'m Alex Demo,</p>
<p>I\'m an example user here to show you what a ticket can look like in DEJOIY.</p>
<p>A ticket displays the full conversation of a request, made up of articles. Articles are messages or notes shown in tickets like this one. You can reply and add any information needed to help close the request.</p>
<p>Use this ticket to explore tickets, channels, and workflows your team relies on every day.</p>
<p>You can even reply to me—I\'m looking forward to hearing from you. 👋</p>
<p>Have fun! 🚀<br>Alex Demo</p>',
    internal:     false,
  )

  ticket.tag_add(__('Example tag'))

end

UserInfo.current_user_id = 1
