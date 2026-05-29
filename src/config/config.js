import dotenv from "dotenv";

dotenv.config({ quiet: true });

const config = {
	port: process.env.PORT || "",
	mongodb_uri: process.env.MONGODB_URI || "",
	jwt_secret_access: process.env.JWT_SECRET_ACCESS || "",
};

export default config;
