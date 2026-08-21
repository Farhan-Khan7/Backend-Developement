const app = require('./src/app')


// app.use(express.json())

let notes = [];

app.get('/' , (req , res) => {
    console.log("Server is running on port : 8080")
})


app.post('/notes' , (req , res) => {
    notes.push(req.body)
    console.log(notes)
    res.send("Notes Created Successfully!")
})


app.get('/notes' , (req , res) => {
    res.send(notes)
})


app.delete('/notes/:index' , (req , res) => {
    const index = req.params.index

    delete notes[index]
    res.send("Notes Delete Successfully!")
})

app.patch('/notes/:index' , (req ,res) => {
    const index = req.params.index;

    const {title , description} = req.body;

    if(title){
        notes[index].title = title;
    }

    if(description){
        notes[index].description = description;
    }

    res.send("Notes Updated Successfully!")
    
})











app.listen(8080, () => {
 console.log("Server is Runnig : 8080")
})