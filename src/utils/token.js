import jwt from "jsonwebtoken";
import config from "../config/config.js";

export const createToken = (id) => {
	return jwt.sign({ id: id }, config.jwt_secret, {
		expiresIn: "1h",
	});
};

export const verifyToken = (token) => {
	return jwt.verify(token, config.jwt_secret);
};
