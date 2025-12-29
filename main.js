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

// 4. Загружаем чистый GeoJSON
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

map.locate({ setView: true, maxZoom: 8 });

// Событие при успешной геолокации
map.on('locationfound', function(e) {
  // маркер на твоём местоположении
  const radius = e.accuracy; // точность в метрах
  L.marker(e.latlng)
    .addTo(map)
    .bindPopup("Вы здесь")
    .openPopup();

  // круг точности (необязательно)
  L.circle(e.latlng, radius, {
    color: 'blue',
    fillColor: '#30f',
    fillOpacity: 0.2
  }).addTo(map);
});

// Событие если геолокация не разрешена/не найдена
map.on('locationerror', function(e) {
  alert("Геолокация не доступна: " + e.message);
});

