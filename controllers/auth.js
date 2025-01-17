const User = require("../models/User")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const dotenv  = require("dotenv");
dotenv.config();
const JWT_SECRET = "soumen"

exports.register = async (req, res)=>{
    const {email, name, userName,  password} = req.body;
    try{
        console.log(email, name, userName, password)
        const existingUser = await User.findOne({ email });
        if (existingUser) return res.status(400).json({ message: "Email already in use" });
        const hashPassword = await bcrypt.hash(password, 10);
        const newUser = new User({email, name, userName,  password:hashPassword, profilePicture: "https://upload.wikimedia.org/wikipedia/commons/a/ac/Default_pfp.jpg"});
        await newUser.save();
        res.status(201).json({ message: "User registered successfully" });
    }catch(err){
        res.status(500).json({error:err.message})
    }
}

exports.login = async (req,res)=>{
    try{
        const {email, password} = req.body;
        console.log(email, password)
        const user = await User.findOne({email});
        if(!user){
            return res.status(404).json({message:"User not found"})
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch){
            return res.status(400).json({
                success:false,
                message:"Incorrect Password"
            })
        }
        const token = jwt.sign({id:user._id, userName:user.userName}, JWT_SECRET, {expiresIn:"24h"}); 
        console.log(token)
        // user.token = token;
        // colsole.log(user.token)
        res.status(200).json({token, user})
    }catch(err){
        res.status(402).json({error:err.message})
    }
}

exports.findUser = async (req, res)=>{
    try{
        const {userId} = req.body;
        const user =await User.findById(userId)
        
        if(!user){
            return res.status(404).json({message:"User not found"})
        }
        // console.log(user)
        return res.status(200).json(user)
    }catch(err){
        return res.status(402).json({error:err.message})
    }
}