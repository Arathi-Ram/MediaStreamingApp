const UserCollection = require('../model/users');


module.exports.getUser = (req,res,next) => {
    var id = req.params.id;

    UserCollection.findById(id)
    .then((user) => {
        res.send(user)
    })
    .catch((err) => {
        res.send(err);
    })
}

module.exports.getUsers = (req,res,next) => {
    UserCollection.find({"roles":[3333]})
    .then((usersList)=>{
        res.send(usersList)
    });
}

module.exports.promoteUser = (req,res,next) => {
    var id = req.body.userId;
    console.log(id);
    UserCollection.findByIdAndUpdate({"_id":id},{$set:{
        "roles":[5555]
      }})
    .then(()=>{
        res.status(200).send({msg:"User promoted to Admin successfully"})
    })
    .catch((err) => {
        res.send({error:err})
    })
}

module.exports.getRole =(req,res) => {
    var id = req.params.id;
    UserCollection.findById(id)
    .then((userDetails) => {
        res.send(userDetails.roles);
    })
}