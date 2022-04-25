// Controller handling functions to get admins from DB and to Demote an Admin to user by updating role

const signUpCollection = require('../model/users');

module.exports.getAdmins = (req,res,next) => {
    signUpCollection.find({"roles":[5555]})
    .then((adminsList) => {
        res.send(adminsList);
    });
}

module.exports.demoteAdmin = (req,res,next) => {
    var id = req.body.adminId;
    console.log(id);
    signUpCollection.findByIdAndUpdate({"_id":id},{$set:{
        "roles" : [3333]
        }
    })
    .then(() =>{
        res.status(200).send({msg:"Admin demoted to User successfully!"});
        
    })
    .catch((err) => {
        console.log(err);
        res.send({error:err});
    });
}
