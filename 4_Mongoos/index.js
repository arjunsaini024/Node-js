const mongoose = require('mongoose')
mongoose.connect('mongodb://127.0.0.1/testDatabase')
.then(()=> console.log('Connecting is successful'))
.catch(err=> console.log('Cloud not connect to be mongodb',err))

// Schema
const courseSchema = new mongoose.Schema({
    name : String,
    creator : String,
    publishDate : {type : Date, default : Date.now},
    isPublished : Boolean
})

const Course = mongoose.model('course',courseSchema)

async function createCourse(){
    const course = new Course({
        name : 'Java',
        creator : 'Arjun',
        isPublished : false
    });

    const result = await course.save()
    console.log(result)
}
createCourse()