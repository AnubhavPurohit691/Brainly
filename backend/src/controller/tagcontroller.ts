import { Response } from "express";
import TagModel from "../model/tagmodel";

export async function gettags(req:Request,res:Response):Promise<void>{
try {
    const gettags = await TagModel.find()
    if(!gettags){
        res.status(403).json({
            message:"no tags found"
        })
        return
    }
    res.status(200).json({
        gettags,
        message:"tags found"
    })
} catch (error) {
    res.status(500).json({
        message:"server error"
    })
}

}