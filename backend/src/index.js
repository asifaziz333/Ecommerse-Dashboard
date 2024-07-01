const express=require("express");
const cors=require("cors");
const app=express();
const path=require('path');
const multer=require('multer');
const Jwt=require('jsonwebtoken');
const jwtkey="nature";
app.use(express.json())
app.use(cors())
app.use(express.urlencoded())
const port=process.env.PORT || 4000;
require("./db/conn")
const Product=require('./model/product');
const User=require('./model/user');
// console.log(Jwt);
// console.log(jwtkey);

const storage=multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,path.join(__dirname,"./public/images"))
        },
        filename:(req,file,cb)=>{
            const name=Date.now()+'-'+file.originalname;
            cb(null,name);
        }
});
const upload=multer({storage:storage});

const verifyToken=(req,res,next)=>{
    let token=req.headers['authorization'];
    if(token){
        token=token.split(' ')[1];
        Jwt.verify(token,jwtkey,(err,decoded)=>{
            if(err){
                res.status(401).send("Please provide valid token");
    }else{
        next();
    }
})
}else{
    res.status(403).send("Please provide in token in headers..")
}
}

app.post("/register",upload.single('image'),async(req,res)=>{
    
    try {
        const {name,email,password} = req.body;
        console.log(req.file);
        const existingUser = await User.findOne({ email });
        console.log(existingUser);
        if (existingUser) {
          res.status(200).send({ exists: true ,message:"user already exists"});
        }
        const user=new User({
            name,
            email,
            password,
            image:'images/'+req.file.filename
        });
        let result=await user.save();
        console.log(result);
        result=result.toObject();
        delete result.password;
        res.send(result);
      } catch (error) {
        res.status(500).send({ message: 'Internal server error' });
      }

    // const user=new User({
    //     name,
    //     email,
    //     password,
    //     image:'image/'+req.file.filename
    // });
    // let result=await user.save();
    // result=result.toObject();
    // delete result.password;
    // res.send(result);
})

app.post("/login",async(req,res)=>{
    const {email,password}=req.body;
    if(!email || !password){
        res.send("plz fill all field");
    }else{
        console.log("in login");
    const user =await User.findOne(req.body).select("-password");
    console.log(user);
    if(user){
        Jwt.sign({user},jwtkey,{expiresIn:"2h"},(err,token)=>{
            if(err){
                res.send({res:"some thing went wrong"})
            }
            console.log("before");
            console.log(token);
            res.send({user, auth:token})
        })
   // res.send(user);
    }else{
        res.send({message:"No user found"})
    }
}
})

app.post("/addproduct",verifyToken,async(req,res)=>{
    console.log(req.body);
    const product=new Product(req.body);
    let result=await product.save();
    // result=result.toObject();
    // delete result.password;
    res.send(result);
})

app.get("/product",verifyToken,async(req,res)=>{
    const product=await Product.find();
    res.send(product);
})
app.get("/product/:id",verifyToken,async(req,res)=>{
    const sid=req.params.id;
    console.log(sid);
    const product=await Product.find({sid});
    console.log(product);
    res.send(product);
})

app.get("/userproduct/:id",verifyToken,async(req,res)=>{
    const sid=req.params.id;
    const product=await Product.find({_id:sid});
    console.log(product);
    res.send(product);

})

app.put("/updateproduct/:id",verifyToken,async(req,res)=>{
    const sid=req.params.id;
    console.log(sid);
    const result= await Product.updateOne(
        {_id:sid},
        {$set:req.body}
    )
    console.log(result);
    res.send(result)
})

app.delete("/product/:sid",verifyToken,async(req,res)=>{
    const sid=req.params.sid;
    const product=await Product.deleteOne({_id:sid});
    res.send(product);
})

app.get("/search/:key/:id",verifyToken,async(req,res)=>{
const {key,id}=req.params;
console.log(key,id);
const result=await Product.find({
    $or:[
        {
     name: { $regex: `^${key}`, $options: 'i' }
        },
    {
        company:{ $regex: `^${key}`, $options: 'i' }
    },
    {
        category:{ $regex: `^${key}`, $options: 'i' }
    },
    {
        price:{ $regex: `^${key}`, $options: 'i' }
    }
    ]
    ,
    sid:id
    // "$or":[
    //     {
    // company:{$regex:/^key/}
    //     }
    // ]
})
res.send(result);
})


app.listen(port,()=>{
    console.log("running");
})
