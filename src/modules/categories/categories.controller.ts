import { Request, Response } from 'express';
import {
  createCategoryService,
  getCategoriesService,
  getCategoryByIdService,
  updateCategoryService,
  deleteCategoryService,
} from './categories.service';

export const createCategory = async (req: Request, res: Response) => {
  try {
    const data = req.body;

    const result = await createCategoryService(data);

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
    console.error('Error en createCategory:', error);
    res.status(500).send({
      message: 'error interno del servidor',
      status: 500,
      ok: false,
    });
  }
};

export const getCategories = async (req: Request, res: Response) => {
  try {
    const query = req.query;

    const result = await getCategoriesService(query);

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
    console.error('Error en getCategories:', error);
    res.status(500).send({
      message: 'error interno del servidor',
      status: 500,
      ok: false,
    });
  }
};

export const getCategoryById = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;

    const result = await getCategoryByIdService(Number(id));

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
    console.error('Error en getCategoryById:', error);
    res.status(500).send({
      message: 'error interno del servidor',
      status: 500,
      ok: false,
    });
  }
};

export const updateCategory = async (req: Request, res: Response) => {
  try {
    const data = req.body;
    const id = req.params.id;

    const result = await updateCategoryService(Number(id), data);

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
    console.error('Error en updateCategory:', error);
    res.status(500).send({
      message: 'error interno del servidor',
      status: 500,
      ok: false,
    });
  }
};

export const deleteCategory = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;

    const result = await deleteCategoryService(Number(id));

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
    console.error('Error en deleteCategory:', error);
    res.status(500).send({
      message: 'error interno del servidor',
      status: 500,
      ok: false,
    });
  }
};
