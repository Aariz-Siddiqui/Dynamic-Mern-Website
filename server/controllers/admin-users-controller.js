const User = require("../models/user-model");
const getAllUsers =async(req,res)=>{
    try{
        const Users = await User.find({},{password:0});
        if(!Users || Users.length === 0){
            return res.status(404).json({message:"No users found"});
        }
        return res.status(200).json(Users);
    }catch(error){
        console.log("error from User controller of admin route" + error);
    }
}

const getSingleUser = async (req,res)=>{
try{
    const id = req.params.id;
    const singleUser = await User.findOne({_id:id},{password:0});
    return res.status(200).json(singleUser);
}catch(error){
    console.log(error)
    return res.status(400).json({message:error});
}
}

const updateUserById = async(req,res)=>{
    try{
        const id = req.params.id;
        const updateUser = req.body;
        console.log(updateUser);
        const updatedData = await User.updateOne({_id:id},{$set:updateUser})
        console.log(updatedData);
        return res.status(200).json(updatedData);
    }catch(error){
        return res.status(400).json({message:error});
    }
}

module.exports = {getAllUsers, getSingleUser, updateUserById}