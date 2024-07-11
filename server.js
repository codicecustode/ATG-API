import express from 'express'
const app = express()
import bodyParser from 'body-parser'
//import .env
import 'dotenv/config'

app.use(bodyParser.json({ limit: '10mb' }));
app.use(bodyParser.urlencoded({extended: true }));


import router from './routes/user.route.js'
app.use(router)

//connecting to database
import DB_CONNECTION from './database/db_connection.js'
DB_CONNECTION();

app.listen(process.env.PORT,()=>{
    console.log('Server is running on port 3000');
})