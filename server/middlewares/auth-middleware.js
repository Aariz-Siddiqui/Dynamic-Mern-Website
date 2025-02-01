const express = require("express");
const jwt = require("jsonwebtoken");
const User = require("../models/user-model");
const authMiddleware =async(req,res,next)=>{

                const token = req.header("Authorization");
                if(!token){
                       return res.status(401).json({message:"Token is expired"}); //if the token is expired we need to logout the user automatically
                }
                const jwtToken = token.replace("Bearer ",""); //Removing 'Bearer ' from the token which which we have recevied from front end so we can verify is properly
               try{
                const isVerified = await jwt.verify(jwtToken,process.env.JWT_SECRET_KEY); //verifying the token that we have received from the front end
                console.log(`isVerified value ${JSON.stringify(isVerified)}`);
                const userData = await User.findOne({email:isVerified.email}).select({password:0}); //fetching infomation about the user using the email that we got from our token's payload and using mongodb projection to hide password
                console.log(userData)
                req.user = userData; //adding custom req/properties
                req.token = token;  //adding custom req/properties
                req.userID = userData._id; //adding custom req/properties
                next();
               }catch(error){
                        return res.status(401).json({message:"Invalid Token"});
               }


}
module.exports = authMiddleware;
