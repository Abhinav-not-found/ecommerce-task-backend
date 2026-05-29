import bcrypt from "bcrypt";
import mongoose from "mongoose";

const authModel = mongoose.Schema({
	name: {
		type: String,
		required: [true, "name is required"],
		trim: true,
		lowercase: true,
	},
	email: {
		type: String,
		required: [true, "email is required"],
		trim: true,
		lowercase: true,
		unique: true,
		match: [
			/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
			"Please fill a valid email address",
		],
	},
	password: {
		type: String,
		required: [true, "password is required"],
		minLength: [6, "minimum 6 characters are required"],
	},
});

// automatically hash the password
authModel.pre("save", function () {
	if (!this.isModified("password")) return; // skip hashing if the password is not modified
	this.password = bcrypt.hashSync(this.password, 10);
});

// method used to compare given password with this password(database)
userSchema.methods.comparePassword = function (password) {
	if (!this.password) return false;
	return bcrypt.compareSync(password, this.password);
};

const Auth = mongoose.model("Auth", authModel);

export default Auth;
