const User = require("../models/user-model")
const deleteUser = async(req,res) =>{
        try{
            const id = req.params.id;
            console.log(id)
            const result = await User.deleteOne({_id:id});

            if (result.deletedCount === 0) {
                return res.status(404).json({ message: "User not found" });
              }
            if (result.deletedCount != 0) {
                return res.status(200).json({ message: "User deleted successfully" });
              }
        }catch(error){
            console.log("backend delete user error" + error);
            return res.status(404).json({message:error});
        }
}

module.exports = deleteUser;