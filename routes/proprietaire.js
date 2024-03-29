const express = require('express');
const router = express.Router();

const Rdv = require('../database/Schema/Rdv');
const Reservation = require('../database/Schema/Reservation');
const Creche = require('../database/Schema/Creche');
const Proprietaire = require('../database/Schema/Proprietaire');

//pour verifier si utilisateur est un proprietaire afin de limiter les acces
const isProprietaire = async (req, res, next) => {
  const proprietaire = req.session.user;
  if (!proprietaire || proprietaire.Role !== 'proprietaire') {
    return res.status(401).send({ msg: 'Vous n\'êtes pas autorisé à accéder à cette page.' });
  }
  next();
};

//modifier les infos de la creche
router.put('/creche/modifier',isProprietaire, async(req,res)=>
{
    try 
    {
        const proprio = await Proprietaire.findOne({parent : req.session.user});  //trouver l utilisateur dans la bdd
        const crecheId = proprio.creche;
        const crecheData = req.body;
        const crecheDb = await Creche.findByIdAndUpdate(crecheId,crecheData,{ //trouver la creche et la modifier
            new: true,
            runValidators: true,
          });
        if (!crecheDb) 
        {
            return res.status(404).send('Post not found');
        }
        res.status(200).send('Mise-à-jour effectuée avec succès!!');
    } 
    catch (err) 
    {
        res.status(500).send(err);
    }
});

//afficher la liste des rendez vous acceptes par ce proprietaire
router.get('/mes_rendezvous/acceptes',isProprietaire,async(req,res)=>
{
    try{
        const proprio = await Proprietaire.findOne({parent : req.session.user});
        const crecheId=proprio.creche;
        const rdvsAcc = await Rdv.find({ creche_id: crecheId, etat: "Acceptée" });   //verifier si l etat est acceptee
        res.status(200).send(rdvsAcc);
    }catch(err)
    {
        console.error(err);
        res.status(500).json({ error: 'Server error' });
    }  
});

//afficher la liste des rendez vous en attentes 
router.get('/mes_rendezvous/en_attente',isProprietaire,async(req,res)=>
{
    try{
        const proprio = await Proprietaire.findOne({parent : req.session.user});
        const crecheId=proprio.creche;
        const rdvsAtt = await Rdv.find({ creche_id: crecheId, etat: "En attente" });  //verifier si l etat de la creche est en attente
        res.status(200).send(rdvsAtt);
    }catch(err)
    {
        console.error(err);
        res.status(500).json({ error: 'Server error' });
    }  
});

//accepter un rendez vous parmis les rdv en attente
router.post('/mes_rendezvous/en_attente/accepter/:id' , async(req,res) =>
{
    try{
      const rdv = await Rdv.findById(req.params.id);
      if(!rdv)
        return res.status(404).send('Rendez-vous non trouvé');
      rdv.etat = "Acceptée";
      await rdv.save();         // gardez le rdv dans la bdd avec etat acceptée
      res.status(200).send('Opération effectuée avec succès');
    }catch(err)
    {
      console.error(err);
      res.status(500).json({ message: 'Server error' });
    }
});

//refuser un rendez vous parmis les rdv en attente
router.delete('/mes_rendezvous/en_attente/refuser/:id',async (req,res) =>
{
  try{
    const rdv = await Rdv.findById(req.params.id);
    if(!rdv)
      return res.status(404).send('Rendez-vous non trouvé');
    rdv.etat = "Refusée";
    await rdv.save();                      // gardez le rdv dans la bdd avec etat refusee
    res.status(200).send('Opération effectuée avec succès');
  }catch(err)
  {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

//afficher les infos de la creche liée a ce propriétaire
router.get('/afficher_ma_creche',isProprietaire, async (req, res) => {
      const parentId = req.session.user._id;
      try {
        if (!req.session.user) { // verifier si l utilisateur est connecté
            return res.status(401).send('Utilisateur non authentifié');
          }
        const proprietaire = await Proprietaire.findOne({parent: parentId}).lean();
        if (!proprietaire) {  // verifier si l utilisateur n est pas un proprietaire
          return res.status(404).send('Vous n\'êtes pas autorisé à afficher cette crèche');
        }
        const crecheDb=await Creche.findById(proprietaire.creche).lean();
        if(crecheDb.age_accueil.ageMin>=12)
        {
          crecheDb.age_accueil.ageMin /= 12;
          crecheDb.age_accueil.uniteMin="ans";
        }
        else
          crecheDb.age_accueil.uniteMin="mois";
        if(crecheDb.age_accueil.ageMax>=12)
        {
          crecheDb.age_accueil.ageMax /= 12;
          crecheDb.age_accueil.uniteMax="ans";
        }
        else
          crecheDb.age_accueil.uniteMax="mois";
        return res.status(200).send(crecheDb);
      } 
      catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error' });
      }
    });
     

//afficher les reservation en attentes de sa creche
router.get('/afficher_reservations_attentes',isProprietaire, async (req, res) => {
 try {
        const parentId = req.session.user._id;
        const proprietaire = await Proprietaire.findOne({parent: parentId}).lean();
       const crecheId=proprietaire.creche;
        const reservationsAttentes = await Reservation.find({ creche_id: crecheId, etat: "En attente" }).select('date nom_creche enfants etat ');
        res.json(reservationsAttentes);
      } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
      }
});

//afficher les reservation acceptées de sa creche
router.get('/afficher_reservations_acceptees',isProprietaire, async (req, res) => {
    try {
           const parentId = req.session.user._id;
           const proprietaire = await Proprietaire.findOne({parent: parentId}).lean();
           const crecheId=proprietaire.creche;
           const reservationsacceptees = await Reservation.find({ creche_id: crecheId, etat: "Acceptée" }).select('date nom_creche enfants etat ');
           res.json(reservationsacceptees);
         } catch (err) {
           console.error(err);
           res.status(500).send('Server Error');
         }
   });

//accepter une reservation en attente
   router.post('/mes_reservations/en_attente/accepter/:id' , async(req,res) =>
{
    try{
      const reservation = await Reservation.findById(req.params.id);
      if(!reservation)
        return res.status(404).send('Reservation non trouvée');
      reservation.etat = "Acceptée";
      await reservation.save();
      res.status(200).send('Opération effectuée avec succès');
    }catch(err)
    {
      console.error(err);
      res.status(500).json({ message: 'Server error' });
    }
});

// refuser une reservation en attente
router.delete('/mes_reservations/en_attente/refuser/:id',async (req,res) =>
{
  try{
    const reservation = await Reservation.findById(req.params.id);
    if(!reservation)
      return res.status(404).send('Reservation non trouvée');
    reservation.etat = "Refusée";
    await reservation.save();
    res.status(200).send('Opération effectuée avec succès');
  }catch(err)
  {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});
  
module.exports = router;
