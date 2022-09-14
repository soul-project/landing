import { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";
import { StatusCodes } from "http-status-codes";
import { getToken } from "next-auth/jwt";

import { PLATFORMS_API } from "./constants";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<unknown>
) {
  if (req.method === "GET") {
    const session = await getToken({ req });

    const { data, status } = await axios.get<unknown>(
      `${PLATFORMS_API}/my-platforms`,
      {
        params: req.query,
        headers: { Authorization: `Bearer ${session?.accessToken}` },
      }
    );

    return res.status(status).json(data);
  }

  return res.status(StatusCodes.NOT_FOUND).json({});
}
