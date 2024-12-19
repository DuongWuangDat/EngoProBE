const mongoose = require("mongoose")
const { toJson } = require("./plugin")

const GroupSchema = mongoose.Schema(
	{
		type: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "ExamType",
			required: true,
		},
		groupName: {
			type: String,
			required: true,
		},
	},
	{
		timestamps: true,
	}
);

GroupSchema.plugin(toJson);

const Group = mongoose.model("Group", GroupSchema);

module.exports = Group;
