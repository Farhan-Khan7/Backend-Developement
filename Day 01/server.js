const http = require('http');


const server = http.createServer((req , res) => {
    res.end("Haa Bhai Request Accept Ho gayi hai. ")
})

server.listen(8000 , function() {
    console.log("Server Started ")
})