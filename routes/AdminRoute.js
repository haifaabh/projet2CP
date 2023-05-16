const express = require('express');
const router = express.Router();
const Admin = require('../database/Schema/Admin');
const Creche = require('../database/Schema/Creche');
const Creche_attente=  require('../database/Schema/Creche_attente');
const user=  require('../database/Schema/User');
const {hashPassword,comparePassword}=require('../utils/helpers');

const isAdmin = async (req, res, next) => {
  const admin = req.session.user;
  if (!admin || admin.Role !== 'admin') {
    return res.status(401).send({ msg: 'Vous n\'êtes pas autorisé à accéder à cette page.' });
  }
  next();
};

router.post('/connecter_admin',async (request, response) => {
    const { email, password } = request.body;
    if(!email||!password)
    {
      return response.status(400).send({ msg: 'email et mot de passe sont obligatoires' });
    }
    const admin = await Admin.findOne({ email });
    if(!admin) {
      return response.status(401).send({ msg: 'utilisateur non trouvé' });
    }
    const isValid=comparePassword(password,admin.password);
    if (isValid) {
      console.log("autenthifié avec succès");
      request.session.user = admin;
      return response.status(200).send({ msg: 'Connecté avec succès' });
    }
    else {
      console.log("authentification a échoué")
      return response.send(401)}
  
  });

  router.get('/DashboardCreche',isAdmin, async (request, response) => {
    try {
      const count = await Creche.countDocuments();
      console.log(`There are ${count} documents in the creche collection`);
      response.status(200).json({ count });
    } catch (err) {
      console.log(err);
      response.status(500).json({ error: 'Server error' });
    }
  });
  router.get('/DashboardEnAttente',isAdmin,  async (request, response) => {
    try {
      const count = await Creche_attente.countDocuments();
      console.log(`There are ${count} documents in the creche collection`);
      response.status(200).json({ count });
    } catch (err) {
      console.log(err);
      response.status(500).json({ error: 'Server error' });
    }
  });

  router.get('/DashboardUser',isAdmin,  async (request, response) => {
    try {
      const count = await user.countDocuments();
      console.log(`There are ${count} documents in the creche collection`);
      response.status(200).json({ count });
    } catch (err) {
      console.log(err);
      response.status(500).json({ error: 'Server error' });
    }
  });

  router.get('/afficher_toutes_creches',isAdmin, async (req,res)=>{
    try {
     const creches = await Creche.find().lean();
        res.json(creches);
      } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
      }
  });

 router.get('/afficher_toutes_creches_attentes',isAdmin, async (req,res)=>{
    try {
     const creches = await Creche_attente.find().lean();
        res.json(creches);
      } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
      }
  });
  
  router.post('/creche_attente/:id',isAdmin,async(req,res)=>
  {
    const {accepte} = req.body;
    try{
      const creche_attente = await Creche_attente.findById(req.params.id).select('-code -_id');
      if(!creche_attente)
        return res.status(404).send('Creche en attente non trouvée');
      if(accepte)
      {
        const creche = new Creche(creche_attente.toObject());
        console.log('yo');
        await creche.save();
        console.log('yoyo');
      }
      await Creche_attente.findByIdAndDelete(req.params.id);
      res.status(200).send('Opération effectué avec succès');
    }catch(err)
    {
      console.error(err);
      res.status(500).json({ message: 'Server error' });
    }
});

  router.delete('/sup_creches/:crecheId',isAdmin,(req, res) => {
    const crecheId = req.params.crecheId;
    Creche.findByIdAndDelete(crecheId)
      .then((doc) => {
        if (!doc) {
          res.status(404).json({ message: 'La crèche avec l\'identifiant spécifié est introuvable.' });
        } else {
          res.json({ message: `La crèche avec l'identifiant ${crecheId} a été supprimée.` });
        }
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json({ message: 'Échec de la suppression de la crèche.' });
      });
  });
  
  module.exports=router;