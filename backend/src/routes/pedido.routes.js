const {Router}=require('express');
const router=Router();

const {create}=require('../controllers/pedido.controllers');

router.route('/')
    .post(create)

module.exports=router