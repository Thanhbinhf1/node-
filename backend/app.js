require("dotenv").config(); // Khởi tạo dotenv lên đầu tiên
var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var mongoose = require("mongoose");
var cors = require("cors");

const DB_URI = process.env.MONGODB_URI || "mongodb://localhost:27017/NoiThat";
mongoose
  .connect(DB_URI)
  .then(() => console.log("Kết nối cơ sở dữ liệu thành công!"))
  .catch((err) => console.log("Kết nối cơ sở dữ liệu thất bại:", err));

var app = express();

// Cấu hình CORS để Frontend gọi API không bị lỗi
app.use(
  cors({
    origin: "*",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true,
  }),
);

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "hbs");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

// Routes
app.use("/api/users", require("./routes/users"));
app.use("/api/categories", require("./routes/categoriesRoutes"));
app.use("/api/products", require("./routes/productRoutes"));
app.use("/api/bills", require("./routes/billsRoutes"));
app.use("/api/coupons", require("./routes/couponRoutes"));
app.use("/api/orders", require("./routes/orderRoutes"));
app.use("/api/reviews", require("./routes/reviewRoutes"));
app.use("/api/auth", require("./routes/authRoutes"));

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
