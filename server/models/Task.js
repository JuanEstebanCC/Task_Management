const { Schema, model } = require('mongoose');

const taskSchema = new Schema(
  {
    _id: { type: Schema.ObjectId },
    taskImage: String,
    taskName: String,
    priority: {
        type: Number,
        enum: [1,2,3],
    },
    expDate: { type: String, default: Date } 
  }
);

module.exports = model('Task', taskSchema);
