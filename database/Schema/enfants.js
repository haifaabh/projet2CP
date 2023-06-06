const mongoose = require('mongoose');
const enfantsSchema = new mongoose.Schema({
    prenom:{
     type:mongoose.Schema.Types.String,
     required:false,
    },
    age:{
        type:mongoose.Schema.Types.Number,
        required:false,
    },
    unite: {
        type: String,
        enum: ['mois', 'ans'], // Set enum validator to allow only these two values
        required: false,
    },
    creche:{
   type:mongoose.Schema.Types.ObjectId,
   ref:'Creche',
   required:false,
    }

},{ versionKey: false })
module.exports = mongoose.model('enfants',enfantsSchema);