import mongoose, { Schema } from "mongoose";

const contentmodel=new Schema({
    link:{
        type:String,
        required:true,
    },
    type:{
        type:String,
        enum:['document' , 'tweet' , 'youtube' , 'link'],
        default:"document",
        required:true
    },
    title:{
        type:String,
        required:true
    },
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"UserModel",
        required:true
    },
    tags:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"TagModel"

        }
    ]
})

const ContentModel=mongoose.model("ContentModel",contentmodel)
export default ContentModel