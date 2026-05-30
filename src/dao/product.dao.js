import Product from "../models/product.model.js";

export const findAllProduct = (query) => {
	const filter = {};
	if (query.category) {
		filter.category = query.category;
	}
	return Product.find(filter);
};

export const findProductById = (id) => {
	return Product.findById(id);
};

export const createProduct = (data) => {
	return Product.create(data);
};

export const findAndUpdate = (id, data) => {
	return Product.findByIdAndUpdate(id, data, {
		new: true,
		runValidators: true,
	});
};

export const findAndDelete = (id) => {
	return Product.findByIdAndDelete(id);
};
