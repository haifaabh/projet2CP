const mongoose = require('mongoose');
const Creche_attenteSchema= new mongoose.Schema({
    nom: {
        type: mongoose.Schema.Types.String,
        required: false,
      },
      localisation: {
        type: mongoose.Schema.Types.String,
        required: false,
      },
      gps: {
        type: mongoose.Schema.Types.String,
        required: false,
      },
      type_accueil: {
        type: mongoose.Schema.Types.String,
        required: false,
      },
      jours_accueil:  [{
        type: mongoose.Schema.Types.String,
        required: false,
      }],
      type_établissement: {
        type: mongoose.Schema.Types.String,
        required: false,
      },
      age_accueil: {
        ageMin : {
        type: mongoose.Schema.Types.Number,
        required: false,
        },
        ageMax : {
            type: mongoose.Schema.Types.Number,
            required: false,
            }
      },
      note_évaluation: {
        type: mongoose.Schema.Types.String,
        required: false,
      },
      pédagogie: {
        type: mongoose.Schema.Types.String,
        required: false,
      },
      langue: [{
        type: mongoose.Schema.Types.String,
        required: false,
      }],
      capacité_accueil: {
        type: mongoose.Schema.Types.Number,
        required: false,
      },
      disponibilité_places: {
        type: mongoose.Schema.Types.Number,
        required: false,
      },
      tél: {
        type: mongoose.Schema.Types.String,
        required: false,
      },
      avis:[{
        username: {
        type: mongoose.Schema.Types.String,
        required: false,
      },
      body: {
        type: mongoose.Schema.Types.String,
        required: false,
      },
      note: {
        type: mongoose.Schema.Types.String,
        required: false,
      },
    }],
    horaire : {
      type : mongoose.Schema.Types.String,
      required : false,
    },
      img: {
        type: mongoose.Schema.Types.String,
        required: false,
      },
      code:{
        type: mongoose.Schema.Types.String,
        required: false,
      }
},{ versionKey: false });

const Creche_attente = mongoose.model('Creche_attente', Creche_attenteSchema, 'Creche_attente');
module.exports = Creche_attente;