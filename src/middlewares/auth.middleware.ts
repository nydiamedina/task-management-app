import * as jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { Request, Response, NextFunction } from "express";

dotenv.config();
const { JWT_PRIVATE_KEY = "" } = process.env;

if (!JWT_PRIVATE_KEY) {
  throw new Error("JWT_PRIVATE_KEY environment variable is not set.");
}

export const AuthMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token =
    req.headers &&
    req.headers.authorization &&
    req.headers.authorization.split(" ")[1];
  if (!token) {
    return res.status(401).json({ message: "No token was provided." });
  }

  try {
    const decoded = jwt.verify(token, JWT_PRIVATE_KEY);
    if (typeof decoded === "object" && decoded.userId) {
      req.body.userId = decoded.userId;
    }
    next();
  } catch (err) {
    return res.status(401).json({ message: "Failed to authenticate token." });
  }
};
