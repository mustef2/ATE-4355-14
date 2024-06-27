const express = require('express');
const bookingControler = require('../controler/bookingControler');
const authControler = require('../controler/authControler')
const routes = express.Router();

routes.use(authControler.protect)
routes.route('/').get(bookingControler.getAllBooking).post(bookingControler.createBooking)
routes.route('/:id').get(bookingControler.getBooking).patch(bookingControler.getUpdate).delete(bookingControler.getDelete);


module.exports = routes;
