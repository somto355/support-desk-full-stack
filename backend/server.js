const express = require('express')
const dotenv = require('dotenv').config()

const PORT = process.env.PORT || 5000

const app = express()

app.listen(PORT, ()=> console.log(`Server started on ports ${PORT}`))
app.get('/', (req, res)=>{
 //   res.send('Hello')
 res.status(200).json({message: 'Welcome to Support Desk API'})

})


