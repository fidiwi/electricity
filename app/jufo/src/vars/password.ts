import { io } from "socket.io-client";
import { urls } from "./urls";
export const passwordExport = (callback:any) => {
    const socket = io(urls.SOCKET_ENDPOINT);
    socket.emit("password");
    socket.on("password", (data:string) => {
        callback(data);
    });
};
