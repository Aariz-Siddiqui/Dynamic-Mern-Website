const express = require("express");
const Users = require("../models/user-model");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const { verify } = require("jsonwebtoken");

const home = async(req,res) => {
    try {
        return res.status(200).send("Hello from the controllers side");
    } catch (error) {
        console.log(error)
    }
};

const register = async (req,res)=>{
    try{
        const {name,email,phone,password} = req.body;

        const userExist = await Users.findOne({email:email});
        if(userExist){
            console.log("user already exist");
            return res.status(409).json({message:"email already exists"});
        }
        const userCreated = await Users.create({name,
            email,
            phone,
            password
        });
        return res.status(201).json({
            message:"registration successful",
            token: await userCreated.generateToken(),
            userId: userCreated._id.toString(),
        });
        
    
    }catch(error){
        console.log(error);
    }
}

// login  

const login = async (req,res)=>{
    try{
        const {email,password} = req.body;
        const userExist = await Users.findOne({email});
        if(!userExist){
            return res.status(400).json({"message":"Inavlid Credentials"});
        }

//verify password using brypt.compare

            const User = await userExist.verifyPassword(password);
            console.log(User);
            if(User){
                return res.status(201).json({
                    message:"login successful",
                    token: await userExist.generateToken(),
                    userId: userExist._id.toString(),
                });
            }else{
                return res.status(400).json({"message":"Invalid password"});
            }

        
    }catch(error){
        console.log(error)
    }
}

//verify user token

const user =async (req,res)=>{
    try{
        const userData = req.user;
        res.status(201).json(userData);

    }catch(error){
        console.log("error at user controller",error);
    }
}

module.exports = {home,register,login,user};
