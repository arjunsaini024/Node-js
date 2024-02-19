const { connectToMongoDB } = require('./connectToMongoDB');
const { User, User_Validated } = require('../models/user.model');

/**
 * Adds a new user to the MongoDB database
 * @param {Object} user - User object with properties username and email
 */
async function addUserToDatabase(user) {
    // Your implementation here
    try {
        const isConnectedToDatabase = await connectToMongoDB();

        if (isConnectedToDatabase) {
            const newUser = new User(user);
            await newUser.save();
            console.log("User Added to Database");
        } else {
            console.log("Could not add User to Database because of some error!");
        }
    } catch (error) {
        console.log(error);
    }
}

/**
 * Adds a new user to the MongoDB database with validation
 * @param {Object} user - User object with properties username and email
 */
async function addUserWithValidation(user) {
    // Your implementation here
    try {
        const isConnectedToDatabase = await connectToMongoDB();

        if (isConnectedToDatabase) {
            const newUser = new User_Validated(user);
            await newUser.validate();
            await newUser.save();
            console.log("User Added to Database");
        } else {
            console.log("Could not add User to Database because of some error!");
        }
    } catch (error) {
        console.log(error.message);
    }
}

const user = {
    name: "john_doe",
    email: "john.doe@gmail.com",
}

addUserWithValidation(user);

exports.addUserToDatabase = addUserToDatabase;
exports.addUserWithValidation = addUserWithValidation;