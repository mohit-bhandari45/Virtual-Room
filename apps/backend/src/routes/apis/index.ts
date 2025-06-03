import { Router } from "express";
import roomRouter from "./room";
import { tokenCheckMiddlware } from "@/middleware/auth";

const router = Router();
router.use(tokenCheckMiddlware);

router.use("/rooms", roomRouter);

export default router;