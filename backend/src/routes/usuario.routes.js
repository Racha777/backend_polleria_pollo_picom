const {Router} = require('express');
const router = Router();

const {verifyToken} = require('../middlewares/auth.handler');

const {getAll,create,getById} = require('../controllers/usuario.controllers');

router.route('/')
    .get(getAll)
    .post(create)

router.route('/:id')
    .get(verifyToken,getById)

module.exports = router;