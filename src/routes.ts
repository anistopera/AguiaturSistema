import { Router } from 'express';

import categoriesRouter from './modules/categories/categories.routes';

const router = Router();

router.get('/hello', (req, res) => {
  res.send('Hello World!');
});


router.use('/categories', categoriesRouter);

export default router;
