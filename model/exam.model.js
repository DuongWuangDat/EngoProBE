const mongoose = require('mongoose');
const { toJson } = require('./plugin');

const optionSchema = new mongoose.Schema({
  option: { type: String, required: true }, // A, B, C, or D
  text: { type: String, required: true }
});

const questionSchema = new mongoose.Schema({
  questionNumber: { type: Number, required: true },
  imageUrl: { type: String },
  audioUrl: { type: String },
  questionText: { type: String },
  options: [optionSchema],
  correctAnswer: { type: String, required: true }
});

const partSchema = new mongoose.Schema({
  partNumber: { type: Number, required: true },
  instructions: { type: String, required: true },
  questions: [questionSchema]
});

const toeicTestSchema = new mongoose.Schema({
  testTitle: { type: String, required: true },
  parts: [partSchema]
});

toeicTestSchema.plugin(toJson);

module.exports = mongoose.model('TOEICTest', toeicTestSchema);