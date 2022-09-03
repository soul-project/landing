import axios from "axios";

export const create = async ({
  accessToken,
  name,
  redirectUris,
}: CreateArgs) => {
  return axios.post(
    "/api/platforms",
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
  accessToken?: string;
  name: string;
  redirectUris: string[];
};

export const getMyList = async (): Promise<PlatformList> => {
  const { data } = await axios.get<PlatformListData>(
    "/api/platforms/my-platforms",
    { params: { role: "admin" } }
  );

  return {
    platforms: data.platforms.map((platform) => ({
      name: platform.name,
      nameHandle: platform.name_handle,
      id: platform.id,
      createdAt: platform.created_at,
      updatedAt: platform.updated_at,
    })),
    totalCount: data.total_count,
  };
};

getMyList.key = "modules/platforms/actions/getList";

type PlatformData = {
  id: number;
  name: string;
  name_handle: string;
  created_at: string;
  updated_at: string;
};

type PlatformListData = {
  total_count: number;
  platforms: PlatformData[];
};

type Platform = {
  id: number;
  name: string;
  nameHandle: string;
  createdAt: string;
  updatedAt: string;
};

type PlatformList = {
  totalCount: number;
  platforms: Platform[];
};

export const destroy = async ({ accessToken, platformId }: DestroyArgs) => {
  return axios.delete(`/api/platforms/${platformId}`, {
    headers: { Authorization: `Bearer ${accessToken}` },
  });
};

export type DestroyArgs = {
  accessToken?: string;
  platformId: number;
};

export const getPlatform = async ({
  platformId,
}: GetPlatformArgs): Promise<PlatformFull> => {
  const { data } = await axios.get<PlatformFullData>(
    `/api/platforms/${platformId}`
  );

  return {
    id: data.id,
    name: data.name,
    nameHandle: data.name_handle,
    redirectUris: data.redirect_uris,
  };
};

getPlatform.key = "modules/platforms/actions/getPlatform";

export type GetPlatformArgs = {
  platformId: number;
};

type PlatformFullData = {
  id: number;
  name: string;
  name_handle: string;
  redirect_uris: string[];
};

type PlatformFull = {
  id: number;
  name: string;
  nameHandle: string;
  redirectUris: string[];
};

export const update = async ({
  name,
  redirectUris,
  platformId,
}: UpdateArgs) => {
  return axios.patch(`/api/platforms/${platformId}`, {
    name,
    redirect_uris: redirectUris,
  });
};

export type UpdateArgs = {
  name: string;
  redirectUris: string[];
  platformId: number;
};
