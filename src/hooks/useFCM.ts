import { useEffect, useState } from "react";
import { FirebaseApp, initializeApp } from "firebase/app";
import { getMessaging, getToken, Messaging } from "firebase/messaging";

import { firebaseConfig, VAPID_KEY } from "src/config/firebaseConfig";

export async function initializeFCM(app: FirebaseApp) {
  try {
    const messaging = getMessaging(app);
    const localFcmToken = localStorage.getItem("fcm_token");
    if (localFcmToken) return { token: localFcmToken, messaging };

    const status = await Notification.requestPermission();
    if (status && status === "granted") {
      // Get new token from Firebase
      const fcmToken = await getToken(messaging, { vapidKey: VAPID_KEY });

      if (fcmToken) {
        localStorage.setItem("fcm_token", fcmToken);
        return { token: fcmToken, messaging };
      }
    }
  } catch (error) {}
  return null;
}

export default function useFcm() {
  const [fcmSession, setFcmSession] = useState<{
    token: string;
    messaging: Messaging;
  } | null>(null);
  useEffect(() => {
    if (typeof window !== undefined && firebaseConfig.apiKey) {
      const init = async () => {
        const token = await initializeFCM(app);
        setFcmSession(token);
      };

      const app = initializeApp(firebaseConfig);
      init();
    }
  }, []);

  return fcmSession;
}