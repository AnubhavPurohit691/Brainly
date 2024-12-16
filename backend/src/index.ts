import express from "express"
import dotenv from "dotenv"
import userrouter from "./router/user"
import { connectDB } from "./db"
const app = express()
app.use(express.json())
dotenv.config()
async function dbcall(){
   await connectDB()
}

dbcall()


app.use("/api/user/v1",userrouter)
app.get("/",(req,res)=>{
   res.send("helloworld")
})



app.listen(process.env.PORT,()=>console.log('Port ',process.env.PORT))

