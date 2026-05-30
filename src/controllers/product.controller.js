import {
	createProduct,
	findAllProduct,
	findAndDelete,
	findAndUpdate,
	findProductById,
} from "../dao/product.dao.js";
import asyncHandler from "../middlewares/asyncHandler.js";
import ApiError from "../utils/apiError.js";
import ApiResponse from "../utils/apiResponse.js";
import {
	createProductValidator,
	productIdOnlyValidator,
	updateProductValidator,
} from "../validators/product.validator.js";

export const getAllProducts = asyncHandler(async (_, res) => {
	const products = await findAllProduct();

	return res
		.status(200)
		.json(new ApiResponse(200, "fetched all products", products));
});

export const getProductById = asyncHandler(async (req, res) => {
	await productIdOnlyValidator(req);

	const { id } = req.params;

	const product = await findProductById(id);
	if (!product) throw new ApiError(404, "Product not found");

	return res
		.status(200)
		.json(new ApiResponse(200, "fetched single product", product));
});

export const createNewProduct = asyncHandler(async (req, res) => {
	//upload images to imagekit.io
	const uploadedFiles = await Promise.all(
		req.files.map((file) => sendFiles(file.buffer, file.originalname)),
	);

	// getting all the urls
	const imageUrls = uploadedFiles.map((file) => file.url);

	const validatedData = await createProductValidator(req);

	const newProduct = await createProduct({
		...validatedData,
		images: imageUrls,
	});

	return res
		.status(201)
		.json(new ApiResponse(201, "Product created successfully", newProduct));
});

export const updateProduct = asyncHandler(async (req, res) => {
	const validatedData = await updateProductValidator(req);
	const { id } = req.params;

	let imageUrls = [];

	// if we have image-files then, upload image to imagekit.io
	if (req.files?.length) {
		const uploadedFiles = await Promise.all(
			req.files.map((file) => sendFiles(file.buffer, file.originalname)),
		);

		imageUrls = uploadedFiles.map((file) => file.url);
	}

	// only add images if we have image-files
	const updatedProduct = await findAndUpdate(id, {
		...validatedData,
		...(imageUrls.length && { images: imageUrls }),
	});

	if (!updatedProduct) throw new ApiError(404, "Product not found");

	return res
		.status(200)
		.json(new ApiResponse(200, "Product updated", updatedProduct));
});

export const deleteProduct = asyncHandler(async (req, res) => {
	await productIdOnlyValidator(req);

	const { id } = req.params;

	const deletedProduct = await findAndDelete(id);

	if (!deletedProduct) throw new ApiError(404, "Product not found");

	return res.status(200).json(new ApiResponse(200, "Product deleted"));
});
