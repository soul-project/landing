import { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";
import { unstable_getServerSession } from "next-auth/next";

import { authOptions } from "../auth/[...nextauth]";

const PLATFORMS_API = "https://api.soul-network.com/v1/platforms";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<unknown>
) {
  if (req.method === "GET") {
    const session = await unstable_getServerSession(req, res, authOptions);
    const { id, ...queryParams } = req.query;

    const { data, status } = await axios.get<unknown>(
      `${PLATFORMS_API}/${id}/full`,
      {
        params: queryParams,
        headers: { Authorization: `Bearer ${session?.accessToken}` },
      }
    );

    return res.status(status).json(data);
  }

  return res.status(404);
}
