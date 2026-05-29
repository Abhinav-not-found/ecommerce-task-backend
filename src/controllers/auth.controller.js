import Auth from "../models/auth.model.js";
import { registerValidator } from "../validators/auth.validator.js";

export const register = async (req, res, next) => {
	try {
		const { name, email, password } = await registerValidator(req);
		//check if email already exist
		const checkUserAlreadyExist = await Auth;

    
		// make new user
		// create token
		// set cookies
		// send res
	} catch (error) {
		next(error);
	}
};
