import { Router } from "express";
import roomRouter from "./room";
import userRouter from "./user";
import { tokenCheckMiddlware } from "@/middleware/auth";

const router = Router();
router.use(tokenCheckMiddlware);

router.use("/rooms", roomRouter);
router.use("/user", userRouter);

export default router;