import asyncHandler from "../middlewares/asyncHandler.js";
import Product from "../models/product.model.js";
import ApiError from "../utils/apiError.js";
import ApiResponse from "../utils/apiResponse.js";

export const getAllProducts = asyncHandler(async (_, res) => {
	const products = await Product.find({});

	return res
		.status(200)
		.json(new ApiResponse(200, "fetched all products", products));
});

export const getProductById = asyncHandler(async (req, res) => {
	const { id } = req.params;

	const product = await Product.findById(id);
	if (!product) throw new ApiError(404, "Product not found");

	return res
		.status(200)
		.json(new ApiResponse(200, "fetched single product", product));
});

export const createNewProduct = asyncHandler(async (req, res) => {
	const { name, description, price, category, images } = req.body;

	const newProduct = await Product.create({
		name,
		description,
		price,
		category,
		images,
	});

	return res
		.status(201)
		.json(new ApiResponse(201, "Product created successfully", newProduct));
});

export const updateProduct = asyncHandler(async (req, res) => {
	const { name, description, price, category, images } = req.body;
	const { id } = req.params;

	const updatedProduct = await Product.findByIdAndUpdate(
		id,
		{
			name,
			description,
			price,
			category,
			images,
		},
		{ new: true },
	);

	if (!updatedProduct) {
		throw new ApiError(404, "Product not found");
	}

	return res
		.status(200)
		.json(new ApiResponse(200, "Product updated", updatedProduct));
});

export const deleteProduct = asyncHandler(async (req, res) => {
	const { id } = req.params;

	const deletedProduct = await Product.findByIdAndDelete(id);

	if (!deletedProduct) {
		throw new ApiError(404, "Product not found");
	}

	return res.status(200).json(new ApiResponse(200, "Product deleted"));
});
