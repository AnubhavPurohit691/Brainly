import { Router } from "express";
import { Signup } from "../controller/usercontroller";
const userrouter = Router()

userrouter.post("/",Signup)

export default userrouter