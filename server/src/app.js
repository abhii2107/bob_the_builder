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
const allowedOrigins = [
  "http://localhost:5173",
  "https://buildops-tawny.vercel.app",
  "https://buildops-git-main-abhii2107s-projects.vercel.app",
  "https://buildops-qej96dfip-abhii2107s-projects.vercel.app",
];

app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests with no origin, such as Postman/server-to-server requests
      if (!origin) {
        return callback(null, true);
      }

      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      }

      // Allow Vercel preview deployments
      if (
        origin.endsWith(".vercel.app")
      ) {
        return callback(null, true);
      }

      return callback(
        new Error("Not allowed by CORS")
      );
    },
    methods: [
      "GET",
      "POST",
      "PUT",
      "PATCH",
      "DELETE",
      "OPTIONS",
    ],
    allowedHeaders: [
      "Content-Type",
      "Authorization",
    ],
    credentials: true,
  })
);
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