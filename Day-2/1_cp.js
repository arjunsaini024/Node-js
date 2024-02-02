const cp = require('child_process')
// cp.execSync('calc')
// cp.execSync('start chrome https://nodejs.org/docs/latest/api/')
console.log('Output '+cp.execSync('node demo.js'))