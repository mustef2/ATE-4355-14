const mongoose = require('mongoose')
const dotenv = require('dotenv')
dotenv.config({path:'./config.env'}) 
mongoose.connect(process.env.DBURLD)
.then(db => console.log("database is conected"))
.catch(error => console.log('database is not conected'))



