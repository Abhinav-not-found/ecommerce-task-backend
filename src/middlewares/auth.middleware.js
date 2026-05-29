import ApiError from "../utils/apiError.js";
import { verifyToken } from "../utils/token.js";

const authMiddleware = (req, _, next) => {
	try {
		const token = req.cookies?.token;
		if (!token) throw new ApiError(401, "Unauthorized");

		const decode = verifyToken(token);

		req.user = decode.id;

		next();
	} catch (error) {
		next(error instanceof ApiError ? error : new ApiError(401, "UnAuthorized"));
	}
};

export default authMiddleware;
