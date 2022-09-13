/* eslint-disable @cspell/spellchecker */
importScripts(
  "https://www.gstatic.com/firebasejs/9.9.4/firebase-app-compat.js"
);
importScripts(
  "https://www.gstatic.com/firebasejs/9.9.4/firebase-messaging-compat.js"
);

firebase.initializeApp({
  apiKey: "AIzaSyAMTwsyhJNTaGfQvuOi8NKGB7iYluPaSuA",
  authDomain: "soul-72472.firebaseapp.com",
  projectId: "soul-72472",
  storageBucket: "soul-72472.appspot.com",
  messagingSenderId: "320606596886",
  appId: "1:320606596886:web:e04e056b3c028fa9da6a37",
  measurementId: "G-LG017PPHCW",
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage(function (payload) {
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});
