import { useEffect, useState } from "react";
import { FirebaseApp, initializeApp } from "firebase/app";
import { getMessaging, getToken, Messaging } from "firebase/messaging";
import { useMutation } from "react-query";
import { Session } from "@sentry/nextjs";

import { firebaseConfig, VAPID_KEY } from "src/config/firebaseConfig";
import {
  registerNotification,
  RegisterNotificationArgs,
} from "src/modules/activities/actions";

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

export default function useFcm(session?: Session) {
  const [fcmSession, setFcmSession] = useState<{
    token: string;
    messaging: Messaging;
  } | null>(null);

  const { mutate } = useMutation<any, void, RegisterNotificationArgs>((args) =>
    registerNotification(args)
  );
  useEffect(() => {
    if (typeof window !== undefined && firebaseConfig.apiKey) {
      const app = initializeApp(firebaseConfig);
      const init = async () => {
        const session = await initializeFCM(app);
        if (session) {
          setFcmSession(session);
          mutate({ fcmToken: session?.token });
        }
      };

      init();
    }
  }, [mutate, session]);

  return fcmSession;
}
