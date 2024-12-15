import express from "express"
import dotenv from "dotenv"
import userrouter from "./router/user"
const app = express()
dotenv.config()

app.use("api/user/v1",userrouter)
app.listen(process.env.PORT,()=>console.log('Port ',process.env.PORT))