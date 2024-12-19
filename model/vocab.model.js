const mongoose = require("mongoose")
const { toJson } = require("./plugin")
const VocabSchema = mongoose.Schema(
	{
		englishWord: {
			type: String,
			required: true,
		},
		definition: {
			type: String,
			required: true,
		},
		wordType: {
			type: String,
			required: true,
		},
		example: [
			{
				type: String,
				required: true,
			},
		],

		subject: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "Subject",
			required: true,
		},
	},
	{
		timestamps: true,
	}
);

VocabSchema.plugin(toJson)

const Vocab = mongoose.model("vocab", VocabSchema)

module.exports= Vocab