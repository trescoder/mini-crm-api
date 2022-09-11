import jwt from "jsonwebtoken";
import { Constants } from "../constants";

/**
 *
 * @param user {username: string, password: string}
 * @returns token
 */
export async function authLogin(user: any) {
  const { JWT_EXP_TIME, JWT_SECRET } = Constants;
  const token = jwt.sign({ sub: user.username }, JWT_SECRET, {
    expiresIn: JWT_EXP_TIME,
  });
  return token;
}
