import { Request, Response } from 'express';
import {
  createPackageService,
  getPackagesService,
  getPackageByIdService,
  updatePackageService,
  deletePackageService,
} from './packages.service';

export const createPackage = async (req: Request, res: Response) => {
  try {
    const data = req.body;

    const result = await createPackageService(data);

    if (!result.ok) {
      res.status(400).send({
        message: result.message,
        status: 400,
        ok: false,
      });
      return;
    }

    res.status(201).send({
      message: result.message,
      status: 201,
      ok: true,
      data: result.data,
    });
  } catch (error) {
    console.error('Error en createPackage:', error);
    res.status(500).send({
      message: 'error interno del servidor',
      status: 500,
      ok: false,
    });
  }
};

export const getPackages = async (req: Request, res: Response) => {
  try {
    const query = req.query;

    const result = await getPackagesService(query);

    if (!result.ok) {
      res.status(400).send({
        message: result.message,
        status: 400,
        ok: false,
      });
      return;
    }

    res.status(200).send({
      message: result.message,
      status: 200,
      ok: true,
      data: result.data,
    });
  } catch (error) {
    console.error('Error en getPackages:', error);
    res.status(500).send({
      message: 'error interno del servidor',
      status: 500,
      ok: false,
    });
  }
};

export const getPackageById = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;

    const result = await getPackageByIdService(Number(id));

    if (!result.ok) {
      res.status(404).send({
        message: result.message,
        status: 404,
        ok: false,
      });
      return;
    }

    res.status(200).send({
      message: result.message,
      status: 200,
      ok: true,
      data: result.data,
    });
  } catch (error) {
    console.error('Error en getPackageById:', error);
    res.status(500).send({
      message: 'error interno del servidor',
      status: 500,
      ok: false,
    });
  }
};

export const updatePackage = async (req: Request, res: Response) => {
  try {
    const data = req.body;
    const id = req.params.id;

    const result = await updatePackageService(Number(id), data);

    if (!result.ok) {
      res.status(400).send({
        message: result.message,
        status: 400,
        ok: false,
      });
      return;
    }

    res.status(200).send({
      message: result.message,
      status: 200,
      ok: true,
      data: result.data,
    });
  } catch (error) {
    console.error('Error en updatePackage:', error);
    res.status(500).send({
      message: 'error interno del servidor',
      status: 500,
      ok: false,
    });
  }
};

export const deletePackage = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;

    const result = await deletePackageService(Number(id));

    if (!result.ok) {
      res.status(404).send({
        message: result.message,
        status: 404,
        ok: false,
      });
      return;
    }

    res.status(200).send({
      message: result.message,
      status: 200,
      ok: true,
      data: result.data,
    });
  } catch (error) {
    console.error('Error en deletePackage:', error);
    res.status(500).send({
      message: 'error interno del servidor',
      status: 500,
      ok: false,
    });
  }
};
