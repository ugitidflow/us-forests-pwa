self.addEventListener("install", (event) => {
  console.log("Service Worker installed");
});

self.addEventListener("activate", (event) => {
  console.log("Service Worker activated");
});

// Пока просто прокидываем все запросы дальше в сеть
self.addEventListener("fetch", (event) => {
  // Можно будет добавить кэширование
});
