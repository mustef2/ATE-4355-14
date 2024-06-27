const path = require('path')
const multer = require('multer')

//upload image to database
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
          return cb(null, './uploads/toure')
    },
    filename: function (req, file, cb) {
    const uniqueSuffix = Date.now()
     return cb(null, uniqueSuffix + file.originalname)
    }
})

const upload = multer({storage:storage,}).fields([
    { name: 'imageCover', maxCount: 1 },
    { name: 'images', maxCount: 3 }
]);

module.exports = upload

