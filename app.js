const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const helmet = require("helmet");

const urlRoutes = require("./routes/urlRoutes");
const authRoutes = require("./routes/authRoutes");
const healthRoutes = require("./routes/healthRoutes");

const app = express();

// 🔥 Test route FIRST
app.get("/", (req, res) => {
    res.send("API is running 🚀");
});

// Middleware
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));
app.use(helmet());

// Routes
app.use("/health", healthRoutes);
app.use("/api/url", urlRoutes);
app.use("/api/auth", authRoutes);

const { redirectUrl } = require("./controllers/urlController");
app.get("/:shortCode", redirectUrl);

const { errorHandler } = require('./middleware/errorMiddleware');

// Error handler
app.use(errorHandler);

module.exports = app;