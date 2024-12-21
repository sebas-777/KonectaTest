const express = require('express')
const mysql = require('mysql')
const myConn = require('express-myconnection')

const app = express()
app.set('port',process.env.PORT || 3000)

const dbOptions = {
    host: 'localhost',
    user: 'root',
    password: 'Isa2024',
    port: 3306,
    database: 'konecta'
}

// middlewares
app.use(myConn(mysql,dbOptions,'single'))


// routes
app.get('/',(req,res)=>{
    res.send('hello from the backend')
})

// start server
app.listen(app.get('port'),()=>{
    console.log('server running on port',app.get('port'));
})