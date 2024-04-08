import http from "node:http"
import settings from "./config/settings";
import db from "./database/database";
import userController from "./users/user.controller";

const requestListener: http.RequestListener = async (
    req: http.IncomingMessage, 
    res: http.ServerResponse
) => {
    
    // simple logger.
    console.log(`${req.method} ${new Date()} ${req.url}`)
    
    if (req.method === "GET" && req.url === "/users/"){
        return userController.getUsers(req, res)
    }
    const reg = /^\/users\/([a-fA-F0-9-]+)$/
    if (req.method === "GET" && reg.test(String(req.url))){
        return userController.getUsersById(req, res)
    }


    // TODO: refactorizar logica de response.
    res.writeHead(404,{ "Content-Type": "application/json" })
    res.write(JSON.stringify({message:"Not found"}))
    res.end()
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
