import express from "express"
import morgan from "morgan"
import settings from "./config/settings"
import userRouter from "./users/user.router"

const app = express()

app.use(express.json())
app.use(morgan("dev"))

app.use("/users", userRouter)

app.listen(settings.PORT, ()=>{
    console.log(`Server runing in -> http://localhost:${settings.PORT}`)
})