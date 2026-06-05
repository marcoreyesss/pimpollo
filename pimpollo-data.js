/* ============================================================
   PimPollo — datos compartidos (menú, info, reseñas, links)
   Edita aquí una sola vez y se actualiza en ambas propuestas.
   ============================================================ */
window.PIMPOLLO = {
  nombre: "PimPollo",
  tagline: "Pollo asado al carbón",
  direccion: "Av. Paseo de los Leones 2908, Cumbres 5o. Sector Secc C, 64610 Monterrey, N.L.",
  zona: "Cumbres 5º Sector · Monterrey",
  mapaQuery: "Av+Paseo+de+los+Leones+2908,+Cumbres+5o.+Sector,+64610+Monterrey,+N.L.",

  // Horarios — referencia, ajústalos a tu operación real
  horarios: [
    { dia: "Lunes",     hrs: "11:00 – 20:00" },
    { dia: "Martes",    hrs: "11:00 – 20:00" },
    { dia: "Miércoles", hrs: "11:00 – 20:00" },
    { dia: "Jueves",    hrs: "11:00 – 20:00" },
    { dia: "Viernes",   hrs: "11:00 – 21:00" },
    { dia: "Sábado",    hrs: "11:00 – 21:00" },
    { dia: "Domingo",   hrs: "11:00 – 20:00" }
  ],

  servicio: {
    opciones: ["Para llevar", "Consumo en el lugar"],
    ambiente: ["Informal", "Relajado"],
    pagos: ["Tarjetas de crédito", "Tarjetas de débito", "Efectivo"]
  },

  rating: { promedio: "5.0", total: 2 },

  reviews: [
    {
      nombre: "Fernando Huerta",
      meta: "Local Guide · 38 reseñas · 3 fotos",
      cuando: "Hace 6 meses",
      scores: { Comida: 5, Servicio: 5 }
    },
    {
      nombre: "Carlos Canp",
      meta: "Local Guide · 13 reseñas · 10 fotos",
      cuando: "Hace 2 años",
      detalle: "Recogí el pedido · $300–400 por persona",
      scores: { Comida: 5, Servicio: 4, Ambiente: 5 }
    }
  ],

  links: {
    didi: "https://www.didi-food.com/es-MX/food/store/5764607748243983075/?channel=10&cityId=52190500&lat=25.720867&lng=-100.389208&ddlCode=q9TJD0&area=MX&lang=es-MX&appKey=ds&dp_sub2=googlemap&redirectType=2",
    uber: "https://www.ubereats.com/mx/store/pimpollo-cumbres/GosztlasRFKUQucJ_fWWTg",
    maps: "https://www.google.com/maps/search/?api=1&query=Av+Paseo+de+los+Leones+2908+Cumbres+Monterrey"
  },

  // Precios de referencia (MXN). Confírmalos en DiDi / Uber Eats.
  menu: [
    {
      cat: "Los Pimpollos",
      nota: "Nuestro pollo asado al carbón, jugoso por dentro y doradito por fuera.",
      items: [
        {
          nombre: "Pimpollo Completo",
          desc: "Pollo entero asado (8 piezas), 2 salchichas asadas, salsa molcajete y guisada, totopos, tortillas de maíz, cebolla asada y curtida, jalapeño toreado.",
          precio: "$295",
          estrella: true
        },
        {
          nombre: "½ Pimpollo",
          desc: "4 piezas (ala, pierna, pechuga y muslo), salchicha asada, salsa molcajete y guisada, totopos, tortillas, cebolla y jalapeño.",
          precio: "$175"
        }
      ]
    },
    {
      cat: "Combos Familiares",
      nota: "Para compartir en grande. Incluyen complementos y refresco.",
      items: [
        {
          nombre: "Combo Súper Familia",
          desc: "2 pimpollos asados (16 piezas), 4 salchichas, 8 salsas molcajete o guisadas, 6 totopos, 6 paquetes de tortilla, 4 complementos (frijol, arroz, coditos) y refresco de 2 L.",
          precio: "$459",
          antes: "$499",
          estrella: true
        },
        {
          nombre: "Combo Familiar 1½",
          desc: "1½ pollo asado (12 piezas), 4 salchichas, 3 totopos, 4 paquetes de tortilla, 6 salsas, 3 complementos y refresco de 2.5 L.",
          precio: "$379"
        },
        {
          nombre: "Combo Pareja",
          desc: "2 piezas (pierna y muslo), 1 salsa, tortillas, totopos, 2 complementos y refresco de 600 ml.",
          precio: "$189"
        }
      ]
    },
    {
      cat: "Complementos",
      nota: "Pídelos chicos o familiares.",
      items: [
        { nombre: "Frijoles charros", desc: "Caldosos, con su sazón de la casa.", precio: "$55" },
        { nombre: "Arroz blanco", desc: "Suelto y bien sazonado.", precio: "$55" },
        { nombre: "Coditos en crema", desc: "Con jamón, cremositos.", precio: "$65" },
        { nombre: "Cebolla asada", desc: "Suave y dorada, con ligero caramelizado.", precio: "$25" },
        { nombre: "Salchicha asada", desc: "Porción extra para tu platillo.", precio: "$25" },
        { nombre: "Totopos", desc: "Tortilla de maíz crujiente.", precio: "$25" },
        { nombre: "Tortillas de maíz", desc: "Paquete extra para acompañar.", precio: "$20" }
      ]
    },
    {
      cat: "Salsas",
      nota: "Hechas en casa. Pregunta por las extra.",
      items: [
        { nombre: "Salsa molcajete", desc: "Jitomate, chile, cebolla y ajo asados.", precio: "$15" },
        { nombre: "Salsa guisada", desc: "Salsa roja con cebolla y tomate.", precio: "$15" },
        { nombre: "Jalapeños toreados", desc: "Para los que aguantan el picor.", precio: "$15" }
      ]
    },
    {
      cat: "Bebidas",
      nota: "Coca, Coca sin azúcar, Sprite o Manzana.",
      items: [
        { nombre: "Refresco 600 ml", desc: "Individual bien frío.", precio: "$25" },
        { nombre: "Refresco 2 L", desc: "Para la familia.", precio: "$45" },
        { nombre: "Refresco 2.5 L", desc: "El más rendidor.", precio: "$55" }
      ]
    }
  ]
};

/* Render del menú dentro de un contenedor. La clase base permite
   que cada propuesta lo vista con su propio CSS. */
window.renderMenu = function (target, opts) {
  opts = opts || {};
  var P = window.PIMPOLLO;
  var html = "";
  P.menu.forEach(function (group) {
    html += '<section class="mnu-group">';
    html += '<header class="mnu-group__head">';
    html += '<h3 class="mnu-group__title">' + group.cat + '</h3>';
    if (group.nota) html += '<p class="mnu-group__note">' + group.nota + '</p>';
    html += '</header>';
    html += '<ul class="mnu-list">';
    group.items.forEach(function (it) {
      html += '<li class="mnu-item' + (it.estrella ? ' is-star' : '') + '">';
      html += '<div class="mnu-item__main">';
      html += '<h4 class="mnu-item__name">' + it.nombre +
              (it.estrella ? ' <span class="mnu-star">★ Favorito</span>' : '') + '</h4>';
      if (it.desc) html += '<p class="mnu-item__desc">' + it.desc + '</p>';
      html += '</div>';
      html += '<div class="mnu-item__price">';
      if (it.antes) html += '<span class="mnu-was">' + it.antes + '</span>';
      html += '<span class="mnu-now">' + it.precio + '</span>';
      html += '</div>';
      html += '</li>';
    });
    html += '</ul>';
    html += '</section>';
  });
  target.innerHTML = html;
};
