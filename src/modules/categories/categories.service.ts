import Category from './models/categories.model';
import { Op } from 'sequelize';

import { ICreateCategory } from './dtos/CreateCategory.dto';
import { IUpdateCategory } from './dtos/UpdateCategory.dto';

import { ICategoryFilter, ICategory } from './interfaces/categories.interface';

import { IServiceResponse } from '../../types';

export const createCategoryService = async (
  payload: ICreateCategory,
): Promise<IServiceResponse<ICategory>> => {
  try {
    const category = await Category.create(payload);

    return {
      message: 'Categoría creada con éxito',
      ok: true,
      data: category.dataValues,
    };
  } catch (error) {
    console.error('Error en createCategoryService:', error);
    return {
      message: 'Error al crear la categoría',
      ok: false,
    };
  }
};

export const getCategoriesService = async (
  filter: ICategoryFilter,
): Promise<IServiceResponse<Category[]>> => {
  try {
    const whereConditions: any = {};

    if (filter.name) {
      whereConditions.name = {
        [Op.iLike]: `%${filter.name}%`,
      };
    }

    const categories = await Category.findAll({
      where: whereConditions,
      order: [['createdAt', 'DESC']],
      limit: 100,
    });

    return {
      message: 'Categorías obtenidas con éxito',
      ok: true,
      data: categories,
    };
  } catch (error) {
    console.error('Error en getCategoriesService:', error);
    return {
      message: 'Error al obtener las categorías',
      ok: false,
    };
  }
};

export const getCategoryByIdService = async (
  id: number,
): Promise<IServiceResponse<ICategory>> => {
  try {
    const category = await Category.findByPk(id);

    if (!category) {
      return {
        message: 'Categoría no encontrada',
        ok: false,
      };
    }

    return {
      message: 'Categoría obtenida con éxito',
      ok: true,
      data: category.dataValues,
    };
  } catch (error) {
    console.error('Error en getCategoryByIdService:', error);
    return {
      message: 'Error al obtener la categoría',
      ok: false,
    };
  }
};

export const updateCategoryService = async (
  id: number,
  payload: IUpdateCategory,
): Promise<IServiceResponse<number>> => {
  try {
    const response = await Category.update(payload, {
      where: {
        id,
      },
    });

    if (response[0] === 0) {
      return {
        message: 'Categoría no encontrada',
        ok: false,
      };
    }

    return {
      message: 'Categoría actualizada con éxito',
      ok: true,
      data: response[0],
    };
  } catch (error) {
    console.error('Error en updateCategoryService:', error);
    return {
      message: 'Error al actualizar la categoría',
      ok: false,
    };
  }
};

export const deleteCategoryService = async (
  id: number,
): Promise<IServiceResponse<number>> => {
  try {
    const response = await Category.destroy({
      where: {
        id,
      },
    });

    if (response === 0) {
      return {
        message: 'Categoría no encontrada',
        ok: false,
      };
    }

    return {
      message: 'Categoría eliminada con éxito',
      ok: true,
      data: response,
    };
  } catch (error) {
    console.error('Error en deleteCategoryService:', error);
    return {
      message: 'Error al eliminar la categoría',
      ok: false,
    };
  }
};
