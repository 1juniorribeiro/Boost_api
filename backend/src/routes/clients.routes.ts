import { request, response, Router } from 'express';

import CreateClientService from '../services/CreateClientService'

import ensureAuthenticated from '../middlewares/ensureAuthenticated'

const clientsRouter = Router();

clientsRouter.use(ensureAuthenticated)

clientsRouter.post('/', async (request, response) => {
    try {
      const {name, phone} = request.body

      const createClient = new CreateClientService();

      const client = await createClient.execute({
        user_id: request.user.id,
        name,
        phone,
      });

      return response.json(client);
    } catch(err) {
        return response.status(400).json({ error: err.message})
    }
});

export default clientsRouter;
