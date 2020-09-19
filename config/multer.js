const multer = require('multer'); 
const path = require('path');

const publicPath = path.join(__dirname,'../public');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, publicPath+ '/data');
    },
    filename: (req, file, cb) => {
      cb(null, `${Date.now()}-${file.originalname}`);
    }
});

module.exports= multer({storage});