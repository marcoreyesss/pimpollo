/* ============================================================
   PimPollo — Reservaciones de mesa
   Genera horarios según el día, bloquea las horas ocupadas,
   registra la reserva (persistente) y permite cancelarla.
   Se guarda en el navegador (localStorage). Para varios
   dispositivos/sucursales se necesitaría un servidor.
   ============================================================ */
(function () {
  var P = window.PIMPOLLO;
  var root = document.getElementById('reserva-root');
  if (!P || !root) return;

  var KEY = 'pimpollo_reservas_v1';
  var DIAS = ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom'];
  var DIAS_L = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'];
  var MESES = ['ene', 'feb', 'mar', 'abr', 'may', 'jun', 'jul', 'ago', 'sep', 'oct', 'nov', 'dic'];
  var sel = { date: '', time: '' };

  /* ---------- almacenamiento ---------- */
  function load() {
    try { return JSON.parse(localStorage.getItem(KEY)) || []; }
    catch (e) { return []; }
  }
  function save(list) { localStorage.setItem(KEY, JSON.stringify(list)); }

  /* ---------- utilidades de fecha/hora ---------- */
  function pad(n) { return (n < 10 ? '0' : '') + n; }
  function todayISO() {
    var d = new Date();
    return d.getFullYear() + '-' + pad(d.getMonth() + 1) + '-' + pad(d.getDate());
  }
  function weekdayIdx(iso) {
    var p = iso.split('-');
    var d = new Date(+p[0], +p[1] - 1, +p[2]);
    return (d.getDay() + 6) % 7; // 0 = Lunes
  }
  function fmtDate(iso) {
    var p = iso.split('-');
    var d = new Date(+p[0], +p[1] - 1, +p[2]);
    return DIAS[weekdayIdx(iso)] + ' ' + d.getDate() + ' ' + MESES[d.getMonth()];
  }
  function parseHrs(str) {
    // "11:00 – 20:00" -> {start: 660, end: 1200} en minutos
    var m = str.match(/(\d{1,2}):(\d{2})\D+(\d{1,2}):(\d{2})/);
    if (!m) return null;
    return { start: +m[1] * 60 + +m[2], end: +m[3] * 60 + +m[4] };
  }
  function slotsFor(iso) {
    var h = P.horarios[weekdayIdx(iso)];
    if (!h || !h.hrs) return [];
    var r = parseHrs(h.hrs);
    if (!r) return [];
    var out = [];
    // última reservación 1 h antes del cierre, cada 30 min
    for (var t = r.start; t <= r.end - 60; t += 30) {
      out.push(pad(Math.floor(t / 60)) + ':' + pad(t % 60));
    }
    return out;
  }
  function isTaken(iso, time) {
    return load().some(function (r) { return r.date === iso && r.time === time; });
  }

  /* ---------- render ---------- */
  function render() {
    root.innerHTML =
      '<div class="res-grid">' +
        '<form class="res-card" id="res-form" novalidate>' +
          '<h3>Reserva tu mesa</h3>' +
          '<div class="res-field">' +
            '<label for="res-date">Fecha</label>' +
            '<input type="date" id="res-date" min="' + todayISO() + '" value="' + (sel.date || todayISO()) + '" />' +
          '</div>' +
          '<div class="res-field">' +
            '<label>Hora disponible</label>' +
            '<div class="res-slots" id="res-slots"></div>' +
            '<div class="res-legend">' +
              '<span><i class="free"></i> Libre</span>' +
              '<span><i class="sel"></i> Elegida</span>' +
              '<span><i class="busy"></i> Ocupada</span>' +
            '</div>' +
          '</div>' +
          '<div class="res-row">' +
            '<div class="res-field">' +
              '<label for="res-pers">Personas</label>' +
              '<select id="res-pers">' + persOpts() + '</select>' +
            '</div>' +
            '<div class="res-field">' +
              '<label for="res-tel">Teléfono</label>' +
              '<input type="tel" id="res-tel" placeholder="81 0000 0000" />' +
            '</div>' +
          '</div>' +
          '<div class="res-field">' +
            '<label for="res-name">Nombre</label>' +
            '<input type="text" id="res-name" placeholder="¿A nombre de quién?" />' +
          '</div>' +
          '<button type="submit" class="btn btn--red" style="justify-content:center;width:100%;">Confirmar reservación</button>' +
          '<p class="res-msg" id="res-msg" hidden></p>' +
        '</form>' +
        '<div class="res-card">' +
          '<h3>Reservaciones registradas</h3>' +
          '<div id="res-list-wrap"></div>' +
        '</div>' +
      '</div>';

    sel.date = document.getElementById('res-date').value;
    renderSlots();
    renderList();
    wire();
  }

  function persOpts() {
    var s = '';
    for (var i = 1; i <= 12; i++) {
      s += '<option value="' + i + '">' + i + (i === 12 ? '+' : '') + ' persona' + (i > 1 ? 's' : '') + '</option>';
    }
    return s;
  }

  function renderSlots() {
    var wrap = document.getElementById('res-slots');
    var list = slotsFor(sel.date);
    if (!list.length) {
      wrap.innerHTML = '<p class="res-slots-empty">Cerrado ese día. Elige otra fecha.</p>';
      return;
    }
    wrap.innerHTML = list.map(function (t) {
      var taken = isTaken(sel.date, t);
      var cls = 'res-slot' + (taken ? '' : '') + (sel.time === t && !taken ? ' is-sel' : '');
      return '<button type="button" class="' + cls + '" data-time="' + t + '"' +
        (taken ? ' disabled title="Ocupada"' : '') + '>' + t + '</button>';
    }).join('');
  }

  function renderList() {
    var wrap = document.getElementById('res-list-wrap');
    var list = load().slice().sort(function (a, b) {
      return (a.date + a.time).localeCompare(b.date + b.time);
    });
    if (!list.length) {
      wrap.innerHTML = '<p class="res-empty">Aún no hay reservaciones. La que registres aparecerá aquí.</p>';
      return;
    }
    wrap.innerHTML = '<ul class="res-list">' + list.map(function (r) {
      return '<li class="res-item">' +
        '<div>' +
          '<div class="res-item__when">' + fmtDate(r.date) + ' · ' + r.time + '</div>' +
          '<div class="res-item__who">' + escapeHtml(r.name) + '</div>' +
          '<div class="res-item__meta">' + r.personas + ' pers. · ' + escapeHtml(r.phone || 'sin teléfono') + '</div>' +
        '</div>' +
        '<button class="res-cancel" data-cancel="' + r.id + '">Cancelar</button>' +
      '</li>';
    }).join('') + '</ul>';
  }

  function escapeHtml(s) {
    return String(s || '').replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }

  function msg(text, ok) {
    var el = document.getElementById('res-msg');
    el.textContent = text;
    el.className = 'res-msg ' + (ok ? 'ok' : 'err');
    el.hidden = false;
  }

  /* ---------- eventos ---------- */
  function wire() {
    document.getElementById('res-date').addEventListener('change', function () {
      sel.date = this.value;
      sel.time = '';
      renderSlots();
    });

    document.getElementById('res-slots').addEventListener('click', function (e) {
      var b = e.target.closest('.res-slot');
      if (!b || b.disabled) return;
      sel.time = b.getAttribute('data-time');
      renderSlots();
    });

    document.getElementById('res-form').addEventListener('submit', function (e) {
      e.preventDefault();
      var name = document.getElementById('res-name').value.trim();
      var phone = document.getElementById('res-tel').value.trim();
      var personas = document.getElementById('res-pers').value;
      if (!sel.time) { msg('Elige una hora disponible.', false); return; }
      if (!name) { msg('Escribe el nombre de la reservación.', false); return; }
      if (!phone) { msg('Déjanos un teléfono de contacto.', false); return; }
      if (isTaken(sel.date, sel.time)) { msg('Esa hora se acaba de ocupar, elige otra.', false); renderSlots(); return; }

      var list = load();
      list.push({
        id: 'r' + Date.now() + Math.floor(Math.random() * 1000),
        date: sel.date, time: sel.time, name: name, phone: phone, personas: personas,
        created: new Date().toISOString()
      });
      save(list);
      msg('¡Listo! Mesa reservada para ' + fmtDate(sel.date) + ' a las ' + sel.time + '. 🍗', true);
      sel.time = '';
      document.getElementById('res-name').value = '';
      document.getElementById('res-tel').value = '';
      renderSlots();
      renderList();
    });

    document.getElementById('res-list-wrap').addEventListener('click', function (e) {
      var b = e.target.closest('[data-cancel]');
      if (!b) return;
      var id = b.getAttribute('data-cancel');
      var list = load().filter(function (r) { return r.id !== id; });
      save(list);
      renderSlots();
      renderList();
      msg('Reservación cancelada. Esa hora vuelve a estar libre.', true);
    });
  }

  render();
})();
