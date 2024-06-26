const express = require("express");
const morgan = require("morgan");
const userRouter = require("./routes/userRoutes");
const AppError = require("./utils/appError");
const globalErrorHandler = require("./controllers/errorController");

const app = express();

// Logging middleware

app.use(morgan("dev"));

app.use(express.json());

// Hello World route
app.get("/", (req, res) => {
  res.send("Hello World jshfu!");
});

// User routes
app.use("/api/v1/users", userRouter);

// Route not found handler
app.all("*", (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on the server`, 404));
});

// Global error handler
app.use(globalErrorHandler);

module.exports = app;
