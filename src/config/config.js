import dotenv from "dotenv";

dotenv.config({ quiet: true });

const config = {
	port: process.env.PORT || "",
	mongodb_uri: process.env.MONGODB_URI || "",
	jwt_secret: process.env.JWT_SECRET || "",
	node_env: process.env.NODE_ENV || "",
	imagekit_public_key: process.env.IMAGEKIT_PUBLIC_KEY || "",
	imagekit_private_key: process.env.IMAGEKIT_PRIVATE_KEY || "",
	imagekit_url_endpoint: process.env.IMAGEKIT_URL_ENDPOINT || "",
};

export default config;
