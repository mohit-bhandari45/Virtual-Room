import { loginHandler, signUpHandler } from "@/controllers/authControllers";
import { Router } from "express";
import passport from "passport";
import { encode } from "@/utils/jwt";

const router = Router();

router.post("/signup", signUpHandler);
router.post("/login", loginHandler);

router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

router.get(
  "/google/callback",
  passport.authenticate("google", { failureRedirect: "/auth/google/failure", session: false }),
  (req, res) => {
    const user = req.user;
    if (!user) {
      return res.redirect("/auth/google/failure");
    }
    const token = encode(user as any);
    res.redirect(`${process.env.GOOGLE_SUCCESS_REDIRECT}?token=${token}`);
  }
);

router.get("/google/failure", (req, res) => {
  res.status(401).json({ msg: "Google authentication failed" });
});

export default router;