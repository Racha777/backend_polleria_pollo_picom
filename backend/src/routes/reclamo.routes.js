const {Router} = require('express');
const router = Router();

const {reclamoConfirmed} = require('../controllers/reclamo.controllers');


router.route('/confirmed')
      .post(reclamoConfirmed)

module.exports = router;