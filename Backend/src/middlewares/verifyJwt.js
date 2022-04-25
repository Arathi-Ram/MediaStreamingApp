const jwt = require('jsonwebtoken');
require('dotenv').config();

//  Verify Token Middleware Function

    const verifyJWT = (req,res,next) => {
        const authHeader = req.headers.authorization || req.headers.Authorization;
        if(!authHeader?.startsWith('Bearer')) return res.status(401).send({msg:'Unauthorized request.No header'});
        // console.log(`Auth Header is ${authHeader}`); //Bearer
        let token = authHeader.split(' ')[1];
        // console.log(`Token is ${token}`);
        if(token == 'null'){
            return res.status(401).send({msg:'Unauthorized request. Token is NULL'})
        }
        try{
            jwt.verify(
                token,
                process.env.ACCESS_TOKEN_SECRET,
                (err, decoded) => {
                    if(err) return res.status(403).send({msg:'Invalid Token'});
                    req.user = decoded.userInfo.email;
                    req.roles = decoded.userInfo.roles;
                    // var isArray = Array.isArray(req.roles);
                    // console.log(` req.roles [JWT ]is ${isArray}`);
                    next();
                }
            );
        }
        catch(err) {
            console.log(err);
        }
    }

    module.exports = verifyJWT;