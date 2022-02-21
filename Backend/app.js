// Middleware packages:
const express = require('express');
const cors = require('cors');
const app = new express();
// Files: 
const config = require('./src/config/config');
const modelDB = require('./src/model/db');
const PORT =  process.env.PORT;
// Routes:
const authRoute = require('./src/routes/authRoutes');
app.use(express.json());
app.use(cors());
app.use('/auth',authRoute);
// error handler
app.use((err,req,res,next)=>{
    if(err.name === 'ValidationError'){
        var valErrors = [];
        Object.keys(err.errors).forEach(key=>valErrors.push(err.errors[key].message));
        console.log(valErrors);
        res.status(422).send({error:valErrors})
    }
})
app.listen(PORT, ()=> { console.log("Server ready at: " + PORT );});