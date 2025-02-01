const express = require("express");
const mongoose = require("mongoose");
const Contact = require("../models/contact-model");

const contactController = async(req,res) =>{
    try{
    const {username,email,message} = req.body;

    const newlead = await Contact.create({
        username,
        email,
        message
    })
    res.status(200).send("message has been sent to database successfully");
}catch(error){
    console.log(error);
    res.status(404).send("something wrong on the contact-controller or contact-model");
}
};

module.exports = contactController;