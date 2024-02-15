const express = require('express');
const categories = require('./Routes/categories')
const app = express();
app.use(express.json());
app.use(categories)



const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}....`));
