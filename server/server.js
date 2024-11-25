const express = require("express");
const { connectToDb } = require("../server/utils/lib/connectDB");
require("dotenv").config();
const cookieParser = require("cookie-parser");
const cors = require("cors");

const app = express();

const PORT = process.env.PORT || 5000;

app.use(
  cors({
    // origin: ["http://localhost:5173"],
    // methods: ["GET", "POST", "DELETE", "PUT"],
    // credentials: true,
  })
);

app.use(cookieParser());
app.use(express.json());

const Start = async () => {
  try {
    await connectToDb(process.env.DATABASE, console.log("connected to dataBase"));
    app.listen(PORT, () => console.log(`server is running port ${PORT}`));
  } catch (error) {
    console.log(error);
  }
};

Start();
