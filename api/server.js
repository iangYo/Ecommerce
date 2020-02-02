const compression = require('compression');
const express = require('express');
const ejs = require('ejs');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const morgan = require('morgan');
const cors = require('cors');

const app = express();

// Environment
const isProduction = process.env.NODE_ENV === "production";
const PORT = process.env.PORT || 3000;

// Static Files
app.use("/public", express.static(__dirname + "/public"));
app.use("/public/images", express.static(__dirname + "/public/images"));

// Setup MongoDB
const dbs = require("./setup/database");
const dbURI = isProduction ? dbs.dbProduction : dbs.dbTest;
mongoose.connect(dbURI, { useNewUrlParser: true })
.then(() => console.log('MongoDB Connected'))
.catch((err) => console.log(err));

// Setup EJS
app.set("view engine", "ejs");

// Setup
if (!isProduction) app.use(morgan("dev"));
app.use(cors());
app.disable('x-powered-by');
app.use(compression());

// Setup Body Parser
app.use(bodyParser.urlencoded({ extended: false, limit: 1.5*1024*1024 })); // 1.5Mb
app.use(bodyParser.json({ limit: 1.5*1024*1024 }));

// Models
require("./models");

// Routes
app.use("/", require("./routes"));

// 404 - Route
app.use((req, res, next) => {
   const err = new Error("Not Found");
   err.status = 404;
   next(err);
});

// Routes error
app.use((err, req, res, next) => {
   res.status(err.status || 500);
   if(err.status !== 404) console.warn("Error: ", err.message, new Date());
   res.json({ errors: { message: err.message, status: err.status } });
});

// Listen
app.listen(PORT, (err) => {
   if (err) throw err;
   console.log(`Rodando na //localhost:${PORT}`);
});