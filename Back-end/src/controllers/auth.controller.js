import { generateToken } from "../lib/utils.js";
import User from "../models/user.model.js";
import bcrypt from "bcryptjs";


export const logout =(req,res)=>{

}

export const login = (req,res)=>{
    
}

export const signup = async (req,res)=>{
    const {fullName,email,password}=req.body;

    if(!fullName || !email || !password){
        return res.status(400).json({message:"all fields are required"})
    }

    if(password.length<6){
        return res.status(400).json({message:"password must be at least 6 characters"})
    }

    const userExists = await User.findOne({email})
    if(userExists){
        return res.status(400).json({message:"user already exists"})
    }

    const salt= await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password,salt);

    const newUser = new User({
        fullName,
        email,
        password:hashedPassword
    })
    
    if(newUser){
    generateToken(newUser._id,res)
    await newUser.save()

    return res.status(201).json({message:"user created"})
    }else{
        return res.status(400).json({message:"user not created"})
    }

    res.status(201).json({message:"user created"
    })
}