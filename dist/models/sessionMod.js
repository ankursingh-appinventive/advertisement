"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Session = void 0;
const sequelize_1 = __importDefault(require("sequelize"));
const config_1 = require("../configuration/config");
const Session = config_1.sequelize.define("sessions", {
    id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: sequelize_1.default.INTEGER
    },
    user_id: {
        type: sequelize_1.default.INTEGER
    },
    device_id: {
        type: sequelize_1.default.STRING
    },
    status: {
        type: sequelize_1.default.BOOLEAN,
        defaultValue: true
    }
});
exports.Session = Session;
(async () => {
    Session.sync({ alter: true });
})();
//# sourceMappingURL=sessionMod.js.map