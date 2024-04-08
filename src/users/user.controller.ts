import http from "node:http"
import userService, {UserService} from "./user.service"

class UserController {

    constructor(private userService: UserService){}

    async getUsers(_req: http.IncomingMessage, res: http.ServerResponse) {
        const users = await this.userService.getUsers()
        res.writeHead(200, {"Content-Type": "application/json"})
        res.write(JSON.stringify({massage: "ok", data: users }))
        res.end()
    }

    async getUsersById(_req: http.IncomingMessage, res: http.ServerResponse) {
        await this.userService.getUsers()
        res.end()
    }
}


export default new UserController(userService)
