const authControler = require('../controler/authControler')
const userControler = require('../controler/userControler')
const multer = require('multer')
const express = require('express')
const Routes = express.Router()

//upload image to database
const storage = multer.diskStorage({
      destination: function (req, file, cb) {
            return cb(null, './uploads')
      },
      filename: function (req, file, cb) {
      const uniqueSuffix = Date.now()
       return cb(null, uniqueSuffix + file.originalname)
      }
})
const upload = multer({ storage: storage });

Routes.post('/signup' , upload.single('photo'), authControler.signup)
Routes.post('/login', authControler.login)
Routes.get('/logout', authControler.logout)
Routes.post('/forgetPassword', authControler.forgetPassword)
Routes.patch('/resetPassword/:token', authControler.resetPassword)

//protects all routes after this midelware

Routes.use(authControler.protect)
Routes.patch('/updateMyPassword',  authControler.updatePassword)
Routes.get('/me',  userControler.getMe, userControler.getUser)
Routes.patch('/updateMe',  userControler.updateMe)
Routes.delete('/deleteMe', userControler.deleteMe)
 

Routes.use(authControler.restrictTo('admin'))
Routes.get('/' , userControler.getAllUser).post(userControler.createUser)
Routes.get('/:id', userControler.getUser).patch(userControler.updateUser).delete(userControler.deleteUser)
      
module.exports = Routes;