import express from 'express';
import { Request, Response } from 'express';
import cookieParser from 'cookie-parser';
import jwt from 'jsonwebtoken';

const refresh = express.Router();

// Retrieves new session / csrf token
refresh.post('/refresh', (request: Request, response: Response) => {
  const refresh = request.cookies.refresh;
  if(!refresh) {
    return response.status(401).json({error: "No refresh token"});
  }

  try {
    jwt.verify(refresh, Bun.env.SECRET || "hi");
  } catch(error) {
    return response.status(401).json({error: "Refresh expired"});
  }
  request.user
});


export default refresh;