const express = require('express')
const Route = express.Router()
const toureControler = require('../controler/toureControler')
const authCOntroler = require('../controler/authControler')
//const reviewControler = require('../controler/reviewControler')
const reviewRoutes = require('../routes/reviewRoutes')
const upload = require('../utils/upload')

//post /tour/id/reviews
//get /tour/id/reviews
//get /tour/id/reviews/id
//Route.route('/:tourId/reviews').post(authCOntroler.protect, authCOntroler.restrictTo('user'), reviewControler.createReview)




Route.use('/:tourId/reviews', reviewRoutes)
//add this to createToure :authCOntroler.protect, authCOntroler.restrictTo('admin', 'lead-guid'),
Route.route('/').get(toureControler.getAllToure)
.post(upload,toureControler.createToure)
Route.route('/:id').get(toureControler.getToure)
.patch(authCOntroler.protect, authCOntroler.restrictTo('admin', 'lead-guid') ,toureControler.updateToure)
.delete(
    authCOntroler.protect,
    authCOntroler.restrictTo('admin','lead-guide') 
    ,toureControler.deleteToure)
    
module.exports = Route;
