const express = require('express');
import { addCategory, deleteCategory } from "../controllers/category";

import { sessionCheck } from "../middlewares/auth";
const router = express.Router();


router.post("/add",sessionCheck, addCategory);
router.delete("/delete",sessionCheck, deleteCategory);


export default router;