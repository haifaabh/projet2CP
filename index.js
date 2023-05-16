const express = require('express');

const cookieParser = require('cookie-parser');
const session = require('express-session');

const authRoute = require('./routes/auth');
const inviteRoute = require('./routes/inviteRoute');
const parentRoute = require('./routes/parentRoute');
const proprioRoute = require('./routes/proprietaireRoute');
const adminRoute = require('./routes/AdminRoute');
const Admin = require('./database/Schema/Admin');


require('./database');
const app = express();
const PORT = 3001;
app.use(express.json());
app.use(express.urlencoded());

app.use(cookieParser());
app.use(
  session({
    secret: 'APODAJDSDASMCZXMZADASDASDPASDOASDSAK',
    resave: false,
    saveUninitialized: false,
  })
);

app.use((req, res, next) => {
  console.log(`${req.method}:${req.url}`);
  next();
});

app.get('/api/isConnected', (req, res) => {
  if (req.session.user) {
    res.json({ isConnected: true });
  } else {
    res.json({ isConnected: false });
  }
});

app.use('/api/adminRoute', adminRoute);
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

app.use('/api/parentRoute', parentRoute);
app.use('/api/proprietaireRoute',proprioRoute);

app.listen(PORT, () => console.log(`Running Express Server on Port ${PORT}!`));
