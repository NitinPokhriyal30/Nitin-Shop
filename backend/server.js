import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import productRoutes from "./routes/productsRoutes.js";
import userRouter from "./routes/userRouter.js";
import adminRoutes from "./routes/adminRoutes.js";
import { notFound, errorHandler } from "./middleware/errorMiddleware.js";

// Handle uncaught exceptions
process.on("uncaughtException", (err) => {
  console.log(`Error: ${err.message}`);
  console.log("Shutting down server due to uncaught exception");
  process.exit(1);
});

// setting up config file
dotenv.config({ path: "backend/utils/.env" });
const app = express();
app.use(express.json());

const port = process.env.PORT;

// Connect to Database
connectDB();

// Import all routes
app.use("/api/products", productRoutes);
app.use("/api/users", userRouter);
app.use("/api/admin", adminRoutes);

app.get("/", (req, res) => {
  res.json("API running...");
});

// Error handling
app.use(notFound);
app.use(errorHandler);

app.listen(5000, () => {
  console.log(
    `server is running in ${process.env.NODE_ENV} mode on port ${port}`
  );
});
