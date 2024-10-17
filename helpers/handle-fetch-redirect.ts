import { signOut } from "next-auth/react";
import { redirect } from "next/navigation";
import { enqueueSnackbar } from "notistack";

export default function handleFetchRedirect(role: "admin" | "user") {
  enqueueSnackbar("Invalid auth token, you need to login first", {
    variant: "error",
    key: "login",
  });

  signOut({ redirect: false });

  redirect(role === "admin" ? "/obsidian" : "" + "/obsidian/auth/login");
}
