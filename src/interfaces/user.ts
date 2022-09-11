import { Client } from "./client";

export interface User {
  username: string | undefined;
  password: string | undefined;
  clients: [Client];
}
