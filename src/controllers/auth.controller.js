import { createNewUser, findByEmail } from "../dao/auth.dao.js";
import asyncHandler from "../middlewares/asyncHandler.js";
import ApiError from "../utils/apiError.js";
import ApiResponse from "../utils/apiResponse.js";
import cookieOptions from "../utils/cookie.js";
import createToken from "../utils/token.js";
import {
	loginValidator,
	registerValidator,
} from "../validators/auth.validator.js";

export const register = asyncHandler(async (req, res) => {
	const validatedData = await registerValidator(req);

	//check if email already exist
	const checkUserAlreadyExist = await findByEmail(validatedData.email);
	if (checkUserAlreadyExist) throw new ApiError(400, "Email already exist");

	// password hashing is automatically done in model using .pre()

	// make new user
	const user = await createNewUser(validatedData);

	// create token
	const token = createToken(user._id);

	// set cookies
	res.cookie("token", token, cookieOptions);

	const safeUser = user.toObject;
	delete safeUser.password;

	return res
		.status(201)
		.json(new ApiResponse(201, "User created successfully", safeUser));
});

export const login = asyncHandler(async (req, res) => {
	const validatedData = await loginValidator(req);

	//check email
	const user = await findByEmail(validatedData.email);
	if (!user) throw new ApiError(400, "Invalid credentials");

	const verifyPassword = user.comparePassword(validatedData.password);
	if (!verifyPassword) throw new ApiError(400, "Invalid password");

	// create token
	const token = createToken(user._id);

	// set cookies
	res.cookie("token", token, cookieOptions);

	const safeUser = user.toObject();
	delete safeUser.password;

	return res.status(200).json(new ApiResponse(200, "User loggedIn", safeUser));
});

export const logout = asyncHandler(async (_, res) => {
	res.clearCookie("token", cookieOptions);
	res.status(200).json(new ApiResponse(200, "User logged out"));
});
