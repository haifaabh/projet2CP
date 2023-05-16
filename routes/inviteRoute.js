const express = require('express');
const router = express.Router();

const Creche = require('../database/Schema/Creche');

router.get('/role', (req, res) => {
  let role = req.session.user?.Role || 'guest';
  res.status(200).json({ Role: role });
  console.log(role);
});
router.post('/rechercher-lieu',async(req,res)=>{
    const {localisation} = req.body;
    const crecheDb = await Creche.find({localisation});
    if (!crecheDb) {
      return res.status(401).send({ msg: 'Aucune crèche trouvée !' });
    } else {
      return res.status(200).send(crecheDb);
    }
});

//Recherche selon les criteres 
router.post('/rechercher-criteres',async (req,res)=>
{
    let result;
    const query= req.body; //recevoir le contenu de la requete de l'utilisateur
    if(query.type_accueil)
    {//si il a choisi un type d'accueil : régulier ou occasionnel
      console.log('accueil');
        try {
            result = await Creche.find({type_accueil:query.type_accueil}); //récupérer les crèches qui vérifient ce critère
          } catch (err) {
            console.error(err);
          }
    }
    if(query.jours_accueil.length !==0)
    {
      try 
      {
        console.log('jours');
        if(!result)
        {
          result = await Creche.find({jours_accueil: {$all: query.jours_accueil}});
        }
        else
        {
          result = result.filter(creche => query.jours_accueil.every(jour => creche.jours_accueil.includes(jour)));
        }   
      }
      catch (err) 
      {
        console.error(err);
      }
    }
    if(query.type_établissement)
    {
      try {
        console.log('etab');
        if(!result)
        {
          result = await Creche.find({type_établissement : query.type_établissement});
        }
        else
        {
          result = result.filter(creche => creche.type_établissement === query.type_établissement);
        }   
        }
        catch (err) {
            console.error(err);
        }
    }
    if(query.age && query.age.unite && query.age.num)
    {
      console.log('age');
      let ageMois;
      if(query.age.unite==='ans')
        ageMois= query.age.num*12;
      else 
        ageMois=query.age.num;
      try {
        if(!result)
        {
          result = await Creche.find({'age_accueil.ageMin' :{$lte : ageMois} , 'age_accueil.ageMax' : {$gte : ageMois}});
        }
        else
        {
          result = result.filter(creche => creche.age_accueil.ageMin <= ageMois && ageMois <= creche.age_accueil.ageMax);
        }   
      }
        catch (err) {
          console.error(err);
        }
    }
    if(query.pédagogie)
    {
      try {
        console.log('peda');
        if(!result)
        {
          result = await Creche.find({pédagogie : query.pédagogie});
        }
        else
        {
          result = result.filter(creche => creche.pédagogie === query.pédagogie);
        }   
        }
        catch (err) {
            console.error(err);
        }
    }
    if(query.langue.length)
    {
      try 
      {
        console.log('langue');
        if(!result)
        {
          result = await Creche.find({langue: {$all: query.langue}});
        }
        else
        {
          result = result.filter(creche => query.langue.every(lgge => creche.langue.includes(lgge)));
        }   
      }
      catch (err) 
      {
        console.error(err);
      }
    }
    console.log(query);
    if((result.length === 0)|| (!result)){console.log(result);
      return res.status(401).send('Pas de crèche trouvée');}
    else {
      console.log(result);
      return res.status(200).send(result);}
});

router.get('/creches/:id',async (req,res)=>
{
  const { id } = req.params;
  try {
    const crecheDb = await Creche.findById(id).lean();
    if (!crecheDb) {
      return res.status(404).send( 'Creche non trouvé!' );
    }
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
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports=router;

