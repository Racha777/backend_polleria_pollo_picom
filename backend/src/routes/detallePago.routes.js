const {Router}=require('express');
const router=Router();

const {verifyToken} = require('../middlewares/auth.handler');

const {create}=require('../controllers/detallePago.controllers');

router.route('/')
    .post(verifyToken,create)

module.exports=router