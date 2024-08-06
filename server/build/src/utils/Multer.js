"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.upload = void 0;
const multer_1 = __importDefault(require("multer"));
const path_1 = __importDefault(require("path"));
// import {} from '../../../client/uni/public/images'
const fs = require('fs-extra');
// Define the storage configuration
const storage = multer_1.default.diskStorage({
    destination: function (req, file, cb) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = req.params.id; // Assuming the id is passed as a URL parameter
            const uploadPath = path_1.default.resolve(__dirname, '../../../client/uni/public/images');
            console.log(uploadPath);
            try {
                yield fs.ensureDir(uploadPath); // Ensure the directory exists
                cb(null, uploadPath);
                // console.log(uploadPath)
            }
            catch (err) {
                console.error('Failed to create directory', err);
                // cb(err);
            }
        });
    },
    filename: function (req, file, cb) {
        const id = req.params.id;
        const fileExtension = path_1.default.extname(file.originalname);
        cb(null, `${id}.png`);
    }
});
// Create the multer instance with the storage configuration
exports.upload = (0, multer_1.default)({ storage: storage });
