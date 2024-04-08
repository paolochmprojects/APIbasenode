import { Client } from "pg";
import db from "../../database/database";

export class UserRepository {
    constructor(private client: Client){}

    async getUsers(){
        const result = await this.client.query("SELECT * FROM users")
        console.log(result)
    }
}

export default new UserRepository(db.getClient())