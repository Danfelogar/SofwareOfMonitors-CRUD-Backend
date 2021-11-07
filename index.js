const express = require("express");
const app = express();
require('dotenv').config();
const allRoutes = require("./routes");
const path = require('path');

// It parses incoming requests with JSON payloads
app.use(express.json());

// Applying All Routes
app.use(allRoutes);

// static files - archivos estatico-normalemnte en public
app.use(express.static(path.join(__dirname,'../public')));

// Handling Errors
app.use((err, req, res, next) => {
  // console.log(err);
  err.statusCode = err.statusCode || 500;
  err.message = err.message || "Internal Server Error";
  res.status(err.statusCode).json({
    message: err.message,
  });
});


app.listen(process.env.PORT,
  () => console.log(`Server is running on port ${ process.env.PORT }`));