const mongoose=require('mongoose');
const productSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true,
        trim:true,
    },
    price:{
        type:String,
        required:true,
        trim:true,
        },
        category:{
            type:String,
            required:true,
            trim:true
        },
        company:{
            type:String,
            required:true,
            trim:true
        },
        sid:{
            type:String,
            required:true
        }
    
})
const Product=new mongoose.model("product",productSchema);
module.exports=Product
