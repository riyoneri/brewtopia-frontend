import { Socket, io } from "socket.io-client";

let socket: Socket;

export function getSocket() {
  return socket;
}

export function connectSocketServer(
  token: string = "",
  role: "admin" | "user" = "user",
) {
  socket = io(process.env.NEXT_PUBLIC_API_URL?.slice(0, -3), {
    auth: { token, role },
  });
}
