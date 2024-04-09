import express from "express"
import morgan from "morgan"
import settings from "./config/settings"
import database from "./database/database"
import userRouter from "./users/user.router"

const app = express()

app.use(express.json())
app.use(morgan("dev"))

app.use("/users", userRouter)

app.listen(settings.PORT, ()=>{
    database.connect()
    console.log(`Server runing in -> http://localhost:${settings.PORT}`)
})