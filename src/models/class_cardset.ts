// class cardset 

import { Model, DataTypes, CreationOptional, InferAttributes, InferCreationAttributes, Association } from 'sequelize';
import sequelize from "../init/database";


interface ClassCardset extends Model<InferAttributes<ClassCardset>, InferCreationAttributes<ClassCardset>> {
    // Some fields are optional when calling UserModel.create() or UserModel.build()
    cardset_id: number,
    class_id: number,
};

const ClassCardset = sequelize.define<ClassCardset>("classcardset", {
    cardset_id: {
        type: DataTypes.INTEGER,
        primaryKey: true
    },
    class_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
})


export default ClassCardset;