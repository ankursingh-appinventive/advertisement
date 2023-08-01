import Category from "../models/categoriesMod";
import { Request, Response } from "express";


async function addCategory(req: Request, res: Response){

    const { name, category, subcategory } = req.body;
    if(name!="ankur"){
        console.log("Only admin allow to handle category");
    }
    const result = await Category.create({
        categoryName:category,
        SubCategory: subcategory
    });
    
}

async function deleteCategory(req: Request, res: Response){
    // const id =req.params.id;
    const { name, id } = req.body;
    if(name!="ankur"){
        console.log("Only admin allow to handle category");
    }
    try {
        const category = await Category.findOne({where:{category_id: id}});
        if(!category){
            return res.status(404).json({ message: "category not found" });
        }
        await Category.destroy({where: {category_id: id}});
        res.status(200).json({message: "category deleted successfully"});
    } catch (error) {
            console.log(error);
            res.status(500).json({message: "something went wrong"});   
    }
}

export {
    addCategory,
    deleteCategory
}