const express = require('express');
const app = express();
const path = require('path');

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    staticFileServer(req, res)
})

app.get('/:folder/', (req, res) => {
    staticFileServer(req, res);
})

app.get('/:folder/:file', (req, res) => {
    staticFileServer(req, res);
})

/**
 * Express application serving static files from the "public" directory
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
function staticFileServer(req, res) {
    // Your implementation here
    const folderName = req.params.folder;
    const fileName = req.params.file;

    if (!folderName) {
        res.sendFile('/index.html');
    } else if (!fileName) {
        res.send("No file mentioned");
    } else {
        res.sendFile(`/${folderName}/${fileName}`);
    }
}

// create PORT
const port = process.env.PORT || 3000;
app.listen(port, (err) => {
    if (err) {
        console.log(err);
    } else {
        console.log(`Listening at http:127.0.0.1:${port}`);
    }
})
