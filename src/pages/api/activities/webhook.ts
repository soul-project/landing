import { getFirestore } from "firebase-admin/firestore";
import { getMessaging } from "firebase-admin/messaging";
import { NextApiRequest, NextApiResponse } from "next";

import { getFirebaseAdminApp } from "../utils/firebase-admin";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<unknown>
) {
  const firebaseAdminApp = getFirebaseAdminApp();

  if (req.method === "POST") {
    const body: Activity = req.body;
    const messaging = getMessaging(firebaseAdminApp);
    const db = getFirestore(firebaseAdminApp);
    const ref = db.collection(`fcm_tokens/users/${body.to_user.id}`);

    const tokens = (await ref.get()).docs.map((doc) => doc.get("fcm_token"));

    const result = await messaging.sendMulticast({
      tokens,
      notification: { title: "hello world", body: "Cool beans" },
    });

    if (result.failureCount > 0) {
      for (let i = 0; i < result.responses.length; i++) {
        if (!result.responses[i].success) {
          const document = (await ref.where("fcm_token", "==", tokens[i]).get())
            .docs[0];
          if (document) {
            await document.ref.delete();
          }
        }
      }
    }
    return res.status(200).json({});
  }

  return res.status(404).json({});
}

type User = {
  user_handle: string;
  username: string;
  id: number;
};

type Activity = {
  type: "FOLLOW";
  from_user: User;
  to_user: User;
};
