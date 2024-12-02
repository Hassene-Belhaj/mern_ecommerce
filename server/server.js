const express = require("express");
const { connectToDb } = require("../server/utils/lib/connectDB");
require("dotenv").config();
const cookieParser = require("cookie-parser");
const cors = require("cors");
const authRoute = require("./routes/user");
const admin_prodcuts_Route = require("./routes/admin_products");
const shop_prodcuts_Route = require("./routes/shop_products");

const app = express();

const PORT = process.env.PORT || 5000;

app.use(
  cors({
    origin: ["http://localhost:5173"],
    methods: ["GET", "POST", "DELETE", "PUT"],
    credentials: true,
  })
);

app.use(cookieParser());
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true, limit: "50mb" }));

const Start = async () => {
  try {
    await connectToDb(
      process.env.DATABASE,
      console.log("connected to dataBase")
    );
    app.listen(PORT, () => console.log(`server is running port ${PORT}`));
  } catch (error) {
    console.log(error);
  }
};

Start();

app.use("/api/auth", authRoute);
app.use("/api/admin/products", admin_prodcuts_Route);
app.use("/api/shop/products", shop_prodcuts_Route);
