import express, { NextFunction, Request, Response } from 'express';
import session from 'express-session';
import passport from 'passport';
import { rateLimit } from 'express-rate-limit';
import cors from 'cors';
require('./utils/googleStrategy');

import { initTables, clearAndResetTables } from './database/tableSchemas';

//ROUTER IMPORTS
import { validateToken, checkCsrf} from './utils/middlewareVerifications';
import googleAuthRouter from './routers/googleAuthRouter';
import sessionManagementRouter from './routers/sessionManagementRouter';


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
app.set('trust proxy', true);
app.use(session({
  secret: Bun.env.SECRET || "",
  resave: false,
  saveUninitialized: true,
  cookie: {
    sameSite: "lax", // TODO: CHANGE THESE FOR PRODUCTION !!
    secure: "auto",
    maxAge: 60 * 60 * 1000
  }
}));
app.use(passport.initialize());
app.use(passport.session());

// Request limiter to not allow copius amount of requests
const limiter = rateLimit({
	windowMs: 15 * 60 * 1000,
	limit: 1000,
});
//app.use(limiter);

///////////////////////////////////////////////////////////////////////////////////////////////////

app.use(googleAuthRouter); // handles google auth login requests
app.use(validateToken);  //validate token middleware
app.use('/api', sessionManagementRouter);
app.use(checkCsrf); // validate csrf middleware.

///////////////////////////////////////////////////////////////////////////////////////////////////

initTables();

const port = Bun.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

