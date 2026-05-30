/**
 * DEJOIY Support Center — portal application
 */
(function () {
  'use strict';

  const cfg = window.dejoiySupport || {};
  const app = document.getElementById('dejoiy-support-app');
  if (!app) return;

  const mode = app.dataset.mode || 'customer';
  let meta = { categories: {}, priorities: {} };
  let tickets = [];
  let ticketPrefill = {};
  let pollTimer = null;

  const views = {
    dashboard: document.getElementById('dejoiy-view-dashboard'),
    joi: document.getElementById('dejoiy-view-joi'),
    help: document.getElementById('dejoiy-view-help'),
    create: document.getElementById('dejoiy-view-create'),
    ticket: document.getElementById('dejoiy-view-ticket'),
  };

  function api(path, options = {}) {
    const url = (cfg.restUrl || '').replace(/\/$/, '') + path;
    const headers = {
      'X-WP-Nonce': cfg.nonce || '',
    };
    if (!(options.body instanceof FormData)) {
      headers['Content-Type'] = 'application/json';
    }
    return fetch(url, { credentials: 'same-origin', headers, ...options }).then(async (res) => {
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        throw new Error(data.message || cfg.i18n?.error || 'Request failed');
      }
      return data;
    });
  }

  function showView(name) {
    Object.values(views).forEach((el) => el && el.classList.remove('is-active'));
    if (views[name]) views[name].classList.add('is-active');
    document.querySelectorAll('.dejoiy-sc-nav-btn').forEach((btn) => {
      btn.classList.toggle('is-active', btn.dataset.view === name);
    });
  }

  document.querySelectorAll('.dejoiy-sc-nav-btn').forEach((btn) => {
    btn.addEventListener('click', () => {
      const view = btn.dataset.view;
      if (view === 'create') renderCreateForm();
      if (view === 'dashboard') renderDashboard();
      if (view === 'joi') renderJoi();
      if (view === 'help') renderHelp();
      showView(view);
    });
  });

  function stateBadge(type) {
    return `<span class="dejoiy-sc-badge dejoiy-sc-badge--${type}">${type}</span>`;
  }

  function renderDashboard() {
    const buckets = { open: 0, pending: 0, resolved: 0, closed: 0 };
    tickets.forEach((t) => {
      const b = t.state_type || 'open';
      if (buckets[b] !== undefined) buckets[b]++;
      else buckets.open++;
    });

    let adminHtml = '';
    if (cfg.user?.isAdmin) {
      adminHtml = `
        <div class="dejoiy-sc-admin-bar glass">
          <strong>Admin search</strong>
          <div class="dejoiy-sc-joi-input" style="margin-top:0.5rem">
            <input type="text" id="dejoiy-admin-q" placeholder="Order ID, Seller ID, Customer ID, keywords…" />
            <button type="button" class="dejoiy-sc-btn" id="dejoiy-admin-search">Search</button>
          </div>
          <div id="dejoiy-admin-results" class="dejoiy-sc-ticket-list"></div>
        </div>`;
    }

    const list =
      tickets.length === 0
        ? `<p class="dejoiy-sc-empty">No tickets yet. Ask JOI or raise a ticket.</p>`
        : tickets
            .map(
              (t) => `
        <button type="button" class="dejoiy-sc-ticket-row" data-ticket-id="${t.id}">
          <div>
            <strong>#${t.number} — ${escapeHtml(t.subject)}</strong>
            <div style="color:var(--dejoiy-muted);font-size:0.8rem;margin-top:0.25rem">
              ${stateBadge(t.state_type)} · ${escapeHtml(t.priority)} · Updated ${escapeHtml(t.updated_at || '')}
            </div>
          </div>
          <div style="text-align:right;font-size:0.75rem;color:var(--dejoiy-muted)">
            ${escapeHtml(t.assigned_to || 'Support team')}
          </div>
        </button>`
            )
            .join('');

    views.dashboard.innerHTML = `
      ${adminHtml}
      <div class="dejoiy-sc-grid">
        <div class="dejoiy-sc-card"><h3>Open</h3><div class="dejoiy-sc-stat">${buckets.open}</div></div>
        <div class="dejoiy-sc-card"><h3>Pending</h3><div class="dejoiy-sc-stat">${buckets.pending}</div></div>
        <div class="dejoiy-sc-card"><h3>Resolved</h3><div class="dejoiy-sc-stat">${buckets.resolved}</div></div>
        <div class="dejoiy-sc-card"><h3>Closed</h3><div class="dejoiy-sc-stat">${buckets.closed}</div></div>
      </div>
      <h2 style="margin-top:1.5rem">Your tickets</h2>
      <div class="dejoiy-sc-ticket-list">${list}</div>`;

    views.dashboard.querySelectorAll('[data-ticket-id]').forEach((row) => {
      row.addEventListener('click', () => openTicket(row.dataset.ticketId));
    });

    const adminBtn = document.getElementById('dejoiy-admin-search');
    if (adminBtn) {
      adminBtn.addEventListener('click', adminSearch);
    }
  }

  function adminSearch() {
    const q = document.getElementById('dejoiy-admin-q')?.value || '';
    const params = new URLSearchParams();
    if (/^\d+$/.test(q)) params.set('order_id', q);
    else params.set('q', q);
    api('/admin/search?' + params.toString())
      .then((data) => {
        const el = document.getElementById('dejoiy-admin-results');
        if (!el) return;
        const list = (data.tickets || [])
          .map(
            (t) => `
          <button type="button" class="dejoiy-sc-ticket-row" data-ticket-id="${t.id}">
            <div><strong>#${t.number}</strong> ${escapeHtml(t.subject)} ${stateBadge(t.state_type)}</div>
          </button>`
          )
          .join('');
        el.innerHTML = list || '<p class="dejoiy-sc-empty">No results</p>';
        el.querySelectorAll('[data-ticket-id]').forEach((row) => {
          row.addEventListener('click', () => openTicket(row.dataset.ticketId));
        });
      })
      .catch(alertError);
  }

  function openTicket(id) {
    api('/tickets/' + id)
      .then((data) => {
        const t = data.ticket;
        const articles = (t.articles || [])
          .map(
            (a) => `
          <div class="dejoiy-sc-joi-msg dejoiy-sc-joi-msg--${a.sender === 'Customer' ? 'user' : 'bot'}">
            <small>${escapeHtml(a.created_at)} · ${escapeHtml(a.from || a.sender)}</small>
            <div>${a.body}</div>
          </div>`
          )
          .join('');

        views.ticket.innerHTML = `
          <button type="button" class="dejoiy-sc-btn dejoiy-sc-btn--ghost" id="dejoiy-back-dash">← Back</button>
          <h2>#${t.number} — ${escapeHtml(t.subject)}</h2>
          <p>${stateBadge(t.state_type)} Priority: ${escapeHtml(t.priority)}</p>
          <div class="dejoiy-sc-joi-messages" style="margin:1rem 0">${articles}</div>
          <form id="dejoiy-reply-form" class="dejoiy-sc-form">
            <div><label>Reply</label><textarea name="body" rows="4" required></textarea></div>
            <div><label>Attachment</label><input type="file" name="attachments" /></div>
            <button type="submit" class="dejoiy-sc-btn">Send reply</button>
          </form>`;

        showView('ticket');
        document.getElementById('dejoiy-back-dash').addEventListener('click', () => {
          showView('dashboard');
          renderDashboard();
        });

        document.getElementById('dejoiy-reply-form').addEventListener('submit', (e) => {
          e.preventDefault();
          const fd = new FormData(e.target);
          const file = fd.get('attachments');
          const payload = new FormData();
          payload.append('body', fd.get('body'));
          if (file && file.size) payload.append('attachments', file);
          api('/tickets/' + id + '/reply', { method: 'POST', body: payload, headers: { 'X-WP-Nonce': cfg.nonce } })
            .then(() => {
              loadTickets().then(() => openTicket(id));
            })
            .catch(alertError);
        });
      })
      .catch(alertError);
  }

  function renderCreateForm() {
    const cats = meta.categories || {};
    const catOptions = Object.entries(cats)
      .map(([k, v]) => `<option value="${k}">${escapeHtml(v)}</option>`)
      .join('');
    const priOptions = Object.entries(meta.priorities || {})
      .map(([k, v]) => `<option value="${k}">${escapeHtml(v)}</option>`)
      .join('');

    const pre = ticketPrefill || {};
    const sellerFlag = mode === 'seller' ? '1' : '';

    views.create.innerHTML = `
      <h2>${mode === 'seller' ? 'Seller support request' : 'Raise a ticket'}</h2>
      <form id="dejoiy-create-form" class="dejoiy-sc-form">
        <input type="hidden" name="seller_ticket" value="${sellerFlag}" />
        <div><label>Subject</label><input name="subject" required value="${escapeAttr(pre.subject || '')}" /></div>
        <div><label>Category</label><select name="category">${catOptions}</select></div>
        <div id="dejoiy-order-fields" ${mode === 'seller' ? 'style="display:none"' : ''}>
          <label>Order</label>
          <select name="order_id" id="dejoiy-order-select"><option value="">— Optional —</option></select>
          <label style="margin-top:0.5rem">Product (line item)</label>
          <select name="product_id" id="dejoiy-product-select"><option value="">— Optional —</option></select>
        </div>
        <div><label>Priority</label><select name="priority">${priOptions}</select></div>
        <div><label>Description</label><textarea name="description" rows="6" required>${escapeHtml(pre.description || '')}</textarea></div>
        <div><label>Attachments</label><input type="file" name="attachments" multiple /></div>
        <button type="submit" class="dejoiy-sc-btn">Submit ticket</button>
      </form>
      <div id="dejoiy-create-result"></div>`;

    if (pre.category) {
      const sel = views.create.querySelector('[name="category"]');
      if (sel) sel.value = pre.category;
    }

    if (mode !== 'seller') loadOrdersIntoForm();

    document.getElementById('dejoiy-create-form').addEventListener('submit', submitTicket);
  }

  function loadOrdersIntoForm() {
    api('/orders')
      .then((data) => {
        const sel = document.getElementById('dejoiy-order-select');
        const psel = document.getElementById('dejoiy-product-select');
        if (!sel) return;
        (data.orders || []).forEach((o) => {
          const opt = document.createElement('option');
          opt.value = o.id;
          opt.textContent = `#${o.number} — ${o.date} — ${o.total} (${o.status})`;
          opt.dataset.items = JSON.stringify(o.items || []);
          sel.appendChild(opt);
        });
        sel.addEventListener('change', () => {
          psel.innerHTML = '<option value="">— Optional —</option>';
          const selected = sel.options[sel.selectedIndex];
          if (!selected?.dataset.items) return;
          const items = JSON.parse(selected.dataset.items);
          items.forEach((it) => {
            const p = document.createElement('option');
            p.value = it.product_id;
            p.textContent = `${it.name} (Seller: ${it.seller_name || 'N/A'})`;
            psel.appendChild(p);
          });
        });
      })
      .catch(() => {});
  }

  function submitTicket(e) {
    e.preventDefault();
    const form = e.target;
    const fd = new FormData(form);
    api('/tickets', {
      method: 'POST',
      body: fd,
      headers: { 'X-WP-Nonce': cfg.nonce },
    })
      .then((data) => {
        document.getElementById('dejoiy-create-result').innerHTML = `
          <div class="dejoiy-sc-card" style="margin-top:1rem;border-color:rgba(0,188,212,0.5)">
            <strong>${cfg.i18n?.ticketCreated || 'Ticket created'}</strong>
            <p>Ticket #${escapeHtml(data.ticket?.number || '')}</p>
          </div>`;
        ticketPrefill = {};
        return loadTickets();
      })
      .then(() => {
        showView('dashboard');
        renderDashboard();
      })
      .catch(alertError);
  }

  function renderHelp() {
    api('/kb')
      .then((data) => {
        const cats = data.categories || {};
        const html = Object.values(cats)
          .map(
            (cat) => `
          <div class="dejoiy-sc-card" style="margin-bottom:1rem">
            <h3>${escapeHtml(cat.title)}</h3>
            <ul>${(cat.articles || [])
              .map((a) => `<li style="margin:0.5rem 0"><strong>${escapeHtml(a.title)}</strong><br/><span style="color:var(--dejoiy-muted)">${escapeHtml(a.content)}</span></li>`)
              .join('')}</ul>
          </div>`
          )
          .join('');
        views.help.innerHTML = `<h2>Help Center</h2>${html}`;
      })
      .catch(alertError);
  }

  function renderJoi() {
    views.joi.innerHTML = `
      <h2>JOI Support Assistant</h2>
      <p style="color:var(--dejoiy-muted)">Ask a question — I'll search the Help Center first.</p>
      <div class="dejoiy-sc-joi-chat">
        <div class="dejoiy-sc-joi-messages" id="dejoiy-joi-messages">
          <div class="dejoiy-sc-joi-msg dejoiy-sc-joi-msg--bot">Hi! I'm JOI. How can I help you today?</div>
        </div>
        <form class="dejoiy-sc-joi-input" id="dejoiy-joi-form">
          <input type="text" name="message" placeholder="Describe your issue…" autocomplete="off" required />
          <button type="submit" class="dejoiy-sc-btn">Send</button>
        </form>
        <div id="dejoiy-joi-actions"></div>
      </div>`;

    document.getElementById('dejoiy-joi-form').addEventListener('submit', (e) => {
      e.preventDefault();
      const input = e.target.message;
      const text = input.value.trim();
      if (!text) return;
      appendJoiMsg(text, 'user');
      input.value = '';
      api('/joi/chat', { method: 'POST', body: JSON.stringify({ message: text }) })
        .then((res) => {
          appendJoiMsg(res.reply || '', 'bot');
          const actions = document.getElementById('dejoiy-joi-actions');
          if (res.offer_ticket) {
            ticketPrefill = res.ticket_prefill || {};
            actions.innerHTML = `<button type="button" class="dejoiy-sc-btn" id="dejoiy-joi-ticket">Create support ticket</button>`;
            document.getElementById('dejoiy-joi-ticket').addEventListener('click', () => {
              renderCreateForm();
              showView('create');
            });
          } else {
            actions.innerHTML = '';
          }
        })
        .catch(alertError);
    });
  }

  function appendJoiMsg(text, who) {
    const box = document.getElementById('dejoiy-joi-messages');
    const div = document.createElement('div');
    div.className = `dejoiy-sc-joi-msg dejoiy-sc-joi-msg--${who}`;
    div.textContent = text.replace(/\*\*(.+?)\*\*/g, '$1');
    box.appendChild(div);
    box.scrollTop = box.scrollHeight;
  }

  function loadTickets() {
    const params = mode === 'seller' ? '?seller_mode=1' : '';
    return api('/tickets' + params).then((data) => {
      tickets = data.tickets || [];
    });
  }

  function pollNotifications() {
    api('/notifications?unread=1')
      .then((data) => {
        const el = document.getElementById('dejoiy-sc-notifications');
        const list = data.notifications || [];
        if (el) el.classList.toggle('has-unread', list.length > 0);
      })
      .catch(() => {});
  }

  function escapeHtml(s) {
    return String(s)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  function escapeAttr(s) {
    return escapeHtml(s).replace(/'/g, '&#39;');
  }

  function alertError(err) {
    alert(err.message || cfg.i18n?.error);
  }

  function init() {
    Promise.all([api('/meta'), loadTickets()])
      .then(([m]) => {
        meta = m;
        renderDashboard();
        showView('dashboard');
        pollNotifications();
        pollTimer = setInterval(pollNotifications, 30000);
      })
      .catch(alertError);
  }

  init();
})();
