// Protects any proceding routes by checking various aspects
// of the requests to ensure that they are legitimate.
import { Request, Response } from 'express';
import { NextFunction } from "express";
import { User, getUserById } from './database/postgreDataAccess';
import Tokens from 'csrf';
const tokens = new Tokens();

// Validates that for requests that user cookie is valid and exists
export const validateToken = (req: Request, res: Response, next: NextFunction) => {
  console.log(req.user);
  const user: User = req.user as User;
  if(!user) {
    return res.status(401).json( {error: "No user token found."} );
  }

  const foundUser = getUserById(user.id);
  if(!foundUser) {
    return res.status(401).json( {error: "User at token not found."} );
  }

  next();
};

// Validates for requests that csrf is present and valid
export const checkCsrf = (request: Request, response: Response, next: NextFunction) => {
  const csrf = request.headers['x-csrf-token'];
  if (!csrf || Array.isArray(csrf)) {
    return response.status(403).json({ error: 'no csrf provided' });
  }
  if (!tokens.verify(Bun.env.SECRET || "bomboclaat", csrf)) {
    return response.status(403).json({ error: 'invalid csrf' });
  }
  next();
};
