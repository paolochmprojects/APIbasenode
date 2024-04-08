import { Client } from "pg"
import settings from "../config/settings"

class Database {
    client: Client
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
}


export default new Database(settings.DB_URL)