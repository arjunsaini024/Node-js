const mongoose = require('mongoose')
mongoose.connect('mongodb://127.0.0.1/testDatabase')
.then(()=> console.log('Connecting is successful'))
.catch(err=> console.log('Cloud not connect to be mongodb',err))

// Schema
// const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
    name: { type: String, required: true, minlength:5, maxlength:200 },
    tags: {type:Array,validate:{
        validator: function(tags){
            return tags.length>1
        }
    }},
    category:{
        type:String,
        required:true,
        enum:['DSA','Web', 'Mobile', 'Data Science']
    },
    creator: { type: String, required: true },
    publishDate: { type: Date, default: Date.now },
    isPublished:{type:String,required:true},
    rating: {type:Number,required:function(){return this.isPublished}}
});

const Course = mongoose.model('course', courseSchema);

async function createCourse() {
    const course = new Course({
        name: 'MongoDB',
        tags: ['express','mangodb'],
        category: 'Web',
        creator:'Adam',
        isPublished: true,
        rating:4.5
    });

    try {
        const result = await course.save();
        console.log(result);
    } catch (error) {
        for(field in error.errors){
            console.error(error.errors[field]);
        }
    }
}

createCourse();


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


// async function updateCourse(id){
//     let course = await Course.findById(id)
//     if(!course) return;
//     course.name = 'Python'
//     course.creator = 'Steve'
//     const updatedCourse = await course.save()
//     console.log(updatedCourse)
// }

// updateCourse('65c9ab38c40df13bc47114f3')

// Delete

// async function deleteCourse(id){
//     let course = await Course.findByIdAndDelete(id)
//     console.log(course)
// }

// deleteCourse('65c9ab38c40df13bc47114f3')