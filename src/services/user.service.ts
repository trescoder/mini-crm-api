import { User } from "../interfaces/user";
import { UserLogin } from "../interfaces/user-login";
import { UserModel } from "../models/user.model";
import bcrypt from "bcrypt";
import { NewClient } from "../interfaces/new-client";
import { ClientModel } from "../models/clients.model";

async function getUser(username: string): Promise<User | null> {
  try {
    return await UserModel.findOne({ username });
  } catch (error) {
    console.log(error);
    throw new Error("Error getting user:" + username);
  }
}

async function addUser(
  user: UserLogin
): Promise<{ status: number; msg: string }> {
  try {
    const newUser = new UserModel();
    newUser.password = bcrypt.hashSync(user.password, bcrypt.genSaltSync(10));
    newUser.username = user.username;
    await newUser.save();
    return { status: 201, msg: "User saved successfully" };
  } catch (error: any) {
    if (error.code === 11000) {
      return { status: 400, msg: "This username is already taken" };
    }
    console.log(error);
    throw new Error("Error registering new user");
  }
}

async function getClients(username: string) {
  try {
    const user = await UserModel.findOne({ username });
    return { status: 200, data: user?.clients };
  } catch (error) {
    return { status: 500, data: error };
  }
}

async function registerNewClient(username: string, client: NewClient) {
  try {
    const user = await UserModel.findOne({ username });
    const newClient = new ClientModel(client);

    if (user) {
      if (user.clients.some((client) => client.email === newClient.email)) {
        return {
          status: 400,
          msg: "This email is already taken",
          success: false,
        };
      }
      user.clients.push(newClient);
      await user.save();
      return { status: 201, data: user, success: true };
    } else {
      return {
        status: 404,
        msg: `User with username ${username} nor found`,
        success: false,
      };
    }
  } catch (error) {
    return { status: 500, msg: error };
  }
}

async function removeClient(username: string, id: string) {
  try {
    const user = await UserModel.findOne({ username });
    if (user) {
      const index = user.clients.findIndex((client) => client.id === id);
      if (index >= 0) {
        user.clients.splice(index, 1);
        await user.save();
        return {
          status: 200,
          msg: "client removed successfully",
          success: true,
        };
      }
      return {
        status: 404,
        msg: `email with id ${id} not found`,
        success: false,
      };
    } else {
      return { status: 404, msg: "user seems to not exists", success: false };
    }
  } catch (error) {
    return { status: 500, msg: error, success: false };
  }
}

export const userService = Object.freeze({
  getUser,
  addUser,
  getClients,
  registerNewClient,
  removeClient,
});
