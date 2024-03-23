import express from 'express';
import multer from 'multer';

const PORT = 5000;
const app = express();

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads'); // we have to create a uploads folder, it does not create automatically
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}${file.originalname}`);
    }
});
const upload = multer({storage});

const uploadMiddleware = (req, res, next) => {
    try {
        //upload a single file
        // upload.single('file')(req, res, (err) => {
        //     if(err) {
        //         // console.log(err);
        //         res.status(400).json({status: 400, message: err.message});
        //     }
        //     else next();
        // });

        //upload multiple file at once
        upload.array('files')(req, res, (err) => {
            if(err){
                // console.log(err);
                res.status(400).json({status: 400, message: err.message});
            }
            else next();
        });
    } catch (error) {
        console.log(error);
    }
}

app.post('/upload', uploadMiddleware, (req, res) => {
    res.status(200).json({message: "File uploaded successfully"});
});

app.listen(PORT, () => console.log(`Server is running on the Port ${PORT}`));