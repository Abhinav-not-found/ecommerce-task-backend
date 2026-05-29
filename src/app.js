import cookieParser from "cookie-parser";
import express from "express";
import morgan from "morgan";
import authRoute from "./routes/auth.route.js";
import productRoute from "./routes/product.route.js";

const app = express();

//middlewares
app.use(express.json());
app.use(morgan("dev"));
app.use(cookieParser());

// health check
app.get("/", (_, res) => {
	res.send("Ecommerce backend is running");
});

// routes
app.use("/api/auth", authRoute);
app.use("/api/products", productRoute);

// global error handler
app.use((err, _, res, __) => {
	const statusCode = err.statusCode || 500;
	const errorMessage = err.message || "Internal server error";

	return res.status(statusCode).json({
		message: errorMessage,
	});
});

export default app;
