import { Model, DataTypes, CreationOptional, InferAttributes, InferCreationAttributes, Association } from 'sequelize';
import sequelize from "../init/database";
import Class from "./class";
import Question from './question';
import ClassCardset from './class_cardset';

interface CardsetModel extends Model<InferAttributes<CardsetModel>, InferCreationAttributes<CardsetModel>> {
    // Some fields are optional when calling UserModel.create() or UserModel.build()
    cardset_id: CreationOptional<Number>,
    cardset_title: string,
    is_available: boolean,
    create_by: number
};

const Cardset = sequelize.define<CardsetModel>("cardset", {
    cardset_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    cardset_title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    is_available: {
        type: DataTypes.BOOLEAN,
        allowNull: false
    },
    create_by: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
})


Cardset.belongsToMany(
    Class,
    {
        through: ClassCardset,
        foreignKey: "cardset_id",
        otherKey: "class_id"
    }
)

Cardset.hasMany(Question, { foreignKey: "cardset_id" })
Question.belongsTo(Cardset, { foreignKey: "cardset_id" })


export default Cardset;