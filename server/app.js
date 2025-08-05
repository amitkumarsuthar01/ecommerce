require("dotenv").config();
const express = require("express");
const cors = require("cors"); // ✅ import cors
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");
const app = express();
const port = process.env.PORT || 5007;

require("./db/conn");
const router = require("./routes/router");
const DefaultData = require("./defaultdata");

// ✅ Enable CORS for frontend domain
app.use(cors({
  origin: "https://ecommerce-frontend-x0aq.onrender.com",
  credentials: true
}));

// Middleware
app.use(express.json());
app.use(cookieParser(""));
app.use(router);

// Test route
app.get("/", (req, res) => {
  res.send("your server is running");
});

// Production config
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

app.listen(port, () => {
  console.log(`Your server is running on port ${port}`);
});

DefaultData();
