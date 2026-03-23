const dotenv = require("dotenv");

// Load environment variables FIRST
dotenv.config();

const connectDB = require("./config/db");
const app = require("./app");

// Connect to Database
connectDB();

const PORT = process.env.PORT || 5000;

// 🔥 IMPORTANT FIX: Bind to 0.0.0.0
const server = app.listen(PORT, "0.0.0.0", () => {
  console.log(
    `Server running in ${process.env.NODE_ENV || "development"} mode on port ${PORT} 🚀`
  );
});

// Handle unhandled promise rejections
process.on("unhandledRejection", (err) => {
  console.error(`Error: ${err.message}`);
  console.log("Shutting down server due to unhandled promise rejection");

  server.close(() => process.exit(1));
});