const {Router} = require('express');
const router = Router();

const {getAll,create,getById,update,deleteOne,reservaConfirmed} = require('../controllers/reserva.controllers');

router.route('/')
      .get(getAll)
      .post(create)    

router.route('/:id')
      .get(getById)
      .put(update)
      .delete(deleteOne)

router.route('/confirmed')
      .post(reservaConfirmed)

module.exports = router;