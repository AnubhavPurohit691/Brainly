import mongoose, { Schema } from "mongoose";

const tagmodel= new Schema({
    title:{
        type:String,
        require:true,
        unique:true
    }
},{
    timestamps:true
})

const TagModel=mongoose.model("TagModel",tagmodel)
export default TagModel