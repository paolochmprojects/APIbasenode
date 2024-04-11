import { type Pool } from "pg";
import db from "../../database/database";
import { UserDTO } from "../dto/user.dto";


export class UserRepository {
    constructor(private client: Pool) { }

    async getUsers<T>(): Promise<T[]> {
        const result = await this.client.query("SELECT * FROM users")
        return result.rows as T[]
    }

    async getUserById<T>(id: string): Promise<T> {
        const result = await this.client.query("SELECT * FROM users WHERE id = $1", [id])
        if (result.rowCount === 0) throw new Error("User not found")
        return result.rows[0] as T
    }

    async createUser(data: UserDTO): Promise<string> {
        const result = await this.client.query(
            "INSERT INTO users (name, email, role, rate) VALUES ($1, $2, $3, $4) RETURNING id",
            [data.name, data.email, data.role, String(data.rate)])
        return result.rows[0]["id"]
    }

    async updateUser(id: string, data: UserDTO): Promise<string> {
        const result = await this.client.query(
            "UPDATE users SET name = $1, email = $2, role = $3, rate = $4 WHERE id = $5 RETURNING id",
            [data.name, data.email, data.role, String(data.rate), id]
        )
        if (result.rowCount === 0) {
            throw new Error("User not found")
        }
        return result.rows[0]["id"]
    }

    async deleteUser(id: string): Promise<string> {
        const result = await this.client.query(
            "DELETE FROM users WHERE id = $1 RETURNING id",
            [id]
        )
        if (result.rowCount === 0) {
            throw new Error("User not found for delete")
        }
        return result.rows[0]["id"]
    }
}

export default new UserRepository(db.getClient())