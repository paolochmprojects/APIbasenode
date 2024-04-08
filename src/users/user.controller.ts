import http from "node:http"
import userService, { UserService } from "./user.service"

export interface UserDTO {
    name: string
    email: string
    role: string
    rate: number
}

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

    async createUser(req: http.IncomingMessage, res: http.ServerResponse) {
        let data = ""
        req.on("data", (chunk) => {
            data += chunk
        })

        req.on("end", async () => {
            try {
                const jsonData = JSON.parse(data) as UserDTO;
                const err = await this.userService.createUser(jsonData)
                if (err === null) {
                    res.writeHead(201, { "Content-Type": "application/json" })
                    res.write(JSON.stringify({ message: "User se creo correctamente" }))
                    res.end()
                    return
                }
                res.writeHead(400, { "Content-Type": "application/json" })
                res.write(JSON.stringify({ message: err }))
                res.end()
                return


            } catch (err) {
                if (err instanceof Error) {
                    res.writeHead(500, { "Content-Type": "application/json" })
                    res.write(JSON.stringify({ message: `Error: ${err.message}` }))
                    res.end()
                    return
                }
            }
        })
    }
}


export default new UserController(userService)
