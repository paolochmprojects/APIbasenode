import { Request, Response } from "express"
import userService, { UserService } from "./user.service"

export interface UserDTO {
    name: string
    email: string
    role: string
    rate: number
}

class UserController {

    constructor(private userService: UserService) { }

    async getUsers(_req: Request, res: Response) {
        const users = await this.userService.getUsers()
        return res.status(200).json({ massage: "ok", data: users })
    }

    async getUsersById(req: Request, res: Response) {
        const { id } = req.params
        const user = await this.userService.getUserById(String(id))
        if (typeof user === "string") {
            return res.status(400).json({ massage: user })
        }
        return res.status(200).json({ massage: "ok", data: user })
    }

    async createUser(req: Request, res: Response) {
        const data = req.body
        const err = await this.userService.createUser(data)
        if (err === null) {
            return res.status(201).json({ message: "User se creo correctamente" })
        }
        return res.status(400).json({ message: err })
    }

    async updateUser(req: Request, res: Response) {
        const { id } = req.params
        const data = req.body

        const err = await this.userService.updateUser(id, data)
        if (err === null) {
            return res.status(200).json({ message: "User se actualizo correctamente" })
        }
        return res.status(400).json({ message: err })
    }

    async deleteUser(req: Request, res: Response) {
        const { id } = req.params
        const err = await this.userService.deleteUser(id)

        if (err === null) {
            return res.status(204).json({ message: "User se elmino correctamente" })
        }
        return res.status(400).json({ message: err })
    }
}


export default new UserController(userService)
