import { createNewUser, findByEmail } from "../dao/auth.dao.js";
import ApiError from "../utils/apiError.js";
import ApiResponse from "../utils/apiResponse.js";
import cookieOptions from "../utils/cookie.js";
import createToken from "../utils/token.js";
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
		const token = createToken(user._id);

		// set cookies
		res.cookies("token", token, cookieOptions);

		return res
			.status(201)
			.json(new ApiResponse(201, "User created successfully", user));
	} catch (error) {
		next(error);
	}
};
