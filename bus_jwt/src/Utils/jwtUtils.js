const encodeBase64Url = (value) =>
  btoa(JSON.stringify(value))
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");

const decodeBase64Url = (value) => {
  const base64 = value.replace(/-/g, "+").replace(/_/g, "/");
  const padded = base64.padEnd(base64.length + ((4 - (base64.length % 4)) % 4), "=");

  return JSON.parse(atob(padded));
};

export const createDemoJwt = (user) => {
  const header = { alg: "HS256", typ: "JWT" };
  const payload = {
    sub: user.id,
    name: user.name,
    email: user.email,
    iat: Math.floor(Date.now() / 1000),
    exp: Math.floor(Date.now() / 1000) + 60 * 60,
  };

  return `${encodeBase64Url(header)}.${encodeBase64Url(payload)}.demo-signature`;
};

export const getUserFromToken = (token) => {
  if (!token) {
    return null;
  }

  const [, payloadPart] = token.split(".");
  const payload = decodeBase64Url(payloadPart);

  if (payload.exp * 1000 <= Date.now()) {
    return null;
  }

  return {
    id: payload.sub,
    name: payload.name,
    email: payload.email,
  };
};
