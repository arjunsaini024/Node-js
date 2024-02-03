const fs = require('fs')

// // Reading a file

// let filecontent = fs.readFileSync('f1.txt')
// console.log('data of file 1-> '+filecontent)

// //Writing in a file

// fs.writeFileSync('f2.txt','This is file2')
// console.log('File has been written')

// Append a file

// fs.appendFileSync('f3.txt',' This is updated data')
// console.log('File has been append')

// Deleting a file

// fs.unlinkSync('f2.txt')
// console.log('File has been Deleted')

// Directories

// Create a directory

// fs.mkdirSync('myDirectory')

// check the content inside of a directory

// let folderPath = 'D:\\Node js\\Day-3\\myDirectory'
// let folderContent = fs.readdirSync(folderPath)
// console.log("Folder Content " , folderContent)

// check wheter a directory exists or not

// let doesExist = fs.existsSync('myDirectory')
// console.log(doesExist)


// remove directory

fs.rmdirSync('myDirectory')
console.log('File has been Deleted')
