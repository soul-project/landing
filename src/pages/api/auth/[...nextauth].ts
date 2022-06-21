import NextAuth from "next-auth";
import NodeCache from "node-cache";

const CLIENT_ID = 2;
const tokenCache = new NodeCache({ stdTTL: 3600, checkperiod: 120 });

const getNewTokenFromServer = async (
  refreshToken: string
): Promise<{
  accessToken: string;
  expiresIn: number;
  refreshToken: string;
}> => {
  const url = "https://api.soul-network.com/v1/auth/refresh";
  const req = await fetch(url, {
    headers: {
      "Content-Type": "application/json",
    },
    method: "POST",
    body: JSON.stringify({
      refresh_token: refreshToken,
      client_id: CLIENT_ID,
    }),
  });

  const res = await req.json();
  if (!req.ok) throw res;

  return {
    accessToken: res.access_token,
    expiresIn: res.expires_in,
    refreshToken: res.refresh_token,
  };
};

async function refreshAccessToken(token: any) {
  const existingToken = tokenCache.get(token.refreshToken);
  if (existingToken) {
    return existingToken;
  }

  try {
    const refreshedTokens = await getNewTokenFromServer(token.refreshToken);

    const newToken = {
      ...token,
      accessToken: refreshedTokens.accessToken,
      accessTokenExpires: Date.now() + refreshedTokens.expiresIn * 1000,
      refreshToken: refreshedTokens.refreshToken ?? token.refreshToken,
    };
    tokenCache.set(token.refreshToken, newToken);

    return newToken;
  } catch (error) {
    return {
      ...token,
      error: "RefreshAccessTokenError",
    };
  }
}

export default NextAuth({
  // Configure one or more authentication providers
  providers: [
    {
      id: "soul",
      name: "Soul",
      type: "oauth",
      authorization: "https://login.soul-network.com",
      token: "https://api.soul-network.com/v1/auth/verify",
      userinfo: "https://api.soul-network.com/v1/users/me",
      checks: ["pkce", "state"],
      clientId: String(CLIENT_ID),
      clientSecret: "secret",
      profile: (profile) => {
        return {
          id: profile.id,
          email: profile.email,
          isActive: profile.is_active,
          username: profile.username,
          userHandle: profile.user_handle,
        };
      },
    },
  ],
  callbacks: {
    async jwt({ token, user, account }) {
      // Initial sign in
      if (account && user) {
        const expiresAt = account.expires_at ?? Date.now() + 900 * 1000;

        return {
          accessToken: account.access_token,
          accessTokenExpires: expiresAt,
          refreshToken: account.refresh_token,
          user,
        };
      }

      // Return previous token if the access token has not expired yet
      if (Date.now() < token.accessTokenExpires) {
        return token;
      }

      // Access token has expired, try to update it
      return refreshAccessToken(token);
    },
    async session({ session, token }) {
      session.user = token.user;
      session.accessToken = token.accessToken;
      session.error = token.error;

      return session;
    },
  },
});
