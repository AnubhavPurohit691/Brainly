import { Request, Response } from "express";
import UserModel from "../model/usermodel";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import { JWT_PASSWORD } from "../config";
import { signschema } from "../zodschema";

// signup controller
export const Signup = async (req: Request, res: Response): Promise<void> => {
    const { email, password } = req.body

    try {
        const vadiateschema=signschema.safeParse({email,password})
        if (!vadiateschema) {
            res.status(411).json({
                message:"schema invalidate"
            })
        }
        const existinguser = await UserModel.findOne({
            email: email,
        })

        if (existinguser) {
            res.status(403).json({ message: "user already exist" })
            return;
        }


        const hashedpassword = await bcrypt.hash(password, 10)
        const user = await UserModel.create({
            email: email,
            password: hashedpassword
        })

        const token = jwt.sign({id:user._id}, JWT_PASSWORD)
        res.json({ token, user: { ...user.toObject(), password: undefined } })
        
    } catch (error) {
        res.status(500).json({
            message: "Internal Server Error",
          });
    }


}



// signin controller


export const Signin = async (req: Request, res: Response): Promise<void> => {
    const { email, password } = req.body

    try {

        const validateuser= signschema.safeParse({email,password})
        if (!validateuser) {
            res.status(411).json({
                message:"validation error"
            })
        }

        const existinguser = await UserModel.findOne({
            email: email,
        })
    
        if (!existinguser) {
            res.status(403).json({ message: "user not found" })
            return;
        }

        
            if (!existinguser.password) {
              res.status(403).json({
                message: "Invalid Password",
              });
              return;
            }


        const validateuserfromdb= await bcrypt.compare(password,existinguser.password)

        if(!validateuserfromdb){
             res.status(403).json({
                message:"validation error"
             })
            }
    
    
        const token = jwt.sign({id:existinguser._id}, JWT_PASSWORD)
        res.json({ token, user: { ...existinguser.toObject(), password: undefined } })   
        
        
    } catch (error) {
        res.status(500).json({
            message:'Internal server error'
        })
    }}
