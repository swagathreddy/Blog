const mongoose=require("mongoose");
const marked=require("marked");
const Schema=mongoose.Schema;

function formatDate(date) {
    const options = { year: 'numeric', month: 'numeric', day: 'numeric', timeZone: 'Asia/Kolkata' };
    return date.toLocaleDateString('en-IN', options);
}
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