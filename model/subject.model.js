
const mongoose = require("mongoose")
const { toJson } = require("./plugin")
const SubjectSchema = mongoose.Schema({
    subjectName: {
        type: String,
        required: true
    }
}, {
    timeStamp: true
})

SubjectSchema.plugin(toJson)

const Subject = mongoose.model("subject", SubjectSchema)

module.exports= Subject