import express from "express";
import dotenv from "dotenv";
import CartRoute from "./api/routes/v1/CartRoute";
import ProductRoute from "./api/routes/v1/ProductRoute";
import cors from "cors";
import AuthRoute from "./api/routes/v1/AuthRoute";

dotenv.config();

const app = express();

app.use(express.json());

app.use(
  cors({
    origin: "http://localhost:3004",
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.get("/health", (_req, res) => {
  res.status(200).json({
    status: "UP",
    message: "BFF is healthy",
    timestamp: new Date().toISOString(),
  });
});

app.use("/bff/api/v1", AuthRoute.router);
app.use("/bff/api/v1", CartRoute.router);
app.use("/bff/api/v1", ProductRoute.router);

app.use((_req, res) => {
  res.status(404).json({ message: "Route not found" });
});

export default app;
