"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.image = void 0;
const image_1 = require("../models/image");
const fs_1 = __importDefault(require("fs"));
class image {
    static async addimages(req, res) {
        try {
            console.log(req.files);
            const pid = req.params.pid;
            const files = req.files;
            const bufferDataArray = [];
            for (let file in files) {
                const fileData = fs_1.default.readFileSync(files[file].path);
                const bufferData = Buffer.from(fileData);
                bufferDataArray.push(bufferData);
                console.log(bufferData);
            }
            //console.log(req.user);
            const images = await image_1.Image.create({ image: bufferDataArray, product_id: pid });
            console.log(images);
            res.status(201).json({ message: "images registered successfully" });
        }
        catch (err) {
            res.status(500).json({ message: "Server Error" });
            console.log(err);
        }
    }
}
exports.image = image;
//# sourceMappingURL=imageCont.js.map