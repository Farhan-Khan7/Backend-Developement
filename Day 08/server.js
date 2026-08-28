const app = require('./src/app')
const connectToDB = require('./src/config/database')
require('dotenv').config();



connectToDB();


const port = process.env.PORT
app.listen(port , ()  => {
    console.log(`Server is running on port : ${port}`)
})