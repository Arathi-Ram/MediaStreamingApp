const mongoose = require('mongoose');
const User = require('../model/users');
const jwt = require('jsonwebtoken');
module.exports.register = (req,res,next)=>{
    // console.log(req.body);
    let def_role = "User";
    let newUser = new User({
        name:req.body.name,
        email:req.body.email,
        mobile:req.body.mobile,
        password: req.body.password,
        role: "User"
    });
    User.addUser(newUser,(err,user)=>{
        if(!err){
            res.status(200).send({success:true,msg:"SignUp success"});
        }
        else{
           if(err.code == 11000){
               res.status(422).send({error:"E-mail address already registered."});
           }
           else{
               console.log(err);
            res.status(422).send({error:err});
           }
        }

    });
}


module.exports.login = (req,res,next) => {
    console.log("Inside login backend");
    console.log(req.body);
    let rootUser = {
        email:"rootuser@gmail.com",
        password:"rootU@12",
        role:'Root User'
    }

    var userDetails = req.body;
    if(userDetails.email === rootUser.email && userDetails.password === rootUser.password){
        let accessToken = jwt.sign(
            {
                userInfo: {
                    "email":rootUser.email,
                    // "password":user.password,
                    "role":rootUser.role
                }
            },
            "RoOtUsErKeYz"
        );
        console.log("RootUser Login");
        res.status(200).send({msg:"Root User login success!",role:"Root User",token:accessToken});
    }
    else{
        User.findOne({"email":userDetails.email})
        .then((user)=>{
            if(!user){
                res.status(404).send({success:"false",msg:"User not found."})
            }
            
            else{
                let match = User.checkPassword(userDetails.password,user.password);
                if(match){
                    //create JWT s
                    const accessToken = jwt.sign(
                        {
                            userInfo: {
                                "email":user.email,
                                // "password":user.password,
                                "role":user.role
                            }
                        },
                        "sEcRetsKeyz"
                    );
                    res.status(200).send({success:true,msg:"User Login success",userLogged:user, role:user.role,token:accessToken})
                }
            }
        })
        .catch((err)=>{
            console.log(err);
            res.status(422).send({error:err})
        });
    }
        
    }