const mongoose=require('mongoose');

const schema=new mongoose.schema({
    title:{
        type:String,
        required:true,
        maxlength:50
    },
    body:{
         type:string,
         maxlenngth:10000,
          required:true
    }
})

const Post=mongoose.model("Post",schema);
module.exports=Post;