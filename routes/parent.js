const express = require('express');

const { hashPassword, comparePassword } = require('../utils/helpers');
const Rdv = require('../database/Schema/Rdv');
const Creche = require('../database/Schema/Creche');
const User =  require('../database/Schema/User');
const Reservation = require('../database/Schema/Reservation');
const enfants = require('../database/Schema/enfants');
const { create } = require('../database/Schema/Creche');

const router = express.Router();

router.use( async (req, res, next) => {
  const user = req.session.user;
  if (!user || (user.Role !== 'parent' && user.Role !== 'proprietaire')) {
    return res.status(401).send({ msg: 'Vous n\'êtes pas autorisé à accéder à cette page.' });
  }
  next();
});

router.get('/parents', async (req, res) => {    
  try {
    if (!req.session.user) 
      {
        return res.status(401).send('Accès non autorisé !!');
      }
    const user = await User.findById(req.session.user);
    const parent = { 
      username: user.username, 
      email: user.email,  
    };
    res.status(200).json(parent);
  } catch (error) {
    console.error(error);
    res.status(500).send('Erreur dans le serveur');
  }
});

router.put('/modifier_profil', async (req, res) => {  
  try {
    if (!req.session.user) {
      return res.status(401).send('Accès non autorisé !');
    }
    const user = await User.findById(req.session.user);
    user.username = req.body.username || user.username;
    user.email = req.body.email || user.email;
    user.password = hashPassword(req.body.password) || user.password;
    await user.save();
    res.status(200).send('Le profil a été mis à jour avec succès !');
  } catch (error) {
    console.error(error);
    res.status(500).send('Erreur dans le serveur');
  }
});

router.post('/prendre_rdv/:id', async (req, res) => {
  try {
   
    const creche = await Creche.findById(req.params.id);
    if (!creche) {
      return res.status(404).send('creche non trouvée !');
    }
    // Create a new Rdv document with the extracted creche_id
    const newRdv = new Rdv({
      parent_id: req.session.user._id,
      date: req.body.date,
      heure_debut: req.body.heure_debut,
      heure_fin: req.body.heure_fin,
      creche_id: creche._id
    });
    
    //creer le doc dans la bdd
    const rdv=await Rdv.create(newRdv);
    //await newRdv.save();
    res.status(201).send('votre rendez_vous est créer !');
  } catch (error) {
    console.error(error);
    res.status(500).send('erreur dans le serveur');
  }
});

router.delete('/annuler_rdv/:id', async (req, res) => {
  try {
    if (!req.session.user) 
    {
      return res.status(401).send('Accès non autorisé !!');
    }
    const rdv = await Rdv.findById(req.params.id);
    if (!rdv) {
      return res.status(404).send('Rendez-vous non trouvé !');
    }
    if(rdv.parent_id.toString() !== req.session.user._id)
    {
      return res.status(401).send('Vous ne pouvez pas annuler ce rendez-vous');
    }
    await Rdv.deleteOne({ _id: rdv._id });
    return res.status(200).send('Le rendez-vous a été annulé avec succès !');
    
  } catch (error) {
    console.error(error);
    res.status(500).send('Erreur dans le serveur');
  }
});

router.delete('/reservation/:id', async (req, res) => {   
  try {
    const reservation = await Reservation.findById(req.params.id);
    if (!reservation) {
      return res.status(404).send('Réservation non trouvée !');
    }
    if(reservation.parent_id.toString() !== req.session.user._id)
    {
      return res.status(401).send('Vous ne pouvez pas annuler ce rendez-vous');
    }
    await Reservation.deleteOne({ _id: reservation._id });
    res.status(200).send('La réservation a été supprimée avec succès !');
  } catch (error) {
    console.error(error);
    res.status(500).send('Erreur dans le serveur');
  }
});

router.post('/reserver/:id', async (req, res) => {
  try {
    // Find the creche document with the id
    const creche = await Creche.findById(req.params.id);
    const nom=creche.nom;
    if (!creche) {
      return res.status(404).send('creche non trouvée !');
    }

    const enfant = await enfants.findOne({
      prenom: req.body.enfants.prenom,
      age: req.body.enfants.age
    });
    if (!enfant) {
      return res.status(404).send('Enfant non trouvé !');
    }

 const parent = await User.findById(req.session.user._id);
 if (!parent) {
      return res.status(404).send('Parent non trouvé !');
  }
const enfantId = enfant._id;
if (parent.enfants.includes(enfantId)){ 
  
    const newReservation = new Reservation({
      parent_id: req.session.user._id,
      date: req.body.date,
      nom_creche:nom,
      creche_id: creche._id,
      enfants:req.body.enfants
    });
    //creer le doc dans la bdd
    const reservation=await Reservation.create(newReservation);
    
       // Update the parent document with the new reservation ID
       const parent = await User.findOneAndUpdate(
        { _id: req.session.user._id},
        { $addToSet: { reservations: reservation._id } },
        { new: true }
      );

    res.status(201).send('votre reservation est créer !');
}
else {
  return res.status(400).send("Vous n'avez pas cet enfant dans votre liste d'enfants !");
}
  } catch (error) {
    console.error(error);
    res.status(500).send('erreur dans le serveur');
  }
});

router.get('/afficher_reservations', async (req, res) => 
{
  try {
    // Get the parent ID from the session
    const parentId = req.session.user._id;
    // Find all reservations for the parent ID, selecting only the fields you want to include
    const reservations = await Reservation.find({ parent_id: parentId }).select('date nom_creche enfants -_id');

    // Send the reservations as a JSON response
    res.json(reservations);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
});

router.get('/afficher_Rdv', async (req, res) => {
  try {
    // Get the parent ID from the session
    const parentId = req.session.user._id;
    const rdv = await Rdv.find({ parent_id: parentId }).select('date heure_debut heure_fin creche_id etat -_id');

    const rdvWithCreche = await Promise.all(rdv.map(async (rdvItem) => {
      const creche = await Creche.findById(rdvItem.creche_id);
      const nom_creche = creche.nom;
      return {
        date: rdvItem.date,
        heure_debut: rdvItem.heure_debut,
        heure_fin: rdvItem.heure_fin,
        etat: rdvItem.etat,
        nom_creche
      };
    }));
    res.json(rdvWithCreche);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
});

router.post('/creches/:id/commenter',async (req,res)=>
{
  if (!req.session.user) 
  {
    return res.status(401).send('Accès non autorisé !!');
  }
  const {id} = req.params;
  const user = await User.findById(req.session.user);
  const username = user.username;
  const {body,note}=req.body;
  const avi = { username, body, note };
  try 
  {
    const crecheDb = await Creche.findById(id);
    crecheDb.avis.push(avi);
    await crecheDb.save();
    res.status(200).send("Commentaire ajouté avec succès !! ");
  } 
  catch (error) 
  {
    console.error(error);
    res.status(500).send('erreur dans le serveur');
  }
});

router.delete('/creches/:id/sup_commentaire/:index', async (req, res) => {
  const { id, index } = req.params;
  try {
    const crecheDb = await Creche.findById(id);
    if (!crecheDb) {
      return res.status(404).send("La crèche n'existe pas");
    }
    if (index < 0 || index >= crecheDb.avis.length) {
      return res.status(400).send("L'index du commentaire est invalide");
    }
    crecheDb.avis.splice(index, 1);
    await crecheDb.save();
    res.status(200).send('Commentaire supprimé avec succès');
  } catch (error) {
    console.error(error);
    res.status(500).send('Erreur dans le serveur');
  }
});

router.get('/favoris',async (req,res)=>
{
  if (!req.session.user) 
  {
    return res.status(401).send('Accès non autorisé !!');
  }
  const user = await User.findById(req.session.user).populate('favorites');
  const favorites = user.favorites.map((favorite) => favorite.toObject());
  res.status(200).send(favorites);
});

router.post('/favoris/:id',async(req,res)=>
{
  try
  {
    if (!req.session.user) 
    {
    return res.status(401).send('Accès non autorisé !!');
    }
    const user = await User.findById(req.session.user);
    const crecheId = req.params.id;
    if (user.favorites.includes(crecheId)) 
    {
      return res.status(400).send('Cette crèche est déjà incluse dans vos favoris!!');
    }
    user.favorites.push(crecheId);
    await user.save();
    res.status(200).send('Favori ajouté avec succès !!');
  }
  catch (error) 
  {
    console.error(error);
    res.status(500).send('erreur dans le serveur');
  }
});

router.delete('/favoris/:id',async(req,res)=> {   
  try {
    if (!req.session.user) {
      return res.status(401).send('Accès non autorisé !!');
    }
    const user = await User.findById(req.session.user);
    const crecheId = req.params.id;
    if (!user.favorites.includes(crecheId)) {
      return res.status(404).send('Cette crèche n\'est pas dans vos favoris !!');
    }
    await User.findOneAndUpdate({ _id: user._id }, { $pull: { favorites: crecheId } });
    res.status(200).send('Favori supprimé avec succès !!');
  }
    catch (error) {
      console.error(error);
      res.status(500).send('Erreur dans le serveur');
    }
});

router.get('/enfants',async(req,res)=>
{
  if (!req.session.user) 
  {
    return res.status(401).send('Accès non autorisé !!');
  }
  const user = await User.findById(req.session.user).populate({
    path: 'enfants',
  });
  const enfants = user.enfants.map((enfs) => enfs.toObject());
  res.status(200).send(enfants);
});

router.post('/enfants/ajouter',async(req,res)=>
{
  if (!req.session.user) 
  {
    return res.status(401).send('Accès non autorisé !!');
  }
  const newEnf = new enfants({
    prenom : req.body.prenom,
    age : req.body.age,
    unite : req.body.unite
  });
  const enf = await enfants.create(newEnf);
  const user = await User.findById(req.session.user);
  user.enfants.push(enf);
  await user.save();
  res.status(200).send('Enfant ajouté avec succès !!');
});

router.delete('/enfants/:id', async (req, res) => 
{
  const  enfantId  = req.params.id;
  if (!req.session.user) {
    return res.status(401).send('Accès non autorisé !!');
  }
  const user = await User.findById(req.session.user);
  if (!user) 
  {
    return res.status(404).send('User not found');
  }
  user.enfants.pull(enfantId);
  await user.save();
  await enfants.findByIdAndDelete(enfantId);
  res.status(200).send('Enfant supprimé avec succès !!');
});

router.put('/modifier_enfant/:enfantId', async (req, res) => {
  try {
    const enfantId = req.params.enfantId;
    const parent = await User.findOne({ _id: req.session.user._id });

    if (!parent) {
      return res.status(404).send('Parent non trouvé !');
    }

    const enfant = await enfants.findOne({
      _id: enfantId,
      enfant_id: { $in: parent.enfants.map(enfant => enfant.enfant_id) } //rechercher enfantid dans le tableau dans parent
    });
    if (!enfant) {
      return res.status(404).send('Enfant non trouvé !');
    }
 
    if (req.body.prenom) {
      if (req.body.prenom && !/^[a-zA-Z]+$/.test(req.body.prenom)) { //si le prenom n'est pas string
        return res.status(400).send('Le prénom ne doit contenir que des lettres !');
      }
      enfant.prenom = req.body.prenom;
    }

    if (req.body.age) {
      if (req.body.age && !/^\d+$/.test(req.body.age)) { //si l'age n'est pas un nombre
        return res.status(400).send('L\'âge doit être un nombre entier !');
      }
      enfant.age = req.body.age;
    }

    if (req.body.unite) {
      if (req.body.unite !== 'mois' && req.body.unite !== 'années') { // si l'unité n'est pas "mois" ou "années"
        return res.status(400).send('L\'unité doit être "mois" ou "année" !');
      }
      enfant.unite = req.body.unite;
    }
    if (req.body.creche) {
      const creche = await Creche.findOne({ _id: req.body.creche });
      if (!creche) {
        return res.status(404).send('Crèche non trouvée !');
      }
      enfant.creche = creche._id;
    }

    await enfant.save();
    await parent.save();

    res.status(200).send('Enfant modifié avec succès !');
  } catch (error) {
    console.error(error);
    res.status(500).send('Erreur dans le serveur');
  }
});

router.get('/afficher_enfant/:enfantId', async (req, res) => {
  try {
    const enfantId = req.params.enfantId;
    const parent = await User.findOne({ _id: req.session.user._id });
    if (!parent) {
      return res.status(404).send('Parent non trouvé !');
    }

    const enfant = await enfants.findOne({
      _id: enfantId,
      enfant_id: { $in: parent.enfants.map(enfant => enfant.enfant_id) } 
    });
    if (!enfant) {
      return res.status(404).send('Enfant non trouvé !');
    }

    res.status(200).json(enfant);
  } catch (error) {
    console.error(error);
    res.status(500).send('Erreur dans le serveur');
  }
});

module.exports = router;