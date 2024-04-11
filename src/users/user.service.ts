import { UserDTO } from "./dto/user.dto"
import { User } from "./entity/user.interface"
import userRepository, { UserRepository } from "./repository/user.repository"


export class UserService {

    constructor(private userRepository: UserRepository) { }

    async getUsers(): Promise<User[]> {
        return await this.userRepository.getUsers<User>()
    }

    async getUserById(id: string): Promise<User | string> {
        try {
            return await this.userRepository.getUserById<User>(id)
        } catch (err) {
            if (err instanceof Error) return err.message
            return "Ocurrio algo."
        }
    }

    async createUser(data: UserDTO): Promise<string | Error> {
        try {
            const id = await this.userRepository.createUser(data)
            return id
        } catch (err) {
            if (err instanceof Error) return err
            return new Error("Unexpected error createUser()")
        }
    }

    async updateUser(id: string, data: UserDTO): Promise<string | Error> {
        try {
            return await this.userRepository.updateUser(id, data)
        } catch (err) {
            if (err instanceof Error) return err
            return new Error("Unexpected error updateUser()")
        }
    }

    async deleteUser(id: string): Promise<string | Error> {
        try {
            return await this.userRepository.deleteUser(id)
        } catch (err) {
            if (err instanceof Error) return err
            return new Error("Unexpected error deleteUser()")
        }
    }
}

export default new UserService(userRepository)
