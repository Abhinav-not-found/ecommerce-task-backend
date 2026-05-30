import ImageKit from "imagekit";
import config from "./config.js";

const storageInstance = new ImageKit({
	urlEndpoint: config.imagekit_url_endpoint,
	privateKey: config.imagekit_private_key,
	publicKey: config.imagekit_public_key,
});

const sendFiles = async (file, fileName) => {
	const options = {
		file,
		fileName,
	};

	return await storageInstance.upload(options);
};

export default sendFiles;
