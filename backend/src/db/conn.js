const mongoose=require('mongoose');
mongoose.connect("mongodb://localhost:27017/faij").then(()=>console.log("connection success")).catch(()=>console.log("fail connection"))