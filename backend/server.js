const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();

app.use(cors({ origin: "http://localhost:3000", credentials: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/auth", require("./routes/auth"));
app.use("/api/mentors", require("./routes/mentors")); // ← NEW

app.get("/api/health", (req, res) => {
  res.json({ success: true, message: "SkillConnect API running!" });
});

app.use((err, req, res, next) => {
  console.error("💥 Error:", err.message);
  res.status(500).json({ success: false, message: err.message });
});

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("✅ MongoDB Connected");
    app.listen(process.env.PORT || 5000, () =>
      console.log(
        `🚀 Server running on http://localhost:${process.env.PORT || 5000}`,
      ),
    );
  })
  .catch((err) => {
    console.error("❌", err.message);
    process.exit(1);
  });
