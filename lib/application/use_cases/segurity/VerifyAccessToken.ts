
export default async ({ accessTokenManager }, accessToken) => {
  const decoded = await accessTokenManager.decode(accessToken);
  if (!decoded) {
    throw new Error('Invalid access token');
  }
  return decoded;
};
