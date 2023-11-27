/* const multer = require('multer');

const validExtensions = ['jpg', 'jpeg', 'png']

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads');
    },
    filename: (req, file, cb) => {
        const ext = file.originalname.split('.').pop();
        const ts = new Date().getTime();
        const name = `${req.params.id}_${ts}.${ext}`;
        cb(null, name);
    }
});

const fileFilter = (req, file, cb) => {
    const ext = file.originalname.split('.').pop();
    const isValid = validExtensions.includes(ext);
    cb(null, isValid);
}

const upload = multer({storage, fileFilter });

module.exports = upload; */