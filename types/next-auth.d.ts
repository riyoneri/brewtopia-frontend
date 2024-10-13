/* eslint-disable no-unused-vars */
import { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      role?: "user" | "admin";
      token?: string;
    } & DefaultSession["user"];
  }

  interface User {
    role?: "user" | "admin";
    picture?: string;
    token?: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    role?: "user" | "admin";
    image?: string;
    token?: string;
  }
}
