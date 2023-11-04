/* The statement `import path from path;` is importing the `path` module from the `path` package in
JavaScript. This allows you to use the functions and methods provided by the `path` module in your
code. */
import path from path;

import multer from "multer";

const upload = multer({
    dest:"uploads/",
    limits:{
        fileSize: 50*1024*1024 // 50MB
    },
    storage:multer.diskStorage({
        destination: "uploads/",
        filename:(_req,file,cb)=>{
            cb(null,file.originalname)
        },
    }),
    fileFilter: (_req,file,cb)=>{
        let ext = path.extname(file.originalname);
        if(
            ext !== ".jpg" &&
            ext !== ".jpeg" &&
            ext !== ".png" &&
            ext !== ".webp" &&
            ext !== ".mp4"
        ){
            cb(new Error(`Unstoped file type ${ext}`),falsse);
            return ;
        }
        cb(null,true);
    },
});

export default upload;