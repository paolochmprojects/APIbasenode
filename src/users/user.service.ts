import userRepository, { UserRepository } from "./repository/user.repository"

export interface User {
    id: number 
    name: string
    password : string
}


export class UserService {

    constructor (private userRepository: UserRepository){}

    async getUsers():Promise<User[]|null>{
        await this.userRepository.getUsers()
        return null
    }
}

export default new UserService(userRepository)
