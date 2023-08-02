"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadimage = exports.getProduct = exports.deleteProduct = exports.bidProduct = exports.viewOWNproduct = exports.addProduct = void 0;
const productMod_1 = __importDefault(require("../models/productMod"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const SECRET_KEY = process.env.KEY;
async function addProduct(req, res, next) {
    const uid = req.userId;
    const { productName, Description, basePrice, address_id, status, category_id } = req.body;
    try {
        const result = await productMod_1.default.create({
            user_id: uid,
            productName,
            Description,
            basePrice,
            bid_price: basePrice,
            address_id,
            status,
            category_id
        });
        res.status(201).json({ user: result });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: "something went wrong" });
    }
}
exports.addProduct = addProduct;
async function viewOWNproduct(req, res) {
    const uid = req.userId;
    try {
        const product = await productMod_1.default.findAll({ where: { id: uid } });
        if (!product) {
            return res.status(404).send("No products available");
        }
        else {
            res.status(200).send(product);
        }
    }
    catch (error) {
        return res.status(401).json({ message: "Invalid token" });
    }
}
exports.viewOWNproduct = viewOWNproduct;
async function getProduct(req, res) {
    const category_id = req.body.categoryID;
    try {
        const product = await productMod_1.default.findAll({ where: { category_id: category_id } });
        if (!product) {
            return res.status(404).send("No products available");
        }
        else {
            res.status(201).send(product);
        }
    }
    catch (error) {
        return res.status(401).json({ message: "Invalid token" });
    }
}
exports.getProduct = getProduct;
async function bidProduct(req, res) {
    const uid = req.userId;
    const { product_id, amount } = req.body;
    try {
        const product = await productMod_1.default.findOne({ where: { product_id: product_id } });
        if (!product) {
            return res.status(404).send("Product not found");
        }
        if (amount > product.bid_price && product.user_id != uid) {
            product.bid_price = amount;
            product.bidder_id = uid;
            await product.save();
        }
        res.status(200).json({ message: "Bidding successfull" });
    }
    catch (error) {
        console.log(error);
        return res.status(401).json({ message: "Something went wrong" });
    }
}
exports.bidProduct = bidProduct;
async function deleteProduct(req, res) {
    const uid = req.userId;
    const id = req.params.id;
    try {
        const product = await productMod_1.default.findOne({ where: { product_id: id, user_id: uid } });
        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }
        await product.destroy();
        res.status(200).json({ message: "Product deleted successfully" });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: "something went wrong" });
    }
}
exports.deleteProduct = deleteProduct;
async function uploadimage(req, res) {
}
exports.uploadimage = uploadimage;
//# sourceMappingURL=productCont.js.map