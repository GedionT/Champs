/* eslint-disable comma-dangle */
const mongoose = require('mongoose');

const { Schema } = mongoose;

const userSchema = new Schema({

  username: {
    type: String, lowercase: true, required: true, match: [/^[a-zA-Z0-9]+$/, 'is invalid'], index: true
  },
  phone: {
    type: String, required: true
  },
  hash: {
    type: String, required: true
  },
  image: { type: String, required: false }
}, {
  timestamps: { createdAt: 'created_at', updatedAt: 'modified_at' }
});

userSchema.set('toJSON', { virtuals: true });

module.exports = mongoose.model('User', userSchema);
