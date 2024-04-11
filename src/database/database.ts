import { Pool } from "pg"
import settings from "../config/settings"

class Database {
    private client: Pool

    // postgres://user:password@localhost:5432/dbname  --> connectionString

    constructor(connectionString: string){
        this.client = new Pool({connectionString})
    }
    getClient():Pool{
        return this.client
    }
}

export default new Database(settings.DB_URL)
