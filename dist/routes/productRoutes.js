"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express = require('express');
const auth_1 = require("../middlewares/auth");
const productCont_1 = require("../controllers/productCont");
const multer_1 = __importDefault(require("../middlewares/multer"));
const router = express.Router();
router.post("/add", auth_1.sessionCheck, productCont_1.addProduct);
router.get("/view", auth_1.sessionCheck, productCont_1.viewOWNproduct);
router.get("/get", auth_1.sessionCheck, productCont_1.getProduct);
router.post("/bid", auth_1.sessionCheck, productCont_1.bidProduct);
router.delete("/delete/:id", auth_1.sessionCheck, productCont_1.deleteProduct);
router.post("/profilePIC", auth_1.sessionCheck, multer_1.default.upload.any(), productCont_1.uploadimage);
exports.default = router;
//# sourceMappingURL=productRoutes.js.map