import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken"
import dotenv from "dotenv"
dotenv.config()

export interface Authrequest extends Request{
    userId:string
}

export function authmiddleware(req:Authrequest,res:Response,next:NextFunction):void{

    try {
        const token = String(req.header("Authorization")?.split(' ')[1])

        if (!token){
            res.status(403).json({
                message:"No token provided"
            })
            return
        }
        const decoded = jwt.verify(token,process.env.JWT_SECRET||"secret") as JwtPayload

        req.userId=decoded.id
        next()
        
    } catch (error) {
        res.status(411).json({
            message:"server error"
        })
    }

}
