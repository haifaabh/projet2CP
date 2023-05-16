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
        enum: ['mois', 'ans'],
        required: false,    
    },
    creche:{
   type:mongoose.Schema.Types.ObjectId,
   ref:'Creche',
   required:false,
    }

})
module.exports = mongoose.model('enfants',enfantsSchema,'enfants');