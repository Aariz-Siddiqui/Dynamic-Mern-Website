const Service = require("../models/service-model");
const getAllServices =async (req,res )=>{
    try{
        const response = await Service.find();
        if(response){
            return res.status(201).json(response);
        }
        return res.status(201).json({"message":"No services found"});
    }catch(error){
        console.log(error);
       return res.status(400).json(error)
    }
}
const deleteService = async(req,res)=>{
    try{
        const id = req.params.id;
        const response = await Service.deleteOne({_id:id})
        if (response.deletedCount != 0){
            return res.status(201).json({"message":"Service Deleted successfully"})
        }
        return res.status(200).json({"message":"Service doesnt exist"});
    }catch(error){
        console.log(error);
        return res.status(400).json({"message":error});
    }
}
module.exports = {getAllServices,deleteService};