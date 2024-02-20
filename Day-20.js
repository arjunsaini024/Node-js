const express = require('express');
const app = express();

const { connectToMongoDB } = require('./utils/connectToMongoDB')
const { UserWithAge } = require('./models/user.model');

app.get('/', (req, res) => {
    res.send("Welcome to the MongoDB Aggregation practice. Go to /average-age route to fetch the average age of all users in the database.");
})

app.get('/average-age', (req, res) => {
    averageAgeOfUsers(req, res);
})

/**
 * Express route to calculate the average age of all users in MongoDB
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
async function averageAgeOfUsers(req, res) {
    // Your implementation here
    try {
        const isConnectedToDatabase = await connectToMongoDB();
        if (isConnectedToDatabase) {
            const result = await UserWithAge.aggregate([{
                '$group': {
                    "_id": null,
                    "avgAge": { "$avg": "$age" }
                }
            }]);
            return res.status(200).send(`The average age of all users in the database is <b>${result[0].avgAge}`);
        } else {
            return res.status(404).send("Could not connect to the Database to fetch User's Age!");
        }
    } catch (error) {
        console.log(error);
        return res.status(404).send("Error encountered while trying to fetch Users!");
    }
}

const port = 3000;
app.listen(port, (error) => {
    if (error) {
        console.log(error);
    } else {
        console.log(`Listening at http://127.0.0.1:${port}`);
    }
})