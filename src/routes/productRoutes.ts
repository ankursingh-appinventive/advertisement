const express = require('express');
import { sessionCheck } from "../middlewares/auth";
import  { addProduct, viewOWNproduct, bidProduct, deleteProduct, getProduct,  uploadimage}  from "../controllers/productCont";
import  middlewaremulter from "../middlewares/multer";
const router = express.Router();

router.post("/add", sessionCheck, addProduct);
router.get("/view",sessionCheck, viewOWNproduct);
router.get("/get",sessionCheck, getProduct);
router.post("/bid",sessionCheck, bidProduct);
router.delete("/delete/:id",sessionCheck, deleteProduct);
router.post("/profilePIC",sessionCheck, middlewaremulter.upload.any(), uploadimage);

export default router;