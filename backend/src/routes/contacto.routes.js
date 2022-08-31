const {Router} = require('express');
const router = Router();

const {contactoConfirmed} = require('../controllers/contacto.controllers');


router.route('/confirmed')
      .post(contactoConfirmed)

module.exports = router;