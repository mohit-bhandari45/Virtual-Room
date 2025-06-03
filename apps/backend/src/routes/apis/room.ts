import { createRoomHandler, getAllRoomsHandler } from "@/controllers/roomController";
import { Router } from "express";

const router = Router();

router.post("/create", createRoomHandler);
router.get("/me", getAllRoomsHandler);

export default router;