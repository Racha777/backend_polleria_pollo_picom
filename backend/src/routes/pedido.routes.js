const {Router}=require('express');
const router=Router();

const {verifyToken} = require('../middlewares/auth.handler');

const {create,getByClient}=require('../controllers/pedido.controllers');

router.route('/')
    .post(verifyToken,create)

router.route('/:cliente_id')
    .get(getByClient)

module.exports=router