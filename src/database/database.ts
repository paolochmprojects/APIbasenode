import { Client } from "pg"
import settings from "../config/settings"

class Database {
    private client: Client

    // postgres://user:password@localhost:5432/dbname  --> connectionString

    constructor(connectionString: string){
        this.client = new Client({connectionString})
    }

    async connect(){
        await this.client.connect()
        console.log("La base de datos se conecto correctamente.")
    }

    async disconnect(){
        await this.client.end()
        console.log("La base de datos se desconecto correctamente.")
    }

    getClient():Client{
        return this.client
    }
}

export default new Database(settings.DB_URL)
