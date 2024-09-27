const { default: mongoose } = require("mongoose");
const { toJson } = require("./plugin");


const ExamSchema = mongoose.Schema({
    type: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "ExamType",
        required: true
    },
    title: {
        type: String,
        required: true
    },
    maxScore: {
        type: Number,
        required: true
    }
}, {
    timestamps: true
})

ExamSchema.plugin(toJson)

const Exam = mongoose.model("Exam", ExamSchema)

module.exports = Exam