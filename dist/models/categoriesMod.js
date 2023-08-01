"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const config_1 = require("../configuration/config");
class Category extends sequelize_1.Model {
}
Category.init({
    category_id: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    categoryName: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    SubCategory: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
}, {
    sequelize: config_1.sequelize,
    modelName: 'categories'
});
(async () => {
    Category.sync({ alter: true });
})();
exports.default = Category;
//# sourceMappingURL=categoriesMod.js.map