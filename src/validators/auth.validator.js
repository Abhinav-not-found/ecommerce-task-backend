import { body, matchedData, validationResult } from "express-validator";

import ApiError from "../utils/apiError.js";

export const registerValidator = async (req) => {
	await body("name").trim().notEmpty().withMessage("Name is required").run(req);

	await body("email")
		.trim()
		.toLowerCase()
		.isEmail()
		.withMessage("Invalid email")
		.normalizeEmail()
		.run(req);

	await body("password")
		.isLength({ min: 6 })
		.withMessage("Password must be at least 6 characters")
		.run(req);

	const errors = validationResult(req);

	if (!errors.isEmpty()) {
		throw new ApiError(400, "Validation failed");
	}

	return matchedData(req);
};
