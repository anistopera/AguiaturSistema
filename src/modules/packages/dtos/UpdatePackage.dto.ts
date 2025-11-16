import { IPackage } from '../interfaces/packages.interface';

export type IUpdatePackage = Partial<Omit<IPackage, 'id'>>;
