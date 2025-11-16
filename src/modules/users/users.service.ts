import User from './models/users.model';
import { Op } from 'sequelize';

import { ICreateUser } from './dtos/CreateUser.dto';
import { IUpdateUser } from './dtos/UpdateUser.dto';

import { IUserFilter, IUser } from './interfaces/users.interface';

import { IServiceResponse } from '../../types';
import { sequelize } from '../../config/database.config';

export const createUserService = async (
  payload: ICreateUser,
): Promise<IServiceResponse<IUser>> => {
  try {
    // Check if email already exists
    const existingUser = await User.findOne({
      where: { email: payload.email },
    });

    if (existingUser) {
      return {
        message: 'El email ya está en uso',
        ok: false,
      };
    }

    const user = await User.create(payload);

    return {
      message: 'Usuario creado con éxito',
      ok: true,
      data: user.dataValues,
    };
  } catch (error) {
    console.error('Error en createUserService:', error);
    return {
      message: 'Error al crear el usuario',
      ok: false,
    };
  }
};

// Esqueleto para obtener el perfil del usuario (implementación pendiente)
export const getUserProfileService = async (
  id: string,
): Promise<IServiceResponse<User | null>> => {
  try {
    const user = await User.findByPk(id);

    if (!user) {
      return {
        message: 'Usuario no encontrado',
        ok: false,
      };
    }

    return {
      message: 'Perfil de usuario',
      ok: true,
      data: user,
    };
  } catch (error) {
    console.error('Error en getUserProfileService:', error);
    return {
      message: 'Error al obtener el perfil de usuario',
      ok: false,
    };
  }
};

export const getUsersService = async (
  filter: IUserFilter,
): Promise<IServiceResponse<User[]>> => {
  try {
    const whereConditions: any = {};

    if (filter.firstName) {
      whereConditions.firstName = {
        [Op.iLike]: `%${filter.firstName}%`,
      };
    }

    if (filter.lastName) {
      whereConditions.lastName = {
        [Op.iLike]: `%${filter.lastName}%`,
      };
    }

    if (filter.email) {
      whereConditions.email = {
        [Op.iLike]: `%${filter.email}%`,
      };
    }

    if (filter.role) {
      whereConditions.role = filter.role;
    }

    if (filter.country) {
      whereConditions.country = {
        [Op.iLike]: `%${filter.country}%`,
      };
    }

    if (filter.city) {
      whereConditions.city = {
        [Op.iLike]: `%${filter.city}%`,
      };
    }

    const users = await User.findAll({
      where: whereConditions,
      order: [['createdAt', 'DESC']],
      limit: 100, // Limitar resultados para evitar sobrecarga
    });

    return {
      message: 'Usuarios obtenidos con éxito',
      ok: true,
      data: users,
    };
  } catch (error) {
    console.error('Error en getUsersService:', error);
    return {
      message: 'Error al obtener los usuarios',
      ok: false,
    };
  }
};

export const getUserByIdService = async (
  id: string,
): Promise<IServiceResponse<IUser>> => {
  try {
    const user = await User.findByPk(id);

    if (!user) {
      return {
        message: 'Usuario no encontrado',
        ok: false,
      };
    }

    return {
      message: 'Usuario obtenido con éxito',
      ok: true,
      data: user.dataValues,
    };
  } catch (error) {
    console.error('Error en getUserByIdService:', error);
    return {
      message: 'Error al obtener el usuario',
      ok: false,
    };
  }
};

export const updateUserService = async (
  id: string,
  payload: IUpdateUser,
): Promise<IServiceResponse<number>> => {
  try {
    // If updating email, ensure it is not used by another user
    if (payload.email) {
      const existingUser = await User.findOne({
        where: {
          email: payload.email,
          id: { [Op.ne]: id },
        },
      });

      if (existingUser) {
        return {
          message: 'El email ya está siendo usado por otro usuario',
          ok: false,
        };
      }
    }

    const response = await User.update(payload, {
      where: {
        id,
      },
    });

    if (response[0] === 0) {
      return {
        message: 'Usuario no encontrado',
        ok: false,
      };
    }

    return {
      message: 'Usuario actualizado con éxito',
      ok: true,
      data: response[0],
    };
  } catch (error) {
    console.error('Error en updateUserService:', error);
    return {
      message: 'Error al actualizar el usuario',
      ok: false,
    };
  }
};

export const deleteUserService = async (
  id: string,
): Promise<IServiceResponse<number>> => {
  try {
    const response = await User.destroy({
      where: {
        id,
      },
      // force: true // HARD - delete
    });

    if (response === 0) {
      return {
        message: 'Usuario no encontrado',
        ok: false,
      };
    }

    return {
      message: 'Usuario eliminado con éxito',
      ok: true,
      data: response,
    };
  } catch (error) {
    console.error('Error en deleteUserService:', error);
    return {
      message: 'Error al eliminar el usuario',
      ok: false,
    };
  }
};
