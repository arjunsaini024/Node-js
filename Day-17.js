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

const userSchmea = new mongoose.Schema({
    username: { type: String, required: true },
    email: { type: String, required: true }
})

const User = mongoose.model('User', userSchmea)

async function addUserToDatabase(user) {
    try {
        const newUser = new User(user)
        await newUser.save()
        console.log("user added to database");
        console.log(newUser);
    } catch (error) {
        console.log("Error adding user to database for user " + user);
    }
}

addUserToDatabase({ username: 'wasif', email: 'wasif@gmail.com' })

app.listen(3000, () => {
    console.log("Listening to port 3000");
})