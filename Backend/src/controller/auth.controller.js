const mongoose = require('mongoose');
const User = require('../model/users');
const jwt = require('jsonwebtoken');
require('dotenv').config();

// Controller handling the registration of users:

module.exports.register = (req,res,next)=>{
    // console.log(req.body);
    // let def_roles = "User";
    let newUser = new User({
        name:req.body.name,
        email:req.body.email,
        // mobile:req.body.mobile,
        password: req.body.password,
        roles: [3333]
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
        _id: "62625d0c02f586e8beaee2fe",
        email:"rootuser@gmail.com",
        password:"rootU@12",
        roles: [1111]
    }

    var userDetails = req.body;
    if(userDetails.email === rootUser.email && userDetails.password === rootUser.password){
        let accessToken = jwt.sign(
            {
                userInfo: {
                    "email":rootUser.email,
                    "roles":rootUser.roles
                }
            },
            process.env.ACCESS_TOKEN_SECRET
        );
        console.log("RootUser Login");
        res.status(200).send({msg:"Root User login success!",userLogged:rootUser,roles:rootUser.roles,token:accessToken});
    }
    else{
        User.findOne({"email":userDetails.email})
        .then((user)=>{
            if(!user){
                res.status(404).send({success:"false",error:"User not found. Please register"})
            }
            
            else{
                let match = User.checkPassword(userDetails.password,user.password);
                if(match){
                    //create JWT s
                    const accessToken = jwt.sign(
                        {
                            userInfo: {
                                "email": user.email,
                                "roles": user.roles
                            }
                        },
                        process.env.ACCESS_TOKEN_SECRET                    );
                    res.status(200).send({success:true,msg:"User Login success",userLogged:user, roles:user.roles,token:accessToken})
                }
                else{
                    res.status(422).send({error:"Email or password doesn't match. Try again."})
                }
            }
        })
        .catch((err)=>{
            console.log(err);
            res.status(422).send({error:err})
        });
    }
        
    }