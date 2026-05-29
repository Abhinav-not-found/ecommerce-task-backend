class ApiError extends Error {
	constructor(statusCode, message) {
		super(statusCode);

		this.statusCode = statusCode;
		this.message = message;
	}
}

export default ApiError;
