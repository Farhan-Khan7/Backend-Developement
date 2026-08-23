const app = require('./src/app')


// app.use(express.json())

let notes = [];

app.get('/' , (req , res) => {
    console.log("Server is running on port : 8080")
})


app.post('/notes' , (req , res) => {
    notes.push(req.body)
    console.log(notes)
    res.status(201).json({
        message : "Notes Created Successfully!"
    })
})


app.get('/notes' , (req , res) => {
    res.status(200).json({
        notes : notes 
    })
})


app.delete('/notes/:index' , (req , res) => {
    const index = req.params.index

    delete notes[index]
    res.status(200).json({
        message : "Notes Deleted Successfully!"
    })
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

    res.status(200).json({
        message : "Notes Updated Successfully!"
    })
    
})











app.listen(8080, () => {
 console.log("Server is Runnig : 8080")
})