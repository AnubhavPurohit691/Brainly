import  mongoose, { Schema } from "mongoose";
const user = new Schema({
    email:{
        type:String,
        require:true,
        unique:true
    },
    password:{
        type:String,
        require:true
    }
},{timestamps:true})

const UserModel = mongoose.model("UserModel",user)

export default UserModel