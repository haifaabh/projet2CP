const express = require('express');

const cookieParser = require('cookie-parser');
const session = require('express-session');

const app = express();

app.use(express.json());
app.use(express.urlencoded());

const authRoute = require('./routes/auth');
const inviteRoute = require('./routes/invite');
const parentRoute = require('./routes/parent');
const proprioRoute = require('./routes/proprietaire');
const adminRoute = require('./routes/admin');

require('./database');


const PORT = 3001;


app.use(cookieParser());

app.use(
  session({
    secret: 'APODAJDSDASMCZXMZADASDASDPASDOASDSAK',
    resave: false,
    saveUninitialized: false,
  })
);



app.get('/api/isConnected', (req, res) => {
  if (req.session.user) {
    res.json({ isConnected: true });
  } else {
    res.json({ isConnected: false });
  }
});

app.use('/api/admin',adminRoute);
app.use('/api/invite', inviteRoute);
app.use('/api/auth', authRoute);

app.use((req, res, next) => {
  if (req.session.user) 
  {
    res.locals.user = req.session.user;
    next();
  }
  else  res.status(401).send('Accès non autorisé !!');
});

app.use('/api/parent', parentRoute);
app.use('/api/proprietaire',proprioRoute);

app.listen(PORT, () => console.log(`Running Express Server on Port ${PORT}!`));



