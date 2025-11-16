import { IPackage } from '../interfaces/packages.interface';

export type ICreatePackage = Omit<IPackage, 'id'>;
