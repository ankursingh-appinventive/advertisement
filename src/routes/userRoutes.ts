import express from 'express'
import { sessionCheck } from "../middlewares/auth";
import  { signup, login, address, updateProfile, updateAddress, logout, deleteU, getProfile, uploadProfilePic, forgetPassword}  from "../controllers/userCont";
import  middlewaremulter from "../middlewares/multer";
const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.delete("/delete/:id", sessionCheck, deleteU);
router.post("/logout", sessionCheck, logout);
router.get('/get', sessionCheck, getProfile);
router.post("/address", sessionCheck, address);
router.put("/update/profile", sessionCheck, updateProfile);
router.put("/update/address", sessionCheck, updateAddress);
router.post("/profilePIC",sessionCheck, middlewaremulter.upload.single("image"), uploadProfilePic);
router.post("/forgetPassword", sessionCheck, forgetPassword);

export default router;