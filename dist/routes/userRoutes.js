"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_1 = require("../middlewares/auth");
const userCont_1 = require("../controllers/userCont");
const multer_1 = __importDefault(require("../middlewares/multer"));
const router = express_1.default.Router();
router.post("/signup", userCont_1.signup);
router.post("/login", userCont_1.login);
router.delete("/delete/:id", auth_1.sessionCheck, userCont_1.deleteU);
router.post("/logout", auth_1.sessionCheck, userCont_1.logout);
router.get('/get', auth_1.sessionCheck, userCont_1.getProfile);
router.post("/address", auth_1.sessionCheck, userCont_1.address);
router.put("/update/profile", auth_1.sessionCheck, userCont_1.updateProfile);
router.put("/update/address", auth_1.sessionCheck, userCont_1.updateAddress);
router.post("/profilePIC", auth_1.sessionCheck, multer_1.default.upload.single("image"), userCont_1.uploadProfilePic);
router.post("/forgetPassword", auth_1.sessionCheck, userCont_1.forgetPassword);
exports.default = router;
//# sourceMappingURL=userRoutes.js.map