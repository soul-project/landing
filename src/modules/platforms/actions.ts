import axios from "axios";

const PLATFORMS_API = "https://api.soul-network.com/v1/platforms";

export const create = async ({
  accessToken,
  name,
  redirectUris,
}: CreateArgs) => {
  return axios.post(
    PLATFORMS_API,
    {
      name,
      redirect_uris: redirectUris,
    },
    {
      headers: { Authorization: `Bearer ${accessToken}` },
    }
  );
};

export type CreateArgs = {
  accessToken: string;
  name: string;
  redirectUris: string[];
};

export const getMyList = async ({
  accessToken,
}: GetMyListArgs): Promise<PlatformList> => {
  const { data } = await axios.get<PlatformListData>(
    `${PLATFORMS_API}/my-platforms`,
    {
      params: { role: "admin" },
      headers: { Authorization: `Bearer ${accessToken}` },
    }
  );

  return {
    platforms: data.platforms.map((platform) => ({
      name: platform.name,
      nameHandle: platform.name_handle,
      id: platform.id,
    })),
    totalCount: data.total_count,
  };
};

getMyList.key = "modules/platforms/getList";

type GetMyListArgs = {
  accessToken: string;
};

type PlatformData = {
  id: number;
  name: string;
  name_handle: string;
};

type PlatformListData = {
  total_count: number;
  platforms: PlatformData[];
};

type Platform = {
  id: number;
  name: string;
  nameHandle: string;
};

type PlatformList = {
  totalCount: number;
  platforms: Platform[];
};

export const destroy = async ({ accessToken, platformId }: DestroyArgs) => {
  return axios.delete(`${PLATFORMS_API}/${platformId}`, {
    headers: { Authorization: `Bearer ${accessToken}` },
  });
};

export type DestroyArgs = {
  accessToken: string;
  platformId: number;
};
