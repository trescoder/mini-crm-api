import { NextFunction, Request, Response } from "express";

export function checkTokenExistence(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) {
    req.logOut((err) => {
      if (err) throw new Error("Something went wrong while logging out");
      return res
        .status(400)
        .json({ msg: "you must provide a token", success: false });
    });
  } else {
    return next();
  }
}
