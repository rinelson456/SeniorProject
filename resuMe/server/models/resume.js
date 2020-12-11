const mongoose = require('mongoose');

const resumeSchema = mongoose.Schema({
    id: { type: String },
    name: { type: String, required: true },
    date: { type: String },
    role: { type: String },
    description: { type: String },
});

module.exports = mongoose.model('Resume', resumeSchema);