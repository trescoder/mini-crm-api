import { NextFunction, Request, Response } from "express";

export function isLoggedIn(req: Request, res: Response, next: NextFunction) {
  if (req.isAuthenticated()) {
    return next();
  }
  return res.status(401).json({ msg: "you must log in first" });
}
