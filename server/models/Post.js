const mongoose=require("mongoose");
const marked=require("marked");
const Schema=mongoose.Schema;

const PostSchema=new Schema({
    title:{
        type:String,
        required:true
    },
    body:{
        type:String,
        required:true
    },
    link:{
        type:String
    },
    createdAt:{
        type:Date,
        default:Date.now
       
    },
    updatedAt:{
        type:Date,
        default:Date.now
    }
});

module.exports=mongoose.model('Post',PostSchema);
