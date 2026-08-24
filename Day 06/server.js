const app = require('./src/app')
const mongoose = require('mongoose')


function connectToDB(){
  mongoose.connect("mongodb+srv://Farhankhan:dbfarhan%40123@cluster0.gw0yy52.mongodb.net/day-7")
  .then(() => {
    console.log("Database connected successfully!")
  })
}

connectToDB()



const port = 8080;
app.listen(port , () => {
  console.log(`Server is running on port : ${port}`)
})