import express from "express";
import { image } from "../controllers/imageCont";
import { sessionCheck } from "../middlewares/auth";
import { upload } from "../middlewares/imagemulter";
const imageRouter = express.Router();

imageRouter.get("/");
imageRouter.post("/addImage/:pid", upload.array('images', 5), image.addimages);
// imageRouter.post("/addImage/:pid", upload.single('images'), image.addimages);

export { imageRouter };