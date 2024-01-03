const express = require('express')
let PlatformController = require('../controllers/products/platform');
let ProductController = require('../controllers/products/product');
const router = express.Router()
let multer = require('multer')
let multerS3 = require('multer-s3')
let aws = require('aws-sdk');
const { userAuth } = require('../middleware/auth');
const s3 = new aws.S3({
    accessKeyId: process.env.accessKeyId,
    secretAccessKey: process.env.secretAccessKey,
    region: process.env.region,
});
const storage = multerS3({
    s3: s3,
    bucket: process.env.bucket,
    key: function (req, file, cb) {
        console.log(file);
        cb(null, `profiles/${Date.now()}-${file.originalname}`);
    }
})
const upload = multer({
    storage: storage
})

// Products
router.post('/create-product', userAuth, upload.single('icon'), ProductController.createProduct)
router.get('/view-products', userAuth,ProductController.viewProducts)

// Platforms
router.post('/create-platform', PlatformController.createPlatform)
router.get('/view-platforms', PlatformController.viewPlatforms)
module.exports = router