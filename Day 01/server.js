let http = require('http');

let server = http.createServer((req , res) => {
  res.end("okay me server ke paas se aa rha hu !")
})

server.listen(3000, () => {
    console.log("Server is start ")
})