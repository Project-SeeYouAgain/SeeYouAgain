/* eslint-disable no-undef */
/* eslint-disable no-console */
importScripts('https://www.gstatic.com/firebasejs/7.8.0/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/7.8.0/firebase-messaging.js');

self.addEventListener('install', function (e) {
    console.log('fcm sw install..');
    self.skipWaiting();
});

self.addEventListener('activate', function (e) {
    console.log('fcm sw activate..');
});

self.addEventListener('push', function (e) {
    console.log('push: ', e.data.json());
    if (!e.data.json()) return;

    const resultData = e.data.json();
    const notificationTitle = resultData.notification.title;
    const notificationOptions = {
        body: resultData.notification.body,
        icon: 'https://seeyouagain-s3-bucket.s3.ap-northeast-2.amazonaws.com/product/seeyouagain.png',
        data: resultData.data,
        ...resultData,
    };
    console.log('push: ', { resultData, notificationTitle, notificationOptions });

    self.registration.showNotification(notificationTitle, notificationOptions);
});

self.addEventListener('notificationclick', function (event) {
    console.log('notification click');
    console.log('data = ', event.notification.data);
    const url = '/chat';
    event.notification.close();
    event.waitUntil(clients.openWindow(url));
});
