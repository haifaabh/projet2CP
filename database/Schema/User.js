// parent.model.js

const mongoose = require('mongoose');

const ParentSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  favorites: [{
    type: mongoose.SchemaTypes.ObjectId,
    ref: 'Creche',
  }],
  notifications: [{
    type: String,
  }],
  reservations: [{
    type: mongoose.SchemaTypes.ObjectId,
    ref: 'Creche',
  }],
enfants: [{
      type:mongoose.SchemaTypes.ObjectId,
      ref: 'enfants',
      required: false,
    
  }]

},{ versionKey: false });

module.exports = mongoose.model('Parent', ParentSchema);
