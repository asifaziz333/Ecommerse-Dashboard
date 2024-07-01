const mongoose=require('mongoose');
const userSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true,
        trim:true,
    },
    email:{
        type:String,
        required:true,
        trim:true,
        // unique:[true,"duplicate email"]
        },
        password:{
            type:String,
            required:true,
            trim:true
        },
    image:{
        type:String,
        require:true
    }
    
})
const User=new mongoose.model("user",userSchema);
module.exports=User
