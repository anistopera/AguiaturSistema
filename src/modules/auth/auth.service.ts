import { IRegisterDto } from './dtos/Register.dto';
import { ILoginDto } from './dtos/Login.dto';
import { IForgotPasswordDto } from './dtos/ForgotPassword.dto';
import { IResetPasswordDto } from './dtos/ResetPassword.dto';
import { IAuthResponse } from './interfaces/auth.interfaces';
import User from '../users/models/users.model';
import { UserRole } from '../users/interfaces/users.interface';
import { securePass } from '../../tools/crypto.tool';
import { generateAccessToken } from '../../tools/jwt.tool';

export const registerService = async ( payload: IRegisterDto,): Promise<IAuthResponse> => {
  try {
    const existing = await User.findOne({ where: { email: payload.email } });
    if (existing) {
      return { ok: false, message: 'Email en uso' };
    }

    const passHash = await securePass(payload.password);

    console.log('passHash', passHash);
    if (passHash === undefined) {
      throw new Error('Ha fallado el hash de la contraseña');
    }

    const user = await User.create({
      ...payload,
      
      role: UserRole.USER,
      password: passHash,
    });

    return {
      ok: true,
      message: 'Registro exitoso',
      data: { id: user.id, email: user.email },
    };
  } catch (error) {
    console.error('Error en registerService:', error);
    return { ok: false, message: 'Error al registrar' };
  }
};

export const loginService = async (
  payload: ILoginDto,): Promise<IAuthResponse> => {
  try {
    const user = await User.findOne({ where: { email: payload.email } });
    if (!user) {
      return {
        ok: false,
        message: 'Credenciales no válidas',
      };
    }

    
    const token = generateAccessToken({
      email: user.email,
      name: `${user.firstName} ${user.lastName}`,
      sub: user.id,
    });

    return {
      ok: true,
      message: 'Inicio de sesión exitoso',
      data: {
        id: user.id,
        email: user.email,
        token,
      },
    };
  } catch (error) {
    console.error('Error en loginService:', error);
    return { ok: false, message: 'Error al iniciar sesión' };
  }
};

export const forgotPasswordService = async (
  _payload: IForgotPasswordDto,
): Promise<IAuthResponse> => {
  try {
    return { ok: true, message: 'recuperacion de contraseña pendiente' };
  } catch (error) {
    console.error('Error en la contraseña:', error);
    return { ok: false, message: 'Error al procesar la recupracion de contraseña' };
  }
};

export const resetPasswordService = async (
  _payload: IResetPasswordDto,
): Promise<IAuthResponse> => {
  try {
    return { ok: true, message: 'implementacion pendiente de la recuperacion de la contraseña ' };
  } catch (error) {
    console.error('Error en resetPasswordService:', error);
    return { ok: false, message: 'Error al restablecer la contraseña' };
  }
};
