const multer = require('multer');
const path = require('path');




// Configure storage options
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/uploads/'); // Directory to save uploaded files
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname)); 
    }
});

// Create multer instance
const upload = multer({ storage: storage });


module.exports = upload;