const jwt = require('jsonwebtoken');

function verifyToken(req,res,next){
    const bearerToken = req.headers['authorization'];
    console.log('bearer Token:'+ bearerToken);
    if(typeof bearerToken !== 'undefined'){
        //validamos el token
        const bearer = bearerToken.split(' ');
        const token = bearer[1];
        console.log('token : ' + token);
        try {
            const decoded = jwt.verify(token,TOKEN_SECRET);
            console.log(decoded);
        }catch(err){
            return res.status(401).json({
                status:false,
                content:'token invalido'
            })
        }
        return next();
    }else{
        res.status(403).json({
            status:false,
            content:'no se encontro el token'
        })
    }

}

module.exports = {verifyToken}