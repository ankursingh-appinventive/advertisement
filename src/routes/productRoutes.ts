const express = require('express');
import { sessionCheck } from "../middlewares/auth";
import  { addProduct, viewProduct, bidProduct, deleteProduct, getProduct }  from "../controllers/productCont";



const router = express.Router();

// router.post("/add", sessionCheck, upload, addProduct);
router.post("/add", sessionCheck, addProduct);

router.get("/view",sessionCheck, viewProduct);
router.get("/get",sessionCheck, getProduct);
router.put("/bid",sessionCheck, bidProduct);
router.delete("/delete",sessionCheck, deleteProduct);

export default router;