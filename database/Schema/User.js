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
  reservations: [{
    type: mongoose.SchemaTypes.ObjectId,
    ref: 'Creche',
  }],
  enfants: [{
    enfant_id: {
      type:mongoose.SchemaTypes.ObjectId,
      ref: 'enfants',
      required: false,
    }
  }],
  Role:{
    type: String,
    default: 'parent'
  },
},{ versionKey: false });

module.exports = mongoose.model('Parent', ParentSchema);


