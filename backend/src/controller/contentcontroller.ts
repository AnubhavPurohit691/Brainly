import { Request, Response } from "express"
import ContentModel from "../model/contentmodel"
import TagModel from "../model/tagmodel"
import { contentschema } from "../zodschema"
import { Authrequest } from "../middleware/authmiddleware"

export const createcontent=async(req:Authrequest,res:Response)=>{
    const {title,type,tags,link}=req.body
    const userId = req.userId

    try {
        const validatecontent=contentschema.safeParse({title,link,type,tags,userId})
        if(!validatecontent){
            res.status(403).json({
                message:"validation error"
            })
            return
        }
        let existingtags=await TagModel.findOne({
            tags
        })
        if(!existingtags){
           existingtags= await TagModel.create({
                tags
            })
        }
        const newcontent = new ContentModel({
            tags:existingtags.tags,
            type,
            userId,
            link,
            title
        })

    res.status(200).json({
        message:"content has been created",content:newcontent
    })       

    } catch (error) {
        res.status(500).json({
            message:"server error"
        })
    }
    
}

export async  function getcontent(req:Authrequest,res:Response){
    const userId = req.userId
try {
    const getcontent=await ContentModel.findOne({
        userId
    })
    if(!getcontent){
        res.status(404).json({
            message:"content not exists in db"
        })
    }
    res.status(200).json({
        message:"done",
        getcontent
    })
} catch (error) {
    res.status(500).json({
        message:"server error"
    })
}
}