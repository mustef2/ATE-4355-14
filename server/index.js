//Server World Start
const express = require('express');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const morgon = require('morgan');
const cors = require('cors');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const mangoSanitize = require('express-mongo-sanitize');
const xxl_clean = require('xss-clean');
const hpp = require('hpp');
//routes defined 
const toureRoutes  = require('./routes/tourRoutes');
const userRoutes  = require('./routes/userRoutes');
const postRoutes = require('./routes/postRoutes');
const loginRoutes = require('./routes/loginRoutes');
const bookingRoutes = require('./routes/bookingRoutes');
const reviewRoutes = require('./routes/reviewRoutes');
const AppError = require('./utils/appError');
const golobalErrorHandler = require('./controler/errorControler');


//App model run
const app = express()
app.use(cookieParser());
app.use(cors())
app.options('*', cors());

app.use(helmet({
    crossOriginResourcePolicy: false,
  }))
//limiter 
const limiter = rateLimit({
    max:1000,
    windowsMs: 60*60*100,
    message:"Too many request from this IP , please try again in 1 hours"
})
// app.options('/api/v1/tours/:id', cors());
app.use('/api', limiter)
//body perser reading data from body
app.use(express.json({limit:'100kb'}))
//sanitezer the data after the cashed are full non sql query injects 
app.use(mangoSanitize())
// data sanitaization against the XSS
app.use(xxl_clean())
//protect against HTTP Parameter Pollution attacks
app.use(hpp())
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


//Middle Ware Start here 
app.use(morgon('dev'))
app.use((req,res,next)=>{
    req.requestTime = new Date().toISOString()
    //console.log(req.headers)
    next()
})
//STATIC FILE START HERE 
app.use(express.static('./public'))
app.use("/uploads", express.static("./uploads"));

//TOURE MIDLEWARE 
app.use('/api/tours',toureRoutes);
//USER ROUTE
app.use('/api/users', userRoutes);
//Post Route 
app.use('/api/post', postRoutes);
// login routes 
app.use('/api/login', loginRoutes);
// Review Routes
app.use('/api/review', reviewRoutes);
// Booking  Routes
app.use('/api/bookings', bookingRoutes);


app.all('*', (req,res,next)=>{
    res.status(404).json({
        status:"Failed",
        message: `Cannot find ${req.originalUrl} On the Server`
    })
})
app.use(golobalErrorHandler)

module.exports = app