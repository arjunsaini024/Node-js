// // how to produce a promise

// let myPromise = new Promise(function(resolve,reject){
//     const a = 4
//     const b = 4
//     setTimeout(()=>{
//         if(a===b){
//             resolve
//         }
//         else{
//             reject()
//         }
//     },2000)
// })

// console.log(myPromise)

let myPromise = new Promise(function(resolve,reject){
    const a = 4
    const b = 5
    setTimeout(()=>{
        if(a===b){
            resolve('The values are equal')
        }
        else{
            reject('The values were not equal')
        }
    },2000)
})

// Fulfilled - then method
myPromise.then(function(result){
    console.log(result)
})

// Rejected State

myPromise.catch(function(failedResult){
    console.log(failedResult)
})