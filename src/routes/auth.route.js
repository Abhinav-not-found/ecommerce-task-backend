import { Router } from "express";
import { login, logout, register } from "../controllers/auth.controller.js";
import authMiddleware from "../middlewares/auth.middleware.js";

const router = Router();

// health check
router.get("/check", (_, res) => {
	res.send("Auth route is working");
});

router.post("/register", register);
router.post("/login", login);
router.post("/logout", authMiddleware, logout);

export default router;
