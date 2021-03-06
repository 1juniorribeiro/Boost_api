import { Router } from 'express';

import ensureAuthenticated from '../middlewares/ensureAuthenticated';

import CreateProductService from '../services/CreateProductService';

const productsRouter = Router();

productsRouter.use(ensureAuthenticated);

productsRouter.post('/', async (request, response) => {
  const { name, price } = request.body;

  const createProduct = new CreateProductService();

  const product = await createProduct.execute({
    user_id: request.user.id,
    name,
    price,
  });

  return response.json(product);
});

export default productsRouter;
