const mongoose = require('mongoose');

const StreamSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  server: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ['online', 'offline'],
    default: 'online'
  },
  type: {
    type: String,
    enum: ['media source', 'display capture'],
    required: true,
  },
  key: {
    type: String,
    required: true,
  },
  videoSrc: {
    type: String,
    required: true,
  },
  viewer: {
    type: Number,
    default: 0,
  }
  
},{
  timestamps: true,
});

module.exports = mongoose.model('Stream', StreamSchema);
