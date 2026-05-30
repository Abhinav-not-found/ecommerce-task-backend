import asyncHandler from "../middlewares/asyncHandler.js";
import { loginService, registerService } from "../services/auth.service.js";
import ApiResponse from "../utils/apiResponse.js";
import cookieOptions from "../utils/cookie.js";

export const register = asyncHandler(async (req, res) => {
	const { token, user } = await registerService(req);

	// set cookies
	res.cookie("token", token, cookieOptions);

	const safeUser = user.toObject();
	delete safeUser.password;

	return res
		.status(201)
		.json(new ApiResponse(201, "User created successfully", safeUser));
});

export const login = asyncHandler(async (req, res) => {
	const { token, user } = await loginService(req);
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
