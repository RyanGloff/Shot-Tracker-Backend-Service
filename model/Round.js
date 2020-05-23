const { Schema, model } = require('mongoose');
const roundSchema = new Schema({
    user: {
        type: String,
        required: true
    },
    course: {
        type: String,
        required: true
    }
});

module.exports = model('Round', roundSchema);