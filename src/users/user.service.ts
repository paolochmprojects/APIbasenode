import userRepository, { UserRepository } from "./repository/user.repository"

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
}

export default new UserService(userRepository)
