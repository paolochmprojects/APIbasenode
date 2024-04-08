import { Client } from "pg";
import db from "../../database/database";

export class UserRepository {
    constructor(private client: Client){}

    async getUsers<T>():Promise<T[]>{
        const result = await this.client.query("SELECT * FROM users")
        return result.rows as T[]
    }

    async getUserById<T>(id:string):Promise<null| T>{
        const result = await this.client.query("SELECT * FROM users WHERE id = $1", [id])
        if (result.rowCount === 0) return null
        return result.rows[0] as T
    }


}

export default new UserRepository(db.getClient())