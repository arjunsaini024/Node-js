function placeOrder(drink) {
    return new Promise(function(resolve, reject) {
        if (drink === 'coffee') {
            resolve('Order for Coffee received');
        } else {
            reject('Other Orders Rejected');
        }
    });
}

function processOrder(order) {
    return new Promise(function(resolve) {
        console.log('Order is being Processed');
        resolve(`${order} and is Served`);
    });
}


// It is Hard method
// placeOrder('coffee').then(function(orderPlaced) {
//     console.log(orderPlaced);
//     return processOrder(orderPlaced);  // Corrected this line
// }).then(function(processedOrder) {
//     console.log(processedOrder);
// }).catch(function(error) {
//     console.error(error);  // Added a catch block for error handling
// });


// It is easy method
async function serveOrder(){
    try{
        let orderPlaced = await placeOrder('coffee')
        console.log(orderPlaced)
        let processedOrder = await processOrder(orderPlaced)
        console.log(processedOrder)
    } catch(error){
        console.log(error)
    }
}

serveOrder()