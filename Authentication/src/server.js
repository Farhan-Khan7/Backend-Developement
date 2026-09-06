import app from "./app/app.js";
import connectDB from "./config/db.js";
import config from "./config/config.js";

// database connection call
connectDB();

// server port connection
const port = process.env.PORT;
app.listen(port, () => {
  console.log(`Server is running on port : ${port}`);
});
