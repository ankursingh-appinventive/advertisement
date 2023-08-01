"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getProduct = exports.deleteProduct = exports.bidProduct = exports.viewProduct = exports.addProduct = void 0;
const productMod_1 = __importDefault(require("../models/productMod"));
const userMod_1 = __importDefault(require("../models/userMod"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const SECRET_KEY = process.env.KEY;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
async function addProduct(req, res, next) {
    // const uid = req.userId
    let id;
    const token = req.headers.authorization?.split(" ")[1];
    console.log(token);
    const { productName, Description, basePrice, address_id, status, category_id } = req.body;
    try {
        if (!token) {
            return res.status(401).send("Authorization token not found");
        }
        const verifyToken = jsonwebtoken_1.default.verify(token, SECRET_KEY);
        console.log(verifyToken);
        id = verifyToken;
        const result = await productMod_1.default.create({
            user_id: id.id,
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
async function viewProduct(req, res) {
    const token = req.headers.authorization?.split(" ")[1];
    console.log(token);
    try {
        if (!token) {
            return res.status(401).send("Authorization token not found");
        }
        const verifyToken = jsonwebtoken_1.default.verify(token, SECRET_KEY);
        console.log(verifyToken);
        const id = verifyToken;
        const product = await productMod_1.default.findAll({ where: { id: id } });
        console.log("products:", product);
        if (!product) {
            return res.status(404).send("No products available");
        }
        else {
            res.send(product);
        }
    }
    catch (error) {
        console.log;
        return res.status(401).send("Invalid token");
    }
}
exports.viewProduct = viewProduct;
async function getProduct(req, res) {
    const category_id = req.body;
    const token = req.headers.authorization?.split(" ")[1];
    console.log(token);
    try {
        if (!token) {
            return res.status(401).send("Authorization token not found");
        }
        const verifyToken = jsonwebtoken_1.default.verify(token, SECRET_KEY);
        console.log(verifyToken);
        const id = verifyToken;
        const user = await userMod_1.default.findOne({ where: { id: id } });
        // console.log("products:", user);
        if (!user) {
            return res.status(404).send("User not found");
        }
        else {
            const product = await productMod_1.default.findAll({ where: { category_id: category_id } });
            if (!product) {
                return res.status(404).send("No products available");
            }
            else {
                res.send(product);
            }
        }
    }
    catch (error) {
        console.log;
        return res.status(401).send("Invalid token");
    }
}
exports.getProduct = getProduct;
async function bidProduct(req, res) {
    const token = req.headers.authorization?.split(" ")[1];
    console.log(token);
    try {
        if (!token) {
            return res.status(401).send("Authorization token not found");
        }
        const verifyToken = jsonwebtoken_1.default.verify(token, SECRET_KEY);
        console.log(verifyToken);
        const id = verifyToken;
        const { product_id, amount } = req.body;
        const product = await productMod_1.default.findOne({ where: { product_id: product_id } });
        if (!product) {
            return res.status(404).send("Product not found");
        }
        if (amount > product.bid_price) {
            product.bid_price = amount;
            product.bidder_id = +id;
            await product.save();
        }
        res.send("Bidding successfull");
    }
    catch (error) {
        console.log(error);
        return res.status(401).send("Invalid token");
    }
}
exports.bidProduct = bidProduct;
async function deleteProduct(req, res) {
    const id = req.params.id;
    try {
        const product = await productMod_1.default.findOne({ where: { product_id: id } });
        if (!product) {
            return res.status(404).json({ message: "product not found" });
        }
        await productMod_1.default.destroy({ where: { product_id: id } });
        res.status(200).json({ message: "product deleted successfully" });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: "something went wrong" });
    }
}
exports.deleteProduct = deleteProduct;
//# sourceMappingURL=productCont.js.map