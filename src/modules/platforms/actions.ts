import axios from "axios";

export const create = async ({
  accessToken,
  name,
  redirectUris,
}: CreateArgs) => {
  return axios.post(
    "https://api.soul-network.com/v1/platforms",
    {
      name,
      redirect_uris: redirectUris,
    },
    {
      headers: { Authorization: `Bearer ${accessToken}` },
    }
  );
};

type CreateArgs = {
  accessToken: string;
  name: string;
  redirectUris: string;
};
