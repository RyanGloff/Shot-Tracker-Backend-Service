const { Schema, model } = require('mongoose');
const holeSchema = new Schema({
    number: {
        type: Number,
        required: true
    },
    par: {
        type: Number,
        required: true
    },
    location: {
        type: String
    },
    dateAdded: {
        type: Date,
        default: Date.now
    }
});

module.exports = { model: model('Hole', holeSchema), schema: holeSchema };