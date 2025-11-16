import { ICategory } from '../interfaces/categories.interface';

export type IUpdateCategory = Partial<Omit<ICategory, 'id'>>;
