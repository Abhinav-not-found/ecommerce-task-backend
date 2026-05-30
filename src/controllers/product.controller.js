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
	const validatedData = await createProductValidator(req);

	const newProduct = await createProduct(validatedData);

	return res
		.status(201)
		.json(new ApiResponse(201, "Product created successfully", newProduct));
});

export const updateProduct = asyncHandler(async (req, res) => {
	const validatedData = await updateProductValidator(req);
	const { id } = req.params;

	const updatedProduct = await findAndUpdate(id, validatedData);

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
