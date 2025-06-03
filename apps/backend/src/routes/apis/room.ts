import { createRoomHandler } from "@/controllers/roomController";
import { Router } from "express";

const router = Router();

router.post("/create", createRoomHandler);

export default router;