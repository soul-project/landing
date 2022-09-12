import { NextApiRequest, NextApiResponse } from "next";
// import { unstable_getServerSession } from "next-auth/next";

// import { authOptions } from "./auth/[...nextauth]";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<unknown>
) {
  if (req.method === "POST") {
    // TODO: Send notification via FCM
    // const session = await unstable_getServerSession(req, res, authOptions);

    return res.status(200).json({});
  }

  return res.status(404).json({});
}
