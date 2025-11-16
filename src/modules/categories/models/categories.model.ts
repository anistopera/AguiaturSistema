import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '../../../config/database.config';

import { ICategory } from '../interfaces/categories.interface';
import Package from '../../packages/models/packages.model';

export interface CategoryCreationAttributes extends Optional<ICategory, 'id'> {}

class Category
  extends Model<ICategory, CategoryCreationAttributes>
  implements ICategory
{
  public id!: number;
  public name!: string;
  public description!: string;
  declare createdAt: Date;
  declare updatedAt: Date;
}

Category.init(
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
  },
  {
    sequelize,
    tableName: 'categories',
    timestamps: true,
  },
);

Category.hasMany(Package, {
  foreignKey: 'category_id',
  as: 'packages',
});

Package.belongsTo(Category, {
  foreignKey: 'category_id',
  as: 'category',
});

export default Category;
