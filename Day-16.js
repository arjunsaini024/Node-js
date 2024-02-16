const express = require('express')
const mongoose = require('mongoose')

const app = express()

async function connectToMongoDB() {
    try {
        await mongoose.connect('mongodb://localhost:27017/scaler')
        console.log("Mongodb connection established");
    } catch (error) {
        console.log(error);
    }
}
connectToMongoDB()

app.listen(3000, () => {
    console.log("Listening to port 3000");
})