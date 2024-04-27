import { MulterOptions } from '@nestjs/platform-express/multer/interfaces/multer-options.interface';
import { diskStorage } from 'multer';

export const FinallMulterOptions: MulterOptions = { 
    storage: diskStorage(
        {
            destination: './src/static',
            filename: (req, file, cb) => {
                const fileNameSplit = file.originalname.split('.');
                const fileExt = fileNameSplit[fileNameSplit.length - 1];
                cb(null, `${Date.now()}.${fileExt}`);
            }
        }
    ),
    limits: { fileSize: 5000000 }
};