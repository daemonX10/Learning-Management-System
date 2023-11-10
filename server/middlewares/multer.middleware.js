import path from 'path';
import multer from 'multer';

const upload = multer({
    dest:"uploads/",
    limits:{
        fileSize: 1024 * 1024 * 50 // 50MB
    },
    storage: multer.diskStorage({
        destination:"uploads/",
        filename:(_req,file,cb)=>{
            cb(null,`${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`)
        },
    }),
    fileFilter:(_req,file,cb)=>{
        let ext = path.extname(file.originalname);
        if(ext !== '.png' && 
        ext !== '.jpg' && 
        ext !== '.jpeg' &&
        ext !== '.webp' &&
        ext !== '.mp4'){
            cb(new Error('File type is not supported'),false)
            return;
        }
        cb(null,true);
    },
});

export default upload;