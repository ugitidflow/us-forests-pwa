// 1. Инициализация карты
var map = L.map('map').setView([39, -98], 5);

// 2. Подложка OSM
L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
  maxZoom: 19,
  attribution: '&copy; OpenStreetMap contributors'
}).addTo(map);

// 3. Панель
const forestNameEl = document.getElementById('forest-name');
const navigateBtn = document.getElementById('navigate-btn');

let selectedLat = null;
let selectedLon = null;

// 4. Загружаем JSON с лесами
fetch('data/Only_National_forests and grass_s08.json')
  .then(res => res.json())
  .then(data => {
    // Проверим, что есть features
    if (!data.features || data.features.length === 0) {
      console.error("Файл пустой или нет features");
      return;
    }

    const forestsLayer = L.geoJSON(data, {
      style: {
        color: "#0e6b0e",
        weight: 1,
        fillColor: "#22aa22",
        fillOpacity: 0.35
      },
      onEachFeature: function(feature, layer) {
        layer.on('click', function(e) {
          forestNameEl.textContent = feature.properties.NAME || "Неизвестный лес";
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
