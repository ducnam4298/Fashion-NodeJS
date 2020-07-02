const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const transporterSchema = new Schema({
  _id: { type: Number, min: 9, max: 12, required: true },
  name: { type: String, required: true },
  address: { type: String, required: true },
  phone: {
    type: String,
    required: true,
    validate: {
      validator: (v) => {
        return /^[0-9]{10}/.test(v);
      },
      message: props => `${props.value} is not a valid phone`
    }
  },
  email: {
    type: String,
    required: true,
    validate: {
      validator: (v) => {
        return /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z]{2,3}$/.test(v);
      },
      message: props => `${props.value} is not a valid email`
    }
  },
  state: { type: String, enum: ['active', 'hidden'], required: true },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now }
});

transporterSchema.index({ name: 1, phone: 1, role: 1 });

module.exports = mongoose.model('transporters', transporterSchema);