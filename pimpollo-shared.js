/* Wiring compartido: links, reseñas, horarios, dirección, año */
(function () {
  var P = window.PIMPOLLO;
  if (!P) return;

  // Links de ordenar / mapa
  document.querySelectorAll('[data-link]').forEach(function (a) {
    var k = a.getAttribute('data-link');
    if (P.links[k]) a.setAttribute('href', P.links[k]);
  });

  // Año
  var yr = document.getElementById('yr');
  if (yr) yr.textContent = new Date().getFullYear();

  // Dirección
  var addr = document.getElementById('addr');
  if (addr) addr.textContent = P.direccion;
  var fa = document.getElementById('foot-addr');
  if (fa) fa.textContent = P.direccion;

  // Horarios
  var hl = document.getElementById('hours-list');
  if (hl) {
    var todayIdx = (new Date().getDay() + 6) % 7; // 0 = lunes
    hl.innerHTML = P.horarios.map(function (h, i) {
      return '<div class="hours__row' + (i === todayIdx ? ' is-today' : '') + '">' +
        '<span>' + h.dia + '</span><span>' + h.hrs + '</span></div>';
    }).join('');
  }

  // Reseñas
  var rv = document.getElementById('reviews');
  if (rv) {
    rv.innerHTML = P.reviews.map(function (r) {
      var initials = r.nombre.split(' ').map(function (w) { return w[0]; }).join('').slice(0, 2);
      var scores = Object.keys(r.scores).map(function (k) {
        return '<span>' + k + ' <b>' + r.scores[k] + '</b></span>';
      }).join('');
      return '<article class="rev">' +
        '<div class="rev__top">' +
          '<div class="rev__ava">' + initials + '</div>' +
          '<div><div class="rev__name">' + r.nombre + '</div>' +
          '<div class="rev__meta">' + r.meta + ' · ' + r.cuando + '</div></div>' +
        '</div>' +
        '<div class="stars" style="font-size:18px;">★★★★★</div>' +
        (r.detalle ? '<p class="rev__detail">' + r.detalle + '</p>' : '') +
        '<div class="rev__scores">' + scores + '</div>' +
      '</article>';
    }).join('');
  }

  // ---- Modal "Pide ya" (DiDi / Uber Eats) ----
  var triggers = document.querySelectorAll('.js-pedir');
  if (triggers.length) {
    var modal = document.createElement('div');
    modal.className = 'pedir-modal';
    modal.innerHTML =
      '<div class="pedir-modal__bg" data-close></div>' +
      '<div class="pedir-modal__box" role="dialog" aria-modal="true" aria-label="Ordenar">' +
        '<button class="pedir-modal__close" data-close aria-label="Cerrar">\u00d7</button>' +
        '<h3>\u00a1Pide ya!</h3>' +
        '<p>Elige tu app favorita y te lo llevamos calientito.</p>' +
        '<div class="pedir-modal__actions">' +
          '<a class="btn btn--red" href="' + (P.links.didi || '#') + '" target="_blank" rel="noopener" style="justify-content:center;">Ordenar por DiDi Food \u2192</a>' +
          '<a class="btn btn--ink" href="' + (P.links.uber || '#') + '" target="_blank" rel="noopener" style="justify-content:center;">Ordenar por Uber Eats \u2192</a>' +
        '</div>' +
      '</div>';
    document.body.appendChild(modal);
    function openModal(e) { if (e) e.preventDefault(); modal.classList.add('is-open'); }
    function closeModal() { modal.classList.remove('is-open'); }
    triggers.forEach(function (t) { t.addEventListener('click', openModal); });
    modal.addEventListener('click', function (e) { if (e.target.hasAttribute('data-close')) closeModal(); });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape') closeModal(); });
  }
})();
