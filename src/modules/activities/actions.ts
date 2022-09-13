import axios from "axios";

export async function registerNotification({
  fcmToken,
}: RegisterNotificationArgs) {
  await axios.post("/api/activities/register-notification", {
    fcm_token: fcmToken,
  });
}

export type RegisterNotificationArgs = {
  fcmToken: string;
};
