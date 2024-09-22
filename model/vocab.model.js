const mongoose = require("mongoose")
const { toJson } = require("./plugin")
const VocabSchema = mongoose.Schema({
    englishWord: {
        type: String,
        required: true
    },
    vietnameseWord: {
        type: String,
        required: true
    },
    subject: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Subject",
        required: true
    }
}, {
    timestamps: true
})

VocabSchema.plugin(toJson)

const Vocab = mongoose.model("vocab", VocabSchema)

module.exports= Vocab