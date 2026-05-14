const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");

// 🔹 Load env variables
dotenv.config();

const app = express();

// 🔹 Middleware

app.use(cors({
  origin: [ "http://localhost:3000", process.env.FRONTEND_URL, "https://water-management-o141.vercel.app", "http://localhost:3000",  ],
  credentials: true
}));

app.use(express.json());

// 🔹 Routes
const personRoutes = require("./routes/personRoutes");
const usageEntryRoutes = require("./routes/usageEntryRoutes");
const tubewellRoutes = require("./routes/tubewellRoutes");
const seedTubewells = require("./utils/seedTubewells");
const billRoutes = require("./routes/billRoutes");

app.use("/api/persons", personRoutes);
console.log("Registering entry routes...");
app.use("/api/entries", usageEntryRoutes);
app.use("/api/tubewells", tubewellRoutes);

app.use("/api/bills", billRoutes);


// 🔹 Health check
app.get("/", (req, res) => {
  res.send("API is running...");
});

// 🔹 MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(async () => {
    console.log("✅ MongoDB Connected");

    const PORT = process.env.PORT || 5002;
    // await seedTubewells(); // 👈 auto create

    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("❌ MongoDB connection error:", err);
  });