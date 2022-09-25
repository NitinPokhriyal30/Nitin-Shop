import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import productRoutes from "./routes/productsRoutes.js";
import { notFound, errorHandler } from "./middleware/errorMiddleware.js";

dotenv.config();
const app = express();
connectDB();

const port = process.env.PORT

app.get('/', (req, res) => {
    res.json('API running...');
}) 

app.use('/api/products', productRoutes)

app.use(notFound);

app.use(errorHandler);

app.listen(5000, () => {
    console.log(`server is running in ${process.env.NODE_ENV} mode on port ${port}`);
})