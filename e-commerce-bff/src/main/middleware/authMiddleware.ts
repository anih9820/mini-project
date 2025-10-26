import { RequestHandler } from "express";
import jwt from "jsonwebtoken";
import jwksClient from "jwks-rsa";
import logger from "../config/logger";

const client = jwksClient({
  jwksUri: `https://cognito-idp.${process.env.AWS_REGION}.amazonaws.com/${process.env.COGNITO_USER_POOL_ID}/.well-known/jwks.json`,
});

const getKey = (header: any, callback: any) => {
  client.getSigningKey(header.kid, (err, key) => {
    const signingKey = key?.getPublicKey();
    callback(null, signingKey);
  });
};

export const authenticate: RequestHandler = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  console.log("Token received:", token);

  if (!token) {
    logger.error("No token provided");
    res.status(401).json({ message: "Access Denied: No token provided" });
    return;
  }

  jwt.verify(
    token,
    getKey,
    {
      algorithms: ["RS256"],
      audience: process.env.COGNITO_APP_CLIENT_ID,
      issuer: `https://cognito-idp.${process.env.AWS_REGION}.amazonaws.com/${process.env.COGNITO_USER_POOL_ID}`,
    },
    (err, decoded: any) => {
      if (err) {
        logger.error("Invalid token", err);
        res.status(401).json({ message: "Access Denied: Invalid token" });
        return;
      }

      (req as any).user = decoded;
      const groups = (decoded?.["cognito:groups"] || []) as string[];
      (req as any).role = groups[0] || "CUSTOMER";

      logger.info(
        `User authenticated: ${(req as any).user?.email}, role: ${
          (req as any).role
        }`
      );
      next();
    }
  );
};
