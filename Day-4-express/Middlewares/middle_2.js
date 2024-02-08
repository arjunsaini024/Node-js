function myMiddleware1(req,res,next){
    console.log('I am the second custom middleware')
    next()
}

module.exports = myMiddleware1