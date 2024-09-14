const multer = require('multer');
const path = require('path');




// Configure storage for photo and CV
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      if (file.fieldname === 'Photo') {
        cb(null, 'public/photos'); //save
      } else if (file.fieldname === 'Cv') {
        cb(null, 'public/cvs'); //save
      }
    },
    filename: function (req, file, cb) {
      cb(null, Date.now() + path.extname(file.originalname)); // Generate unique file name
    }
  });


// Create multer instance
const upload = multer({ 
    storage: storage ,
    limits: { fileSize: 1024 * 1024 * 5 } // Limit file size to 5MB
});


module.exports = upload;
