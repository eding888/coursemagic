import express from 'express';
import { Request, Response } from 'express';
import Tokens from 'csrf';
import { User } from '../database/postgreDataAccess';
const tokens = new Tokens();

const sessionManagementRouter = express.Router();

// Retrieves new session / csrf token
sessionManagementRouter.get('/getSession', (request: Request, response: Response) => {
  const token = tokens.create(Bun.env.SECRET || "bomboclaattttt");
  response.status(200).json({ csrf: token });
});

// Logs the user out
sessionManagementRouter.post('/logout', (request: Request, response: Response) => {
  response.clearCookie('connect.sid', {domain: "localhost"});
  response.clearCookie('refresh', {domain: "localhost"});
  response.status(200).end();
});


export default sessionManagementRouter;