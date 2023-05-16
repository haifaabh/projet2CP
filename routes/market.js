const {Router}=require('express');

const router=Router();
const supermarket=[
    {
        store:"whole foods",
        miles:2
    },
    {
      store:'trader joes',
      miles:3
    },
    {
      store:'albertstons',
      miles:5   
    }

]

// router.use((req,res,naxt)=>{ //this is middlewar if the user is not loogged in mara7ch yzid yhewed llte7t app.use .....
//   if(req.session.user)  next();  
//   else{   
//       res.send(401);
//   }
// })

router.get('',(req,res)=>{
   const {miles} =req.query;
   const parsedmiles=parseInt(miles);
   if(!isNaN(parsedmiles))
   {
    const filterstores=supermarket.filter((s)=>s.miles<=parsedmiles);
    res.send(filterstores);
   }
   else
   res.send(supermarket);
})



module.exports=router;