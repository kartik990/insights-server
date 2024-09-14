import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

export const authorizationMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.cookies.access_token;

  if (!token) {
    return res.sendStatus(403);
  }

  try {
    jwt.verify(token, process.env.JWT_SECRET as string);
    return next();
  } catch (err) {
    console.log(err);
    return res.sendStatus(403);
  }
};
