const mongoose=require('mongoose');


mongoose.connect('mongodb+srv://lmbouyahiaoui:r4M90OVu8w34q3nz@projet.ahumaky.mongodb.net/PROJET2CP?retryWrites=true&w=majority', { useNewUrlParser: true,useUnifiedTopology: true})
.then(() =>console.log('connected to the DB '))
.catch((err)=>console.log(err));


module.exports=mongoose;