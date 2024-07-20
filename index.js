const express=require("express")
require('./db/config')
const cors=require("cors")
const User=require('./db/User')
const Product=require("./db/Product")
const app=express()
const Jwt=require('jsonwebtoken')
const jwtKey='ecom'
app.use(express.json())
app.use(cors())
app.post("/register",async (req,res)=>{
    let user=new User(req.body)
    let result=await user.save()
    result=result.toObject()
    delete result.password
    Jwt.sign({result},jwtKey,{expiresIn:'2h'},(err,token)=>{
        if(err)
            {
                res.send({result:"something went wrong"})
            }
            res.send({result,auth:token})
    }) 
})
app.post("/login", async (req, res) => {
    const { email, password } = req.body;
    try {
        if (!email || !password) {
            return res.status(400).json({ message: "Email and password are required" });
        }

        // Find user by email
        const user = await User.findOne({ email }).select("-password");

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Check if passwords match (assuming passwords are stored in plain text)
        if (user.password !== password) {
            return res.status(401).json({ message: "Invalid credentials" });
        }

        // If passwords match, send user object without password
        res.json({ _id: user._id, email: user.email, name: user.name }); // Adjust fields as per your user schema

    } catch (error) {
        console.error("Login error:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});

app.get("/products",async (req,res)=>{
    let products=await Product.find()
    if(products.length>0)
        {
            res.send(products)
        }
        else
        {
            res.send("No products found")
        }
})
app.post("/add-product",async (req,res)=>{
    let product=new Product(req.body)
    let result=await product.save()
    res.send(result)
})
app.get('/search/:key',async (req,res)=>{
    let result=await Product.find({
        "$or":[
            { name : {$regex:req.params.key}},
            { price:{$regex:req.params.key}},
            { category:{$regex:req.params.key}},
            { company:{$regex:req.params.key}}
        ]
    })
    res.send(result)

})
app.delete('/product/:id',async (req,res)=>{
    const result=await Product.deleteOne({_id:req.params.id})
    res.send(result)
})
app.get("/product/:id",async (req,res)=>{
    let resp=await Product.findOne({_id:req.params.id})
    if(resp)
        {
            res.send(resp)
        }
        else
        {
            res.send("No record found")
        }
})
app.put('/product/:id',async (req,res)=>{
    let result = await Product.updateOne(
        {
            _id:req.params.id
        },
        {
            $set:req.body
        }
    )
    res.send(result)
})

// function verifyToken(req,res,next){
//     let token=req.headers['authorization']
//     if(token)
//         {
//             token=token.split(' ')[1]
//             Jwt.verify(token,jwtKey,(err,valid)=>{
//                 if(err)
//                     {
//                         res.status(401).send({result:"Please provide valid token"})
//                     }
//                     else
//                     {
//                         next()
//                     }
//             })
//         }
//         else
//         {
//             res.status(403).send({result:"Please add token with header"})
//         }

// }
app.listen(9000,()=>{
    console.log("Server is running on port 9000")
})

