const permissionAuth = (...permissionRoles) => {
    return (req,res,next) => [...permissionRoles].includes(req.userData.userRole) ? next() : res.status(401).send("You are not Authorized.");
}

module.exports =  permissionAuth;
