const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 10000;

const allowedOrigins = [
  "http://localhost:3000",
  "https://nightquill-frontend.vercel.app",
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

app.use(express.json());
mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    dbName: "nightquill",
  })
  .then(() => console.log("\n Connected to MongoDB Atlas"))
  .catch((err) => console.error("\n MongoDB connection error:", err));

app.use("/api/auth", require("./routes/auth"));
app.use("/api/posts", require("./routes/posts"));

app.get("/", (req, res) => {
  res.json({
    message: "NightQuill API is alive and whispering your stories...",
  });
});

app.listen(PORT, () => {
  console.log(`\n Server running on port ${PORT}`);
});