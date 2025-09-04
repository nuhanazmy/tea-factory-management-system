const express = require("express");
const cors = require("cors");
const app = express();

// Import routes with proper extraction
const { router: authRoutes } = require("./routes/auth");
const teaTypeRoutes = require("./routes/teaTypes");
const dealerRoutes = require("./routes/dealers");
const orderRoutes = require("./routes/orders");
const factoryRoutes = require("./routes/factories");
const reportsRouter = require("./routes/reports");

// Middleware
app.use(cors());
app.use(express.json());

// Route handlers
app.use("/api/auth", authRoutes);
app.use("/api/tea-types", teaTypeRoutes);
app.use("/api/dealers", dealerRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/factories", factoryRoutes);
app.use("/api/reports", reportsRouter);

// Server listener
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
