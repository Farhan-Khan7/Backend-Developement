const server = require('express')();



server.get('/home' , (req , res) => {
    res.send("Haa me Home Page hu ");
})



server.get('/about' , (req , res ) => {
    res.send("Haa me about page hu ");
})

const port = 3000;
server.listen(port)

