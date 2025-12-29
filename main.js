// 1. Инициализация карты
var map = L.map('map').setView([39, -98], 5); // центр США

// 2. Подложка OSM
L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
  maxZoom: 19,
  attribution: '&copy; OpenStreetMap contributors'
}).addTo(map);

// 3. Элементы панели
const forestNameEl = document.getElementById('forest-name');
const navigateBtn = document.getElementById('navigate-btn');

let selectedLat = null;
let selectedLon = null;

// 4. Слой National Forests из локального GeoJSON
fetch('data/national_forests.geojson')
  .then(res => res.json())
  .then(data => {
    const forestsLayer = L.geoJSON(data, {
      style: {
        color: "#0e6b0e",      // контур
        weight: 1,
        fillColor: "#22aa22",  // заливка
        fillOpacity: 0.35
      },
      onEachFeature: function(feature, layer) {
        layer.on('click', function(e) {
          const props = feature.properties;
          forestNameEl.textContent = props.FORESTNAME || "Неизвестный лес";

          // координаты клика
          selectedLat = e.latlng.lat;
          selectedLon = e.latlng.lng;

          navigateBtn.disabled = false;

          // плавное приближение
          map.flyTo([selectedLat, selectedLon], 9);
        });
      }
    }).addTo(map);
  })
  .catch(err => console.error("Ошибка загрузки GeoJSON:", err));

// 5. Кнопка "Маршрут в Google Maps"
navigateBtn.addEventListener("click", function() {
  if (!selectedLat || !selectedLon) return;

  const url = `https://www.google.com/maps/dir/?api=1&destination=${selectedLat},${selectedLon}`;
  window.open(url, "_blank");
});

// 6. Геолокация пользователя
map.locate({ setView: true, maxZoom: 8 });
