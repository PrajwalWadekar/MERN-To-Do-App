const mongoose = require("mongoose");

const todoSchema = mongoose.Schema({
    task: String,     
    done: {
        type: Boolean,
        default: false
    }
});

const TodoModel = mongoose.model('todos', todoSchema);  
module.exports = TodoModel;
