import { Router } from "express";
import { Signup } from "../controller/usercontroller";
const userrouter = Router()

userrouter.get("/signup",Signup)

export default userrouter