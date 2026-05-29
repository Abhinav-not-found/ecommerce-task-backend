const { Router } = require("express");

const router = Router();

// health check
router.get("/check", (_, res) => {
	res.send("Product route is working");
});

router.get("/");

export default router;
