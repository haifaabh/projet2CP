const mongoose=require('mongoose');

const conn_str = 'mongodb+srv://lmbouyahiaoui:r4M90OVu8w34q3nz@projet.ahumaky.mongodb.net/PROJET2CP?retryWrites=true&w=majority'
mongoose.connect(conn_str, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("mongodb is connected"))
  .catch(err => console.log("error in connection", err));



module.exports=mongoose;