import http from "node:http"
import userService, { UserService } from "./user.service"
import { resp } from "../utils/response"

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
        return resp(res, { massage: "ok", data: users },200)
    }

    async getUsersById(req: http.IncomingMessage, res: http.ServerResponse) {
        const id = String(req.url).split("/").pop()
        const user = await this.userService.getUserById(String(id))

        if (typeof user === "string") {
            return resp(res, { massage: user }, 400)
        }
        return resp(res, { massage: "ok", data: user }, 200)
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
                    return resp(res, { message: "User se creo correctamente" }, 201)
                }
                return resp(res, { message: err }, 400)


            } catch (err) {
                if (err instanceof Error) {
                    return resp(res, { message: `Error: ${err.message}` }, 500)
                }
                return resp(res, { message: `Error` }, 500)
            }
        })
    }

    async updateUser (req: http.IncomingMessage, res: http.ServerResponse){

        const id = String(req.url).split("/").pop()

        let data = ""
        req.on("data", (chunk) => {
            data += chunk
        })

        req.on("end", async () => {
            try {
                const jsonData = JSON.parse(data) as UserDTO;
                const err = await this.userService.updateUser(String(id), jsonData)
                if (err === null) {
                    return resp(res, { message: "User se actualizo correctamente" }, 200)
                }
                res.writeHead(400, { "Content-Type": "application/json" })
                res.write(JSON.stringify({ message: err }))
                res.end()
                return resp(res, { message: err }, 200)


            } catch (err) {
                if (err instanceof Error) {
                    return resp(res, { message: `Error: ${err.message}` }, 200)
                }
                return resp(res, { message: `Error` }, 200)
            }
        })
    }

    async deleteUser(req: http.IncomingMessage, res: http.ServerResponse) {
        const id = String(req.url).split("/").pop()
        const err = await this.userService.deleteUser(String(id))

        if (err === null) {
            return resp(res, { message: "User se elmino correctamente" }, 204)
        }
        return resp(res, { message: err }, 400)
    }
}


export default new UserController(userService)
