import { User } from "../interfaces/user";
import { UserLogin } from "../interfaces/user-login";
import { UserModel } from "../models/user.model";
import bcrypt from "bcrypt";

export async function getUser(username: string): Promise<User | null> {
  try {
    return await UserModel.findOne({ username });
  } catch (error) {
    console.log(error);
    throw new Error("Error getting user:" + username);
  }
}

export async function addUser(
  user: UserLogin
): Promise<{ status: number; msg: string }> {
  try {
    const newUser = new UserModel();
    newUser.password = bcrypt.hashSync(user.password, bcrypt.genSaltSync(10));
    newUser.username = user.username;
    await newUser.save();
    return { status: 201, msg: "User saved successfully" };
  } catch (error: any) {
    console.log(error);
    if (error.code === 11000) {
      return { status: 400, msg: "This username is already taken" };
    }
    throw new Error("Error registering new user");
  }
}

export const userService = Object.freeze({ getUser, addUser });
