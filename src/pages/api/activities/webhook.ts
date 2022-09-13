import { NextApiRequest, NextApiResponse } from "next";

import { getFirebaseAdminApp } from "../utils/firebase-admin";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<unknown>
) {
  const firebaseAdminApp = getFirebaseAdminApp();

  if (req.method === "POST") {
    // TODO: Send notification via FCM
    // const session = await unstable_getServerSession(req, res, authOptions);
    // TODO: Retrieve the fcm tokens from firebase so that we can send the right notifications to the
    // person

    return res.status(200).json({});
  }

  return res.status(404).json({});
}
