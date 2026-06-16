var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var mongoose = require("mongoose");
var cors = require("cors");

// kết nối
mongoose
  .connect("mongodb://localhost:27017/NoiThat")
  .then(() => console.log("Kết nối thành công"))
  .catch((err) => console.log("Kết nối thất bại", err));

var corsOptionsDelegate = function (req, callback) {
  var corsOptions = { origin: true };
  callback(null, corsOptions);
};

var usersRouter = require("./routes/users");
var categoriesRouter = require("./routes/categoriesRoutes");
var productsRouter = require("./routes/productRoutes");
var billsRoutes = require("./routes/billsRoutes");
var couponsRouter = require("./routes/couponRoutes");
var ordersRouter = require("./routes/orderRoutes");
var reviewsRouter = require("./routes/reviewRoutes");

var app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "hbs");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(cors());

app.use("/api/users", usersRouter);
app.use("/api/categories", categoriesRouter);
app.use("/api/products", productsRouter);
app.use("/api/bills", billsRoutes);
app.use("/api/coupons", couponsRouter);
app.use("/api/orders", ordersRouter);
app.use("/api/reviews", reviewsRouter);
app.use("/api/auth", require("./routes/authRoutes"));
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
  res.render("error");
});

module.exports = app;
