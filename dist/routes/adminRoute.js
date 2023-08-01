"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require('express');
const category_1 = require("../controllers/category");
const auth_1 = require("../middlewares/auth");
const router = express.Router();
router.post("/add", auth_1.sessionCheck, category_1.addCategory);
router.delete("/delete", auth_1.sessionCheck, category_1.deleteCategory);
exports.default = router;
//# sourceMappingURL=adminRoute.js.map