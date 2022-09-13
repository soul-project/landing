import { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";
import { unstable_getServerSession } from "next-auth/next";
import { StatusCodes } from "http-status-codes";

import { authOptions } from "../auth/[...nextauth]";

import { PLATFORMS_API } from "./constants";

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

  if (req.method === "PATCH") {
    const { id } = req.query;
    const session = await unstable_getServerSession(req, res, authOptions);

    const { status, data } = await axios.patch(
      `${PLATFORMS_API}/${id}`,
      req.body,
      {
        headers: { Authorization: `Bearer ${session?.accessToken}` },
      }
    );

    return res.status(status).json(data);
  }

  if (req.method === "DELETE") {
    const { id } = req.query;
    const session = await unstable_getServerSession(req, res, authOptions);
    const { status, data } = await axios.delete(`${PLATFORMS_API}/${id}`, {
      headers: { Authorization: `Bearer ${session?.accessToken}` },
    });

    return res.status(status).json(data);
  }

  return res.status(StatusCodes.NOT_FOUND).json({});
}
