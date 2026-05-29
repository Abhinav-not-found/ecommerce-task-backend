import chalk from "chalk";
import mongoose from "mongoose";
import config from "./config.js";

const connectDb = async () => {
	try {
		await mongoose.connect(config.mongodb_uri);
		console.log(chalk.bgGreen("Database connected"));
	} catch (error) {
		console.log("Error connecting to database: ", error);
	}
};

export default connectDb;
