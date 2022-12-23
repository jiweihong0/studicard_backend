import { Model, DataTypes, CreationOptional, InferAttributes, InferCreationAttributes } from 'sequelize';
import sequelize from "../init/database";

interface AccountModel extends Model<InferAttributes<AccountModel>, InferCreationAttributes<AccountModel>> {
    // Some fields are optional when calling UserModel.create() or UserModel.build()
    account_id: CreationOptional<Number>,
    account_name: string,
    status: boolean,
    password: string,
    email: string
  }

const Account = sequelize.define<AccountModel>("account", {
    account_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    account_name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    status: {
        type: DataTypes.BOOLEAN,
        allowNull: false
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false
    },
})

export default Account;