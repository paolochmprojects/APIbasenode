import { Client } from "pg";
import db from "../../database/database";

export class UserRepository {
    constructor(private client: Client){}

    async getUsers<T>():Promise<T[]>{
        const result = await this.client.query("SELECT * FROM users")
        return result.rows as T[]
    }

    async getUserById(id:string):Promise<null>{
        const result = await this.client.query("SELECT * FROM users WHERE id = 1$", [id])
        console.log(result)
        return null
    }


}

export default new UserRepository(db.getClient())