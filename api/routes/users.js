const router=require("express").Router();
const User=require("../models/User")

router.post("/register",async(req,res)=>{
    try{
        const newUser=new User({
            username:req.body.username,
            email:req.body.email,
            password:req.body.password,
            amount:req.body.amount,
            phone:req.body.phone

        })
        const user=await newUser.save();
        res.status(200).json(user);
    }
    catch(err){
        res.status(400).json(err);
    }
})


//get user
router.get("/:id",async (req,res)=>{
    try{
        const user=await User.findById(req.params.id)
        const {password,...others}=user._doc;
        res.status(200).json(others);
    }
    catch(err){
        res.status(500).json(err)
    }
})

//get all users
router.get("/",async (req,res)=>{
    try{
            let users;
            users = await User.find();
        
        res.status(200).json(users)
    }
    catch(err){
        res.status(500).json(err)
    }
})

module.exports=router;
