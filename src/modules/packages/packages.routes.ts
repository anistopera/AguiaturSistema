import { Router } from 'express';
import {
  createPackage,
  getPackages,
  getPackageById,
  updatePackage,
  deletePackage,
} from './packages.controller';

const PackagesRouter = Router();

PackagesRouter.get('/', getPackages);
PackagesRouter.get('/:id', getPackageById);
PackagesRouter.post('/', createPackage);
PackagesRouter.patch('/:id', updatePackage);
PackagesRouter.delete('/:id', deletePackage);

export default PackagesRouter;
