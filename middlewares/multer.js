const multer = require('multer')
const path = require('path')

const storage = multer.diskStorage({
  filename: function (req, file, cb) {
    const fileName = `${Date.now()}-${file.originalname}`
    cb(null ,fileName)
  },
})

const upload = multer({ storage: storage });
module.exports = upload;