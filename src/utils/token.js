import jwt from "jsonwebtoken";
import config from "../config/config.js";

const createToken = (id) => {
	return jwt.sign({ id: id }, config.jwt_secret, {
		expiresIn: "1h",
	});
};

export default createToken;
