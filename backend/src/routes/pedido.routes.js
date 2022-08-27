const {Router}=require('express');
const router=Router();

const {create,getByClient}=require('../controllers/pedido.controllers');

router.route('/')
    .post(create)

router.route('/:cliente_id')
    .get(getByClient)

module.exports=router