import Auth from "../models/auth.model.js";

export const findByEmail = (email) => {
	return Auth.findOne({ email });
};

export const createNewUser = (data) => {
	return Auth.create(data);
};
