const {Router} = require('express');
const router = Router();

const {verifyToken} = require('../middlewares/auth.handler');

const {getAll,create,getById,userRecoverPassword,userNewPassword} = require('../controllers/usuario.controllers');

router.route('/')
    .get(getAll)
    .post(create)

router.route('/:id')
    .get(verifyToken,getById)

router.route('/recover-password')
    .post(userRecoverPassword)

router.route('/new-password/:id')
    .post(userNewPassword)

module.exports = router;