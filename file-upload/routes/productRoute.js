const express = require("express")
const router = express.Router()

const { createProduct, getAllProducts, uploadImage } = require("../controllers/productController")

router.route("/").post(createProduct).get(getAllProducts)
router.route("/upload").post(uploadImage)

module.exports = router