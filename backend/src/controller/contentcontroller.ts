import { Request, Response } from "express"
import ContentModel from "../model/contentmodel"
import TagModel from "../model/tagmodel"

export const createcontent=async(req:Request,res:Response)=>{
    const responsebody=req.body

    let existingtag=await TagModel.findOne({
        title:responsebody.tags
    })
    if(!existingtag){
        existingtag=await TagModel.create({
            title:responsebody.tags
        })
    }

    await ContentModel.create({
        link:responsebody.link,
        title:responsebody.title,
        tags:responsebody.tags,
        type:responsebody.type
    })
}