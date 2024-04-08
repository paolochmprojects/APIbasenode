import userRepository, { UserRepository } from "./repository/user.repository"
import { UserDTO } from "./user.controller"

export interface User {
    id: number 
    name: string
    password : string
}


export class UserService {

    constructor (private userRepository: UserRepository){}

    async getUsers():Promise<User[]>{
        return await this.userRepository.getUsers()
    }

    async getUserById(id: string): Promise<User| null>{
        return await this.userRepository.getUserById(id)
    }

    async createUser(data:UserDTO): Promise<string | null> {
        try {
            await this.userRepository.createUser(data)
            return null
        } catch (err){
            if (err instanceof Error) return err.message
            return "Ocurrio algo."
        }
        
    }
}

export default new UserService(userRepository)
