import { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";
import { unstable_getServerSession } from "next-auth/next";

import { authOptions } from "../auth/[...nextauth]";

import { PLATFORMS_API } from "./constants";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<unknown>
) {
  if (req.method === "GET") {
    const session = await unstable_getServerSession(req, res, authOptions);

    const { data, status } = await axios.get<unknown>(
      `${PLATFORMS_API}/my-platforms`,
      {
        params: req.query,
        headers: { Authorization: `Bearer ${session?.accessToken}` },
      }
    );

    return res.status(status).json(data);
  }

  return res.status(404).json({});
}
