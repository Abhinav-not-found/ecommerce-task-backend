const errorHandler = (err, _, res, __) => {
	const statusCode = err.statusCode || 500;
	const errorMessage = err.message || "Internal server error";

	return res.status(statusCode).json({
		message: errorMessage,
	});
};
export default errorHandler;
