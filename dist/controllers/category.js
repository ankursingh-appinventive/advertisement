"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteCategory = exports.addCategory = void 0;
const categoriesMod_1 = __importDefault(require("../models/categoriesMod"));
async function addCategory(req, res) {
    const { name, category, subcategory } = req.body;
    if (name != "ankur") {
        console.log("Only admin allow to handle category");
    }
    const result = await categoriesMod_1.default.create({
        categoryName: category,
        SubCategory: subcategory
    });
}
exports.addCategory = addCategory;
async function deleteCategory(req, res) {
    // const id =req.params.id;
    const { name, id } = req.body;
    if (name != "ankur") {
        console.log("Only admin allow to handle category");
    }
    try {
        const category = await categoriesMod_1.default.findOne({ where: { category_id: id } });
        if (!category) {
            return res.status(404).json({ message: "category not found" });
        }
        await categoriesMod_1.default.destroy({ where: { category_id: id } });
        res.status(200).json({ message: "category deleted successfully" });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: "something went wrong" });
    }
}
exports.deleteCategory = deleteCategory;
//# sourceMappingURL=category.js.map