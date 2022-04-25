const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const userSchema = mongoose.Schema({
    name:{
        type:String,
        required:"Name cannot be empty"
    },
    email:{
        type:String,
        required:"E-mail cannot be empty",
        unique:true
    },
    // mobile:{
    //     type:String,
    //     required:"Mobile cannot be empty"
    // },
    password:{
        type:String,
        required:"Password cannot be empty",
        minlength:[4,"Password must have atleast 4 characters"]
    },
    roles: [
        {
            type: Number
        }
    ]
});
// custom validation for email:
userSchema.path('email').validate((val) => {
    emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+([a-z]{2-3})?$/ ; //remove quotes
    return emailRegex.test(val);
},'invalid Email');
var userModel = mongoose.model("User",userSchema);
module.exports = userModel;

//  Add user funcion takes the new User details, hashes the password and saves into DB
module.exports.addUser = function(newUser,callback){
    bcrypt.genSalt(10,(err,salt)=>{
        bcrypt.hash(newUser.password,salt,(err,hash)=>{
            newUser.password = hash;
            newUser.save(callback);
            if(err){
                console.log(err);
            }
        });
    });
}

module.exports.checkPassword = function (userPass,dbPass){
   return bcrypt.compareSync(userPass,dbPass);
}

