const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const errorHandler = require("./middleware/error.middleware");
const routes = require("./routes");


const app = express();

// Security Middleware
app.use(helmet());

// Enable CORS
app.use(cors());

// Logging
app.use(morgan("dev"));

// Parse JSON
app.use(express.json());

// Parse Form Data
app.use(express.urlencoded({ extended: true }));

app.use("/api/v1", routes);

// Test Route
app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "BuildOps AI Backend Running Successfully",
  });
});

app.use(errorHandler);

module.exports = app;