"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadProfile = exports.upload = exports.multer = void 0;
const multer_1 = __importDefault(require("multer"));
exports.multer = multer_1.default;
const path_1 = __importDefault(require("path"));
// const upload = multer({
//     storage: multer.diskStorage({
//         destination: function (req, res, cb) {
//             cb(null, "./src/multer/uploads")
//         },
//         filename: function (req, file, cb) {
//             cb(null, file.fieldname  + ".png")
//         }
//     })
// }).single("profile");
// // }).fields([{name:"note_file"},{name:"dummy_file"}]);
// // }).any();
const upload = (0, multer_1.default)({
    storage: multer_1.default.diskStorage({
        destination: function (req, res, cb) {
            cb(null, "uploads");
        },
        filename: function (req, file, cb) {
            cb(null, file.fieldname + ".png");
        }
    })
    // }).single("note_file");
    // }).fields([{name:"note_file"},{name:"dummy_file"}]);
}).any();
exports.upload = upload;
const uploadProfile = (0, multer_1.default)({
    storage: multer_1.default.diskStorage({
        destination: './src/multer/uploads/',
        filename(req, file, callback) {
            return callback(null, `${file.fieldname}_${Date.now()}${path_1.default.extname(file.originalname)}`);
        }
    })
}).single("profile");
exports.uploadProfile = uploadProfile;
//# sourceMappingURL=multer.js.map