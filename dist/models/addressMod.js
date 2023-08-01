"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Address = void 0;
const sequelize_1 = require("sequelize");
const config_1 = require("../configuration/config");
class Address extends sequelize_1.Model {
}
exports.Address = Address;
Address.init({
    address_id: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    user_Id: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false
    },
    houseNo: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    street: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    area: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    landmark: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    district: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    city: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    state: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    country: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    zip: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    address_type: {
        type: sequelize_1.DataTypes.STRING,
        defaultValue: true
    },
    status: {
        type: sequelize_1.DataTypes.BOOLEAN,
        allowNull: false
    },
}, {
    sequelize: config_1.sequelize,
    modelName: 'addresses'
});
(async () => {
    Address.sync({ alter: true });
})();
//# sourceMappingURL=addressMod.js.map