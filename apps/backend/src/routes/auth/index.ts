import { loginHandler, signUpHandler } from "@/controllers/authControllers";
import { Router } from "express";

const router = Router();

router.post("/signup", signUpHandler);
router.post("/login", loginHandler);

export default router;