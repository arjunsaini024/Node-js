const express = require('express')
const app = express()

// get , port , put , delete

app.get('/',(req,res)=>{
    res.send('Hello form scaler topics')
})

app.get('/about',(req,res)=>{
    res.send('We create impact')
})

app.get('/contact',(req,res)=>{
    res.send('Contact on a abcd@.com')
})
app.get('/home',(req,res)=>{
    res.send('Home is ready')
})

app.listen(5000,()=>console.log('Port is running on 3000'))