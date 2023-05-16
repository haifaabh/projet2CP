const mongoose = require('mongoose');

const ReservationSchema = new mongoose.Schema({
parent_id: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: 'Parent',
    },
date:{
    type: mongoose.SchemaTypes.String,
},
creche_id:{
    type: mongoose.SchemaTypes.ObjectId,
    ref: 'Creche',
    },
nom_creche:{
        type: mongoose.SchemaTypes.String,
    },  
enfants: {
        prenom: {
          type: mongoose.SchemaTypes.String,
          required: true,
        },
        age: {
          type: mongoose.SchemaTypes.Number,
          required: true,
        },
        unite: {
          type: mongoose.SchemaTypes.String,
          required: true,
        },
},
etat: {
  type: mongoose.SchemaTypes.String,
  default: 'En attente',
},
})
module.exports = mongoose.model('Reservation', ReservationSchema, 'Reservation');
