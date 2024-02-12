const mongoose = require('mongoose')
mongoose.connect('mongodb://127.0.0.1/testDatabase')
.then(()=> console.log('Connecting is successful'))
.catch(err=> console.log('Cloud not connect to be mongodb',err))

// Schema
const courseSchema = new mongoose.Schema({
    name : String,
    creator : String,
    publishDate : {type : Date, default : Date.now},
    isPublished : Boolean,
    rating : Number
})

const Course = mongoose.model('course',courseSchema)

async function createCourse(){
    const course = new Course({
        name : 'SQL',
        creator : 'Badal',
        isPublished : true,
        rating : 4.5
    });

    const result = await course.save()
    console.log(result)
}

// createCourse()

//eq (equal)
//gt (greate than)
//gte (greate than and equal to)
//lt
//lte
//in
//not in

// async function getCourses(){
//     const courses = await Course.find({rating:{$in:[4.2,4.5,4.3,4.4]}}).select({name:1,publishDate:1}).or([{creator:'Arjun'},{rating:5}])
//     console.log(courses)
// }
// getCourses()


async function updateCourse(id){
    let course = await Course.findById(id)
    if(!course) return;
    course.name = 'Python'
    course.creator = 'Steve'
    const updatedCourse = await course.save()
    console.log(updatedCourse)
}

// updateCourse('65c9ab38c40df13bc47114f3')

// Delete

async function deleteCourse(id){
    let course = await Course.findByIdAndDelete(id)
    console.log(course)
}

deleteCourse('65c9ab38c40df13bc47114f3')