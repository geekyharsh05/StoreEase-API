import dotenv from "dotenv";
import express from "express";
import "express-async-errors";

import { dbConnect } from "./db/dbConnection.js";
import productsRouter from "./routes/products.js";
import { notFoundMiddleware } from "./middleware/not-found.js";
import { errorHandlerMiddleware } from "./middleware/error-handler.js";

dotenv.config();
dbConnect();

const app = express();
const PORT = process.env.PORT ?? 3000;

// Middleware
app.use(express.json());

// Routes
app.get("/", (req, res) => {
  res.send('<h1>StoreEase API</h1><a href="/api/v1/products">products route</a>');
});

app.use("/api/v1/products", productsRouter);

// Error Handling Middleware
app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

app.listen(PORT, () => {
  console.log(`Server is listening on ${PORT}`);
});
