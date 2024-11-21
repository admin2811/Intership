const mongoose = require('mongoose');

const StreamSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },  
  name: {
    type: String,
    required: true,
  },
  key: {
    type: String,
    required: true,
  },
  videoUrl: {
    type: String,
    required: true 
  }, 
  createdAt: { type: Date, default: Date.now },
},{
  timestamps: true,
});

module.exports = mongoose.model('Stream', StreamSchema);
