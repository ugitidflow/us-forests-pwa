// --- Функция проверки подписки через serverless endpoint ---
async function checkPatreonAccess(userId) {
  try {
    const res = await fetch(`/api/check-subscription?user_id=${userId}`);
    const data = await res.json();
    return data.access; // true если подписан на нужный tier
  } catch (err) {
    console.error(err);
    return false;
  }
}

// --- Основная функция инициализации карты ---
async function initMap() {
  // 1. Инициализация карты
  var map = L.map('map').setView([39, -98], 5);

  // 2. Подложка OSM
  L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; OpenStreetMap contributors'
  }).addTo(map);

  // 3. Панель информации
  const forestNameEl = document.getElementById('forest-name');
  const navigateBtn = document.getElementById('navigate-btn');

  let selectedLat = null;
  let selectedLon = null;

  // 4. Загружаем GeoJSON с National Forests и Grasslands
  fetch('data/Only_National_forests and grass_s08.json')
    .then(res => res.json())
    .then(data => {
      L.geoJSON(data, {
        style: {
          color: "#0e6b0e",
          weight: 1,
          fillColor: "#22aa22",
          fillOpacity: 0.35
        },
        onEachFeature: function(feature, layer) {
          // Подпись при наведении
          layer.on('mouseover', function(e) {
            layer.bindTooltip(feature.properties.FORESTNAME, {
              permanent: false,
              direction: "center",
              className: "forest-label"
            }).openTooltip(e.latlng);
          });
          layer.on('mouseout', function(e) {
            layer.closeTooltip();
          });

          // Клик по лесу
          layer.on('click', function(e) {
            forestNameEl.textContent = feature.properties.FORESTNAME;
            selectedLat = e.latlng.lat;
            selectedLon = e.latlng.lng;
            navigateBtn.disabled = false;
            map.flyTo([selectedLat, selectedLon], 8);
          });
        }
      }).addTo(map);
    })
    .catch(err => console.error("Ошибка загрузки JSON:", err));

  // 5. Кнопка маршрута
  navigateBtn.addEventListener("click", function() {
    if (!selectedLat || !selectedLon) return;
    const url = `https://www.google.com/maps/dir/?api=1&destination=${selectedLat},${selectedLon}`;
    window.open(url, "_blank");
  });

  // 6. Геолокация пользователя
  map.locate({ setView: true, maxZoom: 8 });

  map.on('locationfound', function(e) {
    const radius = e.accuracy;
    L.marker(e.latlng)
      .addTo(map)
      .bindPopup("Вы здесь")
      .openPopup();
    L.circle(e.latlng, radius, {
      color: 'blue',
      fillColor: '#30f',
      fillOpacity: 0.2
    }).addTo(map);
  });

  map.on('locationerror', function(e) {
    alert("Геолокация не доступна: " + e.message);
  });
}

// --- Проверка подписки перед инициализацией карты ---
(async () => {
  const userId = 'ПОЛУЧЕННЫЙ_OAUTH_USER_ID'; // сюда нужно подставить user_id после Patreon OAuth
  const access = await checkPatreonAccess(userId);

  if (!access) {
    document.body.innerHTML = `
      <h2>Доступ только для подписчиков Patreon</h2>
      <p>Подпишитесь на нужный tier, чтобы получить доступ к карте.</p>
    `;
  } else {
    initMap();
  }
})();
