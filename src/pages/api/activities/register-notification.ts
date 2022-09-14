import { NextApiRequest, NextApiResponse } from "next";
import { getFirestore } from "firebase-admin/firestore";
import { StatusCodes } from "http-status-codes";
import { getToken } from "next-auth/jwt";

import { getFirebaseAdminApp } from "../utils/firebase-admin";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<unknown>
) {
  const firebaseAdminApp = getFirebaseAdminApp();
  if (req.method === "POST") {
    const session = await getToken({ req });

    if (!session) {
      return res.status(StatusCodes.UNAUTHORIZED).json({});
    }
    if (!req.body?.fcm_token) {
      return res.status(StatusCodes.BAD_REQUEST).json({});
    }

    const db = getFirestore(firebaseAdminApp);
    const ref = db.collection(`fcm_tokens/users/${session.user.id}`);

    const results = await ref
      .where("fcm_token", "==", req.body.fcm_token)
      .select("fcm_token")
      .get();
    if (results.docs.length < 1)
      await ref.add({ fcm_token: req.body.fcm_token });

    return res.status(StatusCodes.OK).json({});
  }

  return res.status(StatusCodes.NOT_FOUND).json({});
}
