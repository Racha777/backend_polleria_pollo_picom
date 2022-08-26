const {Router} = require('express');
const router = Router();

const {verifyToken} = require('../middlewares/auth.handler');

router.get('/',verifyToken,(req,res)=>{
    res.json({
        status:true,
        content:"Ruta protegida"
    })
})

module.exports = router;