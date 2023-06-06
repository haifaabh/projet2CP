const mongoose = require('mongoose');
//proprietaire.model.js
const ProprietaireSchema = new mongoose.Schema({
  nom : {
    type : mongoose.SchemaTypes.String
  },
  creche: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: 'Creche',
    },
  parent: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: 'Parent',
    required: true,
  },
  createdAt: {
    type: Date,
    required: true, 
    default: Date.now(),  
  },
},{ versionKey: false });

module.exports = mongoose.model('Proprietaire', ProprietaireSchema , 'Proprietaires');