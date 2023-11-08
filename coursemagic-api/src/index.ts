import express from 'express';
import session from 'express-session';
import passport from 'passport';
require('./googleStrategy');

import { initTables } from './database/tableSchemas';

//ROUTER IMPORTS
import googleAuthRouter from './routers/googleAuthRouter';

const app = express();

app.set('trust proxy', 1);
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
  cookie: {
    sameSite: "lax", // CHANGE THESE FOR PRODUCTION !!
    secure: "auto",
    maxAge: 60* 60 * 1000
  }
}));
app.use(passport.session());

app.use(googleAuthRouter);

initTables();

const port = Bun.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
