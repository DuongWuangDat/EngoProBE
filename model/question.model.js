const mongooose = require("mongoose")
const { toJson } = require("./plugin")

const QuestionSchema= mongooose.Schema({
    question: {
        required: true,
        type: String
    },
    answers: [
        {
            required: true,
            type: mongooose.Schema.Types.ObjectId,
            ref: "Answer"
        }
    ]
}, {
    timestamps: true
})

QuestionSchema.plugin(toJson)

const Question = mongooose.model("question", QuestionSchema)

module.exports = Question