import express from 'express';
import { Request, Response } from 'express';
import { User, Class, getUserClasses, getUserCurrentClasses, addClassAsCurrent } from '../database/postgreDataAccess';
import { findKeyWhereNull } from '../utils/jsHelper';

const classRouter = express.Router();

// Retrieves all classes attributed to a user
classRouter.get('/userAllClasses', async (request: Request, response: Response) => {
  const user = request.user as User;
  const classes = getUserClasses(user.id);
  if(!classes) {
    return response.status(400).json({error: "Error with sql retrieval."});
  }
  response.status(200).json(classes);
});

classRouter.get('/userCurrentClasses', async (request: Request, response: Response) => {
  const user = request.user as User;
  const classes = getUserCurrentClasses(user.id);
  if(!classes) {
    return response.status(400).json({error: "Error with sql retrieval."});
  }
  response.status(200).json(classes);
});

classRouter.post('/addUserCurrentClass', async (request: Request, response: Response) => {
  const user = request.user as User;
  const addClass: Class = request.body as Class;
  const nullKey = findKeyWhereNull(addClass);
  if(nullKey) {
    return response.status(400).json({error: `Missing fields: ${nullKey}`})
  }
  const classes = getUserCurrentClasses(user.id);
  if(!classes) {
    return response.status(400).json({error: "Error with sql retrieval."});
  }
  response.status(200).json(classes);
});
