const multer = require('multer');
const path = require('node:path');

// configuración upload
const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        const ruta = path.join(__dirname,'..','public','fotossubidas');
        cb(null,ruta);
    },
    filename: function(req, file, cb) {
        const filename = file.fieldname + '-' + Date.now() + '-' + file.originalname;
        cb(null,filename);
    }
})

module.exports = multer({ storage });