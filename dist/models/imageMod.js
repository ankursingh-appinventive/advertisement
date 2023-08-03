"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const config_1 = require("../configuration/config");
class Image extends sequelize_1.Model {
}
Image.init({
    image_id: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    product_id: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    image: {
        type: sequelize_1.DataTypes.BLOB,
        allowNull: false
    },
}, {
    sequelize: config_1.sequelize,
    modelName: 'images'
});
(async () => {
    Image.sync({ alter: true });
})();
exports.default = Image;
//# sourceMappingURL=imageMod.js.map