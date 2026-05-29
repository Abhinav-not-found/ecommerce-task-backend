import { registerValidator } from "../validators/auth.validator.js";

export const register = async (req, res, next) => {
	try {
		const { name, email, password } = await registerValidator(req);
	} catch (error) {
		next(error);
	}
};
