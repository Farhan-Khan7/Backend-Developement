require('dotenv').config()
const app = require('./src/app');
const connectToDB = require('./src/config/databaseConnect')




// Database function call
connectToDB();





const port = process.env.PORT
app.listen(port , () => {
    console.log("Server is runnin on port 8080")
})