import { RequestHandler } from "express";

export const authorizeRole = (...allowed: string[]): RequestHandler => {
  return (req, res, next): void => {
    const role = (req as any).role || "CUSTOMER";
    if (allowed.length === 0 || allowed.includes(role)) {
      next(); 
      return;
    }
    res.status(403).json({ message: "Forbidden: insufficient role" });
  };
};
