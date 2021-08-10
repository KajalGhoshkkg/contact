const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const cors = require("cors");
const userRoute = require("./routers/user");
const cookieParser = require("cookie-parser");
const path = require("path");
const contactRoute = require("./routers/contact");

dotenv.config();

const app = express();

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

app.use(express.json());
app.use(cookieParser());
app.use("/user",userRoute)
app.use("/contact",contactRoute)
app.use(express.static(path.join(__dirname, "./build")))
app.get("*",(req,res)=>{
  res.send(path.join(__dirname, "./build/index.html"))
})

const Port = process.env.port || 8000;
const Db = process.env.db;

mongoose
  .connect(Db, {
    useCreateIndex: true,
    useFindAndModify: false,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("db connected");
  })
  .catch((err) => {
    console.log(err);
  });

app.listen(Port, () => {
  console.log("server is up and running on port: ", Port);
});
