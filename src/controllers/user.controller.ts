import { Request, Response } from "express";
import { authLogin } from "../auth/auth.service";
import { userService } from "../services/user.service";

async function login(req: Request, res: Response) {
  // req.user stores whatever is returned from local.strategy
  const token = await authLogin(req.user);
  res.status(200).json({ token });
}

async function addUser(req: Request, res: Response) {
  const { username, password } = req.body;
  const { status, msg } = await userService.addUser({ username, password });
  res.status(status).json({ msg });
}

async function logout(req: Request, res: Response) {
  try {
    await req.logOut({ keepSessionInfo: false }, (err) => {
      if (err) throw new Error();
    });
    return res.status(200).json({ msg: "logout successfully", success: true });
  } catch (error) {
    return res
      .status(500)
      .json({ msg: "Error while login out", success: false });
  }
}

export const userController = { login, addUser, logout };
