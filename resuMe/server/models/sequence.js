const mongoose = require('mongoose');

const sequenceSchema = mongoose.Schema({
    maxResumeId: { type: Number, required: true }
});

module.exports = mongoose.model('Sequence', sequenceSchema);