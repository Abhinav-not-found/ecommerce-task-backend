import jwt from "jsonwebtoken";
import config from "../config/config.js";
import { createNewUser, findByEmail } from "../dao/auth.dao.js";
import ApiError from "../utils/apiError.js";
import ApiResponse from "../utils/apiResponse.js";
import { registerValidator } from "../validators/auth.validator.js";

export const register = async (req, res, next) => {
	try {
		const validatedData = await registerValidator(req);

		//check if email already exist
		const checkUserAlreadyExist = await findByEmail(validatedData.email);
		if (checkUserAlreadyExist) throw new ApiError(400, "Email already exist");

		// make new user
		const user = await createNewUser(validatedData);

		// create token
		const token = jwt.sign({ id: user._id }, config.jwt_secret, {
			expiresIn: "1h",
		});

		// set cookies
		res.cookies("token", token, {
			httpOnly: true,
			secure: config.node_env === "production",
			sameSite: config.node_env === "production" ? "none" : "lax",
			maxAge: 60 * 60 * 1000,
		});

		return res
			.status(201)
			.json(new ApiResponse(201, "User created successfully", user));
	} catch (error) {
		next(error);
	}
};
