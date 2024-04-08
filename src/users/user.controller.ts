import http from "node:http"
import userService, {UserService} from "./user.service"

class UserController {

    constructor(private userService: UserService){}

    async getUsers(_req: http.IncomingMessage, res: http.ServerResponse) {
        await this.userService.getUsers()
        res.statusCode = 400
        res.end()
    }
}


export default new UserController(userService)
