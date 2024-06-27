const express = require('express')
const reviewControler = require('../controler/reviewControler')
const authCOntroler = require('../controler/authControler')
const Route = express.Router({mergeParams:true})

Route.use(authCOntroler.protect)
Route.route('/').get(reviewControler.getAllReview)
//authCOntroler.restrictTo('user'),
.post(authCOntroler.restrictTo('user'),reviewControler.createReview)


Route.route('/:id')
.get(reviewControler.getReview)
.patch(authCOntroler.restrictTo('user','admin'),reviewControler.updateReview)
.delete(authCOntroler.restrictTo('user','admin'), reviewControler.deleteReview)


module.exports = Route