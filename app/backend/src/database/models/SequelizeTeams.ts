import {
  CreationOptional,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
} from 'sequelize';
import db from '.';

export default class SequelizeTeams extends Model<InferAttributes<SequelizeTeams>,
InferCreationAttributes<SequelizeTeams>> {
  declare id: CreationOptional<number>;
  declare teamName: string;
}

SequelizeTeams.init({
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
  },
  teamName: {
    type: DataTypes.STRING,
    allowNull: false,
    field: 'team_name',
  },
}, {
  sequelize: db,
  tableName: 'teams',
  timestamps: false,
  underscored: true,
});
