import { createNewUser, findByEmail } from "../dao/auth.dao";
import ApiError from "../utils/apiError";
import { createToken } from "../utils/token";
import {
	loginValidator,
	registerValidator,
} from "../validators/auth.validator";

export const registerService = async (req) => {
	const validatedData = await registerValidator(req);

	//check if email already exist
	const checkUserAlreadyExist = await findByEmail(validatedData.email);
	if (checkUserAlreadyExist) throw new ApiError(409, "Email already exist");

	// password hashing is automatically done in model using .pre()

	// make new user
	const user = await createNewUser(validatedData);

	// create token
	const token = createToken(user._id);
	return {
		token,
		user,
	};
};

export const loginService = async (req) => {
	const validatedData = await loginValidator(req);

	//check email
	const user = await findByEmail(validatedData.email);
	if (!user) throw new ApiError(401, "Invalid credentials");

	const verifyPassword = user.comparePassword(validatedData.password);
	if (!verifyPassword) throw new ApiError(401, "Invalid credentials");

	// create token
	const token = createToken(user._id);

	return {
		token,
		user,
	};
};
