import { Request, Response } from "express";
import UserModel from "../model/usermodel";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import { JWT_PASSWORD } from "../config";


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

const token = jwt.sign(user._id,JWT_PASSWORD)
    res.json({token,user:{...user.toObject(),password:undefined}})
}


export const Signin=async (req:Request,res:Response):Promise<void>=>{
    const {email,password}=req.body

    const existinguser = await UserModel.findOne({
        email:email,
    })

    if(!existinguser){
        res.status(403).json({message:"user not found"})
        return;
    }


const token = jwt.sign(existinguser._id,JWT_PASSWORD)
    res.json({token,user:{...existinguser.toObject(),password:undefined}})
}
