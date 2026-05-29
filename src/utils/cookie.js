import config from "../config/config.js";

const cookieOptions = {
	httpOnly: true,
	secure: config.node_env === "production",
	sameSite: config.node_env === "production" ? "none" : "lax",
	maxAge: 60 * 60 * 1000,
};

export default cookieOptions;
