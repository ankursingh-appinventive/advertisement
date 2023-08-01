"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.dbConnection = exports.sequelize = void 0;
const Sequelize = require('sequelize');
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
exports.sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USERNAME, process.env.DB_PASS, {
    host: process.env.DB_HOST,
    dialect: process.env.DB_DIALECT,
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    },
});
const dbConnection = async () => {
    try {
        const msgOnConnect = await exports.sequelize.authenticate();
        console.log('Database is connected');
    }
    catch (error) {
        console.log('Unable to connect to database', error);
    }
};
exports.dbConnection = dbConnection;
//# sourceMappingURL=config.js.map