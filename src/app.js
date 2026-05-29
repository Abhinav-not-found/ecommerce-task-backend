import express from "express";
import authRoute from "./routes/auth.route.js";

const app = express();

//middlewares
app.use(express.json());

// health check
app.get("/", (_, res) => {
	res.send("Ecommerce backend is running");
});

// routes
app.use("/api/auth", authRoute);

// global error handler
app.use((err, _, res, __) => {
	const statusCode = err.statusCode || 500;
	const errorMessage = err.message || "Internal server error";

	return res.status(statusCode).json({
		message: errorMessage,
	});
});

export default app;
