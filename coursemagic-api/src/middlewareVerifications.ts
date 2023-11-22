// Protects any proceding routes by checking various aspects
// of the requests to ensure that they are legitimate.
import { Request, Response } from 'express';
import { NextFunction } from "express";
import { User, getUserById } from './database/postgreDataAccess';

export const validateToken = (req: Request, res: Response, next: NextFunction) => {
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