import multer from "multer";

const errorHandler = (err, _, res, __) => {
  //if more than 4 files uploaded, then this will handle that error
	if (
		err instanceof multer.MulterError &&
		err.code === "LIMIT_UNEXPECTED_FILE"
	) {
		return res.status(400).json({
			message: "Maximum 4 images are allowed",
		});
	}

	const statusCode = err.statusCode || 500;
	const errorMessage = err.message || "Internal server error";

	return res.status(statusCode).json({
		message: errorMessage,
	});
};
export default errorHandler;
