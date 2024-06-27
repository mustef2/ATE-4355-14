const express = require('express')
const Route = express.Router()
const postControler = require('../controler/postControler')

Route.route('/').get(postControler.allPost).post(postControler.createPost)
Route.route('/:id').get(postControler.getPost).patch(postControler.updatePost).delete(postControler.deletePost)

module.exports = Route

