const {Router} = require('express');
const User = require('../database/Schema/User');
const Creche = require('../database/Schema/Creche');
const Proprietaire = require('../database/Schema/Proprietaire');
const {hashPassword,comparePassword}=require('../utils/helpers');
const Creche_attente = require('../database/Schema/Creche_attente');
const enfants= require('../database/Schema/enfants');
const router = Router();

//route pour la connexion de l utilisateur
router.post('/connecter',async (request, response) => {
  const { email, password } = request.body;
  if(!email||!password)  // verifier si l email et mot de passe sont present
  {
    return response.status(400).send({ msg: 'email et mot de passe sont obligatoires' });
  }
  const userDB = await User.findOne({ email }); // trouver l utilisateur avec son email
  if(!userDB) {
    return response.status(401).send({ msg: 'Utilisateur introuvable' });
  }
  const isValid=comparePassword(password,userDB.password); //comparer le mot de passe pour verifier si il est correcte
  if (isValid) {
    console.log("autenthifié avec succès");
    request.session.user = userDB;            // creer une session
    return response.status(200).send({ msg: 'Connecté avec succès' });
  }
  else {
    console.log("authentification a échoué")
    return response.status(401).send({msg : 'Mot de passe incorrect'})}

});

//inscription compte utilisateur
router.post('/inscrire', async (request, response) => {
   const { username, email, password, isOwner,enfants } = request.body;  //isOwner =responsable
  const userDB = await User.findOne({email});
  if (userDB) {
    response.status(400).send({ msg: 'Ce compte existe déja!' });
  } else {
    const password=hashPassword(request.body.password);  //hacher le mot de passe de l utilisateur
    console.log(password);
  
    // Create a new parent user
    const newParent = await User.create({ username, password, email,enfants });
    if (!isOwner) {
      parent = newParent._id;
      await newParent.save();
    }
 // Create a new propriétaire user
    if (isOwner) { // verify if the user is owner (propriétaire)
      parent = newParent._id;
      const {nom, localisation, gps,type_accueil,jours_accueil,type_établissement,age_accueil,note_évaluation,pédagogie,langue,capacité_accueil,disponibilité_places,tél,avis,horaire,img,code}=request.body;
      const creche_attente= await Creche_attente.create({nom, localisation, gps,type_accueil,jours_accueil,type_établissement,age_accueil,note_évaluation,pédagogie,langue,capacité_accueil,disponibilité_places,tél,avis,horaire,img,code})
      await creche_attente.save();

      const crecheDb= await Creche.create({nom, localisation, gps,type_accueil,jours_accueil,type_établissement,age_accueil,note_évaluation,pédagogie,langue,capacité_accueil,disponibilité_places,tél,avis,horaire,img});
      await crecheDb.save();

      console.log('Creche saved:', creche_attente);
    
      // Create a proprietaire
   const {agenda}=request.body;
   const proprietaire= await Proprietaire.create({creche_attente ,agenda, parent});
   console.log(Proprietaire)
      await proprietaire.save();
      const msg = proprietaire ? 'Enregistré avec succès en tant que propriétaire' : 'Enregistré avec succès';
      }
    // Save the new parent and propriétaire users to the database
    await newParent.save();


  response.status(200).send({ msg: 'votre compte a été créé avec succès' });
  }
});

//inscription compte parent
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
    const newParent = await User.create({ username, password, email});
    request.session.user = {
      id: newParent._id,
      role: newParent.Role
    };
  }});

//incription compte proprietaire
  router.post('/inscrire_proprietaire', async (request, response) => {
    const {nom, localisation, gps,type_accueil,jours_accueil,type_établissement,age_accueil,note_évaluation,pédagogie,langue,capacité_accueil,disponibilité_places,tél,avis,horaire,img,code}=request.body;
     try{ 
      const parent = await User.findById(request.session.user._id); //rechercher l utilisateur dans la liste des parents
      if (!parent) {
        response.status(400).send({ msg: 'Parent not found' });
      }
      parent.Role ='proprietaire';  // modifier son role a un proprietaire
      const proprietaire = await Proprietaire.create({nom:nom, parent: parent._id }); //creer le doc de proprietaire
      const creche_attente= await Creche_attente.create({nom, localisation, gps,type_accueil,jours_accueil,type_établissement,age_accueil,note_évaluation,pédagogie,langue,capacité_accueil,disponibilité_places,tél,avis,horaire,img,code})
      await creche_attente.save();           //sauvgarder la creche dans les creches en attentes
      console.log('Creche saved:', creche_attente);
      await parent.save();  
      response.status(200).send({ msg: 'Proprietaire created successfully', proprietaire });
    } catch (error) {
      console.error(error);
      response.status(500).send({ msg: 'Internal server error' });
    }
  });

//decconexion
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
