import { Router } from "express";
import sendFiles from "../config/imagekit.js";
import {
	createNewProduct,
	deleteProduct,
	getAllProducts,
	getProductById,
	updateProduct,
} from "../controllers/product.controller.js";
import authMiddleware from "../middlewares/auth.middleware.js";
import upload from "../middlewares/multer.middleware.js";

const router = Router();

// health check
router.get("/check", (_, res) => {
	res.send("Product route is working");
});

router.post("/upload", upload.array("images", 4), async (req, res, next) => {
	try {
		const files = req.files;

		const uploadedFiles = await Promise.all(
			files.map(async (elem) => {
				return await sendFiles(elem.buffer, elem.originalname);
			}),
		);

		const uploadedUrls = uploadedFiles.map((elem) => elem.url);

		res.send("ok");
	} catch (error) {
		next(error);
	}
});

router.get("/", getAllProducts);
router.get("/:id", getProductById);

router.post("/", authMiddleware, upload.array("images", 4), createNewProduct);
router.put("/:id", authMiddleware, upload.array("images", 4), updateProduct);
router.delete("/:id", authMiddleware, deleteProduct);

export default router;
