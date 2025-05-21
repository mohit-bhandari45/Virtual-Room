import dotenv from "dotenv";
import express from "express";
import authRoutes from "@/routes/auth";

dotenv.config();

/* Variables */
const app = express();

/* Routes */
app.use(express.json());

app.use("/auth", authRoutes);

export default app;