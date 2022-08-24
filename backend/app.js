const express = require("express");
const cookieParser = require("cookie-parser");
const app = express();

const product = require("./routes/productRoute");
const user = require("./routes/userRoutes");
const order = require("./routes/orderRoute");

const errorMiddleware = require("./middleware/error");

app.use(express.json());
app.use(cookieParser());
app.use("/api/v1", product);
app.use("/api/v1", user);
app.use("/api/v1", order);
app.use(errorMiddleware);

module.exports = app;
