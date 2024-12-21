import express from "express"
import userrouter from "./router/user"
import { connectDB } from "./db"
import { PORT } from "./config"
const app = express()
app.use(express.json())
async function dbcall(){
   await connectDB()
}

dbcall()


app.use("/api/user/v1",userrouter)
app.use("/api/content/v1",contentrouter)
app.get("/",(req,res)=>{
   res.send("helloworld")
})


app.listen(PORT,()=>console.log('Port ',process.env.PORT))

