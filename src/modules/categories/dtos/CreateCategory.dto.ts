import { ICategory } from '../interfaces/categories.interface';

export type ICreateCategory = Omit<ICategory, 'id'>;
