import dotenv from "dotenv";
import express from "express";
import authRouter from "@/routes/auth";
import apiRouter from "@/routes/apis";
import cors from "cors";
import http from "http";
import setupSocketIO from "./socket";
import os from "os";

dotenv.config();

/* Variables */
const app = express();
const server = http.createServer(app);
setupSocketIO(server);

/* Routes */
app.get("/", (req, res): void => {
  const up = Math.floor(os.uptime() / 3600);
  const totalMem = os.totalmem() / (1024 * 1024 * 1024);
  const freeMem = os.freemem() / (1024 * 1024 * 1024);
  const usedMem = totalMem - freeMem;

  const memUsagePercent = (usedMem / totalMem) * 100;
  const cpuLoad = os.loadavg()[0];

  const serverStatus = {
    msg: "Server is up and running",
    uptime: up + "Hrs",
    memory: {
      totalMemory: totalMem.toFixed(2) + "GiB",
      usedMemory: usedMem.toFixed(2) + "GiB",
      freeMemory: freeMem.toFixed(2) + "GiB",
      memoryUsagePercentage: memUsagePercent.toFixed(2) + "%",
    },
    cpu: {
      load: cpuLoad,
    },
    platform: os.platform(),
    arch: os.arch(),
    hostname: os.hostname(),
  };

  res.json(serverStatus);
});

app.use(express.json());
app.use(cors());

app.use("/auth", authRouter);
app.use("/api", apiRouter);

export default server;