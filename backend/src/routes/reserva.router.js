const {Router} = require('express');
const router = Router();

const {getAll,create,getById,update,deleteOne} = require('../controllers/reserva.controller');

router.route('/')
      .get(getAll)
      .post(create)    

router.route('/:id')
      .get(getById)
      .put(update)
      .delete(deleteOne)

module.exports = router;