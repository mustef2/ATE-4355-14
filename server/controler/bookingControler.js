const Booking = require('../DBModel/bookingModel');
const factory = require('./handelFactory');

exports.createBooking = async (req, res, next) => {
    try {
      const newBooking = await Booking.create(req.body);
      res.status(201).json({
        status: 'success',
        data: {
          booking: newBooking
        }
      });
    } catch (err) {
      res.status(400).json({
        status: 'failed',
        message: err.message
      });
    }
  };
  

exports.getAllBooking = factory.getAll(Booking);
exports.getBooking = factory.getOne(Booking);
exports.getUpdate = factory.updateOne(Booking);
exports.getDelete = factory.deleteOne(Booking);
