const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const authRoutes = require("./routes/authRoutes");

const app = express();

// Middleware
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

// Use authRoutes with the "/auth" prefix
app.use("/auth", authRoutes);

app.listen(5000, () => console.log("Server running on http://localhost:5000"));
