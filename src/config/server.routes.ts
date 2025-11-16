import { Request, Response, Router } from 'express';

//import helthRoter from '../modules/helthCheck/helthCheck.route';
import UserRouter from '../modules/users/users.routes';
import AuthRouter from '../modules/auth/auth.routes';
import PackagesRouter from '../modules/packages/packages.routes';
import CategoriesRouter from '../modules/categories/categories.routes'; // New route for categories

const router = Router();
/*
router.use('/', helthRoter);
// router.use('/voto', validateSesionUser, userRoleValidation(UserRole.SUPER_ADMIN), VoteRouter)
*/
router.use('/users', UserRouter);
router.use('/auth', AuthRouter);
router.use('/packages', PackagesRouter);
router.use('/categories', CategoriesRouter); // Nueva ruta para categorías


router.use((req, res) => {
  res.status(404).send({
    message: 'Página no encontrada',
    status: 404,
    ok: false,
  });
});

export default router;
