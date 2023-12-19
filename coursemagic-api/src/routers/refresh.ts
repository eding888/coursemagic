import express from 'express';
import { Request, Response } from 'express';
import { User } from '../database/postgreDataAccess';
import { Auth } from '../utils/googleStrategy';
import jwt from 'jsonwebtoken';

const refresh = express.Router();

// Refresh the auth token with refresh token
refresh.post('/refresh', (request: Request, response: Response) => {
  const refresh = request.cookies.refresh;
  console.log(refresh);
  if(!refresh) {
    return response.status(401).json({error: "No refresh token"});
  }

  try {
    jwt.verify(refresh, Bun.env.SECRET || "hi");
  } catch(error) {
    return response.status(401).json({error: "Refresh expired"});
  }

  const user = request.user as User;
  if(!user) {
    return response.status(401).json( {error: "No user token found."} );
  }

  // there must be an existing, valid, expired auth token in order to generate a new one
  const decodeUser = jwt.verify(user.auth, Bun.env.SECRET || "hi", {ignoreExpiration: true}) as Auth;
  if(decodeUser.id != user.id) {
    return response.status(401).json( {error: "Auth token not recognizable."} );
  }

  //generate new auth
  const expiresIn = 10 * 60;
  const auth: string = jwt.sign({id: user.id}, Bun.env.SECRET || "hi", {expiresIn});

  user.auth = auth;

  response.status(200).end();
});

// Logs the user out
refresh.post('/logout', (request: Request, response: Response) => {
  response.clearCookie('connect.sid', {domain: "localhost"});
  response.clearCookie('refresh', {domain: "localhost"});
  response.status(200).end();
});


export default refresh;