const mongoose = require("mongoose");
const userSchema = new mongoose.Schema(
{
  name: {
    type: String,
  },
	username: {
		type: String,
		required: false,
		trim: true,
	},
	email: {
		type: String,
		required: true,
		trim: true,
	},
	password: {
		type: String,
		required: true,
		trim: true,
	},
},
{ timestamps: true }
);

const User = mongoose.model("user", userSchema);

module.exports = User;