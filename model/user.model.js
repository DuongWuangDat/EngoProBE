const mongoose = require("mongoose");
const { toJson } = require("./plugin");
const UserSchema = mongoose.Schema(
	{
		username: {
			required: true,
			type: String,
			unique: true,
		},
		email: {
			type: String,
			required: true,
		},
		password: {
			type: String,
			required: true,
		},
		avatar: {
			type: String,
			default:
				"https://ik.imagekit.io/ld11jn6uv/19.png?updatedAt=1730914714341",
		},
		vocabList: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: "Vocab",
			},
		],
	},
	{
		timestamps: true,
	}
);

UserSchema.plugin(toJson);

UserSchema.index({ email: 1 }, { unique: true });
UserSchema.index({ username: 1 }, { unique: true });
const User = mongoose.model("user", UserSchema);

User.isUsernameTaken = async function (username, userId) {
	const user = await this.findOne({ username, _id: { $ne: userId } });
	return user ? true : false;
};

User.isEmailTaken = async function (email, userId) {
	const user = await this.findOne({ email, _id: { $ne: userId } });
	return user ? true : false;
};

module.exports = User;
