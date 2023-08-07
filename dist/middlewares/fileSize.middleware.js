"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FinallMulterOptions = void 0;
const multer_1 = require("multer");
exports.FinallMulterOptions = {
    storage: (0, multer_1.diskStorage)({
        destination: './src/static',
        filename: (req, file, cb) => {
            const fileNameSplit = file.originalname.split('.');
            const fileExt = fileNameSplit[fileNameSplit.length - 1];
            cb(null, `${Date.now()}.${fileExt}`);
        }
    }),
    limits: { fileSize: 360000 }
};
//# sourceMappingURL=fileSize.middleware.js.map