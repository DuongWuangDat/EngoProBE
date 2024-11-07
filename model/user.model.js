const mongooose = require("mongoose");
const { toJson } = require("./plugin");
const UserSchema = mongooose.Schema(
	{
		username: {
			required: true,
			type: String,
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
				type: mongooose.Schema.Types.ObjectId,
				ref: "Vocab",
			},
		],
	},
	{
		timestamps: true,
	}
);

UserSchema.plugin(toJson);

const User = mongooose.model("user", UserSchema);

module.exports = User;
