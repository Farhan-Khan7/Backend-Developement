const express = require('express');

const app = express();

app.use(express.json())



app.get('/' , (req , res) => {
    res.send("FInall sever chalu ho gya ")
})


let notes = [];

app.post('/notes' , (req , res) => {
    
    notes.push(req.body)
    res.send("Note Created")
})

app.get('/getNotes' , (req , res) => {
    res.send(notes)
})


const port = 8080;
app.listen(port , () => {
    console.log(`Server is running on port : ${port}`)
})