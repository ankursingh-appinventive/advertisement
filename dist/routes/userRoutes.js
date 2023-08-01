"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require('express');
const auth_1 = require("../middlewares/auth");
const userCont_1 = require("../controllers/userCont");
const router = express.Router();
router.post("/signup", userCont_1.signup);
router.post("/login", userCont_1.login);
router.delete("/delete/:id", auth_1.sessionCheck, userCont_1.deleteU);
router.post("/logout", auth_1.sessionCheck, userCont_1.logout);
router.get('/get', auth_1.sessionCheck, userCont_1.getProfile);
router.post("/address", auth_1.sessionCheck, userCont_1.address);
router.put("/update/profile", auth_1.sessionCheck, userCont_1.updateProfile);
router.put("/update/address", auth_1.sessionCheck, userCont_1.updateAddress);
exports.default = router;
//# sourceMappingURL=userRoutes.js.map