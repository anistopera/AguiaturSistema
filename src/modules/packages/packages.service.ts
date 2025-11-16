import Package from './models/packages.model';
import { Op } from 'sequelize';

import { ICreatePackage } from './dtos/CreatePackage.dto';
import { IUpdatePackage } from './dtos/UpdatePackage.dto';

import { IPackageFilter, IPackage } from './interfaces/packages.interface';

import { IServiceResponse } from '../../types';

export const createPackageService = async (
  payload: ICreatePackage,
): Promise<IServiceResponse<IPackage>> => {
  try {
    const travel_package = await Package.create(payload);

    return {
      message: 'Paquete creado con éxito',
      ok: true,
      data: travel_package.dataValues,
    };
  } catch (error) {
    console.error('Error en createPackageService:', error);
    return {
      message: 'Error al crear el paquete',
      ok: false,
    };
  }
};

export const getPackagesService = async (
  filter: IPackageFilter,
): Promise<IServiceResponse<Package[]>> => {
  try {
    const whereConditions: any = {};

    if (filter.name) {
      whereConditions.name = {
        [Op.iLike]: `%${filter.name}%`,
      };
    }

    const packages = await Package.findAll({
      where: whereConditions,
      order: [['createdAt', 'DESC']],
      limit: 100,
    });

    return {
      message: 'Paquetes obtenidos con éxito',
      ok: true,
      data: packages,
    };
  } catch (error) {
    console.error('Error en getPackagesService:', error);
    return {
      message: 'Error al obtener los paquetes',
      ok: false,
    };
  }
};

export const getPackageByIdService = async (
  id: number,
): Promise<IServiceResponse<IPackage>> => {
  try {
    const travel_package = await Package.findByPk(id);

    if (!travel_package) {
      return {
        message: 'Paquete no encontrado',
        ok: false,
      };
    }

    return {
      message: 'Paquete obtenido con éxito',
      ok: true,
      data: travel_package.dataValues,
    };
  } catch (error) {
    console.error('Error en getPackageByIdService:', error);
    return {
      message: 'Error al obtener el paquete',
      ok: false,
    };
  }
};

export const updatePackageService = async (
  id: number,
  payload: IUpdatePackage,
): Promise<IServiceResponse<number>> => {
  try {
    const response = await Package.update(payload, {
      where: {
        id,
      },
    });

    if (response[0] === 0) {
      return {
        message: 'Paquete no encontrado',
        ok: false,
      };
    }

    return {
      message: 'Paquete actualizado con éxito',
      ok: true,
      data: response[0],
    };
  } catch (error) {
    console.error('Error en updatePackageService:', error);
    return {
      message: 'Error al actualizar el paquete',
      ok: false,
    };
  }
};

export const deletePackageService = async (
  id: number,
): Promise<IServiceResponse<number>> => {
  try {
    const response = await Package.destroy({
      where: {
        id,
      },
    });

    if (response === 0) {
      return {
        message: 'Paquete no encontrado',
        ok: false,
      };
    }

    return {
      message: 'Paquete eliminado con éxito',
      ok: true,
      data: response,
    };
  } catch (error) {
    console.error('Error en deletePackageService:', error);
    return {
      message: 'Error al eliminar el paquete',
      ok: false,
    };
  }
};
