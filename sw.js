/* Elite League / EliteScore Service Worker — Web Push */
self.addEventListener('install', (e) => {
    self.skipWaiting();
  });
  
  self.addEventListener('activate', (e) => {
    e.waitUntil(self.clients.claim());
  });
  
  self.addEventListener('push', (event) => {
    let data = { title: 'EliteScore', body: 'New update from Elite League', url: '/dashboard.html' };
    try {
      if (event.data) data = { ...data, ...event.data.json() };
    } catch (_) {}
  
    const options = {
      body: data.body || '',
      icon: data.icon || '/elite logo.png',
      badge: data.badge || '/elite logo.png',
      data: { url: data.url || '/dashboard.html' },
      vibrate: [120, 60, 120],
      tag: data.tag || 'elite-score',
      renotify: true,
      requireInteraction: false
    };
  
    event.waitUntil(self.registration.showNotification(data.title || 'EliteScore', options));
  });
  
  self.addEventListener('notificationclick', (event) => {
    event.notification.close();
    const target = (event.notification.data && event.notification.data.url) || '/dashboard.html';
    event.waitUntil(
      clients.matchAll({ type: 'window', includeUncontrolled: true }).then((list) => {
        for (const c of list) {
          if (c.url.includes(self.location.origin) && 'focus' in c) {
            c.navigate(target);
            return c.focus();
          }
        }
        if (clients.openWindow) return clients.openWindow(target);
      })
    );
  });