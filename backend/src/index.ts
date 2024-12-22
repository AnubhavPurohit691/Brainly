import express from "express"
import userrouter from "./router/user"
import { connectDB } from "./db"
import { PORT } from "./config"
import contentrouter from "./router/content"
import { authmiddleware } from "./middleware/authmiddleware"
const app = express()
app.use(express.json())
async function dbcall(){
   await connectDB()
}

dbcall()


app.use("/api/user/v1",userrouter)
app.use("/api/content/v1",contentrouter)
app.get("/",(req,res)=>{
   res.send("checking db")
})


app.listen(PORT,()=>console.log('Port ',process.env.PORT))

