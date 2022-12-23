// class cardset 

import { Model, DataTypes, CreationOptional, InferAttributes, InferCreationAttributes, Association } from 'sequelize';
import sequelize from "../init/database";


interface AccountClass extends Model<InferAttributes<AccountClass>, InferCreationAttributes<AccountClass>> {
    // Some fields are optional when calling UserModel.create() or UserModel.build()
    account_id: number,
    class_id: number,
};

const AccountClass = sequelize.define<AccountClass>("accountclass", {
    account_id: {
        type: DataTypes.INTEGER,
        primaryKey: true
    },
    class_id: {
        type: DataTypes.STRING,
        allowNull: false
    },
})


export default AccountClass;