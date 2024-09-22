
const mongooose = require("mongoose")
const { toJson } = require("./plugin")
const SubjectSchema = mongooose.Schema({
    subjectName: {
        type: String,
        required: true
    }
}, {
    timeStamp: true
})

SubjectSchema.plugin(toJson)

const Subject = mongooose.model("subject", SubjectSchema)

module.exports= Subject