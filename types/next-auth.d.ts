/* eslint-disable no-unused-vars */
import { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      role?: "user" | "admin";
      active?: boolean;
      token?: string;
    } & DefaultSession["user"];
  }

  interface User {
    role?: "user" | "admin";
    active?: boolean;
    picture?: string;
    token?: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    role?: "user" | "admin";
    active?: boolean;
    image?: string;
    token?: string;
  }
}
