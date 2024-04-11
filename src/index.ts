import express, { Request, Response } from "express"
import morgan from "morgan"
import settings from "./config/settings"
import userRouter from "./users/user.router"

const app = express()

app.use(express.json())
app.use(morgan("dev"))

app.use("/users", userRouter)

app.all("/*",(_req: Request, res: Response)=>{
    return res.status(404).json({message: "Not found"})
}) 

app.listen(settings.PORT, ()=>{
    console.log(`Server runing in -> http://localhost:${settings.PORT}`)
})