const mongoose = require('mongoose');

const routineSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  category: {
    type: String,
    enum: ['Work', 'Health', 'Learning', 'Leisure', 'Other'],
    default: 'Other'
  },
  frequency: {
    type: String,
    enum: ['Daily', 'Weekly', 'Monthly'],
    default: 'Daily'
  },
  timeOfDay: {
    type: String,
    enum: ['Morning', 'Afternoon', 'Evening', 'Anytime'],
    default: 'Anytime'
  },
  completedDates: [{
    type: String, // Storing dates as YYYY-MM-DD
  }],
  createdAt: {
    type: Date,
    default: Date.now,
  }
});

module.exports = mongoose.model('Routine', routineSchema);
