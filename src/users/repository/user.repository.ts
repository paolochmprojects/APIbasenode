import { Client } from "pg";
import db from "../../database/database";
import { UserDTO } from "../user.controller";

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

    async createUser(data:UserDTO){
        const result = await this.client.query(
            "INSERT INTO users (name, email, role, rate) VALUES ($1, $2, $3, $4) RETURNING id",
             [data.name, data.email, data.role, String(data.rate)])
        return result.rows[0]["id"]
    }
}

export default new UserRepository(db.getClient())