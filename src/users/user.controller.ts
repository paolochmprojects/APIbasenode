import http from "node:http"
import userService, { UserService } from "./user.service"

class UserController {

    constructor(private userService: UserService) { }

    async getUsers(_req: http.IncomingMessage, res: http.ServerResponse) {
        const users = await this.userService.getUsers()
        res.writeHead(200, { "Content-Type": "application/json" })
        res.write(JSON.stringify({ massage: "ok", data: users }))
        res.end()
    }

    async getUsersById(req: http.IncomingMessage, res: http.ServerResponse) {
        const id = String(req.url).split("/").pop()
        const user = await this.userService.getUserById(String(id))

        if (!user) {
            res.writeHead(400, { "Content-Type": "application/json" })
            res.write(JSON.stringify({ massage: "User not found" }))
            res.end()
            return
        }
        res.writeHead(200, { "Content-Type": "application/json" })
        res.write(JSON.stringify({ massage: "ok", data: user }))
        res.end()
    }
}


export default new UserController(userService)
