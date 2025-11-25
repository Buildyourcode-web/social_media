const dotenv = require('dotenv');
dotenv.config();

const express = require('express');
const cors = require('cors');
const requestLogger = require('./middleware/requestLogger');
const errorHandler = require('./middleware/errorHandler');
const routes = require('./routes/index');

const connectDb = require('./config/db');

// rest object
const app = express();

// middlewares
app.use(cors());
app.use(express.json());
app.use(requestLogger);
app.use("/uploads", express.static("uploads"));

// routes
routes.forEach(({ path, router }) => {
  app.use(`/api${path}`, router);
});

// port
const PORT = process.env.port || 4000;

// database
connectDb().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on PORT ${PORT}`);
  });
});

// catch undefined routes
// app.use((req, res, next) => {
//   const err = new Error(`Not Found - ${req.originalUrl}`);
//   err.status = 404;
//   next(err);
// });

// error handler
app.use(errorHandler);

// test route
app.get("/", (req, res) => {
  res.send("Server running successfully");
});