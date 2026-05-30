import { body, matchedData, validationResult } from "express-validator";
import mongoose from "mongoose";
import ApiError from "../utils/apiError.js";

const validate = (req) => {
	const errors = validationResult(req);

	if (!errors.isEmpty()) {
		throw new ApiError(400, errors.array()[0].msg);
	}

	return matchedData(req);
};

export const createProductValidator = async (req) => {
	await body("name")
		.trim()
		.notEmpty()
		.withMessage("Product name is required")
		.run(req);

	await body("description")
		.optional()
		.trim()
		.isString()
		.withMessage("Description must be a string")
		.run(req);

	await body("price")
		.notEmpty()
		.withMessage("Price is required")
		.isNumeric()
		.withMessage("Price must be a number")
		.custom((value) => value >= 0)
		.withMessage("Price cannot be negative")
		.run(req);

	await body("category")
		.optional()
		.trim()
		.isString()
		.withMessage("Category must be a string")
		.run(req);

	await body("images.*")
		.optional()
		.isString()
		.withMessage("Images must be an array")
		.run(req);

	return validate(req);
};

export const updateProductValidator = async (req) => {
	const { id } = req.params;

	if (!mongoose.Types.ObjectId.isValid(id)) {
		throw new ApiError(400, "Invalid product id");
	}

	await body("name")
		.optional()
		.trim()
		.notEmpty()
		.withMessage("Name cannot be empty")
		.run(req);

	await body("description")
		.optional()
		.trim()
		.isString()
		.withMessage("Description must be a string")
		.run(req);

	await body("price")
		.optional()
		.isNumeric()
		.withMessage("Price must be a number")
		.custom((value) => value >= 0)
		.withMessage("Price cannot be negative")
		.run(req);

	await body("category")
		.optional()
		.trim()
		.isString()
		.withMessage("Category must be a string")
		.run(req);

	await body("images.*")
		.optional()
		.isString()
		.withMessage("Images must be an array")
		.run(req);

	return validate(req);
};

export const productIdOnlyValidator = async (req) => {
	const { id } = req.params;

	if (!mongoose.Types.ObjectId.isValid(id)) {
		throw new ApiError(400, "Invalid product id");
	}
	return validate(req);
};
