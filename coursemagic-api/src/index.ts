import express from 'express';
require('./googleStrategy');

//ROUTER IMPORTS
import googleAuthRouter from './googleAuthRouter';

const app = express();

app.use(googleAuthRouter);

const port = Bun.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
