const Contact = require("../models/contact-model");
const getAllContacts = async (req,res)=>{
        try{
            const contacts = await Contact.find();
            if(!contacts || contacts.length === 0){
                return res.status(404).json({message:"no message found"})
            }
            return res.status(200).json(contacts);
        }catch(error){
            console.log("error from contact controller of admin route" + error);
        }
}
module.exports = getAllContacts;