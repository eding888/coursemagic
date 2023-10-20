import { Hono } from 'hono'

const app = new Hono()

const json = {
  swag: 'hello'
};
app.get('/swag', (c) => c.json(json))

export default app
