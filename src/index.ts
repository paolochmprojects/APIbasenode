import http from "node:http"
import settings from "./config/settings";
import db from "./database/database";
import userController from "./users/user.controller";

const requestListener: http.RequestListener = async (req: http.IncomingMessage, res: http.ServerResponse) => {
    if (req.method === "GET" && req.url === "/users"){
        userController.getUsers(req, res)
    }
};

const server = http.createServer(requestListener);
server.listen(settings.PORT, () => {
    console.log("Server listen on port -> " + settings.PORT)
});

server.on("listening", async()=>{
    await db.connect()
})

server.on("close", async()=>{
    await db.disconnect()
})
