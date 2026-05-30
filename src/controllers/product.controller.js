import asyncHandler from "../middlewares/asyncHandler.js";
import {
	createNewProductService,
	deleteProductService,
	getAllProductsService,
	getProductByIdService,
  updateProductService,
} from "../services/product.service.js";
import ApiResponse from "../utils/apiResponse.js";

export const getAllProducts = asyncHandler(async (req, res) => {
	const products = await getAllProductsService(req);

	return res
		.status(200)
		.json(new ApiResponse(200, "fetched all products", products));
});

export const getProductById = asyncHandler(async (req, res) => {
	const product = await getProductByIdService(req);

	return res
		.status(200)
		.json(new ApiResponse(200, "fetched single product", product));
});

export const createNewProduct = asyncHandler(async (req, res) => {
	const newProduct = await createNewProductService(req);

	return res
		.status(201)
		.json(new ApiResponse(201, "Product created successfully", newProduct));
});

export const updateProduct = asyncHandler(async (req, res) => {
	const updatedProduct = await updateProductService(req);
	return res
		.status(200)
		.json(new ApiResponse(200, "Product updated", updatedProduct));
});

export const deleteProduct = asyncHandler(async (req, res) => {
	await deleteProductService(req);

	return res.status(200).json(new ApiResponse(200, "Product deleted"));
});
