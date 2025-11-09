const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
    maxlength: 100
  },

  content: {
    type: String,
    required: true
  },

  summary: {
    type: String,
    maxlength: 200
  },

  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },

  tags: [{
    type: String,
    trim: true,
    lowercase: true
  }],

  published: {
    type: Boolean,
    default: false
  },

  views: {
    type: Number,
    default: 0
  }

},
{
  timestamps: true
});

// Create index for search
postSchema.index({ title: 'text', content: 'text', summary: 'text' });

module.exports = mongoose.model('Post', postSchema);