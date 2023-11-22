import express, { NextFunction, Request, Response } from 'express';
import session from 'express-session';
import passport from 'passport';
import { rateLimit } from 'express-rate-limit';
import cors from 'cors';
require('./googleStrategy');

import { initTables, clearAndResetTables } from './database/tableSchemas';

//ROUTER IMPORTS
import { validateToken } from './middlewareVerifications';
import googleAuthRouter from './routers/googleAuthRouter';


const app = express();

// Set cors to only allow same-site requests
const corsOptions = {
  origin: 'domain',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true // Allow cookies to be sent cross-origin
};
//TODO: Make app use cors on production
// app.use(cors(corsOptions));

// Sets up express server to be compatible with google passport cookie session setting
app.set('trust proxy', 1);
app.use(session({
  secret: Bun.env.secret || "",
  resave: false,
  saveUninitialized: true,
  cookie: {
    sameSite: "lax", // TODO: CHANGE THESE FOR PRODUCTION !!
    secure: "auto",
    maxAge: 60 * 60 * 1000
  }
}));
app.use(passport.session());

// Request limiter to not allow copius amount of requests
const limiter = rateLimit({
	windowMs: 15 * 60 * 1000,
	limit: 1000,
	standardHeaders: 'draft-7',
	legacyHeaders: false
});
app.use(limiter);

///////////////////////////////////////////////////////////////////////////////////////////////////

app.use(googleAuthRouter);
app.use(validateToken);  //validate token middleware

///////////////////////////////////////////////////////////////////////////////////////////////////

initTables();

const port = Bun.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});


const testShit = async () => {
  await clearAndResetTables(true);
  
}

//testShit();