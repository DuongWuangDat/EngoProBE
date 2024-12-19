const mongoose = require('mongoose');
const { toJson } = require('./plugin');
const ExamType = require('./examType.model');

const optionSchema = new mongoose.Schema({
  option: { type: String, required: true },
  text: { type: String, required: true }
});

const questionSchema = new mongoose.Schema({
  questionNumber: { type: Number, required: true },
  imageUrl: { type: String },
  // audioUrl: { type: String },
  questionText: { type: String },
  options: [optionSchema],
  correctAnswer: { type: String, required: true },
  passageType: { type: String },
  paragraphs: { type: Number }
});

const clusterSchema = new mongoose.Schema({
  clusterId: { type: String, required: true },
  imageUrl: { type: String },
  questions: [questionSchema]
});

const partSchema = new mongoose.Schema({
  partNumber: { type: Number, required: true },
  instructions: { type: String, required: true },
  questions: {
    type: [{
      type: mongoose.Schema.Types.Mixed,
      validate: {
        validator: function(question) {
          if ([3, 4, 6, 7].includes(this.parent().partNumber)) {
            // Validate against cluster structure
            return (
              question.clusterId &&
              Array.isArray(question.questions) &&
              question.questions.every(q => 
                q.questionNumber && 
                Array.isArray(q.options) && 
                q.correctAnswer
              )
            );
          }
          // Validate against question structure
          return (
            question.questionNumber && 
            Array.isArray(question.options) && 
            question.correctAnswer
          );
        },
        message: 'Questions must match the part type structure'
      }
    }],
    required: true
  }
});

const examSchema = new mongoose.Schema({
  testId: { type: String, required: true },
  testTitle: { type: String, required: true },
  audioUrl: { type: String },
  parts: [partSchema],
  examType: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'ExamType',
    required: true
  }
}, {
  timestamps: true
});

examSchema.plugin(toJson);

module.exports = mongoose.model('Exam', examSchema);