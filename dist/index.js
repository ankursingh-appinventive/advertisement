"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv = __importStar(require("dotenv"));
const userRoutes_1 = __importDefault(require("./routes/userRoutes"));
const productRoutes_1 = __importDefault(require("./routes/productRoutes"));
const adminRoute_1 = __importDefault(require("./routes/adminRoute"));
const config_1 = require("./configuration/config");
const userMod_1 = __importDefault(require("./models/userMod"));
const addressMod_1 = require("./models/addressMod");
const sessionMod_1 = require("./models/sessionMod");
const app = (0, express_1.default)();
app.use(express_1.default.json());
new userMod_1.default();
new addressMod_1.Address();
new sessionMod_1.Session();
dotenv.config();
const port = process.env.DB_PORT || 8080;
(0, config_1.dbConnection)();
app.use('/user', userRoutes_1.default);
app.use('/product', productRoutes_1.default);
app.use('/admin', adminRoute_1.default);
app.listen(port, () => {
    console.log(`listning at PORT : ${port}`);
});
// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjkwODg2NzY0LCJleHAiOjE2OTA5MDQ3NjR9.qTm02W4hrx_ecZSurgs1f0aZfgeU9gcV9pGaOiaq8zc
//# sourceMappingURL=index.js.map