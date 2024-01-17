const express=require("express");
const router=express.Router();
const Post=require("../models/Post");
const marked=require("marked");

router.get('',async(req,res)=>{
    
    try{
    const locals={
        title:"InspireNest",
        desc:"My first Blog website with js"
    }
    let perpage=5;
    let page=req.query.page || 1;
    const data= await Post.aggregate([{$sort:{createdAt:-1}}])
    .skip(perpage*page-perpage)
    .limit(perpage)
    .exec();

    const count=await Post.countDocuments();
    const nextpage=parseInt(page)+1;
    const hasnextpage=nextpage<= Math.ceil(count/perpage);

    res.render("index",{
        locals,
        data,
        current:page,
        nextpage:hasnextpage?nextpage:null});

    }catch(error){
      console.log(error)
    }
    
});
router.get("/post/:id",async(req,res)=>{
    
    try{
        
        let slug=req.params.id;
        const data = await Post.findById({_id:slug});
        const locals={
            title:data.title,
        }
        
        res.render('post',{locals,data});

    }catch(error){
        console.log(error);
    }
});




// function insertdata(){
//     Post.insertMany([
//     {
//         title:"Building a blog",
//         body:"this is body" 
//     },
//     {
//         title:"Building a blog 1",
//         body:"this is body" 
//     },
//     {
//         title:"Building a blog 2",
//         body:"this is body" 
//     }
//   ])
// }
// insertdata();



router.get('/about',(req,res)=>{
    res.render("about");
});

router.get('/contact',(req,res)=>{
    res.render("contact");
});
module.exports=router;