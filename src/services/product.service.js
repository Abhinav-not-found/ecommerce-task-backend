import sendFiles from "../config/imagekit";
import {
	createProduct,
	findAllProduct,
	findAndDelete,
	findAndUpdate,
	findProductById,
} from "../dao/product.dao";
import ApiError from "../utils/apiError";
import {
	createProductValidator,
	productIdOnlyValidator,
	updateProductValidator,
} from "../validators/product.validator";

export const getAllProductsService = async (req) => {
	const products = await findAllProduct(req.query);
	return products;
};

export const getProductByIdService = async (req) => {
	await productIdOnlyValidator(req);

	const { id } = req.params;

	const product = await findProductById(id);
	if (!product) throw new ApiError(404, "Product not found");

	return product;
};

export const createNewProductService = async (req) => {
	//upload images to imagekit.io
	const uploadedFiles = await Promise.all(
		req.files.map((file) => sendFiles(file.buffer, file.originalname)),
	);

	// getting all the urls
	const imageUrls = uploadedFiles.map((file) => file.url);

	const validatedData = await createProductValidator(req);

	const newProduct = await createProduct({
		...validatedData,
		images: imageUrls,
	});

	return newProduct;
};

export const updateProductService = async (req) => {
	const validatedData = await updateProductValidator(req);
	const { id } = req.params;

	let imageUrls = [];

	if (req.files?.length) {
		// if we have image-files then, upload image to imagekit.io
		const uploadedFiles = await Promise.all(
			req.files.map((file) => sendFiles(file.buffer, file.originalname)),
		);

		imageUrls = uploadedFiles.map((file) => file.url);
	}

	// only add images if we have image-files
	const updatedProduct = await findAndUpdate(id, {
		...validatedData,
		...(imageUrls.length && { images: imageUrls }),
	});

	if (!updatedProduct) throw new ApiError(404, "Product not found");

	return updatedProduct;
};

export const deleteProductService = async (req) => {
	await productIdOnlyValidator(req);

	const { id } = req.params;

	const deletedProduct = await findAndDelete(id);

	if (!deletedProduct) throw new ApiError(404, "Product not found");
};
