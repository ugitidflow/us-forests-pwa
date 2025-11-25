// 1. Инициализация карты
var map = L.map('map').setView([39, -98], 5); // центр США

// 2. Подложка OSM (бесплатно)
L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
  maxZoom: 19,
  attribution: '&copy; OpenStreetMap contributors'
}).addTo(map);

// 3. Элементы панели
const forestNameEl = document.getElementById('forest-name');
const navigateBtn = document.getElementById('navigate-btn');

let selectedLat = null;
let selectedLon = null;

// 4. Слой National Forests через ArcGIS REST API USFS
var forests = L.esri.featureLayer({
  url: "https://apps.fs.usda.gov/arcx/rest/services/EDW/EDW_ForestBoundaries_01/MapServer/0",
  style: {
    color: "#0e6b0e",
    weight: 1,
    fillColor: "#22aa22",
    fillOpacity: 0.3
  }
}).addTo(map);

// 5. Клик по лесу
forests.on("click", function(e) {
  const props = e.layer.feature.properties;
  forestNameEl.textContent = props.FORESTNAME || "Неизвестный лес";

  // Берём координаты точки клика (примерно центр того, куда ты ткнул)
  selectedLat = e.latlng.lat;
  selectedLon = e.latlng.lng;

  navigateBtn.disabled = false;

  // Плавно приближаем карту к выбранной области
  map.flyTo([selectedLat, selectedLon], 9);
});

// 6. Кнопка "Маршрут в Google Maps"
navigateBtn.addEventListener("click", function() {
  if (!selectedLat || !selectedLon) return;

  const url = `https://www.google.com/maps/dir/?api=1&destination=${selectedLat},${selectedLon}`;
  window.open(url, "_blank");
});

// 7. Геолокация пользователя (спросит разрешение)
map.locate({ setView: true, maxZoom: 8 });
