const mongoose = require('mongoose');

const RdvSchema = new mongoose.Schema({
parent_id: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: 'Parent',
    },
 date:{
    type: mongoose.SchemaTypes.String,
},
heure_debut:{
    type: mongoose.SchemaTypes.String,
},
heure_fin:{
    type: mongoose.SchemaTypes.String,
},
creche_id:{
    type: mongoose.SchemaTypes.ObjectId,
    ref: 'Creche',
    },
etat: {
    type: mongoose.SchemaTypes.String,
    default: 'En attente',
      },    
})
module.exports = mongoose.model('Rdv', RdvSchema, 'Rdv');