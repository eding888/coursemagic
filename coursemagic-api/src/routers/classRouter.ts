import express from 'express';
import { Request, Response } from 'express';
import { User, Class, getUserClasses, getUserCurrentClasses, getClassById, addClass, removeClass, addClassToUserCurrent, removeClassFromUserCurrent } from '../database/postgreDataAccess';
import { findKeyWhereNull } from '../utils/jsHelper';

const classRouter = express.Router();

// Retrieves all classes attributed to a user
classRouter.get('/userAllClasses', async (request: Request, response: Response) => {
  const user = request.user as User;
  const classes = await getUserClasses(user.id);
  if(!classes) {
    return response.status(400).json({error: "Error with sql retrieval."});
  }
  response.status(200).json(classes);
});

// Retrieves classes that are current to a user
classRouter.get('/userCurrentClasses', async (request: Request, response: Response) => {
  const user = request.user as User;
  const classes = await getUserCurrentClasses(user.id);
  if(!classes) {
    return response.status(400).json({error: "Error with sql retrieval."});
  }
  response.status(200).json(classes);
});

// Adds class to user
classRouter.post('/addUserClass', async (request: Request, response: Response) => {
  const user = request.user as User;
  const addedClass: Class = request.body as Class;
  addedClass.userid = user.id;
  const nullKey = findKeyWhereNull(addClass);
  if(nullKey) {
    return response.status(400).json({error: `Missing fields: ${nullKey}`})
  }
  const result = await addClass(addedClass);
  if(!result) {
    return response.status(400).json({error: "Error with sql retrieval."});
  }
  response.status(200).json({addedId: result});
});

classRouter.post('/addClassToCurrent', async (request: Request, response: Response) => {
  const user = request.user as User;
  const classid: number = request.body.classid;
  if(!classid) {
    response.status(400).json({error: "No classid provied"});
  }
  const result = await addClassToUserCurrent(classid, user.id);
  if(!result) {
    return response.status(400).json({error: "Error with sql retrieval."});
  }
  response.status(200).json({addedId: result});
});

// Removes a class from a user's current classes.
classRouter.delete('/removeFromCurrent/:id', async (request: Request, response: Response) => {
  const user = request.user as User;
  const classid: number = parseInt(request.params.id);
  if(!classid) {
    response.status(400).json({error: "No classid provied"});
  }

  const result = await removeClassFromUserCurrent(classid);
  if(!result) {
    return response.status(400).json({error: "Error with sql retrieval."});
  }
  response.status(200).end();
});


// Deletes class at id
classRouter.delete('/removeClass/:id', async (request: Request, response: Response) => {
  const user = request.user as User;
  const classid: number = parseInt(request.params.id);
  if(!classid) {
    response.status(400).json({error: "No classid provied"});
  }

  const foundClass = await getClassById(classid);

  if(!foundClass) {
    return response.status(400).json({error: "Error with sql retrieval."});
  }
  if(foundClass.userid !== user.id) {
    return response.status(400).json({error: "This is not your class, you may not delete."});
  }

  const result = await removeClass(classid);
  if(!result) {
    return response.status(400).json({error: "Error with sql retrieval."});
  }
  response.status(200).end();

});

export default classRouter;