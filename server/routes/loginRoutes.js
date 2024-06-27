const express = require('express')
const Router = express.Router()
const loginControler = require('../controler/loginControler')

Router.route('/').get(loginControler.allLogin).post(loginControler.updateLogin)
Router.route('/:id').get(loginControler.getLogin).delete(loginControler.deleteLogin)

module.exports = Router;