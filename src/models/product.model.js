import mongoose from "mongoose";

const productSchema = mongoose.Schema(
	{
		name: {
			type: String,
			required: [true, "Name is required"],
			trim: true,
			lowercase: true,
		},
		description: {
			type: String,
			trim: true,
		},
		price: {
			type: Number,
			required: [true, "Price is required"],
			min: [0, "Price cannot be negative"],
		},
		category: {
			type: String,
			trim: true,
			lowercase: true,
		},
		images: [
			{
				type: String,
			},
		],
	},
	{
		timestamps: true,
	},
);

const Product = mongoose.model("Product", productSchema);

export default Product;
