import { Request, Response } from "express";
import UserModel from "../model/usermodel";
import bcrypt from "bcrypt"


export const Signup= async (req:Request,res:Response):Promise<void>=>{
    const {email,password}=req.body

    const existinguser = await UserModel.findOne({
        email:email,
    })

    if(existinguser){
        res.status(403).json({message:"user already exist"})
        return;
    }


    const hashedpassword=bcrypt.hash(password,10)
    const user= await UserModel.create({
        email:email,
        password:hashedpassword
    })

    

}
