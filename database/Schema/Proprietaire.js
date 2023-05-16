const mongoose = require('mongoose');
//proprietaire.model.js
const ProprietaireSchema = new mongoose.Schema({
  nom: {
    type: mongoose.SchemaTypes.String,
    },
  
creche:{
  type: mongoose.SchemaTypes.ObjectId,
  ref: 'Creche',
},
  parent: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: 'Parent',
    required: true,
  },
});

module.exports = mongoose.model('Proprietaire', ProprietaireSchema,'Proprietaires');