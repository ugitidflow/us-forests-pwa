{\rtf1\ansi\ansicpg1251\cocoartf2822
\cocoatextscaling0\cocoaplatform0{\fonttbl\f0\fswiss\fcharset0 Helvetica;}
{\colortbl;\red255\green255\blue255;}
{\*\expandedcolortbl;;}
\margl1440\margr1440\vieww11520\viewh8400\viewkind0
\pard\tx720\tx1440\tx2160\tx2880\tx3600\tx4320\tx5040\tx5760\tx6480\tx7200\tx7920\tx8640\pardirnatural\partightenfactor0

\f0\fs24 \cf0 // 1. \uc0\u1048 \u1085 \u1080 \u1094 \u1080 \u1072 \u1083 \u1080 \u1079 \u1072 \u1094 \u1080 \u1103  \u1082 \u1072 \u1088 \u1090 \u1099 \
var map = L.map('map').setView([39, -98], 5); // \uc0\u1094 \u1077 \u1085 \u1090 \u1088  \u1057 \u1064 \u1040 \
\
// 2. \uc0\u1055 \u1086 \u1076 \u1083 \u1086 \u1078 \u1082 \u1072  OSM (\u1073 \u1077 \u1089 \u1087 \u1083 \u1072 \u1090 \u1085 \u1086 )\
L.tileLayer('https://tile.openstreetmap.org/\{z\}/\{x\}/\{y\}.png', \{\
  maxZoom: 19,\
  attribution: '&copy; OpenStreetMap contributors'\
\}).addTo(map);\
\
// 3. \uc0\u1069 \u1083 \u1077 \u1084 \u1077 \u1085 \u1090 \u1099  \u1087 \u1072 \u1085 \u1077 \u1083 \u1080 \
const forestNameEl = document.getElementById('forest-name');\
const navigateBtn = document.getElementById('navigate-btn');\
\
let selectedLat = null;\
let selectedLon = null;\
\
// 4. \uc0\u1057 \u1083 \u1086 \u1081  National Forests \u1095 \u1077 \u1088 \u1077 \u1079  ArcGIS REST API USFS\
var forests = L.esri.featureLayer(\{\
  url: "https://apps.fs.usda.gov/arcx/rest/services/EDW/EDW_ForestBoundaries_01/MapServer/0",\
  style: \{\
    color: "#0e6b0e",\
    weight: 1,\
    fillColor: "#22aa22",\
    fillOpacity: 0.3\
  \}\
\}).addTo(map);\
\
// 5. \uc0\u1050 \u1083 \u1080 \u1082  \u1087 \u1086  \u1083 \u1077 \u1089 \u1091 \
forests.on("click", function(e) \{\
  const props = e.layer.feature.properties;\
  forestNameEl.textContent = props.FORESTNAME || "\uc0\u1053 \u1077 \u1080 \u1079 \u1074 \u1077 \u1089 \u1090 \u1085 \u1099 \u1081  \u1083 \u1077 \u1089 ";\
\
  // \uc0\u1041 \u1077 \u1088 \u1105 \u1084  \u1082 \u1086 \u1086 \u1088 \u1076 \u1080 \u1085 \u1072 \u1090 \u1099  \u1090 \u1086 \u1095 \u1082 \u1080  \u1082 \u1083 \u1080 \u1082 \u1072  (\u1087 \u1088 \u1080 \u1084 \u1077 \u1088 \u1085 \u1086  \u1094 \u1077 \u1085 \u1090 \u1088  \u1090 \u1086 \u1075 \u1086 , \u1082 \u1091 \u1076 \u1072  \u1090 \u1099  \u1090 \u1082 \u1085 \u1091 \u1083 )\
  selectedLat = e.latlng.lat;\
  selectedLon = e.latlng.lng;\
\
  navigateBtn.disabled = false;\
\
  // \uc0\u1055 \u1083 \u1072 \u1074 \u1085 \u1086  \u1087 \u1088 \u1080 \u1073 \u1083 \u1080 \u1078 \u1072 \u1077 \u1084  \u1082 \u1072 \u1088 \u1090 \u1091  \u1082  \u1074 \u1099 \u1073 \u1088 \u1072 \u1085 \u1085 \u1086 \u1081  \u1086 \u1073 \u1083 \u1072 \u1089 \u1090 \u1080 \
  map.flyTo([selectedLat, selectedLon], 9);\
\});\
\
// 6. \uc0\u1050 \u1085 \u1086 \u1087 \u1082 \u1072  "\u1052 \u1072 \u1088 \u1096 \u1088 \u1091 \u1090  \u1074  Google Maps"\
navigateBtn.addEventListener("click", function() \{\
  if (!selectedLat || !selectedLon) return;\
\
  const url = `https://www.google.com/maps/dir/?api=1&destination=$\{selectedLat\},$\{selectedLon\}`;\
  window.open(url, "_blank");\
\});\
\
// 7. \uc0\u1043 \u1077 \u1086 \u1083 \u1086 \u1082 \u1072 \u1094 \u1080 \u1103  \u1087 \u1086 \u1083 \u1100 \u1079 \u1086 \u1074 \u1072 \u1090 \u1077 \u1083 \u1103  (\u1089 \u1087 \u1088 \u1086 \u1089 \u1080 \u1090  \u1088 \u1072 \u1079 \u1088 \u1077 \u1096 \u1077 \u1085 \u1080 \u1077 )\
map.locate(\{ setView: true, maxZoom: 8 \});\
}