const app = require('./src/app')
const connectToDB = require('./src/config/database')
const noteModel = require('./src/models/notes.model')
require('dotenv').config()


connectToDB();

const port = process.env.port;

app.listen(port , () => {
    console.log(`Server is running on port ${port}`)
})