import { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";
import { unstable_getServerSession } from "next-auth/next";

import { authOptions } from "./auth/[...nextauth]";

import { PLATFORMS_API } from "./platforms/constants";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<unknown>
) {
  if (req.method === "POST") {
    const session = await unstable_getServerSession(req, res, authOptions);

    const { status, data } = await axios.post(PLATFORMS_API, req.body, {
      headers: { Authorization: `Bearer ${session?.accessToken}` },
    });

    return res.status(status).json(data);
  }

  return res.status(404).json({});
}
