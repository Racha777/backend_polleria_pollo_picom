const {Router} = require('express');
const router = Router();

const {auth} = require('../controllers/usuario.controllers');

router.route('/')
    .post(auth)

module.exports = router;