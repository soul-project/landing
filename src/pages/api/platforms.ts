import { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";
import { StatusCodes } from "http-status-codes";
import { getToken } from "next-auth/jwt";

import { PLATFORMS_API } from "./platforms/constants";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<unknown>
) {
  if (req.method === "POST") {
    const session = await getToken({ req });

    const { status, data } = await axios.post(PLATFORMS_API, req.body, {
      headers: { Authorization: `Bearer ${session?.accessToken}` },
    });

    return res.status(status).json(data);
  }

  return res.status(StatusCodes.NOT_FOUND).json({});
}
