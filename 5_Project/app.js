const express = require('express');
const mongoose = require('mongoose');
const categories = require('./Routes/categories');
const app = express();

mongoose.connect('mongodb://127.0.0.1/learningPlatform')
  .then(() => console.log('Connecting is successful'))
  .catch(err => console.log('Could not connect to MongoDB', err));

app.use(express.json());
app.use(categories);

const port = process.env.PORT || 4000; // Change the port to 4000
app.listen(port, () => console.log(`Listening on port ${port}....`));
