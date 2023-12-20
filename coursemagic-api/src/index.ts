import express, { NextFunction, Request, Response } from 'express';
import session from 'express-session';
import passport from 'passport';
import { rateLimit } from 'express-rate-limit';
import cors from 'cors';
import cookies from 'cookie-parser';
require('./utils/googleStrategy');

import { initTables, clearAndResetTables } from './database/tableSchemas';

//ROUTER IMPORTS
import { validateToken, checkCsrf} from './utils/middlewareVerifications';
import googleAuthRouter from './routers/googleAuthRouter';
import sessionManagementRouter from './routers/sessionManagementRouter';
import refresh from './routers/refresh';


const app = express();

app.use(cookies());

// Request limiter to not allow copius amount of requests
const limiter = rateLimit({
	windowMs: 60 * 1000,
	limit: 60,
});
app.use(limiter);

// Set cors to only allow same-site requests
const corsOptions = {
  origin: Bun.env.URL,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true // Allow cookies to be sent cross-origin
};

const testCorsOptions = {
  origin: 'http://localhost:5173',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true // Allow cookies to be sent cross-origin
};

// Strict cors options used in production
if(Bun.env.RUN === "prod") app.use(cors(corsOptions))
else app.use(cors(testCorsOptions));

// Sets up express server to be compatible with google passport cookie session setting
app.use(session({
  secret: Bun.env.SECRET || "",
  resave: false,
  saveUninitialized: true,
  cookie: {
    sameSite: Bun.env.RUN === "test" ? "lax" : "strict", // TODO: CHANGE THESE FOR PRODUCTION !!
    secure: Bun.env.RUN === "test" ? false : true,
    httpOnly: Bun.env.RUN === "test" ? false : true
  }
}));
app.use(passport.initialize());
app.use(passport.session());


///////////////////////////////////////////////////////////////////////////////////////////////////

app.use(googleAuthRouter); // handles google auth login requests
app.use('/api', refresh); // allows for token refresh
app.use(validateToken);  //validate token middleware
app.use('/api', sessionManagementRouter);
app.use(checkCsrf); // validate csrf middleware.

///////////////////////////////////////////////////////////////////////////////////////////////////

//initTables();

const port = Bun.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

