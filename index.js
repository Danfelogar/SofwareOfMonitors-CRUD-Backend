const express = require("express");
const app = express();
require('dotenv').config();
const allRoutes = require("./routes");
const path = require('path');
const cors = require('cors');

// It parses incoming requests with JSON payloads
app.use(express.json());

//para que sea valido en todos los localhost
app.use(cors());

// Applying All Routes
app.use(allRoutes);

// static files - archivos estatico-normalemnte en public
app.use(express.static(path.join(__dirname,'../public')));


// Handling Errors

app.use((err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.message = err.message || "Internal Server Error";
  res.status(err.statusCode).json({
    message: err.message,
  });
});


app.listen(process.env.PORT,
  () => console.log(`Server is running on port ${ process.env.PORT }`));