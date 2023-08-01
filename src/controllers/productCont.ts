import Product from "../models/productMod";
import User from "../models/userMod";
import {Request, Response} from "express";
import dotenv from 'dotenv';
dotenv.config();
const SECRET_KEY = process.env.KEY;
import jwt, { JwtPayload } from "jsonwebtoken";

//hello
async function addProduct (req: Request, res: Response, next: any) {
    // const uid = req.userId
    let id
    const token = req.headers.authorization?.split(" ")[1];
    console.log(token);

    const {productName, Description, basePrice, address_id, status, category_id} = req.body;
    try{
        if (!token) {
            return res.status(401).send("Authorization token not found");
        }
        const verifyToken = jwt.verify(token, SECRET_KEY);
        console.log(verifyToken);
        id = verifyToken;
        const result = await Product.create({
            user_id:id.id,
            productName,
            Description,
            basePrice,
            bid_price: basePrice,
            address_id,
            status,
            category_id
        });

        res.status(201).json({user: result});
    }
    catch(error){
        console.log(error);
        res.status(500).json({message: "something went wrong"});
     }
}

async function viewProduct (req: Request, res: Response) {
    const token = req.headers.authorization?.split(" ")[1];
    console.log(token);
    try {
        if (!token) {
            return res.status(401).send("Authorization token not found");
        }
        const verifyToken = jwt.verify(token, SECRET_KEY);
        console.log(verifyToken);
        const id = verifyToken;
        const product = await Product.findAll({ where: { id: id } });
        console.log("products:", product);
        if (!product) {
            return res.status(404).send("No products available");
        } else {
            res.send(product);
        }
    } catch (error) {
        console.log;
        return res.status(401).send("Invalid token");
    }
}

async function getProduct (req: Request, res: Response){
    const category_id = req.body;
    const token = req.headers.authorization?.split(" ")[1];
    console.log(token);
    try {
        if (!token) {
            return res.status(401).send("Authorization token not found");
        }
        const verifyToken = jwt.verify(token, SECRET_KEY);
        console.log(verifyToken);
        const id = verifyToken;
        const user = await User.findOne({ where: { id: id } });
        // console.log("products:", user);
        if (!user) {
            return res.status(404).send("User not found");
        } else {
            const product = await Product.findAll({ where: { category_id: category_id } });
            if (!product) {
                return res.status(404).send("No products available");
            } else {
                res.send(product);
            }
        }
    } catch (error) {
        console.log;
        return res.status(401).send("Invalid token");
    }
}

async function bidProduct (req: Request, res: Response) {
    const token = req.headers.authorization?.split(" ")[1];
    console.log(token);
    try {
        if (!token) {
        return res.status(401).send("Authorization token not found");
        }
        const verifyToken = jwt.verify(token, SECRET_KEY);
        console.log(verifyToken);
        const id = verifyToken;
        const { product_id, amount } = req.body;
        const product = await Product.findOne({ where: { product_id: product_id } });
        if (!product) {
            return res.status(404).send("Product not found");
        }
        if(amount > product.bid_price){
            product.bid_price = amount;
            product.bidder_id = +id;
            await product.save();
        }

        res.send("Bidding successfull");
        } catch (error) {
        console.log(error);
        return res.status(401).send("Invalid token");
        }
}


async function deleteProduct (req: Request, res: Response) {
    const id =req.params.id;
    try {
        const product = await Product.findOne({where:{product_id: id}});
        if(!product){
            return res.status(404).json({ message: "product not found" });
        }
        await Product.destroy({where: {product_id: id}});
        res.status(200).json({message: "product deleted successfully"});
    } catch (error) {
            console.log(error);
            res.status(500).json({message: "something went wrong"});   
    }
}


export {
    addProduct,
    viewProduct,
    bidProduct,
    deleteProduct,
    getProduct
}