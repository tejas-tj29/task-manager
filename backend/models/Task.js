const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  title: String,
  assignedTo: String,
  status: {
    type: String,
    enum: ['pending', 'In Progress', 'Done'],
    default: 'pending'
  },
  deadline: String
}, { timestamps: true });

module.exports = mongoose.model('Task', taskSchema);