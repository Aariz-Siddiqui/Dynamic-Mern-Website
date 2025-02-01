const z = require("zod");
const signupSchema = z.object({
    name: z
    .string({required_error:"Name is required"})
    .trim()
    .min(3,{message:"Name must be atleast of 3 charachters"})
    .max(255,{message:"Name should be less than 255 charachters"}),
    email:z
    .string({required_error:"Email is required"})
    .email({message:"invalid email address"})
    .trim()
    .min(3,{message:"email should be greater than 3 charachters"})
    .max(255,{message:"email should be less then 255 characters"}),
    phone:z
    .string({required_error:"phone is required"})
    .trim()
    .min(10,{message:"phone number should be greater 9 digits"})
    .max(15,{message:"phone number should be less than 15 digits"}),
    password:z
    .string({required_error:"Password is required"})
    .trim()
    .min(4,{message:"password should be greater then 4 characters"})
    .max(15,{message:"password should be less then 15 charachters"}),
})

const signinSchema = z.object({
    email:z
    .string({required_error:"Email is required"})
    .email({message:"invalid email address"})
    .trim()
    .min(3,{message:"email should be greater than 3 charachters"})
    .max(255,{message:"email should be less then 255 characters"}),
    password:z
    .string({required_error:"Password is required"})
    .trim()
    .min(4,{message:"password should be greater then 4 characters"})
    .max(15,{message:"password should be less then 15 charachters"})
})
module.exports = {signupSchema,signinSchema}; //Now we will pass these value i.e.signupSchema and signinSchema inta Validate(schema) fn as parameters