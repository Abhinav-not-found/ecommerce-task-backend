import jwt from "jsonwebtoken";
import config from "../config/config.js";
import ApiError from "../utils/apiError.js";

const authMiddleware = (req, _, next) => {
	try {
		const token = req.cookies?.token;
		if (!token) throw new ApiError(401, "Unauthorized");

		const decode = jwt.verify(token, config.jwt_secret);

		req.user = decode.id;

		next();
	} catch (error) {
		next(error instanceof ApiError ? error : new ApiError(401, "UnAuthorized"));
	}
};

export default authMiddleware;
