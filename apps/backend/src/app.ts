import dotenv from "dotenv";
import express from "express";
import authRouter from "@/routes/auth";
import apiRouter from "@/routes/apis";
import cors from "cors";

dotenv.config();

/* Variables */
const app = express();

/* Routes */
app.use(express.json());
app.use(cors());

app.use("/auth", authRouter);
app.use("/api", apiRouter);

export default app;