const { default: mongoose } = require("mongoose");
const { toJson } = require("./plugin");


const ExamSchema = mongoose.Schema({
    type: {
        type: String,
        enum: ["IELTS", "TOEIC"],
        default: "IELTS"
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