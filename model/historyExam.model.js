const mongoose = require('mongoose');
const { toJson } = require('./plugin');

const historyExamSchema = new mongoose.Schema({
  exam: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Exam',
    required: true
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  checkQuestions: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'CheckQuestion'
  }],
  score: {
    type: Number,
    required: true
  },
  totalQuestions: {
    type: Number,
    required: true
  },
  totalAnswered: {
    type: Number,
    required: true
  },
  correctAnswers: {
    type: Number,
    required: true
  },
  duration: {
    type: Number,
    default: 0
  },
  turn: {
    type: Number,
    required: true
  }
}, {
  timestamps: true
});

// Create compound index for efficient querying
historyExamSchema.index({ exam: 1, user: 1, turn: 1, createdAt: -1 });

historyExamSchema.plugin(toJson);

module.exports = mongoose.model('HistoryExam', historyExamSchema);
