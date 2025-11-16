import { Router } from 'express';
import {
  createCategory,
  getCategories,
  getCategoryById,
  updateCategory,
  deleteCategory,
} from './categories.controller';

const CategoriesRouter = Router();

CategoriesRouter.get('/', getCategories);
CategoriesRouter.get('/:id', getCategoryById);
CategoriesRouter.post('/', createCategory);
CategoriesRouter.patch('/:id', updateCategory);
CategoriesRouter.delete('/:id', deleteCategory);

export default CategoriesRouter;
