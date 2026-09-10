const fs = require('fs')

process.nextTick(() => {
    setTimeout(() => console.log("Set Timeout"), 0);
})

setImmediate(() => console.log("Set Immediate"));



fs.readFile("sample.txt", 'utf-8', function (err, data) {
    setTimeout(() => console.log("Set` Timeout inside a function"), 0);
    
    setImmediate(() => console.log("Set Immediate inside a function"));

    console.log("inside fs")
})


console.log("Hello")
