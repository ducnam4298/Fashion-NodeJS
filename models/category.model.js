const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const categorySchema = new Schema({
    name: { type: String, required: true, },
    state: { type: String, enum: ['active', 'hidden'], required: true },
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now }
});

categorySchema.index({ name: 1 });

module.exports = mongoose.model('categories', categorySchema);