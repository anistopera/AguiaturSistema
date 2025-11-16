import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '../../../config/database.config';

import { IPackage } from '../interfaces/packages.interface';

export interface PackageCreationAttributes extends Optional<IPackage, 'id'> {};

class Package
  extends Model<IPackage, PackageCreationAttributes>
  implements IPackage
{
  public id!: number;
  public name!: string;
  public description!: string;
  public price!: number;
  public duration!: number;
  public languages!: string[];
  public includes!: string[];
  public images!: string[];
  public departure_dates!: Date[];

  public category_id!: number;
  declare createdAt: Date;
  declare updatedAt: Date;
}

Package.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
        len: [2, 100],
      },
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        notEmpty: true,
        len: [10, 2000],
      },
    },
    price: {
      type: DataTypes.FLOAT,
      allowNull: false,
      validate: {
        isFloat: true,
        min: 0,
      },
    },
    duration: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        isInt: true,
        min: 1,
      },
    },
    languages: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: false,
    },
    includes: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: false,
    },
    images: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: false,
    },
    departure_dates: {
      type: DataTypes.ARRAY(DataTypes.DATE),
      allowNull: false,
    },
    category_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'categories',
            key: 'id'
        }
    }
  },
  {
    sequelize,
    tableName: 'packages',
    timestamps: true,
  },
);

export default Package;
