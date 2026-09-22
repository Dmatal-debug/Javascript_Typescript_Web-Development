import express from 'express';
import { getOrgStats } from './controllers/statsController';

const app = express();
app.set('json spaces', 2);
app.use(express.json());

app.get('/api/orgs/:org/stats', getOrgStats);

if (process.env.NODE_ENV !== 'test') {
  app.listen(3000, () => console.log('Servidor corriendo en el puerto 3000'));
}
