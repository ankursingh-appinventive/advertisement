"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require('express');
const auth_1 = require("../middlewares/auth");
const productCont_1 = require("../controllers/productCont");
const router = express.Router();
// router.post("/add", sessionCheck, upload, addProduct);
router.post("/add", auth_1.sessionCheck, productCont_1.addProduct);
router.get("/view", auth_1.sessionCheck, productCont_1.viewProduct);
router.get("/get", auth_1.sessionCheck, productCont_1.getProduct);
router.put("/bid", auth_1.sessionCheck, productCont_1.bidProduct);
router.delete("/delete", auth_1.sessionCheck, productCont_1.deleteProduct);
exports.default = router;
//# sourceMappingURL=productRoutes.js.map