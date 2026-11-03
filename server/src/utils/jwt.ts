
import jwt from "jsonwebtoken";

const ACCESS_TOKEN_EXPIRES_IN = Number(
  process.env.JWT_ACCESS_EXPIRES_IN ?? 900
);

const REFRESH_TOKEN_EXPIRES_IN = Number(
  process.env.JWT_REFRESH_EXPIRES_IN ?? 604800
);

const getSecret = (key: string): string => {
  const secret = process.env[key];

  if (!secret) {
    throw new Error(`${key} is not configured`);
  }

  return secret;
};

export const generateAccessToken = (userId: string): string => {
  return jwt.sign(
    { tokenType: "access" },
    getSecret("JWT_ACCESS_SECRET"),
    {
      subject: userId,
      expiresIn: ACCESS_TOKEN_EXPIRES_IN,
    }
  );
};

export const generateRefreshToken = (userId: string): string => {
  return jwt.sign(
    { tokenType: "refresh" },
    getSecret("JWT_REFRESH_SECRET"),
    {
      subject: userId,
      expiresIn: REFRESH_TOKEN_EXPIRES_IN,
    }
  );
};

export const getTokenExpiry = () => {
  const now = Date.now();

  return {
    accessTokenExpiresIn: ACCESS_TOKEN_EXPIRES_IN,
    refreshTokenExpiresIn: REFRESH_TOKEN_EXPIRES_IN,
    accessTokenExpiresAt: new Date(
      now + ACCESS_TOKEN_EXPIRES_IN * 1000
    ).toISOString(),
    refreshTokenExpiresAt: new Date(
      now + REFRESH_TOKEN_EXPIRES_IN * 1000
    ).toISOString(),
  };
};
