const { default: mongoose } = require("mongoose");
const { toJson } = require("./plugin");

const CheckQuestionSchema = mongoose.Schema({
    question :{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Question",
        required: true
    },
    userAnswer: {
        type: String,
        required: true
    },
    userAnswerSymbol: {
        type: String,
        maxLength: 1
    },
    isCorrect: {
        type: Boolean,
        default: true
    }
}, {
    timestamps: true
})

CheckQuestionSchema.plugin(toJson)

const CheckQuestion = mongoose.model("checkQuestion", CheckQuestionSchema)

module.exports = CheckQuestion