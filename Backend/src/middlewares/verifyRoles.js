
const verifyRoles = (...allowedRoles) => {
    return (req, res, next) => {
        if(!req?.roles) return res.status(401).send('UnAuthorized. No request or roles');
        const rolesArray = [...allowedRoles];
        console.log(rolesArray);
        console.log(req.roles);
        // console.log(`req.roles is [ROLES] ${ req.roles }`);        
        const result = req.roles.map(role => rolesArray.includes(role)).find( val => val === true);
        console.log(`Result is ${result}`);
        
        if(!result) return res.status(401).send('UnAuthorized role. No entry!');
        next();
    }
}

module.exports = verifyRoles