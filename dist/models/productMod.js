"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const config_1 = require("../configuration/config");
class Product extends sequelize_1.Model {
}
Product.init({
    product_id: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    user_id: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false
    },
    category_id: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false
    },
    productName: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    Description: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    basePrice: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false
    },
    bidder_id: {
        type: sequelize_1.DataTypes.INTEGER
    },
    bid_price: {
        type: sequelize_1.DataTypes.INTEGER
    },
    address_id: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false
    },
    status: {
        type: sequelize_1.DataTypes.BOOLEAN,
        defaultValue: true
    }
}, {
    sequelize: config_1.sequelize,
    modelName: 'products'
});
(async () => {
    Product.sync({ alter: true });
})();
exports.default = Product;
//# sourceMappingURL=productMod.js.map