import { Request, Response } from "express";
import {v4 as uuid} from "uuid"
import { Authrequest } from "../middleware/authmiddleware";
import LinkModel from "../model/linkmodel";
import ContentModel from "../model/contentmodel";
export async function generatelink(req:Authrequest,res:Response){
    const userId = req.userId
try {
    const uniqueId = uuid()
    const existinguuid = await LinkModel.findOne({
    sharelink:uniqueId        
    })
    if(existinguuid){
        res.status(500).json({
            message:"uuid already existed"
        })
    }
    const createnewuuid=await LinkModel.create({
        sharelink:uniqueId,
        userId:userId
    })

    res.status(200).json({
        message:"link generated ",
        createnewuuid
    })
} catch (error) {
    res.status(500).json({
        message:"server issue"
    })
}

}

export async function sharelink(req:Authrequest,res:Response){
    const sharelink=req.body
try {
    const existinguuid=await LinkModel.findOne({
        sharelink
    })
    if(!existinguuid){
        res.status(403).json({
            message:"sharelink not found"
        })
    }
    const getcontent = await ContentModel.findOne({
        userId:existinguuid?.userId
    })

    if(!getcontent){
        res.status(403).json({
            message:"no content found"
        })
    }
    res.status(200).json({
        message:"content fetched",
        content:getcontent
    })


} catch (error) {
    res.status(500).json({
        message:"internal server error"
    })
}
}