const adminMiddleware =async (req,res,next)=>{
    try{
        const isAdmin = req.user.isAdmin;
        if(!isAdmin){
            return res.status(403).json({message:"Invalid Credentials , The user is not an admin"})
        }
        next();
    }catch(error){
        console.log("Error from Admin Middleware" + error)
        next(error);
    }
}
module.exports = adminMiddleware;