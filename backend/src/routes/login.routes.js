const {Router} = require('express');
const router = Router();

const {login} = require('../controllers/usuario.controllers');

router.route('/')
    .post(login)

module.exports = router;