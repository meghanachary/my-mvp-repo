var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var cors = require("cors");

// var indexRouter = require("./routes/index");
// var usersRouter = require("./routes/users");
var topicsRouter = require("./routes/topics");

var app = express();

app.use(cors());
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// I commented out this code because I think I deleted the public folder?
// app.use(express.static(path.join(__dirname, "public")));

// This code below is from milestone 5. Is it ok to use here?
app.use(express.static(path.join(__dirname, "client/build")));

// app.use("/", indexRouter);
// app.use("/users", usersRouter);
app.use("/api/topics", topicsRouter);

// I copied this code directly from milestone 5
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname + "/client/build/index.html"));
});

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.send({ msg: "Error" });
});

module.exports = app;
