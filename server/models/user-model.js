const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    phone:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    isAdmin:{
        type:Boolean,
        default:false
    }
});

//hashing user's password

userSchema.pre("save", async function(next){
    const user = this;
    if(!user.isModified("password")){ //if user's password is not modified i.e updated by the user
        return next();
    }try{
    const salt = 10;
    const hashedPassword =  await bcrypt.hash(user.password,salt); 
    user.password = hashedPassword;
    next();
    }catch(error){
        console.log(error);
    }
});

//assign a token to a registered user

userSchema.methods.generateToken = async function(){
    try{
       return jwt.sign(
            {
                userId:this._id.toString(),
                email:this.email,
                toAdmin:this.isAdmin,
          },
          process.env.JWT_SECRET_KEY,
          {
            expiresIn:"30d",
          }
        );
    }catch(error){
        console.error(error);
    }
}
;

userSchema.methods.verifyPassword = function async(password){
    return bcrypt.compare(password,this.password);
    console.log(this.password);
}

const Users = new mongoose.model("User",userSchema);

module.exports = Users;