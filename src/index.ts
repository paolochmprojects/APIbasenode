import http from "node:http"
import settings from "./config/settings";
import db from "./database/database";

const requestListener: http.RequestListener = async (_req, _res) => {

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
