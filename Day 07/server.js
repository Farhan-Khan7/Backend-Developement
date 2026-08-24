// require('dotenv').config()


// const app = require('./src/app')
// const connectToDB = require('./src/config/database')
// const noteModel = require('./src/models/notes.model')


// connectToDB();

// const port = process.env.PORT;

// console.log("PORT FROM ENV:", port);

// app.listen(port , () => {
//     console.log(`Server is running on port ${port}`)
// })


require('dotenv').config();

const app = require('./src/app');
const connectToDB = require('./src/config/database');

connectToDB();

const port = process.env.PORT;

const server = app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

server.on('error', (error) => {
    console.log("SERVER ERROR:", error);
});