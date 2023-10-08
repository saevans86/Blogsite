const { Model, DataTypes } = require('sequelize');
const bcrypt = require('bcrypt');
const sequelize = require(''); //pending build connection

class User extends Model {
    checkPassword(loginPw) {
        return bcrypt.compareSync(loginPw, this.password);
    }
}

User.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        user_name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                isEmail: true,
            },
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [8],
            },
        },
    },
    {
        hooks: {
            beforeCreate: async (newUserDeets) => {
                newUserDeets.password = await bcrypt.hash(newUserDeets.password, 10);
                return newUserDeets;
            },
            beforeUpdate: async (updatedUserDeets) => {
                updatedUserDeets.password = await bcrypt.hash(updatedUserDeets.password, 10);
                return updatedUserDeets;
            },
        },
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'user',
    }
);

module.exports = User;
