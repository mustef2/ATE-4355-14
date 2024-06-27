const app = require('./index')
require('./database/DBconection')
const dotenv = require('dotenv')
dotenv.config({path:'./config.env'})

const port = process.env.PORT  || 3000 ;

app.listen(port, ()=>{
    console.log(`http://127.0.0.1:${port}`) 
});