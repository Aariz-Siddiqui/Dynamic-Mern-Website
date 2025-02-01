const { json } = require("express");
const Service = require("../models/service-model");
const serviceController = async(req,res)=>{
        try{
            const response = await Service.find();
            if(!response){
                res.status(404).send("error while fetching the data");
                return;
            }

            res.status(200).json(response);
        }catch(error){
            console.log("error from the service controller" + error);
        }
}
module.exports = serviceController;