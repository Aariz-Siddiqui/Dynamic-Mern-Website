const Contact = require("../models/contact-model");
const deleteMessage = async(req,res)=>{
    try{
        const id = req.params.id;
        const result = await Contact.deleteOne({_id:id})
        if(result.deletedCount === 0){
            return res.status(404).json({message:"message doesn't exist"}) 
        }
        if(result.deletedCount != 0){
            return res.status(200).json({message:"message deleted successfully"})
        }
    }
    catch(error){
        console.log(error);
        res.status(400).json(error);
    }
}
module.exports = deleteMessage;