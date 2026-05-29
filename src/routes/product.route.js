import { Router } from "express";
import {
	createNewProduct,
	deleteProduct,
	getAllProducts,
	getProductById,
	updateProduct,
} from "../controllers/product.controller.js";
import authMiddleware from "../middlewares/auth.middleware.js";

const router = Router();

// health check
router.get("/check", (_, res) => {
	res.send("Product route is working");
});

router.get("/", getAllProducts);
router.get("/:id", getProductById);

router.post("/", authMiddleware, createNewProduct);
router.put("/:id", updateProduct);
router.delete("/:id", authMiddleware, deleteProduct);

export default router;
