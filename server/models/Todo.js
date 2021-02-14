const {Schema, model} = require('mongoose');


const todoSchema = new Schema({
    image: String,
    name: String,
    priority: Number,
    exp_date: Date
})

module.exports = model('Todo', todoSchema);