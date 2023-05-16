const {Router}=require('express');

const router=Router(); //tchebh llexpress app


const grocerylist=[{
    item: 'milk',
    quantity: 2
},
{
    item: 'cerrial',
    quantity: 4,
},
{
    item: 'pop_corn',
    quantity: 3,
},
{
    item:'tomato',
    quantity:5
}
];
// router.use((req,res,naxt)=>{ //this is middlewar if the user is not loogged in mara7ch yzid yhewed llte7t app.use .....
//     if(req.session.user)  next();  
//     else{   
//         res.send(401);
//     }
// })
router.get('/',(req,res)=>{
    res.cookie('visited' , "true",{ 
    maxAge:10000});
    

res.send(grocerylist);

}),
router.get('/groceries',(request ,response,next)=>{
    console.log(request.headers.cookies);
    console.log("Before Handeling request");
    next();
},(req,res,next)=>{
   res.send(grocerylist);
   next();
},
()=>{console.log("Finished Executing GET req");}
);

router.get('/groceries/:item',(req,res)=>{
    const {item} = req.params;//.item;
  //  const quantity = req.params.quantity;
    //console.log(req.params.item);
    //console.log(req.params.quantity);
    const groceryItem=grocerylist.find((g)=>g.item===item);  //search in every item in the list until it finds one that == item
    res.send(groceryItem);
    
});


router.post('/groceries',(req,res)=>{
    console.log(req.body);
    grocerylist.push(req.body);
    res.send(200);

})



router.post('/cart/item',(req,res)=>
{
    const{item,quantity}=req.body;
    const cartItem={item,quantity};
    console.log(cartItem);
    const {cart}=req.session;
if(cart)
{
    const {item}=cart;
    item.push(cartItem);
    req.session.cart.item=item;
}
else{
    req.session.cart={
         item:[cartItem]    }
}
    res.sendStatus(201);
})

router.get('/cart',(req,res)=>{
   const {cart}=req.session;
   if(!cart){
    res.send('you have no cart');

   }
   else{
    res.send(req.session);
   }
})

module.exports=router;