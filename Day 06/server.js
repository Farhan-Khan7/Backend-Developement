const app = require("./src/app");
const mongoose = require("mongoose");

function connectToDB() {
  mongoose
    .connect(
      "mongodb+srv://Farhankhan:dbfarhan%40123@cluster0.gw0yy52.mongodb.net/day-06",
    )
    .then(() => {
      console.log("Database Connected Successfully!");
    });
}
connectToDB();

const port = 8080;
app.listen(port, () => {
  console.log(`server running on port : ${port}`);
});
