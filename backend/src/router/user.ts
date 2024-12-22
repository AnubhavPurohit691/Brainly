import { Router } from "express";
import { Signin, Signup } from "../controller/usercontroller";
const userrouter = Router()

userrouter.post("/signup",Signup)
userrouter.post("/signup",Signin)

export default userrouter