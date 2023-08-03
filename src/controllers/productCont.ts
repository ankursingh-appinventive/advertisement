import Product from "../models/productMod";
import User from "../models/userMod";
import {Request, Response} from "express";
import dotenv from 'dotenv';
import path from "path";
import fs from "fs";
dotenv.config();
const SECRET_KEY = process.env.KEY;
import jwt, { JwtPayload } from "jsonwebtoken";

//hello
async function addProduct (req: Request, res: Response, next: any) {
    const uid = req.userId
    const {productName, Description, basePrice, address_id, status, category_id} = req.body;
    try{
        const result = await Product.create({
            user_id:uid,
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

async function viewOWNproduct (req: Request, res: Response) {
    const uid = req.userId
    try {
        const product = await Product.findAll({ where: { id: uid }});
        if (!product) {
            return res.status(404).send("No products available");
        } else {
            res.status(200).send(product);
        }
    } catch (error) {
        return res.status(401).json({message:"Invalid token"});
    }
}

async function getProduct (req: Request, res: Response){
    const category_id = req.body.categoryID;
    try {
            const product = await Product.findAll({ where: { category_id: category_id } });
            if (!product) {
                return res.status(404).send("No products available");
            } else {
                res.status(201).send(product);
            }
        
    } catch (error) {
        return res.status(401).json({message:"Invalid token"});
    }
}

async function bidProduct (req: Request, res: Response) {
    const uid = req.userId
    const { product_id, amount } = req.body;
    try {
        const product = await Product.findOne({ where: { product_id: product_id } });
        if (!product) {
            return res.status(404).send("Product not found");
        }
        if(amount > product.bid_price && product.user_id != uid){
            product.bid_price = amount;
            product.bidder_id = uid;
            await product.save();
        }
        res.status(200).json({message:"Bidding successfull"});
    } catch (error) {
        console.log(error);
        return res.status(401).json({message:"Something went wrong"});
    }
}

async function deleteProduct (req: Request, res: Response) {
    const uid = req.userId
    const id =req.params.id;
    try {
        const product = await Product.findOne({where:{product_id: id, user_id:uid}});
        if(!product){
            return res.status(404).json({ message: "Product not found" });
        }
        await product.destroy();
        res.status(200).json({message: "Product deleted successfully"});
    } catch (error) {
            console.log(error);
            res.status(500).json({message: "something went wrong"});   
    }
}

async function uploadimage (req:Request, res:Response){

}



export async function addProductImage(req: Request, res: Response) {
    console.log("part1");
    const token = req.headers.authorization?.split(" ")[1];
    console.log(token);
    if (!token) {
      return res.status(401).send("Authorization token not found");
    }
    const decodedToken = <JwtPayload>jwt.verify(token, "secret");
    const userId = decodedToken.id;

  if (!req.file) {
    return res.status(400).json({ error: "No file uploaded" });
  }
  const product_id = Number(req.params.id);
  console.log("part2");
  if (!product_id) {
    return res.status(400).json({ error: "No Product id found" });
  }

  const imagePath = "./public/uploads/" + req.file.originalname;
  console.log("part3");
  const productPic = fs.readFileSync(path.resolve(imagePath));

  const product:any = await Product.findOne({ where: { user_id : userId , product_id: product_id } });

  if (!product) {
    return res.status(400).json({ error: "No Such Product Found" });
  }

  product.productimages = productPic;

  await product.save();

  fs.unlink(path.resolve(imagePath), (err) => {
    console.log("error in file delete:", err);
  });

  return res
    .status(200)
    .json({ message: "Product Image updated successfully" });
}

export {
    addProduct,
    viewOWNproduct,
    bidProduct,
    deleteProduct,
    getProduct,
    uploadimage,
}