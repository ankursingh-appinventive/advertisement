"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const config_1 = require("../configuration/config");
// import {Address} from './addressMod';
class User extends sequelize_1.Model {
}
User.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    username: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    password: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    fav: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    status: {
        type: sequelize_1.DataTypes.BOOLEAN,
        defaultValue: true
    },
    DOB: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: false
    },
    profilePIC: {
        type: sequelize_1.DataTypes.BLOB
    },
    phone_number: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false
    },
    gender: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
}, {
    sequelize: config_1.sequelize,
    modelName: 'users'
});
(async () => {
    User.sync({ alter: true });
})();
// User.hasMany(Address,{as:'addresses', foreignKey:'user_Id'})
exports.default = User;
//# sourceMappingURL=userMod.js.map