import { NextApiRequest, NextApiResponse } from "next";
import { unstable_getServerSession } from "next-auth/next";
import { getFirestore } from "firebase-admin/firestore";
import { StatusCodes } from "http-status-codes";

import { authOptions } from "../auth/[...nextauth]";
import { getFirebaseAdminApp } from "../utils/firebase-admin";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<unknown>
) {
  const firebaseAdminApp = getFirebaseAdminApp();
  if (req.method === "POST") {
    const session = await unstable_getServerSession(req, res, authOptions);

    if (!session) {
      return res.status(StatusCodes.UNAUTHORIZED).json({});
    }
    if (!req.body?.fcm_token) {
      return res.status(StatusCodes.BAD_REQUEST).json({});
    }

    const db = getFirestore(firebaseAdminApp);
    const ref = db.collection(`fcm_tokens/users/${session.user.id}`);

    ref.add({ fcm_token: req.body.fcm_token });
    // TODO: Remove duplicates or make sure we don't add again

    return res.status(StatusCodes.OK).json({});
  }

  return res.status(StatusCodes.NOT_FOUND).json({});
}
