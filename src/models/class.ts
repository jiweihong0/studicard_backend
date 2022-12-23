import { Model, DataTypes, CreationOptional, InferAttributes, InferCreationAttributes } from 'sequelize';
import sequelize from "../init/database";
import Cardset from './cardset';
import ClassCardset from './class_cardset';


interface ClassModel extends Model<InferAttributes<ClassModel>, InferCreationAttributes<ClassModel>> {
    // Some fields are optional when calling UserModel.create() or UserModel.build()
    class_id: CreationOptional<Number>,
    class_title: string
  }

const Class = sequelize.define<ClassModel>("class", {
    class_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    class_title: {
        type: DataTypes.STRING,
        allowNull: false
    },
})




export default Class; 