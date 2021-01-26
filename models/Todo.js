const mongoose = require('mongoose');
const { Schema } = mongoose;

const TodosSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ['OPEN', 'ACTIVE', 'DONE'],
      default: 'OPEN',
      required: true,
    },
    user: {
      type: mongoose.Types.ObjectId,
      ref: 'User',
      required: true
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model('Todo', TodosSchema);
