"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.imageRouter = void 0;
const express_1 = __importDefault(require("express"));
const imageCont_1 = require("../controllers/imageCont");
const imagemulter_1 = require("../middlewares/imagemulter");
const imageRouter = express_1.default.Router();
exports.imageRouter = imageRouter;
imageRouter.get("/");
imageRouter.post("/addImage/:pid", imagemulter_1.upload.array('images', 5), imageCont_1.image.addimages);
//# sourceMappingURL=imageroute.js.map