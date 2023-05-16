const {Router} = require('express');
const User = require('../database/Schema/User');
const Creche = require('../database/Schema/Creche');
const Proprietaire = require('../database/Schema/Proprietaire');
const {hashPassword,comparePassword}=require('../utils/helpers');
const Creche_attente = require('../database/Schema/Creche_attente');
const enfants= require('../database/Schema/enfants');
const router = Router();

router.post('/connecter',async (request, response) => {
  const { email, password } = request.body;
  if(!email||!password)
  {
    return response.status(400).send({ msg: 'email et mot de passe sont obligatoires' });
  }
  const userDB = await User.findOne({ email });
  if(!userDB) {
    return response.status(401).send({ msg: 'utilisateur non trouvé' });
  }
  const isValid=comparePassword(password,userDB.password);
  if (isValid) {
    console.log("autenthifié avec succès");
    request.session.user = userDB;
    return response.status(200).send({ msg: 'Connecté avec succès' });
  }
  else {
    console.log("authentification a échoué")
    return response.send(401)}
});

router.post('/inscrire_parent', async (request, response) => {
  const { username, email, password,passwordCheck} = request.body;  
  const userDB = await User.findOne({email});
  if (userDB) {
    response.status(400).send({ msg: 'Ce compte existe déja!' });
  } 
  else if (password !== passwordCheck) {
    response.status(400).send({ msg: 'Les mots de passe ne correspondent pas!' });
  }
  else {
    const password=hashPassword(request.body.password);
    console.log(password);
    response.status(200).send({ msg: 'votre compte a été créé avec succès' });

    let role = 'parent'; // default role is parent  
    // Create a new parent user
    const newParent = await User.create({ username, password, email,role});
    request.session.user = {
      id: newParent._id,
      role: newParent.Role
    };
  }});
  
  router.post('/inscrire_proprietaire', async (request, response) => {
    const {nom, localisation, gps,type_accueil,jours_accueil,type_établissement,age_accueil,note_évaluation,pédagogie,langue,capacité_accueil,disponibilité_places,tél,avis,horaire,img,code}=request.body;
     try{ 
      const parent = await User.findById(request.session.user._id);
      if (!parent) {
        response.status(400).send({ msg: 'Parent not found' });
      }
      parent.Role ='proprietaire';
      const proprietaire = await Proprietaire.create({nom:nom, parent: parent._id });
      if(uniteMin==="ans"){
age_accueil.ageMin=age_accueil.ageMin*12;
      }
      else
      age_accueil.ageMin=age_accueil.ageMin;

      if(uniteMax==="ans"){
        age_accueil.ageMax=age_accueil.ageMax*12;
              }
              else
              age_accueil.ageMax=age_accueil.ageMax;

      const creche_attente= await Creche_attente.create({nom, localisation, gps,type_accueil,jours_accueil,type_établissement,age_accueil,note_évaluation,pédagogie,langue,capacité_accueil,disponibilité_places,tél,avis,horaire,img,code})
      await creche_attente.save();
      console.log('Creche saved:', creche_attente);
      await parent.save();
      response.status(200).send({ msg: 'Proprietaire created successfully', proprietaire });
    } catch (error) {
      console.error(error);
      response.status(500).send({ msg: 'Internal server error' });
    }
  });

  router.post('/deconnecter', (req, res) => {
    req.session.destroy((err) => {
      if (err) {
        console.error(err);
      } else {
        res.clearCookie('connect.sid');// Clear the session cookie
        res.status(200).json({ message: 'Successfully logged out' });
      }
    });
  });
  
  
module.exports = router;
