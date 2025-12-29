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
        // Подпись на карте
        layer.bindTooltip(feature.properties.FORESTNAME, {
          permanent: false, // true – подпись всегда, false – при наведении
          direction: "center",
          className: "forest-label"
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
  });
