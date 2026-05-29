import dotenv from "dotenv";

dotenv.config({ quiet: true });

const config = {
	port: process.env.PORT || "",
	mongodb_uri: process.env.MONGODB_URI || "",
	jwt_secret: process.env.JWT_SECRET || "",
	node_env: process.env.NODE_ENV || "",
};

export default config;
