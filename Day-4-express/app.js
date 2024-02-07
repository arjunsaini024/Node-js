const express = require('express');
const app = express();

// Middleware to parse JSON in request body
app.use(express.json());

let courses = [
    { id: 1, name: 'Javascript' },
    { id: 2, name: 'Java' },
    { id: 3, name: 'Python' },
];

app.get('/', (req, res) => {
    res.send('Hello from scaler topics');
});

app.get('/about', (req, res) => {
    res.send('We create impact');
});

app.get('/contact', (req, res) => {
    res.send('Contact on a abcd@.com');
});

app.get('/home', (req, res) => {
    res.send('Home is ready');
});

// Corrected method: app.get to app.get
app.get('/courses', (req, res) => {
    res.send(courses);
});

// Corrected method: app.port to app.post
app.post('/courses', (req, res) => {
    const course = {
        id: courses.length + 1,
        name: req.body.name,
    };
    courses.push(course);
    res.send(course);
});

app.put('/courses/:coursename',(req,res)=>{
    let course = courses.find(course=>course.name===req.params.coursename)
    if(!course) res.status(404).send('The course you are looking for does not exist')
    course.name = req.body.name
    res.send(course)
})

app.get('/courses/:coursename', (req, res) => {
    console.log(req.params.coursename);
    let course = courses.find(course => course.name === req.params.coursename);
    if (!course) res.status(404).send('The course you are looking for does not exist');
    res.send(course);
});

// app.delete('/courses/:coursename', (req, res) =>{
//     let UpdatedCourses = courses.filter(course=>course.name!==req.params.coursename)
//     courses = UpdatedCourses
//     res.send(courses)
// })

app.delete('/courses/:id', (req, res) =>{
    let course = courses.find(course=>course.id===parseInt(req.params.id))
    if(!course) res.status(404).send('The course you are looking for does not exist')
    const index = courses.indexOf(course)
    courses.splice(index,1)
    res.send(course)
})

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Port is running on ${port}`));
