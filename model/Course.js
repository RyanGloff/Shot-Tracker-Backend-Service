const Hole = require('./Hole');
console.log(Hole.model);

const { Schema, model } = require('mongoose');
const courseSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    holes: {
        type: [Hole.schema],
        default: []
    },
    location: {
        type: String
    },
    dateAdded: {
        type: Date,
        default: Date.now
    }
});

module.exports = model('Course', courseSchema);